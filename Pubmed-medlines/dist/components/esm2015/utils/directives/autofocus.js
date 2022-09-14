import { Directive, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
export class Autofocus {
    constructor(elementRef) {
        this.element = elementRef.nativeElement;
    }
    setFocus() {
        Utils.delay()
            .then(() => {
            if (this.element.offsetWidth !== 0) {
                this.element.focus();
            }
        });
    }
    ngOnChanges() {
        this.setFocus();
    }
}
Autofocus.ɵfac = function Autofocus_Factory(t) { return new (t || Autofocus)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
Autofocus.ɵdir = i0.ɵɵdefineDirective({ type: Autofocus, selectors: [["", "sqAutofocus", ""]], inputs: { value: ["sqAutofocus", "value"] }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Autofocus, [{
        type: Directive,
        args: [{
                selector: "[sqAutofocus]"
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { value: [{
            type: Input,
            args: ["sqAutofocus"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2ZvY3VzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2F1dG9mb2N1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUt6QyxNQUFNLE9BQU8sU0FBUztJQUlsQixZQUFZLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQWdCLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDekQsQ0FBQztJQUVPLFFBQVE7UUFDWixLQUFLLENBQUMsS0FBSyxFQUFFO2FBQ1IsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOztrRUFuQlEsU0FBUzs4Q0FBVCxTQUFTO2tEQUFULFNBQVM7Y0FIckIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2FBQzVCOzZEQUV5QixLQUFLO2tCQUExQixLQUFLO21CQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3NxQXV0b2ZvY3VzXVwiXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9mb2N1cyBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KFwic3FBdXRvZm9jdXNcIikgdmFsdWU6IG51bWJlcjtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gPEhUTUxFbGVtZW50PmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEZvY3VzKCkge1xuICAgICAgICBVdGlscy5kZWxheSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgIH1cbn0iXX0=