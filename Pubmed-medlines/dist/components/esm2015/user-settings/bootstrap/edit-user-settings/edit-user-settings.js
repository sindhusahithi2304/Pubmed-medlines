import { Component, Input } from '@angular/core';
import { ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/core/intl";
import * as i3 from "@angular/forms";
export var JsonInfo;
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
export class BsEditUserSettings {
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
BsEditUserSettings.ɵfac = function BsEditUserSettings_Factory(t) { return new (t || BsEditUserSettings)(i0.ɵɵdirectiveInject(i1.UserSettingsWebService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵdirectiveInject(i3.FormBuilder)); };
BsEditUserSettings.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditUserSettings, selectors: [["sq-edit-user-settings"]], inputs: { visibleThreshold: "visibleThreshold", showUILanguageSelector: "showUILanguageSelector" }, decls: 4, vars: 8, consts: [["name", "editUserSettings", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "sq-user-settings-modal-body"], [3, "form", "model", "layout"]], template: function BsEditUserSettings_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵelement(3, "sq-user-settings-editor", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#editUserSettings.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(1);
        i0.ɵɵstyleProp("max-height", ctx.maxHeight);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("form", ctx.form)("model", ctx.model)("layout", ctx.layout);
    } }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsEditUserSettings, [{
        type: Component,
        args: [{
                selector: 'sq-edit-user-settings',
                templateUrl: './edit-user-settings.html'
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.IntlService }, { type: i3.FormBuilder }]; }, { visibleThreshold: [{
            type: Input
        }], showUILanguageSelector: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC11c2VyLXNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvdXNlci1zZXR0aW5ncy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9lZGl0LXVzZXItc2V0dGluZ3MvZWRpdC11c2VyLXNldHRpbmdzLnRzIiwiYm9vdHN0cmFwL2VkaXQtdXNlci1zZXR0aW5ncy9lZGl0LXVzZXItc2V0dGluZ3MuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsV0FBVyxFQUFlLE1BQU0scUJBQXFCLENBQUM7QUFFL0QsT0FBTyxFQUFTLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7OztBQUlsRCxNQUFNLEtBQVEsUUFBUSxDQXdDckI7QUF4Q0QsV0FBYyxRQUFRO0lBYWxCLElBQVksU0FJWDtJQUpELFdBQVksU0FBUztRQUNqQixxQ0FBd0IsQ0FBQTtRQUN4QixxQ0FBd0IsQ0FBQTtRQUN4QiwrQ0FBa0MsQ0FBQTtJQUN0QyxDQUFDLEVBSlcsU0FBUyxHQUFULGtCQUFTLEtBQVQsa0JBQVMsUUFJcEI7SUFFRCxJQUFZLFNBTVg7SUFORCxXQUFZLFNBQVM7UUFDakIsOEJBQWlCLENBQUE7UUFDakIsd0JBQVcsQ0FBQTtRQUNYLDhCQUFpQixDQUFBO1FBQ2pCLDBCQUFhLENBQUE7UUFDYiwwQkFBYSxDQUFBO0lBQ2pCLENBQUMsRUFOVyxTQUFTLEdBQVQsa0JBQVMsS0FBVCxrQkFBUyxRQU1wQjtBQWVMLENBQUMsRUF4Q2EsUUFBUSxLQUFSLFFBQVEsUUF3Q3JCO0FBRUQ7OztHQUdHO0FBS0gsTUFBTSxPQUFPLGtCQUFrQjtJQVUzQixZQUNZLG1CQUEyQyxFQUMzQyxXQUF3QixFQUN4QixXQUF3QjtRQUZ4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXdCO1FBQzNDLGdCQUFXLEdBQVgsV0FBVyxD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SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNb2RhbEJ1dHRvbiwgTW9kYWxSZXN1bHQgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHsgVXNlclNldHRpbmdzV2ViU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHsgTWFwT2YsIFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgSW50bFNlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmV4cG9ydCBtb2R1bGUgSnNvbkluZm8ge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgRW50cnkge1xuICAgICAgICB0eXBlOiBzdHJpbmc7XG4gICAgICAgIHBhdGg6IHN0cmluZztcbiAgICAgICAgdmFsdWVUeXBlOiBzdHJpbmc7XG4gICAgICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgICAgIGxpc3Q/OiBzdHJpbmc7XG4gICAgICAgIHBhdHRlcm4/OiBzdHJpbmc7XG4gICAgICAgIG1pbj86IG51bWJlciB8IERhdGU7XG4gICAgICAgIG1heD86IG51bWJlciB8IERhdGU7XG4gICAgICAgIHZhbGlkYXRvcnM/OiBWYWxpZGF0b3JbXTtcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBJbnB1dFR5cGUge1xuICAgICAgICBFbnRyeSA9ICdKc29uRW50cnlJbnB1dCcsXG4gICAgICAgIFJhbmdlID0gJ0pzb25SYW5nZUlucHV0JyxcbiAgICAgICAgTXVsdGlFbnRyeSA9ICdKc29uTXVsdGlFbnRyeUlucHV0JyxcbiAgICB9XG5cbiAgICBleHBvcnQgZW51bSBWYWx1ZVR5cGUge1xuICAgICAgICBTdHJpbmcgPSAnU3RyaW5nJyxcbiAgICAgICAgSW50ID0gJ0ludCcsXG4gICAgICAgIE51bWJlciA9ICdOdW1iZXInLFxuICAgICAgICBEYXRlID0gJ0RhdGUnLFxuICAgICAgICBCb29sID0gJ0Jvb2wnLFxuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRW50cnlJbnB1dCBleHRlbmRzIEVudHJ5IHtcbiAgICAgICAgdHlwZTogSW5wdXRUeXBlLkVudHJ5O1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUmFuZ2VJbnB1dCBleHRlbmRzIEVudHJ5IHtcbiAgICAgICAgdHlwZTogSW5wdXRUeXBlLlJhbmdlO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTXVsdGlFbnRyeUlucHV0IGV4dGVuZHMgRW50cnkge1xuICAgICAgICB0eXBlOiBJbnB1dFR5cGUuTXVsdGlFbnRyeTtcbiAgICAgICAgZGlzdGluY3Q/OiBib29sZWFuO1xuICAgICAgICBuYlZpc2libGVMaW5lcz86IG51bWJlcjtcbiAgICB9XG59XG5cbi8qKlxuICogT3BlbnMgYSBkaWFsb2cgdG8gbW9kaWZ5IHRoZSB1c2VyIHNldHRpbmdzLlxuICpcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzcS1lZGl0LXVzZXItc2V0dGluZ3MnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9lZGl0LXVzZXItc2V0dGluZ3MuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQnNFZGl0VXNlclNldHRpbmdzIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHZpc2libGVUaHJlc2hvbGQgPSAwO1xuICAgIEBJbnB1dCgpIHNob3dVSUxhbmd1YWdlU2VsZWN0b3I/OiBib29sZWFuO1xuXG4gICAgcHVibGljIG1vZGVsOiBNYXBPZjxhbnk+O1xuICAgIHB1YmxpYyBsYXlvdXQ6IE1hcE9mPEpzb25JbmZvLkVudHJ5PjtcbiAgICBwdWJsaWMgZm9ybTogRm9ybUdyb3VwO1xuICAgIHB1YmxpYyBidXR0b25zOiBNb2RhbEJ1dHRvbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdXNlclNldHRpbmdzU2VydmljZTogVXNlclNldHRpbmdzV2ViU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxheW91dCA9IHt9O1xuICAgICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICAgICAgJ2xhbmd1YWdlJzogdGhpcy5pbnRsU2VydmljZS5jdXJyZW50TG9jYWxlLm5hbWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgICAgICAnc2VsZWN0ZWRMb2NhbGUnOiBbdGhpcy5pbnRsU2VydmljZS5jdXJyZW50TG9jYWxlLm5hbWVdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9uT2tDbGlja2VkID0gKF8pID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0uZGlydHkpIHtcbiAgICAgICAgICAgICAgICAvLyBMb2NhbGUgaXMgdHJlYXRlZCBzZXBhcmF0ZWx5IGJlY2F1c2UgaXQgaXMgbm90IHJlYWxseSBzdG9yZWQgaW4gdGhlIHVzZXIgc2V0dGluZ3MuXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TG9jYWxlID0gdGhpcy5mb3JtLnZhbHVlWydzZWxlY3RlZExvY2FsZSddO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5yZW1vdmVDb250cm9sKCdzZWxlY3RlZExvY2FsZScpO1xuICAgICAgICAgICAgICAgIGlmICghVXRpbHMuZXFOQyh0aGlzLm1vZGVsWydsYW5ndWFnZSddLCBuZXdMb2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIFV0aWxzLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50bFNlcnZpY2UudXNlKG5ld0xvY2FsZSksXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9PiBjb25zb2xlLmxvZygnZWRpdFVzZXJTZXR0aW5ncyBVSSBsYW5ndWFnZSBjaGFuZ2VkLicpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgcGF0Y2ggPSB0aGlzLmNhbGN1bGF0ZVBhdGNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFVdGlscy5pc1VuZGVmaW5lZChwYXRjaCkgJiYgIVV0aWxzLmlzRW1wdHkocGF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UucGF0Y2gocGF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICBVdGlscy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWUodGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncywgcGF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZWRpdFVzZXJTZXR0aW5ncyBzYXZlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZygnZWRpdFVzZXJTZXR0aW5ncyBzYXZlIGZhaWxlZDogJywgZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIG5ldyBNb2RhbEJ1dHRvbih7XG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5PSyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb246IHRoaXMuZm9ybSBhcyBhbnksXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBvbk9rQ2xpY2tlZFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TmV3VmFsdWUob2JqOiBNYXBPZjxhbnk+LCBuZXdPYmo6IE1hcE9mPGFueT4pOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobmV3T2JqKSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBuZXdPYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8qIE5PVEU6IERvbid0IHVzZSBkZWxldGUgb2JqW2tleV0gYmVjYXVzZSBzb21lIGNvbXBvbmVudCBtYXkgcHV0IGFuIG9ic2VydmVyIG9uIHRoZSB1c2VyIHNldHRpbmdzIHByb3BlcnR5ICovXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IG5ldyBEYXRlKHZhbHVlLnZhbHVlT2YoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKFV0aWxzLmlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IG5ldyBSZWdFeHAodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlLnNsaWNlKDApOyAvLyBjbG9uZSB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghVXRpbHMuaXNPYmplY3Qob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpba2V5XSA9IFV0aWxzLmlzQXJyYXkodmFsdWUpID8gW10gOiB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5ld1ZhbHVlKG9ialtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIHVwZGF0ZSBwYXRjaCBmb3IgdXNlciBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHRoZSB1cGRhdGUgcGF0Y2guXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVQYXRjaCgpOiBNYXBPZjxhbnk+IHtcbiAgICAgICAgY29uc3QgcGF0Y2ggPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5mb3JtLnZhbHVlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmb3JtVmFsdWUgPSB0aGlzLmVuc3VyZVR5cGUodGhpcy5sYXlvdXRba2V5XSwgdGhpcy5yZWFkRm9ybVZhbHVlKGtleSkpO1xuICAgICAgICAgICAgY29uc3QgcGF0aHMgPSBVdGlscy5zcGxpdCh0aGlzLmxheW91dFtrZXldLnBhdGgsICcuJyk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UucmVhZFVzZXJTZXR0aW5nKHBhdGhzKTtcblxuICAgICAgICAgICAgbGV0IGluY2x1ZGVkSW5QYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFVdGlscy5pc1VuZGVmaW5lZChjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1WYWx1ZSAhPT0gY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGVkSW5QYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIVV0aWxzLmlzVW5kZWZpbmVkKGZvcm1WYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZWRJblBhdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbmNsdWRlZEluUGF0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFZhbHVlKHBhdGNoLCBwYXRocywgZm9ybVZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBhdGNoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuc3VyZXMgdGhhdCB0aGUgZm9ybSB2YWx1ZSBpcyBvZiB0aGUgc2FtZSB0eXBlIGFzIHRoZSB1c2VyIHNldHRpbmcgYmVmb3JlIHNhdmluZyBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRyeUluZm8gVGhlIGVudHJ5IGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgZm9ybSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJucyBUaGUgY29uZm9ybWVkIHZhbHVlIGZvciB0aGUgdXNlciBzZXR0aW5nLlxuICAgICAqL1xuICAgIHByaXZhdGUgZW5zdXJlVHlwZShlbnRyeUluZm86IEpzb25JbmZvLkVudHJ5LCB2YWx1ZTogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgaW5wdXRUeXBlID0gZW50cnlJbmZvLnR5cGUgYXMgSnNvbkluZm8uSW5wdXRUeXBlO1xuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSBlbnRyeUluZm8udmFsdWVUeXBlIGFzIEpzb25JbmZvLlZhbHVlVHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHZhbHVlVHlwZSBhcyBKc29uSW5mby5WYWx1ZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uVmFsdWVUeXBlLkJvb2w6XG4gICAgICAgICAgICAgICAgLy8gRm9yIHRoZSBjYXNlIG9mIGJvb2xlYW4sIHdlIGlnbm9yZSB0aGUgaW5wdXQgdHlwZSBiZWNhdXNlIHdlIG9ubHkgc3VwcG9ydCBoYXZpbmcgYSBKU09OIGJvb2xlYW5cbiAgICAgICAgICAgICAgICByZXR1cm4gISF2YWx1ZTtcbiAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uVmFsdWVUeXBlLkRhdGU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FzdDxEYXRlPihpbnB1dFR5cGUsIHZhbHVlLCBVdGlscy5hc0RhdGUpO1xuICAgICAgICAgICAgY2FzZSBKc29uSW5mby5WYWx1ZVR5cGUuSW50OlxuICAgICAgICAgICAgY2FzZSBKc29uSW5mby5WYWx1ZVR5cGUuTnVtYmVyOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhc3Q8bnVtYmVyPihpbnB1dFR5cGUsIHZhbHVlLCBVdGlscy5hc051bWJlcik7XG4gICAgICAgICAgICBjYXNlIEpzb25JbmZvLlZhbHVlVHlwZS5TdHJpbmc6XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhc3Q8c3RyaW5nPihpbnB1dFR5cGUsIHZhbHVlLCBVdGlscy5hc1N0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENhc3RzIHRoZSB2YWx1ZSBvZiBhIGdpdmVuIHR5cGUgdG8gYW5vdGhlciB0eXBlLlxuICAgICAqIDxwPlxuICAgICAqIElmIHRoZSBnaXZlbiB2YWx1ZSBpcyBvZiBhcnJheSB0eXBlLCBpdCBpcyBjYXN0ZWQgaW50byBhbm90aGVyIGFycmF5IGNvbnRhaW5pbmcgZWxlbWVudCBvZiB0aGVcbiAgICAgKiBkZXNpcmVkIHR5cGUuXG4gICAgICpcbiAgICAgKiBAdGVtcGxhdGUgVCBUaGUgZGVzaXJlZCB0eXBlIGFmdGVyIGNhc3RpbmcuXG4gICAgICogQHBhcmFtIGlucHV0VHlwZSBUaGUgdHlwZSBvZiBmb3JtIGlucHV0IHdoZXJlIHRoZSB2YWx1ZSBjb21lcy5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhc3QuXG4gICAgICogQHBhcmFtIGNhc3RGbiBUaGUgY2FzdGluZyBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJucyB0aGUgY2FzdCByZXN1bHQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYXN0PFQ+KFxuICAgICAgICBpbnB1dFR5cGU6IEpzb25JbmZvLklucHV0VHlwZSwgdmFsdWU6IGFueSwgY2FzdEZuOiAocGFyYW1zOiBhbnkpID0+IFQgfCB1bmRlZmluZWRcbiAgICApOiBUIHwgVFtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheSA9IHZhbHVlIGFzIGFueVtdO1xuICAgICAgICAgICAgY29uc3QgZW1wdHkgPSBhcnJheS5sZW5ndGggPT09IDA7XG4gICAgICAgICAgICBzd2l0Y2ggKGlucHV0VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uSW5wdXRUeXBlLkVudHJ5OlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWVtcHR5ID8gY2FzdEZuKGFycmF5WzBdKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjYXNlIEpzb25JbmZvLklucHV0VHlwZS5NdWx0aUVudHJ5OlxuICAgICAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uSW5wdXRUeXBlLlJhbmdlOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQ6IFRbXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHYgb2YgYXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNhc3RGbih2KSBhcyBUKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYXN0Rm4odmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWRzIHRoZSBmb3JtIHZhbHVlIGZvciB0aGUgZ2l2ZW4gZW50cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBlbnRyeSBrZXkuXG4gICAgICogQHJldHVybnMgVGhlIGZvcm0gdmFsdWUuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZWFkRm9ybVZhbHVlKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgY29uc3QgZm9ybVZhbHVlID0gdGhpcy5mb3JtLnZhbHVlW2tleV07XG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KGZvcm1WYWx1ZSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sYXlvdXRba2V5XS50eXBlIGFzIEpzb25JbmZvLklucHV0VHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uSW5wdXRUeXBlLkVudHJ5OlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZW50cnkgaXMgc2luZ2xlLXZhbHVlIHR5cGUgd2hlcmVhcyBpdHMgY29ycmVzcG9uZGluZyBmb3JtIGNvbnRyb2wgaGFzIGFuIGFycmF5IHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHNob3VsZCBiZSBiZWNhdXNlIGl0cyBmb3JtIGNvbnRyb2wgaXMgcmVwcmVzZW50ZWQgYnkgYSBTZWxlY3QgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYXJyYXkgdmFsdWUgc2hvdWxkIGJlIHRoZW4gYSBzaW5nbGV0b24gYXJyYXksIHdlIHNpbXBseSByZXR1cm4gdGhlIGZpcnN0IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gPGFueVtdPmZvcm1WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5Lmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2VkaXRVc2VyU2V0dGluZ3MucmVhZEZvcm1WYWx1ZSBub3QgYSBzaW5nbGV0b24gYXJyYXkuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5WzBdO1xuICAgICAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uSW5wdXRUeXBlLk11bHRpRW50cnk6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgSnNvbkluZm8uSW5wdXRUeXBlLlJhbmdlOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybVZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBKU09OIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGpzb24gVGhlIEpTT04gdG8gc2V0LlxuICAgICAqIEBwYXJhbSBwYXRocyBUaGUgcGF0aCBvZiB0aGUgdmFsdWUgaW4gdGhlIEpTT04uXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZShqc29uOiBNYXBPZjxhbnk+LCBwYXRoczogc3RyaW5nW10sIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmJQYXRocyA9IHBhdGhzLmxlbmd0aDtcbiAgICAgICAgaWYgKG5iUGF0aHMgPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5iUGF0aHMgLSAxOyArK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gcGF0aHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFqc29uW3BhdGhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGpzb25bcGF0aF0gPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAganNvbiA9IGpzb25bcGF0aF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBqc29uW3BhdGhzW25iUGF0aHMgLSAxXV0gPSBVdGlscy5pc0VtcHR5KHZhbHVlKSA/IG51bGwgOiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGlhbG9nIGNvbnRlbnQgdG8gdHJpZ2dlciBzY3JvbGwgYmVoYXZpb3Igd2hlbiB0aGVyZSBhcmUgdG9vIG1hbnkgaW5wdXQgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIGRpYWxvZyBjb250ZW50IHRvIHRyaWdnZXIgc2Nyb2xsIGJlaGF2aW9yIHdoZW4gdGhlcmUgYXJlIHRvbyBtYW55IGlucHV0IGNvbnRyb2xzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbWF4SGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgICAgIC8vSWYgc2l6ZSBpcyB1bmRlZmluZWQgdXNlIDUgYXMgZGVmYXVsdFxuICAgICAgICByZXR1cm4gKCgodGhpcy52aXNpYmxlVGhyZXNob2xkIHwgMCkgfHwgNSkgKiAxMCkgKyBcImV4XCI7XG4gICAgfVxufVxuIiwiPGZvcm0gbmFtZT1cImVkaXRVc2VyU2V0dGluZ3NcIiBub3ZhbGlkYXRlIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICAgIDxzcS1tb2RhbCBbdGl0bGVdPVwiJ21zZyNlZGl0VXNlclNldHRpbmdzLnRpdGxlJ1wiIFtidXR0b25zXT1cImJ1dHRvbnNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNxLXVzZXItc2V0dGluZ3MtbW9kYWwtYm9keVwiIFtzdHlsZS5tYXgtaGVpZ2h0XT1cIm1heEhlaWdodFwiPlxuICAgICAgICAgICAgPHNxLXVzZXItc2V0dGluZ3MtZWRpdG9yIFtmb3JtXT1cImZvcm1cIiBbbW9kZWxdPVwibW9kZWxcIiBbbGF5b3V0XT1cImxheW91dFwiPjwvc3EtdXNlci1zZXR0aW5ncy1lZGl0b3I+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc3EtbW9kYWw+XG48L2Zvcm0+XG4iXX0=