import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import { FormatService, ValueItem } from "@sinequa/core/app-utils";
import { CCColumn } from "@sinequa/core/web-services";
import { FieldValue } from "@sinequa/core/base";
import * as i0 from "@angular/core";
export declare class ValuePipe extends AbstractIntlPipe {
    protected formatService: FormatService;
    constructor(formatService: FormatService, intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: ValueItem | FieldValue, params: CCColumn): void;
    static ɵfac: i0.ɵɵFactoryDef<ValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<ValuePipe, "sqValue">;
}
//# sourceMappingURL=value-pipe.d.ts.map