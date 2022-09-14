import { TemplateRef, ViewContainerRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ɵMatchMedia, BreakPointRegistry } from '@angular/flex-layout';
import * as i0 from "@angular/core";
export declare class MediaIf implements OnDestroy {
    private template;
    private viewContainer;
    private breakpoints;
    private matchMedia;
    private changeDetectorRef;
    private hasView;
    private matcher;
    private subscription;
    set sqMediaIf(value: string);
    constructor(template: TemplateRef<any>, viewContainer: ViewContainerRef, breakpoints: BreakPointRegistry, matchMedia: ɵMatchMedia, changeDetectorRef: ChangeDetectorRef);
    ngOnDestroy(): void;
    private createView;
    private destroyView;
    static ɵfac: i0.ɵɵFactoryDef<MediaIf, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<MediaIf, "[sqMediaIf]", never, { "sqMediaIf": "sqMediaIf"; }, {}, never>;
}
//# sourceMappingURL=media-if.d.ts.map