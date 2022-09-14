import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
export class TimePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.intlService.formatTime(key, params);
    }
}
TimePipe.ɵfac = function TimePipe_Factory(t) { return new (t || TimePipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
TimePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqTime", type: TimePipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TimePipe, [{
        type: Pipe,
        args: [{ name: "sqTime", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJwaXBlcy90aW1lLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7OztBQUdqRSxNQUFNLE9BQU8sUUFBUyxTQUFRLGdCQUFnQjtJQUMxQyxZQUNJLFdBQXdCLEVBQ3hCLGlCQUFvQztRQUNwQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFrQixFQUFFLE1BQWtDO1FBQzlELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7O2dFQVZRLFFBQVE7eURBQVIsUUFBUTtrREFBUixRQUFRO2NBRHBCLElBQUk7ZUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0SW50bFBpcGUsIEludGxTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5cbkBQaXBlKHtuYW1lOiBcInNxVGltZVwiLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgVGltZVBpcGUgZXh0ZW5kcyBBYnN0cmFjdEludGxQaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IG51bWJlciB8IERhdGUsIHBhcmFtczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlVmFsdWUoa2V5LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRUaW1lKGtleSwgcGFyYW1zKTtcbiAgICB9XG59Il19