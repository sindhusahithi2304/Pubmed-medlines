import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Optional, Inject, ɵɵdirectiveInject, ɵɵinjectPipeChangeDetectorRef, ɵɵdefinePipe, Pipe, ChangeDetectorRef, ɵɵdefineNgModule, ɵɵdefineInjector, APP_INITIALIZER, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Utils, BaseModule } from '@sinequa/core/base';
import { Subject, concat, throwError, of } from 'rxjs';
import { last, map } from 'rxjs/operators';
import IntlMessageFormat from 'intl-messageformat';
import memoizeFormatConstructor from 'intl-format-cache';
import '@formatjs/intl-relativetimeformat/polyfill';
import 'intl-pluralrules';
import get from 'lodash/get';
import { formatDefaultLocale } from 'd3-format';
import { timeFormatDefaultLocale } from 'd3-time-format';
import { formatDefaultLocale as formatDefaultLocale$1, timeFormatDefaultLocale as timeFormatDefaultLocale$1 } from 'd3';
import moment from 'moment';
import { CommonModule } from '@angular/common';

// moment locales need moment set globally
window.moment = moment;

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
const LOCALES_CONFIG = new InjectionToken('LOCALES_CONFIG');
/**
 * An injection token used to initialize the [general configuration]{@link IntlConfig} of {@link IntlModule}
 */
const INTL_CONFIG = new InjectionToken('INTL_CONFIG');
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
class IntlService {
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
                formatDefaultLocale$1(this.currentLocale.data.d3.format);
                timeFormatDefaultLocale$1(this.currentLocale.data.d3.time);
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
IntlService.ɵfac = function IntlService_Factory(t) { return new (t || IntlService)(ɵɵinject(INTL_CONFIG, 8), ɵɵinject(LOCALES_CONFIG, 8)); };
IntlService.ɵprov = ɵɵdefineInjectable({ token: IntlService, factory: IntlService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(IntlService, [{
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

/**
 * An abstract base class for pipes that should refresh automatically
 * when the current locale on {@link IntlService} changes. Pipes should
 * be declared as `pure: false` - the current value is cached to avoid
 * unnecessary processing
 */
class AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        this.intlService = intlService;
        this.changeDetectorRef = changeDetectorRef;
        this.value = "";
    }
    updateValue(value, params) {
        this.lastValue = value;
        this.lastParams = params;
        this.changeDetectorRef.markForCheck();
    }
    transform(value, params) {
        // if we ask another time for the same key, return the last value
        if (Utils.equals(value, this.lastValue) && Utils.equals(params, this.lastParams)) {
            return this.value;
        }
        // set the value
        this.updateValue(value, params);
        // subscribe to localeChange event
        if (!this.localeChange) {
            this.localeChange = this.intlService.events.subscribe((event) => {
                if (!Utils.isEmpty(this.lastValue)) {
                    this.lastValue = null;
                    this.updateValue(value, params);
                }
            });
        }
        return this.value;
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
}
AbstractIntlPipe.ɵfac = function AbstractIntlPipe_Factory(t) { return new (t || AbstractIntlPipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
AbstractIntlPipe.ɵpipe = ɵɵdefinePipe({ name: "sqAbstractIntlPipe", type: AbstractIntlPipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AbstractIntlPipe, [{
        type: Pipe,
        args: [{ name: "sqAbstractIntlPipe", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

/**
 * A pipe to display messages in the current locale. Inputs are processed by
 * [IntlService.formatMessage]{@link IntlService#formatMessage}
 */
class MessagePipe extends AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(value, params) {
        if (!Utils.isEmpty(value)) {
            // coerce to string (eg sys date strings get converted to dates so if this happens to a title we will break otherwise)
            value = value + "";
        }
        super.updateValue(value, params);
        if (!value) {
            this.value = value;
            return;
        }
        let values;
        if (params) {
            values = params.values ? params.values : params;
        }
        this.value = this.intlService.formatMessage(value, values);
    }
}
MessagePipe.ɵfac = function MessagePipe_Factory(t) { return new (t || MessagePipe)(ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
MessagePipe.ɵpipe = ɵɵdefinePipe({ name: "sqMessage", type: MessagePipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MessagePipe, [{
        type: Pipe,
        args: [{ name: "sqMessage", pure: false }]
    }], function () { return [{ type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

const INTL_MODULE_PROVIDERS = [];

/**
 * An APP_INITIALIZER factory function for initialising the {@link IntlService} before any UI is displayed
 */
function IntlInitializer(intlService) {
    const init = () => intlService.init().toPromise();
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
class IntlModule {
    static forRoot(localeConfig) {
        return {
            ngModule: IntlModule,
            providers: [
                { provide: LOCALES_CONFIG, useClass: localeConfig },
            ]
        };
    }
}
IntlModule.ɵmod = ɵɵdefineNgModule({ type: IntlModule });
IntlModule.ɵinj = ɵɵdefineInjector({ factory: function IntlModule_Factory(t) { return new (t || IntlModule)(); }, providers: [
        { provide: APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true },
        ...INTL_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            BaseModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(IntlModule, { declarations: [MessagePipe], imports: [CommonModule,
        BaseModule], exports: [MessagePipe] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(IntlModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [
                    MessagePipe
                ],
                exports: [
                    MessagePipe
                ],
                providers: [
                    { provide: APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true },
                    ...INTL_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

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

export { AbstractIntlPipe, INTL_CONFIG, IntlInitializer, IntlModule, IntlService, LOCALES_CONFIG, MessagePipe, de as deIntl, en as enIntl, fr as frIntl };
//# sourceMappingURL=sinequa-core-intl.js.map
