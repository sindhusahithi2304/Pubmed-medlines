import { Component } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/utils";
import * as i2 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0) { return { items: a0 }; };
export class BsFullscreenActivator {
    constructor(uiService) {
        this.uiService = uiService;
        this.buildAction();
    }
    getFullscreenIcon() {
        return !this.isFullscreen() ? "fas fa-expand" : "fas fa-compress";
    }
    getFullscreenTitle() {
        return !this.isFullscreen() ? "msg#statusbar.fullscreenTitleEnter" : "msg#statusbar.fullscreenTitleExit";
    }
    buildAction() {
        this.action = new Action({
            icon: this.getFullscreenIcon(),
            title: this.getFullscreenTitle(),
            action: (item, $event) => {
                this.toggleFullscreen();
                item.icon = this.getFullscreenIcon();
                item.title = this.getFullscreenTitle();
            },
            init: (item) => {
                this.resizeSubscription = Utils.subscribe(this.uiService.resizeEvent, (event) => {
                    this.action.icon = this.getFullscreenIcon();
                    this.action.title = this.getFullscreenTitle();
                });
            },
            destroy: (item) => {
                if (this.resizeSubscription) {
                    this.resizeSubscription.unsubscribe();
                    this.resizeSubscription = undefined;
                }
            }
        });
    }
    requestFullscreen() {
        const doc = window.document;
        const docEl = doc.documentElement;
        const requestFullScreen = docEl["requestFullscreen"] || docEl["mozRequestFullScreen"] || docEl["webkitRequestFullScreen"] || docEl["msRequestFullscreen"];
        if (requestFullScreen) {
            requestFullScreen.call(docEl);
        }
    }
    cancelFullscreen() {
        const doc = window.document;
        const cancelFullScreen = doc["exitFullscreen"] || doc["mozCancelFullScreen"] || doc["webkitExitFullscreen"] || doc["msExitFullscreen"];
        if (cancelFullScreen) {
            cancelFullScreen.call(doc);
        }
    }
    isFullscreen() {
        const doc = window.document;
        return doc["fullscreenElement"] || doc["mozFullScreenElement"] || doc["webkitFullscreenElement"] || doc["msFullscreenElement"];
    }
    toggleFullscreen() {
        if (!this.isFullscreen()) {
            this.requestFullscreen();
        }
        else {
            this.cancelFullscreen();
        }
    }
}
BsFullscreenActivator.ɵfac = function BsFullscreenActivator_Factory(t) { return new (t || BsFullscreenActivator)(i0.ɵɵdirectiveInject(i1.UIService)); };
BsFullscreenActivator.ɵcmp = i0.ɵɵdefineComponent({ type: BsFullscreenActivator, selectors: [["sq-fullscreen-activator"]], decls: 2, vars: 5, consts: [[1, "btn-toolbar"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsFullscreenActivator_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction1(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx.action)));
    } }, directives: [i2.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFullscreenActivator, [{
        type: Component,
        args: [{
                selector: "sq-fullscreen-activator",
                templateUrl: "./fullscreen-activator.html"
            }]
    }], function () { return [{ type: i1.UIService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbHNjcmVlbi1hY3RpdmF0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zdGF0dXMtYmFyLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2Z1bGxzY3JlZW4tYWN0aXZhdG9yL2Z1bGxzY3JlZW4tYWN0aXZhdG9yLnRzIiwiYm9vdHN0cmFwL2Z1bGxzY3JlZW4tYWN0aXZhdG9yL2Z1bGxzY3JlZW4tYWN0aXZhdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7QUFRekMsTUFBTSxPQUFPLHFCQUFxQjtJQUk5QixZQUNZLFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxpQkFBaUI7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQ3RFLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLENBQUMsbUNBQW1DLENBQUM7SUFDN0csQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDOUIsS0FBSyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUNoQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzNDLENBQUM7WUFDRCxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFFWCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFDaEUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDO1lBRVgsQ0FBQztZQUNELE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUVkLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO29CQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7aUJBQ3ZDO1lBRUwsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQkFBaUI7UUFDYixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzVCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDbEMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMxSixJQUFJLGlCQUFpQixFQUFFO1lBQ25CLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksR0FBRyxDQUFDLHNCQUFzQixDQUFDLElBQUksR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkksSUFBSSxnQkFBZ0IsRUFBRTtZQUNsQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNSLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDNUIsT0FBTyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxHQUFHLENBQUMsc0JBQXNCLENBQUMsSUFBSSxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNuSSxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDOzswRkEzRVEscUJBQXFCOzBEQUFyQixxQkFBcUI7UUNWbEMsOEJBQ0k7UUFBQSx5QkFBcUU7UUFDekUsaUJBQU07O1FBRHFCLGVBQXVDO1FBQXZDLHNHQUF1Qzs7a0REU3JELHFCQUFxQjtjQUpqQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsV0FBVyxFQUFFLDZCQUE2QjthQUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1VJU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvdXRpbHNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtZnVsbHNjcmVlbi1hY3RpdmF0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Z1bGxzY3JlZW4tYWN0aXZhdG9yLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBCc0Z1bGxzY3JlZW5BY3RpdmF0b3Ige1xuICAgIGFjdGlvbjogQWN0aW9uO1xuICAgIHJlc2l6ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdWlTZXJ2aWNlOiBVSVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5idWlsZEFjdGlvbigpO1xuICAgIH1cblxuICAgIGdldEZ1bGxzY3JlZW5JY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0Z1bGxzY3JlZW4oKSA/IFwiZmFzIGZhLWV4cGFuZFwiIDogXCJmYXMgZmEtY29tcHJlc3NcIjtcbiAgICB9XG5cbiAgICBnZXRGdWxsc2NyZWVuVGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzRnVsbHNjcmVlbigpID8gXCJtc2cjc3RhdHVzYmFyLmZ1bGxzY3JlZW5UaXRsZUVudGVyXCIgOiBcIm1zZyNzdGF0dXNiYXIuZnVsbHNjcmVlblRpdGxlRXhpdFwiO1xuICAgIH1cblxuICAgIGJ1aWxkQWN0aW9uKCkge1xuICAgICAgICB0aGlzLmFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogdGhpcy5nZXRGdWxsc2NyZWVuSWNvbigpLFxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZ2V0RnVsbHNjcmVlblRpdGxlKCksXG4gICAgICAgICAgICBhY3Rpb246IChpdGVtLCAkZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgICAgICBpdGVtLmljb24gPSB0aGlzLmdldEZ1bGxzY3JlZW5JY29uKCk7XG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMuZ2V0RnVsbHNjcmVlblRpdGxlKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uID0gVXRpbHMuc3Vic2NyaWJlKHRoaXMudWlTZXJ2aWNlLnJlc2l6ZUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uLmljb24gPSB0aGlzLmdldEZ1bGxzY3JlZW5JY29uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbi50aXRsZSA9IHRoaXMuZ2V0RnVsbHNjcmVlblRpdGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICAgICAgY29uc3QgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICBjb25zdCByZXF1ZXN0RnVsbFNjcmVlbiA9IGRvY0VsW1wicmVxdWVzdEZ1bGxzY3JlZW5cIl0gfHwgZG9jRWxbXCJtb3pSZXF1ZXN0RnVsbFNjcmVlblwiXSB8fCBkb2NFbFtcIndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuXCJdIHx8IGRvY0VsW1wibXNSZXF1ZXN0RnVsbHNjcmVlblwiXTtcbiAgICAgICAgaWYgKHJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICByZXF1ZXN0RnVsbFNjcmVlbi5jYWxsKGRvY0VsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICAgICAgY29uc3QgY2FuY2VsRnVsbFNjcmVlbiA9IGRvY1tcImV4aXRGdWxsc2NyZWVuXCJdIHx8IGRvY1tcIm1vekNhbmNlbEZ1bGxTY3JlZW5cIl0gfHwgZG9jW1wid2Via2l0RXhpdEZ1bGxzY3JlZW5cIl0gfHwgZG9jW1wibXNFeGl0RnVsbHNjcmVlblwiXTtcbiAgICAgICAgaWYgKGNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGNhbmNlbEZ1bGxTY3JlZW4uY2FsbChkb2MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGdWxsc2NyZWVuKCkge1xuICAgICAgICBjb25zdCBkb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgICAgIHJldHVybiBkb2NbXCJmdWxsc2NyZWVuRWxlbWVudFwiXSB8fCBkb2NbXCJtb3pGdWxsU2NyZWVuRWxlbWVudFwiXSB8fCBkb2NbXCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudFwiXSB8fCBkb2NbXCJtc0Z1bGxzY3JlZW5FbGVtZW50XCJdO1xuICAgIH1cblxuICAgIHRvZ2dsZUZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIFtzcS1hY3Rpb24tYnV0dG9uc109XCJ7aXRlbXM6IFthY3Rpb25dfVwiPjwvZGl2PlxuPC9kaXY+Il19