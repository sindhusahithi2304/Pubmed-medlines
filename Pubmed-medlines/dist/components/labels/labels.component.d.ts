import { OnChanges } from "@angular/core";
import { Record } from "@sinequa/core/web-services";
import { LabelsService } from "./labels.service";
import { AppService } from "@sinequa/core/app-utils";
import * as i0 from "@angular/core";
export declare class Labels implements OnChanges {
    private appService;
    private labelsService;
    record: Record;
    public: boolean;
    enableDelete: boolean; /** Display the delete button in the label tag */
    protected labelsField: string;
    showLabels: boolean;
    labels: string[];
    hostClasses: any;
    constructor(appService: AppService, labelsService: LabelsService);
    ngOnChanges(): void;
    private makeLabels;
    select(label: string): void;
    remove(index: number): void;
    canRemove(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<Labels, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<Labels, "sq-labels", never, { "record": "record"; "public": "public"; "enableDelete": "enableDelete"; }, {}, never, never>;
}
//# sourceMappingURL=labels.component.d.ts.map