import { ChangeDetectorRef } from "@angular/core";
import { AbstractIntlPipe, IntlService } from "@sinequa/core/intl";
import { LabelsService } from "./labels.service";
import * as i0 from "@angular/core";
export declare class LabelPipe extends AbstractIntlPipe {
    protected labelsService: LabelsService;
    constructor(labelsService: LabelsService, intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    updateValue(value: string, _public?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDef<LabelPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<LabelPipe, "sqLabel">;
}
//# sourceMappingURL=label.pipe.d.ts.map