import { Injectable, Optional, Inject, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/components/search";
// Types of events triggering a change event
export const RECENT_DOCUMENTS_CHANGE_EVENTS = [
    "RecentDocument_Add" /* Add */,
    "RecentDocument_Update" /* Update */,
    "RecentDocument_Delete" /* Delete */,
];
export const MAX_DOCUMENTS = new InjectionToken("MAX_DOCUMENTS");
export class RecentDocumentsService {
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
RecentDocumentsService.ɵfac = function RecentDocumentsService_Factory(t) { return new (t || RecentDocumentsService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(MAX_DOCUMENTS, 8)); };
RecentDocumentsService.ɵprov = i0.ɵɵdefineInjectable({ token: RecentDocumentsService, factory: RecentDocumentsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RecentDocumentsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [MAX_DOCUMENTS]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjZW50LWRvY3VtZW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2F2ZWQtcXVlcmllcy8iLCJzb3VyY2VzIjpbInJlY2VudC1kb2N1bWVudHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBYSxNQUFNLEVBQUUsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHN0IsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBb0N6Qyw0Q0FBNEM7QUFDNUMsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUc7Ozs7Q0FJN0MsQ0FBQztBQVNGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUtqRSxNQUFNLE9BQU8sc0JBQXNCO0lBSy9CLFlBQ1csbUJBQTJDLEVBQzNDLGFBQTRCLEVBQ1EsWUFBb0I7UUFGeEQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF3QjtRQUMzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUNRLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBTmxELFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQUNuRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQTZCLENBQUM7UUFPakUsSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDMUI7UUFFRCw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUMsd0JBQXdCO1lBQ3hCLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENB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Q3BDO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLG9CQUFvQixDQUFDLFdBQXlCO1FBQ2xELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFDLEVBQUUsV0FBVyxDQUFDO2FBQ3RGLFNBQVMsQ0FDTixJQUFJLENBQUMsRUFBRTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSx3Q0FBaUMsRUFBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQ0osQ0FBQztJQUNWLENBQUM7SUFHRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7OzRGQTdOUSxzQkFBc0IscUZBUVAsYUFBYTs4REFSNUIsc0JBQXNCLFdBQXRCLHNCQUFzQixtQkFGbkIsTUFBTTtrREFFVCxzQkFBc0I7Y0FIbEMsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOztzQkFTUSxRQUFROztzQkFBSSxNQUFNO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE9wdGlvbmFsLCBPbkRlc3Ryb3ksIEluamVjdCwgSW5qZWN0aW9uVG9rZW59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1VzZXJTZXR0aW5nc1dlYlNlcnZpY2UsIEF1ZGl0RXZlbnRzLCBSZWNvcmR9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VudERvY3VtZW50IHtcbiAgICAvKipcbiAgICAgKiBGaWVsZHMgZnJvbSBSZWNvcmQgdGhhdCB3ZSB3YW50IHRvIHN0b3JlL2Rpc3BsYXkvaW5kZXggZm9yIHJlY2VudCBkb2N1bWVudHNcbiAgICAgKi9cbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdXJsMTogc3RyaW5nO1xuICAgIHRyZWVwYXRoOiBzdHJpbmdbXTtcbiAgICBkb2Nmb3JtYXQ6IHN0cmluZztcbiAgICBhdXRob3JzOiBzdHJpbmdbXTtcblxuICAgIC8qKlxuICAgICAqIERhdGUgYXQgd2hpY2ggdGhlIGRvY3VtZW50IHdhcyBsYXN0IG9wZW5lZFxuICAgICAqL1xuICAgIGRhdGU6IERhdGU7XG5cbiAgICAvKipcbiAgICAgKiBTdG9yZSB3aGV0aGVyIHRoZSBkb2Mgd2FzIG9wZW5lZCBpbiB0aGUgcHJldmlldyBvciBkaXJlY3RseSB2aWEgdXJsXG4gICAgICovXG4gICAgb3JpZ2luYWw6IGJvb2xlYW47XG59XG5cblxuLy8gZnJvbSBjb3JlL21vZGVscy9hdWRpdFxuZXhwb3J0IGNvbnN0IGVudW0gUmVjZW50RG9jdW1lbnRFdmVudFR5cGUge1xuICAgIExvYWRlZCA9IFwiUmVjZW50RG9jdW1lbnRfTG9hZGVkXCIsXG4gICAgUGF0Y2hlZCA9IFwiUmVjZW50RG9jdW1lbnRfUGF0Y2hlZFwiLFxuICAgIEFkZCA9IFwiUmVjZW50RG9jdW1lbnRfQWRkXCIsXG4gICAgVXBkYXRlID0gXCJSZWNlbnREb2N1bWVudF9VcGRhdGVcIixcbiAgICBEZWxldGUgPSBcIlJlY2VudERvY3VtZW50X0RlbGV0ZVwiLFxuICAgIFNlYXJjaCA9IFwiU2VhcmNoX1JlY2VudERvY3VtZW50XCJcbn1cblxuLy8gVHlwZXMgb2YgZXZlbnRzIHRyaWdnZXJpbmcgYSBjaGFuZ2UgZXZlbnRcbmV4cG9ydCBjb25zdCBSRUNFTlRfRE9DVU1FTlRTX0NIQU5HRV9FVkVOVFMgPSBbXG4gICAgUmVjZW50RG9jdW1lbnRFdmVudFR5cGUuQWRkLFxuICAgIFJlY2VudERvY3VtZW50RXZlbnRUeXBlLlVwZGF0ZSxcbiAgICBSZWNlbnREb2N1bWVudEV2ZW50VHlwZS5EZWxldGUsXG5dO1xuXG5cbi8vIENSVUQgRXZlbnRzXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VudERvY3VtZW50Q2hhbmdlRXZlbnQge1xuICAgIHR5cGU6IFJlY2VudERvY3VtZW50RXZlbnRUeXBlO1xuICAgIHJlY2VudGRvY3VtZW50PzogUmVjZW50RG9jdW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBNQVhfRE9DVU1FTlRTID0gbmV3IEluamVjdGlvblRva2VuKFwiTUFYX0RPQ1VNRU5UU1wiKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVjZW50RG9jdW1lbnRzU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IF9ldmVudHMgPSBuZXcgU3ViamVjdDxSZWNlbnREb2N1bWVudENoYW5nZUV2ZW50PigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NoYW5nZXMgPSBuZXcgU3ViamVjdDxSZWNlbnREb2N1bWVudENoYW5nZUV2ZW50PigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB1c2VyU2V0dGluZ3NTZXJ2aWNlOiBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVhfRE9DVU1FTlRTKSBwcml2YXRlIG1heERvY3VtZW50czogbnVtYmVyLFxuICAgICl7XG4gICAgICAgIGlmKCF0aGlzLm1heERvY3VtZW50cyl7XG4gICAgICAgICAgICB0aGlzLm1heERvY3VtZW50cyA9IDIwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSB1c2VyIHNldHRpbmdzXG4gICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIEUuZy4gbmV3IGxvZ2luIG9jY3Vyc1xuICAgICAgICAgICAgLy8gPT0+IFJldml2ZSBkYXRlc1xuICAgICAgICAgICAgdGhpcy5yZWNlbnRkb2N1bWVudHMuZm9yRWFjaChyZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHJkLmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBVdGlscy50b0RhdGUocmQuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZC5kYXRlID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gPT0+IE1lbnVzIG5lZWQgdG8gYmUgcmVidWlsdFxuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZTogUmVjZW50RG9jdW1lbnRFdmVudFR5cGUuTG9hZGVkfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBvd24gZXZlbnRzLCB0byB0cmlnZ2VyIGNoYW5nZSBldmVudHNcbiAgICAgICAgdGhpcy5fZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZihSRUNFTlRfRE9DVU1FTlRTX0NIQU5HRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSAhPT0gLTEpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlcy5uZXh0KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZSB0byB0aGUgc2VhcmNoIHNlcnZpY2UgdG8gY2FwdHVyZSBcIm9wZW4tb3JpZ2luYWwtZG9jdW1lbnRcIiBldmVudFxuICAgICAgICAgKiBhbmQgYWRkIGRvY3VtZW50cyB0byB0aGlzIHNlcnZpY2VcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmKGV2ZW50LnR5cGUgPT09IFwib3Blbi1vcmlnaW5hbC1kb2N1bWVudFwiICYmIGV2ZW50LnJlY29yZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGREb2N1bWVudChldmVudC5yZWNvcmQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vIEdFVFRFUlNcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3Qgb2YgdGhpcyB1c2VyJ3MgcmVjZW50IGRvY3VtZW50cy5cbiAgICAgKiBUaGUgbGlzdCBpcyBzdG9yZWQgaW4gdGhlIHVzZXIgc2V0dGluZ3MgKHRoaXMgaXMgYSByZWRpcmVjdGlvbikuXG4gICAgICogVXNpbmcgdGhpcyBzZXJ2aWNlIGNyZWF0ZXMgdGhlIGxpc3Qgb2YgcmVjZW50IGRvY3VtZW50cyBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcmVjZW50ZG9jdW1lbnRzKCkgOiBSZWNlbnREb2N1bWVudFtde1xuICAgICAgICBpZighdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncylcbiAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3MgPSB7fTtcbiAgICAgICAgaWYoIXRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3NbXCJyZWNlbnREb2N1bWVudHNcIl0pXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wicmVjZW50RG9jdW1lbnRzXCJdID0gW107XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wicmVjZW50RG9jdW1lbnRzXCJdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFueSBldmVudCBhbW9uZyBSZWNlbnREb2N1bWVudENoYW5nZUV2ZW50XG4gICAgICogKHVzZSBmb3IgZmluZS1ncmFpbmVkIGNvbnRyb2wgb2YgcmVjZW50IGRvY3VtZW50cyB3b3JrZmxvdylcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGV2ZW50cygpIDogU3ViamVjdDxSZWNlbnREb2N1bWVudENoYW5nZUV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgd2hlbiBldmVudHMgYWZmZWN0IHRoZSBsaXN0IG9mIHJlY2VudCBkb2N1bWVudHNcbiAgICAgKiAodXNlIHRvIHJlZnJlc2ggcmVjZW50IGRvY3VtZW50cyBtZW51cylcbiAgICAgKiBDZi4gQ0hBTkdFX0VWRU5UUyBsaXN0XG4gICAgICovXG4gICAgcHVibGljIGdldCBjaGFuZ2VzKCkgOiBTdWJqZWN0PFJlY2VudERvY3VtZW50Q2hhbmdlRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoYW5nZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgcmVjZW50IGRvY3VtZW50XG4gICAgICovXG4gICAgcHVibGljIGdldCBoYXNSZWNlbnREb2N1bWVudCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjZW50ZG9jdW1lbnRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgYSByZWNlbnQgZG9jdW1lbnQgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvciBudWxsIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVjZW50ZG9jdW1lbnQodGV4dDogc3RyaW5nKTogUmVjZW50RG9jdW1lbnQgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBpID0gdGhpcy5yZWNlbnRkb2N1bWVudEluZGV4KHRleHQpO1xuICAgICAgICByZXR1cm4gaT49IDA/IHRoaXMucmVjZW50ZG9jdW1lbnRzW2ldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVjZW50ZG9jdW1lbnRJbmRleChpZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGljID0gdGhpcy5yZWNlbnRkb2N1bWVudHMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcmVjZW50ZG9jdW1lbnQgPSB0aGlzLnJlY2VudGRvY3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChyZWNlbnRkb2N1bWVudCAmJiByZWNlbnRkb2N1bWVudC5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wYXJhdG9yKHExOiBSZWNlbnREb2N1bWVudCwgcTI6IFJlY2VudERvY3VtZW50KXtcbiAgICAgICAgcmV0dXJuIHEyLmRhdGUuZ2V0VGltZSgpIC0gcTEuZGF0ZS5nZXRUaW1lKCk7XG4gICAgfVxuXG5cbiAgICAvLyBDUlVEXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHJlY2VudCBkb2N1bWVudCB1bmxlc3MgaXQgYWxyZWFkeSBleGlzdHMsIGluIHdoaWNoIGNhc2UgdGhlIGV4aXN0aW5nIGRvY3VtZW50IGlzIHVwZGF0ZWQuXG4gICAgICogRW1pdHMgYW4gcmVjZW50ZG9jdW1lbnQgZXZlbnQuXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHJlY29yZCBSZWNvcmQgdG8gYWRkIHRvIHRoZSBzZXJ2aWNlXG4gICAgICogQHBhcmFtIG9yaWdpbmFsIFdoZXRoZXIgdGhlIG9yaWdpbmFsIGRvYyB3YXMgb3BlbmVkIG9yIHRoZSBwcmV2aWV3XG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiByZWNlbnRkb2N1bWVudCB3YXMgY3JlYXRlZFxuICAgICAqL1xuICAgIHB1YmxpYyBhZGREb2N1bWVudChyZWNvcmQ6IFJlY29yZCwgb3JpZ2luYWw6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYocmVjb3JkKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFJlY2VudERvY3VtZW50KHtcbiAgICAgICAgICAgICAgICBpZDogcmVjb3JkLmlkLFxuICAgICAgICAgICAgICAgIHRpdGxlOiByZWNvcmQudGl0bGUsXG4gICAgICAgICAgICAgICAgdXJsMTogcmVjb3JkLnVybDEsXG4gICAgICAgICAgICAgICAgdHJlZXBhdGg6IHJlY29yZC50cmVlcGF0aCxcbiAgICAgICAgICAgICAgICBkb2Nmb3JtYXQ6IHJlY29yZC5kb2Nmb3JtYXQsXG4gICAgICAgICAgICAgICAgYXV0aG9yczogcmVjb3JkLmF1dGhvcnMsXG5cbiAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmVjZW50IGRvY3VtZW50IHVubGVzcyBpdCBhbHJlYWR5IGV4aXN0cywgaW4gd2hpY2ggY2FzZSB0aGUgZXhpc3RpbmcgZG9jdW1lbnQgaXMgdXBkYXRlZC5cbiAgICAgKiBFbWl0cyBhbiByZWNlbnRkb2N1bWVudCBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gcmVjZW50ZG9jdW1lbnQgdGhlIHJlY2VudGRvY3VtZW50IHRvIGNyZWF0ZVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgcmVjZW50ZG9jdW1lbnQgd2FzIGNyZWF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkUmVjZW50RG9jdW1lbnQocmVjZW50ZG9jdW1lbnQ6IFJlY2VudERvY3VtZW50KSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmKCFyZWNlbnRkb2N1bWVudC5pZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpID0gdGhpcy5yZWNlbnRkb2N1bWVudEluZGV4KHJlY2VudGRvY3VtZW50LmlkKTsgLy8gSWYgdGhlIGRvY3VtZW50IGFscmVhZHkgZXhpc3RzXG4gICAgICAgIGlmKGkgPj0gMCl7XG4gICAgICAgICAgICB0aGlzLnJlY2VudGRvY3VtZW50c1tpXS5kYXRlID0gcmVjZW50ZG9jdW1lbnQuZGF0ZTsgLy8gVXBkYXRlIHRoZSBkYXRlIG9mIHRoZSBleGlzdGluZyBkb2N1bWVudFxuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IFJlY2VudERvY3VtZW50RXZlbnRUeXBlLlVwZGF0ZSwgcmVjZW50ZG9jdW1lbnQ6IHRoaXMucmVjZW50ZG9jdW1lbnRzW2ldfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VudGRvY3VtZW50cy5wdXNoKHJlY2VudGRvY3VtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQoe3R5cGUgOiBSZWNlbnREb2N1bWVudEV2ZW50VHlwZS5BZGQsIHJlY2VudGRvY3VtZW50OiByZWNlbnRkb2N1bWVudH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29ydCB0aGUgbGlzdFxuICAgICAgICB0aGlzLnJlY2VudGRvY3VtZW50cy5zb3J0KHRoaXMuY29tcGFyYXRvcik7XG5cbiAgICAgICAgLy8gVHJ1bmNhdGUgdGhlIGxpc3RcbiAgICAgICAgaWYodGhpcy5tYXhEb2N1bWVudHMgPj0wIClcbiAgICAgICAgICAgIHRoaXMucmVjZW50ZG9jdW1lbnRzLnNwbGljZSh0aGlzLm1heERvY3VtZW50cyk7XG5cbiAgICAgICAgdGhpcy5wYXRjaFJlY2VudERvY3VtZW50cygpOyAvLyBObyBuZWVkIHRvIGVtaXQgYW4gXCJBZGRcIiBhdWRpdCBldmVudCwgc2luY2UgaXQgaXMgcmVkdW5kYW50IHdpdGggdGhlIG1haW4gc2VhcmNoIEFQSVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBnaXZlbiBSZWNlbnREb2N1bWVudCAoYmFzZWQgb24gaXRzIG5hbWUpXG4gICAgICogRW1pdHMgYW4gUmVjZW50RG9jdW1lbnQgZXZlbnQuXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIHJlY2VudGRvY3VtZW50XG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiByZWNlbnQgZG9jdW1lbnQgd2FzIGRlbGV0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVsZXRlUmVjZW50RG9jdW1lbnQocmVjZW50ZG9jdW1lbnQ6IFJlY2VudERvY3VtZW50KSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5yZWNlbnRkb2N1bWVudEluZGV4KHJlY2VudGRvY3VtZW50LmlkKTtcblxuICAgICAgICBpZihpbmRleCA9PT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIE5vdGhpbmcgdG8gZGVsZXRlXG5cbiAgICAgICAgdGhpcy5yZWNlbnRkb2N1bWVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IFJlY2VudERvY3VtZW50RXZlbnRUeXBlLkRlbGV0ZSwgcmVjZW50ZG9jdW1lbnQ6IHJlY2VudGRvY3VtZW50fSk7XG4gICAgICAgIHRoaXMucGF0Y2hSZWNlbnREb2N1bWVudHMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IFJlY2VudERvY3VtZW50RXZlbnRUeXBlLkRlbGV0ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50ZG9jdW1lbnQ6IHJlY2VudGRvY3VtZW50LmlkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBSZWNlbnQgRG9jdW1lbnRzIGluIFVzZXIgc2V0dGluZ3MuXG4gICAgICogQHBhcmFtIGF1ZGl0RXZlbnRzIDogQXVkaXQgRXZlbnRzIHRvIGJlIHRyaWdnZXJlZFxuICAgICAqIEByZXR1cm5zIGFuIE9ic2VydmFibGUgd2hpY2ggY2FuIGJlIHVzZWQgdG8gdHJpZ2dlciBmdXJ0aGVyIGV2ZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgcGF0Y2hSZWNlbnREb2N1bWVudHMoYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnBhdGNoKHtyZWNlbnREb2N1bWVudHM6IHRoaXMucmVjZW50ZG9jdW1lbnRzfSwgYXVkaXRFdmVudHMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBSZWNlbnREb2N1bWVudEV2ZW50VHlwZS5QYXRjaGVkfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgcGF0Y2ggUmVjZW50IGRvY3VtZW50cyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgfVxufSJdfQ==