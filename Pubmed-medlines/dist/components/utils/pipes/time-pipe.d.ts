import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
export declare class TimePipe extends AbstractIntlPipe {
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: number | Date, params: Intl.DateTimeFormatOptions): void;
    static ɵfac: i0.ɵɵFactoryDef<TimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<TimePipe, "sqTime">;
}
//# sourceMappingURL=time-pipe.d.ts.map