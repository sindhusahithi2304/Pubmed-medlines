import { OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Query } from "@sinequa/core/app-utils";
import { Results } from "@sinequa/core/web-services";
import { ResultsViewService, ResultsView } from "../../results-view.service";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
export declare class BsResultsViewSelector implements OnChanges, OnDestroy {
    resultsViewService: ResultsViewService;
    query: Query;
    results: Results;
    rightAligned: boolean;
    useDropdownMenu: boolean;
    size: string;
    private viewAction;
    items: Action[];
    constructor(resultsViewService: ResultsViewService);
    private _subscription;
    ngOnDestroy(): void;
    private setCurrentViewAction;
    private buildViewAction;
    ngOnChanges(changes: SimpleChanges): void;
    selectView(view: ResultsView): void;
    static ɵfac: i0.ɵɵFactoryDef<BsResultsViewSelector, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsResultsViewSelector, "sq-results-view-selector", never, { "query": "query"; "results": "results"; "rightAligned": "rightAligned"; "useDropdownMenu": "useDropdownMenu"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=results-view-selector.d.ts.map