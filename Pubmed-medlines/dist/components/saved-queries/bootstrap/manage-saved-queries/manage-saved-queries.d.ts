import { OnInit } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ModalButton } from "@sinequa/core/modal";
import { AuditEvent } from "@sinequa/core/web-services";
import { SavedQueriesService, SavedQuery, ManageSavedQueriesModel } from "../../saved-queries.service";
import * as i0 from "@angular/core";
export declare class BsManageSavedQueries implements OnInit {
    model: ManageSavedQueriesModel;
    savedQueriesService: SavedQueriesService;
    reordering: boolean;
    buttons: ModalButton[];
    removeAllButton: ModalButton;
    nameValidators: ValidatorFn[];
    constructor(model: ManageSavedQueriesModel, savedQueriesService: SavedQueriesService);
    ngOnInit(): void;
    addAuditEvent(auditEvent: AuditEvent): void;
    reorder(): void;
    setName(savedQuery: SavedQuery, name: string): void;
    remove(savedQuery: SavedQuery, index: number): boolean;
    export(savedQuery: SavedQuery): boolean;
    dropped(drop: CdkDragDrop<SavedQuery[]>): void;
    static ɵfac: i0.ɵɵFactoryDef<BsManageSavedQueries, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsManageSavedQueries, "sq-manage-saved-queries", never, {}, {}, never, never>;
}
//# sourceMappingURL=manage-saved-queries.d.ts.map