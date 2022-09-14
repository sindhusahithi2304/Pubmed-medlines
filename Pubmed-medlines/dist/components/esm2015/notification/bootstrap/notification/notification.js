import { Component, Input } from "@angular/core";
import { trigger, animate, transition, style } from '@angular/animations';
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/notification";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function BsNotification_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function BsNotification_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.close(); });
    i0.ɵɵelementStart(1, "span", 8);
    i0.ɵɵtext(2, "\u00D7");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
    i0.ɵɵtext(4, "Close");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
function BsNotification_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 10);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "hr");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r1.notification.title));
} }
const _c0 = function (a0) { return { values: a0 }; };
export function notificationAnimations(timings) {
    return [
        trigger('autoClose', [
            transition('1 => void', [
                animate(timings, style({ opacity: 0 }))
            ])
        ])
    ];
}
export class BsNotification {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    ngOnInit() {
        if (this.notification.autoClose && this.notification.state === 0 /* Initial */) {
            this.autoClose = true;
            Utils.delay(5000).then(value => {
                if (this.notification.state === 0 /* Initial */) {
                    this.close();
                }
            });
        }
    }
    get alertClass() {
        switch (this.notification.type) {
            case 1 /* Info */: return "info";
            case 0 /* Success */: return "success";
            case 2 /* Warning */: return "warning";
            case 3 /* Error */: return "danger";
        }
        return "";
    }
    get notificationClass() {
        switch (this.notification.type) {
            case 1 /* Info */: return "fas fa-info-circle fa-lg";
            case 0 /* Success */: return "fas fa-check-circle fa-lg";
            case 2 /* Warning */: return "fas fa-exclamation-triangle fa-lg";
            case 3 /* Error */: return "fas fa-exclamation-circle fa-lg";
        }
        return "";
    }
    get showClose() {
        return !this.notification.autoClose || this.notification.state !== 0 /* Initial */;
    }
    close() {
        this.notificationsService.closeNotification(this.notification);
    }
}
BsNotification.ɵfac = function BsNotification_Factory(t) { return new (t || BsNotification)(i0.ɵɵdirectiveInject(i1.NotificationsService)); };
BsNotification.ɵcmp = i0.ɵɵdefineComponent({ type: BsNotification, selectors: [["sq-notification"]], inputs: { notification: "notification" }, decls: 10, vars: 15, consts: [["role", "alert"], ["type", "button", "class", "close", "aria-label", "Close", 3, "click", 4, "ngIf"], [1, "sq-notification-container"], [1, "sq-notification-icon"], [1, "sq-notification-message"], [4, "ngIf"], [1, "sq-notification-text"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "sr-only"], [1, "sq-notification-title"]], template: function BsNotification_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsNotification_button_1_Template, 5, 0, "button", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelement(4, "span");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 4);
        i0.ɵɵtemplate(6, BsNotification_ng_container_6_Template, 5, 3, "ng-container", 5);
        i0.ɵɵelementStart(7, "span", 6);
        i0.ɵɵtext(8);
        i0.ɵɵpipe(9, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵclassMapInterpolate1("alert alert-", ctx.alertClass, " sq-notification");
        i0.ɵɵproperty("@autoClose", ctx.autoClose);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showClose);
        i0.ɵɵadvance(3);
        i0.ɵɵclassMap(ctx.notificationClass);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !!ctx.notification.title);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 10, ctx.notification.text, i0.ɵɵpureFunction1(13, _c0, ctx.notification.params)));
    } }, directives: [i2.NgIf], pipes: [i3.MessagePipe], encapsulation: 2, data: { animation: notificationAnimations(".15s ease-in-out") } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsNotification, [{
        type: Component,
        args: [{
                selector: "sq-notification",
                templateUrl: "./notification.html",
                animations: notificationAnimations(".15s ease-in-out")
            }]
    }], function () { return [{ type: i1.NotificationsService }]; }, { notification: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24udHMiLCJib290c3RyYXAvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTJCLE1BQU0scUJBQXFCLENBQUM7QUFFbEcsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0lDRnJDLGlDQUNJO0lBRHFFLGdMQUFpQjtJQUN0RiwrQkFBeUI7SUFBQSxzQkFBTztJQUFBLGlCQUFPO0lBQ3ZDLCtCQUFzQjtJQUFBLHFCQUFLO0lBQUEsaUJBQU87SUFDdEMsaUJBQVM7OztJQU1ELDZCQUNJO0lBQUEsZ0NBQW9DO0lBQUEsWUFBa0M7O0lBQUEsaUJBQU87SUFDN0UscUJBQ0o7SUFBQSwwQkFBZTs7O0lBRnlCLGVBQWtDO0lBQWxDLHFFQUFrQzs7O0FETnRGLE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUF3QjtJQUMzRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUNqQixVQUFVLENBQUMsV0FBVyxFQUFFO2dCQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzFDLENBQUM7U0FDTCxDQUFDO0tBQ0wsQ0FBQztBQUNOLENBQUM7QUFPRCxNQUFNLE9BQU8sY0FBYztJQUd2QixZQUNZLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ3RELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssb0JBQThCLEVBQUU7WUFDdEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLG9CQUE4QixFQUFFO29CQUN2RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2hCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDVixRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQzVCLGlCQUEwQixDQUFDLENBQUMsT0FBTyxNQUFNLENBQUM7WUFDMUMsb0JBQTZCLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQztZQUNoRCxvQkFBNkIsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDO1lBQ2hELGtCQUEyQixDQUFDLENBQUMsT0FBTyxRQUFRLENBQUM7U0FDaEQ7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNqQixRQUFRLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQzVCLGlCQUEwQixDQUFDLENBQUMsT0FBTywwQkFBMEIsQ0FBQztZQUM5RCxvQkFBNkIsQ0FBQyxDQUFDLE9BQU8sMkJBQTJCLENBQUM7WUFDbEUsb0JBQTZCLENBQUMsQ0FBQyxPQUFPLG1DQUFtQyxDQUFDO1lBQzFFLGtCQUEyQixDQUFDLENBQUMsT0FBTyxpQ0FBaUMsQ0FBQztTQUN6RTtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssb0JBQThCLENBQUM7SUFDakcsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25FLENBQUM7OzRFQTVDUSxjQUFjO21EQUFkLGNBQWM7UUNwQjNCLDhCQUNJO1FBQUEscUVBR1M7UUFDVCw4QkFDSTtRQUFBLDhCQUNJO1FBQUEsdUJBQTJDO1FBQy9DLGlCQUFNO1FBQ04sOEJBQ0k7UUFBQSxpRkFHZTtRQUNmLCtCQUFtQztRQUFBLFlBQWdFOztRQUFBLGlCQUFPO1FBQzlHLGlCQUFNO1FBQ1YsaUJBQU07UUFDVixpQkFBTTs7UUFqQndCLDZFQUFrRDtRQUEzRSwwQ0FBd0I7UUFDaEIsZUFBZTtRQUFmLG9DQUFlO1FBTVYsZUFBNkI7UUFBN0Isb0NBQTZCO1FBR3BCLGVBQTBCO1FBQTFCLCtDQUEwQjtRQUlOLGVBQWdFO1FBQWhFLHdIQUFnRTs4RkRJL0Ysc0JBQXNCLENBQUMsa0JBQWtCLENBQUM7a0RBRTdDLGNBQWM7Y0FMMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFdBQVcsRUFBRSxxQkFBcUI7Z0JBQ2xDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQzthQUN6RDt1RUFFWSxZQUFZO2tCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge3RyaWdnZXIsIGFuaW1hdGUsIHRyYW5zaXRpb24sIHN0eWxlLCBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGF9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtOb3RpZmljYXRpb25zU2VydmljZSwgTm90aWZpY2F0aW9uLCBOb3RpZmljYXRpb25TdGF0ZSwgTm90aWZpY2F0aW9uVHlwZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbm90aWZpY2F0aW9uXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3RpZmljYXRpb25BbmltYXRpb25zKHRpbWluZ3M6IG51bWJlciB8IHN0cmluZyk6IEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB0cmlnZ2VyKCdhdXRvQ2xvc2UnLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCcxID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSh0aW1pbmdzLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF07XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLW5vdGlmaWNhdGlvblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbm90aWZpY2F0aW9uLmh0bWxcIixcbiAgICBhbmltYXRpb25zOiBub3RpZmljYXRpb25BbmltYXRpb25zKFwiLjE1cyBlYXNlLWluLW91dFwiKVxufSlcbmV4cG9ydCBjbGFzcyBCc05vdGlmaWNhdGlvbiBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb247XG4gICAgYXV0b0Nsb3NlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbnNTZXJ2aWNlOiBOb3RpZmljYXRpb25zU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb24uYXV0b0Nsb3NlICYmIHRoaXMubm90aWZpY2F0aW9uLnN0YXRlID09PSBOb3RpZmljYXRpb25TdGF0ZS5Jbml0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLmF1dG9DbG9zZSA9IHRydWU7XG4gICAgICAgICAgICBVdGlscy5kZWxheSg1MDAwKS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb24uc3RhdGUgPT09IE5vdGlmaWNhdGlvblN0YXRlLkluaXRpYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGFsZXJ0Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLm5vdGlmaWNhdGlvbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvblR5cGUuSW5mbzogcmV0dXJuIFwiaW5mb1wiO1xuICAgICAgICAgICAgY2FzZSBOb3RpZmljYXRpb25UeXBlLlN1Y2Nlc3M6IHJldHVybiBcInN1Y2Nlc3NcIjtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uVHlwZS5XYXJuaW5nOiByZXR1cm4gXCJ3YXJuaW5nXCI7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvblR5cGUuRXJyb3I6IHJldHVybiBcImRhbmdlclwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIGdldCBub3RpZmljYXRpb25DbGFzcygpOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubm90aWZpY2F0aW9uLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uVHlwZS5JbmZvOiByZXR1cm4gXCJmYXMgZmEtaW5mby1jaXJjbGUgZmEtbGdcIjtcbiAgICAgICAgICAgIGNhc2UgTm90aWZpY2F0aW9uVHlwZS5TdWNjZXNzOiByZXR1cm4gXCJmYXMgZmEtY2hlY2stY2lyY2xlIGZhLWxnXCI7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvblR5cGUuV2FybmluZzogcmV0dXJuIFwiZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGZhLWxnXCI7XG4gICAgICAgICAgICBjYXNlIE5vdGlmaWNhdGlvblR5cGUuRXJyb3I6IHJldHVybiBcImZhcyBmYS1leGNsYW1hdGlvbi1jaXJjbGUgZmEtbGdcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0Nsb3NlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMubm90aWZpY2F0aW9uLmF1dG9DbG9zZSB8fCB0aGlzLm5vdGlmaWNhdGlvbi5zdGF0ZSAhPT0gTm90aWZpY2F0aW9uU3RhdGUuSW5pdGlhbDtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5jbG9zZU5vdGlmaWNhdGlvbih0aGlzLm5vdGlmaWNhdGlvbik7XG4gICAgfVxufSIsIjxkaXYgW0BhdXRvQ2xvc2VdPVwiYXV0b0Nsb3NlXCIgY2xhc3M9XCJhbGVydCBhbGVydC17e2FsZXJ0Q2xhc3N9fSBzcS1ub3RpZmljYXRpb25cIiByb2xlPVwiYWxlcnRcIj5cbiAgICA8YnV0dG9uICpuZ0lmPVwic2hvd0Nsb3NlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxuICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5DbG9zZTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwic3Etbm90aWZpY2F0aW9uLWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Etbm90aWZpY2F0aW9uLWljb25cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwie3tub3RpZmljYXRpb25DbGFzc319XCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxLW5vdGlmaWNhdGlvbi1tZXNzYWdlXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFub3RpZmljYXRpb24udGl0bGVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNxLW5vdGlmaWNhdGlvbi10aXRsZVwiPnt7bm90aWZpY2F0aW9uLnRpdGxlIHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGhyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNxLW5vdGlmaWNhdGlvbi10ZXh0XCI+e3tub3RpZmljYXRpb24udGV4dCB8IHNxTWVzc2FnZTp7dmFsdWVzOiBub3RpZmljYXRpb24ucGFyYW1zfSB9fTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxuICAgIDwvZGl2PiAgICAgICAgXG48L2Rpdj4iXX0=