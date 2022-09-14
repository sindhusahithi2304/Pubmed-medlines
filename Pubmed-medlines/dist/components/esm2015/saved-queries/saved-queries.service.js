import { Injectable, InjectionToken, Inject } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { ExportSourceType, ExportOutputFormat } from "@sinequa/core/web-services";
import { Query } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/core/modal";
import * as i4 from "@sinequa/core/app-utils";
import * as i5 from "@sinequa/components/selection";
// Types of events triggering a change event
export const SAVED_QUERIES_CHANGE_EVENTS = [
    "SavedQuery_Add" /* Add */,
    "SavedQuery_Delete" /* Delete */,
    "SavedQuery_DeleteAll" /* DeleteAll */,
    "SavedQuery_Rename" /* Rename */,
    "SavedQuery_Update" /* Update */
];
export const SAVEDQUERY_COMPONENTS = new InjectionToken('SAVEDQUERY_COMPONENTS');
export class SavedQueriesService {
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
SavedQueriesService.ɵfac = function SavedQueriesService_Factory(t) { return new (t || SavedQueriesService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.ModalService), i0.ɵɵinject(i4.AppService), i0.ɵɵinject(i1.QueryExportWebService), i0.ɵɵinject(i1.DownloadWebService), i0.ɵɵinject(i5.SelectionService), i0.ɵɵinject(SAVEDQUERY_COMPONENTS)); };
SavedQueriesService.ɵprov = i0.ɵɵdefineInjectable({ token: SavedQueriesService, factory: SavedQueriesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SavedQueriesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3.ModalService }, { type: i4.AppService }, { type: i1.QueryExportWebService }, { type: i1.DownloadWebService }, { type: i5.SelectionService }, { type: undefined, decorators: [{
                type: Inject,
                args: [SAVEDQUERY_COMPONENTS]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtcXVlcmllcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2F2ZWQtcXVlcmllcy8iLCJzb3VyY2VzIjpbInNhdmVkLXF1ZXJpZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQWtCLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBQyxPQUFPLEVBQWMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBZ0QsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQzNDLE1BQU0sNEJBQTRCLENBQUM7QUFFbkYsT0FBTyxFQUFhLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzFELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUd6QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUF1QmxELDRDQUE0QztBQUM1QyxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBRzs7Ozs7O0NBTTFDLENBQUM7QUF5REYsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQXVCLHVCQUF1QixDQUFDLENBQUM7QUFNdkcsTUFBTSxPQUFPLG1CQUFtQjtJQVE1QixZQUNXLG1CQUEyQyxFQUMzQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixVQUFzQixFQUN0QixrQkFBeUMsRUFDekMsZUFBbUMsRUFDbkMsZ0JBQWtDLEVBQ0gsb0JBQTBDO1FBUHpFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBd0I7UUFDM0Msa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXVCO1FBQ3pDLG9CQUFlLEdBQWYsZUFBZSxD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USxNQUFNO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdCwgVHlwZSwgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtTdWJqZWN0LCBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlLCBRdWVyeUV4cG9ydFdlYlNlcnZpY2UsIEV4cG9ydFNvdXJjZVR5cGUsIEV4cG9ydE91dHB1dEZvcm1hdCxcbiAgICBEb3dubG9hZFdlYlNlcnZpY2UsIEF1ZGl0RXZlbnRzLCBBdWRpdEV2ZW50fSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7TW9kYWxTZXJ2aWNlLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7QXBwU2VydmljZSwgUXVlcnl9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtTZWxlY3Rpb25TZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWxlY3Rpb25cIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQge0FjdGlvbn0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb24nO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2F2ZWRRdWVyeSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHF1ZXJ5OiBRdWVyeTtcbn1cblxuLy8gZnJvbSBjb3JlL21vZGVscy9hdWRpdFxuZXhwb3J0IGNvbnN0IGVudW0gU2F2ZWRRdWVyeUV2ZW50VHlwZSB7XG4gICAgTG9hZGVkID0gXCJTYXZlZFF1ZXJ5X0xvYWRlZFwiLFxuICAgIFBhdGNoZWQgPSBcIlNhdmVkUXVlcnlfUGF0Y2hlZFwiLFxuXG4gICAgQWRkID0gXCJTYXZlZFF1ZXJ5X0FkZFwiLFxuICAgIERlbGV0ZSA9IFwiU2F2ZWRRdWVyeV9EZWxldGVcIixcbiAgICBEZWxldGVBbGwgPSBcIlNhdmVkUXVlcnlfRGVsZXRlQWxsXCIsXG4gICAgUmVuYW1lID0gXCJTYXZlZFF1ZXJ5X1JlbmFtZVwiLFxuICAgIFVwZGF0ZSA9IFwiU2F2ZWRRdWVyeV9VcGRhdGVcIixcblxuICAgIFNlYXJjaCA9IFwiU2VhcmNoX1NhdmVkUXVlcnlcIlxufVxuXG4vLyBUeXBlcyBvZiBldmVudHMgdHJpZ2dlcmluZyBhIGNoYW5nZSBldmVudFxuZXhwb3J0IGNvbnN0IFNBVkVEX1FVRVJJRVNfQ0hBTkdFX0VWRU5UUyA9IFtcbiAgICBTYXZlZFF1ZXJ5RXZlbnRUeXBlLkFkZCxcbiAgICBTYXZlZFF1ZXJ5RXZlbnRUeXBlLkRlbGV0ZSxcbiAgICBTYXZlZFF1ZXJ5RXZlbnRUeXBlLkRlbGV0ZUFsbCxcbiAgICBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlJlbmFtZSxcbiAgICBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlVwZGF0ZVxuXTtcblxuXG4vLyBDUlVEIEV2ZW50c1xuZXhwb3J0IGludGVyZmFjZSBTYXZlZFF1ZXJ5Q2hhbmdlRXZlbnQge1xuICAgIHR5cGU6IFNhdmVkUXVlcnlFdmVudFR5cGU7XG4gICAgc2F2ZWRxdWVyeT86IFNhdmVkUXVlcnk7XG59XG5cblxuLy8gTW9kZWwgZXhwZWN0ZWQgYnkgdGhlIE1hbmFnZVNhdmVkUXVlcmllcyBNb2RhbC5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuYWdlU2F2ZWRRdWVyaWVzTW9kZWwge1xuICAgIHNhdmVkUXVlcmllczogU2F2ZWRRdWVyeVtdO1xuICAgIGF1ZGl0RXZlbnRzPzogQXVkaXRFdmVudFtdO1xufVxuXG4vLyBEYXRhIG1vZGVsIG9mIHRoZSBFeHBvcnQgZGlhbG9nLlxuZXhwb3J0IGludGVyZmFjZSBFeHBvcnRRdWVyeU1vZGVsIHtcbiAgICBmb3JtYXQ6IEV4cG9ydE91dHB1dEZvcm1hdDtcbiAgICBleHBvcnQ6IEV4cG9ydFNvdXJjZVR5cGU7XG4gICAgd2ViU2VydmljZTogc3RyaW5nO1xuICAgIG1heENvdW50PzogbnVtYmVyO1xuICAgIHF1ZXJ5TmFtZT86IHN0cmluZztcbiAgICBleHBvcnRlZENvbHVtbnM/OiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBUaGUgbW9kYWwgdHlwZXMgYXJlIHVua25vd24gdG8gdGhpcyBzZXJ2aWNlLlxuICogVGhlIG1vZHVsZSB1c2luZyB0aGlzIHNlcnZpY2UgbXVzdCBwcm92aWRlIHRoZXNlIGNvbXBvbmVudHNcbiAqIGluIHRoZWlyIGZvclJvb3QoKSBtZXRob2RcbiAqXG4gKiBFeGFtcGxlIGJlbG93OlxuICpcbiAqICAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTYXZlZFF1ZXJpZXNNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTYXZlZFF1ZXJpZXNNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IFNBVkVEUVVFUllfQ09NUE9ORU5UUyxcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRTYXZlZFF1ZXJ5TW9kYWw6IEVkaXRTYXZlZFF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlU2F2ZWRRdWVyaWVzTW9kYWw6IE1hbmFnZVNhdmVkUXVlcmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydFNhdmVkUXVlcnlNb2RhbDogRXhwb3J0UXVlcnlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgU2F2ZWRRdWVyaWVzU2VydmljZSxcbiAgICAgICAgICAgICAgICBTZWxlY3Rpb25TZXJ2aWNlXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTYXZlZFF1ZXJ5Q29tcG9uZW50cyB7XG4gICAgZWRpdFNhdmVkUXVlcnlNb2RhbDogVHlwZTxhbnk+O1xuICAgIG1hbmFnZVNhdmVkUXVlcmllc01vZGFsOiBUeXBlPGFueT47XG4gICAgZXhwb3J0U2F2ZWRRdWVyeU1vZGFsOiBUeXBlPGFueT47XG59XG5leHBvcnQgY29uc3QgU0FWRURRVUVSWV9DT01QT05FTlRTID0gbmV3IEluamVjdGlvblRva2VuPFNhdmVkUXVlcnlDb21wb25lbnRzPignU0FWRURRVUVSWV9DT01QT05FTlRTJyk7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2F2ZWRRdWVyaWVzU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9ldmVudHMgPSBuZXcgU3ViamVjdDxTYXZlZFF1ZXJ5Q2hhbmdlRXZlbnQ+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2hhbmdlcyA9IG5ldyBTdWJqZWN0PFNhdmVkUXVlcnlDaGFuZ2VFdmVudD4oKTtcblxuICAgIC8vIEFuIGFwcGxpY2F0aW9uIG1heSB3YW50IHRvIGFsdGVyIHRoZSBhY3Rpb24gKGljb24sIGV0Yy4pXG4gICAgcHVibGljIHNlbGVjdGVkUmVjb3Jkc0FjdGlvbjogQWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB1c2VyU2V0dGluZ3NTZXJ2aWNlOiBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHVibGljIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICAgICAgcHVibGljIHF1ZXJ5RXhwb3J0U2VydmljZTogUXVlcnlFeHBvcnRXZWJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgZG93bmxvYWRTZXJ2aWNlOiBEb3dubG9hZFdlYlNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBzZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KFNBVkVEUVVFUllfQ09NUE9ORU5UUykgcHVibGljIHNhdmVkUXVlcnlDb21wb25lbnRzOiBTYXZlZFF1ZXJ5Q29tcG9uZW50c1xuICAgICl7XG4gICAgICAgIC8vIExpc3RlbiB0byB0aGUgdXNlciBzZXR0aW5nc1xuICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICAvLyBFLmcuIG5ldyBsb2dpbiBvY2N1cnNcbiAgICAgICAgICAgIC8vID09PiBNZW51cyBuZWVkIHRvIGJlIHJlYnVpbHRcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLkxvYWRlZH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gTGlzdGVuIHRvIG93biBldmVudHMsIHRvIHRyaWdnZXIgY2hhbmdlIGV2ZW50c1xuICAgICAgICB0aGlzLl9ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmKFNBVkVEX1FVRVJJRVNfQ0hBTkdFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpICE9PSAtMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VzLm5leHQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBzZWxlY3Rpb24gYWN0aW9uXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSZWNvcmRzQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBpY29uOiAnZmFzIGZhLWRvd25sb2FkJyxcbiAgICAgICAgICAgIHRpdGxlOiAnbXNnI2V4cG9ydFF1ZXJ5LmJ0blRpdGxlJyxcbiAgICAgICAgICAgIGFjdGlvbjogKF9pdGVtOiBBY3Rpb24sIF9ldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cG9ydE1vZGFsKHRoaXMuc2VsZWN0aW9uU2VydmljZS5oYXZlU2VsZWN0ZWRSZWNvcmRzXG4gICAgICAgICAgICAgICAgICAgID8gRXhwb3J0U291cmNlVHlwZS5TZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgOiBFeHBvcnRTb3VyY2VUeXBlLlJlc3VsdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIEdFVFRFUlNcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3Qgb2YgdGhpcyB1c2VyJ3Mgc2F2ZWQgcXVlcmllcy5cbiAgICAgKiBUaGUgbGlzdCBpcyBzdG9yZWQgaW4gdGhlIHVzZXIgc2V0dGluZ3MgKHRoaXMgaXMgYSByZWRpcmVjdGlvbikuXG4gICAgICogVXNpbmcgdGhpcyBzZXJ2aWNlIGNyZWF0ZXMgdGhlIGxpc3Qgb2Ygc2F2ZWQgcXVlcmllcyBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2F2ZWRxdWVyaWVzKCkgOiBTYXZlZFF1ZXJ5W117XG4gICAgICAgIGlmKCF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzKVxuICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncyA9IHt9O1xuICAgICAgICBpZighdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcInNhdmVkUXVlcmllc1wiXSlcbiAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3NbXCJzYXZlZFF1ZXJpZXNcIl0gPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3NbXCJzYXZlZFF1ZXJpZXNcIl07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYW55IGV2ZW50IGFtb25nIFNhdmVkUXVlcnlDaGFuZ2VFdmVudFxuICAgICAqICh1c2UgZm9yIGZpbmUtZ3JhaW5lZCBjb250cm9sIG9mIHNhdmVkIHF1ZXJpZXMgd29ya2Zsb3cpXG4gICAgICovXG4gICAgcHVibGljIGdldCBldmVudHMoKSA6IFN1YmplY3Q8U2F2ZWRRdWVyeUNoYW5nZUV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgd2hlbiBldmVudHMgYWZmZWN0IHRoZSBsaXN0IG9mIHNhdmVkIHF1ZXJpZXNcbiAgICAgKiAodXNlIHRvIHJlZnJlc2ggc2F2ZWQgcXVlcmllcyBtZW51cylcbiAgICAgKiBDZi4gQ0hBTkdFX0VWRU5UUyBsaXN0XG4gICAgICovXG4gICAgcHVibGljIGdldCBjaGFuZ2VzKCkgOiBTdWJqZWN0PFNhdmVkUXVlcnlDaGFuZ2VFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBzYXZlZCBxdWVyeVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaGFzU2F2ZWRRdWVyeSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZWRxdWVyaWVzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgYSBzYXZlZCBxdWVyeSB3aXRoIHRoZSBnaXZlbiBuYW1lIG9yIG51bGwgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBzYXZlZHF1ZXJ5KG5hbWU6IHN0cmluZyk6IFNhdmVkUXVlcnkgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBpID0gdGhpcy5zYXZlZHF1ZXJ5SW5kZXgobmFtZSk7XG4gICAgICAgIHJldHVybiBpPj0gMD8gdGhpcy5zYXZlZHF1ZXJpZXNbaV0gOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzYXZlZHF1ZXJ5SW5kZXgobmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGljID0gdGhpcy5zYXZlZHF1ZXJpZXMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc2F2ZWRxdWVyeSA9IHRoaXMuc2F2ZWRxdWVyaWVzW2ldO1xuICAgICAgICAgICAgaWYgKHNhdmVkcXVlcnkgJiYgc2F2ZWRxdWVyeS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuXG5cbiAgICAvLyBDUlVEXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNhdmVkIHF1ZXJ5IHVubGVzcyBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKiBFbWl0cyBhbiBzYXZlZHF1ZXJ5IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBzYXZlZHF1ZXJ5IHRoZSBzYXZlZHF1ZXJ5IHRvIGNyZWF0ZVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgc2F2ZWRxdWVyeSB3YXMgY3JlYXRlZFxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVTYXZlZFF1ZXJ5KHNhdmVkcXVlcnk6IFNhdmVkUXVlcnkpIDogYm9vbGVhbiB7XG5cbiAgICAgICAgaWYodGhpcy5zYXZlZHF1ZXJ5SW5kZXgoc2F2ZWRxdWVyeS5uYW1lKSA+PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBUaGlzIHNhdmVkcXVlcnkgYWxyZWFkeSBleGlzdHNcblxuICAgICAgICB0aGlzLnNhdmVkcXVlcmllcy51bnNoaWZ0KHNhdmVkcXVlcnkpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IFNhdmVkUXVlcnlFdmVudFR5cGUuQWRkLCBzYXZlZHF1ZXJ5fSk7XG4gICAgICAgIHRoaXMucGF0Y2hTYXZlZFF1ZXJpZXMoW3tcbiAgICAgICAgICAgIHR5cGU6IFNhdmVkUXVlcnlFdmVudFR5cGUuQWRkLFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgc2F2ZWRxdWVyeTogc2F2ZWRxdWVyeS5uYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzYXZlZCBxdWVyeSBhdCB0aGUgZ2l2ZW4gaW5kZXgsIHVubGVzcyBhIHNhdmVkIHF1ZXJ5IHdpdGggdGhlIHNhbWUgbmFtZVxuICAgICAqIGFscmVhZHkgZXhpc3RzIGluIHRoZSBsaXN0IG9mIHNhdmVkIHF1ZXJpZXMuXG4gICAgICogRW1pdHMgYW4gU2F2ZWQgUXVlcnkgZXZlbnQuXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHNhdmVkcXVlcnkgdGhlIHNhdmVkIHF1ZXJ5IHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBpbmRleCB0aGUgaW5kZXggYXQgd2hpY2ggdG8gdXBkYXRlIHRoZSBzYXZlZCBxdWVyeVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgc2F2ZWQgcXVlcnkgd2FzIHVwZGF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlU2F2ZWRRdWVyeShzYXZlZHF1ZXJ5OiBTYXZlZFF1ZXJ5LCBpbmRleCA6IG51bWJlcikgOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCBwcmV2SW5kZXggPSB0aGlzLnNhdmVkcXVlcnlJbmRleChzYXZlZHF1ZXJ5Lm5hbWUpO1xuICAgICAgICBpZihwcmV2SW5kZXggIT09IC0xICYmIGluZGV4ICE9PSBwcmV2SW5kZXgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIEEgc2F2ZWQgcXVlcnkgd2l0aCB0aGUgc2FtZSBuYW1lIGV4aXN0cyBhdCBhIGRpZmZlcmVudCBpbmRleFxuXG4gICAgICAgIGlmKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLnNhdmVkcXVlcmllcy5sZW5ndGgpe1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVkcXVlcmllcy5zcGxpY2UoaW5kZXgsIDEsIHNhdmVkcXVlcnkpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGUgOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlVwZGF0ZSwgc2F2ZWRxdWVyeX0pO1xuICAgICAgICAgICAgdGhpcy5wYXRjaFNhdmVkUXVlcmllcyhbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlZHF1ZXJ5OiBzYXZlZHF1ZXJ5Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7ICAgLy8gVGhpcyBzYXZlZCBxdWVyeSBkb2VzIG5vdCBleGlzdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGZ1bGwgbGlzdCBvZiBzYXZlZCBxdWVyaWVzLlxuICAgICAqIEVtaXRzIGFuIFNhdmVkUXVlcnkgZXZlbnQuXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHNhdmVkcXVlcmllcyB0aGUgbmV3IGxpc3Qgb2Ygc2F2ZWQgcXVlcmllc1xuICAgICAqIEBwYXJhbSBhdWRpdEV2ZW50cyB0aGUgbGlzdCBvZiBhdWRpdCBldmVudHMgdG8gbG9nXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVNhdmVkUXVlcmllcyhzYXZlZHF1ZXJpZXMgOiBTYXZlZFF1ZXJ5W10sIGF1ZGl0RXZlbnRzPzogQXVkaXRFdmVudHMpIDogYm9vbGVhbiB7XG4gICAgICAgIFV0aWxzLmFycmF5U2V0KHRoaXMuc2F2ZWRxdWVyaWVzLCBzYXZlZHF1ZXJpZXMpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IFNhdmVkUXVlcnlFdmVudFR5cGUuVXBkYXRlfSk7XG4gICAgICAgIHRoaXMucGF0Y2hTYXZlZFF1ZXJpZXMoYXVkaXRFdmVudHMpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBnaXZlbiBTYXZlZFF1ZXJ5IChiYXNlZCBvbiBpdHMgbmFtZSlcbiAgICAgKiBFbWl0cyBhbiBTYXZlZFF1ZXJ5IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBzYXZlZHF1ZXJ5XG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBzYXZlZCBxdWVyeSB3YXMgZGVsZXRlZFxuICAgICAqL1xuICAgIHB1YmxpYyBkZWxldGVTYXZlZFF1ZXJ5KHNhdmVkcXVlcnk6IFNhdmVkUXVlcnkpIDogYm9vbGVhbiB7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnNhdmVkcXVlcnlJbmRleChzYXZlZHF1ZXJ5Lm5hbWUpO1xuXG4gICAgICAgIGlmKGluZGV4ID09PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm90aGluZyB0byBkZWxldGVcblxuICAgICAgICB0aGlzLnNhdmVkcXVlcmllcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IFNhdmVkUXVlcnlFdmVudFR5cGUuRGVsZXRlLCBzYXZlZHF1ZXJ5fSk7XG4gICAgICAgIHRoaXMucGF0Y2hTYXZlZFF1ZXJpZXMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFNhdmVkUXVlcnlFdmVudFR5cGUuRGVsZXRlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBzYXZlZHF1ZXJ5OiBzYXZlZHF1ZXJ5Lm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoaXMgc2F2ZWQgcXVlcnkgdG8gdGhlIGN1cnJlbnQgc2VhcmNoIGNvbnRleHQsIHVzaW5nIHRoZSBzZWFyY2ggc2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRTYXZlZFF1ZXJ5VG9DdXJyZW50UXVlcnkoc2F2ZWRxdWVyeTogU2F2ZWRRdWVyeSl7XG4gICAgICAgIHNhdmVkcXVlcnkucXVlcnkgPSBRdWVyeS5jb3B5KHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBTYXZlZCBRdWVyaWVzIGluIFVzZXIgc2V0dGluZ3MuXG4gICAgICogQHBhcmFtIGF1ZGl0RXZlbnRzIDogQXVkaXQgRXZlbnRzIHRvIGJlIHRyaWdnZXJlZFxuICAgICAqIEByZXR1cm5zIGFuIE9ic2VydmFibGUgd2hpY2ggY2FuIGJlIHVzZWQgdG8gdHJpZ2dlciBmdXJ0aGVyIGV2ZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgcGF0Y2hTYXZlZFF1ZXJpZXMoYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnBhdGNoKHtzYXZlZFF1ZXJpZXM6IHRoaXMuc2F2ZWRxdWVyaWVzfSwgYXVkaXRFdmVudHMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogU2F2ZWRRdWVyeUV2ZW50VHlwZS5QYXRjaGVkfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgcGF0Y2ggU2F2ZWQgcXVlcmllcyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgcnNzSHJlZihpdGVtOiBTYXZlZFF1ZXJ5KSB7XG4gICAgICAgIHJldHVybiBVdGlscy5hZGRTZWFyY2hQYXJhbXModGhpcy5hcHBTZXJ2aWNlLmFwcFdlYlNlcnZpY2UubWFrZVVybChcInF1ZXJ5LnJzc1wiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhcHA6IHRoaXMuYXBwU2VydmljZS5hcHBOYW1lLFxuICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaGFzUnNzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5hcHBTZXJ2aWNlLmFwcCAmJiAhIXRoaXMuYXBwU2VydmljZS5hcHAucXVlcnlSc3NFbmFibGVkO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZXJlIGlzIGEgY29uZmlndXJhdGlvbiBmb3IgdGhlIGV4cG9ydCB3ZWIgc2VydmljZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYSBjb25maWd1cmF0aW9uIGZvciB0aGUgZXhwb3J0IHdlYiBzZXJ2aWNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNFeHBvcnRDb25maWcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuYXBwU2VydmljZS5hcHAgJiYgISF0aGlzLmFwcFNlcnZpY2UuYXBwLnF1ZXJ5RXhwb3J0O1xuICAgIH1cblxuXG4gICAgcHVibGljIGRvd25sb2FkKG1vZGVsIDogRXhwb3J0UXVlcnlNb2RlbCk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPEJsb2I+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvd25sb2FkU2VydmljZS5kb3dubG9hZCh0aGlzLnJlcXVlc3RFeHBvcnQobW9kZWwpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlcXVlc3RFeHBvcnQobW9kZWw6IEV4cG9ydFF1ZXJ5TW9kZWwpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxCbG9iPj4ge1xuICAgICAgICBzd2l0Y2ggKG1vZGVsLmV4cG9ydCkge1xuICAgICAgICAgICAgY2FzZSBFeHBvcnRTb3VyY2VUeXBlLlJlc3VsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeUV4cG9ydFNlcnZpY2UuZXhwb3J0UmVzdWx0KFxuICAgICAgICAgICAgICAgICAgICBtb2RlbC53ZWJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm1heENvdW50LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5leHBvcnRlZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNhc2UgRXhwb3J0U291cmNlVHlwZS5TZWxlY3Rpb246XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlFeHBvcnRTZXJ2aWNlLmV4cG9ydFNlbGVjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwud2ViU2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmdldFNlbGVjdGVkSWRzKCksXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmZvcm1hdCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwubWF4Q291bnQsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmV4cG9ydGVkQ29sdW1ucyxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY2FzZSBFeHBvcnRTb3VyY2VUeXBlLlNhdmVkUXVlcnk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlFeHBvcnRTZXJ2aWNlLmV4cG9ydFNhdmVkUXVlcnkoXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLndlYlNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnF1ZXJ5TmFtZSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5mb3JtYXQsXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLm1heENvdW50LFxuICAgICAgICAgICAgICAgICAgICBtb2RlbC5leHBvcnRlZENvbHVtbnMsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgICdRdWVyeUV4cG9ydGVyLmV4cG9ydCB1bmV4cGVjdGVkIGV4cG9ydCB0eXBlOiAnLFxuICAgICAgICAgICAgICAgICAgICBFeHBvcnRTb3VyY2VUeXBlW21vZGVsLmV4cG9ydF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdRdWVyeUV4cG9ydGVyLmV4cG9ydCB1bmV4cGVjdGVkIGV4cG9ydCB0eXBlOiAnKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuICAgIC8vIEVWRU5UIEhBTkRMRVJTIChNZW51cylcblxuICAgIC8qKlxuICAgICAqIFVzZXMgdGhlIFNlYXJjaFNlcnZpY2UgdG8gcGVyZm9ybSBhIHNlYXJjaCByZXR1cm5pbmcgYWxsXG4gICAgICogdGhlIGRvY3VtZW50cyBtYXRjaGluZyB0aGlzIHNhdmVkIHF1ZXJ5LlxuICAgICAqIEBwYXJhbSBzYXZlZCBxdWVyeVxuICAgICAqIEByZXR1cm5zIHRoZSBzZWFyY2ggc2VydmljZSBwcm9taXNlXG4gICAgICovXG4gICAgc2VhcmNoU2F2ZWRRdWVyeShzYXZlZHF1ZXJ5OiBTYXZlZFF1ZXJ5LCBwYXRoPzogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZXRRdWVyeShVdGlscy5leHRlbmQodGhpcy5zZWFyY2hTZXJ2aWNlLm1ha2VRdWVyeSgpLCBVdGlscy5jb3B5KHNhdmVkcXVlcnkucXVlcnkpKSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlNlYXJjaCwgc2F2ZWRxdWVyeX0pO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh7IHBhdGg6IHBhdGggfSwge1xuICAgICAgICAgICAgdHlwZTogU2F2ZWRRdWVyeUV2ZW50VHlwZS5TZWFyY2gsXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBcInNhdmVkLXF1ZXJ5XCI6IHNhdmVkcXVlcnkubmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhIGRpYWxvZyBhbGxvd2luZyBhIHVzZXIgdG8gc2F2ZSB0aGUgY3VycmVudCBxdWVyeS5cbiAgICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgZGlhbG9nXG4gICAgICogdGhlIHJlc3VsdCBpcyB0cnVlIGlmIHRoZSBxdWVyeSB3YXMgc2F2ZWQuXG4gICAgICovXG4gICAgY3JlYXRlU2F2ZWRRdWVyeU1vZGFsKHF1ZXJ5OiBRdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSkgOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3Qgc2F2ZWRRdWVyeTogU2F2ZWRRdWVyeSA9IHtcbiAgICAgICAgICAgIG5hbWU6IHF1ZXJ5LnRleHQgfHwgXCJcIixcbiAgICAgICAgICAgIHF1ZXJ5OiBRdWVyeS5jb3B5KHF1ZXJ5KVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLnNhdmVkUXVlcnlDb21wb25lbnRzLmVkaXRTYXZlZFF1ZXJ5TW9kYWwsIHttb2RlbDogc2F2ZWRRdWVyeX0pXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuT0spIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc2F2ZWRxdWVyeUluZGV4KHNhdmVkUXVlcnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnllc05vKFwibXNnI3NhdmVkUXVlcmllcy5zYXZlZFF1ZXJ5QWxyZWFkeUV4aXN0c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuWWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVTYXZlZFF1ZXJ5KHNhdmVkUXVlcnksIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNhdmVkUXVlcnkoc2F2ZWRRdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYSBkaWFsb2cgYWxsb3dpbmcgYSB1c2VyIHRvIHJlb3JnYW5pemUgYW5kIGVkaXQgdGhlXG4gICAgICogbGlzdCBvZiBzYXZlZCBxdWVyaWVzLlxuICAgICAqIEByZXR1cm5zIGEgYm9vbGVhbiBwcm9taXNlIHJlc29sdmVkIHdoZW4gdGhlIHVzZXIgY2xvc2VzIHRoZSBkaWFsb2dcbiAgICAgKiB0aGUgcmVzdWx0IGlzIHRydWUgaXMgdGhlIGxpc3Qgd2FzIHVwZGF0ZWQuXG4gICAgICovXG4gICAgcHVibGljIG1hbmFnZVNhdmVkUXVlcmllc01vZGFsKCkgOiBQcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICBjb25zdCBtb2RlbDogTWFuYWdlU2F2ZWRRdWVyaWVzTW9kZWwgPSB7IHNhdmVkUXVlcmllczogVXRpbHMuY29weSh0aGlzLnNhdmVkcXVlcmllcykgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLnNhdmVkUXVlcnlDb21wb25lbnRzLm1hbmFnZVNhdmVkUXVlcmllc01vZGFsLCB7bW9kZWx9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVNhdmVkUXVlcmllcyhtb2RlbC5zYXZlZFF1ZXJpZXMsIG1vZGVsLmF1ZGl0RXZlbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBvcnRzIGEgcXVlcnkgdmlhIGEgbW9kYWwgZGlhbG9nLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV4cG9ydFR5cGUgdHlwZSBvZiBleHBvcnQgdG8gcGVyZm9ybSAoc2VsZWN0aW9uLCBzYXZlZCBxdWVyeSwgcmVzdWx0cylcbiAgICAgKiBAcGFyYW0gc2F2ZWRRdWVyeSBUaGUgc2F2ZWQgcXVlcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgZXhwb3J0TW9kYWwoZXhwb3J0VHlwZTogRXhwb3J0U291cmNlVHlwZSwgc2F2ZWRRdWVyeT86IFNhdmVkUXVlcnkpXG4gICAgICAgICAgICA6IFByb21pc2U8TW9kYWxSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoIXRoaXMuaGFzRXhwb3J0Q29uZmlnKCkgfHwgIXRoaXMuYXBwU2VydmljZS5hcHApIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoTW9kYWxSZXN1bHQuQ2FuY2VsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vZGVsOiBFeHBvcnRRdWVyeU1vZGVsID0ge1xuICAgICAgICAgICAgZm9ybWF0OiBFeHBvcnRPdXRwdXRGb3JtYXQuQ3N2LFxuICAgICAgICAgICAgZXhwb3J0OiBleHBvcnRUeXBlLFxuICAgICAgICAgICAgd2ViU2VydmljZTogdGhpcy5hcHBTZXJ2aWNlLmFwcC5xdWVyeUV4cG9ydFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzYXZlZFF1ZXJ5ICYmIGV4cG9ydFR5cGUgPT09IEV4cG9ydFNvdXJjZVR5cGUuU2F2ZWRRdWVyeSkge1xuICAgICAgICAgICAgbW9kZWwucXVlcnlOYW1lID0gc2F2ZWRRdWVyeS5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4odGhpcy5zYXZlZFF1ZXJ5Q29tcG9uZW50cy5leHBvcnRTYXZlZFF1ZXJ5TW9kYWwsIHttb2RlbH0pO1xuICAgIH1cblxuICAgIG5vdGlmeU9wZW5TYXZlZFF1ZXJ5KHNhdmVkcXVlcnk6IFNhdmVkUXVlcnkpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IFNhdmVkUXVlcnlFdmVudFR5cGUuU2VhcmNoLCBzYXZlZHF1ZXJ5fSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==