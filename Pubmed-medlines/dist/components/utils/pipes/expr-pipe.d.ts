import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import { Expr, ExprMessageOptions } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
export declare class ExprPipe extends AbstractIntlPipe {
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(key: Expr | string, params: ExprMessageOptions): void;
    static ɵfac: i0.ɵɵFactoryDef<ExprPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<ExprPipe, "sqExpr">;
}
//# sourceMappingURL=expr-pipe.d.ts.map