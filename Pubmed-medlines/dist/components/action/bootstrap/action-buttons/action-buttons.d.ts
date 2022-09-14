import { ActionItemOptions } from "..";
import { Action } from "../../action";
import * as i0 from "@angular/core";
export interface ActionButtonsOptions {
    items: Action[] | Action;
    size?: string;
    style?: string;
    autoAdjust?: boolean;
    autoAdjustBreakpoint?: string;
    rightAligned?: boolean;
}
export declare class BsActionButtons {
    private _options;
    set options(opts: ActionButtonsOptions);
    get options(): ActionButtonsOptions;
    get sizeClass(): string;
    get styleClass(): string;
    get itemsVisible(): Action[];
    getActionItemOptions(item: Action): ActionItemOptions;
    itemClick(item: Action, event: UIEvent): void;
    static ɵfac: i0.ɵɵFactoryDef<BsActionButtons, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsActionButtons, "[sq-action-buttons]", never, { "options": "sq-action-buttons"; }, {}, never, never>;
}
//# sourceMappingURL=action-buttons.d.ts.map