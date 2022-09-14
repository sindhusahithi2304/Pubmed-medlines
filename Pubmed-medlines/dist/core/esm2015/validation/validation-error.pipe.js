import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
import * as i2 from "./validation.service";
/**
 * A pipe to display the first error in a `ValidationErrors` map.
 */
export class ValidationErrorPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef, validationService) {
        super(intlService, changeDetectorRef);
        this.validationService = validationService;
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        const text = this.validationService.getFirstErrorText(key);
        const info = this.validationService.getFirstErrorInfo(key);
        this.value = text ? this.intlService.formatMessage(text, { values: info }) : undefined;
    }
}
ValidationErrorPipe.ɵfac = function ValidationErrorPipe_Factory(t) { return new (t || ValidationErrorPipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef(), i0.ɵɵdirectiveInject(i2.ValidationService)); };
ValidationErrorPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqValidationError", type: ValidationErrorPipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ValidationErrorPipe, [{
        type: Pipe,
        args: [{ name: "sqValidationError", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }, { type: i2.ValidationService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1lcnJvci5waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdmFsaWRhdGlvbi8iLCJzb3VyY2VzIjpbInZhbGlkYXRpb24tZXJyb3IucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUdqRTs7R0FFRztBQUVILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFDckQsWUFDSSxXQUF3QixFQUN4QixpQkFBb0MsRUFDMUIsaUJBQW9DO1FBQzlDLEtBQUssQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUQ1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBRWxELENBQUM7SUFFRCxXQUFXLENBQUMsR0FBcUIsRUFBRSxNQUFXO1FBQzFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekYsQ0FBQzs7c0ZBYlEsbUJBQW1COytFQUFuQixtQkFBbUI7a0RBQW5CLG1CQUFtQjtjQUQvQixJQUFJO2VBQUMsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1ZhbGlkYXRpb25FcnJvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtBYnN0cmFjdEludGxQaXBlLCBJbnRsU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uU2VydmljZX0gZnJvbSBcIi4vdmFsaWRhdGlvbi5zZXJ2aWNlXCI7XG5cbi8qKlxuICogQSBwaXBlIHRvIGRpc3BsYXkgdGhlIGZpcnN0IGVycm9yIGluIGEgYFZhbGlkYXRpb25FcnJvcnNgIG1hcC5cbiAqL1xuQFBpcGUoe25hbWU6IFwic3FWYWxpZGF0aW9uRXJyb3JcIiwgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25FcnJvclBpcGUgZXh0ZW5kcyBBYnN0cmFjdEludGxQaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByb3RlY3RlZCB2YWxpZGF0aW9uU2VydmljZTogVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IFZhbGlkYXRpb25FcnJvcnMsIHBhcmFtczogYW55KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVZhbHVlKGtleSwgcGFyYW1zKTtcbiAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMudmFsaWRhdGlvblNlcnZpY2UuZ2V0Rmlyc3RFcnJvclRleHQoa2V5KTtcbiAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMudmFsaWRhdGlvblNlcnZpY2UuZ2V0Rmlyc3RFcnJvckluZm8oa2V5KTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRleHQgPyB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdE1lc3NhZ2UodGV4dCwge3ZhbHVlczogaW5mb30pIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==