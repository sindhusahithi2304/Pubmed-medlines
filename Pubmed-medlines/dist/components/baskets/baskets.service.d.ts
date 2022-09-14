import { InjectionToken, Type, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { UserSettingsWebService, AuditEvent, AuditEvents } from "@sinequa/core/web-services";
import { ModalService } from "@sinequa/core/modal";
import { SelectionService } from "@sinequa/components/selection";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { Query } from '@sinequa/core/app-utils';
import * as i0 from "@angular/core";
export interface Basket {
    name: string;
    description?: string;
    ids?: string[];
}
export declare const enum BasketEventType {
    Loaded = "Basket_Loaded",
    Add = "Basket_Add",
    Delete = "Basket_Delete",
    DeleteAll = "Basket_DeleteAll",
    Update = "Basket_Update",
    Rename = "Basket_Rename",
    AddDoc = "Basket_AddDoc",
    RemoveDoc = "Basket_RemoveDoc",
    Open = "Basket_Open",
    ExportCSV = "Basket_ExportCSV",
    Patched = "Basked_Patched"
}
export declare const BASKET_CHANGE_EVENTS: BasketEventType[];
export interface BasketChangeEvent {
    type: BasketEventType;
    basket?: Basket;
}
export interface SelectBasketModel {
    basket: Basket | undefined;
    basketFilter?: (basket: Basket) => boolean;
    allowNew?: boolean;
}
export interface ManageBasketsModel {
    baskets: Basket[];
    auditEvents?: AuditEvent[];
}
/**
 * The modal types are unknown to this service.
 * The module using this service must provide these components
 * in their forRoot() method
 *
 * Example below:
 *
 *  public static forRoot(): ModuleWithProviders<BasketsModule> {
        return {
            ngModule: BasketsModule,
            providers: [
                {
                    provide: BASKET_COMPONENTS,
                    useValue: {
                        selectBasketModal: SelectBasket,
                        editBasketModal: EditBasket,
                        manageBasketsModal: ManageBaskets
                    }
                },
                BasketsService
            ]
        };
    }
 */
export interface BasketComponents {
    selectBasketModal: Type<any>;
    editBasketModal: Type<any>;
    manageBasketsModal: Type<any>;
}
export declare const BASKET_COMPONENTS: InjectionToken<BasketComponents>;
export declare class BasketsService implements OnDestroy {
    userSettingsService: UserSettingsWebService;
    searchService: SearchService;
    modalService: ModalService;
    selectionService: SelectionService;
    basketComponents: BasketComponents;
    private readonly _events;
    private readonly _changes;
    selectedRecordsAction: Action;
    constructor(userSettingsService: UserSettingsWebService, searchService: SearchService, modalService: ModalService, selectionService: SelectionService, basketComponents: BasketComponents);
    /**
     * Returns the list of this user's baskets.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of baskets if it does not already exist.
     */
    get baskets(): Basket[];
    /**
     * Triggers any event among BasketChangeEvent
     * (use for fine-grained control of baskets workflow)
     */
    get events(): Subject<BasketChangeEvent>;
    /**
     * Triggers when events affect the list of baskets
     * (use to refresh basket menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes(): Subject<BasketChangeEvent>;
    /**
     * @returns true if there is at least one basket
     */
    get hasBasket(): boolean;
    /**
     * @returns a basket with the given name or null if it does not exist
     * @param name
     */
    basket(name: string): Basket | undefined;
    private basketIndex;
    /**
     * Creates a new basket unless it already exists.
     * Emits an Basket event.
     * Update the data on the server.
     * @param basket the basket to create
     * @returns true if basket was created
     */
    createBasket(basket: Basket): boolean;
    /**
     * Update the basket at the given index, unless a basket with the same name
     * already exists in the list of baskets.
     * Emits a Basket event.
     * Update the data on the server.
     * @param basket the basket to update
     * @param index the index at which to update the basket
     * @returns true if basket was updated
     */
    updateBasket(basket: Basket, index: number): boolean;
    /**
     * Updates the full list of Baskets.
     * Emits a Basket event.
     * Update the data on the server.
     * @param baskets the new list of baskets
     * @param auditEvents the list of audit events to log
     */
    updateBaskets(baskets: Basket[], auditEvents?: AuditEvents): boolean;
    /**
     * Deletes the given Basket (based on its name)
     * Emits an Basket event.
     * Update the data on the server.
     * @param basket
     * @returns true if basket was deleted
     */
    deleteBasket(basket: Basket): boolean;
    /**
     * Adds one or more documents to a basket.
     * Emits a Basket event.
     * Update the data on the server.
     * @param name basket to which to add the document(s)
     * @param ids id(s) of the document(s) to add to the basket
     * @param skipPatch if true, will not update the data on the server (use for bulk updates)
     * @returns true if the document was added
     */
    addToBasket(name: string, ids: string | string[], skipPatch?: boolean): boolean;
    /**
     * Removes one or more documents from a basket.
     * Emits a Basket event.
     * Update the data on the server.
     * @param name basket from which to remove the document(s)
     * @param ids id(s) of the document(s) to remove from the basket
     * @param skipPatch if true, will not update the data on the server (use for bulk updates)
     * @returns true if the document was removed
     */
    removeFromBasket(name: string, ids: string | string[], skipPatch?: boolean): boolean;
    /**
     * Removes a document from all the baskets
     * @param id id of the document to remove
     */
    removeFromAllBaskets(id: string): boolean;
    /**
     * Updates Baskets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchBaskets;
    /**
     * Uses the SearchService to perform a search returning all
     * the documents in this basket
     * @param basket
     * @param path
     * @returns the search service promise
     */
    searchBasket(basket: Basket, path?: string): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to add one (or more) document(s)
     * to a basket.
     * @param ids id(s) of the documents to add to a basket
     * @param recordBaskets names of the baskets the document already belongs to
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the document was added to a basket
     */
    addToBasketModal(ids: string | string[], recordBaskets?: string[]): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to remove one (or more) document(s)
     * from a basket.
     * @param ids id(s) of the documents to remove from a basket
     * @param recordBaskets names of the baskets the document already belongs to
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the document was removed from a basket
     */
    removeFromBasketModal(ids: string | string[], recordBaskets?: string[]): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to create new basket.
     * @param model the initial basket object model
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the basket was created.
     */
    createBasketModal(model?: Basket): Promise<boolean>;
    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of baskets.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    manageBasketsModal(): Promise<boolean>;
    private buildBasketsAction;
    makeQuery(basket: Basket): Query;
    notifyOpenBasket(basket: Basket): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BasketsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<BasketsService>;
}
//# sourceMappingURL=baskets.service.d.ts.map