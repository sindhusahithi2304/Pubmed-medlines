import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
/**
 * This component requires a global CSS file to map file extensions (doc, ppt, xls, etc.)
 * to Font Awesome icons via a class `sq-icon-file-{{fileext}}`
 */
export class ResultIcon {
    constructor() {
        /**
         * Integer controlling the icon's size
         */
        this.size = 1;
    }
}
ResultIcon.ɵfac = function ResultIcon_Factory(t) { return new (t || ResultIcon)(); };
ResultIcon.ɵcmp = i0.ɵɵdefineComponent({ type: ResultIcon, selectors: [["sq-result-icon"]], inputs: { record: "record", size: "size" }, decls: 1, vars: 5, consts: [[3, "title"]], template: function ResultIcon_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "span", 0);
    } if (rf & 2) {
        i0.ɵɵclassMapInterpolate2("far fa-file sq-icon-file-", ctx.record.fileext, " fa-", ctx.size, "x fa-fw");
        i0.ɵɵpropertyInterpolate("title", ctx.record.fileext);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultIcon, [{
        type: Component,
        args: [{
                selector: "sq-result-icon",
                templateUrl: "./result-icon.html"
            }]
    }], null, { record: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWljb24uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9yZXN1bHQvIiwic291cmNlcyI6WyJyZXN1bHQtaWNvbi9yZXN1bHQtaWNvbi50cyIsInJlc3VsdC1pY29uL3Jlc3VsdC1pY29uLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRy9DOzs7R0FHRztBQU1ILE1BQU0sT0FBTyxVQUFVO0lBSnZCO1FBVUk7O1dBRUc7UUFDTSxTQUFJLEdBQVcsQ0FBQyxDQUFDO0tBQzdCOztvRUFWWSxVQUFVOytDQUFWLFVBQVU7UUNadkIsMEJBQStHOztRQUF6Ryx1R0FBc0U7UUFBQyxxREFBMEI7O2tERFkxRixVQUFVO2NBSnRCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixXQUFXLEVBQUUsb0JBQW9CO2FBQ3BDO2dCQUtZLE1BQU07a0JBQWQsS0FBSztZQUtHLElBQUk7a0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7UmVjb3JkfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcblxuLyoqXG4gKiBUaGlzIGNvbXBvbmVudCByZXF1aXJlcyBhIGdsb2JhbCBDU1MgZmlsZSB0byBtYXAgZmlsZSBleHRlbnNpb25zIChkb2MsIHBwdCwgeGxzLCBldGMuKVxuICogdG8gRm9udCBBd2Vzb21lIGljb25zIHZpYSBhIGNsYXNzIGBzcS1pY29uLWZpbGUte3tmaWxlZXh0fX1gXG4gKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcmVzdWx0LWljb25cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdC1pY29uLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBSZXN1bHRJY29uIHtcbiAgICAvKipcbiAgICAgKiBSZWNvcmQgd2hpY2ggZmlsZSBleHRlbnNpb24gaXMgZGlzcGxheWVkIGFzIGFuIGljb25cbiAgICAgKi9cbiAgICBASW5wdXQoKSByZWNvcmQ6IFJlY29yZDtcblxuICAgIC8qKlxuICAgICAqIEludGVnZXIgY29udHJvbGxpbmcgdGhlIGljb24ncyBzaXplXG4gICAgICovXG4gICAgQElucHV0KCkgc2l6ZTogbnVtYmVyID0gMTsgXG59IiwiPHNwYW4gY2xhc3M9XCJmYXIgZmEtZmlsZSBzcS1pY29uLWZpbGUte3tyZWNvcmQuZmlsZWV4dH19IGZhLXt7c2l6ZX19eCBmYS1md1wiIHRpdGxlPVwie3tyZWNvcmQuZmlsZWV4dH19XCI+PC9zcGFuPiJdfQ==