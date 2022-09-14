import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/app-utils";
import * as i2 from "@sinequa/core/intl";
import * as i3 from "@angular/forms";
import * as i4 from "@sinequa/components/utils";
import * as i5 from "@sinequa/core/validation";
import * as i6 from "@angular/common";
function BsUserSettingsEditor_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 5);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const locale_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", locale_r1.name);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, locale_r1.display));
} }
/**
 * Editor for User settings.
 * <p>
 * This component can add form control for modifiable settings which are not shown by JsonEditor component.
 *
 */
export class BsUserSettingsEditor {
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
BsUserSettingsEditor.ɵfac = function BsUserSettingsEditor_Factory(t) { return new (t || BsUserSettingsEditor)(i0.ɵɵdirectiveInject(i1.AppService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵdirectiveInject(i3.FormBuilder)); };
BsUserSettingsEditor.ɵcmp = i0.ɵɵdefineComponent({ type: BsUserSettingsEditor, selectors: [["sq-user-settings-editor"]], inputs: { form: "form", model: "model", layout: "layout", showUILanguageSelector: "showUILanguageSelector" }, decls: 7, vars: 7, consts: [[3, "formGroup"], [1, "form-group", 2, "margin-bottom", "0", 3, "hidden"], ["for", "locales"], ["formControlName", "selectedLocale", "id", "selectedLocale", "sqAutofocus", "", 1, "form-control", "custom-select", 3, "sqValidation"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function BsUserSettingsEditor_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "label", 2);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "sqMessage");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "select", 3);
        i0.ɵɵtemplate(6, BsUserSettingsEditor_option_6_Template, 3, 4, "option", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("hidden", !ctx.showLanguageSelector());
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 5, "msg#editUserSettings.language"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("sqValidation", ctx.form);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.locales);
    } }, directives: [i3.NgControlStatusGroup, i3.FormGroupDirective, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.FormControlName, i4.Autofocus, i5.ValidationDirective, i6.NgForOf, i3.NgSelectOption, i3.ɵangular_packages_forms_forms_x], pipes: [i2.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsUserSettingsEditor, [{
        type: Component,
        args: [{
                selector: 'sq-user-settings-editor',
                templateUrl: './user-settings-editor.html'
            }]
    }], function () { return [{ type: i1.AppService }, { type: i2.IntlService }, { type: i3.FormBuilder }]; }, { form: [{
            type: Input
        }], model: [{
            type: Input
        }], layout: [{
            type: Input
        }], showUILanguageSelector: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1zZXR0aW5ncy1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91c2VyLXNldHRpbmdzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL3VzZXItc2V0dGluZ3MtZWRpdG9yL3VzZXItc2V0dGluZ3MtZWRpdG9yLnRzIiwiYm9vdHN0cmFwL3VzZXItc2V0dGluZ3MtZWRpdG9yL3VzZXItc2V0dGluZ3MtZWRpdG9yLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztJQ0k3QyxpQ0FBNkQ7SUFBQSxZQUE4Qjs7SUFBQSxpQkFBUzs7O0lBQTVGLHNDQUFxQjtJQUFnQyxlQUE4QjtJQUE5Qiw2REFBOEI7O0FES3ZHOzs7OztHQUtHO0FBS0gsTUFBTSxPQUFPLG9CQUFvQjtJQVE3QixZQUNZLFVBQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLFdBQXdCO1FBRnhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFFcEMsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDdEIsT0FBTyxDQUFDLFNBQVM7U0FDcEI7UUFFRCxxRkFBcUY7UUFDckYsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkF1QlU7SUFDTixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFFSDs7Ozs7T0FLRztJQUNJLG9CQUFvQjtRQUN2QixPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztJQUN2QyxDQUFDOzt3RkF2RlEsb0JBQW9CO3lEQUFwQixvQkFBb0I7UUNuQmpDLDhCQUNJO1FBQUEsOEJBQ0k7UUFBQSxnQ0FBcUI7UUFBQSxZQUErQzs7UUFBQSxpQkFBUTtRQUM1RSxpQ0FDSTtRQUFBLDJFQUFvRztRQUN4RyxpQkFBUztRQUNiLGlCQUFNO1FBRVYsaUJBQU07O1FBUkQsb0NBQWtCO1FBQzhCLGVBQWtDO1FBQWxDLG9EQUFrQztRQUMxRCxlQUErQztRQUEvQywyRUFBK0M7UUFDNUQsZUFBcUI7UUFBckIsdUNBQXFCO1FBQ3dCLGVBQVU7UUFBVixxQ0FBVTs7a0REZTFELG9CQUFvQjtjQUpoQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsV0FBVyxFQUFFLDZCQUE2QjthQUM3QztpSEFHbUIsSUFBSTtrQkFBbkIsS0FBSztZQUNVLEtBQUs7a0JBQXBCLEtBQUs7WUFDVSxNQUFNO2tCQUFyQixLQUFLO1lBQ0csc0JBQXNCO2tCQUE5QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHsgTG9jYWxlLCBJbnRsU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7IE1hcE9mIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG5pbXBvcnQgeyBKc29uSW5mbyB9IGZyb20gXCIuLi9lZGl0LXVzZXItc2V0dGluZ3MvZWRpdC11c2VyLXNldHRpbmdzXCI7XG5cblxuLyoqXG4gKiBFZGl0b3IgZm9yIFVzZXIgc2V0dGluZ3MuXG4gKiA8cD5cbiAqIFRoaXMgY29tcG9uZW50IGNhbiBhZGQgZm9ybSBjb250cm9sIGZvciBtb2RpZmlhYmxlIHNldHRpbmdzIHdoaWNoIGFyZSBub3Qgc2hvd24gYnkgSnNvbkVkaXRvciBjb21wb25lbnQuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3NxLXVzZXItc2V0dGluZ3MtZWRpdG9yJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdXNlci1zZXR0aW5ncy1lZGl0b3IuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQnNVc2VyU2V0dGluZ3NFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgcHVibGljIGZvcm06IEZvcm1Hcm91cDtcbiAgICBASW5wdXQoKSBwdWJsaWMgbW9kZWw6IE1hcE9mPGFueT47XG4gICAgQElucHV0KCkgcHVibGljIGxheW91dDogTWFwT2Y8SnNvbkluZm8uRW50cnk+O1xuICAgIEBJbnB1dCgpIHNob3dVSUxhbmd1YWdlU2VsZWN0b3I6IGJvb2xlYW47XG4gICAgcHVibGljIGxvY2FsZXM6IExvY2FsZVtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXBwU2VydmljZTogQXBwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5hcHBTZXJ2aWNlLmFwcCkge1xuICAgICAgICAgICAgcmV0dXJuOyAvLyBsb2dvdXRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvY2FsZSBpcyB0cmVhdGVkIHNlcGFyYXRlbHkgYmVjYXVzZSBpdCBpcyBub3QgcmVhbGx5IHN0b3JlZCBpbiB0aGUgdXNlciBzZXR0aW5ncy5cbiAgICAgICAgdGhpcy5sb2NhbGVzID0gW107XG4gICAgICAgIGlmICh0aGlzLmludGxTZXJ2aWNlLmxvY2FsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2NhbGUgb2YgdGhpcy5pbnRsU2VydmljZS5sb2NhbGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbGVzLnB1c2gobG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kZWxbJ2xhbmd1YWdlJ10gPSB0aGlzLmludGxTZXJ2aWNlLmN1cnJlbnRMb2NhbGUubmFtZTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2woJ3NlbGVjdGVkTG9jYWxlJywgdGhpcy5mb3JtQnVpbGRlci5jb250cm9sKHRoaXMuaW50bFNlcnZpY2UuY3VycmVudExvY2FsZS5uYW1lKSk7XG4vKlxuICAgICAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5jb25maWcuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uYWN0aXZlICYmIEpzb25FZGl0b3IuaXNJbnB1dENvbXBvbmVudChpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeSA9IDxKc29uSW5mby5FbnRyeT5pdGVtO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXRocyA9IFV0aWxzLnNwbGl0KGVudHJ5LnBhdGgsICcuJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhdGhMZW5ndGggPSBwYXRocy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMudXNlclNldHRpbmdzU2VydmljZS5yZWFkVXNlclNldHRpbmcocGF0aHMpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVudHJ5S2V5ID0gcGF0aHNbcGF0aExlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBtb2RlbCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1vZGVsVmFsdWUocGF0aHMsIGN1cnJlbnRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGxheW91dFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dFtlbnRyeUtleV0gPSBlbnRyeTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZm9ybSBjb250cm9sXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKFxuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyLmNvbnRyb2woY3VycmVudFZhbHVlLCBWYWxpZGF0b3JzLmNvbXBvc2UoSnNvbkVkaXRvci5tYWtlVmFsaWRhdG9yRnVuY3Rpb25zKGVudHJ5LCB0aGlzLnZhbGlkYXRpb25TZXJ2aWNlKSkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAqL1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgYW4gZW50cnkgdG8gb3VyIEpTT04gbW9kZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aHMgVGhlIHBhdGhzIHRvIHRoZSBlbnRyeSBpbiB0aGUgSlNPTiBtb2RlbC5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAgICAgKi9cbiAgICAvKnByaXZhdGUgc2V0TW9kZWxWYWx1ZShwYXRoczogc3RyaW5nW10sIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmJQYXRocyA9IHBhdGhzLmxlbmd0aDtcbiAgICAgICAgbGV0IGpzb24gPSB0aGlzLm1vZGVsO1xuICAgICAgICBpZiAobmJQYXRocyA+IDEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmJQYXRocyAtIDE7ICsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBwYXRoc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIWpzb25bcGF0aF0pIHtcbiAgICAgICAgICAgICAgICAgICAganNvbltwYXRoXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBqc29uID0ganNvbltwYXRoXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhzW25iUGF0aHMgLSAxXTtcbiAgICAgICAganNvbltrZXldID0gdmFsdWU7XG4gICAgfSovXG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIFVJIGxhbmd1YWdlIHNlbGVjdG9yIGlzIHNob3duIGluIHRoZSBVc2VyIHNldHRpbmdzIGVkaXRvciBkaWFsb2cuXG4gICAgICogQnkgZGVmYXVsdCwgcmV0dXJucyB0cnVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgVUkgbGFuZ3VhZ2Ugc2VsZWN0b3IgaXMgc2hvd24gaW4gdGhlIFVzZXIgc2V0dGluZ3MgZWRpdG9yIGRpYWxvZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvd0xhbmd1YWdlU2VsZWN0b3IoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dVSUxhbmd1YWdlU2VsZWN0b3I7XG4gICAgfVxufVxuIiwiPGRpdiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMFwiIFtoaWRkZW5dPVwiIXNob3dMYW5ndWFnZVNlbGVjdG9yKClcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImxvY2FsZXNcIj57eydtc2cjZWRpdFVzZXJTZXR0aW5ncy5sYW5ndWFnZScgfCBzcU1lc3NhZ2V9fTwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgW3NxVmFsaWRhdGlvbl09XCJmb3JtXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgY3VzdG9tLXNlbGVjdFwiIGZvcm1Db250cm9sTmFtZT1cInNlbGVjdGVkTG9jYWxlXCIgaWQ9XCJzZWxlY3RlZExvY2FsZVwiIHNxQXV0b2ZvY3VzPlxuICAgICAgICAgICAgPG9wdGlvbiBbdmFsdWVdPVwibG9jYWxlLm5hbWVcIiAqbmdGb3I9XCJsZXQgbG9jYWxlIG9mIGxvY2FsZXNcIj57e2xvY2FsZS5kaXNwbGF5IHwgc3FNZXNzYWdlfX08L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPCEtLXNxLWpzb24tZWRpdG9yIFtmb3JtXT1cImZvcm1cIiBbbW9kZWxdPVwibW9kZWxcIiBbbGF5b3V0XT1cImxheW91dFwiIFtjb25maWddPVwiY29uZmlnXCI+PC9zcS1qc29uLWVkaXRvci0tPlxuPC9kaXY+XG4iXX0=