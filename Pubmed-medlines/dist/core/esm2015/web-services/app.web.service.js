import { Injectable, Inject } from "@angular/core";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * This service provides methods to retrieve and refresh the configuration of an app
 */
export class AppWebService extends HttpService {
    /**
     * Constructor
     *
     * @param startConfig Provides the app name
     * @param httpClient The HTTP client
     */
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        if (!this.appName) {
            console.error("Missing app name!");
        }
    }
    /**
     * Gets the app configuration for the app name
     *
     * @returns An observable of the app configuration
     */
    get() {
        const observable = this.httpClient.get(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || ""
            })
        });
        observable
            .subscribe((response) => {
            //console.log("appWebService.get success - data: ", response);
            return response;
        }, (error) => {
            //console.log("appWebService.get failure - reason: ", error);
        });
        return observable;
    }
    /**
     * Refreshes the app configuration based on a version identifier
     *
     * @param appVersionId The current app version id [CCApp.versionId]{@link CCApp#versionId}
     * @param auditEvents Audit events to be recorded for this call
     *
     * @returns An observable of an object containing a flag indicating whether the configuration was up to date. If false
     * then the app member of the object will be set to the new version of the configuration.
     */
    refresh(appVersionId, auditEvents) {
        const observable = this.httpClient.get(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || "",
                versionId: appVersionId,
                $auditRecord: auditEvents
            })
        });
        observable
            .subscribe((response) => {
            //console.log("appWebService.refresh success - data: ", response);
            return response;
        }, (error) => {
            //console.log("appWebService.refresh failure - reason: ", error);
        });
        return observable;
    }
}
AppWebService.ɵfac = function AppWebService_Factory(t) { return new (t || AppWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
AppWebService.ɵprov = i0.ɵɵdefineInjectable({ token: AppWebService, factory: AppWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AppWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsiYXBwLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUMsWUFBWSxFQUFjLE1BQU0sNEJBQTRCLENBQUM7OztBQVlyRTs7R0FFRztBQUlILE1BQU0sT0FBTyxhQUFjLFNBQVEsV0FBVztJQUMxQzs7Ozs7T0FLRztJQUNILFlBQzBCLFdBQXdCLEVBQ3RDLFVBQXdCO1FBQ2hDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURYLGVBQVUsR0FBVixVQUFVLENBQWM7UUFHaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEdBQUc7UUFDQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9ELE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNwQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFO2FBQzFCLENBQUM7U0FDTCxDQUFDLENBQUM7UUFDSCxVQUFVO2FBQ0wsU0FBUyxDQUNOLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDYiw4REFBOEQ7WUFDMUQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTiw2REFBNkQ7UUFDakUsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxPQUFPLENBQUMsWUFBb0IsRUFBRSxXQUF5QjtRQUNuRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBa0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6RixNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRTtnQkFDdkIsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLFlBQVksRUFBRSxXQUFXO2FBQzVCLENBQUM7U0FDTCxDQUFDLENBQUM7UUFDSCxVQUFVO2FBQ0wsU0FBUyxDQUNOLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDVCxrRUFBa0U7WUFDbEUsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixpRUFBaUU7UUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOzswRUFuRVEsYUFBYSxjQVFWLFlBQVk7cURBUmYsYUFBYSxXQUFiLGFBQWEsbUJBRlYsTUFBTTtrREFFVCxhQUFhO2NBSHpCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBU1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1NxSHR0cENsaWVudH0gZnJvbSBcIi4vaHR0cC1jbGllbnRcIjtcbmltcG9ydCB7SHR0cFNlcnZpY2V9IGZyb20gXCIuL2h0dHAuc2VydmljZVwiO1xuaW1wb3J0IHtBdWRpdEV2ZW50c30gZnJvbSBcIi4vYXVkaXQud2ViLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge0NDQXBwfSBmcm9tIFwiLi9jb25maWcvY2NhcHBcIjtcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBvYmplY3QgcmV0dXJuZWQgYnkgYSBjYWxsIHRvIFtBcHBXZWJTZXJ2aWNlLnJlZnJlc2hde0BsaW5rIEFwcFdlYlNlcnZpY2UjcmVmcmVzaH0uIElmIHRoZSB1cFRvRGF0ZVxuICogbWVtYmVyIGlzIGZhbHNlIHRoZW4gdGhlIGFwcCBtZW1iZXIgY29udGFpbnMgdGhlIGxhdGVzdCB2ZXJzaW9uIG9mIHRoZSBhcHAgY29uZmlndXJhdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIENDQXBwUmVmcmVzaCB7XG4gICAgdXBUb0RhdGU6IGJvb2xlYW47XG4gICAgYXBwPzogQ0NBcHA7XG59XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIG1ldGhvZHMgdG8gcmV0cmlldmUgYW5kIHJlZnJlc2ggdGhlIGNvbmZpZ3VyYXRpb24gb2YgYW4gYXBwXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBBcHBXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RhcnRDb25maWcgUHJvdmlkZXMgdGhlIGFwcCBuYW1lXG4gICAgICogQHBhcmFtIGh0dHBDbGllbnQgVGhlIEhUVFAgY2xpZW50XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHN0YXJ0Q29uZmlnKTtcblxuICAgICAgICBpZiAoIXRoaXMuYXBwTmFtZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk1pc3NpbmcgYXBwIG5hbWUhXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXBwIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhcHAgbmFtZVxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gb2JzZXJ2YWJsZSBvZiB0aGUgYXBwIGNvbmZpZ3VyYXRpb25cbiAgICAgKi9cbiAgICBnZXQoKTogT2JzZXJ2YWJsZTxDQ0FwcD4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LmdldDxDQ0FwcD4odGhpcy5tYWtlVXJsKFwiYXBwXCIpLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyh7XG4gICAgICAgICAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUgfHwgXCJcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIG9ic2VydmFibGVcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFwcFdlYlNlcnZpY2UuZ2V0IHN1Y2Nlc3MgLSBkYXRhOiBcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImFwcFdlYlNlcnZpY2UuZ2V0IGZhaWx1cmUgLSByZWFzb246IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZnJlc2hlcyB0aGUgYXBwIGNvbmZpZ3VyYXRpb24gYmFzZWQgb24gYSB2ZXJzaW9uIGlkZW50aWZpZXJcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcHBWZXJzaW9uSWQgVGhlIGN1cnJlbnQgYXBwIHZlcnNpb24gaWQgW0NDQXBwLnZlcnNpb25JZF17QGxpbmsgQ0NBcHAjdmVyc2lvbklkfVxuICAgICAqIEBwYXJhbSBhdWRpdEV2ZW50cyBBdWRpdCBldmVudHMgdG8gYmUgcmVjb3JkZWQgZm9yIHRoaXMgY2FsbFxuICAgICAqXG4gICAgICogQHJldHVybnMgQW4gb2JzZXJ2YWJsZSBvZiBhbiBvYmplY3QgY29udGFpbmluZyBhIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBjb25maWd1cmF0aW9uIHdhcyB1cCB0byBkYXRlLiBJZiBmYWxzZVxuICAgICAqIHRoZW4gdGhlIGFwcCBtZW1iZXIgb2YgdGhlIG9iamVjdCB3aWxsIGJlIHNldCB0byB0aGUgbmV3IHZlcnNpb24gb2YgdGhlIGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgcmVmcmVzaChhcHBWZXJzaW9uSWQ6IHN0cmluZywgYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cyk6IE9ic2VydmFibGU8Q0NBcHBSZWZyZXNoPiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQuZ2V0PHt1cFRvRGF0ZTogYm9vbGVhbiwgYXBwOiBDQ0FwcH0+KHRoaXMubWFrZVVybChcImFwcFwiKSwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLm1ha2VQYXJhbXMoe1xuICAgICAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgdmVyc2lvbklkOiBhcHBWZXJzaW9uSWQsXG4gICAgICAgICAgICAgICAgJGF1ZGl0UmVjb3JkOiBhdWRpdEV2ZW50c1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIG9ic2VydmFibGVcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJhcHBXZWJTZXJ2aWNlLnJlZnJlc2ggc3VjY2VzcyAtIGRhdGE6IFwiLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiYXBwV2ViU2VydmljZS5yZWZyZXNoIGZhaWx1cmUgLSByZWFzb246IFwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cbn0iXX0=