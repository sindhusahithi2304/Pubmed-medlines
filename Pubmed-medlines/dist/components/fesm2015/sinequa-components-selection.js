import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵpipe, ɵɵlistener, ɵɵelementEnd, ɵɵtext, ɵɵpropertyInterpolate, ɵɵpipeBind1, ɵɵattribute, ɵɵadvance, ɵɵproperty, Component, Input, ɵɵelement, ɵɵpureFunction4, ɵɵelementContainer, ɵɵgetCurrentView, ɵɵtemplate, ɵɵrestoreView, ɵɵnextContext, ɵɵpureFunction2, EventEmitter, ɵɵcontentQuery, TemplateRef, ɵɵqueryRefresh, ɵɵloadQuery, ContentChild, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { Action, BsActionButtons, BsActionModule } from '@sinequa/components/action';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { NgForOf, NgTemplateOutlet, CommonModule } from '@angular/common';
import { moveItemInArray, CdkDropList, CdkDrag, CdkDragPlaceholder, DragDropModule } from '@angular/cdk/drag-drop';
import { Utils } from '@sinequa/core/base';

var SelectionEventType;
(function (SelectionEventType) {
    SelectionEventType[SelectionEventType["SELECT"] = 0] = "SELECT";
    SelectionEventType[SelectionEventType["UNSELECT"] = 1] = "UNSELECT";
    SelectionEventType[SelectionEventType["MOVE"] = 2] = "MOVE";
})(SelectionEventType || (SelectionEventType = {}));
const defaultSelectionOptions = {
    resetOnNewResults: false,
    resetOnNewQuery: true,
    storage: "id"
};
const SELECTION_OPTIONS = new InjectionToken("SELECTION_OPTIONS");
class SelectionService {
    constructor(searchService, selectionOptions) {
        this.searchService = searchService;
        this.selectionOptions = selectionOptions;
        this.selectedRecords = []; // currently selected items
        this.selectionActions = []; // Actions that other services can register onto this service
        this._events = new Subject();
        this.searchService.events.subscribe(event => {
            var _a;
            if (!this.selectionOptions.resetOnNewResults && event.type === "new-results" && this.searchService.haveRecords) {
                const newSelectedRecords = [];
                if ((_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.records) {
                    for (const record of this.searchService.results.records) {
                        const index = this.selectedRecords.findIndex(item => item.id === record.id);
                        if (index !== -1 && !record.$selected) {
                            record.$selected = true; // Select previously selected records
                            this.selectedRecords.splice(index, 1, record);
                            newSelectedRecords.push(record);
                        }
                    }
                }
                if (newSelectedRecords.length > 0) // Menus might need to be refreshed
                    this._events.next({ type: SelectionEventType.SELECT, records: newSelectedRecords, source: event.type });
            }
            if (this.selectionOptions.resetOnNewResults && event.type === "new-results") {
                this.clearSelectedRecords(event.type);
            }
            if (this.selectionOptions.resetOnNewQuery && event.type === "new-query") {
                this.clearSelectedRecords(event.type);
            }
        });
        this.selectedRecordsAction = this.buildSelectRecordsAction();
        this.selectionActions.push(this.selectedRecordsAction);
        this.events.subscribe({ next: () => {
                this.selectionActions.forEach(action => action.update());
            } });
    }
    /**
     * Emits an event on any (bulk or single) selection and unselection events
     */
    get events() {
        return this._events;
    }
    ngOnDestroy() {
        this._events.complete();
    }
    getItem(record) {
        if (this.selectionOptions.storage === "id") {
            return { id: record.id };
        }
        else if (this.selectionOptions.storage === "record") {
            return record;
        }
        else {
            return this.selectionOptions.storage(record);
        }
    }
    /**
     * Returns a copy of the list of selected records
     */
    getSelectedItems() {
        return this.selectedRecords.slice(0);
    }
    /**
     * Return the list of selected record ids
     */
    getSelectedIds() {
        return this.selectedRecords.map(r => r.id);
    }
    /**
     * @returns true if at least one record is selected
     */
    get haveSelectedRecords() {
        return this.selectedRecords.length > 0;
    }
    getSelectedCount() {
        return this.selectedRecords.length;
    }
    /**
     * @returns true if all records in the search results are selected
     */
    get allRecordsSelected() {
        if (!this.searchService.results || !this.searchService.results.records) {
            return false;
        }
        for (const record of this.searchService.results.records) {
            if (!record.$selected) {
                return false;
            }
        }
        return true;
    }
    selectCurrentRecords(source) {
        const newSelectedRecords = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (const record of this.searchService.results.records) {
                if (!record.$selected) {
                    this.selectedRecords.push(this.getItem(record));
                    newSelectedRecords.push(record);
                    record.$selected = true;
                }
            }
        }
        if (newSelectedRecords.length > 0)
            this._events.next({ type: SelectionEventType.SELECT, records: newSelectedRecords, source });
    }
    /**
     * Toggles the selection of one record or all those in the results.
     * Emits a SelectionEvent if a record is selected or unselected.
     * @param record if provided, will toggle the selection of this record; if not will toggle all records in results
     */
    toggleSelectedRecords(record, source) {
        if (!!record) {
            const index = this.selectedRecords.findIndex(item => item.id === record.id);
            if (index > -1) {
                this.selectedRecords.splice(index, 1);
                record.$selected = false;
            }
            else {
                this.selectedRecords.push(this.getItem(record));
                record.$selected = true;
            }
            // record might not be the one in the search service results (if passing a SelectionItem)
            const ssRecord = this.searchService.getRecordFromId(record.id);
            if (ssRecord) {
                ssRecord.$selected = record.$selected;
            }
            this._events.next({ type: record.$selected ? SelectionEventType.UNSELECT : SelectionEventType.SELECT, records: [record], source });
        }
        else {
            if (this.allRecordsSelected) {
                this.clearSelectedRecords(source);
            }
            else {
                this.selectCurrentRecords(source);
            }
        }
    }
    /**
     * Moves a selected record to a different index;
     * @param record
     * @param newIndex
     */
    moveSelectedRecord(record, newIndex, source) {
        const i = this.selectedRecords.findIndex(r => r.id === record.id);
        if (i === -1) {
            throw new Error(`Record ${record.id} is not in the selected records`);
        }
        this.selectedRecords.splice(i, 1);
        this.selectedRecords.splice(newIndex, 0, this.getItem(record));
        this.events.next({ type: SelectionEventType.MOVE, records: [record], source });
    }
    /**
     * Unselect all selected records
     * Emits a SelectionEvent
     */
    clearSelectedRecords(source) {
        this.selectedRecords.splice(0);
        const newUnselectedRecords = [];
        if (this.searchService.results && this.searchService.results.records) {
            for (const record of this.searchService.results.records) {
                if (record.$selected) {
                    record.$selected = false;
                    newUnselectedRecords.push(record);
                }
            }
        }
        if (newUnselectedRecords.length > 0)
            this._events.next({ type: SelectionEventType.UNSELECT, records: newUnselectedRecords, source });
    }
    buildSelectRecordsAction() {
        return new Action({
            icon: "far fa-square",
            text: "msg#resultsSelector.selectDocuments",
            title: this.allRecordsSelected ? "msg#resultsSelector.unselectDocumentsTitle" : "msg#resultsSelector.selectDocumentsTitle",
            messageParams: { values: { count: this.selectedRecords.length } },
            action: (item, $event) => {
                this.toggleSelectedRecords(undefined, "multiple-selector");
            },
            updater: (item) => {
                item.icon = this.haveSelectedRecords ? "far fa-check-square" : "far fa-square";
                item.title = this.allRecordsSelected ? "msg#resultsSelector.unselectDocumentsTitle" : "msg#resultsSelector.selectDocumentsTitle";
                item.messageParams = { values: { count: this.selectedRecords.length } };
            }
        });
    }
}
SelectionService.ɵfac = function SelectionService_Factory(t) { return new (t || SelectionService)(ɵɵinject(SearchService), ɵɵinject(SELECTION_OPTIONS)); };
SelectionService.ɵprov = ɵɵdefineInjectable({ token: SelectionService, factory: SelectionService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SelectionService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: SearchService }, { type: undefined, decorators: [{
                type: Inject,
                args: [SELECTION_OPTIONS]
            }] }]; }, null); })();

class BsResultSelector {
    constructor(selectionService) {
        this.selectionService = selectionService;
    }
}
BsResultSelector.ɵfac = function BsResultSelector_Factory(t) { return new (t || BsResultSelector)(ɵɵdirectiveInject(SelectionService)); };
BsResultSelector.ɵcmp = ɵɵdefineComponent({ type: BsResultSelector, selectors: [["sq-result-selector"]], inputs: { record: "record" }, decls: 6, vars: 7, consts: [[1, "sq-select-results-item", "custom-control", "custom-control-inline", "custom-checkbox", 3, "title"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], [1, "custom-control-label"]], template: function BsResultSelector_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "label", 0);
        ɵɵpipe(1, "sqMessage");
        ɵɵpipe(2, "sqMessage");
        ɵɵelementStart(3, "input", 1);
        ɵɵlistener("change", function BsResultSelector_Template_input_change_3_listener() { return ctx.selectionService.toggleSelectedRecords(ctx.record, "result"); });
        ɵɵelementEnd();
        ɵɵelementStart(4, "span", 2);
        ɵɵtext(5, "\u200B");
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 3, ctx.record.$selected ? "msg#resultSelector.unselectDocument" : "msg#resultSelector.selectDocument"));
        ɵɵattribute("aria-label", ɵɵpipeBind1(2, 5, ctx.record.$selected ? "msg#resultSelector.unselectDocument" : "msg#resultSelector.selectDocument"));
        ɵɵadvance(3);
        ɵɵproperty("checked", ctx.record.$selected);
    } }, pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultSelector, [{
        type: Component,
        args: [{
                selector: "sq-result-selector",
                templateUrl: "./result-selector.html"
            }]
    }], function () { return [{ type: SelectionService }]; }, { record: [{
            type: Input
        }] }); })();

const _c0 = function (a0, a1, a2, a3) { return { items: a0, size: a1, style: a2, rightAligned: a3 }; };
class BsResultsSelector {
    constructor(selectionService) {
        this.selectionService = selectionService;
    }
    get actions() {
        return this.rightAligned ? this.selectionService.selectionActions.slice().reverse() : this.selectionService.selectionActions;
    }
}
BsResultsSelector.ɵfac = function BsResultsSelector_Factory(t) { return new (t || BsResultsSelector)(ɵɵdirectiveInject(SelectionService)); };
BsResultsSelector.ɵcmp = ɵɵdefineComponent({ type: BsResultsSelector, selectors: [["sq-results-selector"]], inputs: { size: "size", style: "style", rightAligned: "rightAligned" }, decls: 1, vars: 6, consts: [[1, "btn-group", 3, "sq-action-buttons"]], template: function BsResultsSelector_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction4(1, _c0, ctx.actions, ctx.size, ctx.style, ctx.rightAligned));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultsSelector, [{
        type: Component,
        args: [{
                selector: "sq-results-selector",
                templateUrl: "./results-selector.html"
            }]
    }], function () { return [{ type: SelectionService }]; }, { size: [{
            type: Input
        }], style: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();

function BsSelectionArranger_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 6);
} }
function BsSelectionArranger_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c0$1 = function (a0, a1) { return { $implicit: a0, index: a1 }; };
function BsSelectionArranger_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵtemplate(1, BsSelectionArranger_div_1_div_1_Template, 1, 0, "div", 3);
    ɵɵtemplate(2, BsSelectionArranger_div_1_ng_container_2_Template, 1, 0, "ng-container", 4);
    ɵɵelementStart(3, "i", 5);
    ɵɵlistener("click", function BsSelectionArranger_div_1_Template_i_click_3_listener() { ɵɵrestoreView(_r6); const record_r1 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(); return ctx_r5.removeRecord(record_r1); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const record_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r0.recordTpl)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c0$1, record_r1, i_r2));
} }
class BsSelectionArranger {
    constructor(searchService, selectionService) {
        this.searchService = searchService;
        this.selectionService = selectionService;
        /**
         * Triggers event when the user moves or removes a record in the list.
         */
        this.change = new EventEmitter();
    }
    getRecords() {
        return this.records || this.selectionService.getSelectedItems();
    }
    dropRecord(event) {
        if (event.isPointerOverContainer) { //https://material.angular.io/cdk/drag-drop/api#CdkDragExit
            if (this.records) {
                moveItemInArray(this.records, event.previousIndex, event.currentIndex); // Reorder the items when item dragged inside the drop zone
            }
            else {
                const record = this.selectionService.getSelectedItems()[event.previousIndex];
                this.selectionService.moveSelectedRecord(record, event.currentIndex);
            }
        }
        else {
            if (this.records) {
                this.records.splice(event.previousIndex, 1);
            }
            else {
                const record = this.selectionService.getSelectedItems()[event.previousIndex];
                this.selectionService.toggleSelectedRecords(record, "selection-arranger");
            }
        }
        this.change.next(this.getRecords());
    }
    removeRecord(record) {
        if (this.records) {
            this.records.splice(this.records.indexOf(record), 1);
        }
        else {
            this.selectionService.toggleSelectedRecords(record, "selection-arranger");
        }
        this.change.next(this.getRecords());
    }
}
BsSelectionArranger.ɵfac = function BsSelectionArranger_Factory(t) { return new (t || BsSelectionArranger)(ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(SelectionService)); };
BsSelectionArranger.ɵcmp = ɵɵdefineComponent({ type: BsSelectionArranger, selectors: [["sq-selection-arranger"]], contentQueries: function BsSelectionArranger_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.recordTpl = _t.first);
    } }, inputs: { records: "records" }, outputs: { change: "change" }, decls: 2, vars: 1, consts: [["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "card", "cdkDrag", "", 4, "ngFor", "ngForOf"], ["cdkDrag", "", 1, "card"], ["class", "record-placeholder", 4, "cdkDragPlaceholder"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "position-absolute", "fas", "fa-times", "record-close", 3, "click"], [1, "record-placeholder"]], template: function BsSelectionArranger_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("cdkDropListDropped", function BsSelectionArranger_Template_div_cdkDropListDropped_0_listener($event) { return ctx.dropRecord($event); });
        ɵɵtemplate(1, BsSelectionArranger_div_1_Template, 4, 5, "div", 1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.getRecords());
    } }, directives: [CdkDropList, NgForOf, CdkDrag, CdkDragPlaceholder, NgTemplateOutlet], styles: [".record-close[_ngcontent-%COMP%]{cursor:pointer;right:1rem;top:.25em}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-sizing:border-box}.cdk-drag-animating[_ngcontent-%COMP%], .record-placeholder[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.record-placeholder[_ngcontent-%COMP%]{background:#ccc;border:3px dotted #999;cursor:move;height:8rem}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSelectionArranger, [{
        type: Component,
        args: [{
                selector: "sq-selection-arranger",
                templateUrl: "./selection-arranger.component.html",
                styleUrls: ["./selection-arranger.component.scss"]
            }]
    }], function () { return [{ type: SearchService }, { type: SelectionService }]; }, { records: [{
            type: Input
        }], recordTpl: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }], change: [{
            type: Output
        }] }); })();

class BsSelectionModule {
}
BsSelectionModule.ɵmod = ɵɵdefineNgModule({ type: BsSelectionModule });
BsSelectionModule.ɵinj = ɵɵdefineInjector({ factory: function BsSelectionModule_Factory(t) { return new (t || BsSelectionModule)(); }, providers: [
        { provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions }
    ], imports: [[
            CommonModule,
            DragDropModule,
            IntlModule,
            BsActionModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsSelectionModule, { declarations: [BsResultsSelector, BsResultSelector, BsSelectionArranger], imports: [CommonModule,
        DragDropModule,
        IntlModule,
        BsActionModule], exports: [BsResultsSelector, BsResultSelector, BsSelectionArranger] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSelectionModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    DragDropModule,
                    IntlModule,
                    BsActionModule,
                ],
                declarations: [
                    BsResultsSelector, BsResultSelector, BsSelectionArranger
                ],
                exports: [
                    BsResultsSelector, BsResultSelector, BsSelectionArranger
                ],
                providers: [
                    { provide: SELECTION_OPTIONS, useValue: defaultSelectionOptions }
                ]
            }]
    }], null, null); })();

var _enSelection = {
    "resultSelector": {
        "selectDocument": "Select document",
        "unselectDocument": "Unselect document"
    },
    "resultsSelector": {
        "selectDocuments": "{count, selectordinal, =0 {} other {(#)}}",
        "selectDocumentsTitle": "Select documents",
        "unselectDocumentsTitle": "Unselect documents"
    },
    "selection": {
        "selectedDocuments": "{count, plural, =0 {} one {# selected document} other {# selected documents}}"
    }
};

var _frSelection = {
    "resultSelector": {
        "selectDocument": "Sélectionner le document",
        "unselectDocument": "Désélectionner le document"
    },
    "resultsSelector": {
        "selectDocuments": "{count, selectordinal, =0 {} other {(#)}}",
        "selectDocumentsTitle": "Sélectionner les documents",
        "unselectDocumentsTitle": "Désélectionner les documents",
    },
    "selection": {
        "selectedDocuments": "{count, plural, =0 {} one {# document sélectionné} other {# documents sélectionnés}}"
    }
};

var _deSelection = {
    "resultSelector": {
        "selectDocument": "Dokument auswählen",
        "unselectDocument": "Dokumentauswahl aufheben"
    },
    "resultsSelector": {
        "selectDocuments": "{count, selectordinal, =0 {} other {(#)}}",
        "selectDocumentsTitle": "Dokumente auswählen",
        "unselectDocumentsTitle": "Dokumentauswahl aufheben",
    },
    "selection": {
        "selectedDocuments": "{count, plural, =0 {} one {# ausgewähltes Dokument} other {# ausgewählte Dokumente}}"
    }
};

const enSelection = Utils.merge({}, _enSelection, enSearch);
const frSelection = Utils.merge({}, _frSelection, frSearch);
const deSelection = Utils.merge({}, _deSelection, deSearch);

/**
 * Generated bundle index. Do not edit.
 */

export { BsResultSelector, BsResultsSelector, BsSelectionArranger, BsSelectionModule, SELECTION_OPTIONS, SelectionEventType, SelectionService, deSelection, defaultSelectionOptions, enSelection, frSelection };
//# sourceMappingURL=sinequa-components-selection.js.map
