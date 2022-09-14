import { ElementRef, EventEmitter, AfterViewInit, OnDestroy, NgZone } from "@angular/core";
import { UIService } from "../ui.service";
import * as i0 from "@angular/core";
export declare class ResizeEventDirective implements AfterViewInit, OnDestroy {
    protected elementRef: ElementRef;
    protected zone: NgZone;
    protected uiService: UIService;
    resizeEvent: EventEmitter<DOMRectReadOnly>;
    protected resizeObserver: any;
    constructor(elementRef: ElementRef, zone: NgZone, uiService: UIService);
    protected raiseEvent: () => void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<ResizeEventDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ResizeEventDirective, "[sqResize]", never, {}, { "resizeEvent": "sqResize"; }, never>;
}
//# sourceMappingURL=resize-event.directive.d.ts.map