import { Injectable, Inject } from "@angular/core";
import { flatMap } from "rxjs/operators";
import { OauthService } from "ng2-ui-auth";
import { START_CONFIG } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ng2-ui-auth";
/**
 * Override ng2-ui-auth's state handling to retrieve a state from the Sinequa server
 */
export class AuthenticationOauthService extends OauthService {
    constructor(startConfig, httpClient, sharedService, popupService, configService) {
        super(httpClient, sharedService, configService, popupService);
        this.startConfig = startConfig;
        this.httpClient = httpClient;
        this.sharedService = sharedService;
        this.popupService = popupService;
        this.configService = configService;
    }
    authenticate(name, userData) {
        const options = this.configService.options.providers[name];
        if (options.sqInitState) {
            return this.httpClient.get(Utils.addUrl(this.startConfig.apiPath, "oauth"), {
                params: Utils.makeHttpParams({
                    action: "initstate",
                    provider: options.name,
                    tokenInCookie: true,
                    loginInPopup: true,
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            }).pipe(flatMap((ret) => {
                options.state = ret.state;
                return super.authenticate(name, userData);
            }));
        }
        return super.authenticate(name, userData);
    }
}
AuthenticationOauthService.ɵfac = function AuthenticationOauthService_Factory(t) { return new (t || AuthenticationOauthService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SharedService), i0.ɵɵinject(i2.PopupService), i0.ɵɵinject(i2.ConfigService)); };
AuthenticationOauthService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationOauthService, factory: AuthenticationOauthService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthenticationOauthService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.HttpClient }, { type: i2.SharedService }, { type: i2.PopupService }, { type: i2.ConfigService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRpb24tb2F1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2xvZ2luLyIsInNvdXJjZXMiOlsiYXV0aGVudGljYXRpb24tb2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUdqRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBNkMsTUFBTSxhQUFhLENBQUM7QUFDckYsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUV6Qzs7R0FFRztBQUlILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxZQUFZO0lBQ3hELFlBQ29DLFdBQXdCLEVBQzlDLFVBQXNCLEVBQ3RCLGFBQTRCLEVBQzVCLFlBQTBCLEVBQzFCLGFBQTRCO1FBQ3RDLEtBQUssQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUw5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUM5QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBRTFDLENBQUM7SUFFRCxZQUFZLENBQTRCLElBQVksRUFBRSxRQUFhO1FBQy9ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBa0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQVEsRUFBRSxPQUFPLENBQUMsRUFBRTtnQkFDMUYsTUFBTSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLE1BQU0sRUFBRSxXQUFXO29CQUNuQixRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUk7b0JBQ3RCLGFBQWEsRUFBRSxJQUFJO29CQUNuQixZQUFZLEVBQUUsSUFBSTtvQkFDbEIsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLG9CQUFvQixFQUFFLElBQUk7aUJBQzdCLENBQUM7YUFDTCxDQUFDLENBQUMsSUFBSSxDQUFJLE9BQU8sQ0FBaUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdkQsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUMxQixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDUDtRQUNELE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7b0dBNUJRLDBCQUEwQixjQUV2QixZQUFZO2tFQUZmLDBCQUEwQixXQUExQiwwQkFBMEIsbUJBRnZCLE1BQU07a0RBRVQsMEJBQTBCO2NBSHRDLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBR1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmbGF0TWFwfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7T2F1dGhTZXJ2aWNlLCBTaGFyZWRTZXJ2aWNlLCBQb3B1cFNlcnZpY2UsIENvbmZpZ1NlcnZpY2V9IGZyb20gXCJuZzItdWktYXV0aFwiO1xuaW1wb3J0IHtTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcblxuLyoqXG4gKiBPdmVycmlkZSBuZzItdWktYXV0aCdzIHN0YXRlIGhhbmRsaW5nIHRvIHJldHJpZXZlIGEgc3RhdGUgZnJvbSB0aGUgU2luZXF1YSBzZXJ2ZXJcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uT2F1dGhTZXJ2aWNlIGV4dGVuZHMgT2F1dGhTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHByb3RlY3RlZCBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxuICAgICAgICBwcm90ZWN0ZWQgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIHBvcHVwU2VydmljZTogUG9wdXBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgY29uZmlnU2VydmljZTogQ29uZmlnU2VydmljZSkge1xuICAgICAgICBzdXBlcihodHRwQ2xpZW50LCBzaGFyZWRTZXJ2aWNlLCBjb25maWdTZXJ2aWNlLCBwb3B1cFNlcnZpY2UpO1xuICAgIH1cblxuICAgIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhOiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY29uZmlnU2VydmljZS5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc3FJbml0U3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PHtzdGF0ZTogc3RyaW5nfT4oVXRpbHMuYWRkVXJsKHRoaXMuc3RhcnRDb25maWcuYXBpUGF0aCEsIFwib2F1dGhcIiksIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IFV0aWxzLm1ha2VIdHRwUGFyYW1zKHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBcImluaXRzdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcjogb3B0aW9ucy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbkluQ29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBsb2dpbkluUG9wdXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG5vVXNlck92ZXJyaWRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBub0F1dG9BdXRoZW50aWNhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5waXBlPFQ+KGZsYXRNYXA8e3N0YXRlOiBzdHJpbmd9LCBPYnNlcnZhYmxlPFQ+PigocmV0KSA9PiB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IHJldC5zdGF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuYXV0aGVudGljYXRlKG5hbWUsIHVzZXJEYXRhKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIuYXV0aGVudGljYXRlKG5hbWUsIHVzZXJEYXRhKTtcbiAgICB9XG59XG4iXX0=