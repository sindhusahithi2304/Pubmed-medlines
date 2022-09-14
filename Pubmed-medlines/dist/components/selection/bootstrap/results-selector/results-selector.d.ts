import { SelectionService } from "../../selection.service";
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
export declare class BsResultsSelector {
    selectionService: SelectionService;
    size: string;
    style: string;
    rightAligned: boolean;
    constructor(selectionService: SelectionService);
    get actions(): Action[];
    static ɵfac: i0.ɵɵFactoryDef<BsResultsSelector, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsResultsSelector, "sq-results-selector", never, { "size": "size"; "style": "style"; "rightAligned": "rightAligned"; }, {}, never, never>;
}
//# sourceMappingURL=results-selector.d.ts.map