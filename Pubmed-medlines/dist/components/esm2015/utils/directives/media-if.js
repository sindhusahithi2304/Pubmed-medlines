import { Directive, Input } from '@angular/core';
import { Subject, throwError } from "rxjs";
import { startWith, switchMap, map } from "rxjs/operators";
import * as i0 from "@angular/core";
import * as i1 from "@angular/flex-layout";
// Adapted from https://github.com/angular/flex-layout/issues/142#issuecomment-379465022
// Change ɵMatchMedia => MatchMedia when we move to angular 8
export class MediaIf {
    constructor(template, viewContainer, breakpoints, matchMedia, changeDetectorRef) {
        this.template = template;
        this.viewContainer = viewContainer;
        this.breakpoints = breakpoints;
        this.matchMedia = matchMedia;
        this.changeDetectorRef = changeDetectorRef;
        this.hasView = false;
        this.matcher = new Subject();
        this.subscription = this.matcher
            .pipe(map(alias => {
            const breakpoint = this.breakpoints.findByAlias(alias);
            if (!breakpoint) {
                throwError(`breakpoint not found for ${alias}`);
                return "";
            }
            else {
                return breakpoint.mediaQuery;
            }
        }), switchMap(mq => {
            //console.log("MediaIf:", mq);
            return this.matchMedia.observe([mq], true)
                .pipe(map(result => {
                //console.log("MediaChange:", result);
                return result.matches;
            }), startWith(this.matchMedia.isActive(mq)));
        }))
            .subscribe(matches => matches ? this.createView() : this.destroyView());
    }
    set sqMediaIf(value) {
        this.matcher.next(value);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    createView() {
        if (!this.hasView) {
            this.viewContainer.createEmbeddedView(this.template);
            this.changeDetectorRef.markForCheck();
            this.hasView = true;
        }
    }
    destroyView() {
        if (this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }
}
MediaIf.ɵfac = function MediaIf_Factory(t) { return new (t || MediaIf)(i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef), i0.ɵɵdirectiveInject(i1.BreakPointRegistry), i0.ɵɵdirectiveInject(i1.ɵMatchMedia), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
MediaIf.ɵdir = i0.ɵɵdefineDirective({ type: MediaIf, selectors: [["", "sqMediaIf", ""]], inputs: { sqMediaIf: "sqMediaIf" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MediaIf, [{
        type: Directive,
        args: [{
                selector: "[sqMediaIf]",
            }]
    }], function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i1.BreakPointRegistry }, { type: i1.ɵMatchMedia }, { type: i0.ChangeDetectorRef }]; }, { sqMediaIf: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtaWYuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91dGlscy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvbWVkaWEtaWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQThELE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7QUFFekQsd0ZBQXdGO0FBQ3hGLDZEQUE2RDtBQUk3RCxNQUFNLE9BQU8sT0FBTztJQWdDaEIsWUFDWSxRQUEwQixFQUMxQixhQUErQixFQUMvQixXQUErQixFQUMvQixVQUF1QixFQUN2QixpQkFBb0M7UUFKcEMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFwQ3hDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDaEMsaUJBQVksR0FBRyxJQUFJLENBQUMsT0FBTzthQUM5QixJQUFJLENBQ0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDYixVQUFVLENBQUMsNEJBQTRCLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sRUFBRSxDQUFDO2FBQ2I7aUJBQ0k7Z0JBQ0QsT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ1gsOEJBQThCO1lBQzlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7aUJBQ3JDLElBQUksQ0FDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ1Qsc0NBQXNDO2dCQUN0QyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDMUIsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQzthQUNOLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQWE1RSxDQUFDO0lBWEQsSUFDSSxTQUFTLENBQUMsS0FBYTtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBVUQsV0FBVztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFTyxXQUFXO1FBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNMLENBQUM7OzhEQXpEUSxPQUFPOzRDQUFQLE9BQU87a0RBQVAsT0FBTztjQUhuQixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7YUFDMUI7d0xBNkJPLFNBQVM7a0JBRFosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBJbnB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHvJtU1hdGNoTWVkaWEsIEJyZWFrUG9pbnRSZWdpc3RyeX0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHtTdWJqZWN0LCB0aHJvd0Vycm9yfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtzdGFydFdpdGgsIHN3aXRjaE1hcCwgbWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2ZsZXgtbGF5b3V0L2lzc3Vlcy8xNDIjaXNzdWVjb21tZW50LTM3OTQ2NTAyMlxuLy8gQ2hhbmdlIMm1TWF0Y2hNZWRpYSA9PiBNYXRjaE1lZGlhIHdoZW4gd2UgbW92ZSB0byBhbmd1bGFyIDhcbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltzcU1lZGlhSWZdXCIsXG59KVxuZXhwb3J0IGNsYXNzIE1lZGlhSWYgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgaGFzVmlldyA9IGZhbHNlO1xuICAgIHByaXZhdGUgbWF0Y2hlciA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBwcml2YXRlIHN1YnNjcmlwdGlvbiA9IHRoaXMubWF0Y2hlclxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChhbGlhcyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludHMuZmluZEJ5QWxpYXMoYWxpYXMpO1xuICAgICAgICAgICAgICAgIGlmICghYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKGBicmVha3BvaW50IG5vdCBmb3VuZCBmb3IgJHthbGlhc31gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJlYWtwb2ludC5tZWRpYVF1ZXJ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3dpdGNoTWFwKG1xID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVkaWFJZjpcIiwgbXEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hdGNoTWVkaWEub2JzZXJ2ZShbbXFdLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJNZWRpYUNoYW5nZTpcIiwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm1hdGNoZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh0aGlzLm1hdGNoTWVkaWEuaXNBY3RpdmUobXEpKSk7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZShtYXRjaGVzID0+IG1hdGNoZXMgPyB0aGlzLmNyZWF0ZVZpZXcoKSA6IHRoaXMuZGVzdHJveVZpZXcoKSk7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBzcU1lZGlhSWYodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm1hdGNoZXIubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSBicmVha3BvaW50czogQnJlYWtQb2ludFJlZ2lzdHJ5LFxuICAgICAgICBwcml2YXRlIG1hdGNoTWVkaWE6IMm1TWF0Y2hNZWRpYSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZpZXcoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMuaGFzVmlldyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3lWaWV3KCkge1xuICAgICAgICBpZiAodGhpcy5oYXNWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuaGFzVmlldyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==