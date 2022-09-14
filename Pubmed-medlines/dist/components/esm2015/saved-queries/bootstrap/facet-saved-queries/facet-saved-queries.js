import { Component, Input } from '@angular/core';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "../../saved-queries.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@sinequa/core/intl";
function BsFacetSavedQueries_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("\"", query_r2.query.text, "\"");
} }
function BsFacetSavedQueries_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 8);
    i0.ɵɵlistener("click", function BsFacetSavedQueries_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r8); const query_r2 = i0.ɵɵnextContext().$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.deleteQuery(query_r2, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#savedQueries.delete"));
} }
const _c0 = function (a0) { return [a0]; };
function BsFacetSavedQueries_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵlistener("click", function BsFacetSavedQueries_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r10); const query_r2 = ctx.$implicit; const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.openSavedQuery(query_r2); });
    i0.ɵɵelementStart(1, "span", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsFacetSavedQueries_a_1_span_3_Template, 2, 1, "span", 5);
    i0.ɵɵtemplate(4, BsFacetSavedQueries_a_1_i_4_Template, 2, 3, "i", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(7, _c0, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(query_r2))("state", ctx_r0.getRouterState(query_r2));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("title", query_r2.name);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(query_r2.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", query_r2.query.text);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.enableDelete);
} }
function BsFacetSavedQueries_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#savedQueries.noSavedQuery"), " ");
} }
export class BsFacetSavedQueries extends AbstractFacet {
    constructor(savedQueriesService) {
        super();
        this.savedQueriesService = savedQueriesService;
        this.searchRoute = "/search";
        this.maxQueries = 5;
        this.enableDelete = true;
        this.page = 0;
        this.manageSavedQueries = new Action({
            icon: "fas fa-cog",
            title: "msg#savedQueries.manageSavedQueries",
            action: () => {
                this.savedQueriesService.manageSavedQueriesModal();
            }
        });
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.savedQueriesService.savedqueries.length / this.maxQueries) - 1);
    }
    get startIndex() {
        return this.page * this.maxQueries;
    }
    get endIndex() {
        return (this.page + 1) * this.maxQueries;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.previousPage, this.nextPage, this.manageSavedQueries];
    }
    openSavedQuery(query) {
        this.savedQueriesService.notifyOpenSavedQuery(query);
        return true;
    }
    deleteQuery(query, event) {
        event.stopPropagation();
        this.savedQueriesService.deleteSavedQuery(query);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    getQueryParams(savedQuery) {
        const query = this.savedQueriesService.searchService.makeQuery(savedQuery.query);
        const queryParams = query.toJsonForQueryString();
        return { query: queryParams };
    }
    getRouterState(savedQuery) {
        return {
            audit: {
                type: "Search_SavedQuery" /* Search */,
                detail: {
                    "saved-query": savedQuery.name
                }
            }
        };
    }
}
BsFacetSavedQueries.ɵfac = function BsFacetSavedQueries_Factory(t) { return new (t || BsFacetSavedQueries)(i0.ɵɵdirectiveInject(i1.SavedQueriesService)); };
BsFacetSavedQueries.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetSavedQueries, selectors: [["sq-facet-saved-queries"]], inputs: { searchRoute: "searchRoute", maxQueries: "maxQueries", enableDelete: "enableDelete" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "saved-query-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "saved-query-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "query-name", "mr-auto", "text-truncate", 3, "title"], ["class", "query-text text-muted small font-italic text-right text-truncate ml-2", 4, "ngIf"], ["class", "query-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "query-text", "text-muted", "small", "font-italic", "text-right", "text-truncate", "ml-2"], [1, "query-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetSavedQueries_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsFacetSavedQueries_a_1_Template, 5, 9, "a", 1);
        i0.ɵɵpipe(2, "slice");
        i0.ɵɵtemplate(3, BsFacetSavedQueries_div_3_Template, 3, 3, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.savedQueriesService.savedqueries, ctx.startIndex, ctx.endIndex));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.savedQueriesService.savedqueries.length == 0);
    } }, directives: [i2.NgForOf, i2.NgIf, i3.RouterLinkWithHref], pipes: [i2.SlicePipe, i4.MessagePipe], styles: [".saved-query-item[_ngcontent-%COMP%]   .query-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.saved-query-item[_ngcontent-%COMP%]:hover   .query-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetSavedQueries, [{
        type: Component,
        args: [{
                selector: 'sq-facet-saved-queries',
                templateUrl: './facet-saved-queries.html',
                styles: [`
.saved-query-item .query-delete{
    opacity: 0;
}

.saved-query-item:hover .query-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: i1.SavedQueriesService }]; }, { searchRoute: [{
            type: Input
        }], maxQueries: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtc2F2ZWQtcXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NhdmVkLXF1ZXJpZXMvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQtc2F2ZWQtcXVlcmllcy9mYWNldC1zYXZlZC1xdWVyaWVzLnRzIiwiYm9vdHN0cmFwL2ZhY2V0LXNhdmVkLXF1ZXJpZXMvZmFjZXQtc2F2ZWQtcXVlcmllcy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7SUNHNUMsK0JBQTZHO0lBQUEsWUFBd0I7SUFBQSxpQkFBTzs7O0lBQS9CLGVBQXdCO0lBQXhCLHNEQUF3Qjs7OztJQUNySSw0QkFBb0o7SUFBckMsMFBBQW9DOztJQUFDLGlCQUFJOztJQUF6Rix1RUFBK0M7Ozs7O0lBTmxILDRCQUlJO0lBREEsNk5BQStCO0lBQy9CLCtCQUFvRTtJQUFBLFlBQWdCO0lBQUEsaUJBQU87SUFDM0YsMEVBQTRJO0lBQzVJLG9FQUF3SjtJQUM1SixpQkFBSTs7OztJQUxBLDJFQUE0QixnREFBQSwwQ0FBQTtJQUVtQixlQUFvQjtJQUFwQixxQ0FBb0I7SUFBQyxlQUFnQjtJQUFoQixtQ0FBZ0I7SUFDN0UsZUFBc0I7SUFBdEIsMENBQXNCO0lBQ3pCLGVBQWtCO0lBQWxCLDBDQUFrQjs7O0lBRTFCLDhCQUNJO0lBQUEsWUFDSjs7SUFBQSxpQkFBTTs7SUFERixlQUNKO0lBREksc0ZBQ0o7O0FEUUosTUFBTSxPQUFPLG1CQUFvQixTQUFRLGFBQWE7SUFXbEQsWUFDVyxtQkFBd0M7UUFDL0MsS0FBSyxFQUFFLENBQUM7UUFERCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFC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QUFPLENBQUMsQ0FBQztRQUM5QyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsY0FBYyxDQUFDLFVBQXNCO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUNqRCxPQUFPLEVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxjQUFjLENBQUMsVUFBc0I7UUFDakMsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLGtDQUE0QjtnQkFDaEMsTUFBTSxFQUFFO29CQUNKLGFBQWEsRUFBRSxVQUFVLENBQUMsSUFBSTtpQkFDakM7YUFDSjtTQUNKLENBQUE7SUFDTCxDQUFDOztzRkE3RlEsbUJBQW1CO3dEQUFuQixtQkFBbUI7UUNuQmhDLDhCQUNJO1FBQUEsZ0VBT0k7O1FBQ0osb0VBRU07UUFDVixpQkFBTTs7UUFYbUIsZUFBK0Q7UUFBL0Qsa0hBQStEO1FBUTlFLGVBQWtEO1FBQWxELHVFQUFrRDs7a0REVS9DLG1CQUFtQjtjQWQvQixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7OztHQVNSLENBQUM7YUFDSDtzRUFFWSxXQUFXO2tCQUFuQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYXZlZFF1ZXJpZXNTZXJ2aWNlLCBTYXZlZFF1ZXJ5LCBTYXZlZFF1ZXJ5RXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vc2F2ZWQtcXVlcmllcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFic3RyYWN0RmFjZXQgfSBmcm9tICdAc2luZXF1YS9jb21wb25lbnRzL2ZhY2V0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3EtZmFjZXQtc2F2ZWQtcXVlcmllcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9mYWNldC1zYXZlZC1xdWVyaWVzLmh0bWwnLFxuICBzdHlsZXM6IFtgXG4uc2F2ZWQtcXVlcnktaXRlbSAucXVlcnktZGVsZXRle1xuICAgIG9wYWNpdHk6IDA7XG59XG5cbi5zYXZlZC1xdWVyeS1pdGVtOmhvdmVyIC5xdWVyeS1kZWxldGV7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1pbi1vdXQ7XG59XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRTYXZlZFF1ZXJpZXMgZXh0ZW5kcyBBYnN0cmFjdEZhY2V0ICB7XG4gICAgQElucHV0KCkgc2VhcmNoUm91dGU6IHN0cmluZyA9IFwiL3NlYXJjaFwiO1xuICAgIEBJbnB1dCgpIG1heFF1ZXJpZXM6IG51bWJlciA9IDU7XG4gICAgQElucHV0KCkgZW5hYmxlRGVsZXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHBhZ2U6IG51bWJlciA9IDA7XG5cbiAgICBtYW5hZ2VTYXZlZFF1ZXJpZXM6IEFjdGlvbjtcbiAgICBwcmV2aW91c1BhZ2U6IEFjdGlvbjtcbiAgICBuZXh0UGFnZTogQWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBzYXZlZFF1ZXJpZXNTZXJ2aWNlOiBTYXZlZFF1ZXJpZXNTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5tYW5hZ2VTYXZlZFF1ZXJpZXMgPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLWNvZ1wiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI3NhdmVkUXVlcmllcy5tYW5hZ2VTYXZlZFF1ZXJpZXNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5tYW5hZ2VTYXZlZFF1ZXJpZXNNb2RhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzUGFnZSA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtY2hldnJvbi1sZWZ0XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQucHJldmlvdXNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS0tO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb246IEFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5kaXNhYmxlZCA9IHRoaXMucGFnZSA8PSAwO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5oaWRkZW4gPSB0aGlzLm1heFBhZ2UgPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubmV4dFBhZ2UgPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLWNoZXZyb24tcmlnaHRcIixcbiAgICAgICAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5uZXh0XCIsXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2UrKztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cGRhdGVyOiAoYWN0aW9uOiBBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uZGlzYWJsZWQgPSB0aGlzLnBhZ2UgPj0gdGhpcy5tYXhQYWdlO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5oaWRkZW4gPSB0aGlzLm1heFBhZ2UgPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBtYXhQYWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLmNlaWwodGhpcy5zYXZlZFF1ZXJpZXNTZXJ2aWNlLnNhdmVkcXVlcmllcy5sZW5ndGggLyB0aGlzLm1heFF1ZXJpZXMpIC0gMSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZSAqIHRoaXMubWF4UXVlcmllcztcbiAgICB9XG5cbiAgICBnZXQgZW5kSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnBhZ2UrMSkgKiB0aGlzLm1heFF1ZXJpZXM7XG4gICAgfVxuXG4gICAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgICAgICB0aGlzLnByZXZpb3VzUGFnZS51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5uZXh0UGFnZS51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnByZXZpb3VzUGFnZSwgdGhpcy5uZXh0UGFnZSwgdGhpcy5tYW5hZ2VTYXZlZFF1ZXJpZXNdO1xuICAgIH1cblxuICAgIG9wZW5TYXZlZFF1ZXJ5KHF1ZXJ5OiBTYXZlZFF1ZXJ5KXtcbiAgICAgICAgdGhpcy5zYXZlZFF1ZXJpZXNTZXJ2aWNlLm5vdGlmeU9wZW5TYXZlZFF1ZXJ5KHF1ZXJ5KVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBkZWxldGVRdWVyeShxdWVyeTogU2F2ZWRRdWVyeSwgZXZlbnQ6IEV2ZW50KXtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5kZWxldGVTYXZlZFF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wYWdlID0gTWF0aC5taW4odGhpcy5wYWdlLCB0aGlzLm1heFBhZ2UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0UXVlcnlQYXJhbXMoc2F2ZWRRdWVyeTogU2F2ZWRRdWVyeSkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuc2F2ZWRRdWVyaWVzU2VydmljZS5zZWFyY2hTZXJ2aWNlLm1ha2VRdWVyeShzYXZlZFF1ZXJ5LnF1ZXJ5KTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBxdWVyeS50b0pzb25Gb3JRdWVyeVN0cmluZygpO1xuICAgICAgICByZXR1cm4ge3F1ZXJ5OiBxdWVyeVBhcmFtc307XG4gICAgfVxuXG4gICAgZ2V0Um91dGVyU3RhdGUoc2F2ZWRRdWVyeTogU2F2ZWRRdWVyeSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXVkaXQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlNlYXJjaCxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJzYXZlZC1xdWVyeVwiOiBzYXZlZFF1ZXJ5Lm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCI+XG4gICAgPGEgKm5nRm9yPVwibGV0IHF1ZXJ5IG9mIHNhdmVkUXVlcmllc1NlcnZpY2Uuc2F2ZWRxdWVyaWVzIHwgc2xpY2U6c3RhcnRJbmRleDplbmRJbmRleFwiXG4gICAgICAgIGNsYXNzPVwic2F2ZWQtcXVlcnktaXRlbSBsaXN0LWdyb3VwLWl0ZW0gbGlzdC1ncm91cC1pdGVtLWFjdGlvbiBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgW3JvdXRlckxpbmtdPVwiW3NlYXJjaFJvdXRlXVwiIFtxdWVyeVBhcmFtc109XCJnZXRRdWVyeVBhcmFtcyhxdWVyeSlcIiBbc3RhdGVdPVwiZ2V0Um91dGVyU3RhdGUocXVlcnkpXCJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5TYXZlZFF1ZXJ5KHF1ZXJ5KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInF1ZXJ5LW5hbWUgbXItYXV0byB0ZXh0LXRydW5jYXRlXCIgW3RpdGxlXT1cInF1ZXJ5Lm5hbWVcIj57eyBxdWVyeS5uYW1lIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInF1ZXJ5LnF1ZXJ5LnRleHRcIiBjbGFzcz1cInF1ZXJ5LXRleHQgdGV4dC1tdXRlZCBzbWFsbCBmb250LWl0YWxpYyB0ZXh0LXJpZ2h0IHRleHQtdHJ1bmNhdGUgbWwtMlwiPlwie3sgcXVlcnkucXVlcnkudGV4dCB9fVwiPC9zcGFuPlxuICAgICAgICA8aSAqbmdJZj1cImVuYWJsZURlbGV0ZVwiIGNsYXNzPVwicXVlcnktZGVsZXRlIG1sLTIgZmFzIGZhLXRpbWVzXCIgW3RpdGxlXT1cIidtc2cjc2F2ZWRRdWVyaWVzLmRlbGV0ZScgfCBzcU1lc3NhZ2VcIiAoY2xpY2spPVwiZGVsZXRlUXVlcnkocXVlcnksICRldmVudClcIj48L2k+XG4gICAgPC9hPlxuICAgIDxkaXYgKm5nSWY9XCJzYXZlZFF1ZXJpZXNTZXJ2aWNlLnNhdmVkcXVlcmllcy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIHRleHQtY2VudGVyIHRleHQtbXV0ZWQgZm9udC1pdGFsaWMgc21hbGwgcHktNVwiPlxuICAgICAgICB7eyAnbXNnI3NhdmVkUXVlcmllcy5ub1NhdmVkUXVlcnknIHwgc3FNZXNzYWdlIH19XG4gICAgPC9kaXY+XG48L2Rpdj4iXX0=