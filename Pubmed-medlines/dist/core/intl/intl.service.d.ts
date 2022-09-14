/// <reference types="sq-extra-typings" />
import { OnDestroy, InjectionToken } from "@angular/core";
import { Subject, Observable } from "rxjs";
import "@formatjs/intl-relativetimeformat/polyfill";
import "intl-pluralrules";
import { MapOf, JsonObject } from "@sinequa/core/base";
import { FormatLocaleDefinition } from "d3-format";
import { TimeLocaleDefinition } from "d3-time-format";
import "./import-moment";
import * as i0 from "@angular/core";
/**
 * Describes event emitted by {@link IntlService} when the current locale changes
 */
export interface LocaleChangeEvent {
    /**
     * The name of the newly selected locale
     */
    locale: string;
}
/**
 * Describes the data that can be set in a Sinequa locale. Instances are normally
 * defined in application locale modules which can be included statically or loaded
 * dynamically
 */
export interface LocaleData {
    /**
     * Options pertaining to the `Intl` API
     */
    intl: {
        locale: string;
    };
    /**
     * Options pertaining to the `Moment.js` library
     */
    moment?: {
        locale: string;
    };
    /**
     * Options pertaining to the `D3.js` library
     */
    d3?: {
        locale: string;
        format: FormatLocaleDefinition;
        time: TimeLocaleDefinition;
    };
    /**
     * The messages (ICU Message syntax) for this locale
     */
    messages: JsonObject;
}
/**
 * Describes a Sinequa locale
 */
export interface Locale {
    /**
     * The name identifying the locale
     */
    name: string;
    /**
     * A display name for the locale
     */
    display: string;
    /**
     * The directionality of text in this locale (left-to-right or right-to-left)
     */
    direction?: "ltr" | "rtl";
    /**
     * The locale data for the locale
     */
    data?: LocaleData;
}
/**
 * Describes the locales configuration object defined by an application and used by the {@link IntlService}
 */
export interface LocalesConfig {
    /**
     * The default locale
     */
    defaultLocale: Locale;
    /**
     * The set of locales supported by the application
     */
    locales?: Locale[];
    /**
     * An optional loader for the dynamic loading of locale data
     * for locales that do not define the data statically
     */
    loadLocale?(locale: string): Observable<LocaleData>;
}
/**
 * An injection token used to initialize the [locales configuration]{@link LocalesConfig} of {@link IntlModule}
 */
export declare const LOCALES_CONFIG: InjectionToken<LocalesConfig>;
/**
 * Describes the object to specify custom ICU Message formats
 */
export interface IntlFormats {
    /**
     * Format options for dates
     */
    date?: MapOf<Intl.DateTimeFormatOptions>;
    /**
     * Format options for times
     */
    time?: MapOf<Intl.DateTimeFormatOptions>;
    /**
     * Format options for numbers
     */
    number?: MapOf<Intl.NumberFormatOptions>;
    /**
     * Format options for relative times
     */
    relativeTime?: MapOf<Intl.RelativeTimeFormatOptions>;
}
/**
 * Describes a general configuration object for the {@link IntlModule}
 */
export interface IntlConfig {
    /**
     * Custom formats for ICU Message processing
     */
    formats?: IntlFormats;
}
/**
 * An injection token used to initialize the [general configuration]{@link IntlConfig} of {@link IntlModule}
 */
export declare const INTL_CONFIG: InjectionToken<IntlConfig>;
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
export declare class IntlService implements OnDestroy {
    protected intlConfig: IntlConfig;
    protected localesConfig: LocalesConfig;
    /**
     * The prefix for ICU messages to be retrieved from [LocaleData.messages]{@link LocaleData#messages}
     * by {@link formatMessage}
     */
    readonly messagePrefix = "msg#";
    /**
     * An alternative prefix for inline ICU messages processed by {@link formatMessage}
     */
    readonly textPrefix = "txt#";
    /**
     * The available locales
     */
    locales: Locale[];
    /** The current locale */
    currentLocale: Locale;
    protected intlLocale: string;
    /** The current direction */
    direction: "ltr" | "rtl";
    protected _events: Subject<LocaleChangeEvent>;
    protected formats: IntlFormats;
    constructor(intlConfig: IntlConfig, localesConfig: LocalesConfig);
    private static getLanguage;
    private static getBrowserLanguages;
    ngOnDestroy(): void;
    /**
     * The observable events emitted by this service
     */
    get events(): Observable<LocaleChangeEvent>;
    private getInitialLocale;
    /**
     * Initialize the service. The current locale is initialized to either the `sinequa-locale` local
     * storage value, the browser language or the default locale.
     *
     * This method is called automatically by the {@link IntlModule} at application startup.
     *
     * @return An observable of the current locale
     */
    init(): Observable<string>;
    private loadData;
    private getLocale;
    /**
     * Change the current locale. The change is made asynchronously as the locale may need to be
     * downloaded. The current locale is optionally stored in local storage (`sinequa-locale`)
     * to be picked up the next time the service is initialized
     *
     * @param locale The name of the locale to use
     * @param store If `true` the current locale is stored in local storage
     */
    use(locale: string, store?: boolean): Observable<string>;
    private getDefaultMessages;
    private getMessages;
    /**
     * Get the message from the current locale that corresponds to the passed `key`.
     * If the is not prefixed by {@link messagePrefix} then `null` is returned
     *
     * @param key The message key
     */
    getMessage(key: string): string | undefined;
    private nextLang;
    private sysLang;
    private processFormatMessage;
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
    formatMessage(key: string, values?: MapOf<any>): string;
    /**
     * Format an ICU Message string
     *
     * @param text An ICU Message to format
     * @param values Values referenced by an ICU message
     */
    formatText(text: string, values?: {}): string;
    /**
     * Parse a date string in the current locale - eg `04/09/1986`
     *
     * @param value A date string
     * @returns The parse `Date` or `undefined` if the date cannot be parsed
     */
    parseDate(value: string): Date | undefined;
    private getNamedFormat;
    private filterProps;
    /**
     * Format a date in the current locale according to the passed options. If the passed `value` is not a `Date`
     * then one is constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatDate(value: string | number | Date, options?: Intl.DateTimeFormatOptions & {
        format?: string;
    }): string;
    /**
     * Format a time in the current locale according to the passed options. If the passed `value` is not a `Date` then one is
     * constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatTime(value: string | number | Date, options?: Intl.DateTimeFormatOptions & {
        format?: string;
    }): string;
    private makeRelativeTimeParams;
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
    formatRelativeTime(value: string | number | Date | undefined, unit?: Intl.RelativeTimeUnit, options?: Intl.RelativeTimeFormatOptions & {
        format?: string;
    }): string;
    /**
     * Format a number in the current locale
     *
     * @param value The number to format
     * @param options The options can include a custom format
     */
    formatNumber(value: any, options?: Intl.NumberFormatOptions & {
        format?: any;
    }): string;
    static ɵfac: i0.ɵɵFactoryDef<IntlService, [{ optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<IntlService>;
}
//# sourceMappingURL=intl.service.d.ts.map