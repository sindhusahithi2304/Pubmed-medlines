import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import * as i0 from "@angular/core";
import * as i1 from "./labels.service";
import * as i2 from "@sinequa/core/intl";
export class LabelPipe extends AbstractIntlPipe {
    constructor(labelsService, intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
        this.labelsService = labelsService;
    }
    updateValue(value, _public) {
        super.updateValue(value, _public);
        this.value = value;
        if (!_public) {
            this.value = this.labelsService.removePrivatePrefix(this.value);
        }
        this.value = this.intlService.formatMessage(this.value);
    }
}
LabelPipe.ɵfac = function LabelPipe_Factory(t) { return new (t || LabelPipe)(i0.ɵɵdirectiveInject(i1.LabelsService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
LabelPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqLabel", type: LabelPipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LabelPipe, [{
        type: Pipe,
        args: [{ name: "sqLabel", pure: false }]
    }], function () { return [{ type: i1.LabelsService }, { type: i2.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2xhYmVscy8iLCJzb3VyY2VzIjpbImxhYmVsLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFJakUsTUFBTSxPQUFPLFNBQVUsU0FBUSxnQkFBZ0I7SUFDM0MsWUFDYyxhQUE0QixFQUN0QyxXQUF3QixFQUN4QixpQkFBb0M7UUFDcEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBSDVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBSTFDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYSxFQUFFLE9BQWlCO1FBQ3hDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixJQUFJLENBQUMsS0FBSyxHQUFXLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7a0VBZlEsU0FBUzsyREFBVCxTQUFTO2tEQUFULFNBQVM7Y0FEckIsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7QWJzdHJhY3RJbnRsUGlwZSwgSW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7TGFiZWxzU2VydmljZX0gZnJvbSBcIi4vbGFiZWxzLnNlcnZpY2VcIjtcblxuQFBpcGUoe25hbWU6IFwic3FMYWJlbFwiLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgTGFiZWxQaXBlIGV4dGVuZHMgQWJzdHJhY3RJbnRsUGlwZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBsYWJlbHNTZXJ2aWNlOiBMYWJlbHNTZXJ2aWNlLFxuICAgICAgICBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcihpbnRsU2VydmljZSwgY2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIH1cblxuICAgIHVwZGF0ZVZhbHVlKHZhbHVlOiBzdHJpbmcsIF9wdWJsaWM/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVZhbHVlKHZhbHVlLCBfcHVibGljKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoIV9wdWJsaWMpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSA8c3RyaW5nPnRoaXMubGFiZWxzU2VydmljZS5yZW1vdmVQcml2YXRlUHJlZml4KHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdE1lc3NhZ2UodGhpcy52YWx1ZSk7XG4gICAgfVxufSJdfQ==