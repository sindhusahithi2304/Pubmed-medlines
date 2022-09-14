import { OnChanges, SimpleChanges, EventEmitter } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class ResultThumbnail implements OnChanges {
    private appService;
    private searchService;
    record: Record;
    linkBehavior: "open" | "action";
    thumbnailColumn: string;
    defaultThumbnail: string;
    thumbnailClicked: EventEmitter<boolean>;
    thumbnailUrl: string;
    private documentUrl;
    constructor(appService: AppService, searchService: SearchService);
    ngOnChanges(changes: SimpleChanges): void;
    get hasLinkBehaviour(): boolean;
    get href(): string;
    get target(): string;
    click(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<ResultThumbnail, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ResultThumbnail, "sq-result-thumbnail", never, { "record": "record"; "linkBehavior": "linkBehavior"; "thumbnailColumn": "thumbnailColumn"; "defaultThumbnail": "defaultThumbnail"; }, { "thumbnailClicked": "thumbnailClicked"; }, never, never>;
}
//# sourceMappingURL=result-thumbnail.d.ts.map