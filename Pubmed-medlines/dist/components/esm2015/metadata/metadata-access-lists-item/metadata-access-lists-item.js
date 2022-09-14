import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../metadata-access-lists-item-single-access-list/metadata-access-lists-item-single-access-list";
import * as i3 from "@sinequa/core/intl";
function MetadataAccessListsItem_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "div", 3);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "div", 4);
    i0.ɵɵelement(4, "sq-metadata-access-lists-item-single-access-list", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, "msg#metadata.accessLists.authorizedListTitleText"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("authorized", true)("index", i_r1)("accessList", ctx_r2.accessLists.authorizedLists[i_r1]);
} }
function MetadataAccessListsItem_ng_container_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementStart(3, "div", 4);
    i0.ɵɵelement(4, "sq-metadata-access-lists-item-single-access-list", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r1 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, "msg#metadata.accessLists.deniedListTitleText"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("authorized", false)("index", i_r1)("accessList", ctx_r3.accessLists.deniedLists[i_r1]);
} }
function MetadataAccessListsItem_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, MetadataAccessListsItem_ng_container_0_div_1_Template, 5, 6, "div", 1);
    i0.ɵɵtemplate(2, MetadataAccessListsItem_ng_container_0_div_2_Template, 5, 6, "div", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const i_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.accessLists.authorizedLists[i_r1]);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.accessLists.deniedLists[i_r1]);
} }
export class MetadataAccessListsItem {
}
MetadataAccessListsItem.ɵfac = function MetadataAccessListsItem_Factory(t) { return new (t || MetadataAccessListsItem)(); };
MetadataAccessListsItem.ɵcmp = i0.ɵɵdefineComponent({ type: MetadataAccessListsItem, selectors: [["sq-metadata-access-lists-item"]], inputs: { accessLists: "accessLists" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["class", "accessList", 4, "ngIf"], [1, "accessList"], [1, "accessListIcon", "authorizedListIcon", "far", "fa-check-circle", 3, "title"], [1, "accessListValue"], [3, "authorized", "index", "accessList"], [1, "accessListIcon", "deniedListIcon", "fas", "fa-minus-circle", 3, "title"]], template: function MetadataAccessListsItem_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, MetadataAccessListsItem_ng_container_0_Template, 3, 2, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.accessLists.accessListIndices);
    } }, directives: [i1.NgForOf, i1.NgIf, i2.MetadataAccessListsItemSingleAccessList], pipes: [i3.MessagePipe], styles: [".accessList[_ngcontent-%COMP%]{display:table-row}.accessListIcon[_ngcontent-%COMP%], .accessListValue[_ngcontent-%COMP%]{display:table-cell}.accessListValue[_ngcontent-%COMP%]{padding-left:.5em;width:99%}.authorizedListIcon[_ngcontent-%COMP%]{color:green}.deniedListIcon[_ngcontent-%COMP%]{color:red}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MetadataAccessListsItem, [{
        type: Component,
        args: [{
                selector: "sq-metadata-access-lists-item",
                templateUrl: "./metadata-access-lists-item.html",
                styleUrls: ["./metadata-access-lists-item.css"]
            }]
    }], null, { accessLists: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0uanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9tZXRhZGF0YS8iLCJzb3VyY2VzIjpbIm1ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtL21ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLnRzIiwibWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0vbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0lDQzdDLDhCQUNJO0lBQUEseUJBQXNKOztJQUN0Siw4QkFDSTtJQUFBLHNFQUNtRDtJQUN2RCxpQkFBTTtJQUNWLGlCQUFNOzs7O0lBTGlFLGVBQTRFO0lBQTVFLDJHQUE0RTtJQUV6RixlQUFtQjtJQUFuQixpQ0FBbUIsZUFBQSx3REFBQTs7O0lBSTdFLDhCQUNJO0lBQUEseUJBQThJOztJQUM5SSw4QkFDSTtJQUFBLHNFQUNtRDtJQUN2RCxpQkFBTTtJQUNWLGlCQUFNOzs7O0lBTDZELGVBQXdFO0lBQXhFLHVHQUF3RTtJQUVqRixlQUFvQjtJQUFwQixrQ0FBb0IsZUFBQSxvREFBQTs7O0lBWGxGLDZCQUNJO0lBQUEsdUZBTU07SUFDTix1RkFNTTtJQUNWLDBCQUFlOzs7O0lBZGMsZUFBb0M7SUFBcEMsK0RBQW9DO0lBT3BDLGVBQWdDO0lBQWhDLDJEQUFnQzs7QURBN0QsTUFBTSxPQUFPLHVCQUF1Qjs7OEZBQXZCLHVCQUF1Qjs0REFBdkIsdUJBQXVCO1FDUnBDLDBGQWVlOztRQWZhLDJEQUFnQzs7a0REUS9DLHVCQUF1QjtjQUxuQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsV0FBVyxFQUFFLG1DQUFtQztnQkFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7YUFDbEQ7Z0JBRW1CLFdBQVc7a0JBQTFCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERvY3VtZW50QWNjZXNzTGlzdHMgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW1cIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcIi4vbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0uY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIE1ldGFkYXRhQWNjZXNzTGlzdHNJdGVtIHtcbiAgICBASW5wdXQoKSBwdWJsaWMgYWNjZXNzTGlzdHM6IERvY3VtZW50QWNjZXNzTGlzdHM7XG59IiwiPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaSBvZiBhY2Nlc3NMaXN0cy5hY2Nlc3NMaXN0SW5kaWNlc1wiID5cbiAgICA8ZGl2IGNsYXNzPVwiYWNjZXNzTGlzdFwiICpuZ0lmPVwiYWNjZXNzTGlzdHMuYXV0aG9yaXplZExpc3RzW2ldXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhY2Nlc3NMaXN0SWNvbiBhdXRob3JpemVkTGlzdEljb24gZmFyIGZhLWNoZWNrLWNpcmNsZVwiIHRpdGxlPVwie3sgJ21zZyNtZXRhZGF0YS5hY2Nlc3NMaXN0cy5hdXRob3JpemVkTGlzdFRpdGxlVGV4dCcgfCBzcU1lc3NhZ2UgfX1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjY2Vzc0xpc3RWYWx1ZVwiPlxuICAgICAgICAgICAgPHNxLW1ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLXNpbmdsZS1hY2Nlc3MtbGlzdCBbYXV0aG9yaXplZF09XCJ0cnVlXCIgW2luZGV4XT1cImlcIiBbYWNjZXNzTGlzdF09XCJhY2Nlc3NMaXN0cy5hdXRob3JpemVkTGlzdHNbaV1cIj5cbiAgICAgICAgICAgIDwvc3EtbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWNjZXNzTGlzdFwiICpuZ0lmPVwiYWNjZXNzTGlzdHMuZGVuaWVkTGlzdHNbaV1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjY2Vzc0xpc3RJY29uIGRlbmllZExpc3RJY29uIGZhcyBmYS1taW51cy1jaXJjbGVcIiB0aXRsZT1cInt7ICdtc2cjbWV0YWRhdGEuYWNjZXNzTGlzdHMuZGVuaWVkTGlzdFRpdGxlVGV4dCcgfCBzcU1lc3NhZ2UgfX1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFjY2Vzc0xpc3RWYWx1ZVwiPlxuICAgICAgICAgICAgPHNxLW1ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLXNpbmdsZS1hY2Nlc3MtbGlzdCBbYXV0aG9yaXplZF09XCJmYWxzZVwiIFtpbmRleF09XCJpXCIgW2FjY2Vzc0xpc3RdPVwiYWNjZXNzTGlzdHMuZGVuaWVkTGlzdHNbaV1cIj5cbiAgICAgICAgICAgIDwvc3EtbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPiJdfQ==