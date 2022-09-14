import { OnChanges, SimpleChanges } from "@angular/core";
import { Results, DidYouMeanItem } from "@sinequa/core/web-services";
import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
export declare class BsDidYouMean implements OnChanges {
    searchService: SearchService;
    results: Results;
    context: "search" | "refine";
    item: DidYouMeanItem | undefined;
    constructor(searchService: SearchService);
    private handleResults;
    ngOnChanges(changes: SimpleChanges): void;
    selectOriginal(): boolean;
    selectCorrected(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsDidYouMean, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsDidYouMean, "sq-did-you-mean", never, { "results": "results"; "context": "context"; }, {}, never, never>;
}
//# sourceMappingURL=did-you-mean.d.ts.map