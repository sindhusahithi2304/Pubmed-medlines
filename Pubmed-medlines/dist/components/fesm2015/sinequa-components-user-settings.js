import { ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵelement, ɵɵelementEnd, ɵɵproperty, ɵɵadvance, ɵɵstyleProp, ɵsetClassMetadata, Component, Input, ɵɵtext, ɵɵpipe, ɵɵtextInterpolate, ɵɵpipeBind1, ɵɵtemplate, ɵɵnextContext, ɵɵpureFunction4, ChangeDetectorRef, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, ɵɵsetComponentScope, ɵɵinject, ɵɵdefineInjectable, Injectable } from '@angular/core';
import { ModalButton, ModalService } from '@sinequa/core/modal';
import { Utils } from '@sinequa/core/base';
import { UserSettingsWebService, PrincipalWebService } from '@sinequa/core/web-services';
import { IntlService, MessagePipe, IntlModule } from '@sinequa/core/intl';
import { FormBuilder, NgControlStatusGroup, FormGroupDirective, SelectControlValueAccessor, NgControlStatus, FormControlName, NgSelectOption, ɵangular_packages_forms_forms_x, FormsModule, ReactiveFormsModule, ɵangular_packages_forms_forms_y } from '@angular/forms';
import { AppService } from '@sinequa/core/app-utils';
import { Autofocus, UtilsModule } from '@sinequa/components/utils';
import { ValidationDirective, ValidationModule } from '@sinequa/core/validation';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { BsOverrideUser, BsModalModule, BsModal, enModal, frModal, deModal } from '@sinequa/components/modal';
import { Action, BsActionItem, BsActionModule } from '@sinequa/components/action';
import { AuthenticationService, LoginService } from '@sinequa/core/login';
import { NotificationsService } from '@sinequa/core/notification';

var JsonInfo;
(function (JsonInfo) {
    let InputType;
    (function (InputType) {
        InputType["Entry"] = "JsonEntryInput";
        InputType["Range"] = "JsonRangeInput";
        InputType["MultiEntry"] = "JsonMultiEntryInput";
    })(InputType = JsonInfo.InputType || (JsonInfo.InputType = {}));
    let ValueType;
    (function (ValueType) {
        ValueType["String"] = "String";
        ValueType["Int"] = "Int";
        ValueType["Number"] = "Number";
        ValueType["Date"] = "Date";
        ValueType["Bool"] = "Bool";
    })(ValueType = JsonInfo.ValueType || (JsonInfo.ValueType = {}));
})(JsonInfo || (JsonInfo = {}));
/**
 * Opens a dialog to modify the user settings.
 *
 */
class BsEditUserSettings {
    constructor(userSettingsService, intlService, formBuilder) {
        this.userSettingsService = userSettingsService;
        this.intlService = intlService;
        this.formBuilder = formBuilder;
        this.visibleThreshold = 0;
    }
    ngOnInit() {
        this.layout = {};
        this.model = {
            'language': this.intlService.currentLocale.name
        };
        this.form = this.formBuilder.group({
            'selectedLocale': [this.intlService.currentLocale.name]
        });
        const onOkClicked = (_) => {
            if (this.form.dirty) {
                // Locale is treated separately because it is not really stored in the user settings.
                const newLocale = this.form.value['selectedLocale'];
                this.form.removeControl('selectedLocale');
                if (!Utils.eqNC(this.model['language'], newLocale)) {
                    Utils.subscribe(this.intlService.use(newLocale), response => console.log('editUserSettings UI language changed.'));
                }
                const patch = this.calculatePatch();
                if (!Utils.isUndefined(patch) && !Utils.isEmpty(patch)) {
                    const observable = this.userSettingsService.patch(patch);
                    Utils.subscribe(observable, response => {
                        if (this.userSettingsService.userSettings) {
                            this.setNewValue(this.userSettingsService.userSettings, patch);
                        }
                        console.log('editUserSettings saved.');
                    }, error => console.log('editUserSettings save failed: ', error));
                }
            }
        };
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form,
                action: onOkClicked
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    setNewValue(obj, newObj) {
        for (const key of Object.keys(newObj)) {
            const value = newObj[key];
            if (value === null) {
                /* NOTE: Don't use delete obj[key] because some component may put an observer on the user settings property */
                obj[key] = undefined;
            }
            else if (Utils.isObject(value)) {
                if (Utils.isDate(value)) {
                    obj[key] = new Date(value.valueOf());
                }
                else if (Utils.isRegExp(value)) {
                    obj[key] = new RegExp(value);
                }
                else if (Utils.isArray(value)) {
                    obj[key] = value.slice(0); // clone the array
                }
                else {
                    if (!Utils.isObject(obj[key])) {
                        obj[key] = Utils.isArray(value) ? [] : {};
                    }
                    this.setNewValue(obj[key], value);
                }
            }
            else {
                obj[key] = value;
            }
        }
    }
    /**
     * Calculates the update patch for user settings.
     *
     * @returns the update patch.
     */
    calculatePatch() {
        const patch = {};
        Object.keys(this.form.value).forEach(key => {
            const formValue = this.ensureType(this.layout[key], this.readFormValue(key));
            const paths = Utils.split(this.layout[key].path, '.');
            const currentValue = this.userSettingsService.readUserSetting(paths);
            let includedInPatch = false;
            if (!Utils.isUndefined(currentValue)) {
                if (formValue !== currentValue) {
                    includedInPatch = true;
                }
            }
            else {
                if (!Utils.isUndefined(formValue)) {
                    includedInPatch = true;
                }
            }
            if (includedInPatch) {
                this.setValue(patch, paths, formValue);
            }
        });
        return patch;
    }
    /**
     * Ensures that the form value is of the same type as the user setting before saving it.
     *
     * @param entryInfo The entry information.
     * @param value The form value.
     * @returns The conformed value for the user setting.
     */
    ensureType(entryInfo, value) {
        const inputType = entryInfo.type;
        const valueType = entryInfo.valueType;
        switch (valueType) {
            case JsonInfo.ValueType.Bool:
                // For the case of boolean, we ignore the input type because we only support having a JSON boolean
                return !!value;
            case JsonInfo.ValueType.Date:
                return this.cast(inputType, value, Utils.asDate);
            case JsonInfo.ValueType.Int:
            case JsonInfo.ValueType.Number:
                return this.cast(inputType, value, Utils.asNumber);
            case JsonInfo.ValueType.String:
            default:
                return this.cast(inputType, value, Utils.asString);
        }
    }
    /**
     * Casts the value of a given type to another type.
     * <p>
     * If the given value is of array type, it is casted into another array containing element of the
     * desired type.
     *
     * @template T The desired type after casting.
     * @param inputType The type of form input where the value comes.
     * @param value The value to cast.
     * @param castFn The casting function.
     * @returns the cast result.
     */
    cast(inputType, value, castFn) {
        if (Utils.isArray(value)) {
            const array = value;
            const empty = array.length === 0;
            switch (inputType) {
                case JsonInfo.InputType.Entry:
                    return !empty ? castFn(array[0]) : undefined;
                case JsonInfo.InputType.MultiEntry:
                case JsonInfo.InputType.Range:
                    const result = [];
                    for (const v of array) {
                        result.push(castFn(v));
                    }
                    return result;
            }
            return undefined;
        }
        return castFn(value);
    }
    /**
     * Reads the form value for the given entry.
     *
     * @param key The entry key.
     * @returns The form value.
     */
    readFormValue(key) {
        const formValue = this.form.value[key];
        if (Utils.isArray(formValue)) {
            switch (this.layout[key].type) {
                case JsonInfo.InputType.Entry:
                    // The entry is single-value type whereas its corresponding form control has an array value.
                    // This should be because its form control is represented by a Select component.
                    // The array value should be then a singleton array, we simply return the first element.
                    const array = formValue;
                    if (array.length !== 1) {
                        console.log('editUserSettings.readFormValue not a singleton array.');
                    }
                    return array[0];
                case JsonInfo.InputType.MultiEntry:
                    break;
                case JsonInfo.InputType.Range:
                    break;
            }
        }
        return formValue;
    }
    /**
     * Sets a JSON value.
     *
     * @param json The JSON to set.
     * @param paths The path of the value in the JSON.
     * @param value The value to set.
     */
    setValue(json, paths, value) {
        const nbPaths = paths.length;
        if (nbPaths > 1) {
            for (let i = 0; i < nbPaths - 1; ++i) {
                const path = paths[i];
                if (!json[path]) {
                    json[path] = {};
                }
                json = json[path];
            }
        }
        json[paths[nbPaths - 1]] = Utils.isEmpty(value) ? null : value;
    }
    /**
     * Indicates the height of the dialog content to trigger scroll behavior when there are too many input controls.
     *
     * @return the height of the dialog content to trigger scroll behavior when there are too many input controls.
     */
    get maxHeight() {
        //If size is undefined use 5 as default
        return (((this.visibleThreshold | 0) || 5) * 10) + "ex";
    }
}
BsEditUserSettings.ɵfac = function BsEditUserSettings_Factory(t) { return new (t || BsEditUserSettings)(ɵɵdirectiveInject(UserSettingsWebService), ɵɵdirectiveInject(IntlService), ɵɵdirectiveInject(FormBuilder)); };
BsEditUserSettings.ɵcmp = ɵɵdefineComponent({ type: BsEditUserSettings, selectors: [["sq-edit-user-settings"]], inputs: { visibleThreshold: "visibleThreshold", showUILanguageSelector: "showUILanguageSelector" }, decls: 4, vars: 8, consts: [["name", "editUserSettings", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "sq-user-settings-modal-body"], [3, "form", "model", "layout"]], template: function BsEditUserSettings_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelement(3, "sq-user-settings-editor", 3);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#editUserSettings.title")("buttons", ctx.buttons);
        ɵɵadvance(1);
        ɵɵstyleProp("max-height", ctx.maxHeight);
        ɵɵadvance(1);
        ɵɵproperty("form", ctx.form)("model", ctx.model)("layout", ctx.layout);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsEditUserSettings, [{
        type: Component,
        args: [{
                selector: 'sq-edit-user-settings',
                templateUrl: './edit-user-settings.html'
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: IntlService }, { type: FormBuilder }]; }, { visibleThreshold: [{
            type: Input
        }], showUILanguageSelector: [{
            type: Input
        }] }); })();

function BsUserSettingsEditor_option_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "option", 5);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const locale_r1 = ctx.$implicit;
    ɵɵproperty("value", locale_r1.name);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 2, locale_r1.display));
} }
/**
 * Editor for User settings.
 * <p>
 * This component can add form control for modifiable settings which are not shown by JsonEditor component.
 *
 */
class BsUserSettingsEditor {
    constructor(appService, intlService, formBuilder) {
        this.appService = appService;
        this.intlService = intlService;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        if (!this.appService.app) {
            return; // logout
        }
        // Locale is treated separately because it is not really stored in the user settings.
        this.locales = [];
        if (this.intlService.locales.length > 0) {
            for (const locale of this.intlService.locales) {
                this.locales.push(locale);
            }
        }
        this.model['language'] = this.intlService.currentLocale.name;
        this.form.addControl('selectedLocale', this.formBuilder.control(this.intlService.currentLocale.name));
        /*
                if (this.config && this.config.items) {
                    this.config.items.forEach(item => {
                        if (item.active && JsonEditor.isInputComponent(item)) {
                            const entry = <JsonInfo.Entry>item;
                            const paths = Utils.split(entry.path, '.');
                            const pathLength = paths.length;
                            const currentValue = this.userSettingsService.readUserSetting(paths)
                            const entryKey = paths[pathLength - 1];
        
                            // Add model value
                            this.setModelValue(paths, currentValue);
        
                            // Add layout
                            this.layout[entryKey] = entry;
        
                            // Add form control
                            this.form.addControl(
                                entryKey,
                                this.formBuilder.control(currentValue, Validators.compose(JsonEditor.makeValidatorFunctions(entry, this.validationService))));
                        }
                    });
                }
                */
    }
    /**
     * Sets the current value of an entry to our JSON model.
     *
     * @param paths The paths to the entry in the JSON model.
     * @param value The value to set.
     */
    /*private setModelValue(paths: string[], value: any): void {
        const nbPaths = paths.length;
        let json = this.model;
        if (nbPaths > 1) {
            for (let i = 0; i < nbPaths - 1; ++i) {
                const path = paths[i];
                if (!json[path]) {
                    json[path] = {};
                }
                json = json[path];
            }
        }

        const key = paths[nbPaths - 1];
        json[key] = value;
    }*/
    /**
     * Indicates if the UI language selector is shown in the User settings editor dialog.
     * By default, returns true.
     *
     * @returns true if the UI language selector is shown in the User settings editor dialog.
     */
    showLanguageSelector() {
        return this.showUILanguageSelector;
    }
}
BsUserSettingsEditor.ɵfac = function BsUserSettingsEditor_Factory(t) { return new (t || BsUserSettingsEditor)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(IntlService), ɵɵdirectiveInject(FormBuilder)); };
BsUserSettingsEditor.ɵcmp = ɵɵdefineComponent({ type: BsUserSettingsEditor, selectors: [["sq-user-settings-editor"]], inputs: { form: "form", model: "model", layout: "layout", showUILanguageSelector: "showUILanguageSelector" }, decls: 7, vars: 7, consts: [[3, "formGroup"], [1, "form-group", 2, "margin-bottom", "0", 3, "hidden"], ["for", "locales"], ["formControlName", "selectedLocale", "id", "selectedLocale", "sqAutofocus", "", 1, "form-control", "custom-select", 3, "sqValidation"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function BsUserSettingsEditor_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵelementStart(1, "div", 1);
        ɵɵelementStart(2, "label", 2);
        ɵɵtext(3);
        ɵɵpipe(4, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(5, "select", 3);
        ɵɵtemplate(6, BsUserSettingsEditor_option_6_Template, 3, 4, "option", 4);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("hidden", !ctx.showLanguageSelector());
        ɵɵadvance(2);
        ɵɵtextInterpolate(ɵɵpipeBind1(4, 5, "msg#editUserSettings.language"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.locales);
    } }, directives: [NgControlStatusGroup, FormGroupDirective, SelectControlValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective, NgForOf, NgSelectOption, ɵangular_packages_forms_forms_x], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsUserSettingsEditor, [{
        type: Component,
        args: [{
                selector: 'sq-user-settings-editor',
                templateUrl: './user-settings-editor.html'
            }]
    }], function () { return [{ type: AppService }, { type: IntlService }, { type: FormBuilder }]; }, { form: [{
            type: Input
        }], model: [{
            type: Input
        }], layout: [{
            type: Input
        }], showUILanguageSelector: [{
            type: Input
        }] }); })();

const _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsUserMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
class BsUserMenuComponent {
    constructor(principalService, authenticationService, intlService, loginService, modalService, appService, userSettingsService, notificationsService, changeDetectorRef) {
        // Actions objects are initialized in the constructor
        this.principalService = principalService;
        this.authenticationService = authenticationService;
        this.intlService = intlService;
        this.loginService = loginService;
        this.modalService = modalService;
        this.appService = appService;
        this.userSettingsService = userSettingsService;
        this.notificationsService = notificationsService;
        this.changeDetectorRef = changeDetectorRef;
        this.icon = "fas fa-user";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = 'xl';
        this.collapseBreakpoint = 'sm';
        // User Menu
        // Login
        this.loginAction = new Action({
            text: "msg#userMenu.login",
            title: "msg#userMenu.login",
            action: () => {
                this.loginService.login();
            }
        });
        // Logout
        this.logoutAction = new Action({
            text: "msg#userMenu.logout",
            title: "msg#userMenu.logout",
            action: () => {
                this.loginService.logout();
                this.changeDetectorRef.markForCheck();
            }
        });
        // Override a user's identity
        this.overrideAction = new Action({
            text: "msg#userMenu.overrideUser",
            title: "msg#userMenu.overrideUser",
            action: () => {
                let userOverride = this.authenticationService.userOverride ?
                    Utils.copy(this.authenticationService.userOverride) : undefined;
                if (!userOverride) {
                    userOverride = {
                        userName: "",
                        domain: ""
                    };
                }
                this.modalService.open(BsOverrideUser, { model: userOverride })
                    .then((result) => {
                    if (result === -1 /* OK */) {
                        this.loginService.overrideUser(userOverride);
                        this.changeDetectorRef.markForCheck();
                    }
                });
            }
        });
        // Cancel user override
        this.revertOverrideAction = new Action({
            text: "msg#userMenu.revertUserOverride",
            title: "msg#userMenu.revertUserOverride",
            action: () => {
                this.loginService.overrideUser(undefined);
                this.changeDetectorRef.markForCheck();
            }
        });
        // Link to the admin
        this.adminAction = new Action({
            text: "msg#userMenu.administration",
            title: "msg#userMenu.administration",
            href: this.appService.adminUrl
        });
        // Language menu
        this.languageAction = new Action({
            text: "msg#userMenu.language",
            title: "msg#userMenu.language",
            children: this.intlService.locales.map(locale => new Action({
                text: locale.display,
                title: locale.display,
                data: locale,
                selected: locale === this.intlService.currentLocale,
                iconAfter: "sq-image sq-flag-" + locale.name,
                action: (item, $event) => {
                    this.intlService.use(item.data.name).subscribe((value) => this.languageAction.children.forEach(a => a.update()));
                },
                updater: (action) => {
                    action.selected = action.data === this.intlService.currentLocale;
                }
            }))
        });
        this.resetUserSettings = new Action({
            text: "msg#userMenu.resetUserSettings.menu",
            title: "msg#userMenu.resetUserSettings.menu",
            action: () => {
                this.modalService.confirm({
                    title: "msg#userMenu.resetUserSettings.modalTitle",
                    message: "msg#userMenu.resetUserSettings.modalMessage",
                    buttons: [
                        new ModalButton({ result: -1 /* OK */, text: "msg#userMenu.resetUserSettings.modalConfirmButton" }),
                        new ModalButton({ result: -2 /* Cancel */, primary: true })
                    ],
                    confirmType: 2 /* Warning */
                }).then(res => {
                    if (res === -1 /* OK */) {
                        this.userSettingsService.reset().subscribe({
                            next: () => this.notificationsService.notify(0 /* Success */, "msg#userMenu.resetUserSettings.successMessage"),
                            error: () => this.notificationsService.notify(3 /* Error */, "msg#userMenu.resetUserSettings.errorMessage")
                        });
                    }
                });
            }
        });
    }
    ngOnInit() {
        this.updateMenu();
        this._loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
        this._principalSubscription = this.principalService.events.subscribe(event => {
            this.updateMenu();
        });
    }
    ngOnDestroy() {
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
        }
        if (this._principalSubscription) {
            this._principalSubscription.unsubscribe();
        }
    }
    updateMenu() {
        const userActions = [];
        if (!this.principalService.principal && !this.authenticationService.userOverrideActive) {
            userActions.push(this.loginAction);
        }
        if (this.principalService.principal) {
            userActions.push(this.logoutAction);
        }
        if (this.authenticationService.userOverrideActive) {
            userActions.push(this.revertOverrideAction);
        }
        if (this.principalService.principal && this.principalService.principal.isAdministrator) {
            userActions.push(this.overrideAction);
        }
        if (this.principalService.principal && (this.principalService.principal.isAdministrator || this.principalService.principal.isDelegatedAdmin)) {
            userActions.push(this.adminAction);
        }
        if (this.loginService.complete) {
            userActions.push(this.resetUserSettings);
        }
        userActions.push(new Action({ separator: true }));
        if (this.intlService.locales.length > 1) {
            userActions.push(this.languageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: this.loginService.complete && this.principalService.principal ? this.principalService.principal.name || "msg#userMenu.user" : "msg#userMenu.user",
            children: userActions
        });
    }
}
BsUserMenuComponent.ɵfac = function BsUserMenuComponent_Factory(t) { return new (t || BsUserMenuComponent)(ɵɵdirectiveInject(PrincipalWebService), ɵɵdirectiveInject(AuthenticationService), ɵɵdirectiveInject(IntlService), ɵɵdirectiveInject(LoginService), ɵɵdirectiveInject(ModalService), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(UserSettingsWebService), ɵɵdirectiveInject(NotificationsService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsUserMenuComponent.ɵcmp = ɵɵdefineComponent({ type: BsUserMenuComponent, selectors: [["sq-user-menu"]], inputs: { icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsUserMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsUserMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [NgIf, BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsUserMenuComponent, [{
        type: Component,
        args: [{
                selector: 'sq-user-menu',
                templateUrl: './user-menu.component.html'
            }]
    }], function () { return [{ type: PrincipalWebService }, { type: AuthenticationService }, { type: IntlService }, { type: LoginService }, { type: ModalService }, { type: AppService }, { type: UserSettingsWebService }, { type: NotificationsService }, { type: ChangeDetectorRef }]; }, { icon: [{
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

class BsUserSettingsModule {
}
BsUserSettingsModule.ɵmod = ɵɵdefineNgModule({ type: BsUserSettingsModule });
BsUserSettingsModule.ɵinj = ɵɵdefineInjector({ factory: function BsUserSettingsModule_Factory(t) { return new (t || BsUserSettingsModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            IntlModule,
            ValidationModule,
            BsModalModule,
            BsActionModule,
            UtilsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsUserSettingsModule, { declarations: [BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        IntlModule,
        ValidationModule,
        BsModalModule,
        BsActionModule,
        UtilsModule], exports: [BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsUserSettingsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    IntlModule,
                    ValidationModule,
                    BsModalModule,
                    BsActionModule,
                    UtilsModule,
                ],
                declarations: [
                    BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
                ],
                exports: [
                    BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
                ],
            }]
    }], null, null); })();
ɵɵsetComponentScope(BsEditUserSettings, [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, BsUserSettingsEditor], []);

var _enUserSettings = {
    "userMenu": {
        "user": "User",
        "login": "Login",
        "overrideUser": "Override User",
        "settings": "Settings",
        "revertUserOverride": "Revert User Override",
        "administration": "Administration",
        "logout": "Logout",
        "language": "Language",
        "resetUserSettings": {
            "menu": "Reset user settings",
            "modalTitle": "Reset user settings",
            "modalMessage": "You are about to reset ALL your user data (recent queries, collections, alerts, preferences, etc.). Do you want to continue?",
            "modalConfirmButton": "Confirm",
            "successMessage": "Reset user settings succefully",
            "errorMessage": "Reset user settings failed"
        }
    },
    "editUserSettings": {
        "title": "Settings",
        "language": "UI Language",
        "pageSize": "Number of results per page",
        "email": "Email"
    }
};

var _frUserSettings = {
    "userMenu": {
        "user": "Utilisateur",
        "login": "S'identifier",
        "overrideUser": "Surcharger l'utilisateur",
        "settings": "Paramètres",
        "revertUserOverride": "Revenir à l'utilisateur normal",
        "administration": "Administration",
        "logout": "Se déconnecter",
        "language": "Langue",
        "resetUserSettings": {
            "menu": "Réinitialiser les paramètres utilisateur",
            "modalTitle": "Réinitialiser Paramètres Utilisateur",
            "modalMessage": "Vous êtes sur le point de réinitialiser TOUTES vos données utilisateur (requêtes récentes, collections, alertes, préférences, etc.). Voulez-vous continuer ?",
            "modalConfirmButton": "Confirmer",
            "successMessage": "Réinitialisation des paramètres utilisateur réussie",
            "errorMessage": "Echec de la réinitialisation des paramètres utilisateur"
        }
    },
    "editUserSettings": {
        "title": "Paramètres",
        "language": "Langue de l'interface",
        "pageSize": "Nombre de résultats par page",
        "email": "E-mail"
    }
};

var _deUserSettings = {
    "userMenu": {
        "user": "Benutzer",
        "login": "Anmeldung",
        "overrideUser": "Benutzer wechseln",
        "settings": "Einstellungen",
        "revertUserOverride": "Zum Administrator zurückkehren",
        "administration": "Administration",
        "logout": "Abmeldung",
        "language": "Sprache",
        "resetUserSettings": {
            "menu": "Benutzereinstellungen zurücksetzen",
            "modalTitle": "Benutzereinstellungen zurücksetzen",
            "modalMessage": "Sie sind dabei, ALLE Ihre Benutzerdaten zurückzusetzen (letzte Abfragen, Sammlungen, Warnungen, Einstellungen usw.). Möchtest du fortfahren?",
            "modalConfirmButton": "Bestätigen",
            "successMessage": "Benutzereinstellungen erfolgreich zurücksetzen",
            "errorMessage": "Benutzereinstellungen zurücksetzen fehlgeschlagen"
        }
    },
    "editUserSettings": {
        "title": "Einstellungen",
        "language": "Sprache der Benutzeroberfläche",
        "pageSize": "Anzahl der Ergebnisse pro Seite",
        "email": "E-Mail"
    }
};

const enUserSettings = Utils.merge({}, _enUserSettings, enModal);
const frUserSettings = Utils.merge({}, _frUserSettings, frModal);
const deUserSettings = Utils.merge({}, _deUserSettings, deModal);

/**
 * The role of this service is to bundle together the simple preferences of
 * the user and synchronise them with the user settings.
 *
 * Usage:
 * this.userPreferences.get("foo")
 * this.userPreferences.set("foo", "bar")
 * this.userPreferences.sync()
 */
class UserPreferences {
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
UserPreferences.ɵfac = function UserPreferences_Factory(t) { return new (t || UserPreferences)(ɵɵinject(UserSettingsWebService)); };
UserPreferences.ɵprov = ɵɵdefineInjectable({ token: UserPreferences, factory: UserPreferences.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(UserPreferences, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: UserSettingsWebService }]; }, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { BsEditUserSettings, BsUserMenuComponent, BsUserSettingsEditor, BsUserSettingsModule, JsonInfo, UserPreferences, deUserSettings, enUserSettings, frUserSettings };
//# sourceMappingURL=sinequa-components-user-settings.js.map
