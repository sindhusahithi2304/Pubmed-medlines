import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { StartConfig, AuditRecord } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
/**
 * An `HttpInterceptor` to process audi events attached to the request body
 * in the `$auditRecord` member.
 */
export declare class AuditInterceptor implements HttpInterceptor {
    private startConfig;
    sessionid: string;
    sessionstart: Date;
    constructor(startConfig: StartConfig);
    private shouldIntercept;
    private isJsonable;
    private ensureAuditRecord;
    /**
     * Add a sessionid to all the audit events
     * @param auditRecord
     */
    private addSessionId;
    /**
     * Get a Session Id initialized upon login. The session is maintained for 10 minutes
     * after the last call to this method.
     */
    private getSessionId;
    /**
     * Test whether the current session id valid or stale (need to be refreshed)
     */
    private isSessionStale;
    /**
     * Called once the `$auditRecord` member has been standardized, this method
     * can be overidden to update fields in the audit events associated with a
     * web service call.
     */
    protected updateAuditRecord(auditRecord?: AuditRecord): void;
    /**
     * Intercept requests with a JSON body and standardize the format of the
     * `$auditRecord` member.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDef<AuditInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuditInterceptor>;
}
//# sourceMappingURL=audit.interceptor.d.ts.map