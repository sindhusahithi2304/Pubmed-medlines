import { Injectable, InjectionToken, Inject, Optional } from "@angular/core";
import { Subject } from "rxjs";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@sinequa/core/web-services";
import * as i3 from "@sinequa/core/app-utils";
import * as i4 from "@sinequa/core/login";
import * as i5 from "@sinequa/components/search";
import * as i6 from "@sinequa/core/modal";
import * as i7 from "@sinequa/components/saved-queries";
export const PREVIEW_MODAL = new InjectionToken("PREVIEW_MODAL");
export class PreviewService {
    constructor(previewModal, router, previewWebService, appService, authenticationService, searchService, modalService, recentDocumentsService, exprBuilder) {
        this.previewModal = previewModal;
        this.router = router;
        this.previewWebService = previewWebService;
        this.appService = appService;
        this.authenticationService = authenticationService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.recentDocumentsService = recentDocumentsService;
        this.exprBuilder = exprBuilder;
        this._events = new Subject();
        // Subscribe to own events and add documents to the recent documents service
        this.events.subscribe(event => {
            if (event.record && (event.type === "Preview_Modal" /* Modal */ || event.type === "Preview_Route" /* Route */ || event.type === "Preview_Window" /* Window */)) {
                this.recentDocumentsService.addDocument(event.record, false);
            }
        });
    }
    /**
     * Triggers any event among PreviewEvent
     */
    get events() {
        return this._events;
    }
    makeQuery(query) {
        query = Utils.copy(query);
        delete query.sort;
        delete query.scope;
        delete query.tab;
        delete query.basket;
        delete query.page;
        delete query.queryId;
        if (query.select) {
            query.select = query.select.filter(value => Utils.eqNC(value.facet, "refine"));
            if (query.select.length === 0) {
                delete query.select;
            }
        }
        return query;
    }
    getPreviewData(id, query, audit = true) {
        var _a;
        let auditEvent;
        const record = this.searchService.getRecordFromId(id);
        const resultId = record ? (_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.id : undefined;
        if (audit) {
            auditEvent = {
                type: "Doc_Preview" /* Doc_Preview */,
                detail: this.getAuditPreviewDetail(id, query, record, resultId)
            };
        }
        query = this.makeQuery(query);
        const observable = this.previewWebService.get(id, query, auditEvent);
        Utils.subscribe(observable, (previewData) => {
            previewData.resultId = resultId || "";
            return previewData;
        });
        this._events.next({ type: "Preview_Data" /* Data */, record, query });
        return observable;
    }
    makeDownloadUrl(url) {
        return url ? this.appService.updateUrlForCors(url) : undefined;
    }
    openModal(record, query, model) {
        model.record = record;
        model.query = query;
        this._events.next({ type: "Preview_Modal" /* Modal */, record, query });
        this.modalService.open(this.previewModal, { model });
    }
    getQueryStr(query) {
        query = this.makeQuery(query);
        return query.toJsonForQueryString();
    }
    openNewWindow(record, query) {
        const params = {
            id: record.id,
            query: this.getQueryStr(query),
            app: this.appService.appName
        };
        if (this.authenticationService.userOverrideActive && this.authenticationService.userOverride) {
            params["overrideUser"] = this.authenticationService.userOverride.userName;
            params["overrideDomain"] = this.authenticationService.userOverride.domain;
        }
        const httpParams = Utils.makeHttpParams(params);
        const url = "#/preview?" + httpParams.toString();
        this._events.next({ type: "Preview_Window" /* Window */, record, query });
        return window.open(url, "_blank");
    }
    openRoute(record, query, path = "preview") {
        this._events.next({ type: "Preview_Route" /* Route */, record, query });
        this.rank = record.rank;
        return this.router.navigate([path], {
            queryParams: {
                id: record.id,
                query: this.getQueryStr(query)
            }
        });
    }
    /**
     * Get the page number of a splitted document's record or undefined if
     * it is not in fact splitted. Stores the page number in the record itself ($page property)
     * @param record
     */
    getPageNumber(record) {
        const containerid = record.containerid;
        if (containerid && record.id.startsWith(containerid)) {
            const pageNumberStr = record.id.slice(containerid.length + 1);
            if (/#\d+#/g.test(pageNumberStr)) {
                const pageNumber = parseInt(pageNumberStr.slice(1, pageNumberStr.length - 1), 10);
                if (!isNaN(pageNumber)) {
                    record.$page = pageNumber;
                    return pageNumber;
                }
            }
        }
        return undefined;
    }
    /**
     * Returns the pages of a given record id
     * @param containerid
     * @param query
     */
    fetchPages(containerid, query) {
        query = this.makeQuery(query);
        query.groupBy = ""; // If the query web service uses GROUP BY containerid
        query.addSelect(this.exprBuilder.makeExpr("containerid", containerid));
        return this.searchService.getResults(query);
    }
    getAuditPreviewDetail(id, query, record, resultId) {
        var _a, _b, _c, _d, _e, _f;
        const queryLanguage = ((_b = (_a = this.searchService.results) === null || _a === void 0 ? void 0 : _a.queryAnalysis) === null || _b === void 0 ? void 0 : _b.queryLanguage) || ((_d = (_c = this.searchService) === null || _c === void 0 ? void 0 : _c.query) === null || _d === void 0 ? void 0 : _d.questionLanguage)
            || ((_f = (_e = this.appService) === null || _e === void 0 ? void 0 : _e.ccquery) === null || _f === void 0 ? void 0 : _f.questionLanguage);
        const collectionColumn = record === null || record === void 0 ? void 0 : record.collection;
        const collection = !!collectionColumn ? collectionColumn[0] : Utils.split(id, "|")[0];
        const rank = !!record ? record.rank : this.rank || 0;
        return {
            "doc-id": id,
            rank: rank,
            collection: collection,
            source: Utils.treeFirstNode(collection),
            resultid: resultId,
            querylang: queryLanguage,
            text: query.text,
            filename: record === null || record === void 0 ? void 0 : record.filename,
            fileext: record === null || record === void 0 ? void 0 : record.fileext,
        };
    }
    /**
     * returns document's preview HTML
     * @param url
     * @returns document's preview HTML
     */
    getHtmlPreview(url) {
        return this.previewWebService.getHtmlPreview(url);
    }
}
PreviewService.ɵfac = function PreviewService_Factory(t) { return new (t || PreviewService)(i0.ɵɵinject(PREVIEW_MODAL, 8), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.PreviewWebService), i0.ɵɵinject(i3.AppService), i0.ɵɵinject(i4.AuthenticationService), i0.ɵɵinject(i5.SearchService), i0.ɵɵinject(i6.ModalService), i0.ɵɵinject(i7.RecentDocumentsService), i0.ɵɵinject(i3.ExprBuilder)); };
PreviewService.ɵprov = i0.ɵɵdefineInjectable({ token: PreviewService, factory: PreviewService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PreviewService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i0.Type, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [PREVIEW_MODAL]
            }] }, { type: i1.Router }, { type: i2.PreviewWebService }, { type: i3.AppService }, { type: i4.AuthenticationService }, { type: i5.SearchService }, { type: i6.ModalService }, { type: i7.RecentDocumentsService }, { type: i3.ExprBuilder }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcHJldmlldy8iLCJzb3VyY2VzIjpbInByZXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQVEsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpGLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFJekMsT0FBTyxFQUFhLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7QUFrQnJELE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBWSxlQUFlLENBQUMsQ0FBQztBQU01RSxNQUFNLE9BQU8sY0FBYztJQUt2QixZQUM4QyxZQUF1QixFQUN6RCxNQUFjLEVBQ2QsaUJBQW9DLEVBQ3BDLFVBQXNCLEVBQ3RCLHFCQUE0QyxFQUM1QyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixzQkFBOEMsRUFDL0MsV0FBd0I7UUFSVyxpQkFBWSxHQUFaLFlBQVksQ0FBVztRQUN6RCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtRQUMvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQVpsQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWdCLENBQUM7UUFjbkQsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxD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QUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ3JELE9BQU87WUFDSCxRQUFRLEVBQUUsRUFBRTtZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsVUFBVSxFQUFFLFVBQVU7WUFDdEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtZQUNoQixRQUFRLEVBQUUsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFFBQVE7WUFDMUIsT0FBTyxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPO1NBQzNCLENBQUE7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGNBQWMsQ0FBQyxHQUFVO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs0RUFuTFEsY0FBYyxjQU1DLGFBQWE7c0RBTjVCLGNBQWMsV0FBZCxjQUFjLG1CQUZYLE1BQU07a0RBRVQsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQU9RLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIEluamVjdCwgVHlwZSwgT3B0aW9uYWx9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlLCBFeHByQnVpbGRlciwgUXVlcnl9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtBdXRoZW50aWNhdGlvblNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2xvZ2luXCI7XG5pbXBvcnQge1ByZXZpZXdXZWJTZXJ2aWNlLCBQcmV2aWV3RGF0YSwgQXVkaXRFdmVudFR5cGUsIFJlY29yZCwgQXVkaXRFdmVudCwgUmVzdWx0c30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge0pzb25PYmplY3QsIFV0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge01vZGFsU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQge1JlY2VudERvY3VtZW50c1NlcnZpY2V9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvc2F2ZWQtcXVlcmllcyc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIFByZXZpZXdFdmVudFR5cGUge1xuICAgIERhdGEgPSBcIlByZXZpZXdfRGF0YVwiLFxuICAgIE1vZGFsID0gXCJQcmV2aWV3X01vZGFsXCIsXG4gICAgUm91dGUgPSBcIlByZXZpZXdfUm91dGVcIixcbiAgICBXaW5kb3cgPSBcIlByZXZpZXdfV2luZG93XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmV2aWV3RXZlbnQge1xuICAgIHR5cGU6IFByZXZpZXdFdmVudFR5cGU7XG4gICAgcmVjb3JkPzogUmVjb3JkO1xuICAgIHF1ZXJ5OiBRdWVyeTtcbn1cblxuZXhwb3J0IGNvbnN0IFBSRVZJRVdfTU9EQUwgPSBuZXcgSW5qZWN0aW9uVG9rZW48VHlwZTxhbnk+PihcIlBSRVZJRVdfTU9EQUxcIik7XG5cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PFByZXZpZXdFdmVudD4oKTtcbiAgICBwcml2YXRlIHJhbms6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFBSRVZJRVdfTU9EQUwpIHB1YmxpYyBwcmV2aWV3TW9kYWw6IFR5cGU8YW55PixcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3V2ViU2VydmljZTogUHJldmlld1dlYlNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhdXRoZW50aWNhdGlvblNlcnZpY2U6IEF1dGhlbnRpY2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlY2VudERvY3VtZW50c1NlcnZpY2U6IFJlY2VudERvY3VtZW50c1NlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBleHByQnVpbGRlcjogRXhwckJ1aWxkZXIpIHtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gb3duIGV2ZW50cyBhbmQgYWRkIGRvY3VtZW50cyB0byB0aGUgcmVjZW50IGRvY3VtZW50cyBzZXJ2aWNlXG4gICAgICAgIHRoaXMuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZihldmVudC5yZWNvcmQgJiYgKGV2ZW50LnR5cGUgPT09IFByZXZpZXdFdmVudFR5cGUuTW9kYWwgfHwgZXZlbnQudHlwZSA9PT0gUHJldmlld0V2ZW50VHlwZS5Sb3V0ZSB8fCBldmVudC50eXBlID09PSBQcmV2aWV3RXZlbnRUeXBlLldpbmRvdykpe1xuICAgICAgICAgICAgICAgIHRoaXMucmVjZW50RG9jdW1lbnRzU2VydmljZS5hZGREb2N1bWVudChldmVudC5yZWNvcmQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYW55IGV2ZW50IGFtb25nIFByZXZpZXdFdmVudFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZXZlbnRzKCkgOiBTdWJqZWN0PFByZXZpZXdFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWFrZVF1ZXJ5KHF1ZXJ5OiBRdWVyeSk6IFF1ZXJ5IHtcbiAgICAgICAgcXVlcnkgPSBVdGlscy5jb3B5KHF1ZXJ5KTtcbiAgICAgICAgZGVsZXRlIHF1ZXJ5LnNvcnQ7XG4gICAgICAgIGRlbGV0ZSBxdWVyeS5zY29wZTtcbiAgICAgICAgZGVsZXRlIHF1ZXJ5LnRhYjtcbiAgICAgICAgZGVsZXRlIHF1ZXJ5LmJhc2tldDtcbiAgICAgICAgZGVsZXRlIHF1ZXJ5LnBhZ2U7XG4gICAgICAgIGRlbGV0ZSBxdWVyeS5xdWVyeUlkO1xuICAgICAgICBpZiAocXVlcnkuc2VsZWN0KSB7XG4gICAgICAgICAgICBxdWVyeS5zZWxlY3QgPSBxdWVyeS5zZWxlY3QuZmlsdGVyKHZhbHVlID0+IFV0aWxzLmVxTkModmFsdWUuZmFjZXQsIFwicmVmaW5lXCIpKTtcbiAgICAgICAgICAgIGlmIChxdWVyeS5zZWxlY3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHF1ZXJ5LnNlbGVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFByZXZpZXdEYXRhKGlkOiBzdHJpbmcsIHF1ZXJ5OiBRdWVyeSwgYXVkaXQgPSB0cnVlKTogT2JzZXJ2YWJsZTxQcmV2aWV3RGF0YT4ge1xuICAgICAgICBsZXQgYXVkaXRFdmVudDogQXVkaXRFdmVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5zZWFyY2hTZXJ2aWNlLmdldFJlY29yZEZyb21JZChpZCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdElkID0gcmVjb3JkID8gdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHM/LmlkIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoYXVkaXQpIHtcbiAgICAgICAgICAgIGF1ZGl0RXZlbnQgPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuRG9jX1ByZXZpZXcsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmdldEF1ZGl0UHJldmlld0RldGFpbChpZCwgcXVlcnksIHJlY29yZCwgcmVzdWx0SWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5tYWtlUXVlcnkocXVlcnkpO1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5wcmV2aWV3V2ViU2VydmljZS5nZXQoaWQsIHF1ZXJ5LCBhdWRpdEV2ZW50KTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocHJldmlld0RhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBwcmV2aWV3RGF0YS5yZXN1bHRJZCA9IHJlc3VsdElkIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpZXdEYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBQcmV2aWV3RXZlbnRUeXBlLkRhdGEsIHJlY29yZCwgcXVlcnl9KTtcblxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbWFrZURvd25sb2FkVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHVybCA/IHRoaXMuYXBwU2VydmljZS51cGRhdGVVcmxGb3JDb3JzKHVybCkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgb3Blbk1vZGFsKHJlY29yZDogUmVjb3JkLCBxdWVyeTogUXVlcnksIG1vZGVsOiBhbnkpIHtcbiAgICAgICAgbW9kZWwucmVjb3JkID0gcmVjb3JkO1xuICAgICAgICBtb2RlbC5xdWVyeSA9IHF1ZXJ5O1xuXG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBQcmV2aWV3RXZlbnRUeXBlLk1vZGFsLCByZWNvcmQsIHF1ZXJ5fSk7XG5cbiAgICAgICAgdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLnByZXZpZXdNb2RhbCwgeyBtb2RlbCB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFF1ZXJ5U3RyKHF1ZXJ5OiBRdWVyeSk6IHN0cmluZyB7XG4gICAgICAgIHF1ZXJ5ID0gdGhpcy5tYWtlUXVlcnkocXVlcnkpO1xuICAgICAgICByZXR1cm4gcXVlcnkudG9Kc29uRm9yUXVlcnlTdHJpbmcoKTtcbiAgICB9XG5cbiAgICBvcGVuTmV3V2luZG93KHJlY29yZDogUmVjb3JkLCBxdWVyeTogUXVlcnkpOiBXaW5kb3cgfCBudWxsIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgaWQ6IHJlY29yZC5pZCxcbiAgICAgICAgICAgIHF1ZXJ5OiB0aGlzLmdldFF1ZXJ5U3RyKHF1ZXJ5KSxcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBTZXJ2aWNlLmFwcE5hbWVcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck92ZXJyaWRlQWN0aXZlICYmIHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJPdmVycmlkZSkge1xuICAgICAgICAgICAgcGFyYW1zW1wib3ZlcnJpZGVVc2VyXCJdID0gdGhpcy5hdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck92ZXJyaWRlLnVzZXJOYW1lO1xuICAgICAgICAgICAgcGFyYW1zW1wib3ZlcnJpZGVEb21haW5cIl0gPSB0aGlzLmF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyT3ZlcnJpZGUuZG9tYWluO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGh0dHBQYXJhbXMgPSBVdGlscy5tYWtlSHR0cFBhcmFtcyhwYXJhbXMpO1xuICAgICAgICBjb25zdCB1cmwgPSBcIiMvcHJldmlldz9cIiArIGh0dHBQYXJhbXMudG9TdHJpbmcoKTtcblxuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogUHJldmlld0V2ZW50VHlwZS5XaW5kb3csIHJlY29yZCwgcXVlcnl9KTtcblxuICAgICAgICByZXR1cm4gd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiKTtcbiAgICB9XG5cbiAgICBvcGVuUm91dGUocmVjb3JkOiBSZWNvcmQsIHF1ZXJ5OiBRdWVyeSwgcGF0aCA9IFwicHJldmlld1wiKTogUHJvbWlzZTxCb29sZWFuPiB7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6UHJldmlld0V2ZW50VHlwZS5Sb3V0ZSwgcmVjb3JkLCBxdWVyeX0pO1xuICAgICAgICB0aGlzLnJhbmsgPSByZWNvcmQucmFuaztcblxuICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3BhdGhdLCB7XG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICAgICAgICAgIGlkOiByZWNvcmQuaWQsXG4gICAgICAgICAgICAgICAgcXVlcnk6IHRoaXMuZ2V0UXVlcnlTdHIocXVlcnkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcGFnZSBudW1iZXIgb2YgYSBzcGxpdHRlZCBkb2N1bWVudCdzIHJlY29yZCBvciB1bmRlZmluZWQgaWZcbiAgICAgKiBpdCBpcyBub3QgaW4gZmFjdCBzcGxpdHRlZC4gU3RvcmVzIHRoZSBwYWdlIG51bWJlciBpbiB0aGUgcmVjb3JkIGl0c2VsZiAoJHBhZ2UgcHJvcGVydHkpXG4gICAgICogQHBhcmFtIHJlY29yZCBcbiAgICAgKi9cbiAgICBnZXRQYWdlTnVtYmVyKHJlY29yZDogUmVjb3JkKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyaWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHJlY29yZC5jb250YWluZXJpZDtcbiAgICAgICAgaWYoY29udGFpbmVyaWQgJiYgcmVjb3JkLmlkLnN0YXJ0c1dpdGgoY29udGFpbmVyaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdlTnVtYmVyU3RyID0gcmVjb3JkLmlkLnNsaWNlKGNvbnRhaW5lcmlkLmxlbmd0aCsxKTtcbiAgICAgICAgICAgIGlmKC8jXFxkKyMvZy50ZXN0KHBhZ2VOdW1iZXJTdHIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZU51bWJlciA9IHBhcnNlSW50KHBhZ2VOdW1iZXJTdHIuc2xpY2UoMSwgcGFnZU51bWJlclN0ci5sZW5ndGgtMSksIDEwKTtcbiAgICAgICAgICAgICAgICBpZighaXNOYU4ocGFnZU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkLiRwYWdlID0gcGFnZU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhZ2VOdW1iZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcGFnZXMgb2YgYSBnaXZlbiByZWNvcmQgaWRcbiAgICAgKiBAcGFyYW0gY29udGFpbmVyaWRcbiAgICAgKiBAcGFyYW0gcXVlcnlcbiAgICAgKi9cbiAgICBmZXRjaFBhZ2VzKGNvbnRhaW5lcmlkOiBzdHJpbmcsIHF1ZXJ5OiBRdWVyeSk6IE9ic2VydmFibGU8UmVzdWx0cz4ge1xuICAgICAgICBxdWVyeSA9IHRoaXMubWFrZVF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgcXVlcnkuZ3JvdXBCeSA9IFwiXCI7IC8vIElmIHRoZSBxdWVyeSB3ZWIgc2VydmljZSB1c2VzIEdST1VQIEJZIGNvbnRhaW5lcmlkXG4gICAgICAgIHF1ZXJ5LmFkZFNlbGVjdCh0aGlzLmV4cHJCdWlsZGVyLm1ha2VFeHByKFwiY29udGFpbmVyaWRcIiwgY29udGFpbmVyaWQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5nZXRSZXN1bHRzKHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBnZXRBdWRpdFByZXZpZXdEZXRhaWwoaWQ6IHN0cmluZywgcXVlcnk6IFF1ZXJ5LCByZWNvcmQ/OiBSZWNvcmQsIHJlc3VsdElkPzogc3RyaW5nKTogSnNvbk9iamVjdCB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5TGFuZ3VhZ2UgPSB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cz8ucXVlcnlBbmFseXNpcz8ucXVlcnlMYW5ndWFnZVxuICAgICAgICAgICAgfHwgdGhpcy5zZWFyY2hTZXJ2aWNlPy5xdWVyeT8ucXVlc3Rpb25MYW5ndWFnZVxuICAgICAgICAgICAgfHwgdGhpcy5hcHBTZXJ2aWNlPy5jY3F1ZXJ5Py5xdWVzdGlvbkxhbmd1YWdlO1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uQ29sdW1uID0gcmVjb3JkPy5jb2xsZWN0aW9uO1xuICAgICAgICBjb25zdCBjb2xsZWN0aW9uID0gISFjb2xsZWN0aW9uQ29sdW1uID8gY29sbGVjdGlvbkNvbHVtblswXSA6IFV0aWxzLnNwbGl0KGlkLCBcInxcIilbMF07XG4gICAgICAgIGNvbnN0IHJhbmsgPSAhIXJlY29yZCA/IHJlY29yZC5yYW5rIDogdGhpcy5yYW5rIHx8IDA7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImRvYy1pZFwiOiBpZCxcbiAgICAgICAgICAgIHJhbms6IHJhbmssXG4gICAgICAgICAgICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uLFxuICAgICAgICAgICAgc291cmNlOiBVdGlscy50cmVlRmlyc3ROb2RlKGNvbGxlY3Rpb24pLFxuICAgICAgICAgICAgcmVzdWx0aWQ6IHJlc3VsdElkLFxuICAgICAgICAgICAgcXVlcnlsYW5nOiBxdWVyeUxhbmd1YWdlLFxuICAgICAgICAgICAgdGV4dDogcXVlcnkudGV4dCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiByZWNvcmQ/LmZpbGVuYW1lLFxuICAgICAgICAgICAgZmlsZWV4dDogcmVjb3JkPy5maWxlZXh0LFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIHJldHVybnMgZG9jdW1lbnQncyBwcmV2aWV3IEhUTUxcbiAgICAgKiBAcGFyYW0gdXJsIFxuICAgICAqIEByZXR1cm5zIGRvY3VtZW50J3MgcHJldmlldyBIVE1MXG4gICAgICovXG4gICAgcHVibGljIGdldEh0bWxQcmV2aWV3KHVybDpzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldmlld1dlYlNlcnZpY2UuZ2V0SHRtbFByZXZpZXcodXJsKTtcbiAgICB9XG59Il19