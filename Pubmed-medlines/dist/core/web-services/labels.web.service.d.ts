import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { IntlService } from "@sinequa/core/intl";
import { IQuery } from "./query/query";
import * as i0 from "@angular/core";
/**
 * Describes the object returned by the list action of the labels web service
 */
export interface Labels {
    labels: string[];
}
/**
 * Describes the object returned by the getUserRights action of the labels web service
 */
export interface LabelsRights {
    canManagePublicLabels: boolean;
    canEditPublicLabels: boolean;
}
/**
 * A service for calling the labels web service
 */
export declare class LabelsWebService extends HttpService {
    private httpClient;
    private intlService;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient, intlService: IntlService);
    /**
     * Calls the list action of the labels web service
     *
     * @param prefix The string that the returned labels should begin with
     * @param _public Determines whether public or private labels should be returned
     */
    list(prefix: string, _public: boolean): Observable<Labels>;
    /**
     * A wrapper around the list method. The matching labels are returned as an array of strings
     *
     * @param prefix The string that the returned labels should begin with
     * @param _public Determines whether public or private labels should be returned
     */
    array(prefix: string, _public: boolean): Observable<string[]>;
    /**
     * Calls the getUserRights action of the labels web service
     */
    getUserRights(): Observable<LabelsRights>;
    /**
     * Add labels to a set of documents
     *
     * @param labels The labels to add
     * @param ids The ids of the documents to which the labels should be added
     * @param _public Determines whether the labels are public or private
     */
    add(labels: string[], ids: string[], _public: boolean): Observable<void>;
    /**
     * Removes labels from a set of documents
     *
     * @param labels The labels to remove
     * @param ids The ids of the documents from which the labels should be removed
     * @param _public Determines whether the labels are public or private
     */
    remove(labels: string[], ids: string[], _public: boolean): Observable<void>;
    /**
     * Renames a set of labels
     *
     * @param labels The labels to rename
     * @param newLabel The new name for the labels
     * @param _public Determines whether the labels are public or private
     */
    rename(labels: string[], newLabel: string, _public: boolean): Observable<void>;
    /**
     * Deletes a set of labels
     *
     * @param labels The labels to be deleted
     * @param _public Determines whether the labels are public or private
     */
    delete(labels: string[], _public: boolean): Observable<void>;
    /**
     * Adds labels to the documents identified by the passed query
     *
     * @param labels The labels to add
     * @param query The query to produce the documents to which the labels should be added
     * @param _public Determines whether the labels are public or private
     */
    bulkAdd(labels: string[], query: IQuery, _public: boolean): Observable<void>;
    /**
     * Removes labels from the documents identified by the passed query
     *
     * @param labels The labels to remove
     * @param query The query to produce the documents from which the labels should be removed
     * @param _public Determines whether the labels are public or private
     */
    bulkRemove(labels: string[], query: IQuery, _public: boolean): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDef<LabelsWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<LabelsWebService>;
}
//# sourceMappingURL=labels.web.service.d.ts.map