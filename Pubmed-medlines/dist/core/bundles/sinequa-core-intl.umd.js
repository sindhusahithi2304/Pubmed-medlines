(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/base'), require('rxjs'), require('rxjs/operators'), require('intl-messageformat'), require('intl-format-cache'), require('@formatjs/intl-relativetimeformat/polyfill'), require('intl-pluralrules'), require('lodash/get'), require('d3-format'), require('d3-time-format'), require('d3'), require('moment'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/intl', ['exports', '@angular/core', '@sinequa/core/base', 'rxjs', 'rxjs/operators', 'intl-messageformat', 'intl-format-cache', '@formatjs/intl-relativetimeformat/polyfill', 'intl-pluralrules', 'lodash/get', 'd3-format', 'd3-time-format', 'd3', 'moment', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core.intl = {}), global.ng.core, global.sinequa.core.base, global.rxjs, global.rxjs.operators, global.IntlMessageFormat, global.memoizeFormatConstructor, null, null, global.get, global.d3Format, global.d3TimeFormat, global.d3, global.moment, global.ng.common));
}(this, (function (exports, i0, base, rxjs, operators, IntlMessageFormat, memoizeFormatConstructor, polyfill, intlPluralrules, get, d3Format, d3TimeFormat, d3, moment, common) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var IntlMessageFormat__default = /*#__PURE__*/_interopDefaultLegacy(IntlMessageFormat);
    var memoizeFormatConstructor__default = /*#__PURE__*/_interopDefaultLegacy(memoizeFormatConstructor);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

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

    // moment locales need moment set globally
    window.moment = moment__default['default'];

    /**
     * @ignore
     */
    var formatters = {
        getMessageFormat: memoizeFormatConstructor__default['default'](IntlMessageFormat__default['default']),
        getNumberFormat: memoizeFormatConstructor__default['default'](Intl.NumberFormat),
        getDateTimeFormat: memoizeFormatConstructor__default['default'](Intl.DateTimeFormat),
        getRelativeTimeFormat: memoizeFormatConstructor__default['default'](Intl.RelativeTimeFormat),
        getPluralRules: memoizeFormatConstructor__default['default'](Intl.PluralRules)
    };
    /**
     * @ignore
     */
    var DATE_TIME_FORMAT_OPTIONS = [
        "dateStyle",
        "timeStyle",
        "localeMatcher",
        "timeZone",
        "hour12",
        "hourCycle",
        "formatMatcher",
        "weekday",
        "era",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "timeZoneName",
    ];
    /**
     * @ignore
     */
    var NUMBER_FORMAT_OPTIONS = [
        "localeMatcher",
        "style",
        "currency",
        "currencyDisplay",
        "useGrouping",
        "minimumIntegerDigits",
        "minimumFractionDigits",
        "maximumFractionDigits",
        "minimumSignificantDigits",
        "maximumSignificantDigits",
    ];
    /**
     * @ignore
     */
    var RELATIVE_TIME_FORMAT_OPTIONS = [
        "localeMatcher",
        "numeric",
        "style"
    ];
    /**
     * An injection token used to initialize the [locales configuration]{@link LocalesConfig} of {@link IntlModule}
     */
    var LOCALES_CONFIG = new i0.InjectionToken('LOCALES_CONFIG');
    /**
     * An injection token used to initialize the [general configuration]{@link IntlConfig} of {@link IntlModule}
     */
    var INTL_CONFIG = new i0.InjectionToken('INTL_CONFIG');
    /**
     * Default custom ICU Message formats
     */
    var DEFAULT_FORMATS = {
        date: {
            sqDateTime: {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            },
            sqDate: {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            },
            sqYear: {
                year: "numeric"
            },
            sqMonthYear: {
                month: "short",
                year: "numeric"
            }
        },
        time: {},
        number: {
            sqWeek: {
                minimumIntegerDigits: 2,
                useGrouping: false
            },
            sqYear: {
                useGrouping: false
            },
            sqNoGrouping: {
                useGrouping: false
            },
            sqZeroDecimalPlaces: {
                maximumFractionDigits: 0
            },
            sqOneDecimalPlace: {
                maximumFractionDigits: 1
            },
            sqTwoDecimalPlaces: {
                maximumFractionDigits: 2
            },
            sqThreeDecimalPlaces: {
                maximumFractionDigits: 3
            },
            sqFourDecimalPlaces: {
                maximumFractionDigits: 4
            },
            sqFiveDecimalPlaces: {
                maximumFractionDigits: 5
            }
        }
    };
    /* eslint-disable jsdoc/check-alignment,jsdoc/check-indentation,jsdoc/newline-after-description */
    /**
     * This service provides methods for managing locales and for formatting dates, numbers and strings using
     * [ICU Message syntax]{@link https://formatjs.io/guides/message-syntax/}. [Messages]{@link LocaleData#messages} stored
     * in a locale's data are referenced using a key in the following form: `msg#<JSONPath>`. Given the following messages:
    ``` json
    {
        "myComponent": {
            "title": "Component: {name}",
            "footer": "Created on {created, date, medium} by {author}"
        }
    }
    ```
     * this key: `msg#myComponent.footer` references myComponent's footer message. The message itself uses
     * ICU Message syntax.
     *
     * This service registers a number of [default custom ICU formats]{@link DEFAULT_FORMATS}. These can be overridden or
     * extended by providing the [INTL_CONFIG]{@link INTL_CONFIG} injection token.
     */
    /* eslint-enable jsdoc/check-alignment, jsdoc/check-indentation, jsdoc/newline-after-description */
    var IntlService = /** @class */ (function () {
        function IntlService(intlConfig, localesConfig) {
            this.intlConfig = intlConfig;
            this.localesConfig = localesConfig;
            /**
             * The prefix for ICU messages to be retrieved from [LocaleData.messages]{@link LocaleData#messages}
             * by {@link formatMessage}
             */
            this.messagePrefix = "msg#";
            /**
             * An alternative prefix for inline ICU messages processed by {@link formatMessage}
             */
            this.textPrefix = "txt#";
            if (!this.intlConfig) {
                this.intlConfig = {};
            }
            if (!localesConfig) {
                if (!localesConfig) {
                    console.error("LOCALES_CONFIG has not been provided by the calling app. " +
                        "Please import IntlModule using the forRoot method to which you should pass a LocalesConfig object");
                }
            }
            this._events = new rxjs.Subject();
            this.locales = localesConfig.locales || [localesConfig.defaultLocale];
        }
        IntlService.getLanguage = function (name) {
            var sepPos = name.indexOf("-");
            if (sepPos === -1) {
                return name;
            }
            return name.substring(0, sepPos);
        };
        IntlService.getBrowserLanguages = function () {
            if (navigator.languages) {
                return navigator.languages;
            }
            var language = navigator.language || navigator.userLanguage ||
                navigator.browserLanguage || navigator.systemLanguage;
            return !!language ? [language] : [];
        };
        IntlService.prototype.ngOnDestroy = function () {
            this._events.complete();
        };
        Object.defineProperty(IntlService.prototype, "events", {
            /**
             * The observable events emitted by this service
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        IntlService.prototype.getInitialLocale = function () {
            var language = window.localStorage.getItem("sinequa-locale");
            var languages = !!language ? [language] : IntlService.getBrowserLanguages();
            var locale = this.getLocale(languages);
            if (locale) {
                return locale;
            }
            locale = this.getLocale(languages, true);
            if (locale) {
                return locale;
            }
            return this.localesConfig.defaultLocale;
        };
        /**
         * Initialize the service. The current locale is initialized to either the `sinequa-locale` local
         * storage value, the browser language or the default locale.
         *
         * This method is called automatically by the {@link IntlModule} at application startup.
         *
         * @return An observable of the current locale
         */
        IntlService.prototype.init = function () {
            // Set up formats
            this.formats = base.Utils.merge(DEFAULT_FORMATS, this.intlConfig.formats);
            // Load default locale
            var observable = this.use(this.localesConfig.defaultLocale.name, false);
            var initialLocale = this.getInitialLocale();
            if (initialLocale !== this.localesConfig.defaultLocale) {
                // Load initial locale if different to default
                console.log("Setting initial locale: ", initialLocale.name);
                observable = rxjs.concat(observable, this.use(initialLocale.name, false)).pipe(operators.last());
            }
            base.Utils.subscribe(observable, function (value) {
                console.log("Initial locale set: ", value);
            });
            return observable;
        };
        IntlService.prototype.loadData = function (locale) {
            if (!this.localesConfig.loadLocale) {
                return rxjs.throwError("Dynamic locale loading has not been implemented in the calling app - " +
                    "please add a loadLocale handler to your LocalesConfig");
            }
            return this.localesConfig.loadLocale(locale);
        };
        IntlService.prototype.getLocale = function (names, approximate) {
            var e_1, _a;
            if (approximate === void 0) { approximate = false; }
            if (typeof names === "string") {
                names = [names];
            }
            var _loop_1 = function (name) {
                var locale = this_1.locales.find(function (locale1) {
                    if (locale1.name === name) {
                        return true;
                    }
                    if (approximate && IntlService.getLanguage(locale1.name) === IntlService.getLanguage(name)) {
                        return true;
                    }
                    return false;
                });
                if (locale) {
                    return { value: locale };
                }
            };
            var this_1 = this;
            try {
                for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                    var name = names_1_1.value;
                    var state_1 = _loop_1(name);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return undefined;
        };
        /**
         * Change the current locale. The change is made asynchronously as the locale may need to be
         * downloaded. The current locale is optionally stored in local storage (`sinequa-locale`)
         * to be picked up the next time the service is initialized
         *
         * @param locale The name of the locale to use
         * @param store If `true` the current locale is stored in local storage
         */
        IntlService.prototype.use = function (locale, store) {
            var _this = this;
            if (store === void 0) { store = true; }
            var newLocale = this.getLocale(locale);
            if (!newLocale) {
                return rxjs.throwError({ error: "unsupported locale" });
            }
            var observable = !!newLocale.data ? rxjs.of(newLocale.data) : this.loadData(locale);
            base.Utils.subscribe(observable, function (data) {
                _this.currentLocale = newLocale;
                if (store) {
                    window.localStorage.setItem("sinequa-locale", _this.currentLocale.name);
                }
                _this.direction = _this.currentLocale.direction || "ltr";
                if (!_this.currentLocale.data) {
                    _this.currentLocale.data = data;
                }
                // Set moment locale
                if (_this.currentLocale.data.moment) {
                    // Set (and define if necessary) moment locale (it auto-defines when we are not bundled)
                    if (moment__default['default'].locale(_this.currentLocale.data.moment.locale) !== _this.currentLocale.data.moment.locale) {
                        console.log("moment locale not defined: " + _this.currentLocale.data.moment.locale + " - defaulting to en");
                        moment__default['default'].locale("en");
                    }
                }
                else {
                    moment__default['default'].locale("en");
                }
                // Set d3 locale
                if (_this.currentLocale.data.d3) {
                    d3Format.formatDefaultLocale(_this.currentLocale.data.d3.format);
                    d3TimeFormat.timeFormatDefaultLocale(_this.currentLocale.data.d3.time);
                    d3.formatDefaultLocale(_this.currentLocale.data.d3.format);
                    d3.timeFormatDefaultLocale(_this.currentLocale.data.d3.time);
                }
                if (_this.currentLocale.data.intl && _this.currentLocale.data.intl.locale) {
                    _this.intlLocale = _this.currentLocale.data.intl.locale;
                }
                else {
                    _this.intlLocale = _this.localesConfig.defaultLocale.data ? _this.localesConfig.defaultLocale.data.intl.locale : "en";
                }
                return rxjs.of(_this.intlLocale);
            });
            var observable2 = observable.pipe(operators.map(function (value) {
                return _this.currentLocale.name;
            }));
            base.Utils.subscribe(observable2, function (name) {
                _this._events.next({ locale: name });
            });
            return observable2;
        };
        IntlService.prototype.getDefaultMessages = function () {
            var _default = this.locales.find(function (value) { return !!value.data && !!value.data.messages; });
            if (_default) {
                return _default.data && _default.data.messages;
            }
            return {};
        };
        IntlService.prototype.getMessages = function () {
            var messages;
            if (this.currentLocale && this.currentLocale.data) {
                messages = this.currentLocale.data.messages;
            }
            if (!messages) {
                messages = this.getDefaultMessages();
            }
            return messages;
        };
        /**
         * Get the message from the current locale that corresponds to the passed `key`.
         * If the is not prefixed by {@link messagePrefix} then `null` is returned
         *
         * @param key The message key
         */
        IntlService.prototype.getMessage = function (key) {
            if (!base.Utils.startsWith(key, this.messagePrefix)) {
                return undefined;
            }
            key = key.substr(this.messagePrefix.length);
            var messages = this.getMessages();
            var message = get__default['default'](messages, key);
            if (!message) {
                var defaultMessages = this.getDefaultMessages();
                if (messages !== defaultMessages) {
                    message = get__default['default'](defaultMessages, key);
                }
            }
            return message;
        };
        // Returned start and end are for the text BEFORE the language specifier and so refer to the previous
        // language not the one returned by the same call to this method
        IntlService.prototype.nextLang = function (text, start, allowNone) {
            for (var i = start, ic = text.length - 3; i < ic; i++) {
                if (text[i] === "[" && text[i + 3] === "]") {
                    return {
                        start: start,
                        end: i,
                        lang1: text.charCodeAt(i + 1),
                        lang2: text.charCodeAt(i + 2)
                    };
                }
            }
            if (allowNone) {
                return {
                    start: start,
                    end: text.length,
                    lang1: -1,
                    lang2: -1
                };
            }
            return undefined;
        };
        // ([nnn])<default>[fr]<french>[de]<german>...
        IntlService.prototype.sysLang = function (text) {
            if (!text) {
                return text;
            }
            var iStart = 0;
            var len = text.length;
            // Skip order
            var i = 0;
            if (text[i] === "[") {
                while (i < len && text[i] >= "0" && text[i] <= "9") {
                    i++;
                }
                if (text[i] === "]") {
                    iStart = i + 1;
                }
            }
            // Pick out default value
            var defaultLang = this.nextLang(text, iStart, false);
            if (!defaultLang) {
                return text; // Not a sys lang formatted text
            }
            // Look for a matching language
            var lang1 = this.currentLocale.name.charCodeAt(0);
            var lang2 = this.currentLocale.name.charCodeAt(1);
            var curLang = defaultLang;
            while (curLang) {
                if (lang1 === curLang.lang1 && lang2 === curLang.lang2) {
                    // We have a matching language, get its text
                    var nextLang = this.nextLang(text, curLang.end + 4, true);
                    return text.substring(nextLang.start, nextLang.end);
                }
                else {
                    curLang = this.nextLang(text, curLang.end + 4, false);
                }
            }
            // return default language text
            return text.substring(defaultLang.start, defaultLang.end);
        };
        IntlService.prototype.processFormatMessage = function (message, values) {
            if (values === void 0) { values = {}; }
            var hasValues = Object.keys(values).length > 0;
            if (!hasValues) {
                return message;
            }
            if (message) {
                try {
                    var formatter = formatters.getMessageFormat(message, this.intlLocale, this.formats, { formatters: formatters });
                    var formattedMessage = formatter.format(values);
                    return formattedMessage;
                }
                catch (e) {
                    console.log("IntlService.processFormatMessage error:", e);
                    return message;
                }
            }
            else {
                return message;
            }
        };
        /**
         * Format a message identified by a `key`. Any values referenced
         * by the message are taken from an optional `values` map. The key can be
         * in a variety of forms:
         * * a Sinequa "syslang" string: `apple[fr]pomme[de]Apfel`
         * * a message key resolved in the [messages]{@link LocaleData#messages} of the current
         * locale:  `msg#path1.path2.path3`
         * * an ICU message using the `txt#` prefix: `txt#Hello {name}`
         *
         * @param key The message identifier
         * @param values Values referenced by an ICU message
         * @return The formatted message. If the key is not resolved then it is returned unprocessed
         */
        IntlService.prototype.formatMessage = function (key, values) {
            var e_2, _a;
            key = base.Utils.trim(key);
            var sysLangStr = this.sysLang(key);
            if (sysLangStr !== key) {
                return sysLangStr;
            }
            var _values = {};
            if (values) {
                try {
                    for (var _b = __values(Object.keys(values)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var valueName = _c.value;
                        var value = values[valueName];
                        if (value && base.Utils.isString(value)) {
                            _values[valueName] = this.formatMessage(value);
                        }
                        else {
                            _values[valueName] = value;
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
            }
            if (base.Utils.startsWith(key, this.messagePrefix)) {
                if (base.Utils.eq(key, this.messagePrefix)) {
                    return key;
                }
                var message = this.getMessage(key);
                if (!base.Utils.isString(message)) {
                    message = key;
                }
                var formattedMessage = this.processFormatMessage(message, _values);
                return formattedMessage;
            }
            else if (base.Utils.startsWith(key, this.textPrefix)) {
                if (base.Utils.eq(key, this.textPrefix)) {
                    return key;
                }
                key = key.substr(this.textPrefix.length);
                var formattedMessage = this.processFormatMessage(key, _values);
                return formattedMessage;
            }
            else {
                return key;
            }
        };
        /**
         * Format an ICU Message string
         *
         * @param text An ICU Message to format
         * @param values Values referenced by an ICU message
         */
        IntlService.prototype.formatText = function (text, values) {
            var formattedMessage = this.processFormatMessage(text, values);
            return formattedMessage;
        };
        /**
         * Parse a date string in the current locale - eg `04/09/1986`
         *
         * @param value A date string
         * @returns The parse `Date` or `undefined` if the date cannot be parsed
         */
        IntlService.prototype.parseDate = function (value) {
            var m = moment__default['default'](value, "L");
            if (m.isValid()) {
                return m.toDate();
            }
            return undefined;
        };
        IntlService.prototype.getNamedFormat = function (type, name) {
            var format = this.formats && this.formats[type] && this.formats[type][name];
            if (format) {
                return format;
            }
            console.warn("IntlService.getNamedFormat - not found - type: " + type + ", name: " + name);
            return undefined;
        };
        IntlService.prototype.filterProps = function (props, whitelist, defaults) {
            if (defaults === void 0) { defaults = {}; }
            return whitelist.reduce(function (filtered, name) {
                if (props.hasOwnProperty(name)) {
                    filtered[name] = props[name];
                }
                else if (defaults.hasOwnProperty(name)) {
                    filtered[name] = defaults[name];
                }
                return filtered;
            }, {});
        };
        /**
         * Format a date in the current locale according to the passed options. If the passed `value` is not a `Date`
         * then one is constructed from it.
         *
         * @param value The date to format
         * @param options The options can include a custom format
         */
        IntlService.prototype.formatDate = function (value, options) {
            if (options === void 0) { options = {}; }
            var format = options.format;
            var date = value instanceof Date ? value : new Date(value);
            var defaults = (format && this.getNamedFormat("date", format)) || {};
            var filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
            try {
                return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
            }
            catch (e) {
                console.warn("IntlService.formatDate:", e);
            }
            return String(date);
        };
        /**
         * Format a time in the current locale according to the passed options. If the passed `value` is not a `Date` then one is
         * constructed from it.
         *
         * @param value The date to format
         * @param options The options can include a custom format
         */
        IntlService.prototype.formatTime = function (value, options) {
            if (options === void 0) { options = {}; }
            var format = options.format;
            var date = value instanceof Date ? value : new Date(value);
            var defaults = (format && this.getNamedFormat("time", format)) || {};
            var filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
            if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
                // Add default formatting options if hour, minute, or second isn't defined.
                filteredOptions = Object.assign({}, filteredOptions, {
                    hour: 'numeric',
                    minute: 'numeric'
                });
            }
            try {
                return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
            }
            catch (e) {
                console.warn("IntlService.formatTime:", e);
            }
            return String(date);
        };
        IntlService.prototype.makeRelativeTimeParams = function (value) {
            var diff = value.getTime() - base.Utils.now.getTime();
            var absDiff = Math.abs(diff);
            if (absDiff < base.Utils.oneSecond) {
                return { value: 0, unit: "seconds" };
            }
            else if (absDiff < base.Utils.oneMinute) {
                return { value: base.Utils.roundAway(diff / base.Utils.oneSecond), unit: "seconds" };
            }
            else if (absDiff < base.Utils.oneHour) {
                return { value: base.Utils.roundAway(diff / base.Utils.oneMinute), unit: "minutes" };
            }
            else if (absDiff < base.Utils.oneDay) {
                return { value: base.Utils.roundAway(diff / base.Utils.oneHour), unit: "hours" };
            }
            else if (absDiff < (base.Utils.oneDay * 30)) {
                return { value: base.Utils.roundAway(diff / base.Utils.oneDay), unit: "days" };
            }
            else if (absDiff < (base.Utils.oneDay * 365)) {
                return { value: base.Utils.roundAway(diff / (base.Utils.oneDay * 30)), unit: "months" };
            }
            else {
                return { value: base.Utils.roundAway(diff / (base.Utils.oneDay * 365)), unit: "years" };
            }
        };
        /**
         * Format a relative time in the current locale according to the passed options
         *
         * @param value The relative time to format. Negative number values represent times in the past.
         * If a Date value is passed then a number value and unit are deduced automatically based on
         * the current date and time.
         * @param unit The relative time unit (eg years, days or seconds). Must be passed if value
         * is a number.
         * @param options The options can include a custom format
         */
        IntlService.prototype.formatRelativeTime = function (value, unit, options) {
            if (options === void 0) { options = {}; }
            if (value === undefined) {
                return "";
            }
            if (base.Utils.isString(value)) {
                value = new Date(value);
            }
            if (base.Utils.isDate(value)) {
                var params = this.makeRelativeTimeParams(value);
                value = params.value;
                unit = params.unit;
            }
            var format = options.format;
            var defaults = (format && this.getNamedFormat("relativeTime", format)) || {};
            var filteredOptions = this.filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
            if (!filteredOptions.numeric) {
                filteredOptions.numeric = "auto"; // default is always - we prefer auto
            }
            try {
                return formatters.getRelativeTimeFormat(this.intlLocale, filteredOptions).format(value, unit);
            }
            catch (e) {
                console.warn("IntlService.formatRelativeTime:", e);
            }
            return String(value);
        };
        /**
         * Format a number in the current locale
         *
         * @param value The number to format
         * @param options The options can include a custom format
         */
        IntlService.prototype.formatNumber = function (value, options) {
            if (options === void 0) { options = {}; }
            var format = options.format;
            var defaults = format && this.getNamedFormat("number", format);
            var filteredOptions = this.filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
            try {
                return formatters.getNumberFormat(this.intlLocale, filteredOptions).format(value);
            }
            catch (e) {
                console.warn("IntlService.formatNumber:", e);
            }
            return String(value);
        };
        return IntlService;
    }());
    IntlService.ɵfac = function IntlService_Factory(t) { return new (t || IntlService)(i0.ɵɵinject(INTL_CONFIG, 8), i0.ɵɵinject(LOCALES_CONFIG, 8)); };
    IntlService.ɵprov = i0.ɵɵdefineInjectable({ token: IntlService, factory: IntlService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IntlService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [INTL_CONFIG]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [LOCALES_CONFIG]
                        }] }];
        }, null);
    })();

    /**
     * An abstract base class for pipes that should refresh automatically
     * when the current locale on {@link IntlService} changes. Pipes should
     * be declared as `pure: false` - the current value is cached to avoid
     * unnecessary processing
     */
    var AbstractIntlPipe = /** @class */ (function () {
        function AbstractIntlPipe(intlService, changeDetectorRef) {
            this.intlService = intlService;
            this.changeDetectorRef = changeDetectorRef;
            this.value = "";
        }
        AbstractIntlPipe.prototype.updateValue = function (value, params) {
            this.lastValue = value;
            this.lastParams = params;
            this.changeDetectorRef.markForCheck();
        };
        AbstractIntlPipe.prototype.transform = function (value, params) {
            var _this = this;
            // if we ask another time for the same key, return the last value
            if (base.Utils.equals(value, this.lastValue) && base.Utils.equals(params, this.lastParams)) {
                return this.value;
            }
            // set the value
            this.updateValue(value, params);
            // subscribe to localeChange event
            if (!this.localeChange) {
                this.localeChange = this.intlService.events.subscribe(function (event) {
                    if (!base.Utils.isEmpty(_this.lastValue)) {
                        _this.lastValue = null;
                        _this.updateValue(value, params);
                    }
                });
            }
            return this.value;
        };
        AbstractIntlPipe.prototype.ngOnDestroy = function () {
            if (this.localeChange) {
                this.localeChange.unsubscribe();
            }
        };
        return AbstractIntlPipe;
    }());
    AbstractIntlPipe.ɵfac = function AbstractIntlPipe_Factory(t) { return new (t || AbstractIntlPipe)(i0.ɵɵdirectiveInject(IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    AbstractIntlPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqAbstractIntlPipe", type: AbstractIntlPipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AbstractIntlPipe, [{
                type: i0.Pipe,
                args: [{ name: "sqAbstractIntlPipe", pure: false }]
            }], function () { return [{ type: IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    /**
     * A pipe to display messages in the current locale. Inputs are processed by
     * [IntlService.formatMessage]{@link IntlService#formatMessage}
     */
    var MessagePipe = /** @class */ (function (_super) {
        __extends(MessagePipe, _super);
        function MessagePipe(intlService, changeDetectorRef) {
            return _super.call(this, intlService, changeDetectorRef) || this;
        }
        MessagePipe.prototype.updateValue = function (value, params) {
            if (!base.Utils.isEmpty(value)) {
                // coerce to string (eg sys date strings get converted to dates so if this happens to a title we will break otherwise)
                value = value + "";
            }
            _super.prototype.updateValue.call(this, value, params);
            if (!value) {
                this.value = value;
                return;
            }
            var values;
            if (params) {
                values = params.values ? params.values : params;
            }
            this.value = this.intlService.formatMessage(value, values);
        };
        return MessagePipe;
    }(AbstractIntlPipe));
    MessagePipe.ɵfac = function MessagePipe_Factory(t) { return new (t || MessagePipe)(i0.ɵɵdirectiveInject(IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    MessagePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqMessage", type: MessagePipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(MessagePipe, [{
                type: i0.Pipe,
                args: [{ name: "sqMessage", pure: false }]
            }], function () { return [{ type: IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    var INTL_MODULE_PROVIDERS = [];

    /**
     * An APP_INITIALIZER factory function for initialising the {@link IntlService} before any UI is displayed
     */
    function IntlInitializer(intlService) {
        var init = function () { return intlService.init().toPromise(); };
        return init;
    }
    /**
     * This module contains core internationalization functionality for the formatting of numbers, dates and strings.
     * It is based on the industry standard
     * [Intl]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl} API
     * and an implementation of the ICU Message syntax provided by [FormatJS]{@link https://formatjs.io/}.
     *
     * The module provides mechanisms for the definition and loading of locales which can be extended with library specific
     * locale information. By default, locales contain support for `Moment.js` and `D3.js`.
     *
     * The module can be initialized by importing it using the `forRoot` static method or otherwise providing the
     * {@link LOCALES_CONFIG} injection token
     */
    var IntlModule = /** @class */ (function () {
        function IntlModule() {
        }
        IntlModule.forRoot = function (localeConfig) {
            return {
                ngModule: IntlModule,
                providers: [
                    { provide: LOCALES_CONFIG, useClass: localeConfig },
                ]
            };
        };
        return IntlModule;
    }());
    IntlModule.ɵmod = i0.ɵɵdefineNgModule({ type: IntlModule });
    IntlModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IntlModule_Factory(t) { return new (t || IntlModule)(); }, providers: __spread([
            { provide: i0.APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true }
        ], INTL_MODULE_PROVIDERS), imports: [[
                common.CommonModule,
                base.BaseModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(IntlModule, { declarations: [MessagePipe], imports: [common.CommonModule,
                base.BaseModule], exports: [MessagePipe] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(IntlModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            base.BaseModule
                        ],
                        declarations: [
                            MessagePipe
                        ],
                        exports: [
                            MessagePipe
                        ],
                        providers: __spread([
                            { provide: i0.APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true }
                        ], INTL_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    var en = {
        "system": {
            "date": "{time, selectordinal, =0 {{date, date}} other {{date, date}, {date, time, medium}}}",
            "number": "{value, number}",
            "boolean": "{value, select, true {true} other {false}}",
            "percent": "{value, number, percent}",
            "fieldSeparator": ": ",
            "memorySize": {
                "bytes": "{value, number, sqZeroDecimalPlaces} B",
                "kb": "{value, number, sqZeroDecimalPlaces} KB",
                "mb": "{value, number, sqOneDecimalPlace} MB",
                "gb": "{value, number, sqTwoDecimalPlaces} GB",
                "tb": "{value, number, sqThreeDecimalPlaces} TB",
                "pb": "{value, number, sqFourDecimalPlaces} PB"
            }
        },
        "error": {
            "serverError": "Server error",
            "loginCancelled": "login cancelled",
            "processedCredentialsError": "unable to get processed credentials",
            "autoLoginError": "login failed",
            "principalSwitched": "the logged in user has changed",
            "userOverrideFailure": "unable to override user",
            "responseLoadFailure": "failed to load response",
            "unknownError": "unknown error"
        },
        "language": {
            "ar": "Arabic",
            "da": "Danish",
            "de": "German",
            "el": "Greek",
            "en": "English",
            "es": "Spanish",
            "fi": "Finnish",
            "fr": "French",
            "it": "Italian",
            "ja": "Japanese",
            "ko": "Korean",
            "nl": "Dutch",
            "no": "Norwegian",
            "pl": "Polish",
            "pt": "Portuguese",
            "ro": "Romanian",
            "ru": "Russian",
            "sv": "Swedish",
            "th": "Thai",
            "zh": "Traditional Chinese",
            "zs": "Simplified Chinese",
            "zz": "Unknown"
        }
    };

    var fr = {
        "system": {
            "date": "{time, selectordinal, =0 {{date, date}} other {{date, date} à {date, time, medium}}}",
            "number": "{value, number}",
            "boolean": "{value, select, true {vrai} other {faux}}",
            "percent": "{value, number, percent}",
            "fieldSeparator": " : ",
            "memorySize": {
                "bytes": "{value, number, sqZeroDecimalPlaces} o",
                "kb": "{value, number, sqZeroDecimalPlaces} Ko",
                "mb": "{value, number, sqOneDecimalPlace} Mo",
                "gb": "{value, number, sqTwoDecimalPlaces} Go",
                "tb": "{value, number, sqThreeDecimalPlaces} To",
                "pb": "{value, number, sqFourDecimalPlaces} Po"
            }
        },
        "error": {
            "serverError": "Erreur de serveur",
            "loginCancelled": "Connexion annulée",
            "processedCredentialsError": "Impossible d'obtenir les informations d'identification",
            "autoLoginError": "Echec de la connexion",
            "principalSwitched": "L'utilisateur connecté a été modifié",
            "userOverrideFailure": "Echec de surchargement de l'utilisateur",
            "responseLoadFailure": "Echec de chargement de la réponse",
            "unknownError": "Erreur inconnue"
        },
        "language": {
            "ar": "Arabe",
            "da": "Danois",
            "de": "Allemand",
            "el": "Grec",
            "en": "Anglais",
            "es": "Espagnol",
            "fi": "Finlandais",
            "fr": "Français",
            "it": "Italien",
            "ja": "Japonais",
            "ko": "Coréen",
            "nl": "Néerlandais",
            "no": "Norvégien",
            "pl": "Polonais",
            "pt": "Portugais",
            "ro": "Roumain",
            "ru": "Russe",
            "sv": "Suédois",
            "th": "Thaïlandais",
            "zh": "Chinois traditionnel",
            "zs": "Chinois simplifié",
            "zz": "Inconnu"
        },
    };

    var de = {
        "system": {
            "date": "{time, selectordinal, =0 {{date, date}} other {{date, date}, {date, time, medium}}}",
            "number": "{value, number}",
            "boolean": "{value, select, true {wahr} other {falsch}}",
            "percent": "{value, number, percent}",
            "fieldSeparator": ": ",
            "memorySize": {
                "bytes": "{value, number, sqZeroDecimalPlaces} B",
                "kb": "{value, number, sqZeroDecimalPlaces} KB",
                "mb": "{value, number, sqOneDecimalPlace} MB",
                "gb": "{value, number, sqTwoDecimalPlaces} GB",
                "tb": "{value, number, sqThreeDecimalPlaces} TB",
                "pb": "{value, number, sqFourDecimalPlaces} PB"
            }
        },
        "error": {
            "serverError": "Serverfehler",
            "loginCancelled": "Anmeldung abgebrochen (login cancelled)",
            "processedCredentialsError": "Verarbeitete Anmeldeinformationen konnten nicht ermittelt werden (unable to get processed credentials)",
            "autoLoginError": "Anmeldung fehlgeschlagen (login failed)",
            "principalSwitched": "Der angemeldete Benutzer hat sich geändert (the logged in user has changed)",
            "userOverrideFailure": "Benutzerwechsel fehlgeschlagen (unable to override user)",
            "responseLoadFailure": "Antwort konnte nicht geladen werden (failed to load response)",
            "unknownError": "Unbekannter Fehler"
        },
        "language": {
            "ar": "Arabisch",
            "da": "Dänisch",
            "de": "Deutsch",
            "el": "Griechisch",
            "en": "Englisch",
            "es": "Spanisch",
            "fi": "Finnisch",
            "fr": "Französisch",
            "it": "Italienisch",
            "ja": "Japanisch",
            "ko": "Koreanisch",
            "nl": "Niederländisch",
            "no": "Norwegisch",
            "pl": "Polnisch",
            "pt": "Portugiesisch",
            "ro": "Rumänisch",
            "ru": "Russisch",
            "sv": "Schwedisch",
            "th": "Thailändisch",
            "zh": "Traditionelles Chinesisch",
            "zs": "Vereinfachtes Chinesisch",
            "zz": "Unbekannt"
        },
    };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AbstractIntlPipe = AbstractIntlPipe;
    exports.INTL_CONFIG = INTL_CONFIG;
    exports.IntlInitializer = IntlInitializer;
    exports.IntlModule = IntlModule;
    exports.IntlService = IntlService;
    exports.LOCALES_CONFIG = LOCALES_CONFIG;
    exports.MessagePipe = MessagePipe;
    exports.deIntl = de;
    exports.enIntl = en;
    exports.frIntl = fr;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-intl.umd.js.map
