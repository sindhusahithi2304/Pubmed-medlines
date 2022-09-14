import { Pipe } from "@angular/core";
import { AbstractIntlPipe } from "@sinequa/core/intl";
import { Expr } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
export class ExprPipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        if (key instanceof Expr) {
            const message = key.toMessage(params);
            this.value = this.intlService.formatMessage(message.message, message.values);
        }
        else {
            this.value = this.intlService.formatMessage(key);
            if (params && params.asHTML) {
                this.value = Utils.encodeHTML(this.value);
            }
        }
    }
}
ExprPipe.ɵfac = function ExprPipe_Factory(t) { return new (t || ExprPipe)(i0.ɵɵdirectiveInject(i1.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
ExprPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqExpr", type: ExprPipe, pure: false });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ExprPipe, [{
        type: Pipe,
        args: [{ name: "sqExpr", pure: false }]
    }], function () { return [{ type: i1.IntlService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwci1waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJwaXBlcy9leHByLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLElBQUksRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFDLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUFDLElBQUksRUFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQUd6QyxNQUFNLE9BQU8sUUFBUyxTQUFRLGdCQUFnQjtJQUMxQyxZQUNJLFdBQXdCLEVBQ3hCLGlCQUFvQztRQUNwQyxLQUFLLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxHQUFrQixFQUFFLE1BQTBCO1FBQ3RELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksR0FBRyxZQUFZLElBQUksRUFBRTtZQUNyQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEY7YUFDSTtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QztTQUNKO0lBQ0wsQ0FBQzs7Z0VBbkJRLFFBQVE7eURBQVIsUUFBUTtrREFBUixRQUFRO2NBRHBCLElBQUk7ZUFBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0Fic3RyYWN0SW50bFBpcGUsIEludGxTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge0V4cHIsIEV4cHJNZXNzYWdlT3B0aW9uc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbkBQaXBlKHtuYW1lOiBcInNxRXhwclwiLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgRXhwclBpcGUgZXh0ZW5kcyBBYnN0cmFjdEludGxQaXBlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlLFxuICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgc3VwZXIoaW50bFNlcnZpY2UsIGNoYW5nZURldGVjdG9yUmVmKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZShrZXk6IEV4cHIgfCBzdHJpbmcsIHBhcmFtczogRXhwck1lc3NhZ2VPcHRpb25zKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVZhbHVlKGtleSwgcGFyYW1zKTtcbiAgICAgICAgaWYgKGtleSBpbnN0YW5jZW9mIEV4cHIpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBrZXkudG9NZXNzYWdlKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRNZXNzYWdlKG1lc3NhZ2UubWVzc2FnZSwgbWVzc2FnZS52YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZShrZXkpO1xuICAgICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMuYXNIVE1MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFV0aWxzLmVuY29kZUhUTUwodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59Il19