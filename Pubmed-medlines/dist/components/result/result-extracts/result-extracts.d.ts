import { OnChanges, SimpleChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class ResultExtracts implements OnChanges {
    record: Record;
    limitLinesDisplayed: boolean;
    showLinesExpander: boolean;
    showTextAlways: boolean;
    showLongExtracts: boolean;
    hideDate: boolean;
    maxLongExtracts: number;
    dateFormat: Intl.DateTimeFormatOptions;
    collapsed: boolean;
    text: string | undefined;
    longExtracts: string[] | undefined;
    extractsClass: string;
    setup(): void;
    ngOnChanges(changes: SimpleChanges): void;
    collapseClick(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDef<ResultExtracts, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ResultExtracts, "sq-result-extracts", never, { "record": "record"; "limitLinesDisplayed": "limitLinesDisplayed"; "showLinesExpander": "showLinesExpander"; "showTextAlways": "showTextAlways"; "showLongExtracts": "showLongExtracts"; "hideDate": "hideDate"; "maxLongExtracts": "maxLongExtracts"; "dateFormat": "dateFormat"; }, {}, never, never>;
}
//# sourceMappingURL=result-extracts.d.ts.map