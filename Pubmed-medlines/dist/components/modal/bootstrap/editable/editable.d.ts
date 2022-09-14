import { OnInit, OnDestroy, EventEmitter, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ValidatorFn } from "@angular/forms";
import { Subscription } from "rxjs";
import * as i0 from "@angular/core";
export declare class BsEditable implements OnInit, OnDestroy {
    private formBuilder;
    private elementRef;
    tabindex: string;
    name: string;
    value: string;
    model: any;
    valueChange: EventEmitter<string>;
    validators: ValidatorFn[];
    editableControl: FormControl;
    modelControl: FormControl;
    form: FormGroup;
    formChanges: Subscription;
    previousValue: string;
    editing: boolean;
    private focusAfterEdit;
    constructor(formBuilder: FormBuilder, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    startEditing(): void;
    stopEditing(cancel?: boolean): void;
    inputKeydown(event: KeyboardEvent): false | undefined;
    hostKeydown(event: KeyboardEvent): false | undefined;
    static ɵfac: i0.ɵɵFactoryDef<BsEditable, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsEditable, "sq-editable", never, { "name": "name"; "value": "value"; "model": "model"; "validators": "validators"; }, { "valueChange": "valueChange"; }, never, never>;
}
//# sourceMappingURL=editable.d.ts.map