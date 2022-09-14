import { Component, Input } from '@angular/core';
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "../../recent-queries.service";
import * as i3 from "../../saved-queries.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "@sinequa/components/utils";
import * as i7 from "@sinequa/core/intl";
function BsFacetRecentQueries_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqDate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, query_r2.date));
} }
function BsFacetRecentQueries_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 9);
    i0.ɵɵlistener("click", function BsFacetRecentQueries_a_1_i_4_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const query_r2 = i0.ɵɵnextContext().$implicit; const ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.saveQuery(query_r2, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentQueries.save"));
} }
function BsFacetRecentQueries_a_1_i_5_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "i", 10);
    i0.ɵɵlistener("click", function BsFacetRecentQueries_a_1_i_5_Template_i_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const query_r2 = i0.ɵɵnextContext().$implicit; const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.deleteQuery(query_r2, $event); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("title", i0.ɵɵpipeBind1(1, 1, "msg#recentQueries.delete"));
} }
const _c0 = function (a0) { return [a0]; };
function BsFacetRecentQueries_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵlistener("click", function BsFacetRecentQueries_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r14); const query_r2 = ctx.$implicit; const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.openRecentQuery(query_r2); });
    i0.ɵɵelementStart(1, "span", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, BsFacetRecentQueries_a_1_span_3_Template, 3, 3, "span", 5);
    i0.ɵɵtemplate(4, BsFacetRecentQueries_a_1_i_4_Template, 2, 3, "i", 6);
    i0.ɵɵtemplate(5, BsFacetRecentQueries_a_1_i_5_Template, 2, 3, "i", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const query_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c0, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(query_r2.query))("state", ctx_r0.getRouterState(query_r2.query));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", query_r2.query.text);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(query_r2.query.text);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", query_r2.date);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.enableSave);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.enableDelete);
} }
function BsFacetRecentQueries_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#recentQueries.noRecentQuery"), " ");
} }
export class BsFacetRecentQueries extends AbstractFacet {
    constructor(searchService, recentQueriesService, savedQueriesService) {
        super();
        this.searchService = searchService;
        this.recentQueriesService = recentQueriesService;
        this.savedQueriesService = savedQueriesService;
        this.searchRoute = "/search";
        this.maxQueries = 5;
        this.enableDelete = true;
        this.enableSave = true;
        this.page = 0;
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
        return Math.max(0, Math.ceil(this.recentQueriesService.recentqueries.length / this.maxQueries) - 1);
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
        return [this.previousPage, this.nextPage];
    }
    openRecentQuery(query) {
        this.recentQueriesService.notifyOpenRecentQuery(query);
        return true;
    }
    deleteQuery(query, event) {
        event.stopPropagation();
        this.recentQueriesService.deleteRecentQuery(query);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    saveQuery(query, event) {
        event.stopPropagation();
        const q = Utils.extend(this.searchService.makeQuery(), Utils.copy(query.query));
        this.savedQueriesService.createSavedQueryModal(q);
        return false;
    }
    getQueryParams(recentQuery) {
        const query = this.searchService.makeQuery(recentQuery);
        const queryParams = query.toJsonForQueryString();
        return { query: queryParams };
    }
    getRouterState(recentQuery) {
        return {
            audit: {
                type: "Search_RecentQuery" /* Search */,
                detail: {
                    recentquery: recentQuery.text
                }
            }
        };
    }
}
BsFacetRecentQueries.ɵfac = function BsFacetRecentQueries_Factory(t) { return new (t || BsFacetRecentQueries)(i0.ɵɵdirectiveInject(i1.SearchService), i0.ɵɵdirectiveInject(i2.RecentQueriesService), i0.ɵɵdirectiveInject(i3.SavedQueriesService)); };
BsFacetRecentQueries.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetRecentQueries, selectors: [["sq-facet-recent-queries"]], inputs: { searchRoute: "searchRoute", maxQueries: "maxQueries", enableDelete: "enableDelete", enableSave: "enableSave" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "recent-query-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "recent-query-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "query-text", "mr-auto", "text-truncate", 3, "title"], ["class", "query-date ml-2 text-muted small text-right", 4, "ngIf"], ["class", "query-save ml-2 far fa-save", 3, "title", "click", 4, "ngIf"], ["class", "query-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "query-date", "ml-2", "text-muted", "small", "text-right"], [1, "query-save", "ml-2", "far", "fa-save", 3, "title", "click"], [1, "query-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetRecentQueries_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsFacetRecentQueries_a_1_Template, 6, 10, "a", 1);
        i0.ɵɵpipe(2, "slice");
        i0.ɵɵtemplate(3, BsFacetRecentQueries_div_3_Template, 3, 3, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 2, ctx.recentQueriesService.recentqueries, ctx.startIndex, ctx.endIndex));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.recentQueriesService.recentqueries.length == 0);
    } }, directives: [i4.NgForOf, i4.NgIf, i5.RouterLinkWithHref], pipes: [i4.SlicePipe, i6.DatePipe, i7.MessagePipe], styles: [".recent-query-item[_ngcontent-%COMP%]   .query-delete[_ngcontent-%COMP%], .recent-query-item[_ngcontent-%COMP%]   .query-save[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.recent-query-item[_ngcontent-%COMP%]:hover   .query-delete[_ngcontent-%COMP%], .recent-query-item[_ngcontent-%COMP%]:hover   .query-save[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetRecentQueries, [{
        type: Component,
        args: [{
                selector: 'sq-facet-recent-queries',
                templateUrl: './facet-recent-queries.html',
                styles: [`
.recent-query-item .query-delete, .recent-query-item .query-save{
    opacity: 0;
}

.recent-query-item:hover .query-delete, .recent-query-item:hover .query-save{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: i1.SearchService }, { type: i2.RecentQueriesService }, { type: i3.SavedQueriesService }]; }, { searchRoute: [{
            type: Input
        }], maxQueries: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }], enableSave: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcmVjZW50LXF1ZXJpZXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zYXZlZC1xdWVyaWVzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LXJlY2VudC1xdWVyaWVzL2ZhY2V0LXJlY2VudC1xdWVyaWVzLnRzIiwiYm9vdHN0cmFwL2ZhY2V0LXJlY2VudC1xdWVyaWVzL2ZhY2V0LXJlY2VudC1xdWVyaWVzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7Ozs7SUNBbkMsK0JBQTZFO0lBQUEsWUFBeUI7O0lBQUEsaUJBQU87OztJQUFoQyxlQUF5QjtJQUF6Qix5REFBeUI7Ozs7SUFDdEcsNEJBQTRJO0lBQW5DLHlQQUFrQzs7SUFBQyxpQkFBSTs7SUFBdEYsc0VBQThDOzs7O0lBQ3hHLDZCQUFvSjtJQUFyQyw4UEFBb0M7O0lBQUMsaUJBQUk7O0lBQTFGLHdFQUFnRDs7Ozs7SUFQbEgsNEJBSUk7SUFEQSxpT0FBZ0M7SUFDaEMsK0JBQThFO0lBQUEsWUFBc0I7SUFBQSxpQkFBTztJQUMzRywyRUFBNkc7SUFDN0cscUVBQWdKO0lBQ2hKLHFFQUF3SjtJQUM1SixpQkFBSTs7OztJQU5BLDJFQUE0QixzREFBQSxnREFBQTtJQUVtQixlQUE4QjtJQUE5QixzREFBOEI7SUFBQyxlQUFzQjtJQUF0Qix5Q0FBc0I7SUFDN0YsZUFBZ0I7SUFBaEIsb0NBQWdCO0lBQ25CLGVBQWdCO0lBQWhCLHdDQUFnQjtJQUNoQixlQUFrQjtJQUFsQiwwQ0FBa0I7OztJQUUxQiwrQkFDSTtJ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LDZCQUE2QjtnQkFDMUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7OztHQVNSLENBQUM7YUFDSDtxSUFFWSxXQUFXO2tCQUFuQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoJztcbmltcG9ydCB7IFJlY2VudFF1ZXJpZXNTZXJ2aWNlLCBSZWNlbnRRdWVyeSwgUmVjZW50UXVlcnlFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9yZWNlbnQtcXVlcmllcy5zZXJ2aWNlJztcbmltcG9ydCB7IEFic3RyYWN0RmFjZXQgfSBmcm9tICdAc2luZXF1YS9jb21wb25lbnRzL2ZhY2V0JztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uJztcbmltcG9ydCB7IFNhdmVkUXVlcmllc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zYXZlZC1xdWVyaWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdAc2luZXF1YS9jb3JlL2Jhc2UnO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLWZhY2V0LXJlY2VudC1xdWVyaWVzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZhY2V0LXJlY2VudC1xdWVyaWVzLmh0bWwnLFxuICBzdHlsZXM6IFtgXG4ucmVjZW50LXF1ZXJ5LWl0ZW0gLnF1ZXJ5LWRlbGV0ZSwgLnJlY2VudC1xdWVyeS1pdGVtIC5xdWVyeS1zYXZle1xuICAgIG9wYWNpdHk6IDA7XG59XG5cbi5yZWNlbnQtcXVlcnktaXRlbTpob3ZlciAucXVlcnktZGVsZXRlLCAucmVjZW50LXF1ZXJ5LWl0ZW06aG92ZXIgLnF1ZXJ5LXNhdmV7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1pbi1vdXQ7XG59XG4gIGBdXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRSZWNlbnRRdWVyaWVzIGV4dGVuZHMgQWJzdHJhY3RGYWNldCAge1xuICAgIEBJbnB1dCgpIHNlYXJjaFJvdXRlOiBzdHJpbmcgPSBcIi9zZWFyY2hcIjtcbiAgICBASW5wdXQoKSBtYXhRdWVyaWVzOiBudW1iZXIgPSA1O1xuICAgIEBJbnB1dCgpIGVuYWJsZURlbGV0ZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZW5hYmxlU2F2ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgcHJldmlvdXNQYWdlOiBBY3Rpb247XG4gICAgbmV4dFBhZ2U6IEFjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHVibGljIHJlY2VudFF1ZXJpZXNTZXJ2aWNlOiBSZWNlbnRRdWVyaWVzU2VydmljZSxcbiAgICAgICAgcHVibGljIHNhdmVkUXVlcmllc1NlcnZpY2U6IFNhdmVkUXVlcmllc1NlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzUGFnZSA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtY2hldnJvbi1sZWZ0XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQucHJldmlvdXNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZS0tO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHVwZGF0ZXI6IChhY3Rpb246IEFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGlvbi5kaXNhYmxlZCA9IHRoaXMucGFnZSA8PSAwO1xuICAgICAgICAgICAgICAgIGFjdGlvbi5oaWRkZW4gPSB0aGlzLm1heFBhZ2UgPT09IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5leHRQYWdlID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBpY29uOiBcImZhcyBmYS1jaGV2cm9uLXJpZ2h0XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQubmV4dFwiLFxuICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlcjogKGFjdGlvbjogQWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmRpc2FibGVkID0gdGhpcy5wYWdlID49IHRoaXMubWF4UGFnZTtcbiAgICAgICAgICAgICAgICBhY3Rpb24uaGlkZGVuID0gdGhpcy5tYXhQYWdlID09PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgbWF4UGFnZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKHRoaXMucmVjZW50UXVlcmllc1NlcnZpY2UucmVjZW50cXVlcmllcy5sZW5ndGggLyB0aGlzLm1heFF1ZXJpZXMpIC0gMSk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXJ0SW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZSAqIHRoaXMubWF4UXVlcmllcztcbiAgICB9XG5cbiAgICBnZXQgZW5kSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnBhZ2UrMSkgKiB0aGlzLm1heFF1ZXJpZXM7XG4gICAgfVxuXG4gICAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgICAgICB0aGlzLnByZXZpb3VzUGFnZS51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5uZXh0UGFnZS51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnByZXZpb3VzUGFnZSwgdGhpcy5uZXh0UGFnZV07XG4gICAgfVxuXG4gICAgb3BlblJlY2VudFF1ZXJ5KHF1ZXJ5OiBSZWNlbnRRdWVyeSl7XG4gICAgICAgIHRoaXMucmVjZW50UXVlcmllc1NlcnZpY2Uubm90aWZ5T3BlblJlY2VudFF1ZXJ5KHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZGVsZXRlUXVlcnkocXVlcnk6IFJlY2VudFF1ZXJ5LCBldmVudDogRXZlbnQpe1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5yZWNlbnRRdWVyaWVzU2VydmljZS5kZWxldGVSZWNlbnRRdWVyeShxdWVyeSk7XG4gICAgICAgIHRoaXMucGFnZSA9IE1hdGgubWluKHRoaXMucGFnZSwgdGhpcy5tYXhQYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNhdmVRdWVyeShxdWVyeTogUmVjZW50UXVlcnksIGV2ZW50OiBFdmVudCl7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBxID0gVXRpbHMuZXh0ZW5kKHRoaXMuc2VhcmNoU2VydmljZS5tYWtlUXVlcnkoKSwgVXRpbHMuY29weShxdWVyeS5xdWVyeSkpO1xuICAgICAgICB0aGlzLnNhdmVkUXVlcmllc1NlcnZpY2UuY3JlYXRlU2F2ZWRRdWVyeU1vZGFsKHEpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0UXVlcnlQYXJhbXMocmVjZW50UXVlcnk6IFF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5zZWFyY2hTZXJ2aWNlLm1ha2VRdWVyeShyZWNlbnRRdWVyeSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcXVlcnkudG9Kc29uRm9yUXVlcnlTdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHtxdWVyeTogcXVlcnlQYXJhbXN9O1xuICAgIH1cblxuICAgIGdldFJvdXRlclN0YXRlKHJlY2VudFF1ZXJ5OiBRdWVyeSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXVkaXQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBSZWNlbnRRdWVyeUV2ZW50VHlwZS5TZWFyY2gsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlY2VudHF1ZXJ5OiByZWNlbnRRdWVyeS50ZXh0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiPlxuICAgIDxhICpuZ0Zvcj1cImxldCBxdWVyeSBvZiByZWNlbnRRdWVyaWVzU2VydmljZS5yZWNlbnRxdWVyaWVzIHwgc2xpY2U6c3RhcnRJbmRleDplbmRJbmRleFwiIFxuICAgICAgICBjbGFzcz1cInJlY2VudC1xdWVyeS1pdGVtIGxpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uIGQtZmxleCBhbGlnbi1pdGVtcy1jZW50ZXJcIlxuICAgICAgICBbcm91dGVyTGlua109XCJbc2VhcmNoUm91dGVdXCIgW3F1ZXJ5UGFyYW1zXT1cImdldFF1ZXJ5UGFyYW1zKHF1ZXJ5LnF1ZXJ5KVwiIFtzdGF0ZV09XCJnZXRSb3V0ZXJTdGF0ZShxdWVyeS5xdWVyeSlcIlxuICAgICAgICAoY2xpY2spPVwib3BlblJlY2VudFF1ZXJ5KHF1ZXJ5KVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInF1ZXJ5LXRleHQgbXItYXV0byB0ZXh0LXRydW5jYXRlXCIgdGl0bGU9XCJ7eyBxdWVyeS5xdWVyeS50ZXh0IH19XCI+e3sgcXVlcnkucXVlcnkudGV4dCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJxdWVyeS5kYXRlXCIgY2xhc3M9XCJxdWVyeS1kYXRlIG1sLTIgdGV4dC1tdXRlZCBzbWFsbCB0ZXh0LXJpZ2h0XCI+e3sgcXVlcnkuZGF0ZSB8IHNxRGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPGkgKm5nSWY9XCJlbmFibGVTYXZlXCIgY2xhc3M9XCJxdWVyeS1zYXZlIG1sLTIgZmFyIGZhLXNhdmVcIiBbdGl0bGVdPVwiJ21zZyNyZWNlbnRRdWVyaWVzLnNhdmUnIHwgc3FNZXNzYWdlXCIgKGNsaWNrKT1cInNhdmVRdWVyeShxdWVyeSwgJGV2ZW50KVwiPjwvaT5cbiAgICAgICAgPGkgKm5nSWY9XCJlbmFibGVEZWxldGVcImNsYXNzPVwicXVlcnktZGVsZXRlIG1sLTIgZmFzIGZhLXRpbWVzXCIgW3RpdGxlXT1cIidtc2cjcmVjZW50UXVlcmllcy5kZWxldGUnIHwgc3FNZXNzYWdlXCIgKGNsaWNrKT1cImRlbGV0ZVF1ZXJ5KHF1ZXJ5LCAkZXZlbnQpXCI+PC9pPlxuICAgIDwvYT5cbiAgICA8ZGl2ICpuZ0lmPVwicmVjZW50UXVlcmllc1NlcnZpY2UucmVjZW50cXVlcmllcy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIHRleHQtY2VudGVyIHRleHQtbXV0ZWQgZm9udC1pdGFsaWMgc21hbGwgcHktNVwiPlxuICAgICAgICB7eyAnbXNnI3JlY2VudFF1ZXJpZXMubm9SZWNlbnRRdWVyeScgfCBzcU1lc3NhZ2UgfX1cbiAgICA8L2Rpdj5cbjwvZGl2PiJdfQ==