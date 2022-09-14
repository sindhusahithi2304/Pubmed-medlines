import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UIService } from '../ui.service';
import * as i0 from "@angular/core";
export declare class StickyComponent implements OnInit, AfterViewInit, OnDestroy {
    protected ui: UIService;
    protected cdRef: ChangeDetectorRef;
    offsets?: {
        top: number;
        bottom: number;
    };
    container: ElementRef;
    top?: number;
    bottom?: number;
    scrollY: number;
    marginTop: number;
    private listener;
    constructor(ui: UIService, cdRef: ChangeDetectorRef);
    onScroll(forceScrollDown?: boolean): void;
    postScrollUp: (...params: any[]) => any;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<StickyComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<StickyComponent, "[sqSticky]", never, { "offsets": "sqSticky"; }, {}, never, ["*"]>;
}
//# sourceMappingURL=sticky.d.ts.map