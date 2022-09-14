import { Injectable, Inject, InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/components/search";
import * as i3 from "@sinequa/core/modal";
import * as i4 from "@sinequa/components/selection";
// Types of events triggering a change event
export const BASKET_CHANGE_EVENTS = [
    "Basket_Loaded" /* Loaded */,
    "Basket_Add" /* Add */,
    "Basket_Delete" /* Delete */,
    "Basket_DeleteAll" /* DeleteAll */,
    "Basket_Update" /* Update */,
    "Basket_Rename" /* Rename */
];
export const BASKET_COMPONENTS = new InjectionToken('BASKET_COMPONENTS');
export class BasketsService {
    constructor(userSettingsService, searchService, modalService, selectionService, basketComponents) {
        this.userSettingsService = userSettingsService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.selectionService = selectionService;
        this.basketComponents = basketComponents;
        this._events = new Subject();
        this._changes = new Subject();
        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this._events.next({ type: "Basket_Loaded" /* Loaded */ });
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if (BASKET_CHANGE_EVENTS.indexOf(event.type) !== -1) {
                this.changes.next(event);
            }
        });
        // Register a basket action onto the selection service, so that users can add/remove to/from baskets when documents are selected
        this.selectedRecordsAction = this.buildBasketsAction();
    }
    // GETTERS
    /**
     * Returns the list of this user's baskets.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of baskets if it does not already exist.
     */
    get baskets() {
        if (!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if (!this.userSettingsService.userSettings["baskets"])
            this.userSettingsService.userSettings["baskets"] = [];
        return this.userSettingsService.userSettings["baskets"];
    }
    /**
     * Triggers any event among BasketChangeEvent
     * (use for fine-grained control of baskets workflow)
     */
    get events() {
        return this._events;
    }
    /**
     * Triggers when events affect the list of baskets
     * (use to refresh basket menus)
     * Cf. CHANGE_EVENTS list
     */
    get changes() {
        return this._changes;
    }
    /**
     * @returns true if there is at least one basket
     */
    get hasBasket() {
        return this.baskets.length > 0;
    }
    /**
     * @returns a basket with the given name or null if it does not exist
     * @param name
     */
    basket(name) {
        const i = this.basketIndex(name);
        return i >= 0 ? this.baskets[i] : undefined;
    }
    basketIndex(name) {
        for (let i = 0, ic = this.baskets.length; i < ic; i++) {
            const basket = this.baskets[i];
            if (basket && basket.name === name) {
                return i;
            }
        }
        return -1;
    }
    // CRUD
    /**
     * Creates a new basket unless it already exists.
     * Emits an Basket event.
     * Update the data on the server.
     * @param basket the basket to create
     * @returns true if basket was created
     */
    createBasket(basket) {
        if (this.basketIndex(basket.name) >= 0)
            return false; // This basket already exists
        this.baskets.unshift(basket);
        this._events.next({ type: "Basket_Add" /* Add */, basket: basket });
        this.patchBaskets([{
                type: "Basket_Add" /* Add */,
                detail: {
                    basket: basket.name
                }
            }]);
        return true;
    }
    /**
     * Update the basket at the given index, unless a basket with the same name
     * already exists in the list of baskets.
     * Emits a Basket event.
     * Update the data on the server.
     * @param basket the basket to update
     * @param index the index at which to update the basket
     * @returns true if basket was updated
     */
    updateBasket(basket, index) {
        const prevIndex = this.basketIndex(basket.name);
        if (prevIndex !== -1 && index !== prevIndex)
            return false; // A basket with the same name exists at a different index
        if (index >= 0 && index < this.baskets.length) {
            this.baskets.splice(index, 1, basket);
            this._events.next({ type: "Basket_Update" /* Update */, basket: basket });
            this.patchBaskets([
                {
                    type: "Basket_Update" /* Update */,
                    detail: {
                        basket: basket.name
                    }
                }
            ], true);
            return true;
        }
        return false; // This basket does not exist
    }
    /**
     * Updates the full list of Baskets.
     * Emits a Basket event.
     * Update the data on the server.
     * @param baskets the new list of baskets
     * @param auditEvents the list of audit events to log
     */
    updateBaskets(baskets, auditEvents) {
        Utils.arraySet(this.baskets, baskets);
        this._events.next({ type: "Basket_Update" /* Update */ });
        this.patchBaskets(auditEvents, true);
        return true;
    }
    /**
     * Deletes the given Basket (based on its name)
     * Emits an Basket event.
     * Update the data on the server.
     * @param basket
     * @returns true if basket was deleted
     */
    deleteBasket(basket) {
        const index = this.basketIndex(basket.name);
        if (index === -1)
            return false; // Nothing to delete
        this.baskets.splice(index, 1);
        this._events.next({ type: "Basket_Delete" /* Delete */, basket: basket });
        this.patchBaskets([
            {
                type: "Basket_Delete" /* Delete */,
                detail: {
                    savedquery: basket.name
                }
            }
        ], true);
        return true;
    }
    /**
     * Adds one or more documents to a basket.
     * Emits a Basket event.
     * Update the data on the server.
     * @param name basket to which to add the document(s)
     * @param ids id(s) of the document(s) to add to the basket
     * @param skipPatch if true, will not update the data on the server (use for bulk updates)
     * @returns true if the document was added
     */
    addToBasket(name, ids, skipPatch) {
        if (!ids) {
            return false;
        }
        const basket = this.basket(name);
        if (!basket)
            return false;
        if (!basket.ids)
            basket.ids = [];
        if (Utils.isArray(ids)) {
            for (let i = 0, ic = ids.length; i < ic; i++) {
                const id = ids[i];
                if (basket.ids.indexOf(id) === -1) {
                    basket.ids.push(id);
                }
            }
        }
        else {
            if (basket.ids.indexOf(ids) === -1) {
                basket.ids.push(ids);
            }
        }
        if (!skipPatch) {
            this._events.next({ type: "Basket_AddDoc" /* AddDoc */ });
            this.patchBaskets({
                type: "Basket_AddDoc" /* AddDoc */,
                detail: {
                    basket: name,
                    "doc-id": basket.ids[0]
                }
            });
        }
        return true;
    }
    /**
     * Removes one or more documents from a basket.
     * Emits a Basket event.
     * Update the data on the server.
     * @param name basket from which to remove the document(s)
     * @param ids id(s) of the document(s) to remove from the basket
     * @param skipPatch if true, will not update the data on the server (use for bulk updates)
     * @returns true if the document was removed
     */
    removeFromBasket(name, ids, skipPatch) {
        if (!ids) {
            return false;
        }
        const basket = this.basket(name);
        if (!basket)
            return false;
        if (!basket.ids)
            basket.ids = [];
        if (Utils.isArray(ids)) {
            for (let i = 0, ic = ids.length; i < ic; i++) {
                const id = ids[i];
                const index = basket.ids.indexOf(id);
                if (index !== -1) {
                    basket.ids.splice(index, 1);
                }
            }
        }
        else {
            const index = basket.ids.indexOf(ids);
            if (index !== -1) {
                basket.ids.splice(index, 1);
            }
        }
        if (!skipPatch) {
            this._events.next({ type: "Basket_RemoveDoc" /* RemoveDoc */ });
            this.patchBaskets({
                type: "Basket_RemoveDoc" /* RemoveDoc */,
                detail: {
                    basket: name,
                    "doc-id": basket.ids[0]
                }
            }, true);
        }
        return true;
    }
    /**
     * Removes a document from all the baskets
     * @param id id of the document to remove
     */
    removeFromAllBaskets(id) {
        const auditEvents = [];
        for (const basket of this.baskets) {
            if (this.removeFromBasket(basket.name, id, true)) {
                auditEvents.push({
                    type: "Basket_RemoveDoc" /* RemoveDoc */,
                    detail: {
                        basket: basket.name,
                        "doc-id": id
                    }
                });
            }
        }
        if (auditEvents.length > 0) {
            this._events.next({ type: "Basket_RemoveDoc" /* RemoveDoc */ });
            this.patchBaskets(auditEvents, true);
            return true;
        }
        return false;
    }
    /**
     * Updates Baskets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    patchBaskets(auditEvents, updateSearch) {
        const obs = this.userSettingsService.patch({ baskets: this.baskets }, auditEvents);
        obs.subscribe(next => {
            this._events.next({ type: "Basked_Patched" /* Patched */ });
            if (updateSearch && this.searchService.query.basket) {
                this.searchService.search(); // Update search results to reflect the new basket content
            }
        }, error => {
            console.error("Could not patch Baskets!", error);
        });
        return obs;
    }
    // EVENT HANDLERS (Menus)
    /**
     * Uses the SearchService to perform a search returning all
     * the documents in this basket
     * @param basket
     * @param path
     * @returns the search service promise
     */
    searchBasket(basket, path) {
        const query = this.searchService.makeQuery();
        query.basket = basket.name;
        this.searchService.setQuery(query);
        this._events.next({ type: "Basket_Open" /* Open */, basket: basket });
        return this.searchService.search({ path: path }, {
            type: "Basket_Open" /* Open */,
            detail: {
                basket: basket.name
            }
        });
    }
    /**
     * Opens a dialog allowing a user to add one (or more) document(s)
     * to a basket.
     * @param ids id(s) of the documents to add to a basket
     * @param recordBaskets names of the baskets the document already belongs to
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the document was added to a basket
     */
    addToBasketModal(ids, recordBaskets) {
        const model = {
            basket: undefined,
            basketFilter: recordBaskets ? b => !recordBaskets.includes(b.name) : undefined,
            allowNew: true
        };
        return this.modalService
            .open(this.basketComponents.selectBasketModal, { model: model })
            .then(result => {
            if (result === -1 /* OK */ && model.basket) {
                return this.addToBasket(model.basket.name, ids);
            }
            return false;
        });
    }
    /**
     * Opens a dialog allowing a user to remove one (or more) document(s)
     * from a basket.
     * @param ids id(s) of the documents to remove from a basket
     * @param recordBaskets names of the baskets the document already belongs to
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the document was removed from a basket
     */
    removeFromBasketModal(ids, recordBaskets) {
        const model = {
            basket: undefined,
            basketFilter: recordBaskets ? b => recordBaskets.includes(b.name) : undefined
        };
        return this.modalService
            .open(this.basketComponents.selectBasketModal, { model: model })
            .then(result => {
            if (result === -1 /* OK */ && model.basket) {
                return this.removeFromBasket(model.basket.name, ids);
            }
            return false;
        });
    }
    /**
     * Opens a dialog allowing a user to create new basket.
     * @param model the initial basket object model
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true if the basket was created.
     */
    createBasketModal(model = { name: "" }) {
        return this.modalService.open(this.basketComponents.editBasketModal, { model: model })
            .then((result) => {
            if (result === -1 /* OK */) {
                const index = this.basketIndex(model.name);
                if (index !== -1) {
                    return this.modalService.yesNo("msg#baskets.basketAlreadyExists")
                        .then((result) => {
                        if (result === -3 /* Yes */) {
                            return this.updateBasket(model, index);
                        }
                        return false;
                    });
                }
                else {
                    return this.createBasket(model);
                }
            }
            return false;
        });
    }
    // Not relevant as of now
    // public editBasketModal(basket: Basket)
    /**
     * Opens a dialog allowing a user to reorganize and edit the
     * list of baskets.
     * @returns a boolean promise resolved when the user closes the dialog
     * the result is true is the list was updated.
     */
    manageBasketsModal() {
        const model = { baskets: Utils.copy(this.baskets) };
        return this.modalService.open(this.basketComponents.manageBasketsModal, { model: model })
            .then((result) => {
            if (result === -1 /* OK */) {
                return this.updateBaskets(model.baskets, model.auditEvents);
            }
            return false;
        });
    }
    buildBasketsAction() {
        return new Action({
            icon: "fas fa-shopping-basket",
            title: "msg#baskets.baskets",
            hidden: true,
            children: [
                new Action({
                    text: "msg#baskets.addToBasket",
                    action: (item, $event) => {
                        this.addToBasketModal(this.selectionService.getSelectedIds());
                    }
                }),
                new Action({
                    text: "msg#baskets.removeFromBasket",
                    action: (item, $event) => {
                        this.removeFromBasketModal(this.selectionService.getSelectedIds());
                    }
                })
            ],
            updater: (action) => {
                action.hidden = !this.selectionService.haveSelectedRecords;
            }
        });
    }
    makeQuery(basket) {
        const query = this.searchService.makeQuery();
        query.basket = basket.name;
        return query;
    }
    notifyOpenBasket(basket) {
        this._events.next({ type: "Basket_Open" /* Open */, basket });
    }
    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
BasketsService.ɵfac = function BasketsService_Factory(t) { return new (t || BasketsService)(i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i2.SearchService), i0.ɵɵinject(i3.ModalService), i0.ɵɵinject(i4.SelectionService), i0.ɵɵinject(BASKET_COMPONENTS)); };
BasketsService.ɵprov = i0.ɵɵdefineInjectable({ token: BasketsService, factory: BasketsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BasketsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.SearchService }, { type: i3.ModalService }, { type: i4.SelectionService }, { type: undefined, decorators: [{
                type: Inject,
                args: [BASKET_COMPONENTS]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFza2V0cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvYmFza2V0cy8iLCJzb3VyY2VzIjpbImJhc2tldHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQWtCLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBYSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHekMsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7O0FBNkJsRCw0Q0FBNEM7QUFDNUMsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUc7Ozs7Ozs7Q0FPbkMsQ0FBQztBQXNERixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBbUIsbUJBQW1CLENBQUMsQ0FBQztBQU0zRixNQUFNLE9BQU8sY0FBYztJQVF2QixZQUNXLG1CQUEyQyxFQUMzQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixnQkFBa0MsRUFDUCxnQkFBa0M7UUFKN0Qsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF3QjtRQUMzQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ1AscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVh2RCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFDM0MsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFxQixDQUFDO1FBWXpELDhCQUE4QjtRQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM5Qyx3QkFBd0I7WUFDeEIsK0JBQStCO1lBQy9CLElBQUks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Z0JBQWdCLENBQUMsTUFBYztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksMEJBQXNCLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs0RUE1ZVEsY0FBYyxxSkFhWCxpQkFBaUI7c0RBYnBCLGNBQWMsV0FBZCxjQUFjLG1CQUZYLE1BQU07a0RBRVQsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQWNRLE1BQU07dUJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3QsIEluamVjdGlvblRva2VuLCBUeXBlLCBPbkRlc3Ryb3l9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1VzZXJTZXR0aW5nc1dlYlNlcnZpY2UsIEF1ZGl0RXZlbnQsIEF1ZGl0RXZlbnRzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7TW9kYWxTZXJ2aWNlLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7U2VsZWN0aW9uU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VsZWN0aW9uXCI7XG5pbXBvcnQge0FjdGlvbn0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYWN0aW9uXCI7XG5pbXBvcnQge1NlYXJjaFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHtRdWVyeX0gZnJvbSAnQHNpbmVxdWEvY29yZS9hcHAtdXRpbHMnO1xuXG4vLyBCYXNrZXQgaW50ZXJmYWNlIChmcm9tIG1vZGVscy9Vc2VyU2V0dGluZ3MpXG5leHBvcnQgaW50ZXJmYWNlIEJhc2tldCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGlkcz86IHN0cmluZ1tdO1xufVxuXG5cbi8vIEF1ZGl0IEV2ZW50cyAoZnJvbSBtb2RlbHMvQXVkaXQpXG5leHBvcnQgY29uc3QgZW51bSBCYXNrZXRFdmVudFR5cGUge1xuICAgIExvYWRlZCA9IFwiQmFza2V0X0xvYWRlZFwiLFxuICAgIEFkZCA9IFwiQmFza2V0X0FkZFwiLFxuICAgIERlbGV0ZSA9IFwiQmFza2V0X0RlbGV0ZVwiLFxuICAgIERlbGV0ZUFsbCA9IFwiQmFza2V0X0RlbGV0ZUFsbFwiLFxuICAgIFVwZGF0ZSA9IFwiQmFza2V0X1VwZGF0ZVwiLFxuICAgIFJlbmFtZSA9IFwiQmFza2V0X1JlbmFtZVwiLFxuXG4gICAgQWRkRG9jID0gXCJCYXNrZXRfQWRkRG9jXCIsXG4gICAgUmVtb3ZlRG9jID0gXCJCYXNrZXRfUmVtb3ZlRG9jXCIsXG4gICAgT3BlbiA9IFwiQmFza2V0X09wZW5cIixcbiAgICBFeHBvcnRDU1YgPSBcIkJhc2tldF9FeHBvcnRDU1ZcIixcbiAgICBQYXRjaGVkID0gXCJCYXNrZWRfUGF0Y2hlZFwiXG59XG5cblxuLy8gVHlwZXMgb2YgZXZlbnRzIHRyaWdnZXJpbmcgYSBjaGFuZ2UgZXZlbnRcbmV4cG9ydCBjb25zdCBCQVNLRVRfQ0hBTkdFX0VWRU5UUyA9IFtcbiAgICBCYXNrZXRFdmVudFR5cGUuTG9hZGVkLFxuICAgIEJhc2tldEV2ZW50VHlwZS5BZGQsXG4gICAgQmFza2V0RXZlbnRUeXBlLkRlbGV0ZSxcbiAgICBCYXNrZXRFdmVudFR5cGUuRGVsZXRlQWxsLFxuICAgIEJhc2tldEV2ZW50VHlwZS5VcGRhdGUsXG4gICAgQmFza2V0RXZlbnRUeXBlLlJlbmFtZVxuXTtcblxuXG4vLyBDUlVEIEV2ZW50c1xuZXhwb3J0IGludGVyZmFjZSBCYXNrZXRDaGFuZ2VFdmVudCB7XG4gICAgdHlwZTogQmFza2V0RXZlbnRUeXBlO1xuICAgIGJhc2tldD86IEJhc2tldDtcbn1cblxuXG4vLyBNb2RlbCBleHBlY3RlZCBieSB0aGUgU2VsZWN0QmFza2V0IE1vZGFsLlxuLy8gVGhlIGZpbHRlciBhbGxvd3MgdG8gZmlsdGVyIG91dCBiYXNrZXRzIGZyb20gdGhlIGNvbXBsZXRlIGxpc3RcbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0QmFza2V0TW9kZWwge1xuICAgIGJhc2tldDogQmFza2V0IHwgdW5kZWZpbmVkO1xuICAgIGJhc2tldEZpbHRlcj86IChiYXNrZXQ6IEJhc2tldCkgPT4gYm9vbGVhbjtcbiAgICBhbGxvd05ldz86IGJvb2xlYW47XG59XG5cbi8vIE1vZGVsIGV4cGVjdGVkIGJ5IHRoZSBNYW5hZ2VCYXNrZXRzIE1vZGFsLlxuZXhwb3J0IGludGVyZmFjZSBNYW5hZ2VCYXNrZXRzTW9kZWwge1xuICAgIGJhc2tldHM6IEJhc2tldFtdO1xuICAgIGF1ZGl0RXZlbnRzPzogQXVkaXRFdmVudFtdO1xufVxuXG5cbi8qKlxuICogVGhlIG1vZGFsIHR5cGVzIGFyZSB1bmtub3duIHRvIHRoaXMgc2VydmljZS5cbiAqIFRoZSBtb2R1bGUgdXNpbmcgdGhpcyBzZXJ2aWNlIG11c3QgcHJvdmlkZSB0aGVzZSBjb21wb25lbnRzXG4gKiBpbiB0aGVpciBmb3JSb290KCkgbWV0aG9kXG4gKlxuICogRXhhbXBsZSBiZWxvdzpcbiAqXG4gKiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QmFza2V0c01vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEJhc2tldHNNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IEJBU0tFVF9DT01QT05FTlRTLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0QmFza2V0TW9kYWw6IFNlbGVjdEJhc2tldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRCYXNrZXRNb2RhbDogRWRpdEJhc2tldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmFnZUJhc2tldHNNb2RhbDogTWFuYWdlQmFza2V0c1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBCYXNrZXRzU2VydmljZVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBCYXNrZXRDb21wb25lbnRzIHtcbiAgICBzZWxlY3RCYXNrZXRNb2RhbDogVHlwZTxhbnk+O1xuICAgIGVkaXRCYXNrZXRNb2RhbDogVHlwZTxhbnk+O1xuICAgIG1hbmFnZUJhc2tldHNNb2RhbDogVHlwZTxhbnk+O1xufVxuZXhwb3J0IGNvbnN0IEJBU0tFVF9DT01QT05FTlRTID0gbmV3IEluamVjdGlvblRva2VuPEJhc2tldENvbXBvbmVudHM+KCdCQVNLRVRfQ09NUE9ORU5UUycpO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJhc2tldHNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PEJhc2tldENoYW5nZUV2ZW50PigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NoYW5nZXMgPSBuZXcgU3ViamVjdDxCYXNrZXRDaGFuZ2VFdmVudD4oKTtcblxuICAgIC8vIEFuIGFwcGxpY2F0aW9uIG1heSB3YW50IHRvIGFsdGVyIHRoZSBhY3Rpb24gKGljb24sIGV0Yy4pXG4gICAgcHVibGljIHNlbGVjdGVkUmVjb3Jkc0FjdGlvbjogQWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB1c2VyU2V0dGluZ3NTZXJ2aWNlOiBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHVibGljIG1vZGFsU2VydmljZTogTW9kYWxTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgc2VsZWN0aW9uU2VydmljZTogU2VsZWN0aW9uU2VydmljZSxcbiAgICAgICAgQEluamVjdChCQVNLRVRfQ09NUE9ORU5UUykgcHVibGljIGJhc2tldENvbXBvbmVudHM6IEJhc2tldENvbXBvbmVudHNcbiAgICApe1xuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIHVzZXIgc2V0dGluZ3NcbiAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLmV2ZW50cy5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gRS5nLiBuZXcgbG9naW4gb2NjdXJzXG4gICAgICAgICAgICAvLyA9PT4gTWVudXMgbmVlZCB0byBiZSByZWJ1aWx0XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogQmFza2V0RXZlbnRUeXBlLkxvYWRlZH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gTGlzdGVuIHRvIG93biBldmVudHMsIHRvIHRyaWdnZXIgY2hhbmdlIGV2ZW50c1xuICAgICAgICB0aGlzLl9ldmVudHMuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmKEJBU0tFVF9DSEFOR0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgIT09IC0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZXMubmV4dChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBSZWdpc3RlciBhIGJhc2tldCBhY3Rpb24gb250byB0aGUgc2VsZWN0aW9uIHNlcnZpY2UsIHNvIHRoYXQgdXNlcnMgY2FuIGFkZC9yZW1vdmUgdG8vZnJvbSBiYXNrZXRzIHdoZW4gZG9jdW1lbnRzIGFyZSBzZWxlY3RlZFxuICAgICAgICB0aGlzLnNlbGVjdGVkUmVjb3Jkc0FjdGlvbiA9IHRoaXMuYnVpbGRCYXNrZXRzQWN0aW9uKCk7XG4gICAgfVxuXG4gICAgLy8gR0VUVEVSU1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCBvZiB0aGlzIHVzZXIncyBiYXNrZXRzLlxuICAgICAqIFRoZSBsaXN0IGlzIHN0b3JlZCBpbiB0aGUgdXNlciBzZXR0aW5ncyAodGhpcyBpcyBhIHJlZGlyZWN0aW9uKS5cbiAgICAgKiBVc2luZyB0aGlzIHNlcnZpY2UgY3JlYXRlcyB0aGUgbGlzdCBvZiBiYXNrZXRzIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXG4gICAgICovXG4gICAgcHVibGljIGdldCBiYXNrZXRzKCkgOiBCYXNrZXRbXSB7XG4gICAgICAgIGlmKCF0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzKVxuICAgICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5ncyA9IHt9O1xuICAgICAgICBpZighdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcImJhc2tldHNcIl0pXG4gICAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5nc1NlcnZpY2UudXNlclNldHRpbmdzW1wiYmFza2V0c1wiXSA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ3NTZXJ2aWNlLnVzZXJTZXR0aW5nc1tcImJhc2tldHNcIl07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYW55IGV2ZW50IGFtb25nIEJhc2tldENoYW5nZUV2ZW50XG4gICAgICogKHVzZSBmb3IgZmluZS1ncmFpbmVkIGNvbnRyb2wgb2YgYmFza2V0cyB3b3JrZmxvdylcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGV2ZW50cygpIDogU3ViamVjdDxCYXNrZXRDaGFuZ2VFdmVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXJzIHdoZW4gZXZlbnRzIGFmZmVjdCB0aGUgbGlzdCBvZiBiYXNrZXRzXG4gICAgICogKHVzZSB0byByZWZyZXNoIGJhc2tldCBtZW51cylcbiAgICAgKiBDZi4gQ0hBTkdFX0VWRU5UUyBsaXN0XG4gICAgICovXG4gICAgcHVibGljIGdldCBjaGFuZ2VzKCkgOiBTdWJqZWN0PEJhc2tldENoYW5nZUV2ZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIGJhc2tldFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaGFzQmFza2V0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNrZXRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgYSBiYXNrZXQgd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvciBudWxsIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKi9cbiAgICBwdWJsaWMgYmFza2V0KG5hbWU6IHN0cmluZyk6IEJhc2tldCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGkgPSB0aGlzLmJhc2tldEluZGV4KG5hbWUpO1xuICAgICAgICByZXR1cm4gaT49IDA/IHRoaXMuYmFza2V0c1tpXSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJhc2tldEluZGV4KG5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpYyA9IHRoaXMuYmFza2V0cy5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBiYXNrZXQgPSB0aGlzLmJhc2tldHNbaV07XG4gICAgICAgICAgICBpZiAoYmFza2V0ICYmIGJhc2tldC5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuXG4gICAgLy8gQ1JVRFxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBiYXNrZXQgdW5sZXNzIGl0IGFscmVhZHkgZXhpc3RzLlxuICAgICAqIEVtaXRzIGFuIEJhc2tldCBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gYmFza2V0IHRoZSBiYXNrZXQgdG8gY3JlYXRlXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBiYXNrZXQgd2FzIGNyZWF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQmFza2V0KGJhc2tldDogQmFza2V0KSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGlmKHRoaXMuYmFza2V0SW5kZXgoYmFza2V0Lm5hbWUpID49IDApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFRoaXMgYmFza2V0IGFscmVhZHkgZXhpc3RzXG5cbiAgICAgICAgdGhpcy5iYXNrZXRzLnVuc2hpZnQoYmFza2V0KTtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGUgOiBCYXNrZXRFdmVudFR5cGUuQWRkLCBiYXNrZXQ6IGJhc2tldH0pO1xuICAgICAgICB0aGlzLnBhdGNoQmFza2V0cyhbe1xuICAgICAgICAgICAgdHlwZTogQmFza2V0RXZlbnRUeXBlLkFkZCxcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGJhc2tldDogYmFza2V0Lm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGJhc2tldCBhdCB0aGUgZ2l2ZW4gaW5kZXgsIHVubGVzcyBhIGJhc2tldCB3aXRoIHRoZSBzYW1lIG5hbWVcbiAgICAgKiBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgbGlzdCBvZiBiYXNrZXRzLlxuICAgICAqIEVtaXRzIGEgQmFza2V0IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBiYXNrZXQgdGhlIGJhc2tldCB0byB1cGRhdGVcbiAgICAgKiBAcGFyYW0gaW5kZXggdGhlIGluZGV4IGF0IHdoaWNoIHRvIHVwZGF0ZSB0aGUgYmFza2V0XG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBiYXNrZXQgd2FzIHVwZGF0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlQmFza2V0KGJhc2tldDogQmFza2V0LCBpbmRleCA6IG51bWJlcikgOiBib29sZWFuIHtcblxuICAgICAgICBjb25zdCBwcmV2SW5kZXggPSB0aGlzLmJhc2tldEluZGV4KGJhc2tldC5uYW1lKTtcbiAgICAgICAgaWYocHJldkluZGV4ICE9PSAtMSAmJiBpbmRleCAhPT0gcHJldkluZGV4KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBBIGJhc2tldCB3aXRoIHRoZSBzYW1lIG5hbWUgZXhpc3RzIGF0IGEgZGlmZmVyZW50IGluZGV4XG5cbiAgICAgICAgaWYoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuYmFza2V0cy5sZW5ndGgpe1xuXG4gICAgICAgICAgICB0aGlzLmJhc2tldHMuc3BsaWNlKGluZGV4LCAxLCBiYXNrZXQpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGUgOiBCYXNrZXRFdmVudFR5cGUuVXBkYXRlLCBiYXNrZXQ6IGJhc2tldH0pO1xuICAgICAgICAgICAgdGhpcy5wYXRjaEJhc2tldHMoW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogQmFza2V0RXZlbnRUeXBlLlVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNrZXQ6IGJhc2tldC5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlOyAgIC8vIFRoaXMgYmFza2V0IGRvZXMgbm90IGV4aXN0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZnVsbCBsaXN0IG9mIEJhc2tldHMuXG4gICAgICogRW1pdHMgYSBCYXNrZXQgZXZlbnQuXG4gICAgICogVXBkYXRlIHRoZSBkYXRhIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIGJhc2tldHMgdGhlIG5ldyBsaXN0IG9mIGJhc2tldHNcbiAgICAgKiBAcGFyYW0gYXVkaXRFdmVudHMgdGhlIGxpc3Qgb2YgYXVkaXQgZXZlbnRzIHRvIGxvZ1xuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVCYXNrZXRzKGJhc2tldHM6IEJhc2tldFtdLCBhdWRpdEV2ZW50cz86IEF1ZGl0RXZlbnRzKSA6IGJvb2xlYW4ge1xuICAgICAgICBVdGlscy5hcnJheVNldCh0aGlzLmJhc2tldHMsIGJhc2tldHMpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IEJhc2tldEV2ZW50VHlwZS5VcGRhdGV9KTtcbiAgICAgICAgdGhpcy5wYXRjaEJhc2tldHMoYXVkaXRFdmVudHMsIHRydWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBnaXZlbiBCYXNrZXQgKGJhc2VkIG9uIGl0cyBuYW1lKVxuICAgICAqIEVtaXRzIGFuIEJhc2tldCBldmVudC5cbiAgICAgKiBVcGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gYmFza2V0XG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBiYXNrZXQgd2FzIGRlbGV0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVsZXRlQmFza2V0KGJhc2tldDogQmFza2V0KSA6IGJvb2xlYW4ge1xuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5iYXNrZXRJbmRleChiYXNrZXQubmFtZSk7XG5cbiAgICAgICAgaWYoaW5kZXggPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBOb3RoaW5nIHRvIGRlbGV0ZVxuXG4gICAgICAgIHRoaXMuYmFza2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IEJhc2tldEV2ZW50VHlwZS5EZWxldGUsIGJhc2tldDogYmFza2V0fSk7XG4gICAgICAgIHRoaXMucGF0Y2hCYXNrZXRzKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBCYXNrZXRFdmVudFR5cGUuRGVsZXRlLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBzYXZlZHF1ZXJ5OiBiYXNrZXQubmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgb25lIG9yIG1vcmUgZG9jdW1lbnRzIHRvIGEgYmFza2V0LlxuICAgICAqIEVtaXRzIGEgQmFza2V0IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBuYW1lIGJhc2tldCB0byB3aGljaCB0byBhZGQgdGhlIGRvY3VtZW50KHMpXG4gICAgICogQHBhcmFtIGlkcyBpZChzKSBvZiB0aGUgZG9jdW1lbnQocykgdG8gYWRkIHRvIHRoZSBiYXNrZXRcbiAgICAgKiBAcGFyYW0gc2tpcFBhdGNoIGlmIHRydWUsIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyICh1c2UgZm9yIGJ1bGsgdXBkYXRlcylcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSBkb2N1bWVudCB3YXMgYWRkZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkVG9CYXNrZXQobmFtZTogc3RyaW5nLCBpZHM6IHN0cmluZyB8IHN0cmluZ1tdLCBza2lwUGF0Y2g/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghaWRzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmFza2V0ID0gdGhpcy5iYXNrZXQobmFtZSk7XG4gICAgICAgIGlmICghYmFza2V0KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghYmFza2V0LmlkcykgYmFza2V0LmlkcyA9IFtdO1xuICAgICAgICBpZiAoVXRpbHMuaXNBcnJheShpZHMpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSBpZHMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gaWRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChiYXNrZXQuaWRzLmluZGV4T2YoaWQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBiYXNrZXQuaWRzLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChiYXNrZXQuaWRzLmluZGV4T2YoPHN0cmluZz5pZHMpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGJhc2tldC5pZHMucHVzaCg8c3RyaW5nPmlkcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXNraXBQYXRjaCl7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IEJhc2tldEV2ZW50VHlwZS5BZGREb2N9KTtcbiAgICAgICAgICAgIHRoaXMucGF0Y2hCYXNrZXRzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBCYXNrZXRFdmVudFR5cGUuQWRkRG9jLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBiYXNrZXQ6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZG9jLWlkXCI6IGJhc2tldC5pZHNbMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIG9uZSBvciBtb3JlIGRvY3VtZW50cyBmcm9tIGEgYmFza2V0LlxuICAgICAqIEVtaXRzIGEgQmFza2V0IGV2ZW50LlxuICAgICAqIFVwZGF0ZSB0aGUgZGF0YSBvbiB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBuYW1lIGJhc2tldCBmcm9tIHdoaWNoIHRvIHJlbW92ZSB0aGUgZG9jdW1lbnQocylcbiAgICAgKiBAcGFyYW0gaWRzIGlkKHMpIG9mIHRoZSBkb2N1bWVudChzKSB0byByZW1vdmUgZnJvbSB0aGUgYmFza2V0XG4gICAgICogQHBhcmFtIHNraXBQYXRjaCBpZiB0cnVlLCB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGEgb24gdGhlIHNlcnZlciAodXNlIGZvciBidWxrIHVwZGF0ZXMpXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGUgZG9jdW1lbnQgd2FzIHJlbW92ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlRnJvbUJhc2tldChuYW1lOiBzdHJpbmcsIGlkczogc3RyaW5nIHwgc3RyaW5nW10sIHNraXBQYXRjaD86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCFpZHMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYXNrZXQgPSB0aGlzLmJhc2tldChuYW1lKTtcbiAgICAgICAgaWYgKCFiYXNrZXQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCFiYXNrZXQuaWRzKSBiYXNrZXQuaWRzID0gW107XG4gICAgICAgIGlmIChVdGlscy5pc0FycmF5KGlkcykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpYyA9IGlkcy5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSBpZHNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBiYXNrZXQuaWRzLmluZGV4T2YoaWQpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgYmFza2V0Lmlkcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYmFza2V0Lmlkcy5pbmRleE9mKDxzdHJpbmc+aWRzKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBiYXNrZXQuaWRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIXNraXBQYXRjaCl7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IEJhc2tldEV2ZW50VHlwZS5SZW1vdmVEb2N9KTtcbiAgICAgICAgICAgIHRoaXMucGF0Y2hCYXNrZXRzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBCYXNrZXRFdmVudFR5cGUuUmVtb3ZlRG9jLFxuICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICBiYXNrZXQ6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiZG9jLWlkXCI6IGJhc2tldC5pZHNbMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgZG9jdW1lbnQgZnJvbSBhbGwgdGhlIGJhc2tldHNcbiAgICAgKiBAcGFyYW0gaWQgaWQgb2YgdGhlIGRvY3VtZW50IHRvIHJlbW92ZVxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVGcm9tQWxsQmFza2V0cyhpZDogc3RyaW5nKSA6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBhdWRpdEV2ZW50czogQXVkaXRFdmVudFtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgYmFza2V0IG9mIHRoaXMuYmFza2V0cykge1xuICAgICAgICAgICAgaWYoIHRoaXMucmVtb3ZlRnJvbUJhc2tldChiYXNrZXQubmFtZSwgaWQsIHRydWUpICl7XG4gICAgICAgICAgICAgICAgYXVkaXRFdmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IEJhc2tldEV2ZW50VHlwZS5SZW1vdmVEb2MsXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFza2V0OiBiYXNrZXQubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZG9jLWlkXCI6IGlkXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihhdWRpdEV2ZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZSA6IEJhc2tldEV2ZW50VHlwZS5SZW1vdmVEb2N9KTtcbiAgICAgICAgICAgIHRoaXMucGF0Y2hCYXNrZXRzKGF1ZGl0RXZlbnRzLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgQmFza2V0cyBpbiBVc2VyIHNldHRpbmdzLlxuICAgICAqIEBwYXJhbSBhdWRpdEV2ZW50cyA6IEF1ZGl0IEV2ZW50cyB0byBiZSB0cmlnZ2VyZWRcbiAgICAgKiBAcmV0dXJucyBhbiBPYnNlcnZhYmxlIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHRyaWdnZXIgZnVydGhlciBldmVudHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHBhdGNoQmFza2V0cyhhdWRpdEV2ZW50cz86IEF1ZGl0RXZlbnRzLCB1cGRhdGVTZWFyY2g/OiBib29sZWFuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG9icyA9IHRoaXMudXNlclNldHRpbmdzU2VydmljZS5wYXRjaCh7YmFza2V0czogdGhpcy5iYXNrZXRzfSwgYXVkaXRFdmVudHMpO1xuICAgICAgICBvYnMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgbmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm5leHQoe3R5cGU6IEJhc2tldEV2ZW50VHlwZS5QYXRjaGVkfSk7XG4gICAgICAgICAgICAgICAgaWYodXBkYXRlU2VhcmNoICYmIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeS5iYXNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCgpOyAvLyBVcGRhdGUgc2VhcmNoIHJlc3VsdHMgdG8gcmVmbGVjdCB0aGUgbmV3IGJhc2tldCBjb250ZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IHBhdGNoIEJhc2tldHMhXCIsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnM7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gRVZFTlQgSEFORExFUlMgKE1lbnVzKVxuXG4gICAgLyoqXG4gICAgICogVXNlcyB0aGUgU2VhcmNoU2VydmljZSB0byBwZXJmb3JtIGEgc2VhcmNoIHJldHVybmluZyBhbGxcbiAgICAgKiB0aGUgZG9jdW1lbnRzIGluIHRoaXMgYmFza2V0XG4gICAgICogQHBhcmFtIGJhc2tldFxuICAgICAqIEBwYXJhbSBwYXRoXG4gICAgICogQHJldHVybnMgdGhlIHNlYXJjaCBzZXJ2aWNlIHByb21pc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VhcmNoQmFza2V0KGJhc2tldCA6IEJhc2tldCwgcGF0aD86IHN0cmluZykgOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnNlYXJjaFNlcnZpY2UubWFrZVF1ZXJ5KCk7XG4gICAgICAgIHF1ZXJ5LmJhc2tldCA9IGJhc2tldC5uYW1lO1xuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2Uuc2V0UXVlcnkocXVlcnkpO1xuICAgICAgICB0aGlzLl9ldmVudHMubmV4dCh7dHlwZTogQmFza2V0RXZlbnRUeXBlLk9wZW4sIGJhc2tldDogYmFza2V0fSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaFNlcnZpY2Uuc2VhcmNoKHsgcGF0aDogcGF0aCB9LCB7XG4gICAgICAgICAgICB0eXBlOiBCYXNrZXRFdmVudFR5cGUuT3BlbixcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIGJhc2tldDogYmFza2V0Lm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYSBkaWFsb2cgYWxsb3dpbmcgYSB1c2VyIHRvIGFkZCBvbmUgKG9yIG1vcmUpIGRvY3VtZW50KHMpXG4gICAgICogdG8gYSBiYXNrZXQuXG4gICAgICogQHBhcmFtIGlkcyBpZChzKSBvZiB0aGUgZG9jdW1lbnRzIHRvIGFkZCB0byBhIGJhc2tldFxuICAgICAqIEBwYXJhbSByZWNvcmRCYXNrZXRzIG5hbWVzIG9mIHRoZSBiYXNrZXRzIHRoZSBkb2N1bWVudCBhbHJlYWR5IGJlbG9uZ3MgdG9cbiAgICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgZGlhbG9nXG4gICAgICogdGhlIHJlc3VsdCBpcyB0cnVlIGlmIHRoZSBkb2N1bWVudCB3YXMgYWRkZWQgdG8gYSBiYXNrZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkVG9CYXNrZXRNb2RhbChpZHM6IHN0cmluZyB8IHN0cmluZ1tdLCByZWNvcmRCYXNrZXRzPzogc3RyaW5nW10pXG4gICAgICAgICAgICA6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBtb2RlbCA6IFNlbGVjdEJhc2tldE1vZGVsID0ge1xuICAgICAgICAgICAgYmFza2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBiYXNrZXRGaWx0ZXI6IHJlY29yZEJhc2tldHM/IGIgPT4gIXJlY29yZEJhc2tldHMuaW5jbHVkZXMoYi5uYW1lKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGFsbG93TmV3OiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLm9wZW4odGhpcy5iYXNrZXRDb21wb25lbnRzLnNlbGVjdEJhc2tldE1vZGFsLCB7bW9kZWw6IG1vZGVsfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuT0sgJiYgbW9kZWwuYmFza2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFRvQmFza2V0KG1vZGVsLmJhc2tldC5uYW1lLCBpZHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhIGRpYWxvZyBhbGxvd2luZyBhIHVzZXIgdG8gcmVtb3ZlIG9uZSAob3IgbW9yZSkgZG9jdW1lbnQocylcbiAgICAgKiBmcm9tIGEgYmFza2V0LlxuICAgICAqIEBwYXJhbSBpZHMgaWQocykgb2YgdGhlIGRvY3VtZW50cyB0byByZW1vdmUgZnJvbSBhIGJhc2tldFxuICAgICAqIEBwYXJhbSByZWNvcmRCYXNrZXRzIG5hbWVzIG9mIHRoZSBiYXNrZXRzIHRoZSBkb2N1bWVudCBhbHJlYWR5IGJlbG9uZ3MgdG9cbiAgICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgZGlhbG9nXG4gICAgICogdGhlIHJlc3VsdCBpcyB0cnVlIGlmIHRoZSBkb2N1bWVudCB3YXMgcmVtb3ZlZCBmcm9tIGEgYmFza2V0XG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUZyb21CYXNrZXRNb2RhbChpZHM6IHN0cmluZyB8IHN0cmluZ1tdLCByZWNvcmRCYXNrZXRzPzogc3RyaW5nW10pXG4gICAgICAgICAgICA6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjb25zdCBtb2RlbCA6IFNlbGVjdEJhc2tldE1vZGVsID0ge1xuICAgICAgICAgICAgYmFza2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBiYXNrZXRGaWx0ZXI6IHJlY29yZEJhc2tldHM/IGIgPT4gcmVjb3JkQmFza2V0cy5pbmNsdWRlcyhiLm5hbWUpIDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZVxuICAgICAgICAgICAgLm9wZW4odGhpcy5iYXNrZXRDb21wb25lbnRzLnNlbGVjdEJhc2tldE1vZGFsLCB7bW9kZWw6IG1vZGVsfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gTW9kYWxSZXN1bHQuT0sgJiYgbW9kZWwuYmFza2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUZyb21CYXNrZXQobW9kZWwuYmFza2V0Lm5hbWUsIGlkcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgZGlhbG9nIGFsbG93aW5nIGEgdXNlciB0byBjcmVhdGUgbmV3IGJhc2tldC5cbiAgICAgKiBAcGFyYW0gbW9kZWwgdGhlIGluaXRpYWwgYmFza2V0IG9iamVjdCBtb2RlbFxuICAgICAqIEByZXR1cm5zIGEgYm9vbGVhbiBwcm9taXNlIHJlc29sdmVkIHdoZW4gdGhlIHVzZXIgY2xvc2VzIHRoZSBkaWFsb2dcbiAgICAgKiB0aGUgcmVzdWx0IGlzIHRydWUgaWYgdGhlIGJhc2tldCB3YXMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQmFza2V0TW9kYWwobW9kZWw6IEJhc2tldCA9IHtuYW1lOiBcIlwifSkgOiBQcm9taXNlPGJvb2xlYW4+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLmJhc2tldENvbXBvbmVudHMuZWRpdEJhc2tldE1vZGFsLCB7bW9kZWw6IG1vZGVsfSlcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5iYXNrZXRJbmRleChtb2RlbC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2UueWVzTm8oXCJtc2cjYmFza2V0cy5iYXNrZXRBbHJlYWR5RXhpc3RzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBNb2RhbFJlc3VsdC5ZZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUJhc2tldChtb2RlbCwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVCYXNrZXQobW9kZWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBOb3QgcmVsZXZhbnQgYXMgb2Ygbm93XG4gICAgLy8gcHVibGljIGVkaXRCYXNrZXRNb2RhbChiYXNrZXQ6IEJhc2tldClcblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgZGlhbG9nIGFsbG93aW5nIGEgdXNlciB0byByZW9yZ2FuaXplIGFuZCBlZGl0IHRoZVxuICAgICAqIGxpc3Qgb2YgYmFza2V0cy5cbiAgICAgKiBAcmV0dXJucyBhIGJvb2xlYW4gcHJvbWlzZSByZXNvbHZlZCB3aGVuIHRoZSB1c2VyIGNsb3NlcyB0aGUgZGlhbG9nXG4gICAgICogdGhlIHJlc3VsdCBpcyB0cnVlIGlzIHRoZSBsaXN0IHdhcyB1cGRhdGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBtYW5hZ2VCYXNrZXRzTW9kYWwoKSA6IFByb21pc2U8Ym9vbGVhbj4ge1xuXG4gICAgICAgIGNvbnN0IG1vZGVsOiBNYW5hZ2VCYXNrZXRzTW9kZWwgPSB7IGJhc2tldHM6IFV0aWxzLmNvcHkodGhpcy5iYXNrZXRzKSB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5vcGVuKHRoaXMuYmFza2V0Q29tcG9uZW50cy5tYW5hZ2VCYXNrZXRzTW9kYWwsIHttb2RlbDogbW9kZWx9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IE1vZGFsUmVzdWx0Lk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUJhc2tldHMobW9kZWwuYmFza2V0cywgbW9kZWwuYXVkaXRFdmVudHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBidWlsZEJhc2tldHNBY3Rpb24oKSA6IEFjdGlvbiB7XG4gICAgICAgIHJldHVybiBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLXNob3BwaW5nLWJhc2tldFwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2Jhc2tldHMuYmFza2V0c1wiLFxuICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJtc2cjYmFza2V0cy5hZGRUb0Jhc2tldFwiLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IChpdGVtLCAkZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9CYXNrZXRNb2RhbCh0aGlzLnNlbGVjdGlvblNlcnZpY2UuZ2V0U2VsZWN0ZWRJZHMoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJtc2cjYmFza2V0cy5yZW1vdmVGcm9tQmFza2V0XCIsXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogKGl0ZW0sICRldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tQmFza2V0TW9kYWwodGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmdldFNlbGVjdGVkSWRzKCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB1cGRhdGVyOiAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmhpZGRlbiA9ICF0aGlzLnNlbGVjdGlvblNlcnZpY2UuaGF2ZVNlbGVjdGVkUmVjb3JkcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZVF1ZXJ5KGJhc2tldDogQmFza2V0KTogUXVlcnkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuc2VhcmNoU2VydmljZS5tYWtlUXVlcnkoKTtcbiAgICAgICAgcXVlcnkuYmFza2V0ID0gYmFza2V0Lm5hbWU7XG4gICAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG5cbiAgICBub3RpZnlPcGVuQmFza2V0KGJhc2tldDogQmFza2V0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5uZXh0KHt0eXBlOiBCYXNrZXRFdmVudFR5cGUuT3BlbiwgYmFza2V0fSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==