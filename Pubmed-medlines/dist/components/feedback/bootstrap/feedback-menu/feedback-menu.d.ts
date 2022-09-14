import { OnInit } from "@angular/core";
import { Action, ActionButtonsOptions } from "@sinequa/components/action";
import { FeedbackService } from "../../feedback.service";
import * as i0 from "@angular/core";
export declare class BsFeedbackMenu implements OnInit {
    feedbackService: FeedbackService;
    size: string;
    style: string;
    rightAligned: boolean;
    items: Action[];
    options: ActionButtonsOptions;
    constructor(feedbackService: FeedbackService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsFeedbackMenu, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFeedbackMenu, "sq-feedback-menu", never, { "size": "size"; "style": "style"; "rightAligned": "rightAligned"; }, {}, never, never>;
}
//# sourceMappingURL=feedback-menu.d.ts.map