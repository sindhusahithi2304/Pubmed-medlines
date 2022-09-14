import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { IProviders } from "ng2-ui-auth";
import * as i0 from "@angular/core";
/**
 * An {@link InjectionToken} to access the app's {@link StartConfig} instance
 */
export declare const START_CONFIG: InjectionToken<StartConfig>;
/**
 * Defines members whose values are automatically deduced from direct {@link StartConfig} members
 */
export interface DeducedStartConfig {
    /**
     * The origin of the url used to make Sinequa API calls
     */
    origin?: string;
    /**
     * The application path of the url used to make Sinequa API calls
     */
    applicationPath?: string;
    /**
     * The url in the browser (origin + pathname)
     */
    browserUrl?: string;
    /**
     * The path used to make Sinequa API calls, including any virtual directories.
     * If CORS is active then it will be prefixed by the Sinequa server origin
     */
    apiPath?: string;
    /**
     * A flag indicating whether the app is running in a CORS context.
     */
    corsActive?: boolean;
}
/**
 * Defines members whose values are retrieved from the Sinequa app configuration and that are available prior to user login
 */
export interface PreloginAppConfig {
    /**
     * Specifies which storage should be used to hold the CSRF token used to protect Sinequa API calls against
     * CSRF attacks
     */
    authenticationStorage?: 'session' | 'local';
    /**
     * Contains the available login providers (only used for popup-based login)
     */
    providers?: IProviders;
    /**
     * Contains the OAuth auto login provider
     */
    autoOAuthProvider?: string;
    /**
     * Contains the OAuth auto login provider
     */
    autoSAMLProvider?: string;
    /**
     * A boolean value indicating whether popup-based login should be used
     */
    usePopupForLogin?: boolean;
    /**
     * The URL to be used to display online help
     */
    helpUrl?: string;
    /**
     * A boolean value indicating whether auditing is enabled
     */
    auditEnabled?: boolean;
    /**
     * A boolean value indicating whether ML auditing is enabled
     */
    mlAuditEnabled?: boolean;
    /**
     * The version of Sinequa running on the server
     */
    version?: string;
    /**
     * The date of the version of Sinequa running on the server
     */
    versionDate?: Date;
}
/**
 * Contains start-up configuration for the application. An instance of this object
 * must be provided when registering the {@link WebServicesModule} either by providing the START_CONFIG
 * injection token or by using the [forRoot]{@link WebServicesModule#forRoot} static method.
 *
 * Typically only the members declared directly (url, app, production) should be specified.
 * The other values are either deduced from these members or are retrieved from the Sinequa configuration
 */
export interface StartConfig extends DeducedStartConfig, PreloginAppConfig {
    /**
     * The url of the sinequa server including any virtual directories - defaults to the browser url
     */
    url?: string;
    /**
     * The app name (can be deduced from the browser url when the app is served by Sinequa)
     */
    app?: string;
    /**
     * A flag indicating whether the app is running in production mode or not
     * (can be deduced from the browser url when the app is served by Sinequa)
     */
    production?: boolean;
}
/**
 * Defines Sinequa server configuration that can be held on a web server and retrieved using
 * [StartConfigWebService.fetchServerConfig]{@link StartConfigWebService#fetchServerConfig}
 */
export interface ServerConfig {
    /**
     * The URL of the Sinequa server including any virtual directories
     */
    url?: string;
    /**
     * The name of the application
     */
    app?: string;
}
/**
 * A service to manage the initialization of the app's {@link StartConfig} instance. The service
 * is automatically instantiated by an {@link APP_INITIALIZER} in {@link WebServicesModule} and the
 * initialization is performed in the constructor.
 */
export declare class StartConfigWebService {
    private startConfig;
    private static API_PATH;
    /**
     * Initializes the injected {@link StartConfig} instance. Outputs an error to the
     * console if no instance is injected.
     *
     * @param startConfig The start configuration instance
     */
    constructor(startConfig: StartConfig);
    private getDefaultStartConfig;
    private initStartConfig;
    /**
     * Fetches pre-login app configuration from the Sinequa server and merges it
     * into the start config instance
     *
     * @returns An observable of the start config after being merged with the pre-login app configuration
     */
    fetchPreLoginAppConfig(): Observable<StartConfig>;
    /**
     * Retrieves Sinequa server configuration from a web server hosting the app
     *
     * @param url A URL to a JSON file containing the Sinequa server configuration
     *
     * @returns An observable of the Sinequa server configuration
     */
    fetchServerConfig(url?: string): Observable<ServerConfig>;
    static ɵfac: i0.ɵɵFactoryDef<StartConfigWebService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDef<StartConfigWebService>;
}
//# sourceMappingURL=start-config.web.service.d.ts.map