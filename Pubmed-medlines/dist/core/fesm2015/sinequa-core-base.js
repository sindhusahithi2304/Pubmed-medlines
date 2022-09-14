import { HttpParams } from '@angular/common/http';
import moment from 'moment';
import { remove } from 'diacritics';
import jsSHA from 'jssha';
import kebabCase from 'lodash/kebabCase';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import escape from 'lodash/escape';
import unescape from 'lodash/unescape';
import isEqual from 'lodash/isEqual';
import { ɵɵdefineNgModule, ɵɵdefineInjector, ɵsetClassMetadata, NgModule } from '@angular/core';
import 'fast-text-encoding';
import 'intl';
import 'intl/locale-data/jsonp/en-US';
import 'js-polyfills/url';
import 'matchmedia-polyfill';
import focusWithin from 'focus-within';

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
class Timer {
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
class Utils {
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
        return remove(text);
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

/**
 * Describes the error codes that can be set in the {@link SqError} class.
 */
var SqErrorCode;
(function (SqErrorCode) {
    SqErrorCode[SqErrorCode["loginCancelled"] = 0] = "loginCancelled";
    SqErrorCode[SqErrorCode["processedCredentialsError"] = 1] = "processedCredentialsError";
    SqErrorCode[SqErrorCode["principalSwitched"] = 2] = "principalSwitched";
    SqErrorCode[SqErrorCode["autoLoginError"] = 3] = "autoLoginError";
})(SqErrorCode || (SqErrorCode = {}));
/**
 * A subclass of the built-in {@link Error} class with added `code` and
 * `data` (optional) properties.
 */
class SqError extends Error {
    constructor(code, message, data) {
        super(message || SqError.message(code));
        this.code = code;
        this.name = "SqError";
        this.message = message || SqError.message(code);
        if (data) {
            this.data = data;
        }
    }
    /**
     * Return `true` if the passed `error` is a valid `SqErrorCode` instance.
     * If the optional `code` parameter is defined then only return true
     * if the code on `error` matches this value.
     */
    static is(error, code) {
        if (error instanceof SqError || (error instanceof Error && error.name === "SqError")) {
            return Utils.isUndefined(code) || error.code === code;
        }
        return false;
    }
    /**
     * Return the message corresponding to the passed error `code`.
     */
    static message(code) {
        switch (code) {
            case SqErrorCode.loginCancelled: return "msg#error.loginCancelled";
            case SqErrorCode.processedCredentialsError: return "msg#error.processedCredentialsError";
            case SqErrorCode.principalSwitched: return "msg#error.principalSwitched";
            case SqErrorCode.autoLoginError: return "msg#error.autoLoginError";
            default: return "msg#error.unknownError";
        }
    }
}

class IteratorAdaptor {
    constructor(base, adaptor) {
        this.base = base;
        this.adaptor = adaptor;
        this.return = (base.return) ? (v) => this.translate(this.base.return(v)) : undefined;
        this.throw = (base.throw) ? (e) => this.translate(this.base.throw(e)) : undefined;
    }
    static forIterable(iterable, adaptor) {
        /*if (iterable === undefined) {
            return undefined;
        }*/
        return new IteratorAdaptor(iterable[Symbol.iterator](), adaptor);
    }
    translate(result) {
        if (result.done) {
            return {
                done: result.done,
                value: (result.done && result.value === undefined) ? undefined : this.adaptor(result.value)
            };
        }
        else {
            return {
                value: this.adaptor(result.value)
            };
        }
    }
    next(value) { return this.translate(this.base.next(value)); }
    [Symbol.iterator]() { return this; }
}

class ArrayBasedView {
    constructor(base, nameSelector, valueSelector) {
        this.base = base;
        this.nameSelector = nameSelector;
        this.valueSelector = valueSelector;
    }
    get length() {
        return this.base.length;
    }
    get(index) {
        return this.toNameValuePair(this.base[index]);
    }
    getName(index) {
        return this.nameSelector(this.base[index]);
    }
    getValue(index) {
        return this.valueSelector(this.base[index]);
    }
    toNameValuePair(obj) {
        return { name: this.nameSelector(obj), value: this.valueSelector(obj) };
    }
    /*
        Iterators
    */
    [Symbol.iterator]() {
        return this.items();
    }
    items() {
        return IteratorAdaptor.forIterable(this.base, (obj) => this.toNameValuePair(obj));
    }
    names() {
        return IteratorAdaptor.forIterable(this.base, this.nameSelector);
    }
    values() {
        return IteratorAdaptor.forIterable(this.base, this.valueSelector);
    }
    forEach(callback, thisArg) {
        for (let idx = 0; idx < this.length; idx++) {
            const r = this.get(idx);
            if (thisArg)
                callback.call(thisArg, r, idx, this);
            else
                callback(r, idx, this);
        }
        return this;
    }
}
/**
 * A helper class for creating {@link NameValueArrayView} instances
 */
// @dynamic
class NameValueArrayViewHelper {
    /**
     * Creates a {@link NameValueArrayView} from an array of {@link NameValuePair} items
     *
     * @param items An array of `NameValuePair` items
     */
    static fromArray(items) {
        return new ArrayBasedView(items || [], p => p.name, p => p.value);
    }
    static fromObjects(items, nameKey, valueKey) {
        return new ArrayBasedView(items || [], p => p[nameKey], p => p[valueKey]);
    }
    static from(items, nameSelector, valueSelector) {
        return new ArrayBasedView(items || [], nameSelector, valueSelector);
    }
}

/**
 * An enumeration of keyboard code values
 */
var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
    Keys[Keys["del"] = 46] = "del";
    Keys[Keys["tab"] = 9] = "tab";
    Keys[Keys["enter"] = 13] = "enter";
    Keys[Keys["esc"] = 27] = "esc";
    Keys[Keys["comma"] = 188] = "comma";
    Keys[Keys["space"] = 32] = "space";
    Keys[Keys["pageUp"] = 33] = "pageUp";
    Keys[Keys["pageDown"] = 34] = "pageDown";
    Keys[Keys["home"] = 36] = "home";
    Keys[Keys["end"] = 35] = "end";
    Keys[Keys["backspace"] = 8] = "backspace";
})(Keys || (Keys = {}));

/**
 * Defines the different pattern types
 * `Empty`: no pattern
 * `RegExp`: a regular expression pattern
 * `Value`: a literal value
 */
var PatternType;
(function (PatternType) {
    PatternType[PatternType["Empty"] = 0] = "Empty";
    PatternType[PatternType["RegExp"] = 1] = "RegExp";
    // WildCard = 2,
    PatternType[PatternType["Value"] = 3] = "Value";
})(PatternType || (PatternType = {}));
/**
 * A class that represents a single pattern. The pattern type is deduced automatically from the input pattern text.
 *
 * `<empty string>` => `Empty`
 * `<pattern with wildcards ?*>` => `RegExp` (wildcards are converted to regular expressions)
 * `<pattern starting with ~>` => `RegExp` (the text following the ~ character is treated as a regular expression)
 * `<any other value>` => `Value` (a literal value that is matched as-is)
 */
class Pattern {
    constructor(pattern) {
        if (!pattern) {
            this.clear();
        }
        else {
            this.load(pattern);
        }
    }
    get type() {
        return this._type;
    }
    get text() {
        return this._text;
    }
    static getPatternType(pattern) {
        if (!pattern) {
            return PatternType.Empty;
        }
        if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
            return PatternType.RegExp;
        }
        return PatternType.Value;
    }
    static isPattern(pattern) {
        if (!pattern) {
            return false;
        }
        if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
            return true;
        }
        return false;
    }
    static doMatch(pattern, text) {
        const _pattern = new Pattern();
        _pattern.load(pattern);
        return _pattern.isMatch(text);
    }
    static wildcardToRegex(pattern) {
        if (!pattern) {
            return pattern;
        }
        return "^" + Utils.regExEscape(pattern).replace("\\*", ".*").replace("\\?", ".") + "$";
    }
    static cleanPattern(s) {
        if (!s) {
            return s;
        }
        const sb = [];
        let lastIsStar = false;
        for (const ch of s) {
            if (ch === "*") {
                if (!lastIsStar) {
                    lastIsStar = true;
                    sb.push(ch);
                }
            }
            else {
                lastIsStar = false;
                sb.push(ch);
            }
        }
        return sb.join("");
    }
    clear() {
        this.reg = undefined;
        this._text = undefined;
        this.preparedPattern1 = undefined;
        // this.preparedPattern2 = undefined;
        this._type = PatternType.Empty;
    }
    isEmpty() {
        return this._type === PatternType.Empty;
    }
    load(pattern) {
        this.clear();
        try {
            let s = pattern;
            this._text = pattern;
            this._type = Pattern.getPatternType(s);
            if (this._type === PatternType.Empty) {
                return true;
            }
            if (this._type === PatternType.Value) {
                this.preparedPattern1 = s;
                return true;
            }
            if (this._type === PatternType.RegExp) {
                if (s[0] === "~") {
                    s = s.substring(1);
                }
                else {
                    s = Pattern.wildcardToRegex(Pattern.cleanPattern(s));
                }
                this.preparedPattern1 = s;
                this.reg = new RegExp(s, "i");
                return true;
            }
            return false;
        }
        catch (e) {
            console.log(`Pattern.Load '${pattern}' error:`, e);
            this.clear();
            return false;
        }
    }
    getTypeValueText() {
        if (this.type === PatternType.Value) {
            return this.preparedPattern1;
        }
        return undefined;
    }
    getTypeRegexPattern() {
        if (this.type === PatternType.RegExp) {
            return this.preparedPattern1;
        }
        return undefined;
    }
    isTypeValue() {
        return this.type === PatternType.Value;
    }
    isMatch(text) {
        var _a;
        text = text || "";
        switch (this._type) {
            default:
            case PatternType.Empty:
                return true;
            case PatternType.Value:
                return Utils.eqNC(text, this.preparedPattern1 || "");
            case PatternType.RegExp:
                return ((_a = this.reg) === null || _a === void 0 ? void 0 : _a.test(text)) || false;
        }
    }
}
class Patterns {
    constructor(text) {
        this.text = text;
    }
    clear() {
        this._preparedPatterns = undefined;
        this._values = undefined;
        this._isEmpty = true;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (value === this._text) {
            return;
        }
        this._text = value;
        const l = Utils.split(this._text || "", ";");
        this.innerSetList(l);
    }
    getTypeCount(type) {
        if (!this._preparedPatterns) {
            return 0;
        }
        if (type === PatternType.Value) {
            return !!this._values ? Object.keys(this._values).length : 0;
        }
        let count = 0;
        for (const pattern of this._preparedPatterns) {
            if (pattern.type === type) {
                count++;
            }
        }
        return count;
    }
    innerSetList(l) {
        this._preparedPatterns = undefined;
        this._values = undefined;
        this._isEmpty = true;
        if (!!l) {
            for (const s of l) {
                if (!s) {
                    continue;
                }
                const pattern = new Pattern();
                if (pattern.load(s)) {
                    if (!this._preparedPatterns) {
                        this._preparedPatterns = [];
                    }
                    this._preparedPatterns.push(pattern);
                }
            }
        }
        if (this._preparedPatterns) {
            const c = this._preparedPatterns.length;
            if (c > 0) {
                this._isEmpty = false;
            }
            for (let i = c - 1; i >= 0; i--) {
                const pattern = this._preparedPatterns[i];
                //do values
                if (pattern.isTypeValue()) {
                    if (!this._values) {
                        this._values = {};
                    }
                    const val = pattern.getTypeValueText() || "";
                    this._values[val] = true;
                    this._preparedPatterns.splice(i, 1);
                }
            }
        }
    }
    get list() {
        return Utils.split(this.text || "", ";");
    }
    set list(value) {
        this.text = !!value ? value.join(";") : undefined;
        this.innerSetList(value);
    }
    setText(list) {
        this.list = list;
    }
    isEmpty() {
        return this._isEmpty;
    }
    hasPatterns() {
        return !this.isEmpty();
    }
    isMatch(name, logdisplay) {
        if (this.isEmpty()) {
            return true;
        }
        if (!!this._values) {
            if (this._values[name]) {
                if (!!logdisplay) {
                    console.log(logdisplay, ` : the pattern '${name}' matches the value '${name}'`);
                }
                return true;
            }
        }
        if (!!this._preparedPatterns) {
            for (const pattern of this._preparedPatterns) {
                if (!pattern) {
                    continue;
                }
                if (pattern.isTypeValue()) {
                    continue;
                }
                if (pattern.isMatch(name)) {
                    if (!!logdisplay) {
                        console.log(logdisplay, ` : the pattern '${pattern.text}' matches the value '${name}'`);
                    }
                    return true;
                }
            }
        }
        return false;
    }
}
/**
 * This class is used to process "included" and "excluded" patterns typically specified in the Sinequa configuration.
 */
class PatternMatcher {
    constructor(includedLogDisplay, excludedLogDisplay) {
        this.includedPattern = new Patterns();
        this.excludedPattern = new Patterns();
        this.includedLogDisplay = includedLogDisplay;
        this.excludedLogDisplay = excludedLogDisplay;
    }
    get included() {
        return this.includedPattern.text;
    }
    set included(value) {
        this.includedPattern.text = value;
    }
    get excluded() {
        return this.excludedPattern.text;
    }
    set excluded(value) {
        this.excludedPattern.text = value;
    }
    set includedList(value) {
        this.includedPattern.list = value;
    }
    set excludedList(value) {
        this.excludedPattern.list = value;
    }
    hasPatterns() {
        return this.includedPattern.hasPatterns() || this.excludedPattern.hasPatterns();
    }
    isExcluded(name) {
        return !this.isIncluded(name);
    }
    isIncluded(name) {
        if (!name) {
            return true;
        }
        if (this.includedPattern.hasPatterns()) {
            if (this.excludedPattern.hasPatterns()) {
                if (this.excludedPattern.isMatch(name, this.excludedLogDisplay)) {
                    return false;
                }
            }
            if (!this.includedPattern.isMatch(name, this.includedLogDisplay)) {
                return false;
            }
            return true;
        }
        else if (this.excludedPattern.hasPatterns()) {
            if (this.excludedPattern.isMatch(name, this.excludedLogDisplay)) {
                return false;
            }
            return true;
        }
        return true;
    }
    isExplicitlyIncluded(name) {
        return this.includedPattern.hasPatterns() && this.includedPattern.isMatch(name, this.includedLogDisplay);
    }
    isExplicitlyExcluded(name) {
        return this.excludedPattern.hasPatterns() && this.excludedPattern.isMatch(name, this.excludedLogDisplay);
    }
}

focusWithin(document);
// String.trimStart, String.trimEnd
if (!String.prototype.trimStart) {
    String.prototype.trimStart = function () {
        return this.replace(/^[\s\uFEFF\xA0]+/g, '');
    };
}
if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function () {
        return this.replace(/[\s\uFEFF\xA0]+$/g, '');
    };
}
// See https://gist.github.com/jocki84/6ffafd003387179a988e
if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
        function withinBounds(value, min, max, extent) {
            if (false === centerIfNeeded || max <= value + extent && value <= min + extent) {
                return Math.min(max, Math.max(min, value));
            }
            else {
                return (min + max) / 2;
            }
        }
        function makeArea(left, top, width, height) {
            return { "left": left, "top": top, "width": width, "height": height,
                "right": left + width, "bottom": top + height,
                "translate": function (x, y) {
                    return makeArea(x + left, y + top, width, height);
                },
                "relativeFromTo": function (lhs, rhs) {
                    let newLeft = left, newTop = top;
                    lhs = lhs.offsetParent;
                    rhs = rhs.offsetParent;
                    if (lhs === rhs) {
                        return area;
                    }
                    for (; lhs; lhs = lhs.offsetParent) {
                        newLeft += lhs.offsetLeft + lhs.clientLeft;
                        newTop += lhs.offsetTop + lhs.clientTop;
                    }
                    for (; rhs; rhs = rhs.offsetParent) {
                        newLeft -= rhs.offsetLeft + rhs.clientLeft;
                        newTop -= rhs.offsetTop + rhs.clientTop;
                    }
                    return makeArea(newLeft, newTop, width, height);
                }
            };
        }
        let parent, elem = this, area = makeArea(this.offsetLeft, this.offsetTop, this.offsetWidth, this.offsetHeight);
        while ((parent = elem.parentNode) instanceof HTMLElement) {
            const clientLeft = parent.offsetLeft + parent.clientLeft;
            const clientTop = parent.offsetTop + parent.clientTop;
            // Make area relative to parent's client area.
            area = area.
                relativeFromTo(elem, parent).
                translate(-clientLeft, -clientTop);
            parent.scrollLeft = withinBounds(parent.scrollLeft, area.right - parent.clientWidth, area.left, parent.clientWidth);
            parent.scrollTop = withinBounds(parent.scrollTop, area.bottom - parent.clientHeight, area.top, parent.clientHeight);
            // Determine actual scroll amount by reading back scroll properties.
            area = area.translate(clientLeft - parent.scrollLeft, clientTop - parent.scrollTop);
            elem = parent;
        }
    };
}
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
    if (typeof window.CustomEvent === "function")
        return;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
// IE
if (!window.location.origin) { // Some browsers (mainly IE) do not have this property, so we need to build it manually...
    try {
        window.location[ /*foo readonly*/"origin"] = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
    }
    catch (e) {
    }
}
// fake storage (eg for Safari private browsing)
function fakeStorage(storageName) {
    let fakeStorage = {};
    let storage;
    let needed = false;
    if (typeof window[storageName] === "object") {
        // Storage is there, does it work (eg Safari private browsing)
        try {
            window[storageName].setItem("fakeStorageTest", "1");
            window[storageName].removeItem("fakeStorageTest");
        }
        catch (e) {
            needed = true;
        }
    }
    else {
        needed = true;
    }
    if (!needed) {
        return;
    }
    if (typeof window[storageName] === "object") {
        // Override with fake implementation
        storage = window[storageName];
    }
    else {
        // Implement with fake
        try {
            storage = window[ /*fool readonly*/storageName] = {};
        }
        catch (e) {
            console.warn("Unable to set fake", storageName);
            return;
        }
    }
    console.warn("Using fake", storageName);
    const dispatchStorageEvent = function (key, newValue) {
        const oldValue = (!key) ? null : storage.getItem(key);
        const url = location.href.substr(location.origin.length);
        const storageEvent = document.createEvent("StorageEvent"); // For IE, http://stackoverflow.com/a/25514935/1214183
        storageEvent["initStorageEvent"]("storage", false, false, key, oldValue, newValue, url, storage);
        window.dispatchEvent(storageEvent);
    };
    storage.key = function (i) {
        const key = Object.keys(fakeStorage)[i];
        return typeof key === "string" ? key : null;
    };
    storage.getItem = function (key) {
        return typeof fakeStorage[key] === 'string' ? fakeStorage[key] : null;
    };
    storage.setItem = function (key, value) {
        dispatchStorageEvent(key, value);
        fakeStorage[key] = String(value);
    };
    storage.removeItem = function (key) {
        dispatchStorageEvent(key, null);
        delete fakeStorage[key];
    };
    storage.clear = function () {
        dispatchStorageEvent(null, null);
        fakeStorage = {};
    };
}
fakeStorage("localStorage");
fakeStorage("sessionStorage");
// DOMRect polyfill
// Credit: https://github.com/Financial-Times/polyfill-service/pull/1732
(function (global) {
    if (global.DOMRect) {
        return;
    }
    function number(v) {
        return v === undefined ? 0 : Number(v);
    }
    function different(u, v) {
        return u !== v && !(isNaN(u) && isNaN(v));
    }
    function DOMRect(xArg, yArg, wArg, hArg) {
        let x;
        let y;
        let width;
        let height;
        let left;
        let right;
        let top;
        let bottom;
        x = number(xArg);
        y = number(yArg);
        width = number(wArg);
        height = number(hArg);
        Object.defineProperties(this, {
            x: {
                get: function () { return x; },
                set: function (newX) {
                    if (different(x, newX)) {
                        x = newX;
                        left = right = undefined;
                    }
                },
                enumerable: true
            },
            y: {
                get: function () { return y; },
                set: function (newY) {
                    if (different(y, newY)) {
                        y = newY;
                        top = bottom = undefined;
                    }
                },
                enumerable: true
            },
            width: {
                get: function () { return width; },
                set: function (newWidth) {
                    if (different(width, newWidth)) {
                        width = newWidth;
                        left = right = undefined;
                    }
                },
                enumerable: true
            },
            height: {
                get: function () { return height; },
                set: function (newHeight) {
                    if (different(height, newHeight)) {
                        height = newHeight;
                        top = bottom = undefined;
                    }
                },
                enumerable: true
            },
            left: {
                get: function () {
                    if (left === undefined) {
                        left = x + Math.min(0, width);
                    }
                    return left;
                },
                enumerable: true
            },
            right: {
                get: function () {
                    if (right === undefined) {
                        right = x + Math.max(0, width);
                    }
                    return right;
                },
                enumerable: true
            },
            top: {
                get: function () {
                    if (top === undefined) {
                        top = y + Math.min(0, height);
                    }
                    return top;
                },
                enumerable: true
            },
            bottom: {
                get: function () {
                    if (bottom === undefined) {
                        bottom = y + Math.max(0, height);
                    }
                    return bottom;
                },
                enumerable: true
            }
        });
    }
    global.DOMRect = DOMRect;
}(window));
// Element.closest and Element.matches polyfills (see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let el = this;
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

/**
 * This module contains a variety of base types and utility classes including the {@link Utils} utilility class
 */
class BaseModule {
}
BaseModule.ɵmod = ɵɵdefineNgModule({ type: BaseModule });
BaseModule.ɵinj = ɵɵdefineInjector({ factory: function BaseModule_Factory(t) { return new (t || BaseModule)(); }, imports: [[]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BaseModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [],
                exports: []
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { BaseModule, IteratorAdaptor, Keys, NameValueArrayViewHelper, Pattern, PatternMatcher, PatternType, Patterns, SqError, SqErrorCode, Timer, Utils };
//# sourceMappingURL=sinequa-core-base.js.map
