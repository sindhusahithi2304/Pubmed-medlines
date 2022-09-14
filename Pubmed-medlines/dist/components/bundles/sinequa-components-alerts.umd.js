(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@sinequa/core/app-utils'), require('@sinequa/core/base'), require('@sinequa/core/web-services'), require('@sinequa/components/search'), require('@sinequa/core/modal'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/drag-drop'), require('@sinequa/core/intl'), require('@sinequa/core/validation'), require('@sinequa/components/utils'), require('@sinequa/components/action'), require('@sinequa/components/modal'), require('@sinequa/core/login')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/alerts', ['exports', '@angular/core', 'rxjs', '@sinequa/core/app-utils', '@sinequa/core/base', '@sinequa/core/web-services', '@sinequa/components/search', '@sinequa/core/modal', '@angular/common', '@angular/forms', '@angular/cdk/drag-drop', '@sinequa/core/intl', '@sinequa/core/validation', '@sinequa/components/utils', '@sinequa/components/action', '@sinequa/components/modal', '@sinequa/core/login'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.alerts = {}), global.ng.core, global.rxjs, global.sinequa.core['app-utils'], global.sinequa.core.base, global.sinequa.core['web-services'], global.sinequa.components.search, global.sinequa.core.modal, global.ng.common, global.ng.forms, global.ng.cdk.dragDrop, global.sinequa.core.intl, global.sinequa.core.validation, global.sinequa.components.utils, global.sinequa.components.action, global.sinequa.components.modal, global.sinequa.core.login));
}(this, (function (exports, i0, rxjs, appUtils, base, i1, i2, i3, i4, i1$1, i5$1, i10, i7, i6, i5$2, i5, i1$2) { 'use strict';

    (function (Alert) {
        var Frequency;
        (function (Frequency) {
            Frequency[Frequency["Daily"] = 0] = "Daily";
            Frequency[Frequency["Hourly"] = 1] = "Hourly";
            Frequency[Frequency["Immediate"] = 2] = "Immediate";
            Frequency[Frequency["Weekly"] = 3] = "Weekly";
            Frequency[Frequency["Monthly"] = 4] = "Monthly";
        })(Frequency = Alert.Frequency || (Alert.Frequency = {}));
        var Days;
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
    })(exports.Alert || (exports.Alert = {}));
    // Types of events triggering a change event
    var ALERT_CHANGE_EVENTS = [
        "Alert_Loaded" /* Loaded */,
        "Alert_Add" /* Add */,
        "Alert_Delete" /* Delete */,
        "Alert_Update" /* Update */
    ];
    var ALERT_COMPONENTS = new i0.InjectionToken('ALERT_COMPONENTS');
    var WINDOW = new i0.InjectionToken('WindowToken');
    var AlertsService = /** @class */ (function () {
        function AlertsService(userSettingsService, searchService, modalService, alertComponents, window) {
            var _this = this;
            this.userSettingsService = userSettingsService;
            this.searchService = searchService;
            this.modalService = modalService;
            this.alertComponents = alertComponents;
            this.window = window;
            this._events = new rxjs.Subject();
            this._changes = new rxjs.Subject();
            // Listen to the user settings
            this.userSettingsService.events.subscribe(function (event) {
                // E.g. new login occurs
                // ==> Menus need to be rebuilt
                _this.events.next({ type: "Alert_Loaded" /* Loaded */ });
            });
            // Listen to own events, to trigger change events
            this._events.subscribe(function (event) {
                if (ALERT_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                    _this.changes.next(event);
                }
            });
        }
        Object.defineProperty(AlertsService.prototype, "alerts", {
            // GETTERS
            /**
             * Returns the list of this user's alerts.
             * The list is stored in the user settings (this is a redirection).
             * Using this service creates the list of alerts if it does not already exist.
             */
            get: function () {
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["alerts"])
                    this.userSettingsService.userSettings["alerts"] = [];
                return this.userSettingsService.userSettings["alerts"];
            } // TODO: remove cast when UserSettings is updated
            ,
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlertsService.prototype, "events", {
            /**
             * Triggers any event among AlertChangeEvent
             * (use for fine-grained control of alerts workflow)
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlertsService.prototype, "changes", {
            /**
             * Triggers when events affect the list of alerts
             * (use to refresh alert menus)
             * Cf. CHANGE_EVENTS list
             */
            get: function () {
                return this._changes;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AlertsService.prototype, "hasAlert", {
            /**
             * @returns true if there is at least one alert
             */
            get: function () {
                return this.alerts.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @returns an alert with the given name or undefined if it does not exist
         * @param name
         */
        AlertsService.prototype.alert = function (name) {
            var i = this.alertIndex(name);
            return i >= 0 ? this.alerts[i] : undefined;
        };
        AlertsService.prototype.alertIndex = function (name) {
            for (var i = 0, ic = this.alerts.length; i < ic; i++) {
                var alert = this.alerts[i];
                if (alert && alert.name === name) {
                    return i;
                }
            }
            return -1;
        };
        // CRUD
        /**
         * Creates a new alert unless it already exists.
         * Emits an Alert event.
         * Update the data on the server.
         * @param alert the alert to create
         * @returns true if alert was created
         */
        AlertsService.prototype.createAlert = function (alert) {
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
        };
        /**
         * Update the alert at the given index, unless an alert with the same name
         * already exists in the list of alerts.
         * Emits an Alert event.
         * Update the data on the server.
         * @param alert the alert to update
         * @param index the index at which to update the alert
         * @returns true if alert was updated
         */
        AlertsService.prototype.updateAlert = function (alert, index) {
            var prevIndex = this.alertIndex(alert.name);
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
        };
        /**
         * Updates the full list of alerts.
         * Emits an Alert event.
         * Update the data on the server.
         * @param alerts the new list of alerts
         * @param auditEvents the list of audit events to log
         */
        AlertsService.prototype.updateAlerts = function (alerts, auditEvents) {
            base.Utils.arraySet(this.alerts, alerts);
            this.events.next({ type: "Alert_Update" /* Update */ });
            this.patchAlerts(auditEvents);
            return true;
        };
        /**
         * Deletes the given alert (based on its name)
         * Emits an Alert event.
         * Update the data on the server.
         * @param alert
         * @returns true if alert was deleted
         */
        AlertsService.prototype.deleteAlert = function (alert) {
            var index = this.alertIndex(alert.name);
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
        };
        /**
         * Sets this alert to the current search context, using the search service
         */
        AlertsService.prototype.setAlertToCurrentQuery = function (alert) {
            alert.query = appUtils.Query.copy(this.searchService.query);
        };
        /**
         * Updates Alerts in User settings.
         * @param auditEvents : Audit Events to be triggered
         * @returns an Observable which can be used to trigger further events
         */
        AlertsService.prototype.patchAlerts = function (auditEvents) {
            var _this = this;
            return this.userSettingsService.patch({ alerts: this.alerts }, auditEvents)
                .subscribe(function (next) {
                _this.events.next({ type: "Alert_Patched" /* Patched */ });
            }, function (error) {
                console.error("Could not patch Alerts!", error);
            });
        };
        // EVENT HANDLERS (Menus)
        /**
         * Uses the SearchService to perform a search returning all
         * the documents matching this alert.
         * @param alert
         * @returns the search service promise
         */
        AlertsService.prototype.searchAlert = function (alert, path) {
            this.searchService.setQuery(base.Utils.extend(this.searchService.makeQuery(), base.Utils.copy(alert.query)));
            this.events.next({ type: "Search_AlertQuery" /* Search_AlertQuery */, alert: alert });
            return this.searchService.search({ path: path }, {
                type: "Search_AlertQuery" /* Search_AlertQuery */,
                detail: {
                    alert: alert.name
                }
            });
        };
        /**
         * Opens a dialog allowing a user to create a new alert.
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true if the alert was created.
         */
        AlertsService.prototype.createAlertModal = function () {
            var _this = this;
            var alert = {
                name: "",
                description: "",
                timezone: this.userSettingsService.timezone,
                query: appUtils.Query.copy(this.searchService.query),
                frequency: exports.Alert.Frequency.Daily,
                days: exports.Alert.Days.WeekDays,
                interval: 1,
                index: 1,
                times: "9:00",
                active: true,
                combine: true,
                respectTabSelection: false
            };
            var queryUrl = this.window.location.href;
            return this.modalService.open(this.alertComponents.editAlertModal, { model: { alert: alert } })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    var index_1 = _this.alertIndex(alert.name);
                    if (index_1 !== -1) {
                        return _this.modalService.yesNo("msg#alerts.alertAlreadyExists")
                            .then(function (result) {
                            if (result === -3 /* Yes */) {
                                alert.appQueryUrl = queryUrl;
                                return _this.updateAlert(alert, index_1);
                            }
                            return false;
                        });
                    }
                    else {
                        alert.appQueryUrl = queryUrl;
                        return _this.createAlert(alert);
                    }
                }
                return false;
            });
        };
        /**
         * Opens a dialog allowing a user to edit an existing alert.
         * @param alert: The alert to edit
         * @param noUpdate: if true, will not update the server after the edit
         * @param searchRoute: the route to use when replaying the alert's query
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true if the alert was updated.
         */
        AlertsService.prototype.editAlertModal = function (alert, noUpdate, searchRoute) {
            var _this = this;
            var prevName = alert.name;
            var queryUrl = this.window.location.href;
            return this.modalService.open(this.alertComponents.editAlertModal, { model: { alert: alert, searchRoute: searchRoute } })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    if (noUpdate)
                        return true;
                    var prevIndex = _this.alertIndex(prevName);
                    if (prevIndex === -1)
                        return false; // this alert did not exist
                    var index = _this.alertIndex(alert.name);
                    if (index !== -1 && index !== prevIndex) { // An alert with the same (new) name exists
                        return _this.modalService.yesNo("msg#alerts.alertAlreadyExists")
                            .then(function (result) {
                            if (result === -3 /* Yes */) {
                                var prevAlert = _this.alert(prevName);
                                if (prevAlert) {
                                    _this.deleteAlert(prevAlert); // Remove the alert with old name
                                }
                                alert.appQueryUrl = queryUrl;
                                return _this.updateAlert(alert, _this.alertIndex(alert.name)); // Update the alert with new name (index might have changed due to delete of old name)
                            }
                            return false;
                        });
                    }
                    else {
                        alert.appQueryUrl = queryUrl;
                        return _this.updateAlert(alert, prevIndex); // Update this alert
                    }
                }
                return false;
            });
        };
        /**
         * Opens a dialog allowing a user to reorganize and edit the
         * list of alerts.
         * @returns a boolean promise resolved when the user closes the dialog
         * the result is true is the list was updated.
         */
        AlertsService.prototype.manageAlertsModal = function (searchRoute) {
            var _this = this;
            var model = { alerts: base.Utils.copy(this.alerts), searchRoute: searchRoute };
            return this.modalService.open(this.alertComponents.manageAlertsModal, { model: model })
                .then(function (result) {
                if (result === -1 /* OK */) {
                    return _this.updateAlerts(model.alerts, model.auditEvents);
                }
                return false;
            });
        };
        AlertsService.prototype.ngOnDestroy = function () {
            this.events.complete();
            this.changes.complete();
        };
        return AlertsService;
    }());
    AlertsService.ɵfac = function AlertsService_Factory(t) { return new (t || AlertsService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.ModalService), i0.ɵɵinject(ALERT_COMPONENTS), i0.ɵɵinject(WINDOW)); };
    AlertsService.ɵprov = i0.ɵɵdefineInjectable({ token: AlertsService, factory: AlertsService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AlertsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], function () {
            return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3.ModalService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [ALERT_COMPONENTS]
                        }] }, { type: Window, decorators: [{
                            type: i0.Inject,
                            args: [WINDOW]
                        }] }];
        }, null);
    })();

    var BsAlertMessageComponent = /** @class */ (function () {
        function BsAlertMessageComponent() {
        }
        return BsAlertMessageComponent;
    }());
    BsAlertMessageComponent.ɵfac = function BsAlertMessageComponent_Factory(t) { return new (t || BsAlertMessageComponent)(); };
    BsAlertMessageComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsAlertMessageComponent, selectors: [["sq-alert-message"]], inputs: { message: "message" }, decls: 2, vars: 1, consts: [["role", "alert", 1, "alert", "alert-danger", "ml-3", "mr-3", "p-3", "text-center"]], template: function BsAlertMessageComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵtext(1);
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate1(" ", ctx.message, "\n");
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAlertMessageComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-alert-message',
                        templateUrl: './alert-message.component.html'
                    }]
            }], null, { message: [{
                    type: i0.Input
                }] });
    })();

    function BsEditAlert_option_12_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "option", 18);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var frequencyValue_r4 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("value", frequencyValue_r4);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, ctx_r0.frequency[frequencyValue_r4]));
        }
    }
    function BsEditAlert_label_18_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "label", 13);
            i0.ɵɵelementStart(1, "input", 19);
            i0.ɵɵlistener("change", function BsEditAlert_label_18_Template_input_change_1_listener($event) { i0.ɵɵrestoreView(_r7_1); var day_r5 = ctx.$implicit; var ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.dayChange($event, day_r5.value); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "span", 15);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var day_r5 = ctx.$implicit;
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("checked", ctx_r1.dayChecked(day_r5.value));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 2, "msg#editAlert." + day_r5.key));
        }
    }
    function BsEditAlert_label_31_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "label", 13);
            i0.ɵɵelement(1, "input", 20);
            i0.ɵɵelementStart(2, "span", 15);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, "msg#editAlert.updateQuery"));
        }
    }
    function BsEditAlert_sq_alert_message_32_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-alert-message", 21);
            i0.ɵɵpipe(1, "sqMessage");
        }
        if (rf & 2) {
            i0.ɵɵproperty("message", i0.ɵɵpipeBind1(1, 1, "msg#editAlert.lossDataMessage"));
        }
    }
    var BsEditAlert = /** @class */ (function () {
        function BsEditAlert(model, formBuilder, searchService, alertsService, modalRef) {
            this.model = model;
            this.formBuilder = formBuilder;
            this.searchService = searchService;
            this.alertsService = alertsService;
            this.modalRef = modalRef;
            this.weekdays = {
                'monday': exports.Alert.Days.Monday,
                'tuesday': exports.Alert.Days.Tuesday,
                'wednesday': exports.Alert.Days.Wednesday,
                'thursday': exports.Alert.Days.Thursday,
                'friday': exports.Alert.Days.Friday,
                'saturday': exports.Alert.Days.Saturday,
                'sunday': exports.Alert.Days.Sunday
            };
            this.showDirtyMessage = false;
            // Preserve original property order
            this.originalOrder = function (a, b) { return 0; };
            this.frequencies = [
                exports.Alert.Frequency.Daily,
                exports.Alert.Frequency.Hourly,
                exports.Alert.Frequency.Immediate,
            ];
            this.frequency = exports.Alert.Frequency;
        }
        Object.defineProperty(BsEditAlert.prototype, "alert", {
            get: function () {
                return this.model.alert;
            },
            enumerable: false,
            configurable: true
        });
        BsEditAlert.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.alert.days) {
                this.alert.days = exports.Alert.Days.None;
            }
            this.canUpdateQuery = (!!this.alertsService.alert(this.alert.name)) &&
                !!this.searchService.results && !!this.searchService.results.records;
            this.alertDaysControl = new i1$1.FormControl(this.alert.days);
            this.alertNameControl = new i1$1.FormControl(this.alert.name, i1$1.Validators.required);
            this.alertFrequencyControl = new i1$1.FormControl(this.alert.frequency);
            this.alertTimesControl = new i1$1.FormControl(this.alert.times); // TODO validator
            this.alertActiveControl = new i1$1.FormControl(this.alert.active);
            this.updateQueryControl = new i1$1.FormControl(this.updateQuery);
            this.form = this.formBuilder.group({
                alertName: this.alertNameControl,
                alertFrequency: this.alertFrequencyControl,
                alertTimes: this.alertTimesControl,
                alertActive: this.alertActiveControl,
                updateQuery: this.updateQueryControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.alert.name = _this.alertNameControl.value;
                _this.alert.frequency = _this.alertFrequencyControl.value;
                _this.alert.times = _this.alertTimesControl.value;
                _this.alert.active = _this.alertActiveControl.value;
                _this.alert.days = _this.alertDaysControl.value;
                _this.updateQuery = _this.updateQueryControl.value;
            });
            this.createButtons();
        };
        BsEditAlert.prototype.createButtons = function () {
            var _this = this;
            this.buttons = [
                new i3.ModalButton({
                    text: "msg#editAlert.runQuery",
                    result: 0 /* Custom */,
                    action: function (button) {
                        _this.runQuery();
                        _this.modalRef.close(-2 /* Cancel */); // dismiss the dialog too (?)
                    },
                    visible: !!this.alertsService.alert(this.alert.name)
                }),
                new i3.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form,
                    action: function (button) {
                        if (_this.updateQuery) {
                            _this.alertsService.setAlertToCurrentQuery(_this.alert);
                        }
                    }
                }),
                new i3.ModalButton({
                    result: -2 /* Cancel */,
                    action: function (button) {
                        if (_this.form.dirty) {
                            button.result = 0 /* Custom */;
                            _this.showDirtyMessage = true;
                            _this.createYesNoButtons();
                        }
                    }
                })
            ];
        };
        BsEditAlert.prototype.createYesNoButtons = function () {
            var _this = this;
            this.buttons = [
                new i3.ModalButton({
                    result: -3 /* Yes */,
                    primary: true,
                }),
                new i3.ModalButton({
                    result: -4 /* No */,
                    action: function (button) {
                        button.result = 0 /* Custom */;
                        _this.showDirtyMessage = false;
                        _this.createButtons();
                    }
                })
            ];
        };
        BsEditAlert.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        BsEditAlert.prototype.dayChecked = function (day) {
            return (this.alert.days & day) !== 0;
        };
        BsEditAlert.prototype.dayChange = function (event, day) {
            var input = event.target;
            if (input.checked) {
                this.alertDaysControl.setValue(this.alert.days |= day);
                // this.alert.days |= day;
            }
            else {
                this.alertDaysControl.setValue(this.alert.days &= ~day);
                // this.alert.days &= ~day;
            }
            this.form.markAsDirty();
        };
        BsEditAlert.prototype.runQuery = function () {
            this.alertsService.searchAlert(this.alert, this.model.searchRoute);
        };
        return BsEditAlert;
    }());
    BsEditAlert.ɵfac = function BsEditAlert_Factory(t) { return new (t || BsEditAlert)(i0.ɵɵdirectiveInject(i3.MODAL_MODEL), i0.ɵɵdirectiveInject(i1$1.FormBuilder), i0.ɵɵdirectiveInject(i2.SearchService), i0.ɵɵdirectiveInject(AlertsService), i0.ɵɵdirectiveInject(i3.ModalRef)); };
    BsEditAlert.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditAlert, selectors: [["sq-edit-alert"]], decls: 33, vars: 26, consts: [["name", "editAlert", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "alertName"], ["type", "text", "id", "alertName", "formControlName", "alertName", "autocomplete", "off", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"], [1, "form-group"], ["for", "alertFrequency"], ["id", "alertFrequency", "formControlName", "alertFrequency", 1, "form-control", "custom-select"], [3, "value", 4, "ngFor", "ngForOf"], [1, "weekdays-grid"], ["class", "custom-control custom-control-inline custom-checkbox", 4, "ngFor", "ngForOf"], ["for", "alertTimes"], ["type", "text", "id", "alertTimes", "formControlName", "alertTimes", "autocomplete", "off", "spellcheck", "off", 1, "form-control"], [1, "custom-control", "custom-control-inline", "custom-checkbox"], ["type", "checkbox", "id", "alertActive", "formControlName", "alertActive", 1, "custom-control-input"], [1, "custom-control-label", "user-select-none", "cursor-pointer"], ["class", "custom-control custom-control-inline custom-checkbox", 4, "ngIf"], ["footer", "", 3, "message", 4, "ngIf"], [3, "value"], ["type", "checkbox", 1, "custom-control-input", 3, "checked", "change"], ["type", "checkbox", "id", "updateQuery", "formControlName", "updateQuery", 1, "custom-control-input"], ["footer", "", 3, "message"]], template: function BsEditAlert_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "label", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(6, "input", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(7, "div", 5);
                i0.ɵɵelementStart(8, "label", 6);
                i0.ɵɵtext(9);
                i0.ɵɵpipe(10, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(11, "select", 7);
                i0.ɵɵtemplate(12, BsEditAlert_option_12_Template, 3, 4, "option", 8);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "div", 5);
                i0.ɵɵelementStart(14, "label");
                i0.ɵɵtext(15);
                i0.ɵɵpipe(16, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(17, "div", 9);
                i0.ɵɵtemplate(18, BsEditAlert_label_18_Template, 5, 4, "label", 10);
                i0.ɵɵpipe(19, "keyvalue");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(20, "div", 5);
                i0.ɵɵelementStart(21, "label", 11);
                i0.ɵɵtext(22);
                i0.ɵɵpipe(23, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(24, "input", 12);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(25, "div", 5);
                i0.ɵɵelementStart(26, "label", 13);
                i0.ɵɵelement(27, "input", 14);
                i0.ɵɵelementStart(28, "span", 15);
                i0.ɵɵtext(29);
                i0.ɵɵpipe(30, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(31, BsEditAlert_label_31_Template, 5, 3, "label", 16);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(32, BsEditAlert_sq_alert_message_32_Template, 2, 3, "sq-alert-message", 17);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#editAlert.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 13, "msg#editAlert.name"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 15, "msg#editAlert.frequency"));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.frequencies);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 17, "msg#editAlert.days"));
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(19, 19, ctx.weekdays, ctx.originalOrder));
                i0.ɵɵadvance(4);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(23, 22, "msg#editAlert.times"));
                i0.ɵɵadvance(7);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 24, "msg#editAlert.active"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.canUpdateQuery);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showDirtyMessage);
            }
        }, directives: [i1$1.ɵangular_packages_forms_forms_y, i1$1.NgControlStatusGroup, i1$1.FormGroupDirective, i5.BsModal, i1$1.DefaultValueAccessor, i1$1.NgControlStatus, i1$1.FormControlName, i6.Autofocus, i7.ValidationDirective, i1$1.SelectControlValueAccessor, i4.NgForOf, i1$1.CheckboxControlValueAccessor, i4.NgIf, i1$1.NgSelectOption, i1$1.ɵangular_packages_forms_forms_x, BsAlertMessageComponent], pipes: [i10.MessagePipe, i4.KeyValuePipe], styles: [".custom-control-label.user-select-none[_ngcontent-%COMP%]{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.custom-control-label.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.weekdays-grid[_ngcontent-%COMP%]{display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr))}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsEditAlert, [{
                type: i0.Component,
                args: [{
                        selector: "sq-edit-alert",
                        templateUrl: "./edit-alert.html",
                        styleUrls: ["./edit-alert.scss"]
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.MODAL_MODEL]
                        }] }, { type: i1$1.FormBuilder }, { type: i2.SearchService }, { type: AlertsService }, { type: i3.ModalRef }];
        }, null);
    })();

    function BsManageAlerts_div_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 7);
            i0.ɵɵelementStart(1, "button", 8);
            i0.ɵɵlistener("click", function BsManageAlerts_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r4_1); var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.reorder(); });
            i0.ɵɵtext(2);
            i0.ɵɵpipe(3, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageAlerts.edit" : "msg#manageAlerts.reorder"));
        }
    }
    function BsManageAlerts_a_5_a_4_Template(rf, ctx) {
        if (rf & 1) {
            var _r11_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 14);
            i0.ɵɵlistener("click", function BsManageAlerts_a_5_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r11_1); var ctx_r10 = i0.ɵɵnextContext(); var alert_r5 = ctx_r10.$implicit; var $index_r6 = ctx_r10.index; var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.remove(alert_r5, $index_r6); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelement(2, "span", 15);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageAlerts.remove"));
        }
    }
    function BsManageAlerts_a_5_span_5_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "span", 16);
        }
    }
    var _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
    var _c1 = function (a1) { return [_c0, a1]; };
    var _c2 = function (a0) { return { "sq-active": a0, "sq-alert-text": true }; };
    function BsManageAlerts_a_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r13_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "a", 9);
            i0.ɵɵlistener("click", function BsManageAlerts_a_5_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r13_1); var alert_r5 = ctx.$implicit; var ctx_r12 = i0.ɵɵnextContext(); return ctx_r12.editAlert(alert_r5); });
            i0.ɵɵelementStart(1, "div", 10);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 11);
            i0.ɵɵtemplate(4, BsManageAlerts_a_5_a_4_Template, 3, 3, "a", 12);
            i0.ɵɵtemplate(5, BsManageAlerts_a_5_span_5_Template, 1, 0, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var alert_r5 = ctx.$implicit;
            var ctx_r1 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.reordering ? "cursor-move" : ""));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c2, !ctx_r1.reordering));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(alert_r5.name);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx_r1.reordering);
        }
    }
    function BsManageAlerts_sq_alert_message_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "sq-alert-message", 17);
            i0.ɵɵpipe(1, "sqMessage");
        }
        if (rf & 2) {
            i0.ɵɵproperty("message", i0.ɵɵpipeBind1(1, 1, "msg#editAlert.lossDataMessage"));
        }
    }
    var BsManageAlerts = /** @class */ (function () {
        function BsManageAlerts(model, alertsService) {
            this.model = model;
            this.alertsService = alertsService;
            this.showDirtyMessage = false;
            this.reordering = false;
        }
        BsManageAlerts.prototype.ngOnInit = function () {
            this.createButtons();
        };
        BsManageAlerts.prototype.addAuditEvent = function (auditEvent) {
            if (!this.model.auditEvents) {
                this.model.auditEvents = [];
            }
            this.model.auditEvents.push(auditEvent);
        };
        BsManageAlerts.prototype.reorder = function () {
            this.reordering = !this.reordering;
        };
        BsManageAlerts.prototype.remove = function (alert, index) {
            this.model.alerts.splice(index, 1);
            this.removeAllButton.visible = this.model.alerts.length > 0;
            this.addAuditEvent({
                type: "Alert_Delete" /* Alert_Delete */,
                detail: {
                    alert: alert.name
                }
            });
            return false;
        };
        BsManageAlerts.prototype.editAlert = function (alert) {
            var _this = this;
            if (!this.reordering) {
                var alert1_1 = base.Utils.copy(alert);
                this.alertsService.editAlertModal(alert1_1, true, this.model.searchRoute)
                    .then(function (result) {
                    if (result) {
                        base.Utils.copy(alert1_1, alert);
                        _this.addAuditEvent({
                            type: "Alert_Edit" /* Alert_Edit */,
                            detail: {
                                alert: alert.name
                            }
                        });
                    }
                });
            }
            return false;
        };
        BsManageAlerts.prototype.dropped = function (drop) {
            base.Utils.arrayMove(this.model.alerts, drop.previousIndex, drop.currentIndex);
        };
        BsManageAlerts.prototype.createButtons = function () {
            var _this = this;
            this.buttons = [
                this.removeAllButton = new i3.ModalButton({
                    text: "msg#manageAlerts.removeAll",
                    result: 0 /* Custom */,
                    action: function (button) {
                        _this.model.alerts.splice(0);
                        button.visible = false;
                        _this.addAuditEvent({
                            type: "Alert_DeleteAll" /* DeleteAll */
                        });
                    },
                    visible: this.model.alerts.length > 0
                }),
                new i3.ModalButton({
                    result: -1 /* OK */,
                    primary: true
                }),
                new i3.ModalButton({
                    result: -2 /* Cancel */,
                    action: function (button) {
                        var _a;
                        if (_this.model.auditEvents && ((_a = _this.model.auditEvents) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            button.result = 0 /* Custom */;
                            _this.showDirtyMessage = true;
                            _this.createYesNoButtons();
                        }
                    }
                })
            ];
        };
        BsManageAlerts.prototype.createYesNoButtons = function () {
            var _this = this;
            this.buttons = [
                new i3.ModalButton({
                    result: -3 /* Yes */,
                    primary: true,
                }),
                new i3.ModalButton({
                    result: -4 /* No */,
                    action: function (button) {
                        button.result = 0 /* Custom */;
                        _this.showDirtyMessage = false;
                        _this.createButtons();
                    }
                })
            ];
        };
        return BsManageAlerts;
    }());
    BsManageAlerts.ɵfac = function BsManageAlerts_Factory(t) { return new (t || BsManageAlerts)(i0.ɵɵdirectiveInject(i3.MODAL_MODEL), i0.ɵɵdirectiveInject(AlertsService)); };
    BsManageAlerts.ɵcmp = i0.ɵɵdefineComponent({ type: BsManageAlerts, selectors: [["sq-manage-alerts"]], decls: 7, vars: 7, consts: [["name", "manageAlerts", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["href", "#", "cdkDrag", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["footer", "", 3, "message", 4, "ngIf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["href", "#", "cdkDrag", "", 3, "ngClass", "click"], [3, "ngClass"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"], ["footer", "", 3, "message"]], template: function BsManageAlerts_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵtemplate(2, BsManageAlerts_div_2_Template, 4, 3, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵelementStart(4, "div", 4);
                i0.ɵɵlistener("cdkDropListDropped", function BsManageAlerts_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
                i0.ɵɵtemplate(5, BsManageAlerts_a_5_Template, 6, 9, "a", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(6, BsManageAlerts_sq_alert_message_6_Template, 2, 3, "sq-alert-message", 6);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#manageAlerts.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.model.alerts.length);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("cdkDropListData", ctx.model.alerts)("cdkDropListDisabled", !ctx.reordering);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.model.alerts);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.showDirtyMessage);
            }
        }, directives: [i1$1.ɵangular_packages_forms_forms_y, i1$1.NgControlStatusGroup, i1$1.NgForm, i5.BsModal, i4.NgIf, i5$1.CdkDropList, i4.NgForOf, i5$1.CdkDrag, i4.NgClass, BsAlertMessageComponent], pipes: [i10.MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-alert-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}.sq-active[_ngcontent-%COMP%]{color:#007bff}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsManageAlerts, [{
                type: i0.Component,
                args: [{
                        selector: "sq-manage-alerts",
                        templateUrl: "./manage-alerts.html",
                        styleUrls: ["./manage-alerts.scss"]
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i3.MODAL_MODEL]
                        }] }, { type: AlertsService }];
        }, null);
    })();

    var _c0$1 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
    function BsAlertsMenuComponent_li_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 1);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0$1, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
        }
    }
    var BsAlertsMenuComponent = /** @class */ (function () {
        function BsAlertsMenuComponent(loginService, alertsService, searchService) {
            var _this = this;
            this.loginService = loginService;
            this.alertsService = alertsService;
            this.searchService = searchService;
            this.searchRoute = "/search";
            this.icon = "fas fa-bell";
            this.autoAdjust = true;
            this.autoAdjustBreakpoint = 'xl';
            this.collapseBreakpoint = 'sm';
            this.createAction = new i5$2.Action({
                text: "msg#alerts.createAlert",
                title: "msg#alerts.createAlert",
                action: function () { _this.alertsService.createAlertModal(); }
            });
            this.manageAction = new i5$2.Action({
                text: "msg#alerts.manageAlerts",
                title: "msg#alerts.manageAlerts",
                action: function () { _this.alertsService.manageAlertsModal(_this.searchRoute); }
            });
        }
        BsAlertsMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.updateMenu();
            this._alertsServiceSubscription = this.alertsService.changes.subscribe({
                next: function () { _this.updateMenu(); }
            });
            this._loginServiceSubscription = this.loginService.events.subscribe(function (event) {
                if (event.type === "session-changed") {
                    _this.updateMenu();
                }
            });
            this._searchServiceSubscription = this.searchService.resultsStream.subscribe(function (results) {
                _this.updateMenu();
            });
        };
        BsAlertsMenuComponent.prototype.ngOnDestroy = function () {
            if (this._alertsServiceSubscription) {
                this._alertsServiceSubscription.unsubscribe();
            }
            if (this._loginServiceSubscription) {
                this._loginServiceSubscription.unsubscribe();
            }
            if (this._searchServiceSubscription) {
                this._searchServiceSubscription.unsubscribe();
            }
        };
        BsAlertsMenuComponent.prototype.updateMenu = function () {
            var _this = this;
            if (!this.loginService.complete) {
                this.menu = undefined;
                return;
            }
            var alertsActions = [];
            if (this.alertsService.hasAlert) {
                var scrollGroup = new i5$2.Action({
                    scrollGroup: true,
                    children: this.alertsService.alerts.map(function (alert) { return new i5$2.Action({
                        text: alert.name,
                        data: alert,
                        action: function (item) {
                            var alert = base.Utils.copy(item.data);
                            _this.alertsService.editAlertModal(alert, undefined, _this.searchRoute);
                        }
                    }); })
                });
                alertsActions.push(scrollGroup);
            }
            if (!!this.searchService.results) {
                alertsActions.push(this.createAction);
            }
            if (this.alertsService.hasAlert) {
                alertsActions.push(this.manageAction);
            }
            this.menu = new i5$2.Action({
                icon: this.icon,
                text: "msg#alerts.alerts",
                children: alertsActions
            });
        };
        return BsAlertsMenuComponent;
    }());
    BsAlertsMenuComponent.ɵfac = function BsAlertsMenuComponent_Factory(t) { return new (t || BsAlertsMenuComponent)(i0.ɵɵdirectiveInject(i1$2.LoginService), i0.ɵɵdirectiveInject(AlertsService), i0.ɵɵdirectiveInject(i2.SearchService)); };
    BsAlertsMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsAlertsMenuComponent, selectors: [["sq-alerts-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsAlertsMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsAlertsMenuComponent_li_0_Template, 1, 7, "li", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
            }
        }, directives: [i4.NgIf, i5$2.BsActionItem], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAlertsMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-alerts-menu',
                        templateUrl: './alerts-menu.component.html'
                    }]
            }], function () { return [{ type: i1$2.LoginService }, { type: AlertsService }, { type: i2.SearchService }]; }, { searchRoute: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], autoAdjust: [{
                    type: i0.Input
                }], autoAdjustBreakpoint: [{
                    type: i0.Input
                }], collapseBreakpoint: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    function windowFactory() {
        return window;
    }
    var BsAlertsModule = /** @class */ (function () {
        function BsAlertsModule() {
        }
        return BsAlertsModule;
    }());
    BsAlertsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsAlertsModule });
    BsAlertsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsAlertsModule_Factory(t) { return new (t || BsAlertsModule)(); }, providers: [
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
                i4.CommonModule,
                i1$1.FormsModule, i1$1.ReactiveFormsModule,
                i5$1.DragDropModule,
                i5.BsModalModule,
                i10.IntlModule,
                i7.ValidationModule,
                i6.UtilsModule,
                i5$2.BsActionModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsAlertsModule, { declarations: [BsEditAlert, BsManageAlerts, BsAlertsMenuComponent, BsAlertMessageComponent], imports: [i4.CommonModule,
                i1$1.FormsModule, i1$1.ReactiveFormsModule,
                i5$1.DragDropModule,
                i5.BsModalModule,
                i10.IntlModule,
                i7.ValidationModule,
                i6.UtilsModule,
                i5$2.BsActionModule], exports: [BsEditAlert, BsManageAlerts, BsAlertsMenuComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAlertsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4.CommonModule,
                            i1$1.FormsModule, i1$1.ReactiveFormsModule,
                            i5$1.DragDropModule,
                            i5.BsModalModule,
                            i10.IntlModule,
                            i7.ValidationModule,
                            i6.UtilsModule,
                            i5$2.BsActionModule
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
            }], null, null);
    })();

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

    var enAlerts = base.Utils.merge({}, _enAlerts, i2.enSearch, i5.enModal);
    var frAlerts = base.Utils.merge({}, _frAlerts, i2.frSearch, i5.frModal);
    var deAlerts = base.Utils.merge({}, _deAlerts, i2.deSearch, i5.deModal);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ALERT_CHANGE_EVENTS = ALERT_CHANGE_EVENTS;
    exports.ALERT_COMPONENTS = ALERT_COMPONENTS;
    exports.AlertsService = AlertsService;
    exports.BsAlertsMenuComponent = BsAlertsMenuComponent;
    exports.BsAlertsModule = BsAlertsModule;
    exports.BsEditAlert = BsEditAlert;
    exports.BsManageAlerts = BsManageAlerts;
    exports.WINDOW = WINDOW;
    exports.deAlerts = deAlerts;
    exports.enAlerts = enAlerts;
    exports.frAlerts = frAlerts;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-alerts.umd.js.map
