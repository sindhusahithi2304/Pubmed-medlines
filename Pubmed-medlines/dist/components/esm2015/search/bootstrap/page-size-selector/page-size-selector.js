import { Component, Input } from '@angular/core';
import { Action } from "@sinequa/components/action";
import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "../../search.service";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
function BsPageSizeSelector_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "div", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx_r0.pageSizingAction), ctx_r0.rightAligned));
} }
//import {ResultsView} from '@sinequa/components/results-view';
// TODO restore functionality of storing page size in user settings ?
/**
 * Component for choosing the page size of the results view
 *
 */
export class BsPageSizeSelector {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
        //@Input() resultsView: ResultsView;
        this.showInRegularView = true;
    }
    ngOnChanges(changes) {
        this.refreshVisualisation();
    }
    /*
    private get globalPageSize(): number {
        const globalQueryParams = this.userSettingsService.getUserSettings().queryParams;
        return globalQueryParams ? globalQueryParams.pageSize : undefined;
    }
    */
    get configPageSize() {
        return this.appService.ccquery ? this.appService.ccquery.pageSize : 0;
    }
    get defaultPageSize() {
        //let res = this.globalPageSize;
        //if (!res) {
        let res = this.configPageSize;
        if (!res) {
            res = SearchService.DefaultPageSize;
        }
        //}
        return res;
    }
    buildPageSizingAction() {
        this.availableSizes = this.pageSizes ? this.pageSizes.slice(0) : [];
        this.availableSizes.sort((a, b) => a - b);
        const children = [];
        children.push(new Action({
            text: 'msg#pageSizeSelector.defaultPageSize',
            messageParams: { values: { size: this.defaultPageSize } },
            data: undefined,
            action: (item, event) => {
                this.updatePageSize(item.data);
            }
        }));
        for (const size of this.availableSizes) {
            children.push(new Action({
                text: size.toString(),
                data: size,
                action: (item, event) => {
                    this.updatePageSize(item.data);
                }
            }));
        }
        return new Action({
            icon: 'fas fa-arrows-alt-v',
            text: 'msg#pageSizeSelector.pageSizeChoice',
            children: children
        });
    }
    refreshVisualisation() {
        this.pageSizingAction = this.buildPageSizingAction();
        if (this.results) {
            //const queryParams = this.userSettingsService.getViewQueryParams(this.resultsView.name);
            //this.currentPageSize = queryParams.pageSize;
            this.setCurrentSize(this.currentPageSize);
        }
    }
    setCurrentSize(size) {
        var _a;
        if (!size) {
            this.pageSizingAction.text = 'msg#pageSizeSelector.defaultPageSizeChoice';
            this.pageSizingAction.messageParams = { values: { size: this.defaultPageSize } };
        }
        else {
            const selectedAction = (_a = this.pageSizingAction.children) === null || _a === void 0 ? void 0 : _a.find(action => action.data === size);
            this.pageSizingAction.text = 'msg#pageSizeSelector.pageSizeChoice';
            this.pageSizingAction.messageParams = { values: { size: selectedAction === null || selectedAction === void 0 ? void 0 : selectedAction.data } };
        }
    }
    updatePageSize(size) {
        if (this.currentPageSize !== size) {
            //this.userSettingsService.saveResultsViewPageSize(this.resultsView.name, size);
            this.currentPageSize = size;
            this.searchService.query.pageSize = size;
            this.searchService.search();
        }
        this.setCurrentSize(size);
    }
}
BsPageSizeSelector.ɵfac = function BsPageSizeSelector_Factory(t) { return new (t || BsPageSizeSelector)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SearchService)); };
BsPageSizeSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsPageSizeSelector, selectors: [["sq-page-size-selector"]], inputs: { results: "results", showInRegularView: "showInRegularView", showInCustomization: "showInCustomization", pageSizes: "pageSizes", rightAligned: "rightAligned" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "btn-toolbar", 4, "ngIf"], [1, "btn-toolbar"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsPageSizeSelector_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPageSizeSelector_div_0_Template, 2, 6, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.results);
    } }, directives: [i3.NgIf, i4.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPageSizeSelector, [{
        type: Component,
        args: [{
                selector: 'sq-page-size-selector',
                templateUrl: './page-size-selector.html'
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }]; }, { results: [{
            type: Input
        }], showInRegularView: [{
            type: Input
        }], showInCustomization: [{
            type: Input
        }], pageSizes: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zaXplLXNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2VhcmNoLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3BhZ2Utc2l6ZS1zZWxlY3Rvci9wYWdlLXNpemUtc2VsZWN0b3IudHMiLCJib290c3RyYXAvcGFnZS1zaXplLXNlbGVjdG9yL3BhZ2Utc2l6ZS1zZWxlY3Rvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQTRCLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7Ozs7Ozs7SUNKbkQsOEJBQ0k7SUFBQSx5QkFLYTtJQUNqQixpQkFBTTs7O0lBTEUsZUFJRTtJQUpGLHdJQUlFOztBRERWLCtEQUErRDtBQUUvRCxxRUFBcUU7QUFFckU7OztHQUdHO0FBS0gsTUFBTSxPQUFPLGtCQUFrQjtJQWEzQixZQUNZLFVBQXNCLEVBQ3RCLGFBQTRCO1FBRDVCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFieEMsb0NBQW9DO1FBQzNCLHNCQUFpQixHQUFZLElBQUksQ0FBQztJQWF2QyxDQUFDO0lBRUwsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7TUFLRTtJQUVGLElBQVksY0FBYztRQUN0QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsSUFBWSxlQUFlO1FBQ3ZCLGdDQUFnQztRQUNoQyxhQUFhO1FBQ2Is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O1FBQy9CLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDL0IsZ0ZBQWdGO1lBQ2hGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBRTVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7b0ZBM0dRLGtCQUFrQjt1REFBbEIsa0JBQWtCO1FDakIvQixtRUFPTTs7UUFQb0Isb0NBQWU7O2tERGlCNUIsa0JBQWtCO2NBSjlCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxXQUFXLEVBQUUsMkJBQTJCO2FBQzNDO3lGQUVZLE9BQU87a0JBQWYsS0FBSztZQUVHLGlCQUFpQjtrQkFBekIsS0FBSztZQUNHLG1CQUFtQjtrQkFBM0IsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZXN1bHRzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7QXBwU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge0FjdGlvbn0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZWFyY2guc2VydmljZVwiO1xuLy9pbXBvcnQge1Jlc3VsdHNWaWV3fSBmcm9tICdAc2luZXF1YS9jb21wb25lbnRzL3Jlc3VsdHMtdmlldyc7XG5cbi8vIFRPRE8gcmVzdG9yZSBmdW5jdGlvbmFsaXR5IG9mIHN0b3JpbmcgcGFnZSBzaXplIGluIHVzZXIgc2V0dGluZ3MgP1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgY2hvb3NpbmcgdGhlIHBhZ2Ugc2l6ZSBvZiB0aGUgcmVzdWx0cyB2aWV3XG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NxLXBhZ2Utc2l6ZS1zZWxlY3RvcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhZ2Utc2l6ZS1zZWxlY3Rvci5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBCc1BhZ2VTaXplU2VsZWN0b3IgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG4gICAgLy9ASW5wdXQoKSByZXN1bHRzVmlldzogUmVzdWx0c1ZpZXc7XG4gICAgQElucHV0KCkgc2hvd0luUmVndWxhclZpZXc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dJbkN1c3RvbWl6YXRpb246IGJvb2xlYW47XG4gICAgQElucHV0KCkgcGFnZVNpemVzOiBudW1iZXJbXTtcbiAgICBASW5wdXQoKSByaWdodEFsaWduZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgcGFnZVNpemluZ0FjdGlvbjogQWN0aW9uO1xuXG4gICAgcHJpdmF0ZSBhdmFpbGFibGVTaXplczogbnVtYmVyW107XG4gICAgcHJpdmF0ZSBjdXJyZW50UGFnZVNpemU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVmcmVzaFZpc3VhbGlzYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIHByaXZhdGUgZ2V0IGdsb2JhbFBhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGdsb2JhbFF1ZXJ5UGFyYW1zID0gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLmdldFVzZXJTZXR0aW5ncygpLnF1ZXJ5UGFyYW1zO1xuICAgICAgICByZXR1cm4gZ2xvYmFsUXVlcnlQYXJhbXMgPyBnbG9iYWxRdWVyeVBhcmFtcy5wYWdlU2l6ZSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgKi9cblxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZ1BhZ2VTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeSA/IHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5LnBhZ2VTaXplIDogMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBkZWZhdWx0UGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICAgICAgLy9sZXQgcmVzID0gdGhpcy5nbG9iYWxQYWdlU2l6ZTtcbiAgICAgICAgLy9pZiAoIXJlcykge1xuICAgICAgICBsZXQgcmVzID0gdGhpcy5jb25maWdQYWdlU2l6ZTtcbiAgICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgIHJlcyA9IFNlYXJjaFNlcnZpY2UuRGVmYXVsdFBhZ2VTaXplO1xuICAgICAgICB9XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZFBhZ2VTaXppbmdBY3Rpb24oKTogQWN0aW9uIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVTaXplcyA9IHRoaXMucGFnZVNpemVzID8gdGhpcy5wYWdlU2l6ZXMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgdGhpcy5hdmFpbGFibGVTaXplcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuOiBBY3Rpb25bXSA9IFtdO1xuXG4gICAgICAgIGNoaWxkcmVuLnB1c2gobmV3IEFjdGlvbih7XG4gICAgICAgICAgICB0ZXh0OiAnbXNnI3BhZ2VTaXplU2VsZWN0b3IuZGVmYXVsdFBhZ2VTaXplJyxcbiAgICAgICAgICAgIG1lc3NhZ2VQYXJhbXM6IHsgdmFsdWVzOiB7IHNpemU6IHRoaXMuZGVmYXVsdFBhZ2VTaXplIH0gfSxcbiAgICAgICAgICAgIGRhdGE6IHVuZGVmaW5lZCwgLy8gVG8gbWFrZSBzdXJlIHRoYXQgc2V0Q3VycmVudFNpemUoKSBhbHdheXMgY2hvb3NlcyB0aGUgZGVmYXVsdCBjaG9pY2UgdGV4dC5cbiAgICAgICAgICAgIGFjdGlvbjogKGl0ZW06IEFjdGlvbiwgZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlU2l6ZShpdGVtLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgZm9yIChjb25zdCBzaXplIG9mIHRoaXMuYXZhaWxhYmxlU2l6ZXMpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2gobmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgICAgdGV4dDogc2l6ZS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGRhdGE6IHNpemUsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoaXRlbTogQWN0aW9uLCBldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlU2l6ZShpdGVtLmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246ICdmYXMgZmEtYXJyb3dzLWFsdC12JyxcbiAgICAgICAgICAgIHRleHQ6ICdtc2cjcGFnZVNpemVTZWxlY3Rvci5wYWdlU2l6ZUNob2ljZScsXG4gICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoVmlzdWFsaXNhdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlU2l6aW5nQWN0aW9uID0gdGhpcy5idWlsZFBhZ2VTaXppbmdBY3Rpb24oKTtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0cykge1xuICAgICAgICAgICAgLy9jb25zdCBxdWVyeVBhcmFtcyA9IHRoaXMudXNlclNldHRpbmdzU2VydmljZS5nZXRWaWV3UXVlcnlQYXJhbXModGhpcy5yZXN1bHRzVmlldy5uYW1lKTtcbiAgICAgICAgICAgIC8vdGhpcy5jdXJyZW50UGFnZVNpemUgPSBxdWVyeVBhcmFtcy5wYWdlU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFNpemUodGhpcy5jdXJyZW50UGFnZVNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDdXJyZW50U2l6ZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VTaXppbmdBY3Rpb24udGV4dCA9ICdtc2cjcGFnZVNpemVTZWxlY3Rvci5kZWZhdWx0UGFnZVNpemVDaG9pY2UnO1xuICAgICAgICAgICAgdGhpcy5wYWdlU2l6aW5nQWN0aW9uLm1lc3NhZ2VQYXJhbXMgPSB7IHZhbHVlczogeyBzaXplOiB0aGlzLmRlZmF1bHRQYWdlU2l6ZSB9IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZEFjdGlvbiA9IHRoaXMucGFnZVNpemluZ0FjdGlvbi5jaGlsZHJlbj8uZmluZChhY3Rpb24gPT4gYWN0aW9uLmRhdGEgPT09IHNpemUpO1xuICAgICAgICAgICAgdGhpcy5wYWdlU2l6aW5nQWN0aW9uLnRleHQgPSAnbXNnI3BhZ2VTaXplU2VsZWN0b3IucGFnZVNpemVDaG9pY2UnO1xuICAgICAgICAgICAgdGhpcy5wYWdlU2l6aW5nQWN0aW9uLm1lc3NhZ2VQYXJhbXMgPSB7IHZhbHVlczogeyBzaXplOiBzZWxlY3RlZEFjdGlvbj8uZGF0YSB9IH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVBhZ2VTaXplKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVNpemUgIT09IHNpemUpIHtcbiAgICAgICAgICAgIC8vdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnNhdmVSZXN1bHRzVmlld1BhZ2VTaXplKHRoaXMucmVzdWx0c1ZpZXcubmFtZSwgc2l6ZSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlU2l6ZSA9IHNpemU7XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5wYWdlU2l6ZSA9IHNpemU7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEN1cnJlbnRTaXplKHNpemUpO1xuICAgIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJidG4tdG9vbGJhclwiICpuZ0lmPVwiISFyZXN1bHRzXCI+XG4gICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiXG4gICAgICAgIFtzcS1hY3Rpb24tYnV0dG9uc109XCJ7XG4gICAgICAgICAgICBpdGVtczogW3BhZ2VTaXppbmdBY3Rpb25dLFxuICAgICAgICAgICAgYXV0b0FkanVzdDogdHJ1ZSxcbiAgICAgICAgICAgIHJpZ2h0QWxpZ25lZDogcmlnaHRBbGlnbmVkXG4gICAgICAgIH1cIj48L2Rpdj5cbjwvZGl2PlxuIl19