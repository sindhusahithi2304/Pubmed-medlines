import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import moment from "moment";
import * as i0 from "@angular/core";
export interface MomentParams {
    format?: string;
    type?: "fromNow" | "from" | "toNow" | "to" | "calendar" | "diff" | "valueOf" | "unix" | "daysInMonth" | "iso";
    suffix?: boolean;
    reference?: moment.MomentInput;
    unit?: moment.unitOfTime.Diff;
    precise?: boolean;
}
export declare class MomentPipe extends AbstractIntlPipe {
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: moment.MomentInput, params?: MomentParams): void;
    static ɵfac: i0.ɵɵFactoryDef<MomentPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<MomentPipe, "sqMoment">;
}
//# sourceMappingURL=moment-pipe.d.ts.map