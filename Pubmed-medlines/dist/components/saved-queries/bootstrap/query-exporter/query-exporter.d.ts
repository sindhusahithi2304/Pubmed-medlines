import { Results } from "@sinequa/core/web-services";
import { SavedQueriesService } from "../../saved-queries.service";
import { SelectionService } from "@sinequa/components/selection";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
/**
 * Toolbar component for Export query feature.
 *
 */
export declare class BsQueryExporter {
    private selectionService;
    private savedQueriesService;
    results: Results;
    rightAligned: boolean;
    exportAction: Action;
    constructor(selectionService: SelectionService, savedQueriesService: SavedQueriesService);
    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    hasSelectedRecords(): boolean;
    /**
     * Generic export function.
     * <p>
     * Opens up a dialog to let user choose the export source, export format and other parameters.
     *
     * @memberof QueryExporter
     */
    export(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsQueryExporter, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsQueryExporter, "sq-query-exporter", never, { "results": "results"; "rightAligned": "rightAligned"; }, {}, never, never>;
}
//# sourceMappingURL=query-exporter.d.ts.map