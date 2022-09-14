import { EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
export interface CollapseStateChange {
    group: string;
    collapsed: boolean;
}
export declare class CollapseLink {
    title: string;
    icon: string;
    text: string;
    group: string;
    stateChange: EventEmitter<CollapseStateChange>;
    collapsed: boolean;
    constructor();
    click(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<CollapseLink, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<CollapseLink, "sq-collapse-link", never, { "title": "title"; "icon": "icon"; "text": "text"; "group": "group"; }, { "stateChange": "stateChange"; }, never, never>;
}
//# sourceMappingURL=collapse-link.component.d.ts.map