import { OnInit, ChangeDetectorRef } from "@angular/core";
import { Record, CCRating, UserRatingsWebService } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class UserRating implements OnInit {
    private userRatingService;
    private changeDetector;
    record: Record;
    ratingsColumn: string;
    averageColumn: string;
    updateDocWeight: boolean;
    count: number;
    values: string;
    titles: string;
    caption: string;
    showAverage: boolean;
    userRatingIndex: number;
    averageRatingIndex: number;
    ratingValues: string[];
    constructor(userRatingService: UserRatingsWebService, changeDetector: ChangeDetectorRef);
    ngOnInit(): void;
    getCCRating(): CCRating;
    get messageParams(): {
        values: {
            average: string;
        };
    };
    getTitle(ratingIndex: number): string;
    getRating(ratingIndex: number): string;
    getAverageRating(): string;
    select(selectedRatingIndex: number): void;
    private ensureRatingValues;
    private handleResponse;
    static ɵfac: i0.ɵɵFactoryDef<UserRating, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<UserRating, "sq-user-rating", never, { "record": "record"; "ratingsColumn": "ratingsColumn"; "averageColumn": "averageColumn"; "updateDocWeight": "updateDocWeight"; "count": "count"; "values": "values"; "titles": "titles"; "caption": "caption"; "showAverage": "showAverage"; }, {}, never, never>;
}
//# sourceMappingURL=user-rating.d.ts.map