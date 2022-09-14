import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class BsAlertMessageComponent {
}
BsAlertMessageComponent.ɵfac = function BsAlertMessageComponent_Factory(t) { return new (t || BsAlertMessageComponent)(); };
BsAlertMessageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsAlertMessageComponent, selectors: [["sq-alert-message"]], inputs: { message: "message" }, decls: 2, vars: 1, consts: [["role", "alert", 1, "alert", "alert-danger", "ml-3", "mr-3", "p-3", "text-center"]], template: function BsAlertMessageComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", ctx.message, "\n");
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAlertMessageComponent, [{
        type: Component,
        args: [{
                selector: 'sq-alert-message',
                templateUrl: './alert-message.component.html'
            }]
    }], null, { message: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbWVzc2FnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hbGVydHMvIiwic291cmNlcyI6WyJib290c3RyYXAvYWxlcnQtbWVzc2FnZS9hbGVydC1tZXNzYWdlLmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9hbGVydC1tZXNzYWdlL2FsZXJ0LW1lc3NhZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTWpELE1BQU0sT0FBTyx1QkFBdUI7OzhGQUF2Qix1QkFBdUI7NERBQXZCLHVCQUF1QjtRQ05wQyw4QkFDRTtRQUFBLFlBQ0Y7UUFBQSxpQkFBTTs7UUFESixlQUNGO1FBREUsNkNBQ0Y7O2tERElhLHVCQUF1QjtjQUpuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsV0FBVyxFQUFFLGdDQUFnQzthQUM5QztnQkFFVSxPQUFPO2tCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLWFsZXJ0LW1lc3NhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQtbWVzc2FnZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQnNBbGVydE1lc3NhZ2VDb21wb25lbnQge1xuICBASW5wdXQoKSBtZXNzYWdlOiBzdHJpbmc7XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyIG1sLTMgbXItMyBwLTMgdGV4dC1jZW50ZXJcIiByb2xlPVwiYWxlcnRcIj5cbiAge3sgbWVzc2FnZSB9fVxuPC9kaXY+Il19