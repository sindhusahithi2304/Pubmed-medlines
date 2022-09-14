import { Injectable, InjectionToken, Optional, Inject } from "@angular/core";
import { of } from 'rxjs';
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./search.service";
import * as i2 from "@angular/router";
export const FIRST_PAGE_OPTIONS = new InjectionToken("FIRST_PAGE_OPTIONS");
export class FirstPageService {
    constructor(options, searchService, router) {
        this.options = options;
        this.searchService = searchService;
        this.router = router;
        if (!this.options) {
            this.options = {};
        }
        this.searchSubscription = this.searchService.events.subscribe((event) => {
            if (event.type === "clear") {
                if (this.displayOnHomePage(event.path)) {
                    Utils.subscribe(this.getFirstPage(), (results) => {
                        this.searchService.setResults(results);
                    });
                }
            }
        });
    }
    ngOnDestroy() {
        this.searchSubscription.unsubscribe();
    }
    /**
     * @ignore
     * legacy
     */
    get isFirstPage() {
        return this.isCurrentSearchResults;
    }
    get isCurrentSearchResults() {
        return !!this.searchService.results && this.searchService.results === this.firstPage;
    }
    displayOnHomePage(path) {
        if (Utils.isArray(this.options.displayOnHomePage)) {
            if (!path) {
                const url = Utils.makeURL(this.router.url);
                path = url.pathname;
            }
            for (const path1 of this.options.displayOnHomePage) {
                if (Utils.endsWith(path, Utils.addUrl("/", path1))) {
                    return true;
                }
            }
            return false;
        }
        else {
            return !!this.options.displayOnHomePage;
        }
    }
    getFirstPage() {
        if (this.firstPage) {
            return of(this.firstPage);
        }
        const query = this.searchService.makeQuery();
        query.isFirstPage = true;
        const observable = this.searchService.getResults(query, {
            type: "Search_FirstPage" /* Search_FirstPage */
        }, {
            searchInactive: true
        });
        Utils.subscribe(observable, (results) => {
            this.firstPage = results;
            return results;
        });
        return observable;
    }
}
FirstPageService.ɵfac = function FirstPageService_Factory(t) { return new (t || FirstPageService)(i0.ɵɵinject(FIRST_PAGE_OPTIONS, 8), i0.ɵɵinject(i1.SearchService), i0.ɵɵinject(i2.Router)); };
FirstPageService.ɵprov = i0.ɵɵdefineInjectable({ token: FirstPageService, factory: FirstPageService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FirstPageService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [FIRST_PAGE_OPTIONS]
            }] }, { type: i1.SearchService }, { type: i2.Router }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3QtcGFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2VhcmNoLyIsInNvdXJjZXMiOlsiZmlyc3QtcGFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFHdEYsT0FBTyxFQUEyQixFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBT3pDLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLElBQUksY0FBYyxDQUFtQixvQkFBb0IsQ0FBQyxDQUFDO0FBSzdGLE1BQU0sT0FBTyxnQkFBZ0I7SUFJekIsWUFDc0QsT0FBeUIsRUFDakUsYUFBNEIsRUFDNUIsTUFBYztRQUYwQixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUNqRSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUN6RCxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDeEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNwQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFDL0IsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDUixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDM0MsQ0FBQyxDQUFDLENBQUM7aUJBQ1Y7YUFDSjtRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksV0FBVztRQUNYLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFJLHNCQUFzQjtRQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3pGLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxJQUFhO1FBQzNCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLElBQUksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO2FBQ3ZCO1lBQ0QsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFO2dCQUNoRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2hELE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNoQjthQUNJO1lBQ0QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLE9BQU8sRUFBRSxDQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QztRQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0MsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDekIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ3BELElBQUksMkNBQWlDO1NBQ3hDLEVBQUU7WUFDQyxjQUFjLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDdEIsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7Z0ZBN0VRLGdCQUFnQixjQUtELGtCQUFrQjt3REFMakMsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGYixNQUFNO2tEQUVULGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQU1RLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIEluamVjdCwgT25EZXN0cm95fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZX0gZnJvbSBcIi4vc2VhcmNoLnNlcnZpY2VcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9uLCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0F1ZGl0RXZlbnRUeXBlLCBSZXN1bHRzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGaXJzdFBhZ2VPcHRpb25zIHtcbiAgICBkaXNwbGF5T25Ib21lUGFnZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBGSVJTVF9QQUdFX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48Rmlyc3RQYWdlT3B0aW9ucz4oXCJGSVJTVF9QQUdFX09QVElPTlNcIik7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBGaXJzdFBhZ2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIHNlYXJjaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIGZpcnN0UGFnZTogUmVzdWx0cztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUlNUX1BBR0VfT1BUSU9OUykgcHJvdGVjdGVkIG9wdGlvbnM6IEZpcnN0UGFnZU9wdGlvbnMsXG4gICAgICAgIHByb3RlY3RlZCBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXJcbiAgICApIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoU3Vic2NyaXB0aW9uID0gdGhpcy5zZWFyY2hTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJjbGVhclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXlPbkhvbWVQYWdlKGV2ZW50LnBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5zdWJzY3JpYmUodGhpcy5nZXRGaXJzdFBhZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2V0UmVzdWx0cyhyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaWdub3JlXG4gICAgICogbGVnYWN5XG4gICAgICovXG4gICAgZ2V0IGlzRmlyc3RQYWdlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0N1cnJlbnRTZWFyY2hSZXN1bHRzO1xuICAgIH1cblxuICAgIGdldCBpc0N1cnJlbnRTZWFyY2hSZXN1bHRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cyAmJiB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cyA9PT0gdGhpcy5maXJzdFBhZ2U7XG4gICAgfVxuXG4gICAgZGlzcGxheU9uSG9tZVBhZ2UocGF0aD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoVXRpbHMuaXNBcnJheSh0aGlzLm9wdGlvbnMuZGlzcGxheU9uSG9tZVBhZ2UpKSB7XG4gICAgICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBVdGlscy5tYWtlVVJMKHRoaXMucm91dGVyLnVybCk7XG4gICAgICAgICAgICAgICAgcGF0aCA9IHVybC5wYXRobmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF0aDEgb2YgdGhpcy5vcHRpb25zLmRpc3BsYXlPbkhvbWVQYWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxzLmVuZHNXaXRoKHBhdGgsIFV0aWxzLmFkZFVybChcIi9cIiwgcGF0aDEpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLm9wdGlvbnMuZGlzcGxheU9uSG9tZVBhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRGaXJzdFBhZ2UoKTogT2JzZXJ2YWJsZTxSZXN1bHRzPiB7XG4gICAgICAgIGlmICh0aGlzLmZpcnN0UGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9mPFJlc3VsdHM+KHRoaXMuZmlyc3RQYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5tYWtlUXVlcnkoKTtcbiAgICAgICAgcXVlcnkuaXNGaXJzdFBhZ2UgPSB0cnVlO1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5zZWFyY2hTZXJ2aWNlLmdldFJlc3VsdHMocXVlcnksIHtcbiAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9GaXJzdFBhZ2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VhcmNoSW5hY3RpdmU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZShvYnNlcnZhYmxlLFxuICAgICAgICAgICAgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0UGFnZSA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxufVxuIl19