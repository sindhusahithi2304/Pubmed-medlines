import { OnChanges, SimpleChanges } from "@angular/core";
import { Results } from "@sinequa/core/web-services";
import { SearchService } from "../../search.service";
import * as i0 from "@angular/core";
export declare class BsPager implements OnChanges {
    private searchService;
    results: Results;
    showNavigation: boolean;
    showFirstLast: boolean;
    showPages: boolean;
    endPages: number;
    pages: number;
    items: BsPager.Item[] | undefined;
    private currentPage;
    pageCount: number;
    static FIRST_PAGE: string;
    static PREVIOUS_PAGE: string;
    static NEXT_PAGE: string;
    static LAST_PAGE: string;
    static ELLIPSIS: string;
    constructor(searchService: SearchService);
    ngOnChanges(changes: SimpleChanges): void;
    makeItems(): void;
    gotoPage(page: number): void;
    static ɵfac: i0.ɵɵFactoryDef<BsPager, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsPager, "sq-pager", never, { "results": "results"; "showNavigation": "showNavigation"; "showFirstLast": "showFirstLast"; "showPages": "showPages"; "endPages": "endPages"; "pages": "pages"; }, {}, never, never>;
}
export declare namespace BsPager {
    class Item {
        page: number;
        currentPage: number;
        display?: string | number | undefined;
        title?: string | undefined;
        constructor(page: number, currentPage: number, display?: string | number | undefined, title?: string | undefined);
        get active(): boolean;
        get disabled(): boolean;
        get isNavigation(): boolean;
        get isPage(): boolean;
        get isEllipsis(): boolean;
    }
}
//# sourceMappingURL=pager.d.ts.map