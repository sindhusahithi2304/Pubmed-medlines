import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../selection.service";
import * as i2 from "@sinequa/core/intl";
export class BsResultSelector {
    constructor(selectionService) {
        this.selectionService = selectionService;
    }
}
BsResultSelector.ɵfac = function BsResultSelector_Factory(t) { return new (t || BsResultSelector)(i0.ɵɵdirectiveInject(i1.SelectionService)); };
BsResultSelector.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultSelector, selectors: [["sq-result-selector"]], inputs: { record: "record" }, decls: 6, vars: 7, consts: [[1, "sq-select-results-item", "custom-control", "custom-control-inline", "custom-checkbox", 3, "title"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], [1, "custom-control-label"]], template: function BsResultSelector_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "label", 0);
        i0.ɵɵpipe(1, "sqMessage");
        i0.ɵɵpipe(2, "sqMessage");
        i0.ɵɵelementStart(3, "input", 1);
        i0.ɵɵlistener("change", function BsResultSelector_Template_input_change_3_listener() { return ctx.selectionService.toggleSelectedRecords(ctx.record, "result"); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "span", 2);
        i0.ɵɵtext(5, "\u200B");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 3, ctx.record.$selected ? "msg#resultSelector.unselectDocument" : "msg#resultSelector.selectDocument"));
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 5, ctx.record.$selected ? "msg#resultSelector.unselectDocument" : "msg#resultSelector.selectDocument"));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("checked", ctx.record.$selected);
    } }, pipes: [i2.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultSelector, [{
        type: Component,
        args: [{
                selector: "sq-result-selector",
                templateUrl: "./result-selector.html"
            }]
    }], function () { return [{ type: i1.SelectionService }]; }, { record: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2VsZWN0aW9uLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3Jlc3VsdC1zZWxlY3Rvci9yZXN1bHQtc2VsZWN0b3IudHMiLCJib290c3RyYXAvcmVzdWx0LXNlbGVjdG9yL3Jlc3VsdC1zZWxlY3Rvci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBUS9DLE1BQU0sT0FBTyxnQkFBZ0I7SUFHekIsWUFDVyxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUM3QyxDQUFDOztnRkFMUSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtRQ1I3QixnQ0FHSTs7O1FBQUEsZ0NBQ0E7UUFEaUYsOEZBQVUsdURBQStDLFFBQVEsQ0FBQyxJQUFDO1FBQXBKLGlCQUNBO1FBQUEsK0JBQW1DO1FBQUEsc0JBQU87UUFBQSxpQkFBTztRQUNyRCxpQkFBUTs7UUFKSiwySkFBd0g7UUFDeEgsc0pBQWdJO1FBQzVFLGVBQTRCO1FBQTVCLDhDQUE0Qjs7a0RES3ZFLGdCQUFnQjtjQUo1QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLHdCQUF3QjthQUN4QzttRUFFWSxNQUFNO2tCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1JlY29yZH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NlbGVjdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZWxlY3Rpb24uc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1yZXN1bHQtc2VsZWN0b3JcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdC1zZWxlY3Rvci5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNSZXN1bHRTZWxlY3RvciB7XG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNlbGVjdGlvblNlcnZpY2U6IFNlbGVjdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbn0iLCI8bGFiZWwgY2xhc3M9XCJzcS1zZWxlY3QtcmVzdWx0cy1pdGVtIGN1c3RvbS1jb250cm9sIGN1c3RvbS1jb250cm9sLWlubGluZSBjdXN0b20tY2hlY2tib3hcIlxuICAgIHRpdGxlPVwie3socmVjb3JkLiRzZWxlY3RlZCA/ICdtc2cjcmVzdWx0U2VsZWN0b3IudW5zZWxlY3REb2N1bWVudCcgOiAnbXNnI3Jlc3VsdFNlbGVjdG9yLnNlbGVjdERvY3VtZW50JykgfCBzcU1lc3NhZ2V9fVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCIocmVjb3JkLiRzZWxlY3RlZCA/ICdtc2cjcmVzdWx0U2VsZWN0b3IudW5zZWxlY3REb2N1bWVudCcgOiAnbXNnI3Jlc3VsdFNlbGVjdG9yLnNlbGVjdERvY3VtZW50JykgfCBzcU1lc3NhZ2VcIj5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiIFtjaGVja2VkXT1cInJlY29yZC4kc2VsZWN0ZWRcIiAoY2hhbmdlKT1cInNlbGVjdGlvblNlcnZpY2UudG9nZ2xlU2VsZWN0ZWRSZWNvcmRzKHJlY29yZCwgJ3Jlc3VsdCcpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbC1sYWJlbFwiPiYjODIwMzs8L3NwYW4+XG48L2xhYmVsPiJdfQ==