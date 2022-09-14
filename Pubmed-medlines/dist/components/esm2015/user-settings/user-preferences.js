import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
/**
 * The role of this service is to bundle together the simple preferences of
 * the user and synchronise them with the user settings.
 *
 * Usage:
 * this.userPreferences.get("foo")
 * this.userPreferences.set("foo", "bar")
 * this.userPreferences.sync()
 */
export class UserPreferences {
    constructor(userSettingsService) {
        this.userSettingsService = userSettingsService;
    }
    get prefs() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["prefs"])
            this.userSettingsService.userSettings["prefs"] = {};
        return this.userSettingsService.userSettings["prefs"];
    }
    /**
     * Returns the value of a property
     * @param property the name of this property
     */
    get(property) {
        return this.prefs[property.toLowerCase()];
    }
    /**
     * Sets the value of a property
     * @param property the name of this property
     * @param value the value
     * @param skipSync whether we should skyp syncing (to update multiple properties for example)
     */
    set(property, value, skipSync) {
        this.prefs[property.toLowerCase()] = value;
        if (!skipSync) {
            this.sync();
        }
    }
    /**
     * Deletes a given property from the preferences
     * @param property the name of this property
     * @param skipSync whether we should skyp syncing (to update multiple properties for example)
     */
    delete(property, skipSync) {
        if (Object.prototype.hasOwnProperty.call(this.prefs, property.toLowerCase())) {
            this.prefs[property.toLowerCase()] = null;
            if (!skipSync) {
                this.sync();
            }
        }
    }
    /**
     * Synchronizes the user preferences with the server
     */
    sync() {
        this.userSettingsService.patch({ prefs: this.prefs });
    }
}
UserPreferences.ɵfac = function UserPreferences_Factory(t) { return new (t || UserPreferences)(i0.ɵɵinject(i1.UserSettingsWebService)); };
UserPreferences.ɵprov = i0.ɵɵdefineInjectable({ token: UserPreferences, factory: UserPreferences.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UserPreferences, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcmVmZXJlbmNlcy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3VzZXItc2V0dGluZ3MvIiwic291cmNlcyI6WyJ1c2VyLXByZWZlcmVuY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUczQzs7Ozs7Ozs7R0FRRztBQUlILE1BQU0sT0FBTyxlQUFlO0lBRXhCLFlBQ1ksbUJBQTJDO1FBQTNDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBd0I7SUFFdkQsQ0FBQztJQUVELElBQVksS0FBSztRQUNiLElBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWTtZQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUMvQyxJQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDSSxHQUFHLENBQUMsUUFBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEtBQVUsRUFBRSxRQUFrQjtRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQyxJQUFHLENBQUMsUUFBUSxFQUFDO1lBQ1QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxRQUFnQixFQUFFLFFBQWtCO1FBQzlDLElBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7WUFDekUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDMUMsSUFBRyxDQUFDLFFBQVEsRUFBQztnQkFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNQLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OEVBdkRRLGVBQWU7dURBQWYsZUFBZSxXQUFmLGVBQWUsbUJBRlosTUFBTTtrREFFVCxlQUFlO2NBSDNCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJTZXR0aW5nc1dlYlNlcnZpY2UgfSBmcm9tICdAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlcyc7XG5cbi8qKlxuICogVGhlIHJvbGUgb2YgdGhpcyBzZXJ2aWNlIGlzIHRvIGJ1bmRsZSB0b2dldGhlciB0aGUgc2ltcGxlIHByZWZlcmVuY2VzIG9mXG4gKiB0aGUgdXNlciBhbmQgc3luY2hyb25pc2UgdGhlbSB3aXRoIHRoZSB1c2VyIHNldHRpbmdzLlxuICpcbiAqIFVzYWdlOlxuICogdGhpcy51c2VyUHJlZmVyZW5jZXMuZ2V0KFwiZm9vXCIpXG4gKiB0aGlzLnVzZXJQcmVmZXJlbmNlcy5zZXQoXCJmb29cIiwgXCJiYXJcIilcbiAqIHRoaXMudXNlclByZWZlcmVuY2VzLnN5bmMoKVxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgVXNlclByZWZlcmVuY2VzIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHVzZXJTZXR0aW5nc1NlcnZpY2U6IFVzZXJTZXR0aW5nc1dlYlNlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBwcmVmcygpOiBhbnkge1xuICAgICAgICBpZighdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncylcbiAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3MgPSB7fTtcbiAgICAgICAgaWYoIXRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3NbXCJwcmVmc1wiXSlcbiAgICAgICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3NbXCJwcmVmc1wiXSA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcInByZWZzXCJdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgdGhlIG5hbWUgb2YgdGhpcyBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQocHJvcGVydHk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmVmc1twcm9wZXJ0eS50b0xvd2VyQ2FzZSgpXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5XG4gICAgICogQHBhcmFtIHByb3BlcnR5IHRoZSBuYW1lIG9mIHRoaXMgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlXG4gICAgICogQHBhcmFtIHNraXBTeW5jIHdoZXRoZXIgd2Ugc2hvdWxkIHNreXAgc3luY2luZyAodG8gdXBkYXRlIG11bHRpcGxlIHByb3BlcnRpZXMgZm9yIGV4YW1wbGUpXG4gICAgICovXG4gICAgcHVibGljIHNldChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogYW55LCBza2lwU3luYz86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5wcmVmc1twcm9wZXJ0eS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlO1xuICAgICAgICBpZighc2tpcFN5bmMpe1xuICAgICAgICAgICAgdGhpcy5zeW5jKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgZ2l2ZW4gcHJvcGVydHkgZnJvbSB0aGUgcHJlZmVyZW5jZXNcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgdGhlIG5hbWUgb2YgdGhpcyBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSBza2lwU3luYyB3aGV0aGVyIHdlIHNob3VsZCBza3lwIHN5bmNpbmcgKHRvIHVwZGF0ZSBtdWx0aXBsZSBwcm9wZXJ0aWVzIGZvciBleGFtcGxlKVxuICAgICAqL1xuICAgIHB1YmxpYyBkZWxldGUocHJvcGVydHk6IHN0cmluZywgc2tpcFN5bmM/OiBib29sZWFuKSB7XG4gICAgICAgIGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLnByZWZzLCBwcm9wZXJ0eS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVmc1twcm9wZXJ0eS50b0xvd2VyQ2FzZSgpXSA9IG51bGw7XG4gICAgICAgICAgICBpZighc2tpcFN5bmMpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3luY2hyb25pemVzIHRoZSB1c2VyIHByZWZlcmVuY2VzIHdpdGggdGhlIHNlcnZlclxuICAgICAqL1xuICAgIHB1YmxpYyBzeW5jKCl7XG4gICAgICAgIHRoaXMudXNlclNldHRpbmdzU2VydmljZS5wYXRjaCh7cHJlZnM6IHRoaXMucHJlZnN9KTtcbiAgICB9XG5cbn0iXX0=