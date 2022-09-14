import { Component, Input } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { BsFacetList } from '../facet-list/facet-list';
import { BsFacetTree } from '../facet-tree/facet-tree';
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/action";
function BsFacetFilters_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "sq-action-menu", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("items", ctx_r0.filters)("autoAdjust", ctx_r0.autoAdjust)("autoAdjustBreakpoint", ctx_r0.autoAdjustBreakpoint)("collapseBreakpoint", ctx_r0.collapseBreakpoint)("right", ctx_r0.rightAligned)("size", ctx_r0.size);
} }
export class BsFacetFilters {
    constructor(facetService) {
        this.facetService = facetService;
        this.enableCustomization = false;
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        this.rightAligned = false;
        this.filters = [];
        this.hidden = false;
        this.facetStatus = {
            add: {
                title: "msg#facet.filters.add",
                icon: "fas fa-plus"
            },
            remove: {
                title: "msg#facet.filters.remove",
                icon: "fas fa-minus"
            }
        };
        this.hidden = false;
        this.filters = [];
    }
    ngOnInit() {
        if (!this.enableCustomization)
            return;
        if (!this.facetService.defaultFacets) {
            this.facetService.defaultFacets = [];
            for (let facet of this.facets)
                this.facetService.defaultFacets.push({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
        }
        if (!this.facetService.allFacets)
            this.facetService.allFacets = this.facets;
    }
    ngOnChanges() {
        if (!!this.results)
            this.buildFilters();
        if (!this.results)
            this.hidden = true;
    }
    /**
     * Build filters bar actions
     */
    buildFilters() {
        // For each facet
        this.filters = this.filteredFacets.map((facet) => {
            const children = [
                new Action({
                    component: (facet.type === 'list') ? BsFacetList : BsFacetTree,
                    componentInputs: { results: this.results, name: facet.name, aggregation: facet.aggregation, searchable: facet.searchable, displayActions: true }
                })
            ];
            return new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled: !this.hasData(facet),
                styles: this.hasFiltered(facet.name) ? "ml-2 font-weight-bold" : "ml-2",
                children: children
            });
        });
        if (this.enableCustomization)
            this.addFacetMenu();
    }
    /**
     * Use to outline facet when filters are sets
     * @param facetName facet name
     *
     * @returns true if filters are sets otherwise false
     */
    hasFiltered(facetName) {
        return this.facetService.hasFiltered(facetName);
    }
    /**
     * Use to disable menu item when no items in a facet
     * @param facet facet to check
     *
     * @returns true if facet contains at least one item otherwise false
     */
    hasData(facet) {
        return this.facetService.hasData(facet.aggregation, this.results);
    }
    addFacetMenu() {
        var _a, _b;
        let outFacets = [];
        outFacets.push(new Action({
            name: `add_remove_all`,
            text: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            icon: this.hasFacetSelected ?
                (this.userFacets.length < this.facets.length ? "far fa-minus-square mr-1" : "far fa-check-square mr-1")
                : "far fa-square mr-1",
            title: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            action: () => {
                if (this.hasFacetSelected && this.userFacets.length === this.facets.length)
                    this.facetService.removeAllFacet();
                else
                    this.facetService.addAllFacet();
                this.buildFilters();
            }
        }));
        for (let facet of this.facets) {
            outFacets.push(new Action({
                name: `add_remove_${facet.name}`,
                text: facet.title,
                icon: facet.icon,
                selected: !!((_a = this.userFacets) === null || _a === void 0 ? void 0 : _a.find(userFacet => userFacet.name === facet.name)),
                title: !!((_b = this.userFacets) === null || _b === void 0 ? void 0 : _b.find(userFacet => userFacet.name === facet.name)) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
                action: () => {
                    var _a;
                    if ((_a = this.userFacets) === null || _a === void 0 ? void 0 : _a.find(userFacet => userFacet.name === facet.name))
                        this.facetService.removeFacet({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                    else
                        this.facetService.addFacet({ name: facet.name, position: 0, hidden: false, expanded: true, view: "" });
                    this.buildFilters();
                }
            }));
        }
        let add_action = new Action({
            name: "facets_config",
            icon: "fas fa-cog",
            title: "msg#facet.filters.customizeFacets",
            children: outFacets
        });
        this.filters = [add_action, ...this.filters];
    }
    get filteredFacets() {
        if (!this.enableCustomization)
            return this.facets;
        let new_facets = [];
        if (this.userFacets) {
            for (let facet of this.facets) {
                let pos = this.userFacets.findIndex((userFacet) => userFacet.name === facet.name);
                if (pos >= 0)
                    new_facets.push(facet);
            }
        }
        return new_facets;
    }
    get userFacets() {
        return this.facetService.facets;
    }
    get hasFacetSelected() {
        if (this.userFacets.length === 0)
            return false;
        for (let facet of this.facets) {
            if (this.userFacets.find(userFacet => userFacet.name === facet.name))
                return true;
        }
        return false;
    }
}
BsFacetFilters.ɵfac = function BsFacetFilters_Factory(t) { return new (t || BsFacetFilters)(i0.ɵɵdirectiveInject(i1.FacetService)); };
BsFacetFilters.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetFilters, selectors: [["sq-facet-filters"]], inputs: { results: "results", facets: "facets", enableCustomization: "enableCustomization", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", rightAligned: "rightAligned", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "facet-filters-bar", 4, "ngIf"], [1, "facet-filters-bar"], [3, "items", "autoAdjust", "autoAdjustBreakpoint", "collapseBreakpoint", "right", "size"]], template: function BsFacetFilters_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFacetFilters_div_0_Template, 2, 6, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.hidden);
    } }, directives: [i2.NgIf, i3.BsActionMenu], styles: [".navbar-nav[_ngcontent-%COMP%]{flex-direction:row;flex-wrap:wrap}.nav-item[_ngcontent-%COMP%]{padding:.25rem .75rem}div.sq-collapse.ng-animating[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:none}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetFilters, [{
        type: Component,
        args: [{
                selector: "sq-facet-filters",
                templateUrl: "./facet-filters.html",
                styleUrls: ["./facet-filters.css"]
            }]
    }], function () { return [{ type: i1.FacetService }]; }, { results: [{
            type: Input
        }], facets: [{
            type: Input
        }], enableCustomization: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtZmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZhY2V0LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LWZpbHRlcnMvZmFjZXQtZmlsdGVycy50cyIsImJvb3RzdHJhcC9mYWNldC1maWx0ZXJzL2ZhY2V0LWZpbHRlcnMuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBb0IsTUFBTSxlQUFlLENBQUM7QUFHbEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRWxELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztJQ05yRCw4QkFDSTtJQUFBLG9DQU9pQjtJQUNyQixpQkFBTTs7O0lBUEUsZUFBaUI7SUFBakIsc0NBQWlCLGlDQUFBLHFEQUFBLGlEQUFBLDhCQUFBLHFCQUFBOztBRFd6QixNQUFNLE9BQU8sY0FBYztJQXlCdkIsWUFDWSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQXZCN0Isd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBRTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IseUJBQW9CLEdBQVcsSUFBSSxDQUFDO1FBQ3BDLHVCQUFrQixHQUFXLElBQUksQ0FBQztRQUNsQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUd2QyxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFeEIsZ0JBQVcsR0FBRztZQUNWLEdBQUcsRUFBRTtnQkFDRCxLQUFLLEVBQUUsdUJBQXVCO2dCQUM5QixJQUFJLEVBQUUsYUFBYTthQUN0QjtZQUNELE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsMEJBQTBCO2dCQUNqQyxJQUFJLEVBQUUsY0FBYzthQUN2QjtT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QUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7U0FDckY7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs0RUFwS1EsY0FBYzttREFBZCxjQUFjO1FDYjNCLCtEQVNNOztRQVQwQixrQ0FBYTs7a0REYWhDLGNBQWM7Y0FMMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2FBQ3JDOytEQUVZLE9BQU87a0JBQWYsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLG1CQUFtQjtrQkFBM0IsS0FBSztZQUVHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxvQkFBb0I7a0JBQTVCLEtBQUs7WUFDRyxrQkFBa0I7a0JBQTFCLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UmVzdWx0c30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge0ZhY2V0U2VydmljZX0gZnJvbSBcIi4uLy4uL2ZhY2V0LnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aW9ufSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7RmFjZXRDb25maWd9IGZyb20gJy4uL2ZhY2V0LW11bHRpL2ZhY2V0LW11bHRpLmNvbXBvbmVudCc7XG5pbXBvcnQge0JzRmFjZXRMaXN0fSBmcm9tICcuLi9mYWNldC1saXN0L2ZhY2V0LWxpc3QnO1xuaW1wb3J0IHtCc0ZhY2V0VHJlZX0gZnJvbSAnLi4vZmFjZXQtdHJlZS9mYWNldC10cmVlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtZmFjZXQtZmlsdGVyc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZmFjZXQtZmlsdGVycy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2ZhY2V0LWZpbHRlcnMuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRGaWx0ZXJzIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG4gICAgQElucHV0KCkgZmFjZXRzOiBGYWNldENvbmZpZ1tdO1xuICAgIEBJbnB1dCgpIGVuYWJsZUN1c3RvbWl6YXRpb24gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGF1dG9BZGp1c3Q6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGF1dG9BZGp1c3RCcmVha3BvaW50OiBzdHJpbmcgPSAneGwnO1xuICAgIEBJbnB1dCgpIGNvbGxhcHNlQnJlYWtwb2ludDogc3RyaW5nID0gJ3NtJztcbiAgICBASW5wdXQoKSByaWdodEFsaWduZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmc7XG5cbiAgICBmaWx0ZXJzOiBBY3Rpb25bXSA9IFtdO1xuICAgIGhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZmFjZXRTdGF0dXMgPSB7XG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LmZpbHRlcnMuYWRkXCIsXG4gICAgICAgICAgICBpY29uOiBcImZhcyBmYS1wbHVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiB7XG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQuZmlsdGVycy5yZW1vdmVcIixcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLW1pbnVzXCJcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBmYWNldFNlcnZpY2U6IEZhY2V0U2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbXTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZUN1c3RvbWl6YXRpb24pIHJldHVybjtcblxuICAgICAgICBpZiAoIXRoaXMuZmFjZXRTZXJ2aWNlLmRlZmF1bHRGYWNldHMpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjZXRTZXJ2aWNlLmRlZmF1bHRGYWNldHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGZhY2V0IG9mIHRoaXMuZmFjZXRzKSB0aGlzLmZhY2V0U2VydmljZS5kZWZhdWx0RmFjZXRzLnB1c2goe25hbWU6IGZhY2V0Lm5hbWUsIHBvc2l0aW9uOiAwLCBoaWRkZW46IGZhbHNlLCBleHBhbmRlZDogdHJ1ZSwgdmlldzogXCJcIn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmZhY2V0U2VydmljZS5hbGxGYWNldHMpIHRoaXMuZmFjZXRTZXJ2aWNlLmFsbEZhY2V0cyA9IHRoaXMuZmFjZXRzO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBpZighIXRoaXMucmVzdWx0cylcbiAgICAgICAgICAgIHRoaXMuYnVpbGRGaWx0ZXJzKCk7XG5cbiAgICAgICAgaWYoIXRoaXMucmVzdWx0cylcbiAgICAgICAgICAgIHRoaXMuaGlkZGVuPXRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgZmlsdGVycyBiYXIgYWN0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgYnVpbGRGaWx0ZXJzKCkge1xuXG4gICAgICAgIC8vIEZvciBlYWNoIGZhY2V0XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHRoaXMuZmlsdGVyZWRGYWNldHMubWFwKChmYWNldDogRmFjZXRDb25maWcpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICAgICAgICAgICAgbmV3IEFjdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogKGZhY2V0LnR5cGUgPT09ICdsaXN0JykgPyBCc0ZhY2V0TGlzdCA6IEJzRmFjZXRUcmVlLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnB1dHM6IHtyZXN1bHRzOiB0aGlzLnJlc3VsdHMsIG5hbWU6IGZhY2V0Lm5hbWUsIGFnZ3JlZ2F0aW9uOiBmYWNldC5hZ2dyZWdhdGlvbiwgc2VhcmNoYWJsZTogZmFjZXQuc2VhcmNoYWJsZSwgZGlzcGxheUFjdGlvbnM6IHRydWV9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBmYWNldC5uYW1lLFxuICAgICAgICAgICAgICAgIHRleHQ6IGZhY2V0LnRpdGxlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWNldC50aXRsZSxcbiAgICAgICAgICAgICAgICBpY29uOiBmYWNldC5pY29uLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhdGhpcy5oYXNEYXRhKGZhY2V0KSxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHRoaXMuaGFzRmlsdGVyZWQoZmFjZXQubmFtZSkgPyBcIm1sLTIgZm9udC13ZWlnaHQtYm9sZFwiIDogXCJtbC0yXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGNoaWxkcmVuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlQ3VzdG9taXphdGlvbikgdGhpcy5hZGRGYWNldE1lbnUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2UgdG8gb3V0bGluZSBmYWNldCB3aGVuIGZpbHRlcnMgYXJlIHNldHNcbiAgICAgKiBAcGFyYW0gZmFjZXROYW1lIGZhY2V0IG5hbWVcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgZmlsdGVycyBhcmUgc2V0cyBvdGhlcndpc2UgZmFsc2VcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhc0ZpbHRlcmVkKGZhY2V0TmFtZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mYWNldFNlcnZpY2UuaGFzRmlsdGVyZWQoZmFjZXROYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2UgdG8gZGlzYWJsZSBtZW51IGl0ZW0gd2hlbiBubyBpdGVtcyBpbiBhIGZhY2V0XG4gICAgICogQHBhcmFtIGZhY2V0IGZhY2V0IHRvIGNoZWNrXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIGZhY2V0IGNvbnRhaW5zIGF0IGxlYXN0IG9uZSBpdGVtIG90aGVyd2lzZSBmYWxzZVxuICAgICAqL1xuICAgIHByaXZhdGUgaGFzRGF0YShmYWNldDogRmFjZXRDb25maWcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlLmhhc0RhdGEoZmFjZXQuYWdncmVnYXRpb24sIHRoaXMucmVzdWx0cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRGYWNldE1lbnUoKSB7XG4gICAgICAgIGxldCBvdXRGYWNldHM6IEFjdGlvbltdID0gW107XG5cbiAgICAgICAgb3V0RmFjZXRzLnB1c2gobmV3IEFjdGlvbih7XG4gICAgICAgICAgICBuYW1lOiBgYWRkX3JlbW92ZV9hbGxgLFxuICAgICAgICAgICAgdGV4dDogdGhpcy51c2VyRmFjZXRzLmxlbmd0aCA8IHRoaXMuZmFjZXRzLmxlbmd0aCA/IFwibXNnI2ZhY2V0LmZpbHRlcnMuYWRkQWxsXCIgOiBcIm1zZyNmYWNldC5maWx0ZXJzLnJlbW92ZUFsbFwiLFxuICAgICAgICAgICAgaWNvbjogdGhpcy5oYXNGYWNldFNlbGVjdGVkID8gXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnVzZXJGYWNldHMubGVuZ3RoIDwgdGhpcy5mYWNldHMubGVuZ3RoID8gXCJmYXIgZmEtbWludXMtc3F1YXJlIG1yLTFcIiA6IFwiZmFyIGZhLWNoZWNrLXNxdWFyZSBtci0xXCIpXG4gICAgICAgICAgICAgICAgICAgIDogXCJmYXIgZmEtc3F1YXJlIG1yLTFcIixcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnVzZXJGYWNldHMubGVuZ3RoIDwgdGhpcy5mYWNldHMubGVuZ3RoID8gXCJtc2cjZmFjZXQuZmlsdGVycy5hZGRBbGxcIiA6IFwibXNnI2ZhY2V0LmZpbHRlcnMucmVtb3ZlQWxsXCIsXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNGYWNldFNlbGVjdGVkICYmIHRoaXMudXNlckZhY2V0cy5sZW5ndGggPT09IHRoaXMuZmFjZXRzLmxlbmd0aCkgdGhpcy5mYWNldFNlcnZpY2UucmVtb3ZlQWxsRmFjZXQoKTtcbiAgICAgICAgICAgICAgICBlbHNlIHRoaXMuZmFjZXRTZXJ2aWNlLmFkZEFsbEZhY2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZEZpbHRlcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGZvciAobGV0IGZhY2V0IG9mIHRoaXMuZmFjZXRzKSB7XG4gICAgICAgICAgICBvdXRGYWNldHMucHVzaChuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBgYWRkX3JlbW92ZV8ke2ZhY2V0Lm5hbWV9YCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBmYWNldC50aXRsZSxcbiAgICAgICAgICAgICAgICBpY29uOiBmYWNldC5pY29uLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAhIXRoaXMudXNlckZhY2V0cz8uZmluZCh1c2VyRmFjZXQgPT4gdXNlckZhY2V0Lm5hbWUgPT09IGZhY2V0Lm5hbWUpLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAhIXRoaXMudXNlckZhY2V0cz8uZmluZCh1c2VyRmFjZXQgPT4gdXNlckZhY2V0Lm5hbWUgPT09IGZhY2V0Lm5hbWUpID8gXCJtc2cjZmFjZXQuZmlsdGVycy5hZGRcIiA6IFwibXNnI2ZhY2V0LmZpbHRlcnMucmVtb3ZlXCIsXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJGYWNldHM/LmZpbmQodXNlckZhY2V0ID0+IHVzZXJGYWNldC5uYW1lID09PSBmYWNldC5uYW1lKSkgdGhpcy5mYWNldFNlcnZpY2UucmVtb3ZlRmFjZXQoe25hbWU6IGZhY2V0Lm5hbWUsIHBvc2l0aW9uOiAwLCBoaWRkZW46IGZhbHNlLCBleHBhbmRlZDogdHJ1ZSwgdmlldzogXCJcIn0pXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5mYWNldFNlcnZpY2UuYWRkRmFjZXQoe25hbWU6IGZhY2V0Lm5hbWUsIHBvc2l0aW9uOiAwLCBoaWRkZW46IGZhbHNlLCBleHBhbmRlZDogdHJ1ZSwgdmlldzogXCJcIn0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkRmlsdGVycygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhZGRfYWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICAgICAgICBuYW1lOiBcImZhY2V0c19jb25maWdcIixcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLWNvZ1wiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LmZpbHRlcnMuY3VzdG9taXplRmFjZXRzXCIsXG4gICAgICAgICAgICBjaGlsZHJlbjogb3V0RmFjZXRzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZpbHRlcnMgPSBbYWRkX2FjdGlvbiwgLi4udGhpcy5maWx0ZXJzXTsgXG4gICAgfVxuXG4gICAgZ2V0IGZpbHRlcmVkRmFjZXRzKCkge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlQ3VzdG9taXphdGlvbikgcmV0dXJuIHRoaXMuZmFjZXRzO1xuICAgICAgICBsZXQgbmV3X2ZhY2V0czogRmFjZXRDb25maWdbXSA9IFtdO1xuXG4gICAgICAgIGlmICh0aGlzLnVzZXJGYWNldHMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGZhY2V0IG9mIHRoaXMuZmFjZXRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMudXNlckZhY2V0cy5maW5kSW5kZXgoKHVzZXJGYWNldCkgPT4gdXNlckZhY2V0Lm5hbWUgPT09IGZhY2V0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChwb3MgPj0gMCkgbmV3X2ZhY2V0cy5wdXNoKGZhY2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3X2ZhY2V0cztcbiAgICB9XG5cbiAgICBnZXQgdXNlckZhY2V0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmFjZXRTZXJ2aWNlLmZhY2V0cztcbiAgICB9XG5cbiAgICBnZXQgaGFzRmFjZXRTZWxlY3RlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlckZhY2V0cy5sZW5ndGggPT09IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgZmFjZXQgb2YgdGhpcy5mYWNldHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVzZXJGYWNldHMuZmluZCh1c2VyRmFjZXQgPT4gdXNlckZhY2V0Lm5hbWUgPT09IGZhY2V0Lm5hbWUpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZhY2V0LWZpbHRlcnMtYmFyXCIgKm5nSWY9XCIhaGlkZGVuXCI+XG4gICAgPHNxLWFjdGlvbi1tZW51XG4gICAgICAgIFtpdGVtc109XCJmaWx0ZXJzXCJcbiAgICAgICAgW2F1dG9BZGp1c3RdPVwiYXV0b0FkanVzdFwiXG4gICAgICAgIFthdXRvQWRqdXN0QnJlYWtwb2ludF09XCJhdXRvQWRqdXN0QnJlYWtwb2ludFwiXG4gICAgICAgIFtjb2xsYXBzZUJyZWFrcG9pbnRdPVwiY29sbGFwc2VCcmVha3BvaW50XCJcbiAgICAgICAgW3JpZ2h0XT1cInJpZ2h0QWxpZ25lZFwiXG4gICAgICAgIFtzaXplXT1cInNpemVcIj5cbiAgICA8L3NxLWFjdGlvbi1tZW51PlxuPC9kaXY+XG4iXX0=