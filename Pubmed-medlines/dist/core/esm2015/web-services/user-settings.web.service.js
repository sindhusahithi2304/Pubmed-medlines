import { Injectable, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import jstz from "jstz";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
/**
 * A service for calling the usersettings web service
 */
export class UserSettingsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this._events = new Subject();
        this.timezone = jstz.determine().name(); // until momentjs gets this
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
     * Gets the current {@link UserSettings}
     */
    get userSettings() {
        return this._userSettings;
    }
    /**
     * Sets the current {@link UserSettings} and issues the "changed" event
     */
    set userSettings(value) {
        this._userSettings = value;
        this._events.next({ type: "changed" });
    }
    //TODO remove
    /**
     * @deprecated use "userSettings" get property to retrieve the user settings
     * @returns User settings object or undefined
     */
    getUserSettings() {
        return this.userSettings;
    }
    /**
     * Load the user settings for the currently logged in user.
     * Sets the userSettings member and issues the "changed" event
     */
    load() {
        const observable = this.httpClient.get(this.makeUrl("usersettings"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable, (response) => {
            this.userSettings = response;
            if (this.userSettings) {
                if (this.reviver) {
                    this.reviver(this.userSettings);
                }
            }
        }, (error) => {
            console.log("userSettingsService.load failure - error: ", error);
        });
        return observable;
    }
    /**
     * Saves the current user settings on the server
     *
     * @param auditEvents
     */
    save(auditEvents) {
        const observable = this.httpClient.post(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "save",
            userSettings: this.userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable, (response) => response, (error) => {
            console.log("userSettingsService.save failure - error: ", error);
        });
        return observable;
    }
    /**
     * Patches the user settings on the server using a partial user settings object. The partial
     * object is used to update the user settings on the server according to [RFC7396]{@link https://tools.ietf.org/html/rfc7396}
     *
     * @param userSettings The partial user settings
     * @param auditEvents Any associated audit events to store on the server
     */
    patch(userSettings, auditEvents) {
        const observable = this.httpClient.post(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "patch",
            userSettings: userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable, (response) => response, (error) => {
            console.log("userSettingsService.patch failure - error: ", error);
        });
        return observable;
    }
    /**
     * Resets User Settings (emits a change event and audit events).
     */
    reset() {
        // Save current state
        const currentState = this.userSettings;
        // Reset User settings (and emit an event!)
        this.userSettings = {};
        const observable = this.save({
            type: 'UserSettings_Reset'
        });
        observable.subscribe({
            next: () => { },
            error: () => this.userSettings = currentState // Restore previous state
        });
        return observable;
    }
    /**
     * Reads a user setting.
     *
     * @param paths The path to the setting in the JSON.
     */
    readUserSetting(paths) {
        let json = this.userSettings;
        if (json) {
            for (const path of paths) {
                json = json[path];
                if (!json) {
                    // Value does not exist yet
                    return undefined;
                }
            }
        }
        return json;
    }
}
UserSettingsWebService.ɵfac = function UserSettingsWebService_Factory(t) { return new (t || UserSettingsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
UserSettingsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: UserSettingsWebService, factory: UserSettingsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UserSettingsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZXR0aW5ncy53ZWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3dlYi1zZXJ2aWNlcy8iLCJzb3VyY2VzIjpbInVzZXItc2V0dGluZ3Mud2ViLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLE9BQU8sRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUV6QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV6QyxPQUFPLElBQUksTUFBTSxNQUFNLENBQUM7OztBQTRCeEI7O0dBRUc7QUFJSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsV0FBVztJQVluRCxZQUMwQixXQUF3QixFQUN0QyxVQUF3QjtRQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFEWCxlQUFVLEdBQVYsVUFBVSxDQUFjO1FBSjVCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBNEIsQ0FBQztRQU10RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQjtJQUN4RSxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFlB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RyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3pCLElBQUksRUFBRSxvQkFBb0I7U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUNqQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztZQUNkLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyx5QkFBeUI7U0FDMUUsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxlQUFlLENBQUMsS0FBZTtRQUNsQyxJQUFJLElBQUksR0FBUSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2xDLElBQUksSUFBSSxFQUFFO1lBQ04sS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1AsMkJBQTJCO29CQUMzQixPQUFPLFNBQVMsQ0FBQztpQkFDcEI7YUFDSjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7NEZBN0pRLHNCQUFzQixjQWFuQixZQUFZOzhEQWJmLHNCQUFzQixXQUF0QixzQkFBc0IsbUJBRm5CLE1BQU07a0RBRVQsc0JBQXNCO2NBSGxDLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7c0JBY1EsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3ViamVjdCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7U3FIdHRwQ2xpZW50fSBmcm9tIFwiLi9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHtIdHRwU2VydmljZX0gZnJvbSBcIi4vaHR0cC5zZXJ2aWNlXCI7XG5pbXBvcnQge1NUQVJUX0NPTkZJRywgU3RhcnRDb25maWd9IGZyb20gXCIuL3N0YXJ0LWNvbmZpZy53ZWIuc2VydmljZVwiO1xuaW1wb3J0IHtVdGlsc30gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHtBdWRpdEV2ZW50c30gZnJvbSBcIi4vYXVkaXQud2ViLnNlcnZpY2VcIjtcbmltcG9ydCBqc3R6IGZyb20gXCJqc3R6XCI7XG5cbi8qKlxuICogTWluaW1hbCBidWlsdC1pbiB1c2VyIHNldHRpbmdzLiBDYW4gYmUgZXh0ZW5kZWQgaW4gdGhlIGNvbnRleHQgb2ZcbiAqIGNvbXBsZXggYXBwbGljYXRpb25zIHRvIHN0b3JlIHVzZXIgZGF0YSwgcHJlZmVyZW5jZXMsIG9iamVjdHMsIGV0Yy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VyU2V0dGluZ3Mge1xuICAgIGxhbmd1YWdlPzogc3RyaW5nO1xuICAgIHNraXBDb3VudD86IG51bWJlcjtcbiAgICBlbWFpbD86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbi8qKlxuICogQSBiYXNlIGV2ZW50IGZyb20gd2hpY2ggYWxsIGV2ZW50cyB0aGF0IGNhbiBiZSBpc3N1ZWQgYnkgdGhlIHtAbGluayBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlfSBhcmUgZGVyaXZlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVzZXJTZXR0aW5nc0V2ZW50IHtcbiAgICB0eXBlOiBcImNoYW5nZWRcIjtcbn1cblxuLyoqXG4gKiBUaGlzIGV2ZW50IGlzIGZpcmVkIGVhY2ggdGltZSB0aGUgW3VzZXJTZXR0aW5nc117QGxpbmsgVXNlclNldHRpbmdzV2ViU2VydmljZSN1c2VyU2V0dGluZ3N9IG1lbWJlciBpcyBtb2RpZmllZC5cbiAqIFR5cGljYWxseSB0aGlzIHdpbGwgYmUgYXQgbG9naW4gLyBsb2dvZmYgYW5kIGFsc28gaWYgdGhlIFwib3ZlcnJpZGUgdXNlclwiIGFkbWluIGZlYXR1cmUgaXMgdXNlZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVc2VyU2V0dGluZ3NDaGFuZ2VkRXZlbnQgZXh0ZW5kcyBVc2VyU2V0dGluZ3NFdmVudCB7XG4gICAgdHlwZTogXCJjaGFuZ2VkXCI7XG59XG5cbi8qKlxuICogQSBzZXJ2aWNlIGZvciBjYWxsaW5nIHRoZSB1c2Vyc2V0dGluZ3Mgd2ViIHNlcnZpY2VcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJTZXR0aW5nc1dlYlNlcnZpY2UgZXh0ZW5kcyBIdHRwU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gICAgcHJpdmF0ZSBfdXNlclNldHRpbmdzOiBVc2VyU2V0dGluZ3MgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVGhlIHRpbWV6b25lIGZvciB0aGUgdXNlclxuICAgICAqL1xuICAgIHRpbWV6b25lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQSByZXZpdmVyIGZ1bmN0aW9uIHRoYXQsIGlmIHNldCwgd2lsbCBiZSBjYWxsZWQgb24gdGhlIHVzZXIgc2V0dGluZ3Mgd2hlbiB0aGV5IGFyZSBsb2FkZWRcbiAgICAgKi9cbiAgICByZXZpdmVyOiAodXM6IFVzZXJTZXR0aW5ncykgPT4gdm9pZDtcbiAgICBwcml2YXRlIF9ldmVudHMgPSBuZXcgU3ViamVjdDxVc2VyU2V0dGluZ3NDaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBTcUh0dHBDbGllbnQpIHtcbiAgICAgICAgc3VwZXIoc3RhcnRDb25maWcpO1xuICAgICAgICB0aGlzLnRpbWV6b25lID0ganN0ei5kZXRlcm1pbmUoKS5uYW1lKCk7IC8vIHVudGlsIG1vbWVudGpzIGdldHMgdGhpc1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb2JzZXJ2YWJsZSBldmVudHMgZW1pdHRlZCBieSB0aGlzIHNlcnZpY2VcbiAgICAgKi9cbiAgICBnZXQgZXZlbnRzKCk6IE9ic2VydmFibGU8VXNlclNldHRpbmdzQ2hhbmdlZEV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCB7QGxpbmsgVXNlclNldHRpbmdzfVxuICAgICAqL1xuICAgIGdldCB1c2VyU2V0dGluZ3MoKTogVXNlclNldHRpbmdzIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTZXR0aW5ncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHtAbGluayBVc2VyU2V0dGluZ3N9IGFuZCBpc3N1ZXMgdGhlIFwiY2hhbmdlZFwiIGV2ZW50XG4gICAgICovXG4gICAgc2V0IHVzZXJTZXR0aW5ncyh2YWx1ZTogVXNlclNldHRpbmdzIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXR0aW5ncyA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogXCJjaGFuZ2VkXCJ9KTtcbiAgICB9XG5cbiAgICAvL1RPRE8gcmVtb3ZlXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgdXNlIFwidXNlclNldHRpbmdzXCIgZ2V0IHByb3BlcnR5IHRvIHJldHJpZXZlIHRoZSB1c2VyIHNldHRpbmdzXG4gICAgICogQHJldHVybnMgVXNlciBzZXR0aW5ncyBvYmplY3Qgb3IgdW5kZWZpbmVkXG4gICAgICovXG4gICAgcHVibGljIGdldFVzZXJTZXR0aW5ncygpOiBVc2VyU2V0dGluZ3MgfCB1bmRlZmluZWR7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJTZXR0aW5ncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSB1c2VyIHNldHRpbmdzIGZvciB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyLlxuICAgICAqIFNldHMgdGhlIHVzZXJTZXR0aW5ncyBtZW1iZXIgYW5kIGlzc3VlcyB0aGUgXCJjaGFuZ2VkXCIgZXZlbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZCgpOiBPYnNlcnZhYmxlPFVzZXJTZXR0aW5ncz4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LmdldDxVc2VyU2V0dGluZ3M+KHRoaXMubWFrZVVybChcInVzZXJzZXR0aW5nc1wiKSwge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLm1ha2VQYXJhbXMoe1xuICAgICAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgICAgIGFjdGlvbjogXCJsb2FkXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlclNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJldml2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV2aXZlcih0aGlzLnVzZXJTZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyU2V0dGluZ3NTZXJ2aWNlLmxvYWQgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNhdmVzIHRoZSBjdXJyZW50IHVzZXIgc2V0dGluZ3Mgb24gdGhlIHNlcnZlclxuICAgICAqXG4gICAgICogQHBhcmFtIGF1ZGl0RXZlbnRzXG4gICAgICovXG4gICAgcHVibGljIHNhdmUoYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8dm9pZD4odGhpcy5tYWtlVXJsKFwidXNlcnNldHRpbmdzXCIpLCB7XG4gICAgICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJzYXZlXCIsXG4gICAgICAgICAgICB1c2VyU2V0dGluZ3M6IHRoaXMudXNlclNldHRpbmdzLFxuICAgICAgICAgICAgJGF1ZGl0UmVjb3JkOiBhdWRpdEV2ZW50c1xuICAgICAgICB9KTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocmVzcG9uc2UpID0+IHJlc3BvbnNlLFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1c2VyU2V0dGluZ3NTZXJ2aWNlLnNhdmUgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhdGNoZXMgdGhlIHVzZXIgc2V0dGluZ3Mgb24gdGhlIHNlcnZlciB1c2luZyBhIHBhcnRpYWwgdXNlciBzZXR0aW5ncyBvYmplY3QuIFRoZSBwYXJ0aWFsXG4gICAgICogb2JqZWN0IGlzIHVzZWQgdG8gdXBkYXRlIHRoZSB1c2VyIHNldHRpbmdzIG9uIHRoZSBzZXJ2ZXIgYWNjb3JkaW5nIHRvIFtSRkM3Mzk2XXtAbGluayBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzM5Nn1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB1c2VyU2V0dGluZ3MgVGhlIHBhcnRpYWwgdXNlciBzZXR0aW5nc1xuICAgICAqIEBwYXJhbSBhdWRpdEV2ZW50cyBBbnkgYXNzb2NpYXRlZCBhdWRpdCBldmVudHMgdG8gc3RvcmUgb24gdGhlIHNlcnZlclxuICAgICAqL1xuICAgIHB1YmxpYyBwYXRjaCh1c2VyU2V0dGluZ3M6IFVzZXJTZXR0aW5ncywgYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cyk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8dm9pZD4odGhpcy5tYWtlVXJsKFwidXNlcnNldHRpbmdzXCIpLCB7XG4gICAgICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJwYXRjaFwiLFxuICAgICAgICAgICAgdXNlclNldHRpbmdzOiB1c2VyU2V0dGluZ3MsXG4gICAgICAgICAgICAkYXVkaXRSZWNvcmQ6IGF1ZGl0RXZlbnRzXG4gICAgICAgIH0pO1xuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4gcmVzcG9uc2UsXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXJTZXR0aW5nc1NlcnZpY2UucGF0Y2ggZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBVc2VyIFNldHRpbmdzIChlbWl0cyBhIGNoYW5nZSBldmVudCBhbmQgYXVkaXQgZXZlbnRzKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgIC8vIFNhdmUgY3VycmVudCBzdGF0ZVxuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLnVzZXJTZXR0aW5ncztcbiAgICAgICAgLy8gUmVzZXQgVXNlciBzZXR0aW5ncyAoYW5kIGVtaXQgYW4gZXZlbnQhKVxuICAgICAgICB0aGlzLnVzZXJTZXR0aW5ncyA9IHt9O1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5zYXZlKHtcbiAgICAgICAgICAgIHR5cGU6ICdVc2VyU2V0dGluZ3NfUmVzZXQnXG4gICAgICAgIH0pO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiB7fSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB0aGlzLnVzZXJTZXR0aW5ncyA9IGN1cnJlbnRTdGF0ZSAvLyBSZXN0b3JlIHByZXZpb3VzIHN0YXRlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIGEgdXNlciBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhzIFRoZSBwYXRoIHRvIHRoZSBzZXR0aW5nIGluIHRoZSBKU09OLlxuICAgICAqL1xuICAgIHB1YmxpYyByZWFkVXNlclNldHRpbmcocGF0aHM6IHN0cmluZ1tdKTogYW55IHtcbiAgICAgICAgbGV0IGpzb246IGFueSA9IHRoaXMudXNlclNldHRpbmdzO1xuICAgICAgICBpZiAoanNvbikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICAgICAgICAgICAganNvbiA9IGpzb25bcGF0aF07XG4gICAgICAgICAgICAgICAgaWYgKCFqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbHVlIGRvZXMgbm90IGV4aXN0IHlldFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICB9XG59XG4iXX0=