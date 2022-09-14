/// <reference types="sq-extra-typings" />
import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
export declare class RelativeTimePipe extends AbstractIntlPipe {
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: string | number | Date | undefined, params: {
        unit: Intl.RelativeTimeUnit;
    } & Intl.RelativeTimeFormatOptions & {
        format?: string;
    }): void;
    static ɵfac: i0.ɵɵFactoryDef<RelativeTimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<RelativeTimePipe, "sqRelativeTime">;
}
//# sourceMappingURL=relative-time-pipe.d.ts.map