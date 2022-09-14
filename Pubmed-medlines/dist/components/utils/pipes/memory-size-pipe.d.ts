import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import { FormatService } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
/**
 * A pipe to transform a number into a readable internationalized memory size label,
 * for example "126432" into "126 kB".
 *
 * @example
 * <span>Size:</span><span>{{ documentSize | sqMemorySize }}</span>
 */
export declare class MemorySizePipe extends AbstractIntlPipe {
    protected formatService: FormatService;
    constructor(formatService: FormatService, intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: number): void;
    static ɵfac: i0.ɵɵFactoryDef<MemorySizePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<MemorySizePipe, "sqMemorySize">;
}
//# sourceMappingURL=memory-size-pipe.d.ts.map