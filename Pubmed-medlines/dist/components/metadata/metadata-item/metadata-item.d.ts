import { OnChanges, SimpleChanges, EventEmitter } from "@angular/core";
import { AppService, FormatService, ValueItem } from "@sinequa/core/app-utils";
import { Record, DocumentAccessLists, CCColumn } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export interface TreeValueItem extends ValueItem {
    parts: ValueItem[];
}
export declare class MetadataItem implements OnChanges {
    appService: AppService;
    formatService: FormatService;
    record: Record;
    item: string;
    showTitle: boolean;
    showIcon: boolean;
    showCounts: boolean;
    clickable: boolean;
    tabular: boolean;
    collapseRows: boolean;
    _select: EventEmitter<{
        item: string;
        valueItem: ValueItem;
    }>;
    get hidden(): boolean;
    valueItems: (ValueItem | TreeValueItem)[];
    column: CCColumn | undefined;
    isTree: boolean;
    isEntity: boolean;
    isCsv: boolean;
    itemLabelMessageParams: any;
    collapsed: boolean;
    needsCollapse: boolean;
    constructor(appService: AppService, formatService: FormatService);
    ensureScalarValue(value: any): any;
    ngOnChanges(changes: SimpleChanges): void;
    get isEmpty(): boolean;
    get itemClasses(): string;
    get label(): string;
    get isAccessLists(): boolean;
    get accessListsData(): DocumentAccessLists;
    get docFormatIconClass(): string;
    select(index: number, subIndex?: number): boolean;
    toggleCollapse(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<MetadataItem, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<MetadataItem, "sq-metadata-item", never, { "record": "record"; "item": "item"; "showTitle": "showTitle"; "showIcon": "showIcon"; "showCounts": "showCounts"; "clickable": "clickable"; "tabular": "tabular"; "collapseRows": "collapseRows"; }, { "_select": "select"; }, never, never>;
}
//# sourceMappingURL=metadata-item.d.ts.map