import { HttpParams } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { MapOf } from "./map-of";
import { FieldValue } from "./field-value";
/**
 * Describes options for the [Utils.toJson]{@link Utils#toJson} method
 */
export interface ToJsonOptions {
    /**
     * If `true` then spacing is added to the output string
     */
    pretty?: boolean;
}
/**
 * Describes options for the [Utils.fromJson]{@link Utils#fromJson} method
 */
export interface FromJsonOptions {
    /**
     * If `true` then strings containing either ISO8601 or Sinequa "system" dates (`yyyy-mm-dd [hh:mm:ss]`) are
     * converted to Javascript `Date` objects
     */
    reviveDates?: boolean;
}
/**
 * Describes options for the [Utils.throttle]{@link Utils#throttle} method
 */
export interface ThrottleSettings {
    /**
     * Set to `false` to disable the initial call to the callback function
     */
    leading?: boolean;
    /**
     * Set to `false` to disable the final call to the callback function
     */
    trailing?: boolean;
}
/**
 * A utility class to log execution durations
 */
export declare class Timer {
    private readonly name;
    /**
     * Contains the timestamp of when the `Timer` object was instantiated
     */
    readonly start: number;
    /**
     * Contains the current durartion in milliseconds of the `Timer` object
     */
    duration: number;
    constructor(name: string);
    /**
     * Updates the `duration` of the `Timer` object
     */
    stop(): void;
}
/**
 * A generic interface for tree nodes
 */
export interface TreeNode {
    /**
     * Children elements of this tree node
     */
    items?: TreeNode[];
}
/**
 * A utility class containing a variety of static methods and properties
 */
export declare class Utils {
    /**
     * The number of milliseconds in one day
     */
    static readonly oneDay = 86400000;
    /**
     * The number of milliseconds in one hour
     */
    static readonly oneHour = 3600000;
    /**
     * The number of milliseconds in one minute
     */
    static readonly oneMinute = 60000;
    /**
     * The number of milliseconds in one second
     */
    static readonly oneSecond = 1000;
    private static baseExtend;
    /**
     * Shallowly copy the properties in the source objects to the destination object.
     * Any nested objects or arrays will be copied by reference, not duplicated.
     * The source objects are treated in order so properties in later
     * objects will override properties in earlier ones.
     *
     * @param destination The object to which properties are copied
     * @param sources Objects from which properties are copied
     * @return the destination object
     */
    static extend(destination: any, ...sources: any[]): any;
    /**
     * Deeply copy the properties in the source objects to the destination object.
     * Any nested objects or arrays will be duplicated.
     * The source objects are treated in order so properties in later
     * objects will override properties in earlier ones.
     *
     * @param destination The object to which properties are copied
     * @param sources Objects from which properties are copied
     * @return the destination object
     */
    static merge(destination: any, ...sources: any[]): any;
    /**
     * Deeply copy the properties in the source objects to the destination object.
     * Any nested objects or arrays will be duplicated.
     * The source objects are treated in order so properties in later
     * objects will override properties in earlier ones.
     * The properties of the source objects are sorted in ascending, ASCII character order
     * before they are copied to ensure a consistent insertion order in the destination
     * object.
     *
     * @param destination The object to which properties are copied
     * @param sources Objects from which properties are copied
     * @return the destination object
     */
    static mergeAndSort(destination: any, ...sources: any[]): any;
    private static forEach;
    /**
     * Makes a deep copy of the passed object or array and returns it.
     * Copies of source objects of the following types: `TypedArray`, `Date`, `RegExp` `Node` are
     * made using the appropriate constructor. Arrays are created using `[]`. Other objects are created
     * using `Object.create` passing the source object's protptype, if any.
     *
     * @param source The source item to copy (`Object`, `Array`, `TypedArray`, `Date`, `RegExp`, `Node`)
     * @param destination An optional item to use as the destination. If passed, the item is cleared
     * before the source is copied to it. The destination cannot be a `TypedArray` and cannot be the same
     * as the source
     * @return The copied item
     */
    static copy<T extends object>(source: T, destination?: T): T;
    private static copyWithoutNullOrEmpty;
    /**
     * Makes a shallow copy of the passed object. Empty string values are removed from the copied object.
     * A string value containing `""` is copied as an empty string.
     *
     * @param defaults The object to copy
     * @return The copied object
     */
    static copyDefaults(defaults: {}): {};
    /**
     * Performs an optimized deep comparison between two objects to determine if they should be considered equal
     * @param o1 The first object to be compared
     * @param o2 The second object to be compared
     */
    static equals(o1: any, o2: any): boolean;
    /**
     * Converts a string to an integer value using `parseInt` with radix = 10.
     * If the string cannot be converted or contains additional characters then the
     * passed default value is returned
     * @param str The string to convert
     * @param _default The default value to use if the string cannot be converted
     */
    static toInt(str: string, _default?: number): number;
    /**
     * Converts a string to a floating point value using `parseFloat`.
     * If the string cannot be converted then the passed default value is returned
     * @param str The string to convert
     * @param _default The default value to use if the string cannot be converted
     */
    static toNumber(str: string, _default?: number): number;
    /**
     * Converts a string to a `Date` using `Date.parse`.
     * The date is returned in UTC. If the string cannot be converted then `undefined` is returned
     * @param str The string to convert
     * @return The converted `Date` in UTC or `undefined`
     */
    static toDate(str: string): Date | undefined;
    /**
     * Get the time component of a `Date` in milliseconds
     *
     * @param date The date
     * @return The time in milliseconds
     */
    static getTime(date: Date): number;
    /**
     * Return the current date and time
     */
    static get now(): Date;
    /**
     * Converts a `Date` to a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`)
     * If the time component of the date is 0 then only the date portion of the string is included
     *
     * @param date The `Date` to convert
     */
    static toSysDateStr(date: Date): string;
    /**
     * Converts a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`) to a `Date`
     * If the string cannot be converted then `undefined` is returned
     *
     * @param date The Sinequa system date string to convert
     */
    static fromSysDateStr(value: string): Date | undefined;
    private static rxSysDateTime;
    private static rxISO8601DateTime;
    private static isSysDateTime;
    private static isISO8601DateTime;
    /**
     * Converts a Javascript value to a JSON string using `JSON.stringify`.
     * Date objects are converted to Sinequa system strings
     *
     * @param value The value to convert
     * @param options Options for the conversion. The default is `{pretty: false}`
     */
    static toJson(value: any, options?: ToJsonOptions): string;
    /**
     * Converts a string to an object using `JSON.parse`.
     * Strings that are either in Sinequa system date or ISO8601 format are converted to
     * `Date` objects if the `reviveDates` option is specified.
     *
     * @param str The string to convert
     * @param options Options for the conversion. The default is `{reviveDates: false}`
     */
    static fromJson(str: string, options?: FromJsonOptions): any;
    /**
     * Converts a `FieldValue` value to a string compatible with Sinequa's SQL syntax.
     * String and `Date` values are enclosed in single quotes if the quote parameter is `true`
     *
     * @param value The value to convert
     * @param quote If set, the returned string will be enclosed in single quotes for string and `Date` values
     */
    static toSqlValue(value: FieldValue, quote?: boolean): string;
    /**
     * Clean a string so it is compatible with values stored in a Sinequa tree type-column.
     * The following operations are performed:
     * * ensure that the string starts and ends with forward slashes
     * * replace tab characters with spaces
     * * replace semi-colons with commas
     * * replace back slashes with forward slashes
     *
     * @param s The string to clean
     */
    static treeClean(s: string): string;
    /**
     * Return the first node of a Sinequa tree value enclosed in forward slashes
     *
     * @param s A Sinequa tree value
     */
    static treeFirst(s: string): string;
    /**
     * Return the first node of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeFirstNode(s: string): string;
    /**
     * Return the last node of a Sinequa tree value enclosed in forward slashes
     *
     * @param s A Sinequa tree value
     */
    static treeLast(s: string): string;
    /**
     * Return the last node of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeLastNode(s: string): string;
    /**
     * Return the nodes making up a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeNodes(s: string): string[];
    /**
     * Return a Sinequa tree value, removing enclosing forward slash characters
     *
     * @param s A Sinequa tree value
     */
    static treeDisplay(s: string): string;
    /**
     * Return the node count of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeCount(s: string): number;
    /**
     * Traverses a tree structure, executing a callback function at every node
     * @param nodes the nodes to traverse
     * @param callback the callback function
     */
    static traverse<T extends TreeNode>(nodes: T[], callback: (lineage: T[] | undefined) => boolean): boolean;
    /**
     * Return a pseudo-GUID value using `Math.random`
     *
     * @param withHyphens If set, the returned GUID includes hyphen separators
     */
    static guid(withHyphens?: boolean): string;
    /**
     * Return `true` if the passed value is `undefined`
     */
    static isUndefined(value: any): value is undefined;
    /**
     * Return `true` if the passed value is an `object`
     */
    static isObject(value: any): value is any;
    /**
     * Return `true` if the passed value is a `string`
     */
    static isString(value: any): value is string;
    /**
     * Return `true` if the passed value is a `number`
     */
    static isNumber(value: any): value is number;
    /**
     * Return `true` if the passed value is a `boolean`
     */
    static isBoolean(value: any): value is boolean;
    /**
     * Return `true` if the passed value is a `Date`
     */
    static isDate(value: any): value is Date;
    /**
     * Return `true` if the passed value is a scalar (`number`, `boolean` or `Date`)
     */
    static isScalar(value: any): value is number | boolean | Date;
    /**
     * Return `true` if the passed value is an `Array`
     */
    static isArray(value: any): value is Array<any>;
    /**
     * Return `true` if the passed value is iterable
     */
    static isIterable(value: any): value is Array<any>;
    /**
     * Return `true` if the passed value is a `Map`
     */
    static isMap(value: any): value is Map<any, any>;
    /**
     * Return `true` if the passed value is a `Function`
     */
    static isFunction(value: any): value is Function;
    /**
     * Return `true` if the passed value is a `RegExp`
     */
    static isRegExp(value: any): value is RegExp;
    /**
     * Return `true` if the passed value is a `Window`
     */
    static isWindow(value: any): value is Window;
    /**
     * Return `true` if the passed value is a `File`
     */
    static isFile(value: any): value is File;
    /**
     * Return `true` if the passed value is a `FormData`
     */
    static isFormData(value: any): value is FormData;
    /**
     * Return `true` if the passed value is a `Blob`
     */
    static isBlob(value: any): value is Blob;
    /**
     * Return `true` if the passed value is an `ArrayBuffer`
     */
    static isArrayBuffer(value: any): value is ArrayBuffer;
    private static isArrayLike;
    /**
     * Return `true` if the passed value is an `object` without a prototype
     */
    static isBlankObject(value: any): value is object;
    private static TYPED_ARRAY_REGEXP;
    /**
     * Return true if the passed value is a `TypedArray`
     */
    static isTypedArray(value: any): boolean;
    /**
     * Return a promise that is a resolved after a specified amount of time
     *
     * @param ms The time to delay in milliseconds
     */
    static delay(ms?: number): Promise<void>;
    /**
     *
     * @param value
     * @param _default
     */
    static isTrue(value: any, _default?: boolean): boolean;
    /**
     * Compares two strings using the current locale. The return value is negative
     * if `a` comes before `b` and positive if `a` comes after `b`. If the values
     * are equal then `0` is returned
     *
     * @param a The first string
     * @param b The second string
     * @param ignoreCase If set, do a case-insensitive comparison
     */
    static compare(a: string, b: string, ignoreCase?: boolean): number;
    /**
     * Return `true` if two strings are equal, respecting case
     *
     * @param a The first string
     * @param b The second string
     */
    static eq(a: string, b: string): boolean;
    /**
     * Return `true` if two strings are equal, ignoring case
     *
     * @param a The first string
     * @param b The second string
     */
    static eqNC(a: string, b: string): boolean;
    /**
     * Return `true` if a number of strings are equal, ignoring case
     *
     * @param a The first string
     * @param b Remaining strings
     */
    static eqNCN(a: string, ...b: string[]): boolean;
    /**
     * Return the length of a string. If the string is empty (`null` or `undefined`)
     * @param s A string
     */
    static len(s: string): number;
    /**
     * Return `true` if a string starts with another
     *
     * @param a The string to test
     * @param b The prefix
     * @param ignoreCase If `true` then ignore case
     */
    static startsWith(a: string, b: string, ignoreCase?: boolean): boolean;
    /**
     * Return `true` if a string ends with another
     *
     * @param a The string to test
     * @param b The postfix
     * @param ignoreCase If `true` then ignore case
     */
    static endsWith(a: string, b: string, ignoreCase?: boolean): boolean;
    /**
     * Return `true` if a string is a substring of another
     * @param a The string to test
     * @param b The substring
     * @param ignoreCase If `true` then ignore case
     */
    static includes(a: string, b: string, ignoreCase?: boolean): boolean;
    /**
     * Return the upper case value of a string using the current locale
     */
    static toUpperCase(s: string): string;
    /**
     * Return a string with the first character converted to upper case using the current locale
     */
    static toUpperFirst(s: string): string;
    /**
     * Return the lower case value of a string using the current locale
     */
    static toLowerCase(s: string): string;
    /**
     * Return a string with the first character converted to lower case using the current locale
     */
    static toLowerFirst(s: string): string;
    /**
     * Return a string where the first character of each space separated word is converted to upper case.
     * However, if a word contains a full stop character the first character is left unchanged
     */
    static toStartCase(text: string): string;
    /**
     * Return a string where any leading and trailing whitespace characters are removed
     */
    static trim(s: string): string;
    /**
     * Return a string where any leading whitespace characters are removed
     */
    static trimStart(s: string): string;
    /**
     * Return a string where any trailing whitespace characters are removed
     */
    static trimEnd(s: string): string;
    /**
     * Return a string truncated to a maximum length. If the length of the string is greater than `maxLength`
     * then it is truncated to `maxLength and a `suffix` appended. Otherwise the string is returned unchanged
     *
     * @param s The string to truncate
     * @param maxLength The maximum length
     * @param suffix The value to append if the string is truncated. The default is `...`
     */
    static truncate(s: string, maxLength: number, suffix?: string): string;
    private static regExEscapeRegEx;
    /**
     * Return a string where any regular expresion operators are escaped
     */
    static regExEscape(s: string): string;
    /**
     * Replaces patterns in a string with a replacement string. The pattern can either a string
     * or a `RegExp`.
     *
     * @param s The string in which to search for a pattern
     * @param pattern The pattern
     * @param replacement The replacement string to replace any occurrences of the pattern in the string
     */
    static replace(s: string, pattern: string | RegExp, replacement: string): string;
    /**
     * Split a string into an array of substrings using the passed separators
     *
     * @param s The string to split
     * @param separators One or more separators
     * @param trim If `true` trim any leading and trailing spaces from the substrings
     * @param removeEmpty If `true` exclude any empty strings from the array of substrings
     */
    static split(s: string, separators: string | string[], trim?: boolean, removeEmpty?: boolean): string[];
    /**
     * Return a string in kebab case (`CatDog => cat-dog`)
     */
    static toKebabCase(text: string): string;
    /**
     * Return a string in snake case (`CatDog => cat_dog`)
     */
    static toSnakeCase(text: string): string;
    /**
     * Return a string in camel case (`CatDog => catDog`)
     */
    static toCamelCase(text: string): string;
    /**
     * Return a string with any diacritics removed
     */
    static removeAccents(text: string): string;
    /**
     * Return a string in normalized form which can be used to match entity values. A normalized value
     * has any diacritics removed and is converted to upper case
     */
    static normalize(text: string | null | undefined): string;
    /**
     * Return `true` if a string is valid as a simple value for the Sinequa admininistration
     */
    static isValidSimpleName(name: string): boolean;
    /**
     * Return `true` if a string is valid as a scoped (`.` separated) simple value for the Sinequa admininistration
     */
    static isValidScopedSimpleName(name: string): boolean;
    /**
     * Return `true` if a value is `null`, `undefined` or `""`
     */
    static isEmpty(value: any): boolean;
    /**
     * Return the number of occurrences of a substring in a string
     *
     * @param text The text to test
     * @param sub The substring
     * @param ignoreCase If `true` don't respect case when matching the substring
     */
    static count(text: string, sub: string, ignoreCase?: boolean): number;
    /**
     * Return a string converted to base64
     */
    static toBase64(value: string): string;
    /**
     * Return a string converted from base64
     */
    static fromBase64(value: string): string;
    /**
     * Return the SHA256 hash value of string
     */
    static sha256(value: string): string;
    /**
     * Return the SHA512 hash value of string
     */
    static sha512(value: string): string;
    /**
     * Return a string where any HTML special characters are percent encoded
     */
    static encodeHTML(value: string): string;
    /**
     * Return a string where any percent encoded characters are replaced by their corresponding unencoded characters
     */
    static decodeHTML(value: string): string;
    /**
     * Get a field with passed name from an object. The field name is matched insensitive of case
     */
    static getField<T>(obj: MapOf<T>, name: string): T | undefined;
    /**
     * Clear fields from an object. If the `_delete` parameter is `false` then
     * array or map fields are emptied and other fields are set to `undefined`.
     * If the `_delete` parameter is `true` then fields are deleted
     */
    static clearObject(obj: {}, _delete?: boolean): {};
    /**
     * Return the non-empty fields in the `override` object that that are different to fields of the same name
     * in the `template` object
     * @param template The object to compare against
     * @param override The object defining the fields and values to be compared
     * @param ret An optional return object. If not set a new object is created
     */
    static deltas(template: {}, override: {}, ret?: {}): {};
    /**
     * Returns an object containing the fields in a source object whose names match one of the passed keys. The keys can either be
     * an array of strings or a callback function that is called for each field in the source object and returns `true` if a field
     * should be "picked".
     *
     * @param obj The source object
     * @param keys An array of keys or a callback function
     */
    static pick(obj: {}, keys: string[] | ((value: any, key: string, obj: object) => boolean)): {};
    /**
     * Create a debounce function that delays invoking `func` until after `wait` millseconds have elapsed since the previous invocation.
     *
     * @param func The function to debounce
     * @param wait The delay in milliseconds to wait before calling `func`
     * @param immediate If `true` then make an initial call to `func`
     * @param every An optional callback to call without debouncing
     */
    static debounce(func: (...params: any[]) => any, wait?: number, immediate?: boolean, every?: (...params: any[]) => any): (...params: any[]) => any;
    /**
     * Create a throttled function that only invokes func at most once per every `wait` milliseconds.
     *
     * @param func The function to throttle
     * @param wait The number of milliseconds to throttle invocations to
     * @param options Options to control the throttling behaviour
     */
    static throttle(func: (...params: any[]) => any, wait: number, options?: ThrottleSettings): (...pararms: any[]) => any;
    private static frameTasks;
    /**
     * Create a function that calls `callback` the next time the browser next repaints
     */
    static frame(callback: (...params: any[]) => any): (...params: any[]) => any;
    /**
     * Create a URL object from a `url` string. If the string is a relative url then
     * `base` specifies the base to use
     */
    static makeURL(url: string, base?: string): URL;
    /**
     * Add query string parameters to a url
     *
     * @param url The url to which to add the parameters
     * @param params An object whose fields should be added as parameters
     */
    static addSearchParams(url: string, params: MapOf<any>): string;
    private static _addUrl;
    /**
     * Add paths to a url adding path separators as necessary
     *
     * @param url The url
     * @param paths One or more paths to add to the url
     */
    static addUrl(url: string, ...paths: string[]): string;
    /**
     * Return `true` if a url is absolute
     */
    static isUrlAbsolute(url: string): boolean;
    /**
     * Return an `HttpParams` object containing the fields in the passed object
     */
    static makeHttpParams(params: MapOf<string | boolean | number | Date | object | undefined>): HttpParams;
    private static escapeDiv;
    /**
     * Return a string with HTML special characters escaped
     *
     * @param html The string to escape
     */
    static escapeHtml(html: string): string;
    /**
     * Move an element in an array
     *
     * @param array The array containing the element to move
     * @param from The index of the element to move
     * @param to The index that the element should be moved to
     */
    static arrayMove(array: any[], from: number, to: number): void;
    /**
     * Set the contents of a target array to the contents of a source array
     *
     * @param target The target array
     * @param source The source array
     */
    static arraySet(target: any[], source: any[]): any[];
    private static genericNext;
    private static genericError;
    private static genericComplete;
    /**
     * A simple wrapped around `Observable.subscribe`
     */
    static subscribe<T>(observable: Observable<T>, next: (value: T) => void, error?: (err: any) => void, complete?: () => void): Subscription;
    /**
     * Return a value as a `Date` converting as necessary. If the value
     * cannot be converted then `undefined` is returned
     */
    static asDate(value: any): Date | undefined;
    /**
     * Return a value as a `number` converting as necessary. If the value
     * cannot be converted then `undefined` is returned.
     */
    static asNumber(value: any): number | undefined;
    /**
     * Return a value as a `string` converting as necessary
     */
    static asString(value: any): string | undefined;
    /**
     * Return `true` if a string represents an integer
     */
    static testInteger(str: string): boolean;
    /**
     * Return `true` if a string represents a floating point number
     */
    static testFloat(str: string): boolean;
    /**
     * Round the passed number away from zero: 4.5 => 5, -4.5 => -5
     */
    static roundAway(num: number): number;
    private static matchSuffix;
    /**
     * Convert a size in string form to a number in bytes.
     *
     * The following units are supported: `b`, `kb`, `mb`, `gb`, `tb`, `pb`
     *
     * For example `2.5 gb` will return `2621440`.
     */
    static toSize(str: string, _default?: number): number;
    private static calculateDuration;
    /**
     * Convert a duration in string form to a number in milliseconds.
     *
     * These units are supported: `days`, `hours`, `minutes`, `seconds`, `milliseconds` (abbreviations are also supported)
     *
     * For example `3 h 2mins 4s => 10924000`
     *
     * @param defaultUnit The unit to use if no units are in the string. The default value is `ms`
     */
    static toDuration(str: string, defaultUnit?: string): number;
}
//# sourceMappingURL=utils.d.ts.map