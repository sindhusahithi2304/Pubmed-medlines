import { OnInit, OnDestroy, AfterViewInit, ElementRef } from "@angular/core";
import { BsDropdownService } from './dropdown.service';
import * as i0 from "@angular/core";
export declare class BsDropdownDirective implements OnInit, OnDestroy, AfterViewInit {
    private elementRef;
    private dropdownService;
    private subscription;
    private inNavbar;
    private dropdown;
    private dropdownToggle;
    private _dropdownMenu;
    private popper;
    constructor(elementRef: ElementRef, dropdownService: BsDropdownService);
    get dropdownMenu(): HTMLElement | null;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    clickHandler(event: Event): void;
    private toggle;
    private getPlacement;
    private getOffset;
    private getPopperConfig;
    show(usePopper?: boolean): void;
    private clear;
    static ɵfac: i0.ɵɵFactoryDef<BsDropdownDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<BsDropdownDirective, "[data-toggle=\"dropdown\"]", never, {}, {}, never>;
}
//# sourceMappingURL=dropdown.directive.d.ts.map