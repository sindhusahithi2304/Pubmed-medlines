import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@sinequa/components/utils";
import * as i3 from "@sinequa/core/intl";
export class BsPreviewSearchFormComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.searchText = new EventEmitter();
        this.searchControl = new FormControl('');
        this.form = this.formBuilder.group({
            search: this.searchControl
        });
    }
    /**
     * Updates the text of the search form when the query changes
     */
    ngOnChanges() {
        this.searchControl.setValue((!this.query || !this.query.text) ? "" : this.query.text);
    }
    /**
     * Emits an event for the parent component to search this next text
     */
    search() {
        this.searchText.next(this.searchControl.value || "");
    }
}
BsPreviewSearchFormComponent.ɵfac = function BsPreviewSearchFormComponent_Factory(t) { return new (t || BsPreviewSearchFormComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder)); };
BsPreviewSearchFormComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsPreviewSearchFormComponent, selectors: [["sq-preview-search-form"]], inputs: { query: "query" }, outputs: { searchText: "searchText" }, features: [i0.ɵɵNgOnChangesFeature], decls: 12, vars: 10, consts: [["novalidate", "", 3, "formGroup"], [1, "input-group", "mb-3"], [1, "input-group-prepend"], ["for", "search-input", 1, "input-group-text"], ["id", "search-input", "type", "text", "formControlName", "search", "sqAutofocus", "", 1, "form-control", 3, "placeholder"], [1, "input-group-append"], ["type", "submit", 1, "btn", "btn-primary", 3, "title", "click"], [1, "fas", "fa-fw", "fa-search"]], template: function BsPreviewSearchFormComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelementStart(3, "label", 3);
        i0.ɵɵtext(4);
        i0.ɵɵpipe(5, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelement(6, "input", 4);
        i0.ɵɵpipe(7, "sqMessage");
        i0.ɵɵelementStart(8, "div", 5);
        i0.ɵɵelementStart(9, "button", 6);
        i0.ɵɵlistener("click", function BsPreviewSearchFormComponent_Template_button_click_9_listener() { return ctx.search(); });
        i0.ɵɵpipe(10, "sqMessage");
        i0.ɵɵelement(11, "i", 7);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "msg#preview.search"));
        i0.ɵɵadvance(2);
        i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(7, 6, "msg#searchForm.searchFor"));
        i0.ɵɵadvance(3);
        i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(10, 8, "msg#searchForm.search"));
    } }, directives: [i1.ɵangular_packages_forms_forms_y, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.DefaultValueAccessor, i1.NgControlStatus, i1.FormControlName, i2.Autofocus], pipes: [i3.MessagePipe], styles: [""] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPreviewSearchFormComponent, [{
        type: Component,
        args: [{
                selector: 'sq-preview-search-form',
                templateUrl: './preview-search-form.component.html',
                styleUrls: ['./preview-search-form.component.scss']
            }]
    }], function () { return [{ type: i1.FormBuilder }]; }, { query: [{
            type: Input
        }], searchText: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1zZWFyY2gtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3ByZXZpZXctc2VhcmNoLWZvcm0vcHJldmlldy1zZWFyY2gtZm9ybS5jb21wb25lbnQudHMiLCJib290c3RyYXAvcHJldmlldy1zZWFyY2gtZm9ybS9wcmV2aWV3LXNlYXJjaC1mb3JtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUEwQixXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFRckUsTUFBTSxPQUFPLDRCQUE0QjtJQVF2QyxZQUNVLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBUHhCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBU2hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNqQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWE7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU07UUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDOzt3R0E3QlUsNEJBQTRCO2lFQUE1Qiw0QkFBNEI7UUNUekMsK0JBQ0k7UUFBQSw4QkFDSTtRQUFBLDhCQUNJO1FBQUEsZ0NBQW1EO1FBQUEsWUFBc0M7O1FBQUEsaUJBQVE7UUFDckcsaUJBQU07UUFFTiwyQkFFQTs7UUFBQSw4QkFDSTtRQUFBLGlDQUVJO1FBRjBDLHlHQUFTLFlBQVEsSUFBQzs7UUFFNUQsd0JBQW1DO1FBQ3ZDLGlCQUFTO1FBQ2IsaUJBQU07UUFDVixpQkFBTTtRQUNWLGlCQUFPOztRQWZVLG9DQUFrQjtRQUc0QixlQUFzQztRQUF0QyxnRUFBc0M7UUFHeEQsZUFBMEQ7UUFBMUQseUZBQTBEO1FBSXZGLGVBQWlEO1FBQWpELGlGQUFpRDs7a0RERHBELDRCQUE0QjtjQUx4QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7YUFDcEQ7OERBRVUsS0FBSztrQkFBYixLQUFLO1lBQ0ksVUFBVTtrQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLXByZXZpZXctc2VhcmNoLWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJldmlldy1zZWFyY2gtZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ByZXZpZXctc2VhcmNoLWZvcm0uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCc1ByZXZpZXdTZWFyY2hGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgcXVlcnk6IFF1ZXJ5O1xuICBAT3V0cHV0KCkgc2VhcmNoVGV4dCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8vIFNlYXJjaCBmb3JtXG4gIHJlYWRvbmx5IGZvcm06IEZvcm1Hcm91cDtcbiAgcmVhZG9ubHkgc2VhcmNoQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIpIHtcblxuICAgIHRoaXMuc2VhcmNoQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICBzZWFyY2g6IHRoaXMuc2VhcmNoQ29udHJvbFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHRleHQgb2YgdGhlIHNlYXJjaCBmb3JtIHdoZW4gdGhlIHF1ZXJ5IGNoYW5nZXNcbiAgICovXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuc2VhcmNoQ29udHJvbC5zZXRWYWx1ZSgoIXRoaXMucXVlcnkgfHwgIXRoaXMucXVlcnkudGV4dCkgPyBcIlwiIDogdGhpcy5xdWVyeS50ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCBmb3IgdGhlIHBhcmVudCBjb21wb25lbnQgdG8gc2VhcmNoIHRoaXMgbmV4dCB0ZXh0XG4gICAqL1xuICBzZWFyY2goKSB7XG4gICAgdGhpcy5zZWFyY2hUZXh0Lm5leHQodGhpcy5zZWFyY2hDb250cm9sLnZhbHVlIHx8IFwiXCIpO1xuICB9XG59XG4iLCI8Zm9ybSBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBtYi0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoLWlucHV0XCIgY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+e3sgJ21zZyNwcmV2aWV3LnNlYXJjaCcgfCBzcU1lc3NhZ2UgfX08L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8aW5wdXQgaWQ9XCJzZWFyY2gtaW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwie3sgJ21zZyNzZWFyY2hGb3JtLnNlYXJjaEZvcicgfCBzcU1lc3NhZ2UgfX1cIiBmb3JtQ29udHJvbE5hbWU9XCJzZWFyY2hcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHNxQXV0b2ZvY3VzPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwic3VibWl0XCIgKGNsaWNrKT1cInNlYXJjaCgpXCIgXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJ7eyAnbXNnI3NlYXJjaEZvcm0uc2VhcmNoJyB8IHNxTWVzc2FnZSB9fVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZ3IGZhLXNlYXJjaFwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZm9ybT4iXX0=