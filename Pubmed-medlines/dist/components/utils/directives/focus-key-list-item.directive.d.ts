import { ElementRef } from "@angular/core";
import { FocusableOption } from "@angular/cdk/a11y";
import * as i0 from "@angular/core";
export declare class FocusKeyListItemDirective implements FocusableOption {
    protected element: ElementRef;
    tabindex: number;
    role: string;
    constructor(element: ElementRef);
    focus(): void;
    static ɵfac: i0.ɵɵFactoryDef<FocusKeyListItemDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<FocusKeyListItemDirective, "[sqFocusKeyListItem]", never, {}, {}, never>;
}
//# sourceMappingURL=focus-key-list-item.directive.d.ts.map