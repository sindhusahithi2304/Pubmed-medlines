import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/modal";
import * as i2 from "../../preview.service";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/core/intl";
function BsResultLinkPreview_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "span");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(ctx_r0.icon);
} }
function BsResultLinkPreview_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.text));
} }
export class BsResultLinkPreview {
    constructor(modalService, previewService) {
        this.modalService = modalService;
        this.previewService = previewService;
        this.icon = "fas fa-search";
        this.text = "";
        this.title = "";
    }
    click(event) {
        if (this.usePopup) {
            if (event.ctrlKey) {
                this.previewService.openNewWindow(this.record, this.query);
            }
            else {
                this.previewService.openModal(this.record, this.query, { displaySimilarDocuments: this.displaySimilarDocuments, metadata: this.metadata });
            }
        }
        else {
            if (this.newWindow) {
                this.previewService.openNewWindow(this.record, this.query);
            }
            else {
                this.previewService.openRoute(this.record, this.query);
            }
        }
        return false;
    }
}
BsResultLinkPreview.ɵfac = function BsResultLinkPreview_Factory(t) { return new (t || BsResultLinkPreview)(i0.ɵɵdirectiveInject(i1.ModalService), i0.ɵɵdirectiveInject(i2.PreviewService)); };
BsResultLinkPreview.ɵcmp = i0.ɵɵdefineComponent({ type: BsResultLinkPreview, selectors: [["sq-result-link-preview"]], inputs: { query: "query", record: "record", icon: "icon", text: "text", title: "title", usePopup: "usePopup", newWindow: "newWindow", displaySimilarDocuments: "displaySimilarDocuments", metadata: "metadata" }, decls: 4, vars: 5, consts: [["href", "#", 3, "title", "click"], [4, "ngIf"]], template: function BsResultLinkPreview_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "a", 0);
        i0.ɵɵlistener("click", function BsResultLinkPreview_Template_a_click_0_listener($event) { return ctx.click($event); });
        i0.ɵɵpipe(1, "sqMessage");
        i0.ɵɵtemplate(2, BsResultLinkPreview_ng_container_2_Template, 2, 3, "ng-container", 1);
        i0.ɵɵtemplate(3, BsResultLinkPreview_ng_container_3_Template, 3, 3, "ng-container", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 3, ctx.title));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !!ctx.icon);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !!ctx.text);
    } }, directives: [i3.NgIf], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsResultLinkPreview, [{
        type: Component,
        args: [{
                selector: "sq-result-link-preview",
                templateUrl: "./result-link-preview.html"
            }]
    }], function () { return [{ type: i1.ModalService }, { type: i2.PreviewService }]; }, { query: [{
            type: Input
        }], record: [{
            type: Input
        }], icon: [{
            type: Input
        }], text: [{
            type: Input
        }], title: [{
            type: Input
        }], usePopup: [{
            type: Input
        }], newWindow: [{
            type: Input
        }], displaySimilarDocuments: [{
            type: Input
        }], metadata: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LWxpbmstcHJldmlldy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3ByZXZpZXcvIiwic291cmNlcyI6WyJib290c3RyYXAvcmVzdWx0LWxpbmstcHJldmlldy9yZXN1bHQtbGluay1wcmV2aWV3LnRzIiwiYm9vdHN0cmFwL3Jlc3VsdC1saW5rLXByZXZpZXcvcmVzdWx0LWxpbmstcHJldmlldy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lDQzNDLDZCQUNJO0lBQUEsdUJBQThCO0lBQ2xDLDBCQUFlOzs7SUFETCxlQUFnQjtJQUFoQiwwQkFBZ0I7OztJQUUxQiw2QkFBNkI7SUFBQSxZQUFvQjs7SUFBQSwwQkFBZTs7O0lBQW5DLGVBQW9CO0lBQXBCLHVEQUFvQjs7QURNckQsTUFBTSxPQUFPLG1CQUFtQjtJQVc1QixZQUNXLFlBQTBCLEVBQzFCLGNBQThCO1FBRDlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVZoQyxTQUFJLEdBQVcsZUFBZSxDQUFDO1FBQy9CLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsVUFBSyxHQUFXLEVBQUUsQ0FBQztJQVM1QixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQWlCO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDZixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5RDtpQkFDSTtnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO2FBQzVJO1NBQ0o7YUFDSTtZQUNELElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBQztnQkFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5RDtpQkFDSTtnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxRDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7c0ZBbENRLG1CQUFtQjt3REFBbkIsbUJBQW1CO1FDVmhDLDRCQUNJO1FBRFEsaUdBQVMsaUJBQWEsSUFBQzs7UUFDL0Isc0ZBRWU7UUFDZixzRkFBZ0U7UUFDcEUsaUJBQUk7O1FBTGdDLGtFQUE2QjtRQUM5QyxlQUFZO1FBQVosaUNBQVk7UUFHWixlQUFZO1FBQVosaUNBQVk7O2tERE1sQixtQkFBbUI7Y0FKL0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFdBQVcsRUFBRSw0QkFBNEI7YUFDNUM7NEZBRVksS0FBSztrQkFBYixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyx1QkFBdUI7a0JBQS9CLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZWNvcmR9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtRdWVyeX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge01vZGFsU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7UHJldmlld1NlcnZpY2V9IGZyb20gXCIuLi8uLi9wcmV2aWV3LnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcmVzdWx0LWxpbmstcHJldmlld1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcmVzdWx0LWxpbmstcHJldmlldy5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgQnNSZXN1bHRMaW5rUHJldmlldyB7XG4gICAgQElucHV0KCkgcXVlcnk6IFF1ZXJ5O1xuICAgIEBJbnB1dCgpIHJlY29yZDogUmVjb3JkO1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZyA9IFwiZmFzIGZhLXNlYXJjaFwiO1xuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZyA9IFwiXCI7XG4gICAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9IFwiXCI7XG4gICAgQElucHV0KCkgdXNlUG9wdXA6IGJvb2xlYW47XG4gICAgQElucHV0KCkgbmV3V2luZG93OiBib29sZWFuO1xuICAgIEBJbnB1dCgpIGRpc3BsYXlTaW1pbGFyRG9jdW1lbnRzOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIG1ldGFkYXRhOiBzdHJpbmdbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBwcmV2aWV3U2VydmljZTogUHJldmlld1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBjbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy51c2VQb3B1cCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdTZXJ2aWNlLm9wZW5OZXdXaW5kb3codGhpcy5yZWNvcmQsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3U2VydmljZS5vcGVuTW9kYWwodGhpcy5yZWNvcmQsIHRoaXMucXVlcnksIHtkaXNwbGF5U2ltaWxhckRvY3VtZW50czogdGhpcy5kaXNwbGF5U2ltaWxhckRvY3VtZW50cywgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGF9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMubmV3V2luZG93KXtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdTZXJ2aWNlLm9wZW5OZXdXaW5kb3codGhpcy5yZWNvcmQsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3U2VydmljZS5vcGVuUm91dGUodGhpcy5yZWNvcmQsIHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59IiwiPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwiY2xpY2soJGV2ZW50KVwiIHRpdGxlPVwie3t0aXRsZSB8IHNxTWVzc2FnZX19XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhaWNvblwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInt7aWNvbn19XCI+PC9zcGFuPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhIXRleHRcIj57e3RleHQgfCBzcU1lc3NhZ2V9fTwvbmctY29udGFpbmVyPlxuPC9hPiJdfQ==