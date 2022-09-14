import { Injectable } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { AppServiceHelpers } from "./app-service-helpers";
import { format } from "d3-format";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
/**
 * This service provides methods for locale-sensitive formatting and parsing of values that can be found in
 * Sinequa search results.
 */
export class FormatService {
    constructor(intlService) {
        this.intlService = intlService;
        /** D3 formatter for large number: 42096 => 42K */
        this.bigNumberFormatter = format("~s");
        /** Similar to bigNumberFormatter, but replaces "G" by "B" (as in "$42B") */
        this.moneyFormatter = s => this.bigNumberFormatter(s).replace(/G/, "B");
    }
    /**
     * Returns `true` if the passed parameter is a `ValueItem` object
     */
    isValueItem(valueItem) {
        if (Utils.isObject(valueItem) && !Utils.isDate(valueItem) && !Utils.isArray(valueItem)) {
            return true;
        }
        return false;
    }
    /**
     * Extracts the value and display components from a parameter that can be either a `ValueItem`
     * object or a simple `FieldValue`, in which case the display will be `undefined`.
     */
    getValueAndDisplay(valueItem) {
        let value;
        let display;
        if (this.isValueItem(valueItem)) {
            value = valueItem.value;
            display = valueItem.display || "";
        }
        else {
            value = valueItem;
            display = "";
        }
        return [value, display];
    }
    /**
     * Return the display equivalent of a Sinequa language specifier (`en`, `fr`, ...).
     * The display values are defined in the {@link IntlModule} message files
     *
     * @param value A value containing a Sinequa language specifier
     */
    formatLanguage(value) {
        return this.intlService.formatMessage(`msg#language.${Utils.toLowerCase(value + "")}`);
    }
    /**
     * Return the display equivalent of a size value. The units (`kb`, `mb`, ...) are defined
     * in the {@link IntlModule} message files
     *
     * @param size A memory size in bytes
     */
    formatMemorySize(size) {
        const kiloBytes = size / 1024;
        const megaBytes = kiloBytes / 1024;
        const gigaBytes = megaBytes / 1024;
        const teraBytes = gigaBytes / 1024;
        const petaBytes = teraBytes / 1024;
        let messageKey = "msg#system.memorySize.bytes";
        const params = { value: size };
        if (Math.abs(petaBytes) >= 1) {
            messageKey = "msg#system.memorySize.pb";
            params.value = petaBytes;
        }
        else if (Math.abs(teraBytes) >= 1) {
            messageKey = "msg#system.memorySize.tb";
            params.value = teraBytes;
        }
        else if (Math.abs(gigaBytes) >= 1) {
            messageKey = "msg#system.memorySize.gb";
            params.value = gigaBytes;
        }
        else if (Math.abs(megaBytes) >= 1) {
            messageKey = "msg#system.memorySize.mb";
            params.value = megaBytes;
        }
        else if (Math.abs(kiloBytes) >= 1) {
            messageKey = "msg#system.memorySize.kb";
            params.value = kiloBytes;
        }
        return this.intlService.formatMessage(messageKey, params);
    }
    /**
     * Format an amount of money (typically extracted by a Sinequa Text-mining agent)
     * USD 42069 => USD 42K
     * @param value
     * @returns
     */
    formatMoney(value) {
        let [currency, val] = value.split(" ");
        return `${currency} ${this.moneyFormatter(+val)}`;
    }
    /**
     * Format a value for display according to the passed `column`. Formatters
     * can be defined in the column's configuration to provide domain-specific
     * formatting. The standard formatters are `language` and `memorysize`.
     *
     * @param valueItem The value to format
     * @param column The column associated with the value
     */
    formatValue(valueItem, column) {
        let [value, display] = this.getValueAndDisplay(valueItem);
        if (column && column.formatter) {
            switch (Utils.toLowerCase(column.formatter)) {
                case "language": return this.formatLanguage(value);
                case "memorysize":
                    if (Utils.isNumber(value)) {
                        return this.formatMemorySize(value);
                    }
                    break;
                case "money":
                    if (Utils.isString(value)) {
                        return this.formatMoney(value);
                    }
                    else if (Utils.isArray(value)) {
                        return value.map(v => this.formatMoney(Utils.isString(v) ? v : v.value)).join(', ');
                    }
                    break;
            }
        }
        if (display) {
            if (Utils.isDate(display)) { // ES-7785
                display = Utils.toSysDateStr(display);
            }
            return this.intlService.formatMessage(display, { value });
        }
        if (Utils.isNumber(value)) {
            const message = this.intlService.getMessage("msg#system.number");
            if (message) {
                return this.intlService.formatText(message, { value });
            }
            else {
                return this.intlService.formatNumber(value);
            }
        }
        if (column && AppServiceHelpers.isDate(column) && Utils.isString(value)) {
            value = Utils.fromSysDateStr(value) || value;
        }
        if (Utils.isDate(value)) {
            if (column && !AppServiceHelpers.isDate(column)) { // ES-7785
                value = Utils.toSysDateStr(value);
            }
            else {
                const message = this.intlService.getMessage("msg#system.date");
                if (message) {
                    return this.intlService.formatText(message, { date: value, time: Utils.getTime(value) });
                }
                else {
                    let s = this.intlService.formatDate(value);
                    if (Utils.getTime(value) !== 0) {
                        s += ", " + this.intlService.formatTime(value);
                    }
                    return s;
                }
            }
        }
        if (Utils.isBoolean(value)) {
            const message = this.intlService.getMessage("msg#system.boolean");
            if (message) {
                return this.intlService.formatText(message, { value });
            }
            else {
                return value.toString();
            }
        }
        if (Utils.isArray(value)) {
            const joinValue = [];
            value.forEach(v => {
                if (joinValue.length > 0) {
                    joinValue.push(";");
                }
                let _v;
                if (!v) {
                    _v = "<null>";
                }
                else if (Utils.isDate(v)) {
                    _v = Utils.toSysDateStr(v);
                }
                else if (Utils.isString(v)) {
                    _v = v;
                }
                else {
                    _v = v.display || v.value || "<null>";
                }
                joinValue.push(_v);
            });
            value = joinValue.join("");
        }
        if (!value) {
            return value;
        }
        return this.intlService.formatMessage(value);
    }
    /**
     * Transform a display value. Multiple transformers can be defined on a column and their calls are chained.
     * The standard formatters are `uppercase`, `upperfirst`, `lowercase`, `lowerfirst`, `startcase`, `kebabcase`,
     * `snakecase` and `camelcase`.
     *
     * @param value The value to transform
     * @param column The column associated with the value
     */
    transformValue(value, column) {
        const transforms = column ? Utils.split(column.transforms || "", ",") : undefined;
        if (!transforms || transforms.length === 0) {
            return value;
        }
        // transforms are composable
        for (const transform of transforms) {
            switch (Utils.toLowerCase(transform)) {
                case "uppercase":
                    value = Utils.toUpperCase(value);
                    break;
                case "upperfirst":
                    value = Utils.toUpperFirst(value);
                    break;
                case "lowercase":
                    value = Utils.toLowerCase(value);
                    break;
                case "lowerfirst":
                    value = Utils.toLowerFirst(value);
                    break;
                case "startcase":
                    value = Utils.toStartCase(value);
                    break;
                case "kebabcase":
                    value = Utils.toKebabCase(value);
                    break;
                case "snakecase":
                    value = Utils.toSnakeCase(value);
                    break;
                case "camelcase":
                    value = Utils.toCamelCase(value);
                    break;
            }
        }
        return value;
    }
    /**
     * Format a value item for display. This is the standard entry point for formatting a value.
     * By default, this method calls [formatValue]{@link #formatValue} and [transformValue]{@link #transformValue}.
     *
     * @param valueItem The value item to format
     * @param column The column associated with the value item
     */
    formatFieldValue(valueItem, column) {
        let formattedValue = this.formatValue(valueItem, column);
        formattedValue = this.transformValue(formattedValue, column);
        return formattedValue;
    }
    /**
     * Parse an input value according to the passed `parser`. The standard parser is `memorysize`. Parsers
     * are configured in the {@link CCColumn} configuration. The parsed value is returned as a string for
     * processing by the {@link ValidationModule}
     *
     * @param value The value to parse
     * @param parser The parser to use
     */
    parseValue(value, parser) {
        if (Utils.isString(value)) {
            if (parser) {
                switch (Utils.toLowerCase(parser)) {
                    case "memorysize": {
                        return this.parseMemorySize(value) + "";
                    }
                }
            }
        }
        return value;
    }
    /**
     * Parse a size string using [Utils.toSize]{@link Utils#toSize}
     *
     * @param str The string to parse
     * @param _default The default value to return if the string cannot be parsed
     * @return The parsed size in bytes
     */
    parseMemorySize(str, _default = 0) {
        return Utils.toSize(str, _default);
    }
    /**
     * Display a raw value without applying any formatting
     * (besides the native toString() method for non-string values)
     * @param value
     * @returns
     */
    formatRaw(value) {
        let [val] = this.getValueAndDisplay(value);
        if (Utils.isArray(val)) {
            return val.map(v => Utils.isString(v) ? v : v.value).join(';');
        }
        return val === null || val === void 0 ? void 0 : val.toString();
    }
}
FormatService.ɵfac = function FormatService_Factory(t) { return new (t || FormatService)(i0.ɵɵinject(i1.IntlService)); };
FormatService.ɵprov = i0.ɵɵdefineInjectable({ token: FormatService, factory: FormatService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FormatService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.IntlService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9hcHAtdXRpbHMvIiwic291cmNlcyI6WyJmb3JtYXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxLQUFLLEVBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7QUFZakM7OztHQUdHO0FBSUgsTUFBTSxPQUFPLGFBQWE7SUFDdEIsWUFDVyxXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQStFbkMsa0RBQWtEO1FBQ2xELHVCQUFrQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQyw0RUFBNEU7UUFDNUUsbUJBQWMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBbEZuRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyxXQUFXLENBQUMsU0FBaUM7UUFDbkQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEYsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDTyxrQkFBa0IsQ0FBQyxTQUFpQztRQUMxRCxJQUFJLEtBQWlCLENBQUM7UUFDdEIsSUFBSSxPQUFlLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMs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RDs7Ozs7O09BTUc7SUFDSCxlQUFlLENBQUMsR0FBVyxFQUFFLFFBQVEsR0FBRyxDQUFDO1FBQ3JDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLEtBQTZCO1FBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqRTtRQUNELE9BQU8sR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLFFBQVEsR0FBRztJQUMzQixDQUFDOzswRUFoU1EsYUFBYTtxREFBYixhQUFhLFdBQWIsYUFBYSxtQkFGVixNQUFNO2tEQUVULGFBQWE7Y0FIekIsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtVdGlscywgRmllbGRWYWx1ZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBcHBTZXJ2aWNlSGVscGVyc30gZnJvbSBcIi4vYXBwLXNlcnZpY2UtaGVscGVyc1wiO1xuaW1wb3J0IHtDQ0NvbHVtbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSBcImQzLWZvcm1hdFwiO1xuXG4vKipcbiAqIERlc2NyaWJlcyBhIHZhbHVlIGl0ZW0gb2JqZWN0IHRoYXQgaW5jbHVkZXMgYSB7QGxpbmsgRmllbGRWYWx1ZX0gYW5kIGFuIG9wdGlvbmFsIGRpc3BsYXkgdmFsdWVcbiAqIHRvIG92ZXJyaWRlIHN0YW5kYXJkIGZpZWxkIHZhbHVlIGZvcm1hdHRpbmdcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZUl0ZW0ge1xuICAgIHZhbHVlOiBGaWVsZFZhbHVlO1xuICAgIGRpc3BsYXk/OiBzdHJpbmc7XG4gICAgY291bnQ/OiBudW1iZXI7IC8vIEZvbGxvd2luZyBFUy0xMTE2NiwgdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlIGZvciBhbiBlbnRpdHkgY2FuIGJlIGluY2x1ZGVkXG59XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIG1ldGhvZHMgZm9yIGxvY2FsZS1zZW5zaXRpdmUgZm9ybWF0dGluZyBhbmQgcGFyc2luZyBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgZm91bmQgaW5cbiAqIFNpbmVxdWEgc2VhcmNoIHJlc3VsdHMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBGb3JtYXRTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGludGxTZXJ2aWNlOiBJbnRsU2VydmljZSkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBwYXNzZWQgcGFyYW1ldGVyIGlzIGEgYFZhbHVlSXRlbWAgb2JqZWN0XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGlzVmFsdWVJdGVtKHZhbHVlSXRlbTogVmFsdWVJdGVtIHwgRmllbGRWYWx1ZSk6IHZhbHVlSXRlbSBpcyBWYWx1ZUl0ZW0ge1xuICAgICAgICBpZiAoVXRpbHMuaXNPYmplY3QodmFsdWVJdGVtKSAmJiAhVXRpbHMuaXNEYXRlKHZhbHVlSXRlbSkgJiYgIVV0aWxzLmlzQXJyYXkodmFsdWVJdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3RzIHRoZSB2YWx1ZSBhbmQgZGlzcGxheSBjb21wb25lbnRzIGZyb20gYSBwYXJhbWV0ZXIgdGhhdCBjYW4gYmUgZWl0aGVyIGEgYFZhbHVlSXRlbWBcbiAgICAgKiBvYmplY3Qgb3IgYSBzaW1wbGUgYEZpZWxkVmFsdWVgLCBpbiB3aGljaCBjYXNlIHRoZSBkaXNwbGF5IHdpbGwgYmUgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGdldFZhbHVlQW5kRGlzcGxheSh2YWx1ZUl0ZW06IFZhbHVlSXRlbSB8IEZpZWxkVmFsdWUpOiBbRmllbGRWYWx1ZSwgc3RyaW5nXSB7XG4gICAgICAgIGxldCB2YWx1ZTogRmllbGRWYWx1ZTtcbiAgICAgICAgbGV0IGRpc3BsYXk6IHN0cmluZztcbiAgICAgICAgaWYgKHRoaXMuaXNWYWx1ZUl0ZW0odmFsdWVJdGVtKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZUl0ZW0udmFsdWU7XG4gICAgICAgICAgICBkaXNwbGF5ID0gdmFsdWVJdGVtLmRpc3BsYXkgfHwgXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVJdGVtO1xuICAgICAgICAgICAgZGlzcGxheSA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt2YWx1ZSwgZGlzcGxheV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBkaXNwbGF5IGVxdWl2YWxlbnQgb2YgYSBTaW5lcXVhIGxhbmd1YWdlIHNwZWNpZmllciAoYGVuYCwgYGZyYCwgLi4uKS5cbiAgICAgKiBUaGUgZGlzcGxheSB2YWx1ZXMgYXJlIGRlZmluZWQgaW4gdGhlIHtAbGluayBJbnRsTW9kdWxlfSBtZXNzYWdlIGZpbGVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgQSB2YWx1ZSBjb250YWluaW5nIGEgU2luZXF1YSBsYW5ndWFnZSBzcGVjaWZpZXJcbiAgICAgKi9cbiAgICBmb3JtYXRMYW5ndWFnZSh2YWx1ZTogRmllbGRWYWx1ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdE1lc3NhZ2UoYG1zZyNsYW5ndWFnZS4ke1V0aWxzLnRvTG93ZXJDYXNlKHZhbHVlICsgXCJcIil9YCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBkaXNwbGF5IGVxdWl2YWxlbnQgb2YgYSBzaXplIHZhbHVlLiBUaGUgdW5pdHMgKGBrYmAsIGBtYmAsIC4uLikgYXJlIGRlZmluZWRcbiAgICAgKiBpbiB0aGUge0BsaW5rIEludGxNb2R1bGV9IG1lc3NhZ2UgZmlsZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzaXplIEEgbWVtb3J5IHNpemUgaW4gYnl0ZXNcbiAgICAgKi9cbiAgICBmb3JtYXRNZW1vcnlTaXplKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGtpbG9CeXRlczogbnVtYmVyID0gc2l6ZSAvIDEwMjQ7XG4gICAgICAgIGNvbnN0IG1lZ2FCeXRlczogbnVtYmVyID0ga2lsb0J5dGVzIC8gMTAyNDtcbiAgICAgICAgY29uc3QgZ2lnYUJ5dGVzOiBudW1iZXIgPSBtZWdhQnl0ZXMgLyAxMDI0O1xuICAgICAgICBjb25zdCB0ZXJhQnl0ZXM6IG51bWJlciA9IGdpZ2FCeXRlcyAvIDEwMjQ7XG4gICAgICAgIGNvbnN0IHBldGFCeXRlczogbnVtYmVyID0gdGVyYUJ5dGVzIC8gMTAyNDtcblxuICAgICAgICBsZXQgbWVzc2FnZUtleSA9IFwibXNnI3N5c3RlbS5tZW1vcnlTaXplLmJ5dGVzXCI7XG4gICAgICAgIGNvbnN0IHBhcmFtczogYW55ID0geyB2YWx1ZTogc2l6ZSB9O1xuICAgICAgICBpZiAoTWF0aC5hYnMocGV0YUJ5dGVzKSA+PSAxKSB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5ID0gXCJtc2cjc3lzdGVtLm1lbW9yeVNpemUucGJcIjtcbiAgICAgICAgICAgIHBhcmFtcy52YWx1ZSA9IHBldGFCeXRlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChNYXRoLmFicyh0ZXJhQnl0ZXMpID49IDEpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXkgPSBcIm1zZyNzeXN0ZW0ubWVtb3J5U2l6ZS50YlwiO1xuICAgICAgICAgICAgcGFyYW1zLnZhbHVlID0gdGVyYUJ5dGVzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKE1hdGguYWJzKGdpZ2FCeXRlcykgPj0gMSkge1xuICAgICAgICAgICAgbWVzc2FnZUtleSA9IFwibXNnI3N5c3RlbS5tZW1vcnlTaXplLmdiXCI7XG4gICAgICAgICAgICBwYXJhbXMudmFsdWUgPSBnaWdhQnl0ZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoTWF0aC5hYnMobWVnYUJ5dGVzKSA+PSAxKSB7XG4gICAgICAgICAgICBtZXNzYWdlS2V5ID0gXCJtc2cjc3lzdGVtLm1lbW9yeVNpemUubWJcIjtcbiAgICAgICAgICAgIHBhcmFtcy52YWx1ZSA9IG1lZ2FCeXRlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChNYXRoLmFicyhraWxvQnl0ZXMpID49IDEpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VLZXkgPSBcIm1zZyNzeXN0ZW0ubWVtb3J5U2l6ZS5rYlwiO1xuICAgICAgICAgICAgcGFyYW1zLnZhbHVlID0ga2lsb0J5dGVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdE1lc3NhZ2UobWVzc2FnZUtleSwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKiogRDMgZm9ybWF0dGVyIGZvciBsYXJnZSBudW1iZXI6IDQyMDk2ID0+IDQySyAqL1xuICAgIGJpZ051bWJlckZvcm1hdHRlciA9IGZvcm1hdChcIn5zXCIpO1xuXG4gICAgLyoqIFNpbWlsYXIgdG8gYmlnTnVtYmVyRm9ybWF0dGVyLCBidXQgcmVwbGFjZXMgXCJHXCIgYnkgXCJCXCIgKGFzIGluIFwiJDQyQlwiKSAqL1xuICAgIG1vbmV5Rm9ybWF0dGVyID0gcyA9PiB0aGlzLmJpZ051bWJlckZvcm1hdHRlcihzKS5yZXBsYWNlKC9HLywgXCJCXCIpO1xuICAgIFxuICAgIC8qKlxuICAgICAqIEZvcm1hdCBhbiBhbW91bnQgb2YgbW9uZXkgKHR5cGljYWxseSBleHRyYWN0ZWQgYnkgYSBTaW5lcXVhIFRleHQtbWluaW5nIGFnZW50KVxuICAgICAqIFVTRCA0MjA2OSA9PiBVU0QgNDJLXG4gICAgICogQHBhcmFtIHZhbHVlIFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGZvcm1hdE1vbmV5KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBsZXQgW2N1cnJlbmN5LCB2YWxdID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICByZXR1cm4gYCR7Y3VycmVuY3l9ICR7dGhpcy5tb25leUZvcm1hdHRlcigrdmFsKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCBhIHZhbHVlIGZvciBkaXNwbGF5IGFjY29yZGluZyB0byB0aGUgcGFzc2VkIGBjb2x1bW5gLiBGb3JtYXR0ZXJzXG4gICAgICogY2FuIGJlIGRlZmluZWQgaW4gdGhlIGNvbHVtbidzIGNvbmZpZ3VyYXRpb24gdG8gcHJvdmlkZSBkb21haW4tc3BlY2lmaWNcbiAgICAgKiBmb3JtYXR0aW5nLiBUaGUgc3RhbmRhcmQgZm9ybWF0dGVycyBhcmUgYGxhbmd1YWdlYCBhbmQgYG1lbW9yeXNpemVgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlSXRlbSBUaGUgdmFsdWUgdG8gZm9ybWF0XG4gICAgICogQHBhcmFtIGNvbHVtbiBUaGUgY29sdW1uIGFzc29jaWF0ZWQgd2l0aCB0aGUgdmFsdWVcbiAgICAgKi9cbiAgICBmb3JtYXRWYWx1ZSh2YWx1ZUl0ZW06IFZhbHVlSXRlbSB8IEZpZWxkVmFsdWUsIGNvbHVtbj86IENDQ29sdW1uKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IFt2YWx1ZSwgZGlzcGxheV0gPSB0aGlzLmdldFZhbHVlQW5kRGlzcGxheSh2YWx1ZUl0ZW0pO1xuICAgICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5mb3JtYXR0ZXIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoVXRpbHMudG9Mb3dlckNhc2UoY29sdW1uLmZvcm1hdHRlcikpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibGFuZ3VhZ2VcIjogcmV0dXJuIHRoaXMuZm9ybWF0TGFuZ3VhZ2UodmFsdWUpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtZW1vcnlzaXplXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdE1lbW9yeVNpemUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtb25leVwiOlxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdE1vbmV5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKFV0aWxzLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKHYgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRNb25leShVdGlscy5pc1N0cmluZyh2KT8gdiA6IHYudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICApLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0RhdGUoZGlzcGxheSkpIHsgLy8gRVMtNzc4NVxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBVdGlscy50b1N5c0RhdGVTdHIoZGlzcGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRNZXNzYWdlKGRpc3BsYXksIHt2YWx1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLmludGxTZXJ2aWNlLmdldE1lc3NhZ2UoXCJtc2cjc3lzdGVtLm51bWJlclwiKTtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0VGV4dChtZXNzYWdlLCB7dmFsdWV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdE51bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbHVtbiAmJiBBcHBTZXJ2aWNlSGVscGVycy5pc0RhdGUoY29sdW1uKSAmJiBVdGlscy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gVXRpbHMuZnJvbVN5c0RhdGVTdHIodmFsdWUpIHx8IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoY29sdW1uICYmICFBcHBTZXJ2aWNlSGVscGVycy5pc0RhdGUoY29sdW1uKSkgeyAvLyBFUy03Nzg1XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBVdGlscy50b1N5c0RhdGVTdHIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMuaW50bFNlcnZpY2UuZ2V0TWVzc2FnZShcIm1zZyNzeXN0ZW0uZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRUZXh0KG1lc3NhZ2UsIHtkYXRlOiB2YWx1ZSwgdGltZTogVXRpbHMuZ2V0VGltZSh2YWx1ZSl9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzID0gdGhpcy5pbnRsU2VydmljZS5mb3JtYXREYXRlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmdldFRpbWUodmFsdWUpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiLCBcIiArIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0VGltZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5pbnRsU2VydmljZS5nZXRNZXNzYWdlKFwibXNnI3N5c3RlbS5ib29sZWFuXCIpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRUZXh0KG1lc3NhZ2UsIHt2YWx1ZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBqb2luVmFsdWU6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICB2YWx1ZS5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChqb2luVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBqb2luVmFsdWUucHVzaChcIjtcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBfdjogc3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgICAgICAgICBfdiA9IFwiPG51bGw+XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgICAgICAgICAgICBfdiA9IFV0aWxzLnRvU3lzRGF0ZVN0cih2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNTdHJpbmcodikpIHtcbiAgICAgICAgICAgICAgICAgICAgX3YgPSB2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3YgPSB2LmRpc3BsYXkgfHwgdi52YWx1ZSB8fCBcIjxudWxsPlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqb2luVmFsdWUucHVzaChfdik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbHVlID0gam9pblZhbHVlLmpvaW4oXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmludGxTZXJ2aWNlLmZvcm1hdE1lc3NhZ2UodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSBhIGRpc3BsYXkgdmFsdWUuIE11bHRpcGxlIHRyYW5zZm9ybWVycyBjYW4gYmUgZGVmaW5lZCBvbiBhIGNvbHVtbiBhbmQgdGhlaXIgY2FsbHMgYXJlIGNoYWluZWQuXG4gICAgICogVGhlIHN0YW5kYXJkIGZvcm1hdHRlcnMgYXJlIGB1cHBlcmNhc2VgLCBgdXBwZXJmaXJzdGAsIGBsb3dlcmNhc2VgLCBgbG93ZXJmaXJzdGAsIGBzdGFydGNhc2VgLCBga2ViYWJjYXNlYCxcbiAgICAgKiBgc25ha2VjYXNlYCBhbmQgYGNhbWVsY2FzZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSBjb2x1bW4gVGhlIGNvbHVtbiBhc3NvY2lhdGVkIHdpdGggdGhlIHZhbHVlXG4gICAgICovXG4gICAgdHJhbnNmb3JtVmFsdWUodmFsdWU6IHN0cmluZywgY29sdW1uPzogQ0NDb2x1bW4pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1zID0gY29sdW1uID8gVXRpbHMuc3BsaXQoY29sdW1uLnRyYW5zZm9ybXMgfHwgXCJcIiwgXCIsXCIpIDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRyYW5zZm9ybXMgfHwgdHJhbnNmb3Jtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0cmFuc2Zvcm1zIGFyZSBjb21wb3NhYmxlXG4gICAgICAgIGZvciAoY29uc3QgdHJhbnNmb3JtIG9mIHRyYW5zZm9ybXMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoVXRpbHMudG9Mb3dlckNhc2UodHJhbnNmb3JtKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1cHBlcmNhc2VcIjogdmFsdWUgPSBVdGlscy50b1VwcGVyQ2FzZSh2YWx1ZSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1cHBlcmZpcnN0XCI6IHZhbHVlID0gVXRpbHMudG9VcHBlckZpcnN0KHZhbHVlKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvd2VyY2FzZVwiOiB2YWx1ZSA9IFV0aWxzLnRvTG93ZXJDYXNlKHZhbHVlKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvd2VyZmlyc3RcIjogdmFsdWUgPSBVdGlscy50b0xvd2VyRmlyc3QodmFsdWUpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RhcnRjYXNlXCI6IHZhbHVlID0gVXRpbHMudG9TdGFydENhc2UodmFsdWUpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwia2ViYWJjYXNlXCI6IHZhbHVlID0gVXRpbHMudG9LZWJhYkNhc2UodmFsdWUpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic25ha2VjYXNlXCI6IHZhbHVlID0gVXRpbHMudG9TbmFrZUNhc2UodmFsdWUpOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FtZWxjYXNlXCI6IHZhbHVlID0gVXRpbHMudG9DYW1lbENhc2UodmFsdWUpOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IGEgdmFsdWUgaXRlbSBmb3IgZGlzcGxheS4gVGhpcyBpcyB0aGUgc3RhbmRhcmQgZW50cnkgcG9pbnQgZm9yIGZvcm1hdHRpbmcgYSB2YWx1ZS5cbiAgICAgKiBCeSBkZWZhdWx0LCB0aGlzIG1ldGhvZCBjYWxscyBbZm9ybWF0VmFsdWVde0BsaW5rICNmb3JtYXRWYWx1ZX0gYW5kIFt0cmFuc2Zvcm1WYWx1ZV17QGxpbmsgI3RyYW5zZm9ybVZhbHVlfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZUl0ZW0gVGhlIHZhbHVlIGl0ZW0gdG8gZm9ybWF0XG4gICAgICogQHBhcmFtIGNvbHVtbiBUaGUgY29sdW1uIGFzc29jaWF0ZWQgd2l0aCB0aGUgdmFsdWUgaXRlbVxuICAgICAqL1xuICAgIGZvcm1hdEZpZWxkVmFsdWUodmFsdWVJdGVtOiBWYWx1ZUl0ZW0gfCBGaWVsZFZhbHVlLCBjb2x1bW4/OiBDQ0NvbHVtbik6IHN0cmluZyB7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0VmFsdWUodmFsdWVJdGVtLCBjb2x1bW4pO1xuICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMudHJhbnNmb3JtVmFsdWUoZm9ybWF0dGVkVmFsdWUsIGNvbHVtbik7XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhbiBpbnB1dCB2YWx1ZSBhY2NvcmRpbmcgdG8gdGhlIHBhc3NlZCBgcGFyc2VyYC4gVGhlIHN0YW5kYXJkIHBhcnNlciBpcyBgbWVtb3J5c2l6ZWAuIFBhcnNlcnNcbiAgICAgKiBhcmUgY29uZmlndXJlZCBpbiB0aGUge0BsaW5rIENDQ29sdW1ufSBjb25maWd1cmF0aW9uLiBUaGUgcGFyc2VkIHZhbHVlIGlzIHJldHVybmVkIGFzIGEgc3RyaW5nIGZvclxuICAgICAqIHByb2Nlc3NpbmcgYnkgdGhlIHtAbGluayBWYWxpZGF0aW9uTW9kdWxlfVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBwYXJzZVxuICAgICAqIEBwYXJhbSBwYXJzZXIgVGhlIHBhcnNlciB0byB1c2VcbiAgICAgKi9cbiAgICBwYXJzZVZhbHVlKHZhbHVlOiBhbnksIHBhcnNlcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHBhcnNlcikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoVXRpbHMudG9Mb3dlckNhc2UocGFyc2VyKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibWVtb3J5c2l6ZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZU1lbW9yeVNpemUodmFsdWUpICsgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2UgYSBzaXplIHN0cmluZyB1c2luZyBbVXRpbHMudG9TaXplXXtAbGluayBVdGlscyN0b1NpemV9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gcGFyc2VcbiAgICAgKiBAcGFyYW0gX2RlZmF1bHQgVGhlIGRlZmF1bHQgdmFsdWUgdG8gcmV0dXJuIGlmIHRoZSBzdHJpbmcgY2Fubm90IGJlIHBhcnNlZFxuICAgICAqIEByZXR1cm4gVGhlIHBhcnNlZCBzaXplIGluIGJ5dGVzXG4gICAgICovXG4gICAgcGFyc2VNZW1vcnlTaXplKHN0cjogc3RyaW5nLCBfZGVmYXVsdCA9IDApOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gVXRpbHMudG9TaXplKHN0ciwgX2RlZmF1bHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BsYXkgYSByYXcgdmFsdWUgd2l0aG91dCBhcHBseWluZyBhbnkgZm9ybWF0dGluZ1xuICAgICAqIChiZXNpZGVzIHRoZSBuYXRpdmUgdG9TdHJpbmcoKSBtZXRob2QgZm9yIG5vbi1zdHJpbmcgdmFsdWVzKVxuICAgICAqIEBwYXJhbSB2YWx1ZSBcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBmb3JtYXRSYXcodmFsdWU6IFZhbHVlSXRlbSB8IEZpZWxkVmFsdWUpOiBzdHJpbmcge1xuICAgICAgICBsZXQgW3ZhbF0gPSB0aGlzLmdldFZhbHVlQW5kRGlzcGxheSh2YWx1ZSk7XG4gICAgICAgIGlmKFV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbC5tYXAodiA9PiBVdGlscy5pc1N0cmluZyh2KT8gdiA6IHYudmFsdWUpLmpvaW4oJzsnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsPy50b1N0cmluZygpO1xuICAgIH1cbn1cbiJdfQ==