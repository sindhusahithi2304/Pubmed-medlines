import { AfterViewInit, TemplateRef } from "@angular/core";
import { AnimationTriggerMetadata } from '@angular/animations';
import * as i0 from "@angular/core";
export declare function collapseAnimations(timings: number | string): AnimationTriggerMetadata[];
export declare class Collapse implements AfterViewInit {
    collapsed: boolean;
    afterViewInit: boolean;
    template: TemplateRef<any>;
    constructor();
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<Collapse, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Collapse, "sq-collapse", never, { "collapsed": "collapsed"; }, {}, ["template"], never>;
}
//# sourceMappingURL=collapse.component.d.ts.map