import { Component, Input } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
function UserRating_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 4);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.caption));
} }
function UserRating_li_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 5);
    i0.ɵɵelementStart(1, "a", 6);
    i0.ɵɵlistener("click", function UserRating_li_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r6); const i_r4 = ctx.index; const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.select(i_r4); });
    i0.ɵɵelement(2, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("title", ctx_r1.getTitle(i_r4));
    i0.ɵɵadvance(1);
    i0.ɵɵclassMap(i_r4 <= ctx_r1.userRatingIndex ? "fas fa-star" : "far fa-star");
} }
function UserRating_li_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 7);
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 1, "msg#userRatings.average", ctx_r2.messageParams));
} }
export class UserRating {
    constructor(userRatingService, changeDetector) {
        this.userRatingService = userRatingService;
        this.changeDetector = changeDetector;
        this.handleResponse = (response) => {
            this.userRatingIndex = response.rating;
            this.averageRatingIndex = response.averagerating;
            this.changeDetector.markForCheck();
        };
    }
    ngOnInit() {
        this.ensureRatingValues();
        this.handleResponse(this.userRatingService.getRecordRating(this.record, this.getCCRating()));
    }
    getCCRating() {
        return {
            ratingsColumn: this.ratingsColumn,
            averageColumn: this.averageColumn,
            updateDocWeight: this.updateDocWeight,
            ratingsDistribution: this.ratingValues
        };
    }
    get messageParams() {
        return {
            values: {
                average: this.getAverageRating()
            }
        };
    }
    getTitle(ratingIndex) {
        if (this.titles) {
            return this.titles.split(";")[ratingIndex] || "";
        }
        else {
            return "";
        }
    }
    getRating(ratingIndex) {
        return this.ratingValues[ratingIndex];
    }
    getAverageRating() {
        if (this.averageRatingIndex < 0) {
            return "";
        }
        else {
            return this.ratingValues[this.averageRatingIndex];
        }
    }
    select(selectedRatingIndex) {
        //If selected rating was already selected, remove the rating
        if (this.userRatingIndex === selectedRatingIndex) {
            this.userRatingService.deleteRating(this.record, this.getCCRating()).subscribe(this.handleResponse);
        }
        else {
            this.userRatingService.setRating(this.record, selectedRatingIndex, this.getCCRating()).subscribe(this.handleResponse);
        }
    }
    ensureRatingValues() {
        if (!this.ratingValues) {
            const count = this.count || 0;
            //Work out rating value range
            if (this.values) {
                //Use predefined values
                this.ratingValues = this.values.split(";");
                //Initialize missing values - so that ratingValues.length matches config.count
                for (let i = this.ratingValues.length; i < count; i++) {
                    this.ratingValues.push((i + 1).toString());
                }
            }
            else {
                //Generates [1, ... config.count]
                this.ratingValues = Array(count).fill(0).map((_, i) => (i + 1).toString());
            }
        }
    }
}
UserRating.ɵfac = function UserRating_Factory(t) { return new (t || UserRating)(i0.ɵɵdirectiveInject(i1.UserRatingsWebService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
UserRating.ɵcmp = i0.ɵɵdefineComponent({ type: UserRating, selectors: [["sq-user-rating"]], inputs: { record: "record", ratingsColumn: "ratingsColumn", averageColumn: "averageColumn", updateDocWeight: "updateDocWeight", count: "count", values: "values", titles: "titles", caption: "caption", showAverage: "showAverage" }, decls: 4, vars: 3, consts: [[1, "sq-user-rating-stars"], ["class", "sq-user-rating-caption", 4, "ngIf"], ["class", "sq-user-rating-item", 4, "ngFor", "ngForOf"], ["class", "sq-user-rating-average", 4, "ngIf"], [1, "sq-user-rating-caption"], [1, "sq-user-rating-item"], ["href", "javascript:void(0)", 1, "sq-user-rating-star", 3, "title", "click"], [1, "sq-user-rating-average"]], template: function UserRating_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ul", 0);
        i0.ɵɵtemplate(1, UserRating_li_1_Template, 4, 3, "li", 1);
        i0.ɵɵtemplate(2, UserRating_li_2_Template, 3, 4, "li", 2);
        i0.ɵɵtemplate(3, UserRating_li_3_Template, 4, 4, "li", 3);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caption);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.ratingValues);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showAverage && ctx.getAverageRating() !== undefined && ctx.getAverageRating() !== "");
    } }, directives: [i2.NgIf, i2.NgForOf], pipes: [i3.MessagePipe], styles: [".sq-user-rating-stars[_ngcontent-%COMP%]{list-style-type:none;padding:0}.sq-user-rating-item[_ngcontent-%COMP%]{display:inline}.sq-user-rating-star[_ngcontent-%COMP%]{text-decoration:none}.sq-user-rating-caption[_ngcontent-%COMP%]{display:inline;font-size:.875rem;margin-right:4px}.sq-user-rating-average[_ngcontent-%COMP%]{display:inline;font-size:.875rem;margin-left:4px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UserRating, [{
        type: Component,
        args: [{
                selector: "sq-user-rating",
                templateUrl: "./user-rating.html",
                styleUrls: ["./user-rating.css"]
            }]
    }], function () { return [{ type: i1.UserRatingsWebService }, { type: i0.ChangeDetectorRef }]; }, { record: [{
            type: Input
        }], ratingsColumn: [{
            type: Input
        }], averageColumn: [{
            type: Input
        }], updateDocWeight: [{
            type: Input
        }], count: [{
            type: Input
        }], values: [{
            type: Input
        }], titles: [{
            type: Input
        }], caption: [{
            type: Input
        }], showAverage: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yYXRpbmcuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9yZXN1bHQvIiwic291cmNlcyI6WyJ1c2VyLXJhdGluZy91c2VyLXJhdGluZy50cyIsInVzZXItcmF0aW5nL3VzZXItcmF0aW5nLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBVSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDOzs7Ozs7SUNFdEUsNkJBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQXFCOztJQUFBLGlCQUFPO0lBQ3RDLGlCQUFLOzs7SUFESyxlQUFxQjtJQUFyQiwwREFBcUI7Ozs7SUFHL0IsNkJBQ0k7SUFBQSw0QkFDSTtJQUQ2RSxnTUFBbUI7SUFDaEcsdUJBQWdGO0lBQ3BGLGlCQUFJO0lBQ1IsaUJBQUs7Ozs7SUFIOEIsZUFBdUI7SUFBdkIsd0RBQXVCO0lBQzVDLGVBQWtFO0lBQWxFLDZFQUFrRTs7O0lBSWhGLDZCQUNJO0lBQUEsNEJBQU07SUFBQSxZQUFxRDs7SUFBQSxpQkFBTztJQUN0RSxpQkFBSzs7O0lBREssZUFBcUQ7SUFBckQsMkZBQXFEOztBRExuRSxNQUFNLE9BQU8sVUFBVTtJQWNuQixZQUNZLGlCQUF3QyxFQUN4QyxjQUFpQztRQURqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXVCO1FBQ3hDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQThFckMsbUJBQWMsR0FBRyxDQUFDLFFBQTRCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsZUFBZSxHQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFFakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDLENBQUE7SUFsRkQsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTztZQUNILGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ3pDLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2IsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2FBQ25DO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxRQUFRLENBQUMsV0FBbUI7UUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDcEQ7YUFDSTtZQUNELE9BQU8sRUFBRSxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLFdBQW1CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFDSTtZQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNyRDtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQTJCO1FBQzlCLDREQUE0RDtRQUM1RCxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssbUJBQW1CLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDdkc7YUFDSTtZQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3pIO0lBQ0wsQ0FBQztJQUVPLGtCQUFrQjtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUU5Qiw2QkFBNkI7WUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLHVCQUF1QjtnQkFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFM0MsOEVBQThFO2dCQUM5RSxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7aUJBQ0k7Z0JBQ0QsaUNBQWlDO2dCQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUM5RTtTQUNKO0lBQ0wsQ0FBQzs7b0VBNUZRLFVBQVU7K0NBQVYsVUFBVTtRQ1J2Qiw2QkFDSTtRQUNBLHlEQUVLO1FBRUwseURBSUs7UUFFTCx5REFFSztRQUNULGlCQUFLOztRQWJJLGVBQWE7UUFBYixrQ0FBYTtRQUlBLGVBQWlCO1FBQWpCLDBDQUFpQjtRQU05QixlQUFrRjtRQUFsRiwrR0FBa0Y7O2tEREo5RSxVQUFVO2NBTHRCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixXQUFXLEVBQUUsb0JBQW9CO2dCQUNqQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuQzt3R0FFWSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxhQUFhO2tCQUFyQixLQUFLO1lBQ0csYUFBYTtrQkFBckIsS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtSZWNvcmQsIENDUmF0aW5nLCBVc2VyUmF0aW5nc1dlYlNlcnZpY2UsIFVzZXJSYXRpbmdSZXNwb25zZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLXVzZXItcmF0aW5nXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi91c2VyLXJhdGluZy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL3VzZXItcmF0aW5nLmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBVc2VyUmF0aW5nIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSByZWNvcmQ6IFJlY29yZDtcbiAgICBASW5wdXQoKSByYXRpbmdzQ29sdW1uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXZlcmFnZUNvbHVtbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHVwZGF0ZURvY1dlaWdodDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBjb3VudDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHZhbHVlczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHRpdGxlczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNhcHRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBzaG93QXZlcmFnZTogYm9vbGVhbjtcbiAgICB1c2VyUmF0aW5nSW5kZXg6IG51bWJlcjtcbiAgICBhdmVyYWdlUmF0aW5nSW5kZXg6IG51bWJlcjtcbiAgICByYXRpbmdWYWx1ZXM6IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXNlclJhdGluZ1NlcnZpY2U6IFVzZXJSYXRpbmdzV2ViU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVSYXRpbmdWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXNwb25zZSh0aGlzLnVzZXJSYXRpbmdTZXJ2aWNlLmdldFJlY29yZFJhdGluZyh0aGlzLnJlY29yZCwgdGhpcy5nZXRDQ1JhdGluZygpKSk7XG4gICAgfVxuXG4gICAgZ2V0Q0NSYXRpbmcoKTogQ0NSYXRpbmcge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmF0aW5nc0NvbHVtbjogdGhpcy5yYXRpbmdzQ29sdW1uLFxuICAgICAgICAgICAgYXZlcmFnZUNvbHVtbjogdGhpcy5hdmVyYWdlQ29sdW1uLFxuICAgICAgICAgICAgdXBkYXRlRG9jV2VpZ2h0OiB0aGlzLnVwZGF0ZURvY1dlaWdodCxcbiAgICAgICAgICAgIHJhdGluZ3NEaXN0cmlidXRpb246IHRoaXMucmF0aW5nVmFsdWVzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2VQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICBhdmVyYWdlOiB0aGlzLmdldEF2ZXJhZ2VSYXRpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFRpdGxlKHJhdGluZ0luZGV4OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy50aXRsZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpdGxlcy5zcGxpdChcIjtcIilbcmF0aW5nSW5kZXhdIHx8IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFJhdGluZyhyYXRpbmdJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmF0aW5nVmFsdWVzW3JhdGluZ0luZGV4XTtcbiAgICB9XG5cbiAgICBnZXRBdmVyYWdlUmF0aW5nKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmF2ZXJhZ2VSYXRpbmdJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmF0aW5nVmFsdWVzW3RoaXMuYXZlcmFnZVJhdGluZ0luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdChzZWxlY3RlZFJhdGluZ0luZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLy9JZiBzZWxlY3RlZCByYXRpbmcgd2FzIGFscmVhZHkgc2VsZWN0ZWQsIHJlbW92ZSB0aGUgcmF0aW5nXG4gICAgICAgIGlmICh0aGlzLnVzZXJSYXRpbmdJbmRleCA9PT0gc2VsZWN0ZWRSYXRpbmdJbmRleCkge1xuICAgICAgICAgICAgdGhpcy51c2VyUmF0aW5nU2VydmljZS5kZWxldGVSYXRpbmcodGhpcy5yZWNvcmQsIHRoaXMuZ2V0Q0NSYXRpbmcoKSkuc3Vic2NyaWJlKHRoaXMuaGFuZGxlUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51c2VyUmF0aW5nU2VydmljZS5zZXRSYXRpbmcodGhpcy5yZWNvcmQsIHNlbGVjdGVkUmF0aW5nSW5kZXgsIHRoaXMuZ2V0Q0NSYXRpbmcoKSkuc3Vic2NyaWJlKHRoaXMuaGFuZGxlUmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbnN1cmVSYXRpbmdWYWx1ZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5yYXRpbmdWYWx1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5jb3VudCB8fCAwO1xuXG4gICAgICAgICAgICAvL1dvcmsgb3V0IHJhdGluZyB2YWx1ZSByYW5nZVxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgLy9Vc2UgcHJlZGVmaW5lZCB2YWx1ZXNcbiAgICAgICAgICAgICAgICB0aGlzLnJhdGluZ1ZhbHVlcyA9IHRoaXMudmFsdWVzLnNwbGl0KFwiO1wiKTtcblxuICAgICAgICAgICAgICAgIC8vSW5pdGlhbGl6ZSBtaXNzaW5nIHZhbHVlcyAtIHNvIHRoYXQgcmF0aW5nVmFsdWVzLmxlbmd0aCBtYXRjaGVzIGNvbmZpZy5jb3VudFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJhdGluZ1ZhbHVlcy5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmF0aW5nVmFsdWVzLnB1c2goKGkgKyAxKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0dlbmVyYXRlcyBbMSwgLi4uIGNvbmZpZy5jb3VudF1cbiAgICAgICAgICAgICAgICB0aGlzLnJhdGluZ1ZhbHVlcyA9IEFycmF5KGNvdW50KS5maWxsKDApLm1hcCgoXywgaSkgPT4gKGkgKyAxKS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlUmVzcG9uc2UgPSAocmVzcG9uc2U6IFVzZXJSYXRpbmdSZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnVzZXJSYXRpbmdJbmRleCAgICA9IHJlc3BvbnNlLnJhdGluZztcbiAgICAgICAgdGhpcy5hdmVyYWdlUmF0aW5nSW5kZXggPSByZXNwb25zZS5hdmVyYWdlcmF0aW5nO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIiwiPHVsIGNsYXNzPVwic3EtdXNlci1yYXRpbmctc3RhcnNcIj5cbiAgICA8IS0tIGNhcHRpb24gLS0+XG4gICAgPGxpICpuZ0lmPVwiY2FwdGlvblwiIGNsYXNzPVwic3EtdXNlci1yYXRpbmctY2FwdGlvblwiPlxuICAgICAgICA8c3Bhbj57e2NhcHRpb258c3FNZXNzYWdlfX08L3NwYW4+XG4gICAgPC9saT5cbiAgICA8IS0tIHJhdGluZyBzdGFycyAtLT5cbiAgICA8bGkgKm5nRm9yPVwibGV0IHIgb2YgcmF0aW5nVmFsdWVzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJzcS11c2VyLXJhdGluZy1pdGVtXCI+XG4gICAgICAgIDxhIGNsYXNzPVwic3EtdXNlci1yYXRpbmctc3RhclwiIHRpdGxlPVwie3tnZXRUaXRsZShpKX19XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3QoaSlcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwie3soaSA8PSB1c2VyUmF0aW5nSW5kZXgpID8gJ2ZhcyBmYS1zdGFyJyA6ICdmYXIgZmEtc3Rhcid9fVwiPjwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgIDwvbGk+XG4gICAgPCEtLSBhdmVyYWdlIHJhdGluZyAtLT5cbiAgICA8bGkgKm5nSWY9XCJzaG93QXZlcmFnZSAmJiBnZXRBdmVyYWdlUmF0aW5nKCkgIT09IHVuZGVmaW5lZCAmJiBnZXRBdmVyYWdlUmF0aW5nKCkgIT09ICcnXCIgY2xhc3M9XCJzcS11c2VyLXJhdGluZy1hdmVyYWdlXCI+XG4gICAgICAgIDxzcGFuPnt7J21zZyN1c2VyUmF0aW5ncy5hdmVyYWdlJ3xzcU1lc3NhZ2U6bWVzc2FnZVBhcmFtc319PC9zcGFuPlxuICAgIDwvbGk+XG48L3VsPlxuIl19