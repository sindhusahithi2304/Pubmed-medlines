import { ModuleWithProviders, Type } from "@angular/core";
import { IntlService, LocalesConfig } from "./intl.service";
import * as i0 from "@angular/core";
import * as i1 from "./message.pipe";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/core/base";
/**
 * An APP_INITIALIZER factory function for initialising the {@link IntlService} before any UI is displayed
 */
export declare function IntlInitializer(intlService: IntlService): () => Promise<string>;
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
export declare class IntlModule {
    static forRoot(localeConfig: Type<LocalesConfig>): ModuleWithProviders<IntlModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<IntlModule, [typeof i1.MessagePipe], [typeof i2.CommonModule, typeof i3.BaseModule], [typeof i1.MessagePipe]>;
    static ɵinj: i0.ɵɵInjectorDef<IntlModule>;
}
//# sourceMappingURL=intl.module.d.ts.map