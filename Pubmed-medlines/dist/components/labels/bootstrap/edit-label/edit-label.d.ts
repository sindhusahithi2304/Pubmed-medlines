import { OnInit, ChangeDetectorRef } from "@angular/core";
import { ModalButton, ModalRef } from "@sinequa/core/modal";
import { ModalProperties, LabelsService } from "../../labels.service";
import { SelectionService } from "@sinequa/components/selection";
import { AppService } from "@sinequa/core/app-utils";
import { Record } from "@sinequa/core/web-services";
import { SearchService } from "@sinequa/components/search";
import { NotificationsService } from "@sinequa/core/notification";
import * as i0 from "@angular/core";
export declare class BsEditLabel implements OnInit {
    model: {
        valuesToBeAdded: string[];
        valuesToBeRemoved: string[];
        properties: ModalProperties;
    };
    private appService;
    private selectionService;
    private labelsService;
    private searchService;
    private notificationService;
    private changeDetectorRef;
    private modalRef;
    selectedRecordsIds: string[];
    buttons: ModalButton[];
    /** Initial labels list assigned to a record */
    initialLabels: string[];
    record: Record | undefined;
    isProcessing: boolean;
    constructor(model: {
        valuesToBeAdded: string[];
        valuesToBeRemoved: string[];
        properties: ModalProperties;
    }, appService: AppService, selectionService: SelectionService, labelsService: LabelsService, searchService: SearchService, notificationService: NotificationsService, changeDetectorRef: ChangeDetectorRef, modalRef: ModalRef);
    ngOnInit(): void;
    updateLabelsNature(nature: boolean): void;
    onLabelsChanged(values: string[]): void;
    onLabelsToBeAddedChanged(values: string[]): void;
    onLabelsToBeRemovedChanged(values: string[]): void;
    /**
     * Return the list of labels already assigned to the selected record
     */
    private _getInitialRecordLabels;
    static ɵfac: i0.ɵɵFactoryDef<BsEditLabel, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsEditLabel, "sq-edit-label", never, {}, {}, never, never>;
}
//# sourceMappingURL=edit-label.d.ts.map