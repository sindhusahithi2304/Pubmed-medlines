import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
export class ClickOutside {
    constructor(elementRef) {
        this.clickOutside = new EventEmitter();
        this.clickHandler = (event) => {
            if (!event || !event.target) {
                return;
            }
            if (this.element.offsetWidth === 0) {
                return;
            }
            if (event.target === document.body && document.elementFromPoint(event.pageX, event.pageY) !== event.target) {
                return;
            }
            if (this.element.contains(event.target)) {
                return;
            }
            if (this.options.exclude) {
                let targetRoot = event.target;
                while (!!targetRoot.parentElement) {
                    targetRoot = targetRoot.parentElement;
                }
                for (const selector of this.options.exclude) {
                    const elts = Array.from(targetRoot.querySelectorAll(selector));
                    for (const elt of elts) {
                        if (elt && elt.contains(event.target)) {
                            return;
                        }
                    }
                }
            }
            // Call via timeout so we can check whether the click was leading to us taking focus
            // If we have the focus then we don't call clickOutside
            Utils.delay()
                .then(() => {
                if (!this.isActive(this.element)) {
                    this.clickOutside.emit({ click: event });
                }
            });
        };
        this.element = elementRef.nativeElement;
    }
    ngOnInit() {
        document.addEventListener("click", this.clickHandler);
        if (!this.options) {
            this.options = { exclude: ['.bs-datepicker'] }; // By default exclude bootstrap date picker
        }
    }
    ngOnDestroy() {
        document.removeEventListener("click", this.clickHandler);
    }
    isActive(element) {
        let active = document["activeElement"];
        while (active) {
            if (element === active) {
                return true;
            }
            active = active.parentElement;
        }
        return false;
    }
}
ClickOutside.ɵfac = function ClickOutside_Factory(t) { return new (t || ClickOutside)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
ClickOutside.ɵdir = i0.ɵɵdefineDirective({ type: ClickOutside, selectors: [["", "sqClickOutside", ""]], inputs: { options: ["sqClickOutside", "options"] }, outputs: { clickOutside: "sqClickOutside" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ClickOutside, [{
        type: Directive,
        args: [{
                selector: "[sqClickOutside]"
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { options: [{
            type: Input,
            args: ["sqClickOutside"]
        }], clickOutside: [{
            type: Output,
            args: ["sqClickOutside"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3V0aWxzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBaUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7QUFTekMsTUFBTSxPQUFPLFlBQVk7SUFLckIsWUFBWSxVQUFzQjtRQUhSLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7UUE2QjlFLGlCQUFZLEdBQUcsQ0FBQyxLQUFpQixFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pCLE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO2dCQUNoQyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDeEcsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBYyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xELE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RCLElBQUksVUFBVSxHQUFnQixLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUMzQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO29CQUMvQixVQUFVLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztpQkFDekM7Z0JBQ0QsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDekMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDL0QsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7d0JBQ3BCLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUN6QyxPQUFPO3lCQUNWO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxvRkFBb0Y7WUFDcEYsdURBQXVEO1lBQ3ZELEtBQUssQ0FBQyxLQUFLLEVBQUU7aUJBQ1IsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7aUJBQzFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUE7UUE1REcsSUFBSSxDQUFDLE9BQU8sR0FBZ0IsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUN6RCxDQUFDO0lBRUQsUUFBUTtRQUNKLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLDJDQUEyQztTQUM5RjtJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVPLFFBQVEsQ0FBQyxPQUFnQjtRQUM3QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsT0FBTyxNQUFNLEVBQUU7WUFDWCxJQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUNqQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7O3dFQTdCUSxZQUFZO2lEQUFaLFlBQVk7a0RBQVosWUFBWTtjQUh4QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjthQUMvQjs2REFFNEIsT0FBTztrQkFBL0IsS0FBSzttQkFBQyxnQkFBZ0I7WUFDRyxZQUFZO2tCQUFyQyxNQUFNO21CQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFbGVtZW50UmVmLCBPbkluaXQsIE9uRGVzdHJveSwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrT3V0c2lkZU9wdGlvbnMge1xuICAgIGV4Y2x1ZGU/OiBzdHJpbmdbXTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW3NxQ2xpY2tPdXRzaWRlXVwiXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrT3V0c2lkZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoXCJzcUNsaWNrT3V0c2lkZVwiKSBvcHRpb25zOiBDbGlja091dHNpZGVPcHRpb25zO1xuICAgIEBPdXRwdXQoXCJzcUNsaWNrT3V0c2lkZVwiKSBjbGlja091dHNpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPHtjbGljazogVUlFdmVudH0+KCk7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IDxIVE1MRWxlbWVudD5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrSGFuZGxlcik7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7IGV4Y2x1ZGU6IFsnLmJzLWRhdGVwaWNrZXInXSB9OyAvLyBCeSBkZWZhdWx0IGV4Y2x1ZGUgYm9vdHN0cmFwIGRhdGUgcGlja2VyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQWN0aXZlKGVsZW1lbnQ6IEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50W1wiYWN0aXZlRWxlbWVudFwiXTtcbiAgICAgICAgd2hpbGUgKGFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IGFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWN0aXZlID0gYWN0aXZlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNsaWNrSGFuZGxlciA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBpZiAoIWV2ZW50IHx8ICFldmVudC50YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gZG9jdW1lbnQuYm9keSAmJiBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSkgIT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnQuY29udGFpbnMoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmV4Y2x1ZGUpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRSb290ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIHdoaWxlICghIXRhcmdldFJvb3QucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFJvb3QgPSB0YXJnZXRSb290LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIHRoaXMub3B0aW9ucy5leGNsdWRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWx0cyA9IEFycmF5LmZyb20odGFyZ2V0Um9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbHQgb2YgZWx0cykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWx0ICYmIGVsdC5jb250YWlucyg8Tm9kZT5ldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FsbCB2aWEgdGltZW91dCBzbyB3ZSBjYW4gY2hlY2sgd2hldGhlciB0aGUgY2xpY2sgd2FzIGxlYWRpbmcgdG8gdXMgdGFraW5nIGZvY3VzXG4gICAgICAgIC8vIElmIHdlIGhhdmUgdGhlIGZvY3VzIHRoZW4gd2UgZG9uJ3QgY2FsbCBjbGlja091dHNpZGVcbiAgICAgICAgVXRpbHMuZGVsYXkoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSh0aGlzLmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQoe2NsaWNrOiBldmVudH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iXX0=