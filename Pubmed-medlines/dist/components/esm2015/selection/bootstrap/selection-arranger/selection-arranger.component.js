import { Component, ContentChild, TemplateRef, Input, Output, EventEmitter } from "@angular/core";
import { moveItemInArray } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "../../selection.service";
import * as i3 from "@angular/cdk/drag-drop";
import * as i4 from "@angular/common";
function BsSelectionArranger_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} }
function BsSelectionArranger_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0, a1) { return { $implicit: a0, index: a1 }; };
function BsSelectionArranger_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, BsSelectionArranger_div_1_div_1_Template, 1, 0, "div", 3);
    i0.ɵɵtemplate(2, BsSelectionArranger_div_1_ng_container_2_Template, 1, 0, "ng-container", 4);
    i0.ɵɵelementStart(3, "i", 5);
    i0.ɵɵlistener("click", function BsSelectionArranger_div_1_Template_i_click_3_listener() { i0.ɵɵrestoreView(_r6); const record_r1 = ctx.$implicit; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeRecord(record_r1); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const record_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.recordTpl)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c0, record_r1, i_r2));
} }
export class BsSelectionArranger {
    constructor(searchService, selectionService) {
        this.searchService = searchService;
        this.selectionService = selectionService;
        /**
         * Triggers event when the user moves or removes a record in the list.
         */
        this.change = new EventEmitter();
    }
    getRecords() {
        return this.records || this.selectionService.getSelectedItems();
    }
    dropRecord(event) {
        if (event.isPointerOverContainer) { //https://material.angular.io/cdk/drag-drop/api#CdkDragExit
            if (this.records) {
                moveItemInArray(this.records, event.previousIndex, event.currentIndex); // Reorder the items when item dragged inside the drop zone
            }
            else {
                const record = this.selectionService.getSelectedItems()[event.previousIndex];
                this.selectionService.moveSelectedRecord(record, event.currentIndex);
            }
        }
        else {
            if (this.records) {
                this.records.splice(event.previousIndex, 1);
            }
            else {
                const record = this.selectionService.getSelectedItems()[event.previousIndex];
                this.selectionService.toggleSelectedRecords(record, "selection-arranger");
            }
        }
        this.change.next(this.getRecords());
    }
    removeRecord(record) {
        if (this.records) {
            this.records.splice(this.records.indexOf(record), 1);
        }
        else {
            this.selectionService.toggleSelectedRecords(record, "selection-arranger");
        }
        this.change.next(this.getRecords());
    }
}
BsSelectionArranger.ɵfac = function BsSelectionArranger_Factory(t) { return new (t || BsSelectionArranger)(i0.ɵɵdirectiveInject(i1.SearchService), i0.ɵɵdirectiveInject(i2.SelectionService)); };
BsSelectionArranger.ɵcmp = i0.ɵɵdefineComponent({ type: BsSelectionArranger, selectors: [["sq-selection-arranger"]], contentQueries: function BsSelectionArranger_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.recordTpl = _t.first);
    } }, inputs: { records: "records" }, outputs: { change: "change" }, decls: 2, vars: 1, consts: [["cdkDropList", "", 3, "cdkDropListDropped"], ["class", "card", "cdkDrag", "", 4, "ngFor", "ngForOf"], ["cdkDrag", "", 1, "card"], ["class", "record-placeholder", 4, "cdkDragPlaceholder"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "position-absolute", "fas", "fa-times", "record-close", 3, "click"], [1, "record-placeholder"]], template: function BsSelectionArranger_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("cdkDropListDropped", function BsSelectionArranger_Template_div_cdkDropListDropped_0_listener($event) { return ctx.dropRecord($event); });
        i0.ɵɵtemplate(1, BsSelectionArranger_div_1_Template, 4, 5, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.getRecords());
    } }, directives: [i3.CdkDropList, i4.NgForOf, i3.CdkDrag, i3.CdkDragPlaceholder, i4.NgTemplateOutlet], styles: [".record-close[_ngcontent-%COMP%]{cursor:pointer;right:1rem;top:.25em}.cdk-drag-preview[_ngcontent-%COMP%]{border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);box-sizing:border-box}.cdk-drag-animating[_ngcontent-%COMP%], .record-placeholder[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.record-placeholder[_ngcontent-%COMP%]{background:#ccc;border:3px dotted #999;cursor:move;height:8rem}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSelectionArranger, [{
        type: Component,
        args: [{
                selector: "sq-selection-arranger",
                templateUrl: "./selection-arranger.component.html",
                styleUrls: ["./selection-arranger.component.scss"]
            }]
    }], function () { return [{ type: i1.SearchService }, { type: i2.SelectionService }]; }, { records: [{
            type: Input
        }], recordTpl: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }], change: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLWFycmFuZ2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NlbGVjdGlvbi8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9zZWxlY3Rpb24tYXJyYW5nZXIvc2VsZWN0aW9uLWFycmFuZ2VyLmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9zZWxlY3Rpb24tYXJyYW5nZXIvc2VsZWN0aW9uLWFycmFuZ2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7SUNDOUQseUJBQTBEOzs7SUFDMUQsd0JBQWtHOzs7OztJQUZ0Ryw4QkFDSTtJQUFBLDBFQUEwRDtJQUMxRCw0RkFBa0c7SUFDbEcsNEJBQXNGO0lBQS9CLDhOQUE4QjtJQUFDLGlCQUFJO0lBQzlGLGlCQUFNOzs7OztJQUZhLGVBQTZCO0lBQTdCLG1EQUE2Qix3RUFBQTs7QURRcEQsTUFBTSxPQUFPLG1CQUFtQjtJQWtCNUIsWUFDVyxhQUE0QixFQUM1QixnQkFBa0M7UUFEbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVA3Qzs7V0FFRztRQUNPLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztJQU12RCxDQUFDO0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQTRCO1FBQ25DLElBQUksS0FBSyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsMkRBQTJEO1lBQzNGLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDYixlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLDJEQUEyRDthQUN0STtpQkFDSTtnQkFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFnQixFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNsRjtTQUNKO2FBQ0k7WUFDRCxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvQztpQkFDSTtnQkFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFnQixFQUFFLG9CQUFvQixDQUFDLENBQUM7YUFDdkY7U0FDSjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBYztRQUN2QixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN4RDthQUNJO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQzdFO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7c0ZBMURRLG1CQUFtQjt3REFBbkIsbUJBQW1CO29DQVdkLFdBQVc7Ozs7O1FDdEI3Qiw4QkFDSTtRQURjLDZIQUFzQixzQkFBa0IsSUFBQztRQUN2RCxvRUFJTTtRQUNWLGlCQUFNOztRQUxtQyxlQUFpQjtRQUFqQiwwQ0FBaUI7O2tERFU3QyxtQkFBbUI7Y0FML0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFdBQVcsRUFBRSxxQ0FBcUM7Z0JBQ2xELFNBQVMsRUFBRSxDQUFDLHFDQUFxQyxDQUFDO2FBQ3JEOytGQU9ZLE9BQU87a0JBQWYsS0FBSztZQUtzQyxTQUFTO2tCQUFwRCxZQUFZO21CQUFDLFdBQVcsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFLaEMsTUFBTTtrQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ2RrRHJhZ0Ryb3AsIG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2gnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSwgU2VsZWN0aW9uSXRlbSB9IGZyb20gJy4uLy4uL3NlbGVjdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3Etc2VsZWN0aW9uLWFycmFuZ2VyXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWxlY3Rpb24tYXJyYW5nZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vc2VsZWN0aW9uLWFycmFuZ2VyLmNvbXBvbmVudC5zY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIEJzU2VsZWN0aW9uQXJyYW5nZXIge1xuXG4gICAgLyoqXG4gICAgICogSWYgYSBsaXN0IG9mIHJlY29yZHMgaXMgc3VwcGxpZWQgaXQgaXMgdXNlZCB0byBkaXNwbGF5IGFuZCByZWFycmFuZ2UgdGhlIGxpc3Qgb2YgcmVjb3Jkcy5cbiAgICAgKiBJZiB0aGlzIGxpc3QgaXMgbm90IHN1cHBsaWVkLCB0aGUgU2VsZWN0aW9uU2VydmljZSBsaXN0IG9mIGl0ZW1zIGlzIHVzZWQgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSByZWNvcmRzPzogUmVjb3JkW107XG5cbiAgICAvKipcbiAgICAgKiBBIHRlbXBsYXRlIG11c3QgYmUgcGFzc2VkIGJ5IHRyYW5zY2x1c2lvbiB0byBkaXNwbGF5IGVhY2ggcmVjb3JkIGluIHRoZSBzZWxlY3Rpb25cbiAgICAgKi9cbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7c3RhdGljOiBmYWxzZX0pIHJlY29yZFRwbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGV2ZW50IHdoZW4gdGhlIHVzZXIgbW92ZXMgb3IgcmVtb3ZlcyBhIHJlY29yZCBpbiB0aGUgbGlzdC5cbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTZWxlY3Rpb25JdGVtW10+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBzZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgZ2V0UmVjb3JkcygpOiBTZWxlY3Rpb25JdGVtW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWNvcmRzIHx8IHRoaXMuc2VsZWN0aW9uU2VydmljZS5nZXRTZWxlY3RlZEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgZHJvcFJlY29yZChldmVudDogQ2RrRHJhZ0Ryb3A8c3RyaW5nW10+KSB7XG4gICAgICAgIGlmIChldmVudC5pc1BvaW50ZXJPdmVyQ29udGFpbmVyKSB7IC8vaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2Nkay9kcmFnLWRyb3AvYXBpI0Nka0RyYWdFeGl0XG4gICAgICAgICAgICBpZih0aGlzLnJlY29yZHMpIHtcbiAgICAgICAgICAgICAgICBtb3ZlSXRlbUluQXJyYXkodGhpcy5yZWNvcmRzLCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpOyAvLyBSZW9yZGVyIHRoZSBpdGVtcyB3aGVuIGl0ZW0gZHJhZ2dlZCBpbnNpZGUgdGhlIGRyb3Agem9uZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmdldFNlbGVjdGVkSXRlbXMoKVtldmVudC5wcmV2aW91c0luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UubW92ZVNlbGVjdGVkUmVjb3JkKHJlY29yZCBhcyBSZWNvcmQsIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZih0aGlzLnJlY29yZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlY29yZHMuc3BsaWNlKGV2ZW50LnByZXZpb3VzSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmdldFNlbGVjdGVkSXRlbXMoKVtldmVudC5wcmV2aW91c0luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRSZWNvcmRzKHJlY29yZCBhcyBSZWNvcmQsIFwic2VsZWN0aW9uLWFycmFuZ2VyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlLm5leHQodGhpcy5nZXRSZWNvcmRzKCkpO1xuICAgIH1cblxuICAgIHJlbW92ZVJlY29yZChyZWNvcmQ6IFJlY29yZCkge1xuICAgICAgICBpZih0aGlzLnJlY29yZHMpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb3Jkcy5zcGxpY2UodGhpcy5yZWNvcmRzLmluZGV4T2YocmVjb3JkKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRSZWNvcmRzKHJlY29yZCwgXCJzZWxlY3Rpb24tYXJyYW5nZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2UubmV4dCh0aGlzLmdldFJlY29yZHMoKSk7XG4gICAgfVxufSIsIjxkaXYgY2RrRHJvcExpc3QgIChjZGtEcm9wTGlzdERyb3BwZWQpPVwiZHJvcFJlY29yZCgkZXZlbnQpXCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRcIiAqbmdGb3I9XCJsZXQgcmVjb3JkIG9mIGdldFJlY29yZHMoKTsgbGV0IGk9aW5kZXhcIiBjZGtEcmFnPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVjb3JkLXBsYWNlaG9sZGVyXCIgKmNka0RyYWdQbGFjZWhvbGRlcj48L2Rpdj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInJlY29yZFRwbDsgY29udGV4dDp7JGltcGxpY2l0OiByZWNvcmQsIGluZGV4OiBpfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8aSBjbGFzcz1cInBvc2l0aW9uLWFic29sdXRlIGZhcyBmYS10aW1lcyByZWNvcmQtY2xvc2VcIiAoY2xpY2spPVwicmVtb3ZlUmVjb3JkKHJlY29yZClcIj48L2k+XG4gICAgPC9kaXY+XG48L2Rpdj4iXX0=