import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
export declare class NumberPipe extends AbstractIntlPipe {
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: number | string, params: Intl.NumberFormatOptions): void;
    static ɵfac: i0.ɵɵFactoryDef<NumberPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<NumberPipe, "sqNumber">;
}
//# sourceMappingURL=number-pipe.d.ts.map