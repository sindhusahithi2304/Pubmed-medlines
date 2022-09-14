import { OnDestroy, RendererFactory2, Renderer2 } from "@angular/core";
import { Subject, Observable } from "rxjs";
import * as i0 from "@angular/core";
export interface DropdownEvent {
    type: "clear" | "toggle";
}
export interface DropdownClearEvent extends DropdownEvent {
    type: "clear";
    sourceEvent: KeyboardEvent | MouseEvent | undefined;
}
export interface DropdownToggleEvent extends DropdownEvent {
    type: "toggle";
    element: Element;
}
export declare type DropdownEvents = DropdownClearEvent | DropdownToggleEvent;
export declare const gClassName: {
    DISABLED: string;
    SHOW: string;
    DROPUP: string;
    DROPRIGHT: string;
    DROPLEFT: string;
    MENURIGHT: string;
    MENULEFT: string;
    POSITION_STATIC: string;
};
export declare const gSelector: {
    DROPDOWN: string;
    DATA_TOGGLE: string;
    FORM_CHILD: string;
    MENU: string;
    NAVBAR_NAV: string;
    VISIBLE_ITEMS: string;
};
export declare const gAttachmentMap: {
    TOP: string;
    TOPEND: string;
    BOTTOM: string;
    BOTTOMEND: string;
    RIGHT: string;
    RIGHTEND: string;
    LEFT: string;
    LEFTEND: string;
};
export declare class BsDropdownService implements OnDestroy {
    protected _events: Subject<DropdownEvents>;
    protected unlisteners: (() => void)[];
    protected renderer: Renderer2;
    constructor(rendererFactory: RendererFactory2);
    ngOnDestroy(): void;
    get events(): Observable<DropdownEvents>;
    private matchDescendant;
    private getSelectorFromElement;
    getParentFromElement(element: HTMLElement): Node | null;
    private dataApiKeydownHandler;
    private clearMenus;
    private toggle;
    private formChildClick;
    raiseClear(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsDropdownService, never>;
    static ɵprov: i0.ɵɵInjectableDef<BsDropdownService>;
}
//# sourceMappingURL=dropdown.service.d.ts.map