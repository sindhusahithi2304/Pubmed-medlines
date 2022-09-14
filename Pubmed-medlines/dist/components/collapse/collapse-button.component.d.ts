import { EventEmitter } from "@angular/core";
import { AnimationTriggerMetadata } from '@angular/animations';
import * as i0 from "@angular/core";
export declare function collapseButtonAnimations(timings: number | string): AnimationTriggerMetadata[];
export declare class CollapseButton {
    collapsed: boolean;
    icon: string;
    text: string;
    state: EventEmitter<boolean>;
    constructor();
    toggleCollapsed(): void;
    static ɵfac: i0.ɵɵFactoryDef<CollapseButton, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<CollapseButton, "sq-collapse-button", never, { "collapsed": "collapsed"; "icon": "icon"; "text": "text"; }, { "state": "state"; }, never, never>;
}
//# sourceMappingURL=collapse-button.component.d.ts.map