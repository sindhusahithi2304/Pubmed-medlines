import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import { AuditEvents } from "./audit.web.service";
import * as i0 from "@angular/core";
/**
 * Minimal built-in user settings. Can be extended in the context of
 * complex applications to store user data, preferences, objects, etc.
 */
export interface UserSettings {
    language?: string;
    skipCount?: number;
    email?: string;
    [key: string]: any;
}
/**
 * A base event from which all events that can be issued by the {@link UserSettingsWebService} are derived
 */
export interface UserSettingsEvent {
    type: "changed";
}
/**
 * This event is fired each time the [userSettings]{@link UserSettingsWebService#userSettings} member is modified.
 * Typically this will be at login / logoff and also if the "override user" admin feature is used.
 */
export interface UserSettingsChangedEvent extends UserSettingsEvent {
    type: "changed";
}
/**
 * A service for calling the usersettings web service
 */
export declare class UserSettingsWebService extends HttpService implements OnDestroy {
    private httpClient;
    private _userSettings;
    /**
     * The timezone for the user
     */
    timezone: string;
    /**
     * A reviver function that, if set, will be called on the user settings when they are loaded
     */
    reviver: (us: UserSettings) => void;
    private _events;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    ngOnDestroy(): void;
    /**
     * The observable events emitted by this service
     */
    get events(): Observable<UserSettingsChangedEvent>;
    /**
     * Gets the current {@link UserSettings}
     */
    get userSettings(): UserSettings | undefined;
    /**
     * Sets the current {@link UserSettings} and issues the "changed" event
     */
    set userSettings(value: UserSettings | undefined);
    /**
     * @deprecated use "userSettings" get property to retrieve the user settings
     * @returns User settings object or undefined
     */
    getUserSettings(): UserSettings | undefined;
    /**
     * Load the user settings for the currently logged in user.
     * Sets the userSettings member and issues the "changed" event
     */
    load(): Observable<UserSettings>;
    /**
     * Saves the current user settings on the server
     *
     * @param auditEvents
     */
    save(auditEvents?: AuditEvents): Observable<void>;
    /**
     * Patches the user settings on the server using a partial user settings object. The partial
     * object is used to update the user settings on the server according to [RFC7396]{@link https://tools.ietf.org/html/rfc7396}
     *
     * @param userSettings The partial user settings
     * @param auditEvents Any associated audit events to store on the server
     */
    patch(userSettings: UserSettings, auditEvents?: AuditEvents): Observable<void>;
    /**
     * Resets User Settings (emits a change event and audit events).
     */
    reset(): Observable<void>;
    /**
     * Reads a user setting.
     *
     * @param paths The path to the setting in the JSON.
     */
    readUserSetting(paths: string[]): any;
    static ɵfac: i0.ɵɵFactoryDef<UserSettingsWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<UserSettingsWebService>;
}
//# sourceMappingURL=user-settings.web.service.d.ts.map