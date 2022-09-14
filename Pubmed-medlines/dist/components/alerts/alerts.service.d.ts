import { InjectionToken, Type, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { UserSettingsWebService, AuditEvents, AuditEvent } from "@sinequa/core/web-services";
import { ModalService } from "@sinequa/core/modal";
import { Query } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare namespace Alert {
    enum Frequency {
        Daily = 0,
        Hourly = 1,
        Immediate = 2,
        Weekly = 3,
        Monthly = 4
    }
    enum Days {
        None = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 4,
        Thursday = 8,
        Friday = 16,
        Saturday = 32,
        Sunday = 64,
        AllDays = 127,
        WeekDays = 31
    }
}
export interface Alert {
    name: string;
    description?: string;
    query: Query;
    timezone: string;
    timezoneOffset?: string;
    frequency: Alert.Frequency;
    days: Alert.Days;
    interval: number;
    index: number;
    times: string;
    active: boolean;
    combine: boolean;
    respectTabSelection: boolean;
    appQueryUrl?: string;
}
export declare const enum AlertEventType {
    Loaded = "Alert_Loaded",
    Patched = "Alert_Patched",
    Add = "Alert_Add",
    Delete = "Alert_Delete",
    DeleteAll = "Alert_DeleteAll",
    Update = "Alert_Update",
    Search_AlertQuery = "Search_AlertQuery"
}
export declare const ALERT_CHANGE_EVENTS: AlertEventType[];
export interface AlertChangeEvent {
    type: AlertEventType;
    alert?: Alert;
}
export interface ManageAlertsModel {
    alerts: Alert[];
    auditEvents?: AuditEvent[];
    searchRoute?: string;
}
/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
 *  public static forRoot(): ModuleWithProviders<AlertsModule> {
        return {
            ngModule: AlertsModule,
            providers: [
                {
                    provide: ALERT_COMPONENTS,
                    useValue: {
                        editAlertModal: EditAlert,
                        manageAlertsModal: ManageAlerts
                    }
                },
                AlertsService
            ]
        };
    }
 *
 */
export interface AlertComponents {
    editAlertModal: Type<any>;
    manageAlertsModal: Type<any>;
}
export declare const ALERT_COMPONENTS: InjectionToken<AlertComponents>;
export declare const WINDOW: InjectionToken<unknown>;
export declare class AlertsService implements OnDestroy {
    userSettingsService: UserSettingsWebService;
    searchService: SearchService;
    modalService: ModalService;
    alertComponents: AlertComponents;
    private window;
    private readonly _events;
    private readonly _changes;
    constructor(userSettingsService: UserSettingsWebService, searchService: SearchService, modalService: ModalService, alertComponents: AlertComponents, window: Window);
    /**
     * Returns the list of this user's alerts.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of alerts if it does not already exist.
     */
    get alerts(): Alert[];
    /**
     * Triggers any event among AlertChangeEvent
     * (use for fine-grained control of alerts workflow)
     */
    get events(): Subject<AlertChangeEvent>;
    /**
     * Triggers when events affect the list of alerts
     * (use to refresh alert menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes(): Subject<AlertChangeEvent>;
    /**
     * @returns true if there is at least one alert
     */
    get hasAlert(): boolean;
    /**
     * @returns an alert with the given name or undefined if it does not exist
     * @param name
     */
    alert(name: string): Alert | undefined;
    private alertIndex;
    /**
     * Creates a new alert unless it already exists.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert the alert to create
     * @returns true if alert was created
     */
    createAlert(alert: Alert): boolean;
    /**
     * Update the alert at the given index, unless an alert with the same name
     * already exists in the list of alerts.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert the alert to update
     * @param index the index at which to update the alert
     * @returns true if alert was updated
     */
    updateAlert(alert: Alert, index: number): boolean;
    /**
     * Updates the full list of alerts.
     * Emits an Alert event.
     * Update the data on the server.
     * @param alerts the new list of alerts
     * @param auditEvents the list of audit events to log
     */
    updateAlerts(alerts: Alert[], auditEvents?: AuditEvents): boolean;
    /**
     * Deletes the given alert (based on its name)
     * Emits an Alert event.
     * Update the data on the server.
     * @param alert
     * @returns true if alert was deleted
     */
    deleteAlert(alert: Alert): boolean;
    /**
     * Sets this alert to the current search context, using the search service
     */
    setAlertToCurrentQuery(alert: Alert): void;
    /**
     * Updates Alerts in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchAlerts;
    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this alert.
     * @param alert
     * @returns the search service promise
     */
    searchAlert(alert: Alert, path?: string): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to create a new alert.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the alert was created.
     */
    createAlertModal(): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to edit an existing alert.
     * @param alert: The alert to edit
     * @param noUpdate: if true, will not update the server after the edit
     * @param searchRoute: the route to use when replaying the alert's query
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the alert was updated.
     */
    editAlertModal(alert: Alert, noUpdate?: boolean, searchRoute?: string): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of alerts.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    manageAlertsModal(searchRoute?: string): Promise<boolean>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<AlertsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AlertsService>;
}
//# sourceMappingURL=alerts.service.d.ts.map