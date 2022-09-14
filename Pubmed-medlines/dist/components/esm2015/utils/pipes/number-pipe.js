import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
export class NumberPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        this.value = typeof key === "number" ? this.intlService.formatNumber(key, params) : key;
    }
}
NumberPipe.ɵfac = function NumberPipe_Factory(t) { return new (t || NumberPipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
NumberPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqNumber", type: NumberPipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NumberPipe, [{
        type: Pipe,
        args: [{ name: "sqNumber", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXBpcGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91dGlscy8iLCJzb3VyY2VzIjpbInBpcGVzL251bWJlci1waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBQyxnQkFBZ0IsRUFBYyxNQUFNLG9CQUFvQixDQUFDOzs7QUFHakUsTUFBTSxPQUFPLFVBQVcsU0FBUSxnQkFBZ0I7SUFDNUMsWUFDSSxXQUF3QixFQUN4QixpQkFBb0M7UUFDcEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBb0IsRUFBRSxNQUFnQztRQUM5RCxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDNUYsQ0FBQzs7b0VBVlEsVUFBVTs2REFBVixVQUFVO2tEQUFWLFVBQVU7Y0FEdEIsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RJbnRsUGlwZSwgSW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcblxuQFBpcGUoe25hbWU6IFwic3FOdW1iZXJcIiwgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIE51bWJlclBpcGUgZXh0ZW5kcyBBYnN0cmFjdEludGxQaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IG51bWJlciB8IHN0cmluZywgcGFyYW1zOiBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIudXBkYXRlVmFsdWUoa2V5LCBwYXJhbXMpO1xuICAgICAgICB0aGlzLnZhbHVlID0gdHlwZW9mIGtleSA9PT0gXCJudW1iZXJcIiA/IHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TnVtYmVyKGtleSwgcGFyYW1zKSA6IGtleTtcbiAgICB9XG59Il19