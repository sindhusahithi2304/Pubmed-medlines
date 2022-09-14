import { OnChanges, SimpleChanges } from '@angular/core';
import { Results } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { Action } from "@sinequa/components/action";
import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
/**
 * Component for choosing the page size of the results view
 *
 */
export declare class BsPageSizeSelector implements OnChanges {
    private appService;
    private searchService;
    results: Results;
    showInRegularView: boolean;
    showInCustomization: boolean;
    pageSizes: number[];
    rightAligned: boolean;
    pageSizingAction: Action;
    private availableSizes;
    private currentPageSize;
    constructor(appService: AppService, searchService: SearchService);
    ngOnChanges(changes: SimpleChanges): void;
    private get configPageSize();
    private get defaultPageSize();
    private buildPageSizingAction;
    private refreshVisualisation;
    private setCurrentSize;
    private updatePageSize;
    static ɵfac: i0.ɵɵFactoryDef<BsPageSizeSelector, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPageSizeSelector, "sq-page-size-selector", never, { "results": "results"; "showInRegularView": "showInRegularView"; "showInCustomization": "showInCustomization"; "pageSizes": "pageSizes"; "rightAligned": "rightAligned"; }, {}, never, never>;
}
//# sourceMappingURL=page-size-selector.d.ts.map