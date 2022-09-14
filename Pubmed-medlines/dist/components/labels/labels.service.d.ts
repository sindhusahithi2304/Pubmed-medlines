import { InjectionToken, Type, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { PrincipalWebService, LabelsWebService, LabelsRights } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import { ModalService, ModalResult } from "@sinequa/core/modal";
import { Action } from "@sinequa/components/action";
import { IntlService } from "@sinequa/core/intl";
import { NotificationsService } from "@sinequa/core/notification";
import { SelectionService } from "@sinequa/components/selection";
import * as i0 from "@angular/core";
export interface LabelsComponents {
    renameModal: Type<any>;
    labelsAutocompleteComponent: Type<any>;
    deleteModal: Type<any>;
    addModal: Type<any>;
    editModal: Type<any>;
}
export interface ModalProperties {
    public: boolean;
    allowEditPublicLabels: boolean;
    allowManagePublicLabels: boolean;
    allowNewLabels: boolean;
    disableAutocomplete: boolean;
    action: number;
    radioButtons: any[];
}
export declare const enum UpdateLabelsAction {
    add = 0,
    remove = 1,
    rename = 2,
    delete = 3,
    bulkAdd = 4,
    bulkRemove = 5,
    edit = 6
}
export declare const LABELS_COMPONENTS: InjectionToken<LabelsComponents>;
export declare class LabelsService implements OnDestroy {
    private labelsWebService;
    private appService;
    private searchService;
    private modalService;
    private principalWebService;
    private intlService;
    private notificationService;
    private selectionService;
    labelsComponents: LabelsComponents;
    private _privateLabelsPrefix;
    private static readonly defaultLabelsRights;
    private labelsRightsSubscription;
    private labelsRights;
    constructor(labelsWebService: LabelsWebService, appService: AppService, searchService: SearchService, modalService: ModalService, principalWebService: PrincipalWebService, intlService: IntlService, notificationService: NotificationsService, selectionService: SelectionService, labelsComponents: LabelsComponents);
    get publicLabelsField(): string | undefined;
    get privateLabelsField(): string | undefined;
    get labelsAutoSuggestWildcard(): string | undefined;
    get allowPublicLabelsManagement(): boolean;
    get allowPublicLabelsEdition(): boolean;
    get userLabelsRights(): LabelsRights;
    ngOnDestroy(): void;
    /** From navbar */
    renameLabelModal(): Promise<ModalResult>;
    deleteLabelModal(): Promise<ModalResult>;
    bulkAddLabelModal(): Promise<ModalResult>;
    bulkRemoveLabelModal(): Promise<ModalResult>;
    private _modalProperties;
    private _getModalRadioButtonsConf;
    /** END From navbar */
    /** From result selector */
    buildSelectionAction(): Action | undefined;
    editLabelModal(): Promise<ModalResult>;
    /** END result selector */
    addLabels(labels: string[], ids: string[], _public: boolean): Observable<void>;
    removeLabels(labels: string[], ids: string[], _public: boolean): Observable<void>;
    selectLabels(labels: string[], _public: boolean): Promise<boolean>;
    /**
     * Retrieves the labels that are not in the current filters of breadcrumbs
     *
     * @param field The column index containing the labels.
     * @returns The selected labels
     */
    private getSelectedLabels;
    renameLabels(labels: string[], newLabel: string, _public: boolean): Observable<void>;
    deleteLabels(labels: string[], _public: boolean): Observable<void>;
    bulkAddLabels(labels: string[], _public: boolean): Observable<void>;
    bulkRemoveLabels(labels: string[], _public: boolean): Observable<void>;
    get privateLabelsPrefix(): string;
    sort(labels: string[], _public: boolean): string[];
    split(labels: string): string[];
    private _addPrivatePrefix;
    addPrivatePrefix(labels: string | string[]): string | string[];
    private _removePrivatePrefix;
    removePrivatePrefix(labels: string | string[]): string | string[];
    static ɵfac: i0.ɵɵFactoryDef<LabelsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<LabelsService>;
}
//# sourceMappingURL=labels.service.d.ts.map