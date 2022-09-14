import { Injectable, InjectionToken, Inject } from "@angular/core";
import { Subject } from "rxjs";
import { Query } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/core/modal";
// From core/models/usersettings
export var Alert;
(function (Alert) {
    let Frequency;
    (function (Frequency) {
        Frequency[Frequency["Daily"] = 0] = "Daily";
        Frequency[Frequency["Hourly"] = 1] = "Hourly";
        Frequency[Frequency["Immediate"] = 2] = "Immediate";
        Frequency[Frequency["Weekly"] = 3] = "Weekly";
        Frequency[Frequency["Monthly"] = 4] = "Monthly";
    })(Frequency = Alert.Frequency || (Alert.Frequency = {}));
    let Days;
    (function (Days) {
        Days[Days["None"] = 0] = "None";
        Days[Days["Monday"] = 1] = "Monday";
        Days[Days["Tuesday"] = 2] = "Tuesday";
        Days[Days["Wednesday"] = 4] = "Wednesday";
        Days[Days["Thursday"] = 8] = "Thursday";
        Days[Days["Friday"] = 16] = "Friday";
        Days[Days["Saturday"] = 32] = "Saturday";
        Days[Days["Sunday"] = 64] = "Sunday";
        Days[Days["AllDays"] = 127] = "AllDays";
        Days[Days["WeekDays"] = 31] = "WeekDays";
    })(Days = Alert.Days || (Alert.Days = {}));
})(Alert || (Alert = {}));
// Types of events triggering a change event
export const ALERT_CHANGE_EVENTS = [
    "Alert_Loaded" /* Loaded */,
    "Alert_Add" /* Add */,
    "Alert_Delete" /* Delete */,
    "Alert_Update" /* Update */
];
export const ALERT_COMPONENTS = new InjectionToken('ALERT_COMPONENTS');
export const WINDOW = new InjectionToken('WindowToken');
export class AlertsService {
    constructor(userSettingsService, searchService, modalService, alertComponents, window) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.alertComponents = alertComponents;
        this.window = window;
        this._events = new Subject();
        this._changes = new Subject();
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this.events.next({ type: "Alert_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (ALERT_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
    }
    // GETTERS
    /**
     * Returns the list of this user's alerts.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of alerts if it does not already exist.
     */
    get alerts() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["alerts"])
            this.userSettingsService.userSettings["alerts"] = [];
        return this.userSettingsService.userSettings["alerts"];
    } // TODO: remove cast when UserSettings is updated
    /**
     * Triggers any event among AlertChangeEvent
     * (use for fine-grained control of alerts workflow)
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of alerts
     * (use to refresh alert menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    /**
     * @returns true if there is at least one alert
     */
    get hasAlert() {
        return this.alerts.length > 0;
    }
    /**
     * @returns an alert with the given name or undefined if it does not exist
     * @param name
     */
    alert(name) {
        const i = this.alertIndex(name);
        return i >= 0 ? this.alerts[i] : undefined;
    }
    alertIndex(name) {
        for (let i = 0, ic = this.alerts.length; i < ic; i++) {
            const alert = this.alerts[i];
            if (alert && alert.name === name) {
                return i;
            }
        }
        return -1;
    }
    // CRUD
    /**
     * Creates a new alert unless it already exists.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert the alert to create
     * @returns true if alert was created
     */
    createAlert(alert) {
        if (this.alertIndex(alert.name) >= 0)
            return false; // This alert already exists
        this.alerts.unshift(alert);
        this.events.next({ type: "Alert_Add" /* Add */, alert: alert });
        this.patchAlerts([{
                type: "Alert_Add" /* Add */,
                detail: {
                    alert: alert.name
                }
            }]);
        return true;
    }
    /**
     * Update the alert at the given index, unless an alert with the same name
     * already exists in the list of alerts.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert the alert to update
     * @param index the index at which to update the alert
     * @returns true if alert was updated
     */
    updateAlert(alert, index) {
        const prevIndex = this.alertIndex(alert.name);
        if (prevIndex !== -1 && index !== prevIndex)
            return false; // An alert with the same name exists at a different index
        if (index >= 0 && index < this.alerts.length) {
            this.alerts.splice(index, 1, alert);
            this.events.next({ type: "Alert_Update" /* Update */, alert: alert });
            this.patchAlerts([
                {
                    type: "Alert_Update" /* Update */,
                    detail: {
                        alert: alert.name
                    }
                }
            ]);
            return true;
        }
        return false; // This alert does not exist
    }
    /**
     * Updates the full list of alerts.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alerts the new list of alerts
     * @param auditEvents the list of audit events to log
     */
    updateAlerts(alerts, auditEvents) {
        Utils.arraySet(this.alerts, alerts);
        this.events.next({ type: "Alert_Update" /* Update */ });
        this.patchAlerts(auditEvents);
        return true;
    }
    /**
     * Deletes the given alert (based on its name)
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert
     * @returns true if alert was deleted
     */
    deleteAlert(alert) {
        const index = this.alertIndex(alert.name);
        if (index === -1)
            return false; // Nothing to delete
        this.alerts.splice(index, 1);
        this.events.next({ type: "Alert_Delete" /* Delete */, alert: alert });
        this.patchAlerts([
            {
                type: "Alert_Delete" /* Delete */,
                detail: {
                    alert: alert.name
                }
            }
        ]);
        return true;
    }
    /**
     * Sets this alert to the current search context, using the search service
     */
    setAlertToCurrentQuery(alert) {
        alert.query = Query.copy(this.searchService.query);
    }
    /**
     * Updates Alerts in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchAlerts(auditEvents) {
        return this.userSettingsService.patch({ alerts: this.alerts }, auditEvents)
            .subscribe(next => {
            this.events.next({ type: "Alert_Patched" /* Patched */ });
        }, error => {
            console.error("Could not patch Alerts!", error);
        });
    }
    // EVENT HANDLERS (Menus)
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this alert.
     * @param alert
     * @returns the search service promise
     */
    searchAlert(alert, path) {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(alert.query)));
        this.events.next({ type: "Search_AlertQuery" /* Search_AlertQuery */, alert: alert });
        return this.searchService.search({ path: path }, {
            type: "Search_AlertQuery" /* Search_AlertQuery */,
            detail: {
                alert: alert.name
            }
        });
    }
    /**
     * Opens a dialog allowing a user to create a new alert.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the alert was created.
     */
    createAlertModal() {
        const alert = {
            name: "",
            description: "",
            timezone: this.userSettingsService.timezone,
            query: Query.copy(this.searchService.query),
            frequency: Alert.Frequency.Daily,
            days: Alert.Days.WeekDays,
            interval: 1,
            index: 1,
            times: "9:00",
            active: true,
            combine: true,
            respectTabSelection: false
        };
        const queryUrl = this.window.location.href;
        return this.modalService.open(this.alertComponents.editAlertModal, { model: { alert: alert } })
            .then((result) => {
            if (result === -1 /* OK */) {
                const index = this.alertIndex(alert.name);
                if (index !== -1) {
                    return this.modalService.yesNo("msg#alerts.alertAlreadyExists")
                        .then((result) => {
                        if (result === -3 /* Yes */) {
                            alert.appQueryUrl = queryUrl;
                            return this.updateAlert(alert, index);
                        }
                        return false;
                    });
                }
                else {
                    alert.appQueryUrl = queryUrl;
                    return this.createAlert(alert);
                }
            }
            return false;
        });
    }
    /**
     * Opens a dialog allowing a user to edit an existing alert.
     * @param alert: The alert to edit
     * @param noUpdate: if true, will not update the server after the edit
     * @param searchRoute: the route to use when replaying the alert's query
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the alert was updated.
     */
    editAlertModal(alert, noUpdate, searchRoute) {
        const prevName = alert.name;
        const queryUrl = this.window.location.href;
        return this.modalService.open(this.alertComponents.editAlertModal, { model: { alert: alert, searchRoute: searchRoute } })
            .then((result) => {
            if (result === -1 /* OK */) {
                if (noUpdate)
                    return true;
                const prevIndex = this.alertIndex(prevName);
                if (prevIndex === -1)
                    return false; // this alert did not exist
                const index = this.alertIndex(alert.name);
                if (index !== -1 && index !== prevIndex) { // An alert with the same (new) name exists
                    return this.modalService.yesNo("msg#alerts.alertAlreadyExists")
                        .then((result) => {
                        if (result === -3 /* Yes */) {
                            const prevAlert = this.alert(prevName);
                            if (prevAlert) {
                                this.deleteAlert(prevAlert); // Remove the alert with old name
                            }
                            alert.appQueryUrl = queryUrl;
                            return this.updateAlert(alert, this.alertIndex(alert.name)); // Update the alert with new name (index might have changed due to delete of old name)
                        }
                        return false;
                    });
                }
                else {
                    alert.appQueryUrl = queryUrl;
                    return this.updateAlert(alert, prevIndex); // Update this alert
                }
            }
            return false;
        });
    }
    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of alerts.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    manageAlertsModal(searchRoute) {
        const model = { alerts: Utils.copy(this.alerts), searchRoute: searchRoute };
        return this.modalService.open(this.alertComponents.manageAlertsModal, { model })
            .then((result) => {
            if (result === -1 /* OK */) {
                return this.updateAlerts(model.alerts, model.auditEvents);
            }
            return false;
        });
    }
    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
AlertsService.ɵfac = function AlertsService_Factory(t) { return new (t || AlertsService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.ModalService), i0.ɵɵinject(ALERT_COMPONENTS), i0.ɵɵinject(WINDOW)); };
AlertsService.ɵprov = i0.ɵɵdefineInjectable({ token: AlertsService, factory: AlertsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AlertsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3.ModalService }, { type: undefined, decorators: [{
                type: Inject,
                args: [ALERT_COMPONENTS]
            }] }, { type: Window, decorators: [{
                type: Inject,
                args: [WINDOW]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hbGVydHMvIiwic291cmNlcyI6WyJhbGVydHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQWtCLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHN0IsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFHekMsZ0NBQWdDO0FBQ2hDLE1BQU0sS0FBVyxLQUFLLENBcUJyQjtBQXJCRCxXQUFpQixLQUFLO0lBQ2xCLElBQVksU0FNWDtJQU5ELFdBQVksU0FBUztRQUNqQiwyQ0FBSyxDQUFBO1FBQ0wsNkNBQU0sQ0FBQTtRQUNOLG1EQUFTLENBQUE7UUFDVCw2Q0FBTSxDQUFBO1FBQ04sK0NBQU8sQ0FBQTtJQUNYLENBQUMsRUFOVyxTQUFTLEdBQVQsZUFBUyxLQUFULGVBQVMsUUFNcEI7SUFFRCxJQUFZLElBV1g7SUFYRCxXQUFZLElBQUk7UUFDWiwrQkFBVyxDQUFBO1FBQ1gsbUNBQWEsQ0FBQTtRQUNiLHFDQUFjLENBQUE7UUFDZCx5Q0FBZ0IsQ0FBQTtRQUNoQix1Q0FBZSxDQUFBO1FBQ2Ysb0NBQWEsQ0FBQTtRQUNiLHdDQUFlLENBQUE7UUFDZixvQ0FBYSxDQUFBO1FBQ2IsdUNBQWdGLENBQUE7UUFDaEYsd0NBQTZELENBQUE7SUFDakUsQ0FBQyxFQVhXLElBQUksR0FBSixVQUFJLEtBQUosVUFBSSxRQVdmO0FBQ0wsQ0FBQyxFQXJCZ0IsS0FBSyxLQUFMLEtBQUssUUFxQnJCO0FBZ0NELDRDQUE0QztBQUM1QyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRzs7Ozs7Q0FLbEMsQ0FBQztB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QUVoRyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxLQUFLLEVBQUMsQ0FBQzthQUN6RSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNiLElBQUksTUFBTSxnQkFBbUIsRUFBRTtnQkFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDOzswRUE5VlEsYUFBYSxtSEFTVixnQkFBZ0IsZUFDaEIsTUFBTTtxREFWVCxhQUFhLFdBQWIsYUFBYSxtQkFGVixNQUFNO2tEQUVULGFBQWE7Y0FIekIsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOztzQkFVUSxNQUFNO3VCQUFDLGdCQUFnQjswQkFDUyxNQUFNO3NCQUF0QyxNQUFNO3VCQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIEluamVjdGlvblRva2VuLCBJbmplY3QsIFR5cGUsIE9uRGVzdHJveX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7U3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXNlclNldHRpbmdzV2ViU2VydmljZSwgQXVkaXRFdmVudHMsIEF1ZGl0RXZlbnR9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtNb2RhbFNlcnZpY2UsIE1vZGFsUmVzdWx0fSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtRdWVyeX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuXG4vLyBGcm9tIGNvcmUvbW9kZWxzL3VzZXJzZXR0aW5nc1xuZXhwb3J0IG5hbWVzcGFjZSBBbGVydCB7XG4gICAgZXhwb3J0IGVudW0gRnJlcXVlbmN5IHtcbiAgICAgICAgRGFpbHksXG4gICAgICAgIEhvdXJseSxcbiAgICAgICAgSW1tZWRpYXRlLFxuICAgICAgICBXZWVrbHksXG4gICAgICAgIE1vbnRobHlcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBEYXlzIHtcbiAgICAgICAgTm9uZSA9IDB4MDAsXG4gICAgICAgIE1vbmRheSA9IDB4MDEsXG4gICAgICAgIFR1ZXNkYXkgPSAweDAyLFxuICAgICAgICBXZWRuZXNkYXkgPSAweDA0LFxuICAgICAgICBUaHVyc2RheSA9IDB4MDgsXG4gICAgICAgIEZyaWRheSA9IDB4MTAsXG4gICAgICAgIFNhdHVyZGF5ID0gMHgyMCxcbiAgICAgICAgU3VuZGF5ID0gMHg0MCxcbiAgICAgICAgQWxsRGF5cyA9IChNb25kYXkgfCBUdWVzZGF5IHwgV2VkbmVzZGF5IHwgVGh1cnNkYXkgfCBGcmlkYXkgfCBTYXR1cmRheSB8IFN1bmRheSksXG4gICAgICAgIFdlZWtEYXlzID0gKE1vbmRheSB8IFR1ZXNkYXkgfCBXZWRuZXNkYXkgfCBUaHVyc2RheSB8IEZyaWRheSlcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxlcnQge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBxdWVyeTogUXVlcnk7XG4gICAgdGltZXpvbmU6IHN0cmluZztcbiAgICB0aW1lem9uZU9mZnNldD86IHN0cmluZztcbiAgICBmcmVxdWVuY3k6IEFsZXJ0LkZyZXF1ZW5jeTtcbiAgICBkYXlzOiBBbGVydC5EYXlzO1xuICAgIGludGVydmFsOiBudW1iZXI7IC8vIGV2ZXJ5IFwiblwiLi4uXG4gICAgaW5kZXg6IG51bWJlcjsgLy8gZGF5IG9mIG1vbnRoXG4gICAgdGltZXM6IHN0cmluZzsgLy90aW1lczogbnVtYmVyW107IC8vIG9mZnNldHMgZnJvbSAwMDowMCBpbiBtaWxsaXNlY29uZHNcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgY29tYmluZTogYm9vbGVhbjtcbiAgICByZXNwZWN0VGFiU2VsZWN0aW9uOiBib29sZWFuO1xuICAgIGFwcFF1ZXJ5VXJsPzogc3RyaW5nOyAvLyB0aGUgVVJMIHJlZmVyZW5jZSB0aGUgcXVlcnkgb2YgdGhlIEFsZXJ0IGluIHRoZSBTQkEuXG59XG5cbi8vIGZyb20gY29yZS9tb2RlbHMvYXVkaXRcbmV4cG9ydCBjb25zdCBlbnVtIEFsZXJ0RXZlbnRUeXBlIHtcbiAgICBMb2FkZWQgPSBcIkFsZXJ0X0xvYWRlZFwiLFxuICAgIFBhdGNoZWQgPSBcIkFsZXJ0X1BhdGNoZWRcIixcblxuICAgIEFkZCA9IFwiQWxlcnRfQWRkXCIsXG4gICAgRGVsZXRlID0gXCJBbGVydF9EZWxldGVcIixcbiAgICBEZWxldGVBbGwgPSBcIkFsZXJ0X0RlbGV0ZUFsbFwiLFxuICAgIFVwZGF0ZSA9IFwiQWxlcnRfVXBkYXRlXCIsXG5cbiAgICBTZWFyY2hfQWxlcnRRdWVyeSA9IFwiU2VhcmNoX0FsZXJ0UXVlcnlcIixcbn1cblxuLy8gVHlwZXMgb2YgZXZlbnRzIHRyaWdnZXJpbmcgYSBjaGFuZ2UgZXZlbnRcbmV4cG9ydCBjb25zdCBBTEVSVF9DSEFOR0VfRVZFTlRTID0gW1xuICAgIEFsZXJ0RXZlbnRUeXBlLkxvYWRlZCxcbiAgICBBbGVydEV2ZW50VHlwZS5BZGQsXG4gICAgQWxlcnRFdmVudFR5cGUuRGVsZXRlLFxuICAgIEFsZXJ0RXZlbnRUeXBlLlVwZGF0ZVxuXTtcblxuXG4vLyBDUlVEIEV2ZW50c1xuZXhwb3J0IGludGVyZmFjZSBBbGVydENoYW5nZUV2ZW50IHtcbiAgICB0eXBlOiBBbGVydEV2ZW50VHlwZTtcbiAgICBhbGVydD86IEFsZXJ0O1xufVxuXG5cbi8vIE1vZGVsIGV4cGVjdGVkIGJ5IHRoZSBNYW5hZ2VBbGVydHMgTW9kYWwuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmFnZUFsZXJ0c01vZGVsIHtcbiAgICBhbGVydHM6IEFsZXJ0W107XG4gICAgYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50W107XG4gICAgc2VhcmNoUm91dGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogVGhlIG1vZGFsIHR5cGVzIGFyZSB1bmtub3duIHRvIHRoaXMgc2VydmljZS5cbiAqIFRoZSBtb2R1bGUgdXNpbmcgdGhpcyBzZXJ2aWNlIG11c3QgcHJvdmlkZSB0aGVzZSBjb21wb25lbnRzXG4gKiBpbiB0aGVpciBmb3JSb290KCkgbWV0aG9kXG4gKlxuICogRXhhbXBsZSBiZWxvdzpcbiAqXG4gKiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWxlcnRzTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQWxlcnRzTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBBTEVSVF9DT01QT05FTlRTLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdEFsZXJ0TW9kYWw6IEVkaXRBbGVydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZUFsZXJ0c01vZGFsOiBNYW5hZ2VBbGVydHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgQWxlcnRzU2VydmljZVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWxlcnRDb21wb25lbnRzIHtcbiAgICBlZGl0QWxlcnRNb2RhbDogVHlwZTxhbnk+O1xuICAgIG1hbmFnZUFsZXJ0c01vZGFsOiBUeXBlPGFueT47XG59XG5leHBvcnQgY29uc3QgQUxFUlRfQ09NUE9ORU5UUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBbGVydENvbXBvbmVudHM+KCdBTEVSVF9DT01QT05FTlRTJyk7XG5leHBvcnQgY29uc3QgV0lORE9XID0gbmV3IEluamVjdGlvblRva2VuKCdXaW5kb3dUb2tlbicpO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbGVydHNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PEFsZXJ0Q2hhbmdlRXZlbnQ+KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2hhbmdlcyA9IG5ldyBTdWJqZWN0PEFsZXJ0Q2hhbmdlRXZlbnQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHVzZXJTZXR0aW5nc1NlcnZpY2U6IFVzZXJTZXR0aW5nc1dlYlNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgbW9kYWxTZXJ2aWNlOiBNb2RhbFNlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoQUxFUlRfQ09NUE9ORU5UUykgcHVibGljIGFsZXJ0Q29tcG9uZW50czogQWxlcnRDb21wb25lbnRzLFxuICAgICAgICBASW5qZWN0KFdJTkRPVykgcHJpdmF0ZSB3aW5kb3cgOiBXaW5kb3dcbiAgICApe1xuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIHVzZXIgc2V0dGluZ3NcbiAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gRS5nLiBuZXcgbG9naW4gb2NjdXJzXG4gICAgICAgICAgICAvLyA9PT4gTWVudXMgbmVlZCB0byBiZSByZWJ1aWx0XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBBbGVydEV2ZW50VHlwZS5Mb2FkZWR9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIExpc3RlbiB0byBvd24gZXZlbnRzLCB0byB0cmlnZ2VyIGNoYW5nZSBldmVudHNcbiAgICAgICAgdGhpcy5fZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZihBTEVSVF9DSEFOR0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEdFVFRFUlNcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3Qgb2YgdGhpcyB1c2VyJ3MgYWxlcnRzLlxuICAgICAqIFRoZSBsaXN0IGlzIHN0b3JlZCBpbiB0aGUgdXNlciBzZXR0aW5ncyAodGhpcyBpcyBhIHJlZGlyZWN0aW9uKS5cbiAgICAgKiBVc2luZyB0aGlzIHNlcnZpY2UgY3JlYXRlcyB0aGUgbGlzdCBvZiBhbGVydHMgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGFsZXJ0cygpIDogQWxlcnRbXXtcbiAgICAgICAgaWYoIXRoaXMudXNlclNldHRpbmdzU2VydmljZS51c2VyU2V0dGluZ3MpXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzID0ge307XG4gICAgICAgIGlmKCF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wiYWxlcnRzXCJdKVxuICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcImFsZXJ0c1wiXSA9IFtdO1xuICAgICAgICByZXR1cm4gPEFsZXJ0W10+ICg8dW5rbm93bj50aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wiYWxlcnRzXCJdKTtcbiAgICB9IC8vIFRPRE86IHJlbW92ZSBjYXN0IHdoZW4gVXNlclNldHRpbmdzIGlzIHVwZGF0ZWRcblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIGFueSBldmVudCBhbW9uZyBBbGVydENoYW5nZUV2ZW50XG4gICAgICogKHVzZSBmb3IgZmluZS1ncmFpbmVkIGNvbnRyb2wgb2YgYWxlcnRzIHdvcmtmbG93KVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZXZlbnRzKCkgOiBTdWJqZWN0PEFsZXJ0Q2hhbmdlRXZlbnQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VycyB3aGVuIGV2ZW50cyBhZmZlY3QgdGhlIGxpc3Qgb2YgYWxlcnRzXG4gICAgICogKHVzZSB0byByZWZyZXNoIGFsZXJ0IG1lbnVzKVxuICAgICAqIENmLiBDSEFOR0VfRVZFTlRTIGxpc3RcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGNoYW5nZXMoKSA6IFN1YmplY3Q8QWxlcnRDaGFuZ2VFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGF0IGxlYXN0IG9uZSBhbGVydFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaGFzQWxlcnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFsZXJ0cy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIGFuIGFsZXJ0IHdpdGggdGhlIGdpdmVuIG5hbWUgb3IgdW5kZWZpbmVkIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYWxlcnQobmFtZTogc3RyaW5nKTogQWxlcnQgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBpID0gdGhpcy5hbGVydEluZGV4KG5hbWUpO1xuICAgICAgICByZXR1cm4gaT49IDA/IHRoaXMuYWxlcnRzW2ldIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWxlcnRJbmRleChuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSB0aGlzLmFsZXJ0cy5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhbGVydCA9IHRoaXMuYWxlcnRzW2ldO1xuICAgICAgICAgICAgaWYgKGFsZXJ0ICYmIGFsZXJ0Lm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG5cbiAgICAvLyBDUlVEXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGFsZXJ0IHVubGVzcyBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKiBFbWl0cyBhbiBBbGVydCBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gYWxlcnQgdGhlIGFsZXJ0IHRvIGNyZWF0ZVxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgYWxlcnQgd2FzIGNyZWF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQWxlcnQoYWxlcnQ6IEFsZXJ0KSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmKHRoaXMuYWxlcnRJbmRleChhbGVydC5uYW1lKSA+PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBUaGlzIGFsZXJ0IGFscmVhZHkgZXhpc3RzXG5cbiAgICAgICAgdGhpcy5hbGVydHMudW5zaGlmdChhbGVydCk7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoe3R5cGUgOiBBbGVydEV2ZW50VHlwZS5BZGQsIGFsZXJ0OiBhbGVydH0pO1xuICAgICAgICB0aGlzLnBhdGNoQWxlcnRzKFt7XG4gICAgICAgICAgICB0eXBlOiBBbGVydEV2ZW50VHlwZS5BZGQsXG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBhbGVydDogYWxlcnQubmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYWxlcnQgYXQgdGhlIGdpdmVuIGluZGV4LCB1bmxlc3MgYW4gYWxlcnQgd2l0aCB0aGUgc2FtZSBuYW1lXG4gICAgICogYWxyZWFkeSBleGlzdHMgaW4gdGhlIGxpc3Qgb2YgYWxlcnRzLlxuICAgICAqIEVtaXRzIGFuIEFsZXJ0IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBhbGVydCB0aGUgYWxlcnQgdG8gdXBkYXRlXG4gICAgICogQHBhcmFtIGluZGV4IHRoZSBpbmRleCBhdCB3aGljaCB0byB1cGRhdGUgdGhlIGFsZXJ0XG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBhbGVydCB3YXMgdXBkYXRlZFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVBbGVydChhbGVydDogQWxlcnQsIGluZGV4IDogbnVtYmVyKSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuYWxlcnRJbmRleChhbGVydC5uYW1lKTtcbiAgICAgICAgaWYocHJldkluZGV4ICE9PSAtMSAmJiBpbmRleCAhPT0gcHJldkluZGV4KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBBbiBhbGVydCB3aXRoIHRoZSBzYW1lIG5hbWUgZXhpc3RzIGF0IGEgZGlmZmVyZW50IGluZGV4XG5cbiAgICAgICAgaWYoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuYWxlcnRzLmxlbmd0aCl7XG5cbiAgICAgICAgICAgIHRoaXMuYWxlcnRzLnNwbGljZShpbmRleCwgMSwgYWxlcnQpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IEFsZXJ0RXZlbnRUeXBlLlVwZGF0ZSwgYWxlcnQ6IGFsZXJ0fSk7XG4gICAgICAgICAgICB0aGlzLnBhdGNoQWxlcnRzKFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEFsZXJ0RXZlbnRUeXBlLlVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydDogYWxlcnQubmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTsgICAvLyBUaGlzIGFsZXJ0IGRvZXMgbm90IGV4aXN0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZnVsbCBsaXN0IG9mIGFsZXJ0cy5cbiAgICAgKiBFbWl0cyBhbiBBbGVydCBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gYWxlcnRzIHRoZSBuZXcgbGlzdCBvZiBhbGVydHNcbiAgICAgKiBAcGFyYW0gYXVkaXRFdmVudHMgdGhlIGxpc3Qgb2YgYXVkaXQgZXZlbnRzIHRvIGxvZ1xuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVBbGVydHMoYWxlcnRzIDogQWxlcnRbXSwgYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cykgOiBib29sZWFuIHtcbiAgICAgICAgVXRpbHMuYXJyYXlTZXQodGhpcy5hbGVydHMsIGFsZXJ0cyk7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoe3R5cGUgOiBBbGVydEV2ZW50VHlwZS5VcGRhdGV9KTtcbiAgICAgICAgdGhpcy5wYXRjaEFsZXJ0cyhhdWRpdEV2ZW50cyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgdGhlIGdpdmVuIGFsZXJ0IChiYXNlZCBvbiBpdHMgbmFtZSlcbiAgICAgKiBFbWl0cyBhbiBBbGVydCBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gYWxlcnRcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIGFsZXJ0IHdhcyBkZWxldGVkXG4gICAgICovXG4gICAgcHVibGljIGRlbGV0ZUFsZXJ0KGFsZXJ0OiBBbGVydCkgOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYWxlcnRJbmRleChhbGVydC5uYW1lKTtcblxuICAgICAgICBpZihpbmRleCA9PT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIE5vdGhpbmcgdG8gZGVsZXRlXG5cbiAgICAgICAgdGhpcy5hbGVydHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dCh7dHlwZSA6IEFsZXJ0RXZlbnRUeXBlLkRlbGV0ZSwgYWxlcnQ6IGFsZXJ0fSk7XG4gICAgICAgIHRoaXMucGF0Y2hBbGVydHMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IEFsZXJ0RXZlbnRUeXBlLkRlbGV0ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQ6IGFsZXJ0Lm5hbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoaXMgYWxlcnQgdG8gdGhlIGN1cnJlbnQgc2VhcmNoIGNvbnRleHQsIHVzaW5nIHRoZSBzZWFyY2ggc2VydmljZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRBbGVydFRvQ3VycmVudFF1ZXJ5KGFsZXJ0OiBBbGVydCl7XG4gICAgICAgIGFsZXJ0LnF1ZXJ5ID0gUXVlcnkuY29weSh0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgQWxlcnRzIGluIFVzZXIgc2V0dGluZ3MuXG4gICAgICogQHBhcmFtIGF1ZGl0RXZlbnRzIDogQXVkaXQgRXZlbnRzIHRvIGJlIHRyaWdnZXJlZFxuICAgICAqIEByZXR1cm5zIGFuIE9ic2VydmFibGUgd2hpY2ggY2FuIGJlIHVzZWQgdG8gdHJpZ2dlciBmdXJ0aGVyIGV2ZW50c1xuICAgICAqL1xuICAgIHByaXZhdGUgcGF0Y2hBbGVydHMoYXVkaXRFdmVudHM/OiBBdWRpdEV2ZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnBhdGNoKHthbGVydHM6IHRoaXMuYWxlcnRzfSwgYXVkaXRFdmVudHMpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBBbGVydEV2ZW50VHlwZS5QYXRjaGVkfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgcGF0Y2ggQWxlcnRzIVwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cblxuXG5cbiAgICAvLyBFVkVOVCBIQU5ETEVSUyAoTWVudXMpXG5cbiAgICAvKipcbiAgICAgKiBVc2VzIHRoZSBTZWFyY2hTZXJ2aWNlIHRvIHBlcmZvcm0gYSBzZWFyY2ggcmV0dXJuaW5nIGFsbFxuICAgICAqIHRoZSBkb2N1bWVudHMgbWF0Y2hpbmcgdGhpcyBhbGVydC5cbiAgICAgKiBAcGFyYW0gYWxlcnRcbiAgICAgKiBAcmV0dXJucyB0aGUgc2VhcmNoIHNlcnZpY2UgcHJvbWlzZVxuICAgICAqL1xuICAgIHB1YmxpYyBzZWFyY2hBbGVydChhbGVydDogQWxlcnQsIHBhdGg/OiBzdHJpbmcpIDogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZXRRdWVyeShVdGlscy5leHRlbmQodGhpcy5zZWFyY2hTZXJ2aWNlLm1ha2VRdWVyeSgpLCBVdGlscy5jb3B5KGFsZXJ0LnF1ZXJ5KSkpO1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KHt0eXBlOiBBbGVydEV2ZW50VHlwZS5TZWFyY2hfQWxlcnRRdWVyeSwgYWxlcnQ6IGFsZXJ0fSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKCB7cGF0aDogcGF0aH0sIHtcbiAgICAgICAgICAgIHR5cGU6IEFsZXJ0RXZlbnRUeXBlLlNlYXJjaF9BbGVydFF1ZXJ5LFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgYWxlcnQ6IGFsZXJ0Lm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYSBkaWFsb2cgYWxsb3dpbmcgYSB1c2VyIHRvIGNyZWF0ZSBhIG5ldyBhbGVydC5cbiAgICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgZGlhbG9nXG4gICAgICogdGhlIHJlc3VsdCBpcyB0cnVlIGlmIHRoZSBhbGVydCB3YXMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQWxlcnRNb2RhbCgpIDogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGNvbnN0IGFsZXJ0OiBBbGVydCA9IHtcbiAgICAgICAgICAgIG5hbWU6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHRpbWV6b25lOiB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudGltZXpvbmUsXG4gICAgICAgICAgICBxdWVyeTogUXVlcnkuY29weSh0aGlzLnNlYXJjaFNlcnZpY2UucXVlcnkpLFxuICAgICAgICAgICAgZnJlcXVlbmN5OiBBbGVydC5GcmVxdWVuY3kuRGFpbHksXG4gICAgICAgICAgICBkYXlzOiBBbGVydC5EYXlzLldlZWtEYXlzLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IDEsXG4gICAgICAgICAgICBpbmRleDogMSxcbiAgICAgICAgICAgIHRpbWVzOiBcIjk6MDBcIixcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbWJpbmU6IHRydWUsXG4gICAgICAgICAgICByZXNwZWN0VGFiU2VsZWN0aW9uOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBxdWVyeVVybCA9IHRoaXMud2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5vcGVuKHRoaXMuYWxlcnRDb21wb25lbnRzLmVkaXRBbGVydE1vZGFsLCB7bW9kZWw6IHsgYWxlcnQ6IGFsZXJ0IH19KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmFsZXJ0SW5kZXgoYWxlcnQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLnllc05vKFwibXNnI2FsZXJ0cy5hbGVydEFscmVhZHlFeGlzdHNcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Llllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQuYXBwUXVlcnlVcmwgPSBxdWVyeVVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUFsZXJ0KGFsZXJ0LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydC5hcHBRdWVyeVVybCA9IHF1ZXJ5VXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQWxlcnQoYWxlcnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgZGlhbG9nIGFsbG93aW5nIGEgdXNlciB0byBlZGl0IGFuIGV4aXN0aW5nIGFsZXJ0LlxuICAgICAqIEBwYXJhbSBhbGVydDogVGhlIGFsZXJ0IHRvIGVkaXRcbiAgICAgKiBAcGFyYW0gbm9VcGRhdGU6IGlmIHRydWUsIHdpbGwgbm90IHVwZGF0ZSB0aGUgc2VydmVyIGFmdGVyIHRoZSBlZGl0XG4gICAgICogQHBhcmFtIHNlYXJjaFJvdXRlOiB0aGUgcm91dGUgdG8gdXNlIHdoZW4gcmVwbGF5aW5nIHRoZSBhbGVydCdzIHF1ZXJ5XG4gICAgICogQHJldHVybnMgYSBib29sZWFuIHByb21pc2UgcmVzb2x2ZWQgd2hlbiB0aGUgdXNlciBjbG9zZXMgdGhlIGRpYWxvZ1xuICAgICAqIHRoZSByZXN1bHQgaXMgdHJ1ZSBpZiB0aGUgYWxlcnQgd2FzIHVwZGF0ZWQuXG4gICAgICovXG4gICAgcHVibGljIGVkaXRBbGVydE1vZGFsKGFsZXJ0OiBBbGVydCwgbm9VcGRhdGU/OiBib29sZWFuLCBzZWFyY2hSb3V0ZT86IHN0cmluZykgOiBQcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICBjb25zdCBwcmV2TmFtZSA9IGFsZXJ0Lm5hbWU7XG5cbiAgICAgICAgY29uc3QgcXVlcnlVcmwgPSB0aGlzLndpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLmFsZXJ0Q29tcG9uZW50cy5lZGl0QWxlcnRNb2RhbCwgIHttb2RlbDogeyBhbGVydDogYWxlcnQsIHNlYXJjaFJvdXRlOiBzZWFyY2hSb3V0ZSB9fSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobm9VcGRhdGUpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IHRoaXMuYWxlcnRJbmRleChwcmV2TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHByZXZJbmRleCA9PT0gLTEpIHJldHVybiBmYWxzZTsgLy8gdGhpcyBhbGVydCBkaWQgbm90IGV4aXN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmFsZXJ0SW5kZXgoYWxlcnQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgaW5kZXggIT09IHByZXZJbmRleCkgeyAgLy8gQW4gYWxlcnQgd2l0aCB0aGUgc2FtZSAobmV3KSBuYW1lIGV4aXN0c1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2UueWVzTm8oXCJtc2cjYWxlcnRzLmFsZXJ0QWxyZWFkeUV4aXN0c1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuWWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2QWxlcnQgPSB0aGlzLmFsZXJ0KHByZXZOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2QWxlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUFsZXJ0KHByZXZBbGVydCk7IC8vIFJlbW92ZSB0aGUgYWxlcnQgd2l0aCBvbGQgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQuYXBwUXVlcnlVcmwgPSBxdWVyeVVybDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUFsZXJ0KGFsZXJ0LCB0aGlzLmFsZXJ0SW5kZXgoYWxlcnQubmFtZSkpOyAvLyBVcGRhdGUgdGhlIGFsZXJ0IHdpdGggbmV3IG5hbWUgKGluZGV4IG1pZ2h0IGhhdmUgY2hhbmdlZCBkdWUgdG8gZGVsZXRlIG9mIG9sZCBuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydC5hcHBRdWVyeVVybCA9IHF1ZXJ5VXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlQWxlcnQoYWxlcnQsIHByZXZJbmRleCk7IC8vIFVwZGF0ZSB0aGlzIGFsZXJ0XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgZGlhbG9nIGFsbG93aW5nIGEgdXNlciB0byByZW9yZ2FuaXplIGFuZCBlZGl0IHRoZVxuICAgICAqIGxpc3Qgb2YgYWxlcnRzLlxuICAgICAqIEByZXR1cm5zIGEgYm9vbGVhbiBwcm9taXNlIHJlc29sdmVkIHdoZW4gdGhlIHVzZXIgY2xvc2VzIHRoZSBkaWFsb2dcbiAgICAgKiB0aGUgcmVzdWx0IGlzIHRydWUgaXMgdGhlIGxpc3Qgd2FzIHVwZGF0ZWQuXG4gICAgICovXG4gICAgcHVibGljIG1hbmFnZUFsZXJ0c01vZGFsKHNlYXJjaFJvdXRlPzogc3RyaW5nKSA6IFByb21pc2U8Ym9vbGVhbj4ge1xuXG4gICAgICAgIGNvbnN0IG1vZGVsOiBNYW5hZ2VBbGVydHNNb2RlbCA9ICB7IGFsZXJ0czogVXRpbHMuY29weSh0aGlzLmFsZXJ0cyksIHNlYXJjaFJvdXRlOiBzZWFyY2hSb3V0ZSB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5vcGVuKHRoaXMuYWxlcnRDb21wb25lbnRzLm1hbmFnZUFsZXJ0c01vZGFsLCB7bW9kZWx9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUFsZXJ0cyhtb2RlbC5hbGVydHMsIG1vZGVsLmF1ZGl0RXZlbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5ldmVudHMuY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIl19