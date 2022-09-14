import { Inject, Injectable } from '@angular/core';
import { throwError } from "rxjs";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A generic service for invoking JsonMethod plugins
 */
export class JsonMethodPluginService extends HttpService {
    constructor(httpClient, startConfig) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Call a JsonMethod plugin using an HTTP POST
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    post(method, query, options) {
        if (!Utils.isObject(query)) {
            return throwError({ error: "invalid query object" });
        }
        const observable = this.httpClient.post(this.makeUrl(method), query, options);
        Utils.subscribe(observable, (response) => {
            console.log("JsonMethodPluginService.post success - data: ", response);
        }, (error) => {
            console.log("JsonMethodPluginService.post failure - error: ", error);
        }, () => {
            console.log("JsonMethodPluginService.post complete");
        });
        return observable;
    }
    /**
     * Call a JsonMethod plugin using an HTTP POST
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    call(method, query, options) {
        return this.post(method, query, options);
    }
    /**
     * Call a JsonMethod plugin using an HTTP GET
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    get(method, query, options) {
        const observable = this.httpClient.get(this.makeUrl(method), Object.assign({ params: this.makeParams(query) }, options));
        Utils.subscribe(observable, (response) => {
            console.log("JsonMethodPluginService.get success - data: ", response);
        }, (error) => {
            console.log("JsonMethodPluginService.get failure - error: ", error);
        }, () => {
            console.log("JsonMethodPluginService.get complete");
        });
        return observable;
    }
    makeUrl(api) {
        return super.makeUrl('plugin/' + api);
    }
}
JsonMethodPluginService.ɵfac = function JsonMethodPluginService_Factory(t) { return new (t || JsonMethodPluginService)(i0.ɵɵinject(i1.SqHttpClient), i0.ɵɵinject(START_CONFIG)); };
JsonMethodPluginService.ɵprov = i0.ɵɵdefineInjectable({ token: JsonMethodPluginService, factory: JsonMethodPluginService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(JsonMethodPluginService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.SqHttpClient }, { type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1tZXRob2QtcGx1Z2luLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsianNvbi1tZXRob2QtcGx1Z2luLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBYSxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFNUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxZQUFZLEVBQWMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQUV6Qzs7R0FFRztBQUlILE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxXQUFXO0lBQ3RELFlBQ1MsVUFBd0IsRUFDVCxXQUF3QjtRQUU1QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFIZCxlQUFVLEdBQVYsVUFBVSxDQUFjO0lBSWpDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxDQUFDLE1BQWMsRUFBRSxLQUFVLEVBQUUsT0FBOEI7UUFDN0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxVQUFVLENBQUMsRUFBQyxLQUFLLEVBQUUsc0JBQXNCLEVBQUMsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFOUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQ3hCLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsRUFDRCxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RSxDQUFDLEVBQ0QsR0FBRyxFQUFFO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBRUwsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLENBQUMsTUFBYyxFQUFFLEtBQVUsRUFBRSxPQUE4QjtRQUM3RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEdBQUcsQ0FBQyxNQUFjLEVBQUUsS0FBVSxFQUFFLE9BQThCO1FBQzVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUN6RCxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFDM0IsT0FBTyxFQUNWLENBQUM7UUFFSCxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFDeEIsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEUsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLENBQUMsRUFDRCxHQUFHLEVBQUU7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFTCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDakIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs4RkE5RVUsdUJBQXVCLDRDQUd4QixZQUFZOytEQUhYLHVCQUF1QixXQUF2Qix1QkFBdUIsbUJBRnRCLE1BQU07a0RBRVAsdUJBQXVCO2NBSG5DLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7c0JBSUksTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCB0aHJvd0Vycm9yfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtTcUh0dHBDbGllbnR9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbi8qKlxuICogQSBnZW5lcmljIHNlcnZpY2UgZm9yIGludm9raW5nIEpzb25NZXRob2QgcGx1Z2luc1xuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIEpzb25NZXRob2RQbHVnaW5TZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2V7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBodHRwQ2xpZW50OiBTcUh0dHBDbGllbnQsXG4gICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZ1xuICAgICkge1xuICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgYSBKc29uTWV0aG9kIHBsdWdpbiB1c2luZyBhbiBIVFRQIFBPU1RcbiAgICpcbiAgICogQHBhcmFtIG1ldGhvZCBUaGUgbmFtZSBvZiB0aGUgSnNvbk1ldGhvZCBwbHVnaW5cbiAgICogQHBhcmFtIHF1ZXJ5IFBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgcGx1Z2luXG4gICAqIEBwYXJhbSBvcHRpb25zIEhUVFAgb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3RcbiAgICogQHJldHVybnMgQW4gb2JzZXJ2YWJsZSBvZiB0aGUgcGx1Z2luJ3MgcmV0dXJuIHZhbHVlXG4gICAqL1xuICBwb3N0KG1ldGhvZDogc3RyaW5nLCBxdWVyeTogYW55LCBvcHRpb25zPzoge1trZXk6IHN0cmluZ106IGFueX0pIDogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBpZiAoIVV0aWxzLmlzT2JqZWN0KHF1ZXJ5KSkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3Ioe2Vycm9yOiBcImludmFsaWQgcXVlcnkgb2JqZWN0XCJ9KTtcbiAgICB9XG4gICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cENsaWVudC5wb3N0KHRoaXMubWFrZVVybChtZXRob2QpLCBxdWVyeSwgb3B0aW9ucyk7XG5cbiAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkpzb25NZXRob2RQbHVnaW5TZXJ2aWNlLnBvc3Qgc3VjY2VzcyAtIGRhdGE6IFwiLCByZXNwb25zZSk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSnNvbk1ldGhvZFBsdWdpblNlcnZpY2UucG9zdCBmYWlsdXJlIC0gZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkpzb25NZXRob2RQbHVnaW5TZXJ2aWNlLnBvc3QgY29tcGxldGVcIik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGwgYSBKc29uTWV0aG9kIHBsdWdpbiB1c2luZyBhbiBIVFRQIFBPU1RcbiAgICpcbiAgICogQHBhcmFtIG1ldGhvZCBUaGUgbmFtZSBvZiB0aGUgSnNvbk1ldGhvZCBwbHVnaW5cbiAgICogQHBhcmFtIHF1ZXJ5IFBhcmFtZXRlcnMgdG8gcGFzcyB0byB0aGUgcGx1Z2luXG4gICAqIEBwYXJhbSBvcHRpb25zIEhUVFAgb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3RcbiAgICogQHJldHVybnMgQW4gb2JzZXJ2YWJsZSBvZiB0aGUgcGx1Z2luJ3MgcmV0dXJuIHZhbHVlXG4gICAqL1xuICBjYWxsKG1ldGhvZDogc3RyaW5nLCBxdWVyeTogYW55LCBvcHRpb25zPzoge1trZXk6IHN0cmluZ106IGFueX0pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnBvc3QobWV0aG9kLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBhIEpzb25NZXRob2QgcGx1Z2luIHVzaW5nIGFuIEhUVFAgR0VUXG4gICAqXG4gICAqIEBwYXJhbSBtZXRob2QgVGhlIG5hbWUgb2YgdGhlIEpzb25NZXRob2QgcGx1Z2luXG4gICAqIEBwYXJhbSBxdWVyeSBQYXJhbWV0ZXJzIHRvIHBhc3MgdG8gdGhlIHBsdWdpblxuICAgKiBAcGFyYW0gb3B0aW9ucyBIVFRQIG9wdGlvbnMgZm9yIHRoZSByZXF1ZXN0XG4gICAqIEByZXR1cm5zIEFuIG9ic2VydmFibGUgb2YgdGhlIHBsdWdpbidzIHJldHVybiB2YWx1ZVxuICAgKi9cbiAgZ2V0KG1ldGhvZDogc3RyaW5nLCBxdWVyeTogYW55LCBvcHRpb25zPzoge1trZXk6IHN0cmluZ106IGFueX0pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQuZ2V0KHRoaXMubWFrZVVybChtZXRob2QpLCB7XG4gICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyhxdWVyeSksXG4gICAgICAuLi5vcHRpb25zXG4gICAgfSk7XG5cbiAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkpzb25NZXRob2RQbHVnaW5TZXJ2aWNlLmdldCBzdWNjZXNzIC0gZGF0YTogXCIsIHJlc3BvbnNlKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJKc29uTWV0aG9kUGx1Z2luU2VydmljZS5nZXQgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJKc29uTWV0aG9kUGx1Z2luU2VydmljZS5nZXQgY29tcGxldGVcIik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICB9XG5cbiAgbWFrZVVybChhcGk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN1cGVyLm1ha2VVcmwoJ3BsdWdpbi8nICsgYXBpKTtcbiAgfVxufSJdfQ==