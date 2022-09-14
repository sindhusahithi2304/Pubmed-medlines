import { ViewEncapsulation, Component, Input, Output, EventEmitter } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/components/search";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@angular/common";
function ResultTitle_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 2);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("title", ctx_r0.record.title);
    i0.ɵɵproperty("innerHTML", ctx_r0.title, i0.ɵɵsanitizeHtml);
} }
function ResultTitle_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵlistener("click", function ResultTitle_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.click(); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("title", ctx_r1.record.title);
    i0.ɵɵpropertyInterpolate("href", ctx_r1.href, i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("target", ctx_r1.target);
    i0.ɵɵproperty("innerHTML", ctx_r1.title, i0.ɵɵsanitizeHtml);
} }
export class ResultTitle {
    constructor(searchService, appService) {
        this.searchService = searchService;
        this.appService = appService;
        /**
         * "open" mode: Display a link which opens the original document (url1) if available, or emits a titleClicked event to perform an action otherwise
         * "action" mode: Display a link which emits a titleClicked event to perform an action
         * "open-if-url" mode: Display a link which opens the original document (url1) if available, or displays a SPAN with the title otherwise
         * "display" mode: Only display a SPAN element (no link)
         */
        this.titleLinkBehavior = "open";
        /** Optional field name containing the title. Otherwise displayTitle or title are used */
        this.field = "";
        /** Event emitter to perform actions at the parent level */
        this.titleClicked = new EventEmitter(); // TODO: Custom options to get title & URL (replace pluginservice)
    }
    ngOnChanges(changes) {
        if (changes["record"]) {
            this.titleField = this.appService.resolveColumnAlias(this.field);
            this.title = this.getTitle();
            this.documentUrl = this.record.url1;
        }
    }
    get hasLinkBehaviour() {
        return this.titleLinkBehavior === "open" || (this.titleLinkBehavior === "open-if-url" && this.hasUrl);
    }
    /**
     * A span is shown in "display" mode or "open-if-url" mode when no url is present
     * A link is shown in all other cases (even in "open" mode with no url, which is equivalent to "action" mode)
     */
    get hasSpanBehaviour() {
        return this.titleLinkBehavior === "display" || (this.titleLinkBehavior === "open-if-url" && !this.hasUrl);
    }
    get href() {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }
    get target() {
        return (this.hasLinkBehaviour && this.documentUrl) ? this.originalDocTarget || '_blank' : "_self";
    }
    get hasUrl() {
        return !!this.documentUrl;
    }
    getTitle() {
        let title;
        if (this.titleField) {
            title = Utils.escapeHtml(this.record[this.titleField]);
        }
        if (!title) {
            title = this.record.displayTitle || Utils.escapeHtml(this.record.title);
        }
        return title;
    }
    click() {
        const isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
        if (isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.titleClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}
ResultTitle.ɵfac = function ResultTitle_Factory(t) { return new (t || ResultTitle)(i0.ɵɵdirectiveInject(i1.SearchService), i0.ɵɵdirectiveInject(i2.AppService)); };
ResultTitle.ɵcmp = i0.ɵɵdefineComponent({ type: ResultTitle, selectors: [["sq-result-title"]], inputs: { record: "record", titleLinkBehavior: "titleLinkBehavior", field: "field", originalDocTarget: "originalDocTarget" }, outputs: { titleClicked: "titleClicked" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 2, consts: [["class", "sq-result-title", 3, "title", "innerHTML", 4, "ngIf"], ["class", "sq-result-title", 3, "title", "href", "target", "innerHTML", "click", 4, "ngIf"], [1, "sq-result-title", 3, "title", "innerHTML"], [1, "sq-result-title", 3, "title", "href", "target", "innerHTML", "click"]], template: function ResultTitle_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ResultTitle_span_0_Template, 1, 2, "span", 0);
        i0.ɵɵtemplate(1, ResultTitle_a_1_Template, 1, 4, "a", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasSpanBehaviour);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !ctx.hasSpanBehaviour);
    } }, directives: [i3.NgIf], styles: ["\nsq-result-title {\n    font-size: 1.25rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.match-highlight {\n    font-weight: bold;\n    font-style: italic;\n}\n    "], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ResultTitle, [{
        type: Component,
        args: [{
                selector: "sq-result-title",
                templateUrl: "./result-title.html",
                styles: [`
sq-result-title {
    font-size: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.match-highlight {
    font-weight: bold;
    font-style: italic;
}
    `],
                encapsulation: ViewEncapsulation.None // Currently necessary for the match-highlight
            }]
    }], function () { return [{ type: i1.SearchService }, { type: i2.AppService }]; }, { record: [{
            type: Input
        }], titleLinkBehavior: [{
            type: Input
        }], field: [{
            type: Input
        }], originalDocTarget: [{
            type: Input
        }], titleClicked: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LXRpdGxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcmVzdWx0LyIsInNvdXJjZXMiOlsicmVzdWx0LXRpdGxlL3Jlc3VsdC10aXRsZS50cyIsInJlc3VsdC10aXRsZS9yZXN1bHQtdGl0bGUuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBNEIsTUFBTSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsSCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7Ozs7OztJQ0F6QywwQkFBZ0g7OztJQUF6RCxzREFBNkI7SUFBQywyREFBbUI7Ozs7SUFFeEcsNEJBQTZKO0lBQWxCLG1LQUFpQjtJQUFDLGlCQUFJOzs7SUFBNUcsc0RBQTZCO0lBQUMsK0RBQWU7SUFBQyxpREFBbUI7SUFBQywyREFBbUI7O0FEcUIxSSxNQUFNLE9BQU8sV0FBVztJQXFCcEIsWUFDVyxhQUE0QixFQUMzQixVQUFzQjtRQUR2QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBcEJsQzs7Ozs7V0FLRztRQUNNLHNCQUFpQixHQUFrRCxNQUFNLENBQUM7UUFDbkYseUZBQXlGO1FBQ2hGLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHNUIsMkRBQTJEO1FBQ2pELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQyxDQUFHLGtFQUFrRTtJQVMxSCxDQUFDO0lBRU0sV0FBVyxDQUFDLE9BQXNCO1FBQ3JDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3RHLENBQUM7SUFFRCxJQUFXLE1BQU07UUFDYixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzlCLENBQUM7SUFFTyxRQUFRO1FBQ1osSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLEtBQUs7UUFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQywrREFBK0Q7UUFDM0gsSUFBRyxNQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDaEUsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7c0VBM0VRLFdBQVc7Z0RBQVgsV0FBVztRQ3ZCeEIsOERBQWdIO1FBRWhILHdEQUFpSzs7UUFGMUosMkNBQXNCO1FBRXpCLGVBQXVCO1FBQXZCLDRDQUF1Qjs7a0REcUJkLFdBQVc7Y0FqQnZCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUscUJBQXFCO2dCQUNsQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7S0FXUixDQUFDO2dCQUNGLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUcsOENBQThDO2FBQ3pGO3lGQUdZLE1BQU07a0JBQWQsS0FBSztZQU9HLGlCQUFpQjtrQkFBekIsS0FBSztZQUVHLEtBQUs7a0JBQWIsS0FBSztZQUVHLGlCQUFpQjtrQkFBekIsS0FBSztZQUVJLFlBQVk7a0JBQXJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9uLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtSZWNvcmR9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcmVzdWx0LXRpdGxlXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9yZXN1bHQtdGl0bGUuaHRtbFwiLFxuICAgIHN0eWxlczogW2BcbnNxLXJlc3VsdC10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cbi5tYXRjaC1oaWdobGlnaHQge1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cbiAgICBgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lICAgLy8gQ3VycmVudGx5IG5lY2Vzc2FyeSBmb3IgdGhlIG1hdGNoLWhpZ2hsaWdodFxufSlcbmV4cG9ydCBjbGFzcyBSZXN1bHRUaXRsZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgLyoqIFRoZSByZWNvcmQgd2hpY2ggdGl0bGUgd2Ugd2FudCB0byBkaXNwbGF5ICovXG4gICAgQElucHV0KCkgcmVjb3JkOiBSZWNvcmQ7XG4gICAgLyoqXG4gICAgICogXCJvcGVuXCIgbW9kZTogRGlzcGxheSBhIGxpbmsgd2hpY2ggb3BlbnMgdGhlIG9yaWdpbmFsIGRvY3VtZW50ICh1cmwxKSBpZiBhdmFpbGFibGUsIG9yIGVtaXRzIGEgdGl0bGVDbGlja2VkIGV2ZW50IHRvIHBlcmZvcm0gYW4gYWN0aW9uIG90aGVyd2lzZVxuICAgICAqIFwiYWN0aW9uXCIgbW9kZTogRGlzcGxheSBhIGxpbmsgd2hpY2ggZW1pdHMgYSB0aXRsZUNsaWNrZWQgZXZlbnQgdG8gcGVyZm9ybSBhbiBhY3Rpb25cbiAgICAgKiBcIm9wZW4taWYtdXJsXCIgbW9kZTogRGlzcGxheSBhIGxpbmsgd2hpY2ggb3BlbnMgdGhlIG9yaWdpbmFsIGRvY3VtZW50ICh1cmwxKSBpZiBhdmFpbGFibGUsIG9yIGRpc3BsYXlzIGEgU1BBTiB3aXRoIHRoZSB0aXRsZSBvdGhlcndpc2VcbiAgICAgKiBcImRpc3BsYXlcIiBtb2RlOiBPbmx5IGRpc3BsYXkgYSBTUEFOIGVsZW1lbnQgKG5vIGxpbmspXG4gICAgICovXG4gICAgQElucHV0KCkgdGl0bGVMaW5rQmVoYXZpb3I6IFwib3BlblwiIHwgXCJhY3Rpb25cIiB8IFwib3Blbi1pZi11cmxcIiB8IFwiZGlzcGxheVwiID0gXCJvcGVuXCI7XG4gICAgLyoqIE9wdGlvbmFsIGZpZWxkIG5hbWUgY29udGFpbmluZyB0aGUgdGl0bGUuIE90aGVyd2lzZSBkaXNwbGF5VGl0bGUgb3IgdGl0bGUgYXJlIHVzZWQgKi9cbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nID0gXCJcIjtcbiAgICAvKiogT3B0aW9uYWwgY3VzdG9tIHRhcmdldCB1c2VkIGluIHRoZSBsaW5rICovXG4gICAgQElucHV0KCkgb3JpZ2luYWxEb2NUYXJnZXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKiogRXZlbnQgZW1pdHRlciB0byBwZXJmb3JtIGFjdGlvbnMgYXQgdGhlIHBhcmVudCBsZXZlbCAqL1xuICAgIEBPdXRwdXQoKSB0aXRsZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7ICAgLy8gVE9ETzogQ3VzdG9tIG9wdGlvbnMgdG8gZ2V0IHRpdGxlICYgVVJMIChyZXBsYWNlIHBsdWdpbnNlcnZpY2UpXG5cbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcbiAgICBwcml2YXRlIHRpdGxlRmllbGQ6IHN0cmluZztcbiAgICBwcml2YXRlIGRvY3VtZW50VXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYXBwU2VydmljZTogQXBwU2VydmljZSkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzW1wicmVjb3JkXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlRmllbGQgPSB0aGlzLmFwcFNlcnZpY2UucmVzb2x2ZUNvbHVtbkFsaWFzKHRoaXMuZmllbGQpO1xuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRVcmwgPSB0aGlzLnJlY29yZC51cmwxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGhhc0xpbmtCZWhhdmlvdXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpdGxlTGlua0JlaGF2aW9yID09PSBcIm9wZW5cIiB8fCAodGhpcy50aXRsZUxpbmtCZWhhdmlvciA9PT0gXCJvcGVuLWlmLXVybFwiICYmIHRoaXMuaGFzVXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIHNwYW4gaXMgc2hvd24gaW4gXCJkaXNwbGF5XCIgbW9kZSBvciBcIm9wZW4taWYtdXJsXCIgbW9kZSB3aGVuIG5vIHVybCBpcyBwcmVzZW50XG4gICAgICogQSBsaW5rIGlzIHNob3duIGluIGFsbCBvdGhlciBjYXNlcyAoZXZlbiBpbiBcIm9wZW5cIiBtb2RlIHdpdGggbm8gdXJsLCB3aGljaCBpcyBlcXVpdmFsZW50IHRvIFwiYWN0aW9uXCIgbW9kZSlcbiAgICAgKi9cbiAgICBnZXQgaGFzU3BhbkJlaGF2aW91cigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGl0bGVMaW5rQmVoYXZpb3IgPT09IFwiZGlzcGxheVwiIHx8ICh0aGlzLnRpdGxlTGlua0JlaGF2aW9yID09PSBcIm9wZW4taWYtdXJsXCIgJiYgIXRoaXMuaGFzVXJsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGhyZWYoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhhc0xpbmtCZWhhdmlvdXIgJiYgdGhpcy5kb2N1bWVudFVybCkgfHwgXCIjXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0YXJnZXQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmhhc0xpbmtCZWhhdmlvdXIgJiYgdGhpcy5kb2N1bWVudFVybCkgPyB0aGlzLm9yaWdpbmFsRG9jVGFyZ2V0IHx8ICdfYmxhbmsnIDogXCJfc2VsZlwiO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgZ2V0IGhhc1VybCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5kb2N1bWVudFVybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCB0aXRsZTtcbiAgICAgICAgaWYgKHRoaXMudGl0bGVGaWVsZCkge1xuICAgICAgICAgICAgdGl0bGUgPSBVdGlscy5lc2NhcGVIdG1sKHRoaXMucmVjb3JkW3RoaXMudGl0bGVGaWVsZF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGl0bGUpIHtcbiAgICAgICAgICAgIHRpdGxlID0gdGhpcy5yZWNvcmQuZGlzcGxheVRpdGxlIHx8IFV0aWxzLmVzY2FwZUh0bWwodGhpcy5yZWNvcmQudGl0bGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aXRsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2soKSA6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBpc0xpbmsgPSB0aGlzLmhhc0xpbmtCZWhhdmlvdXIgJiYgISF0aGlzLmRvY3VtZW50VXJsOyAvLyB0cnVlIGlmIHRoaXMgaXMgYSByZWd1bGFyIGxpbmsgKHBlcmZvcm1zIHRoZSBkZWZhdWx0IGFjdGlvbilcbiAgICAgICAgaWYoaXNMaW5rKVxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLm5vdGlmeU9wZW5PcmlnaW5hbERvY3VtZW50KHRoaXMucmVjb3JkKTtcbiAgICAgICAgdGhpcy50aXRsZUNsaWNrZWQuZW1pdChpc0xpbmspOyAvLyBDYW4gYmUgdXNlIHRvIHRyaWdnZXIgYWN0aW9uc1xuICAgICAgICByZXR1cm4gaXNMaW5rO1xuICAgIH1cbn0iLCI8IS0tIERpc3BsYXkgYSByZWd1bGFyIFNQQU4gaWYgdGhlIGNvbXBvbmVudCBpcyBzdXBwb3NlZCB0byBoYXZlIGEgbGluayBiZWhhdmlvciBidXQgaGFzIG5vIFVSTCAtLT5cbjxzcGFuICpuZ0lmPVwiaGFzU3BhbkJlaGF2aW91clwiIGNsYXNzPVwic3EtcmVzdWx0LXRpdGxlXCIgdGl0bGU9XCJ7e3RoaXMucmVjb3JkLnRpdGxlfX1cIiBbaW5uZXJIVE1MXT1cInRpdGxlXCI+PC9zcGFuPlxuPCEtLSBEaXNwbGF5IGEgbGluayBpZiBhIFVSTCBleGlzdHMgb3IgdGhlIGNvbXBvbmVudCBpcyB1c2VkIHRvIHRyaWdnZXIgYW4gYWN0aW9uIC0tPlxuPGEgKm5nSWY9XCIhaGFzU3BhbkJlaGF2aW91clwiIGNsYXNzPVwic3EtcmVzdWx0LXRpdGxlXCIgdGl0bGU9XCJ7e3RoaXMucmVjb3JkLnRpdGxlfX1cIiBocmVmPVwie3tocmVmfX1cIiB0YXJnZXQ9XCJ7e3RhcmdldH19XCIgW2lubmVySFRNTF09XCJ0aXRsZVwiIChjbGljayk9XCJjbGljaygpXCI+PC9hPlxuIl19