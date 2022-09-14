import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalButton } from "@sinequa/core/modal";
import { UserSettingsWebService } from "@sinequa/core/web-services";
import { MapOf } from "@sinequa/core/base";
import { IntlService } from "@sinequa/core/intl";
import { Validator } from "@sinequa/core/validation";
import * as i0 from "@angular/core";
export declare module JsonInfo {
    interface Entry {
        type: string;
        path: string;
        valueType: string;
        label: string;
        list?: string;
        pattern?: string;
        min?: number | Date;
        max?: number | Date;
        validators?: Validator[];
    }
    enum InputType {
        Entry = "JsonEntryInput",
        Range = "JsonRangeInput",
        MultiEntry = "JsonMultiEntryInput"
    }
    enum ValueType {
        String = "String",
        Int = "Int",
        Number = "Number",
        Date = "Date",
        Bool = "Bool"
    }
    interface EntryInput extends Entry {
        type: InputType.Entry;
    }
    interface RangeInput extends Entry {
        type: InputType.Range;
    }
    interface MultiEntryInput extends Entry {
        type: InputType.MultiEntry;
        distinct?: boolean;
        nbVisibleLines?: number;
    }
}
/**
 * Opens a dialog to modify the user settings.
 *
 */
export declare class BsEditUserSettings implements OnInit {
    private userSettingsService;
    private intlService;
    private formBuilder;
    visibleThreshold: number;
    showUILanguageSelector?: boolean;
    model: MapOf<any>;
    layout: MapOf<JsonInfo.Entry>;
    form: FormGroup;
    buttons: ModalButton[];
    constructor(userSettingsService: UserSettingsWebService, intlService: IntlService, formBuilder: FormBuilder);
    ngOnInit(): void;
    private setNewValue;
    /**
     * Calculates the update patch for user settings.
     *
     * @returns the update patch.
     */
    private calculatePatch;
    /**
     * Ensures that the form value is of the same type as the user setting before saving it.
     *
     * @param entryInfo The entry information.
     * @param value The form value.
     * @returns The conformed value for the user setting.
     */
    private ensureType;
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
    private cast;
    /**
     * Reads the form value for the given entry.
     *
     * @param key The entry key.
     * @returns The form value.
     */
    private readFormValue;
    /**
     * Sets a JSON value.
     *
     * @param json The JSON to set.
     * @param paths The path of the value in the JSON.
     * @param value The value to set.
     */
    private setValue;
    /**
     * Indicates the height of the dialog content to trigger scroll behavior when there are too many input controls.
     *
     * @return the height of the dialog content to trigger scroll behavior when there are too many input controls.
     */
    get maxHeight(): string;
    static ɵfac: i0.ɵɵFactoryDef<BsEditUserSettings, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsEditUserSettings, "sq-edit-user-settings", never, { "visibleThreshold": "visibleThreshold"; "showUILanguageSelector": "showUILanguageSelector"; }, {}, never, never>;
}
//# sourceMappingURL=edit-user-settings.d.ts.map