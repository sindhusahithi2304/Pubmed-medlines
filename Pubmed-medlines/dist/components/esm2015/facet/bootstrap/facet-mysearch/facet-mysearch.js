import { Component, Input } from "@angular/core";
import { AbstractFacet } from "../../abstract-facet";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/utils";
import * as i4 from "@sinequa/core/intl";
function BsMySearch_ng_container_1_div_1_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵlistener("click", function BsMySearch_ng_container_1_div_1_span_3_Template_span_click_0_listener() { i0.ɵɵrestoreView(_r8); const item_r2 = i0.ɵɵnextContext(2).$implicit; const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.removeItem(item_r2); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#facet.mySearch.itemRemove"));
} }
const _c0 = function (a0) { return { "sq-metadata-border": a0 }; };
const _c1 = function (a0) { return { withFields: a0, asHTML: true }; };
function BsMySearch_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "span", 5);
    i0.ɵɵpipe(2, "sqExpr");
    i0.ɵɵtemplate(3, BsMySearch_ng_container_1_div_1_span_3_Template, 2, 3, "span", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext();
    const i_r3 = ctx_r9.index;
    const item_r2 = ctx_r9.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵclassMapInterpolate1("px-1 ml-1 mb-1 sq-metadata-item sq-metadata-color-", ctx_r4.fields[i_r3], "");
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, ctx_r4.useBadges));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", ctx_r4.fields[i_r3]);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind2(2, 7, item_r2.display, i0.ɵɵpureFunction1(12, _c1, ctx_r4.displayFieldNames)), i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r4.allowDeletion);
} }
function BsMySearch_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsMySearch_ng_container_1_div_1_Template, 4, 14, "div", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !item_r2.hidden);
} }
function BsMySearch_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "hr");
    i0.ɵɵelementStart(2, "i", 8);
    i0.ɵɵlistener("click", function BsMySearch_div_2_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); return ctx_r10.collapsed = !ctx_r10.collapsed; });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassMapInterpolate1("fas fa-chevron-circle-", ctx_r1.collapsed ? "down" : "up", "");
} }
export class BsMySearch extends AbstractFacet {
    constructor(searchService) {
        super();
        this.searchService = searchService;
        /** Display icon to delete items */
        this.allowDeletion = true;
        /** Display each item's field */
        this.displayFieldNames = false;
        /** Make the div collapsible */
        this.collapsible = false;
        /** Add a badge likely style to items */
        this.useBadges = false;
        /** Wether we Ignore text and fielded search */
        this.ignoreText = true;
        /** Items of those facets will be excluded  */
        this.excludedFacets = ["search-form"];
        this.collapsed = false;
        this.items = [];
        this.fields = [];
        this.clearAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.filters.clear",
            action: () => this.clear(),
        });
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (!!changes["results"]) {
            /** Initialize items based on input values */
            this.items = this.ignoreText
                ? ((_a = this.searchService.breadcrumbs) === null || _a === void 0 ? void 0 : _a.items.filter((item) => item.expr && !(item.expr && !item.expr.field && !item.expr.isStructured) && !this.excludedFacets.includes(item.facet))) || []
                : ((_b = this.searchService.breadcrumbs) === null || _b === void 0 ? void 0 : _b.items) || [];
            /** Retrieve the field name of each item */
            this.fields = [];
            for (const item of this.items) {
                this.fields.push(this.getField(item));
            }
        }
    }
    getField(item) {
        if (item.expr) {
            if (item.expr.field) {
                return item.expr.field;
            }
            else {
                if (!item.expr.isStructured) {
                    return "text";
                }
                else {
                    const fields = item.expr.getFields();
                    return fields.join("-");
                }
            }
        }
        return "unknown";
    }
    removeItem(item) {
        this.searchService.removeBreadcrumbsItem(item);
    }
    get isEmpty() {
        return this.items.length === 0;
    }
    get actions() {
        const actions = [];
        if (!this.isEmpty && this.allowDeletion) {
            actions.push(this.clearAction);
        }
        return actions;
    }
    clear() {
        for (const item of this.items) {
            this.searchService.removeBreadcrumbsItem(item);
        }
    }
}
BsMySearch.ɵfac = function BsMySearch_Factory(t) { return new (t || BsMySearch)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsMySearch.ɵcmp = i0.ɵɵdefineComponent({ type: BsMySearch, selectors: [["sq-facet-mysearch"]], inputs: { results: "results", allowDeletion: "allowDeletion", displayFieldNames: "displayFieldNames", collapsible: "collapsible", useBadges: "useBadges", ignoreText: "ignoreText", excludedFacets: "excludedFacets" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 3, vars: 3, consts: [[1, "my-search", "d-flex", "flex-row", "align-items-center", "flex-wrap", 3, "ngClass"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [3, "class", "ngClass", 4, "ngIf"], [3, "ngClass"], [3, "innerHTML", "title"], ["class", "far fa-times-circle pl-1", "role", "button", 3, "title", "click", 4, "ngIf"], ["role", "button", 1, "far", "fa-times-circle", "pl-1", 3, "title", "click"], [3, "click"]], template: function BsMySearch_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsMySearch_ng_container_1_Template, 2, 1, "ng-container", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, BsMySearch_div_2_Template, 3, 3, "div", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", ctx.collapsed ? "collapsed-view" : "expanded-view");
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.items);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.collapsible && !ctx.isEmpty);
    } }, directives: [i2.NgClass, i2.NgForOf, i2.NgIf], pipes: [i3.ExprPipe, i4.MessagePipe], styles: [".my-search[_ngcontent-%COMP%]{font-size:.85rem}.sq-metadata-item[_ngcontent-%COMP%]{background-color:#fff;border-radius:20px;cursor:pointer}.sq-metadata-item[_ngcontent-%COMP%]:hover{background-color:#d3d3d3;opacity:.8}.sq-metadata-item[_ngcontent-%COMP%]   .fa-times-circle[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.8}.sq-metadata-border[_ngcontent-%COMP%]{border:1px solid}.text-decoration-line-through[_ngcontent-%COMP%]{text-decoration:line-through}.collapsed-view[_ngcontent-%COMP%]{height:29px;overflow-y:hidden}.expanded-view[_ngcontent-%COMP%]{height:unset}.fa-chevron-circle-down[_ngcontent-%COMP%], .fa-chevron-circle-up[_ngcontent-%COMP%]{color:#a9a9a9;left:49%;position:relative;top:-5px}.fa-chevron-circle-down[_ngcontent-%COMP%]:hover, .fa-chevron-circle-up[_ngcontent-%COMP%]:hover{cursor:pointer;opacity:.7}hr[_ngcontent-%COMP%]{margin-bottom:0!important;margin-top:0!important;width:30%}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsMySearch, [{
        type: Component,
        args: [{
                selector: "sq-facet-mysearch",
                templateUrl: "./facet-mysearch.html",
                styleUrls: ["./facet-mysearch.scss"],
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { results: [{
            type: Input
        }], allowDeletion: [{
            type: Input
        }], displayFieldNames: [{
            type: Input
        }], collapsible: [{
            type: Input
        }], useBadges: [{
            type: Input
        }], ignoreText: [{
            type: Input
        }], excludedFacets: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtbXlzZWFyY2guanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9mYWNldC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9mYWNldC1teXNlYXJjaC9mYWNldC1teXNlYXJjaC50cyIsImJvb3RzdHJhcC9mYWNldC1teXNlYXJjaC9mYWNldC1teXNlYXJjaC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7OztJQ0t4QywrQkFNQTtJQUZJLHdQQUEwQjs7SUFFOUIsaUJBQU87O0lBREgsd0ZBQXVEOzs7OztJQVovRCw4QkFHSTtJQUFBLDBCQUdPOztJQUNQLGtGQU1PO0lBQ1gsaUJBQU07Ozs7OztJQWJGLHdHQUF1RTtJQUN2RSx1RUFBNkM7SUFHekMsZUFBcUI7SUFBckIsc0RBQXFCO0lBRHJCLDJJQUFpRjtJQUloRixlQUFtQjtJQUFuQiwyQ0FBbUI7OztJQVRoQyw2QkFDSTtJQUFBLDJFQWNNO0lBQ1YsMEJBQWU7OztJQWZMLGVBQWtCO0lBQWxCLHNDQUFrQjs7OztJQWlCaEMsMkJBQ0k7SUFBQSxxQkFDQTtJQUFBLDRCQUFpRztJQUFsQyw4TEFBaUM7SUFBQyxpQkFBSTtJQUN6RyxpQkFBTTs7O0lBREMsZUFBMkQ7SUFBM0QseUZBQTJEOztBRFZsRSxNQUFNLE9BQU8sVUFBVyxTQUFRLGFBQWE7SUFxQnpDLFlBQW1CLGFBQTRCO1FBQzNDLEtBQUssRUFBRSxDQUFDO1FBRE8sa0JBQWEsR0FBYixhQUFhLENBQWU7UUFuQi9DLG1DQUFtQztRQUMxQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUN2QyxnQ0FBZ0M7UUFDdkIsc0JBQWlCLEdBQVksS0FBSyxDQUFD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QUFPLENBQUM7SUFDbkIsQ0FBQztJQUVTLEtBQUs7UUFDWCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7O29FQXRGUSxVQUFVOytDQUFWLFVBQVU7UUNYdkIsOEJBQ0k7UUFBQSw2RUFnQmU7UUFDbkIsaUJBQU07UUFDTiwyREFHTTs7UUF0QjhELDRFQUEwRDtRQUMzRixlQUFVO1FBQVYsbUNBQVU7UUFrQnZDLGVBQTZCO1FBQTdCLHNEQUE2Qjs7a0REUnRCLFVBQVU7Y0FMdEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFdBQVcsRUFBRSx1QkFBdUI7Z0JBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZDO2dFQUVZLE9BQU87a0JBQWYsS0FBSztZQUVHLGFBQWE7a0JBQXJCLEtBQUs7WUFFRyxpQkFBaUI7a0JBQXpCLEtBQUs7WUFFRyxXQUFXO2tCQUFuQixLQUFLO1lBRUcsU0FBUztrQkFBakIsS0FBSztZQUVHLFVBQVU7a0JBQWxCLEtBQUs7WUFFRyxjQUFjO2tCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJlc3VsdHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UsIEJyZWFkY3J1bWJzSXRlbSB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RGYWNldCB9IGZyb20gXCIuLi8uLi9hYnN0cmFjdC1mYWNldFwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWZhY2V0LW15c2VhcmNoXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9mYWNldC1teXNlYXJjaC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL2ZhY2V0LW15c2VhcmNoLnNjc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIEJzTXlTZWFyY2ggZXh0ZW5kcyBBYnN0cmFjdEZhY2V0IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICAgIC8qKiBEaXNwbGF5IGljb24gdG8gZGVsZXRlIGl0ZW1zICovXG4gICAgQElucHV0KCkgYWxsb3dEZWxldGlvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqIERpc3BsYXkgZWFjaCBpdGVtJ3MgZmllbGQgKi9cbiAgICBASW5wdXQoKSBkaXNwbGF5RmllbGROYW1lczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKiBNYWtlIHRoZSBkaXYgY29sbGFwc2libGUgKi9cbiAgICBASW5wdXQoKSBjb2xsYXBzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKiBBZGQgYSBiYWRnZSBsaWtlbHkgc3R5bGUgdG8gaXRlbXMgKi9cbiAgICBASW5wdXQoKSB1c2VCYWRnZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKiogV2V0aGVyIHdlIElnbm9yZSB0ZXh0IGFuZCBmaWVsZGVkIHNlYXJjaCAqL1xuICAgIEBJbnB1dCgpIGlnbm9yZVRleHQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKiBJdGVtcyBvZiB0aG9zZSBmYWNldHMgd2lsbCBiZSBleGNsdWRlZCAgKi9cbiAgICBASW5wdXQoKSBleGNsdWRlZEZhY2V0czogKHN0cmluZyB8IHVuZGVmaW5lZClbXSA9IFtcInNlYXJjaC1mb3JtXCJdO1xuXG5cbiAgICBjb2xsYXBzZWQgPSBmYWxzZTtcbiAgICBjbGVhckFjdGlvbjogQWN0aW9uO1xuICAgIGl0ZW1zOiBCcmVhZGNydW1ic0l0ZW1bXSA9IFtdO1xuICAgIGZpZWxkczogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXIgZmEtbWludXMtc3F1YXJlXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQuZmlsdGVycy5jbGVhclwiLFxuICAgICAgICAgICAgYWN0aW9uOiAoKSA9PiB0aGlzLmNsZWFyKCksXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCEhY2hhbmdlc1tcInJlc3VsdHNcIl0pIHtcbiAgICAgICAgICAgIC8qKiBJbml0aWFsaXplIGl0ZW1zIGJhc2VkIG9uIGlucHV0IHZhbHVlcyAqL1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaWdub3JlVGV4dFxuICAgICAgICAgICAgICAgID8gdGhpcy5zZWFyY2hTZXJ2aWNlLmJyZWFkY3J1bWJzPy5pdGVtcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXRlbTogQnJlYWRjcnVtYnNJdGVtKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZXhwciAmJiAhKGl0ZW0uZXhwciAmJiAhaXRlbS5leHByLmZpZWxkICYmICFpdGVtLmV4cHIuaXNTdHJ1Y3R1cmVkKSAmJiAhdGhpcy5leGNsdWRlZEZhY2V0cy5pbmNsdWRlcyhpdGVtLmZhY2V0KVxuICAgICAgICAgICAgICAgICAgICApIHx8IFtdXG4gICAgICAgICAgICAgICAgOiB0aGlzLnNlYXJjaFNlcnZpY2UuYnJlYWRjcnVtYnM/Lml0ZW1zIHx8IFtdO1xuXG4gICAgICAgICAgICAvKiogUmV0cmlldmUgdGhlIGZpZWxkIG5hbWUgb2YgZWFjaCBpdGVtICovXG4gICAgICAgICAgICB0aGlzLmZpZWxkcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKHRoaXMuZ2V0RmllbGQoaXRlbSkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRGaWVsZChpdGVtOiBCcmVhZGNydW1ic0l0ZW0pOiBzdHJpbmcge1xuICAgICAgICBpZiAoaXRlbS5leHByKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5leHByLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZXhwci5maWVsZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmV4cHIuaXNTdHJ1Y3R1cmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZHMgPSBpdGVtLmV4cHIuZ2V0RmllbGRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZHMuam9pbihcIi1cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcInVua25vd25cIjtcbiAgICB9XG5cbiAgICByZW1vdmVJdGVtKGl0ZW06IEJyZWFkY3J1bWJzSXRlbSkge1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucmVtb3ZlQnJlYWRjcnVtYnNJdGVtKGl0ZW0pO1xuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgICAgICBjb25zdCBhY3Rpb25zOiBBY3Rpb25bXSA9IFtdO1xuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSAmJiB0aGlzLmFsbG93RGVsZXRpb24pIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmNsZWFyQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xlYXIoKSB7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucmVtb3ZlQnJlYWRjcnVtYnNJdGVtKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiPGRpdiBjbGFzcz1cIm15LXNlYXJjaCBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGZsZXgtd3JhcFwiIFtuZ0NsYXNzXT1cImNvbGxhcHNlZCA/ICdjb2xsYXBzZWQtdmlldycgOiAnZXhwYW5kZWQtdmlldydcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBpbmRleCBhcyBpXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCIhaXRlbS5oaWRkZW5cIlxuICAgICAgICAgICAgY2xhc3M9XCJweC0xIG1sLTEgbWItMSBzcS1tZXRhZGF0YS1pdGVtIHNxLW1ldGFkYXRhLWNvbG9yLXt7ZmllbGRzW2ldfX1cIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydzcS1tZXRhZGF0YS1ib3JkZXInOiB1c2VCYWRnZXN9XCI+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiaXRlbS5kaXNwbGF5IHwgc3FFeHByOnt3aXRoRmllbGRzOiBkaXNwbGF5RmllbGROYW1lcywgYXNIVE1MOiB0cnVlfVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJ7e2ZpZWxkc1tpXX19XCI+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICpuZ0lmPVwiYWxsb3dEZWxldGlvblwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmYXIgZmEtdGltZXMtY2lyY2xlIHBsLTFcIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJyZW1vdmVJdGVtKGl0ZW0pXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cInt7J21zZyNmYWNldC5teVNlYXJjaC5pdGVtUmVtb3ZlJyB8IHNxTWVzc2FnZX19XCI+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG48ZGl2ICpuZ0lmPVwiY29sbGFwc2libGUgJiYgIWlzRW1wdHlcIj5cbiAgICA8aHI+XG4gICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hldnJvbi1jaXJjbGUte3tjb2xsYXBzZWQgPyAnZG93bicgOiAndXAnfX1cIiAoY2xpY2spPVwiY29sbGFwc2VkID0gIWNvbGxhcHNlZDtcIj48L2k+XG48L2Rpdj5cbiJdfQ==