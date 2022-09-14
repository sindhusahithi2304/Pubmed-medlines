import { Directive, HostBinding } from "@angular/core";
import * as i0 from "@angular/core";
export class FocusKeyListItemDirective {
    constructor(element) {
        this.element = element;
        this.tabindex = -1;
        this.role = "list-item";
    }
    focus() {
        this.element.nativeElement.focus();
    }
}
FocusKeyListItemDirective.ɵfac = function FocusKeyListItemDirective_Factory(t) { return new (t || FocusKeyListItemDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
FocusKeyListItemDirective.ɵdir = i0.ɵɵdefineDirective({ type: FocusKeyListItemDirective, selectors: [["", "sqFocusKeyListItem", ""]], hostVars: 2, hostBindings: function FocusKeyListItemDirective_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵhostProperty("tabindex", ctx.tabindex);
        i0.ɵɵattribute("role", ctx.role);
    } } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FocusKeyListItemDirective, [{
        type: Directive,
        args: [{
                selector: "[sqFocusKeyListItem]"
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { tabindex: [{
            type: HostBinding
        }], role: [{
            type: HostBinding,
            args: ["attr.role"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LWxpc3QtaXRlbS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91dGlscy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZm9jdXMta2V5LWxpc3QtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWMsTUFBTSxlQUFlLENBQUM7O0FBTW5FLE1BQU0sT0FBTyx5QkFBeUI7SUFJbEMsWUFBc0IsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUgxQixhQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFJLEdBQUcsV0FBVyxDQUFDO0lBRzdDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7a0dBVFEseUJBQXlCOzhEQUF6Qix5QkFBeUI7Ozs7a0RBQXpCLHlCQUF5QjtjQUhyQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjthQUNuQzs2REFFa0IsUUFBUTtrQkFBdEIsV0FBVztZQUNjLElBQUk7a0JBQTdCLFdBQVc7bUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRm9jdXNhYmxlT3B0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9hMTF5XCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcUZvY3VzS2V5TGlzdEl0ZW1dXCJcbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNLZXlMaXN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiB7XG4gICAgQEhvc3RCaW5kaW5nKCkgdGFiaW5kZXggPSAtMTtcbiAgICBASG9zdEJpbmRpbmcoXCJhdHRyLnJvbGVcIikgcm9sZSA9IFwibGlzdC1pdGVtXCI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==