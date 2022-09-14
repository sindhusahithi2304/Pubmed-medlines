import { UserSettingsWebService } from '@sinequa/core/web-services';
import * as i0 from "@angular/core";
/**
 * The role of this service is to bundle together the simple preferences of
 * the user and synchronise them with the user settings.
 *
 * Usage:
 * this.userPreferences.get("foo")
 * this.userPreferences.set("foo", "bar")
 * this.userPreferences.sync()
 */
export declare class UserPreferences {
    private userSettingsService;
    constructor(userSettingsService: UserSettingsWebService);
    private get prefs();
    /**
     * Returns the value of a property
     * @param property the name of this property
     */
    get(property: string): any;
    /**
     * Sets the value of a property
     * @param property the name of this property
     * @param value the value
     * @param skipSync whether we should skyp syncing (to update multiple properties for example)
     */
    set(property: string, value: any, skipSync?: boolean): void;
    /**
     * Deletes a given property from the preferences
     * @param property the name of this property
     * @param skipSync whether we should skyp syncing (to update multiple properties for example)
     */
    delete(property: string, skipSync?: boolean): void;
    /**
     * Synchronizes the user preferences with the server
     */
    sync(): void;
    static ɵfac: i0.ɵɵFactoryDef<UserPreferences, never>;
    static ɵprov: i0.ɵɵInjectableDef<UserPreferences>;
}
//# sourceMappingURL=user-preferences.d.ts.map