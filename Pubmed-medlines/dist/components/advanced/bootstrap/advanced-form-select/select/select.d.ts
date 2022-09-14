import { OnInit, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ValueItem } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
export declare class BsSelectComponent implements ControlValueAccessor, OnInit {
    items: ValueItem[];
    disabled: boolean;
    multiple: boolean;
    buttonElement: ElementRef;
    opened: boolean;
    isOpen: boolean;
    activeItem: number;
    private cancelBlur;
    names: string[];
    private selectedItems;
    private onChangeCallback;
    ngOnInit(): void;
    setOpen(value: boolean): void;
    mousedown(event: Event): void;
    blur(event: FocusEvent): void;
    toggleOpen(): void;
    keydown($event: KeyboardEvent): void;
    private clearSelected;
    private countSelected;
    isItemSelected(itemIndex: number): boolean;
    toggleItemSelected(itemIndex: number): void;
    get buttonTitleMessageParams(): any;
    get buttonTitle(): string;
    get itemListHeight(): string;
    private triggerOnChange;
    writeValue(value: ValueItem | ValueItem[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    static ɵfac: i0.ɵɵFactoryDef<BsSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsSelectComponent, "sq-select", never, { "items": "items"; "disabled": "disabled"; "multiple": "multiple"; }, {}, never, never>;
}
//# sourceMappingURL=select.d.ts.map