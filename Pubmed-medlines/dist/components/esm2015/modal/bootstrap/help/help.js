import { Component, Inject, HostBinding } from "@angular/core";
import { START_CONFIG } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "../modal.component";
export class BsHelp {
    constructor(startConfig, sanitizer) {
        this.startConfig = startConfig;
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
        const url = this.startConfig.helpUrl || "assets/help/index.html";
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
BsHelp.ɵfac = function BsHelp_Factory(t) { return new (t || BsHelp)(i0.ɵɵdirectiveInject(START_CONFIG), i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
BsHelp.ɵcmp = i0.ɵɵdefineComponent({ type: BsHelp, selectors: [["sq-help"]], hostVars: 2, hostBindings: function BsHelp_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("modal-content", true);
    } }, decls: 3, vars: 2, consts: [[3, "title"], [1, "d-flex", "flex-column"], [3, "src"]], template: function BsHelp_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "sq-modal", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelement(2, "iframe", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("title", "msg#help.title");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("src", ctx.url, i0.ɵɵsanitizeResourceUrl);
    } }, directives: [i2.BsModal], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsHelp, [{
        type: Component,
        args: [{
                selector: "sq-help",
                templateUrl: "./help.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.DomSanitizer }]; }, { true: [{
            type: HostBinding,
            args: ["class.modal-content"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2hlbHAvaGVscC50cyIsImJvb3RzdHJhcC9oZWxwL2hlbHAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFFckUsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDOzs7O0FBTXJFLE1BQU0sT0FBTyxNQUFNO0lBS2YsWUFDaUMsV0FBd0IsRUFDOUMsU0FBdUI7UUFERCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUM5QyxjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQ2xDLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksd0JBQXdCLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7OzREQWJRLE1BQU0sdUJBTUgsWUFBWTsyQ0FOZixNQUFNOzs7UUNSbkIsbUNBQ0k7UUFBQSw4QkFDSTtRQUFBLDRCQUE2QjtRQUNqQyxpQkFBTTtRQUNWLGlCQUFXOztRQUpELHdDQUEwQjtRQUVwQixlQUFXO1FBQVgsdURBQVc7O2tERE1kLE1BQU07Y0FKbEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUsYUFBYTthQUM3Qjs7c0JBT1EsTUFBTTt1QkFBQyxZQUFZO21EQUxZLElBQUk7a0JBQXZDLFdBQVc7bUJBQUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdCwgSG9zdEJpbmRpbmcsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U2FmZVJlc291cmNlVXJsLCBEb21TYW5pdGl6ZXJ9IGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWd9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1oZWxwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9oZWxwLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0hlbHAgIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5tb2RhbC1jb250ZW50XCIpIHRydWU7XG4gICAgbW9kZWw6IHt9O1xuICAgIHVybDogU2FmZVJlc291cmNlVXJsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBwdWJsaWMgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5zdGFydENvbmZpZy5oZWxwVXJsIHx8IFwiYXNzZXRzL2hlbHAvaW5kZXguaHRtbFwiO1xuICAgICAgICB0aGlzLnVybCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xuICAgIH1cbn1cbiIsIjxzcS1tb2RhbCBbdGl0bGVdPVwiJ21zZyNoZWxwLnRpdGxlJ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW5cIj5cbiAgICAgICAgPGlmcmFtZSBbc3JjXT1cInVybFwiPjwvaWZyYW1lPlxuICAgIDwvZGl2PlxuPC9zcS1tb2RhbD4iXX0=