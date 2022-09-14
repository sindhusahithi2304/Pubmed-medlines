import { Component, Input } from "@angular/core";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/login";
import * as i2 from "../../baskets.service";
import * as i3 from "@sinequa/core/web-services";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/components/action";
const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsBasketsMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
export class BsBasketsMenuComponent {
    constructor(loginService, basketsService, principalService, userSettingsService, appService) {
        this.loginService = loginService;
        this.basketsService = basketsService;
        this.principalService = principalService;
        this.userSettingsService = userSettingsService;
        this.appService = appService;
        this.searchRoute = "/search";
        this.icon = "fas fa-shopping-basket";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = "xl";
        this.collapseBreakpoint = "sm";
        this.basketOptions = ["Select", "Share"];
        this.basketCustomOptions = [];
        this.createAction = new Action({
            text: "msg#baskets.createBasket",
            title: "msg#baskets.createBasket",
            action: (_) => {
                this.basketsService.createBasketModal();
            },
        });
        this.manageAction = new Action({
            text: "msg#baskets.manageBaskets",
            title: "msg#baskets.manageBaskets",
            action: (_) => {
                this.basketsService.manageBasketsModal();
            },
        });
    }
    ngOnInit() {
        this.updateMenu();
        this.basketsService.changes.subscribe({
            next: () => {
                this.updateMenu();
            },
        });
        this.loginService.events.subscribe((event) => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        //Select and Share options//
        const basketsActions = [];
        if (this.basketsService.hasBasket) {
            this.basketsService.baskets.map((basket) => basketsActions.push(new Action({
                text: basket.name,
                title: basket.name,
                children: [
                    new Action({
                        text: "Select",
                        title: "Select",
                        action: () => this.basketsService.searchBasket(basket, this.searchRoute),
                    }),
                    new Action({
                        text: "Share",
                        title: "Share",
                        action: () => this.sendEmail(basket, this.searchRoute),
                    }),
                ],
            })));
        }
        basketsActions.push(new Action({ separator: true }));
        basketsActions.push(this.createAction);
        if (this.basketsService.hasBasket) {
            basketsActions.push(this.manageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#baskets.baskets",
            title: "msg#baskets.baskets",
            children: basketsActions,
        });
    }
    sendEmail(basket, curr) {
        var _a, _b;
        let mailToUrl = "";
        let name = (_b = (_a = this.principalService) === null || _a === void 0 ? void 0 : _a.principal) === null || _b === void 0 ? void 0 : _b.name;
        let basketName = basket.name;
        var query = "#/search?query=%7B%22name%22:%22" + this.appService.appName + "%22,%22basket%22:%22" + basketName + "%22,%22user%22:%22" + name + "%22,%22tab%22:%22ALL%22%7D&view=list" + "&user=" + name + "&sharedBasket=" + basketName;
        var body = "https://" + window.location.host + window.location.pathname + encodeURIComponent(query);
        console.log(body);
        //?query={%22name%22:%22GlobalSearch_V3.2%22,%22basket%22:%22Favorites%22,%22tab%22:%22ALL%22}&view=list&user=200035114&sharedBasket=Favorites
        mailToUrl = "mailto:?subject=Pubmed Search Basket&body=" + body;
        console.log(mailToUrl);
        window.location.href = mailToUrl;
    }
}
BsBasketsMenuComponent.ɵfac = function BsBasketsMenuComponent_Factory(t) { return new (t || BsBasketsMenuComponent)(i0.ɵɵdirectiveInject(i1.LoginService), i0.ɵɵdirectiveInject(i2.BasketsService), i0.ɵɵdirectiveInject(i3.PrincipalWebService), i0.ɵɵdirectiveInject(i3.UserSettingsWebService), i0.ɵɵdirectiveInject(i3.AppWebService)); };
BsBasketsMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsBasketsMenuComponent, selectors: [["sq-baskets-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsBasketsMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsBasketsMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [i4.NgIf, i5.BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsBasketsMenuComponent, [{
        type: Component,
        args: [{
                selector: "sq-baskets-menu",
                templateUrl: "./baskets-menu.component.html",
            }]
    }], function () { return [{ type: i1.LoginService }, { type: i2.BasketsService }, { type: i3.PrincipalWebService }, { type: i3.UserSettingsWebService }, { type: i3.AppWebService }]; }, { searchRoute: [{
            type: Input
        }], icon: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFza2V0cy1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2Jhc2tldHMvIiwic291cmNlcyI6WyJib290c3RyYXAvYmFza2V0cy1tZW51L2Jhc2tldHMtbWVudS5jb21wb25lbnQudHMiLCJib290c3RyYXAvYmFza2V0cy1tZW51L2Jhc2tldHMtbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7OztJQ0RwRCx3QkFHTTs7O0lBRkYscUlBQTZILGlEQUFBOztBRFdqSSxNQUFNLE9BQU8sc0JBQXNCO0lBbUJqQyxZQUNTLFlBQTBCLEVBQzFCLGNBQThCLEVBQzlCLGdCQUFvQyxFQUNwQyxtQkFBMEMsRUFDMUMsVUFBeUI7UUFKekIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0I7UUFDcEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1QjtRQUMxQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBdkJ6QixnQkFBVyxHQUFXLFNBQVMsQ0FBQztRQUNoQyxTQUFJLEdBQVcsd0JBQXdCLENBQUM7UUFDeEMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQix5QkFBb0IsR0FBVyxJQUFJLENBQUM7UUFDcEMsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBRzNDLGtCQUFhLEdBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFTOUMsd0JBQW1CLEdBQWEsRUFBRSxDQUFDO1FBU2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDN0IsSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxLQUFL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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XHJcbmltcG9ydCB7IExvZ2luU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2xvZ2luXCI7XHJcbmltcG9ydCB7IEJhc2tldHNTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2Jhc2tldHMuc2VydmljZVwiO1xyXG5pbXBvcnQge1ByaW5jaXBhbFdlYlNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQge1VzZXJTZXR0aW5nc1dlYlNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xyXG5pbXBvcnQge0FwcFdlYlNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwic3EtYmFza2V0cy1tZW51XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9iYXNrZXRzLW1lbnUuY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzQmFza2V0c01lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHNlYXJjaFJvdXRlOiBzdHJpbmcgPSBcIi9zZWFyY2hcIjtcclxuICBASW5wdXQoKSBpY29uOiBzdHJpbmcgPSBcImZhcyBmYS1zaG9wcGluZy1iYXNrZXRcIjtcclxuICBASW5wdXQoKSBhdXRvQWRqdXN0OiBib29sZWFuID0gdHJ1ZTtcclxuICBASW5wdXQoKSBhdXRvQWRqdXN0QnJlYWtwb2ludDogc3RyaW5nID0gXCJ4bFwiO1xyXG4gIEBJbnB1dCgpIGNvbGxhcHNlQnJlYWtwb2ludDogc3RyaW5nID0gXCJzbVwiO1xyXG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcclxuXHJcbiAgYmFza2V0T3B0aW9uczogc3RyaW5nW10gPSBbXCJTZWxlY3RcIiwgXCJTaGFyZVwiXTtcclxuXHJcbiAgbWVudTogQWN0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvLyBCYXNrZXQgYWN0aW9uc1xyXG4gIGNyZWF0ZUFjdGlvbjogQWN0aW9uO1xyXG4gIG1hbmFnZUFjdGlvbjogQWN0aW9uO1xyXG4gIHNlbGVjdEFjdGlvbjogQWN0aW9uO1xyXG4gIHNoYXJlQWN0aW9uOiBBY3Rpb247XHJcbiAgYmFza2V0Q3VzdG9tT3B0aW9uczogQWN0aW9uW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UsXHJcbiAgICBwdWJsaWMgYmFza2V0c1NlcnZpY2U6IEJhc2tldHNTZXJ2aWNlLFxyXG4gICAgcHVibGljIHByaW5jaXBhbFNlcnZpY2U6UHJpbmNpcGFsV2ViU2VydmljZSxcclxuICAgIHB1YmxpYyB1c2VyU2V0dGluZ3NTZXJ2aWNlOlVzZXJTZXR0aW5nc1dlYlNlcnZpY2UsXHJcbiAgICBwdWJsaWMgYXBwU2VydmljZTogQXBwV2ViU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jcmVhdGVBY3Rpb24gPSBuZXcgQWN0aW9uKHtcclxuICAgICAgdGV4dDogXCJtc2cjYmFza2V0cy5jcmVhdGVCYXNrZXRcIixcclxuICAgICAgdGl0bGU6IFwibXNnI2Jhc2tldHMuY3JlYXRlQmFza2V0XCIsXHJcbiAgICAgIGFjdGlvbjogKF8pID0+IHtcclxuICAgICAgICB0aGlzLmJhc2tldHNTZXJ2aWNlLmNyZWF0ZUJhc2tldE1vZGFsKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1hbmFnZUFjdGlvbiA9IG5ldyBBY3Rpb24oe1xyXG4gICAgICB0ZXh0OiBcIm1zZyNiYXNrZXRzLm1hbmFnZUJhc2tldHNcIixcclxuICAgICAgdGl0bGU6IFwibXNnI2Jhc2tldHMubWFuYWdlQmFza2V0c1wiLFxyXG4gICAgICBhY3Rpb246IChfKSA9PiB7XHJcbiAgICAgICAgdGhpcy5iYXNrZXRzU2VydmljZS5tYW5hZ2VCYXNrZXRzTW9kYWwoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZU1lbnUoKTtcclxuICAgIHRoaXMuYmFza2V0c1NlcnZpY2UuY2hhbmdlcy5zdWJzY3JpYmUoe1xyXG4gICAgICBuZXh0OiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZW51KCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMubG9naW5TZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50eXBlID09PSBcInNlc3Npb24tY2hhbmdlZFwiKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNZW51KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTWVudSgpIHtcclxuICAgIGlmICghdGhpcy5sb2dpblNlcnZpY2UuY29tcGxldGUpIHtcclxuICAgICAgdGhpcy5tZW51ID0gdW5kZWZpbmVkO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy9TZWxlY3QgYW5kIFNoYXJlIG9wdGlvbnMvL1xyXG5cclxuICAgIGNvbnN0IGJhc2tldHNBY3Rpb25zOiBBY3Rpb25bXSA9IFtdO1xyXG4gICAgaWYgKHRoaXMuYmFza2V0c1NlcnZpY2UuaGFzQmFza2V0KSB7XHJcbiAgICAgIHRoaXMuYmFza2V0c1NlcnZpY2UuYmFza2V0cy5tYXAoKGJhc2tldCkgPT5cclxuICAgICAgICBiYXNrZXRzQWN0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgbmV3IEFjdGlvbih7XHJcbiAgICAgICAgICAgIHRleHQ6IGJhc2tldC5uYW1lLFxyXG4gICAgICAgICAgICB0aXRsZTogYmFza2V0Lm5hbWUsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgbmV3IEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNlbGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiU2VsZWN0XCIsXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246ICgpID0+XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuYmFza2V0c1NlcnZpY2Uuc2VhcmNoQmFza2V0KGJhc2tldCwgdGhpcy5zZWFyY2hSb3V0ZSksXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgbmV3IEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlNoYXJlXCIsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJTaGFyZVwiLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOigpPT50aGlzLnNlbmRFbWFpbChiYXNrZXQsdGhpcy5zZWFyY2hSb3V0ZSksXHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGJhc2tldHNBY3Rpb25zLnB1c2gobmV3IEFjdGlvbih7IHNlcGFyYXRvcjogdHJ1ZSB9KSk7XHJcbiAgICBiYXNrZXRzQWN0aW9ucy5wdXNoKHRoaXMuY3JlYXRlQWN0aW9uKTtcclxuXHJcbiAgICBpZiAodGhpcy5iYXNrZXRzU2VydmljZS5oYXNCYXNrZXQpIHtcclxuICAgICAgYmFza2V0c0FjdGlvbnMucHVzaCh0aGlzLm1hbmFnZUFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tZW51ID0gbmV3IEFjdGlvbih7XHJcbiAgICAgIGljb246IHRoaXMuaWNvbixcclxuICAgICAgdGV4dDogXCJtc2cjYmFza2V0cy5iYXNrZXRzXCIsXHJcbiAgICAgIHRpdGxlOiBcIm1zZyNiYXNrZXRzLmJhc2tldHNcIixcclxuICAgICAgY2hpbGRyZW46IGJhc2tldHNBY3Rpb25zLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZW5kRW1haWwoYmFza2V0LGN1cnIpXHJcbntcclxuICAgICAgICAgICAgbGV0IG1haWxUb1VybCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gdGhpcy5wcmluY2lwYWxTZXJ2aWNlPy5wcmluY2lwYWw/Lm5hbWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYmFza2V0TmFtZSA9IGJhc2tldC5uYW1lXHJcblx0XHRcdFx0ICAgIHZhciBxdWVyeT1cIiMvc2VhcmNoP3F1ZXJ5PSU3QiUyMm5hbWUlMjI6JTIyXCIrdGhpcy5hcHBTZXJ2aWNlLmFwcE5hbWUrXCIlMjIsJTIyYmFza2V0JTIyOiUyMlwiK2Jhc2tldE5hbWUrXCIlMjIsJTIydXNlciUyMjolMjJcIituYW1lK1wiJTIyLCUyMnRhYiUyMjolMjJBTEwlMjIlN0Qmdmlldz1saXN0XCIrXCImdXNlcj1cIituYW1lK1wiJnNoYXJlZEJhc2tldD1cIitiYXNrZXROYW1lO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBib2R5ID0gXCJodHRwczovL1wiK3dpbmRvdy5sb2NhdGlvbi5ob3N0K3dpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYm9keSk7XHJcbiAgICAgICAgICAgICAgICAvLz9xdWVyeT17JTIybmFtZSUyMjolMjJHbG9iYWxTZWFyY2hfVjMuMiUyMiwlMjJiYXNrZXQlMjI6JTIyRmF2b3JpdGVzJTIyLCUyMnRhYiUyMjolMjJBTEwlMjJ9JnZpZXc9bGlzdCZ1c2VyPTIwMDAzNTExNCZzaGFyZWRCYXNrZXQ9RmF2b3JpdGVzXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbWFpbFRvVXJsID0gXCJtYWlsdG86P3N1YmplY3Q9UHVibWVkIFNlYXJjaCBCYXNrZXQmYm9keT1cIitib2R5O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYWlsVG9VcmwpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1tYWlsVG9Vcmw7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCI8bGkgKm5nSWY9XCIhIW1lbnUgJiYgIW1lbnUuaGlkZGVuXCIgY2xhc3M9XCJuYXYtaXRlbSBkcm9wZG93blwiIFxyXG4gICAgW3NxLWFjdGlvbi1pdGVtXT1cIntpdGVtOiBtZW51LCBzaXplOiBzaXplLCBhdXRvQWRqdXN0OiBhdXRvQWRqdXN0LCBhdXRvQWRqdXN0QnJlYWtwb2ludDogYXV0b0FkanVzdEJyZWFrcG9pbnQsIGluTWVudTogdHJ1ZX1cIlxyXG4gICAgW2NvbGxhcHNlQnJlYWtwb2ludF09XCJjb2xsYXBzZUJyZWFrcG9pbnRcIlxyXG4+PC9saT5cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==