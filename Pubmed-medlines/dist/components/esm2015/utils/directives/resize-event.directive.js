import { Directive, Output, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../ui.service";
export class ResizeEventDirective {
    constructor(elementRef, zone, uiService) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.uiService = uiService;
        this.resizeEvent = new EventEmitter();
        this.raiseEvent = () => {
            const contentRect = this.elementRef.nativeElement.getBoundingClientRect();
            this.resizeEvent.emit(contentRect);
        };
    }
    ngAfterViewInit() {
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver((entries) => {
                this.zone.run(() => {
                    const contentRect = ((entries === null || entries === void 0 ? void 0 : entries.length) === 1 && entries[0].contentRect);
                    this.resizeEvent.emit(contentRect);
                });
            });
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
        else {
            this.uiService.addElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
        }
    }
    ngOnDestroy() {
        if (window.ResizeObserver) {
            this.resizeObserver.unobserve(this.elementRef.nativeElement);
        }
        else {
            this.uiService.removeElementResizeListener(this.elementRef.nativeElement, this.raiseEvent);
        }
    }
}
ResizeEventDirective.ɵfac = function ResizeEventDirective_Factory(t) { return new (t || ResizeEventDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i1.UIService)); };
ResizeEventDirective.ɵdir = i0.ɵɵdefineDirective({ type: ResizeEventDirective, selectors: [["", "sqResize", ""]], outputs: { resizeEvent: "sqResize" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResizeEventDirective, [{
        type: Directive,
        args: [{
                selector: "[sqResize]"
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.UIService }]; }, { resizeEvent: [{
            type: Output,
            args: ["sqResize"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLWV2ZW50LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3V0aWxzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9yZXNpemUtZXZlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWMsTUFBTSxFQUFFLFlBQVksRUFBbUMsTUFBTSxlQUFlLENBQUM7OztBQU01RyxNQUFNLE9BQU8sb0JBQW9CO0lBTTdCLFlBQ2MsVUFBc0IsRUFDdEIsSUFBWSxFQUNaLFNBQW9CO1FBRnBCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFSZCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBWTVELGVBQVUsR0FBRyxHQUFHLEVBQUU7WUFDeEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUMxRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUE7SUFMRCxDQUFDO0lBT0QsZUFBZTtRQUNYLElBQUssTUFBYyxDQUFDLGNBQWMsRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUssTUFBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7b0JBQ2YsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxNQUFNLE1BQUssQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzlEO2FBQ0k7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzRjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSyxNQUFjLENBQUMsY0FBYyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDaEU7YUFDSTtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlGO0lBQ0wsQ0FBQzs7d0ZBeENRLG9CQUFvQjt5REFBcEIsb0JBQW9CO2tEQUFwQixvQkFBb0I7Y0FIaEMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2FBQ3pCOzBHQUV1QixXQUFXO2tCQUE5QixNQUFNO21CQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVSVNlcnZpY2V9IGZyb20gXCIuLi91aS5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcVJlc2l6ZV1cIlxufSlcbmV4cG9ydCBjbGFzcyBSZXNpemVFdmVudERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQE91dHB1dChcInNxUmVzaXplXCIpIHJlc2l6ZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxET01SZWN0UmVhZE9ubHk+KCk7XG4gICAgLy8gTkIgd2UgZG9uJ3QgdXNlIG9uZSBvZiB0aGUgUmVzaXplT2JzZXJ2ZXIgcG9seWZpbGxzIGFzIHRoZXkgcmVseSBvbiBwb2xsaW5nXG4gICAgLy8gZm9yIGNoYW5nZXMgd2hpY2ggY29udGludW91c2x5IGNvbnN1bWVzIGNwdSB0aW1lLi4uXG4gICAgcHJvdGVjdGVkIHJlc2l6ZU9ic2VydmVyOiAvKlJlc2l6ZU9ic2VydmVyKi9hbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByb3RlY3RlZCB6b25lOiBOZ1pvbmUsXG4gICAgICAgIHByb3RlY3RlZCB1aVNlcnZpY2U6IFVJU2VydmljZVxuICAgICkge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByYWlzZUV2ZW50ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb250ZW50UmVjdCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB0aGlzLnJlc2l6ZUV2ZW50LmVtaXQoY29udGVudFJlY3QpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyAod2luZG93IGFzIGFueSkuUmVzaXplT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudFJlY3QgPSAoZW50cmllcz8ubGVuZ3RoID09PSAxICYmIGVudHJpZXNbMF0uY29udGVudFJlY3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUV2ZW50LmVtaXQoY29udGVudFJlY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51aVNlcnZpY2UuYWRkRWxlbWVudFJlc2l6ZUxpc3RlbmVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLnJhaXNlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICgod2luZG93IGFzIGFueSkuUmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudWlTZXJ2aWNlLnJlbW92ZUVsZW1lbnRSZXNpemVMaXN0ZW5lcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5yYWlzZUV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==