import { OnChanges, SimpleChanges, EventEmitter } from "@angular/core";
import { Results, Tab } from "@sinequa/core/web-services";
import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
export declare class BsTabs implements OnChanges {
    private searchService;
    results: Results;
    /**
     * List of custom tabs (complementing the search query tabs)
     * Actions can be performed on click via the events Output.
     *
     * When the results are updated (new search text, facet
     * selection...), the custom tab selection is discarded.
     * If the custom action updates the results, the tab selection
     * will revert to previous state unless the query is updated.
     */
    customtabs: Tab[];
    /**
     * Associate icon to a tab name ({tab1 : 'icon class 1', tab2 : ...})
     */
    iconMap: {
        [key: string]: string;
    };
    /**
     * Emits an event when a tab is selected
     */
    events: EventEmitter<Tab>;
    currentTab: Tab | undefined;
    searchtabs: Tab[] | undefined;
    constructor(searchService: SearchService);
    update(): void;
    ngOnChanges(changes: SimpleChanges): void;
    selectTab(tab: Tab, search?: boolean): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsTabs, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsTabs, "sq-tabs", never, { "results": "results"; "customtabs": "customtabs"; "iconMap": "iconMap"; }, { "events": "events"; }, never, never>;
}
//# sourceMappingURL=tabs.d.ts.map