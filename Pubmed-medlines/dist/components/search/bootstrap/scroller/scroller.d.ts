import { ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { SearchService } from '../../search.service';
import * as i0 from "@angular/core";
export declare class BsScroller implements AfterViewInit, OnDestroy {
    private searchService;
    options: {};
    anchor: ElementRef<HTMLElement>;
    private observer;
    constructor(searchService: SearchService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsScroller, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsScroller, "sq-scroller", never, { "options": "options"; }, {}, never, never>;
}
//# sourceMappingURL=scroller.d.ts.map