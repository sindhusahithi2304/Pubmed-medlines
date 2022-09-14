import { Pipe } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./intl.service";
/**
 * An abstract base class for pipes that should refresh automatically
 * when the current locale on {@link IntlService} changes. Pipes should
 * be declared as `pure: false` - the current value is cached to avoid
 * unnecessary processing
 */
export class AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        this.intlService = intlService;
        this.changeDetectorRef = changeDetectorRef;
        this.value = "";
    }
    updateValue(value, params) {
        this.lastValue = value;
        this.lastParams = params;
        this.changeDetectorRef.markForCheck();
    }
    transform(value, params) {
        // if we ask another time for the same key, return the last value
        if (Utils.equals(value, this.lastValue) && Utils.equals(params, this.lastParams)) {
            return this.value;
        }
        // set the value
        this.updateValue(value, params);
        // subscribe to localeChange event
        if (!this.localeChange) {
            this.localeChange = this.intlService.events.subscribe((event) => {
                if (!Utils.isEmpty(this.lastValue)) {
                    this.lastValue = null;
                    this.updateValue(value, params);
                }
            });
        }
        return this.value;
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
}
AbstractIntlPipe.ɵfac = function AbstractIntlPipe_Factory(t) { return new (t || AbstractIntlPipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
AbstractIntlPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqAbstractIntlPipe", type: AbstractIntlPipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AbstractIntlPipe, [{
        type: Pipe,
        args: [{ name: "sqAbstractIntlPipe", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtaW50bC5waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvaW50bC8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWludGwucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUE4QyxNQUFNLGVBQWUsQ0FBQztBQUdoRixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQUV6Qzs7Ozs7R0FLRztBQUVILE1BQU0sT0FBZ0IsZ0JBQWdCO0lBTWxDLFlBQ2MsV0FBd0IsRUFDeEIsaUJBQW9DO1FBRHBDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFQeEMsVUFBSyxHQUFRLEVBQUUsQ0FBQztJQVExQixDQUFDO0lBRVMsV0FBVyxDQUFDLEtBQVUsRUFBRSxNQUFZO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQVUsRUFBRSxNQUFZO1FBQzlCLGlFQUFpRTtRQUNqRSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3JCO1FBRUQsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDakQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDTixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDbkM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNWO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbkM7SUFDTCxDQUFDOztnRkE1Q2lCLGdCQUFnQjs2RUFBaEIsZ0JBQWdCO2tEQUFoQixnQkFBZ0I7Y0FEckMsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCIuL2ludGwuc2VydmljZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIEFuIGFic3RyYWN0IGJhc2UgY2xhc3MgZm9yIHBpcGVzIHRoYXQgc2hvdWxkIHJlZnJlc2ggYXV0b21hdGljYWxseVxuICogd2hlbiB0aGUgY3VycmVudCBsb2NhbGUgb24ge0BsaW5rIEludGxTZXJ2aWNlfSBjaGFuZ2VzLiBQaXBlcyBzaG91bGRcbiAqIGJlIGRlY2xhcmVkIGFzIGBwdXJlOiBmYWxzZWAgLSB0aGUgY3VycmVudCB2YWx1ZSBpcyBjYWNoZWQgdG8gYXZvaWRcbiAqIHVubmVjZXNzYXJ5IHByb2Nlc3NpbmdcbiAqL1xuQFBpcGUoe25hbWU6IFwic3FBYnN0cmFjdEludGxQaXBlXCIsIHB1cmU6IGZhbHNlfSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEludGxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgICBwcm90ZWN0ZWQgdmFsdWU6IGFueSA9IFwiXCI7XG4gICAgcHJvdGVjdGVkIGxhc3RWYWx1ZTogYW55O1xuICAgIHByb3RlY3RlZCBsYXN0UGFyYW1zOiBhbnk7XG4gICAgcHJvdGVjdGVkIGxvY2FsZUNoYW5nZTogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUodmFsdWU6IGFueSwgcGFyYW1zPzogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFzdFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubGFzdFBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgcGFyYW1zPzogYW55KTogYW55IHtcbiAgICAgICAgLy8gaWYgd2UgYXNrIGFub3RoZXIgdGltZSBmb3IgdGhlIHNhbWUga2V5LCByZXR1cm4gdGhlIGxhc3QgdmFsdWVcbiAgICAgICAgaWYgKFV0aWxzLmVxdWFscyh2YWx1ZSwgdGhpcy5sYXN0VmFsdWUpICYmIFV0aWxzLmVxdWFscyhwYXJhbXMsIHRoaXMubGFzdFBhcmFtcykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSB2YWx1ZVxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHZhbHVlLCBwYXJhbXMpO1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBsb2NhbGVDaGFuZ2UgZXZlbnRcbiAgICAgICAgaWYgKCF0aGlzLmxvY2FsZUNoYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbGVDaGFuZ2UgPSB0aGlzLmludGxTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eSh0aGlzLmxhc3RWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodmFsdWUsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5sb2NhbGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=