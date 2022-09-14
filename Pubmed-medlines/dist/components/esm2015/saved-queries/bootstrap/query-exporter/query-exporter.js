import { Component, Input } from '@angular/core';
import { ExportSourceType } from "@sinequa/core/web-services";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/selection";
import * as i2 from "../../saved-queries.service";
import * as i3 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
/**
 * Toolbar component for Export query feature.
 *
 */
export class BsQueryExporter {
    constructor(selectionService, savedQueriesService) {
        this.selectionService = selectionService;
        this.savedQueriesService = savedQueriesService;
        this.exportAction = new Action({
            icon: 'fas fa-download',
            title: 'msg#exportQuery.btnTitle',
            action: (item, event) => {
                this.export();
            }
        });
    }
    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    hasSelectedRecords() {
        return this.selectionService.haveSelectedRecords;
    }
    /**
     * Generic export function.
     * <p>
     * Opens up a dialog to let user choose the export source, export format and other parameters.
     *
     * @memberof QueryExporter
     */
    export() {
        this.savedQueriesService.exportModal(this.hasSelectedRecords() ? ExportSourceType.Selection : ExportSourceType.Result);
    }
}
BsQueryExporter.ɵfac = function BsQueryExporter_Factory(t) { return new (t || BsQueryExporter)(i0.ɵɵdirectiveInject(i1.SelectionService), i0.ɵɵdirectiveInject(i2.SavedQueriesService)); };
BsQueryExporter.ɵcmp = i0.ɵɵdefineComponent({ type: BsQueryExporter, selectors: [["sq-query-exporter"]], inputs: { results: "results", rightAligned: "rightAligned" }, decls: 1, vars: 6, consts: [[3, "sq-action-buttons"]], template: function BsQueryExporter_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction2(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx.exportAction), ctx.rightAligned));
    } }, directives: [i3.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsQueryExporter, [{
        type: Component,
        args: [{
                selector: 'sq-query-exporter',
                templateUrl: './query-exporter.html'
            }]
    }], function () { return [{ type: i1.SelectionService }, { type: i2.SavedQueriesService }]; }, { results: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktZXhwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zYXZlZC1xdWVyaWVzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3F1ZXJ5LWV4cG9ydGVyL3F1ZXJ5LWV4cG9ydGVyLnRzIiwiYm9vdHN0cmFwL3F1ZXJ5LWV4cG9ydGVyL3F1ZXJ5LWV4cG9ydGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFXLGdCQUFnQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHdkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBSXBEOzs7R0FHRztBQUtILE1BQU0sT0FBTyxlQUFlO0lBT3hCLFlBQ1ksZ0JBQWtDLEVBQ2xDLG1CQUF3QztRQUR4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFFaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQztZQUMzQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLEtBQUssRUFBRSwwQkFBMEI7WUFDakMsTUFBTSxFQUFFLENBQUMsSUFBWSxFQUFFLEtBQVksRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksa0JBQWtCO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxNQUFNO1FBRVQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FDaEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUYsQ0FBQzs7OEVBekNRLGVBQWU7b0RBQWYsZUFBZTtRQ2hCNUIseUJBS007O1FBTEQsOEhBSUM7O2tERFlPLGVBQWU7Y0FKM0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFdBQVcsRUFBRSx1QkFBdUI7YUFDdkM7cUdBR1ksT0FBTztrQkFBZixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc3VsdHMsIEV4cG9ydFNvdXJjZVR5cGUgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7IFNhdmVkUXVlcmllc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2F2ZWQtcXVlcmllcy5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VsZWN0aW9uXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcblxuXG5cbi8qKlxuICogVG9vbGJhciBjb21wb25lbnQgZm9yIEV4cG9ydCBxdWVyeSBmZWF0dXJlLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzcS1xdWVyeS1leHBvcnRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3F1ZXJ5LWV4cG9ydGVyLmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEJzUXVlcnlFeHBvcnRlciB7XG5cbiAgICBASW5wdXQoKSByZXN1bHRzOiBSZXN1bHRzO1xuICAgIEBJbnB1dCgpIHJpZ2h0QWxpZ25lZDogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBleHBvcnRBY3Rpb246IEFjdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2F2ZWRRdWVyaWVzU2VydmljZTogU2F2ZWRRdWVyaWVzU2VydmljZVxuICAgICkge1xuICAgICAgICB0aGlzLmV4cG9ydEFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogJ2ZhcyBmYS1kb3dubG9hZCcsXG4gICAgICAgICAgICB0aXRsZTogJ21zZyNleHBvcnRRdWVyeS5idG5UaXRsZScsXG4gICAgICAgICAgICBhY3Rpb246IChpdGVtOiBBY3Rpb24sIGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBjbGllbnQgaGFzIHNlbGVjdGVkIHNvbWUgcmVjb3Jkcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdGhlIGNsaWVudCBoYXMgc2VsZWN0ZWQgc29tZSByZWNvcmRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNTZWxlY3RlZFJlY29yZHMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblNlcnZpY2UuaGF2ZVNlbGVjdGVkUmVjb3JkcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmljIGV4cG9ydCBmdW5jdGlvbi5cbiAgICAgKiA8cD5cbiAgICAgKiBPcGVucyB1cCBhIGRpYWxvZyB0byBsZXQgdXNlciBjaG9vc2UgdGhlIGV4cG9ydCBzb3VyY2UsIGV4cG9ydCBmb3JtYXQgYW5kIG90aGVyIHBhcmFtZXRlcnMuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgUXVlcnlFeHBvcnRlclxuICAgICAqL1xuICAgIHB1YmxpYyBleHBvcnQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5zYXZlZFF1ZXJpZXNTZXJ2aWNlLmV4cG9ydE1vZGFsKFxuICAgICAgICAgICAgdGhpcy5oYXNTZWxlY3RlZFJlY29yZHMoKSA/IEV4cG9ydFNvdXJjZVR5cGUuU2VsZWN0aW9uIDogRXhwb3J0U291cmNlVHlwZS5SZXN1bHQpO1xuXG4gICAgfVxuXG59XG4iLCI8ZGl2IFtzcS1hY3Rpb24tYnV0dG9uc109XCJ7XG4gICAgICAgIGl0ZW1zOiBbZXhwb3J0QWN0aW9uXSxcbiAgICAgICAgYXV0b0FkanVzdDogdHJ1ZSxcbiAgICAgICAgcmlnaHRBbGlnbmVkOiByaWdodEFsaWduZWRcbiAgICB9XCI+XG48L2Rpdj4iXX0=