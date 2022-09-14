import { OnChanges, SimpleChanges } from "@angular/core";
import { AppService } from "@sinequa/core/app-utils";
import { Results } from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
export declare class BsSortSelector implements OnChanges {
    appService: AppService;
    searchService: SearchService;
    results: Results;
    rightAligned: boolean;
    style: string;
    size: string;
    sortAction: Action | undefined;
    constructor(appService: AppService, searchService: SearchService);
    ngOnChanges(changes: SimpleChanges): void;
    private setCurrentSort;
    private selectSort;
    private buildSortAction;
    private isAscendingSort;
    private isDescendingSort;
    private isTabSearch;
    private getSortingChoices;
    static ɵfac: i0.ɵɵFactoryDef<BsSortSelector, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsSortSelector, "sq-sort-selector", never, { "results": "results"; "rightAligned": "rightAligned"; "style": "style"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=sort-selector.d.ts.map