import { OnChanges, SimpleChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class ResultMissingTerms implements OnChanges {
    record: Record;
    missingTerms: string[];
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDef<ResultMissingTerms, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ResultMissingTerms, "sq-result-missing-terms", never, { "record": "record"; }, {}, never, never>;
}
//# sourceMappingURL=result-missing-terms.d.ts.map