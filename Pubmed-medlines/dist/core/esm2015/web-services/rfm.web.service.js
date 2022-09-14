import { Injectable, Inject } from "@angular/core";
import { EMPTY } from "rxjs";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the search.rfm web service
 */
export class RfmWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Get RFM data for a set of results
     *
     * @param rfm The name of the RFM
     * @param results The results for which to retrieve RFM data
     */
    getRfmData(rfm, results) {
        const ids = [];
        for (const record of results.records) {
            if (!!record.flags && record.flags.indexOf("r") !== -1) {
                ids.push(record.id);
            }
        }
        if (ids.length === 0) {
            return EMPTY;
        }
        const data = {
            rfm,
            queryHash: results.rfmQueryHash,
            ids
        };
        const observable = this.httpClient.post(this.makeUrl(RfmWebService.endpoint), data);
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("rfmService.getRfmData failure - error: ", error);
        });
        return observable;
    }
}
RfmWebService.endpoint = "search.rfm";
RfmWebService.ɵfac = function RfmWebService_Factory(t) { return new (t || RfmWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
RfmWebService.ɵprov = i0.ɵɵdefineInjectable({ token: RfmWebService, factory: RfmWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(RfmWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmZtLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsicmZtLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBYSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxZQUFZLEVBQWMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsS0FBSyxFQUFRLE1BQU0sb0JBQW9CLENBQUM7OztBQUdoRDs7R0FFRztBQUlILE1BQU0sT0FBTyxhQUFjLFNBQVEsV0FBVztJQUcxQyxZQUMwQixXQUF3QixFQUN0QyxVQUF3QjtRQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFEWCxlQUFVLEdBQVYsVUFBVSxDQUFjO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFVBQVUsQ0FBQyxHQUFXLEVBQUUsT0FBZ0I7UUFDcEMsTUFBTSxHQUFHLEdBQWEsRUFBRSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN2QjtTQUNKO1FBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNsQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE1BQU0sSUFBSSxHQUFHO1lBQ1QsR0FBRztZQUNILFNBQVMsRUFBRSxPQUFPLENBQUMsWUFBWTtZQUMvQixHQUFHO1NBQ04sQ0FBQztRQUNGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDdEIsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNULE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUNQLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7O0FBdEN1QixzQkFBUSxHQUFHLFlBQVksQ0FBQzswRUFEdkMsYUFBYSxjQUlWLFlBQVk7cURBSmYsYUFBYSxXQUFiLGFBQWEsbUJBRlYsTUFBTTtrREFFVCxhQUFhO2NBSHpCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBS1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3R9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIEVNUFRZfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtTcUh0dHBDbGllbnR9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge1V0aWxzLCBNYXBPZn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtSZXN1bHRzLCBSRk1EYXRhfSBmcm9tIFwiLi9xdWVyeS53ZWIuc2VydmljZVwiO1xuXG4vKipcbiAqIEEgc2VydmljZSBmb3IgY2FsbGluZyB0aGUgc2VhcmNoLnJmbSB3ZWIgc2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgUmZtV2ViU2VydmljZSBleHRlbmRzIEh0dHBTZXJ2aWNlIHtcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBlbmRwb2ludCA9IFwic2VhcmNoLnJmbVwiO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50KSB7XG4gICAgICAgIHN1cGVyKHN0YXJ0Q29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgUkZNIGRhdGEgZm9yIGEgc2V0IG9mIHJlc3VsdHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSByZm0gVGhlIG5hbWUgb2YgdGhlIFJGTVxuICAgICAqIEBwYXJhbSByZXN1bHRzIFRoZSByZXN1bHRzIGZvciB3aGljaCB0byByZXRyaWV2ZSBSRk0gZGF0YVxuICAgICAqL1xuICAgIGdldFJmbURhdGEocmZtOiBzdHJpbmcsIHJlc3VsdHM6IFJlc3VsdHMpOiBPYnNlcnZhYmxlPE1hcE9mPFJGTURhdGE+PiB7XG4gICAgICAgIGNvbnN0IGlkczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCByZWNvcmQgb2YgcmVzdWx0cy5yZWNvcmRzKSB7XG4gICAgICAgICAgICBpZiAoISFyZWNvcmQuZmxhZ3MgJiYgcmVjb3JkLmZsYWdzLmluZGV4T2YoXCJyXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlkcy5wdXNoKHJlY29yZC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgcmZtLFxuICAgICAgICAgICAgcXVlcnlIYXNoOiByZXN1bHRzLnJmbVF1ZXJ5SGFzaCxcbiAgICAgICAgICAgIGlkc1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8TWFwT2Y8UkZNRGF0YT4+KHRoaXMubWFrZVVybChSZm1XZWJTZXJ2aWNlLmVuZHBvaW50KSwgZGF0YSk7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZShvYnNlcnZhYmxlLFxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmZtU2VydmljZS5nZXRSZm1EYXRhIGZhaWx1cmUgLSBlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG59XG4iXX0=