import { OnDestroy, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { UserSettingsWebService, Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export interface RecentDocument {
    /**
     * Fields from Record that we want to store/display/index for recent documents
     */
    id: string;
    title: string;
    url1: string;
    treepath: string[];
    docformat: string;
    authors: string[];
    /**
     * Date at which the document was last opened
     */
    date: Date;
    /**
     * Store whether the doc was opened in the preview or directly via url
     */
    original: boolean;
}
export declare const enum RecentDocumentEventType {
    Loaded = "RecentDocument_Loaded",
    Patched = "RecentDocument_Patched",
    Add = "RecentDocument_Add",
    Update = "RecentDocument_Update",
    Delete = "RecentDocument_Delete",
    Search = "Search_RecentDocument"
}
export declare const RECENT_DOCUMENTS_CHANGE_EVENTS: RecentDocumentEventType[];
export interface RecentDocumentChangeEvent {
    type: RecentDocumentEventType;
    recentdocument?: RecentDocument;
}
export declare const MAX_DOCUMENTS: InjectionToken<unknown>;
export declare class RecentDocumentsService implements OnDestroy {
    userSettingsService: UserSettingsWebService;
    searchService: SearchService;
    private maxDocuments;
    private readonly _events;
    private readonly _changes;
    constructor(userSettingsService: UserSettingsWebService, searchService: SearchService, maxDocuments: number);
    /**
     * Returns the list of this user's recent documents.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent documents if it does not already exist.
     */
    get recentdocuments(): RecentDocument[];
    /**
     * Triggers any event among RecentDocumentChangeEvent
     * (use for fine-grained control of recent documents workflow)
     */
    get events(): Subject<RecentDocumentChangeEvent>;
    /**
     * Triggers when events affect the list of recent documents
     * (use to refresh recent documents menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes(): Subject<RecentDocumentChangeEvent>;
    /**
     * @returns true if there is at least one recent document
     */
    get hasRecentDocument(): boolean;
    /**
     * @returns a recent document with the given name or null if it does not exist
     * @param name
     */
    recentdocument(text: string): RecentDocument | undefined;
    private recentdocumentIndex;
    private comparator;
    /**
     * Creates a new recent document unless it already exists, in which case the existing document is updated.
     * Emits an recentdocument event.
     * Update the data on the server.
     * @param record Record to add to the service
     * @param original Whether the original doc was opened or the preview
     * @returns true if recentdocument was created
     */
    addDocument(record: Record, original: boolean): boolean;
    /**
     * Creates a new recent document unless it already exists, in which case the existing document is updated.
     * Emits an recentdocument event.
     * Update the data on the server.
     * @param recentdocument the recentdocument to create
     * @returns true if recentdocument was created
     */
    addRecentDocument(recentdocument: RecentDocument): boolean;
    /**
     * Deletes the given RecentDocument (based on its name)
     * Emits an RecentDocument event.
     * Update the data on the server.
     * @param recentdocument
     * @returns true if recent document was deleted
     */
    deleteRecentDocument(recentdocument: RecentDocument): boolean;
    /**
     * Updates Recent Documents in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchRecentDocuments;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<RecentDocumentsService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<RecentDocumentsService>;
}
//# sourceMappingURL=recent-documents.service.d.ts.map