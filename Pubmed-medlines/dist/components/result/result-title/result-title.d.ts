import { OnChanges, SimpleChanges, EventEmitter } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class ResultTitle implements OnChanges {
    searchService: SearchService;
    private appService;
    /** The record which title we want to display */
    record: Record;
    /**
     * "open" mode: Display a link which opens the original document (url1) if available, or emits a titleClicked event to perform an action otherwise
     * "action" mode: Display a link which emits a titleClicked event to perform an action
     * "open-if-url" mode: Display a link which opens the original document (url1) if available, or displays a SPAN with the title otherwise
     * "display" mode: Only display a SPAN element (no link)
     */
    titleLinkBehavior: "open" | "action" | "open-if-url" | "display";
    /** Optional field name containing the title. Otherwise displayTitle or title are used */
    field: string;
    /** Optional custom target used in the link */
    originalDocTarget: string | undefined;
    /** Event emitter to perform actions at the parent level */
    titleClicked: EventEmitter<boolean>;
    title: string;
    private titleField;
    private documentUrl;
    constructor(searchService: SearchService, appService: AppService);
    ngOnChanges(changes: SimpleChanges): void;
    get hasLinkBehaviour(): boolean;
    /**
     * A span is shown in "display" mode or "open-if-url" mode when no url is present
     * A link is shown in all other cases (even in "open" mode with no url, which is equivalent to "action" mode)
     */
    get hasSpanBehaviour(): boolean;
    get href(): string;
    get target(): string;
    get hasUrl(): boolean;
    private getTitle;
    click(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<ResultTitle, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<ResultTitle, "sq-result-title", never, { "record": "record"; "titleLinkBehavior": "titleLinkBehavior"; "field": "field"; "originalDocTarget": "originalDocTarget"; }, { "titleClicked": "titleClicked"; }, never, never>;
}
//# sourceMappingURL=result-title.d.ts.map