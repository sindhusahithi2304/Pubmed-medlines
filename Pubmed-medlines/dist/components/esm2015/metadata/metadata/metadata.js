import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@angular/common";
import * as i4 from "../metadata-item/metadata-item";
import * as i5 from "@sinequa/core/intl";
function Metadata_sq_metadata_item_0_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#metadata.item.separator"));
} }
function Metadata_sq_metadata_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "sq-metadata-item", 1);
    i0.ɵɵlistener("select", function Metadata_sq_metadata_item_0_Template_sq_metadata_item_select_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.select($event.item, $event.valueItem); });
    i0.ɵɵtemplate(1, Metadata_sq_metadata_item_0_span_1_Template, 3, 3, "span", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const $index_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("record", ctx_r0.record)("item", item_r1)("showTitle", ctx_r0.showTitles)("showIcon", ctx_r0.showIcons)("showCounts", ctx_r0.showCounts)("clickable", ctx_r0.clickable)("tabular", ctx_r0.tabular)("collapseRows", ctx_r0.collapseRows);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.tabular && $index_r2 < ctx_r0.items.length - 1);
} }
export class Metadata {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
        this.showTitles = true;
        this.showIcons = false;
        this.showCounts = true;
        this.clickable = true;
        this.tabular = true;
        this.collapseRows = true;
        this.searchOnClick = true;
        this._select = new EventEmitter();
    }
    select(item, valueItem) {
        if (this.searchOnClick) {
            this.searchService.addFieldSelect(item, valueItem);
            this.searchService.search();
        }
        this._select.emit({ item: item, valueItem: valueItem });
    }
}
Metadata.ɵfac = function Metadata_Factory(t) { return new (t || Metadata)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SearchService)); };
Metadata.ɵcmp = i0.ɵɵdefineComponent({ type: Metadata, selectors: [["sq-metadata"]], hostVars: 2, hostBindings: function Metadata_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("sq-tabular", ctx.tabular);
    } }, inputs: { record: "record", items: "items", showTitles: "showTitles", showIcons: "showIcons", showCounts: "showCounts", clickable: "clickable", tabular: "tabular", collapseRows: "collapseRows", searchOnClick: "searchOnClick" }, outputs: { _select: "select" }, decls: 1, vars: 1, consts: [[3, "record", "item", "showTitle", "showIcon", "showCounts", "clickable", "tabular", "collapseRows", "select", 4, "ngFor", "ngForOf"], [3, "record", "item", "showTitle", "showIcon", "showCounts", "clickable", "tabular", "collapseRows", "select"], ["class", "ml-1 mr-2", 4, "ngIf"], [1, "ml-1", "mr-2"]], template: function Metadata_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, Metadata_sq_metadata_item_0_Template, 2, 9, "sq-metadata-item", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.items);
    } }, directives: [i3.NgForOf, i4.MetadataItem, i3.NgIf], pipes: [i5.MessagePipe], styles: [".sq-tabular[_nghost-%COMP%]{display:table}.sq-tabular[_nghost-%COMP%]   sq-metadata-item[_ngcontent-%COMP%]{display:table-row-group}[_nghost-%COMP%]:not(.sq-tabular){display:block}[_nghost-%COMP%]:not(.sq-tabular)   sq-metadata-item[_ngcontent-%COMP%]{display:inline}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Metadata, [{
        type: Component,
        args: [{
                selector: "sq-metadata",
                templateUrl: "./metadata.html",
                styleUrls: ["./metadata.scss"]
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }]; }, { record: [{
            type: Input
        }], items: [{
            type: Input
        }], showTitles: [{
            type: Input
        }], showIcons: [{
            type: Input
        }], showCounts: [{
            type: Input
        }], clickable: [{
            type: Input
        }], tabular: [{
            type: HostBinding,
            args: ["class.sq-tabular"]
        }, {
            type: Input
        }], collapseRows: [{
            type: Input
        }], searchOnClick: [{
            type: Input
        }], _select: [{
            type: Output,
            args: ["select"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tZXRhZGF0YS8iLCJzb3VyY2VzIjpbIm1ldGFkYXRhL21ldGFkYXRhLnRzIiwibWV0YWRhdGEvbWV0YWRhdGEuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7SUNVOUUsK0JBQXNFO0lBQUEsWUFBNkM7O0lBQUEsaUJBQU87O0lBQXBELGVBQTZDO0lBQTdDLHlFQUE2Qzs7OztJQVZ2SCwyQ0FVSTtJQVBBLG9PQUFnRDtJQU9oRCw4RUFBMEg7SUFDOUgsaUJBQW1COzs7OztJQVZmLHNDQUFpQixpQkFBQSxnQ0FBQSw4QkFBQSxpQ0FBQSwrQkFBQSwyQkFBQSxxQ0FBQTtJQVNWLGVBQTJDO0lBQTNDLDZFQUEyQzs7QURBdEQsTUFBTSxPQUFPLFFBQVE7SUFhakIsWUFDVyxVQUFzQixFQUN0QixhQUE0QjtRQUQ1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBWjlCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQVksSUFBSSxDQUFDO1FBQzNCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDTyxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3pELGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRXJCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBd0MsQ0FBQztJQUtyRixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxTQUFvQjtRQUNyQyxJQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Z0VBeEJRLFFBQVE7NkNBQVIsUUFBUTs7O1FDVnJCLG1GQVdtQjs7UUFYZ0IsbUNBQVU7O2tERFVoQyxRQUFRO2NBTHBCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDakM7eUZBRVksTUFBTTtrQkFBZCxLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNvQyxPQUFPO2tCQUFoRCxXQUFXO21CQUFDLGtCQUFrQjs7a0JBQUcsS0FBSztZQUM5QixZQUFZO2tCQUFwQixLQUFLO1lBQ0csYUFBYTtrQkFBckIsS0FBSztZQUVZLE9BQU87a0JBQXhCLE1BQU07bUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7QXBwU2VydmljZSwgVmFsdWVJdGVtfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7UmVjb3JkfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtbWV0YWRhdGFcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21ldGFkYXRhLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbWV0YWRhdGEuc2Nzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YSB7XG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XG4gICAgQElucHV0KCkgaXRlbXM6IHN0cmluZ1tdO1xuICAgIEBJbnB1dCgpIHNob3dUaXRsZXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dJY29uczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dDb3VudHM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGNsaWNrYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3Muc3EtdGFidWxhclwiKSBASW5wdXQoKSB0YWJ1bGFyOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBjb2xsYXBzZVJvd3M6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNlYXJjaE9uQ2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBPdXRwdXQoXCJzZWxlY3RcIikgX3NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8e2l0ZW06IHN0cmluZywgdmFsdWVJdGVtOiBWYWx1ZUl0ZW19PigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLCBcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogc3RyaW5nLCB2YWx1ZUl0ZW06IFZhbHVlSXRlbSkge1xuICAgICAgICBpZih0aGlzLnNlYXJjaE9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5hZGRGaWVsZFNlbGVjdChpdGVtLCB2YWx1ZUl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbGVjdC5lbWl0KHtpdGVtOiBpdGVtLCB2YWx1ZUl0ZW06IHZhbHVlSXRlbX0pO1xuICAgIH1cbn0iLCI8c3EtbWV0YWRhdGEtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0ICRpbmRleCA9IGluZGV4XCJcclxuICAgIFtyZWNvcmRdPVwicmVjb3JkXCJcclxuICAgIFtpdGVtXT1cIml0ZW1cIlxyXG4gICAgKHNlbGVjdCk9XCJzZWxlY3QoJGV2ZW50Lml0ZW0sICRldmVudC52YWx1ZUl0ZW0pXCJcclxuICAgIFtzaG93VGl0bGVdPVwic2hvd1RpdGxlc1wiXHJcbiAgICBbc2hvd0ljb25dPVwic2hvd0ljb25zXCJcclxuICAgIFtzaG93Q291bnRzXT1cInNob3dDb3VudHNcIlxyXG4gICAgW2NsaWNrYWJsZV09XCJjbGlja2FibGVcIlxyXG4gICAgW3RhYnVsYXJdPVwidGFidWxhclwiXHJcbiAgICBbY29sbGFwc2VSb3dzXT1cImNvbGxhcHNlUm93c1wiPlxyXG4gICAgPHNwYW4gKm5nSWY9XCIhdGFidWxhciAmJiAkaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxXCIgY2xhc3M9XCJtbC0xIG1yLTJcIj57eydtc2cjbWV0YWRhdGEuaXRlbS5zZXBhcmF0b3InIHwgc3FNZXNzYWdlfX08L3NwYW4+XHJcbjwvc3EtbWV0YWRhdGEtaXRlbT5cclxuIl19