import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "../../feedback.service";
import * as i2 from "@sinequa/components/action";
export class BsFeedbackMenu {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    ngOnInit() {
        this.items = this.feedbackService.buildFeedbackAction();
        this.options = {
            items: this.items,
            autoAdjust: true,
            rightAligned: this.rightAligned,
            size: this.size,
            style: this.style
        };
    }
}
BsFeedbackMenu.ɵfac = function BsFeedbackMenu_Factory(t) { return new (t || BsFeedbackMenu)(i0.ɵɵdirectiveInject(i1.FeedbackService)); };
BsFeedbackMenu.ɵcmp = i0.ɵɵdefineComponent({ type: BsFeedbackMenu, selectors: [["sq-feedback-menu"]], inputs: { size: "size", style: "style", rightAligned: "rightAligned" }, decls: 1, vars: 1, consts: [[3, "sq-action-buttons"]], template: function BsFeedbackMenu_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("sq-action-buttons", ctx.options);
    } }, directives: [i2.BsActionButtons], encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFeedbackMenu, [{
        type: Component,
        args: [{
                selector: "sq-feedback-menu",
                templateUrl: "./feedback-menu.html",
                changeDetection: ChangeDetectionStrategy.OnPush
            }]
    }], function () { return [{ type: i1.FeedbackService }]; }, { size: [{
            type: Input
        }], style: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlZGJhY2stbWVudS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2ZlZWRiYWNrLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZlZWRiYWNrLW1lbnUvZmVlZGJhY2stbWVudS50cyIsImJvb3RzdHJhcC9mZWVkYmFjay1tZW51L2ZlZWRiYWNrLW1lbnUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7OztBQVNoRixNQUFNLE9BQU8sY0FBYztJQVN2QixZQUNXLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUMzQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDO0lBQ04sQ0FBQzs7NEVBdEJRLGNBQWM7bURBQWQsY0FBYztRQ1QzQix5QkFBeUM7O1FBQXBDLCtDQUE2Qjs7a0REU3JCLGNBQWM7Y0FMMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFdBQVcsRUFBRSxzQkFBc0I7Z0JBQ25DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEO2tFQUdZLElBQUk7a0JBQVosS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0FjdGlvbiwgQWN0aW9uQnV0dG9uc09wdGlvbnN9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtGZWVkYmFja1NlcnZpY2V9IGZyb20gXCIuLi8uLi9mZWVkYmFjay5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLWZlZWRiYWNrLW1lbnVcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2ZlZWRiYWNrLW1lbnUuaHRtbFwiLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJzRmVlZGJhY2tNZW51IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZztcbiAgICBASW5wdXQoKSBzdHlsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHJpZ2h0QWxpZ25lZDogYm9vbGVhbjtcblxuICAgIGl0ZW1zOiBBY3Rpb25bXTtcbiAgICBvcHRpb25zOiBBY3Rpb25CdXR0b25zT3B0aW9ucztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZmVlZGJhY2tTZXJ2aWNlOiBGZWVkYmFja1NlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuZmVlZGJhY2tTZXJ2aWNlLmJ1aWxkRmVlZGJhY2tBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgaXRlbXM6IHRoaXMuaXRlbXMsIFxuICAgICAgICAgICAgYXV0b0FkanVzdDogdHJ1ZSwgXG4gICAgICAgICAgICByaWdodEFsaWduZWQ6IHRoaXMucmlnaHRBbGlnbmVkLCBcbiAgICAgICAgICAgIHNpemU6IHRoaXMuc2l6ZSwgXG4gICAgICAgICAgICBzdHlsZTogdGhpcy5zdHlsZVxuICAgICAgICB9O1xuICAgIH1cblxuXG59IiwiPGRpdiBbc3EtYWN0aW9uLWJ1dHRvbnNdPVwib3B0aW9uc1wiPjwvZGl2PiJdfQ==