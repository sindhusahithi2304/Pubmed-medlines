import { Component } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/notification";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
const _c0 = function (a0) { return { "blink": a0 }; };
export class BsNetworkActivity {
    constructor(notificationsService, changeDetectorRef) {
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngOnInit() {
        this.unbind();
        this.bind();
    }
    ngOnDestroy() {
        this.unbind();
    }
    bind() {
        this.subscription = this.notificationsService.events.subscribe((value) => {
            this.active = this.notificationsService.get("network") > 0;
            setTimeout(() => this.changeDetectorRef.markForCheck(), 0); // Value can switch synchronously => this can cause "Expression has changed" error
        });
    }
    unbind() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
BsNetworkActivity.ɵfac = function BsNetworkActivity_Factory(t) { return new (t || BsNetworkActivity)(i0.ɵɵdirectiveInject(i1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
BsNetworkActivity.ɵcmp = i0.ɵɵdefineComponent({ type: BsNetworkActivity, selectors: [["sq-network-activity"]], decls: 5, vars: 6, consts: [[1, "btn-toolbar"], [1, "btn-group"], [1, "btn-text", 3, "title"], [1, "fas", "fa-bolt", 3, "ngClass"]], template: function BsNetworkActivity_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelement(4, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(3, 2, "msg#statusbar.networkActivity"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c0, ctx.active));
    } }, directives: [i2.NgClass], pipes: [i3.MessagePipe], styles: ["@-webkit-keyframes blink{0%{opacity:1}25%{opacity:.25}50%{opacity:.5}75%{opacity:.75}to{opacity:0}}@keyframes blink{0%{opacity:1}25%{opacity:.25}50%{opacity:.5}75%{opacity:.75}to{opacity:0}}.blink[_ngcontent-%COMP%]{-webkit-animation:blink .75s linear infinite;animation:blink .75s linear infinite;color:red}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsNetworkActivity, [{
        type: Component,
        args: [{
                selector: "sq-network-activity",
                templateUrl: "./network-activity.html",
                styleUrls: ["./network-activity.scss"]
            }]
    }], function () { return [{ type: i1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1hY3Rpdml0eS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3N0YXR1cy1iYXIvIiwic291cmNlcyI6WyJib290c3RyYXAvbmV0d29yay1hY3Rpdml0eS9uZXR3b3JrLWFjdGl2aXR5LnRzIiwiYm9vdHN0cmFwL25ldHdvcmstYWN0aXZpdHkvbmV0d29yay1hY3Rpdml0eS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQXVDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFTOUUsTUFBTSxPQUFPLGlCQUFpQjtJQUsxQixZQUNZLG9CQUEwQyxFQUMxQyxpQkFBb0M7UUFEcEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQ2hELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDMUQsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0QsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtGQUFrRjtRQUNsSixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7U0FDakM7SUFDTCxDQUFDOztrRkFoQ1EsaUJBQWlCO3NEQUFqQixpQkFBaUI7UUNUOUIsOEJBQ0k7UUFBQSw4QkFDSTtRQUFBLDhCQUNJOztRQUFBLDBCQUErRDtRQUNuRSxpQkFBTTtRQUNWLGlCQUFNO1FBQ1YsaUJBQU07O1FBSndCLGVBQXVEO1FBQXZELHdGQUF1RDtRQUMvQyxlQUE2QjtRQUE3QixnRUFBNkI7O2tERE10RCxpQkFBaUI7Y0FMN0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO2FBQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbm90aWZpY2F0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLW5ldHdvcmstYWN0aXZpdHlcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL25ldHdvcmstYWN0aXZpdHkuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wiLi9uZXR3b3JrLWFjdGl2aXR5LnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQnNOZXR3b3JrQWN0aXZpdHkgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIGhpZGRlbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbnNTZXJ2aWNlOiBOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51bmJpbmQoKTtcbiAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKCk7XG4gICAgfVxuXG4gICAgYmluZCgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLm5vdGlmaWNhdGlvbnNTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMubm90aWZpY2F0aW9uc1NlcnZpY2UuZ2V0KFwibmV0d29ya1wiKSA+IDA7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpLCAwKTsgLy8gVmFsdWUgY2FuIHN3aXRjaCBzeW5jaHJvbm91c2x5ID0+IHRoaXMgY2FuIGNhdXNlIFwiRXhwcmVzc2lvbiBoYXMgY2hhbmdlZFwiIGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLXRleHRcIiB0aXRsZT1cInt7J21zZyNzdGF0dXNiYXIubmV0d29ya0FjdGl2aXR5JyB8IHNxTWVzc2FnZX19XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1ib2x0XCIgW25nQ2xhc3NdPVwieydibGluayc6IGFjdGl2ZX1cIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+Il19