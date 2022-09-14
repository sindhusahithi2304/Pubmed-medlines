import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "../../search.service";
import * as i3 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a1, a3, a4) { return { items: a0, style: a1, autoAdjust: true, rightAligned: a3, size: a4 }; };
export class BsSortSelector {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
    }
    ngOnChanges(changes) {
        if (changes["results"]) {
            this.buildSortAction();
        }
    }
    setCurrentSort(name) {
        if (this.sortAction) {
            const sortingChoices = this.getSortingChoices();
            const current = sortingChoices && sortingChoices.find((value) => {
                return Utils.eqNC(value.name, name);
            });
            if (current) {
                const queryOrderBy = this.searchService.query.orderBy;
                this.sortAction.text = !!queryOrderBy ? "msg#sortSelector.sortOther" : current.display || current.name;
                this.sortAction.icon = !!queryOrderBy ? 'fas fa-sort'
                    : this.isAscendingSort(current.orderByClause) ? 'fas fa-sort-amount-up'
                        : this.isDescendingSort(current.orderByClause) ? 'fas fa-sort-amount-down' : 'fas fa-sort';
            }
            else {
                this.sortAction.text = "msg#sortSelector.sortOther";
                this.sortAction.icon = "fas fa-sort";
            }
            this.sortAction.messageParams = { values: { text: this.sortAction.text } }; // for title
        }
    }
    selectSort(sortingChoice) {
        this.setCurrentSort(sortingChoice.name);
        this.searchService.query.sort = sortingChoice.name;
        const audit = {
            type: "Search_Sort" /* Search_Sort */,
            detail: {
                sort: sortingChoice.name,
                orderByClause: sortingChoice.orderByClause,
            }
        };
        this.searchService.search(undefined, audit);
    }
    buildSortAction() {
        const sortingChoices = this.getSortingChoices();
        if (!sortingChoices || sortingChoices.length === 0) {
            this.sortAction = undefined;
            return;
        }
        this.sortAction = new Action({
            title: "msg#sortSelector.sortByTitle",
            children: sortingChoices
                .filter(sortingChoice => this.searchService.hasRelevance || !Utils.includes(sortingChoice.orderByClause, "globalrelevance"))
                .map(sortingChoice => new Action({
                icon: this.isAscendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-up'
                    : this.isDescendingSort(sortingChoice.orderByClause) ? 'fas fa-sort-amount-down' : '',
                text: sortingChoice.display || sortingChoice.name,
                data: sortingChoice,
                action: (item, event) => {
                    this.selectSort(item.data);
                }
            }))
        });
        if (!!this.searchService.results) {
            this.setCurrentSort(this.searchService.results.sort);
        }
    }
    isAscendingSort(orderByClause) {
        if (!orderByClause) {
            return false;
        }
        const lastElement = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
        return Utils.eqNC('asc', lastElement);
    }
    isDescendingSort(orderByClause) {
        if (!orderByClause) {
            return false;
        }
        const lastElement = orderByClause.substring(orderByClause.lastIndexOf(' ') + 1);
        return Utils.eqNC('desc', lastElement);
    }
    isTabSearch() {
        const query = this.appService.ccquery;
        if (!query)
            return false;
        const tabSearch = query.tabSearch;
        return !(!tabSearch || !tabSearch.column || !tabSearch.isActive ||
            !tabSearch.tabs || tabSearch.tabs.length === 0);
    }
    getSortingChoices() {
        if (this.isTabSearch()) {
            const tabName = this.searchService.results && this.searchService.results.tab;
            if (tabName && this.appService.ccquery) {
                for (const t of this.appService.ccquery.tabSearch.tabs) {
                    if (t.name === tabName) {
                        const s = t.sortingChoices;
                        if (s && s.length > 0)
                            return s;
                        else
                            break;
                    }
                }
            }
        }
        const q = this.appService.ccquery;
        return q && q.sortingChoices;
    }
}
BsSortSelector.ɵfac = function BsSortSelector_Factory(t) { return new (t || BsSortSelector)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SearchService)); };
BsSortSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsSortSelector, selectors: [["sq-sort-selector"]], inputs: { results: "results", rightAligned: "rightAligned", style: "style", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 9, consts: [["role", "toolbar", "aria-label", "Toolbar", 1, "btn-toolbar"], [1, "btn-group", 3, "hidden", "sq-action-buttons"]], template: function BsSortSelector_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelement(1, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx.searchService.haveRecords || !ctx.sortAction)("sq-action-buttons", i0.ɵɵpureFunction4(4, _c1, i0.ɵɵpureFunction1(2, _c0, ctx.sortAction), ctx.style, ctx.rightAligned, ctx.size));
    } }, directives: [i3.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSortSelector, [{
        type: Component,
        args: [{
                selector: "sq-sort-selector",
                templateUrl: "./sort-selector.html"
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }]; }, { results: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }], style: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1zZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NlYXJjaC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9zb3J0LXNlbGVjdG9yL3NvcnQtc2VsZWN0b3IudHMiLCJib290c3RyYXAvc29ydC1zZWxlY3Rvci9zb3J0LXNlbGVjdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUd6QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUFPbEQsTUFBTSxPQUFPLGNBQWM7SUFPdkIsWUFDVyxVQUFzQixFQUN0QixhQUE0QjtRQUQ1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ3ZDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVPLGNBQWMsQ0FBQyxJQUFZO1FBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoRCxNQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUM1RCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksT0FBTyxFQUFFO2dCQUNULE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FB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U2ltcGxlQ2hhbmdlc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7QXBwU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge0F1ZGl0RXZlbnQsIEF1ZGl0RXZlbnRUeXBlLCBDQ1NvcnRpbmdDaG9pY2UsIFJlc3VsdHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VhcmNoLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3Etc29ydC1zZWxlY3RvclwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc29ydC1zZWxlY3Rvci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNTb3J0U2VsZWN0b3IgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7ICAvLyBOZWVkZWQgdG8gZGV0ZWN0IENoYW5nZXNcbiAgICBASW5wdXQoKSByaWdodEFsaWduZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgc3R5bGU6IHN0cmluZztcbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG4gICAgc29ydEFjdGlvbjogQWN0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbXCJyZXN1bHRzXCJdKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkU29ydEFjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDdXJyZW50U29ydChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc29ydEFjdGlvbikge1xuICAgICAgICAgICAgY29uc3Qgc29ydGluZ0Nob2ljZXMgPSB0aGlzLmdldFNvcnRpbmdDaG9pY2VzKCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gc29ydGluZ0Nob2ljZXMgJiYgc29ydGluZ0Nob2ljZXMuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZXFOQyh2YWx1ZS5uYW1lLCBuYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeU9yZGVyQnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkub3JkZXJCeTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24udGV4dCA9ICEhcXVlcnlPcmRlckJ5ID8gXCJtc2cjc29ydFNlbGVjdG9yLnNvcnRPdGhlclwiIDogY3VycmVudC5kaXNwbGF5IHx8IGN1cnJlbnQubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24uaWNvbiA9ICEhcXVlcnlPcmRlckJ5ID8gJ2ZhcyBmYS1zb3J0J1xuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaXNBc2NlbmRpbmdTb3J0KGN1cnJlbnQub3JkZXJCeUNsYXVzZSkgPyAnZmFzIGZhLXNvcnQtYW1vdW50LXVwJ1xuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuaXNEZXNjZW5kaW5nU29ydChjdXJyZW50Lm9yZGVyQnlDbGF1c2UpID8gJ2ZhcyBmYS1zb3J0LWFtb3VudC1kb3duJyA6ICdmYXMgZmEtc29ydCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24udGV4dCA9IFwibXNnI3NvcnRTZWxlY3Rvci5zb3J0T3RoZXJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24uaWNvbiA9IFwiZmFzIGZhLXNvcnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc29ydEFjdGlvbi5tZXNzYWdlUGFyYW1zID0ge3ZhbHVlczoge3RleHQ6IHRoaXMuc29ydEFjdGlvbi50ZXh0fX07IC8vIGZvciB0aXRsZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZWxlY3RTb3J0KHNvcnRpbmdDaG9pY2U6IENDU29ydGluZ0Nob2ljZSkge1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRTb3J0KHNvcnRpbmdDaG9pY2UubmFtZSk7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5zb3J0ID0gc29ydGluZ0Nob2ljZS5uYW1lO1xuICAgICAgICBjb25zdCBhdWRpdDogQXVkaXRFdmVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLlNlYXJjaF9Tb3J0LFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgc29ydDogc29ydGluZ0Nob2ljZS5uYW1lLFxuICAgICAgICAgICAgICAgIG9yZGVyQnlDbGF1c2U6IHNvcnRpbmdDaG9pY2Uub3JkZXJCeUNsYXVzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCh1bmRlZmluZWQsIGF1ZGl0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkU29ydEFjdGlvbigpIHtcbiAgICAgICAgY29uc3Qgc29ydGluZ0Nob2ljZXMgPSB0aGlzLmdldFNvcnRpbmdDaG9pY2VzKCk7XG4gICAgICAgIGlmICghc29ydGluZ0Nob2ljZXMgfHwgc29ydGluZ0Nob2ljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRBY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3J0QWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjc29ydFNlbGVjdG9yLnNvcnRCeVRpdGxlXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogc29ydGluZ0Nob2ljZXNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKHNvcnRpbmdDaG9pY2UgPT4gdGhpcy5zZWFyY2hTZXJ2aWNlLmhhc1JlbGV2YW5jZSB8fCAhVXRpbHMuaW5jbHVkZXMoc29ydGluZ0Nob2ljZS5vcmRlckJ5Q2xhdXNlLCBcImdsb2JhbHJlbGV2YW5jZVwiKSlcbiAgICAgICAgICAgICAgICAubWFwKHNvcnRpbmdDaG9pY2UgPT4gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGljb246IHRoaXMuaXNBc2NlbmRpbmdTb3J0KHNvcnRpbmdDaG9pY2Uub3JkZXJCeUNsYXVzZSkgPyAnZmFzIGZhLXNvcnQtYW1vdW50LXVwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5pc0Rlc2NlbmRpbmdTb3J0KHNvcnRpbmdDaG9pY2Uub3JkZXJCeUNsYXVzZSkgPyAnZmFzIGZhLXNvcnQtYW1vdW50LWRvd24nIDogJycsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHNvcnRpbmdDaG9pY2UuZGlzcGxheSB8fCBzb3J0aW5nQ2hvaWNlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHNvcnRpbmdDaG9pY2UsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKGl0ZW06IEFjdGlvbiwgZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFNvcnQoaXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCEhdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFNvcnQodGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMuc29ydCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQXNjZW5kaW5nU29ydChvcmRlckJ5Q2xhdXNlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFvcmRlckJ5Q2xhdXNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYXN0RWxlbWVudDogc3RyaW5nID0gb3JkZXJCeUNsYXVzZS5zdWJzdHJpbmcob3JkZXJCeUNsYXVzZS5sYXN0SW5kZXhPZignICcpICsgMSk7XG4gICAgICAgIHJldHVybiBVdGlscy5lcU5DKCdhc2MnLCBsYXN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0Rlc2NlbmRpbmdTb3J0KG9yZGVyQnlDbGF1c2U6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIW9yZGVyQnlDbGF1c2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhc3RFbGVtZW50OiBzdHJpbmcgPSBvcmRlckJ5Q2xhdXNlLnN1YnN0cmluZyhvcmRlckJ5Q2xhdXNlLmxhc3RJbmRleE9mKCcgJykgKyAxKTtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmVxTkMoJ2Rlc2MnLCBsYXN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1RhYlNlYXJjaCgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeTtcbiAgICAgICAgaWYgKCFxdWVyeSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdGFiU2VhcmNoID0gcXVlcnkudGFiU2VhcmNoO1xuICAgICAgICByZXR1cm4gISghdGFiU2VhcmNoIHx8ICF0YWJTZWFyY2guY29sdW1uIHx8ICF0YWJTZWFyY2guaXNBY3RpdmUgfHxcbiAgICAgICAgICAgICF0YWJTZWFyY2gudGFicyB8fCB0YWJTZWFyY2gudGFicy5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U29ydGluZ0Nob2ljZXMoKTogQ0NTb3J0aW5nQ2hvaWNlW10gfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUYWJTZWFyY2goKSkge1xuICAgICAgICAgICAgY29uc3QgdGFiTmFtZSA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzICYmIHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzLnRhYjtcbiAgICAgICAgICAgIGlmICh0YWJOYW1lICYmIHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0IG9mIHRoaXMuYXBwU2VydmljZS5jY3F1ZXJ5LnRhYlNlYXJjaC50YWJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0Lm5hbWUgPT09IHRhYk5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHMgPSB0LnNvcnRpbmdDaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHEgPSB0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeTtcbiAgICAgICAgcmV0dXJuIHEgJiYgcS5zb3J0aW5nQ2hvaWNlcztcbiAgICB9XG59IiwiPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyXCIgcm9sZT1cInRvb2xiYXJcIiBhcmlhLWxhYmVsPVwiVG9vbGJhclwiPlxuICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIiBbaGlkZGVuXT1cIiFzZWFyY2hTZXJ2aWNlLmhhdmVSZWNvcmRzIHx8ICFzb3J0QWN0aW9uXCIgW3NxLWFjdGlvbi1idXR0b25zXT1cIntpdGVtczogW3NvcnRBY3Rpb25dLCBzdHlsZTogc3R5bGUsIGF1dG9BZGp1c3Q6IHRydWUsIHJpZ2h0QWxpZ25lZDogcmlnaHRBbGlnbmVkLCBzaXplOiBzaXplfVwiPjwvZGl2PlxuPC9kaXY+Il19