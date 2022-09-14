import { Directive, Input } from "@angular/core";
import * as i0 from "@angular/core";
export class ScrollIntoView {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnChanges() {
        if (this.options.active) {
            if (this.options.first) {
                this.elementRef.nativeElement.scrollIntoView(false);
            }
            else {
                this.elementRef.nativeElement.scrollIntoViewIfNeeded(false);
            }
        }
    }
}
ScrollIntoView.ɵfac = function ScrollIntoView_Factory(t) { return new (t || ScrollIntoView)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ScrollIntoView.ɵdir = i0.ɵɵdefineDirective({ type: ScrollIntoView, selectors: [["", "sqScrollIntoView", ""]], inputs: { options: ["sqScrollIntoView", "options"] }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ScrollIntoView, [{
        type: Directive,
        args: [{
                selector: "[sqScrollIntoView]"
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
            type: Input,
            args: ["sqScrollIntoView"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWludG8tdmlldy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3V0aWxzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zY3JvbGwtaW50by12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUF3QixNQUFNLGVBQWUsQ0FBQzs7QUFVdEUsTUFBTSxPQUFPLGNBQWM7SUFHdkIsWUFDWSxVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQ2xDLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkQ7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0Q7U0FDSjtJQUNMLENBQUM7OzRFQWhCUSxjQUFjO21EQUFkLGNBQWM7a0RBQWQsY0FBYztjQUgxQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs2REFFOEIsT0FBTztrQkFBakMsS0FBSzttQkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE9uQ2hhbmdlcywgRWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTY3JvbGxJbnRvVmlld09wdGlvbnMge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICBmaXJzdDogYm9vbGVhbjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3NxU2Nyb2xsSW50b1ZpZXddXCJcbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsSW50b1ZpZXcgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dChcInNxU2Nyb2xsSW50b1ZpZXdcIikgb3B0aW9uczogU2Nyb2xsSW50b1ZpZXdPcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5maXJzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEludG9WaWV3SWZOZWVkZWQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19