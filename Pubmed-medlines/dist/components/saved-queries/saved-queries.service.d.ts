import { InjectionToken, Type, OnDestroy } from "@angular/core";
import { HttpResponse } from '@angular/common/http';
import { Subject, Observable } from "rxjs";
import { UserSettingsWebService, QueryExportWebService, ExportSourceType, ExportOutputFormat, DownloadWebService, AuditEvents, AuditEvent } from "@sinequa/core/web-services";
import { ModalService, ModalResult } from "@sinequa/core/modal";
import { AppService, Query } from "@sinequa/core/app-utils";
import { SelectionService } from "@sinequa/components/selection";
import { SearchService } from "@sinequa/components/search";
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
export interface SavedQuery {
    name: string;
    description?: string;
    query: Query;
}
export declare const enum SavedQueryEventType {
    Loaded = "SavedQuery_Loaded",
    Patched = "SavedQuery_Patched",
    Add = "SavedQuery_Add",
    Delete = "SavedQuery_Delete",
    DeleteAll = "SavedQuery_DeleteAll",
    Rename = "SavedQuery_Rename",
    Update = "SavedQuery_Update",
    Search = "Search_SavedQuery"
}
export declare const SAVED_QUERIES_CHANGE_EVENTS: SavedQueryEventType[];
export interface SavedQueryChangeEvent {
    type: SavedQueryEventType;
    savedquery?: SavedQuery;
}
export interface ManageSavedQueriesModel {
    savedQueries: SavedQuery[];
    auditEvents?: AuditEvent[];
}
export interface ExportQueryModel {
    format: ExportOutputFormat;
    export: ExportSourceType;
    webService: string;
    maxCount?: number;
    queryName?: string;
    exportedColumns?: string[];
}
/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
 *     public static forRoot(): ModuleWithProviders<SavedQueriesModule> {
        return {
            ngModule: SavedQueriesModule,
            providers: [
                {
                    provide: SAVEDQUERY_COMPONENTS,
                    useValue: {
                        editSavedQueryModal: EditSavedQuery,
                        manageSavedQueriesModal: ManageSavedQueries,
                        exportSavedQueryModal: ExportQuery
                    }
                },
                SavedQueriesService,
                SelectionService
            ]
        };
    }
 *
 */
export interface SavedQueryComponents {
    editSavedQueryModal: Type<any>;
    manageSavedQueriesModal: Type<any>;
    exportSavedQueryModal: Type<any>;
}
export declare const SAVEDQUERY_COMPONENTS: InjectionToken<SavedQueryComponents>;
export declare class SavedQueriesService implements OnDestroy {
    userSettingsService: UserSettingsWebService;
    searchService: SearchService;
    modalService: ModalService;
    appService: AppService;
    queryExportService: QueryExportWebService;
    downloadService: DownloadWebService;
    selectionService: SelectionService;
    savedQueryComponents: SavedQueryComponents;
    private readonly _events;
    private readonly _changes;
    selectedRecordsAction: Action;
    constructor(userSettingsService: UserSettingsWebService, searchService: SearchService, modalService: ModalService, appService: AppService, queryExportService: QueryExportWebService, downloadService: DownloadWebService, selectionService: SelectionService, savedQueryComponents: SavedQueryComponents);
    /**
     * Returns the list of this user's saved queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of saved queries if it does not already exist.
     */
    get savedqueries(): SavedQuery[];
    /**
     * Triggers any event among SavedQueryChangeEvent
     * (use for fine-grained control of saved queries workflow)
     */
    get events(): Subject<SavedQueryChangeEvent>;
    /**
     * Triggers when events affect the list of saved queries
     * (use to refresh saved queries menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes(): Subject<SavedQueryChangeEvent>;
    /**
     * @returns true if there is at least one saved query
     */
    get hasSavedQuery(): boolean;
    /**
     * @returns a saved query with the given name or null if it does not exist
     * @param name
     */
    savedquery(name: string): SavedQuery | undefined;
    private savedqueryIndex;
    /**
     * Creates a new saved query unless it already exists.
     * Emits an savedquery event.
     * Update the data on the server.
     * @param savedquery the savedquery to create
     * @returns true if savedquery was created
     */
    createSavedQuery(savedquery: SavedQuery): boolean;
    /**
     * Update the saved query at the given index, unless a saved query with the same name
     * already exists in the list of saved queries.
     * Emits an Saved Query event.
     * Update the data on the server.
     * @param savedquery the saved query to update
     * @param index the index at which to update the saved query
     * @returns true if saved query was updated
     */
    updateSavedQuery(savedquery: SavedQuery, index: number): boolean;
    /**
     * Updates the full list of saved queries.
     * Emits an SavedQuery event.
     * Update the data on the server.
     * @param savedqueries the new list of saved queries
     * @param auditEvents the list of audit events to log
     */
    updateSavedQueries(savedqueries: SavedQuery[], auditEvents?: AuditEvents): boolean;
    /**
     * Deletes the given SavedQuery (based on its name)
     * Emits an SavedQuery event.
     * Update the data on the server.
     * @param savedquery
     * @returns true if saved query was deleted
     */
    deleteSavedQuery(savedquery: SavedQuery): boolean;
    /**
     * Sets this saved query to the current search context, using the search service
     */
    setSavedQueryToCurrentQuery(savedquery: SavedQuery): void;
    /**
     * Updates Saved Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchSavedQueries;
    rssHref(item: SavedQuery): string;
    hasRssEnabled(): boolean;
    /**
     * Checks if there is a configuration for the export web service.
     *
     * @returns true if there is a configuration for the export web service.
     */
    hasExportConfig(): boolean;
    download(model: ExportQueryModel): Observable<HttpResponse<Blob>>;
    private requestExport;
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this saved query.
     * @param saved query
     * @returns the search service promise
     */
    searchSavedQuery(savedquery: SavedQuery, path?: string): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to save the current query.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the query was saved.
     */
    createSavedQueryModal(query?: Query): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of saved queries.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    manageSavedQueriesModal(): Promise<boolean>;
    /**
     * Exports a query via a modal dialog.
     *
     * @param exportType type of export to perform (selection, saved query, results)
     * @param savedQuery The saved query
     */
    exportModal(exportType: ExportSourceType, savedQuery?: SavedQuery): Promise<ModalResult>;
    notifyOpenSavedQuery(savedquery: SavedQuery): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<SavedQueriesService, never>;
    static ɵprov: i0.ɵɵInjectableDef<SavedQueriesService>;
}
//# sourceMappingURL=saved-queries.service.d.ts.map