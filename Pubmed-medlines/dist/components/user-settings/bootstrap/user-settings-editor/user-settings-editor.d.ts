import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from "@sinequa/core/app-utils";
import { Locale, IntlService } from "@sinequa/core/intl";
import { MapOf } from "@sinequa/core/base";
import { JsonInfo } from "../edit-user-settings/edit-user-settings";
import * as i0 from "@angular/core";
/**
 * Editor for User settings.
 * <p>
 * This component can add form control for modifiable settings which are not shown by JsonEditor component.
 *
 */
export declare class BsUserSettingsEditor implements OnInit {
    private appService;
    private intlService;
    private formBuilder;
    form: FormGroup;
    model: MapOf<any>;
    layout: MapOf<JsonInfo.Entry>;
    showUILanguageSelector: boolean;
    locales: Locale[];
    constructor(appService: AppService, intlService: IntlService, formBuilder: FormBuilder);
    ngOnInit(): void;
    /**
     * Sets the current value of an entry to our JSON model.
     *
     * @param paths The paths to the entry in the JSON model.
     * @param value The value to set.
     */
    /**
     * Indicates if the UI language selector is shown in the User settings editor dialog.
     * By default, returns true.
     *
     * @returns true if the UI language selector is shown in the User settings editor dialog.
     */
    showLanguageSelector(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsUserSettingsEditor, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsUserSettingsEditor, "sq-user-settings-editor", never, { "form": "form"; "model": "model"; "layout": "layout"; "showUILanguageSelector": "showUILanguageSelector"; }, {}, never, never>;
}
//# sourceMappingURL=user-settings-editor.d.ts.map