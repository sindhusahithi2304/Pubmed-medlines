import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, Optional, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵelement, ɵɵproperty, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, Component, ɵɵnextContext, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵtextInterpolate1, ChangeDetectorRef, ɵɵtemplate, ɵɵpropertyInterpolate, ɵɵpipeBind2, ɵɵpureFunction1, ɵɵsanitizeUrl, ɵɵpureFunction2, Input, ɵɵpureFunction4, ɵɵInheritDefinitionFeature, ɵɵpipeBind3, ɵɵattribute, ɵɵelementContainerStart, ɵɵtemplateRefExtractor, ɵɵelementContainerEnd, ɵɵreference, EventEmitter, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { ExportSourceType, ExportOutputFormat, UserSettingsWebService, QueryExportWebService, DownloadWebService } from '@sinequa/core/web-services';
import { Query, AppService } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { Action, BsActionButtons, BsActionItem, BsActionModule } from '@sinequa/components/action';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { ModalService, ModalButton, MODAL_MODEL, ModalRef } from '@sinequa/core/modal';
import { SelectionService, BsSelectionModule, enSelection, frSelection, deSelection } from '@sinequa/components/selection';
import { FormControl, Validators, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, SelectControlValueAccessor, SelectMultipleControlValueAccessor, NumberValueAccessor, NgSelectOption, ɵangular_packages_forms_forms_x, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModal, BsEditable, BsModalModule, enModal, frModal, deModal } from '@sinequa/components/modal';
import { Autofocus, DatePipe, UtilsModule } from '@sinequa/components/utils';
import { ValidationDirective, ValidationService, ValidationModule } from '@sinequa/core/validation';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { NotificationsService } from '@sinequa/core/notification';
import { NgForOf, NgIf, NgClass, SlicePipe, CommonModule } from '@angular/common';
import { CdkDropList, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { RouterLinkWithHref, RouterModule } from '@angular/router';
import { LoginService } from '@sinequa/core/login';
import { AbstractFacet } from '@sinequa/components/facet';

// Types of events triggering a change event
const SAVED_QUERIES_CHANGE_EVENTS = [
    "SavedQuery_Add" /* Add */,
    "SavedQuery_Delete" /* Delete */,
    "SavedQuery_DeleteAll" /* DeleteAll */,
    "SavedQuery_Rename" /* Rename */,
    "SavedQuery_Update" /* Update */
];
const SAVEDQUERY_COMPONENTS = new InjectionToken('SAVEDQUERY_COMPONENTS');
class SavedQueriesService {
    constructor(userSettingsService, searchService, modalService, appService, queryExportService, downloadService, selectionService, savedQueryComponents) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.appService = appService;
        this.queryExportService = queryExportService;
        this.downloadService = downloadService;
        this.selectionService = selectionService;
        this.savedQueryComponents = savedQueryComponents;
        this._events = new Subject();
        this._changes = new Subject();
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this._events.next({ type: "SavedQuery_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (SAVED_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
        // Initialize selection action
        this.selectedRecordsAction = new Action({
            icon: 'fas fa-download',
            title: 'msg#exportQuery.btnTitle',
            action: (_item, _event) => {
                this.exportModal(this.selectionService.haveSelectedRecords
                    ? ExportSourceType.Selection
                    : ExportSourceType.Result);
            },
        });
    }
    // GETTERS
    /**
     * Returns the list of this user's saved queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of saved queries if it does not already exist.
     */
    get savedqueries() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["savedQueries"])
            this.userSettingsService.userSettings["savedQueries"] = [];
        return this.userSettingsService.userSettings["savedQueries"];
    }
    /**
     * Triggers any event among SavedQueryChangeEvent
     * (use for fine-grained control of saved queries workflow)
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of saved queries
     * (use to refresh saved queries menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    /**
     * @returns true if there is at least one saved query
     */
    get hasSavedQuery() {
        return this.savedqueries.length > 0;
    }
    /**
     * @returns a saved query with the given name or null if it does not exist
     * @param name
     */
    savedquery(name) {
        const i = this.savedqueryIndex(name);
        return i >= 0 ? this.savedqueries[i] : undefined;
    }
    savedqueryIndex(name) {
        for (let i = 0, ic = this.savedqueries.length; i < ic; i++) {
            const savedquery = this.savedqueries[i];
            if (savedquery && savedquery.name === name) {
                return i;
            }
        }
        return -1;
    }
    // CRUD
    /**
     * Creates a new saved query unless it already exists.
     * Emits an savedquery event.
     * Update the data on the server.
     * @param savedquery the savedquery to create
     * @returns true if savedquery was created
     */
    createSavedQuery(savedquery) {
        if (this.savedqueryIndex(savedquery.name) >= 0)
            return false; // This savedquery already exists
        this.savedqueries.unshift(savedquery);
        this._events.next({ type: "SavedQuery_Add" /* Add */, savedquery });
        this.patchSavedQueries([{
                type: "SavedQuery_Add" /* Add */,
                detail: {
                    savedquery: savedquery.name
                }
            }]);
        return true;
    }
    /**
     * Update the saved query at the given index, unless a saved query with the same name
     * already exists in the list of saved queries.
     * Emits an Saved Query event.
     * Update the data on the server.
     * @param savedquery the saved query to update
     * @param index the index at which to update the saved query
     * @returns true if saved query was updated
     */
    updateSavedQuery(savedquery, index) {
        const prevIndex = this.savedqueryIndex(savedquery.name);
        if (prevIndex !== -1 && index !== prevIndex)
            return false; // A saved query with the same name exists at a different index
        if (index >= 0 && index < this.savedqueries.length) {
            this.savedqueries.splice(index, 1, savedquery);
            this._events.next({ type: "SavedQuery_Update" /* Update */, savedquery });
            this.patchSavedQueries([
                {
                    type: "SavedQuery_Update" /* Update */,
                    detail: {
                        savedquery: savedquery.name
                    }
                }
            ]);
            return true;
        }
        return false; // This saved query does not exist
    }
    /**
     * Updates the full list of saved queries.
     * Emits an SavedQuery event.
     * Update the data on the server.
     * @param savedqueries the new list of saved queries
     * @param auditEvents the list of audit events to log
     */
    updateSavedQueries(savedqueries, auditEvents) {
        Utils.arraySet(this.savedqueries, savedqueries);
        this._events.next({ type: "SavedQuery_Update" /* Update */ });
        this.patchSavedQueries(auditEvents);
        return true;
    }
    /**
     * Deletes the given SavedQuery (based on its name)
     * Emits an SavedQuery event.
     * Update the data on the server.
     * @param savedquery
     * @returns true if saved query was deleted
     */
    deleteSavedQuery(savedquery) {
        const index = this.savedqueryIndex(savedquery.name);
        if (index === -1)
            return false; // Nothing to delete
        this.savedqueries.splice(index, 1);
        this._events.next({ type: "SavedQuery_Delete" /* Delete */, savedquery });
        this.patchSavedQueries([
            {
                type: "SavedQuery_Delete" /* Delete */,
                detail: {
                    savedquery: savedquery.name
                }
            }
        ]);
        return true;
    }
    /**
     * Sets this saved query to the current search context, using the search service
     */
    setSavedQueryToCurrentQuery(savedquery) {
        savedquery.query = Query.copy(this.searchService.query);
    }
    /**
     * Updates Saved Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchSavedQueries(auditEvents) {
        return this.userSettingsService.patch({ savedQueries: this.savedqueries }, auditEvents)
            .subscribe(next => {
            this._events.next({ type: "SavedQuery_Patched" /* Patched */ });
        }, error => {
            console.error("Could not patch Saved queries!", error);
        });
    }
    rssHref(item) {
        return Utils.addSearchParams(this.appService.appWebService.makeUrl("query.rss"), {
            app: this.appService.appName,
            name: item.name
        });
    }
    hasRssEnabled() {
        return !!this.appService.app && !!this.appService.app.queryRssEnabled;
    }
    /**
     * Checks if there is a configuration for the export web service.
     *
     * @returns true if there is a configuration for the export web service.
     */
    hasExportConfig() {
        return !!this.appService.app && !!this.appService.app.queryExport;
    }
    download(model) {
        return this.downloadService.download(this.requestExport(model));
    }
    requestExport(model) {
        switch (model.export) {
            case ExportSourceType.Result:
                return this.queryExportService.exportResult(model.webService, this.searchService.query, this.searchService.results, model.format, model.maxCount, model.exportedColumns);
            case ExportSourceType.Selection:
                return this.queryExportService.exportSelection(model.webService, this.searchService.query, this.searchService.results, this.selectionService.getSelectedIds(), model.format, model.maxCount, model.exportedColumns);
            case ExportSourceType.SavedQuery:
                return this.queryExportService.exportSavedQuery(model.webService, model.queryName || "", model.format, model.maxCount, model.exportedColumns);
            default:
                console.log('QueryExporter.export unexpected export type: ', ExportSourceType[model.export]);
                return throwError('QueryExporter.export unexpected export type: ');
        }
    }
    // EVENT HANDLERS (Menus)
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this saved query.
     * @param saved query
     * @returns the search service promise
     */
    searchSavedQuery(savedquery, path) {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(savedquery.query)));
        this._events.next({ type: "Search_SavedQuery" /* Search */, savedquery });
        return this.searchService.search({ path: path }, {
            type: "Search_SavedQuery" /* Search */,
            detail: {
                "saved-query": savedquery.name
            }
        });
    }
    /**
     * Opens a dialog allowing a user to save the current query.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the query was saved.
     */
    createSavedQueryModal(query = this.searchService.query) {
        const savedQuery = {
            name: query.text || "",
            query: Query.copy(query)
        };
        return this.modalService.open(this.savedQueryComponents.editSavedQueryModal, { model: savedQuery })
            .then((result) => {
            if (result === -1 /* OK */) {
                const index = this.savedqueryIndex(savedQuery.name);
                if (index !== -1) {
                    return this.modalService.yesNo("msg#savedQueries.savedQueryAlreadyExists")
                        .then((result) => {
                        if (result === -3 /* Yes */) {
                            return this.updateSavedQuery(savedQuery, index);
                        }
                        return false;
                    });
                }
                else {
                    return this.createSavedQuery(savedQuery);
                }
            }
            return false;
        });
    }
    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of saved queries.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    manageSavedQueriesModal() {
        const model = { savedQueries: Utils.copy(this.savedqueries) };
        return this.modalService.open(this.savedQueryComponents.manageSavedQueriesModal, { model })
            .then((result) => {
            if (result === -1 /* OK */) {
                return this.updateSavedQueries(model.savedQueries, model.auditEvents);
            }
            return false;
        });
    }
    /**
     * Exports a query via a modal dialog.
     *
     * @param exportType type of export to perform (selection, saved query, results)
     * @param savedQuery The saved query
     */
    exportModal(exportType, savedQuery) {
        if (!this.hasExportConfig() || !this.appService.app) {
            return Promise.resolve(-2 /* Cancel */);
        }
        const model = {
            format: ExportOutputFormat.Csv,
            export: exportType,
            webService: this.appService.app.queryExport
        };
        if (savedQuery && exportType === ExportSourceType.SavedQuery) {
            model.queryName = savedQuery.name;
        }
        return this.modalService.open(this.savedQueryComponents.exportSavedQueryModal, { model });
    }
    notifyOpenSavedQuery(savedquery) {
        this._events.next({ type: "Search_SavedQuery" /* Search */, savedquery });
    }
    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
SavedQueriesService.ɵfac = function SavedQueriesService_Factory(t) { return new (t || SavedQueriesService)(ɵɵinject(UserSettingsWebService), ɵɵinject(SearchService), ɵɵinject(ModalService), ɵɵinject(AppService), ɵɵinject(QueryExportWebService), ɵɵinject(DownloadWebService), ɵɵinject(SelectionService), ɵɵinject(SAVEDQUERY_COMPONENTS)); };
SavedQueriesService.ɵprov = ɵɵdefineInjectable({ token: SavedQueriesService, factory: SavedQueriesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SavedQueriesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: SearchService }, { type: ModalService }, { type: AppService }, { type: QueryExportWebService }, { type: DownloadWebService }, { type: SelectionService }, { type: undefined, decorators: [{
                type: Inject,
                args: [SAVEDQUERY_COMPONENTS]
            }] }]; }, null); })();

// Types of events triggering a change event
const RECENT_QUERIES_CHANGE_EVENTS = [
    "RecentQuery_Add" /* Add */,
    "RecentQuery_Update" /* Update */,
    "RecentQuery_Delete" /* Delete */,
];
const MAX_QUERIES = new InjectionToken("MAX_QUERIES");
class RecentQueriesService {
    constructor(userSettingsService, searchService, maxQueries) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.maxQueries = maxQueries;
        this._events = new Subject();
        this._changes = new Subject();
        if (!this.maxQueries) {
            this.maxQueries = 20;
        }
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Revive dates
            this.recentqueries.forEach(rq => {
                if (Utils.isString(rq.date)) {
                    const date = Utils.toDate(rq.date);
                    if (date) {
                        rq.date = date;
                    }
                }
            });
            // ==> Menus need to be rebuilt
            this._events.next({ type: "RecentQuery_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (RECENT_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
        // Listen to search service and store queries
        this.searchService.queryStream.subscribe((query) => {
            if (query) {
                this.addRecentQuery({ query: query.copy(), date: new Date() });
            }
        });
    }
    // GETTERS
    /**
     * Returns the list of this user's recent queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent queries if it does not already exist.
     */
    get recentqueries() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["recentQueries"])
            this.userSettingsService.userSettings["recentQueries"] = [];
        return this.userSettingsService.userSettings["recentQueries"];
    }
    /**
     * Triggers any event among RecentQueryChangeEvent
     * (use for fine-grained control of recent queries workflow)
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of recent queries
     * (use to refresh recent queries menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    /**
     * @returns true if there is at least one recent query
     */
    get hasRecentQuery() {
        return this.recentqueries.length > 0;
    }
    /**
     * @returns a recent query with the given name or undefined if it does not exist
     * @param name
     */
    recentquery(text) {
        const i = this.recentqueryIndex(text);
        return i >= 0 ? this.recentqueries[i] : undefined;
    }
    recentqueryIndex(text) {
        for (let i = 0, ic = this.recentqueries.length; i < ic; i++) {
            const recentquery = this.recentqueries[i];
            if (recentquery && recentquery.query.text && recentquery.query.text.toLowerCase() === text.toLowerCase()) {
                return i;
            }
        }
        return -1;
    }
    comparator(q1, q2) {
        return q2.date.getTime() - q1.date.getTime();
    }
    // CRUD
    /**
     * Creates a new recent query unless it already exists, in which case the existing query is updated.
     * Emits an recentquery event.
     * Update the data on the server.
     * @param recentquery the recentquery to create
     * @returns true if recentquery was created
     */
    addRecentQuery(recentquery) {
        if (!recentquery.query || !recentquery.query.text || recentquery.query.text.trim() === '') {
            return false;
        }
        const i = this.recentqueryIndex(recentquery.query.text); // If the query already exists
        if (i >= 0) {
            // Ignore identical queries issued within a certain time window (1s)
            // to avoid flooding the server. NB the request flooding mitigation in
            // SqHttpClient will not work in this case as the request payload includes
            // a timestamp
            if (Math.abs(recentquery.date.getTime() - this.recentqueries[i].date.getTime()) < 1000) {
                if (Utils.equals(this.recentqueries[i].query, recentquery.query)) {
                    return false;
                }
            }
            this.recentqueries[i].date = recentquery.date; // Update the date of the existing query
            this.recentqueries[i].query = recentquery.query;
            this._events.next({ type: "RecentQuery_Update" /* Update */, recentquery: this.recentqueries[i] });
        }
        else {
            this.recentqueries.push(recentquery);
            this._events.next({ type: "RecentQuery_Add" /* Add */, recentquery });
        }
        // Sort the list
        this.recentqueries.sort(this.comparator);
        // Truncate the list
        if (this.maxQueries >= 0)
            this.recentqueries.splice(this.maxQueries);
        this.patchRecentQueries(); // No need to emit an "Add" audit event, since it is redundant with the main search API
        return true;
    }
    /**
     * Deletes the given RecentQuery (based on its name)
     * Emits an RecentQuery event.
     * Update the data on the server.
     * @param recentquery
     * @returns true if recent query was deleted
     */
    deleteRecentQuery(recentquery) {
        const index = this.recentqueryIndex(recentquery.query.text || "");
        if (index === -1)
            return false; // Nothing to delete
        this.recentqueries.splice(index, 1);
        this._events.next({ type: "RecentQuery_Delete" /* Delete */, recentquery });
        this.patchRecentQueries([
            {
                type: "RecentQuery_Delete" /* Delete */,
                detail: {
                    recentquery: recentquery.query.text
                }
            }
        ]);
        return true;
    }
    /**
     * Updates Recent Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchRecentQueries(auditEvents) {
        return this.userSettingsService.patch({ recentQueries: this.recentqueries }, auditEvents)
            .subscribe(next => {
            this._events.next({ type: "RecentQuery_Patched" /* Patched */ });
        }, error => {
            console.error("Could not patch Recent queries!", error);
        });
    }
    // EVENT HANDLERS (Menus)
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this recent query.
     * @param recentquery
     * @returns the search service promise
     */
    searchRecentQuery(recentquery, path) {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(recentquery.query)));
        this._events.next({ type: "Search_RecentQuery" /* Search */, recentquery });
        return this.searchService.search({ path: path }, {
            type: "Search_RecentQuery" /* Search */,
            detail: {
                recentquery: recentquery.query.text
            }
        });
    }
    notifyOpenRecentQuery(recentquery) {
        this._events.next({ type: "Search_RecentQuery" /* Search */, recentquery });
    }
    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
RecentQueriesService.ɵfac = function RecentQueriesService_Factory(t) { return new (t || RecentQueriesService)(ɵɵinject(UserSettingsWebService), ɵɵinject(SearchService), ɵɵinject(MAX_QUERIES, 8)); };
RecentQueriesService.ɵprov = ɵɵdefineInjectable({ token: RecentQueriesService, factory: RecentQueriesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RecentQueriesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: SearchService }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAX_QUERIES]
            }] }]; }, null); })();

// Types of events triggering a change event
const RECENT_DOCUMENTS_CHANGE_EVENTS = [
    "RecentDocument_Add" /* Add */,
    "RecentDocument_Update" /* Update */,
    "RecentDocument_Delete" /* Delete */,
];
const MAX_DOCUMENTS = new InjectionToken("MAX_DOCUMENTS");
class RecentDocumentsService {
    constructor(userSettingsService, searchService, maxDocuments) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.maxDocuments = maxDocuments;
        this._events = new Subject();
        this._changes = new Subject();
        if (!this.maxDocuments) {
            this.maxDocuments = 20;
        }
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Revive dates
            this.recentdocuments.forEach(rd => {
                if (Utils.isString(rd.date)) {
                    const date = Utils.toDate(rd.date);
                    if (date) {
                        rd.date = date;
                    }
                }
            });
            // ==> Menus need to be rebuilt
            this.events.next({ type: "RecentDocument_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (RECENT_DOCUMENTS_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
        /**
         * Subscribe to the search service to capture "open-original-document" event
         * and add documents to this service
         */
        this.searchService.events.subscribe(event => {
            if (event.type === "open-original-document" && event.record) {
                this.addDocument(event.record, true);
            }
        });
    }
    // GETTERS
    /**
     * Returns the list of this user's recent documents.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent documents if it does not already exist.
     */
    get recentdocuments() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["recentDocuments"])
            this.userSettingsService.userSettings["recentDocuments"] = [];
        return this.userSettingsService.userSettings["recentDocuments"];
    }
    /**
     * Triggers any event among RecentDocumentChangeEvent
     * (use for fine-grained control of recent documents workflow)
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of recent documents
     * (use to refresh recent documents menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    /**
     * @returns true if there is at least one recent document
     */
    get hasRecentDocument() {
        return this.recentdocuments.length > 0;
    }
    /**
     * @returns a recent document with the given name or null if it does not exist
     * @param name
     */
    recentdocument(text) {
        const i = this.recentdocumentIndex(text);
        return i >= 0 ? this.recentdocuments[i] : undefined;
    }
    recentdocumentIndex(id) {
        for (let i = 0, ic = this.recentdocuments.length; i < ic; i++) {
            const recentdocument = this.recentdocuments[i];
            if (recentdocument && recentdocument.id === id) {
                return i;
            }
        }
        return -1;
    }
    comparator(q1, q2) {
        return q2.date.getTime() - q1.date.getTime();
    }
    // CRUD
    /**
     * Creates a new recent document unless it already exists, in which case the existing document is updated.
     * Emits an recentdocument event.
     * Update the data on the server.
     * @param record Record to add to the service
     * @param original Whether the original doc was opened or the preview
     * @returns true if recentdocument was created
     */
    addDocument(record, original) {
        if (record) {
            return this.addRecentDocument({
                id: record.id,
                title: record.title,
                url1: record.url1,
                treepath: record.treepath,
                docformat: record.docformat,
                authors: record.authors,
                date: new Date(),
                original: original
            });
        }
        return false;
    }
    /**
     * Creates a new recent document unless it already exists, in which case the existing document is updated.
     * Emits an recentdocument event.
     * Update the data on the server.
     * @param recentdocument the recentdocument to create
     * @returns true if recentdocument was created
     */
    addRecentDocument(recentdocument) {
        if (!recentdocument.id) {
            return false;
        }
        const i = this.recentdocumentIndex(recentdocument.id); // If the document already exists
        if (i >= 0) {
            this.recentdocuments[i].date = recentdocument.date; // Update the date of the existing document
            this.events.next({ type: "RecentDocument_Update" /* Update */, recentdocument: this.recentdocuments[i] });
        }
        else {
            this.recentdocuments.push(recentdocument);
            this.events.next({ type: "RecentDocument_Add" /* Add */, recentdocument: recentdocument });
        }
        // Sort the list
        this.recentdocuments.sort(this.comparator);
        // Truncate the list
        if (this.maxDocuments >= 0)
            this.recentdocuments.splice(this.maxDocuments);
        this.patchRecentDocuments(); // No need to emit an "Add" audit event, since it is redundant with the main search API
        return true;
    }
    /**
     * Deletes the given RecentDocument (based on its name)
     * Emits an RecentDocument event.
     * Update the data on the server.
     * @param recentdocument
     * @returns true if recent document was deleted
     */
    deleteRecentDocument(recentdocument) {
        const index = this.recentdocumentIndex(recentdocument.id);
        if (index === -1)
            return false; // Nothing to delete
        this.recentdocuments.splice(index, 1);
        this.events.next({ type: "RecentDocument_Delete" /* Delete */, recentdocument: recentdocument });
        this.patchRecentDocuments([
            {
                type: "RecentDocument_Delete" /* Delete */,
                detail: {
                    recentdocument: recentdocument.id
                }
            }
        ]);
        return true;
    }
    /**
     * Updates Recent Documents in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchRecentDocuments(auditEvents) {
        return this.userSettingsService.patch({ recentDocuments: this.recentdocuments }, auditEvents)
            .subscribe(next => {
            this.events.next({ type: "RecentDocument_Patched" /* Patched */ });
        }, error => {
            console.error("Could not patch Recent documents!", error);
        });
    }
    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
RecentDocumentsService.ɵfac = function RecentDocumentsService_Factory(t) { return new (t || RecentDocumentsService)(ɵɵinject(UserSettingsWebService), ɵɵinject(SearchService), ɵɵinject(MAX_DOCUMENTS, 8)); };
RecentDocumentsService.ɵprov = ɵɵdefineInjectable({ token: RecentDocumentsService, factory: RecentDocumentsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RecentDocumentsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: SearchService }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAX_DOCUMENTS]
            }] }]; }, null); })();

class BsEditSavedQuery {
    constructor(model, formBuilder) {
        this.model = model;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.nameControl = new FormControl(this.model.name, Validators.required);
        this.form = this.formBuilder.group({
            savedQueryName: this.nameControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.name = this.nameControl.value;
        });
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
}
BsEditSavedQuery.ɵfac = function BsEditSavedQuery_Factory(t) { return new (t || BsEditSavedQuery)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(FormBuilder)); };
BsEditSavedQuery.ɵcmp = ɵɵdefineComponent({ type: BsEditSavedQuery, selectors: [["sq-edit-saved-query"]], decls: 7, vars: 7, consts: [["name", "editSavedQuery", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "savedQueryName"], ["type", "text", "id", "savedQueryName", "formControlName", "savedQueryName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"]], template: function BsEditSavedQuery_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(6, "input", 4);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#editSavedQuery.title")("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 5, "msg#editSavedQuery.name"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsEditSavedQuery, [{
        type: Component,
        args: [{
                selector: "sq-edit-saved-query",
                templateUrl: "./edit-saved-query.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: FormBuilder }]; }, null); })();

function BsExportQuery_option_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "option", 11);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const format_r3 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("value", format_r3);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r0.outputFormats[format_r3].toUpperCase());
} }
function BsExportQuery_option_14_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "option", 11);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const column_r4 = ctx.$implicit;
    ɵɵproperty("value", column_r4);
    ɵɵadvance(1);
    ɵɵtextInterpolate(column_r4);
} }
function BsExportQuery_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 2);
    ɵɵelementStart(1, "label", 12);
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementStart(4, "div");
    ɵɵelementStart(5, "div", 13);
    ɵɵelementStart(6, "label", 14);
    ɵɵelementStart(7, "input", 15);
    ɵɵlistener("change", function BsExportQuery_div_21_Template_input_change_7_listener($event) { ɵɵrestoreView(_r6); const ctx_r5 = ɵɵnextContext(); return ctx_r5.sourceChanged($event, ctx_r5.sourceTypes.Result); });
    ɵɵelementEnd();
    ɵɵtext(8);
    ɵɵpipe(9, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(10, "div", 13);
    ɵɵelementStart(11, "label", 14);
    ɵɵelementStart(12, "input", 16);
    ɵɵlistener("change", function BsExportQuery_div_21_Template_input_change_12_listener($event) { ɵɵrestoreView(_r6); const ctx_r7 = ɵɵnextContext(); return ctx_r7.sourceChanged($event, ctx_r7.sourceTypes.Selection); });
    ɵɵelementEnd();
    ɵɵtext(13);
    ɵɵpipe(14, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 6, "msg#exportQuery.dialogSourceType"));
    ɵɵadvance(5);
    ɵɵproperty("checked", ctx_r2.sourceChosen(ctx_r2.sourceTypes.Result));
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(9, 8, "msg#exportQuery.dialogResult"), " ");
    ɵɵadvance(4);
    ɵɵproperty("checked", ctx_r2.sourceChosen(ctx_r2.sourceTypes.Selection))("disabled", !ctx_r2.hasSelectedRecords());
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(14, 10, "msg#exportQuery.dialogSelection"), " ");
} }
const _c0 = function (a0) { return { count: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
/**
 * Component representing the Export dialog where user can customize the query export action.
 *
 */
class BsExportQuery {
    constructor(model, formBuilder, appService, selectionService, savedQueriesService, validationService, notificationsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.selectionService = selectionService;
        this.savedQueriesService = savedQueriesService;
        this.validationService = validationService;
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.supportedFormats = [
            ExportOutputFormat.Csv,
            ExportOutputFormat.Xlsx,
            ExportOutputFormat.Json
        ];
        this.outputFormats = ExportOutputFormat;
        this.sourceTypes = ExportSourceType;
        this.maxCount = 1000; // Default max count hard coded in web service
    }
    ngOnInit() {
        this.savedQueries = [];
        for (const query of this.savedQueriesService.savedqueries) {
            this.savedQueries.push(query.name);
        }
        this.exportableColumns = [];
        if (this.appService.app) {
            const queryExportConfig = this.getDefaultQueryExportConfig(this.appService.app);
            const columns = (queryExportConfig.columns && queryExportConfig.columns['column$']) || [];
            for (const column of columns) {
                this.exportableColumns.push(column.title);
            }
            if (queryExportConfig.maxCount && Utils.isNumber(queryExportConfig.maxCount)) {
                this.maxCount = queryExportConfig.maxCount;
            }
        }
        this.form = this.formBuilder.group({
            'format': [this.supportedFormats[0]],
            'exportedColumns': [this.model.exportedColumns],
            'export': [this.model.export, Validators.required],
            'maxCount': [this.model.maxCount, Validators.compose([
                    this.validationService.integerValidator(),
                    this.validationService.minValidator(1)
                ])],
        });
        this.isDownloading = false;
        this.buttons = [
            new ModalButton({
                text: "msg#exportQuery.btnDownload",
                result: 0 /* Custom */,
                anchor: true,
                primary: true,
                action: (_button) => {
                    const observable = this.savedQueriesService.download(this.model);
                    if (observable) {
                        Utils.subscribe(observable, (response) => {
                            console.log('exportQuery.download done.');
                            this.notificationsService.info('msg#exportQuery.successNotification');
                            this.modalRef.close(-1 /* OK */);
                            return response;
                        }, (error) => {
                            console.log('exportQuery.download failure - error: ', error);
                            this.modalRef.close(error);
                        });
                        this.isDownloading = true;
                        this.changeDetectorRef.markForCheck();
                    }
                },
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            })
        ];
        const onFormChanged = () => {
            const newFormat = this.form.value['format'];
            const newMaxCount = this.form.value['maxCount'];
            const newExportedColumns = this.form.value['exportedColumns'];
            if (this.model.format !== newFormat) {
                this.model.format = newFormat;
            }
            if (this.model.maxCount !== newMaxCount) {
                this.model.maxCount = newMaxCount;
            }
            this.model.exportedColumns = newExportedColumns;
        };
        this.formChanges = Utils.subscribe(this.form.valueChanges, onFormChanged);
    }
    ngOnDestroy() {
        if (this.formChanges) {
            this.formChanges.unsubscribe();
        }
    }
    getDefaultQueryExportConfig(app) {
        let queryExport = app.queryExport;
        if (queryExport.indexOf(',') !== -1) {
            queryExport = queryExport.substring(0, queryExport.indexOf(','));
        }
        return Utils.getField(app.webServices, queryExport);
    }
    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    hasSelectedRecords() {
        return this.selectionService.haveSelectedRecords;
    }
    /**
     * Checks if the user chosen export source is the same as the given one.
     * <p>
     * Used to control the radio button state.
     *
     * @param type The source to check.
     * @returns true if the user chosen export source is the same as the given one.
     */
    sourceChosen(type) {
        return (this.model.export & type) !== 0;
    }
    /**
     * Callback called when user chooses a new export source.
     *
     * @param event The related UI event.
     * @param type The new chosen source.
     */
    sourceChanged(event, type) {
        const input = event.target;
        if (input.checked) {
            this.model.export = type;
        }
    }
    /**
     * Checks if the dialog allows user to choose export source.
     * Generally, it returns false when the input model export type is already saved query.
     *
     * @returns true if the dialog allows user to choose export source.
     */
    showSourceChooser() {
        return !this.sourceChosen(ExportSourceType.SavedQuery);
    }
}
BsExportQuery.ɵfac = function BsExportQuery_Factory(t) { return new (t || BsExportQuery)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SelectionService), ɵɵdirectiveInject(SavedQueriesService), ɵɵdirectiveInject(ValidationService), ɵɵdirectiveInject(NotificationsService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ModalRef)); };
BsExportQuery.ɵcmp = ɵɵdefineComponent({ type: BsExportQuery, selectors: [["sq-export-query"]], decls: 22, vars: 30, consts: [["name", "exportQuery", "novalidate", "", 3, "formGroup"], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["for", "format"], ["formControlName", "format", "id", "format", "sqAutofocus", "", 1, "form-control", "custom-select", 3, "sqValidation"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "exportedColumns", 3, "title"], ["id", "exportedColumns", "formControlName", "exportedColumns", "sqAutofocus", "", "multiple", "", 1, "form-control", "custom-select", 3, "sqValidation"], ["for", "maxCount", 3, "title"], ["type", "number", "id", "maxCount", "formControlName", "maxCount", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation"], ["class", "form-group sq-form-group", 4, "ngIf"], [3, "value"], ["for", "export"], [1, "form-check", "form-check-inline"], [1, "form-check-label"], ["type", "radio", 1, "form-check-input", 3, "checked", "change"], ["type", "radio", 1, "form-check-input", 3, "checked", "disabled", "change"]], template: function BsExportQuery_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(6, "select", 4);
        ɵɵtemplate(7, BsExportQuery_option_7_Template, 2, 2, "option", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(8, "div", 2);
        ɵɵelementStart(9, "label", 6);
        ɵɵpipe(10, "sqMessage");
        ɵɵtext(11);
        ɵɵpipe(12, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(13, "select", 7);
        ɵɵtemplate(14, BsExportQuery_option_14_Template, 2, 2, "option", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(15, "div", 2);
        ɵɵelementStart(16, "label", 8);
        ɵɵpipe(17, "sqMessage");
        ɵɵtext(18);
        ɵɵpipe(19, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(20, "input", 9);
        ɵɵelementEnd();
        ɵɵtemplate(21, BsExportQuery_div_21_Template, 15, 12, "div", 10);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#exportQuery.dialogTitle")("buttons", ctx.buttons)("isProcessingState", ctx.isDownloading);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 15, "msg#exportQuery.dialogOutputFormat"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.supportedFormats);
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind1(10, 17, "msg#exportQuery.exportedColumnsLabelTooltip"));
        ɵɵadvance(2);
        ɵɵtextInterpolate1(" ", ɵɵpipeBind1(12, 19, "msg#exportQuery.exportedColumns"), "\u00A0\u24D8 ");
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.exportableColumns);
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("title", ɵɵpipeBind2(17, 21, "msg#exportQuery.dialogMaxCountTooltip", ɵɵpureFunction1(28, _c1, ɵɵpureFunction1(26, _c0, ctx.maxCount))));
        ɵɵadvance(2);
        ɵɵtextInterpolate1("", ɵɵpipeBind1(19, 24, "msg#exportQuery.dialogMaxCount"), "\u00A0\u24D8");
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showSourceChooser());
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, SelectControlValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective, NgForOf, SelectMultipleControlValueAccessor, NumberValueAccessor, DefaultValueAccessor, NgIf, NgSelectOption, ɵangular_packages_forms_forms_x], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsExportQuery, [{
        type: Component,
        args: [{
                selector: 'sq-export-query',
                templateUrl: './export-query.html'
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: FormBuilder }, { type: AppService }, { type: SelectionService }, { type: SavedQueriesService }, { type: ValidationService }, { type: NotificationsService }, { type: ChangeDetectorRef }, { type: ModalRef }]; }, null); })();

function BsManageSavedQueries_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 6);
    ɵɵelementStart(1, "button", 7);
    ɵɵlistener("click", function BsManageSavedQueries_div_2_Template_button_click_1_listener() { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.reorder(); });
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageSavedQueries.edit" : "msg#manageSavedQueries.reorder"));
} }
function BsManageSavedQueries_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 16);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const savedQuery_r4 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(savedQuery_r4.name);
} }
function BsManageSavedQueries_div_5_sq_editable_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "sq-editable", 17);
    ɵɵlistener("valueChange", function BsManageSavedQueries_div_5_sq_editable_2_Template_sq_editable_valueChange_0_listener($event) { ɵɵrestoreView(_r15); const savedQuery_r4 = ɵɵnextContext().$implicit; const ctx_r13 = ɵɵnextContext(); return ctx_r13.setName(savedQuery_r4, $event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const savedQuery_r4 = ɵɵnextContext().$implicit;
    const ctx_r7 = ɵɵnextContext();
    ɵɵproperty("value", savedQuery_r4.name)("model", savedQuery_r4)("validators", ctx_r7.nameValidators);
} }
function BsManageSavedQueries_div_5_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r19 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 18);
    ɵɵlistener("click", function BsManageSavedQueries_div_5_a_4_Template_a_click_0_listener() { ɵɵrestoreView(_r19); const savedQuery_r4 = ɵɵnextContext().$implicit; const ctx_r17 = ɵɵnextContext(); return ctx_r17.export(savedQuery_r4); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "span", 19);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#manageSavedQueries.export"));
} }
function BsManageSavedQueries_div_5_a_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "a", 20);
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "span", 21);
    ɵɵelementEnd();
} if (rf & 2) {
    const savedQuery_r4 = ɵɵnextContext().$implicit;
    const ctx_r9 = ɵɵnextContext();
    ɵɵpropertyInterpolate("href", ctx_r9.savedQueriesService.rssHref(savedQuery_r4), ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 2, "msg#manageSavedQueries.rss"));
} }
function BsManageSavedQueries_div_5_a_6_Template(rf, ctx) { if (rf & 1) {
    const _r23 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 18);
    ɵɵlistener("click", function BsManageSavedQueries_div_5_a_6_Template_a_click_0_listener() { ɵɵrestoreView(_r23); const ctx_r22 = ɵɵnextContext(); const savedQuery_r4 = ctx_r22.$implicit; const $index_r5 = ctx_r22.index; const ctx_r21 = ɵɵnextContext(); return ctx_r21.remove(savedQuery_r4, $index_r5); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "span", 22);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#manageSavedQueries.remove"));
} }
function BsManageSavedQueries_div_5_span_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 23);
} }
const _c0$1 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
const _c1$1 = function (a1) { return [_c0$1, a1]; };
function BsManageSavedQueries_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtemplate(1, BsManageSavedQueries_div_5_div_1_Template, 2, 1, "div", 9);
    ɵɵtemplate(2, BsManageSavedQueries_div_5_sq_editable_2_Template, 1, 3, "sq-editable", 10);
    ɵɵelementStart(3, "div", 11);
    ɵɵtemplate(4, BsManageSavedQueries_div_5_a_4_Template, 3, 3, "a", 12);
    ɵɵtemplate(5, BsManageSavedQueries_div_5_a_5_Template, 3, 4, "a", 13);
    ɵɵtemplate(6, BsManageSavedQueries_div_5_a_6_Template, 3, 3, "a", 14);
    ɵɵtemplate(7, BsManageSavedQueries_div_5_span_7_Template, 1, 0, "span", 15);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c1$1, ctx_r1.reordering ? "cursor-move" : ""));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.reordering);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r1.reordering);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.reordering && ctx_r1.savedQueriesService.hasExportConfig());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r1.reordering && ctx_r1.savedQueriesService.hasRssEnabled());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r1.reordering);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.reordering);
} }
class BsManageSavedQueries {
    constructor(model, savedQueriesService) {
        this.model = model;
        this.savedQueriesService = savedQueriesService;
        this.reordering = false;
        this.nameValidators = [
            Validators.required,
            (control) => {
                const modelControl = control.root.get("model");
                if (modelControl) {
                    for (const item of this.model.savedQueries) {
                        if (modelControl.value === item) {
                            continue;
                        }
                        if (control.value === item.name) {
                            return {
                                unique: true
                            };
                        }
                    }
                }
                return null;
            }
        ];
    }
    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageSavedQueries.removeAll",
                result: 0 /* Custom */,
                action: (button) => {
                    this.model.savedQueries.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: "SavedQuery_DeleteAll" /* DeleteAll */
                    });
                },
                visible: this.model.savedQueries.length > 0
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    addAuditEvent(auditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }
    reorder() {
        this.reordering = !this.reordering;
    }
    setName(savedQuery, name) {
        if (!Utils.eqNC(savedQuery.name, name)) {
            this.addAuditEvent({
                type: "SavedQuery_Rename" /* Rename */,
                detail: {
                    query: name,
                    "old-name": savedQuery.name
                }
            });
            savedQuery.name = name;
        }
    }
    remove(savedQuery, index) {
        this.model.savedQueries.splice(index, 1);
        this.removeAllButton.visible = this.model.savedQueries.length > 0;
        this.addAuditEvent({
            type: "SavedQuery_Delete" /* Delete */,
            detail: {
                query: savedQuery.name
            }
        });
        return false;
    }
    export(savedQuery) {
        this.savedQueriesService.exportModal(ExportSourceType.SavedQuery, savedQuery);
        return false;
    }
    dropped(drop) {
        Utils.arrayMove(this.model.savedQueries, drop.previousIndex, drop.currentIndex);
    }
}
BsManageSavedQueries.ɵfac = function BsManageSavedQueries_Factory(t) { return new (t || BsManageSavedQueries)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(SavedQueriesService)); };
BsManageSavedQueries.ɵcmp = ɵɵdefineComponent({ type: BsManageSavedQueries, selectors: [["sq-manage-saved-queries"]], decls: 6, vars: 6, consts: [["name", "manageSavedQueries", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["cdkDrag", "", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["cdkDrag", "", 3, "ngClass"], ["class", "sq-saved-query-text", 4, "ngIf"], ["name", "msg#manageSavedQueries.name", 3, "value", "model", "validators", "valueChange", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2", "target", "_blank", 3, "href", "title", 4, "ngIf"], ["href", "#", "class", "ml-2", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], [1, "sq-saved-query-text"], ["name", "msg#manageSavedQueries.name", 3, "value", "model", "validators", "valueChange"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-download", "sq-export"], ["target", "_blank", 1, "ml-2", 3, "href", "title"], [1, "fas", "fa-rss", "sq-rss"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"]], template: function BsManageSavedQueries_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵtemplate(2, BsManageSavedQueries_div_2_Template, 4, 3, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "div", 4);
        ɵɵlistener("cdkDropListDropped", function BsManageSavedQueries_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
        ɵɵtemplate(5, BsManageSavedQueries_div_5_Template, 8, 9, "div", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#manageSavedQueries.title")("buttons", ctx.buttons);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.model.savedQueries.length);
        ɵɵadvance(2);
        ɵɵproperty("cdkDropListData", ctx.model.savedQueries)("cdkDropListDisabled", !ctx.reordering);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.model.savedQueries);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgIf, CdkDropList, NgForOf, CdkDrag, NgClass, BsEditable], pipes: [MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-saved-query-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsManageSavedQueries, [{
        type: Component,
        args: [{
                selector: "sq-manage-saved-queries",
                templateUrl: "./manage-saved-queries.html",
                styleUrls: ["./manage-saved-queries.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: SavedQueriesService }]; }, null); })();

const _c0$2 = function (a0) { return [a0]; };
const _c1$2 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
/**
 * Toolbar component for Export query feature.
 *
 */
class BsQueryExporter {
    constructor(selectionService, savedQueriesService) {
        this.selectionService = selectionService;
        this.savedQueriesService = savedQueriesService;
        this.exportAction = new Action({
            icon: 'fas fa-download',
            title: 'msg#exportQuery.btnTitle',
            action: (item, event) => {
                this.export();
            }
        });
    }
    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    hasSelectedRecords() {
        return this.selectionService.haveSelectedRecords;
    }
    /**
     * Generic export function.
     * <p>
     * Opens up a dialog to let user choose the export source, export format and other parameters.
     *
     * @memberof QueryExporter
     */
    export() {
        this.savedQueriesService.exportModal(this.hasSelectedRecords() ? ExportSourceType.Selection : ExportSourceType.Result);
    }
}
BsQueryExporter.ɵfac = function BsQueryExporter_Factory(t) { return new (t || BsQueryExporter)(ɵɵdirectiveInject(SelectionService), ɵɵdirectiveInject(SavedQueriesService)); };
BsQueryExporter.ɵcmp = ɵɵdefineComponent({ type: BsQueryExporter, selectors: [["sq-query-exporter"]], inputs: { results: "results", rightAligned: "rightAligned" }, decls: 1, vars: 6, consts: [[3, "sq-action-buttons"]], template: function BsQueryExporter_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction2(3, _c1$2, ɵɵpureFunction1(1, _c0$2, ctx.exportAction), ctx.rightAligned));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsQueryExporter, [{
        type: Component,
        args: [{
                selector: 'sq-query-exporter',
                templateUrl: './query-exporter.html'
            }]
    }], function () { return [{ type: SelectionService }, { type: SavedQueriesService }]; }, { results: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();

const _c0$3 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsSavedQueriesMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ɵɵpureFunction4(2, _c0$3, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
class BsSavedQueriesMenuComponent {
    constructor(loginService, savedQueriesService, searchService) {
        this.loginService = loginService;
        this.savedQueriesService = savedQueriesService;
        this.searchService = searchService;
        this.searchRoute = "/search";
        this.icon = "far fa-save";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        this.saveAction = new Action({
            text: "msg#savedQueries.saveCurrentQuery",
            title: "msg#savedQueries.saveCurrentQuery",
            action: () => { this.savedQueriesService.createSavedQueryModal(); }
        });
        this.manageAction = new Action({
            text: "msg#savedQueries.manageSavedQueries",
            title: "msg#savedQueries.manageSavedQueries",
            action: () => { this.savedQueriesService.manageSavedQueriesModal(); }
        });
    }
    ngOnInit() {
        this.updateMenu();
        this._savedQueriesSubscription = this.savedQueriesService.changes.subscribe({
            next: () => { this.updateMenu(); }
        });
        this._loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
        this._searchSubscription = this.searchService.resultsStream.subscribe(results => {
            this.updateMenu();
        });
    }
    ngOnDestroy() {
        if (this._savedQueriesSubscription) {
            this._savedQueriesSubscription.unsubscribe();
        }
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
        }
        if (this._searchSubscription) {
            this._searchSubscription.unsubscribe();
        }
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        const savedQueriesActions = [];
        if (this.savedQueriesService.hasSavedQuery) {
            const scrollGroup = new Action({
                scrollGroup: true,
                children: this.savedQueriesService.savedqueries.map(savedQuery => new Action({
                    text: savedQuery.name,
                    title: savedQuery.name,
                    data: savedQuery,
                    action: item => this.savedQueriesService.searchSavedQuery(item.data, this.searchRoute)
                }))
            });
            savedQueriesActions.push(scrollGroup);
        }
        if (!!this.searchService.results) {
            savedQueriesActions.push(this.saveAction);
        }
        if (this.savedQueriesService.hasSavedQuery) {
            savedQueriesActions.push(this.manageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#savedQueries.savedQueries",
            children: savedQueriesActions
        });
    }
}
BsSavedQueriesMenuComponent.ɵfac = function BsSavedQueriesMenuComponent_Factory(t) { return new (t || BsSavedQueriesMenuComponent)(ɵɵdirectiveInject(LoginService), ɵɵdirectiveInject(SavedQueriesService), ɵɵdirectiveInject(SearchService)); };
BsSavedQueriesMenuComponent.ɵcmp = ɵɵdefineComponent({ type: BsSavedQueriesMenuComponent, selectors: [["sq-saved-queries-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsSavedQueriesMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsSavedQueriesMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [NgIf, BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSavedQueriesMenuComponent, [{
        type: Component,
        args: [{
                selector: 'sq-saved-queries-menu',
                templateUrl: './saved-queries-menu.component.html'
            }]
    }], function () { return [{ type: LoginService }, { type: SavedQueriesService }, { type: SearchService }]; }, { searchRoute: [{
            type: Input
        }], icon: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

function BsFacetSavedQueries_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1("\"", query_r2.query.text, "\"");
} }
function BsFacetSavedQueries_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 8);
    ɵɵlistener("click", function BsFacetSavedQueries_a_1_i_4_Template_i_click_0_listener($event) { ɵɵrestoreView(_r8); const query_r2 = ɵɵnextContext().$implicit; const ctx_r6 = ɵɵnextContext(); return ctx_r6.deleteQuery(query_r2, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵproperty("title", ɵɵpipeBind1(1, 1, "msg#savedQueries.delete"));
} }
const _c0$4 = function (a0) { return [a0]; };
function BsFacetSavedQueries_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 3);
    ɵɵlistener("click", function BsFacetSavedQueries_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r10); const query_r2 = ctx.$implicit; const ctx_r9 = ɵɵnextContext(); return ctx_r9.openSavedQuery(query_r2); });
    ɵɵelementStart(1, "span", 4);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsFacetSavedQueries_a_1_span_3_Template, 2, 1, "span", 5);
    ɵɵtemplate(4, BsFacetSavedQueries_a_1_i_4_Template, 2, 3, "i", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("routerLink", ɵɵpureFunction1(7, _c0$4, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(query_r2))("state", ctx_r0.getRouterState(query_r2));
    ɵɵadvance(1);
    ɵɵproperty("title", query_r2.name);
    ɵɵadvance(1);
    ɵɵtextInterpolate(query_r2.name);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", query_r2.query.text);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.enableDelete);
} }
function BsFacetSavedQueries_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#savedQueries.noSavedQuery"), " ");
} }
class BsFacetSavedQueries extends AbstractFacet {
    constructor(savedQueriesService) {
        super();
        this.savedQueriesService = savedQueriesService;
        this.searchRoute = "/search";
        this.maxQueries = 5;
        this.enableDelete = true;
        this.page = 0;
        this.manageSavedQueries = new Action({
            icon: "fas fa-cog",
            title: "msg#savedQueries.manageSavedQueries",
            action: () => {
                this.savedQueriesService.manageSavedQueriesModal();
            }
        });
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.savedQueriesService.savedqueries.length / this.maxQueries) - 1);
    }
    get startIndex() {
        return this.page * this.maxQueries;
    }
    get endIndex() {
        return (this.page + 1) * this.maxQueries;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage, this.manageSavedQueries];
    }
    openSavedQuery(query) {
        this.savedQueriesService.notifyOpenSavedQuery(query);
        return true;
    }
    deleteQuery(query, event) {
        event.stopPropagation();
        this.savedQueriesService.deleteSavedQuery(query);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    getQueryParams(savedQuery) {
        const query = this.savedQueriesService.searchService.makeQuery(savedQuery.query);
        const queryParams = query.toJsonForQueryString();
        return { query: queryParams };
    }
    getRouterState(savedQuery) {
        return {
            audit: {
                type: "Search_SavedQuery" /* Search */,
                detail: {
                    "saved-query": savedQuery.name
                }
            }
        };
    }
}
BsFacetSavedQueries.ɵfac = function BsFacetSavedQueries_Factory(t) { return new (t || BsFacetSavedQueries)(ɵɵdirectiveInject(SavedQueriesService)); };
BsFacetSavedQueries.ɵcmp = ɵɵdefineComponent({ type: BsFacetSavedQueries, selectors: [["sq-facet-saved-queries"]], inputs: { searchRoute: "searchRoute", maxQueries: "maxQueries", enableDelete: "enableDelete" }, features: [ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "saved-query-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "saved-query-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "query-name", "mr-auto", "text-truncate", 3, "title"], ["class", "query-text text-muted small font-italic text-right text-truncate ml-2", 4, "ngIf"], ["class", "query-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "query-text", "text-muted", "small", "font-italic", "text-right", "text-truncate", "ml-2"], [1, "query-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetSavedQueries_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsFacetSavedQueries_a_1_Template, 5, 9, "a", 1);
        ɵɵpipe(2, "slice");
        ɵɵtemplate(3, BsFacetSavedQueries_div_3_Template, 3, 3, "div", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 2, ctx.savedQueriesService.savedqueries, ctx.startIndex, ctx.endIndex));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.savedQueriesService.savedqueries.length == 0);
    } }, directives: [NgForOf, NgIf, RouterLinkWithHref], pipes: [SlicePipe, MessagePipe], styles: [".saved-query-item[_ngcontent-%COMP%]   .query-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.saved-query-item[_ngcontent-%COMP%]:hover   .query-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetSavedQueries, [{
        type: Component,
        args: [{
                selector: 'sq-facet-saved-queries',
                templateUrl: './facet-saved-queries.html',
                styles: [`
.saved-query-item .query-delete{
    opacity: 0;
}

.saved-query-item:hover .query-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: SavedQueriesService }]; }, { searchRoute: [{
            type: Input
        }], maxQueries: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }] }); })();

function BsFacetRecentQueries_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 8);
    ɵɵtext(1);
    ɵɵpipe(2, "sqDate");
    ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, query_r2.date));
} }
function BsFacetRecentQueries_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 9);
    ɵɵlistener("click", function BsFacetRecentQueries_a_1_i_4_Template_i_click_0_listener($event) { ɵɵrestoreView(_r9); const query_r2 = ɵɵnextContext().$implicit; const ctx_r7 = ɵɵnextContext(); return ctx_r7.saveQuery(query_r2, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵproperty("title", ɵɵpipeBind1(1, 1, "msg#recentQueries.save"));
} }
function BsFacetRecentQueries_a_1_i_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 10);
    ɵɵlistener("click", function BsFacetRecentQueries_a_1_i_5_Template_i_click_0_listener($event) { ɵɵrestoreView(_r12); const query_r2 = ɵɵnextContext().$implicit; const ctx_r10 = ɵɵnextContext(); return ctx_r10.deleteQuery(query_r2, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵproperty("title", ɵɵpipeBind1(1, 1, "msg#recentQueries.delete"));
} }
const _c0$5 = function (a0) { return [a0]; };
function BsFacetRecentQueries_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 3);
    ɵɵlistener("click", function BsFacetRecentQueries_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r14); const query_r2 = ctx.$implicit; const ctx_r13 = ɵɵnextContext(); return ctx_r13.openRecentQuery(query_r2); });
    ɵɵelementStart(1, "span", 4);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsFacetRecentQueries_a_1_span_3_Template, 3, 3, "span", 5);
    ɵɵtemplate(4, BsFacetRecentQueries_a_1_i_4_Template, 2, 3, "i", 6);
    ɵɵtemplate(5, BsFacetRecentQueries_a_1_i_5_Template, 2, 3, "i", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("routerLink", ɵɵpureFunction1(8, _c0$5, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(query_r2.query))("state", ctx_r0.getRouterState(query_r2.query));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", query_r2.query.text);
    ɵɵadvance(1);
    ɵɵtextInterpolate(query_r2.query.text);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", query_r2.date);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.enableSave);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.enableDelete);
} }
function BsFacetRecentQueries_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#recentQueries.noRecentQuery"), " ");
} }
class BsFacetRecentQueries extends AbstractFacet {
    constructor(searchService, recentQueriesService, savedQueriesService) {
        super();
        this.searchService = searchService;
        this.recentQueriesService = recentQueriesService;
        this.savedQueriesService = savedQueriesService;
        this.searchRoute = "/search";
        this.maxQueries = 5;
        this.enableDelete = true;
        this.enableSave = true;
        this.page = 0;
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.recentQueriesService.recentqueries.length / this.maxQueries) - 1);
    }
    get startIndex() {
        return this.page * this.maxQueries;
    }
    get endIndex() {
        return (this.page + 1) * this.maxQueries;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage];
    }
    openRecentQuery(query) {
        this.recentQueriesService.notifyOpenRecentQuery(query);
        return true;
    }
    deleteQuery(query, event) {
        event.stopPropagation();
        this.recentQueriesService.deleteRecentQuery(query);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    saveQuery(query, event) {
        event.stopPropagation();
        const q = Utils.extend(this.searchService.makeQuery(), Utils.copy(query.query));
        this.savedQueriesService.createSavedQueryModal(q);
        return false;
    }
    getQueryParams(recentQuery) {
        const query = this.searchService.makeQuery(recentQuery);
        const queryParams = query.toJsonForQueryString();
        return { query: queryParams };
    }
    getRouterState(recentQuery) {
        return {
            audit: {
                type: "Search_RecentQuery" /* Search */,
                detail: {
                    recentquery: recentQuery.text
                }
            }
        };
    }
}
BsFacetRecentQueries.ɵfac = function BsFacetRecentQueries_Factory(t) { return new (t || BsFacetRecentQueries)(ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(RecentQueriesService), ɵɵdirectiveInject(SavedQueriesService)); };
BsFacetRecentQueries.ɵcmp = ɵɵdefineComponent({ type: BsFacetRecentQueries, selectors: [["sq-facet-recent-queries"]], inputs: { searchRoute: "searchRoute", maxQueries: "maxQueries", enableDelete: "enableDelete", enableSave: "enableSave" }, features: [ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "recent-query-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "recent-query-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "query-text", "mr-auto", "text-truncate", 3, "title"], ["class", "query-date ml-2 text-muted small text-right", 4, "ngIf"], ["class", "query-save ml-2 far fa-save", 3, "title", "click", 4, "ngIf"], ["class", "query-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "query-date", "ml-2", "text-muted", "small", "text-right"], [1, "query-save", "ml-2", "far", "fa-save", 3, "title", "click"], [1, "query-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetRecentQueries_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsFacetRecentQueries_a_1_Template, 6, 10, "a", 1);
        ɵɵpipe(2, "slice");
        ɵɵtemplate(3, BsFacetRecentQueries_div_3_Template, 3, 3, "div", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 2, ctx.recentQueriesService.recentqueries, ctx.startIndex, ctx.endIndex));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.recentQueriesService.recentqueries.length == 0);
    } }, directives: [NgForOf, NgIf, RouterLinkWithHref], pipes: [SlicePipe, DatePipe, MessagePipe], styles: [".recent-query-item[_ngcontent-%COMP%]   .query-delete[_ngcontent-%COMP%], .recent-query-item[_ngcontent-%COMP%]   .query-save[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.recent-query-item[_ngcontent-%COMP%]:hover   .query-delete[_ngcontent-%COMP%], .recent-query-item[_ngcontent-%COMP%]:hover   .query-save[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetRecentQueries, [{
        type: Component,
        args: [{
                selector: 'sq-facet-recent-queries',
                templateUrl: './facet-recent-queries.html',
                styles: [`
.recent-query-item .query-delete, .recent-query-item .query-save{
    opacity: 0;
}

.recent-query-item:hover .query-delete, .recent-query-item:hover .query-save{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: SearchService }, { type: RecentQueriesService }, { type: SavedQueriesService }]; }, { searchRoute: [{
            type: Input
        }], maxQueries: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }], enableSave: [{
            type: Input
        }] }); })();

function BsFacetRecentDocuments_ng_container_1_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 9);
    ɵɵtext(1);
    ɵɵpipe(2, "sqDate");
    ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = ɵɵnextContext(2).$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, document_r2.date));
} }
function BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 10);
    ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template_i_click_0_listener($event) { ɵɵrestoreView(_r11); const document_r2 = ɵɵnextContext(2).$implicit; const ctx_r9 = ɵɵnextContext(); return ctx_r9.deleteDocument(document_r2, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵproperty("title", ɵɵpipeBind1(1, 1, "msg#recentDocuments.delete"));
} }
function BsFacetRecentDocuments_ng_container_1_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 5);
    ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r14); const document_r2 = ɵɵnextContext().$implicit; const ctx_r12 = ɵɵnextContext(); return ctx_r12.openRecentDocument(document_r2); });
    ɵɵelementStart(1, "span", 6);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsFacetRecentDocuments_ng_container_1_a_1_span_3_Template, 3, 3, "span", 7);
    ɵɵtemplate(4, BsFacetRecentDocuments_ng_container_1_a_1_i_4_Template, 2, 3, "i", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = ɵɵnextContext().$implicit;
    const ctx_r3 = ɵɵnextContext();
    ɵɵattribute("href", document_r2.url1, ɵɵsanitizeUrl);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", document_r2.title);
    ɵɵadvance(1);
    ɵɵtextInterpolate(document_r2.title);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", document_r2.date);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r3.enableDelete);
} }
function BsFacetRecentDocuments_ng_container_1_ng_template_2_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 9);
    ɵɵtext(1);
    ɵɵpipe(2, "sqDate");
    ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = ɵɵnextContext(2).$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, document_r2.date));
} }
function BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 10);
    ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template_i_click_0_listener($event) { ɵɵrestoreView(_r21); const document_r2 = ɵɵnextContext(2).$implicit; const ctx_r19 = ɵɵnextContext(); return ctx_r19.deleteDocument(document_r2, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵproperty("title", ɵɵpipeBind1(1, 1, "msg#recentDocuments.delete"));
} }
function BsFacetRecentDocuments_ng_container_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r24 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 11);
    ɵɵlistener("click", function BsFacetRecentDocuments_ng_container_1_ng_template_2_Template_a_click_0_listener() { ɵɵrestoreView(_r24); const document_r2 = ɵɵnextContext().$implicit; const ctx_r22 = ɵɵnextContext(); return ctx_r22.openRecentDocument(document_r2); });
    ɵɵelementStart(1, "span", 6);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsFacetRecentDocuments_ng_container_1_ng_template_2_span_3_Template, 3, 3, "span", 7);
    ɵɵtemplate(4, BsFacetRecentDocuments_ng_container_1_ng_template_2_i_4_Template, 2, 3, "i", 8);
    ɵɵelementEnd();
} if (rf & 2) {
    const document_r2 = ɵɵnextContext().$implicit;
    const ctx_r5 = ɵɵnextContext();
    ɵɵproperty("routerLink", ctx_r5.searchRoute)("queryParams", ctx_r5.getQueryParams(document_r2));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", document_r2.title);
    ɵɵadvance(1);
    ɵɵtextInterpolate(document_r2.title);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", document_r2.date);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r5.enableDelete);
} }
function BsFacetRecentDocuments_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, BsFacetRecentDocuments_ng_container_1_a_1_Template, 5, 5, "a", 3);
    ɵɵtemplate(2, BsFacetRecentDocuments_ng_container_1_ng_template_2_Template, 5, 6, "ng-template", null, 4, ɵɵtemplateRefExtractor);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const document_r2 = ctx.$implicit;
    const _r4 = ɵɵreference(3);
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.openOriginal && document_r2.url1)("ngIfElse", _r4);
} }
function BsFacetRecentDocuments_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 12);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#recentDocuments.noRecentDocument"), " ");
} }
class BsFacetRecentDocuments extends AbstractFacet {
    constructor(recentDocumentsService, searchService) {
        super();
        this.recentDocumentsService = recentDocumentsService;
        this.searchService = searchService;
        this.searchRoute = "/preview";
        this.maxDocuments = 5;
        this.enableDelete = true;
        this.openOriginal = false;
        this.documentOpened = new EventEmitter();
        this.page = 0;
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.recentDocumentsService.recentdocuments.length / this.maxDocuments) - 1);
    }
    get startIndex() {
        return this.page * this.maxDocuments;
    }
    get endIndex() {
        return (this.page + 1) * this.maxDocuments;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage];
    }
    openRecentDocument(document) {
        if (this.openOriginal && !!document.url1) {
            this.searchService.notifyOpenOriginalDocument(document);
        }
        this.documentOpened.emit(document); // Can be use to trigger actions, like the preview
        return true;
    }
    deleteDocument(document, event) {
        this.recentDocumentsService.deleteRecentDocument(document);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    getQueryParams(document) {
        return {
            id: document.id,
            query: this.searchService.makeQuery().toJsonForQueryString()
        };
    }
}
BsFacetRecentDocuments.ɵfac = function BsFacetRecentDocuments_Factory(t) { return new (t || BsFacetRecentDocuments)(ɵɵdirectiveInject(RecentDocumentsService), ɵɵdirectiveInject(SearchService)); };
BsFacetRecentDocuments.ɵcmp = ɵɵdefineComponent({ type: BsFacetRecentDocuments, selectors: [["sq-facet-recent-documents"]], inputs: { searchRoute: "searchRoute", maxDocuments: "maxDocuments", enableDelete: "enableDelete", openOriginal: "openOriginal" }, outputs: { documentOpened: "documentOpened" }, features: [ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], [4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], ["class", "recent-document-item list-group-item list-group-item-action d-flex align-items-center", "target", "_blank", "rel", "noopener", 3, "click", 4, "ngIf", "ngIfElse"], ["internalLink", ""], ["target", "_blank", "rel", "noopener", 1, "recent-document-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "click"], [1, "document-text", "mr-auto", "text-truncate", 3, "title"], ["class", "document-date ml-2 text-muted small text-right", 4, "ngIf"], ["class", "document-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "document-date", "ml-2", "text-muted", "small", "text-right"], [1, "document-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "recent-document-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetRecentDocuments_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsFacetRecentDocuments_ng_container_1_Template, 4, 2, "ng-container", 1);
        ɵɵpipe(2, "slice");
        ɵɵtemplate(3, BsFacetRecentDocuments_div_3_Template, 3, 3, "div", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 2, ctx.recentDocumentsService.recentdocuments, ctx.startIndex, ctx.endIndex));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.recentDocumentsService.recentdocuments.length == 0);
    } }, directives: [NgForOf, NgIf, RouterLinkWithHref], pipes: [SlicePipe, DatePipe, MessagePipe], styles: [".recent-document-item[_ngcontent-%COMP%]   .document-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.recent-document-item[_ngcontent-%COMP%]:hover   .document-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetRecentDocuments, [{
        type: Component,
        args: [{
                selector: 'sq-facet-recent-documents',
                templateUrl: './facet-recent-documents.html',
                styles: [`
.recent-document-item .document-delete{
    opacity: 0;
}

.recent-document-item:hover .document-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: RecentDocumentsService }, { type: SearchService }]; }, { searchRoute: [{
            type: Input
        }], maxDocuments: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }], openOriginal: [{
            type: Input
        }], documentOpened: [{
            type: Output
        }] }); })();

class BsSavedQueriesModule {
}
BsSavedQueriesModule.ɵmod = ɵɵdefineNgModule({ type: BsSavedQueriesModule });
BsSavedQueriesModule.ɵinj = ɵɵdefineInjector({ factory: function BsSavedQueriesModule_Factory(t) { return new (t || BsSavedQueriesModule)(); }, providers: [
        {
            provide: SAVEDQUERY_COMPONENTS,
            useValue: {
                editSavedQueryModal: BsEditSavedQuery,
                manageSavedQueriesModal: BsManageSavedQueries,
                exportSavedQueryModal: BsExportQuery
            }
        }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            DragDropModule,
            BsModalModule,
            IntlModule,
            ValidationModule,
            RouterModule,
            BsSelectionModule,
            BsModalModule,
            UtilsModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsSavedQueriesModule, { declarations: [BsEditSavedQuery, BsManageSavedQueries,
        BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
        BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,
        BsModalModule,
        IntlModule,
        ValidationModule,
        RouterModule,
        BsSelectionModule,
        BsModalModule,
        UtilsModule,
        BsActionModule], exports: [BsEditSavedQuery, BsManageSavedQueries,
        BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
        BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSavedQueriesModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    DragDropModule,
                    BsModalModule,
                    IntlModule,
                    ValidationModule,
                    RouterModule,
                    BsSelectionModule,
                    BsModalModule,
                    UtilsModule,
                    BsActionModule
                ],
                declarations: [
                    BsEditSavedQuery, BsManageSavedQueries,
                    BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                    BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
                ],
                exports: [
                    BsEditSavedQuery, BsManageSavedQueries,
                    BsExportQuery, BsQueryExporter, BsSavedQueriesMenuComponent,
                    BsFacetSavedQueries, BsFacetRecentQueries, BsFacetRecentDocuments
                ],
                providers: [
                    {
                        provide: SAVEDQUERY_COMPONENTS,
                        useValue: {
                            editSavedQueryModal: BsEditSavedQuery,
                            manageSavedQueriesModal: BsManageSavedQueries,
                            exportSavedQueryModal: BsExportQuery
                        }
                    }
                ]
            }]
    }], null, null); })();

var _enSavedQueries = {
    "savedQueries": {
        "savedQueries": "Saved Queries",
        "saveCurrentQuery": "Save Current Query",
        "manageSavedQueries": "Manage Saved Queries",
        "savedQueryAlreadyExists": "A saved query with that name already exists. Would you like to replace it?",
        "noSavedQuery": "You have not yet saved a search query...",
        "delete": "Delete this saved query"
    },
    "recentQueries": {
        "noRecentQuery": "You have not yet searched for something...",
        "delete": "Delete this recent query",
        "save": "Save this query"
    },
    "recentDocuments": {
        "recentDocuments": "Recent documents",
        "noRecentDocument": "You have not yet opened a document...",
        "delete": "Delete this recent document"
    },
    "editSavedQuery": {
        "title": "Saved Query",
        "name": "Name"
    },
    "exportQuery": {
        "dialogTitle": "Export",
        "dialogOutputFormat": "Output format",
        "dialogMaxCount": "Max rows",
        "dialogSourceType": "Export from",
        "dialogResult": "Current result",
        "dialogSelection": "Current selection",
        "btnTitle": "Export results",
        "exportResult": "Export result as {type}",
        "exportSelection": "Export selection as {type}",
        "btnDownload": "Download",
        "btnClose": "Close",
        "successNotification": "Download complete",
        "exportedColumns": "Columns to export",
        "exportedColumnsLabelTooltip": "Select the columns that you want to export, an empty selection means exporting all columns",
        "dialogMaxCountTooltip": "By default, the number of results is limited to {count}"
    },
    "manageSavedQueries": {
        "title": "Manage Saved Queries",
        "edit": "Edit",
        "reorder": "Reorder",
        "remove": "Remove",
        "removeAll": "Remove all",
        "export": "Export",
        "name": "Name",
        "rss": "RSS Feed"
    },
};

var _frSavedQueries = {
    "savedQueries": {
        "savedQueries": "Requêtes sauvegardées",
        "saveCurrentQuery": "Enregistrer la requête courante",
        "manageSavedQueries": "Gérer les requêtes sauvegardées",
        "savedQueryAlreadyExists": "Une requête sauvegardée avec ce nom existe déjà. Voulez-vous la remplacer ?",
        "noSavedQuery": "Vous n'avez pas encore enregistré de requête de recherche...",
        "delete": "Supprimer cette requête enregistrée"
    },
    "recentQueries": {
        "noRecentQuery": "Vous n'avez pas encore effectué de recherche...",
        "delete": "Supprimer cette requête",
        "save": "Enregistrer cette requête"
    },
    "recentDocuments": {
        "recentDocuments": "Documents récents",
        "noRecentDocument": "Vous n'avez pas encore ouvert de document...",
        "delete": "Supprimer ce document récent"
    },
    "editSavedQuery": {
        "title": "Requête sauvegardée",
        "name": "Nom"
    },
    "exportQuery": {
        "dialogTitle": "Export",
        "dialogOutputFormat": "Format de sortie",
        "dialogMaxCount": "Nb max de lignes",
        "dialogSourceType": "Exporter depuis",
        "dialogResult": "Résultat courant",
        "dialogSelection": "Sélection courante",
        "btnTitle": "Exporter les résultats",
        "exportResult": "Exporter le résultat en {type}",
        "exportSelection": "Exporter la sélection en {type}",
        "btnDownload": "Télécharger",
        "btnClose": "Fermer",
        "successNotification": "Téléchargement terminé",
        "exportedColumns": "Colonnes à exporter",
        "exportedColumnsLabelTooltip": "Sélectionnez les colonnes que vous souhaitez exporter, une sélection vide signifie la sélection de tous le colonnes",
        "dialogMaxCountTooltip": "Par défaut, le nombre de résultats est limité à {count}"
    },
    "manageSavedQueries": {
        "title": "Gérer les requêtes sauvegardées",
        "edit": "Editer",
        "reorder": "Réorganiser",
        "remove": "Effacer",
        "removeAll": "Effacer tout",
        "export": "Exporter",
        "name": "Nom",
        "rss": "Flux RSS"
    },
};

var _deSavedQueries = {
    "savedQueries": {
        "savedQueries": "Gespeicherte Suchanfragen",
        "saveCurrentQuery": "Aktuelle Suchanfrage speichern",
        "manageSavedQueries": "Aktuelle Suchanfragen verwalten",
        "savedQueryAlreadyExists": "Es existiert bereits eine Suchanfrage mit diesem Namen. Möchten Sie sie ersetzen?",
        "noSavedQuery": "Sie haben noch keine Suchanfrage gespeichert...",
        "delete": "Löschen Sie diese gespeicherte Suche"
    },
    "recentQueries": {
        "noRecentQuery": "Sie haben noch keine Suche durchgeführt...",
        "delete": "Löschen Sie diese letzte Suche",
        "save": "Speichern Sie diese letzte Suche"
    },
    "recentDocuments": {
        "recentDocuments": "Kürzlich angesehenes Dokument",
        "noRecentDocument": "Sie haben kein Dokument angezeigt",
        "delete": "Löschen Sie dieses kürzlich angezeigte Dokument"
    },
    "editSavedQuery": {
        "title": "Gespeicherte Suchanfrage",
        "name": "Name"
    },
    "exportQuery": {
        "dialogTitle": "Export",
        "dialogOutputFormat": "Ausgabeformat",
        "dialogMaxCount": "Maximale Anzahl der Zeilen",
        "dialogSourceType": "Exportiere ...",
        "dialogResult": "aktuelle Ergebnisliste",
        "dialogSelection": "aktuelle Auswahl",
        "btnTitle": "Export",
        "exportResult": "Exportiere die Ergebnisliste als {type}",
        "exportSelection": "Exportiere die Auswahl als {type}",
        "btnDownload": "Herunterladen",
        "btnClose": "Schließen",
        "successNotification": "Herunterladen beendet",
        "exportedColumns": "Zu exportierende Spalten",
        "exportedColumnsLabelTooltip": "Wählen Sie die Spalten aus, die Sie exportieren möchten. Eine leere Auswahl bedeutet, dass alle Spalten exportiert werden",
        "dialogMaxCountTooltip": "Standardmäßig ist die Anzahl der Ergebnisse auf {count} begrenzt"
    },
    "manageSavedQueries": {
        "title": "Gespeicherte Suchanfragen verwalten",
        "edit": "Bearbeiten",
        "reorder": "Neu sortieren",
        "remove": "Entfernen",
        "removeAll": "Alle entfernen",
        "export": "Exportieren",
        "name": "Name",
        "rss": "RSS-Feed"
    },
};

const enSavedQueries = Utils.merge({}, _enSavedQueries, enSearch, enSelection, enModal);
const frSavedQueries = Utils.merge({}, _frSavedQueries, frSearch, frSelection, frModal);
const deSavedQueries = Utils.merge({}, _deSavedQueries, deSearch, deSelection, deModal);

/**
 * Generated bundle index. Do not edit.
 */

export { BsEditSavedQuery, BsExportQuery, BsFacetRecentDocuments, BsFacetRecentQueries, BsFacetSavedQueries, BsManageSavedQueries, BsQueryExporter, BsSavedQueriesMenuComponent, BsSavedQueriesModule, MAX_DOCUMENTS, MAX_QUERIES, RECENT_DOCUMENTS_CHANGE_EVENTS, RECENT_QUERIES_CHANGE_EVENTS, RecentDocumentsService, RecentQueriesService, SAVEDQUERY_COMPONENTS, SAVED_QUERIES_CHANGE_EVENTS, SavedQueriesService, deSavedQueries, enSavedQueries, frSavedQueries };
//# sourceMappingURL=sinequa-components-saved-queries.js.map
