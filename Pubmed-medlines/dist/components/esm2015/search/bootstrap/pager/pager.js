import { Component, Input } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "../../search.service";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/intl";
import * as i4 from "@sinequa/components/utils";
const _c0 = function (a0) { return { page: a0 }; };
const _c1 = function (a0) { return { values: a0 }; };
const _c2 = function (a0, a1, a2, a3, a4) { return { "active": a0, "disabled": a1, "sq-navigation": a2, "sq-page": a3, "sq-ellipsis": a4 }; };
function BsPager_ul_0_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 3);
    i0.ɵɵlistener("click", function BsPager_ul_0_li_1_Template_li_click_0_listener() { i0.ɵɵrestoreView(_r4); const item_r2 = ctx.$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.gotoPage(item_r2.page); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelementStart(2, "a", 4);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "sqNumber");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind2(1, 3, item_r2.title, i0.ɵɵpureFunction1(10, _c1, i0.ɵɵpureFunction1(8, _c0, item_r2.page))));
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction5(12, _c2, item_r2.active, item_r2.disabled, item_r2.isNavigation, item_r2.isPage, item_r2.isEllipsis));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 6, item_r2.display));
} }
function BsPager_ul_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 1);
    i0.ɵɵtemplate(1, BsPager_ul_0_li_1_Template, 6, 18, "li", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.items);
} }
export class BsPager {
    constructor(searchService) {
        this.searchService = searchService;
        this.showNavigation = true;
        this.showFirstLast = true;
        this.showPages = true;
        this.endPages = 1;
        this.pages = 5;
        this.pageCount = 0;
    }
    ngOnChanges(changes) {
        if (changes["results"]) {
            this.makeItems();
        }
    }
    makeItems() {
        this.pageCount = this.searchService.pageCount;
        this.currentPage = this.searchService.page;
        if (this.pageCount === 0) {
            this.items = undefined;
            return;
        }
        let endPages = this.endPages;
        if (!endPages || endPages <= 0) {
            endPages = 1;
        }
        const endWidth = endPages + 1; // +1 for the …
        let pages = this.pages;
        if (!pages) {
            pages = 3 + endWidth * 2;
        }
        if (pages < 3 + endWidth * 2) {
            pages = 3 + endWidth * 2; // 3 is the minimum number of pages to show between the … separators
        }
        let split1 = -1, split2 = -1;
        if (this.pageCount <= pages) {
            pages = this.pageCount;
        }
        else {
            // pages must be an odd number to accommodate:  (First page) … (Current page - 1) (Current page) (Current page + 1) … (Last page)
            pages = Math.floor(pages / 2) * 2 + 1;
            const mid = pages - endWidth * 2;
            const delta = Math.floor(mid / 2);
            if ((this.currentPage - delta) > endPages + 1 + 1) {
                split1 = this.currentPage - delta;
            }
            if ((this.currentPage + delta) < (this.pageCount - endWidth)) {
                split2 = this.currentPage + delta;
            }
            if (split1 === -1 && split2 !== -1) {
                split2 += endPages + 1 + 1 - (this.currentPage - delta);
            }
            else if (split2 === -1 && split1 !== -1) {
                split1 -= (this.currentPage + delta) - (this.pageCount - endWidth);
            }
        }
        this.items = [];
        if (this.showNavigation) {
            if (this.showFirstLast) {
                this.items.push(new BsPager.Item(1, this.currentPage, BsPager.FIRST_PAGE, "msg#pager.firstPage"));
            }
            this.items.push(new BsPager.Item(this.currentPage > 1 ? this.currentPage - 1 : 1, this.currentPage, BsPager.PREVIOUS_PAGE, "msg#pager.previousPage"));
        }
        if (this.showPages) {
            for (let i = 1, ic = split1 !== -1 ? endPages : split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                this.items.push(new BsPager.Item(i, this.currentPage));
            }
            if (split1 !== -1) {
                this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                for (let i = split1, ic = split2 !== -1 ? split2 : this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
            }
            if (split2 !== -1) {
                this.items.push(new BsPager.Item(0, this.currentPage, BsPager.ELLIPSIS));
                for (let i = this.pageCount - endPages + 1, ic = this.pageCount; i <= ic; i++) {
                    this.items.push(new BsPager.Item(i, this.currentPage));
                }
            }
        }
        if (this.showNavigation) {
            this.items.push(new BsPager.Item(this.currentPage < this.pageCount ? this.currentPage + 1 : this.pageCount, this.currentPage, BsPager.NEXT_PAGE, "msg#pager.nextPage"));
            if (this.showFirstLast) {
                this.items.push(new BsPager.Item(this.pageCount, this.currentPage, BsPager.LAST_PAGE, "msg#pager.lastPage"));
            }
        }
    }
    gotoPage(page) {
        if (page !== this.currentPage && page > 0) {
            this.searchService.gotoPage(page);
        }
    }
}
BsPager.FIRST_PAGE = "«";
BsPager.PREVIOUS_PAGE = "‹";
BsPager.NEXT_PAGE = "›";
BsPager.LAST_PAGE = "»";
BsPager.ELLIPSIS = "…";
BsPager.ɵfac = function BsPager_Factory(t) { return new (t || BsPager)(i0.ɵɵdirectiveInject(i1.SearchService)); };
BsPager.ɵcmp = i0.ɵɵdefineComponent({ type: BsPager, selectors: [["sq-pager"]], inputs: { results: "results", showNavigation: "showNavigation", showFirstLast: "showFirstLast", showPages: "showPages", endPages: "endPages", pages: "pages" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "pagination my-0", 4, "ngIf"], [1, "pagination", "my-0"], ["class", "page-item", 3, "title", "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "page-item", 3, "title", "ngClass", "click"], ["href", "javascript:void(0)", 1, "page-link"]], template: function BsPager_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsPager_ul_0_Template, 2, 1, "ul", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.pageCount > 1);
    } }, directives: [i2.NgIf, i2.NgForOf, i2.NgClass], pipes: [i3.MessagePipe, i4.NumberPipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsPager, [{
        type: Component,
        args: [{
                selector: "sq-pager",
                templateUrl: "./pager.html",
            }]
    }], function () { return [{ type: i1.SearchService }]; }, { results: [{
            type: Input
        }], showNavigation: [{
            type: Input
        }], showFirstLast: [{
            type: Input
        }], showPages: [{
            type: Input
        }], endPages: [{
            type: Input
        }], pages: [{
            type: Input
        }] }); })();
(function (BsPager) {
    class Item {
        constructor(page, currentPage, display, title) {
            this.page = page;
            this.currentPage = currentPage;
            this.display = display;
            this.title = title;
            if (display) {
                this.display = display;
            }
            else {
                this.display = page;
            }
            if (Utils.isUndefined(title) && page) {
                this.title = "msg#pager.pageNumberTitle";
            }
        }
        get active() {
            return this.isPage && (this.currentPage === this.page);
        }
        get disabled() {
            return this.isEllipsis || ((this.currentPage === this.page) && this.isNavigation);
        }
        get isNavigation() {
            return this.display === BsPager.FIRST_PAGE ||
                this.display === BsPager.PREVIOUS_PAGE ||
                this.display === BsPager.NEXT_PAGE ||
                this.display === BsPager.LAST_PAGE;
        }
        get isPage() {
            return !!this.page && !this.isNavigation;
        }
        get isEllipsis() {
            return this.display === BsPager.ELLIPSIS;
        }
    }
    BsPager.Item = Item;
})(BsPager || (BsPager = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zZWFyY2gvIiwic291cmNlcyI6WyJib290c3RyYXAvcGFnZXIvcGFnZXIudHMiLCJib290c3RyYXAvcGFnZXIvcGFnZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7Ozs7OztJQ0FyQyw2QkFLSTtJQURBLHFOQUE2Qjs7SUFDN0IsNEJBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQTJCOztJQUFBLGlCQUFPO0lBQzVDLGlCQUFJO0lBQ1IsaUJBQUs7OztJQVBELDZJQUFnRTtJQUVoRSxpSkFBMEo7SUFHaEosZUFBMkI7SUFBM0IsMkRBQTJCOzs7SUFQN0MsNkJBQ0k7SUFBQSw0REFRSztJQUNULGlCQUFLOzs7SUFUb0IsZUFBUTtJQUFSLHNDQUFROztBRFFqQyxNQUFNLE9BQU8sT0FBTztJQW1CaEIsWUFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWxCL0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFLM0IsY0FBUyxHQUFXLENBQUMsQ0FBQztJQVV0QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxJ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QUksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxNQUFNO1lBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVELElBQUksUUFBUTtZQUNSLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RGLENBQUM7UUFFRCxJQUFJLFlBQVk7WUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLFVBQVU7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLGFBQWE7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLFNBQVM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsSUFBSSxNQUFNO1lBQ04sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksVUFBVTtZQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzdDLENBQUM7S0FDSjtJQXZDWSxZQUFJLE9BdUNoQixDQUFBO0FBQ0wsQ0FBQyxFQXpDZ0IsT0FBTyxLQUFQLE9BQU8sUUF5Q3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1Jlc3VsdHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VhcmNoLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtcGFnZXJcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VyLmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQnNQYWdlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgcmVzdWx0czogUmVzdWx0cztcbiAgICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd0ZpcnN0TGFzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd1BhZ2VzOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBlbmRQYWdlczogbnVtYmVyID0gMTtcbiAgICBASW5wdXQoKSBwYWdlczogbnVtYmVyID0gNTtcblxuICAgIGl0ZW1zOiBCc1BhZ2VyLkl0ZW1bXSB8IHVuZGVmaW5lZDtcblxuICAgIHByaXZhdGUgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgICBwYWdlQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBzdGF0aWMgRklSU1RfUEFHRSA9IFwiwqtcIjtcbiAgICBzdGF0aWMgUFJFVklPVVNfUEFHRSA9IFwi4oC5XCI7XG4gICAgc3RhdGljIE5FWFRfUEFHRSA9IFwi4oC6XCI7XG4gICAgc3RhdGljIExBU1RfUEFHRSA9IFwiwrtcIjtcbiAgICBzdGF0aWMgRUxMSVBTSVMgPSBcIuKAplwiO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSkge1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbXCJyZXN1bHRzXCJdKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VJdGVtcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFrZUl0ZW1zKCkge1xuICAgICAgICB0aGlzLnBhZ2VDb3VudCA9IHRoaXMuc2VhcmNoU2VydmljZS5wYWdlQ291bnQ7XG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnNlYXJjaFNlcnZpY2UucGFnZTtcbiAgICAgICAgaWYgKHRoaXMucGFnZUNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlbmRQYWdlcyA9IHRoaXMuZW5kUGFnZXM7XG4gICAgICAgIGlmICghZW5kUGFnZXMgfHwgZW5kUGFnZXMgPD0gMCkge1xuICAgICAgICAgICAgZW5kUGFnZXMgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5kV2lkdGggPSBlbmRQYWdlcyArIDE7IC8vICsxIGZvciB0aGUg4oCmXG5cbiAgICAgICAgbGV0IHBhZ2VzID0gdGhpcy5wYWdlcztcbiAgICAgICAgaWYgKCFwYWdlcykge1xuICAgICAgICAgICAgcGFnZXMgPSAzICsgZW5kV2lkdGggKiAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWdlcyA8IDMgKyBlbmRXaWR0aCAqIDIpIHtcbiAgICAgICAgICAgIHBhZ2VzID0gMyArIGVuZFdpZHRoICogMjsgLy8gMyBpcyB0aGUgbWluaW11bSBudW1iZXIgb2YgcGFnZXMgdG8gc2hvdyBiZXR3ZWVuIHRoZSDigKYgc2VwYXJhdG9yc1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcGxpdDEgPSAtMSwgc3BsaXQyID0gLTE7XG4gICAgICAgIGlmICh0aGlzLnBhZ2VDb3VudCA8PSBwYWdlcykge1xuICAgICAgICAgICAgcGFnZXMgPSB0aGlzLnBhZ2VDb3VudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHBhZ2VzIG11c3QgYmUgYW4gb2RkIG51bWJlciB0byBhY2NvbW1vZGF0ZTogIChGaXJzdCBwYWdlKSDigKYgKEN1cnJlbnQgcGFnZSAtIDEpIChDdXJyZW50IHBhZ2UpIChDdXJyZW50IHBhZ2UgKyAxKSDigKYgKExhc3QgcGFnZSlcbiAgICAgICAgICAgIHBhZ2VzID0gTWF0aC5mbG9vcihwYWdlcyAvIDIpICogMiArIDE7XG4gICAgICAgICAgICBjb25zdCBtaWQgPSBwYWdlcyAtIGVuZFdpZHRoICogMjtcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gTWF0aC5mbG9vcihtaWQgLyAyKTtcbiAgICAgICAgICAgIGlmICgodGhpcy5jdXJyZW50UGFnZSAtIGRlbHRhKSA+IGVuZFBhZ2VzICsgMSArIDEpIHtcbiAgICAgICAgICAgICAgICBzcGxpdDEgPSB0aGlzLmN1cnJlbnRQYWdlIC0gZGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuY3VycmVudFBhZ2UgKyBkZWx0YSkgPCAodGhpcy5wYWdlQ291bnQgLSBlbmRXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICBzcGxpdDIgPSB0aGlzLmN1cnJlbnRQYWdlICsgZGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3BsaXQxID09PSAtMSAmJiBzcGxpdDIgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3BsaXQyICs9IGVuZFBhZ2VzICsgMSArIDEgLSAodGhpcy5jdXJyZW50UGFnZSAtIGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHNwbGl0MiA9PT0gLTEgJiYgc3BsaXQxICE9PSAtMSkgIHtcbiAgICAgICAgICAgICAgICBzcGxpdDEgLT0gKHRoaXMuY3VycmVudFBhZ2UgKyBkZWx0YSkgLSAodGhpcy5wYWdlQ291bnQgLSBlbmRXaWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICBpZiAodGhpcy5zaG93TmF2aWdhdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0ZpcnN0TGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgQnNQYWdlci5JdGVtKDEsIHRoaXMuY3VycmVudFBhZ2UsIEJzUGFnZXIuRklSU1RfUEFHRSwgXCJtc2cjcGFnZXIuZmlyc3RQYWdlXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgQnNQYWdlci5JdGVtKHRoaXMuY3VycmVudFBhZ2UgPiAxID8gdGhpcy5jdXJyZW50UGFnZSAtIDEgOiAxLCB0aGlzLmN1cnJlbnRQYWdlLCBCc1BhZ2VyLlBSRVZJT1VTX1BBR0UsIFwibXNnI3BhZ2VyLnByZXZpb3VzUGFnZVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2hvd1BhZ2VzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMSwgaWMgPSBzcGxpdDEgIT09IC0xID8gZW5kUGFnZXMgOiBzcGxpdDIgIT09IC0xID8gc3BsaXQyIDogdGhpcy5wYWdlQ291bnQ7IGkgPD0gaWM7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgQnNQYWdlci5JdGVtKGksIHRoaXMuY3VycmVudFBhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGxpdDEgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBCc1BhZ2VyLkl0ZW0oMCwgdGhpcy5jdXJyZW50UGFnZSwgQnNQYWdlci5FTExJUFNJUykpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzcGxpdDEsIGljID0gc3BsaXQyICE9PSAtMSA/IHNwbGl0MiA6IHRoaXMucGFnZUNvdW50OyBpIDw9IGljOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBCc1BhZ2VyLkl0ZW0oaSwgdGhpcy5jdXJyZW50UGFnZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGxpdDIgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBCc1BhZ2VyLkl0ZW0oMCwgdGhpcy5jdXJyZW50UGFnZSwgQnNQYWdlci5FTExJUFNJUykpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnBhZ2VDb3VudCAtIGVuZFBhZ2VzICsgMSwgaWMgPSB0aGlzLnBhZ2VDb3VudDsgaSA8PSBpYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgQnNQYWdlci5JdGVtKGksIHRoaXMuY3VycmVudFBhZ2UpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2hvd05hdmlnYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgQnNQYWdlci5JdGVtKHRoaXMuY3VycmVudFBhZ2UgPCB0aGlzLnBhZ2VDb3VudCA/IHRoaXMuY3VycmVudFBhZ2UgKyAxIDogdGhpcy5wYWdlQ291bnQsIHRoaXMuY3VycmVudFBhZ2UsIEJzUGFnZXIuTkVYVF9QQUdFLCBcIm1zZyNwYWdlci5uZXh0UGFnZVwiKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG93Rmlyc3RMYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBCc1BhZ2VyLkl0ZW0odGhpcy5wYWdlQ291bnQsIHRoaXMuY3VycmVudFBhZ2UsIEJzUGFnZXIuTEFTVF9QQUdFLCBcIm1zZyNwYWdlci5sYXN0UGFnZVwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnb3RvUGFnZShwYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHBhZ2UgIT09IHRoaXMuY3VycmVudFBhZ2UgJiYgcGFnZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5nb3RvUGFnZShwYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBCc1BhZ2VyIHtcbiAgICBleHBvcnQgY2xhc3MgSXRlbSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAgICAgcHVibGljIHBhZ2U6IG51bWJlcixcbiAgICAgICAgICAgIHB1YmxpYyBjdXJyZW50UGFnZTogbnVtYmVyLFxuICAgICAgICAgICAgcHVibGljIGRpc3BsYXk/OiBzdHJpbmcgfCBudW1iZXIsXG4gICAgICAgICAgICBwdWJsaWMgdGl0bGU/OiBzdHJpbmcpIHtcbiAgICAgICAgICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID0gZGlzcGxheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9IHBhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNVbmRlZmluZWQodGl0bGUpICYmIHBhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJtc2cjcGFnZXIucGFnZU51bWJlclRpdGxlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNQYWdlICYmICh0aGlzLmN1cnJlbnRQYWdlID09PSB0aGlzLnBhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNFbGxpcHNpcyB8fCAoKHRoaXMuY3VycmVudFBhZ2UgPT09IHRoaXMucGFnZSkgJiYgdGhpcy5pc05hdmlnYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGlzTmF2aWdhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkgPT09IEJzUGFnZXIuRklSU1RfUEFHRSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9PT0gQnNQYWdlci5QUkVWSU9VU19QQUdFIHx8XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ID09PSBCc1BhZ2VyLk5FWFRfUEFHRSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSA9PT0gQnNQYWdlci5MQVNUX1BBR0U7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNQYWdlKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5wYWdlICYmICF0aGlzLmlzTmF2aWdhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBpc0VsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheSA9PT0gQnNQYWdlci5FTExJUFNJUztcbiAgICAgICAgfVxuICAgIH1cbn0iLCI8dWwgY2xhc3M9XCJwYWdpbmF0aW9uIG15LTBcIiAqbmdJZj1cInBhZ2VDb3VudCA+IDFcIj5cbiAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIiBcbiAgICAgICAgdGl0bGU9XCJ7e2l0ZW0udGl0bGUgfCBzcU1lc3NhZ2U6e3ZhbHVlczoge3BhZ2U6IGl0ZW0ucGFnZX0gfSB9fVwiIFxuICAgICAgICBjbGFzcz1cInBhZ2UtaXRlbVwiIFxuICAgICAgICBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGl0ZW0uYWN0aXZlLCAnZGlzYWJsZWQnOiBpdGVtLmRpc2FibGVkLCAnc3EtbmF2aWdhdGlvbic6IGl0ZW0uaXNOYXZpZ2F0aW9uLCAnc3EtcGFnZSc6IGl0ZW0uaXNQYWdlLCAnc3EtZWxsaXBzaXMnOiBpdGVtLmlzRWxsaXBzaXN9XCIgXG4gICAgICAgIChjbGljayk9XCJnb3RvUGFnZShpdGVtLnBhZ2UpXCI+XG4gICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInBhZ2UtbGlua1wiPiBcbiAgICAgICAgICAgIDxzcGFuPnt7aXRlbS5kaXNwbGF5IHwgc3FOdW1iZXJ9fTwvc3Bhbj5cbiAgICAgICAgPC9hPiAgICAgICAgICAgIFxuICAgIDwvbGk+XG48L3VsPiJdfQ==