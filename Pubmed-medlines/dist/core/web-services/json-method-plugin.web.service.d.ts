import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import * as i0 from "@angular/core";
/**
 * A generic service for invoking JsonMethod plugins
 */
export declare class JsonMethodPluginService extends HttpService {
    httpClient: SqHttpClient;
    constructor(httpClient: SqHttpClient, startConfig: StartConfig);
    /**
     * Call a JsonMethod plugin using an HTTP POST
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    post(method: string, query: any, options?: {
        [key: string]: any;
    }): Observable<any>;
    /**
     * Call a JsonMethod plugin using an HTTP POST
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    call(method: string, query: any, options?: {
        [key: string]: any;
    }): Observable<any>;
    /**
     * Call a JsonMethod plugin using an HTTP GET
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    get(method: string, query: any, options?: {
        [key: string]: any;
    }): Observable<any>;
    makeUrl(api: string): string;
    static ɵfac: i0.ɵɵFactoryDef<JsonMethodPluginService, never>;
    static ɵprov: i0.ɵɵInjectableDef<JsonMethodPluginService>;
}
//# sourceMappingURL=json-method-plugin.web.service.d.ts.map