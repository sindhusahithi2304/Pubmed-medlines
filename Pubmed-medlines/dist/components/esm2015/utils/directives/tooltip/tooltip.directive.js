import { Directive, HostListener, Input } from "@angular/core";
import { ComponentPortal } from "@angular/cdk/portal";
import { TooltipComponent } from "./tooltip.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class TooltipDirective {
    constructor(overlay, overlayPositionBuilder, elementRef) {
        this.overlay = overlay;
        this.overlayPositionBuilder = overlayPositionBuilder;
        this.elementRef = elementRef;
        this.text = "";
        this.placement = "bottom";
        this.delay = 300;
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
    show(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clearTimer();
        this.timeoutId = setTimeout(() => {
            if (this.overlayRef) {
                this.overlayRef.detach();
            }
            if (this.text.trim().length === 0) {
                return;
            }
            const positionStrategy = this.overlayPositionBuilder
                .flexibleConnectedTo(this.elementRef)
                .withPositions([this.position()]);
            const scrollStrategy = this.overlay.scrollStrategies.close();
            this.overlayRef = this.overlay.create({ positionStrategy, scrollStrategy });
            const tooltipRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));
            tooltipRef.instance.text = this.text;
        }, this.delay);
    }
    mouseClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clearTimer();
    }
    hide() {
        this.clearTimer();
    }
    position() {
        switch (this.placement) {
            case "bottom":
                return {
                    originX: "center",
                    originY: "bottom",
                    overlayX: "center",
                    overlayY: "top",
                    offsetY: 8
                };
            case "right":
                return {
                    originX: "end",
                    originY: "center",
                    overlayX: "start",
                    overlayY: "center",
                    offsetX: 8
                };
            case "left":
                return {
                    originX: "start",
                    originY: "center",
                    overlayX: "end",
                    overlayY: "center",
                    offsetX: -8
                };
            default:
                return {
                    originX: "center",
                    originY: "top",
                    overlayX: "center",
                    overlayY: "bottom",
                    offsetY: -8
                };
        }
    }
    clearTimer() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.overlayRef) {
            this.overlayRef.detach();
        }
    }
}
TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(i0.ɵɵdirectiveInject(i1.Overlay), i0.ɵɵdirectiveInject(i1.OverlayPositionBuilder), i0.ɵɵdirectiveInject(i0.ElementRef)); };
TooltipDirective.ɵdir = i0.ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "sqTooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseenter", function TooltipDirective_mouseenter_HostBindingHandler($event) { return ctx.show($event); })("mousedown", function TooltipDirective_mousedown_HostBindingHandler($event) { return ctx.mouseClick($event); })("mouseleave", function TooltipDirective_mouseleave_HostBindingHandler() { return ctx.hide(); });
    } }, inputs: { text: ["sqTooltip", "text"], placement: "placement", delay: "delay" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TooltipDirective, [{
        type: Directive,
        args: [{ selector: "[sqTooltip]" }]
    }], function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }]; }, { text: [{
            type: Input,
            args: ["sqTooltip"]
        }], placement: [{
            type: Input
        }], delay: [{
            type: Input
        }], show: [{
            type: HostListener,
            args: ["mouseenter", ['$event']]
        }], mouseClick: [{
            type: HostListener,
            args: ["mousedown", ['$event']]
        }], hide: [{
            type: HostListener,
            args: ["mouseleave"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91dGlscy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFPdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7QUFHckQsTUFBTSxPQUFPLGdCQUFnQjtJQVEzQixZQUNVLE9BQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxVQUFzQjtRQUZ0QixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVZaLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDckIsY0FBUyxHQUF3QyxRQUFRLENBQUM7UUFDMUQsVUFBSyxHQUFHLEdBQUcsQ0FBQztJQVNsQixDQUFDO0lBRUosV0FBVztRQUNULElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUdELElBQUksQ0FBQyxLQUFpQjtRQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBRyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCO1lB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QyxRQUFRLENBQUM7WUE2QnRDLFVBQVU7a0JBRFQsWUFBWTttQkFBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFRckMsSUFBSTtrQkFESCxZQUFZO21CQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudFJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtcclxuICBDb25uZWN0ZWRQb3NpdGlvbixcclxuICBPdmVybGF5LFxyXG4gIE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXHJcbiAgT3ZlcmxheVJlZlxyXG59IGZyb20gXCJAYW5ndWxhci9jZGsvb3ZlcmxheVwiO1xyXG5pbXBvcnQge0NvbXBvbmVudFBvcnRhbH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9wb3J0YWxcIjtcclxuXHJcbmltcG9ydCB7VG9vbHRpcENvbXBvbmVudH0gZnJvbSBcIi4vdG9vbHRpcC5jb21wb25lbnRcIjtcclxuXHJcbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiBcIltzcVRvb2x0aXBdXCJ9KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KFwic3FUb29sdGlwXCIpIHRleHQgPSBcIlwiO1xyXG4gIEBJbnB1dCgpIHBsYWNlbWVudDogXCJ0b3BcIiB8IFwiYm90dG9tXCIgfCBcInJpZ2h0XCIgfCBcImxlZnRcIiA9IFwiYm90dG9tXCI7XHJcbiAgQElucHV0KCkgZGVsYXkgPSAzMDA7XHJcblxyXG4gIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcclxuICBwcml2YXRlIHRpbWVvdXRJZDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXHJcbiAgICBwcml2YXRlIG92ZXJsYXlQb3NpdGlvbkJ1aWxkZXI6IE92ZXJsYXlQb3NpdGlvbkJ1aWxkZXIsXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWZcclxuICApIHt9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYodGhpcy5vdmVybGF5UmVmKXtcclxuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgWyckZXZlbnQnXSlcclxuICBzaG93KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgdGhpcy5jbGVhclRpbWVyKCk7XHJcblxyXG4gICAgdGhpcy50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHsgICAgICAgICAgXHJcbiAgICAgIGlmKHRoaXMub3ZlcmxheVJlZikge1xyXG4gICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy50ZXh0LnRyaW0oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLm92ZXJsYXlQb3NpdGlvbkJ1aWxkZXJcclxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5lbGVtZW50UmVmKVxyXG4gICAgICAud2l0aFBvc2l0aW9ucyhbdGhpcy5wb3NpdGlvbigpXSk7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmNsb3NlKCk7XHJcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe3Bvc2l0aW9uU3RyYXRlZ3ksIHNjcm9sbFN0cmF0ZWd5fSk7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8VG9vbHRpcENvbXBvbmVudD4gPSB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKG5ldyBDb21wb25lbnRQb3J0YWwoVG9vbHRpcENvbXBvbmVudCkpO1xyXG4gICAgICB0b29sdGlwUmVmLmluc3RhbmNlLnRleHQgPSB0aGlzLnRleHQ7XHJcbiAgICB9LCB0aGlzLmRlbGF5KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgWyckZXZlbnQnXSlcclxuICBtb3VzZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIilcclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy5jbGVhclRpbWVyKCk7XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvbigpOiBDb25uZWN0ZWRQb3NpdGlvbiB7XHJcbiAgICBzd2l0Y2ggKHRoaXMucGxhY2VtZW50KSB7XHJcbiAgICAgIGNhc2UgXCJib3R0b21cIjpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgb3JpZ2luWDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG9yaWdpblk6IFwiYm90dG9tXCIsXHJcbiAgICAgICAgICBvdmVybGF5WDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG92ZXJsYXlZOiBcInRvcFwiLFxyXG4gICAgICAgICAgb2Zmc2V0WTogOFxyXG4gICAgICAgIH07XHJcbiAgICAgIGNhc2UgXCJyaWdodFwiOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBvcmlnaW5YOiBcImVuZFwiLFxyXG4gICAgICAgICAgb3JpZ2luWTogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG92ZXJsYXlYOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgICBvdmVybGF5WTogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG9mZnNldFg6IDhcclxuICAgICAgICB9O1xyXG4gICAgICBjYXNlIFwibGVmdFwiOlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBvcmlnaW5YOiBcInN0YXJ0XCIsXHJcbiAgICAgICAgICBvcmlnaW5ZOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgb3ZlcmxheVg6IFwiZW5kXCIsXHJcbiAgICAgICAgICBvdmVybGF5WTogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG9mZnNldFg6IC04XHJcbiAgICAgICAgfTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgb3JpZ2luWDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG9yaWdpblk6IFwidG9wXCIsXHJcbiAgICAgICAgICBvdmVybGF5WDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIG92ZXJsYXlZOiBcImJvdHRvbVwiLFxyXG4gICAgICAgICAgb2Zmc2V0WTogLThcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhclRpbWVyKCkge1xyXG4gICAgaWYodGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XHJcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcclxuICAgIH1cclxuICB9XHJcbn0iXX0=