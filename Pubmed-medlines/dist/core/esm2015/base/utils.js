import { HttpParams } from "@angular/common/http";
import moment from "moment";
import { remove as removeDiacritics } from "diacritics";
import jsSHA from "jssha";
import kebabCase from "lodash/kebabCase";
import snakeCase from "lodash/snakeCase";
import camelCase from "lodash/camelCase";
import escape from "lodash/escape";
import unescape from "lodash/unescape";
import isEqual from "lodash/isEqual";
// Because of: https://github.com/angular/angular/issues/18261
class SqHttpParameterCodec {
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}
class FrameTask {
    constructor(callback, params) {
        this.callback = callback;
        this.params = params;
    }
    call() {
        return this.callback(...this.params);
    }
}
/**
 * A utility class to log execution durations
 */
export class Timer {
    constructor(name) {
        this.name = name;
        /**
         * Contains the timestamp of when the `Timer` object was instantiated
         */
        this.start = performance.now();
        /**
         * Contains the current durartion in milliseconds of the `Timer` object
         */
        this.duration = 0;
    }
    /**
     * Updates the `duration` of the `Timer` object
     */
    stop() {
        this.duration = performance.now() - this.start;
        console.log(`Timer: ${this.name} finished in ${Math.round(this.duration)} ms`);
    }
}
/**
 * A utility class containing a variety of static methods and properties
 */
// @dynamic
export class Utils {
    static baseExtend(dst, objs, deep, sort) {
        for (let i = 0, ii = objs.length; i < ii; ++i) {
            const obj = objs[i];
            if (!Utils.isObject(obj) && !Utils.isFunction(obj)) {
                continue;
            }
            let keys = Object.keys(obj);
            if (sort) {
                if (Utils.isFunction(sort)) {
                    keys = keys.sort(sort);
                }
                else {
                    keys = keys.sort();
                }
            }
            for (let j = 0, jj = keys.length; j < jj; j++) {
                const key = keys[j];
                const src = obj[key];
                if (deep && Utils.isObject(src)) {
                    if (Utils.isDate(src)) {
                        dst[key] = new Date(src.valueOf());
                    }
                    else if (Utils.isRegExp(src)) {
                        dst[key] = new RegExp(src);
                    }
                    else if (src.nodeName) {
                        dst[key] = src.cloneNode(true);
                    }
                    else {
                        if (!Utils.isObject(dst[key])) {
                            dst[key] = Utils.isArray(src) ? [] : {};
                        }
                        Utils.baseExtend(dst[key], [src], true);
                    }
                }
                else {
                    dst[key] = src;
                }
            }
        }
        return dst;
    }
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
    static extend(destination, ...sources) {
        return Utils.baseExtend(destination, sources, false);
    }
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
    static merge(destination, ...sources) {
        return Utils.baseExtend(destination, sources, true);
    }
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
    static mergeAndSort(destination, ...sources) {
        return Utils.baseExtend(destination, sources, true, true);
    }
    static forEach(obj, iterator, context) {
        let key, length;
        if (obj) {
            if (Utils.isFunction(obj)) {
                for (key in obj) {
                    // Need to check if hasOwnProperty exists,
                    // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                    if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
            else if (Utils.isArray(obj) || Utils.isArrayLike(obj)) {
                const isPrimitive = typeof obj !== 'object';
                for (key = 0, length = obj.length; key < length; key++) {
                    if (isPrimitive || key in obj) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
            else if (obj.forEach && obj.forEach !== Utils.forEach) {
                obj.forEach(iterator, context, obj);
            }
            else if (Utils.isBlankObject(obj)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
            else if (typeof obj.hasOwnProperty === 'function') {
                // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
            else {
                // Slow path for objects which do not have a method `hasOwnProperty`
                for (key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        }
        return obj;
    }
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
    static copy(source, destination) {
        const stackSource = [];
        const stackDest = [];
        if (destination) {
            if (Utils.isTypedArray(destination)) {
                throw new Error("Can't copy! TypedArray destination cannot be mutated.");
            }
            if (source === destination) {
                throw new Error("Can't copy! Source and destination are identical.");
            }
            // Empty the destination object
            if (Utils.isArray(destination)) {
                destination.length = 0;
            }
            else {
                Utils.forEach(destination, (value, key) => {
                    if (!source.hasOwnProperty(key)) {
                        delete destination[key];
                    }
                });
            }
            stackSource.push(source);
            stackDest.push(destination);
            return copyRecurse(source, destination);
        }
        return copyElement(source);
        function copyRecurse(source, destination) {
            let key;
            if (Utils.isArray(source)) {
                for (let i = 0, ii = source.length; i < ii; i++) {
                    destination.push(copyElement(source[i]));
                }
            }
            else if (Utils.isBlankObject(source)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (key in source) {
                    destination[key] = copyElement(source[key]);
                }
            }
            else if (source && typeof source.hasOwnProperty === 'function') {
                // Slow path, which must rely on hasOwnProperty
                for (key in source) {
                    if (source.hasOwnProperty(key)) {
                        destination[key] = copyElement(source[key]);
                    }
                }
            }
            else {
                // Slowest path --- hasOwnProperty can't be called as a method
                for (key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        destination[key] = copyElement(source[key]);
                    }
                }
            }
            return destination;
        }
        function copyElement(source) {
            // Simple values
            if (!Utils.isObject(source)) {
                return source;
            }
            // Already copied values
            const index = stackSource.indexOf(source);
            if (index !== -1) {
                return stackDest[index];
            }
            if (Utils.isWindow(source)) {
                throw new Error("Can't copy! Making copies of Window instances is not supported.");
            }
            let needsRecurse = false;
            let destination;
            if (Utils.isArray(source)) {
                destination = [];
                needsRecurse = true;
            }
            else if (Utils.isTypedArray(source)) {
                destination = new source.constructor(source);
            }
            else if (Utils.isDate(source)) {
                destination = new Date(source.getTime());
            }
            else if (Utils.isRegExp(source)) {
                const matches = source.toString().match(/[^\/]*$/);
                destination = new RegExp(source.source, matches ? matches[0] : "");
                destination.lastIndex = source.lastIndex;
            }
            else if (Utils.isFunction(source.cloneNode)) {
                destination = source.cloneNode(true);
            }
            else {
                destination = Object.create(Object.getPrototypeOf(source));
                needsRecurse = true;
            }
            stackSource.push(source);
            stackDest.push(destination);
            return needsRecurse ? copyRecurse(source, destination) : destination;
        }
    }
    // Not currently used
    static copyWithoutNullOrEmpty(dst, src) {
        const keys = Object.keys(src);
        for (let j = 0, jj = keys.length; j < jj; j++) {
            const key = keys[j];
            const value = src[key];
            if (value === null || Utils.isEmpty(null)) {
                continue;
            }
            else if (Utils.isObject(value)) {
                if (Utils.isDate(value)) {
                    dst[key] = new Date(value.valueOf());
                }
                else if (Utils.isRegExp(value)) {
                    dst[key] = new RegExp(value);
                }
                else {
                    if (!Utils.isObject(dst[key])) {
                        dst[key] = Utils.isArray(value) ? [] : {};
                    }
                    dst[key] = Utils.copyWithoutNullOrEmpty(dst[key], value);
                }
            }
            else {
                dst[key] = value;
            }
        }
        return dst;
    }
    /**
     * Makes a shallow copy of the passed object. Empty string values are removed from the copied object.
     * A string value containing `""` is copied as an empty string.
     *
     * @param defaults The object to copy
     * @return The copied object
     */
    static copyDefaults(defaults) {
        const _defaults = Utils.copy(defaults);
        if (_defaults) {
            Object.keys(_defaults).forEach(key => {
                // Unset parameters will come through as empty strings (regardless of type)
                // Filter these out (to not hide defaults on the server) and accept "" as a way of explicitly
                // setting a parameter to be an empty string
                const value = _defaults[key];
                if (value === "") {
                    delete _defaults[key];
                }
                if (value === "\"\"") {
                    _defaults[key] = "";
                }
            });
        }
        return _defaults;
    }
    /**
     * Performs an optimized deep comparison between two objects to determine if they should be considered equal
     * @param o1 The first object to be compared
     * @param o2 The second object to be compared
     */
    static equals(o1, o2) {
        return isEqual(o1, o2);
    }
    /**
     * Converts a string to an integer value using `parseInt` with radix = 10.
     * If the string cannot be converted or contains additional characters then the
     * passed default value is returned
     * @param str The string to convert
     * @param _default The default value to use if the string cannot be converted
     */
    static toInt(str, _default = 0) {
        let value = parseInt(str, 10);
        if (isNaN(value) || (value + "" !== str)) {
            value = _default;
        }
        return value;
    }
    /**
     * Converts a string to a floating point value using `parseFloat`.
     * If the string cannot be converted then the passed default value is returned
     * @param str The string to convert
     * @param _default The default value to use if the string cannot be converted
     */
    static toNumber(str, _default = 0) {
        let value = parseFloat(str);
        if (isNaN(value)) {
            value = _default;
        }
        return value;
    }
    /**
     * Converts a string to a `Date` using `Date.parse`.
     * The date is returned in UTC. If the string cannot be converted then `undefined` is returned
     * @param str The string to convert
     * @return The converted `Date` in UTC or `undefined`
     */
    static toDate(str) {
        const ms = Date.parse(str);
        if (!ms && ms !== 0) {
            return undefined;
        }
        return new Date(ms + new Date(ms).getTimezoneOffset() * 60000); // get date in UTC
    }
    /**
     * Get the time component of a `Date` in milliseconds
     *
     * @param date The date
     * @return The time in milliseconds
     */
    static getTime(date) {
        if (!date) {
            return 0;
        }
        return (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
    }
    /**
     * Return the current date and time
     */
    static get now() {
        return new Date();
    }
    /**
     * Converts a `Date` to a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`)
     * If the time component of the date is 0 then only the date portion of the string is included
     *
     * @param date The `Date` to convert
     */
    static toSysDateStr(date) {
        if (!date) {
            return "";
        }
        const m = moment(date);
        if (Utils.getTime(date) === 0) {
            return m.format("YYYY-MM-DD");
        }
        else {
            return m.format("YYYY-MM-DD HH:mm:ss");
        }
    }
    /**
     * Converts a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`) to a `Date`
     * If the string cannot be converted then `undefined` is returned
     *
     * @param date The Sinequa system date string to convert
     */
    static fromSysDateStr(value) {
        const m = moment(value, "YYYY-MM-DD HH:mm:ss");
        if (m.isValid()) {
            return m.toDate();
        }
        return undefined;
    }
    static isSysDateTime(str) {
        return Utils.rxSysDateTime.test(str);
    }
    static isISO8601DateTime(str) {
        return Utils.rxISO8601DateTime.test(str);
    }
    /**
     * Converts a Javascript value to a JSON string using `JSON.stringify`.
     * Date objects are converted to Sinequa system strings
     *
     * @param value The value to convert
     * @param options Options for the conversion. The default is `{pretty: false}`
     */
    static toJson(value, options = { pretty: false }) {
        return JSON.stringify(value, function (key, value) {
            if (key && Utils.isDate(this[key])) {
                const str = Utils.toSysDateStr(this[key]);
                return str;
            }
            return value;
        }, options.pretty ? 2 : 0);
    }
    /**
     * Converts a string to an object using `JSON.parse`.
     * Strings that are either in Sinequa system date or ISO8601 format are converted to
     * `Date` objects if the `reviveDates` option is specified.
     *
     * @param str The string to convert
     * @param options Options for the conversion. The default is `{reviveDates: false}`
     */
    static fromJson(str, options = { reviveDates: false }) {
        if (!str || typeof str !== "string") {
            return {};
        }
        try {
            return JSON.parse(str, options.reviveDates ?
                (key, value) => {
                    if (options.reviveDates && typeof value === "string") {
                        if (Utils.isSysDateTime(value)) {
                            const m = moment(value, "YYYY-MM-DD HH:mm:ss");
                            if (m.isValid()) {
                                return m.toDate();
                            }
                        }
                        else if (Utils.isISO8601DateTime(value)) {
                            const m = moment(value, moment.ISO_8601);
                            if (m.isValid()) {
                                return m.toDate();
                            }
                        }
                    }
                    return value;
                } : undefined);
        }
        catch (exception) {
            console.log("Utils.fromJson exception:", exception);
            return null;
        }
    }
    /**
     * Converts a `FieldValue` value to a string compatible with Sinequa's SQL syntax.
     * String and `Date` values are enclosed in single quotes if the quote parameter is `true`
     *
     * @param value The value to convert
     * @param quote If set, the returned string will be enclosed in single quotes for string and `Date` values
     */
    static toSqlValue(value, quote) {
        if (Utils.isNumber(value)) {
            return value + "";
        }
        if (Utils.isDate(value)) {
            if (quote) {
                return "'" + Utils.toSysDateStr(value) + "'";
            }
            else {
                return Utils.toSysDateStr(value);
            }
        }
        if (Utils.isBoolean(value)) {
            return value ? "true" : "false";
        }
        if (Utils.isArray(value)) {
            const ret = [];
            value.forEach(v => {
                if (ret.length > 0) {
                    ret.push(",");
                }
                if (!v) {
                    ret.push("null");
                }
                else if (Utils.isString(v)) {
                    ret.push(v);
                }
                else {
                    ret.push(v.display || v.value || "");
                }
            });
            ret.splice(0, 0, "[");
            ret.push("]");
            return ret.join("");
        }
        if (quote) {
            return "'" + value + "'";
        }
        else {
            return value;
        }
    }
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
    static treeClean(s) {
        if (Utils.isEmpty(s)) {
            return s;
        }
        return Utils.addUrl("/", Utils.replace(Utils.replace(Utils.replace(s, "\t", " "), ";", ","), "\\", "/"), "/");
    }
    /**
     * Return the first node of a Sinequa tree value enclosed in forward slashes
     *
     * @param s A Sinequa tree value
     */
    static treeFirst(s) {
        const parts = Utils.split(s, "/");
        return parts.length === 0 ? "" : `/${parts[0]}/`;
    }
    /**
     * Return the first node of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeFirstNode(s) {
        const parts = Utils.split(s, "/");
        return parts[0];
    }
    /**
     * Return the last node of a Sinequa tree value enclosed in forward slashes
     *
     * @param s A Sinequa tree value
     */
    static treeLast(s) {
        const parts = Utils.split(s, "/");
        return parts.length === 0 ? "" : `/${parts[parts.length - 1]}/`;
    }
    /**
     * Return the last node of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeLastNode(s) {
        const parts = Utils.split(s, "/");
        return parts[parts.length - 1];
    }
    /**
     * Return the nodes making up a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeNodes(s) {
        return Utils.split(s, "/");
    }
    /**
     * Return a Sinequa tree value, removing enclosing forward slash characters
     *
     * @param s A Sinequa tree value
     */
    static treeDisplay(s) {
        if (!!s) {
            if (s[0] === "/") {
                s = s.substr(1);
            }
            if (s[s.length - 1] === "/") {
                s = s.substr(0, s.length - 1);
            }
        }
        return s;
    }
    /**
     * Return the node count of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeCount(s) {
        const count = Utils.count(s, "/");
        return count > 0 ? count - 1 : 0;
    }
    /**
     * Traverses a tree structure, executing a callback function at every node
     * @param nodes the nodes to traverse
     * @param callback the callback function
     */
    static traverse(nodes, callback) {
        if (!nodes || nodes.length === 0) {
            return false;
        }
        if (!callback) {
            return false;
        }
        const lineage = [];
        const stack = [];
        let _i = nodes.length;
        while (_i--) {
            stack.push(nodes[_i]);
        }
        while (stack.length) {
            const node = stack.pop();
            if (!node) {
                lineage.pop();
                callback(undefined);
            }
            else {
                lineage.push(node);
                if (callback(lineage)) {
                    return true;
                }
                stack.push(undefined);
                if (node.items && node.items.length > 0) {
                    _i = node.items.length;
                    while (_i--) {
                        stack.push(node.items[_i]);
                    }
                }
            }
        }
        return false;
    }
    /**
     * Return a pseudo-GUID value using `Math.random`
     *
     * @param withHyphens If set, the returned GUID includes hyphen separators
     */
    static guid(withHyphens = true) {
        let d = Date.now();
        const guid = (withHyphens ?
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
    /**
     * Return `true` if the passed value is `undefined`
     */
    static isUndefined(value) {
        return typeof value === 'undefined';
    }
    /**
     * Return `true` if the passed value is an `object`
     */
    static isObject(value) {
        return value !== null && typeof value === 'object';
    }
    /**
     * Return `true` if the passed value is a `string`
     */
    static isString(value) {
        return typeof value === 'string';
    }
    /**
     * Return `true` if the passed value is a `number`
     */
    static isNumber(value) {
        return typeof value === 'number';
    }
    /**
     * Return `true` if the passed value is a `boolean`
     */
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    /**
     * Return `true` if the passed value is a `Date`
     */
    static isDate(value) {
        return Object.prototype.toString.call(value) === '[object Date]';
    }
    /**
     * Return `true` if the passed value is a scalar (`number`, `boolean` or `Date`)
     */
    static isScalar(value) {
        return Utils.isNumber(value) || Utils.isBoolean(value) || Utils.isDate(value);
    }
    /**
     * Return `true` if the passed value is an `Array`
     */
    static isArray(value) {
        return Array.isArray(value);
    }
    /**
     * Return `true` if the passed value is iterable
     */
    static isIterable(value) {
        if (value === null || value === undefined) {
            return false;
        }
        return typeof value[Symbol.iterator] === "function";
    }
    /**
     * Return `true` if the passed value is a `Map`
     */
    static isMap(value) {
        return Object.prototype.toString.call(value) === '[object Map]';
    }
    /**
     * Return `true` if the passed value is a `Function`
     */
    static isFunction(value) {
        return typeof value === 'function';
    }
    /**
     * Return `true` if the passed value is a `RegExp`
     */
    static isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }
    /**
     * Return `true` if the passed value is a `Window`
     */
    static isWindow(value) {
        return value && value.window === value;
    }
    /**
     * Return `true` if the passed value is a `File`
     */
    static isFile(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object File]";
    }
    /**
     * Return `true` if the passed value is a `FormData`
     */
    static isFormData(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object FormData]";
    }
    /**
     * Return `true` if the passed value is a `Blob`
     */
    static isBlob(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object Blob]";
    }
    /**
     * Return `true` if the passed value is an `ArrayBuffer`
     */
    static isArrayBuffer(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object ArrayBuffer]";
    }
    static isArrayLike(obj) {
        // `null`, `undefined` and `window` are not array-like
        if (obj == null || Utils.isWindow(obj))
            return false;
        // arrays, strings and jQuery/jqLite objects are array like
        // * jqLite is either the jQuery or jqLite constructor function
        // * we have to check the existance of jqLite first as this method is called
        //   via the forEach method when constructing the jqLite object in the first place
        if (Utils.isArray(obj) || Utils.isString(obj) /*|| (jqLite && obj instanceof jqLite)*/)
            return true;
        // Support: iOS 8.2 (not reproducible in simulator)
        // "length" in obj used to prevent JIT error (gh-11508)
        const length = "length" in Object(obj) && obj.length;
        // NodeList objects (with `item` method) and
        // other objects with suitable length characteristics are array-like
        return Utils.isNumber(length) &&
            (length >= 0 && (length - 1) in obj || typeof obj.item === 'function');
    }
    /**
     * Return `true` if the passed value is an `object` without a prototype
     */
    static isBlankObject(value) {
        return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
    }
    /**
     * Return true if the passed value is a `TypedArray`
     */
    static isTypedArray(value) {
        return value && Utils.isNumber(value.length) && Utils.TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(value));
    }
    /**
     * Return a promise that is a resolved after a specified amount of time
     *
     * @param ms The time to delay in milliseconds
     */
    static delay(ms = 0) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve();
            }, ms);
        });
    }
    /**
     *
     * @param value
     * @param _default
     */
    static isTrue(value, _default) {
        if (typeof (value) === 'string') {
            value = value.toLowerCase();
        }
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            case "":
            case undefined:
                return !!_default;
            default:
                return false;
        }
    }
    /**
     * Compares two strings using the current locale. The return value is negative
     * if `a` comes before `b` and positive if `a` comes after `b`. If the values
     * are equal then `0` is returned
     *
     * @param a The first string
     * @param b The second string
     * @param ignoreCase If set, do a case-insensitive comparison
     */
    static compare(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.localeCompare(b);
    }
    /**
     * Return `true` if two strings are equal, respecting case
     *
     * @param a The first string
     * @param b The second string
     */
    static eq(a, b) {
        return Utils.compare(a, b, false) === 0;
    }
    /**
     * Return `true` if two strings are equal, ignoring case
     *
     * @param a The first string
     * @param b The second string
     */
    static eqNC(a, b) {
        return Utils.compare(a, b, true) === 0;
    }
    /**
     * Return `true` if a number of strings are equal, ignoring case
     *
     * @param a The first string
     * @param b Remaining strings
     */
    static eqNCN(a, ...b) {
        if (!b) {
            return false;
        }
        for (const s of b) {
            if (Utils.eqNC(a, s)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Return the length of a string. If the string is empty (`null` or `undefined`)
     * @param s A string
     */
    static len(s) {
        return (s || '').length;
    }
    /**
     * Return `true` if a string starts with another
     *
     * @param a The string to test
     * @param b The prefix
     * @param ignoreCase If `true` then ignore case
     */
    static startsWith(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.startsWith(b);
    }
    /**
     * Return `true` if a string ends with another
     *
     * @param a The string to test
     * @param b The postfix
     * @param ignoreCase If `true` then ignore case
     */
    static endsWith(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.endsWith(b);
    }
    /**
     * Return `true` if a string is a substring of another
     * @param a The string to test
     * @param b The substring
     * @param ignoreCase If `true` then ignore case
     */
    static includes(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.includes(b);
    }
    /**
     * Return the upper case value of a string using the current locale
     */
    static toUpperCase(s) {
        if (s) {
            return s.toLocaleUpperCase();
        }
        return "";
    }
    /**
     * Return a string with the first character converted to upper case using the current locale
     */
    static toUpperFirst(s) {
        if (s) {
            return s[0].toLocaleUpperCase() + s.substr(1);
        }
        return "";
    }
    /**
     * Return the lower case value of a string using the current locale
     */
    static toLowerCase(s) {
        if (s) {
            return s.toLocaleLowerCase();
        }
        return "";
    }
    /**
     * Return a string with the first character converted to lower case using the current locale
     */
    static toLowerFirst(s) {
        if (s) {
            return s[0].toLocaleLowerCase() + s.substr(1);
        }
        return "";
    }
    /**
     * Return a string where the first character of each space separated word is converted to upper case.
     * However, if a word contains a full stop character the first character is left unchanged
     */
    static toStartCase(text) {
        if (text) {
            const words = text.split(/[\s]+/);
            return words.map(value => !value.includes(".") ? Utils.toUpperFirst(value) : value).join(" ");
        }
        return "";
    }
    /**
     * Return a string where any leading and trailing whitespace characters are removed
     */
    static trim(s) {
        if (s) {
            return s.trim();
        }
        return "";
    }
    /**
     * Return a string where any leading whitespace characters are removed
     */
    static trimStart(s) {
        if (s) {
            return s.trimStart();
        }
        return "";
    }
    /**
     * Return a string where any trailing whitespace characters are removed
     */
    static trimEnd(s) {
        if (s) {
            return s.trimEnd();
        }
        return "";
    }
    /**
     * Return a string truncated to a maximum length. If the length of the string is greater than `maxLength`
     * then it is truncated to `maxLength and a `suffix` appended. Otherwise the string is returned unchanged
     *
     * @param s The string to truncate
     * @param maxLength The maximum length
     * @param suffix The value to append if the string is truncated. The default is `...`
     */
    static truncate(s, maxLength, suffix) {
        if (!s) {
            return "";
        }
        suffix = suffix || "...";
        if (s.length <= maxLength) {
            return s;
        }
        return s.substring(0, maxLength - suffix.length) + suffix;
    }
    /**
     * Return a string where any regular expresion operators are escaped
     */
    static regExEscape(s) {
        if (!s) {
            return "";
        }
        return s.replace(Utils.regExEscapeRegEx, "\\$&");
    }
    /**
     * Replaces patterns in a string with a replacement string. The pattern can either a string
     * or a `RegExp`.
     *
     * @param s The string in which to search for a pattern
     * @param pattern The pattern
     * @param replacement The replacement string to replace any occurrences of the pattern in the string
     */
    static replace(s, pattern, replacement) {
        if (!s || !pattern) {
            return "";
        }
        if (Utils.isRegExp(pattern)) {
            return s.replace(pattern, replacement);
        }
        else {
            return s.replace(new RegExp(Utils.regExEscape(pattern), "g"), replacement);
        }
    }
    /**
     * Split a string into an array of substrings using the passed separators
     *
     * @param s The string to split
     * @param separators One or more separators
     * @param trim If `true` trim any leading and trailing spaces from the substrings
     * @param removeEmpty If `true` exclude any empty strings from the array of substrings
     */
    static split(s, separators, trim = true, removeEmpty = true) {
        if (!s) {
            return [];
        }
        if (!separators) {
            return [s];
        }
        let split;
        if (typeof separators === "string") {
            split = s.split(separators);
            if (trim) {
                split = split.map(value => value.trim());
            }
        }
        else {
            let rxs = separators.map((value) => Utils.regExEscape(value)).join("|");
            if (trim) {
                rxs = "(?:^\\s*)|(?:\\s*(?:" + rxs + ")\\s*)|(?:\\s*$)";
            }
            split = s.split(new RegExp(rxs));
        }
        if (removeEmpty) {
            split = split.filter((value) => {
                return !Utils.isEmpty(value);
            });
        }
        return split;
    }
    /**
     * Return a string in kebab case (`CatDog => cat-dog`)
     */
    static toKebabCase(text) {
        return kebabCase(text);
    }
    /**
     * Return a string in snake case (`CatDog => cat_dog`)
     */
    static toSnakeCase(text) {
        return snakeCase(text);
    }
    /**
     * Return a string in camel case (`CatDog => catDog`)
     */
    static toCamelCase(text) {
        return camelCase(text);
    }
    /**
     * Return a string with any diacritics removed
     */
    static removeAccents(text) {
        if (!text) {
            return "";
        }
        return removeDiacritics(text);
    }
    /**
     * Return a string in normalized form which can be used to match entity values. A normalized value
     * has any diacritics removed and is converted to upper case
     */
    static normalize(text) {
        if (!text) {
            return "";
        }
        return Utils.removeAccents(text).toUpperCase();
    }
    /**
     * Return `true` if a string is valid as a simple value for the Sinequa admininistration
     */
    static isValidSimpleName(name) {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
    }
    /**
     * Return `true` if a string is valid as a scoped (`.` separated) simple value for the Sinequa admininistration
     */
    static isValidScopedSimpleName(name) {
        return /^[a-zA-Z_]([\.]?[a-zA-Z0-9_]+)*$/.test(name);
    }
    /**
     * Return `true` if a value is `null`, `undefined` or `""`
     */
    static isEmpty(value) {
        if (value === "") {
            return true;
        }
        if (value === null) {
            return true;
        }
        if (Utils.isUndefined(value)) {
            return true;
        }
        return false;
    }
    /**
     * Return the number of occurrences of a substring in a string
     *
     * @param text The text to test
     * @param sub The substring
     * @param ignoreCase If `true` don't respect case when matching the substring
     */
    static count(text, sub, ignoreCase = true) {
        if (!text || !sub) {
            return 0;
        }
        if (ignoreCase) {
            text = text.toLocaleUpperCase();
            sub = sub.toLocaleUpperCase();
        }
        let pos = -1;
        let count = 0;
        while (true) {
            pos = text.indexOf(sub, pos + 1);
            if (pos === -1) {
                break;
            }
            count++;
        }
        return count;
    }
    /**
     * Return a string converted to base64
     */
    static toBase64(value) {
        return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16))));
    }
    /**
     * Return a string converted from base64
     */
    static fromBase64(value) {
        return decodeURIComponent(atob(value).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
    /**
     * Return the SHA256 hash value of string
     */
    static sha256(value) {
        const sha = new jsSHA("SHA-256", "TEXT");
        sha.update(value);
        return sha.getHash("B64");
    }
    /**
     * Return the SHA512 hash value of string
     */
    static sha512(value) {
        const sha = new jsSHA("SHA-512", "TEXT");
        sha.update(value);
        return sha.getHash("B64");
    }
    /**
     * Return a string where any HTML special characters are percent encoded
     */
    static encodeHTML(value) {
        return escape(value);
    }
    /**
     * Return a string where any percent encoded characters are replaced by their corresponding unencoded characters
     */
    static decodeHTML(value) {
        return unescape(value);
    }
    /**
     * Get a field with passed name from an object. The field name is matched insensitive of case
     */
    static getField(obj, name) {
        if (!Utils.isObject(obj) || Utils.isEmpty(name)) {
            return undefined;
        }
        const keys = Object.keys(obj).filter(key => Utils.eqNC(key, name));
        if (keys.length === 0) {
            return undefined;
        }
        return obj[keys[0]];
    }
    /**
     * Clear fields from an object. If the `_delete` parameter is `false` then
     * array or map fields are emptied and other fields are set to `undefined`.
     * If the `_delete` parameter is `true` then fields are deleted
     */
    static clearObject(obj, _delete = false) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (_delete) {
                    delete obj[prop];
                }
                else {
                    if (Utils.isArray(obj[prop])) {
                        obj[prop].length = 0;
                    }
                    else if (Utils.isMap(obj[prop])) {
                        obj[prop].clear();
                    }
                    else {
                        obj[prop] = undefined;
                    }
                }
            }
        }
        return obj;
    }
    /**
     * Return the non-empty fields in the `override` object that that are different to fields of the same name
     * in the `template` object
     * @param template The object to compare against
     * @param override The object defining the fields and values to be compared
     * @param ret An optional return object. If not set a new object is created
     */
    static deltas(template, override, ret) {
        if (!ret) {
            ret = {};
        }
        for (const name of Object.keys(override)) {
            if (name in template) {
                if (Utils.isObject(override[name]) && !Utils.isArray(override[name])) {
                    const diff = Utils.deltas(template[name], override[name]);
                    if (!Utils.equals(diff, {})) {
                        ret[name] = diff;
                    }
                }
                else if (!Utils.equals(template[name], override[name])) {
                    if (!Utils.isEmpty(override[name])) {
                        ret[name] = override[name];
                    }
                }
            }
            else {
                if (!Utils.isEmpty(override[name])) {
                    ret[name] = override[name];
                }
            }
        }
        return ret;
    }
    /**
     * Returns an object containing the fields in a source object whose names match one of the passed keys. The keys can either be
     * an array of strings or a callback function that is called for each field in the source object and returns `true` if a field
     * should be "picked".
     *
     * @param obj The source object
     * @param keys An array of keys or a callback function
     */
    static pick(obj, keys) {
        const ret = {};
        if (!!obj) {
            if (Utils.isFunction(keys)) {
                Object.keys(obj).forEach(key => {
                    if (keys(obj[key], key, obj)) {
                        ret[key] = obj[key];
                    }
                });
            }
            else {
                for (const key of keys) {
                    if (obj.hasOwnProperty(key)) {
                        ret[key] = obj[key];
                    }
                }
            }
        }
        return ret;
    }
    /**
     * Create a debounce function that delays invoking `func` until after `wait` millseconds have elapsed since the previous invocation.
     *
     * @param func The function to debounce
     * @param wait The delay in milliseconds to wait before calling `func`
     * @param immediate If `true` then make an initial call to `func`
     * @param every An optional callback to call without debouncing
     */
    static debounce(func, wait = 0, immediate = false, every) {
        let timeout, args, context, timestamp, result;
        const later = function () {
            const last = Date.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) {
                        context = args = null;
                    }
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            if (every) {
                every.apply(context, args);
            }
            timestamp = Date.now();
            const callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
    /**
     * Create a throttled function that only invokes func at most once per every `wait` milliseconds.
     *
     * @param func The function to throttle
     * @param wait The number of milliseconds to throttle invocations to
     * @param options Options to control the throttling behaviour
     */
    static throttle(func, wait, options = {}) {
        let timeout, context, args, result;
        let previous = 0;
        const later = function () {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        };
        const throttled = function () {
            const now = Date.now();
            if (!previous && options.leading === false)
                previous = now;
            const remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
            else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
        throttled["cancel"] = function () {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };
        return throttled;
    }
    /**
     * Create a function that calls `callback` the next time the browser next repaints
     */
    static frame(callback) {
        return (...params) => {
            if (Utils.frameTasks.size === 0) {
                requestAnimationFrame((timestamp) => {
                    Utils.frameTasks.forEach((task, key, map) => {
                        task.call();
                    });
                    Utils.frameTasks.clear();
                });
            }
            const task = Utils.frameTasks.get(callback);
            if (task) {
                // Update params
                task.params = params;
            }
            else {
                // Add new task
                Utils.frameTasks.set(callback, new FrameTask(callback, params));
            }
        };
    }
    /**
     * Create a URL object from a `url` string. If the string is a relative url then
     * `base` specifies the base to use
     */
    static makeURL(url, base) {
        if (!base) {
            base = "http://x.y.z"; // Firefox and IOS need this
        }
        return new URL(url, base);
    }
    /**
     * Add query string parameters to a url
     *
     * @param url The url to which to add the parameters
     * @param params An object whose fields should be added as parameters
     */
    static addSearchParams(url, params) {
        if (!url || !params) {
            return url;
        }
        const urlObj = Utils.makeURL(url);
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                urlObj.searchParams.set(param, params[param]);
            }
        }
        const index = url.indexOf("?");
        if (index !== -1) {
            url = url.substr(0, index);
        }
        url += "?" + urlObj.searchParams.toString();
        return url;
    }
    static _addUrl(url, path) {
        if (!path) {
            return url;
        }
        if (!url) {
            return path;
        }
        if (url[url.length - 1] === "/") {
            if (path[0] === "/") {
                return url + path.substr(1);
            }
            else {
                return url + path;
            }
        }
        else {
            if (path[0] === "/") {
                return url + path;
            }
            else {
                return url + "/" + path;
            }
        }
    }
    /**
     * Add paths to a url adding path separators as necessary
     *
     * @param url The url
     * @param paths One or more paths to add to the url
     */
    static addUrl(url, ...paths) {
        let _url = url;
        for (const path of paths) {
            _url = Utils._addUrl(_url, path);
        }
        return _url;
    }
    /**
     * Return `true` if a url is absolute
     */
    static isUrlAbsolute(url) {
        return /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/.test(url);
    }
    /**
     * Return an `HttpParams` object containing the fields in the passed object
     */
    static makeHttpParams(params) {
        let httpParams = new HttpParams({ encoder: new SqHttpParameterCodec() });
        if (params) {
            for (const param in params) {
                if (params.hasOwnProperty(param)) {
                    const _value = params[param];
                    let value = "";
                    if (Utils.isString(_value)) {
                        value = _value;
                    }
                    else if (Utils.isBoolean(_value) || Utils.isNumber(_value)) {
                        value = _value.toString();
                    }
                    else if (Utils.isDate(_value)) {
                        value = Utils.toSysDateStr(_value);
                    }
                    else {
                        value = Utils.toJson(_value);
                    }
                    httpParams = httpParams.set(param, value);
                }
            }
        }
        return httpParams;
    }
    /**
     * Return a string with HTML special characters escaped
     *
     * @param html The string to escape
     */
    static escapeHtml(html) {
        if (!html) {
            return html;
        }
        if (!Utils.escapeDiv) {
            Utils.escapeDiv = document.createElement("div");
        }
        const textNode = Utils.escapeDiv.appendChild(document.createTextNode(html));
        const escapedHtml = Utils.escapeDiv.innerHTML;
        Utils.escapeDiv.removeChild(textNode);
        return escapedHtml;
    }
    /**
     * Move an element in an array
     *
     * @param array The array containing the element to move
     * @param from The index of the element to move
     * @param to The index that the element should be moved to
     */
    static arrayMove(array, from, to) {
        if (to === from) {
            return;
        }
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    /**
     * Set the contents of a target array to the contents of a source array
     *
     * @param target The target array
     * @param source The source array
     */
    static arraySet(target, source) {
        return target.splice.apply(target, [0, target.length].concat(source));
    }
    static genericNext(value) {
    }
    static genericError(error) {
    }
    static genericComplete() {
    }
    /**
     * A simple wrapped around `Observable.subscribe`
     */
    static subscribe(observable, next, error, complete) {
        if (!next) {
            next = Utils.genericNext;
        }
        if (!error) {
            error = Utils.genericError;
        }
        if (!complete) {
            complete = Utils.genericComplete;
        }
        return observable.subscribe(next, error, complete);
    }
    /**
     * Return a value as a `Date` converting as necessary. If the value
     * cannot be converted then `undefined` is returned
     */
    static asDate(value) {
        if (!value) {
            return undefined;
        }
        if (Utils.isDate(value)) {
            return value;
        }
        if (Utils.isString(value)) {
            return Utils.toDate(value);
        }
        return undefined;
    }
    /**
     * Return a value as a `number` converting as necessary. If the value
     * cannot be converted then `undefined` is returned.
     */
    static asNumber(value) {
        if (!value && value !== 0) {
            return undefined;
        }
        if (Utils.isNumber(value)) {
            return value;
        }
        if (Utils.isString(value)) {
            if (Utils.testInteger(value)) {
                return Utils.toInt(value);
            }
            if (Utils.testFloat(value)) {
                return Utils.toNumber(value);
            }
        }
        return undefined;
    }
    /**
     * Return a value as a `string` converting as necessary
     */
    static asString(value) {
        if (!value && value !== "") {
            return undefined;
        }
        if (Utils.isString(value)) {
            return value;
        }
        return value.toString();
    }
    /**
     * Return `true` if a string represents an integer
     */
    static testInteger(str) {
        return /^(\-|\+)?([0-9]+)$/.test(str);
    }
    /**
     * Return `true` if a string represents a floating point number
     */
    static testFloat(str) {
        return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str);
    }
    /**
     * Round the passed number away from zero: 4.5 => 5, -4.5 => -5
     */
    static roundAway(num) {
        return num >= 0 ? Math.round(num) : Math.sign(num) * Math.round(Math.abs(num));
    }
    static matchSuffix(str, factor, ...suffixes) {
        for (const suffix of suffixes) {
            if (Utils.endsWith(str, suffix)) {
                return {
                    str: Utils.trimEnd(str.substr(0, str.length - suffix.length)),
                    factor
                };
            }
        }
        return undefined;
    }
    /**
     * Convert a size in string form to a number in bytes.
     *
     * The following units are supported: `b`, `kb`, `mb`, `gb`, `tb`, `pb`
     *
     * For example `2.5 gb` will return `2621440`.
     */
    static toSize(str, _default = 0) {
        str = Utils.trim(str);
        if (!str) {
            return _default;
        }
        let factor = 1;
        let ret = Utils.matchSuffix(str, 1024 * 1024 * 1024 * 1024 * 1024, "PB", "PO");
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024 * 1024 * 1024 * 1024, "TB", "TO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024 * 1024 * 1024, "GB", "GO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024 * 1024, "MB", "MO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024, "KB", "KO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1, "B", "O");
        }
        if (ret !== undefined) {
            str = ret.str;
            factor = ret.factor;
        }
        if (!Utils.testFloat(str)) {
            return _default;
        }
        const value = Utils.toNumber(str, _default) * factor;
        return Math.round(value);
    }
    static calculateDuration(current, unit) {
        switch (Utils.toLowerCase(unit)) {
            case "d":
            case "j":
            case "days":
            case "jours":
            case "day":
            case "jour":
                return current * Utils.oneDay;
            case "h":
            case "hours":
            case "heures":
            case "hour":
            case "heure":
                return current * Utils.oneHour;
            case "m":
            case "minutes":
            case "minute":
            case "mins":
            case "min":
                return current * Utils.oneMinute;
            case "s":
            case "seconds":
            case "secondes":
            case "second":
            case "seconde":
            case "secs":
            case "sec":
                return current * Utils.oneSecond;
                break;
            case "ms":
            case "milliseconds":
            case "miliseconds":
            case "millisecondes":
            case "milisecondes":
            case "millisecond":
            case "milliseconde":
            case "milisecond":
            case "miliseconde":
                return current;
            default:
                return 0;
        }
    }
    /**
     * Convert a duration in string form to a number in milliseconds.
     *
     * These units are supported: `days`, `hours`, `minutes`, `seconds`, `milliseconds` (abbreviations are also supported)
     *
     * For example `3 h 2mins 4s => 10924000`
     *
     * @param defaultUnit The unit to use if no units are in the string. The default value is `ms`
     */
    static toDuration(str, defaultUnit = "ms") {
        let total = 0;
        if (str) {
            let current = 0;
            const tokens = str.match(/[0-9\.,]+|[a-zA-Z]+/g) || [];
            for (const token of tokens) {
                if (/[a-zA-Z]/.test(token)) {
                    total += Utils.calculateDuration(current, token);
                    current = 0;
                }
                else {
                    if (current) {
                        total += Utils.calculateDuration(current, defaultUnit);
                    }
                    current = Utils.toNumber(token);
                }
            }
            if (current) {
                total += Utils.calculateDuration(current, defaultUnit);
            }
        }
        return total;
    }
}
/**
 * The number of milliseconds in one day
 */
Utils.oneDay = 86400000;
/**
 * The number of milliseconds in one hour
 */
Utils.oneHour = 3600000;
/**
 * The number of milliseconds in one minute
 */
Utils.oneMinute = 60000;
/**
 * The number of milliseconds in one second
 */
Utils.oneSecond = 1000;
Utils.rxSysDateTime = /^\d{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])(?: (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)?$/;
// private static rxISO8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
// ISO8601 combined date and time
Utils.rxISO8601DateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
Utils.TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
Utils.regExEscapeRegEx = /[-\/\\^$*+?.()|[\]{}]/g;
Utils.frameTasks = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9iYXNlLyIsInNvdXJjZXMiOlsidXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUVwRSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxFQUFDLE1BQU0sSUFBSSxnQkFBZ0IsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN0RCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFHMUIsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxNQUFNLE1BQU0sZUFBZSxDQUFDO0FBQ25DLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sT0FBTyxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLDhEQUE4RDtBQUM5RCxNQUFNLG9CQUFvQjtJQUN0QixTQUFTLENBQUMsR0FBVztRQUNqQixPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUNyQixPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBVztRQUNqQixPQUFPLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBYTtRQUNyQixPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDSjtBQXFDRCxNQUFNLFNBQVM7SUFDWCxZQUNXLFFBQTRCLEVBQzVCLE1BQWE7UUFEYixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFPO0lBQ3hCLENBQUM7SUFF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OFo1QyxnQkFBVSxHQUF1QyxJQUFJLEdBQUcsRUFBaUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cFBhcmFtcywgSHR0cFBhcmFtZXRlckNvZGVjfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQge3JlbW92ZSBhcyByZW1vdmVEaWFjcml0aWNzfSBmcm9tIFwiZGlhY3JpdGljc1wiO1xuaW1wb3J0IGpzU0hBIGZyb20gXCJqc3NoYVwiO1xuaW1wb3J0IHtNYXBPZn0gZnJvbSBcIi4vbWFwLW9mXCI7XG5pbXBvcnQge0ZpZWxkVmFsdWV9IGZyb20gXCIuL2ZpZWxkLXZhbHVlXCI7XG5pbXBvcnQga2ViYWJDYXNlIGZyb20gXCJsb2Rhc2gva2ViYWJDYXNlXCI7XG5pbXBvcnQgc25ha2VDYXNlIGZyb20gXCJsb2Rhc2gvc25ha2VDYXNlXCI7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gXCJsb2Rhc2gvY2FtZWxDYXNlXCI7XG5pbXBvcnQgZXNjYXBlIGZyb20gXCJsb2Rhc2gvZXNjYXBlXCI7XG5pbXBvcnQgdW5lc2NhcGUgZnJvbSBcImxvZGFzaC91bmVzY2FwZVwiO1xuaW1wb3J0IGlzRXF1YWwgZnJvbSBcImxvZGFzaC9pc0VxdWFsXCI7XG5cbi8vIEJlY2F1c2Ugb2Y6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzE4MjYxXG5jbGFzcyBTcUh0dHBQYXJhbWV0ZXJDb2RlYyBpbXBsZW1lbnRzIEh0dHBQYXJhbWV0ZXJDb2RlYyB7XG4gICAgZW5jb2RlS2V5KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpO1xuICAgIH1cblxuICAgIGVuY29kZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICB9XG5cbiAgICBkZWNvZGVLZXkoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGtleSk7XG4gICAgfVxuXG4gICAgZGVjb2RlVmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgb3B0aW9ucyBmb3IgdGhlIFtVdGlscy50b0pzb25de0BsaW5rIFV0aWxzI3RvSnNvbn0gbWV0aG9kXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9Kc29uT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogSWYgYHRydWVgIHRoZW4gc3BhY2luZyBpcyBhZGRlZCB0byB0aGUgb3V0cHV0IHN0cmluZ1xuICAgICAqL1xuICAgIHByZXR0eT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIG9wdGlvbnMgZm9yIHRoZSBbVXRpbHMuZnJvbUpzb25de0BsaW5rIFV0aWxzI2Zyb21Kc29ufSBtZXRob2RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBGcm9tSnNvbk9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIElmIGB0cnVlYCB0aGVuIHN0cmluZ3MgY29udGFpbmluZyBlaXRoZXIgSVNPODYwMSBvciBTaW5lcXVhIFwic3lzdGVtXCIgZGF0ZXMgKGB5eXl5LW1tLWRkIFtoaDptbTpzc11gKSBhcmVcbiAgICAgKiBjb252ZXJ0ZWQgdG8gSmF2YXNjcmlwdCBgRGF0ZWAgb2JqZWN0c1xuICAgICAqL1xuICAgIHJldml2ZURhdGVzPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgb3B0aW9ucyBmb3IgdGhlIFtVdGlscy50aHJvdHRsZV17QGxpbmsgVXRpbHMjdGhyb3R0bGV9IG1ldGhvZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRocm90dGxlU2V0dGluZ3Mge1xuICAgIC8qKlxuICAgICAqIFNldCB0byBgZmFsc2VgIHRvIGRpc2FibGUgdGhlIGluaXRpYWwgY2FsbCB0byB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBsZWFkaW5nPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTZXQgdG8gYGZhbHNlYCB0byBkaXNhYmxlIHRoZSBmaW5hbCBjYWxsIHRvIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqL1xuICAgIHRyYWlsaW5nPzogYm9vbGVhbjtcbn1cblxuY2xhc3MgRnJhbWVUYXNrIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGNhbGxiYWNrOiAoLi4ucGFyYW1zKSA9PiBhbnksXG4gICAgICAgIHB1YmxpYyBwYXJhbXM6IGFueVtdKSB7XG4gICAgfVxuXG4gICAgY2FsbCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFjayguLi50aGlzLnBhcmFtcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEEgdXRpbGl0eSBjbGFzcyB0byBsb2cgZXhlY3V0aW9uIGR1cmF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgVGltZXIge1xuICAgIC8qKlxuICAgICAqIENvbnRhaW5zIHRoZSB0aW1lc3RhbXAgb2Ygd2hlbiB0aGUgYFRpbWVyYCBvYmplY3Qgd2FzIGluc3RhbnRpYXRlZFxuICAgICAqL1xuICAgIHJlYWRvbmx5IHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgLyoqXG4gICAgICogQ29udGFpbnMgdGhlIGN1cnJlbnQgZHVyYXJ0aW9uIGluIG1pbGxpc2Vjb25kcyBvZiB0aGUgYFRpbWVyYCBvYmplY3RcbiAgICAgKi9cbiAgICBkdXJhdGlvbiA9IDA7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG5hbWU6IHN0cmluZykge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGBkdXJhdGlvbmAgb2YgdGhlIGBUaW1lcmAgb2JqZWN0XG4gICAgICovXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5zdGFydDtcbiAgICAgICAgY29uc29sZS5sb2coYFRpbWVyOiAke3RoaXMubmFtZX0gZmluaXNoZWQgaW4gJHtNYXRoLnJvdW5kKHRoaXMuZHVyYXRpb24pfSBtc2ApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIGdlbmVyaWMgaW50ZXJmYWNlIGZvciB0cmVlIG5vZGVzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZU5vZGUge1xuICAgIC8qKlxuICAgICAqIENoaWxkcmVuIGVsZW1lbnRzIG9mIHRoaXMgdHJlZSBub2RlXG4gICAgICovXG4gICAgaXRlbXM/OiBUcmVlTm9kZVtdO1xufVxuXG4vKipcbiAqIEEgdXRpbGl0eSBjbGFzcyBjb250YWluaW5nIGEgdmFyaWV0eSBvZiBzdGF0aWMgbWV0aG9kcyBhbmQgcHJvcGVydGllc1xuICovXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBvbmUgZGF5XG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IG9uZURheSA9IDg2NDAwMDAwO1xuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIG9uZSBob3VyXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IG9uZUhvdXIgPSAzNjAwMDAwO1xuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGluIG9uZSBtaW51dGVcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgb25lTWludXRlID0gNjAwMDA7XG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaW4gb25lIHNlY29uZFxuICAgICAqL1xuICAgIHN0YXRpYyByZWFkb25seSBvbmVTZWNvbmQgPSAxMDAwO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYmFzZUV4dGVuZChkc3QsIG9ianMsIGRlZXA/OiBib29sZWFuLCBzb3J0PzogYm9vbGVhbiB8ICgoYTogc3RyaW5nLCBiOiBzdHJpbmcpID0+IG51bWJlcikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gb2Jqcy5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBvYmpzW2ldO1xuICAgICAgICAgICAgaWYgKCFVdGlscy5pc09iamVjdChvYmopICYmICFVdGlscy5pc0Z1bmN0aW9uKG9iaikpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgICAgIGlmIChzb3J0KSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzRnVuY3Rpb24oc29ydCkpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cyA9IGtleXMuc29ydChzb3J0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMgPSBrZXlzLnNvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgamogPSBrZXlzLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChkZWVwICYmIFV0aWxzLmlzT2JqZWN0KHNyYykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzRGF0ZShzcmMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkc3Rba2V5XSA9IG5ldyBEYXRlKHNyYy52YWx1ZU9mKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzUmVnRXhwKHNyYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRzdFtrZXldID0gbmV3IFJlZ0V4cChzcmMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNyYy5ub2RlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHN0W2tleV0gPSBzcmMuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlscy5pc09iamVjdChkc3Rba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc3Rba2V5XSA9IFV0aWxzLmlzQXJyYXkoc3JjKSA/IFtdIDoge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlscy5iYXNlRXh0ZW5kKGRzdFtrZXldLCBbc3JjXSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRzdFtrZXldID0gc3JjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNoYWxsb3dseSBjb3B5IHRoZSBwcm9wZXJ0aWVzIGluIHRoZSBzb3VyY2Ugb2JqZWN0cyB0byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgICAqIEFueSBuZXN0ZWQgb2JqZWN0cyBvciBhcnJheXMgd2lsbCBiZSBjb3BpZWQgYnkgcmVmZXJlbmNlLCBub3QgZHVwbGljYXRlZC5cbiAgICAgKiBUaGUgc291cmNlIG9iamVjdHMgYXJlIHRyZWF0ZWQgaW4gb3JkZXIgc28gcHJvcGVydGllcyBpbiBsYXRlclxuICAgICAqIG9iamVjdHMgd2lsbCBvdmVycmlkZSBwcm9wZXJ0aWVzIGluIGVhcmxpZXIgb25lcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBUaGUgb2JqZWN0IHRvIHdoaWNoIHByb3BlcnRpZXMgYXJlIGNvcGllZFxuICAgICAqIEBwYXJhbSBzb3VyY2VzIE9iamVjdHMgZnJvbSB3aGljaCBwcm9wZXJ0aWVzIGFyZSBjb3BpZWRcbiAgICAgKiBAcmV0dXJuIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgZXh0ZW5kKGRlc3RpbmF0aW9uOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogYW55IHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmJhc2VFeHRlbmQoZGVzdGluYXRpb24sIHNvdXJjZXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWVwbHkgY29weSB0aGUgcHJvcGVydGllcyBpbiB0aGUgc291cmNlIG9iamVjdHMgdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICAgKiBBbnkgbmVzdGVkIG9iamVjdHMgb3IgYXJyYXlzIHdpbGwgYmUgZHVwbGljYXRlZC5cbiAgICAgKiBUaGUgc291cmNlIG9iamVjdHMgYXJlIHRyZWF0ZWQgaW4gb3JkZXIgc28gcHJvcGVydGllcyBpbiBsYXRlclxuICAgICAqIG9iamVjdHMgd2lsbCBvdmVycmlkZSBwcm9wZXJ0aWVzIGluIGVhcmxpZXIgb25lcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBUaGUgb2JqZWN0IHRvIHdoaWNoIHByb3BlcnRpZXMgYXJlIGNvcGllZFxuICAgICAqIEBwYXJhbSBzb3VyY2VzIE9iamVjdHMgZnJvbSB3aGljaCBwcm9wZXJ0aWVzIGFyZSBjb3BpZWRcbiAgICAgKiBAcmV0dXJuIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgbWVyZ2UoZGVzdGluYXRpb246IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuICAgICAgICByZXR1cm4gVXRpbHMuYmFzZUV4dGVuZChkZXN0aW5hdGlvbiwgc291cmNlcywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVlcGx5IGNvcHkgdGhlIHByb3BlcnRpZXMgaW4gdGhlIHNvdXJjZSBvYmplY3RzIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAgICogQW55IG5lc3RlZCBvYmplY3RzIG9yIGFycmF5cyB3aWxsIGJlIGR1cGxpY2F0ZWQuXG4gICAgICogVGhlIHNvdXJjZSBvYmplY3RzIGFyZSB0cmVhdGVkIGluIG9yZGVyIHNvIHByb3BlcnRpZXMgaW4gbGF0ZXJcbiAgICAgKiBvYmplY3RzIHdpbGwgb3ZlcnJpZGUgcHJvcGVydGllcyBpbiBlYXJsaWVyIG9uZXMuXG4gICAgICogVGhlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3RzIGFyZSBzb3J0ZWQgaW4gYXNjZW5kaW5nLCBBU0NJSSBjaGFyYWN0ZXIgb3JkZXJcbiAgICAgKiBiZWZvcmUgdGhleSBhcmUgY29waWVkIHRvIGVuc3VyZSBhIGNvbnNpc3RlbnQgaW5zZXJ0aW9uIG9yZGVyIGluIHRoZSBkZXN0aW5hdGlvblxuICAgICAqIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBUaGUgb2JqZWN0IHRvIHdoaWNoIHByb3BlcnRpZXMgYXJlIGNvcGllZFxuICAgICAqIEBwYXJhbSBzb3VyY2VzIE9iamVjdHMgZnJvbSB3aGljaCBwcm9wZXJ0aWVzIGFyZSBjb3BpZWRcbiAgICAgKiBAcmV0dXJuIHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgbWVyZ2VBbmRTb3J0KGRlc3RpbmF0aW9uOiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKTogYW55IHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmJhc2VFeHRlbmQoZGVzdGluYXRpb24sIHNvdXJjZXMsIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGZvckVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dD8pIHtcbiAgICAgICAgbGV0IGtleSwgbGVuZ3RoO1xuICAgICAgICBpZiAob2JqKSB7XG4gICAgICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbihvYmopKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgaWYgaGFzT3duUHJvcGVydHkgZXhpc3RzLFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBvbiBJRTggdGhlIHJlc3VsdCBvZiBxdWVyeVNlbGVjdG9yQWxsIGlzIGFuIG9iamVjdCB3aXRob3V0IGEgaGFzT3duUHJvcGVydHkgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ3Byb3RvdHlwZScgJiYga2V5ICE9PSAnbGVuZ3RoJyAmJiBrZXkgIT09ICduYW1lJyAmJiAoIW9iai5oYXNPd25Qcm9wZXJ0eSB8fCBvYmouaGFzT3duUHJvcGVydHkoa2V5KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChVdGlscy5pc0FycmF5KG9iaikgfHwgVXRpbHMuaXNBcnJheUxpa2Uob2JqKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzUHJpbWl0aXZlID0gdHlwZW9mIG9iaiAhPT0gJ29iamVjdCc7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBrZXkgPCBsZW5ndGg7IGtleSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1ByaW1pdGl2ZSB8fCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iai5mb3JFYWNoICYmIG9iai5mb3JFYWNoICE9PSBVdGlscy5mb3JFYWNoKSB7XG4gICAgICAgICAgICAgICAgb2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQsIG9iaik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFV0aWxzLmlzQmxhbmtPYmplY3Qob2JqKSkge1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZU1hcCgpIGZhc3QgcGF0aCAtLS0gU2FmZSB0byBhdm9pZCBoYXNPd25Qcm9wZXJ0eSBjaGVjayBiZWNhdXNlIHByb3RvdHlwZSBjaGFpbiBpcyBlbXB0eVxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqLmhhc093blByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gU2xvdyBwYXRoIGZvciBvYmplY3RzIGluaGVyaXRpbmcgT2JqZWN0LnByb3RvdHlwZSwgaGFzT3duUHJvcGVydHkgY2hlY2sgbmVlZGVkXG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU2xvdyBwYXRoIGZvciBvYmplY3RzIHdoaWNoIGRvIG5vdCBoYXZlIGEgbWV0aG9kIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIGRlZXAgY29weSBvZiB0aGUgcGFzc2VkIG9iamVjdCBvciBhcnJheSBhbmQgcmV0dXJucyBpdC5cbiAgICAgKiBDb3BpZXMgb2Ygc291cmNlIG9iamVjdHMgb2YgdGhlIGZvbGxvd2luZyB0eXBlczogYFR5cGVkQXJyYXlgLCBgRGF0ZWAsIGBSZWdFeHBgIGBOb2RlYCBhcmVcbiAgICAgKiBtYWRlIHVzaW5nIHRoZSBhcHByb3ByaWF0ZSBjb25zdHJ1Y3Rvci4gQXJyYXlzIGFyZSBjcmVhdGVkIHVzaW5nIGBbXWAuIE90aGVyIG9iamVjdHMgYXJlIGNyZWF0ZWRcbiAgICAgKiB1c2luZyBgT2JqZWN0LmNyZWF0ZWAgcGFzc2luZyB0aGUgc291cmNlIG9iamVjdCdzIHByb3RwdHlwZSwgaWYgYW55LlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIGl0ZW0gdG8gY29weSAoYE9iamVjdGAsIGBBcnJheWAsIGBUeXBlZEFycmF5YCwgYERhdGVgLCBgUmVnRXhwYCwgYE5vZGVgKVxuICAgICAqIEBwYXJhbSBkZXN0aW5hdGlvbiBBbiBvcHRpb25hbCBpdGVtIHRvIHVzZSBhcyB0aGUgZGVzdGluYXRpb24uIElmIHBhc3NlZCwgdGhlIGl0ZW0gaXMgY2xlYXJlZFxuICAgICAqIGJlZm9yZSB0aGUgc291cmNlIGlzIGNvcGllZCB0byBpdC4gVGhlIGRlc3RpbmF0aW9uIGNhbm5vdCBiZSBhIGBUeXBlZEFycmF5YCBhbmQgY2Fubm90IGJlIHRoZSBzYW1lXG4gICAgICogYXMgdGhlIHNvdXJjZVxuICAgICAqIEByZXR1cm4gVGhlIGNvcGllZCBpdGVtXG4gICAgICovXG4gICAgc3RhdGljIGNvcHk8VCBleHRlbmRzIG9iamVjdD4oc291cmNlOiBULCBkZXN0aW5hdGlvbj86IFQpOiBUIHtcbiAgICAgICAgY29uc3Qgc3RhY2tTb3VyY2U6IG9iamVjdFtdID0gW107XG4gICAgICAgIGNvbnN0IHN0YWNrRGVzdDogb2JqZWN0W10gPSBbXTtcblxuICAgICAgICBpZiAoZGVzdGluYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc1R5cGVkQXJyYXkoZGVzdGluYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29weSEgVHlwZWRBcnJheSBkZXN0aW5hdGlvbiBjYW5ub3QgYmUgbXV0YXRlZC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGNvcHkhIFNvdXJjZSBhbmQgZGVzdGluYXRpb24gYXJlIGlkZW50aWNhbC5cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IHRoZSBkZXN0aW5hdGlvbiBvYmplY3RcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIChkZXN0aW5hdGlvbiBhcyBBcnJheTxhbnk+KS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZm9yRWFjaChkZXN0aW5hdGlvbiwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRlc3RpbmF0aW9uW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RhY2tTb3VyY2UucHVzaChzb3VyY2UpO1xuICAgICAgICAgICAgc3RhY2tEZXN0LnB1c2goZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGNvcHlSZWN1cnNlKHNvdXJjZSwgZGVzdGluYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvcHlFbGVtZW50KHNvdXJjZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY29weVJlY3Vyc2Uoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgbGV0IGtleTtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBzb3VyY2UubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5wdXNoKGNvcHlFbGVtZW50KHNvdXJjZVtpXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoVXRpbHMuaXNCbGFua09iamVjdChzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlTWFwKCkgZmFzdCBwYXRoIC0tLSBTYWZlIHRvIGF2b2lkIGhhc093blByb3BlcnR5IGNoZWNrIGJlY2F1c2UgcHJvdG90eXBlIGNoYWluIGlzIGVtcHR5XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSBjb3B5RWxlbWVudChzb3VyY2Vba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UgJiYgdHlwZW9mIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIC8vIFNsb3cgcGF0aCwgd2hpY2ggbXVzdCByZWx5IG9uIGhhc093blByb3BlcnR5XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25ba2V5XSA9IGNvcHlFbGVtZW50KHNvdXJjZVtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gU2xvd2VzdCBwYXRoIC0tLSBoYXNPd25Qcm9wZXJ0eSBjYW4ndCBiZSBjYWxsZWQgYXMgYSBtZXRob2RcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uW2tleV0gPSBjb3B5RWxlbWVudChzb3VyY2Vba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjb3B5RWxlbWVudChzb3VyY2UpIHtcbiAgICAgICAgICAgIC8vIFNpbXBsZSB2YWx1ZXNcbiAgICAgICAgICAgIGlmICghVXRpbHMuaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEFscmVhZHkgY29waWVkIHZhbHVlc1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzdGFja1NvdXJjZS5pbmRleE9mKHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrRGVzdFtpbmRleF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChVdGlscy5pc1dpbmRvdyhzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgY29weSEgTWFraW5nIGNvcGllcyBvZiBXaW5kb3cgaW5zdGFuY2VzIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbmVlZHNSZWN1cnNlID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgZGVzdGluYXRpb247XG5cbiAgICAgICAgICAgIGlmIChVdGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IFtdO1xuICAgICAgICAgICAgICAgIG5lZWRzUmVjdXJzZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFV0aWxzLmlzVHlwZWRBcnJheShzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBuZXcgc291cmNlLmNvbnN0cnVjdG9yKHNvdXJjZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFV0aWxzLmlzRGF0ZShzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBuZXcgRGF0ZShzb3VyY2UuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoVXRpbHMuaXNSZWdFeHAoc291cmNlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzb3VyY2UudG9TdHJpbmcoKS5tYXRjaCgvW15cXC9dKiQvKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IG5ldyBSZWdFeHAoc291cmNlLnNvdXJjZSwgbWF0Y2hlcyA/IG1hdGNoZXNbMF0gOiBcIlwiKTtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbi5sYXN0SW5kZXggPSBzb3VyY2UubGFzdEluZGV4O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChVdGlscy5pc0Z1bmN0aW9uKHNvdXJjZS5jbG9uZU5vZGUpKSB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSBzb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbiA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkpO1xuICAgICAgICAgICAgICAgIG5lZWRzUmVjdXJzZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YWNrU291cmNlLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgIHN0YWNrRGVzdC5wdXNoKGRlc3RpbmF0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5lZWRzUmVjdXJzZSA/IGNvcHlSZWN1cnNlKHNvdXJjZSwgZGVzdGluYXRpb24pIDogZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3QgY3VycmVudGx5IHVzZWRcbiAgICBwcml2YXRlIHN0YXRpYyBjb3B5V2l0aG91dE51bGxPckVtcHR5KGRzdDogTWFwT2Y8YW55Piwgc3JjOiBNYXBPZjxhbnk+KTogTWFwT2Y8YW55PiB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzcmMpO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgamogPSBrZXlzLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbal07XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHNyY1trZXldO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IFV0aWxzLmlzRW1wdHkobnVsbCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRzdFtrZXldID0gbmV3IERhdGUodmFsdWUudmFsdWVPZigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRzdFtrZXldID0gbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVV0aWxzLmlzT2JqZWN0KGRzdFtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHN0W2tleV0gPSBVdGlscy5pc0FycmF5KHZhbHVlKSA/IFtdIDoge307XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZHN0W2tleV0gPSBVdGlscy5jb3B5V2l0aG91dE51bGxPckVtcHR5KGRzdFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZHN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgc2hhbGxvdyBjb3B5IG9mIHRoZSBwYXNzZWQgb2JqZWN0LiBFbXB0eSBzdHJpbmcgdmFsdWVzIGFyZSByZW1vdmVkIGZyb20gdGhlIGNvcGllZCBvYmplY3QuXG4gICAgICogQSBzdHJpbmcgdmFsdWUgY29udGFpbmluZyBgXCJcImAgaXMgY29waWVkIGFzIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkZWZhdWx0cyBUaGUgb2JqZWN0IHRvIGNvcHlcbiAgICAgKiBAcmV0dXJuIFRoZSBjb3BpZWQgb2JqZWN0XG4gICAgICovXG4gICAgc3RhdGljIGNvcHlEZWZhdWx0cyhkZWZhdWx0czoge30pOiB7fSB7XG4gICAgICAgIGNvbnN0IF9kZWZhdWx0cyA9IFV0aWxzLmNvcHkoZGVmYXVsdHMpO1xuICAgICAgICBpZiAoX2RlZmF1bHRzKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhfZGVmYXVsdHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBVbnNldCBwYXJhbWV0ZXJzIHdpbGwgY29tZSB0aHJvdWdoIGFzIGVtcHR5IHN0cmluZ3MgKHJlZ2FyZGxlc3Mgb2YgdHlwZSlcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgdGhlc2Ugb3V0ICh0byBub3QgaGlkZSBkZWZhdWx0cyBvbiB0aGUgc2VydmVyKSBhbmQgYWNjZXB0IFwiXCIgYXMgYSB3YXkgb2YgZXhwbGljaXRseVxuICAgICAgICAgICAgICAgIC8vIHNldHRpbmcgYSBwYXJhbWV0ZXIgdG8gYmUgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBfZGVmYXVsdHNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9kZWZhdWx0c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiXFxcIlxcXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBfZGVmYXVsdHNba2V5XSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9kZWZhdWx0cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhbiBvcHRpbWl6ZWQgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIG9iamVjdHMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgZXF1YWxcbiAgICAgKiBAcGFyYW0gbzEgVGhlIGZpcnN0IG9iamVjdCB0byBiZSBjb21wYXJlZFxuICAgICAqIEBwYXJhbSBvMiBUaGUgc2Vjb25kIG9iamVjdCB0byBiZSBjb21wYXJlZFxuICAgICAqL1xuICAgIHN0YXRpYyBlcXVhbHMobzE6IGFueSwgbzI6YW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKG8xLCBvMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYW4gaW50ZWdlciB2YWx1ZSB1c2luZyBgcGFyc2VJbnRgIHdpdGggcmFkaXggPSAxMC5cbiAgICAgKiBJZiB0aGUgc3RyaW5nIGNhbm5vdCBiZSBjb252ZXJ0ZWQgb3IgY29udGFpbnMgYWRkaXRpb25hbCBjaGFyYWN0ZXJzIHRoZW4gdGhlXG4gICAgICogcGFzc2VkIGRlZmF1bHQgdmFsdWUgaXMgcmV0dXJuZWRcbiAgICAgKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBfZGVmYXVsdCBUaGUgZGVmYXVsdCB2YWx1ZSB0byB1c2UgaWYgdGhlIHN0cmluZyBjYW5ub3QgYmUgY29udmVydGVkXG4gICAgICovXG4gICAgc3RhdGljIHRvSW50KHN0cjogc3RyaW5nLCBfZGVmYXVsdDogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHN0ciwgMTApO1xuICAgICAgICBpZiAoaXNOYU4odmFsdWUpIHx8ICh2YWx1ZSArIFwiXCIgIT09IHN0cikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gX2RlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGEgZmxvYXRpbmcgcG9pbnQgdmFsdWUgdXNpbmcgYHBhcnNlRmxvYXRgLlxuICAgICAqIElmIHRoZSBzdHJpbmcgY2Fubm90IGJlIGNvbnZlcnRlZCB0aGVuIHRoZSBwYXNzZWQgZGVmYXVsdCB2YWx1ZSBpcyByZXR1cm5lZFxuICAgICAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0XG4gICAgICogQHBhcmFtIF9kZWZhdWx0IFRoZSBkZWZhdWx0IHZhbHVlIHRvIHVzZSBpZiB0aGUgc3RyaW5nIGNhbm5vdCBiZSBjb252ZXJ0ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9OdW1iZXIoc3RyOiBzdHJpbmcsIF9kZWZhdWx0OiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VGbG9hdChzdHIpO1xuICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IF9kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIGBEYXRlYCB1c2luZyBgRGF0ZS5wYXJzZWAuXG4gICAgICogVGhlIGRhdGUgaXMgcmV0dXJuZWQgaW4gVVRDLiBJZiB0aGUgc3RyaW5nIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdGhlbiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZFxuICAgICAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0XG4gICAgICogQHJldHVybiBUaGUgY29udmVydGVkIGBEYXRlYCBpbiBVVEMgb3IgYHVuZGVmaW5lZGBcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9EYXRlKHN0cjogc3RyaW5nKTogRGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IG1zID0gRGF0ZS5wYXJzZShzdHIpO1xuICAgICAgICBpZiAoIW1zICYmIG1zICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShtcyArIG5ldyBEYXRlKG1zKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAwMDApOyAvLyBnZXQgZGF0ZSBpbiBVVENcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWUgY29tcG9uZW50IG9mIGEgYERhdGVgIGluIG1pbGxpc2Vjb25kc1xuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGVcbiAgICAgKiBAcmV0dXJuIFRoZSB0aW1lIGluIG1pbGxpc2Vjb25kc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRUaW1lKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgICAgICBpZiAoIWRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZGF0ZS5nZXRIb3VycygpICogNjAgKiA2MCArIGRhdGUuZ2V0TWludXRlcygpICogNjAgKyBkYXRlLmdldFNlY29uZHMoKSkgKiAxMDAwICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgZGF0ZSBhbmQgdGltZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgbm93KCk6IERhdGUge1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIGBEYXRlYCB0byBhIFNpbmVxdWEgc3lzdGVtIGRhdGUgc3RyaW5nIChgZGQtbW0teXl5eVsgaGg6bW06c3NdYClcbiAgICAgKiBJZiB0aGUgdGltZSBjb21wb25lbnQgb2YgdGhlIGRhdGUgaXMgMCB0aGVuIG9ubHkgdGhlIGRhdGUgcG9ydGlvbiBvZiB0aGUgc3RyaW5nIGlzIGluY2x1ZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0ZSBUaGUgYERhdGVgIHRvIGNvbnZlcnRcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9TeXNEYXRlU3RyKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIWRhdGUpICB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtID0gbW9tZW50KGRhdGUpO1xuICAgICAgICBpZiAoVXRpbHMuZ2V0VGltZShkYXRlKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG0uZm9ybWF0KFwiWVlZWS1NTS1ERFwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIFNpbmVxdWEgc3lzdGVtIGRhdGUgc3RyaW5nIChgZGQtbW0teXl5eVsgaGg6bW06c3NdYCkgdG8gYSBgRGF0ZWBcbiAgICAgKiBJZiB0aGUgc3RyaW5nIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdGhlbiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZFxuICAgICAqXG4gICAgICogQHBhcmFtIGRhdGUgVGhlIFNpbmVxdWEgc3lzdGVtIGRhdGUgc3RyaW5nIHRvIGNvbnZlcnRcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVN5c0RhdGVTdHIodmFsdWU6IHN0cmluZyk6IERhdGUgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBtID0gbW9tZW50KHZhbHVlLCBcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgIGlmIChtLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG0udG9EYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyByeFN5c0RhdGVUaW1lID0gL15cXGR7NH0tKD86MFsxLTldfDFbMDEyXSktKD86MFsxLTldfFsxMl1bMC05XXwzWzAxXSkoPzogKD86WzAxXVxcZHwyWzAtM10pOlswLTVdXFxkOlswLTVdXFxkKT8kLztcbiAgICAvLyBwcml2YXRlIHN0YXRpYyByeElTTzg2MDEgPSAvXihbXFwrLV0/XFxkezR9KD8hXFxkezJ9XFxiKSkoKC0/KSgoMFsxLTldfDFbMC0yXSkoXFwzKFsxMl1cXGR8MFsxLTldfDNbMDFdKSk/fFcoWzAtNF1cXGR8NVswLTJdKSgtP1sxLTddKT98KDAwWzEtOV18MFsxLTldXFxkfFsxMl1cXGR7Mn18MyhbMC01XVxcZHw2WzEtNl0pKSkoW1RcXHNdKCgoWzAxXVxcZHwyWzAtM10pKCg6PylbMC01XVxcZCk/fDI0XFw6PzAwKShbXFwuLF1cXGQrKD8hOikpPyk/KFxcMTdbMC01XVxcZChbXFwuLF1cXGQrKT8pPyhbelpdfChbXFwrLV0pKFswMV1cXGR8MlswLTNdKTo/KFswLTVdXFxkKT8pPyk/KT8kLztcbiAgICAvLyBJU084NjAxIGNvbWJpbmVkIGRhdGUgYW5kIHRpbWVcbiAgICBwcml2YXRlIHN0YXRpYyByeElTTzg2MDFEYXRlVGltZSA9IC9eKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSlUKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSg/OlxcLlxcZCopKSg/Olp8KFxcK3wtKShbXFxkfDpdKikpPyQvO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNTeXNEYXRlVGltZShzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gVXRpbHMucnhTeXNEYXRlVGltZS50ZXN0KHN0cik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNJU084NjAxRGF0ZVRpbWUoc3RyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLnJ4SVNPODYwMURhdGVUaW1lLnRlc3Qoc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEphdmFzY3JpcHQgdmFsdWUgdG8gYSBKU09OIHN0cmluZyB1c2luZyBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAqIERhdGUgb2JqZWN0cyBhcmUgY29udmVydGVkIHRvIFNpbmVxdWEgc3lzdGVtIHN0cmluZ3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgZm9yIHRoZSBjb252ZXJzaW9uLiBUaGUgZGVmYXVsdCBpcyBge3ByZXR0eTogZmFsc2V9YFxuICAgICAqL1xuICAgIHN0YXRpYyB0b0pzb24odmFsdWU6IGFueSwgb3B0aW9uczogVG9Kc29uT3B0aW9ucyA9IHtwcmV0dHk6IGZhbHNlfSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogYW55ICB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAmJiBVdGlscy5pc0RhdGUodGhpc1trZXldKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHIgPSBVdGlscy50b1N5c0RhdGVTdHIodGhpc1trZXldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSwgb3B0aW9ucy5wcmV0dHkgPyAyIDogMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYW4gb2JqZWN0IHVzaW5nIGBKU09OLnBhcnNlYC5cbiAgICAgKiBTdHJpbmdzIHRoYXQgYXJlIGVpdGhlciBpbiBTaW5lcXVhIHN5c3RlbSBkYXRlIG9yIElTTzg2MDEgZm9ybWF0IGFyZSBjb252ZXJ0ZWQgdG9cbiAgICAgKiBgRGF0ZWAgb2JqZWN0cyBpZiB0aGUgYHJldml2ZURhdGVzYCBvcHRpb24gaXMgc3BlY2lmaWVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciB0aGUgY29udmVyc2lvbi4gVGhlIGRlZmF1bHQgaXMgYHtyZXZpdmVEYXRlczogZmFsc2V9YFxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tSnNvbihzdHI6IHN0cmluZywgb3B0aW9uczogRnJvbUpzb25PcHRpb25zID0ge3Jldml2ZURhdGVzOiBmYWxzZX0pOiBhbnkge1xuICAgICAgICBpZiAoIXN0ciB8fCB0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0ciwgb3B0aW9ucy5yZXZpdmVEYXRlcyA/XG4gICAgICAgICAgICAgICAgKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucmV2aXZlRGF0ZXMgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTeXNEYXRlVGltZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gbW9tZW50KHZhbHVlLCBcIllZWVktTU0tREQgSEg6bW06c3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzSVNPODYwMURhdGVUaW1lKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0uaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtLnRvRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVdGlscy5mcm9tSnNvbiBleGNlcHRpb246XCIsIGV4Y2VwdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgYEZpZWxkVmFsdWVgIHZhbHVlIHRvIGEgc3RyaW5nIGNvbXBhdGlibGUgd2l0aCBTaW5lcXVhJ3MgU1FMIHN5bnRheC5cbiAgICAgKiBTdHJpbmcgYW5kIGBEYXRlYCB2YWx1ZXMgYXJlIGVuY2xvc2VkIGluIHNpbmdsZSBxdW90ZXMgaWYgdGhlIHF1b3RlIHBhcmFtZXRlciBpcyBgdHJ1ZWBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBxdW90ZSBJZiBzZXQsIHRoZSByZXR1cm5lZCBzdHJpbmcgd2lsbCBiZSBlbmNsb3NlZCBpbiBzaW5nbGUgcXVvdGVzIGZvciBzdHJpbmcgYW5kIGBEYXRlYCB2YWx1ZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9TcWxWYWx1ZSh2YWx1ZTogRmllbGRWYWx1ZSwgcXVvdGU/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICsgXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHF1b3RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJ1wiICsgVXRpbHMudG9TeXNEYXRlU3RyKHZhbHVlKSArIFwiJ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnRvU3lzRGF0ZVN0cih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgcmV0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmV0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goXCIsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goXCJudWxsXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc1N0cmluZyh2KSkge1xuICAgICAgICAgICAgICAgICAgICByZXQucHVzaCh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKHYuZGlzcGxheSB8fCB2LnZhbHVlIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0LnNwbGljZSgwLCAwLCBcIltcIik7XG4gICAgICAgICAgICByZXQucHVzaChcIl1cIik7XG4gICAgICAgICAgICByZXR1cm4gcmV0LmpvaW4oXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHF1b3RlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCInXCIgKyB2YWx1ZSArIFwiJ1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYW4gYSBzdHJpbmcgc28gaXQgaXMgY29tcGF0aWJsZSB3aXRoIHZhbHVlcyBzdG9yZWQgaW4gYSBTaW5lcXVhIHRyZWUgdHlwZS1jb2x1bW4uXG4gICAgICogVGhlIGZvbGxvd2luZyBvcGVyYXRpb25zIGFyZSBwZXJmb3JtZWQ6XG4gICAgICogKiBlbnN1cmUgdGhhdCB0aGUgc3RyaW5nIHN0YXJ0cyBhbmQgZW5kcyB3aXRoIGZvcndhcmQgc2xhc2hlc1xuICAgICAqICogcmVwbGFjZSB0YWIgY2hhcmFjdGVycyB3aXRoIHNwYWNlc1xuICAgICAqICogcmVwbGFjZSBzZW1pLWNvbG9ucyB3aXRoIGNvbW1hc1xuICAgICAqICogcmVwbGFjZSBiYWNrIHNsYXNoZXMgd2l0aCBmb3J3YXJkIHNsYXNoZXNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzIFRoZSBzdHJpbmcgdG8gY2xlYW5cbiAgICAgKi9cbiAgICBzdGF0aWMgdHJlZUNsZWFuKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChVdGlscy5pc0VtcHR5KHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVXRpbHMuYWRkVXJsKFwiL1wiLCBVdGlscy5yZXBsYWNlKFV0aWxzLnJlcGxhY2UoVXRpbHMucmVwbGFjZShzLCBcIlxcdFwiLCBcIiBcIiksIFwiO1wiLCBcIixcIiksIFwiXFxcXFwiLCBcIi9cIiksIFwiL1wiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGZpcnN0IG5vZGUgb2YgYSBTaW5lcXVhIHRyZWUgdmFsdWUgZW5jbG9zZWQgaW4gZm9yd2FyZCBzbGFzaGVzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcyBBIFNpbmVxdWEgdHJlZSB2YWx1ZVxuICAgICAqL1xuICAgIHN0YXRpYyB0cmVlRmlyc3Qoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBVdGlscy5zcGxpdChzLCBcIi9cIik7XG4gICAgICAgIHJldHVybiBwYXJ0cy5sZW5ndGggPT09IDAgPyBcIlwiIDogYC8ke3BhcnRzWzBdfS9gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgZmlyc3Qgbm9kZSBvZiBhIFNpbmVxdWEgdHJlZSB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHMgQSBTaW5lcXVhIHRyZWUgdmFsdWVcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJlZUZpcnN0Tm9kZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IFV0aWxzLnNwbGl0KHMsIFwiL1wiKTtcbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbGFzdCBub2RlIG9mIGEgU2luZXF1YSB0cmVlIHZhbHVlIGVuY2xvc2VkIGluIGZvcndhcmQgc2xhc2hlc1xuICAgICAqXG4gICAgICogQHBhcmFtIHMgQSBTaW5lcXVhIHRyZWUgdmFsdWVcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJlZUxhc3Qoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBVdGlscy5zcGxpdChzLCBcIi9cIik7XG4gICAgICAgIHJldHVybiBwYXJ0cy5sZW5ndGggPT09IDAgPyBcIlwiIDogYC8ke3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdfS9gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbGFzdCBub2RlIG9mIGEgU2luZXF1YSB0cmVlIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcyBBIFNpbmVxdWEgdHJlZSB2YWx1ZVxuICAgICAqL1xuICAgIHN0YXRpYyB0cmVlTGFzdE5vZGUoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBVdGlscy5zcGxpdChzLCBcIi9cIik7XG4gICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG5vZGVzIG1ha2luZyB1cCBhIFNpbmVxdWEgdHJlZSB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHMgQSBTaW5lcXVhIHRyZWUgdmFsdWVcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJlZU5vZGVzKHM6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLnNwbGl0KHMsIFwiL1wiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBTaW5lcXVhIHRyZWUgdmFsdWUsIHJlbW92aW5nIGVuY2xvc2luZyBmb3J3YXJkIHNsYXNoIGNoYXJhY3RlcnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBzIEEgU2luZXF1YSB0cmVlIHZhbHVlXG4gICAgICovXG4gICAgc3RhdGljIHRyZWVEaXNwbGF5KHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghIXMpIHtcbiAgICAgICAgICAgIGlmIChzWzBdID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgIHMgPSBzLnN1YnN0cigxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzW3MubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgcyA9IHMuc3Vic3RyKDAsIHMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBub2RlIGNvdW50IG9mIGEgU2luZXF1YSB0cmVlIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcyBBIFNpbmVxdWEgdHJlZSB2YWx1ZVxuICAgICAqL1xuICAgIHN0YXRpYyB0cmVlQ291bnQoczogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgY291bnQgPSBVdGlscy5jb3VudChzLCBcIi9cIik7XG4gICAgICAgIHJldHVybiBjb3VudCA+IDAgPyBjb3VudCAtIDEgOiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYXZlcnNlcyBhIHRyZWUgc3RydWN0dXJlLCBleGVjdXRpbmcgYSBjYWxsYmFjayBmdW5jdGlvbiBhdCBldmVyeSBub2RlXG4gICAgICogQHBhcmFtIG5vZGVzIHRoZSBub2RlcyB0byB0cmF2ZXJzZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB0aGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYXZlcnNlPFQgZXh0ZW5kcyBUcmVlTm9kZT4obm9kZXM6IFRbXSwgY2FsbGJhY2s6IChsaW5lYWdlOiBUW10gfCB1bmRlZmluZWQpID0+IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFub2RlcyB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGluZWFnZTogVFtdID0gW107XG4gICAgICAgIGNvbnN0IHN0YWNrOiAoVCB8IHVuZGVmaW5lZClbXSA9IFtdO1xuICAgICAgICBsZXQgX2kgPSBub2Rlcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChfaS0tKSB7XG4gICAgICAgICAgICBzdGFjay5wdXNoKG5vZGVzW19pXSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgbGluZWFnZS5wb3AoKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGluZWFnZS5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayhsaW5lYWdlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlLml0ZW1zICYmIG5vZGUuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBfaSA9IG5vZGUuaXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoX2ktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChub2RlLml0ZW1zW19pXSBhcyBUKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgcHNldWRvLUdVSUQgdmFsdWUgdXNpbmcgYE1hdGgucmFuZG9tYFxuICAgICAqXG4gICAgICogQHBhcmFtIHdpdGhIeXBoZW5zIElmIHNldCwgdGhlIHJldHVybmVkIEdVSUQgaW5jbHVkZXMgaHlwaGVuIHNlcGFyYXRvcnNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ3VpZCh3aXRoSHlwaGVucyA9IHRydWUpOiBzdHJpbmcge1xuICAgICAgICBsZXQgZCA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGd1aWQgPSAod2l0aEh5cGhlbnMgP1xuICAgICAgICAgICAgJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcgOiAneHh4eHh4eHh4eHh4NHh4eHl4eHh4eHh4eHh4eHh4eHgnKS5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDtcbiAgICAgICAgICAgICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBndWlkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBgdW5kZWZpbmVkYFxuICAgICAqL1xuICAgIHN0YXRpYyBpc1VuZGVmaW5lZCh2YWx1ZSk6IHZhbHVlIGlzIHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBgb2JqZWN0YFxuICAgICAqL1xuICAgIHN0YXRpYyBpc09iamVjdCh2YWx1ZSk6IHZhbHVlIGlzIGFueSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGBzdHJpbmdgXG4gICAgICovXG4gICAgc3RhdGljIGlzU3RyaW5nKHZhbHVlKTogdmFsdWUgaXMgc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGEgYG51bWJlcmBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpOiB2YWx1ZSBpcyBudW1iZXIge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBgYm9vbGVhbmBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNCb29sZWFuKHZhbHVlKTogdmFsdWUgaXMgYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBgRGF0ZWBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNEYXRlKHZhbHVlKTogdmFsdWUgaXMgRGF0ZSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBEYXRlXSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGEgc2NhbGFyIChgbnVtYmVyYCwgYGJvb2xlYW5gIG9yIGBEYXRlYClcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNTY2FsYXIodmFsdWUpOiB2YWx1ZSBpcyBudW1iZXIgfCBib29sZWFuIHwgRGF0ZSB7XG4gICAgICAgIHJldHVybiBVdGlscy5pc051bWJlcih2YWx1ZSkgfHwgVXRpbHMuaXNCb29sZWFuKHZhbHVlKSB8fCBVdGlscy5pc0RhdGUodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBgQXJyYXlgXG4gICAgICovXG4gICAgc3RhdGljIGlzQXJyYXkodmFsdWUpOiB2YWx1ZSBpcyBBcnJheTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBpdGVyYWJsZVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0l0ZXJhYmxlKHZhbHVlKTogdmFsdWUgaXMgQXJyYXk8YW55PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGEgYE1hcGBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNNYXAodmFsdWUpOiB2YWx1ZSBpcyBNYXA8YW55LCBhbnk+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE1hcF0nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGBGdW5jdGlvbmBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGdW5jdGlvbih2YWx1ZSk6IHZhbHVlIGlzIEZ1bmN0aW9uIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBgUmVnRXhwYFxuICAgICAqL1xuICAgIHN0YXRpYyBpc1JlZ0V4cCh2YWx1ZSk6IHZhbHVlIGlzIFJlZ0V4cCB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBgV2luZG93YFxuICAgICAqL1xuICAgIHN0YXRpYyBpc1dpbmRvdyh2YWx1ZSk6IHZhbHVlIGlzIFdpbmRvdyB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS53aW5kb3cgPT09IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGBGaWxlYFxuICAgICAqL1xuICAgIHN0YXRpYyBpc0ZpbGUodmFsdWU6IGFueSk6IHZhbHVlIGlzIEZpbGUge1xuICAgICAgICByZXR1cm4gVXRpbHMuaXNPYmplY3QodmFsdWUpICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBGaWxlXVwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGBGb3JtRGF0YWBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNGb3JtRGF0YSh2YWx1ZTogYW55KTogdmFsdWUgaXMgRm9ybURhdGEge1xuICAgICAgICByZXR1cm4gVXRpbHMuaXNPYmplY3QodmFsdWUpICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBGb3JtRGF0YV1cIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYSBgQmxvYmBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNCbG9iKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBCbG9iIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmlzT2JqZWN0KHZhbHVlKSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgQmxvYl1cIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gYEFycmF5QnVmZmVyYFxuICAgICAqL1xuICAgIHN0YXRpYyBpc0FycmF5QnVmZmVyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBBcnJheUJ1ZmZlciB7XG4gICAgICAgIHJldHVybiBVdGlscy5pc09iamVjdCh2YWx1ZSkgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzQXJyYXlMaWtlKG9iaik6IGJvb2xlYW4ge1xuICAgICAgICAvLyBgbnVsbGAsIGB1bmRlZmluZWRgIGFuZCBgd2luZG93YCBhcmUgbm90IGFycmF5LWxpa2VcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsIHx8IFV0aWxzLmlzV2luZG93KG9iaikpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBhcnJheXMsIHN0cmluZ3MgYW5kIGpRdWVyeS9qcUxpdGUgb2JqZWN0cyBhcmUgYXJyYXkgbGlrZVxuICAgICAgICAvLyAqIGpxTGl0ZSBpcyBlaXRoZXIgdGhlIGpRdWVyeSBvciBqcUxpdGUgY29uc3RydWN0b3IgZnVuY3Rpb25cbiAgICAgICAgLy8gKiB3ZSBoYXZlIHRvIGNoZWNrIHRoZSBleGlzdGFuY2Ugb2YganFMaXRlIGZpcnN0IGFzIHRoaXMgbWV0aG9kIGlzIGNhbGxlZFxuICAgICAgICAvLyAgIHZpYSB0aGUgZm9yRWFjaCBtZXRob2Qgd2hlbiBjb25zdHJ1Y3RpbmcgdGhlIGpxTGl0ZSBvYmplY3QgaW4gdGhlIGZpcnN0IHBsYWNlXG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KG9iaikgfHwgVXRpbHMuaXNTdHJpbmcob2JqKSAvKnx8IChqcUxpdGUgJiYgb2JqIGluc3RhbmNlb2YganFMaXRlKSovKSByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAvLyBTdXBwb3J0OiBpT1MgOC4yIChub3QgcmVwcm9kdWNpYmxlIGluIHNpbXVsYXRvcilcbiAgICAgICAgLy8gXCJsZW5ndGhcIiBpbiBvYmogdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMTE1MDgpXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IFwibGVuZ3RoXCIgaW4gT2JqZWN0KG9iaikgJiYgb2JqLmxlbmd0aDtcblxuICAgICAgICAvLyBOb2RlTGlzdCBvYmplY3RzICh3aXRoIGBpdGVtYCBtZXRob2QpIGFuZFxuICAgICAgICAvLyBvdGhlciBvYmplY3RzIHdpdGggc3VpdGFibGUgbGVuZ3RoIGNoYXJhY3RlcmlzdGljcyBhcmUgYXJyYXktbGlrZVxuICAgICAgICByZXR1cm4gVXRpbHMuaXNOdW1iZXIobGVuZ3RoKSAmJlxuICAgICAgICAgICAgKGxlbmd0aCA+PSAwICYmIChsZW5ndGggLSAxKSBpbiBvYmogfHwgdHlwZW9mIG9iai5pdGVtID09PSAnZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHRoZSBwYXNzZWQgdmFsdWUgaXMgYW4gYG9iamVjdGAgd2l0aG91dCBhIHByb3RvdHlwZVxuICAgICAqL1xuICAgIHN0YXRpYyBpc0JsYW5rT2JqZWN0KHZhbHVlKTogdmFsdWUgaXMgb2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIU9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgVFlQRURfQVJSQVlfUkVHRVhQID0gL15cXFtvYmplY3QgKD86VWludDh8VWludDhDbGFtcGVkfFVpbnQxNnxVaW50MzJ8SW50OHxJbnQxNnxJbnQzMnxGbG9hdDMyfEZsb2F0NjQpQXJyYXlcXF0kLztcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgcGFzc2VkIHZhbHVlIGlzIGEgYFR5cGVkQXJyYXlgXG4gICAgICovXG4gICAgc3RhdGljIGlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgJiYgVXRpbHMuaXNOdW1iZXIodmFsdWUubGVuZ3RoKSAmJiBVdGlscy5UWVBFRF9BUlJBWV9SRUdFWFAudGVzdChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBwcm9taXNlIHRoYXQgaXMgYSByZXNvbHZlZCBhZnRlciBhIHNwZWNpZmllZCBhbW91bnQgb2YgdGltZVxuICAgICAqXG4gICAgICogQHBhcmFtIG1zIFRoZSB0aW1lIHRvIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICAgICAqL1xuICAgIHN0YXRpYyBkZWxheShtczogbnVtYmVyID0gMCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0sIG1zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gX2RlZmF1bHRcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNUcnVlKFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgX2RlZmF1bHQ/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICBjYXNlIFwidHJ1ZVwiOlxuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICAgIGNhc2UgXCJvblwiOlxuICAgICAgICAgICAgY2FzZSBcInllc1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgY2FzZSBcIlwiOlxuICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhX2RlZmF1bHQ7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbXBhcmVzIHR3byBzdHJpbmdzIHVzaW5nIHRoZSBjdXJyZW50IGxvY2FsZS4gVGhlIHJldHVybiB2YWx1ZSBpcyBuZWdhdGl2ZVxuICAgICAqIGlmIGBhYCBjb21lcyBiZWZvcmUgYGJgIGFuZCBwb3NpdGl2ZSBpZiBgYWAgY29tZXMgYWZ0ZXIgYGJgLiBJZiB0aGUgdmFsdWVzXG4gICAgICogYXJlIGVxdWFsIHRoZW4gYDBgIGlzIHJldHVybmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3Qgc3RyaW5nXG4gICAgICogQHBhcmFtIGIgVGhlIHNlY29uZCBzdHJpbmdcbiAgICAgKiBAcGFyYW0gaWdub3JlQ2FzZSBJZiBzZXQsIGRvIGEgY2FzZS1pbnNlbnNpdGl2ZSBjb21wYXJpc29uXG4gICAgICovXG4gICAgc3RhdGljIGNvbXBhcmUoYTogc3RyaW5nLCBiOiBzdHJpbmcsIGlnbm9yZUNhc2U6IGJvb2xlYW4gPSB0cnVlKTogbnVtYmVyIHtcbiAgICAgICAgYSA9IGEgfHwgJyc7XG4gICAgICAgIGIgPSBiIHx8ICcnO1xuICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgYSA9IGEudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGIgPSBiLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIHR3byBzdHJpbmdzIGFyZSBlcXVhbCwgcmVzcGVjdGluZyBjYXNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3Qgc3RyaW5nXG4gICAgICogQHBhcmFtIGIgVGhlIHNlY29uZCBzdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZXEoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLmNvbXBhcmUoYSwgYiwgZmFsc2UpID09PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdHdvIHN0cmluZ3MgYXJlIGVxdWFsLCBpZ25vcmluZyBjYXNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3Qgc3RyaW5nXG4gICAgICogQHBhcmFtIGIgVGhlIHNlY29uZCBzdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZXFOQyhhOiBzdHJpbmcsIGI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gVXRpbHMuY29tcGFyZShhLCBiLCB0cnVlKSA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgbnVtYmVyIG9mIHN0cmluZ3MgYXJlIGVxdWFsLCBpZ25vcmluZyBjYXNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSBUaGUgZmlyc3Qgc3RyaW5nXG4gICAgICogQHBhcmFtIGIgUmVtYWluaW5nIHN0cmluZ3NcbiAgICAgKi9cbiAgICBzdGF0aWMgZXFOQ04oYTogc3RyaW5nLCAuLi5iOiBzdHJpbmdbXSkge1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHMgb2YgYikge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmVxTkMoYSwgcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBsZW5ndGggb2YgYSBzdHJpbmcuIElmIHRoZSBzdHJpbmcgaXMgZW1wdHkgKGBudWxsYCBvciBgdW5kZWZpbmVkYClcbiAgICAgKiBAcGFyYW0gcyBBIHN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBsZW4oczogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiAocyB8fCAnJykubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBzdHJpbmcgc3RhcnRzIHdpdGggYW5vdGhlclxuICAgICAqXG4gICAgICogQHBhcmFtIGEgVGhlIHN0cmluZyB0byB0ZXN0XG4gICAgICogQHBhcmFtIGIgVGhlIHByZWZpeFxuICAgICAqIEBwYXJhbSBpZ25vcmVDYXNlIElmIGB0cnVlYCB0aGVuIGlnbm9yZSBjYXNlXG4gICAgICovXG4gICAgc3RhdGljIHN0YXJ0c1dpdGgoYTogc3RyaW5nLCBiOiBzdHJpbmcsIGlnbm9yZUNhc2U6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XG4gICAgICAgIGEgPSBhIHx8ICcnO1xuICAgICAgICBiID0gYiB8fCAnJztcbiAgICAgICAgaWYgKGlnbm9yZUNhc2UpIHtcbiAgICAgICAgICAgIGEgPSBhLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBiID0gYi50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhLnN0YXJ0c1dpdGgoYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIHN0cmluZyBlbmRzIHdpdGggYW5vdGhlclxuICAgICAqXG4gICAgICogQHBhcmFtIGEgVGhlIHN0cmluZyB0byB0ZXN0XG4gICAgICogQHBhcmFtIGIgVGhlIHBvc3RmaXhcbiAgICAgKiBAcGFyYW0gaWdub3JlQ2FzZSBJZiBgdHJ1ZWAgdGhlbiBpZ25vcmUgY2FzZVxuICAgICAqL1xuICAgIHN0YXRpYyBlbmRzV2l0aChhOiBzdHJpbmcsIGI6IHN0cmluZywgaWdub3JlQ2FzZTogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcbiAgICAgICAgYSA9IGEgfHwgJyc7XG4gICAgICAgIGIgPSBiIHx8ICcnO1xuICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgYSA9IGEudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGIgPSBiLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEuZW5kc1dpdGgoYik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIHN0cmluZyBpcyBhIHN1YnN0cmluZyBvZiBhbm90aGVyXG4gICAgICogQHBhcmFtIGEgVGhlIHN0cmluZyB0byB0ZXN0XG4gICAgICogQHBhcmFtIGIgVGhlIHN1YnN0cmluZ1xuICAgICAqIEBwYXJhbSBpZ25vcmVDYXNlIElmIGB0cnVlYCB0aGVuIGlnbm9yZSBjYXNlXG4gICAgICovXG4gICAgc3RhdGljIGluY2x1ZGVzKGE6IHN0cmluZywgYjogc3RyaW5nLCBpZ25vcmVDYXNlOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xuICAgICAgICBhID0gYSB8fCAnJztcbiAgICAgICAgYiA9IGIgfHwgJyc7XG4gICAgICAgIGlmIChpZ25vcmVDYXNlKSB7XG4gICAgICAgICAgICBhID0gYS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgYiA9IGIudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5pbmNsdWRlcyhiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIHVwcGVyIGNhc2UgdmFsdWUgb2YgYSBzdHJpbmcgdXNpbmcgdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICovXG4gICAgc3RhdGljIHRvVXBwZXJDYXNlKHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyB3aXRoIHRoZSBmaXJzdCBjaGFyYWN0ZXIgY29udmVydGVkIHRvIHVwcGVyIGNhc2UgdXNpbmcgdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICovXG4gICAgc3RhdGljIHRvVXBwZXJGaXJzdChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcmV0dXJuIHNbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIHMuc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbG93ZXIgY2FzZSB2YWx1ZSBvZiBhIHN0cmluZyB1c2luZyB0aGUgY3VycmVudCBsb2NhbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9Mb3dlckNhc2Uoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHdpdGggdGhlIGZpcnN0IGNoYXJhY3RlciBjb252ZXJ0ZWQgdG8gbG93ZXIgY2FzZSB1c2luZyB0aGUgY3VycmVudCBsb2NhbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9Mb3dlckZpcnN0KHM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gc1swXS50b0xvY2FsZUxvd2VyQ2FzZSgpICsgcy5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHdoZXJlIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgZWFjaCBzcGFjZSBzZXBhcmF0ZWQgd29yZCBpcyBjb252ZXJ0ZWQgdG8gdXBwZXIgY2FzZS5cbiAgICAgKiBIb3dldmVyLCBpZiBhIHdvcmQgY29udGFpbnMgYSBmdWxsIHN0b3AgY2hhcmFjdGVyIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaXMgbGVmdCB1bmNoYW5nZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9TdGFydENhc2UodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHdvcmRzID0gdGV4dC5zcGxpdCgvW1xcc10rLyk7XG4gICAgICAgICAgICByZXR1cm4gd29yZHMubWFwKHZhbHVlID0+ICF2YWx1ZS5pbmNsdWRlcyhcIi5cIikgPyBVdGlscy50b1VwcGVyRmlyc3QodmFsdWUpIDogdmFsdWUpLmpvaW4oXCIgXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyB3aGVyZSBhbnkgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGFyZSByZW1vdmVkXG4gICAgICovXG4gICAgc3RhdGljIHRyaW0oczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgd2hlcmUgYW55IGxlYWRpbmcgd2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGFyZSByZW1vdmVkXG4gICAgICovXG4gICAgc3RhdGljIHRyaW1TdGFydChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJpbVN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHdoZXJlIGFueSB0cmFpbGluZyB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgYXJlIHJlbW92ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJpbUVuZChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJpbUVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyB0cnVuY2F0ZWQgdG8gYSBtYXhpbXVtIGxlbmd0aC4gSWYgdGhlIGxlbmd0aCBvZiB0aGUgc3RyaW5nIGlzIGdyZWF0ZXIgdGhhbiBgbWF4TGVuZ3RoYFxuICAgICAqIHRoZW4gaXQgaXMgdHJ1bmNhdGVkIHRvIGBtYXhMZW5ndGggYW5kIGEgYHN1ZmZpeGAgYXBwZW5kZWQuIE90aGVyd2lzZSB0aGUgc3RyaW5nIGlzIHJldHVybmVkIHVuY2hhbmdlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHMgVGhlIHN0cmluZyB0byB0cnVuY2F0ZVxuICAgICAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIG1heGltdW0gbGVuZ3RoXG4gICAgICogQHBhcmFtIHN1ZmZpeCBUaGUgdmFsdWUgdG8gYXBwZW5kIGlmIHRoZSBzdHJpbmcgaXMgdHJ1bmNhdGVkLiBUaGUgZGVmYXVsdCBpcyBgLi4uYFxuICAgICAqL1xuICAgIHN0YXRpYyB0cnVuY2F0ZShzOiBzdHJpbmcsIG1heExlbmd0aDogbnVtYmVyLCBzdWZmaXg/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHN1ZmZpeCA9IHN1ZmZpeCB8fCBcIi4uLlwiO1xuICAgICAgICBpZiAocy5sZW5ndGggPD0gbWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcy5zdWJzdHJpbmcoMCwgbWF4TGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgKyBzdWZmaXg7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVnRXhFc2NhcGVSZWdFeCA9IC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2c7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgd2hlcmUgYW55IHJlZ3VsYXIgZXhwcmVzaW9uIG9wZXJhdG9ycyBhcmUgZXNjYXBlZFxuICAgICAqL1xuICAgIHN0YXRpYyByZWdFeEVzY2FwZShzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoVXRpbHMucmVnRXhFc2NhcGVSZWdFeCwgXCJcXFxcJCZcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgcGF0dGVybnMgaW4gYSBzdHJpbmcgd2l0aCBhIHJlcGxhY2VtZW50IHN0cmluZy4gVGhlIHBhdHRlcm4gY2FuIGVpdGhlciBhIHN0cmluZ1xuICAgICAqIG9yIGEgYFJlZ0V4cGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcyBUaGUgc3RyaW5nIGluIHdoaWNoIHRvIHNlYXJjaCBmb3IgYSBwYXR0ZXJuXG4gICAgICogQHBhcmFtIHBhdHRlcm4gVGhlIHBhdHRlcm5cbiAgICAgKiBAcGFyYW0gcmVwbGFjZW1lbnQgVGhlIHJlcGxhY2VtZW50IHN0cmluZyB0byByZXBsYWNlIGFueSBvY2N1cnJlbmNlcyBvZiB0aGUgcGF0dGVybiBpbiB0aGUgc3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIHJlcGxhY2Uoczogc3RyaW5nLCBwYXR0ZXJuOiBzdHJpbmcgfCBSZWdFeHAsIHJlcGxhY2VtZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXMgfHwgIXBhdHRlcm4pIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc1JlZ0V4cChwYXR0ZXJuKSkge1xuICAgICAgICAgICAgcmV0dXJuIHMucmVwbGFjZShwYXR0ZXJuLCByZXBsYWNlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcy5yZXBsYWNlKG5ldyBSZWdFeHAoVXRpbHMucmVnRXhFc2NhcGUocGF0dGVybiksIFwiZ1wiKSwgcmVwbGFjZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BsaXQgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBzdWJzdHJpbmdzIHVzaW5nIHRoZSBwYXNzZWQgc2VwYXJhdG9yc1xuICAgICAqXG4gICAgICogQHBhcmFtIHMgVGhlIHN0cmluZyB0byBzcGxpdFxuICAgICAqIEBwYXJhbSBzZXBhcmF0b3JzIE9uZSBvciBtb3JlIHNlcGFyYXRvcnNcbiAgICAgKiBAcGFyYW0gdHJpbSBJZiBgdHJ1ZWAgdHJpbSBhbnkgbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzIGZyb20gdGhlIHN1YnN0cmluZ3NcbiAgICAgKiBAcGFyYW0gcmVtb3ZlRW1wdHkgSWYgYHRydWVgIGV4Y2x1ZGUgYW55IGVtcHR5IHN0cmluZ3MgZnJvbSB0aGUgYXJyYXkgb2Ygc3Vic3RyaW5nc1xuICAgICAqL1xuICAgIHN0YXRpYyBzcGxpdChzOiBzdHJpbmcsIHNlcGFyYXRvcnM6IHN0cmluZyB8IHN0cmluZ1tdLCB0cmltID0gdHJ1ZSwgcmVtb3ZlRW1wdHkgPSB0cnVlKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlcGFyYXRvcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBbc107XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNwbGl0OiBzdHJpbmdbXTtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXBhcmF0b3JzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBzcGxpdCA9IHMuc3BsaXQoc2VwYXJhdG9ycyk7XG4gICAgICAgICAgICBpZiAodHJpbSkge1xuICAgICAgICAgICAgICAgIHNwbGl0ID0gc3BsaXQubWFwKHZhbHVlID0+IHZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcnhzID0gc2VwYXJhdG9ycy5tYXAoKHZhbHVlKSA9PiBVdGlscy5yZWdFeEVzY2FwZSh2YWx1ZSkpLmpvaW4oXCJ8XCIpO1xuICAgICAgICAgICAgaWYgKHRyaW0pIHtcbiAgICAgICAgICAgICAgICByeHMgPSBcIig/Ol5cXFxccyopfCg/OlxcXFxzKig/OlwiICsgcnhzICsgXCIpXFxcXHMqKXwoPzpcXFxccyokKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3BsaXQgPSBzLnNwbGl0KG5ldyBSZWdFeHAocnhzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5KSB7XG4gICAgICAgICAgICBzcGxpdCA9IHNwbGl0LmZpbHRlcigodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIVV0aWxzLmlzRW1wdHkodmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwbGl0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyBpbiBrZWJhYiBjYXNlIChgQ2F0RG9nID0+IGNhdC1kb2dgKVxuICAgICAqL1xuICAgIHN0YXRpYyB0b0tlYmFiQ2FzZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4ga2ViYWJDYXNlKHRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyBpbiBzbmFrZSBjYXNlIChgQ2F0RG9nID0+IGNhdF9kb2dgKVxuICAgICAqL1xuICAgIHN0YXRpYyB0b1NuYWtlQ2FzZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc25ha2VDYXNlKHRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyBpbiBjYW1lbCBjYXNlIChgQ2F0RG9nID0+IGNhdERvZ2ApXG4gICAgICovXG4gICAgc3RhdGljIHRvQ2FtZWxDYXNlKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBjYW1lbENhc2UodGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHdpdGggYW55IGRpYWNyaXRpY3MgcmVtb3ZlZFxuICAgICAqL1xuICAgIHN0YXRpYyByZW1vdmVBY2NlbnRzKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbW92ZURpYWNyaXRpY3ModGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIGluIG5vcm1hbGl6ZWQgZm9ybSB3aGljaCBjYW4gYmUgdXNlZCB0byBtYXRjaCBlbnRpdHkgdmFsdWVzLiBBIG5vcm1hbGl6ZWQgdmFsdWVcbiAgICAgKiBoYXMgYW55IGRpYWNyaXRpY3MgcmVtb3ZlZCBhbmQgaXMgY29udmVydGVkIHRvIHVwcGVyIGNhc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgbm9ybWFsaXplKHRleHQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVdGlscy5yZW1vdmVBY2NlbnRzKHRleHQpLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIHN0cmluZyBpcyB2YWxpZCBhcyBhIHNpbXBsZSB2YWx1ZSBmb3IgdGhlIFNpbmVxdWEgYWRtaW5pbmlzdHJhdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBpc1ZhbGlkU2ltcGxlTmFtZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIC9eW2EtekEtWl9dW2EtekEtWjAtOV9dKiQvLnRlc3QobmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGB0cnVlYCBpZiBhIHN0cmluZyBpcyB2YWxpZCBhcyBhIHNjb3BlZCAoYC5gIHNlcGFyYXRlZCkgc2ltcGxlIHZhbHVlIGZvciB0aGUgU2luZXF1YSBhZG1pbmluaXN0cmF0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGlzVmFsaWRTY29wZWRTaW1wbGVOYW1lKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gL15bYS16QS1aX10oW1xcLl0/W2EtekEtWjAtOV9dKykqJC8udGVzdChuYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgdmFsdWUgaXMgYG51bGxgLCBgdW5kZWZpbmVkYCBvciBgXCJcImBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNFbXB0eSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgb2YgYSBzdWJzdHJpbmcgaW4gYSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IFRoZSB0ZXh0IHRvIHRlc3RcbiAgICAgKiBAcGFyYW0gc3ViIFRoZSBzdWJzdHJpbmdcbiAgICAgKiBAcGFyYW0gaWdub3JlQ2FzZSBJZiBgdHJ1ZWAgZG9uJ3QgcmVzcGVjdCBjYXNlIHdoZW4gbWF0Y2hpbmcgdGhlIHN1YnN0cmluZ1xuICAgICAqL1xuICAgIHN0YXRpYyBjb3VudCh0ZXh0OiBzdHJpbmcsIHN1Yjogc3RyaW5nLCBpZ25vcmVDYXNlID0gdHJ1ZSk6IG51bWJlciB7XG4gICAgICAgIGlmICghdGV4dCB8fCAhc3ViKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWdub3JlQ2FzZSkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgICAgIHN1YiA9IHN1Yi50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3MgPSAtMTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHBvcyA9IHRleHQuaW5kZXhPZihzdWIsIHBvcyArIDEpO1xuICAgICAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyBjb252ZXJ0ZWQgdG8gYmFzZTY0XG4gICAgICovXG4gICAgc3RhdGljIHRvQmFzZTY0KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2csIChtYXRjaCwgaGV4KSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGhleCwgMTYpKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0cmluZyBjb252ZXJ0ZWQgZnJvbSBiYXNlNjRcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUJhc2U2NCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChhdG9iKHZhbHVlKS5zcGxpdCgnJykubWFwKChjKSA9PiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSkuam9pbignJykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgU0hBMjU2IGhhc2ggdmFsdWUgb2Ygc3RyaW5nXG4gICAgICovXG4gICAgc3RhdGljIHNoYTI1Nih2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2hhID0gbmV3IGpzU0hBKFwiU0hBLTI1NlwiLCBcIlRFWFRcIik7XG4gICAgICAgIHNoYS51cGRhdGUodmFsdWUpO1xuICAgICAgICByZXR1cm4gc2hhLmdldEhhc2goXCJCNjRcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBTSEE1MTIgaGFzaCB2YWx1ZSBvZiBzdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hhNTEyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBzaGEgPSBuZXcganNTSEEoXCJTSEEtNTEyXCIsIFwiVEVYVFwiKTtcbiAgICAgICAgc2hhLnVwZGF0ZSh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBzaGEuZ2V0SGFzaChcIkI2NFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgd2hlcmUgYW55IEhUTUwgc3BlY2lhbCBjaGFyYWN0ZXJzIGFyZSBwZXJjZW50IGVuY29kZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgZW5jb2RlSFRNTCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RyaW5nIHdoZXJlIGFueSBwZXJjZW50IGVuY29kZWQgY2hhcmFjdGVycyBhcmUgcmVwbGFjZWQgYnkgdGhlaXIgY29ycmVzcG9uZGluZyB1bmVuY29kZWQgY2hhcmFjdGVyc1xuICAgICAqL1xuICAgIHN0YXRpYyBkZWNvZGVIVE1MKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIGZpZWxkIHdpdGggcGFzc2VkIG5hbWUgZnJvbSBhbiBvYmplY3QuIFRoZSBmaWVsZCBuYW1lIGlzIG1hdGNoZWQgaW5zZW5zaXRpdmUgb2YgY2FzZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRGaWVsZDxUPihvYmo6IE1hcE9mPFQ+LCBuYW1lOiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCFVdGlscy5pc09iamVjdChvYmopIHx8IFV0aWxzLmlzRW1wdHkobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaikuZmlsdGVyKGtleSA9PiBVdGlscy5lcU5DKGtleSwgbmFtZSkpO1xuICAgICAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialtrZXlzWzBdXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhciBmaWVsZHMgZnJvbSBhbiBvYmplY3QuIElmIHRoZSBgX2RlbGV0ZWAgcGFyYW1ldGVyIGlzIGBmYWxzZWAgdGhlblxuICAgICAqIGFycmF5IG9yIG1hcCBmaWVsZHMgYXJlIGVtcHRpZWQgYW5kIG90aGVyIGZpZWxkcyBhcmUgc2V0IHRvIGB1bmRlZmluZWRgLlxuICAgICAqIElmIHRoZSBgX2RlbGV0ZWAgcGFyYW1ldGVyIGlzIGB0cnVlYCB0aGVuIGZpZWxkcyBhcmUgZGVsZXRlZFxuICAgICAqL1xuICAgIHN0YXRpYyBjbGVhck9iamVjdChvYmo6IHt9LCBfZGVsZXRlOiBib29sZWFuID0gZmFsc2UpOiB7fSB7XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2RlbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqW3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzQXJyYXkob2JqW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BdLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNNYXAob2JqW3Byb3BdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BdLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIG5vbi1lbXB0eSBmaWVsZHMgaW4gdGhlIGBvdmVycmlkZWAgb2JqZWN0IHRoYXQgdGhhdCBhcmUgZGlmZmVyZW50IHRvIGZpZWxkcyBvZiB0aGUgc2FtZSBuYW1lXG4gICAgICogaW4gdGhlIGB0ZW1wbGF0ZWAgb2JqZWN0XG4gICAgICogQHBhcmFtIHRlbXBsYXRlIFRoZSBvYmplY3QgdG8gY29tcGFyZSBhZ2FpbnN0XG4gICAgICogQHBhcmFtIG92ZXJyaWRlIFRoZSBvYmplY3QgZGVmaW5pbmcgdGhlIGZpZWxkcyBhbmQgdmFsdWVzIHRvIGJlIGNvbXBhcmVkXG4gICAgICogQHBhcmFtIHJldCBBbiBvcHRpb25hbCByZXR1cm4gb2JqZWN0LiBJZiBub3Qgc2V0IGEgbmV3IG9iamVjdCBpcyBjcmVhdGVkXG4gICAgICovXG4gICAgc3RhdGljIGRlbHRhcyh0ZW1wbGF0ZToge30sIG92ZXJyaWRlOiB7fSwgcmV0Pzoge30pOiB7fSB7XG4gICAgICAgIGlmICghcmV0KSB7XG4gICAgICAgICAgICByZXQgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmtleXMob3ZlcnJpZGUpKSB7XG4gICAgICAgICAgICBpZiAobmFtZSBpbiB0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc09iamVjdChvdmVycmlkZVtuYW1lXSkgJiYgIVV0aWxzLmlzQXJyYXkob3ZlcnJpZGVbbmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBVdGlscy5kZWx0YXModGVtcGxhdGVbbmFtZV0sIG92ZXJyaWRlW25hbWVdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlscy5lcXVhbHMoZGlmZiwge30pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRbbmFtZV0gPSBkaWZmO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFVdGlscy5lcXVhbHModGVtcGxhdGVbbmFtZV0sIG92ZXJyaWRlW25hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIVV0aWxzLmlzRW1wdHkob3ZlcnJpZGVbbmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRbbmFtZV0gPSBvdmVycmlkZVtuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghVXRpbHMuaXNFbXB0eShvdmVycmlkZVtuYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0W25hbWVdID0gb3ZlcnJpZGVbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgZmllbGRzIGluIGEgc291cmNlIG9iamVjdCB3aG9zZSBuYW1lcyBtYXRjaCBvbmUgb2YgdGhlIHBhc3NlZCBrZXlzLiBUaGUga2V5cyBjYW4gZWl0aGVyIGJlXG4gICAgICogYW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGZvciBlYWNoIGZpZWxkIGluIHRoZSBzb3VyY2Ugb2JqZWN0IGFuZCByZXR1cm5zIGB0cnVlYCBpZiBhIGZpZWxkXG4gICAgICogc2hvdWxkIGJlIFwicGlja2VkXCIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2JqIFRoZSBzb3VyY2Ugb2JqZWN0XG4gICAgICogQHBhcmFtIGtleXMgQW4gYXJyYXkgb2Yga2V5cyBvciBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIHBpY2sob2JqOiB7fSwga2V5czogc3RyaW5nW10gfCAoKHZhbHVlOiBhbnksIGtleTogc3RyaW5nLCBvYmo6IG9iamVjdCkgPT4gYm9vbGVhbikpOiB7fSB7XG4gICAgICAgIGNvbnN0IHJldCA9IHt9O1xuICAgICAgICBpZiAoISFvYmopIHtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc0Z1bmN0aW9uKGtleXMpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXlzKG9ialtrZXldLCBrZXksIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldFtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZGVib3VuY2UgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YCBtaWxsc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIHByZXZpb3VzIGludm9jYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2VcbiAgICAgKiBAcGFyYW0gd2FpdCBUaGUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGNhbGxpbmcgYGZ1bmNgXG4gICAgICogQHBhcmFtIGltbWVkaWF0ZSBJZiBgdHJ1ZWAgdGhlbiBtYWtlIGFuIGluaXRpYWwgY2FsbCB0byBgZnVuY2BcbiAgICAgKiBAcGFyYW0gZXZlcnkgQW4gb3B0aW9uYWwgY2FsbGJhY2sgdG8gY2FsbCB3aXRob3V0IGRlYm91bmNpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgZGVib3VuY2UoZnVuYzogKC4uLnBhcmFtcykgPT4gYW55LCB3YWl0ID0gMCwgaW1tZWRpYXRlID0gZmFsc2UsIGV2ZXJ5PzogKC4uLnBhcmFtcykgPT4gYW55KTogKC4uLnBhcmFtcykgPT4gYW55IHtcbiAgICAgICAgbGV0IHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuXG4gICAgICAgIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24odGhpczogYW55KSB7XG4gICAgICAgICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICBpZiAoZXZlcnkpIHtcbiAgICAgICAgICAgICAgICBldmVyeS5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSB0aHJvdHRsZWQgZnVuY3Rpb24gdGhhdCBvbmx5IGludm9rZXMgZnVuYyBhdCBtb3N0IG9uY2UgcGVyIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGVcbiAgICAgKiBAcGFyYW0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0b1xuICAgICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gY29udHJvbCB0aGUgdGhyb3R0bGluZyBiZWhhdmlvdXJcbiAgICAgKi9cbiAgICBzdGF0aWMgdGhyb3R0bGUoZnVuYzogKC4uLnBhcmFtcykgPT4gYW55LCB3YWl0OiBudW1iZXIsIG9wdGlvbnM6IFRocm90dGxlU2V0dGluZ3MgPSB7fSk6ICguLi5wYXJhcm1zKSA9PiBhbnkge1xuICAgICAgICBsZXQgdGltZW91dCwgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgICAgICBsZXQgcHJldmlvdXMgPSAwO1xuXG4gICAgICAgIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHRocm90dGxlZCA9IGZ1bmN0aW9uKHRoaXM6IGFueSkge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICBjb25zdCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHRocm90dGxlZFtcImNhbmNlbFwiXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgICAgICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhyb3R0bGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGZyYW1lVGFza3M6IE1hcDwoLi4ucGFyYW1zKSA9PiBhbnksIEZyYW1lVGFzaz4gPSBuZXcgTWFwPCguLi5wYXJhbXMpID0+IGFueSwgRnJhbWVUYXNrPigpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgZnVuY3Rpb24gdGhhdCBjYWxscyBgY2FsbGJhY2tgIHRoZSBuZXh0IHRpbWUgdGhlIGJyb3dzZXIgbmV4dCByZXBhaW50c1xuICAgICAqL1xuICAgIHN0YXRpYyBmcmFtZShjYWxsYmFjazogKC4uLnBhcmFtcykgPT4gYW55KTogKC4uLnBhcmFtcykgPT4gYW55IHtcbiAgICAgICAgcmV0dXJuICguLi5wYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGlmIChVdGlscy5mcmFtZVRhc2tzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5mcmFtZVRhc2tzLmZvckVhY2goKHRhc2ssIGtleSwgbWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLmZyYW1lVGFza3MuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBVdGlscy5mcmFtZVRhc2tzLmdldChjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBwYXJhbXNcbiAgICAgICAgICAgICAgICB0YXNrLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBuZXcgdGFza1xuICAgICAgICAgICAgICAgIFV0aWxzLmZyYW1lVGFza3Muc2V0KGNhbGxiYWNrLCBuZXcgRnJhbWVUYXNrKGNhbGxiYWNrLCBwYXJhbXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBVUkwgb2JqZWN0IGZyb20gYSBgdXJsYCBzdHJpbmcuIElmIHRoZSBzdHJpbmcgaXMgYSByZWxhdGl2ZSB1cmwgdGhlblxuICAgICAqIGBiYXNlYCBzcGVjaWZpZXMgdGhlIGJhc2UgdG8gdXNlXG4gICAgICovXG4gICAgc3RhdGljIG1ha2VVUkwodXJsOiBzdHJpbmcsIGJhc2U/OiBzdHJpbmcpOiBVUkwge1xuICAgICAgICBpZiAoIWJhc2UpIHtcbiAgICAgICAgICAgIGJhc2UgPSBcImh0dHA6Ly94LnkuelwiOyAvLyBGaXJlZm94IGFuZCBJT1MgbmVlZCB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBVUkwodXJsLCBiYXNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgdG8gYSB1cmxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byB3aGljaCB0byBhZGQgdGhlIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gcGFyYW1zIEFuIG9iamVjdCB3aG9zZSBmaWVsZHMgc2hvdWxkIGJlIGFkZGVkIGFzIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkU2VhcmNoUGFyYW1zKHVybDogc3RyaW5nLCBwYXJhbXM6IE1hcE9mPGFueT4pOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXVybCB8fCAhcGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVybE9iaiA9IFV0aWxzLm1ha2VVUkwodXJsKTtcbiAgICAgICAgZm9yIChjb25zdCBwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgICAgICAgICAgdXJsT2JqLnNlYXJjaFBhcmFtcy5zZXQocGFyYW0sIHBhcmFtc1twYXJhbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdXJsLmluZGV4T2YoXCI/XCIpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICB1cmwgKz0gXCI/XCIgKyB1cmxPYmouc2VhcmNoUGFyYW1zLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2FkZFVybCh1cmw6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsW3VybC5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgIGlmIChwYXRoWzBdID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB1cmwgKyBwYXRoLnN1YnN0cigxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB1cmwgKyBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhdGhbMF0gPT09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybCArIHBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsICsgXCIvXCIgKyBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHBhdGhzIHRvIGEgdXJsIGFkZGluZyBwYXRoIHNlcGFyYXRvcnMgYXMgbmVjZXNzYXJ5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdXJsIFRoZSB1cmxcbiAgICAgKiBAcGFyYW0gcGF0aHMgT25lIG9yIG1vcmUgcGF0aHMgdG8gYWRkIHRvIHRoZSB1cmxcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkVXJsKHVybDogc3RyaW5nLCAuLi5wYXRoczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBsZXQgX3VybCA9IHVybDtcbiAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICAgICAgICBfdXJsID0gVXRpbHMuX2FkZFVybChfdXJsLCBwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3VybDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgdXJsIGlzIGFic29sdXRlXG4gICAgICovXG4gICAgc3RhdGljIGlzVXJsQWJzb2x1dGUodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIC9eKD86W2EtekEtWl1bYS16QS1aXFxkKy4tXSo6fFxcL1xcLykvLnRlc3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYW4gYEh0dHBQYXJhbXNgIG9iamVjdCBjb250YWluaW5nIHRoZSBmaWVsZHMgaW4gdGhlIHBhc3NlZCBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgbWFrZUh0dHBQYXJhbXMocGFyYW1zOiBNYXBPZjxzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyIHwgRGF0ZSB8IG9iamVjdCB8IHVuZGVmaW5lZD4pOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyh7ZW5jb2RlcjogbmV3IFNxSHR0cFBhcmFtZXRlckNvZGVjKCl9KTtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdmFsdWUgPSBwYXJhbXNbcGFyYW1dO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNCb29sZWFuKF92YWx1ZSkgfHwgVXRpbHMuaXNOdW1iZXIoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc0RhdGUoX3ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBVdGlscy50b1N5c0RhdGVTdHIoX3ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gVXRpbHMudG9Kc29uKF92YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KHBhcmFtLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGVzY2FwZURpdjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdHJpbmcgd2l0aCBIVE1MIHNwZWNpYWwgY2hhcmFjdGVycyBlc2NhcGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaHRtbCBUaGUgc3RyaW5nIHRvIGVzY2FwZVxuICAgICAqL1xuICAgIHN0YXRpYyBlc2NhcGVIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghaHRtbCkge1xuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlscy5lc2NhcGVEaXYpIHtcbiAgICAgICAgICAgIFV0aWxzLmVzY2FwZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBVdGlscy5lc2NhcGVEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaHRtbCkpO1xuICAgICAgICBjb25zdCBlc2NhcGVkSHRtbCA9IFV0aWxzLmVzY2FwZURpdi5pbm5lckhUTUw7XG4gICAgICAgIFV0aWxzLmVzY2FwZURpdi5yZW1vdmVDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgIHJldHVybiBlc2NhcGVkSHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIGFuIGVsZW1lbnQgaW4gYW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcnJheSBUaGUgYXJyYXkgY29udGFpbmluZyB0aGUgZWxlbWVudCB0byBtb3ZlXG4gICAgICogQHBhcmFtIGZyb20gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIG1vdmVcbiAgICAgKiBAcGFyYW0gdG8gVGhlIGluZGV4IHRoYXQgdGhlIGVsZW1lbnQgc2hvdWxkIGJlIG1vdmVkIHRvXG4gICAgICovXG4gICAgc3RhdGljIGFycmF5TW92ZShhcnJheTogYW55W10sIGZyb206IG51bWJlciwgdG86IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodG8gPT09IGZyb20gKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXJyYXkuc3BsaWNlKHRvLCAwLCBhcnJheS5zcGxpY2UoZnJvbSwgMSlbMF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29udGVudHMgb2YgYSB0YXJnZXQgYXJyYXkgdG8gdGhlIGNvbnRlbnRzIG9mIGEgc291cmNlIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgYXJyYXlcbiAgICAgKiBAcGFyYW0gc291cmNlIFRoZSBzb3VyY2UgYXJyYXlcbiAgICAgKi9cbiAgICBzdGF0aWMgYXJyYXlTZXQodGFyZ2V0OiBhbnlbXSwgc291cmNlOiBhbnlbXSk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zcGxpY2UuYXBwbHkodGFyZ2V0LCBbMCwgdGFyZ2V0Lmxlbmd0aF0uY29uY2F0KHNvdXJjZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdlbmVyaWNOZXh0KHZhbHVlKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2VuZXJpY0Vycm9yKGVycm9yOiBhbnkpIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZW5lcmljQ29tcGxldGUoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSBzaW1wbGUgd3JhcHBlZCBhcm91bmQgYE9ic2VydmFibGUuc3Vic2NyaWJlYFxuICAgICAqL1xuICAgIHN0YXRpYyBzdWJzY3JpYmU8VD4oXG4gICAgICAgIG9ic2VydmFibGU6IE9ic2VydmFibGU8VD4sXG4gICAgICAgIG5leHQ6ICh2YWx1ZTogVCkgPT4gdm9pZCwgZXJyb3I/OiAoZXJyOiBhbnkpID0+IHZvaWQsIGNvbXBsZXRlPzogKCkgPT4gdm9pZCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgICAgbmV4dCA9IFV0aWxzLmdlbmVyaWNOZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIGVycm9yID0gVXRpbHMuZ2VuZXJpY0Vycm9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29tcGxldGUpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlID0gVXRpbHMuZ2VuZXJpY0NvbXBsZXRlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnN1YnNjcmliZShuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHZhbHVlIGFzIGEgYERhdGVgIGNvbnZlcnRpbmcgYXMgbmVjZXNzYXJ5LiBJZiB0aGUgdmFsdWVcbiAgICAgKiBjYW5ub3QgYmUgY29udmVydGVkIHRoZW4gYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgYXNEYXRlKHZhbHVlOiBhbnkpOiBEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgYXMgRGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy50b0RhdGUodmFsdWUgYXMgc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgdmFsdWUgYXMgYSBgbnVtYmVyYCBjb252ZXJ0aW5nIGFzIG5lY2Vzc2FyeS4gSWYgdGhlIHZhbHVlXG4gICAgICogY2Fubm90IGJlIGNvbnZlcnRlZCB0aGVuIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICAgICAqL1xuICAgIHN0YXRpYyBhc051bWJlcih2YWx1ZTogYW55KTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKFV0aWxzLnRlc3RJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy50b0ludCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoVXRpbHMudGVzdEZsb2F0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy50b051bWJlcih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSB2YWx1ZSBhcyBhIGBzdHJpbmdgIGNvbnZlcnRpbmcgYXMgbmVjZXNzYXJ5XG4gICAgICovXG4gICAgc3RhdGljIGFzU3RyaW5nKHZhbHVlOiBhbnkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIHN0cmluZztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgYSBzdHJpbmcgcmVwcmVzZW50cyBhbiBpbnRlZ2VyXG4gICAgICovXG4gICAgc3RhdGljIHRlc3RJbnRlZ2VyKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAvXihcXC18XFwrKT8oWzAtOV0rKSQvLnRlc3Qoc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYHRydWVgIGlmIGEgc3RyaW5nIHJlcHJlc2VudHMgYSBmbG9hdGluZyBwb2ludCBudW1iZXJcbiAgICAgKi9cbiAgICBzdGF0aWMgdGVzdEZsb2F0KHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAvXlstK10/WzAtOV0qXFwuP1swLTldKyhbZUVdWy0rXT9bMC05XSspPyQvLnRlc3Qoc3RyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb3VuZCB0aGUgcGFzc2VkIG51bWJlciBhd2F5IGZyb20gemVybzogNC41ID0+IDUsIC00LjUgPT4gLTVcbiAgICAgKi9cbiAgICBzdGF0aWMgcm91bmRBd2F5KG51bTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIG51bSA+PSAwID8gTWF0aC5yb3VuZChudW0pIDogTWF0aC5zaWduKG51bSkgKiBNYXRoLnJvdW5kKE1hdGguYWJzKG51bSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG1hdGNoU3VmZml4KHN0cjogc3RyaW5nLCBmYWN0b3I6IG51bWJlciwgLi4uc3VmZml4ZXM6IHN0cmluZ1tdKToge3N0cjogc3RyaW5nLCBmYWN0b3I6IG51bWJlcn0gfCB1bmRlZmluZWQge1xuICAgICAgICBmb3IgKGNvbnN0IHN1ZmZpeCBvZiBzdWZmaXhlcykge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmVuZHNXaXRoKHN0ciwgc3VmZml4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0cjogVXRpbHMudHJpbUVuZChzdHIuc3Vic3RyKDAsIHN0ci5sZW5ndGggLSBzdWZmaXgubGVuZ3RoKSksXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvclxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgc2l6ZSBpbiBzdHJpbmcgZm9ybSB0byBhIG51bWJlciBpbiBieXRlcy5cbiAgICAgKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgdW5pdHMgYXJlIHN1cHBvcnRlZDogYGJgLCBga2JgLCBgbWJgLCBgZ2JgLCBgdGJgLCBgcGJgXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSBgMi41IGdiYCB3aWxsIHJldHVybiBgMjYyMTQ0MGAuXG4gICAgICovXG4gICAgc3RhdGljIHRvU2l6ZShzdHI6IHN0cmluZywgX2RlZmF1bHQgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgc3RyID0gVXRpbHMudHJpbShzdHIpO1xuICAgICAgICBpZiAoIXN0cikge1xuICAgICAgICAgICAgcmV0dXJuIF9kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBmYWN0b3IgPSAxO1xuICAgICAgICBsZXQgcmV0ID0gVXRpbHMubWF0Y2hTdWZmaXgoc3RyLCAxMDI0ICogMTAyNCAqIDEwMjQgKiAxMDI0ICogMTAyNCwgXCJQQlwiLCBcIlBPXCIpO1xuICAgICAgICBpZiAocmV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldCA9IFV0aWxzLm1hdGNoU3VmZml4KHN0ciwgMTAyNCAqIDEwMjQgKiAxMDI0ICogMTAyNCwgXCJUQlwiLCBcIlRPXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0ID0gVXRpbHMubWF0Y2hTdWZmaXgoc3RyLCAxMDI0ICogMTAyNCAqIDEwMjQsIFwiR0JcIiwgXCJHT1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldCA9IFV0aWxzLm1hdGNoU3VmZml4KHN0ciwgMTAyNCAqIDEwMjQsIFwiTUJcIiwgXCJNT1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldCA9IFV0aWxzLm1hdGNoU3VmZml4KHN0ciwgMTAyNCwgXCJLQlwiLCBcIktPXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0ID0gVXRpbHMubWF0Y2hTdWZmaXgoc3RyLCAxLCBcIkJcIiwgXCJPXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3RyID0gcmV0LnN0cjtcbiAgICAgICAgICAgIGZhY3RvciA9IHJldC5mYWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFVdGlscy50ZXN0RmxvYXQoc3RyKSkge1xuICAgICAgICAgICAgcmV0dXJuIF9kZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gVXRpbHMudG9OdW1iZXIoc3RyLCBfZGVmYXVsdCkgKiBmYWN0b3I7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjYWxjdWxhdGVEdXJhdGlvbihjdXJyZW50OiBudW1iZXIsIHVuaXQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHN3aXRjaCAoVXRpbHMudG9Mb3dlckNhc2UodW5pdCkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJkXCI6ICAgIGNhc2UgXCJqXCI6XG4gICAgICAgICAgICBjYXNlIFwiZGF5c1wiOiBjYXNlIFwiam91cnNcIjpcbiAgICAgICAgICAgIGNhc2UgXCJkYXlcIjogIGNhc2UgXCJqb3VyXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgKiBVdGlscy5vbmVEYXk7XG4gICAgICAgICAgICBjYXNlIFwiaFwiOlxuICAgICAgICAgICAgY2FzZSBcImhvdXJzXCI6IGNhc2UgXCJoZXVyZXNcIjpcbiAgICAgICAgICAgIGNhc2UgXCJob3VyXCI6ICBjYXNlIFwiaGV1cmVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCAqIFV0aWxzLm9uZUhvdXI7XG4gICAgICAgICAgICBjYXNlIFwibVwiOlxuICAgICAgICAgICAgY2FzZSBcIm1pbnV0ZXNcIjogY2FzZSBcIm1pbnV0ZVwiOlxuICAgICAgICAgICAgY2FzZSBcIm1pbnNcIjogICAgY2FzZSBcIm1pblwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50ICogVXRpbHMub25lTWludXRlO1xuICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzZWNvbmRzXCI6ICBjYXNlIFwic2Vjb25kZXNcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzZWNvbmRcIjogICBjYXNlIFwic2Vjb25kZVwiOlxuICAgICAgICAgICAgY2FzZSBcInNlY3NcIjogY2FzZSBcInNlY1wiOlxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50ICogVXRpbHMub25lU2Vjb25kO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm1zXCI6XG4gICAgICAgICAgICBjYXNlIFwibWlsbGlzZWNvbmRzXCI6IGNhc2UgXCJtaWxpc2Vjb25kc1wiOiAgY2FzZSBcIm1pbGxpc2Vjb25kZXNcIjogY2FzZSBcIm1pbGlzZWNvbmRlc1wiOlxuICAgICAgICAgICAgY2FzZSBcIm1pbGxpc2Vjb25kXCI6ICBjYXNlIFwibWlsbGlzZWNvbmRlXCI6IGNhc2UgXCJtaWxpc2Vjb25kXCI6ICAgIGNhc2UgXCJtaWxpc2Vjb25kZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgYSBkdXJhdGlvbiBpbiBzdHJpbmcgZm9ybSB0byBhIG51bWJlciBpbiBtaWxsaXNlY29uZHMuXG4gICAgICpcbiAgICAgKiBUaGVzZSB1bml0cyBhcmUgc3VwcG9ydGVkOiBgZGF5c2AsIGBob3Vyc2AsIGBtaW51dGVzYCwgYHNlY29uZHNgLCBgbWlsbGlzZWNvbmRzYCAoYWJicmV2aWF0aW9ucyBhcmUgYWxzbyBzdXBwb3J0ZWQpXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSBgMyBoIDJtaW5zIDRzID0+IDEwOTI0MDAwYFxuICAgICAqXG4gICAgICogQHBhcmFtIGRlZmF1bHRVbml0IFRoZSB1bml0IHRvIHVzZSBpZiBubyB1bml0cyBhcmUgaW4gdGhlIHN0cmluZy4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgYG1zYFxuICAgICAqL1xuICAgIHN0YXRpYyB0b0R1cmF0aW9uKHN0cjogc3RyaW5nLCBkZWZhdWx0VW5pdCA9IFwibXNcIik6IG51bWJlciB7XG4gICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgIGlmIChzdHIpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHRva2VucyA9IHN0ci5tYXRjaCgvWzAtOVxcLixdK3xbYS16QS1aXSsvZykgfHwgW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHRva2Vucykge1xuICAgICAgICAgICAgICAgIGlmICgvW2EtekEtWl0vLnRlc3QodG9rZW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsICs9IFV0aWxzLmNhbGN1bGF0ZUR1cmF0aW9uKGN1cnJlbnQsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwgKz0gVXRpbHMuY2FsY3VsYXRlRHVyYXRpb24oY3VycmVudCwgZGVmYXVsdFVuaXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBVdGlscy50b051bWJlcih0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCArPSBVdGlscy5jYWxjdWxhdGVEdXJhdGlvbihjdXJyZW50LCBkZWZhdWx0VW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cbn1cbiJdfQ==