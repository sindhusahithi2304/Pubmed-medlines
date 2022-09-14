import { OnInit, ElementRef } from "@angular/core";
import { Action } from "../../action";
import * as i0 from "@angular/core";
export interface DropdownMenuOptions {
    item: Action;
    rightAligned?: boolean;
    showMenuClass: string;
    header?: string;
}
export declare class BsDropdownMenu implements OnInit {
    private elementRef;
    children: Action[];
    private _options;
    set options(opts: DropdownMenuOptions);
    get options(): DropdownMenuOptions;
    rightAligned: any;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    private getLi;
    click(item: Action, event: UIEvent): void;
    static ɵfac: i0.ɵɵFactoryDef<BsDropdownMenu, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsDropdownMenu, "[sq-dropdown-menu]", never, { "options": "sq-dropdown-menu"; }, {}, never, never>;
}
//# sourceMappingURL=dropdown-menu.d.ts.map