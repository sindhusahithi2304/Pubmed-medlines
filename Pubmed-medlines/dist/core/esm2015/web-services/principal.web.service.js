import { Injectable, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { pluck } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the principal web service
 */
export class PrincipalWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this._events = new Subject();
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * The observable events emitted by this service
     */
    get events() {
        return this._events;
    }
    /**
     * Gets the current {@link Principal}
     */
    get principal() {
        return this._principal;
    }
    /**
     * Sets the current {@link Principal} and issues the "changed" event
     */
    set principal(value) {
        this._principal = value;
        this._events.next({ type: "changed" });
    }
    /**
     * Gets the list of user info (user or group)
     *
     * @param params query params to specify the search
     * @returns list of user info
     */
    list(params) {
        return this.httpClient.get(this.makeUrl("principal/list"), {
            params: this.makeParams(Object.assign({}, params))
        });
    }
    userId(userId) {
        return this.httpClient.get(this.makeUrl(`principal/userId/${userId}`));
    }
    userIds(params) {
        return this.httpClient.post(this.makeUrl("principal/userids"), params).pipe(pluck("principals"));
    }
    /**
     * Gets the principal from the server based on the current login credentials
     *
     * @param autoAuthenticate Determines whether the {@link HttpInterceptor} should perform HTTP 401 handling
     * for this request
     */
    get(autoAuthenticate = true) {
        return this.httpClient.get(this.makeUrl("principal"), {
            params: this.makeParams({
                action: "get",
                noAutoAuthentication: !autoAuthenticate
            })
        });
    }
    /**
     * Gets the principal from the server based on the current login credentials and sets the
     * principal member
     */
    load() {
        const observable = this.get();
        Utils.subscribe(observable, (response) => {
            this.principal = response;
            return response;
        }, (error) => {
            console.log("principalService.get failure - error: ", error);
        });
        return observable;
    }
}
PrincipalWebService.ɵfac = function PrincipalWebService_Factory(t) { return new (t || PrincipalWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
PrincipalWebService.ɵprov = i0.ɵɵdefineInjectable({ token: PrincipalWebService, factory: PrincipalWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PrincipalWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbmNpcGFsLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsicHJpbmNpcGFsLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxPQUFPLEVBQWEsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFDckUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7QUF3RXpDOztHQUVHO0FBSUgsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFdBQVc7SUFJaEQsWUFDMEIsV0FBd0IsRUFDdEMsVUFBd0I7UUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRFgsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQUo1QixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQXlCLENBQUM7SUFNdkQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxTQUFTLENBQUMsS0FBNEI7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFJLENBQUMsTUFBd0I7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBb0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzFGLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxtQkFBSyxNQUFNLEVBQUU7U0FDdkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFjO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQTZCLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQStCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQTZCLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ25HLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDdEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3RCxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2Isb0JBQW9CLEVBQUUsQ0FBQyxnQkFBZ0I7YUFDMUMsQ0FBQztTQUNMLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzlCLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUN0QixDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHdDQUF3QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7c0ZBeEZRLG1CQUFtQixjQUtoQixZQUFZOzJEQUxmLG1CQUFtQixXQUFuQixtQkFBbUIsbUJBRmhCLE1BQU07a0RBRVQsbUJBQW1CO2NBSC9CLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBTVEsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7cGx1Y2t9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtTcUh0dHBDbGllbnR9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgU2luZXF1YSBwcmluY3BhbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFByaW5jaXBhbCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBpZDI6IHN0cmluZztcbiAgICBpZDM6IHN0cmluZztcbiAgICBpZDQ6IHN0cmluZztcbiAgICBpZDU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGxvbmdOYW1lOiBzdHJpbmc7XG4gICAgdXNlcklkOiBzdHJpbmc7XG4gICAgZnVsbE5hbWU6IHN0cmluZztcbiAgICBpc0FkbWluaXN0cmF0b3I6IGJvb2xlYW47XG4gICAgaXNEZWxlZ2F0ZWRBZG1pbjogYm9vbGVhbjtcbiAgICBwYXJhbTE6IHN0cmluZztcbiAgICBwYXJhbTI6IHN0cmluZztcbiAgICBwYXJhbTM6IHN0cmluZztcbiAgICBwYXJhbTQ6IHN0cmluZztcbiAgICBwYXJhbTU6IHN0cmluZztcbiAgICBwYXJhbTY6IHN0cmluZztcbiAgICBwYXJhbTc6IHN0cmluZztcbiAgICBwYXJhbTg6IHN0cmluZztcbiAgICBwYXJhbTk6IHN0cmluZztcbiAgICBwYXJhbTEwOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJpbmNpcGFsVXNlckluZm8ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdXNlcklkOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGZ1bGxOYW1lOiBzdHJpbmc7XG4gICAgbG9uZ05hbWU6IHN0cmluZztcbiAgICBlbWFpbDogc3RyaW5nO1xuICAgIGlzVXNlcjogc3RyaW5nO1xuICAgIGlzR3JvdXA6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcmluY2lwYWxQYXJhbXMge1xuICAgIG9mZnNldD86IG51bWJlcjsgICAgLy8gMFxuICAgIGxpbWl0PzogbnVtYmVyOyAgICAgLy8gMTBcbiAgICBpc1VzZXI/OiBib29sZWFuOyAgIC8vIHRydWVcbiAgICBpc0dyb3VwPzogYm9vbGVhbjsgIC8vIHRydWVcbiAgICBzZWFyY2g/OiBzdHJpbmc7ICAgIC8vIHNlYXJjaCBieSBuYW1lLCBmdWxsbmFtZSBvciBlbWFpbFxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJpbmNpcGFsVXNlcklkc1BhcmFtcyB7XG4gICAgb2Zmc2V0PzogbnVtYmVyOyAgICAvLyAwXG4gICAgbGltaXQ/OiBudW1iZXI7ICAgICAvLyAxMFxuICAgIHVzZXJJZHM6IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIEEgYmFzZSBldmVudCBmcm9tIHdoaWNoIGFsbCBldmVudHMgdGhhdCBjYW4gYmUgaXNzdWVkIGJ5IHRoZSB7QGxpbmsgUHJpbmNpcGFsV2ViU2VydmljZX0gYXJlIGRlcml2ZWRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcmluY2lwYWxFdmVudCB7XG4gICAgdHlwZTogXCJjaGFuZ2VkXCI7XG59XG5cbi8qKlxuICogVGhpcyBldmVudCBpcyBmaXJlZCBlYWNoIHRpbWUgdGhlIFtwcmluY2lwYWxde0BsaW5rIFByaW5jaXBhbFdlYlNlcnZpY2UjcHJpbmNpcGFsfSBtZW1iZXIgaXMgbW9kaWZpZWQuXG4gKiBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIGF0IGxvZ2luIC8gbG9nb2ZmIGFuZCBhbHNvIGlmIHRoZSBcIm92ZXJyaWRlIHVzZXJcIiBhZG1pbiBmZWF0dXJlIGlzIHVzZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJpbmNpcGFsQ2hhbmdlZEV2ZW50IGV4dGVuZHMgUHJpbmNpcGFsRXZlbnQge1xuICAgIHR5cGU6IFwiY2hhbmdlZFwiO1xufVxuXG4vKipcbiAqIEEgc2VydmljZSBmb3IgY2FsbGluZyB0aGUgcHJpbmNpcGFsIHdlYiBzZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBQcmluY2lwYWxXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX3ByaW5jaXBhbDogUHJpbmNpcGFsIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PFByaW5jaXBhbENoYW5nZWRFdmVudD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgc3RhcnRDb25maWc6IFN0YXJ0Q29uZmlnLFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IFNxSHR0cENsaWVudCkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBvYnNlcnZhYmxlIGV2ZW50cyBlbWl0dGVkIGJ5IHRoaXMgc2VydmljZVxuICAgICAqL1xuICAgIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxQcmluY2lwYWxDaGFuZ2VkRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHtAbGluayBQcmluY2lwYWx9XG4gICAgICovXG4gICAgZ2V0IHByaW5jaXBhbCgpOiBQcmluY2lwYWwgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJpbmNpcGFsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQge0BsaW5rIFByaW5jaXBhbH0gYW5kIGlzc3VlcyB0aGUgXCJjaGFuZ2VkXCIgZXZlbnRcbiAgICAgKi9cbiAgICBzZXQgcHJpbmNpcGFsKHZhbHVlOiBQcmluY2lwYWwgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcHJpbmNpcGFsID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBcImNoYW5nZWRcIn0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGxpc3Qgb2YgdXNlciBpbmZvICh1c2VyIG9yIGdyb3VwKVxuICAgICAqXG4gICAgICogQHBhcmFtIHBhcmFtcyBxdWVyeSBwYXJhbXMgdG8gc3BlY2lmeSB0aGUgc2VhcmNoXG4gICAgICogQHJldHVybnMgbGlzdCBvZiB1c2VyIGluZm9cbiAgICAgKi9cbiAgICBsaXN0KHBhcmFtcz86IFByaW5jaXBhbFBhcmFtcyk6IE9ic2VydmFibGU8KFByaW5jaXBhbFVzZXJJbmZvIHwgdW5kZWZpbmVkKVtdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PChQcmluY2lwYWxVc2VySW5mbyB8IHVuZGVmaW5lZClbXT4odGhpcy5tYWtlVXJsKFwicHJpbmNpcGFsL2xpc3RcIiksIHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5tYWtlUGFyYW1zKHsuLi5wYXJhbXN9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1c2VySWQodXNlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBhcnRpYWw8UHJpbmNpcGFsVXNlckluZm8+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PFBhcnRpYWw8UHJpbmNpcGFsVXNlckluZm8+Pih0aGlzLm1ha2VVcmwoYHByaW5jaXBhbC91c2VySWQvJHt1c2VySWR9YCkpO1xuICAgIH1cblxuICAgIHVzZXJJZHMocGFyYW1zPzogUHJpbmNpcGFsVXNlcklkc1BhcmFtcyk6IE9ic2VydmFibGU8UGFydGlhbDxQcmluY2lwYWxVc2VySW5mb1tdPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8UGFydGlhbDxQcmluY2lwYWxVc2VySW5mbz4+KHRoaXMubWFrZVVybChcInByaW5jaXBhbC91c2VyaWRzXCIpLCBwYXJhbXMpLnBpcGUoXG4gICAgICAgICAgICBwbHVjayhcInByaW5jaXBhbHNcIilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcmluY2lwYWwgZnJvbSB0aGUgc2VydmVyIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxvZ2luIGNyZWRlbnRpYWxzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXV0b0F1dGhlbnRpY2F0ZSBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHtAbGluayBIdHRwSW50ZXJjZXB0b3J9IHNob3VsZCBwZXJmb3JtIEhUVFAgNDAxIGhhbmRsaW5nXG4gICAgICogZm9yIHRoaXMgcmVxdWVzdFxuICAgICAqL1xuICAgIGdldChhdXRvQXV0aGVudGljYXRlID0gdHJ1ZSk6IE9ic2VydmFibGU8UHJpbmNpcGFsPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PFByaW5jaXBhbD4odGhpcy5tYWtlVXJsKFwicHJpbmNpcGFsXCIpLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcImdldFwiLFxuICAgICAgICAgICAgICAgIG5vQXV0b0F1dGhlbnRpY2F0aW9uOiAhYXV0b0F1dGhlbnRpY2F0ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJpbmNpcGFsIGZyb20gdGhlIHNlcnZlciBiYXNlZCBvbiB0aGUgY3VycmVudCBsb2dpbiBjcmVkZW50aWFscyBhbmQgc2V0cyB0aGVcbiAgICAgKiBwcmluY2lwYWwgbWVtYmVyXG4gICAgICovXG4gICAgbG9hZCgpOiBPYnNlcnZhYmxlPFByaW5jaXBhbD4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5nZXQoKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW5jaXBhbCA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInByaW5jaXBhbFNlcnZpY2UuZ2V0IGZhaWx1cmUgLSBlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG59XG4iXX0=