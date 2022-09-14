import { OnChanges, ElementRef } from "@angular/core";
import * as i0 from "@angular/core";
export interface ScrollIntoViewOptions {
    active: boolean;
    first: boolean;
}
export declare class ScrollIntoView implements OnChanges {
    private elementRef;
    options: ScrollIntoViewOptions;
    constructor(elementRef: ElementRef);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDef<ScrollIntoView, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ScrollIntoView, "[sqScrollIntoView]", never, { "options": "sqScrollIntoView"; }, {}, never>;
}
//# sourceMappingURL=scroll-into-view.d.ts.map