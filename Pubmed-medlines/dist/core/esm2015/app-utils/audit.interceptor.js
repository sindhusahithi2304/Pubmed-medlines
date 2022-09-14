import { Injectable, Inject } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { START_CONFIG } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * An `HttpInterceptor` to process audi events attached to the request body
 * in the `$auditRecord` member.
 */
export class AuditInterceptor {
    constructor(startConfig) {
        this.startConfig = startConfig;
    }
    shouldIntercept(url) {
        return Utils.startsWith(url, this.startConfig.apiPath);
    }
    isJsonable(obj) {
        return (Utils.isObject(obj) || Utils.isArray(obj)) && !Utils.isArrayBuffer(obj) && !Utils.isBlob(obj) &&
            !Utils.isString(obj) && !(obj instanceof HttpParams);
    }
    // Handle legacy calls where auditEvents is either an AuditEvent or AuditEvent[]
    ensureAuditRecord(auditEvents) {
        if (!auditEvents) {
            return undefined;
        }
        let auditEvents1;
        if (Utils.isArray(auditEvents)) {
            auditEvents1 = auditEvents;
        }
        else if (Utils.isObject(auditEvents)) {
            const auditRecord = auditEvents;
            if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                return auditRecord;
            }
            auditEvents1 = [auditEvents];
        }
        return {
            auditEvents: auditEvents1
        };
    }
    /**
     * Add a sessionid to all the audit events
     * @param auditRecord
     */
    addSessionId(auditRecord) {
        var _a;
        const sessionid = this.getSessionId();
        (_a = auditRecord === null || auditRecord === void 0 ? void 0 : auditRecord.auditEvents) === null || _a === void 0 ? void 0 : _a.forEach(event => {
            if (!event.detail) {
                event.detail = {};
            }
            event.detail['session-id'] = sessionid;
        });
    }
    /**
     * Get a Session Id initialized upon login. The session is maintained for 10 minutes
     * after the last call to this method.
     */
    getSessionId() {
        if (!this.sessionid || this.isSessionStale()) {
            this.sessionid = Utils.guid();
        }
        this.sessionstart = new Date();
        return this.sessionid;
    }
    /**
     * Test whether the current session id valid or stale (need to be refreshed)
     */
    isSessionStale() {
        const lastSession = new Date().getTime() - this.sessionstart.getTime();
        // Consider the session stale after 10 minutes
        return lastSession > 10 * 60 * 1000;
    }
    /**
     * Called once the `$auditRecord` member has been standardized, this method
     * can be overidden to update fields in the audit events associated with a
     * web service call.
     */
    updateAuditRecord(auditRecord) {
    }
    /**
     * Intercept requests with a JSON body and standardize the format of the
     * `$auditRecord` member.
     */
    intercept(request, next) {
        if (this.shouldIntercept(request.url) && this.isJsonable(request.body)) {
            request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
            this.addSessionId(request.body.$auditRecord);
            this.updateAuditRecord(request.body.$auditRecord);
        }
        return next.handle(request);
    }
}
AuditInterceptor.ɵfac = function AuditInterceptor_Factory(t) { return new (t || AuditInterceptor)(i0.ɵɵinject(START_CONFIG)); };
AuditInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: AuditInterceptor, factory: AuditInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuditInterceptor, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQuaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9hcHAtdXRpbHMvIiwic291cmNlcyI6WyJhdWRpdC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQXVELFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRHLE9BQU8sRUFBQyxZQUFZLEVBQW9ELE1BQU0sNEJBQTRCLENBQUM7QUFDM0csT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUV6Qzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sZ0JBQWdCO0lBTXpCLFlBQ2tDLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBRTFELENBQUM7SUFFTyxlQUFlLENBQUMsR0FBVztRQUMvQixPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVPLFVBQVUsQ0FBQyxHQUFHO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ3hFLGlCQUFpQixDQUFDLFdBQXdCO1FBQzlDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUNELElBQUksWUFBc0MsQ0FBQztRQUMzQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDNUIsWUFBWSxHQUFHLFdBQVcsQ0FBQztTQUM5QjthQUNJLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNsQyxNQUFNLFdBQVcsR0FBRyxXQUEwQixDQUFDO1lBQy9DLElBQUksV0FBVyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO2dCQUN0RCxPQUFPLFdBQVcsQ0FBQzthQUN0QjtZQUNELFlBQVksR0FBRyxDQUFDLFdBQXlCLENBQUMsQ0FBQztTQUM5QztRQUNELE9BQU87WUFDSCxXQUFXLEVBQUUsWUFBWTtTQUM1QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVksQ0FBQyxXQUF5Qjs7UUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLE1BQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVcsMENBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNkLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ3JCO1lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDM0MsQ0FBQyxFQUFFO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVk7UUFDaEIsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxjQUFjO1FBQ2xCLE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN2RSw4Q0FBOEM7UUFDOUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxpQkFBaUIsQ0FBQyxXQUF5QjtJQUNyRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUyxDQUFDLE9BQXlCLEVBQUUsSUFBaUI7UUFDbEQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRSxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM5RSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Z0ZBL0ZRLGdCQUFnQixjQU9iLFlBQVk7d0RBUGYsZ0JBQWdCLFdBQWhCLGdCQUFnQixtQkFGYixNQUFNO2tEQUVULGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQVFRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50LCBIdHRwUGFyYW1zfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZywgQXVkaXRSZWNvcmQsIEF1ZGl0RXZlbnQsIEF1ZGl0RXZlbnRzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuLyoqXG4gKiBBbiBgSHR0cEludGVyY2VwdG9yYCB0byBwcm9jZXNzIGF1ZGkgZXZlbnRzIGF0dGFjaGVkIHRvIHRoZSByZXF1ZXN0IGJvZHlcbiAqIGluIHRoZSBgJGF1ZGl0UmVjb3JkYCBtZW1iZXIuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBBdWRpdEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgICBcbiAgICAvLyBTdG9yZSB0aGUgc2Vzc2lvbiBpZCBhbmQgaXRzIGRhdGV0aW1lIG9mIGNyZWF0aW9uL3JlZnJlc2hcbiAgICBzZXNzaW9uaWQ6IHN0cmluZztcbiAgICBzZXNzaW9uc3RhcnQ6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHByaXZhdGUgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG91bGRJbnRlcmNlcHQodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIFV0aWxzLnN0YXJ0c1dpdGgodXJsLCB0aGlzLnN0YXJ0Q29uZmlnLmFwaVBhdGghKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSnNvbmFibGUob2JqKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoVXRpbHMuaXNPYmplY3Qob2JqKSB8fCBVdGlscy5pc0FycmF5KG9iaikpICYmICFVdGlscy5pc0FycmF5QnVmZmVyKG9iaikgJiYgIVV0aWxzLmlzQmxvYihvYmopICYmXG4gICAgICAgICAgICAhVXRpbHMuaXNTdHJpbmcob2JqKSAmJiAhKG9iaiBpbnN0YW5jZW9mIEh0dHBQYXJhbXMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBsZWdhY3kgY2FsbHMgd2hlcmUgYXVkaXRFdmVudHMgaXMgZWl0aGVyIGFuIEF1ZGl0RXZlbnQgb3IgQXVkaXRFdmVudFtdXG4gICAgcHJpdmF0ZSBlbnN1cmVBdWRpdFJlY29yZChhdWRpdEV2ZW50czogQXVkaXRFdmVudHMpOiBBdWRpdFJlY29yZCB8IHVuZGVmaW5lZHtcbiAgICAgICAgaWYgKCFhdWRpdEV2ZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXVkaXRFdmVudHMxOiBBdWRpdEV2ZW50W10gfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KGF1ZGl0RXZlbnRzKSkge1xuICAgICAgICAgICAgYXVkaXRFdmVudHMxID0gYXVkaXRFdmVudHM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoVXRpbHMuaXNPYmplY3QoYXVkaXRFdmVudHMpKSB7XG4gICAgICAgICAgICBjb25zdCBhdWRpdFJlY29yZCA9IGF1ZGl0RXZlbnRzIGFzIEF1ZGl0UmVjb3JkO1xuICAgICAgICAgICAgaWYgKGF1ZGl0UmVjb3JkLmF1ZGl0RXZlbnRzIHx8IGF1ZGl0UmVjb3JkLm1sQXVkaXRFdmVudHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXVkaXRSZWNvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdWRpdEV2ZW50czEgPSBbYXVkaXRFdmVudHMgYXMgQXVkaXRFdmVudF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGF1ZGl0RXZlbnRzOiBhdWRpdEV2ZW50czFcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBzZXNzaW9uaWQgdG8gYWxsIHRoZSBhdWRpdCBldmVudHNcbiAgICAgKiBAcGFyYW0gYXVkaXRSZWNvcmQgXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRTZXNzaW9uSWQoYXVkaXRSZWNvcmQ/OiBBdWRpdFJlY29yZCkge1xuICAgICAgICBjb25zdCBzZXNzaW9uaWQgPSB0aGlzLmdldFNlc3Npb25JZCgpO1xuICAgICAgICBhdWRpdFJlY29yZD8uYXVkaXRFdmVudHM/LmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYoIWV2ZW50LmRldGFpbCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmRldGFpbCA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQuZGV0YWlsWydzZXNzaW9uLWlkJ10gPSBzZXNzaW9uaWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhIFNlc3Npb24gSWQgaW5pdGlhbGl6ZWQgdXBvbiBsb2dpbi4gVGhlIHNlc3Npb24gaXMgbWFpbnRhaW5lZCBmb3IgMTAgbWludXRlc1xuICAgICAqIGFmdGVyIHRoZSBsYXN0IGNhbGwgdG8gdGhpcyBtZXRob2QuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTZXNzaW9uSWQoKTogc3RyaW5nIHtcbiAgICAgICAgaWYoIXRoaXMuc2Vzc2lvbmlkIHx8IHRoaXMuaXNTZXNzaW9uU3RhbGUoKSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uaWQgPSBVdGlscy5ndWlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXNzaW9uc3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uaWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBjdXJyZW50IHNlc3Npb24gaWQgdmFsaWQgb3Igc3RhbGUgKG5lZWQgdG8gYmUgcmVmcmVzaGVkKVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNTZXNzaW9uU3RhbGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGxhc3RTZXNzaW9uID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnNlc3Npb25zdGFydC5nZXRUaW1lKCk7XG4gICAgICAgIC8vIENvbnNpZGVyIHRoZSBzZXNzaW9uIHN0YWxlIGFmdGVyIDEwIG1pbnV0ZXNcbiAgICAgICAgcmV0dXJuIGxhc3RTZXNzaW9uID4gMTAgKiA2MCAqIDEwMDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uY2UgdGhlIGAkYXVkaXRSZWNvcmRgIG1lbWJlciBoYXMgYmVlbiBzdGFuZGFyZGl6ZWQsIHRoaXMgbWV0aG9kXG4gICAgICogY2FuIGJlIG92ZXJpZGRlbiB0byB1cGRhdGUgZmllbGRzIGluIHRoZSBhdWRpdCBldmVudHMgYXNzb2NpYXRlZCB3aXRoIGFcbiAgICAgKiB3ZWIgc2VydmljZSBjYWxsLlxuICAgICAqL1xuICAgIHByb3RlY3RlZCB1cGRhdGVBdWRpdFJlY29yZChhdWRpdFJlY29yZD86IEF1ZGl0UmVjb3JkKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJjZXB0IHJlcXVlc3RzIHdpdGggYSBKU09OIGJvZHkgYW5kIHN0YW5kYXJkaXplIHRoZSBmb3JtYXQgb2YgdGhlXG4gICAgICogYCRhdWRpdFJlY29yZGAgbWVtYmVyLlxuICAgICAqL1xuICAgIGludGVyY2VwdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkSW50ZXJjZXB0KHJlcXVlc3QudXJsKSAmJiB0aGlzLmlzSnNvbmFibGUocmVxdWVzdC5ib2R5KSkge1xuICAgICAgICAgICAgcmVxdWVzdC5ib2R5LiRhdWRpdFJlY29yZCA9IHRoaXMuZW5zdXJlQXVkaXRSZWNvcmQocmVxdWVzdC5ib2R5LiRhdWRpdFJlY29yZCk7XG4gICAgICAgICAgICB0aGlzLmFkZFNlc3Npb25JZChyZXF1ZXN0LmJvZHkuJGF1ZGl0UmVjb3JkKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXVkaXRSZWNvcmQocmVxdWVzdC5ib2R5LiRhdWRpdFJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cbn1cbiJdfQ==