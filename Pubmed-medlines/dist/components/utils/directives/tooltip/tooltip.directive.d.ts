import { ElementRef, OnDestroy } from "@angular/core";
import { ConnectedPosition, Overlay, OverlayPositionBuilder } from "@angular/cdk/overlay";
import * as i0 from "@angular/core";
export declare class TooltipDirective implements OnDestroy {
    private overlay;
    private overlayPositionBuilder;
    private elementRef;
    text: string;
    placement: "top" | "bottom" | "right" | "left";
    delay: number;
    private overlayRef;
    private timeoutId;
    constructor(overlay: Overlay, overlayPositionBuilder: OverlayPositionBuilder, elementRef: ElementRef);
    ngOnDestroy(): void;
    show(event: MouseEvent): void;
    mouseClick(event: MouseEvent): void;
    hide(): void;
    position(): ConnectedPosition;
    private clearTimer;
    static ɵfac: i0.ɵɵFactoryDef<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<TooltipDirective, "[sqTooltip]", never, { "text": "sqTooltip"; "placement": "placement"; "delay": "delay"; }, {}, never>;
}
//# sourceMappingURL=tooltip.directive.d.ts.map