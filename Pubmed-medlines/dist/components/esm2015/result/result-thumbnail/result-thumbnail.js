import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@angular/common";
function ResultThumbnail_a_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 1);
    i0.ɵɵlistener("click", function ResultThumbnail_a_0_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return ctx_r1.click(); });
    i0.ɵɵelement(1, "img", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("href", ctx_r0.href, i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("target", ctx_r0.target);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("src", ctx_r0.thumbnailUrl, i0.ɵɵsanitizeUrl);
} }
export class ResultThumbnail {
    constructor(appService, searchService) {
        this.appService = appService;
        this.searchService = searchService;
        this.linkBehavior = "open";
        this.defaultThumbnail = "";
        this.thumbnailClicked = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (!!changes["record"]) {
            this.documentUrl = this.record.url1;
            if (!!this.thumbnailColumn) {
                this.thumbnailUrl = this.record[this.thumbnailColumn];
            }
            if (!this.thumbnailUrl && !!this.record.thumbnailUrl) {
                this.thumbnailUrl = this.record.thumbnailUrl;
            }
            if (!this.thumbnailUrl && !!this.defaultThumbnail) {
                this.thumbnailUrl = this.defaultThumbnail;
            }
            this.thumbnailUrl = this.appService.updateUrlForCors(this.thumbnailUrl);
        }
    }
    get hasLinkBehaviour() {
        return this.linkBehavior === "open";
    }
    get href() {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }
    get target() {
        return (this.hasLinkBehaviour && this.documentUrl) ? "_blank" : "_self";
    }
    click() {
        const isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
        if (isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.thumbnailClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}
ResultThumbnail.ɵfac = function ResultThumbnail_Factory(t) { return new (t || ResultThumbnail)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SearchService)); };
ResultThumbnail.ɵcmp = i0.ɵɵdefineComponent({ type: ResultThumbnail, selectors: [["sq-result-thumbnail"]], inputs: { record: "record", linkBehavior: "linkBehavior", thumbnailColumn: "thumbnailColumn", defaultThumbnail: "defaultThumbnail" }, outputs: { thumbnailClicked: "thumbnailClicked" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "href", "target", "click", 4, "ngIf"], [3, "href", "target", "click"], [3, "src"]], template: function ResultThumbnail_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ResultThumbnail_a_0_Template, 2, 3, "a", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.thumbnailUrl);
    } }, directives: [i3.NgIf], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultThumbnail, [{
        type: Component,
        args: [{
                selector: "sq-result-thumbnail",
                templateUrl: "./result-thumbnail.html"
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }]; }, { record: [{
            type: Input
        }], linkBehavior: [{
            type: Input
        }], thumbnailColumn: [{
            type: Input
        }], defaultThumbnail: [{
            type: Input
        }], thumbnailClicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXRodW1ibmFpbC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3Jlc3VsdC8iLCJzb3VyY2VzIjpbInJlc3VsdC10aHVtYm5haWwvcmVzdWx0LXRodW1ibmFpbC50cyIsInJlc3VsdC10aHVtYm5haWwvcmVzdWx0LXRodW1ibmFpbC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBNEIsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0lDQS9GLDRCQUNJO0lBRHdELHVLQUFpQjtJQUN6RSx5QkFDSjtJQUFBLGlCQUFJOzs7SUFGb0IsK0RBQWU7SUFBQyxpREFBbUI7SUFDbEQsZUFBc0I7SUFBdEIsc0VBQXNCOztBRFEvQixNQUFNLE9BQU8sZUFBZTtJQVN4QixZQUNZLFVBQXNCLEVBQ3RCLGFBQTRCO1FBRDVCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFUL0IsaUJBQVksR0FBc0IsTUFBTSxDQUFDO1FBRXpDLHFCQUFnQixHQUFXLEVBQUUsQ0FBQztRQUM3QixxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBT3pELENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUN6RDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUNoRDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO2FBQzdDO1lBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFXLElBQUk7UUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDOUQsQ0FBQztJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM1RSxDQUFDO0lBRU0sS0FBSztRQUNSLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLCtEQUErRDtRQUMzSCxJQUFHLE1BQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0NBQWdDO1FBQ3BFLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7OzhFQWhEUSxlQUFlO29EQUFmLGVBQWU7UUNUNUIsNERBRUk7O1FBRkEsdUNBQWtCOztrRERTVCxlQUFlO2NBSjNCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixXQUFXLEVBQUUseUJBQXlCO2FBQ3pDO3lGQUVZLE1BQU07a0JBQWQsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxlQUFlO2tCQUF2QixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLO1lBQ0ksZ0JBQWdCO2tCQUF6QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZWNvcmR9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXJlc3VsdC10aHVtYm5haWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3Jlc3VsdC10aHVtYm5haWwuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFJlc3VsdFRodW1ibmFpbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XG4gICAgQElucHV0KCkgbGlua0JlaGF2aW9yOiBcIm9wZW5cIiB8IFwiYWN0aW9uXCIgPSBcIm9wZW5cIjtcbiAgICBASW5wdXQoKSB0aHVtYm5haWxDb2x1bW46IHN0cmluZztcbiAgICBASW5wdXQoKSBkZWZhdWx0VGh1bWJuYWlsOiBzdHJpbmcgPSBcIlwiO1xuICAgIEBPdXRwdXQoKSB0aHVtYm5haWxDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIHRodW1ibmFpbFVybDogc3RyaW5nO1xuICAgIHByaXZhdGUgZG9jdW1lbnRVcmw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKCEhY2hhbmdlc1tcInJlY29yZFwiXSkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFVybCA9IHRoaXMucmVjb3JkLnVybDE7XG4gICAgICAgICAgICBpZiAoISF0aGlzLnRodW1ibmFpbENvbHVtbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsVXJsID0gdGhpcy5yZWNvcmRbdGhpcy50aHVtYm5haWxDb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnRodW1ibmFpbFVybCAmJiAhIXRoaXMucmVjb3JkLnRodW1ibmFpbFVybCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsVXJsID0gdGhpcy5yZWNvcmQudGh1bWJuYWlsVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnRodW1ibmFpbFVybCAmJiAhIXRoaXMuZGVmYXVsdFRodW1ibmFpbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGh1bWJuYWlsVXJsID0gdGhpcy5kZWZhdWx0VGh1bWJuYWlsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aHVtYm5haWxVcmwgPSB0aGlzLmFwcFNlcnZpY2UudXBkYXRlVXJsRm9yQ29ycyh0aGlzLnRodW1ibmFpbFVybCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaGFzTGlua0JlaGF2aW91cigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlua0JlaGF2aW9yID09PSBcIm9wZW5cIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGhyZWYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhhc0xpbmtCZWhhdmlvdXIgJiYgdGhpcy5kb2N1bWVudFVybCkgfHwgXCIjXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0YXJnZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhhc0xpbmtCZWhhdmlvdXIgJiYgdGhpcy5kb2N1bWVudFVybCkgPyBcIl9ibGFua1wiIDogXCJfc2VsZlwiO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGljaygpIDogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGlzTGluayA9IHRoaXMuaGFzTGlua0JlaGF2aW91ciAmJiAhIXRoaXMuZG9jdW1lbnRVcmw7IC8vIHRydWUgaWYgdGhpcyBpcyBhIHJlZ3VsYXIgbGluayAocGVyZm9ybXMgdGhlIGRlZmF1bHQgYWN0aW9uKVxuICAgICAgICBpZihpc0xpbmspXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uubm90aWZ5T3Blbk9yaWdpbmFsRG9jdW1lbnQodGhpcy5yZWNvcmQpO1xuICAgICAgICB0aGlzLnRodW1ibmFpbENsaWNrZWQuZW1pdChpc0xpbmspOyAvLyBDYW4gYmUgdXNlIHRvIHRyaWdnZXIgYWN0aW9uc1xuICAgICAgICByZXR1cm4gaXNMaW5rO1xuICAgIH1cbn0iLCI8YSAqbmdJZj1cInRodW1ibmFpbFVybFwiIGhyZWY9XCJ7e2hyZWZ9fVwiIHRhcmdldD1cInt7dGFyZ2V0fX1cIiAoY2xpY2spPVwiY2xpY2soKVwiPlxuICAgIDxpbWcgc3JjPVwie3t0aHVtYm5haWxVcmx9fVwiPlxuPC9hPiJdfQ==