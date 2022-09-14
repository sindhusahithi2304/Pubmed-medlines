import { OnInit } from "@angular/core";
import { ValueItem } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class ResultSource implements OnInit {
    searchService: SearchService;
    record: Record;
    displayTreepath: boolean;
    displayTreepathMinLevel: number;
    displayTreepathMaxLevel: number;
    displayUrl: boolean;
    source: ValueItem[];
    url: string;
    constructor(searchService: SearchService);
    ngOnInit(): void;
    select(item: any): void;
    static ɵfac: i0.ɵɵFactoryDef<ResultSource, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ResultSource, "sq-result-source", never, { "record": "record"; "displayTreepath": "displayTreepath"; "displayTreepathMinLevel": "displayTreepathMinLevel"; "displayTreepathMaxLevel": "displayTreepathMaxLevel"; "displayUrl": "displayUrl"; }, {}, never, never>;
}
//# sourceMappingURL=result-source.d.ts.map