import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "../../results-view.service";
import * as i2 from "@sinequa/components/action";
const _c0 = function (a0, a2, a3) { return { items: a0, autoAdjust: true, rightAligned: a2, size: a3 }; };
export class BsResultsViewSelector {
    constructor(resultsViewService) {
        this.resultsViewService = resultsViewService;
        this.useDropdownMenu = true;
        this._subscription = this.resultsViewService.resultsViewSelected.subscribe((view) => {
            this.setCurrentViewAction();
        });
    }
    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
    setCurrentViewAction() {
        if (!!this.viewAction && !!this.resultsViewService.resultsView) {
            if (!Utils.isArray(this.viewAction)) {
                const view = this.resultsViewService.views.find(view => Utils.eqNC(this.resultsViewService.resultsView.name, view.name));
                if (view) {
                    this.viewAction.text = view.display || view.name;
                    this.viewAction.icon = view.icon || 'fas fa-list';
                }
                else {
                    this.viewAction.text = "msg#results.unselectableViewDisplay";
                    this.viewAction.icon = "far fa-square fa-fw";
                }
                this.viewAction.messageParams = { values: { text: this.viewAction.text } }; // for title
            }
            else {
                this.viewAction.forEach(action => {
                    action.selected = Utils.eqNC(action.data.name, this.resultsViewService.resultsView.name);
                });
            }
        }
    }
    buildViewAction() {
        if (this.resultsViewService.views.length <= 1) {
            this.viewAction = undefined;
            this.items = [];
            return;
        }
        const includedViews = this.resultsViewService.getIncludedViews(this.query.tab);
        if (includedViews.length <= 1) {
            this.viewAction = undefined;
            this.items = [];
            return;
        }
        if (this.useDropdownMenu) {
            this.viewAction = new Action({
                title: "msg#results.viewTitle",
                children: includedViews.map(view => new Action({
                    text: view.display,
                    icon: view.icon,
                    data: view,
                    action: (item, event) => {
                        this.selectView(item.data);
                    }
                }))
            });
            this.items = [this.viewAction];
        }
        else {
            this.viewAction = [];
            for (const view of includedViews) {
                this.viewAction.push(new Action({
                    icon: view.icon,
                    title: view.display,
                    data: view,
                    action: (item, event) => {
                        this.selectView(item.data);
                    }
                }));
            }
            this.items = this.viewAction;
        }
        this.setCurrentViewAction();
    }
    ngOnChanges(changes) {
        this.buildViewAction();
    }
    selectView(view) {
        this.resultsViewService.selectResultsView(view);
    }
}
BsResultsViewSelector.ɵfac = function BsResultsViewSelector_Factory(t) { return new (t || BsResultsViewSelector)(i0.ɵɵdirectiveInject(i1.ResultsViewService)); };
BsResultsViewSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultsViewSelector, selectors: [["sq-results-view-selector"]], inputs: { query: "query", results: "results", rightAligned: "rightAligned", useDropdownMenu: "useDropdownMenu", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 5, consts: [[3, "sq-action-buttons"]], template: function BsResultsViewSelector_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction3(1, _c0, ctx.items, ctx.rightAligned, ctx.size));
    } }, directives: [i2.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultsViewSelector, [{
        type: Component,
        args: [{
                selector: "sq-results-view-selector",
                templateUrl: "./results-view-selector.html"
            }]
    }], function () { return [{ type: i1.ResultsViewService }]; }, { query: [{
            type: Input
        }], results: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }], useDropdownMenu: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0cy12aWV3LXNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcmVzdWx0cy12aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3Jlc3VsdHMtdmlldy1zZWxlY3Rvci9yZXN1bHRzLXZpZXctc2VsZWN0b3IudHMiLCJib290c3RyYXAvcmVzdWx0cy12aWV3LXNlbGVjdG9yL3Jlc3VsdHMtdmlldy1zZWxlY3Rvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFJekMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDRCQUE0QixDQUFDOzs7OztBQVFsRCxNQUFNLE9BQU8scUJBQXFCO0lBVzlCLFlBQ1csa0JBQXVDO1FBQXZDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7UUFQekMsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFTckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUN0RSxDQUFDLElBQWtCLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCxXQUFXO1FBQ1AsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRU8sb0JBQW9CO1FBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVB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QUFDLElBQUk7b0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNuQixJQUFJLEVBQUUsSUFBSTtvQkFDVixNQUFNLEVBQUUsQ0FBQyxJQUFZLEVBQUUsS0FBWSxFQUFFLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixDQUFDO2lCQUNKLENBQUMsQ0FBQyxDQUFDO2FBQ1A7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWlCO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDOzswRkFsR1EscUJBQXFCOzBEQUFyQixxQkFBcUI7UUNibEMseUJBQTBHOztRQUFyRyxxR0FBOEY7O2tERGF0RixxQkFBcUI7Y0FKakMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFdBQVcsRUFBRSw4QkFBOEI7YUFDOUM7cUVBRVksS0FBSztrQkFBYixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBRUcsWUFBWTtrQkFBcEIsS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtRdWVyeX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtSZXN1bHRzVmlld1NlcnZpY2UsIFJlc3VsdHNWaWV3fSBmcm9tIFwiLi4vLi4vcmVzdWx0cy12aWV3LnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1yZXN1bHRzLXZpZXctc2VsZWN0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdHMtdmlldy1zZWxlY3Rvci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNSZXN1bHRzVmlld1NlbGVjdG9yIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHF1ZXJ5OiBRdWVyeTsgIC8vIE5lZWRlZCB0byBnZXQgdGFiLCBhbmQgcG9zc2libHkgaW5jbHVkZS9leGNsdWRlIHJlc3VsdHMgdmlld3NcbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzOyAgLy8gTmVlZGVkIHRvIGRldGVjdCBDaGFuZ2VzXG4gICAgLy8gVUkgaW5wdXRzXG4gICAgQElucHV0KCkgcmlnaHRBbGlnbmVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHVzZURyb3Bkb3duTWVudTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSB2aWV3QWN0aW9uOiBBY3Rpb24gfCBBY3Rpb25bXSB8IHVuZGVmaW5lZDtcbiAgICBpdGVtczogQWN0aW9uW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlc3VsdHNWaWV3U2VydmljZSA6IFJlc3VsdHNWaWV3U2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnJlc3VsdHNWaWV3U2VydmljZS5yZXN1bHRzVmlld1NlbGVjdGVkLnN1YnNjcmliZShcbiAgICAgICAgICAgICh2aWV3IDogUmVzdWx0c1ZpZXcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRWaWV3QWN0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIG5nT25EZXN0cm95KCl7XG4gICAgICAgIGlmKHRoaXMuX3N1YnNjcmlwdGlvbil7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Q3VycmVudFZpZXdBY3Rpb24oKSB7XG4gICAgICAgIGlmICghIXRoaXMudmlld0FjdGlvbiAmJiAhIXRoaXMucmVzdWx0c1ZpZXdTZXJ2aWNlLnJlc3VsdHNWaWV3KSB7XG4gICAgICAgICAgICBpZiAoIVV0aWxzLmlzQXJyYXkodGhpcy52aWV3QWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLnJlc3VsdHNWaWV3U2VydmljZS52aWV3cy5maW5kKHZpZXcgPT4gVXRpbHMuZXFOQyh0aGlzLnJlc3VsdHNWaWV3U2VydmljZS5yZXN1bHRzVmlldy5uYW1lLCB2aWV3Lm5hbWUpKTtcbiAgICAgICAgICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdBY3Rpb24udGV4dCA9IHZpZXcuZGlzcGxheSB8fCB2aWV3Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0FjdGlvbi5pY29uID0gdmlldy5pY29uIHx8ICdmYXMgZmEtbGlzdCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdBY3Rpb24udGV4dCA9IFwibXNnI3Jlc3VsdHMudW5zZWxlY3RhYmxlVmlld0Rpc3BsYXlcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3QWN0aW9uLmljb24gPSBcImZhciBmYS1zcXVhcmUgZmEtZndcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3QWN0aW9uLm1lc3NhZ2VQYXJhbXMgPSB7dmFsdWVzOiB7dGV4dDogdGhpcy52aWV3QWN0aW9uLnRleHR9fTsgLy8gZm9yIHRpdGxlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdBY3Rpb24uZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb24uc2VsZWN0ZWQgPSBVdGlscy5lcU5DKGFjdGlvbi5kYXRhLm5hbWUsIHRoaXMucmVzdWx0c1ZpZXdTZXJ2aWNlLnJlc3VsdHNWaWV3Lm5hbWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFZpZXdBY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdHNWaWV3U2VydmljZS52aWV3cy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgdGhpcy52aWV3QWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluY2x1ZGVkVmlld3MgPSB0aGlzLnJlc3VsdHNWaWV3U2VydmljZS5nZXRJbmNsdWRlZFZpZXdzKHRoaXMucXVlcnkudGFiKTtcbiAgICAgICAgaWYgKGluY2x1ZGVkVmlld3MubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0FjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy51c2VEcm9wZG93bk1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0FjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNyZXN1bHRzLnZpZXdUaXRsZVwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBpbmNsdWRlZFZpZXdzLm1hcCh2aWV3ID0+IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiB2aWV3LmRpc3BsYXksXG4gICAgICAgICAgICAgICAgICAgIGljb246IHZpZXcuaWNvbixcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiAoaXRlbTogQWN0aW9uLCBldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VmlldyhpdGVtLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbdGhpcy52aWV3QWN0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmlld0FjdGlvbiA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB2aWV3IG9mIGluY2x1ZGVkVmlld3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdBY3Rpb24ucHVzaChuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogdmlldy5pY29uLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogdmlldy5kaXNwbGF5LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IChpdGVtOiBBY3Rpb24sIGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RWaWV3KGl0ZW0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy52aWV3QWN0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0Q3VycmVudFZpZXdBY3Rpb24oKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuYnVpbGRWaWV3QWN0aW9uKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0Vmlldyh2aWV3OiBSZXN1bHRzVmlldykge1xuICAgICAgICB0aGlzLnJlc3VsdHNWaWV3U2VydmljZS5zZWxlY3RSZXN1bHRzVmlldyh2aWV3KTtcbiAgICB9XG59IiwiPGRpdiBbc3EtYWN0aW9uLWJ1dHRvbnNdPVwie2l0ZW1zOiBpdGVtcywgYXV0b0FkanVzdDogdHJ1ZSwgcmlnaHRBbGlnbmVkOiByaWdodEFsaWduZWQsIHNpemU6IHNpemV9XCI+PC9kaXY+Il19