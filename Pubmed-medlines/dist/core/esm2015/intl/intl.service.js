import { Injectable, Optional, Inject, InjectionToken } from "@angular/core";
import { Subject, concat, of, throwError } from "rxjs";
import { map, last } from "rxjs/operators";
import IntlMessageFormat from "intl-messageformat";
import memoizeFormatConstructor from "intl-format-cache";
// TODO - check loading of locale data per locale - the ponyfill doesn't seem to work
import "@formatjs/intl-relativetimeformat/polyfill";
import "intl-pluralrules";
import get from "lodash/get";
import { Utils } from "@sinequa/core/base";
// We support loading d3 bundled and unbundled as it is typically easier
// for others to integrate bundled examples but some 3rd party libs (eg swimlane/charts)
// load d3 unbundled.
import { formatDefaultLocale } from "d3-format";
import { timeFormatDefaultLocale } from "d3-time-format";
import * as d3 from "d3";
import moment from "moment";
// moment needs to be set globally to load moment locales successfully when the locales are bundled in the main rollup bundle
// see: https://github.com/rollup/rollup/issues/641
import "./import-moment";
import * as i0 from "@angular/core";
/**
 * @ignore
 */
const formatters = {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
    getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
    getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
    getRelativeTimeFormat: memoizeFormatConstructor(Intl.RelativeTimeFormat),
    getPluralRules: memoizeFormatConstructor(Intl.PluralRules)
};
/**
 * @ignore
 */
const DATE_TIME_FORMAT_OPTIONS = [
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
const NUMBER_FORMAT_OPTIONS = [
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
const RELATIVE_TIME_FORMAT_OPTIONS = [
    "localeMatcher",
    "numeric",
    "style"
];
/**
 * An injection token used to initialize the [locales configuration]{@link LocalesConfig} of {@link IntlModule}
 */
export const LOCALES_CONFIG = new InjectionToken('LOCALES_CONFIG');
/**
 * An injection token used to initialize the [general configuration]{@link IntlConfig} of {@link IntlModule}
 */
export const INTL_CONFIG = new InjectionToken('INTL_CONFIG');
/**
 * Default custom ICU Message formats
 */
const DEFAULT_FORMATS = {
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
export class IntlService {
    constructor(intlConfig, localesConfig) {
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
        this._events = new Subject();
        this.locales = localesConfig.locales || [localesConfig.defaultLocale];
    }
    static getLanguage(name) {
        const sepPos = name.indexOf("-");
        if (sepPos === -1) {
            return name;
        }
        return name.substring(0, sepPos);
    }
    static getBrowserLanguages() {
        if (navigator.languages) {
            return navigator.languages;
        }
        const language = navigator.language || navigator.userLanguage ||
            navigator.browserLanguage || navigator.systemLanguage;
        return !!language ? [language] : [];
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * The observable events emitted by this service
     */
    get events() {
        return this._events;
    }
    getInitialLocale() {
        const language = window.localStorage.getItem("sinequa-locale");
        const languages = !!language ? [language] : IntlService.getBrowserLanguages();
        let locale = this.getLocale(languages);
        if (locale) {
            return locale;
        }
        locale = this.getLocale(languages, true);
        if (locale) {
            return locale;
        }
        return this.localesConfig.defaultLocale;
    }
    /**
     * Initialize the service. The current locale is initialized to either the `sinequa-locale` local
     * storage value, the browser language or the default locale.
     *
     * This method is called automatically by the {@link IntlModule} at application startup.
     *
     * @return An observable of the current locale
     */
    init() {
        // Set up formats
        this.formats = Utils.merge(DEFAULT_FORMATS, this.intlConfig.formats);
        // Load default locale
        let observable = this.use(this.localesConfig.defaultLocale.name, false);
        const initialLocale = this.getInitialLocale();
        if (initialLocale !== this.localesConfig.defaultLocale) {
            // Load initial locale if different to default
            console.log("Setting initial locale: ", initialLocale.name);
            observable = concat(observable, this.use(initialLocale.name, false)).pipe(last());
        }
        Utils.subscribe(observable, (value) => {
            console.log("Initial locale set: ", value);
        });
        return observable;
    }
    loadData(locale) {
        if (!this.localesConfig.loadLocale) {
            return throwError("Dynamic locale loading has not been implemented in the calling app - " +
                "please add a loadLocale handler to your LocalesConfig");
        }
        return this.localesConfig.loadLocale(locale);
    }
    getLocale(names, approximate = false) {
        if (typeof names === "string") {
            names = [names];
        }
        for (const name of names) {
            const locale = this.locales.find((locale1) => {
                if (locale1.name === name) {
                    return true;
                }
                if (approximate && IntlService.getLanguage(locale1.name) === IntlService.getLanguage(name)) {
                    return true;
                }
                return false;
            });
            if (locale) {
                return locale;
            }
        }
        return undefined;
    }
    /**
     * Change the current locale. The change is made asynchronously as the locale may need to be
     * downloaded. The current locale is optionally stored in local storage (`sinequa-locale`)
     * to be picked up the next time the service is initialized
     *
     * @param locale The name of the locale to use
     * @param store If `true` the current locale is stored in local storage
     */
    use(locale, store = true) {
        const newLocale = this.getLocale(locale);
        if (!newLocale) {
            return throwError({ error: "unsupported locale" });
        }
        const observable = !!newLocale.data ? of(newLocale.data) : this.loadData(locale);
        Utils.subscribe(observable, (data) => {
            this.currentLocale = newLocale;
            if (store) {
                window.localStorage.setItem("sinequa-locale", this.currentLocale.name);
            }
            this.direction = this.currentLocale.direction || "ltr";
            if (!this.currentLocale.data) {
                this.currentLocale.data = data;
            }
            // Set moment locale
            if (this.currentLocale.data.moment) {
                // Set (and define if necessary) moment locale (it auto-defines when we are not bundled)
                if (moment.locale(this.currentLocale.data.moment.locale) !== this.currentLocale.data.moment.locale) {
                    console.log(`moment locale not defined: ${this.currentLocale.data.moment.locale} - defaulting to en`);
                    moment.locale("en");
                }
            }
            else {
                moment.locale("en");
            }
            // Set d3 locale
            if (this.currentLocale.data.d3) {
                formatDefaultLocale(this.currentLocale.data.d3.format);
                timeFormatDefaultLocale(this.currentLocale.data.d3.time);
                d3.formatDefaultLocale(this.currentLocale.data.d3.format);
                d3.timeFormatDefaultLocale(this.currentLocale.data.d3.time);
            }
            if (this.currentLocale.data.intl && this.currentLocale.data.intl.locale) {
                this.intlLocale = this.currentLocale.data.intl.locale;
            }
            else {
                this.intlLocale = this.localesConfig.defaultLocale.data ? this.localesConfig.defaultLocale.data.intl.locale : "en";
            }
            return of(this.intlLocale);
        });
        const observable2 = observable.pipe(map((value) => {
            return this.currentLocale.name;
        }));
        Utils.subscribe(observable2, (name) => {
            this._events.next({ locale: name });
        });
        return observable2;
    }
    getDefaultMessages() {
        const _default = this.locales.find((value) => !!value.data && !!value.data.messages);
        if (_default) {
            return _default.data && _default.data.messages;
        }
        return {};
    }
    getMessages() {
        let messages;
        if (this.currentLocale && this.currentLocale.data) {
            messages = this.currentLocale.data.messages;
        }
        if (!messages) {
            messages = this.getDefaultMessages();
        }
        return messages;
    }
    /**
     * Get the message from the current locale that corresponds to the passed `key`.
     * If the is not prefixed by {@link messagePrefix} then `null` is returned
     *
     * @param key The message key
     */
    getMessage(key) {
        if (!Utils.startsWith(key, this.messagePrefix)) {
            return undefined;
        }
        key = key.substr(this.messagePrefix.length);
        const messages = this.getMessages();
        let message = get(messages, key);
        if (!message) {
            const defaultMessages = this.getDefaultMessages();
            if (messages !== defaultMessages) {
                message = get(defaultMessages, key);
            }
        }
        return message;
    }
    // Returned start and end are for the text BEFORE the language specifier and so refer to the previous
    // language not the one returned by the same call to this method
    nextLang(text, start, allowNone) {
        for (let i = start, ic = text.length - 3; i < ic; i++) {
            if (text[i] === "[" && text[i + 3] === "]") {
                return {
                    start,
                    end: i,
                    lang1: text.charCodeAt(i + 1),
                    lang2: text.charCodeAt(i + 2)
                };
            }
        }
        if (allowNone) {
            return {
                start,
                end: text.length,
                lang1: -1,
                lang2: -1
            };
        }
        return undefined;
    }
    // ([nnn])<default>[fr]<french>[de]<german>...
    sysLang(text) {
        if (!text) {
            return text;
        }
        let iStart = 0;
        const len = text.length;
        // Skip order
        let i = 0;
        if (text[i] === "[") {
            while (i < len && text[i] >= "0" && text[i] <= "9") {
                i++;
            }
            if (text[i] === "]") {
                iStart = i + 1;
            }
        }
        // Pick out default value
        const defaultLang = this.nextLang(text, iStart, false);
        if (!defaultLang) {
            return text; // Not a sys lang formatted text
        }
        // Look for a matching language
        const lang1 = this.currentLocale.name.charCodeAt(0);
        const lang2 = this.currentLocale.name.charCodeAt(1);
        let curLang = defaultLang;
        while (curLang) {
            if (lang1 === curLang.lang1 && lang2 === curLang.lang2) {
                // We have a matching language, get its text
                const nextLang = this.nextLang(text, curLang.end + 4, true);
                return text.substring(nextLang.start, nextLang.end);
            }
            else {
                curLang = this.nextLang(text, curLang.end + 4, false);
            }
        }
        // return default language text
        return text.substring(defaultLang.start, defaultLang.end);
    }
    processFormatMessage(message, values = {}) {
        const hasValues = Object.keys(values).length > 0;
        if (!hasValues) {
            return message;
        }
        if (message) {
            try {
                const formatter = formatters.getMessageFormat(message, this.intlLocale, this.formats, { formatters });
                const formattedMessage = formatter.format(values);
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
    }
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
    formatMessage(key, values) {
        key = Utils.trim(key);
        const sysLangStr = this.sysLang(key);
        if (sysLangStr !== key) {
            return sysLangStr;
        }
        const _values = {};
        if (values) {
            for (const valueName of Object.keys(values)) {
                const value = values[valueName];
                if (value && Utils.isString(value)) {
                    _values[valueName] = this.formatMessage(value);
                }
                else {
                    _values[valueName] = value;
                }
            }
        }
        if (Utils.startsWith(key, this.messagePrefix)) {
            if (Utils.eq(key, this.messagePrefix)) {
                return key;
            }
            let message = this.getMessage(key);
            if (!Utils.isString(message)) {
                message = key;
            }
            const formattedMessage = this.processFormatMessage(message, _values);
            return formattedMessage;
        }
        else if (Utils.startsWith(key, this.textPrefix)) {
            if (Utils.eq(key, this.textPrefix)) {
                return key;
            }
            key = key.substr(this.textPrefix.length);
            const formattedMessage = this.processFormatMessage(key, _values);
            return formattedMessage;
        }
        else {
            return key;
        }
    }
    /**
     * Format an ICU Message string
     *
     * @param text An ICU Message to format
     * @param values Values referenced by an ICU message
     */
    formatText(text, values) {
        const formattedMessage = this.processFormatMessage(text, values);
        return formattedMessage;
    }
    /**
     * Parse a date string in the current locale - eg `04/09/1986`
     *
     * @param value A date string
     * @returns The parse `Date` or `undefined` if the date cannot be parsed
     */
    parseDate(value) {
        const m = moment(value, "L");
        if (m.isValid()) {
            return m.toDate();
        }
        return undefined;
    }
    getNamedFormat(type, name) {
        const format = this.formats && this.formats[type] && this.formats[type][name];
        if (format) {
            return format;
        }
        console.warn(`IntlService.getNamedFormat - not found - type: ${type}, name: ${name}`);
        return undefined;
    }
    filterProps(props, whitelist, defaults = {}) {
        return whitelist.reduce((filtered, name) => {
            if (props.hasOwnProperty(name)) {
                filtered[name] = props[name];
            }
            else if (defaults.hasOwnProperty(name)) {
                filtered[name] = defaults[name];
            }
            return filtered;
        }, {});
    }
    /**
     * Format a date in the current locale according to the passed options. If the passed `value` is not a `Date`
     * then one is constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatDate(value, options = {}) {
        const { format } = options;
        const date = value instanceof Date ? value : new Date(value);
        const defaults = (format && this.getNamedFormat("date", format)) || {};
        const filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        try {
            return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
        }
        catch (e) {
            console.warn("IntlService.formatDate:", e);
        }
        return String(date);
    }
    /**
     * Format a time in the current locale according to the passed options. If the passed `value` is not a `Date` then one is
     * constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatTime(value, options = {}) {
        const { format } = options;
        const date = value instanceof Date ? value : new Date(value);
        const defaults = (format && this.getNamedFormat("time", format)) || {};
        let filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
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
    }
    makeRelativeTimeParams(value) {
        const diff = value.getTime() - Utils.now.getTime();
        const absDiff = Math.abs(diff);
        if (absDiff < Utils.oneSecond) {
            return { value: 0, unit: "seconds" };
        }
        else if (absDiff < Utils.oneMinute) {
            return { value: Utils.roundAway(diff / Utils.oneSecond), unit: "seconds" };
        }
        else if (absDiff < Utils.oneHour) {
            return { value: Utils.roundAway(diff / Utils.oneMinute), unit: "minutes" };
        }
        else if (absDiff < Utils.oneDay) {
            return { value: Utils.roundAway(diff / Utils.oneHour), unit: "hours" };
        }
        else if (absDiff < (Utils.oneDay * 30)) {
            return { value: Utils.roundAway(diff / Utils.oneDay), unit: "days" };
        }
        else if (absDiff < (Utils.oneDay * 365)) {
            return { value: Utils.roundAway(diff / (Utils.oneDay * 30)), unit: "months" };
        }
        else {
            return { value: Utils.roundAway(diff / (Utils.oneDay * 365)), unit: "years" };
        }
    }
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
    formatRelativeTime(value, unit, options = {}) {
        if (value === undefined) {
            return "";
        }
        if (Utils.isString(value)) {
            value = new Date(value);
        }
        if (Utils.isDate(value)) {
            const params = this.makeRelativeTimeParams(value);
            value = params.value;
            unit = params.unit;
        }
        const { format } = options;
        const defaults = (format && this.getNamedFormat("relativeTime", format)) || {};
        const filteredOptions = this.filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
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
    }
    /**
     * Format a number in the current locale
     *
     * @param value The number to format
     * @param options The options can include a custom format
     */
    formatNumber(value, options = {}) {
        const { format } = options;
        const defaults = format && this.getNamedFormat("number", format);
        const filteredOptions = this.filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
        try {
            return formatters.getNumberFormat(this.intlLocale, filteredOptions).format(value);
        }
        catch (e) {
            console.warn("IntlService.formatNumber:", e);
        }
        return String(value);
    }
}
IntlService.ɵfac = function IntlService_Factory(t) { return new (t || IntlService)(i0.ɵɵinject(INTL_CONFIG, 8), i0.ɵɵinject(LOCALES_CONFIG, 8)); };
IntlService.ɵprov = i0.ɵɵdefineInjectable({ token: IntlService, factory: IntlService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IntlService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [INTL_CONFIG]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [LOCALES_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50bC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvaW50bC8iLCJzb3VyY2VzIjpbImludGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQWEsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxPQUFPLEVBQWMsTUFBTSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLGlCQUFpQixNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sd0JBQXdCLE1BQU0sbUJBQW1CLENBQUM7QUFDekQscUZBQXFGO0FBQ3JGLE9BQU8sNENBQTRDLENBQUM7QUFDcEQsT0FBTyxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEdBQUcsTUFBTSxZQUFZLENBQUM7QUFDN0IsT0FBTyxFQUFDLEtBQUssRUFBb0IsTUFBTSxvQkFBb0IsQ0FBQztBQUM1RCx3RUFBd0U7QUFDeEUsd0ZBQXdGO0FBQ3hGLHFCQUFxQjtBQUNyQixPQUFPLEVBQXlCLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ3RFLE9BQU8sRUFBdUIsdUJBQXVCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3RSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUF1STVCLDZIQUE2SDtBQUM3SCxtREFBbUQ7QUFDbkQsT0FBTyxpQkFBaUIsQ0FBQzs7QUF2SXpCOztHQUVHO0FBQ0gsTUFBTSxVQUFVLEdBQUc7SUFDZixnQkFBZ0IsRUFBRSx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQztJQUM3RCxlQUFlLEVBQUUsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFlBQVks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ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT3B0aW9uYWwsIEluamVjdCwgT25EZXN0cm95LCBJbmplY3Rpb25Ub2tlbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZSwgY29uY2F0LCBvZiwgdGhyb3dFcnJvcn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7bWFwLCBsYXN0fSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCBJbnRsTWVzc2FnZUZvcm1hdCBmcm9tIFwiaW50bC1tZXNzYWdlZm9ybWF0XCI7XG5pbXBvcnQgbWVtb2l6ZUZvcm1hdENvbnN0cnVjdG9yIGZyb20gXCJpbnRsLWZvcm1hdC1jYWNoZVwiO1xuLy8gVE9ETyAtIGNoZWNrIGxvYWRpbmcgb2YgbG9jYWxlIGRhdGEgcGVyIGxvY2FsZSAtIHRoZSBwb255ZmlsbCBkb2Vzbid0IHNlZW0gdG8gd29ya1xuaW1wb3J0IFwiQGZvcm1hdGpzL2ludGwtcmVsYXRpdmV0aW1lZm9ybWF0L3BvbHlmaWxsXCI7XG5pbXBvcnQgXCJpbnRsLXBsdXJhbHJ1bGVzXCI7XG5pbXBvcnQgZ2V0IGZyb20gXCJsb2Rhc2gvZ2V0XCI7XG5pbXBvcnQge1V0aWxzLCBNYXBPZiwgSnNvbk9iamVjdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuLy8gV2Ugc3VwcG9ydCBsb2FkaW5nIGQzIGJ1bmRsZWQgYW5kIHVuYnVuZGxlZCBhcyBpdCBpcyB0eXBpY2FsbHkgZWFzaWVyXG4vLyBmb3Igb3RoZXJzIHRvIGludGVncmF0ZSBidW5kbGVkIGV4YW1wbGVzIGJ1dCBzb21lIDNyZCBwYXJ0eSBsaWJzIChlZyBzd2ltbGFuZS9jaGFydHMpXG4vLyBsb2FkIGQzIHVuYnVuZGxlZC5cbmltcG9ydCB7Rm9ybWF0TG9jYWxlRGVmaW5pdGlvbiwgZm9ybWF0RGVmYXVsdExvY2FsZX0gZnJvbSBcImQzLWZvcm1hdFwiO1xuaW1wb3J0IHtUaW1lTG9jYWxlRGVmaW5pdGlvbiwgdGltZUZvcm1hdERlZmF1bHRMb2NhbGV9IGZyb20gXCJkMy10aW1lLWZvcm1hdFwiO1xuaW1wb3J0ICogYXMgZDMgZnJvbSBcImQzXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmNvbnN0IGZvcm1hdHRlcnMgPSB7XG4gICAgZ2V0TWVzc2FnZUZvcm1hdDogbWVtb2l6ZUZvcm1hdENvbnN0cnVjdG9yKEludGxNZXNzYWdlRm9ybWF0KSxcbiAgICBnZXROdW1iZXJGb3JtYXQ6IG1lbW9pemVGb3JtYXRDb25zdHJ1Y3RvcihJbnRsLk51bWJlckZvcm1hdCksXG4gICAgZ2V0RGF0ZVRpbWVGb3JtYXQ6IG1lbW9pemVGb3JtYXRDb25zdHJ1Y3RvcihJbnRsLkRhdGVUaW1lRm9ybWF0KSxcbiAgICBnZXRSZWxhdGl2ZVRpbWVGb3JtYXQ6IG1lbW9pemVGb3JtYXRDb25zdHJ1Y3RvcihJbnRsLlJlbGF0aXZlVGltZUZvcm1hdCksXG4gICAgZ2V0UGx1cmFsUnVsZXM6IG1lbW9pemVGb3JtYXRDb25zdHJ1Y3RvcihJbnRsLlBsdXJhbFJ1bGVzKVxufTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmNvbnN0IERBVEVfVElNRV9GT1JNQVRfT1BUSU9OUyA9IFtcbiAgICBcImRhdGVTdHlsZVwiLFxuICAgIFwidGltZVN0eWxlXCIsXG4gICAgXCJsb2NhbGVNYXRjaGVyXCIsXG4gICAgXCJ0aW1lWm9uZVwiLFxuICAgIFwiaG91cjEyXCIsXG4gICAgXCJob3VyQ3ljbGVcIixcbiAgICBcImZvcm1hdE1hdGNoZXJcIixcbiAgICBcIndlZWtkYXlcIixcbiAgICBcImVyYVwiLFxuICAgIFwieWVhclwiLFxuICAgIFwibW9udGhcIixcbiAgICBcImRheVwiLFxuICAgIFwiaG91clwiLFxuICAgIFwibWludXRlXCIsXG4gICAgXCJzZWNvbmRcIixcbiAgICBcInRpbWVab25lTmFtZVwiLFxuXTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmNvbnN0IE5VTUJFUl9GT1JNQVRfT1BUSU9OUyA9IFtcbiAgICBcImxvY2FsZU1hdGNoZXJcIixcbiAgICBcInN0eWxlXCIsXG4gICAgXCJjdXJyZW5jeVwiLFxuICAgIFwiY3VycmVuY3lEaXNwbGF5XCIsXG4gICAgXCJ1c2VHcm91cGluZ1wiLFxuICAgIFwibWluaW11bUludGVnZXJEaWdpdHNcIixcbiAgICBcIm1pbmltdW1GcmFjdGlvbkRpZ2l0c1wiLFxuICAgIFwibWF4aW11bUZyYWN0aW9uRGlnaXRzXCIsXG4gICAgXCJtaW5pbXVtU2lnbmlmaWNhbnREaWdpdHNcIixcbiAgICBcIm1heGltdW1TaWduaWZpY2FudERpZ2l0c1wiLFxuXTtcblxuLyoqXG4gKiBAaWdub3JlXG4gKi9cbmNvbnN0IFJFTEFUSVZFX1RJTUVfRk9STUFUX09QVElPTlMgPSBbXG4gICAgXCJsb2NhbGVNYXRjaGVyXCIsXG4gICAgXCJudW1lcmljXCIsXG4gICAgXCJzdHlsZVwiXG5dO1xuXG4vKipcbiAqIERlc2NyaWJlcyBldmVudCBlbWl0dGVkIGJ5IHtAbGluayBJbnRsU2VydmljZX0gd2hlbiB0aGUgY3VycmVudCBsb2NhbGUgY2hhbmdlc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZUNoYW5nZUV2ZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgbmV3bHkgc2VsZWN0ZWQgbG9jYWxlXG4gICAgICovXG4gICAgbG9jYWxlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBkYXRhIHRoYXQgY2FuIGJlIHNldCBpbiBhIFNpbmVxdWEgbG9jYWxlLiBJbnN0YW5jZXMgYXJlIG5vcm1hbGx5XG4gKiBkZWZpbmVkIGluIGFwcGxpY2F0aW9uIGxvY2FsZSBtb2R1bGVzIHdoaWNoIGNhbiBiZSBpbmNsdWRlZCBzdGF0aWNhbGx5IG9yIGxvYWRlZFxuICogZHluYW1pY2FsbHlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMb2NhbGVEYXRhIHtcbiAgICAvKipcbiAgICAgKiBPcHRpb25zIHBlcnRhaW5pbmcgdG8gdGhlIGBJbnRsYCBBUElcbiAgICAgKi9cbiAgICBpbnRsOiB7XG4gICAgICAgIGxvY2FsZTogc3RyaW5nXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPcHRpb25zIHBlcnRhaW5pbmcgdG8gdGhlIGBNb21lbnQuanNgIGxpYnJhcnlcbiAgICAgKi9cbiAgICBtb21lbnQ/OiB7IC8vIGRlZmF1bHQgdG8gYnVpbHQtaW4gZW4tdXMsIGRhdGEgaXMgYXV0byBzZXQgYnkgbW9tZW50LmRlZmluZUxvY2FsZSB3aGVuIHRoZSBsb2NhbGUgbW9kdWxlIGlzIGxvYWRlZFxuICAgICAgICBsb2NhbGU6IHN0cmluZ1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBwZXJ0YWluaW5nIHRvIHRoZSBgRDMuanNgIGxpYnJhcnlcbiAgICAgKi9cbiAgICBkMz86IHtcbiAgICAgICAgbG9jYWxlOiBzdHJpbmcsXG4gICAgICAgIGZvcm1hdDogRm9ybWF0TG9jYWxlRGVmaW5pdGlvbixcbiAgICAgICAgdGltZTogVGltZUxvY2FsZURlZmluaXRpb25cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXNzYWdlcyAoSUNVIE1lc3NhZ2Ugc3ludGF4KSBmb3IgdGhpcyBsb2NhbGVcbiAgICAgKi9cbiAgICBtZXNzYWdlczogSnNvbk9iamVjdDtcbn1cblxuLyoqXG4gKiBEZXNjcmliZXMgYSBTaW5lcXVhIGxvY2FsZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZSB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgaWRlbnRpZnlpbmcgdGhlIGxvY2FsZVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBBIGRpc3BsYXkgbmFtZSBmb3IgdGhlIGxvY2FsZVxuICAgICAqL1xuICAgIGRpc3BsYXk6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgZGlyZWN0aW9uYWxpdHkgb2YgdGV4dCBpbiB0aGlzIGxvY2FsZSAobGVmdC10by1yaWdodCBvciByaWdodC10by1sZWZ0KVxuICAgICAqL1xuICAgIGRpcmVjdGlvbj86IFwibHRyXCIgfCBcInJ0bFwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBsb2NhbGUgZGF0YSBmb3IgdGhlIGxvY2FsZVxuICAgICAqL1xuICAgIGRhdGE/OiBMb2NhbGVEYXRhO1xufVxuXG4vKipcbiAqIEBpZ25vcmVcbiAqL1xuaW50ZXJmYWNlIE5leHRMYW5nIHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICAgIGxhbmcxOiBudW1iZXI7XG4gICAgbGFuZzI6IG51bWJlcjtcbn1cblxuXG4vLyBtb21lbnQgbmVlZHMgdG8gYmUgc2V0IGdsb2JhbGx5IHRvIGxvYWQgbW9tZW50IGxvY2FsZXMgc3VjY2Vzc2Z1bGx5IHdoZW4gdGhlIGxvY2FsZXMgYXJlIGJ1bmRsZWQgaW4gdGhlIG1haW4gcm9sbHVwIGJ1bmRsZVxuLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjQxXG5pbXBvcnQgXCIuL2ltcG9ydC1tb21lbnRcIjtcblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGxvY2FsZXMgY29uZmlndXJhdGlvbiBvYmplY3QgZGVmaW5lZCBieSBhbiBhcHBsaWNhdGlvbiBhbmQgdXNlZCBieSB0aGUge0BsaW5rIEludGxTZXJ2aWNlfVxuICovXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsZXNDb25maWcge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGxvY2FsZVxuICAgICAqL1xuICAgIGRlZmF1bHRMb2NhbGU6IExvY2FsZTtcbiAgICAvKipcbiAgICAgKiBUaGUgc2V0IG9mIGxvY2FsZXMgc3VwcG9ydGVkIGJ5IHRoZSBhcHBsaWNhdGlvblxuICAgICAqL1xuICAgIGxvY2FsZXM/OiBMb2NhbGVbXTtcbiAgICAvKipcbiAgICAgKiBBbiBvcHRpb25hbCBsb2FkZXIgZm9yIHRoZSBkeW5hbWljIGxvYWRpbmcgb2YgbG9jYWxlIGRhdGFcbiAgICAgKiBmb3IgbG9jYWxlcyB0aGF0IGRvIG5vdCBkZWZpbmUgdGhlIGRhdGEgc3RhdGljYWxseVxuICAgICAqL1xuICAgIGxvYWRMb2NhbGU/KGxvY2FsZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMb2NhbGVEYXRhPjtcbn1cblxuLyoqXG4gKiBBbiBpbmplY3Rpb24gdG9rZW4gdXNlZCB0byBpbml0aWFsaXplIHRoZSBbbG9jYWxlcyBjb25maWd1cmF0aW9uXXtAbGluayBMb2NhbGVzQ29uZmlnfSBvZiB7QGxpbmsgSW50bE1vZHVsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IExPQ0FMRVNfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPExvY2FsZXNDb25maWc+KCdMT0NBTEVTX0NPTkZJRycpO1xuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgb2JqZWN0IHRvIHNwZWNpZnkgY3VzdG9tIElDVSBNZXNzYWdlIGZvcm1hdHNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbnRsRm9ybWF0cyB7XG4gICAgLyoqXG4gICAgICogRm9ybWF0IG9wdGlvbnMgZm9yIGRhdGVzXG4gICAgICovXG4gICAgZGF0ZT86IE1hcE9mPEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zPjtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgb3B0aW9ucyBmb3IgdGltZXNcbiAgICAgKi9cbiAgICB0aW1lPzogTWFwT2Y8SW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnM+O1xuICAgIC8qKlxuICAgICAqIEZvcm1hdCBvcHRpb25zIGZvciBudW1iZXJzXG4gICAgICovXG4gICAgbnVtYmVyPzogTWFwT2Y8SW50bC5OdW1iZXJGb3JtYXRPcHRpb25zPjtcbiAgICAvKipcbiAgICAgKiBGb3JtYXQgb3B0aW9ucyBmb3IgcmVsYXRpdmUgdGltZXNcbiAgICAgKi9cbiAgICByZWxhdGl2ZVRpbWU/OiBNYXBPZjxJbnRsLlJlbGF0aXZlVGltZUZvcm1hdE9wdGlvbnM+O1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIGdlbmVyYWwgY29uZmlndXJhdGlvbiBvYmplY3QgZm9yIHRoZSB7QGxpbmsgSW50bE1vZHVsZX1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbnRsQ29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBDdXN0b20gZm9ybWF0cyBmb3IgSUNVIE1lc3NhZ2UgcHJvY2Vzc2luZ1xuICAgICAqL1xuICAgIGZvcm1hdHM/OiBJbnRsRm9ybWF0cztcbn1cblxuLyoqXG4gKiBBbiBpbmplY3Rpb24gdG9rZW4gdXNlZCB0byBpbml0aWFsaXplIHRoZSBbZ2VuZXJhbCBjb25maWd1cmF0aW9uXXtAbGluayBJbnRsQ29uZmlnfSBvZiB7QGxpbmsgSW50bE1vZHVsZX1cbiAqL1xuZXhwb3J0IGNvbnN0IElOVExfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEludGxDb25maWc+KCdJTlRMX0NPTkZJRycpO1xuXG4vKipcbiAqIERlZmF1bHQgY3VzdG9tIElDVSBNZXNzYWdlIGZvcm1hdHNcbiAqL1xuY29uc3QgREVGQVVMVF9GT1JNQVRTOiBJbnRsRm9ybWF0cyA9IHtcbiAgICBkYXRlOiB7XG4gICAgICAgIHNxRGF0ZVRpbWU6IHtcbiAgICAgICAgICAgIGRheTogXCIyLWRpZ2l0XCIsXG4gICAgICAgICAgICBtb250aDogXCIyLWRpZ2l0XCIsXG4gICAgICAgICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICAgICAgICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxuICAgICAgICAgICAgbWludXRlOiBcIjItZGlnaXRcIixcbiAgICAgICAgICAgIHNlY29uZDogXCIyLWRpZ2l0XCJcbiAgICAgICAgfSxcbiAgICAgICAgc3FEYXRlOiB7XG4gICAgICAgICAgICBkYXk6IFwiMi1kaWdpdFwiLFxuICAgICAgICAgICAgbW9udGg6IFwiMi1kaWdpdFwiLFxuICAgICAgICAgICAgeWVhcjogXCJudW1lcmljXCJcbiAgICAgICAgfSxcbiAgICAgICAgc3FZZWFyOiB7XG4gICAgICAgICAgICB5ZWFyOiBcIm51bWVyaWNcIlxuICAgICAgICB9LFxuICAgICAgICBzcU1vbnRoWWVhcjoge1xuICAgICAgICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgICAgICAgIHllYXI6IFwibnVtZXJpY1wiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRpbWU6IHtcbiAgICB9LFxuICAgIG51bWJlcjoge1xuICAgICAgICBzcVdlZWs6IHtcbiAgICAgICAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyLFxuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHNxWWVhcjoge1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHNxTm9Hcm91cGluZzoge1xuICAgICAgICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHNxWmVyb0RlY2ltYWxQbGFjZXM6IHtcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMFxuICAgICAgICB9LFxuICAgICAgICBzcU9uZURlY2ltYWxQbGFjZToge1xuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNxVHdvRGVjaW1hbFBsYWNlczoge1xuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyXG4gICAgICAgIH0sXG4gICAgICAgIHNxVGhyZWVEZWNpbWFsUGxhY2VzOiB7XG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDNcbiAgICAgICAgfSxcbiAgICAgICAgc3FGb3VyRGVjaW1hbFBsYWNlczoge1xuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA0XG4gICAgICAgIH0sXG4gICAgICAgIHNxRml2ZURlY2ltYWxQbGFjZXM6IHtcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNVxuICAgICAgICB9XG4gICAgfVxufTtcblxuLyogZXNsaW50LWRpc2FibGUganNkb2MvY2hlY2stYWxpZ25tZW50LGpzZG9jL2NoZWNrLWluZGVudGF0aW9uLGpzZG9jL25ld2xpbmUtYWZ0ZXItZGVzY3JpcHRpb24gKi9cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIG1ldGhvZHMgZm9yIG1hbmFnaW5nIGxvY2FsZXMgYW5kIGZvciBmb3JtYXR0aW5nIGRhdGVzLCBudW1iZXJzIGFuZCBzdHJpbmdzIHVzaW5nXG4gKiBbSUNVIE1lc3NhZ2Ugc3ludGF4XXtAbGluayBodHRwczovL2Zvcm1hdGpzLmlvL2d1aWRlcy9tZXNzYWdlLXN5bnRheC99LiBbTWVzc2FnZXNde0BsaW5rIExvY2FsZURhdGEjbWVzc2FnZXN9IHN0b3JlZFxuICogaW4gYSBsb2NhbGUncyBkYXRhIGFyZSByZWZlcmVuY2VkIHVzaW5nIGEga2V5IGluIHRoZSBmb2xsb3dpbmcgZm9ybTogYG1zZyM8SlNPTlBhdGg+YC4gR2l2ZW4gdGhlIGZvbGxvd2luZyBtZXNzYWdlczpcbmBgYCBqc29uXG57XG4gICAgXCJteUNvbXBvbmVudFwiOiB7XG4gICAgICAgIFwidGl0bGVcIjogXCJDb21wb25lbnQ6IHtuYW1lfVwiLFxuICAgICAgICBcImZvb3RlclwiOiBcIkNyZWF0ZWQgb24ge2NyZWF0ZWQsIGRhdGUsIG1lZGl1bX0gYnkge2F1dGhvcn1cIlxuICAgIH1cbn1cbmBgYFxuICogdGhpcyBrZXk6IGBtc2cjbXlDb21wb25lbnQuZm9vdGVyYCByZWZlcmVuY2VzIG15Q29tcG9uZW50J3MgZm9vdGVyIG1lc3NhZ2UuIFRoZSBtZXNzYWdlIGl0c2VsZiB1c2VzXG4gKiBJQ1UgTWVzc2FnZSBzeW50YXguXG4gKlxuICogVGhpcyBzZXJ2aWNlIHJlZ2lzdGVycyBhIG51bWJlciBvZiBbZGVmYXVsdCBjdXN0b20gSUNVIGZvcm1hdHNde0BsaW5rIERFRkFVTFRfRk9STUFUU30uIFRoZXNlIGNhbiBiZSBvdmVycmlkZGVuIG9yXG4gKiBleHRlbmRlZCBieSBwcm92aWRpbmcgdGhlIFtJTlRMX0NPTkZJR117QGxpbmsgSU5UTF9DT05GSUd9IGluamVjdGlvbiB0b2tlbi5cbiAqL1xuLyogZXNsaW50LWVuYWJsZSBqc2RvYy9jaGVjay1hbGlnbm1lbnQsIGpzZG9jL2NoZWNrLWluZGVudGF0aW9uLCBqc2RvYy9uZXdsaW5lLWFmdGVyLWRlc2NyaXB0aW9uICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgSW50bFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIFRoZSBwcmVmaXggZm9yIElDVSBtZXNzYWdlcyB0byBiZSByZXRyaWV2ZWQgZnJvbSBbTG9jYWxlRGF0YS5tZXNzYWdlc117QGxpbmsgTG9jYWxlRGF0YSNtZXNzYWdlc31cbiAgICAgKiBieSB7QGxpbmsgZm9ybWF0TWVzc2FnZX1cbiAgICAgKi9cbiAgICByZWFkb25seSBtZXNzYWdlUHJlZml4ID0gXCJtc2cjXCI7XG4gICAgLyoqXG4gICAgICogQW4gYWx0ZXJuYXRpdmUgcHJlZml4IGZvciBpbmxpbmUgSUNVIG1lc3NhZ2VzIHByb2Nlc3NlZCBieSB7QGxpbmsgZm9ybWF0TWVzc2FnZX1cbiAgICAgKi9cbiAgICByZWFkb25seSB0ZXh0UHJlZml4ID0gXCJ0eHQjXCI7XG4gICAgLyoqXG4gICAgICogVGhlIGF2YWlsYWJsZSBsb2NhbGVzXG4gICAgICovXG4gICAgbG9jYWxlczogTG9jYWxlW107XG4gICAgLyoqIFRoZSBjdXJyZW50IGxvY2FsZSAqL1xuICAgIGN1cnJlbnRMb2NhbGU6IExvY2FsZTtcbiAgICBwcm90ZWN0ZWQgaW50bExvY2FsZTogc3RyaW5nO1xuICAgIC8qKiBUaGUgY3VycmVudCBkaXJlY3Rpb24gKi9cbiAgICBkaXJlY3Rpb246IFwibHRyXCIgfCBcInJ0bFwiO1xuICAgIHByb3RlY3RlZCBfZXZlbnRzOiBTdWJqZWN0PExvY2FsZUNoYW5nZUV2ZW50PjtcbiAgICBwcm90ZWN0ZWQgZm9ybWF0czogSW50bEZvcm1hdHM7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChJTlRMX0NPTkZJRykgcHJvdGVjdGVkIGludGxDb25maWc6IEludGxDb25maWcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTE9DQUxFU19DT05GSUcpIHByb3RlY3RlZCBsb2NhbGVzQ29uZmlnOiBMb2NhbGVzQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnRsQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmludGxDb25maWcgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxvY2FsZXNDb25maWcpIHtcbiAgICAgICAgICAgIGlmICghbG9jYWxlc0NvbmZpZykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMT0NBTEVTX0NPTkZJRyBoYXMgbm90IGJlZW4gcHJvdmlkZWQgYnkgdGhlIGNhbGxpbmcgYXBwLiBcIiArXG4gICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIGltcG9ydCBJbnRsTW9kdWxlIHVzaW5nIHRoZSBmb3JSb290IG1ldGhvZCB0byB3aGljaCB5b3Ugc2hvdWxkIHBhc3MgYSBMb2NhbGVzQ29uZmlnIG9iamVjdFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgU3ViamVjdDxMb2NhbGVDaGFuZ2VFdmVudD4oKTtcbiAgICAgICAgdGhpcy5sb2NhbGVzID0gbG9jYWxlc0NvbmZpZy5sb2NhbGVzIHx8IFtsb2NhbGVzQ29uZmlnLmRlZmF1bHRMb2NhbGVdO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldExhbmd1YWdlKG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzZXBQb3MgPSBuYW1lLmluZGV4T2YoXCItXCIpO1xuICAgICAgICBpZiAoc2VwUG9zID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWUuc3Vic3RyaW5nKDAsIHNlcFBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0QnJvd3Nlckxhbmd1YWdlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICgobmF2aWdhdG9yIGFzIGFueSkubGFuZ3VhZ2VzKSB7XG4gICAgICAgICAgICByZXR1cm4gKG5hdmlnYXRvciBhcyBhbnkpLmxhbmd1YWdlcztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IG5hdmlnYXRvci5sYW5ndWFnZSB8fCAobmF2aWdhdG9yIGFzIGFueSkudXNlckxhbmd1YWdlIHx8XG4gICAgICAgICAgICAobmF2aWdhdG9yIGFzIGFueSkuYnJvd3Nlckxhbmd1YWdlIHx8IChuYXZpZ2F0b3IgYXMgYW55KS5zeXN0ZW1MYW5ndWFnZTtcbiAgICAgICAgcmV0dXJuICEhbGFuZ3VhZ2UgPyBbbGFuZ3VhZ2VdIDogW107XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBvYnNlcnZhYmxlIGV2ZW50cyBlbWl0dGVkIGJ5IHRoaXMgc2VydmljZVxuICAgICAqL1xuICAgIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxMb2NhbGVDaGFuZ2VFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbExvY2FsZSgpOiBMb2NhbGUge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNpbmVxdWEtbG9jYWxlXCIpO1xuICAgICAgICBjb25zdCBsYW5ndWFnZXMgPSAhIWxhbmd1YWdlID8gW2xhbmd1YWdlXSA6IEludGxTZXJ2aWNlLmdldEJyb3dzZXJMYW5ndWFnZXMoKTtcbiAgICAgICAgbGV0IGxvY2FsZSA9IHRoaXMuZ2V0TG9jYWxlKGxhbmd1YWdlcyk7XG4gICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxlID0gdGhpcy5nZXRMb2NhbGUobGFuZ3VhZ2VzLCB0cnVlKTtcbiAgICAgICAgaWYgKGxvY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVzQ29uZmlnLmRlZmF1bHRMb2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgc2VydmljZS4gVGhlIGN1cnJlbnQgbG9jYWxlIGlzIGluaXRpYWxpemVkIHRvIGVpdGhlciB0aGUgYHNpbmVxdWEtbG9jYWxlYCBsb2NhbFxuICAgICAqIHN0b3JhZ2UgdmFsdWUsIHRoZSBicm93c2VyIGxhbmd1YWdlIG9yIHRoZSBkZWZhdWx0IGxvY2FsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSB7QGxpbmsgSW50bE1vZHVsZX0gYXQgYXBwbGljYXRpb24gc3RhcnR1cC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gQW4gb2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudCBsb2NhbGVcbiAgICAgKi9cbiAgICBpbml0KCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgICAgIC8vIFNldCB1cCBmb3JtYXRzXG4gICAgICAgIHRoaXMuZm9ybWF0cyA9IFV0aWxzLm1lcmdlKERFRkFVTFRfRk9STUFUUywgdGhpcy5pbnRsQ29uZmlnLmZvcm1hdHMpO1xuICAgICAgICAvLyBMb2FkIGRlZmF1bHQgbG9jYWxlXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gdGhpcy51c2UodGhpcy5sb2NhbGVzQ29uZmlnLmRlZmF1bHRMb2NhbGUubmFtZSwgZmFsc2UpO1xuICAgICAgICBjb25zdCBpbml0aWFsTG9jYWxlID0gdGhpcy5nZXRJbml0aWFsTG9jYWxlKCk7XG4gICAgICAgIGlmIChpbml0aWFsTG9jYWxlICE9PSB0aGlzLmxvY2FsZXNDb25maWcuZGVmYXVsdExvY2FsZSkge1xuICAgICAgICAgICAgLy8gTG9hZCBpbml0aWFsIGxvY2FsZSBpZiBkaWZmZXJlbnQgdG8gZGVmYXVsdFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZXR0aW5nIGluaXRpYWwgbG9jYWxlOiBcIiwgaW5pdGlhbExvY2FsZS5uYW1lKTtcbiAgICAgICAgICAgIG9ic2VydmFibGUgPSBjb25jYXQ8c3RyaW5nPihvYnNlcnZhYmxlLCB0aGlzLnVzZShpbml0aWFsTG9jYWxlLm5hbWUsIGZhbHNlKSkucGlwZShsYXN0PHN0cmluZz4oKSk7XG4gICAgICAgIH1cbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluaXRpYWwgbG9jYWxlIHNldDogXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWREYXRhKGxvY2FsZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMb2NhbGVEYXRhPiB7XG4gICAgICAgIGlmICghdGhpcy5sb2NhbGVzQ29uZmlnLmxvYWRMb2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKFwiRHluYW1pYyBsb2NhbGUgbG9hZGluZyBoYXMgbm90IGJlZW4gaW1wbGVtZW50ZWQgaW4gdGhlIGNhbGxpbmcgYXBwIC0gXCIgICtcbiAgICAgICAgICAgICAgICBcInBsZWFzZSBhZGQgYSBsb2FkTG9jYWxlIGhhbmRsZXIgdG8geW91ciBMb2NhbGVzQ29uZmlnXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZXNDb25maWcubG9hZExvY2FsZShsb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9jYWxlKG5hbWVzOiBzdHJpbmcgfCBzdHJpbmdbXSwgYXBwcm94aW1hdGUgPSBmYWxzZSk6IExvY2FsZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIG5hbWVzID0gW25hbWVzXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMubG9jYWxlcy5maW5kKChsb2NhbGUxKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZTEubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFwcHJveGltYXRlICYmIEludGxTZXJ2aWNlLmdldExhbmd1YWdlKGxvY2FsZTEubmFtZSkgPT09IEludGxTZXJ2aWNlLmdldExhbmd1YWdlKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsb2NhbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHRoZSBjdXJyZW50IGxvY2FsZS4gVGhlIGNoYW5nZSBpcyBtYWRlIGFzeW5jaHJvbm91c2x5IGFzIHRoZSBsb2NhbGUgbWF5IG5lZWQgdG8gYmVcbiAgICAgKiBkb3dubG9hZGVkLiBUaGUgY3VycmVudCBsb2NhbGUgaXMgb3B0aW9uYWxseSBzdG9yZWQgaW4gbG9jYWwgc3RvcmFnZSAoYHNpbmVxdWEtbG9jYWxlYClcbiAgICAgKiB0byBiZSBwaWNrZWQgdXAgdGhlIG5leHQgdGltZSB0aGUgc2VydmljZSBpcyBpbml0aWFsaXplZFxuICAgICAqXG4gICAgICogQHBhcmFtIGxvY2FsZSBUaGUgbmFtZSBvZiB0aGUgbG9jYWxlIHRvIHVzZVxuICAgICAqIEBwYXJhbSBzdG9yZSBJZiBgdHJ1ZWAgdGhlIGN1cnJlbnQgbG9jYWxlIGlzIHN0b3JlZCBpbiBsb2NhbCBzdG9yYWdlXG4gICAgICovXG4gICAgdXNlKGxvY2FsZTogc3RyaW5nLCBzdG9yZSA9IHRydWUpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgICAgICBjb25zdCBuZXdMb2NhbGUgPSB0aGlzLmdldExvY2FsZShsb2NhbGUpO1xuICAgICAgICBpZiAoIW5ld0xvY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3Ioe2Vycm9yOiBcInVuc3VwcG9ydGVkIGxvY2FsZVwifSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gISFuZXdMb2NhbGUuZGF0YSA/IG9mKG5ld0xvY2FsZS5kYXRhKSA6IHRoaXMubG9hZERhdGEobG9jYWxlKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlPExvY2FsZURhdGE+KG9ic2VydmFibGUsXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExvY2FsZSA9IG5ld0xvY2FsZTtcblxuICAgICAgICAgICAgICAgIGlmIChzdG9yZSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaW5lcXVhLWxvY2FsZVwiLCB0aGlzLmN1cnJlbnRMb2NhbGUubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmN1cnJlbnRMb2NhbGUuZGlyZWN0aW9uIHx8IFwibHRyXCI7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudExvY2FsZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExvY2FsZS5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgbW9tZW50IGxvY2FsZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2NhbGUuZGF0YS5tb21lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IChhbmQgZGVmaW5lIGlmIG5lY2Vzc2FyeSkgbW9tZW50IGxvY2FsZSAoaXQgYXV0by1kZWZpbmVzIHdoZW4gd2UgYXJlIG5vdCBidW5kbGVkKVxuICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50LmxvY2FsZSh0aGlzLmN1cnJlbnRMb2NhbGUuZGF0YS5tb21lbnQubG9jYWxlKSAhPT0gdGhpcy5jdXJyZW50TG9jYWxlLmRhdGEubW9tZW50LmxvY2FsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG1vbWVudCBsb2NhbGUgbm90IGRlZmluZWQ6ICR7dGhpcy5jdXJyZW50TG9jYWxlLmRhdGEubW9tZW50LmxvY2FsZX0gLSBkZWZhdWx0aW5nIHRvIGVuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb21lbnQubG9jYWxlKFwiZW5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1vbWVudC5sb2NhbGUoXCJlblwiKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgZDMgbG9jYWxlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudExvY2FsZS5kYXRhLmQzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdERlZmF1bHRMb2NhbGUodGhpcy5jdXJyZW50TG9jYWxlLmRhdGEuZDMuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgdGltZUZvcm1hdERlZmF1bHRMb2NhbGUodGhpcy5jdXJyZW50TG9jYWxlLmRhdGEuZDMudGltZSk7XG4gICAgICAgICAgICAgICAgICAgIGQzLmZvcm1hdERlZmF1bHRMb2NhbGUodGhpcy5jdXJyZW50TG9jYWxlLmRhdGEuZDMuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgZDMudGltZUZvcm1hdERlZmF1bHRMb2NhbGUodGhpcy5jdXJyZW50TG9jYWxlLmRhdGEuZDMudGltZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudExvY2FsZS5kYXRhLmludGwgJiYgdGhpcy5jdXJyZW50TG9jYWxlLmRhdGEuaW50bC5sb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRsTG9jYWxlID0gdGhpcy5jdXJyZW50TG9jYWxlLmRhdGEuaW50bC5sb2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGxMb2NhbGUgPSB0aGlzLmxvY2FsZXNDb25maWcuZGVmYXVsdExvY2FsZS5kYXRhID8gdGhpcy5sb2NhbGVzQ29uZmlnLmRlZmF1bHRMb2NhbGUuZGF0YS5pbnRsLmxvY2FsZSA6IFwiZW5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHRoaXMuaW50bExvY2FsZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBvYnNlcnZhYmxlMiA9IG9ic2VydmFibGUucGlwZShtYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50TG9jYWxlLm5hbWU7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZTIsXG4gICAgICAgICAgICAobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHtsb2NhbGU6IG5hbWV9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlMjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERlZmF1bHRNZXNzYWdlcygpOiBhbnkge1xuICAgICAgICBjb25zdCBfZGVmYXVsdCA9IHRoaXMubG9jYWxlcy5maW5kKCh2YWx1ZSkgPT4gISF2YWx1ZS5kYXRhICYmICEhdmFsdWUuZGF0YS5tZXNzYWdlcyk7XG4gICAgICAgIGlmIChfZGVmYXVsdCkge1xuICAgICAgICAgICAgcmV0dXJuIF9kZWZhdWx0LmRhdGEgJiYgX2RlZmF1bHQuZGF0YS5tZXNzYWdlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNZXNzYWdlcygpOiBhbnkge1xuICAgICAgICBsZXQgbWVzc2FnZXM7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRMb2NhbGUgJiYgdGhpcy5jdXJyZW50TG9jYWxlLmRhdGEpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gdGhpcy5jdXJyZW50TG9jYWxlLmRhdGEubWVzc2FnZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtZXNzYWdlcykge1xuICAgICAgICAgICAgbWVzc2FnZXMgPSB0aGlzLmdldERlZmF1bHRNZXNzYWdlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1lc3NhZ2UgZnJvbSB0aGUgY3VycmVudCBsb2NhbGUgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgcGFzc2VkIGBrZXlgLlxuICAgICAqIElmIHRoZSBpcyBub3QgcHJlZml4ZWQgYnkge0BsaW5rIG1lc3NhZ2VQcmVmaXh9IHRoZW4gYG51bGxgIGlzIHJldHVybmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBtZXNzYWdlIGtleVxuICAgICAqL1xuICAgIGdldE1lc3NhZ2Uoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIVV0aWxzLnN0YXJ0c1dpdGgoa2V5LCB0aGlzLm1lc3NhZ2VQcmVmaXgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGtleSA9IGtleS5zdWJzdHIodGhpcy5tZXNzYWdlUHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gdGhpcy5nZXRNZXNzYWdlcygpO1xuICAgICAgICBsZXQgbWVzc2FnZSA9IGdldChtZXNzYWdlcywga2V5KTtcbiAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0TWVzc2FnZXMgPSB0aGlzLmdldERlZmF1bHRNZXNzYWdlcygpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzICE9PSBkZWZhdWx0TWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gZ2V0KGRlZmF1bHRNZXNzYWdlcywga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5lZCBzdGFydCBhbmQgZW5kIGFyZSBmb3IgdGhlIHRleHQgQkVGT1JFIHRoZSBsYW5ndWFnZSBzcGVjaWZpZXIgYW5kIHNvIHJlZmVyIHRvIHRoZSBwcmV2aW91c1xuICAgIC8vIGxhbmd1YWdlIG5vdCB0aGUgb25lIHJldHVybmVkIGJ5IHRoZSBzYW1lIGNhbGwgdG8gdGhpcyBtZXRob2RcbiAgICBwcml2YXRlIG5leHRMYW5nKHRleHQ6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgYWxsb3dOb25lOiBib29sZWFuKTogTmV4dExhbmcgfCB1bmRlZmluZWQge1xuICAgICAgICBmb3IgKGxldCBpID0gc3RhcnQsIGljID0gdGV4dC5sZW5ndGggLSAzOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRleHRbaV0gPT09IFwiW1wiICYmIHRleHRbaSArIDNdID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGksXG4gICAgICAgICAgICAgICAgICAgIGxhbmcxOiB0ZXh0LmNoYXJDb2RlQXQoaSArIDEpLFxuICAgICAgICAgICAgICAgICAgICBsYW5nMjogdGV4dC5jaGFyQ29kZUF0KGkgKyAyKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbG93Tm9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IHRleHQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGxhbmcxOiAtMSxcbiAgICAgICAgICAgICAgICBsYW5nMjogLTFcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyAoW25ubl0pPGRlZmF1bHQ+W2ZyXTxmcmVuY2g+W2RlXTxnZXJtYW4+Li4uXG4gICAgcHJpdmF0ZSBzeXNMYW5nKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGlTdGFydCA9IDA7XG4gICAgICAgIGNvbnN0IGxlbiA9IHRleHQubGVuZ3RoO1xuICAgICAgICAvLyBTa2lwIG9yZGVyXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgaWYgKHRleHRbaV0gPT09IFwiW1wiKSB7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IGxlbiAmJiB0ZXh0W2ldID49IFwiMFwiICYmIHRleHRbaV0gPD0gXCI5XCIpIHtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGV4dFtpXSA9PT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICBpU3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBQaWNrIG91dCBkZWZhdWx0IHZhbHVlXG4gICAgICAgIGNvbnN0IGRlZmF1bHRMYW5nID0gdGhpcy5uZXh0TGFuZyh0ZXh0LCBpU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgaWYgKCFkZWZhdWx0TGFuZykge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7IC8vIE5vdCBhIHN5cyBsYW5nIGZvcm1hdHRlZCB0ZXh0XG4gICAgICAgIH1cbiAgICAgICAgLy8gTG9vayBmb3IgYSBtYXRjaGluZyBsYW5ndWFnZVxuICAgICAgICBjb25zdCBsYW5nMSA9IHRoaXMuY3VycmVudExvY2FsZS5uYW1lLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGNvbnN0IGxhbmcyID0gdGhpcy5jdXJyZW50TG9jYWxlLm5hbWUuY2hhckNvZGVBdCgxKTtcbiAgICAgICAgbGV0IGN1ckxhbmc6IE5leHRMYW5nIHwgdW5kZWZpbmVkID0gZGVmYXVsdExhbmc7XG4gICAgICAgIHdoaWxlIChjdXJMYW5nKSB7XG4gICAgICAgICAgICBpZiAobGFuZzEgPT09IGN1ckxhbmcubGFuZzEgJiYgbGFuZzIgPT09IGN1ckxhbmcubGFuZzIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIGEgbWF0Y2hpbmcgbGFuZ3VhZ2UsIGdldCBpdHMgdGV4dFxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRMYW5nID0gdGhpcy5uZXh0TGFuZyh0ZXh0LCBjdXJMYW5nLmVuZCArIDQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cmluZyhuZXh0TGFuZyEuc3RhcnQsIG5leHRMYW5nIS5lbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VyTGFuZyA9IHRoaXMubmV4dExhbmcodGV4dCwgY3VyTGFuZy5lbmQgKyA0LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIGRlZmF1bHQgbGFuZ3VhZ2UgdGV4dFxuICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHJpbmcoZGVmYXVsdExhbmcuc3RhcnQsIGRlZmF1bHRMYW5nLmVuZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9jZXNzRm9ybWF0TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcsIHZhbHVlcyA9IHt9KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaGFzVmFsdWVzID0gT2JqZWN0LmtleXModmFsdWVzKS5sZW5ndGggPiAwO1xuICAgICAgICBpZiAoIWhhc1ZhbHVlcykge1xuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gZm9ybWF0dGVycy5nZXRNZXNzYWdlRm9ybWF0KG1lc3NhZ2UsIHRoaXMuaW50bExvY2FsZSwgdGhpcy5mb3JtYXRzLCB7Zm9ybWF0dGVyc30pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE1lc3NhZ2UgPSBmb3JtYXR0ZXIuZm9ybWF0KHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZE1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW50bFNlcnZpY2UucHJvY2Vzc0Zvcm1hdE1lc3NhZ2UgZXJyb3I6XCIsIGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgYSBtZXNzYWdlIGlkZW50aWZpZWQgYnkgYSBga2V5YC4gQW55IHZhbHVlcyByZWZlcmVuY2VkXG4gICAgICogYnkgdGhlIG1lc3NhZ2UgYXJlIHRha2VuIGZyb20gYW4gb3B0aW9uYWwgYHZhbHVlc2AgbWFwLiBUaGUga2V5IGNhbiBiZVxuICAgICAqIGluIGEgdmFyaWV0eSBvZiBmb3JtczpcbiAgICAgKiAqIGEgU2luZXF1YSBcInN5c2xhbmdcIiBzdHJpbmc6IGBhcHBsZVtmcl1wb21tZVtkZV1BcGZlbGBcbiAgICAgKiAqIGEgbWVzc2FnZSBrZXkgcmVzb2x2ZWQgaW4gdGhlIFttZXNzYWdlc117QGxpbmsgTG9jYWxlRGF0YSNtZXNzYWdlc30gb2YgdGhlIGN1cnJlbnRcbiAgICAgKiBsb2NhbGU6ICBgbXNnI3BhdGgxLnBhdGgyLnBhdGgzYFxuICAgICAqICogYW4gSUNVIG1lc3NhZ2UgdXNpbmcgdGhlIGB0eHQjYCBwcmVmaXg6IGB0eHQjSGVsbG8ge25hbWV9YFxuICAgICAqXG4gICAgICogQHBhcmFtIGtleSBUaGUgbWVzc2FnZSBpZGVudGlmaWVyXG4gICAgICogQHBhcmFtIHZhbHVlcyBWYWx1ZXMgcmVmZXJlbmNlZCBieSBhbiBJQ1UgbWVzc2FnZVxuICAgICAqIEByZXR1cm4gVGhlIGZvcm1hdHRlZCBtZXNzYWdlLiBJZiB0aGUga2V5IGlzIG5vdCByZXNvbHZlZCB0aGVuIGl0IGlzIHJldHVybmVkIHVucHJvY2Vzc2VkXG4gICAgICovXG4gICAgZm9ybWF0TWVzc2FnZShrZXk6IHN0cmluZywgdmFsdWVzPzogTWFwT2Y8YW55Pik6IHN0cmluZyB7XG4gICAgICAgIGtleSA9IFV0aWxzLnRyaW0oa2V5KTtcbiAgICAgICAgY29uc3Qgc3lzTGFuZ1N0ciA9IHRoaXMuc3lzTGFuZyhrZXkpO1xuICAgICAgICBpZiAoc3lzTGFuZ1N0ciAhPT0ga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3lzTGFuZ1N0cjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBfdmFsdWVzID0ge307XG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWVOYW1lIG9mIE9iamVjdC5rZXlzKHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1t2YWx1ZU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiBVdGlscy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3ZhbHVlc1t2YWx1ZU5hbWVdID0gdGhpcy5mb3JtYXRNZXNzYWdlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF92YWx1ZXNbdmFsdWVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuc3RhcnRzV2l0aChrZXksIHRoaXMubWVzc2FnZVByZWZpeCkpIHtcbiAgICAgICAgICAgIGlmIChVdGlscy5lcShrZXksIHRoaXMubWVzc2FnZVByZWZpeCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmdldE1lc3NhZ2Uoa2V5KTtcbiAgICAgICAgICAgIGlmICghVXRpbHMuaXNTdHJpbmcobWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTWVzc2FnZSA9IHRoaXMucHJvY2Vzc0Zvcm1hdE1lc3NhZ2UobWVzc2FnZSwgX3ZhbHVlcyk7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChVdGlscy5zdGFydHNXaXRoKGtleSwgdGhpcy50ZXh0UHJlZml4KSkge1xuICAgICAgICAgICAgaWYgKFV0aWxzLmVxKGtleSwgdGhpcy50ZXh0UHJlZml4KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXkgPSBrZXkuc3Vic3RyKHRoaXMudGV4dFByZWZpeC5sZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTWVzc2FnZSA9IHRoaXMucHJvY2Vzc0Zvcm1hdE1lc3NhZ2Uoa2V5LCBfdmFsdWVzKTtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWRNZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCBhbiBJQ1UgTWVzc2FnZSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0IEFuIElDVSBNZXNzYWdlIHRvIGZvcm1hdFxuICAgICAqIEBwYXJhbSB2YWx1ZXMgVmFsdWVzIHJlZmVyZW5jZWQgYnkgYW4gSUNVIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBmb3JtYXRUZXh0KHRleHQ6IHN0cmluZywgdmFsdWVzPzoge30pOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRNZXNzYWdlID0gdGhpcy5wcm9jZXNzRm9ybWF0TWVzc2FnZSh0ZXh0LCB2YWx1ZXMpO1xuICAgICAgICByZXR1cm4gZm9ybWF0dGVkTWVzc2FnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJzZSBhIGRhdGUgc3RyaW5nIGluIHRoZSBjdXJyZW50IGxvY2FsZSAtIGVnIGAwNC8wOS8xOTg2YFxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIEEgZGF0ZSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBUaGUgcGFyc2UgYERhdGVgIG9yIGB1bmRlZmluZWRgIGlmIHRoZSBkYXRlIGNhbm5vdCBiZSBwYXJzZWRcbiAgICAgKi9cbiAgICBwYXJzZURhdGUodmFsdWU6IHN0cmluZyk6IERhdGUgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBtID0gbW9tZW50KHZhbHVlLCBcIkxcIik7XG4gICAgICAgIGlmIChtLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG0udG9EYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5hbWVkRm9ybWF0KHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMgfCBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBmb3JtYXQgPSB0aGlzLmZvcm1hdHMgJiYgdGhpcy5mb3JtYXRzW3R5cGVdICYmIHRoaXMuZm9ybWF0c1t0eXBlXVtuYW1lXTtcbiAgICAgICAgaWYgKGZvcm1hdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oYEludGxTZXJ2aWNlLmdldE5hbWVkRm9ybWF0IC0gbm90IGZvdW5kIC0gdHlwZTogJHt0eXBlfSwgbmFtZTogJHtuYW1lfWApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlsdGVyUHJvcHMocHJvcHM6IHtbazogc3RyaW5nXTogYW55fSwgd2hpdGVsaXN0OiBzdHJpbmdbXSwgZGVmYXVsdHM6IHtbazogc3RyaW5nXTogYW55fSA9IHt9KTogYW55IHtcbiAgICAgICAgcmV0dXJuIHdoaXRlbGlzdC5yZWR1Y2U8e1trOiBzdHJpbmddOiBzdHJpbmd9PigoZmlsdGVyZWQsIG5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkW25hbWVdID0gcHJvcHNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkZWZhdWx0cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIGZpbHRlcmVkW25hbWVdID0gZGVmYXVsdHNbbmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgYSBkYXRlIGluIHRoZSBjdXJyZW50IGxvY2FsZSBhY2NvcmRpbmcgdG8gdGhlIHBhc3NlZCBvcHRpb25zLiBJZiB0aGUgcGFzc2VkIGB2YWx1ZWAgaXMgbm90IGEgYERhdGVgXG4gICAgICogdGhlbiBvbmUgaXMgY29uc3RydWN0ZWQgZnJvbSBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgZGF0ZSB0byBmb3JtYXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBjYW4gaW5jbHVkZSBhIGN1c3RvbSBmb3JtYXRcbiAgICAgKi9cbiAgICBmb3JtYXREYXRlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlLCBvcHRpb25zOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyAmIHsgZm9ybWF0Pzogc3RyaW5nIH0gPSB7fSk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHtmb3JtYXR9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgZGF0ZSA9IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IHZhbHVlIDogbmV3IERhdGUodmFsdWUpO1xuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IChmb3JtYXQgJiYgdGhpcy5nZXROYW1lZEZvcm1hdChcImRhdGVcIiwgZm9ybWF0KSkgfHwge307XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyUHJvcHMob3B0aW9ucywgREFURV9USU1FX0ZPUk1BVF9PUFRJT05TLCBkZWZhdWx0cyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVycy5nZXREYXRlVGltZUZvcm1hdCh0aGlzLmludGxMb2NhbGUsIGZpbHRlcmVkT3B0aW9ucykuZm9ybWF0KGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnRsU2VydmljZS5mb3JtYXREYXRlOlwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKGRhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvcm1hdCBhIHRpbWUgaW4gdGhlIGN1cnJlbnQgbG9jYWxlIGFjY29yZGluZyB0byB0aGUgcGFzc2VkIG9wdGlvbnMuIElmIHRoZSBwYXNzZWQgYHZhbHVlYCBpcyBub3QgYSBgRGF0ZWAgdGhlbiBvbmUgaXNcbiAgICAgKiBjb25zdHJ1Y3RlZCBmcm9tIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSBkYXRlIHRvIGZvcm1hdFxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGNhbiBpbmNsdWRlIGEgY3VzdG9tIGZvcm1hdFxuICAgICAqL1xuICAgIGZvcm1hdFRpbWUodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IERhdGUsIG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zICYgeyBmb3JtYXQ/OiBzdHJpbmcgfSA9IHt9KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qge2Zvcm1hdH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBkYXRlID0gdmFsdWUgaW5zdGFuY2VvZiBEYXRlID8gdmFsdWUgOiBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRzID0gKGZvcm1hdCAmJiB0aGlzLmdldE5hbWVkRm9ybWF0KFwidGltZVwiLCBmb3JtYXQpKSB8fCB7fTtcbiAgICAgICAgbGV0IGZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyUHJvcHMob3B0aW9ucywgREFURV9USU1FX0ZPUk1BVF9PUFRJT05TLCBkZWZhdWx0cyk7XG4gICAgICAgIGlmICghZmlsdGVyZWRPcHRpb25zLmhvdXIgJiYgIWZpbHRlcmVkT3B0aW9ucy5taW51dGUgJiYgIWZpbHRlcmVkT3B0aW9ucy5zZWNvbmQpIHtcbiAgICAgICAgICAgIC8vIEFkZCBkZWZhdWx0IGZvcm1hdHRpbmcgb3B0aW9ucyBpZiBob3VyLCBtaW51dGUsIG9yIHNlY29uZCBpc24ndCBkZWZpbmVkLlxuICAgICAgICAgICAgZmlsdGVyZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZE9wdGlvbnMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBob3VyOiAnbnVtZXJpYycsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZTogJ251bWVyaWMnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXJzLmdldERhdGVUaW1lRm9ybWF0KHRoaXMuaW50bExvY2FsZSwgZmlsdGVyZWRPcHRpb25zKS5mb3JtYXQoZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkludGxTZXJ2aWNlLmZvcm1hdFRpbWU6XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcoZGF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYWtlUmVsYXRpdmVUaW1lUGFyYW1zKHZhbHVlOiBEYXRlKTogeyB2YWx1ZTogbnVtYmVyLCB1bml0OiBJbnRsLlJlbGF0aXZlVGltZVVuaXQgfSB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSB2YWx1ZS5nZXRUaW1lKCkgLSBVdGlscy5ub3cuZ2V0VGltZSgpO1xuICAgICAgICBjb25zdCBhYnNEaWZmID0gTWF0aC5hYnMoZGlmZik7XG4gICAgICAgIGlmIChhYnNEaWZmIDwgVXRpbHMub25lU2Vjb25kKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogMCwgdW5pdDogXCJzZWNvbmRzXCIgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhYnNEaWZmIDwgVXRpbHMub25lTWludXRlKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogVXRpbHMucm91bmRBd2F5KGRpZmYgLyBVdGlscy5vbmVTZWNvbmQpLCB1bml0OiBcInNlY29uZHNcIiB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFic0RpZmYgPCBVdGlscy5vbmVIb3VyKSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogVXRpbHMucm91bmRBd2F5KGRpZmYgLyBVdGlscy5vbmVNaW51dGUpLCB1bml0OiBcIm1pbnV0ZXNcIiB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFic0RpZmYgPCBVdGlscy5vbmVEYXkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBVdGlscy5yb3VuZEF3YXkoZGlmZiAvIFV0aWxzLm9uZUhvdXIpLCB1bml0OiBcImhvdXJzXCIgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhYnNEaWZmIDwgKFV0aWxzLm9uZURheSAqIDMwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IFV0aWxzLnJvdW5kQXdheShkaWZmIC8gVXRpbHMub25lRGF5KSwgdW5pdDogXCJkYXlzXCIgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhYnNEaWZmIDwgKFV0aWxzLm9uZURheSAqIDM2NSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBVdGlscy5yb3VuZEF3YXkoZGlmZiAvIChVdGlscy5vbmVEYXkgKiAzMCkpLCB1bml0OiBcIm1vbnRoc1wiIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogVXRpbHMucm91bmRBd2F5KGRpZmYgLyAoVXRpbHMub25lRGF5ICogMzY1KSksIHVuaXQ6IFwieWVhcnNcIiB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IGEgcmVsYXRpdmUgdGltZSBpbiB0aGUgY3VycmVudCBsb2NhbGUgYWNjb3JkaW5nIHRvIHRoZSBwYXNzZWQgb3B0aW9uc1xuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSByZWxhdGl2ZSB0aW1lIHRvIGZvcm1hdC4gTmVnYXRpdmUgbnVtYmVyIHZhbHVlcyByZXByZXNlbnQgdGltZXMgaW4gdGhlIHBhc3QuXG4gICAgICogSWYgYSBEYXRlIHZhbHVlIGlzIHBhc3NlZCB0aGVuIGEgbnVtYmVyIHZhbHVlIGFuZCB1bml0IGFyZSBkZWR1Y2VkIGF1dG9tYXRpY2FsbHkgYmFzZWQgb25cbiAgICAgKiB0aGUgY3VycmVudCBkYXRlIGFuZCB0aW1lLlxuICAgICAqIEBwYXJhbSB1bml0IFRoZSByZWxhdGl2ZSB0aW1lIHVuaXQgKGVnIHllYXJzLCBkYXlzIG9yIHNlY29uZHMpLiBNdXN0IGJlIHBhc3NlZCBpZiB2YWx1ZVxuICAgICAqIGlzIGEgbnVtYmVyLlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGNhbiBpbmNsdWRlIGEgY3VzdG9tIGZvcm1hdFxuICAgICAqL1xuICAgIGZvcm1hdFJlbGF0aXZlVGltZShcbiAgICAgICAgdmFsdWU6IHN0cmluZyB8IG51bWJlciB8IERhdGUgfCB1bmRlZmluZWQsIHVuaXQ/OiBJbnRsLlJlbGF0aXZlVGltZVVuaXQsXG4gICAgICAgIG9wdGlvbnM6IEludGwuUmVsYXRpdmVUaW1lRm9ybWF0T3B0aW9ucyAmIHsgZm9ybWF0Pzogc3RyaW5nIH0gPSB7fVxuICAgICk6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gIHRoaXMubWFrZVJlbGF0aXZlVGltZVBhcmFtcyh2YWx1ZSk7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcmFtcy52YWx1ZTtcbiAgICAgICAgICAgIHVuaXQgPSBwYXJhbXMudW5pdDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGZvcm1hdCB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSAoZm9ybWF0ICYmIHRoaXMuZ2V0TmFtZWRGb3JtYXQoXCJyZWxhdGl2ZVRpbWVcIiwgZm9ybWF0KSkgfHwge307XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyUHJvcHMob3B0aW9ucywgUkVMQVRJVkVfVElNRV9GT1JNQVRfT1BUSU9OUywgZGVmYXVsdHMpO1xuICAgICAgICBpZiAoIWZpbHRlcmVkT3B0aW9ucy5udW1lcmljKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZE9wdGlvbnMubnVtZXJpYyA9IFwiYXV0b1wiOyAvLyBkZWZhdWx0IGlzIGFsd2F5cyAtIHdlIHByZWZlciBhdXRvXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXJzLmdldFJlbGF0aXZlVGltZUZvcm1hdCh0aGlzLmludGxMb2NhbGUsIGZpbHRlcmVkT3B0aW9ucykuZm9ybWF0KHZhbHVlLCB1bml0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSW50bFNlcnZpY2UuZm9ybWF0UmVsYXRpdmVUaW1lOlwiLCBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgYSBudW1iZXIgaW4gdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG51bWJlciB0byBmb3JtYXRcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBUaGUgb3B0aW9ucyBjYW4gaW5jbHVkZSBhIGN1c3RvbSBmb3JtYXRcbiAgICAgKi9cbiAgICBmb3JtYXROdW1iZXIodmFsdWU6IGFueSwgb3B0aW9uczogSW50bC5OdW1iZXJGb3JtYXRPcHRpb25zICYgeyBmb3JtYXQ/OiBhbnkgfSA9IHt9KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qge2Zvcm1hdH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IGZvcm1hdCAmJiB0aGlzLmdldE5hbWVkRm9ybWF0KFwibnVtYmVyXCIsIGZvcm1hdCk7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkT3B0aW9ucyA9IHRoaXMuZmlsdGVyUHJvcHMob3B0aW9ucywgTlVNQkVSX0ZPUk1BVF9PUFRJT05TLCBkZWZhdWx0cyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1hdHRlcnMuZ2V0TnVtYmVyRm9ybWF0KHRoaXMuaW50bExvY2FsZSwgZmlsdGVyZWRPcHRpb25zKS5mb3JtYXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnRsU2VydmljZS5mb3JtYXROdW1iZXI6XCIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==