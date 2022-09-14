import { OnInit, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AppService, ValueItem } from "@sinequa/core/app-utils";
import { CCColumn } from "@sinequa/core/web-services";
import { FirstPageService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class BsAdvancedFormSelect implements OnInit, OnDestroy {
    private appService;
    private firstPageService;
    form: FormGroup;
    field: string;
    /** Optional label: the component looks for the label in the Query web service configuration for the given field */
    label: string;
    /** Whether the component supports multiple selection */
    multiple: boolean;
    /** Optional input. The component automatically looks for an aggregation with the name equal to the field */
    aggregation: string;
    column: CCColumn | undefined;
    items: ValueItem[];
    private _valueChangesSubscription;
    constructor(appService: AppService, firstPageService: FirstPageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getItems;
    static ɵfac: i0.ɵɵFactoryDef<BsAdvancedFormSelect, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAdvancedFormSelect, "sq-advanced-form-select", never, { "form": "form"; "field": "field"; "label": "label"; "multiple": "multiple"; "aggregation": "aggregation"; }, {}, never, never>;
}
//# sourceMappingURL=advanced-form-select.d.ts.map