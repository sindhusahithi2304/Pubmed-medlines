import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { share, tap } from "rxjs/operators";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * A helper service that overrides the standard Angular [HttpClient]{@link https://angular.io/api/common/http/HttpClient}
 * to prevent multiple subscribers from causing multiple requests to be issued and to mitigate against request flooding
 */
export class SqHttpClient extends HttpClient {
    constructor(httpHandler) {
        super(httpHandler);
        this.responseCache = new Map();
    }
    getRequestHash(first, url, options = {}) {
        // The replacer ensures that object keys are always serialized in the same order
        const strRequest = JSON.stringify([first, url, options], (key, value) => {
            if (Utils.isObject(value) && !Utils.isIterable(value)) {
                return Object.keys(value).sort().reduce((s, k) => {
                    s[k] = value[k];
                    return s;
                }, {});
            }
            else {
                return value;
            }
        });
        return Utils.sha256(strRequest);
    }
    /**
     * Overrides the standard `HttpClient.request` method to change its behavior as follows:
     * * pipes the observable to the share operator so that only a single request is issued even if there are multiple subscribers
     * * to mitigate request flooding, a cache of pending response observables keyed by the request thumbprint is maintained.
     * An observable from the cache is returned if the incoming request is identical to one in the cache
     */
    request(first, url, options = {}) {
        const requestHash = this.getRequestHash(first, url, options);
        let observable = this.responseCache.get(requestHash);
        if (!observable) {
            observable = super.request(first, url, options)
                .pipe(share())
                .pipe(tap(() => this.responseCache.delete(requestHash)));
            this.responseCache.set(requestHash, observable);
        }
        return observable;
    }
}
SqHttpClient.ɵfac = function SqHttpClient_Factory(t) { return new (t || SqHttpClient)(i0.ɵɵinject(i1.HttpHandler)); };
SqHttpClient.ɵprov = i0.ɵɵdefineInjectable({ token: SqHttpClient, factory: SqHttpClient.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SqHttpClient, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.HttpHandler }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS93ZWItc2VydmljZXMvIiwic291cmNlcyI6WyJodHRwLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxVQUFVLEVBQTJCLE1BQU0sc0JBQXNCLENBQUM7QUFFMUUsT0FBTyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQUV6Qzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sWUFBYSxTQUFRLFVBQVU7SUFJeEMsWUFDSSxXQUF3QjtRQUN4QixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKZixrQkFBYSxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0lBSzNELENBQUM7SUFFTyxjQUFjLENBQUMsS0FBZ0MsRUFBRSxHQUFZLEVBQUUsT0FBTyxHQUFHLEVBQUU7UUFDL0UsZ0ZBQWdGO1FBQ2hGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUNuRCxDQUFDLEdBQVcsRUFBRSxLQUFVLEVBQUUsRUFBRTtZQUN4QixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUNuQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQixPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDZDtpQkFDSTtnQkFDRCxPQUFPLEtBQUssQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU8sQ0FBQyxLQUFnQyxFQUFFLEdBQVksRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUNoRSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNiLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQWUsRUFBRSxHQUFhLEVBQUUsT0FBTyxDQUFDO2lCQUM5RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7d0VBM0NRLFlBQVk7b0RBQVosWUFBWSxXQUFaLFlBQVksbUJBRlQsTUFBTTtrREFFVCxZQUFZO2NBSHhCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFJlcXVlc3QsIEh0dHBIYW5kbGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7c2hhcmUsIHRhcH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbi8qKlxuICogQSBoZWxwZXIgc2VydmljZSB0aGF0IG92ZXJyaWRlcyB0aGUgc3RhbmRhcmQgQW5ndWxhciBbSHR0cENsaWVudF17QGxpbmsgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vaHR0cC9IdHRwQ2xpZW50fVxuICogdG8gcHJldmVudCBtdWx0aXBsZSBzdWJzY3JpYmVycyBmcm9tIGNhdXNpbmcgbXVsdGlwbGUgcmVxdWVzdHMgdG8gYmUgaXNzdWVkIGFuZCB0byBtaXRpZ2F0ZSBhZ2FpbnN0IHJlcXVlc3QgZmxvb2RpbmdcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIFNxSHR0cENsaWVudCBleHRlbmRzIEh0dHBDbGllbnQge1xuXG4gICAgcHJpdmF0ZSByZXNwb25zZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8YW55Pj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBodHRwSGFuZGxlcjogSHR0cEhhbmRsZXIpIHtcbiAgICAgICAgc3VwZXIoaHR0cEhhbmRsZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UmVxdWVzdEhhc2goZmlyc3Q6IHN0cmluZyB8IEh0dHBSZXF1ZXN0PGFueT4sIHVybD86IHN0cmluZywgb3B0aW9ucyA9IHt9KTogc3RyaW5nIHtcbiAgICAgICAgLy8gVGhlIHJlcGxhY2VyIGVuc3VyZXMgdGhhdCBvYmplY3Qga2V5cyBhcmUgYWx3YXlzIHNlcmlhbGl6ZWQgaW4gdGhlIHNhbWUgb3JkZXJcbiAgICAgICAgY29uc3Qgc3RyUmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KFtmaXJzdCwgdXJsLCBvcHRpb25zXSxcbiAgICAgICAgICAgIChrZXk6IHN0cmluZywgdmFsdWU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc09iamVjdCh2YWx1ZSkgJiYgIVV0aWxzLmlzSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgpLnJlZHVjZShcbiAgICAgICAgICAgICAgICAgICAgICAgIChzLCBrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc1trXSA9IHZhbHVlW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gVXRpbHMuc2hhMjU2KHN0clJlcXVlc3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlcyB0aGUgc3RhbmRhcmQgYEh0dHBDbGllbnQucmVxdWVzdGAgbWV0aG9kIHRvIGNoYW5nZSBpdHMgYmVoYXZpb3IgYXMgZm9sbG93czpcbiAgICAgKiAqIHBpcGVzIHRoZSBvYnNlcnZhYmxlIHRvIHRoZSBzaGFyZSBvcGVyYXRvciBzbyB0aGF0IG9ubHkgYSBzaW5nbGUgcmVxdWVzdCBpcyBpc3N1ZWQgZXZlbiBpZiB0aGVyZSBhcmUgbXVsdGlwbGUgc3Vic2NyaWJlcnNcbiAgICAgKiAqIHRvIG1pdGlnYXRlIHJlcXVlc3QgZmxvb2RpbmcsIGEgY2FjaGUgb2YgcGVuZGluZyByZXNwb25zZSBvYnNlcnZhYmxlcyBrZXllZCBieSB0aGUgcmVxdWVzdCB0aHVtYnByaW50IGlzIG1haW50YWluZWQuXG4gICAgICogQW4gb2JzZXJ2YWJsZSBmcm9tIHRoZSBjYWNoZSBpcyByZXR1cm5lZCBpZiB0aGUgaW5jb21pbmcgcmVxdWVzdCBpcyBpZGVudGljYWwgdG8gb25lIGluIHRoZSBjYWNoZVxuICAgICAqL1xuICAgIHJlcXVlc3QoZmlyc3Q6IHN0cmluZyB8IEh0dHBSZXF1ZXN0PGFueT4sIHVybD86IHN0cmluZywgb3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEhhc2ggPSB0aGlzLmdldFJlcXVlc3RIYXNoKGZpcnN0LCB1cmwsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IHRoaXMucmVzcG9uc2VDYWNoZS5nZXQocmVxdWVzdEhhc2gpO1xuICAgICAgICBpZiAoIW9ic2VydmFibGUpIHtcbiAgICAgICAgICAgIG9ic2VydmFibGUgPSBzdXBlci5yZXF1ZXN0KGZpcnN0IGFzIHN0cmluZywgdXJsIGFzIHN0cmluZywgb3B0aW9ucylcbiAgICAgICAgICAgICAgICAucGlwZShzaGFyZSgpKVxuICAgICAgICAgICAgICAgIC5waXBlKHRhcCgoKSA9PiB0aGlzLnJlc3BvbnNlQ2FjaGUuZGVsZXRlKHJlcXVlc3RIYXNoKSkpO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZUNhY2hlLnNldChyZXF1ZXN0SGFzaCwgb2JzZXJ2YWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxufVxuIl19