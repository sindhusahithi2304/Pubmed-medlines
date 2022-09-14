import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { AuditEvents } from "./audit.web.service";
import { StartConfig } from "./start-config.web.service";
import { CCApp } from "./config/ccapp";
import * as i0 from "@angular/core";
/**
 * Defines the object returned by a call to [AppWebService.refresh]{@link AppWebService#refresh}. If the upToDate
 * member is false then the app member contains the latest version of the app configuration
 */
export interface CCAppRefresh {
    upToDate: boolean;
    app?: CCApp;
}
/**
 * This service provides methods to retrieve and refresh the configuration of an app
 */
export declare class AppWebService extends HttpService {
    private httpClient;
    /**
     * Constructor
     *
     * @param startConfig Provides the app name
     * @param httpClient The HTTP client
     */
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    /**
     * Gets the app configuration for the app name
     *
     * @returns An observable of the app configuration
     */
    get(): Observable<CCApp>;
    /**
     * Refreshes the app configuration based on a version identifier
     *
     * @param appVersionId The current app version id [CCApp.versionId]{@link CCApp#versionId}
     * @param auditEvents Audit events to be recorded for this call
     *
     * @returns An observable of an object containing a flag indicating whether the configuration was up to date. If false
     * then the app member of the object will be set to the new version of the configuration.
     */
    refresh(appVersionId: string, auditEvents?: AuditEvents): Observable<CCAppRefresh>;
    static ɵfac: i0.ɵɵFactoryDef<AppWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AppWebService>;
}
//# sourceMappingURL=app.web.service.d.ts.map