import { Injectable, Inject } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpService } from './http.service';
import { Utils } from "@sinequa/core/base";
import { START_CONFIG } from "./start-config.web.service";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
import * as i2 from "@sinequa/core/intl";
/**
 * A service for calling the query.links web service.
 */
export class SponsoredLinksWebService extends HttpService {
    constructor(startConfig, httpClient, intlService) {
        super(startConfig);
        this.httpClient = httpClient;
        this.intlService = intlService;
    }
    /**
     * Queries the server for sponsored links.
     *
     * @param query The query information.
     * @param webService The web service configuration.
     */
    getLinks(query, webService) {
        if (!query) {
            return throwError({ error: "no query" });
        }
        const url = this.makeUrl("query.links");
        const observable = this.httpClient.post(url, {
            app: this.appName,
            webservice: webService,
            query,
            locale: this.intlService.currentLocale.name
        });
        Utils.subscribe(observable, (response) => {
            console.log("SponsoredLinksService.getLinks success - data: ", response);
            return response;
        }, (error) => {
            console.log("SponsoredLinksService.getLinks failure - error: ", error);
        });
        return observable;
    }
}
SponsoredLinksWebService.ɵfac = function SponsoredLinksWebService_Factory(t) { return new (t || SponsoredLinksWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient), i0.ɵɵinject(i2.IntlService)); };
SponsoredLinksWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SponsoredLinksWebService, factory: SponsoredLinksWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SponsoredLinksWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }, { type: i2.IntlService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BvbnNvcmVkLWxpbmtzLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsic3BvbnNvcmVkLWxpbmtzLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV6QyxPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUEwQnZFOztHQUVHO0FBSUgsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFdBQVc7SUFFckQsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0IsRUFDeEIsV0FBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRlgsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUVwQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxRQUFRLENBQUMsS0FBYSxFQUFFLFVBQWtCO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBZSxHQUFHLEVBQUU7WUFDdkQsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ2pCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLEtBQUs7WUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSTtTQUM5QyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDdEIsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekUsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7Z0dBckNRLHdCQUF3QixjQUdyQixZQUFZO2dFQUhmLHdCQUF3QixXQUF4Qix3QkFBd0IsbUJBRnJCLE1BQU07a0RBRVQsd0JBQXdCO2NBSHBDLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBSVEsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNxSHR0cENsaWVudCB9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4vaHR0cC5zZXJ2aWNlJztcbmltcG9ydCB7IEludGxTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG5pbXBvcnQgeyBTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnIH0gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBJUXVlcnkgfSBmcm9tICcuL3F1ZXJ5L3F1ZXJ5JztcblxuLyoqXG4gKiBEZXNjcmliZXMgYSBzaW5nbGUgc3BvbnNvcmVkIGxpbmtcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaW5rUmVzdWx0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgaWNvbjogc3RyaW5nO1xuICAgIHRodW1ibmFpbDogc3RyaW5nO1xuICAgIHRvb2x0aXA6IHN0cmluZztcbiAgICBzdW1tYXJ5OiBzdHJpbmc7XG4gICAgcmFuazogbnVtYmVyO1xuICAgIHJlbGV2YW5jZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyBhIHNldCBvZiBzcG9uc29yZWQgbGlua3NcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMaW5rc1Jlc3VsdHMge1xuICAgIHNxbDogc3RyaW5nW107XG4gICAgbGlua3M6IExpbmtSZXN1bHRbXTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIGNhbGxpbmcgdGhlIHF1ZXJ5LmxpbmtzIHdlYiBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgU3BvbnNvcmVkTGlua3NXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGludGxTZXJ2aWNlOiBJbnRsU2VydmljZSkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUXVlcmllcyB0aGUgc2VydmVyIGZvciBzcG9uc29yZWQgbGlua3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB3ZWJTZXJ2aWNlIFRoZSB3ZWIgc2VydmljZSBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGdldExpbmtzKHF1ZXJ5OiBJUXVlcnksIHdlYlNlcnZpY2U6IHN0cmluZyk6IE9ic2VydmFibGU8TGlua3NSZXN1bHRzPiB7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHsgZXJyb3I6IFwibm8gcXVlcnlcIiB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMubWFrZVVybChcInF1ZXJ5LmxpbmtzXCIpO1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8TGlua3NSZXN1bHRzPih1cmwsIHtcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgd2Vic2VydmljZTogd2ViU2VydmljZSxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmludGxTZXJ2aWNlLmN1cnJlbnRMb2NhbGUubmFtZVxuICAgICAgICB9KTtcblxuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3BvbnNvcmVkTGlua3NTZXJ2aWNlLmdldExpbmtzIHN1Y2Nlc3MgLSBkYXRhOiBcIiwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNwb25zb3JlZExpbmtzU2VydmljZS5nZXRMaW5rcyBmYWlsdXJlIC0gZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxufVxuIl19