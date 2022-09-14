(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('moment'), require('diacritics'), require('jssha'), require('lodash/kebabCase'), require('lodash/snakeCase'), require('lodash/camelCase'), require('lodash/escape'), require('lodash/unescape'), require('lodash/isEqual'), require('@angular/core'), require('fast-text-encoding'), require('intl'), require('intl/locale-data/jsonp/en-US'), require('js-polyfills/url'), require('matchmedia-polyfill'), require('focus-within')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/base', ['exports', '@angular/common/http', 'moment', 'diacritics', 'jssha', 'lodash/kebabCase', 'lodash/snakeCase', 'lodash/camelCase', 'lodash/escape', 'lodash/unescape', 'lodash/isEqual', '@angular/core', 'fast-text-encoding', 'intl', 'intl/locale-data/jsonp/en-US', 'js-polyfills/url', 'matchmedia-polyfill', 'focus-within'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core.base = {}), global.ng.common.http, global.moment, global.diacritics, global.jsSHA, global.kebabCase, global.snakeCase, global.camelCase, global.escape, global.unescape, global.isEqual, global.ng.core, null, null, null, null, null, global.focusWithin));
}(this, (function (exports, http, moment, diacritics, jsSHA, kebabCase, snakeCase, camelCase, escape, unescape, isEqual, i0, fastTextEncoding, intl, enUS, url, matchmediaPolyfill, focusWithin) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);
    var jsSHA__default = /*#__PURE__*/_interopDefaultLegacy(jsSHA);
    var kebabCase__default = /*#__PURE__*/_interopDefaultLegacy(kebabCase);
    var snakeCase__default = /*#__PURE__*/_interopDefaultLegacy(snakeCase);
    var camelCase__default = /*#__PURE__*/_interopDefaultLegacy(camelCase);
    var escape__default = /*#__PURE__*/_interopDefaultLegacy(escape);
    var unescape__default = /*#__PURE__*/_interopDefaultLegacy(unescape);
    var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
    var focusWithin__default = /*#__PURE__*/_interopDefaultLegacy(focusWithin);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    // Because of: https://github.com/angular/angular/issues/18261
    var SqHttpParameterCodec = /** @class */ (function () {
        function SqHttpParameterCodec() {
        }
        SqHttpParameterCodec.prototype.encodeKey = function (key) {
            return encodeURIComponent(key);
        };
        SqHttpParameterCodec.prototype.encodeValue = function (value) {
            return encodeURIComponent(value);
        };
        SqHttpParameterCodec.prototype.decodeKey = function (key) {
            return decodeURIComponent(key);
        };
        SqHttpParameterCodec.prototype.decodeValue = function (value) {
            return decodeURIComponent(value);
        };
        return SqHttpParameterCodec;
    }());
    var FrameTask = /** @class */ (function () {
        function FrameTask(callback, params) {
            this.callback = callback;
            this.params = params;
        }
        FrameTask.prototype.call = function () {
            return this.callback.apply(this, __spread(this.params));
        };
        return FrameTask;
    }());
    /**
     * A utility class to log execution durations
     */
    var Timer = /** @class */ (function () {
        function Timer(name) {
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
        Timer.prototype.stop = function () {
            this.duration = performance.now() - this.start;
            console.log("Timer: " + this.name + " finished in " + Math.round(this.duration) + " ms");
        };
        return Timer;
    }());
    /**
     * A utility class containing a variety of static methods and properties
     */
    // @dynamic
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.baseExtend = function (dst, objs, deep, sort) {
            for (var i = 0, ii = objs.length; i < ii; ++i) {
                var obj = objs[i];
                if (!Utils.isObject(obj) && !Utils.isFunction(obj)) {
                    continue;
                }
                var keys = Object.keys(obj);
                if (sort) {
                    if (Utils.isFunction(sort)) {
                        keys = keys.sort(sort);
                    }
                    else {
                        keys = keys.sort();
                    }
                }
                for (var j = 0, jj = keys.length; j < jj; j++) {
                    var key = keys[j];
                    var src = obj[key];
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
        };
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
        Utils.extend = function (destination) {
            var sources = [];
            for (var _a = 1; _a < arguments.length; _a++) {
                sources[_a - 1] = arguments[_a];
            }
            return Utils.baseExtend(destination, sources, false);
        };
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
        Utils.merge = function (destination) {
            var sources = [];
            for (var _a = 1; _a < arguments.length; _a++) {
                sources[_a - 1] = arguments[_a];
            }
            return Utils.baseExtend(destination, sources, true);
        };
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
        Utils.mergeAndSort = function (destination) {
            var sources = [];
            for (var _a = 1; _a < arguments.length; _a++) {
                sources[_a - 1] = arguments[_a];
            }
            return Utils.baseExtend(destination, sources, true, true);
        };
        Utils.forEach = function (obj, iterator, context) {
            var key, length;
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
                    var isPrimitive = typeof obj !== 'object';
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
        };
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
        Utils.copy = function (source, destination) {
            var stackSource = [];
            var stackDest = [];
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
                    Utils.forEach(destination, function (value, key) {
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
                var key;
                if (Utils.isArray(source)) {
                    for (var i = 0, ii = source.length; i < ii; i++) {
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
                var index = stackSource.indexOf(source);
                if (index !== -1) {
                    return stackDest[index];
                }
                if (Utils.isWindow(source)) {
                    throw new Error("Can't copy! Making copies of Window instances is not supported.");
                }
                var needsRecurse = false;
                var destination;
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
                    var matches = source.toString().match(/[^\/]*$/);
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
        };
        // Not currently used
        Utils.copyWithoutNullOrEmpty = function (dst, src) {
            var keys = Object.keys(src);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var value = src[key];
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
        };
        /**
         * Makes a shallow copy of the passed object. Empty string values are removed from the copied object.
         * A string value containing `""` is copied as an empty string.
         *
         * @param defaults The object to copy
         * @return The copied object
         */
        Utils.copyDefaults = function (defaults) {
            var _defaults = Utils.copy(defaults);
            if (_defaults) {
                Object.keys(_defaults).forEach(function (key) {
                    // Unset parameters will come through as empty strings (regardless of type)
                    // Filter these out (to not hide defaults on the server) and accept "" as a way of explicitly
                    // setting a parameter to be an empty string
                    var value = _defaults[key];
                    if (value === "") {
                        delete _defaults[key];
                    }
                    if (value === "\"\"") {
                        _defaults[key] = "";
                    }
                });
            }
            return _defaults;
        };
        /**
         * Performs an optimized deep comparison between two objects to determine if they should be considered equal
         * @param o1 The first object to be compared
         * @param o2 The second object to be compared
         */
        Utils.equals = function (o1, o2) {
            return isEqual__default['default'](o1, o2);
        };
        /**
         * Converts a string to an integer value using `parseInt` with radix = 10.
         * If the string cannot be converted or contains additional characters then the
         * passed default value is returned
         * @param str The string to convert
         * @param _default The default value to use if the string cannot be converted
         */
        Utils.toInt = function (str, _default) {
            if (_default === void 0) { _default = 0; }
            var value = parseInt(str, 10);
            if (isNaN(value) || (value + "" !== str)) {
                value = _default;
            }
            return value;
        };
        /**
         * Converts a string to a floating point value using `parseFloat`.
         * If the string cannot be converted then the passed default value is returned
         * @param str The string to convert
         * @param _default The default value to use if the string cannot be converted
         */
        Utils.toNumber = function (str, _default) {
            if (_default === void 0) { _default = 0; }
            var value = parseFloat(str);
            if (isNaN(value)) {
                value = _default;
            }
            return value;
        };
        /**
         * Converts a string to a `Date` using `Date.parse`.
         * The date is returned in UTC. If the string cannot be converted then `undefined` is returned
         * @param str The string to convert
         * @return The converted `Date` in UTC or `undefined`
         */
        Utils.toDate = function (str) {
            var ms = Date.parse(str);
            if (!ms && ms !== 0) {
                return undefined;
            }
            return new Date(ms + new Date(ms).getTimezoneOffset() * 60000); // get date in UTC
        };
        /**
         * Get the time component of a `Date` in milliseconds
         *
         * @param date The date
         * @return The time in milliseconds
         */
        Utils.getTime = function (date) {
            if (!date) {
                return 0;
            }
            return (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
        };
        Object.defineProperty(Utils, "now", {
            /**
             * Return the current date and time
             */
            get: function () {
                return new Date();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Converts a `Date` to a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`)
         * If the time component of the date is 0 then only the date portion of the string is included
         *
         * @param date The `Date` to convert
         */
        Utils.toSysDateStr = function (date) {
            if (!date) {
                return "";
            }
            var m = moment__default['default'](date);
            if (Utils.getTime(date) === 0) {
                return m.format("YYYY-MM-DD");
            }
            else {
                return m.format("YYYY-MM-DD HH:mm:ss");
            }
        };
        /**
         * Converts a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`) to a `Date`
         * If the string cannot be converted then `undefined` is returned
         *
         * @param date The Sinequa system date string to convert
         */
        Utils.fromSysDateStr = function (value) {
            var m = moment__default['default'](value, "YYYY-MM-DD HH:mm:ss");
            if (m.isValid()) {
                return m.toDate();
            }
            return undefined;
        };
        Utils.isSysDateTime = function (str) {
            return Utils.rxSysDateTime.test(str);
        };
        Utils.isISO8601DateTime = function (str) {
            return Utils.rxISO8601DateTime.test(str);
        };
        /**
         * Converts a Javascript value to a JSON string using `JSON.stringify`.
         * Date objects are converted to Sinequa system strings
         *
         * @param value The value to convert
         * @param options Options for the conversion. The default is `{pretty: false}`
         */
        Utils.toJson = function (value, options) {
            if (options === void 0) { options = { pretty: false }; }
            return JSON.stringify(value, function (key, value) {
                if (key && Utils.isDate(this[key])) {
                    var str = Utils.toSysDateStr(this[key]);
                    return str;
                }
                return value;
            }, options.pretty ? 2 : 0);
        };
        /**
         * Converts a string to an object using `JSON.parse`.
         * Strings that are either in Sinequa system date or ISO8601 format are converted to
         * `Date` objects if the `reviveDates` option is specified.
         *
         * @param str The string to convert
         * @param options Options for the conversion. The default is `{reviveDates: false}`
         */
        Utils.fromJson = function (str, options) {
            if (options === void 0) { options = { reviveDates: false }; }
            if (!str || typeof str !== "string") {
                return {};
            }
            try {
                return JSON.parse(str, options.reviveDates ?
                    function (key, value) {
                        if (options.reviveDates && typeof value === "string") {
                            if (Utils.isSysDateTime(value)) {
                                var m = moment__default['default'](value, "YYYY-MM-DD HH:mm:ss");
                                if (m.isValid()) {
                                    return m.toDate();
                                }
                            }
                            else if (Utils.isISO8601DateTime(value)) {
                                var m = moment__default['default'](value, moment__default['default'].ISO_8601);
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
        };
        /**
         * Converts a `FieldValue` value to a string compatible with Sinequa's SQL syntax.
         * String and `Date` values are enclosed in single quotes if the quote parameter is `true`
         *
         * @param value The value to convert
         * @param quote If set, the returned string will be enclosed in single quotes for string and `Date` values
         */
        Utils.toSqlValue = function (value, quote) {
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
                var ret_1 = [];
                value.forEach(function (v) {
                    if (ret_1.length > 0) {
                        ret_1.push(",");
                    }
                    if (!v) {
                        ret_1.push("null");
                    }
                    else if (Utils.isString(v)) {
                        ret_1.push(v);
                    }
                    else {
                        ret_1.push(v.display || v.value || "");
                    }
                });
                ret_1.splice(0, 0, "[");
                ret_1.push("]");
                return ret_1.join("");
            }
            if (quote) {
                return "'" + value + "'";
            }
            else {
                return value;
            }
        };
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
        Utils.treeClean = function (s) {
            if (Utils.isEmpty(s)) {
                return s;
            }
            return Utils.addUrl("/", Utils.replace(Utils.replace(Utils.replace(s, "\t", " "), ";", ","), "\\", "/"), "/");
        };
        /**
         * Return the first node of a Sinequa tree value enclosed in forward slashes
         *
         * @param s A Sinequa tree value
         */
        Utils.treeFirst = function (s) {
            var parts = Utils.split(s, "/");
            return parts.length === 0 ? "" : "/" + parts[0] + "/";
        };
        /**
         * Return the first node of a Sinequa tree value
         *
         * @param s A Sinequa tree value
         */
        Utils.treeFirstNode = function (s) {
            var parts = Utils.split(s, "/");
            return parts[0];
        };
        /**
         * Return the last node of a Sinequa tree value enclosed in forward slashes
         *
         * @param s A Sinequa tree value
         */
        Utils.treeLast = function (s) {
            var parts = Utils.split(s, "/");
            return parts.length === 0 ? "" : "/" + parts[parts.length - 1] + "/";
        };
        /**
         * Return the last node of a Sinequa tree value
         *
         * @param s A Sinequa tree value
         */
        Utils.treeLastNode = function (s) {
            var parts = Utils.split(s, "/");
            return parts[parts.length - 1];
        };
        /**
         * Return the nodes making up a Sinequa tree value
         *
         * @param s A Sinequa tree value
         */
        Utils.treeNodes = function (s) {
            return Utils.split(s, "/");
        };
        /**
         * Return a Sinequa tree value, removing enclosing forward slash characters
         *
         * @param s A Sinequa tree value
         */
        Utils.treeDisplay = function (s) {
            if (!!s) {
                if (s[0] === "/") {
                    s = s.substr(1);
                }
                if (s[s.length - 1] === "/") {
                    s = s.substr(0, s.length - 1);
                }
            }
            return s;
        };
        /**
         * Return the node count of a Sinequa tree value
         *
         * @param s A Sinequa tree value
         */
        Utils.treeCount = function (s) {
            var count = Utils.count(s, "/");
            return count > 0 ? count - 1 : 0;
        };
        /**
         * Traverses a tree structure, executing a callback function at every node
         * @param nodes the nodes to traverse
         * @param callback the callback function
         */
        Utils.traverse = function (nodes, callback) {
            if (!nodes || nodes.length === 0) {
                return false;
            }
            if (!callback) {
                return false;
            }
            var lineage = [];
            var stack = [];
            var _i = nodes.length;
            while (_i--) {
                stack.push(nodes[_i]);
            }
            while (stack.length) {
                var node = stack.pop();
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
        };
        /**
         * Return a pseudo-GUID value using `Math.random`
         *
         * @param withHyphens If set, the returned GUID includes hyphen separators
         */
        Utils.guid = function (withHyphens) {
            if (withHyphens === void 0) { withHyphens = true; }
            var d = Date.now();
            var guid = (withHyphens ?
                'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return guid;
        };
        /**
         * Return `true` if the passed value is `undefined`
         */
        Utils.isUndefined = function (value) {
            return typeof value === 'undefined';
        };
        /**
         * Return `true` if the passed value is an `object`
         */
        Utils.isObject = function (value) {
            return value !== null && typeof value === 'object';
        };
        /**
         * Return `true` if the passed value is a `string`
         */
        Utils.isString = function (value) {
            return typeof value === 'string';
        };
        /**
         * Return `true` if the passed value is a `number`
         */
        Utils.isNumber = function (value) {
            return typeof value === 'number';
        };
        /**
         * Return `true` if the passed value is a `boolean`
         */
        Utils.isBoolean = function (value) {
            return typeof value === 'boolean';
        };
        /**
         * Return `true` if the passed value is a `Date`
         */
        Utils.isDate = function (value) {
            return Object.prototype.toString.call(value) === '[object Date]';
        };
        /**
         * Return `true` if the passed value is a scalar (`number`, `boolean` or `Date`)
         */
        Utils.isScalar = function (value) {
            return Utils.isNumber(value) || Utils.isBoolean(value) || Utils.isDate(value);
        };
        /**
         * Return `true` if the passed value is an `Array`
         */
        Utils.isArray = function (value) {
            return Array.isArray(value);
        };
        /**
         * Return `true` if the passed value is iterable
         */
        Utils.isIterable = function (value) {
            if (value === null || value === undefined) {
                return false;
            }
            return typeof value[Symbol.iterator] === "function";
        };
        /**
         * Return `true` if the passed value is a `Map`
         */
        Utils.isMap = function (value) {
            return Object.prototype.toString.call(value) === '[object Map]';
        };
        /**
         * Return `true` if the passed value is a `Function`
         */
        Utils.isFunction = function (value) {
            return typeof value === 'function';
        };
        /**
         * Return `true` if the passed value is a `RegExp`
         */
        Utils.isRegExp = function (value) {
            return Object.prototype.toString.call(value) === '[object RegExp]';
        };
        /**
         * Return `true` if the passed value is a `Window`
         */
        Utils.isWindow = function (value) {
            return value && value.window === value;
        };
        /**
         * Return `true` if the passed value is a `File`
         */
        Utils.isFile = function (value) {
            return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object File]";
        };
        /**
         * Return `true` if the passed value is a `FormData`
         */
        Utils.isFormData = function (value) {
            return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object FormData]";
        };
        /**
         * Return `true` if the passed value is a `Blob`
         */
        Utils.isBlob = function (value) {
            return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object Blob]";
        };
        /**
         * Return `true` if the passed value is an `ArrayBuffer`
         */
        Utils.isArrayBuffer = function (value) {
            return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object ArrayBuffer]";
        };
        Utils.isArrayLike = function (obj) {
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
            var length = "length" in Object(obj) && obj.length;
            // NodeList objects (with `item` method) and
            // other objects with suitable length characteristics are array-like
            return Utils.isNumber(length) &&
                (length >= 0 && (length - 1) in obj || typeof obj.item === 'function');
        };
        /**
         * Return `true` if the passed value is an `object` without a prototype
         */
        Utils.isBlankObject = function (value) {
            return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
        };
        /**
         * Return true if the passed value is a `TypedArray`
         */
        Utils.isTypedArray = function (value) {
            return value && Utils.isNumber(value.length) && Utils.TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(value));
        };
        /**
         * Return a promise that is a resolved after a specified amount of time
         *
         * @param ms The time to delay in milliseconds
         */
        Utils.delay = function (ms) {
            if (ms === void 0) { ms = 0; }
            return new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    resolve();
                }, ms);
            });
        };
        /**
         *
         * @param value
         * @param _default
         */
        Utils.isTrue = function (value, _default) {
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
        };
        /**
         * Compares two strings using the current locale. The return value is negative
         * if `a` comes before `b` and positive if `a` comes after `b`. If the values
         * are equal then `0` is returned
         *
         * @param a The first string
         * @param b The second string
         * @param ignoreCase If set, do a case-insensitive comparison
         */
        Utils.compare = function (a, b, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            a = a || '';
            b = b || '';
            if (ignoreCase) {
                a = a.toLocaleUpperCase();
                b = b.toLocaleUpperCase();
            }
            return a.localeCompare(b);
        };
        /**
         * Return `true` if two strings are equal, respecting case
         *
         * @param a The first string
         * @param b The second string
         */
        Utils.eq = function (a, b) {
            return Utils.compare(a, b, false) === 0;
        };
        /**
         * Return `true` if two strings are equal, ignoring case
         *
         * @param a The first string
         * @param b The second string
         */
        Utils.eqNC = function (a, b) {
            return Utils.compare(a, b, true) === 0;
        };
        /**
         * Return `true` if a number of strings are equal, ignoring case
         *
         * @param a The first string
         * @param b Remaining strings
         */
        Utils.eqNCN = function (a) {
            var e_1, _a;
            var b = [];
            for (var _b = 1; _b < arguments.length; _b++) {
                b[_b - 1] = arguments[_b];
            }
            if (!b) {
                return false;
            }
            try {
                for (var b_1 = __values(b), b_1_1 = b_1.next(); !b_1_1.done; b_1_1 = b_1.next()) {
                    var s = b_1_1.value;
                    if (Utils.eqNC(a, s)) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (b_1_1 && !b_1_1.done && (_a = b_1.return)) _a.call(b_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        /**
         * Return the length of a string. If the string is empty (`null` or `undefined`)
         * @param s A string
         */
        Utils.len = function (s) {
            return (s || '').length;
        };
        /**
         * Return `true` if a string starts with another
         *
         * @param a The string to test
         * @param b The prefix
         * @param ignoreCase If `true` then ignore case
         */
        Utils.startsWith = function (a, b, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            a = a || '';
            b = b || '';
            if (ignoreCase) {
                a = a.toLocaleUpperCase();
                b = b.toLocaleUpperCase();
            }
            return a.startsWith(b);
        };
        /**
         * Return `true` if a string ends with another
         *
         * @param a The string to test
         * @param b The postfix
         * @param ignoreCase If `true` then ignore case
         */
        Utils.endsWith = function (a, b, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            a = a || '';
            b = b || '';
            if (ignoreCase) {
                a = a.toLocaleUpperCase();
                b = b.toLocaleUpperCase();
            }
            return a.endsWith(b);
        };
        /**
         * Return `true` if a string is a substring of another
         * @param a The string to test
         * @param b The substring
         * @param ignoreCase If `true` then ignore case
         */
        Utils.includes = function (a, b, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            a = a || '';
            b = b || '';
            if (ignoreCase) {
                a = a.toLocaleUpperCase();
                b = b.toLocaleUpperCase();
            }
            return a.includes(b);
        };
        /**
         * Return the upper case value of a string using the current locale
         */
        Utils.toUpperCase = function (s) {
            if (s) {
                return s.toLocaleUpperCase();
            }
            return "";
        };
        /**
         * Return a string with the first character converted to upper case using the current locale
         */
        Utils.toUpperFirst = function (s) {
            if (s) {
                return s[0].toLocaleUpperCase() + s.substr(1);
            }
            return "";
        };
        /**
         * Return the lower case value of a string using the current locale
         */
        Utils.toLowerCase = function (s) {
            if (s) {
                return s.toLocaleLowerCase();
            }
            return "";
        };
        /**
         * Return a string with the first character converted to lower case using the current locale
         */
        Utils.toLowerFirst = function (s) {
            if (s) {
                return s[0].toLocaleLowerCase() + s.substr(1);
            }
            return "";
        };
        /**
         * Return a string where the first character of each space separated word is converted to upper case.
         * However, if a word contains a full stop character the first character is left unchanged
         */
        Utils.toStartCase = function (text) {
            if (text) {
                var words = text.split(/[\s]+/);
                return words.map(function (value) { return !value.includes(".") ? Utils.toUpperFirst(value) : value; }).join(" ");
            }
            return "";
        };
        /**
         * Return a string where any leading and trailing whitespace characters are removed
         */
        Utils.trim = function (s) {
            if (s) {
                return s.trim();
            }
            return "";
        };
        /**
         * Return a string where any leading whitespace characters are removed
         */
        Utils.trimStart = function (s) {
            if (s) {
                return s.trimStart();
            }
            return "";
        };
        /**
         * Return a string where any trailing whitespace characters are removed
         */
        Utils.trimEnd = function (s) {
            if (s) {
                return s.trimEnd();
            }
            return "";
        };
        /**
         * Return a string truncated to a maximum length. If the length of the string is greater than `maxLength`
         * then it is truncated to `maxLength and a `suffix` appended. Otherwise the string is returned unchanged
         *
         * @param s The string to truncate
         * @param maxLength The maximum length
         * @param suffix The value to append if the string is truncated. The default is `...`
         */
        Utils.truncate = function (s, maxLength, suffix) {
            if (!s) {
                return "";
            }
            suffix = suffix || "...";
            if (s.length <= maxLength) {
                return s;
            }
            return s.substring(0, maxLength - suffix.length) + suffix;
        };
        /**
         * Return a string where any regular expresion operators are escaped
         */
        Utils.regExEscape = function (s) {
            if (!s) {
                return "";
            }
            return s.replace(Utils.regExEscapeRegEx, "\\$&");
        };
        /**
         * Replaces patterns in a string with a replacement string. The pattern can either a string
         * or a `RegExp`.
         *
         * @param s The string in which to search for a pattern
         * @param pattern The pattern
         * @param replacement The replacement string to replace any occurrences of the pattern in the string
         */
        Utils.replace = function (s, pattern, replacement) {
            if (!s || !pattern) {
                return "";
            }
            if (Utils.isRegExp(pattern)) {
                return s.replace(pattern, replacement);
            }
            else {
                return s.replace(new RegExp(Utils.regExEscape(pattern), "g"), replacement);
            }
        };
        /**
         * Split a string into an array of substrings using the passed separators
         *
         * @param s The string to split
         * @param separators One or more separators
         * @param trim If `true` trim any leading and trailing spaces from the substrings
         * @param removeEmpty If `true` exclude any empty strings from the array of substrings
         */
        Utils.split = function (s, separators, trim, removeEmpty) {
            if (trim === void 0) { trim = true; }
            if (removeEmpty === void 0) { removeEmpty = true; }
            if (!s) {
                return [];
            }
            if (!separators) {
                return [s];
            }
            var split;
            if (typeof separators === "string") {
                split = s.split(separators);
                if (trim) {
                    split = split.map(function (value) { return value.trim(); });
                }
            }
            else {
                var rxs = separators.map(function (value) { return Utils.regExEscape(value); }).join("|");
                if (trim) {
                    rxs = "(?:^\\s*)|(?:\\s*(?:" + rxs + ")\\s*)|(?:\\s*$)";
                }
                split = s.split(new RegExp(rxs));
            }
            if (removeEmpty) {
                split = split.filter(function (value) {
                    return !Utils.isEmpty(value);
                });
            }
            return split;
        };
        /**
         * Return a string in kebab case (`CatDog => cat-dog`)
         */
        Utils.toKebabCase = function (text) {
            return kebabCase__default['default'](text);
        };
        /**
         * Return a string in snake case (`CatDog => cat_dog`)
         */
        Utils.toSnakeCase = function (text) {
            return snakeCase__default['default'](text);
        };
        /**
         * Return a string in camel case (`CatDog => catDog`)
         */
        Utils.toCamelCase = function (text) {
            return camelCase__default['default'](text);
        };
        /**
         * Return a string with any diacritics removed
         */
        Utils.removeAccents = function (text) {
            if (!text) {
                return "";
            }
            return diacritics.remove(text);
        };
        /**
         * Return a string in normalized form which can be used to match entity values. A normalized value
         * has any diacritics removed and is converted to upper case
         */
        Utils.normalize = function (text) {
            if (!text) {
                return "";
            }
            return Utils.removeAccents(text).toUpperCase();
        };
        /**
         * Return `true` if a string is valid as a simple value for the Sinequa admininistration
         */
        Utils.isValidSimpleName = function (name) {
            return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
        };
        /**
         * Return `true` if a string is valid as a scoped (`.` separated) simple value for the Sinequa admininistration
         */
        Utils.isValidScopedSimpleName = function (name) {
            return /^[a-zA-Z_]([\.]?[a-zA-Z0-9_]+)*$/.test(name);
        };
        /**
         * Return `true` if a value is `null`, `undefined` or `""`
         */
        Utils.isEmpty = function (value) {
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
        };
        /**
         * Return the number of occurrences of a substring in a string
         *
         * @param text The text to test
         * @param sub The substring
         * @param ignoreCase If `true` don't respect case when matching the substring
         */
        Utils.count = function (text, sub, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = true; }
            if (!text || !sub) {
                return 0;
            }
            if (ignoreCase) {
                text = text.toLocaleUpperCase();
                sub = sub.toLocaleUpperCase();
            }
            var pos = -1;
            var count = 0;
            while (true) {
                pos = text.indexOf(sub, pos + 1);
                if (pos === -1) {
                    break;
                }
                count++;
            }
            return count;
        };
        /**
         * Return a string converted to base64
         */
        Utils.toBase64 = function (value) {
            return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function (match, hex) { return String.fromCharCode(parseInt(hex, 16)); }));
        };
        /**
         * Return a string converted from base64
         */
        Utils.fromBase64 = function (value) {
            return decodeURIComponent(atob(value).split('').map(function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
        };
        /**
         * Return the SHA256 hash value of string
         */
        Utils.sha256 = function (value) {
            var sha = new jsSHA__default['default']("SHA-256", "TEXT");
            sha.update(value);
            return sha.getHash("B64");
        };
        /**
         * Return the SHA512 hash value of string
         */
        Utils.sha512 = function (value) {
            var sha = new jsSHA__default['default']("SHA-512", "TEXT");
            sha.update(value);
            return sha.getHash("B64");
        };
        /**
         * Return a string where any HTML special characters are percent encoded
         */
        Utils.encodeHTML = function (value) {
            return escape__default['default'](value);
        };
        /**
         * Return a string where any percent encoded characters are replaced by their corresponding unencoded characters
         */
        Utils.decodeHTML = function (value) {
            return unescape__default['default'](value);
        };
        /**
         * Get a field with passed name from an object. The field name is matched insensitive of case
         */
        Utils.getField = function (obj, name) {
            if (!Utils.isObject(obj) || Utils.isEmpty(name)) {
                return undefined;
            }
            var keys = Object.keys(obj).filter(function (key) { return Utils.eqNC(key, name); });
            if (keys.length === 0) {
                return undefined;
            }
            return obj[keys[0]];
        };
        /**
         * Clear fields from an object. If the `_delete` parameter is `false` then
         * array or map fields are emptied and other fields are set to `undefined`.
         * If the `_delete` parameter is `true` then fields are deleted
         */
        Utils.clearObject = function (obj, _delete) {
            if (_delete === void 0) { _delete = false; }
            for (var prop in obj) {
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
        };
        /**
         * Return the non-empty fields in the `override` object that that are different to fields of the same name
         * in the `template` object
         * @param template The object to compare against
         * @param override The object defining the fields and values to be compared
         * @param ret An optional return object. If not set a new object is created
         */
        Utils.deltas = function (template, override, ret) {
            var e_2, _a;
            if (!ret) {
                ret = {};
            }
            try {
                for (var _b = __values(Object.keys(override)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name = _c.value;
                    if (name in template) {
                        if (Utils.isObject(override[name]) && !Utils.isArray(override[name])) {
                            var diff = Utils.deltas(template[name], override[name]);
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
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return ret;
        };
        /**
         * Returns an object containing the fields in a source object whose names match one of the passed keys. The keys can either be
         * an array of strings or a callback function that is called for each field in the source object and returns `true` if a field
         * should be "picked".
         *
         * @param obj The source object
         * @param keys An array of keys or a callback function
         */
        Utils.pick = function (obj, keys) {
            var e_3, _a;
            var ret = {};
            if (!!obj) {
                if (Utils.isFunction(keys)) {
                    Object.keys(obj).forEach(function (key) {
                        if (keys(obj[key], key, obj)) {
                            ret[key] = obj[key];
                        }
                    });
                }
                else {
                    try {
                        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                            var key = keys_1_1.value;
                            if (obj.hasOwnProperty(key)) {
                                ret[key] = obj[key];
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            return ret;
        };
        /**
         * Create a debounce function that delays invoking `func` until after `wait` millseconds have elapsed since the previous invocation.
         *
         * @param func The function to debounce
         * @param wait The delay in milliseconds to wait before calling `func`
         * @param immediate If `true` then make an initial call to `func`
         * @param every An optional callback to call without debouncing
         */
        Utils.debounce = function (func, wait, immediate, every) {
            if (wait === void 0) { wait = 0; }
            if (immediate === void 0) { immediate = false; }
            var timeout, args, context, timestamp, result;
            var later = function () {
                var last = Date.now() - timestamp;
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
                var callNow = immediate && !timeout;
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                if (callNow) {
                    result = func.apply(context, args);
                    context = args = null;
                }
                return result;
            };
        };
        /**
         * Create a throttled function that only invokes func at most once per every `wait` milliseconds.
         *
         * @param func The function to throttle
         * @param wait The number of milliseconds to throttle invocations to
         * @param options Options to control the throttling behaviour
         */
        Utils.throttle = function (func, wait, options) {
            if (options === void 0) { options = {}; }
            var timeout, context, args, result;
            var previous = 0;
            var later = function () {
                previous = options.leading === false ? 0 : Date.now();
                timeout = null;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            };
            var throttled = function () {
                var now = Date.now();
                if (!previous && options.leading === false)
                    previous = now;
                var remaining = wait - (now - previous);
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
        };
        /**
         * Create a function that calls `callback` the next time the browser next repaints
         */
        Utils.frame = function (callback) {
            return function () {
                var params = [];
                for (var _a = 0; _a < arguments.length; _a++) {
                    params[_a] = arguments[_a];
                }
                if (Utils.frameTasks.size === 0) {
                    requestAnimationFrame(function (timestamp) {
                        Utils.frameTasks.forEach(function (task, key, map) {
                            task.call();
                        });
                        Utils.frameTasks.clear();
                    });
                }
                var task = Utils.frameTasks.get(callback);
                if (task) {
                    // Update params
                    task.params = params;
                }
                else {
                    // Add new task
                    Utils.frameTasks.set(callback, new FrameTask(callback, params));
                }
            };
        };
        /**
         * Create a URL object from a `url` string. If the string is a relative url then
         * `base` specifies the base to use
         */
        Utils.makeURL = function (url, base) {
            if (!base) {
                base = "http://x.y.z"; // Firefox and IOS need this
            }
            return new URL(url, base);
        };
        /**
         * Add query string parameters to a url
         *
         * @param url The url to which to add the parameters
         * @param params An object whose fields should be added as parameters
         */
        Utils.addSearchParams = function (url, params) {
            if (!url || !params) {
                return url;
            }
            var urlObj = Utils.makeURL(url);
            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    urlObj.searchParams.set(param, params[param]);
                }
            }
            var index = url.indexOf("?");
            if (index !== -1) {
                url = url.substr(0, index);
            }
            url += "?" + urlObj.searchParams.toString();
            return url;
        };
        Utils._addUrl = function (url, path) {
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
        };
        /**
         * Add paths to a url adding path separators as necessary
         *
         * @param url The url
         * @param paths One or more paths to add to the url
         */
        Utils.addUrl = function (url) {
            var e_4, _a;
            var paths = [];
            for (var _b = 1; _b < arguments.length; _b++) {
                paths[_b - 1] = arguments[_b];
            }
            var _url = url;
            try {
                for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                    var path = paths_1_1.value;
                    _url = Utils._addUrl(_url, path);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return _url;
        };
        /**
         * Return `true` if a url is absolute
         */
        Utils.isUrlAbsolute = function (url) {
            return /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/.test(url);
        };
        /**
         * Return an `HttpParams` object containing the fields in the passed object
         */
        Utils.makeHttpParams = function (params) {
            var httpParams = new http.HttpParams({ encoder: new SqHttpParameterCodec() });
            if (params) {
                for (var param in params) {
                    if (params.hasOwnProperty(param)) {
                        var _value = params[param];
                        var value = "";
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
        };
        /**
         * Return a string with HTML special characters escaped
         *
         * @param html The string to escape
         */
        Utils.escapeHtml = function (html) {
            if (!html) {
                return html;
            }
            if (!Utils.escapeDiv) {
                Utils.escapeDiv = document.createElement("div");
            }
            var textNode = Utils.escapeDiv.appendChild(document.createTextNode(html));
            var escapedHtml = Utils.escapeDiv.innerHTML;
            Utils.escapeDiv.removeChild(textNode);
            return escapedHtml;
        };
        /**
         * Move an element in an array
         *
         * @param array The array containing the element to move
         * @param from The index of the element to move
         * @param to The index that the element should be moved to
         */
        Utils.arrayMove = function (array, from, to) {
            if (to === from) {
                return;
            }
            array.splice(to, 0, array.splice(from, 1)[0]);
        };
        /**
         * Set the contents of a target array to the contents of a source array
         *
         * @param target The target array
         * @param source The source array
         */
        Utils.arraySet = function (target, source) {
            return target.splice.apply(target, [0, target.length].concat(source));
        };
        Utils.genericNext = function (value) {
        };
        Utils.genericError = function (error) {
        };
        Utils.genericComplete = function () {
        };
        /**
         * A simple wrapped around `Observable.subscribe`
         */
        Utils.subscribe = function (observable, next, error, complete) {
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
        };
        /**
         * Return a value as a `Date` converting as necessary. If the value
         * cannot be converted then `undefined` is returned
         */
        Utils.asDate = function (value) {
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
        };
        /**
         * Return a value as a `number` converting as necessary. If the value
         * cannot be converted then `undefined` is returned.
         */
        Utils.asNumber = function (value) {
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
        };
        /**
         * Return a value as a `string` converting as necessary
         */
        Utils.asString = function (value) {
            if (!value && value !== "") {
                return undefined;
            }
            if (Utils.isString(value)) {
                return value;
            }
            return value.toString();
        };
        /**
         * Return `true` if a string represents an integer
         */
        Utils.testInteger = function (str) {
            return /^(\-|\+)?([0-9]+)$/.test(str);
        };
        /**
         * Return `true` if a string represents a floating point number
         */
        Utils.testFloat = function (str) {
            return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str);
        };
        /**
         * Round the passed number away from zero: 4.5 => 5, -4.5 => -5
         */
        Utils.roundAway = function (num) {
            return num >= 0 ? Math.round(num) : Math.sign(num) * Math.round(Math.abs(num));
        };
        Utils.matchSuffix = function (str, factor) {
            var e_5, _a;
            var suffixes = [];
            for (var _b = 2; _b < arguments.length; _b++) {
                suffixes[_b - 2] = arguments[_b];
            }
            try {
                for (var suffixes_1 = __values(suffixes), suffixes_1_1 = suffixes_1.next(); !suffixes_1_1.done; suffixes_1_1 = suffixes_1.next()) {
                    var suffix = suffixes_1_1.value;
                    if (Utils.endsWith(str, suffix)) {
                        return {
                            str: Utils.trimEnd(str.substr(0, str.length - suffix.length)),
                            factor: factor
                        };
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (suffixes_1_1 && !suffixes_1_1.done && (_a = suffixes_1.return)) _a.call(suffixes_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return undefined;
        };
        /**
         * Convert a size in string form to a number in bytes.
         *
         * The following units are supported: `b`, `kb`, `mb`, `gb`, `tb`, `pb`
         *
         * For example `2.5 gb` will return `2621440`.
         */
        Utils.toSize = function (str, _default) {
            if (_default === void 0) { _default = 0; }
            str = Utils.trim(str);
            if (!str) {
                return _default;
            }
            var factor = 1;
            var ret = Utils.matchSuffix(str, 1024 * 1024 * 1024 * 1024 * 1024, "PB", "PO");
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
            var value = Utils.toNumber(str, _default) * factor;
            return Math.round(value);
        };
        Utils.calculateDuration = function (current, unit) {
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
        };
        /**
         * Convert a duration in string form to a number in milliseconds.
         *
         * These units are supported: `days`, `hours`, `minutes`, `seconds`, `milliseconds` (abbreviations are also supported)
         *
         * For example `3 h 2mins 4s => 10924000`
         *
         * @param defaultUnit The unit to use if no units are in the string. The default value is `ms`
         */
        Utils.toDuration = function (str, defaultUnit) {
            var e_6, _a;
            if (defaultUnit === void 0) { defaultUnit = "ms"; }
            var total = 0;
            if (str) {
                var current = 0;
                var tokens = str.match(/[0-9\.,]+|[a-zA-Z]+/g) || [];
                try {
                    for (var tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                        var token = tokens_1_1.value;
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
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                if (current) {
                    total += Utils.calculateDuration(current, defaultUnit);
                }
            }
            return total;
        };
        return Utils;
    }());
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

    (function (SqErrorCode) {
        SqErrorCode[SqErrorCode["loginCancelled"] = 0] = "loginCancelled";
        SqErrorCode[SqErrorCode["processedCredentialsError"] = 1] = "processedCredentialsError";
        SqErrorCode[SqErrorCode["principalSwitched"] = 2] = "principalSwitched";
        SqErrorCode[SqErrorCode["autoLoginError"] = 3] = "autoLoginError";
    })(exports.SqErrorCode || (exports.SqErrorCode = {}));
    /**
     * A subclass of the built-in {@link Error} class with added `code` and
     * `data` (optional) properties.
     */
    var SqError = /** @class */ (function (_super) {
        __extends(SqError, _super);
        function SqError(code, message, data) {
            var _this = _super.call(this, message || SqError.message(code)) || this;
            _this.code = code;
            _this.name = "SqError";
            _this.message = message || SqError.message(code);
            if (data) {
                _this.data = data;
            }
            return _this;
        }
        /**
         * Return `true` if the passed `error` is a valid `SqErrorCode` instance.
         * If the optional `code` parameter is defined then only return true
         * if the code on `error` matches this value.
         */
        SqError.is = function (error, code) {
            if (error instanceof SqError || (error instanceof Error && error.name === "SqError")) {
                return Utils.isUndefined(code) || error.code === code;
            }
            return false;
        };
        /**
         * Return the message corresponding to the passed error `code`.
         */
        SqError.message = function (code) {
            switch (code) {
                case exports.SqErrorCode.loginCancelled: return "msg#error.loginCancelled";
                case exports.SqErrorCode.processedCredentialsError: return "msg#error.processedCredentialsError";
                case exports.SqErrorCode.principalSwitched: return "msg#error.principalSwitched";
                case exports.SqErrorCode.autoLoginError: return "msg#error.autoLoginError";
                default: return "msg#error.unknownError";
            }
        };
        return SqError;
    }(Error));

    var IteratorAdaptor = /** @class */ (function () {
        function IteratorAdaptor(base, adaptor) {
            var _this = this;
            this.base = base;
            this.adaptor = adaptor;
            this.return = (base.return) ? function (v) { return _this.translate(_this.base.return(v)); } : undefined;
            this.throw = (base.throw) ? function (e) { return _this.translate(_this.base.throw(e)); } : undefined;
        }
        IteratorAdaptor.forIterable = function (iterable, adaptor) {
            /*if (iterable === undefined) {
                return undefined;
            }*/
            return new IteratorAdaptor(iterable[Symbol.iterator](), adaptor);
        };
        IteratorAdaptor.prototype.translate = function (result) {
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
        };
        IteratorAdaptor.prototype.next = function (value) { return this.translate(this.base.next(value)); };
        IteratorAdaptor.prototype[Symbol.iterator] = function () { return this; };
        return IteratorAdaptor;
    }());

    var ArrayBasedView = /** @class */ (function () {
        function ArrayBasedView(base, nameSelector, valueSelector) {
            this.base = base;
            this.nameSelector = nameSelector;
            this.valueSelector = valueSelector;
        }
        Object.defineProperty(ArrayBasedView.prototype, "length", {
            get: function () {
                return this.base.length;
            },
            enumerable: false,
            configurable: true
        });
        ArrayBasedView.prototype.get = function (index) {
            return this.toNameValuePair(this.base[index]);
        };
        ArrayBasedView.prototype.getName = function (index) {
            return this.nameSelector(this.base[index]);
        };
        ArrayBasedView.prototype.getValue = function (index) {
            return this.valueSelector(this.base[index]);
        };
        ArrayBasedView.prototype.toNameValuePair = function (obj) {
            return { name: this.nameSelector(obj), value: this.valueSelector(obj) };
        };
        /*
            Iterators
        */
        ArrayBasedView.prototype[Symbol.iterator] = function () {
            return this.items();
        };
        ArrayBasedView.prototype.items = function () {
            var _this = this;
            return IteratorAdaptor.forIterable(this.base, function (obj) { return _this.toNameValuePair(obj); });
        };
        ArrayBasedView.prototype.names = function () {
            return IteratorAdaptor.forIterable(this.base, this.nameSelector);
        };
        ArrayBasedView.prototype.values = function () {
            return IteratorAdaptor.forIterable(this.base, this.valueSelector);
        };
        ArrayBasedView.prototype.forEach = function (callback, thisArg) {
            for (var idx = 0; idx < this.length; idx++) {
                var r = this.get(idx);
                if (thisArg)
                    callback.call(thisArg, r, idx, this);
                else
                    callback(r, idx, this);
            }
            return this;
        };
        return ArrayBasedView;
    }());
    /**
     * A helper class for creating {@link NameValueArrayView} instances
     */
    // @dynamic
    var NameValueArrayViewHelper = /** @class */ (function () {
        function NameValueArrayViewHelper() {
        }
        /**
         * Creates a {@link NameValueArrayView} from an array of {@link NameValuePair} items
         *
         * @param items An array of `NameValuePair` items
         */
        NameValueArrayViewHelper.fromArray = function (items) {
            return new ArrayBasedView(items || [], function (p) { return p.name; }, function (p) { return p.value; });
        };
        NameValueArrayViewHelper.fromObjects = function (items, nameKey, valueKey) {
            return new ArrayBasedView(items || [], function (p) { return p[nameKey]; }, function (p) { return p[valueKey]; });
        };
        NameValueArrayViewHelper.from = function (items, nameSelector, valueSelector) {
            return new ArrayBasedView(items || [], nameSelector, valueSelector);
        };
        return NameValueArrayViewHelper;
    }());

    /**
     * An enumeration of keyboard code values
     */
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
    })(exports.Keys || (exports.Keys = {}));

    (function (PatternType) {
        PatternType[PatternType["Empty"] = 0] = "Empty";
        PatternType[PatternType["RegExp"] = 1] = "RegExp";
        // WildCard = 2,
        PatternType[PatternType["Value"] = 3] = "Value";
    })(exports.PatternType || (exports.PatternType = {}));
    /**
     * A class that represents a single pattern. The pattern type is deduced automatically from the input pattern text.
     *
     * `<empty string>` => `Empty`
     * `<pattern with wildcards ?*>` => `RegExp` (wildcards are converted to regular expressions)
     * `<pattern starting with ~>` => `RegExp` (the text following the ~ character is treated as a regular expression)
     * `<any other value>` => `Value` (a literal value that is matched as-is)
     */
    var Pattern = /** @class */ (function () {
        function Pattern(pattern) {
            if (!pattern) {
                this.clear();
            }
            else {
                this.load(pattern);
            }
        }
        Object.defineProperty(Pattern.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Pattern.prototype, "text", {
            get: function () {
                return this._text;
            },
            enumerable: false,
            configurable: true
        });
        Pattern.getPatternType = function (pattern) {
            if (!pattern) {
                return exports.PatternType.Empty;
            }
            if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
                return exports.PatternType.RegExp;
            }
            return exports.PatternType.Value;
        };
        Pattern.isPattern = function (pattern) {
            if (!pattern) {
                return false;
            }
            if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
                return true;
            }
            return false;
        };
        Pattern.doMatch = function (pattern, text) {
            var _pattern = new Pattern();
            _pattern.load(pattern);
            return _pattern.isMatch(text);
        };
        Pattern.wildcardToRegex = function (pattern) {
            if (!pattern) {
                return pattern;
            }
            return "^" + Utils.regExEscape(pattern).replace("\\*", ".*").replace("\\?", ".") + "$";
        };
        Pattern.cleanPattern = function (s) {
            var e_1, _b;
            if (!s) {
                return s;
            }
            var sb = [];
            var lastIsStar = false;
            try {
                for (var s_1 = __values(s), s_1_1 = s_1.next(); !s_1_1.done; s_1_1 = s_1.next()) {
                    var ch = s_1_1.value;
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (s_1_1 && !s_1_1.done && (_b = s_1.return)) _b.call(s_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return sb.join("");
        };
        Pattern.prototype.clear = function () {
            this.reg = undefined;
            this._text = undefined;
            this.preparedPattern1 = undefined;
            // this.preparedPattern2 = undefined;
            this._type = exports.PatternType.Empty;
        };
        Pattern.prototype.isEmpty = function () {
            return this._type === exports.PatternType.Empty;
        };
        Pattern.prototype.load = function (pattern) {
            this.clear();
            try {
                var s = pattern;
                this._text = pattern;
                this._type = Pattern.getPatternType(s);
                if (this._type === exports.PatternType.Empty) {
                    return true;
                }
                if (this._type === exports.PatternType.Value) {
                    this.preparedPattern1 = s;
                    return true;
                }
                if (this._type === exports.PatternType.RegExp) {
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
                console.log("Pattern.Load '" + pattern + "' error:", e);
                this.clear();
                return false;
            }
        };
        Pattern.prototype.getTypeValueText = function () {
            if (this.type === exports.PatternType.Value) {
                return this.preparedPattern1;
            }
            return undefined;
        };
        Pattern.prototype.getTypeRegexPattern = function () {
            if (this.type === exports.PatternType.RegExp) {
                return this.preparedPattern1;
            }
            return undefined;
        };
        Pattern.prototype.isTypeValue = function () {
            return this.type === exports.PatternType.Value;
        };
        Pattern.prototype.isMatch = function (text) {
            var _a;
            text = text || "";
            switch (this._type) {
                default:
                case exports.PatternType.Empty:
                    return true;
                case exports.PatternType.Value:
                    return Utils.eqNC(text, this.preparedPattern1 || "");
                case exports.PatternType.RegExp:
                    return ((_a = this.reg) === null || _a === void 0 ? void 0 : _a.test(text)) || false;
            }
        };
        return Pattern;
    }());
    var Patterns = /** @class */ (function () {
        function Patterns(text) {
            this.text = text;
        }
        Patterns.prototype.clear = function () {
            this._preparedPatterns = undefined;
            this._values = undefined;
            this._isEmpty = true;
        };
        Object.defineProperty(Patterns.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                if (value === this._text) {
                    return;
                }
                this._text = value;
                var l = Utils.split(this._text || "", ";");
                this.innerSetList(l);
            },
            enumerable: false,
            configurable: true
        });
        Patterns.prototype.getTypeCount = function (type) {
            var e_2, _b;
            if (!this._preparedPatterns) {
                return 0;
            }
            if (type === exports.PatternType.Value) {
                return !!this._values ? Object.keys(this._values).length : 0;
            }
            var count = 0;
            try {
                for (var _c = __values(this._preparedPatterns), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var pattern = _d.value;
                    if (pattern.type === type) {
                        count++;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return count;
        };
        Patterns.prototype.innerSetList = function (l) {
            var e_3, _b;
            this._preparedPatterns = undefined;
            this._values = undefined;
            this._isEmpty = true;
            if (!!l) {
                try {
                    for (var l_1 = __values(l), l_1_1 = l_1.next(); !l_1_1.done; l_1_1 = l_1.next()) {
                        var s = l_1_1.value;
                        if (!s) {
                            continue;
                        }
                        var pattern = new Pattern();
                        if (pattern.load(s)) {
                            if (!this._preparedPatterns) {
                                this._preparedPatterns = [];
                            }
                            this._preparedPatterns.push(pattern);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (l_1_1 && !l_1_1.done && (_b = l_1.return)) _b.call(l_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            if (this._preparedPatterns) {
                var c = this._preparedPatterns.length;
                if (c > 0) {
                    this._isEmpty = false;
                }
                for (var i = c - 1; i >= 0; i--) {
                    var pattern = this._preparedPatterns[i];
                    //do values
                    if (pattern.isTypeValue()) {
                        if (!this._values) {
                            this._values = {};
                        }
                        var val = pattern.getTypeValueText() || "";
                        this._values[val] = true;
                        this._preparedPatterns.splice(i, 1);
                    }
                }
            }
        };
        Object.defineProperty(Patterns.prototype, "list", {
            get: function () {
                return Utils.split(this.text || "", ";");
            },
            set: function (value) {
                this.text = !!value ? value.join(";") : undefined;
                this.innerSetList(value);
            },
            enumerable: false,
            configurable: true
        });
        Patterns.prototype.setText = function (list) {
            this.list = list;
        };
        Patterns.prototype.isEmpty = function () {
            return this._isEmpty;
        };
        Patterns.prototype.hasPatterns = function () {
            return !this.isEmpty();
        };
        Patterns.prototype.isMatch = function (name, logdisplay) {
            var e_4, _b;
            if (this.isEmpty()) {
                return true;
            }
            if (!!this._values) {
                if (this._values[name]) {
                    if (!!logdisplay) {
                        console.log(logdisplay, " : the pattern '" + name + "' matches the value '" + name + "'");
                    }
                    return true;
                }
            }
            if (!!this._preparedPatterns) {
                try {
                    for (var _c = __values(this._preparedPatterns), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var pattern = _d.value;
                        if (!pattern) {
                            continue;
                        }
                        if (pattern.isTypeValue()) {
                            continue;
                        }
                        if (pattern.isMatch(name)) {
                            if (!!logdisplay) {
                                console.log(logdisplay, " : the pattern '" + pattern.text + "' matches the value '" + name + "'");
                            }
                            return true;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            return false;
        };
        return Patterns;
    }());
    /**
     * This class is used to process "included" and "excluded" patterns typically specified in the Sinequa configuration.
     */
    var PatternMatcher = /** @class */ (function () {
        function PatternMatcher(includedLogDisplay, excludedLogDisplay) {
            this.includedPattern = new Patterns();
            this.excludedPattern = new Patterns();
            this.includedLogDisplay = includedLogDisplay;
            this.excludedLogDisplay = excludedLogDisplay;
        }
        Object.defineProperty(PatternMatcher.prototype, "included", {
            get: function () {
                return this.includedPattern.text;
            },
            set: function (value) {
                this.includedPattern.text = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatternMatcher.prototype, "excluded", {
            get: function () {
                return this.excludedPattern.text;
            },
            set: function (value) {
                this.excludedPattern.text = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatternMatcher.prototype, "includedList", {
            set: function (value) {
                this.includedPattern.list = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PatternMatcher.prototype, "excludedList", {
            set: function (value) {
                this.excludedPattern.list = value;
            },
            enumerable: false,
            configurable: true
        });
        PatternMatcher.prototype.hasPatterns = function () {
            return this.includedPattern.hasPatterns() || this.excludedPattern.hasPatterns();
        };
        PatternMatcher.prototype.isExcluded = function (name) {
            return !this.isIncluded(name);
        };
        PatternMatcher.prototype.isIncluded = function (name) {
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
        };
        PatternMatcher.prototype.isExplicitlyIncluded = function (name) {
            return this.includedPattern.hasPatterns() && this.includedPattern.isMatch(name, this.includedLogDisplay);
        };
        PatternMatcher.prototype.isExplicitlyExcluded = function (name) {
            return this.excludedPattern.hasPatterns() && this.excludedPattern.isMatch(name, this.excludedLogDisplay);
        };
        return PatternMatcher;
    }());

    focusWithin__default['default'](document);
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
                    }, "relativeFromTo": function (lhs, rhs) {
                        var newLeft = left, newTop = top;
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
            var parent, elem = this, area = makeArea(this.offsetLeft, this.offsetTop, this.offsetWidth, this.offsetHeight);
            while ((parent = elem.parentNode) instanceof HTMLElement) {
                var clientLeft = parent.offsetLeft + parent.clientLeft;
                var clientTop = parent.offsetTop + parent.clientTop;
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
            var evt = document.createEvent('CustomEvent');
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
        var fakeStorage = {};
        var storage;
        var needed = false;
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
        var dispatchStorageEvent = function (key, newValue) {
            var oldValue = (!key) ? null : storage.getItem(key);
            var url = location.href.substr(location.origin.length);
            var storageEvent = document.createEvent("StorageEvent"); // For IE, http://stackoverflow.com/a/25514935/1214183
            storageEvent["initStorageEvent"]("storage", false, false, key, oldValue, newValue, url, storage);
            window.dispatchEvent(storageEvent);
        };
        storage.key = function (i) {
            var key = Object.keys(fakeStorage)[i];
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
            var x;
            var y;
            var width;
            var height;
            var left;
            var right;
            var top;
            var bottom;
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
            var el = this;
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
    var BaseModule = /** @class */ (function () {
        function BaseModule() {
        }
        return BaseModule;
    }());
    BaseModule.ɵmod = i0.ɵɵdefineNgModule({ type: BaseModule });
    BaseModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BaseModule_Factory(t) { return new (t || BaseModule)(); }, imports: [[]] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BaseModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BaseModule = BaseModule;
    exports.IteratorAdaptor = IteratorAdaptor;
    exports.NameValueArrayViewHelper = NameValueArrayViewHelper;
    exports.Pattern = Pattern;
    exports.PatternMatcher = PatternMatcher;
    exports.Patterns = Patterns;
    exports.SqError = SqError;
    exports.Timer = Timer;
    exports.Utils = Utils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-base.umd.js.map
