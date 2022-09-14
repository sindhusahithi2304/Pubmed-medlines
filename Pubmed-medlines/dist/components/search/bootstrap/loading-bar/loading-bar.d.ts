import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
export declare class BsLoadingBar {
    searchService: SearchService;
    /**
     * active can provided as a boolean to activate the loading bar.
     * If it is not provided, the SearchService searchActive property is used.
     */
    active?: boolean;
    constructor(searchService: SearchService);
    isActive(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsLoadingBar, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsLoadingBar, "sq-loading-bar", never, { "active": "active"; }, {}, never, never>;
}
//# sourceMappingURL=loading-bar.d.ts.map