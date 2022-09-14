import { EventEmitter } from "@angular/core";
import { SearchService } from "@sinequa/components/search";
import { AppService, ValueItem } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class Metadata {
    appService: AppService;
    searchService: SearchService;
    record: Record;
    items: string[];
    showTitles: boolean;
    showIcons: boolean;
    showCounts: boolean;
    clickable: boolean;
    tabular: boolean;
    collapseRows: boolean;
    searchOnClick: boolean;
    _select: EventEmitter<{
        item: string;
        valueItem: ValueItem;
    }>;
    constructor(appService: AppService, searchService: SearchService);
    select(item: string, valueItem: ValueItem): void;
    static ɵfac: i0.ɵɵFactoryDef<Metadata, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Metadata, "sq-metadata", never, { "record": "record"; "items": "items"; "showTitles": "showTitles"; "showIcons": "showIcons"; "showCounts": "showCounts"; "clickable": "clickable"; "tabular": "tabular"; "collapseRows": "collapseRows"; "searchOnClick": "searchOnClick"; }, { "_select": "select"; }, never, never>;
}
//# sourceMappingURL=metadata.d.ts.map