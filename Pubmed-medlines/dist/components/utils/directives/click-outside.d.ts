import { ElementRef, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
export interface ClickOutsideOptions {
    exclude?: string[];
}
export declare class ClickOutside implements OnInit, OnDestroy {
    options: ClickOutsideOptions;
    clickOutside: EventEmitter<{
        click: UIEvent;
    }>;
    element: HTMLElement;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private isActive;
    clickHandler: (event: MouseEvent) => void;
    static ɵfac: i0.ɵɵFactoryDef<ClickOutside, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ClickOutside, "[sqClickOutside]", never, { "options": "sqClickOutside"; }, { "clickOutside": "sqClickOutside"; }, never>;
}
//# sourceMappingURL=click-outside.d.ts.map