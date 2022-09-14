import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/core/intl";
/**
 * A pipe to transform a number into a readable internationalized memory size label,
 * for example "126432" into "126 kB".
 *
 * @example
 * <span>Size:</span><span>{{ documentSize | sqMemorySize }}</span>
 */
export class MemorySizePipe extends AbstractIntlPipe {
    constructor(formatService, intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
        this.formatService = formatService;
    }
    updateValue(key) {
        super.updateValue(key);
        this.value = this.formatService.formatMemorySize(key);
    }
}
MemorySizePipe.ɵfac = function MemorySizePipe_Factory(t) { return new (t || MemorySizePipe)(i0.ɵɵdirectiveInject(i1.FormatService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
MemorySizePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMemorySize", type: MemorySizePipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MemorySizePipe, [{
        type: Pipe,
        args: [{ name: "sqMemorySize", pure: false }]
    }], function () { return [{ type: i1.FormatService }, { type: i2.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5LXNpemUtcGlwZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3V0aWxzLyIsInNvdXJjZXMiOlsicGlwZXMvbWVtb3J5LXNpemUtcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUdqRTs7Ozs7O0dBTUc7QUFFSCxNQUFNLE9BQU8sY0FBZSxTQUFRLGdCQUFnQjtJQUNoRCxZQUNjLGFBQTRCLEVBQ3RDLFdBQXdCLEVBQ3hCLGlCQUFvQztRQUNwQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFINUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFJMUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFXO1FBQ25CLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELENBQUM7OzRFQVhRLGNBQWM7cUVBQWQsY0FBYztrREFBZCxjQUFjO2NBRDFCLElBQUk7ZUFBQyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0SW50bFBpcGUsIEludGxTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge0Zvcm1hdFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuXG4vKipcbiAqIEEgcGlwZSB0byB0cmFuc2Zvcm0gYSBudW1iZXIgaW50byBhIHJlYWRhYmxlIGludGVybmF0aW9uYWxpemVkIG1lbW9yeSBzaXplIGxhYmVsLFxuICogZm9yIGV4YW1wbGUgXCIxMjY0MzJcIiBpbnRvIFwiMTI2IGtCXCIuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxzcGFuPlNpemU6PC9zcGFuPjxzcGFuPnt7IGRvY3VtZW50U2l6ZSB8IHNxTWVtb3J5U2l6ZSB9fTwvc3Bhbj5cbiAqL1xuQFBpcGUoe25hbWU6IFwic3FNZW1vcnlTaXplXCIsIHB1cmU6IGZhbHNlfSlcbmV4cG9ydCBjbGFzcyBNZW1vcnlTaXplUGlwZSBleHRlbmRzIEFic3RyYWN0SW50bFBpcGUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBzdXBlci51cGRhdGVWYWx1ZShrZXkpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRTZXJ2aWNlLmZvcm1hdE1lbW9yeVNpemUoa2V5KTtcbiAgICB9XG59Il19