import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "./abstract-intl.pipe";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./intl.service";
/**
 * A pipe to display messages in the current locale. Inputs are processed by
 * [IntlService.formatMessage]{@link IntlService#formatMessage}
 */
export class MessagePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(value, params) {
        if (!Utils.isEmpty(value)) {
            // coerce to string (eg sys date strings get converted to dates so if this happens to a title we will break otherwise)
            value = value + "";
        }
        super.updateValue(value, params);
        if (!value) {
            this.value = value;
            return;
        }
        let values;
        if (params) {
            values = params.values ? params.values : params;
        }
        this.value = this.intlService.formatMessage(value, values);
    }
}
MessagePipe.ɵfac = function MessagePipe_Factory(t) { return new (t || MessagePipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
MessagePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMessage", type: MessagePipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MessagePipe, [{
        type: Pipe,
        args: [{ name: "sqMessage", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvaW50bC8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV0RCxPQUFPLEVBQUMsS0FBSyxFQUFRLE1BQU0sb0JBQW9CLENBQUM7OztBQVloRDs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sV0FBWSxTQUFRLGdCQUFnQjtJQUM3QyxZQUNJLFdBQXdCLEVBQ3hCLGlCQUFvQztRQUNwQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVTLFdBQVcsQ0FBQyxLQUFVLEVBQUUsTUFBcUI7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsc0hBQXNIO1lBQ3RILEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLE9BQU87U0FDVjtRQUNELElBQUksTUFBOEIsQ0FBQztRQUNuQyxJQUFJLE1BQU0sRUFBRTtZQUNSLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOztzRUF0QlEsV0FBVzsrREFBWCxXQUFXO2tEQUFYLFdBQVc7Y0FEdkIsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RJbnRsUGlwZX0gZnJvbSBcIi4vYWJzdHJhY3QtaW50bC5waXBlXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiLi9pbnRsLnNlcnZpY2VcIjtcbmltcG9ydCB7VXRpbHMsIE1hcE9mfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBwYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgW3NxTWVzc2FnZV17QGxpbmsgTWVzc2FnZVBpcGV9IHBpcGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlUGFyYW1zIHtcbiAgICAvKipcbiAgICAgKiBWYWx1ZXMgdGhhdCBjYW4gYmUgcmVmZXJlbmNlZCBmcm9tIElDVSBtZXNzYWdlc1xuICAgICAqL1xuICAgIHZhbHVlcz86IE1hcE9mPGFueT47XG59XG5cbi8qKlxuICogQSBwaXBlIHRvIGRpc3BsYXkgbWVzc2FnZXMgaW4gdGhlIGN1cnJlbnQgbG9jYWxlLiBJbnB1dHMgYXJlIHByb2Nlc3NlZCBieVxuICogW0ludGxTZXJ2aWNlLmZvcm1hdE1lc3NhZ2Vde0BsaW5rIEludGxTZXJ2aWNlI2Zvcm1hdE1lc3NhZ2V9XG4gKi9cbkBQaXBlKHtuYW1lOiBcInNxTWVzc2FnZVwiLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZVBpcGUgZXh0ZW5kcyBBYnN0cmFjdEludGxQaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUodmFsdWU6IGFueSwgcGFyYW1zOiBNZXNzYWdlUGFyYW1zKTogdm9pZCB7XG4gICAgICAgIGlmICghVXRpbHMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIGNvZXJjZSB0byBzdHJpbmcgKGVnIHN5cyBkYXRlIHN0cmluZ3MgZ2V0IGNvbnZlcnRlZCB0byBkYXRlcyBzbyBpZiB0aGlzIGhhcHBlbnMgdG8gYSB0aXRsZSB3ZSB3aWxsIGJyZWFrIG90aGVyd2lzZSlcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnVwZGF0ZVZhbHVlKHZhbHVlLCBwYXJhbXMpO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlczogTWFwT2Y8YW55PiB8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdmFsdWVzID0gcGFyYW1zLnZhbHVlcyA/IHBhcmFtcy52YWx1ZXMgOiBwYXJhbXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZSh2YWx1ZSwgdmFsdWVzKTtcbiAgICB9XG59XG4iXX0=