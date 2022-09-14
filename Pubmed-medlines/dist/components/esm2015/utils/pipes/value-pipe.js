import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/core/intl";
export class ValuePipe extends AbstractIntlPipe {
    constructor(formatService, intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
        this.formatService = formatService;
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = this.formatService.formatFieldValue(key, params);
        this.value = Utils.replace(this.value, /;/g, "$&\u200B");
    }
}
ValuePipe.ɵfac = function ValuePipe_Factory(t) { return new (t || ValuePipe)(i0.ɵɵdirectiveInject(i1.FormatService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
ValuePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqValue", type: ValuePipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ValuePipe, [{
        type: Pipe,
        args: [{ name: "sqValue", pure: false }]
    }], function () { return [{ type: i1.FormatService }, { type: i2.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtcGlwZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3V0aWxzLyIsInNvdXJjZXMiOlsicGlwZXMvdmFsdWUtcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUdqRSxPQUFPLEVBQUMsS0FBSyxFQUFhLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFHckQsTUFBTSxPQUFPLFNBQVUsU0FBUSxnQkFBZ0I7SUFDM0MsWUFDYyxhQUE0QixFQUN0QyxXQUF3QixFQUN4QixpQkFBb0M7UUFDcEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBSDVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBSTFDLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBMkIsRUFBRSxNQUFnQjtRQUNyRCxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDOztrRUFaUSxTQUFTOzJEQUFULFNBQVM7a0RBQVQsU0FBUztjQURyQixJQUFJO2VBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBYnN0cmFjdEludGxQaXBlLCBJbnRsU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtGb3JtYXRTZXJ2aWNlLCBWYWx1ZUl0ZW19IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtDQ0NvbHVtbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1V0aWxzLCBGaWVsZFZhbHVlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbkBQaXBlKHtuYW1lOiBcInNxVmFsdWVcIiwgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIFZhbHVlUGlwZSBleHRlbmRzIEFic3RyYWN0SW50bFBpcGUge1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IFZhbHVlSXRlbSB8IEZpZWxkVmFsdWUsIHBhcmFtczogQ0NDb2x1bW4pOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlVmFsdWUoa2V5LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5mb3JtYXRTZXJ2aWNlLmZvcm1hdEZpZWxkVmFsdWUoa2V5LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gVXRpbHMucmVwbGFjZSh0aGlzLnZhbHVlLCAvOy9nLCBcIiQmXFx1MjAwQlwiKTtcbiAgICB9XG59Il19