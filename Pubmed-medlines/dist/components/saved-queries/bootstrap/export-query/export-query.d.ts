import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationService } from "@sinequa/core/validation";
import { NotificationsService } from "@sinequa/core/notification";
import { ModalRef, ModalButton } from "@sinequa/core/modal";
import { ExportSourceType, ExportOutputFormat } from "@sinequa/core/web-services";
import { SavedQueriesService, ExportQueryModel } from "../../saved-queries.service";
import { SelectionService } from "@sinequa/components/selection";
import { AppService } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
/**
 * Component representing the Export dialog where user can customize the query export action.
 *
 */
export declare class BsExportQuery implements OnInit, OnDestroy {
    model: ExportQueryModel;
    private formBuilder;
    private appService;
    private selectionService;
    private savedQueriesService;
    private validationService;
    private notificationsService;
    private changeDetectorRef;
    modalRef: ModalRef;
    readonly supportedFormats: ExportOutputFormat[];
    readonly outputFormats: typeof ExportOutputFormat;
    readonly sourceTypes: typeof ExportSourceType;
    form: FormGroup;
    savedQueries: string[];
    buttons: ModalButton[];
    isDownloading: boolean;
    exportableColumns: string[];
    private formChanges;
    maxCount: number;
    constructor(model: ExportQueryModel, formBuilder: FormBuilder, appService: AppService, selectionService: SelectionService, savedQueriesService: SavedQueriesService, validationService: ValidationService, notificationsService: NotificationsService, changeDetectorRef: ChangeDetectorRef, modalRef: ModalRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private getDefaultQueryExportConfig;
    /**
     * Check if the client has selected some records.
     *
     * @returns true if the client has selected some records.
     */
    hasSelectedRecords(): boolean;
    /**
     * Checks if the user chosen export source is the same as the given one.
     * <p>
     * Used to control the radio button state.
     *
     * @param type The source to check.
     * @returns true if the user chosen export source is the same as the given one.
     */
    sourceChosen(type: ExportSourceType): boolean;
    /**
     * Callback called when user chooses a new export source.
     *
     * @param event The related UI event.
     * @param type The new chosen source.
     */
    sourceChanged(event: UIEvent, type: ExportSourceType): void;
    /**
     * Checks if the dialog allows user to choose export source.
     * Generally, it returns false when the input model export type is already saved query.
     *
     * @returns true if the dialog allows user to choose export source.
     */
    showSourceChooser(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsExportQuery, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsExportQuery, "sq-export-query", never, {}, {}, never, never>;
}
//# sourceMappingURL=export-query.d.ts.map