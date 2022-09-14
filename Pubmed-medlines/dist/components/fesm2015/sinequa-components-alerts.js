import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate1, Component, Input, ɵɵpipe, ɵɵnextContext, ɵɵproperty, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵelement, ɵɵdirectiveInject, ɵɵtemplate, ɵɵpipeBind2, ɵɵpropertyInterpolate, ɵɵpureFunction1, ɵɵpureFunction4, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { ModalService, ModalButton, MODAL_MODEL, ModalRef } from '@sinequa/core/modal';
import { NgForOf, NgIf, KeyValuePipe, NgClass, CommonModule } from '@angular/common';
import { FormControl, Validators, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, SelectControlValueAccessor, CheckboxControlValueAccessor, NgSelectOption, ɵangular_packages_forms_forms_x, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { ValidationDirective, ValidationModule } from '@sinequa/core/validation';
import { Autofocus, UtilsModule } from '@sinequa/components/utils';
import { Action, BsActionItem, BsActionModule } from '@sinequa/components/action';
import { BsModal, BsModalModule, enModal, frModal, deModal } from '@sinequa/components/modal';
import { LoginService } from '@sinequa/core/login';

// From core/models/usersettings
var Alert;
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
const ALERT_CHANGE_EVENTS = [
    "Alert_Loaded" /* Loaded */,
    "Alert_Add" /* Add */,
    "Alert_Delete" /* Delete */,
    "Alert_Update" /* Update */
];
const ALERT_COMPONENTS = new InjectionToken('ALERT_COMPONENTS');
const WINDOW = new InjectionToken('WindowToken');
class AlertsService {
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
AlertsService.ɵfac = function AlertsService_Factory(t) { return new (t || AlertsService)(ɵɵinject(UserSettingsWebService), ɵɵinject(SearchService), ɵɵinject(ModalService), ɵɵinject(ALERT_COMPONENTS), ɵɵinject(WINDOW)); };
AlertsService.ɵprov = ɵɵdefineInjectable({ token: AlertsService, factory: AlertsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AlertsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: SearchService }, { type: ModalService }, { type: undefined, decorators: [{
                type: Inject,
                args: [ALERT_COMPONENTS]
            }] }, { type: Window, decorators: [{
                type: Inject,
                args: [WINDOW]
            }] }]; }, null); })();

class BsAlertMessageComponent {
}
BsAlertMessageComponent.ɵfac = function BsAlertMessageComponent_Factory(t) { return new (t || BsAlertMessageComponent)(); };
BsAlertMessageComponent.ɵcmp = ɵɵdefineComponent({ type: BsAlertMessageComponent, selectors: [["sq-alert-message"]], inputs: { message: "message" }, decls: 2, vars: 1, consts: [["role", "alert", 1, "alert", "alert-danger", "ml-3", "mr-3", "p-3", "text-center"]], template: function BsAlertMessageComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtext(1);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵtextInterpolate1(" ", ctx.message, "\n");
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAlertMessageComponent, [{
        type: Component,
        args: [{
                selector: 'sq-alert-message',
                templateUrl: './alert-message.component.html'
            }]
    }], null, { message: [{
            type: Input
        }] }); })();

function BsEditAlert_option_12_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "option", 18);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const frequencyValue_r4 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("value", frequencyValue_r4);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 2, ctx_r0.frequency[frequencyValue_r4]));
} }
function BsEditAlert_label_18_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "label", 13);
    ɵɵelementStart(1, "input", 19);
    ɵɵlistener("change", function BsEditAlert_label_18_Template_input_change_1_listener($event) { ɵɵrestoreView(_r7); const day_r5 = ctx.$implicit; const ctx_r6 = ɵɵnextContext(); return ctx_r6.dayChange($event, day_r5.value); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "span", 15);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const day_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("checked", ctx_r1.dayChecked(day_r5.value));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 2, "msg#editAlert." + day_r5.key));
} }
function BsEditAlert_label_31_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "label", 13);
    ɵɵelement(1, "input", 20);
    ɵɵelementStart(2, "span", 15);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, "msg#editAlert.updateQuery"));
} }
function BsEditAlert_sq_alert_message_32_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-alert-message", 21);
    ɵɵpipe(1, "sqMessage");
} if (rf & 2) {
    ɵɵproperty("message", ɵɵpipeBind1(1, 1, "msg#editAlert.lossDataMessage"));
} }
class BsEditAlert {
    constructor(model, formBuilder, searchService, alertsService, modalRef) {
        this.model = model;
        this.formBuilder = formBuilder;
        this.searchService = searchService;
        this.alertsService = alertsService;
        this.modalRef = modalRef;
        this.weekdays = {
            'monday': Alert.Days.Monday,
            'tuesday': Alert.Days.Tuesday,
            'wednesday': Alert.Days.Wednesday,
            'thursday': Alert.Days.Thursday,
            'friday': Alert.Days.Friday,
            'saturday': Alert.Days.Saturday,
            'sunday': Alert.Days.Sunday
        };
        this.showDirtyMessage = false;
        // Preserve original property order
        this.originalOrder = (a, b) => 0;
        this.frequencies = [
            Alert.Frequency.Daily,
            Alert.Frequency.Hourly,
            Alert.Frequency.Immediate,
        ];
        this.frequency = Alert.Frequency;
    }
    get alert() {
        return this.model.alert;
    }
    ngOnInit() {
        if (!this.alert.days) {
            this.alert.days = Alert.Days.None;
        }
        this.canUpdateQuery = (!!this.alertsService.alert(this.alert.name)) &&
            !!this.searchService.results && !!this.searchService.results.records;
        this.alertDaysControl = new FormControl(this.alert.days);
        this.alertNameControl = new FormControl(this.alert.name, Validators.required);
        this.alertFrequencyControl = new FormControl(this.alert.frequency);
        this.alertTimesControl = new FormControl(this.alert.times); // TODO validator
        this.alertActiveControl = new FormControl(this.alert.active);
        this.updateQueryControl = new FormControl(this.updateQuery);
        this.form = this.formBuilder.group({
            alertName: this.alertNameControl,
            alertFrequency: this.alertFrequencyControl,
            alertTimes: this.alertTimesControl,
            alertActive: this.alertActiveControl,
            updateQuery: this.updateQueryControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.alert.name = this.alertNameControl.value;
            this.alert.frequency = this.alertFrequencyControl.value;
            this.alert.times = this.alertTimesControl.value;
            this.alert.active = this.alertActiveControl.value;
            this.alert.days = this.alertDaysControl.value;
            this.updateQuery = this.updateQueryControl.value;
        });
        this.createButtons();
    }
    createButtons() {
        this.buttons = [
            new ModalButton({
                text: "msg#editAlert.runQuery",
                result: 0 /* Custom */,
                action: (button) => {
                    this.runQuery();
                    this.modalRef.close(-2 /* Cancel */); // dismiss the dialog too (?)
                },
                visible: !!this.alertsService.alert(this.alert.name)
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form,
                action: (button) => {
                    if (this.updateQuery) {
                        this.alertsService.setAlertToCurrentQuery(this.alert);
                    }
                }
            }),
            new ModalButton({
                result: -2 /* Cancel */,
                action: (button) => {
                    if (this.form.dirty) {
                        button.result = 0 /* Custom */;
                        this.showDirtyMessage = true;
                        this.createYesNoButtons();
                    }
                }
            })
        ];
    }
    createYesNoButtons() {
        this.buttons = [
            new ModalButton({
                result: -3 /* Yes */,
                primary: true,
            }),
            new ModalButton({
                result: -4 /* No */,
                action: (button) => {
                    button.result = 0 /* Custom */;
                    this.showDirtyMessage = false;
                    this.createButtons();
                }
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    dayChecked(day) {
        return (this.alert.days & day) !== 0;
    }
    dayChange(event, day) {
        const input = event.target;
        if (input.checked) {
            this.alertDaysControl.setValue(this.alert.days |= day);
            // this.alert.days |= day;
        }
        else {
            this.alertDaysControl.setValue(this.alert.days &= ~day);
            // this.alert.days &= ~day;
        }
        this.form.markAsDirty();
    }
    runQuery() {
        this.alertsService.searchAlert(this.alert, this.model.searchRoute);
    }
}
BsEditAlert.ɵfac = function BsEditAlert_Factory(t) { return new (t || BsEditAlert)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(AlertsService), ɵɵdirectiveInject(ModalRef)); };
BsEditAlert.ɵcmp = ɵɵdefineComponent({ type: BsEditAlert, selectors: [["sq-edit-alert"]], decls: 33, vars: 26, consts: [["name", "editAlert", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "alertName"], ["type", "text", "id", "alertName", "formControlName", "alertName", "autocomplete", "off", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], [1, "form-group"], ["for", "alertFrequency"], ["id", "alertFrequency", "formControlName", "alertFrequency", 1, "form-control", "custom-select"], [3, "value", 4, "ngFor", "ngForOf"], [1, "weekdays-grid"], ["class", "custom-control custom-control-inline custom-checkbox", 4, "ngFor", "ngForOf"], ["for", "alertTimes"], ["type", "text", "id", "alertTimes", "formControlName", "alertTimes", "autocomplete", "off", "spellcheck", "off", 1, "form-control"], [1, "custom-control", "custom-control-inline", "custom-checkbox"], ["type", "checkbox", "id", "alertActive", "formControlName", "alertActive", 1, "custom-control-input"], [1, "custom-control-label", "user-select-none", "cursor-pointer"], ["class", "custom-control custom-control-inline custom-checkbox", 4, "ngIf"], ["footer", "", 3, "message", 4, "ngIf"], [3, "value"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], ["type", "checkbox", "id", "updateQuery", "formControlName", "updateQuery", 1, "custom-control-input"], ["footer", "", 3, "message"]], template: function BsEditAlert_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(6, "input", 4);
        ɵɵelementEnd();
        ɵɵelementStart(7, "div", 5);
        ɵɵelementStart(8, "label", 6);
        ɵɵtext(9);
        ɵɵpipe(10, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(11, "select", 7);
        ɵɵtemplate(12, BsEditAlert_option_12_Template, 3, 4, "option", 8);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(13, "div", 5);
        ɵɵelementStart(14, "label");
        ɵɵtext(15);
        ɵɵpipe(16, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(17, "div", 9);
        ɵɵtemplate(18, BsEditAlert_label_18_Template, 5, 4, "label", 10);
        ɵɵpipe(19, "keyvalue");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(20, "div", 5);
        ɵɵelementStart(21, "label", 11);
        ɵɵtext(22);
        ɵɵpipe(23, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(24, "input", 12);
        ɵɵelementEnd();
        ɵɵelementStart(25, "div", 5);
        ɵɵelementStart(26, "label", 13);
        ɵɵelement(27, "input", 14);
        ɵɵelementStart(28, "span", 15);
        ɵɵtext(29);
        ɵɵpipe(30, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(31, BsEditAlert_label_31_Template, 5, 3, "label", 16);
        ɵɵelementEnd();
        ɵɵtemplate(32, BsEditAlert_sq_alert_message_32_Template, 2, 3, "sq-alert-message", 17);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#editAlert.title")("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 13, "msg#editAlert.name"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(10, 15, "msg#editAlert.frequency"));
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.frequencies);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(16, 17, "msg#editAlert.days"));
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ɵɵpipeBind2(19, 19, ctx.weekdays, ctx.originalOrder));
        ɵɵadvance(4);
        ɵɵtextInterpolate(ɵɵpipeBind1(23, 22, "msg#editAlert.times"));
        ɵɵadvance(7);
        ɵɵtextInterpolate(ɵɵpipeBind1(30, 24, "msg#editAlert.active"));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.canUpdateQuery);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showDirtyMessage);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective, SelectControlValueAccessor, NgForOf, CheckboxControlValueAccessor, NgIf, NgSelectOption, ɵangular_packages_forms_forms_x, BsAlertMessageComponent], pipes: [MessagePipe, KeyValuePipe], styles: [".custom-control-label.user-select-none[_ngcontent-%COMP%]{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.custom-control-label.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.weekdays-grid[_ngcontent-%COMP%]{display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsEditAlert, [{
        type: Component,
        args: [{
                selector: "sq-edit-alert",
                templateUrl: "./edit-alert.html",
                styleUrls: ["./edit-alert.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: FormBuilder }, { type: SearchService }, { type: AlertsService }, { type: ModalRef }]; }, null); })();

function BsManageAlerts_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵelementStart(1, "button", 8);
    ɵɵlistener("click", function BsManageAlerts_div_2_Template_button_click_1_listener() { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(); return ctx_r3.reorder(); });
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageAlerts.edit" : "msg#manageAlerts.reorder"));
} }
function BsManageAlerts_a_5_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 14);
    ɵɵlistener("click", function BsManageAlerts_a_5_a_4_Template_a_click_0_listener() { ɵɵrestoreView(_r11); const ctx_r10 = ɵɵnextContext(); const alert_r5 = ctx_r10.$implicit; const $index_r6 = ctx_r10.index; const ctx_r9 = ɵɵnextContext(); return ctx_r9.remove(alert_r5, $index_r6); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "span", 15);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#manageAlerts.remove"));
} }
function BsManageAlerts_a_5_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 16);
} }
const _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
const _c1 = function (a1) { return [_c0, a1]; };
const _c2 = function (a0) { return { "sq-active": a0, "sq-alert-text": true }; };
function BsManageAlerts_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 9);
    ɵɵlistener("click", function BsManageAlerts_a_5_Template_a_click_0_listener() { ɵɵrestoreView(_r13); const alert_r5 = ctx.$implicit; const ctx_r12 = ɵɵnextContext(); return ctx_r12.editAlert(alert_r5); });
    ɵɵelementStart(1, "div", 10);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 11);
    ɵɵtemplate(4, BsManageAlerts_a_5_a_4_Template, 3, 3, "a", 12);
    ɵɵtemplate(5, BsManageAlerts_a_5_span_5_Template, 1, 0, "span", 13);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const alert_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(5, _c1, ctx_r1.reordering ? "cursor-move" : ""));
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c2, !ctx_r1.reordering));
    ɵɵadvance(1);
    ɵɵtextInterpolate(alert_r5.name);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.reordering);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.reordering);
} }
function BsManageAlerts_sq_alert_message_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "sq-alert-message", 17);
    ɵɵpipe(1, "sqMessage");
} if (rf & 2) {
    ɵɵproperty("message", ɵɵpipeBind1(1, 1, "msg#editAlert.lossDataMessage"));
} }
class BsManageAlerts {
    constructor(model, alertsService) {
        this.model = model;
        this.alertsService = alertsService;
        this.showDirtyMessage = false;
        this.reordering = false;
    }
    ngOnInit() {
        this.createButtons();
    }
    addAuditEvent(auditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }
    reorder() {
        this.reordering = !this.reordering;
    }
    remove(alert, index) {
        this.model.alerts.splice(index, 1);
        this.removeAllButton.visible = this.model.alerts.length > 0;
        this.addAuditEvent({
            type: "Alert_Delete" /* Alert_Delete */,
            detail: {
                alert: alert.name
            }
        });
        return false;
    }
    editAlert(alert) {
        if (!this.reordering) {
            const alert1 = Utils.copy(alert);
            this.alertsService.editAlertModal(alert1, true, this.model.searchRoute)
                .then(result => {
                if (result) {
                    Utils.copy(alert1, alert);
                    this.addAuditEvent({
                        type: "Alert_Edit" /* Alert_Edit */,
                        detail: {
                            alert: alert.name
                        }
                    });
                }
            });
        }
        return false;
    }
    dropped(drop) {
        Utils.arrayMove(this.model.alerts, drop.previousIndex, drop.currentIndex);
    }
    createButtons() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageAlerts.removeAll",
                result: 0 /* Custom */,
                action: (button) => {
                    this.model.alerts.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: "Alert_DeleteAll" /* DeleteAll */
                    });
                },
                visible: this.model.alerts.length > 0
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true
            }),
            new ModalButton({
                result: -2 /* Cancel */,
                action: (button) => {
                    var _a;
                    if (this.model.auditEvents && ((_a = this.model.auditEvents) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        button.result = 0 /* Custom */;
                        this.showDirtyMessage = true;
                        this.createYesNoButtons();
                    }
                }
            })
        ];
    }
    createYesNoButtons() {
        this.buttons = [
            new ModalButton({
                result: -3 /* Yes */,
                primary: true,
            }),
            new ModalButton({
                result: -4 /* No */,
                action: (button) => {
                    button.result = 0 /* Custom */;
                    this.showDirtyMessage = false;
                    this.createButtons();
                }
            })
        ];
    }
}
BsManageAlerts.ɵfac = function BsManageAlerts_Factory(t) { return new (t || BsManageAlerts)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(AlertsService)); };
BsManageAlerts.ɵcmp = ɵɵdefineComponent({ type: BsManageAlerts, selectors: [["sq-manage-alerts"]], decls: 7, vars: 7, consts: [["name", "manageAlerts", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["href", "#", "cdkDrag", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["footer", "", 3, "message", 4, "ngIf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["href", "#", "cdkDrag", "", 3, "ngClass", "click"], [3, "ngClass"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"], ["footer", "", 3, "message"]], template: function BsManageAlerts_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵtemplate(2, BsManageAlerts_div_2_Template, 4, 3, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "div", 4);
        ɵɵlistener("cdkDropListDropped", function BsManageAlerts_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
        ɵɵtemplate(5, BsManageAlerts_a_5_Template, 6, 9, "a", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵtemplate(6, BsManageAlerts_sq_alert_message_6_Template, 2, 3, "sq-alert-message", 6);
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#manageAlerts.title")("buttons", ctx.buttons);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.model.alerts.length);
        ɵɵadvance(2);
        ɵɵproperty("cdkDropListData", ctx.model.alerts)("cdkDropListDisabled", !ctx.reordering);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.model.alerts);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.showDirtyMessage);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgIf, CdkDropList, NgForOf, CdkDrag, NgClass, BsAlertMessageComponent], pipes: [MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-alert-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}.sq-active[_ngcontent-%COMP%]{color:#007bff}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsManageAlerts, [{
        type: Component,
        args: [{
                selector: "sq-manage-alerts",
                templateUrl: "./manage-alerts.html",
                styleUrls: ["./manage-alerts.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: AlertsService }]; }, null); })();

const _c0$1 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsAlertsMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ɵɵpureFunction4(2, _c0$1, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
class BsAlertsMenuComponent {
    constructor(loginService, alertsService, searchService) {
        this.loginService = loginService;
        this.alertsService = alertsService;
        this.searchService = searchService;
        this.searchRoute = "/search";
        this.icon = "fas fa-bell";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        this.createAction = new Action({
            text: "msg#alerts.createAlert",
            title: "msg#alerts.createAlert",
            action: () => { this.alertsService.createAlertModal(); }
        });
        this.manageAction = new Action({
            text: "msg#alerts.manageAlerts",
            title: "msg#alerts.manageAlerts",
            action: () => { this.alertsService.manageAlertsModal(this.searchRoute); }
        });
    }
    ngOnInit() {
        this.updateMenu();
        this._alertsServiceSubscription = this.alertsService.changes.subscribe({
            next: () => { this.updateMenu(); }
        });
        this._loginServiceSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
        this._searchServiceSubscription = this.searchService.resultsStream.subscribe(results => {
            this.updateMenu();
        });
    }
    ngOnDestroy() {
        if (this._alertsServiceSubscription) {
            this._alertsServiceSubscription.unsubscribe();
        }
        if (this._loginServiceSubscription) {
            this._loginServiceSubscription.unsubscribe();
        }
        if (this._searchServiceSubscription) {
            this._searchServiceSubscription.unsubscribe();
        }
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        const alertsActions = [];
        if (this.alertsService.hasAlert) {
            const scrollGroup = new Action({
                scrollGroup: true,
                children: this.alertsService.alerts.map(alert => new Action({
                    text: alert.name,
                    data: alert,
                    action: (item) => {
                        const alert = Utils.copy(item.data);
                        this.alertsService.editAlertModal(alert, undefined, this.searchRoute);
                    }
                }))
            });
            alertsActions.push(scrollGroup);
        }
        if (!!this.searchService.results) {
            alertsActions.push(this.createAction);
        }
        if (this.alertsService.hasAlert) {
            alertsActions.push(this.manageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#alerts.alerts",
            children: alertsActions
        });
    }
}
BsAlertsMenuComponent.ɵfac = function BsAlertsMenuComponent_Factory(t) { return new (t || BsAlertsMenuComponent)(ɵɵdirectiveInject(LoginService), ɵɵdirectiveInject(AlertsService), ɵɵdirectiveInject(SearchService)); };
BsAlertsMenuComponent.ɵcmp = ɵɵdefineComponent({ type: BsAlertsMenuComponent, selectors: [["sq-alerts-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsAlertsMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsAlertsMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [NgIf, BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAlertsMenuComponent, [{
        type: Component,
        args: [{
                selector: 'sq-alerts-menu',
                templateUrl: './alerts-menu.component.html'
            }]
    }], function () { return [{ type: LoginService }, { type: AlertsService }, { type: SearchService }]; }, { searchRoute: [{
            type: Input
        }], icon: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

function windowFactory() {
    return window;
}
class BsAlertsModule {
}
BsAlertsModule.ɵmod = ɵɵdefineNgModule({ type: BsAlertsModule });
BsAlertsModule.ɵinj = ɵɵdefineInjector({ factory: function BsAlertsModule_Factory(t) { return new (t || BsAlertsModule)(); }, providers: [
        {
            provide: ALERT_COMPONENTS,
            useValue: {
                editAlertModal: BsEditAlert,
                manageAlertsModal: BsManageAlerts
            }
        },
        {
            provide: WINDOW,
            useFactory: windowFactory
        }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            DragDropModule,
            BsModalModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsAlertsModule, { declarations: [BsEditAlert, BsManageAlerts, BsAlertsMenuComponent, BsAlertMessageComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,
        BsModalModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsActionModule], exports: [BsEditAlert, BsManageAlerts, BsAlertsMenuComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAlertsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    DragDropModule,
                    BsModalModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsActionModule
                ],
                declarations: [
                    BsEditAlert, BsManageAlerts, BsAlertsMenuComponent, BsAlertMessageComponent
                ],
                exports: [
                    BsEditAlert, BsManageAlerts, BsAlertsMenuComponent
                ],
                providers: [
                    {
                        provide: ALERT_COMPONENTS,
                        useValue: {
                            editAlertModal: BsEditAlert,
                            manageAlertsModal: BsManageAlerts
                        }
                    },
                    {
                        provide: WINDOW,
                        useFactory: windowFactory
                    }
                ]
            }]
    }], null, null); })();

var _enAlerts = {
    "alerts": {
        "alerts": "Alerts",
        "createAlert": "Create Alert",
        "manageAlerts": "Manage Alerts",
        "alertAlreadyExists": "An alert with that name already exists. Would you like to replace it?"
    },
    "editAlert": {
        "title": "Alert",
        "name": "Name",
        "frequency": "Frequency",
        "days": "Days",
        "monday": "Monday",
        "tuesday": "Tuesday",
        "wednesday": "Wednesday",
        "thursday": "Thursday",
        "friday": "Friday",
        "saturday": "Saturday",
        "sunday": "Sunday",
        "times": "Times",
        "active": "Active",
        "updateQuery": "Update Query",
        "runQuery": "Run Query",
        "lossDataMessage": "Do you want to leave without saving your modifications?"
    },
    "manageAlerts": {
        "title": "Manage Alerts",
        "edit": "Edit",
        "reorder": "Reorder",
        "remove": "Remove",
        "removeAll": "Remove all"
    },
};

var _frAlerts = {
    "alerts": {
        "alerts": "Alertes",
        "createAlert": "Créer une alerte",
        "manageAlerts": "Gérer les alertes",
        "alertAlreadyExists": "Une alerte avec ce nom existe déjà. Voulez-vous la remplacer ?"
    },
    "editAlert": {
        "title": "Alerte",
        "name": "Nom",
        "frequency": "Fréquence",
        "days": "Jours",
        "monday": "lundi",
        "tuesday": "mardi",
        "wednesday": "mercredi",
        "thursday": "jeudi",
        "friday": "vendredi",
        "saturday": "samedi",
        "sunday": "dimanche",
        "times": "Horaires",
        "active": "Active",
        "updateQuery": "Mettre à jour la requête",
        "runQuery": "Exécuter la requête",
        "lossDataMessage": "Voulez-vous quitter sans sauvegarder vos modifications ?"
    },
    "manageAlerts": {
        "title": "Gérer les alertes",
        "edit": "Editer",
        "reorder": "Réorganiser",
        "remove": "Effacer",
        "removeAll": "Effacer tout"
    },
};

var _deAlerts = {
    "alerts": {
        "alerts": "Alarme",
        "createAlert": "Alarm erstellen",
        "manageAlerts": "Alarme verwalten",
        "alertAlreadyExists": "Ein Alarm mit diesem Namen existiert bereits. Möchten Sie ihn ersetzen?"
    },
    "editAlert": {
        "title": "Alarm",
        "name": "Name",
        "frequency": "Häufigkeit",
        "days": "Tage",
        "monday": "Montag",
        "tuesday": "Dienstag",
        "wednesday": "Mittwoch",
        "thursday": "Donnerstag",
        "friday": "Freitag",
        "saturday": "Samstag",
        "sunday": "Sonntag",
        "times": "Uhrzeitangaben",
        "active": "Aktiv",
        "updateQuery": "Aktualisiere Suchanfrage",
        "runQuery": "Führe Suchanfrage aus",
        "lossDataMessage": "Möchten Sie gehen, ohne Ihre Änderungen zu speichern?"
    },
    "manageAlerts": {
        "title": "Alarme verwalten",
        "edit": "Bearbeiten",
        "reorder": "Neu sortieren",
        "remove": "Entfernen",
        "removeAll": "Alle entfernen"
    },
};

const enAlerts = Utils.merge({}, _enAlerts, enSearch, enModal);
const frAlerts = Utils.merge({}, _frAlerts, frSearch, frModal);
const deAlerts = Utils.merge({}, _deAlerts, deSearch, deModal);

/**
 * Generated bundle index. Do not edit.
 */

export { ALERT_CHANGE_EVENTS, ALERT_COMPONENTS, Alert, AlertsService, BsAlertsMenuComponent, BsAlertsModule, BsEditAlert, BsManageAlerts, WINDOW, deAlerts, enAlerts, frAlerts };
//# sourceMappingURL=sinequa-components-alerts.js.map
