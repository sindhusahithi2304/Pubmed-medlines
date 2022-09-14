import { IntlService } from "@sinequa/core/intl";
import { FieldValue } from "@sinequa/core/base";
import { CCColumn } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
/**
 * Describes a value item object that includes a {@link FieldValue} and an optional display value
 * to override standard field value formatting
 */
export interface ValueItem {
    value: FieldValue;
    display?: string;
    count?: number;
}
/**
 * This service provides methods for locale-sensitive formatting and parsing of values that can be found in
 * Sinequa search results.
 */
export declare class FormatService {
    intlService: IntlService;
    constructor(intlService: IntlService);
    /**
     * Returns `true` if the passed parameter is a `ValueItem` object
     */
    protected isValueItem(valueItem: ValueItem | FieldValue): valueItem is ValueItem;
    /**
     * Extracts the value and display components from a parameter that can be either a `ValueItem`
     * object or a simple `FieldValue`, in which case the display will be `undefined`.
     */
    protected getValueAndDisplay(valueItem: ValueItem | FieldValue): [FieldValue, string];
    /**
     * Return the display equivalent of a Sinequa language specifier (`en`, `fr`, ...).
     * The display values are defined in the {@link IntlModule} message files
     *
     * @param value A value containing a Sinequa language specifier
     */
    formatLanguage(value: FieldValue): string;
    /**
     * Return the display equivalent of a size value. The units (`kb`, `mb`, ...) are defined
     * in the {@link IntlModule} message files
     *
     * @param size A memory size in bytes
     */
    formatMemorySize(size: number): string;
    /** D3 formatter for large number: 42096 => 42K */
    bigNumberFormatter: (n: number | {
        valueOf(): number;
    }) => string;
    /** Similar to bigNumberFormatter, but replaces "G" by "B" (as in "$42B") */
    moneyFormatter: (s: any) => string;
    /**
     * Format an amount of money (typically extracted by a Sinequa Text-mining agent)
     * USD 42069 => USD 42K
     * @param value
     * @returns
     */
    formatMoney(value: string): string;
    /**
     * Format a value for display according to the passed `column`. Formatters
     * can be defined in the column's configuration to provide domain-specific
     * formatting. The standard formatters are `language` and `memorysize`.
     *
     * @param valueItem The value to format
     * @param column The column associated with the value
     */
    formatValue(valueItem: ValueItem | FieldValue, column?: CCColumn): string;
    /**
     * Transform a display value. Multiple transformers can be defined on a column and their calls are chained.
     * The standard formatters are `uppercase`, `upperfirst`, `lowercase`, `lowerfirst`, `startcase`, `kebabcase`,
     * `snakecase` and `camelcase`.
     *
     * @param value The value to transform
     * @param column The column associated with the value
     */
    transformValue(value: string, column?: CCColumn): string;
    /**
     * Format a value item for display. This is the standard entry point for formatting a value.
     * By default, this method calls [formatValue]{@link #formatValue} and [transformValue]{@link #transformValue}.
     *
     * @param valueItem The value item to format
     * @param column The column associated with the value item
     */
    formatFieldValue(valueItem: ValueItem | FieldValue, column?: CCColumn): string;
    /**
     * Parse an input value according to the passed `parser`. The standard parser is `memorysize`. Parsers
     * are configured in the {@link CCColumn} configuration. The parsed value is returned as a string for
     * processing by the {@link ValidationModule}
     *
     * @param value The value to parse
     * @param parser The parser to use
     */
    parseValue(value: any, parser: string): string;
    /**
     * Parse a size string using [Utils.toSize]{@link Utils#toSize}
     *
     * @param str The string to parse
     * @param _default The default value to return if the string cannot be parsed
     * @return The parsed size in bytes
     */
    parseMemorySize(str: string, _default?: number): number;
    /**
     * Display a raw value without applying any formatting
     * (besides the native toString() method for non-string values)
     * @param value
     * @returns
     */
    formatRaw(value: ValueItem | FieldValue): string;
    static ɵfac: i0.ɵɵFactoryDef<FormatService, never>;
    static ɵprov: i0.ɵɵInjectableDef<FormatService>;
}
//# sourceMappingURL=format.service.d.ts.map