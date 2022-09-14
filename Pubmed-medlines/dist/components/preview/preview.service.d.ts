import { InjectionToken, Type } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AppService, ExprBuilder, Query } from "@sinequa/core/app-utils";
import { AuthenticationService } from "@sinequa/core/login";
import { PreviewWebService, PreviewData, Record, Results } from "@sinequa/core/web-services";
import { JsonObject } from "@sinequa/core/base";
import { ModalService } from "@sinequa/core/modal";
import { SearchService } from "@sinequa/components/search";
import { RecentDocumentsService } from '@sinequa/components/saved-queries';
import * as i0 from "@angular/core";
export declare const enum PreviewEventType {
    Data = "Preview_Data",
    Modal = "Preview_Modal",
    Route = "Preview_Route",
    Window = "Preview_Window"
}
export interface PreviewEvent {
    type: PreviewEventType;
    record?: Record;
    query: Query;
}
export declare const PREVIEW_MODAL: InjectionToken<Type<any>>;
export declare class PreviewService {
    previewModal: Type<any>;
    private router;
    private previewWebService;
    private appService;
    private authenticationService;
    private searchService;
    private modalService;
    private recentDocumentsService;
    exprBuilder: ExprBuilder;
    private readonly _events;
    private rank;
    constructor(previewModal: Type<any>, router: Router, previewWebService: PreviewWebService, appService: AppService, authenticationService: AuthenticationService, searchService: SearchService, modalService: ModalService, recentDocumentsService: RecentDocumentsService, exprBuilder: ExprBuilder);
    /**
     * Triggers any event among PreviewEvent
     */
    get events(): Subject<PreviewEvent>;
    private makeQuery;
    getPreviewData(id: string, query: Query, audit?: boolean): Observable<PreviewData>;
    makeDownloadUrl(url: string): string | undefined;
    openModal(record: Record, query: Query, model: any): void;
    private getQueryStr;
    openNewWindow(record: Record, query: Query): Window | null;
    openRoute(record: Record, query: Query, path?: string): Promise<Boolean>;
    /**
     * Get the page number of a splitted document's record or undefined if
     * it is not in fact splitted. Stores the page number in the record itself ($page property)
     * @param record
     */
    getPageNumber(record: Record): number | undefined;
    /**
     * Returns the pages of a given record id
     * @param containerid
     * @param query
     */
    fetchPages(containerid: string, query: Query): Observable<Results>;
    getAuditPreviewDetail(id: string, query: Query, record?: Record, resultId?: string): JsonObject;
    /**
     * returns document's preview HTML
     * @param url
     * @returns document's preview HTML
     */
    getHtmlPreview(url: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDef<PreviewService, [{ optional: true; }, null, null, null, null, null, null, null, null]>;
    static ɵprov: i0.ɵɵInjectableDef<PreviewService>;
}
//# sourceMappingURL=preview.service.d.ts.map