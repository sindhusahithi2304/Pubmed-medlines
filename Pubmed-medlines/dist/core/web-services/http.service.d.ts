import { HttpParams } from "@angular/common/http";
import { MapOf } from "@sinequa/core/base";
import { StartConfig } from "./start-config.web.service";
/**
 * A base helper class for web services. It holds the {@link StartConfig} for the app
 */
export declare abstract class HttpService {
    protected startConfig: StartConfig;
    /**
     * Constructor
     *
     * @param startConfig The start configuration
     */
    constructor(startConfig: StartConfig);
    /**
     * The name of the application
     */
    get appName(): string;
    /**
     * Makes an API url by appending the api name to the api path
     * held on the {@link StartConfig}
     *
     * @param api An API name
     */
    makeUrl(api: string): string;
    /**
     * Makes an Angular {@link HttpParams} object from a basic Javascript object
     *
     * @param params A map of parameter values
     */
    makeParams(params: MapOf<string | boolean | number | Date | object | undefined>): HttpParams;
}
//# sourceMappingURL=http.service.d.ts.map