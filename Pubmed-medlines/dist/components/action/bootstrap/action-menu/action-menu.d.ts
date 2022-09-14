import { OnInit } from "@angular/core";
import { Action } from "../../action";
import * as i0 from "@angular/core";
export declare class BsActionMenu implements OnInit {
    items: Action[];
    size: string;
    autoAdjust: boolean;
    autoAdjustBreakpoint: string;
    collapseBreakpoint: string;
    right: boolean;
    ngOnInit(): void;
    identify(index: number, item: Action): string | number;
    static ɵfac: i0.ɵɵFactoryDef<BsActionMenu, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsActionMenu, "sq-action-menu", never, { "items": "items"; "size": "size"; "autoAdjust": "autoAdjust"; "autoAdjustBreakpoint": "autoAdjustBreakpoint"; "collapseBreakpoint": "collapseBreakpoint"; "right": "right"; }, {}, never, never>;
}
//# sourceMappingURL=action-menu.d.ts.map