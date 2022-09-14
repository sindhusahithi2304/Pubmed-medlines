import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/login";
import * as i2 from "../../saved-queries.service";
import * as i3 from "@sinequa/components/search";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/components/action";
const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsSavedQueriesMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
export class BsSavedQueriesMenuComponent {
    constructor(loginService, savedQueriesService, searchService) {
        this.loginService = loginService;
        this.savedQueriesService = savedQueriesService;
        this.searchService = searchService;
        this.searchRoute = "/search";
        this.icon = "far fa-save";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        this.saveAction = new Action({
            text: "msg#savedQueries.saveCurrentQuery",
            title: "msg#savedQueries.saveCurrentQuery",
            action: () => { this.savedQueriesService.createSavedQueryModal(); }
        });
        this.manageAction = new Action({
            text: "msg#savedQueries.manageSavedQueries",
            title: "msg#savedQueries.manageSavedQueries",
            action: () => { this.savedQueriesService.manageSavedQueriesModal(); }
        });
    }
    ngOnInit() {
        this.updateMenu();
        this._savedQueriesSubscription = this.savedQueriesService.changes.subscribe({
            next: () => { this.updateMenu(); }
        });
        this._loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
        this._searchSubscription = this.searchService.resultsStream.subscribe(results => {
            this.updateMenu();
        });
    }
    ngOnDestroy() {
        if (this._savedQueriesSubscription) {
            this._savedQueriesSubscription.unsubscribe();
        }
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
        }
        if (this._searchSubscription) {
            this._searchSubscription.unsubscribe();
        }
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        const savedQueriesActions = [];
        if (this.savedQueriesService.hasSavedQuery) {
            const scrollGroup = new Action({
                scrollGroup: true,
                children: this.savedQueriesService.savedqueries.map(savedQuery => new Action({
                    text: savedQuery.name,
                    title: savedQuery.name,
                    data: savedQuery,
                    action: item => this.savedQueriesService.searchSavedQuery(item.data, this.searchRoute)
                }))
            });
            savedQueriesActions.push(scrollGroup);
        }
        if (!!this.searchService.results) {
            savedQueriesActions.push(this.saveAction);
        }
        if (this.savedQueriesService.hasSavedQuery) {
            savedQueriesActions.push(this.manageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#savedQueries.savedQueries",
            children: savedQueriesActions
        });
    }
}
BsSavedQueriesMenuComponent.ɵfac = function BsSavedQueriesMenuComponent_Factory(t) { return new (t || BsSavedQueriesMenuComponent)(i0.ɵɵdirectiveInject(i1.LoginService), i0.ɵɵdirectiveInject(i2.SavedQueriesService), i0.ɵɵdirectiveInject(i3.SearchService)); };
BsSavedQueriesMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsSavedQueriesMenuComponent, selectors: [["sq-saved-queries-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsSavedQueriesMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsSavedQueriesMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [i4.NgIf, i5.BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSavedQueriesMenuComponent, [{
        type: Component,
        args: [{
                selector: 'sq-saved-queries-menu',
                templateUrl: './saved-queries-menu.component.html'
            }]
    }], function () { return [{ type: i1.LoginService }, { type: i2.SavedQueriesService }, { type: i3.SearchService }]; }, { searchRoute: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtcXVlcmllcy1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NhdmVkLXF1ZXJpZXMvIiwic291cmNlcyI6WyJib290c3RyYXAvc2F2ZWQtcXVlcmllcy1tZW51L3NhdmVkLXF1ZXJpZXMtbWVudS5jb21wb25lbnQudHMiLCJib290c3RyYXAvc2F2ZWQtcXVlcmllcy1tZW51L3NhdmVkLXF1ZXJpZXMtbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7OztJQ0RwRCx3QkFHTTs7O0lBRkYscUlBQTZILGlEQUFBOztBRFVqSSxNQUFNLE9BQU8sMkJBQTJCO0lBY3RDLFlBQ1MsWUFBMEIsRUFDMUIsbUJBQXdDLEVBQ3hDLGFBQTRCO1FBRjVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFoQjVCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBQ2hDLFNBQUksR0FBVyxhQUFhLENBQUM7UUFDN0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQix5QkFBb0IsR0FBVyxJQUFJLENBQUM7UUFDcEMsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBY3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDM0IsSUFBSSxFQUFFLG1DQUFtQztZQUN6QyxLQUFLLEVBQUUsbUNBQW1DO1lBQzFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlB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QUcsSUFBSSxNQUFNLENBQUM7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLCtCQUErQjtZQUNyQyxRQUFRLEVBQUUsbUJBQW1CO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUM7O3NHQWxHVSwyQkFBMkI7Z0VBQTNCLDJCQUEyQjtRQ1h4QywwRUFHTTs7UUFIRCxxREFBNEI7O2tERFdwQiwyQkFBMkI7Y0FKdkMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFdBQVcsRUFBRSxxQ0FBcUM7YUFDbkQ7NkhBRVUsV0FBVztrQkFBbkIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxvQkFBb0I7a0JBQTVCLEtBQUs7WUFDRyxrQkFBa0I7a0JBQTFCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb24nO1xuaW1wb3J0IHsgTG9naW5TZXJ2aWNlIH0gZnJvbSAnQHNpbmVxdWEvY29yZS9sb2dpbic7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IHsgU2F2ZWRRdWVyaWVzU2VydmljZSB9IGZyb20gJy4uLy4uL3NhdmVkLXF1ZXJpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3Etc2F2ZWQtcXVlcmllcy1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NhdmVkLXF1ZXJpZXMtbWVudS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQnNTYXZlZFF1ZXJpZXNNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBzZWFyY2hSb3V0ZTogc3RyaW5nID0gXCIvc2VhcmNoXCI7XG4gIEBJbnB1dCgpIGljb246IHN0cmluZyA9IFwiZmFyIGZhLXNhdmVcIjtcbiAgQElucHV0KCkgYXV0b0FkanVzdDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGF1dG9BZGp1c3RCcmVha3BvaW50OiBzdHJpbmcgPSAneGwnO1xuICBASW5wdXQoKSBjb2xsYXBzZUJyZWFrcG9pbnQ6IHN0cmluZyA9ICdzbSc7XG4gIEBJbnB1dCgpIHNpemU6IHN0cmluZztcblxuICBtZW51OiBBY3Rpb24gfCB1bmRlZmluZWQ7XG5cbiAgLy8gU2F2ZWQgcXVlcmllcyBhY3Rpb25zXG4gIG1hbmFnZUFjdGlvbjogQWN0aW9uO1xuICBzYXZlQWN0aW9uOiBBY3Rpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGxvZ2luU2VydmljZTogTG9naW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBzYXZlZFF1ZXJpZXNTZXJ2aWNlOiBTYXZlZFF1ZXJpZXNTZXJ2aWNlLFxuICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7XG5cbiAgICB0aGlzLnNhdmVBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgIHRleHQ6IFwibXNnI3NhdmVkUXVlcmllcy5zYXZlQ3VycmVudFF1ZXJ5XCIsXG4gICAgICB0aXRsZTogXCJtc2cjc2F2ZWRRdWVyaWVzLnNhdmVDdXJyZW50UXVlcnlcIixcbiAgICAgIGFjdGlvbjogKCkgPT4geyB0aGlzLnNhdmVkUXVlcmllc1NlcnZpY2UuY3JlYXRlU2F2ZWRRdWVyeU1vZGFsKCk7IH1cbiAgICB9KTtcblxuICAgIHRoaXMubWFuYWdlQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICB0ZXh0OiBcIm1zZyNzYXZlZFF1ZXJpZXMubWFuYWdlU2F2ZWRRdWVyaWVzXCIsXG4gICAgICB0aXRsZTogXCJtc2cjc2F2ZWRRdWVyaWVzLm1hbmFnZVNhdmVkUXVlcmllc1wiLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7IHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5tYW5hZ2VTYXZlZFF1ZXJpZXNNb2RhbCgpOyB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlTWVudSgpO1xuICAgIHRoaXMuX3NhdmVkUXVlcmllc1N1YnNjcmlwdGlvbiA9IHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5jaGFuZ2VzLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiB7IHRoaXMudXBkYXRlTWVudSgpOyB9XG4gICAgfSk7XG4gICAgdGhpcy5fbG9naW5TdWJzY3JpcHRpb24gPSB0aGlzLmxvZ2luU2VydmljZS5ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIGlmKGV2ZW50LnR5cGUgPT09IFwic2Vzc2lvbi1jaGFuZ2VkXCIpe1xuICAgICAgICB0aGlzLnVwZGF0ZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9zZWFyY2hTdWJzY3JpcHRpb24gPSB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0c1N0cmVhbS5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZU1lbnUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NhdmVkUXVlcmllc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9sb2dpblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9zZWFyY2hTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgbmdPbkRlc3Ryb3koKXtcbiAgICBpZih0aGlzLl9zYXZlZFF1ZXJpZXNTdWJzY3JpcHRpb24pe1xuICAgICAgdGhpcy5fc2F2ZWRRdWVyaWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuX2xvZ2luU3Vic2NyaXB0aW9uKXtcbiAgICAgIHRoaXMuX2xvZ2luU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuX3NlYXJjaFN1YnNjcmlwdGlvbil7XG4gICAgICB0aGlzLl9zZWFyY2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVNZW51KCkge1xuXG4gICAgaWYgKCF0aGlzLmxvZ2luU2VydmljZS5jb21wbGV0ZSkge1xuICAgICAgdGhpcy5tZW51ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNhdmVkUXVlcmllc0FjdGlvbnM6IEFjdGlvbltdID0gW107XG5cbiAgICBpZiAodGhpcy5zYXZlZFF1ZXJpZXNTZXJ2aWNlLmhhc1NhdmVkUXVlcnkpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsR3JvdXAgPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIHNjcm9sbEdyb3VwOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRyZW46IHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5zYXZlZHF1ZXJpZXMubWFwKHNhdmVkUXVlcnkgPT4gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgIHRleHQ6IHNhdmVkUXVlcnkubmFtZSxcbiAgICAgICAgICAgICAgdGl0bGU6IHNhdmVkUXVlcnkubmFtZSxcbiAgICAgICAgICAgICAgZGF0YTogc2F2ZWRRdWVyeSxcbiAgICAgICAgICAgICAgYWN0aW9uOiBpdGVtID0+IHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5zZWFyY2hTYXZlZFF1ZXJ5KGl0ZW0uZGF0YSwgdGhpcy5zZWFyY2hSb3V0ZSlcbiAgICAgICAgICB9KSlcbiAgICAgICAgfSk7XG4gICAgICAgIHNhdmVkUXVlcmllc0FjdGlvbnMucHVzaChzY3JvbGxHcm91cCk7XG4gICAgfVxuXG4gICAgaWYgKCEhdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMpIHtcbiAgICAgIHNhdmVkUXVlcmllc0FjdGlvbnMucHVzaCh0aGlzLnNhdmVBY3Rpb24pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNhdmVkUXVlcmllc1NlcnZpY2UuaGFzU2F2ZWRRdWVyeSkge1xuICAgICAgc2F2ZWRRdWVyaWVzQWN0aW9ucy5wdXNoKHRoaXMubWFuYWdlQWN0aW9uKTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnUgPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgaWNvbjogdGhpcy5pY29uLFxuICAgICAgICB0ZXh0OiBcIm1zZyNzYXZlZFF1ZXJpZXMuc2F2ZWRRdWVyaWVzXCIsXG4gICAgICAgIGNoaWxkcmVuOiBzYXZlZFF1ZXJpZXNBY3Rpb25zXG4gICAgfSk7XG4gIH1cbn1cbiIsIjxsaSAqbmdJZj1cIiEhbWVudSAmJiAhbWVudS5oaWRkZW5cIiBjbGFzcz1cIm5hdi1pdGVtIGRyb3Bkb3duXCIgXG4gICAgW3NxLWFjdGlvbi1pdGVtXT1cIntpdGVtOiBtZW51LCBzaXplOiBzaXplLCBhdXRvQWRqdXN0OiBhdXRvQWRqdXN0LCBhdXRvQWRqdXN0QnJlYWtwb2ludDogYXV0b0FkanVzdEJyZWFrcG9pbnQsIGluTWVudTogdHJ1ZX1cIlxuICAgIFtjb2xsYXBzZUJyZWFrcG9pbnRdPVwiY29sbGFwc2VCcmVha3BvaW50XCJcbj48L2xpPiJdfQ==