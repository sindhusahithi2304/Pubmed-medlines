import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
import * as i4 from "@sinequa/components/utils";
const _c0 = function (a0, a1) { return { "active": a0, "disabled": a1 }; };
function BsTabs_ul_0_ng_container_1_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 4);
    i0.ɵɵelementStart(1, "a", 5);
    i0.ɵɵlistener("click", function BsTabs_ul_0_ng_container_1_li_1_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r6); const tab_r4 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(3); return ctx_r5.selectTab(tab_r4); });
    i0.ɵɵelement(2, "i", 6);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵelementStart(5, "span", 7);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "sqNumber");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(8, _c0, tab_r4 == ctx_r3.currentTab, tab_r4.count == 0));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r3.iconMap[tab_r4.name]);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 4, tab_r4.display || tab_r4.name), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(7, 6, tab_r4.count), ")");
} }
function BsTabs_ul_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsTabs_ul_0_ng_container_1_li_1_Template, 8, 11, "li", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r1.searchtabs);
} }
function BsTabs_ul_0_ng_container_2_li_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqNumber");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind1(2, 1, tab_r8.count), ")");
} }
function BsTabs_ul_0_ng_container_2_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 4);
    i0.ɵɵelementStart(1, "a", 5);
    i0.ɵɵlistener("click", function BsTabs_ul_0_ng_container_2_li_1_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r12); const tab_r8 = ctx.$implicit; const ctx_r11 = i0.ɵɵnextContext(3); return ctx_r11.selectTab(tab_r8, false); });
    i0.ɵɵelement(2, "i", 6);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "sqMessage");
    i0.ɵɵtemplate(5, BsTabs_ul_0_ng_container_2_li_1_span_5_Template, 3, 3, "span", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tab_r8 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(6, _c0, tab_r8 == ctx_r7.currentTab, tab_r8.count == 0));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r7.iconMap[tab_r8.name]);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(4, 4, tab_r8.display || tab_r8.name), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", tab_r8.count >= 0);
} }
function BsTabs_ul_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, BsTabs_ul_0_ng_container_2_li_1_Template, 6, 9, "li", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.customtabs);
} }
function BsTabs_ul_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 1);
    i0.ɵɵtemplate(1, BsTabs_ul_0_ng_container_1_Template, 2, 1, "ng-container", 2);
    i0.ɵɵtemplate(2, BsTabs_ul_0_ng_container_2_Template, 2, 1, "ng-container", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r0.searchtabs);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r0.customtabs);
} }
export class BsTabs {
    constructor(searchService) {
        this.searchService = searchService;
        /**
         * Associate icon to a tab name ({tab1 : 'icon class 1', tab2 : ...})
         */
        this.iconMap = {};
        /**
         * Emits an event when a tab is selected
         */
        this.events = new EventEmitter();
    }
    update() {
        if (this.results && this.results.tabs) {
            this.currentTab = this.searchService.getCurrentTab();
            this.searchtabs = this.results.tabs;
        }
        else {
            this.currentTab = undefined;
            this.searchtabs = undefined;
        }
    }
    ngOnChanges(changes) {
        if (!!changes["results"]) {
            this.update();
        }
    }
    selectTab(tab, search = true) {
        if (tab !== this.currentTab) {
            if (search) {
                this.searchService.selectTab(tab); // the currentTab will be updated in update()
            }
            else {
                this.currentTab = tab;
            }
            this.events.next(tab);
        }
        return false; // Stop following href
    }
}
BsTabs.ɵfac = function BsTabs_Factory(t) { return new (t || BsTabs)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsTabs.ɵcmp = i0.ɵɵdefineComponent({ type: BsTabs, selectors: [["sq-tabs"]], inputs: { results: "results", customtabs: "customtabs", iconMap: "iconMap" }, outputs: { events: "events" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "nav nav-tabs mb-1", 4, "ngIf"], [1, "nav", "nav-tabs", "mb-1"], [4, "ngIf"], ["class", "nav-item", 4, "ngFor", "ngForOf"], [1, "nav-item"], ["href", "#", 1, "nav-link", 3, "ngClass", "click"], [3, "ngClass"], [1, "count"], ["class", "count", 4, "ngIf"]], template: function BsTabs_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsTabs_ul_0_Template, 3, 2, "ul", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.searchtabs || !!ctx.customtabs);
    } }, directives: [i2.NgIf, i2.NgForOf, i2.NgClass], pipes: [i3.MessagePipe, i4.NumberPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsTabs, [{
        type: Component,
        args: [{
                selector: "sq-tabs",
                templateUrl: "./tabs.html"
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { results: [{
            type: Input
        }], customtabs: [{
            type: Input
        }], iconMap: [{
            type: Input
        }], events: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NlYXJjaC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC90YWJzL3RhYnMudHMiLCJib290c3RyYXAvdGFicy90YWJzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUE0QixZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQ0V2Riw2QkFDSTtJQUFBLDRCQUNJO0lBRGdHLDROQUF3QjtJQUN4SCx1QkFBcUM7SUFDckMsWUFDQTs7SUFBQSwrQkFBb0I7SUFBQSxZQUEwQjs7SUFBQSxpQkFBTztJQUN6RCxpQkFBSTtJQUNSLGlCQUFLOzs7O0lBTDRCLGVBQXNFO0lBQXRFLG9HQUFzRTtJQUM1RixlQUE2QjtJQUE3QixxREFBNkI7SUFDaEMsZUFDQTtJQURBLG9GQUNBO0lBQW9CLGVBQTBCO0lBQTFCLG1FQUEwQjs7O0lBTDFELDZCQUNJO0lBQUEsMEVBTUs7SUFDVCwwQkFBZTs7O0lBUFMsZUFBYTtJQUFiLDJDQUFhOzs7SUFhekIsK0JBQTJDO0lBQUEsWUFBMEI7O0lBQUEsaUJBQU87OztJQUFqQyxlQUEwQjtJQUExQixtRUFBMEI7Ozs7SUFKN0UsNkJBQ0k7SUFBQSw0QkFDSTtJQURnRyw0TkFBd0IsS0FBSyxLQUFFO0lBQy9ILHVCQUFxQztJQUNyQyxZQUNBOztJQUFBLGtGQUE0RTtJQUNoRixpQkFBSTtJQUNSLGlCQUFLOzs7O0lBTDRCLGVBQXNFO0lBQXRFLG9HQUFzRTtJQUM1RixlQUE2QjtJQUE3QixxREFBNkI7SUFDaEMsZUFDQTtJQURBLG9GQUNBO0lBQXFCLGVBQW9CO0lBQXBCLHdDQUFvQjs7O0lBTHJELDZCQUNJO0lBQUEseUVBTUs7SUFDVCwwQkFBZTs7O0lBUFMsZUFBYTtJQUFiLDJDQUFhOzs7SUFYekMsNkJBQ0k7SUFBQSw4RUFRZTtJQUNmLDhFQVFlO0lBQ25CLGlCQUFLOzs7SUFsQmMsZUFBa0I7SUFBbEIsMENBQWtCO0lBU2xCLGVBQWtCO0lBQWxCLDBDQUFrQjs7QURGckMsTUFBTSxPQUFPLE1BQU07SUE0QmYsWUFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWR4Qzs7V0FFRztRQUNNLFlBQU8sR0FBNEIsRUFBRSxDQUFDO1FBRS9DOztXQUVHO1FBQ08sV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFPM0MsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDdkM7YUFDSTtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxHQUFRLEVBQUUsTUFBTSxHQUFHLElBQUk7UUFDN0IsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN6QixJQUFHLE1BQU0sRUFBQztnQkFDTixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUE2QzthQUNuRjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN6QjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBRyxzQkFBc0I7SUFDMUMsQ0FBQzs7NERBM0RRLE1BQU07MkNBQU4sTUFBTTtRQ1JuQixxREFtQks7O1FBbkJBLDJEQUFrQzs7a0REUTFCLE1BQU07Y0FKbEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUsYUFBYTthQUM3QjtnRUFHWSxPQUFPO2tCQUFmLEtBQUs7WUFXRyxVQUFVO2tCQUFsQixLQUFLO1lBS0csT0FBTztrQkFBZixLQUFLO1lBS0ksTUFBTTtrQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZXN1bHRzLCBUYWJ9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VhcmNoLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtdGFic1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vdGFicy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNUYWJzIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHJlc3VsdHM6IFJlc3VsdHM7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGN1c3RvbSB0YWJzIChjb21wbGVtZW50aW5nIHRoZSBzZWFyY2ggcXVlcnkgdGFicylcbiAgICAgKiBBY3Rpb25zIGNhbiBiZSBwZXJmb3JtZWQgb24gY2xpY2sgdmlhIHRoZSBldmVudHMgT3V0cHV0LlxuICAgICAqXG4gICAgICogV2hlbiB0aGUgcmVzdWx0cyBhcmUgdXBkYXRlZCAobmV3IHNlYXJjaCB0ZXh0LCBmYWNldFxuICAgICAqIHNlbGVjdGlvbi4uLiksIHRoZSBjdXN0b20gdGFiIHNlbGVjdGlvbiBpcyBkaXNjYXJkZWQuXG4gICAgICogSWYgdGhlIGN1c3RvbSBhY3Rpb24gdXBkYXRlcyB0aGUgcmVzdWx0cywgdGhlIHRhYiBzZWxlY3Rpb25cbiAgICAgKiB3aWxsIHJldmVydCB0byBwcmV2aW91cyBzdGF0ZSB1bmxlc3MgdGhlIHF1ZXJ5IGlzIHVwZGF0ZWQuXG4gICAgICovXG4gICAgQElucHV0KCkgY3VzdG9tdGFiczogVGFiW107XG5cbiAgICAvKipcbiAgICAgKiBBc3NvY2lhdGUgaWNvbiB0byBhIHRhYiBuYW1lICh7dGFiMSA6ICdpY29uIGNsYXNzIDEnLCB0YWIyIDogLi4ufSlcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpY29uTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiBhIHRhYiBpcyBzZWxlY3RlZFxuICAgICAqL1xuICAgIEBPdXRwdXQoKSBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPFRhYj4oKTtcblxuICAgIGN1cnJlbnRUYWI6IFRhYiB8IHVuZGVmaW5lZDtcbiAgICBzZWFyY2h0YWJzOiBUYWJbXSB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdHMgJiYgdGhpcy5yZXN1bHRzLnRhYnMpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhYiA9IHRoaXMuc2VhcmNoU2VydmljZS5nZXRDdXJyZW50VGFiKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaHRhYnMgPSB0aGlzLnJlc3VsdHMudGFicztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhYiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNodGFicyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCEhY2hhbmdlc1tcInJlc3VsdHNcIl0pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RUYWIodGFiOiBUYWIsIHNlYXJjaCA9IHRydWUpIHtcbiAgICAgICAgaWYgKHRhYiAhPT0gdGhpcy5jdXJyZW50VGFiKSB7XG4gICAgICAgICAgICBpZihzZWFyY2gpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWxlY3RUYWIodGFiKTsgLy8gdGhlIGN1cnJlbnRUYWIgd2lsbCBiZSB1cGRhdGVkIGluIHVwZGF0ZSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRhYiA9IHRhYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQodGFiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7ICAgLy8gU3RvcCBmb2xsb3dpbmcgaHJlZlxuICAgIH1cbn0iLCI8dWwgKm5nSWY9XCIhIXNlYXJjaHRhYnMgfHwgISFjdXN0b210YWJzXCIgY2xhc3M9XCJuYXYgbmF2LXRhYnMgbWItMVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhIXNlYXJjaHRhYnNcIj5cbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCB0YWIgb2Ygc2VhcmNodGFic1wiIGNsYXNzPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuYXYtbGlua1wiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJyA6IHRhYiA9PSBjdXJyZW50VGFiLCAnZGlzYWJsZWQnOiB0YWIuY291bnQgPT0gMH1cIiAoY2xpY2spPVwic2VsZWN0VGFiKHRhYilcIj5cbiAgICAgICAgICAgICAgICA8aSBbbmdDbGFzc109XCJpY29uTWFwW3RhYi5uYW1lXVwiPjwvaT5cbiAgICAgICAgICAgICAgICB7eyh0YWIuZGlzcGxheSB8fCB0YWIubmFtZSkgfCBzcU1lc3NhZ2V9fSBcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvdW50XCI+KHt7dGFiLmNvdW50IHwgc3FOdW1iZXJ9fSk8L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhY3VzdG9tdGFic1wiPlxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHRhYiBvZiBjdXN0b210YWJzXCIgY2xhc3M9XCJuYXYtaXRlbVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cIm5hdi1saW5rXCIgW25nQ2xhc3NdPVwieydhY3RpdmUnIDogdGFiID09IGN1cnJlbnRUYWIsICdkaXNhYmxlZCc6IHRhYi5jb3VudCA9PSAwfVwiIChjbGljayk9XCJzZWxlY3RUYWIodGFiLCBmYWxzZSlcIj5cbiAgICAgICAgICAgICAgICA8aSBbbmdDbGFzc109XCJpY29uTWFwW3RhYi5uYW1lXVwiPjwvaT5cbiAgICAgICAgICAgICAgICB7eyh0YWIuZGlzcGxheSB8fCB0YWIubmFtZSkgfCBzcU1lc3NhZ2V9fVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY291bnRcIiAqbmdJZj1cInRhYi5jb3VudCA+PSAwXCI+KHt7dGFiLmNvdW50IHwgc3FOdW1iZXJ9fSk8L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbGk+XG4gICAgPC9uZy1jb250YWluZXI+XG48L3VsPiJdfQ==