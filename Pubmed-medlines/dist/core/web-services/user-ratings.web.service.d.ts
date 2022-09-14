import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { Record } from "./query.web.service";
import * as i0 from "@angular/core";
/**
 * Describes a rating configuration object
 */
export interface CCRating {
    ratingsColumn: string;
    averageColumn: string;
    updateDocWeight: boolean;
    ratingsDistribution: string[];
}
/**
 * Describes a user rating response object
 */
export interface UserRatingResponse {
    rating: number;
    averagerating: number;
}
/**
 * A service for calling the ratings web service
 */
export declare class UserRatingsWebService extends HttpService {
    private httpClient;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Gets the current user rating for a document
     *
     * @param docid The id of a document for which to get the rating
     * @param config The ratings configuration
     */
    getRating(docid: string, config: CCRating): Observable<UserRatingResponse>;
    /**
     * Sets the current user rating for a document
     *
     * @param record The document for which to set the rating
     * @param rating A rating value
     * @param config The ratings configuration
     */
    setRating(record: Record, rating: number, config: CCRating): Observable<UserRatingResponse>;
    /**
     * Delete a rating for a document
     *
     * @param record The document for which to delete the rating
     * @param config The ratings configuration
     */
    deleteRating(record: Record, config: CCRating): Observable<UserRatingResponse>;
    /**
     * Gets user rating information from the given record
     *
     * @param record The record for which to get the rating
     * @param config The ratings configuration
     */
    getRecordRating(record: Record, config: CCRating): UserRatingResponse;
    private parseAverageRating;
    private parseUserRating;
    static ɵfac: i0.ɵɵFactoryDef<UserRatingsWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<UserRatingsWebService>;
}
//# sourceMappingURL=user-ratings.web.service.d.ts.map