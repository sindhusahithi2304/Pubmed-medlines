import { Component, Input } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/action";
const _c0 = function (a0) { return [a0]; };
const _c1 = function (a0, a1, a2) { return { items: a0, style: a1, size: a2, rightAligned: false }; };
function BsLoadMore_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("sq-action-buttons", i0.ɵɵpureFunction3(3, _c1, i0.ɵɵpureFunction1(1, _c0, ctx_r0.loadMoreAction), ctx_r0.buttonsStyle, ctx_r0.actionsSize));
} }
export class BsLoadMore {
    constructor(searchService) {
        this.searchService = searchService;
        this.buttonsStyle = "outline-primary";
        this.actionsSize = "sm";
        this.subscription = new Subscription();
        this.hasMore = false;
        this.loadMoreAction = new Action({
            text: "msg#facet.loadMore",
            title: "msg#facet.loadMore",
            action: (action) => {
                this.searchService.loadMore();
                action.update();
            },
            updater: () => {
                // hide button while fetching new data
                this.hasMore = false;
            }
        });
    }
    ngOnInit() {
        this.subscription = this.searchService.resultsStream
            .subscribe(results => {
            this.hasMore = this.searchService.hasMore();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
BsLoadMore.ɵfac = function BsLoadMore_Factory(t) { return new (t || BsLoadMore)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsLoadMore.ɵcmp = i0.ɵɵdefineComponent({ type: BsLoadMore, selectors: [["sq-load-more"]], inputs: { buttonsStyle: "buttonsStyle", actionsSize: "actionsSize" }, decls: 1, vars: 1, consts: [["class", "btn-group", 3, "sq-action-buttons", 4, "ngIf"], [1, "btn-group", 3, "sq-action-buttons"]], template: function BsLoadMore_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsLoadMore_div_0_Template, 1, 7, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasMore);
    } }, directives: [i2.NgIf, i3.BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsLoadMore, [{
        type: Component,
        args: [{
                selector: "sq-load-more",
                templateUrl: "./load-more.html"
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { buttonsStyle: [{
            type: Input
        }], actionsSize: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1tb3JlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvc2VhcmNoLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2xvYWQtbW9yZS9sb2FkLW1vcmUudHMiLCJib290c3RyYXAvbG9hZC1tb3JlL2xvYWQtbW9yZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUMsTUFBTSxFQUFVLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7SUNGbEMseUJBQTBKOzs7SUFBbkgsMEpBQTRHOztBRFVuSixNQUFNLE9BQU8sVUFBVTtJQVFyQixZQUFvQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVB2QyxpQkFBWSxHQUFHLGlCQUFpQixDQUFDO1FBQ2pDLGdCQUFXLEdBQUcsSUFBSSxDQUFBO1FBRW5CLGlCQUFZLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdkLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUM7WUFDL0IsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixLQUFLLEVBQUUsb0JBQW9CO1lBQzNCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUM5QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsQ0FBQztZQUNELE9BQU8sRUFBQyxHQUFHLEVBQUU7Z0JBQ1gsc0NBQXNDO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN2QixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYTthQUNqRCxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O29FQWhDVSxVQUFVOytDQUFWLFVBQVU7UUNWdkIsMkRBQTBKOztRQUFwSixrQ0FBYTs7a0REVU4sVUFBVTtjQUp0QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFdBQVcsRUFBRSxrQkFBa0I7YUFDaEM7Z0VBRVUsWUFBWTtrQkFBcEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBY3Rpb24sIElBY3Rpb259IGZyb20gJ0BzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZWFyY2guc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJzcS1sb2FkLW1vcmVcIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL2xvYWQtbW9yZS5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzTG9hZE1vcmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgYnV0dG9uc1N0eWxlID0gXCJvdXRsaW5lLXByaW1hcnlcIjtcclxuICBASW5wdXQoKSBhY3Rpb25zU2l6ZSA9IFwic21cIlxyXG5cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gIGxvYWRNb3JlQWN0aW9uOiBJQWN0aW9uO1xyXG4gIGhhc01vcmUgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmxvYWRNb3JlQWN0aW9uID0gbmV3IEFjdGlvbih7XHJcbiAgICAgIHRleHQ6IFwibXNnI2ZhY2V0LmxvYWRNb3JlXCIsXHJcbiAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5sb2FkTW9yZVwiLFxyXG4gICAgICBhY3Rpb246IChhY3Rpb24pID0+IHtcclxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UubG9hZE1vcmUoKTtcclxuICAgICAgICBhY3Rpb24udXBkYXRlKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVwZGF0ZXI6KCkgPT4ge1xyXG4gICAgICAgIC8vIGhpZGUgYnV0dG9uIHdoaWxlIGZldGNoaW5nIG5ldyBkYXRhXHJcbiAgICAgICAgdGhpcy5oYXNNb3JlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuc2VhcmNoU2VydmljZS5yZXN1bHRzU3RyZWFtXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzdWx0cyA9PiB7XHJcbiAgICAgICAgdGhpcy5oYXNNb3JlID0gdGhpcy5zZWFyY2hTZXJ2aWNlLmhhc01vcmUoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59IiwiPGRpdiAqbmdJZj1cImhhc01vcmVcIiBjbGFzcz1cImJ0bi1ncm91cFwiIFtzcS1hY3Rpb24tYnV0dG9uc109XCJ7aXRlbXM6IFtsb2FkTW9yZUFjdGlvbl0sIHN0eWxlOiBidXR0b25zU3R5bGUsIHNpemU6IGFjdGlvbnNTaXplLCByaWdodEFsaWduZWQ6IGZhbHNlfVwiPjwvZGl2PlxyXG4iXX0=