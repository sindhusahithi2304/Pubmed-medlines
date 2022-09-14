import { OnInit, AfterViewInit, ElementRef, ChangeDetectorRef } from "@angular/core";
import { Action } from "../../action";
import { UIService } from "@sinequa/components/utils";
import { DropdownMenuOptions } from "../dropdown-menu/dropdown-menu";
import * as i0 from "@angular/core";
export interface ActionItemOptions {
    item: Action;
    size?: string;
    style?: string;
    autoAdjust?: boolean;
    autoAdjustBreakpoint?: string;
    inMenu: boolean;
    rightAligned?: boolean;
}
export declare class BsActionItem implements OnInit, AfterViewInit {
    private uiService;
    private elementRef;
    private cdRef;
    options: ActionItemOptions;
    collapseBreakpoint: string;
    inListItem: boolean;
    dropdownButton: Element;
    dropdownListItem: Element;
    autoAdjustBreakpoint?: string;
    showDropdown: boolean;
    constructor(uiService: UIService, elementRef: ElementRef, cdRef: ChangeDetectorRef);
    get haveItem(): boolean;
    get isVisible(): boolean;
    get hasAction(): boolean;
    get isDropdownButton(): boolean;
    get isButton(): boolean;
    get isDropdownListItem(): boolean;
    get isListItem(): boolean;
    get haveSpace(): boolean;
    get haveIcon(): boolean;
    get itemText(): string;
    get itemTitle(): string;
    get itemMessageParams(): any;
    get sizeClass(): string;
    get styleClass(): string;
    get dropdownMenuOptions(): DropdownMenuOptions;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    click(event: UIEvent): void;
    touchstart(): void;
    mousedown(): void;
    focusin(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsActionItem, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsActionItem, "[sq-action-item]", never, { "options": "sq-action-item"; "collapseBreakpoint": "collapseBreakpoint"; }, {}, never, never>;
}
//# sourceMappingURL=action-item.d.ts.map