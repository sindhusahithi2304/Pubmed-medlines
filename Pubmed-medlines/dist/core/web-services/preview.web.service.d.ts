import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { IQuery } from "./query/query";
import { Record } from "./query.web.service";
import { AuditEvents } from "./audit.web.service";
import * as i0 from "@angular/core";
/**
 * Describes highlight data for a set of categories
 */
export interface HighlightDataPerCategory {
    [key: string]: CategoryHighlightData;
}
/**
 * Describes highlight data for a category
 */
export interface CategoryHighlightData {
    categoryDisplayLabel: string;
    categoryDisplayLabelPlural: string;
    categoryFilterAllLabel: string;
    categoryFilterNoneLabel: string;
    values: HighlightValue[];
}
/**
 * Describes a highlight value
 */
export interface HighlightValue {
    value: string;
    displayValue: string;
    locations: Location[];
}
/**
 * Describes a single highlight location
 */
export interface Location {
    start: number;
    enclosingLength: number;
}
/**
 * Describes highlight data for a set of locations
 */
export interface HighlightDataPerLocation {
    [index: number]: {
        start: number;
        length: number;
        values: string[];
        displayValue: string;
        positionInCategories: {
            [category: string]: number;
        };
    };
    size(): number;
}
/**
 * Describes the data returned by [PreviewWebService.get]{@link PreviewWebService#get}
 */
export interface PreviewData {
    record: Record;
    resultId: string;
    cacheId: string;
    highlightsPerCategory: HighlightDataPerCategory;
    highlightsPerLocation: HighlightDataPerLocation;
    documentCachedContentUrl: string;
}
/**
 * A service for calling the preview web service
 */
export declare class PreviewWebService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Gets {@link PreviewData} for a document in the context of a {@link IQuery}
     *
     * @param id The document id
     * @param query The query context
     * @param auditEvents Audit events to store on the server
     */
    get(id: string, query: IQuery, auditEvents?: AuditEvents): Observable<PreviewData>;
    /**
     * Gets document's preview HTML content
     *
     * @param url The document preview URL
     * @returns
     */
    getHtmlPreview(url: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDef<PreviewWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<PreviewWebService>;
}
//# sourceMappingURL=preview.web.service.d.ts.map