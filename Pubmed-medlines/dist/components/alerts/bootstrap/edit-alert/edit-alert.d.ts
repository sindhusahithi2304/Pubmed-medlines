import { OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ModalRef, ModalButton } from "@sinequa/core/modal";
import { AlertsService, Alert } from "../../alerts.service";
import { SearchService } from "@sinequa/components/search";
import { KeyValue } from "@angular/common";
import * as i0 from "@angular/core";
export declare class BsEditAlert implements OnInit, OnDestroy {
    model: {
        alert: Alert;
        searchRoute?: string;
    };
    private formBuilder;
    private searchService;
    private alertsService;
    private modalRef;
    form: FormGroup;
    formChanges: Subscription;
    buttons: ModalButton[];
    frequencies: Alert.Frequency[];
    frequency: typeof Alert.Frequency;
    canUpdateQuery: boolean;
    updateQuery: boolean;
    weekdays: {
        monday: Alert.Days;
        tuesday: Alert.Days;
        wednesday: Alert.Days;
        thursday: Alert.Days;
        friday: Alert.Days;
        saturday: Alert.Days;
        sunday: Alert.Days;
    };
    showDirtyMessage: boolean;
    originalOrder: (a: KeyValue<string, Alert.Days>, b: KeyValue<string, Alert.Days>) => number;
    private alertDaysControl;
    private alertNameControl;
    private alertFrequencyControl;
    private alertTimesControl;
    private alertActiveControl;
    private updateQueryControl;
    constructor(model: {
        alert: Alert;
        searchRoute?: string;
    }, formBuilder: FormBuilder, searchService: SearchService, alertsService: AlertsService, modalRef: ModalRef);
    get alert(): Alert;
    ngOnInit(): void;
    private createButtons;
    private createYesNoButtons;
    ngOnDestroy(): void;
    dayChecked(day: Alert.Days): boolean;
    dayChange(event: UIEvent, day: Alert.Days): void;
    runQuery(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsEditAlert, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsEditAlert, "sq-edit-alert", never, {}, {}, never, never>;
}
//# sourceMappingURL=edit-alert.d.ts.map