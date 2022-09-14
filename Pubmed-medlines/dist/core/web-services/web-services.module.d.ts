import { ModuleWithProviders } from "@angular/core";
import { StartConfigWebService, StartConfig } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/common/http";
import * as i3 from "@sinequa/core/base";
import * as i4 from "@sinequa/core/intl";
export declare function StartConfigInitializer(startConfigWebService: StartConfigWebService): () => Promise<void>;
/**
 * This module implements client services for the Sinequa web service APIs
 */
export declare class WebServicesModule {
    /**
     * Configures the module with a start configuration
     *
     * @param startConfig The start configuration object
     *
     * @returns The configured module
     */
    static forRoot(startConfig: StartConfig): ModuleWithProviders<WebServicesModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<WebServicesModule, never, [typeof i1.CommonModule, typeof i2.HttpClientModule, typeof i3.BaseModule, typeof i4.IntlModule], never>;
    static ɵinj: i0.ɵɵInjectorDef<WebServicesModule>;
}
//# sourceMappingURL=web-services.module.d.ts.map