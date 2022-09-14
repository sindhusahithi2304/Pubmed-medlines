import { Component, ViewChild, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
const _c0 = ["anchor"];
export class BsScroller {
    constructor(searchService) {
        this.searchService = searchService;
        this.options = {};
    }
    ngAfterViewInit() {
        const options = Object.assign({ root: null }, this.options);
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.searchService.loadMore();
            }
        }, options);
        this.observer.observe(this.anchor.nativeElement);
    }
    ngOnDestroy() {
        this.observer.disconnect();
    }
}
BsScroller.ɵfac = function BsScroller_Factory(t) { return new (t || BsScroller)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsScroller.ɵcmp = i0.ɵɵdefineComponent({ type: BsScroller, selectors: [["sq-scroller"]], viewQuery: function BsScroller_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.anchor = _t.first);
    } }, inputs: { options: "options" }, decls: 2, vars: 0, consts: [[2, "height", "5px"], ["anchor", ""]], template: function BsScroller_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0, 1);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsScroller, [{
        type: Component,
        args: [{
                selector: 'sq-scroller',
                template: `<div #anchor style="height:5px"></div>`
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { options: [{
            type: Input
        }], anchor: [{
            type: ViewChild,
            args: ['anchor']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zZWFyY2gvIiwic291cmNlcyI6WyJib290c3RyYXAvc2Nyb2xsZXIvc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUUsT0FBTyxFQUFDLFNBQVMsRUFBYyxTQUFTLEVBQUUsS0FBSyxFQUEyQixNQUFNLGVBQWUsQ0FBQzs7OztBQU9oRyxNQUFNLE9BQU8sVUFBVTtJQU12QixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUx2QyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBSzZCLENBQUM7SUFFcEQsZUFBZTtRQUNiLE1BQU0sT0FBTyxtQkFDWCxJQUFJLEVBQUUsSUFBSSxJQUNQLElBQUksQ0FBQyxPQUFPLENBQ2hCLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDbkQsSUFBRyxLQUFLLENBQUMsY0FBYyxFQUFFO2dCQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQy9CO1FBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7b0VBekJZLFVBQVU7K0NBQVYsVUFBVTs7Ozs7O1FBRlYsNEJBQXNDOztrREFFdEMsVUFBVTtjQUp0QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRSx3Q0FBd0M7YUFDbkQ7Z0VBRVEsT0FBTztrQkFBZixLQUFLO1lBQ2UsTUFBTTtrQkFBMUIsU0FBUzttQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiICBpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkLCBJbnB1dCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuICBpbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gJy4uLy4uL3NlYXJjaC5zZXJ2aWNlJztcclxuXHJcbiAgQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3NxLXNjcm9sbGVyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiAjYW5jaG9yIHN0eWxlPVwiaGVpZ2h0OjVweFwiPjwvZGl2PmBcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBCc1Njcm9sbGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBvcHRpb25zID0ge307XHJcbiAgQFZpZXdDaGlsZCgnYW5jaG9yJykgYW5jaG9yOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge31cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgcm9vdDogbnVsbCxcclxuICAgICAgLi4udGhpcy5vcHRpb25zXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKFtlbnRyeV0pID0+IHtcclxuICAgICAgaWYoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UubG9hZE1vcmUoKTtcclxuICAgICAgfVxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuYW5jaG9yLm5hdGl2ZUVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9XHJcblxyXG59Il19