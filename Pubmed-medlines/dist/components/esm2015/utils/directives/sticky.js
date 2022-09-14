import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "../ui.service";
import * as i2 from "@angular/common";
const _c0 = ["container"];
const _c1 = ["sqSticky", ""];
const _c2 = function (a0) { return { "margin-top.px": a0 }; };
const _c3 = function (a0, a1) { return { "top.px": a0, "bottom.px": a1 }; };
const _c4 = ["*"];
export class StickyComponent {
    constructor(ui, cdRef) {
        this.ui = ui;
        this.cdRef = cdRef;
        this.marginTop = 0;
        this.postScrollUp = Utils.debounce(() => {
            this.onScroll(true);
        }, 250);
    }
    onScroll(forceScrollDown = false) {
        const scrollDelta = window.pageYOffset - this.scrollY;
        this.scrollY = window.pageYOffset;
        const offsets = this.offsets || { top: 0, bottom: 0 };
        const componentHeight = this.container.nativeElement.getBoundingClientRect().height;
        // Scrolling down (OR top of page OR forced after a scroll up OR component height small than screen height)
        if (scrollDelta >= 0 || this.scrollY === 0 || forceScrollDown || componentHeight + offsets.top + offsets.bottom < window.innerHeight) {
            this.marginTop = Math.min(this.scrollY, this.marginTop);
            this.bottom = undefined;
            this.top = Math.min(window.innerHeight - componentHeight - offsets.bottom, offsets.top);
        }
        // Scrolling up
        else {
            this.marginTop = Math.max(this.scrollY + window.innerHeight - componentHeight - offsets.bottom - offsets.top, this.marginTop);
            this.bottom = window.innerHeight - offsets.top - componentHeight;
            this.top = undefined;
            if (this.scrollY <= this.marginTop) {
                this.postScrollUp();
            }
        }
        this.cdRef.markForCheck();
    }
    ngOnInit() {
        var _a;
        if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
            this.scrollY = window.pageYOffset;
            this.top = (((_a = this.offsets) === null || _a === void 0 ? void 0 : _a.top) || 0);
        }
    }
    ngAfterViewInit() {
        // position: sticky is not supported in Internet Explorer. A workaround could be to rely on position: relative and position: fixed, with additional logic.
        if (CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky")) {
            this.listener = () => this.onScroll();
            window.addEventListener('scroll', this.listener);
            window.addEventListener('resize', this.listener);
            this.ui.addElementResizeListener(this.container.nativeElement, this.listener);
        }
    }
    ngOnDestroy() {
        if (this.listener) {
            window.removeEventListener('scroll', this.listener);
            window.removeEventListener('resize', this.listener);
            this.ui.removeElementResizeListener(this.container.nativeElement, this.listener);
        }
    }
}
StickyComponent.ɵfac = function StickyComponent_Factory(t) { return new (t || StickyComponent)(i0.ɵɵdirectiveInject(i1.UIService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
StickyComponent.ɵcmp = i0.ɵɵdefineComponent({ type: StickyComponent, selectors: [["", "sqSticky", ""]], viewQuery: function StickyComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
    } }, inputs: { offsets: ["sqSticky", "offsets"] }, attrs: _c1, ngContentSelectors: _c4, decls: 4, vars: 7, consts: [[3, "ngStyle"], [1, "sticky-container", 3, "ngStyle"], ["container", ""]], template: function StickyComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵelement(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1, 2);
        i0.ɵɵprojection(3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction1(2, _c2, ctx.marginTop));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(4, _c3, ctx.top, ctx.bottom));
    } }, directives: [i2.NgStyle], styles: [".sticky-container[_ngcontent-%COMP%] {\n    position: sticky;\n    position: -webkit-sticky;\n}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(StickyComponent, [{
        type: Component,
        args: [{
                selector: '[sqSticky]',
                template: `
<div [ngStyle]="{'margin-top.px': marginTop}"></div>
<div #container class="sticky-container" [ngStyle]="{'top.px': top, 'bottom.px': bottom}">
    <ng-content></ng-content>
</div>
`,
                styles: [`
.sticky-container {
    position: sticky;
    position: -webkit-sticky;
}
    `],
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i1.UIService }, { type: i0.ChangeDetectorRef }]; }, { offsets: [{
            type: Input,
            args: ["sqSticky"]
        }], container: [{
            type: ViewChild,
            args: ["container"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXRpbHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3N0aWNreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFxQixTQUFTLEVBQWMsS0FBSyxFQUFxQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEosT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7QUFtQjNDLE1BQU0sT0FBTyxlQUFlO0lBV3hCLFlBQ2MsRUFBYSxFQUNiLEtBQXdCO1FBRHhCLE9BQUUsR0FBRixFQUFFLENBQVc7UUFDYixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQU50QyxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBaUNkLGlCQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUE1QlIsQ0FBQztJQUVELFFBQVEsQ0FBQyxlQUFlLEdBQUcsS0FBSztRQUM1QixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRWxDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztRQUNwRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNwRiwyR0FBMkc7UUFDM0csSUFBRyxXQUFXLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FB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N0IsaUJBQU07O1FBSEQsbUVBQXdDO1FBQ0osZUFBZ0Q7UUFBaEQseUVBQWdEOztrREFZNUUsZUFBZTtjQWhCM0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUU7Ozs7O0NBS2I7Z0JBQ0csTUFBTSxFQUFFLENBQUM7Ozs7O0tBS1IsQ0FBQztnQkFDRixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs0RkFFc0IsT0FBTztrQkFBekIsS0FBSzttQkFBQyxVQUFVO1lBQ08sU0FBUztrQkFBaEMsU0FBUzttQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJ0BzaW5lcXVhL2NvcmUvYmFzZSc7XG5pbXBvcnQgeyBVSVNlcnZpY2UgfSBmcm9tICcuLi91aS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc3FTdGlja3ldJyxcbiAgICB0ZW1wbGF0ZTogYFxuPGRpdiBbbmdTdHlsZV09XCJ7J21hcmdpbi10b3AucHgnOiBtYXJnaW5Ub3B9XCI+PC9kaXY+XG48ZGl2ICNjb250YWluZXIgY2xhc3M9XCJzdGlja3ktY29udGFpbmVyXCIgW25nU3R5bGVdPVwieyd0b3AucHgnOiB0b3AsICdib3R0b20ucHgnOiBib3R0b219XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLFxuICAgIHN0eWxlczogW2Bcbi5zdGlja3ktY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHBvc2l0aW9uOiAtd2Via2l0LXN0aWNreTtcbn1cbiAgICBgXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBTdGlja3lDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveXtcbiAgICBASW5wdXQoXCJzcVN0aWNreVwiKSBvZmZzZXRzPzoge3RvcDogbnVtYmVyLCBib3R0b206IG51bWJlcn07XG4gICAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XG5cbiAgICB0b3A/OiBudW1iZXI7XG4gICAgYm90dG9tPzogbnVtYmVyO1xuICAgIHNjcm9sbFk6IG51bWJlcjtcbiAgICBtYXJnaW5Ub3AgPSAwO1xuICAgIFxuICAgIHByaXZhdGUgbGlzdGVuZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCB1aTogVUlTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKXtcbiAgICB9XG5cbiAgICBvblNjcm9sbChmb3JjZVNjcm9sbERvd24gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBzY3JvbGxEZWx0YSA9IHdpbmRvdy5wYWdlWU9mZnNldCAtIHRoaXMuc2Nyb2xsWTtcbiAgICAgICAgdGhpcy5zY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG9mZnNldHMgPSB0aGlzLm9mZnNldHMgfHwge3RvcDogMCwgYm90dG9tOiAwfTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50SGVpZ2h0ID0gdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgIC8vIFNjcm9sbGluZyBkb3duIChPUiB0b3Agb2YgcGFnZSBPUiBmb3JjZWQgYWZ0ZXIgYSBzY3JvbGwgdXAgT1IgY29tcG9uZW50IGhlaWdodCBzbWFsbCB0aGFuIHNjcmVlbiBoZWlnaHQpXG4gICAgICAgIGlmKHNjcm9sbERlbHRhID49IDAgfHwgdGhpcy5zY3JvbGxZID09PSAwIHx8IGZvcmNlU2Nyb2xsRG93biB8fCBjb21wb25lbnRIZWlnaHQgKyBvZmZzZXRzLnRvcCArIG9mZnNldHMuYm90dG9tIDwgd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLm1hcmdpblRvcCA9IE1hdGgubWluKHRoaXMuc2Nyb2xsWSwgdGhpcy5tYXJnaW5Ub3ApO1xuICAgICAgICAgICAgdGhpcy5ib3R0b20gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCAtIGNvbXBvbmVudEhlaWdodCAtIG9mZnNldHMuYm90dG9tLCBvZmZzZXRzLnRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2Nyb2xsaW5nIHVwXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5Ub3AgPSBNYXRoLm1heCh0aGlzLnNjcm9sbFkgKyB3aW5kb3cuaW5uZXJIZWlnaHQgLSBjb21wb25lbnRIZWlnaHQgLW9mZnNldHMuYm90dG9tIC0gb2Zmc2V0cy50b3AsIHRoaXMubWFyZ2luVG9wKTtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tID0gd2luZG93LmlubmVySGVpZ2h0IC0gb2Zmc2V0cy50b3AgLSBjb21wb25lbnRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmKHRoaXMuc2Nyb2xsWSA8PSB0aGlzLm1hcmdpblRvcCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zdFNjcm9sbFVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBwb3N0U2Nyb2xsVXAgPSBVdGlscy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgIHRoaXMub25TY3JvbGwodHJ1ZSk7XG4gICAgfSwgMjUwKTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZihDU1Muc3VwcG9ydHMoXCJwb3NpdGlvblwiLCBcInN0aWNreVwiKSB8fCBDU1Muc3VwcG9ydHMoXCJwb3NpdGlvblwiLCBcIi13ZWJraXQtc3RpY2t5XCIpKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLnRvcCA9ICh0aGlzLm9mZnNldHM/LnRvcCB8fCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy8gcG9zaXRpb246IHN0aWNreSBpcyBub3Qgc3VwcG9ydGVkIGluIEludGVybmV0IEV4cGxvcmVyLiBBIHdvcmthcm91bmQgY291bGQgYmUgdG8gcmVseSBvbiBwb3NpdGlvbjogcmVsYXRpdmUgYW5kIHBvc2l0aW9uOiBmaXhlZCwgd2l0aCBhZGRpdGlvbmFsIGxvZ2ljLlxuICAgICAgICBpZihDU1Muc3VwcG9ydHMoXCJwb3NpdGlvblwiLCBcInN0aWNreVwiKSB8fCBDU1Muc3VwcG9ydHMoXCJwb3NpdGlvblwiLCBcIi13ZWJraXQtc3RpY2t5XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyID0gKCkgPT4gdGhpcy5vblNjcm9sbCgpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy51aS5hZGRFbGVtZW50UmVzaXplTGlzdGVuZXIodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgdGhpcy5saXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy5saXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMubGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy51aS5yZW1vdmVFbGVtZW50UmVzaXplTGlzdGVuZXIodGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudCwgdGhpcy5saXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==