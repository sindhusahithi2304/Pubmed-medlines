import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
export class RelativeTimePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.intlService.formatRelativeTime(key, params ? params.unit : undefined, params);
    }
}
RelativeTimePipe.ɵfac = function RelativeTimePipe_Factory(t) { return new (t || RelativeTimePipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
RelativeTimePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqRelativeTime", type: RelativeTimePipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RelativeTimePipe, [{
        type: Pipe,
        args: [{ name: "sqRelativeTime", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUtdGltZS1waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJwaXBlcy9yZWxhdGl2ZS10aW1lLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7OztBQUdqRSxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZ0JBQWdCO0lBQ2xELFlBQ0ksV0FBd0IsRUFDeEIsaUJBQW9DO1FBQ3BDLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQXNDLEVBQUUsTUFBNEY7UUFDNUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRyxDQUFDOztnRkFWUSxnQkFBZ0I7eUVBQWhCLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBRDVCLElBQUk7ZUFBQyxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RJbnRsUGlwZSwgSW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcblxuQFBpcGUoe25hbWU6IFwic3FSZWxhdGl2ZVRpbWVcIiwgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIFJlbGF0aXZlVGltZVBpcGUgZXh0ZW5kcyBBYnN0cmFjdEludGxQaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IHN0cmluZyB8bnVtYmVyIHwgRGF0ZSB8IHVuZGVmaW5lZCwgcGFyYW1zOiB7dW5pdDogSW50bC5SZWxhdGl2ZVRpbWVVbml0fSAmIEludGwuUmVsYXRpdmVUaW1lRm9ybWF0T3B0aW9ucyAmIHsgZm9ybWF0Pzogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlVmFsdWUoa2V5LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRSZWxhdGl2ZVRpbWUoa2V5LCBwYXJhbXMgPyBwYXJhbXMudW5pdCA6IHVuZGVmaW5lZCwgcGFyYW1zKTtcbiAgICB9XG59Il19