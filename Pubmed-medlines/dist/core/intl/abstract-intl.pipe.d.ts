import { PipeTransform, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { IntlService } from "./intl.service";
import * as i0 from "@angular/core";
/**
 * An abstract base class for pipes that should refresh automatically
 * when the current locale on {@link IntlService} changes. Pipes should
 * be declared as `pure: false` - the current value is cached to avoid
 * unnecessary processing
 */
export declare abstract class AbstractIntlPipe implements PipeTransform, OnDestroy {
    protected intlService: IntlService;
    protected changeDetectorRef: ChangeDetectorRef;
    protected value: any;
    protected lastValue: any;
    protected lastParams: any;
    protected localeChange: Subscription;
    constructor(intlService: IntlService, changeDetectorRef: ChangeDetectorRef);
    protected updateValue(value: any, params?: any): void;
    transform(value: any, params?: any): any;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<AbstractIntlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDefWithMeta<AbstractIntlPipe, "sqAbstractIntlPipe">;
}
//# sourceMappingURL=abstract-intl.pipe.d.ts.map