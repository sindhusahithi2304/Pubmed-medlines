import { Component, Input } from '@angular/core';
import { Utils } from "@sinequa/core/base";
import { Query } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/core/web-services";
import * as i4 from "@angular/common";
import * as i5 from "@sinequa/core/intl";
function SponsoredResults_ul_0_li_1_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelementStart(1, "a", 10);
    i0.ɵɵlistener("click", function SponsoredResults_ul_0_li_1_div_2_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r7); const link_r2 = i0.ɵɵnextContext().$implicit; const ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.click(link_r2); });
    i0.ɵɵelement(2, "img", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("href", link_r2.url, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("src", link_r2.thumbnail, i0.ɵɵsanitizeUrl);
} }
function SponsoredResults_ul_0_li_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, link_r2.summary));
} }
function SponsoredResults_ul_0_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 3);
    i0.ɵɵelementStart(1, "div", 4);
    i0.ɵɵtemplate(2, SponsoredResults_ul_0_li_1_div_2_Template, 3, 2, "div", 5);
    i0.ɵɵelementStart(3, "div", 6);
    i0.ɵɵelementStart(4, "a", 7);
    i0.ɵɵlistener("click", function SponsoredResults_ul_0_li_1_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r11); const link_r2 = ctx.$implicit; const ctx_r10 = i0.ɵɵnextContext(2); return ctx_r10.click(link_r2); });
    i0.ɵɵpipe(5, "sqMessage");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, SponsoredResults_ul_0_li_1_div_8_Template, 3, 3, "div", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", link_r2.thumbnail);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate("href", link_r2.url, i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(5, 5, link_r2.title));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(7, 7, link_r2.title));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", link_r2.summary);
} }
function SponsoredResults_ul_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 1);
    i0.ɵɵtemplate(1, SponsoredResults_ul_0_li_1_Template, 9, 9, "li", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.sponsoredlinks);
} }
/**
 * Represent the component that display the sponsored results on result page.
 * NOTE: this class and (its containing file) could have been named SponsoredLinks but this naming causes
 * the file to be flagged as ads by Adblock.
 */
export class SponsoredResults {
    constructor(appService, searchService, sponsoredResultsService, auditService, changeDetectorRef) {
        this.appService = appService;
        this.searchService = searchService;
        this.sponsoredResultsService = sponsoredResultsService;
        this.auditService = auditService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * Considers the text of the new query and sees if the list of the sponsored lists needs to be updated.
     *
     * @param text The text of the new query.
     * @memberof SponsoredLinks
     */
    updateSponsoredLinksIfNecessary(text) {
        if (!this.appService.app) {
            return; // logout
        }
        let redoQuery = false;
        const currentWS = this.getWebService();
        if (!Utils.eqNC(this.webService, currentWS)) {
            this.webService = currentWS;
            redoQuery = true;
        }
        if (!redoQuery && !Utils.eqNC(this.lastText, text)) {
            this.lastText = text;
            redoQuery = true;
        }
        if (!redoQuery && this.currentPage !== this.searchService.query.page) {
            this.currentPage = this.searchService.query.page;
            redoQuery = true;
        }
        if (redoQuery) {
            if (!Utils.isEmpty(this.webService) && !Utils.isEmpty(text)) {
                this.linksQuery.text = text;
                this.linksQuery.page = this.currentPage;
                Utils.subscribe(this.sponsoredResultsService.getLinks(this.linksQuery, this.webService), (results) => {
                    this.sponsoredlinks = results.links;
                    this.auditLinksDisplay();
                    this.changeDetectorRef.markForCheck();
                }, (error) => console.log(`Could not retrieve sponsored links: ${error}.`));
            }
            else {
                this.sponsoredlinks = [];
            }
        }
    }
    /**
     * Retrieves the web service for sponsored links.
     * If it is defined both in the component configuration and the app configuration,
     * this method returns the one in the component configuration.
     *
     * @returns the web service for sponsored links.
     */
    getWebService() {
        return (this.appService.app && this.appService.app.sponsoredLinks) || "";
    }
    ngOnChanges(changes) {
        if (!this.initDone) {
            this.initialize();
        }
        if (changes['query'] || changes['results']) {
            this.updateSponsoredLinksIfNecessary(Utils.trim(this.query.text || ""));
        }
    }
    initialize() {
        if (this.initDone) {
            return;
        }
        if (this.appService.ccquery) {
            this.linksQuery = new Query(this.appService.ccquery.name);
        }
        else {
            return;
        }
        this.initDone = true;
    }
    ngOnInit() {
        this.initialize();
    }
    auditLinksDisplay() {
        if (!!this.sponsoredlinks && this.sponsoredlinks.length > 0) {
            const auditEvents = [];
            this.sponsoredlinks.forEach(link => {
                auditEvents.push({
                    type: "Link_Display" /* Link_Display */,
                    detail: {
                        resultid: this.searchService.results && this.searchService.results.id,
                        linkid: link.id,
                        rank: link.rank,
                        title: link.title,
                        url: link.url
                    }
                });
            });
            this.auditService.notify(auditEvents);
        }
    }
    click(link) {
        this.auditService.notifySponsoredLink("Link_Click" /* Link_Click */, link, this.searchService.results && this.searchService.results.id || "");
    }
}
SponsoredResults.ɵfac = function SponsoredResults_Factory(t) { return new (t || SponsoredResults)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(i3.SponsoredLinksWebService), i0.ɵɵdirectiveInject(i3.AuditWebService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SponsoredResults.ɵcmp = i0.ɵɵdefineComponent({ type: SponsoredResults, selectors: [["sq-sponsored-results"]], inputs: { query: "query" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "sq-sponsored-links-list", 4, "ngIf"], [1, "sq-sponsored-links-list"], ["class", "sponsored-item", 4, "ngFor", "ngForOf"], [1, "sponsored-item"], [1, "sq-sponsored-link-view"], ["class", "sq-sponsored-link-view-thumbnail", 4, "ngIf"], [1, "sq-sponsored-link-view-info"], ["target", "_blank", 3, "href", "title", "click"], ["class", "sq-sponsored-link-view-summary", 4, "ngIf"], [1, "sq-sponsored-link-view-thumbnail"], ["target", "_blank", 3, "href", "click"], [3, "src"], [1, "sq-sponsored-link-view-summary"]], template: function SponsoredResults_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SponsoredResults_ul_0_Template, 2, 1, "ul", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !!ctx.sponsoredlinks);
    } }, directives: [i4.NgIf, i4.NgForOf], pipes: [i5.MessagePipe], styles: [".sq-sponsored-links-list[_ngcontent-%COMP%]{list-style:none;padding:0}.sq-sponsored-links-list[_ngcontent-%COMP%] > .sponsored-item[_ngcontent-%COMP%]{overflow:hidden;overflow-wrap:break-word;text-overflow:ellipsis;word-break:break-word;word-wrap:break-word}.sq-sponsored-link-view[_ngcontent-%COMP%]{align-items:center;display:flex}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]{flex:1;min-width:0}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]   .sq-sponsored-link-view-summary[_ngcontent-%COMP%], .sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-info[_ngcontent-%COMP%]   .sq-sponsored-link-view-title[_ngcontent-%COMP%]{min-width:0}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-thumbnail[_ngcontent-%COMP%]{margin-right:1em}.sq-sponsored-link-view[_ngcontent-%COMP%]   .sq-sponsored-link-view-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:7rem;max-width:5rem}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SponsoredResults, [{
        type: Component,
        args: [{
                selector: 'sq-sponsored-results',
                templateUrl: './sponsored-results.html',
                styleUrls: ["./sponsored-results.scss"]
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.SearchService }, { type: i3.SponsoredLinksWebService }, { type: i3.AuditWebService }, { type: i0.ChangeDetectorRef }]; }, { query: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvbnNvcmVkLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9yZXN1bHQvIiwic291cmNlcyI6WyJzcG9uc29yZWQtcmVzdWx0cy9zcG9uc29yZWQtcmVzdWx0cy50cyIsInNwb25zb3JlZC1yZXN1bHRzL3Nwb25zb3JlZC1yZXN1bHRzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXVELE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUzQyxPQUFPLEVBQWMsS0FBSyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7OztJQ0FoRCw4QkFDSTtJQUFBLDZCQUNJO0lBRG1CLDBPQUFxQjtJQUN4QywwQkFDSjtJQUFBLGlCQUFJO0lBQ1IsaUJBQU07OztJQUhDLGVBQW1CO0lBQW5CLCtEQUFtQjtJQUNiLGVBQXdCO0lBQXhCLG9FQUF3Qjs7O0lBS2pDLCtCQUFpRTtJQUFBLFlBQTRCOztJQUFBLGlCQUFNOzs7SUFBbEMsZUFBNEI7SUFBNUIsMkRBQTRCOzs7O0lBVHpHLDZCQUNJO0lBQUEsOEJBQ0k7SUFBQSwyRUFJTTtJQUNOLDhCQUNJO0lBQUEsNEJBQWdHO0lBQXpFLHdOQUFxQjs7SUFBb0QsWUFBMEI7O0lBQUEsaUJBQUk7SUFDOUgsMkVBQW1HO0lBQ3ZHLGlCQUFNO0lBQ1YsaUJBQU07SUFDVixpQkFBSzs7O0lBVlMsZUFBb0I7SUFBcEIsd0NBQW9CO0lBTW5CLGVBQW1CO0lBQW5CLCtEQUFtQjtJQUF1QyxzRUFBa0M7SUFBQyxlQUEwQjtJQUExQix5REFBMEI7SUFDcEgsZUFBa0I7SUFBbEIsc0NBQWtCOzs7SUFWeEMsNkJBQ0k7SUFBQSxvRUFZSztJQUNULGlCQUFLOzs7SUFib0IsZUFBaUI7SUFBakIsK0NBQWlCOztBRFcxQzs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLGdC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WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFnQjtRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixnQ0FBNEIsSUFBSSxFQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Z0ZBN0hRLGdCQUFnQjtxREFBaEIsZ0JBQWdCO1FDakI3QiwrREFjSzs7UUFkZ0MsMkNBQXNCOztrRERpQjlDLGdCQUFnQjtjQVg1QixTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsV0FBVyxFQUFFLDBCQUEwQjtnQkFDdkMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7YUFDMUM7OExBUVksS0FBSztrQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkluaXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7IExpbmtSZXN1bHQsIFNwb25zb3JlZExpbmtzV2ViU2VydmljZSwgQXVkaXRXZWJTZXJ2aWNlLCBBdWRpdEV2ZW50VHlwZSwgQXVkaXRFdmVudCB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgQXBwU2VydmljZSwgUXVlcnkgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7U2VhcmNoU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc3Etc3BvbnNvcmVkLXJlc3VsdHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zcG9uc29yZWQtcmVzdWx0cy5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcIi4vc3BvbnNvcmVkLXJlc3VsdHMuc2Nzc1wiXVxufSlcblxuLyoqXG4gKiBSZXByZXNlbnQgdGhlIGNvbXBvbmVudCB0aGF0IGRpc3BsYXkgdGhlIHNwb25zb3JlZCByZXN1bHRzIG9uIHJlc3VsdCBwYWdlLlxuICogTk9URTogdGhpcyBjbGFzcyBhbmQgKGl0cyBjb250YWluaW5nIGZpbGUpIGNvdWxkIGhhdmUgYmVlbiBuYW1lZCBTcG9uc29yZWRMaW5rcyBidXQgdGhpcyBuYW1pbmcgY2F1c2VzXG4gKiB0aGUgZmlsZSB0byBiZSBmbGFnZ2VkIGFzIGFkcyBieSBBZGJsb2NrLlxuICovXG5leHBvcnQgY2xhc3MgU3BvbnNvcmVkUmVzdWx0cyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgICBASW5wdXQoKSBxdWVyeTogUXVlcnk7XG4gICAgcHVibGljIHNwb25zb3JlZGxpbmtzOiBMaW5rUmVzdWx0W107XG5cbiAgICBwcml2YXRlIGxhc3RUZXh0OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBjdXJyZW50UGFnZT86IG51bWJlcjtcbiAgICBwcml2YXRlIGxpbmtzUXVlcnk6IFF1ZXJ5O1xuICAgIHByaXZhdGUgaW5pdERvbmU6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSB3ZWJTZXJ2aWNlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc3BvbnNvcmVkUmVzdWx0c1NlcnZpY2U6IFNwb25zb3JlZExpbmtzV2ViU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhdWRpdFNlcnZpY2U6IEF1ZGl0V2ViU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zaWRlcnMgdGhlIHRleHQgb2YgdGhlIG5ldyBxdWVyeSBhbmQgc2VlcyBpZiB0aGUgbGlzdCBvZiB0aGUgc3BvbnNvcmVkIGxpc3RzIG5lZWRzIHRvIGJlIHVwZGF0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCBvZiB0aGUgbmV3IHF1ZXJ5LlxuICAgICAqIEBtZW1iZXJvZiBTcG9uc29yZWRMaW5rc1xuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlU3BvbnNvcmVkTGlua3NJZk5lY2Vzc2FyeSh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcFNlcnZpY2UuYXBwKSB7XG4gICAgICAgICAgICByZXR1cm47IC8vIGxvZ291dFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlZG9RdWVyeSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjdXJyZW50V1MgPSB0aGlzLmdldFdlYlNlcnZpY2UoKTtcbiAgICAgICAgaWYgKCFVdGlscy5lcU5DKHRoaXMud2ViU2VydmljZSwgY3VycmVudFdTKSkge1xuICAgICAgICAgICAgdGhpcy53ZWJTZXJ2aWNlID0gY3VycmVudFdTO1xuICAgICAgICAgICAgcmVkb1F1ZXJ5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVkb1F1ZXJ5ICYmICFVdGlscy5lcU5DKHRoaXMubGFzdFRleHQsIHRleHQpKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RUZXh0ID0gdGV4dDtcbiAgICAgICAgICAgIHJlZG9RdWVyeSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlZG9RdWVyeSAmJiB0aGlzLmN1cnJlbnRQYWdlICE9PSB0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkucGFnZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5wYWdlO1xuICAgICAgICAgICAgcmVkb1F1ZXJ5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWRvUXVlcnkpIHtcbiAgICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eSh0aGlzLndlYlNlcnZpY2UpICYmICFVdGlscy5pc0VtcHR5KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rc1F1ZXJ5LnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMubGlua3NRdWVyeS5wYWdlID0gdGhpcy5jdXJyZW50UGFnZTtcbiAgICAgICAgICAgICAgICBVdGlscy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BvbnNvcmVkUmVzdWx0c1NlcnZpY2UuZ2V0TGlua3ModGhpcy5saW5rc1F1ZXJ5LCB0aGlzLndlYlNlcnZpY2UpLFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcG9uc29yZWRsaW5rcyA9IHJlc3VsdHMubGlua3M7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF1ZGl0TGlua3NEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3IpID0+IGNvbnNvbGUubG9nKGBDb3VsZCBub3QgcmV0cmlldmUgc3BvbnNvcmVkIGxpbmtzOiAke2Vycm9yfS5gKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BvbnNvcmVkbGlua3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgd2ViIHNlcnZpY2UgZm9yIHNwb25zb3JlZCBsaW5rcy5cbiAgICAgKiBJZiBpdCBpcyBkZWZpbmVkIGJvdGggaW4gdGhlIGNvbXBvbmVudCBjb25maWd1cmF0aW9uIGFuZCB0aGUgYXBwIGNvbmZpZ3VyYXRpb24sXG4gICAgICogdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgb25lIGluIHRoZSBjb21wb25lbnQgY29uZmlndXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSB3ZWIgc2VydmljZSBmb3Igc3BvbnNvcmVkIGxpbmtzLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0V2ViU2VydmljZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gKHRoaXMuYXBwU2VydmljZS5hcHAgJiYgdGhpcy5hcHBTZXJ2aWNlLmFwcC5zcG9uc29yZWRMaW5rcykgfHwgXCJcIjtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0RG9uZSkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlc1sncXVlcnknXSB8fCBjaGFuZ2VzWydyZXN1bHRzJ10pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3BvbnNvcmVkTGlua3NJZk5lY2Vzc2FyeShVdGlscy50cmltKHRoaXMucXVlcnkudGV4dCB8fCBcIlwiKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmluaXREb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hcHBTZXJ2aWNlLmNjcXVlcnkpIHtcbiAgICAgICAgICAgIHRoaXMubGlua3NRdWVyeSA9IG5ldyBRdWVyeSh0aGlzLmFwcFNlcnZpY2UuY2NxdWVyeS5uYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXREb25lID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgYXVkaXRMaW5rc0Rpc3BsYXkoKSB7XG4gICAgICAgIGlmICghIXRoaXMuc3BvbnNvcmVkbGlua3MgJiYgdGhpcy5zcG9uc29yZWRsaW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhdWRpdEV2ZW50czogQXVkaXRFdmVudFtdID0gW107XG4gICAgICAgICAgICB0aGlzLnNwb25zb3JlZGxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgICAgICAgICAgYXVkaXRFdmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLkxpbmtfRGlzcGxheSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRpZDogdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLnJlc3VsdHMuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5raWQ6IGxpbmsuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5rOiBsaW5rLnJhbmssXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbGluay50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogbGluay51cmxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmF1ZGl0U2VydmljZS5ub3RpZnkoYXVkaXRFdmVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2sobGluazogTGlua1Jlc3VsdCkge1xuICAgICAgICB0aGlzLmF1ZGl0U2VydmljZS5ub3RpZnlTcG9uc29yZWRMaW5rKEF1ZGl0RXZlbnRUeXBlLkxpbmtfQ2xpY2ssIGxpbmssXG4gICAgICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cyAmJiB0aGlzLnNlYXJjaFNlcnZpY2UucmVzdWx0cy5pZCB8fCBcIlwiKTtcbiAgICB9XG59XG4iLCI8dWwgY2xhc3M9XCJzcS1zcG9uc29yZWQtbGlua3MtbGlzdFwiICpuZ0lmPVwiISFzcG9uc29yZWRsaW5rc1wiID5cbiAgICA8bGkgKm5nRm9yPVwibGV0IGxpbmsgb2Ygc3BvbnNvcmVkbGlua3NcIiBjbGFzcz1cInNwb25zb3JlZC1pdGVtXCIgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Etc3BvbnNvcmVkLWxpbmstdmlld1wiPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImxpbmsudGh1bWJuYWlsXCIgY2xhc3M9XCJzcS1zcG9uc29yZWQtbGluay12aWV3LXRodW1ibmFpbFwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ7e2xpbmsudXJsfX1cIiAoY2xpY2spPVwiY2xpY2sobGluaylcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJ7e2xpbmsudGh1bWJuYWlsfX1cIj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcS1zcG9uc29yZWQtbGluay12aWV3LWluZm9cIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwie3tsaW5rLnVybH19XCIgKGNsaWNrKT1cImNsaWNrKGxpbmspXCIgdGFyZ2V0PVwiX2JsYW5rXCIgdGl0bGU9XCJ7e2xpbmsudGl0bGUgfCBzcU1lc3NhZ2V9fVwiPnt7bGluay50aXRsZSB8IHNxTWVzc2FnZX19PC9hPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJsaW5rLnN1bW1hcnlcIiBjbGFzcz1cInNxLXNwb25zb3JlZC1saW5rLXZpZXctc3VtbWFyeVwiPnt7bGluay5zdW1tYXJ5IHwgc3FNZXNzYWdlfX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuPC91bD5cbiJdfQ==