import { FormControl, ValidatorFn, AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { SearchService } from "@sinequa/components/search";
import { AppService, Expr, FormatService, Query, ExprBuilder, ValueItem } from "@sinequa/core/app-utils";
import { ValidationService } from "@sinequa/core/validation";
import { CCColumn } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
/**
 * Defines the possible basic types of an advanced value
 */
export declare type BaseAdvancedValue = string | number | Date | boolean | undefined;
/**
 * Defines an advanced value type as either a single basic advanced value or an array of basic advanced values
 */
export declare type AdvancedValue = BaseAdvancedValue | BaseAdvancedValue[];
export interface AdvancedFormValidators {
    min: (min: string | number | Date, field: string) => ValidatorFn;
    max: (max: string | number | Date, field: string) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (field: string) => ValidatorFn;
    number: (field: string) => ValidatorFn;
    date: (field: string) => ValidatorFn;
    range: (field: string) => ValidatorFn;
}
export declare class AdvancedService {
    appService: AppService;
    searchService: SearchService;
    validationService: ValidationService;
    formatService: FormatService;
    exprBuilder: ExprBuilder;
    /**
     * Default form validators packaged within SBA to standardize advanced-search validation
     */
    readonly validators: AdvancedFormValidators;
    constructor(appService: AppService, searchService: SearchService, validationService: ValidationService, formatService: FormatService, exprBuilder: ExprBuilder);
    /**
     * Return a standard FormControl compatible with a select component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createSelectControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[], query?: Query): FormControl;
    /**
     * Return a standard FormControl compatible with a range-input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createRangeControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[], query?: Query): FormControl;
    /**
     * Return a standard FormControl compatible with a text input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createInputControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[], query?: Query): FormControl;
    /**
     * Return a standard FormControl compatible with a multi-value text input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createMultiInputControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[], query?: Query): FormControl;
    /**
     * Return a standard FormControl compatible with a checkbox component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    createCheckboxControl(field: string, validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[], query?: Query): FormControl;
    /**
     * Reset the supplied AbstractControl (and its validation) and sets its value to undefined
     * @param control
     */
    resetControl(control: AbstractControl): void;
    /**
     * Reset the supplied AbstractControl (and its validation) and sets its value to [undefined, undefined]
     * @param control
     */
    resetRangeControl(control: AbstractControl): void;
    /**
     * Retrieve the value (ValueItem | ValueItem[] | undefined) to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getValue(field: string, query?: Query): ValueItem | ValueItem[] | undefined;
    /**
     * Retrieve the boolean value to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getBooleanValue(field: string, query?: Query): boolean | undefined;
    /**
     * Retrieve the range value to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    getRangeValue(field: string, query?: Query): AdvancedValue;
    /**
     * Return the select expression of an advanced filter
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    protected getAdvancedExpr(field: string, query?: Query): Expr | undefined;
    /**
     * Extract values from an expression
     * @param expr
     */
    protected getValueFromExpr(expr: Expr): ValueItem | ValueItem[];
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and value(s)
     * @param field
     * @param value
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     * @param combineWithAnd
     */
    setSelect(field: string, value: ValueItem | ValueItem[] | undefined, query?: Query, combineWithAnd?: boolean): void;
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and a boolean value
     * @param field
     * @param value
     * @param discardFalsy by default it is 'false', so a false value is used to be undefined
     * @param query
     */
    setBooleanSelect(field: string, value: boolean | undefined, allowFalsy?: boolean, query?: Query): void;
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field, operator and value
     * @param field
     * @param value
     * @param operator
     * @param query
     */
    setNumericalSelect(field: string, value: string | Date | number | ValueItem | undefined, operator: ">" | ">=" | "<" | "<=" | "=" | "<>", query?: Query): void;
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and range of values
     * @param field
     * @param range
     * @param query
     */
    setRangeSelect(field: string, range: (string | Date | number)[] | undefined, query?: Query): void;
    /**
     * Sets a select for a given field and expression on the query (defaults to searchService.query)
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     * @param field
     * @param expr
     */
    protected setAdvancedSelect(field: string, expr: string | undefined, query?: Query): void;
    /**
     * Remove a specific advanced value by its field name.
     * By default, Trigger search() action
     * @param field
     * @param query Query from which will remove the specific advanced value, if omitted, use searchService.query
     * @param search
     */
    removeAdvancedValue(field: string, search?: boolean, query?: Query): void;
    /**
     * Remove all related advanced-search select(s) from a given query and update searchService.query accordingly
     * By default, Trigger search() action
     * @param query Query from which will remove all advanced values, if omitted, use searchService.query
     * @param search
     */
    resetAdvancedValues(search?: boolean, query?: Query): void;
    /**
     * Transforms a value to a parsed ValueItem[]
     * @param value
     * @param field
     */
    protected asValueItems(value: ValueItem | ValueItem[], field: string): ValueItem[];
    formatValueItems(field: string, value: ValueItem | ValueItem[]): ValueItem | ValueItem[];
    /**
     * Format the display property of the ValueItem according its related column definition
     * @param field
     * @param value
     */
    protected formatValueItem(field: string, value: ValueItem): ValueItem;
    /**
     * Format a given advanced value according to its column definition
     * @param field
     * @param value
     */
    formatAdvancedValue(field: string, value: AdvancedValue): AdvancedValue;
    protected formatBaseAdvancedValue(value: BaseAdvancedValue, column: CCColumn): BaseAdvancedValue;
    /**
     * Cast a given value as per its column definition
     * @param value
     * @param column
     */
    castAdvancedValue(value: BaseAdvancedValue, column: CCColumn | undefined): BaseAdvancedValue;
    /**
     * Create a generic FormControl
     * @param value value of the FormControl
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    protected createControl(value: AdvancedValue | ValueItem | ValueItem[], validators?: ValidatorFn[], asyncValidators?: AsyncValidatorFn[]): FormControl;
    /**
     * Parse a value according to its column definition
     * @param value
     * @param field
     */
    protected parse<T>(value: T, field: string): T | string;
    /**
     * Return the parser if existing in the given field
     * @param field
     */
    protected _parser(field: string): string | undefined;
    protected _rangeType(field: string): string | number | Date;
    /**
     * Return `true` if the passed value is an `ValueItem[]`
     */
    protected _isValueItemArray(value: any): value is ValueItem[];
    /**
     * Return `true` if the passed value is an `ValueItem`
     */
    protected _isValueItem(value: any): value is ValueItem;
    static ɵfac: i0.ɵɵFactoryDef<AdvancedService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AdvancedService>;
}
//# sourceMappingURL=advanced.service.d.ts.map