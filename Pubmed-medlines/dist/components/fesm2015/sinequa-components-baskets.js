import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵpipe, ɵɵelementEnd, ɵɵelement, ɵɵproperty, ɵɵadvance, ɵɵtextInterpolate, ɵɵpipeBind1, Component, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵpropertyInterpolate, ɵɵtemplate, ɵɵpureFunction1, ChangeDetectorRef, ɵɵNgOnChangesFeature, ɵɵclassMapInterpolate1, ɵɵpureFunction2, Input, ɵɵpureFunction4, ɵɵtextInterpolate1, ɵɵInheritDefinitionFeature, ɵɵpipeBind3, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { Utils } from '@sinequa/core/base';
import { Action, BsActionButtons, BsActionItem, BsActionModule } from '@sinequa/components/action';
import { UserSettingsWebService, PrincipalWebService, AppWebService } from '@sinequa/core/web-services';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { ModalService, ModalButton, MODAL_MODEL, ModalRef } from '@sinequa/core/modal';
import { SelectionService, BsSelectionModule, enSelection, frSelection, deSelection } from '@sinequa/components/selection';
import { NgIf, NgForOf, NgClass, SlicePipe, CommonModule } from '@angular/common';
import { FormControl, Validators, FormBuilder, ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MessagePipe, IntlModule } from '@sinequa/core/intl';
import { ValidationDirective, ValidationModule } from '@sinequa/core/validation';
import { Autofocus, UtilsModule } from '@sinequa/components/utils';
import { BsModal, BsEditable, BsModalModule, enModal, frModal, deModal } from '@sinequa/components/modal';
import { LoginService } from '@sinequa/core/login';
import { AbstractFacet } from '@sinequa/components/facet';
import { RouterLinkWithHref, RouterModule } from '@angular/router';

// Types of events triggering a change event
const BASKET_CHANGE_EVENTS = [
    "Basket_Loaded" /* Loaded */,
    "Basket_Add" /* Add */,
    "Basket_Delete" /* Delete */,
    "Basket_DeleteAll" /* DeleteAll */,
    "Basket_Update" /* Update */,
    "Basket_Rename" /* Rename */
];
const BASKET_COMPONENTS = new InjectionToken('BASKET_COMPONENTS');
class BasketsService {
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
BasketsService.ɵfac = function BasketsService_Factory(t) { return new (t || BasketsService)(ɵɵinject(UserSettingsWebService), ɵɵinject(SearchService), ɵɵinject(ModalService), ɵɵinject(SelectionService), ɵɵinject(BASKET_COMPONENTS)); };
BasketsService.ɵprov = ɵɵdefineInjectable({ token: BasketsService, factory: BasketsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BasketsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: UserSettingsWebService }, { type: SearchService }, { type: ModalService }, { type: SelectionService }, { type: undefined, decorators: [{
                type: Inject,
                args: [BASKET_COMPONENTS]
            }] }]; }, null); })();

class BsEditBasket {
    constructor(model, formBuilder) {
        this.model = model;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.nameControl = new FormControl(this.model.name, Validators.required);
        this.form = this.formBuilder.group({
            basketName: this.nameControl
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, (value) => {
            this.model.name = this.nameControl.value;
        });
        this.buttons = [
            new ModalButton({
                result: -1 /* OK */,
                primary: true,
                validation: this.form
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
}
BsEditBasket.ɵfac = function BsEditBasket_Factory(t) { return new (t || BsEditBasket)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(FormBuilder)); };
BsEditBasket.ɵcmp = ɵɵdefineComponent({ type: BsEditBasket, selectors: [["sq-edit-basket"]], decls: 7, vars: 7, consts: [["name", "editBasket", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "form-group", "sq-form-group"], ["for", "basketName"], ["type", "text", "id", "basketName", "formControlName", "basketName", "spellcheck", "off", "sqAutofocus", "", 1, "form-control", 3, "sqValidation"]], template: function BsEditBasket_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "label", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelement(6, "input", 4);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#editBasket.title")("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(5, 5, "msg#editBasket.name"));
        ɵɵadvance(2);
        ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, DefaultValueAccessor, NgControlStatus, FormControlName, Autofocus, ValidationDirective], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsEditBasket, [{
        type: Component,
        args: [{
                selector: "sq-edit-basket",
                templateUrl: "./edit-basket.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: FormBuilder }]; }, null); })();

function BsManageBaskets_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 6);
    ɵɵelementStart(1, "button", 7);
    ɵɵlistener("click", function BsManageBaskets_div_2_Template_button_click_1_listener() { ɵɵrestoreView(_r3); const ctx_r2 = ɵɵnextContext(); return ctx_r2.reorder(); });
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageBaskets.edit" : "msg#manageBaskets.reorder"));
} }
function BsManageBaskets_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 14);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const basket_r4 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(basket_r4.name);
} }
function BsManageBaskets_div_5_sq_editable_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "sq-editable", 15);
    ɵɵlistener("valueChange", function BsManageBaskets_div_5_sq_editable_2_Template_sq_editable_valueChange_0_listener($event) { ɵɵrestoreView(_r13); const basket_r4 = ɵɵnextContext().$implicit; const ctx_r11 = ɵɵnextContext(); return ctx_r11.setName(basket_r4, $event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const basket_r4 = ɵɵnextContext().$implicit;
    const ctx_r7 = ɵɵnextContext();
    ɵɵproperty("value", basket_r4.name)("model", basket_r4)("validators", ctx_r7.nameValidators);
} }
function BsManageBaskets_div_5_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r17 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 16);
    ɵɵlistener("click", function BsManageBaskets_div_5_a_4_Template_a_click_0_listener() { ɵɵrestoreView(_r17); const ctx_r16 = ɵɵnextContext(); const basket_r4 = ctx_r16.$implicit; const $index_r5 = ctx_r16.index; const ctx_r15 = ɵɵnextContext(); return ctx_r15.remove(basket_r4, $index_r5); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelement(2, "span", 17);
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, "msg#manageBaskets.remove"));
} }
function BsManageBaskets_div_5_span_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 18);
} }
const _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
const _c1 = function (a1) { return [_c0, a1]; };
function BsManageBaskets_div_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtemplate(1, BsManageBaskets_div_5_div_1_Template, 2, 1, "div", 9);
    ɵɵtemplate(2, BsManageBaskets_div_5_sq_editable_2_Template, 1, 3, "sq-editable", 10);
    ɵɵelementStart(3, "div", 11);
    ɵɵtemplate(4, BsManageBaskets_div_5_a_4_Template, 3, 3, "a", 12);
    ɵɵtemplate(5, BsManageBaskets_div_5_span_5_Template, 1, 0, "span", 13);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(5, _c1, ctx_r1.reordering ? "cursor-move" : ""));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.reordering);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r1.reordering);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r1.reordering);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r1.reordering);
} }
class BsManageBaskets {
    constructor(model) {
        this.model = model;
        this.reordering = false;
        this.nameValidators = [
            Validators.required,
            (control) => {
                const modelControl = control.root.get("model");
                if (modelControl) {
                    for (const item of this.model.baskets) {
                        if (modelControl.value === item) {
                            continue;
                        }
                        if (control.value === item.name) {
                            return {
                                unique: true
                            };
                        }
                    }
                }
                return null;
            }
        ];
    }
    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageBaskets.removeAll",
                result: 0 /* Custom */,
                action: (button) => {
                    this.model.baskets.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: "Basket_DeleteAll" /* DeleteAll */
                    });
                },
                visible: this.model.baskets.length > 0
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    addAuditEvent(auditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }
    reorder() {
        this.reordering = !this.reordering;
    }
    setName(basket, name) {
        if (!Utils.eqNC(basket.name, name)) {
            this.addAuditEvent({
                type: "Basket_Rename" /* Rename */,
                detail: {
                    basket: name,
                    "old-name": basket.name
                }
            });
            basket.name = name;
        }
    }
    remove(basket, index) {
        this.model.baskets.splice(index, 1);
        this.removeAllButton.visible = this.model.baskets.length > 0;
        this.addAuditEvent({
            type: "Basket_Delete" /* Delete */,
            detail: {
                basket: basket.name
            }
        });
        return false;
    }
    dropped(drop) {
        Utils.arrayMove(this.model.baskets, drop.previousIndex, drop.currentIndex);
    }
}
BsManageBaskets.ɵfac = function BsManageBaskets_Factory(t) { return new (t || BsManageBaskets)(ɵɵdirectiveInject(MODAL_MODEL)); };
BsManageBaskets.ɵcmp = ɵɵdefineComponent({ type: BsManageBaskets, selectors: [["sq-manage-baskets"]], decls: 6, vars: 6, consts: [["name", "manageBaskets", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["cdkDrag", "", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["cdkDrag", "", 3, "ngClass"], ["class", "sq-basket-text", 4, "ngIf"], ["name", "msg#manageBaskets.name", 3, "value", "model", "validators", "valueChange", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], [1, "sq-basket-text"], ["name", "msg#manageBaskets.name", 3, "value", "model", "validators", "valueChange"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"]], template: function BsManageBaskets_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵtemplate(2, BsManageBaskets_div_2_Template, 4, 3, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵelementStart(4, "div", 4);
        ɵɵlistener("cdkDropListDropped", function BsManageBaskets_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
        ɵɵtemplate(5, BsManageBaskets_div_5_Template, 6, 7, "div", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#manageBaskets.title")("buttons", ctx.buttons);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.model.baskets.length);
        ɵɵadvance(2);
        ɵɵproperty("cdkDropListData", ctx.model.baskets)("cdkDropListDisabled", !ctx.reordering);
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ctx.model.baskets);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgIf, CdkDropList, NgForOf, CdkDrag, NgClass, BsEditable], pipes: [MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-basket-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsManageBaskets, [{
        type: Component,
        args: [{
                selector: "sq-manage-baskets",
                templateUrl: "./manage-baskets.html",
                styleUrls: ["./manage-baskets.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }]; }, null); })();

function BsSelectBasket_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 6);
    ɵɵlistener("click", function BsSelectBasket_a_4_Template_a_click_0_listener() { ɵɵrestoreView(_r4); const basket_r2 = ctx.$implicit; const ctx_r3 = ɵɵnextContext(); return ctx_r3.select(basket_r2); });
    ɵɵelementStart(1, "div");
    ɵɵtext(2);
    ɵɵpipe(3, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const basket_r2 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(ɵɵpipeBind1(3, 1, basket_r2.name));
} }
function BsSelectBasket_a_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 6);
    ɵɵlistener("click", function BsSelectBasket_a_5_Template_a_click_0_listener() { ɵɵrestoreView(_r6); const ctx_r5 = ɵɵnextContext(); return ctx_r5.newBasket(); });
    ɵɵelementStart(1, "div");
    ɵɵelementStart(2, "i");
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 1, "msg#selectBasket.newBasket"));
} }
class BsSelectBasket {
    constructor(model, basketsService, modalRef) {
        this.model = model;
        this.basketsService = basketsService;
        this.modalRef = modalRef;
        this.baskets = this.basketsService.baskets;
        if (!this.baskets) {
            this.baskets = [];
        }
        this.buttons = [
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    ngOnInit() {
        if (!!this.model.basketFilter) {
            this.baskets = this.baskets.filter(this.model.basketFilter);
        }
    }
    activate(model) {
        this.model = model;
    }
    select(basket) {
        if (basket) {
            this.model.basket = basket;
            this.modalRef.close(-1 /* OK */);
        }
    }
    newBasket() {
        const model = { name: "" };
        this.basketsService.createBasketModal(model)
            .then((result) => {
            if (result) { // The basket was created
                this.select(model);
            }
        });
    }
}
BsSelectBasket.ɵfac = function BsSelectBasket_Factory(t) { return new (t || BsSelectBasket)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(BasketsService), ɵɵdirectiveInject(ModalRef)); };
BsSelectBasket.ɵcmp = ɵɵdefineComponent({ type: BsSelectBasket, selectors: [["sq-select-basket"]], decls: 6, vars: 4, consts: [["name", "selectBasket", "novalidate", ""], [3, "title", "buttons"], [1, "form-group"], [1, "list-group", "sq-list-group"], ["href", "javascript:void(0)", "class", "list-group-item list-group-item-action", 3, "click", 4, "ngFor", "ngForOf"], ["href", "javascript:void(0)", "class", "list-group-item list-group-item-action", 3, "click", 4, "ngIf"], ["href", "javascript:void(0)", 1, "list-group-item", "list-group-item-action", 3, "click"]], template: function BsSelectBasket_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵtemplate(4, BsSelectBasket_a_4_Template, 4, 3, "a", 4);
        ɵɵtemplate(5, BsSelectBasket_a_5_Template, 5, 3, "a", 5);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#selectBasket.title")("buttons", ctx.buttons);
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.baskets);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.model.allowNew);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgForOf, NgIf], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsSelectBasket, [{
        type: Component,
        args: [{
                selector: "sq-select-basket",
                templateUrl: "./select-basket.html"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: BasketsService }, { type: ModalRef }]; }, null); })();

const _c0$1 = function (a0) { return [a0]; };
const _c1$1 = function (a0, a2) { return { items: a0, autoAdjust: true, rightAligned: a2 }; };
/**
 * Component representing the add-to-baskets button in one item of the result list view.
 *
 */
class BsResultBaskets {
    constructor(modalService, basketsService, changeDetectorRef) {
        this.modalService = modalService;
        this.basketsService = basketsService;
        this.changeDetectorRef = changeDetectorRef;
        this.baskets = [];
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.addToBasketAction = this.buildAddToBasketAction();
            this.removeFromBasketAction = this.buildRemoveFromBasketAction();
            this.removeFromAllBasketsAction = this.buildRemovalFromAllBasketsAction();
            this.basketsSubscription = this.basketsService.changes.subscribe(event => {
                this.updateRecordBaskets();
                this.refreshVisualization();
            });
        }
        this.updateRecordBaskets();
        this.refreshVisualization();
    }
    ngOnDestroy() {
        if (this.basketsSubscription) {
            this.basketsSubscription.unsubscribe();
        }
    }
    get isInBaskets() {
        return this.baskets.length > 0;
    }
    refreshVisualization() {
        this.basketsAction = this.buildBasketsAction();
        this.changeDetectorRef.markForCheck();
    }
    updateRecordBaskets() {
        const currentBaskets = this.basketsService.baskets;
        this.baskets = [];
        for (const basket of currentBaskets) {
            if (!!basket.ids && basket.ids.includes(this.record.id)) {
                this.baskets.push(basket.name);
            }
        }
    }
    buildAddToBasketAction() {
        return new Action({
            text: 'msg#baskets.addToBasket',
            action: (item, $event) => {
                this.basketsService.addToBasketModal(this.record.id, this.baskets);
            }
        });
    }
    buildRemoveFromBasketAction() {
        return new Action({
            text: 'msg#baskets.removeFromBasket',
            action: (item, $event) => {
                this.basketsService.removeFromBasketModal(this.record.id, this.baskets);
            }
        });
    }
    buildRemovalFromAllBasketsAction() {
        return new Action({
            text: 'msg#baskets.removeFromAllBaskets',
            action: () => {
                this.modalService
                    .yesNo('msg#baskets.removeFromAllBasketsConfirmation', { values: { baskets: this.baskets.join(', ') } })
                    .then(result => {
                    if (result === -3 /* Yes */) {
                        this.basketsService.removeFromAllBaskets(this.record.id);
                    }
                });
            }
        });
    }
    buildBasketsAction() {
        return new Action({
            icon: 'fas fa-shopping-basket',
            title: 'msg#baskets.baskets',
            children: this.isInBaskets
                ? this.baskets.length === 1
                    ? [this.addToBasketAction, this.removeFromBasketAction]
                    : [this.addToBasketAction, this.removeFromBasketAction, this.removeFromAllBasketsAction]
                : [this.addToBasketAction]
        });
    }
}
BsResultBaskets.ɵfac = function BsResultBaskets_Factory(t) { return new (t || BsResultBaskets)(ɵɵdirectiveInject(ModalService), ɵɵdirectiveInject(BasketsService), ɵɵdirectiveInject(ChangeDetectorRef)); };
BsResultBaskets.ɵcmp = ɵɵdefineComponent({ type: BsResultBaskets, selectors: [["sq-result-baskets"]], inputs: { record: "record", rightAligned: "rightAligned" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 9, consts: [[3, "sq-action-buttons"]], template: function BsResultBaskets_Template(rf, ctx) { if (rf & 1) {
        ɵɵelement(0, "div", 0);
    } if (rf & 2) {
        ɵɵclassMapInterpolate1("btn-group ", ctx.isInBaskets ? "sq-document-in-baskets" : "sq-document-not-in-baskets", "");
        ɵɵproperty("sq-action-buttons", ɵɵpureFunction2(6, _c1$1, ɵɵpureFunction1(4, _c0$1, ctx.basketsAction), ctx.rightAligned));
    } }, directives: [BsActionButtons], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsResultBaskets, [{
        type: Component,
        args: [{
                selector: 'sq-result-baskets',
                templateUrl: './result-baskets.html'
            }]
    }], function () { return [{ type: ModalService }, { type: BasketsService }, { type: ChangeDetectorRef }]; }, { record: [{
            type: Input
        }], rightAligned: [{
            type: Input
        }] }); })();

const _c0$2 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsBasketsMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ɵɵpureFunction4(2, _c0$2, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
class BsBasketsMenuComponent {
    constructor(loginService, basketsService, principalService, userSettingsService, appService) {
        this.loginService = loginService;
        this.basketsService = basketsService;
        this.principalService = principalService;
        this.userSettingsService = userSettingsService;
        this.appService = appService;
        this.searchRoute = "/search";
        this.icon = "fas fa-shopping-basket";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = "xl";
        this.collapseBreakpoint = "sm";
        this.basketOptions = ["Select", "Share"];
        this.basketCustomOptions = [];
        this.createAction = new Action({
            text: "msg#baskets.createBasket",
            title: "msg#baskets.createBasket",
            action: (_) => {
                this.basketsService.createBasketModal();
            },
        });
        this.manageAction = new Action({
            text: "msg#baskets.manageBaskets",
            title: "msg#baskets.manageBaskets",
            action: (_) => {
                this.basketsService.manageBasketsModal();
            },
        });
    }
    ngOnInit() {
        this.updateMenu();
        this.basketsService.changes.subscribe({
            next: () => {
                this.updateMenu();
            },
        });
        this.loginService.events.subscribe((event) => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        //Select and Share options//
        const basketsActions = [];
        if (this.basketsService.hasBasket) {
            this.basketsService.baskets.map((basket) => basketsActions.push(new Action({
                text: basket.name,
                title: basket.name,
                children: [
                    new Action({
                        text: "Select",
                        title: "Select",
                        action: () => this.basketsService.searchBasket(basket, this.searchRoute),
                    }),
                    new Action({
                        text: "Share",
                        title: "Share",
                        action: () => this.sendEmail(basket, this.searchRoute),
                    }),
                ],
            })));
        }
        basketsActions.push(new Action({ separator: true }));
        basketsActions.push(this.createAction);
        if (this.basketsService.hasBasket) {
            basketsActions.push(this.manageAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#baskets.baskets",
            title: "msg#baskets.baskets",
            children: basketsActions,
        });
    }
    sendEmail(basket, curr) {
        var _a, _b;
        let mailToUrl = "";
        let name = (_b = (_a = this.principalService) === null || _a === void 0 ? void 0 : _a.principal) === null || _b === void 0 ? void 0 : _b.name;
        let basketName = basket.name;
        var query = "#/search?query=%7B%22name%22:%22" + this.appService.appName + "%22,%22basket%22:%22" + basketName + "%22,%22user%22:%22" + name + "%22,%22tab%22:%22ALL%22%7D&view=list" + "&user=" + name + "&sharedBasket=" + basketName;
        var body = "https://" + window.location.host + window.location.pathname + encodeURIComponent(query);
        console.log(body);
        //?query={%22name%22:%22GlobalSearch_V3.2%22,%22basket%22:%22Favorites%22,%22tab%22:%22ALL%22}&view=list&user=200035114&sharedBasket=Favorites
        mailToUrl = "mailto:?subject=Pubmed Search Basket&body=" + body;
        console.log(mailToUrl);
        window.location.href = mailToUrl;
    }
}
BsBasketsMenuComponent.ɵfac = function BsBasketsMenuComponent_Factory(t) { return new (t || BsBasketsMenuComponent)(ɵɵdirectiveInject(LoginService), ɵɵdirectiveInject(BasketsService), ɵɵdirectiveInject(PrincipalWebService), ɵɵdirectiveInject(UserSettingsWebService), ɵɵdirectiveInject(AppWebService)); };
BsBasketsMenuComponent.ɵcmp = ɵɵdefineComponent({ type: BsBasketsMenuComponent, selectors: [["sq-baskets-menu"]], inputs: { searchRoute: "searchRoute", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsBasketsMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsBasketsMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [NgIf, BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsBasketsMenuComponent, [{
        type: Component,
        args: [{
                selector: "sq-baskets-menu",
                templateUrl: "./baskets-menu.component.html",
            }]
    }], function () { return [{ type: LoginService }, { type: BasketsService }, { type: PrincipalWebService }, { type: UserSettingsWebService }, { type: AppWebService }]; }, { searchRoute: [{
            type: Input
        }], icon: [{
            type: Input
        }], autoAdjust: [{
            type: Input
        }], autoAdjustBreakpoint: [{
            type: Input
        }], collapseBreakpoint: [{
            type: Input
        }], size: [{
            type: Input
        }] }); })();

function BsFacetBasketsComponent_a_1_span_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const basket_r2 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(basket_r2.ids.length);
} }
function BsFacetBasketsComponent_a_1_i_4_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 8);
    ɵɵlistener("click", function BsFacetBasketsComponent_a_1_i_4_Template_i_click_0_listener($event) { ɵɵrestoreView(_r8); const basket_r2 = ɵɵnextContext().$implicit; const ctx_r6 = ɵɵnextContext(); return ctx_r6.deleteBasket(basket_r2, $event); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵproperty("title", ɵɵpipeBind1(1, 1, "msg#baskets.delete"));
} }
const _c0$3 = function (a0) { return [a0]; };
function BsFacetBasketsComponent_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "a", 3);
    ɵɵlistener("click", function BsFacetBasketsComponent_a_1_Template_a_click_0_listener() { ɵɵrestoreView(_r10); const basket_r2 = ctx.$implicit; const ctx_r9 = ɵɵnextContext(); return ctx_r9.openBasket(basket_r2); });
    ɵɵelementStart(1, "span", 4);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtemplate(3, BsFacetBasketsComponent_a_1_span_3_Template, 2, 1, "span", 5);
    ɵɵtemplate(4, BsFacetBasketsComponent_a_1_i_4_Template, 2, 3, "i", 6);
    ɵɵelementEnd();
} if (rf & 2) {
    const basket_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("routerLink", ɵɵpureFunction1(6, _c0$3, ctx_r0.searchRoute))("queryParams", ctx_r0.getQueryParams(basket_r2))("state", ctx_r0.getRouterState(basket_r2));
    ɵɵadvance(2);
    ɵɵtextInterpolate(basket_r2.name);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", basket_r2.ids);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.enableDelete);
} }
function BsFacetBasketsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#baskets.noBasket"), " ");
} }
class BsFacetBasketsComponent extends AbstractFacet {
    constructor(basketsService) {
        super();
        this.basketsService = basketsService;
        this.searchRoute = "/search";
        this.maxBaskets = 5;
        this.enableDelete = true;
        this.page = 0;
        this.createBasket = new Action({
            icon: "fas fa-plus",
            title: "msg#baskets.createBasket",
            action: () => {
                this.basketsService.createBasketModal();
            }
        });
        this.manageBasket = new Action({
            icon: "fas fa-cog",
            title: "msg#baskets.manageBaskets",
            action: () => {
                this.basketsService.manageBasketsModal();
            }
        });
        this.previousPage = new Action({
            icon: "fas fa-chevron-left",
            title: "msg#facet.previous",
            action: () => {
                this.page--;
            },
            updater: (action) => {
                action.disabled = this.page <= 0;
                action.hidden = this.maxPage === 0;
            }
        });
        this.nextPage = new Action({
            icon: "fas fa-chevron-right",
            title: "msg#facet.next",
            action: () => {
                this.page++;
            },
            updater: (action) => {
                action.disabled = this.page >= this.maxPage;
                action.hidden = this.maxPage === 0;
            }
        });
    }
    get maxPage() {
        return Math.max(0, Math.ceil(this.basketsService.baskets.length / this.maxBaskets) - 1);
    }
    get startIndex() {
        return this.page * this.maxBaskets;
    }
    get endIndex() {
        return (this.page + 1) * this.maxBaskets;
    }
    openBasket(basket) {
        this.basketsService.notifyOpenBasket(basket);
        return true;
    }
    get actions() {
        this.previousPage.update();
        this.nextPage.update();
        return [this.createBasket, this.previousPage, this.nextPage, this.manageBasket];
    }
    deleteBasket(basket, event) {
        event.stopPropagation();
        this.basketsService.deleteBasket(basket);
        this.page = Math.min(this.page, this.maxPage);
        return false;
    }
    getQueryParams(basket) {
        const query = this.basketsService.makeQuery(basket);
        const queryParams = query.toJsonForQueryString();
        return { query: queryParams };
    }
    getRouterState(basket) {
        return {
            audit: {
                type: "Basket_Open" /* Open */,
                detail: {
                    basket: basket.name
                }
            }
        };
    }
}
BsFacetBasketsComponent.ɵfac = function BsFacetBasketsComponent_Factory(t) { return new (t || BsFacetBasketsComponent)(ɵɵdirectiveInject(BasketsService)); };
BsFacetBasketsComponent.ɵcmp = ɵɵdefineComponent({ type: BsFacetBasketsComponent, selectors: [["sq-facet-baskets"]], inputs: { searchRoute: "searchRoute", maxBaskets: "maxBaskets", enableDelete: "enableDelete" }, features: [ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "list-group", "list-group-flush"], ["class", "basket-item list-group-item list-group-item-action d-flex align-items-center", 3, "routerLink", "queryParams", "state", "click", 4, "ngFor", "ngForOf"], ["class", "list-group-item text-center text-muted font-italic small py-5", 4, "ngIf"], [1, "basket-item", "list-group-item", "list-group-item-action", "d-flex", "align-items-center", 3, "routerLink", "queryParams", "state", "click"], [1, "basket-name", "text-truncate", "mr-auto"], ["class", "basket-count ml-2 text-muted small", 4, "ngIf"], ["class", "basket-delete ml-2 fas fa-times", 3, "title", "click", 4, "ngIf"], [1, "basket-count", "ml-2", "text-muted", "small"], [1, "basket-delete", "ml-2", "fas", "fa-times", 3, "title", "click"], [1, "list-group-item", "text-center", "text-muted", "font-italic", "small", "py-5"]], template: function BsFacetBasketsComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, BsFacetBasketsComponent_a_1_Template, 5, 8, "a", 1);
        ɵɵpipe(2, "slice");
        ɵɵtemplate(3, BsFacetBasketsComponent_div_3_Template, 3, 3, "div", 2);
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 2, ctx.basketsService.baskets, ctx.startIndex, ctx.endIndex));
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.basketsService.baskets.length == 0);
    } }, directives: [NgForOf, NgIf, RouterLinkWithHref], pipes: [SlicePipe, MessagePipe], styles: [".basket-item[_ngcontent-%COMP%]   .basket-delete[_ngcontent-%COMP%]{\n    opacity: 0;\n}\n\n.basket-item[_ngcontent-%COMP%]:hover   .basket-delete[_ngcontent-%COMP%]{\n    opacity: 1;\n    transition: opacity 0.2s ease-in-out;\n}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsFacetBasketsComponent, [{
        type: Component,
        args: [{
                selector: 'sq-facet-baskets',
                templateUrl: './facet-baskets.component.html',
                styles: [`
.basket-item .basket-delete{
    opacity: 0;
}

.basket-item:hover .basket-delete{
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
}
  `]
            }]
    }], function () { return [{ type: BasketsService }]; }, { searchRoute: [{
            type: Input
        }], maxBaskets: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }] }); })();

class BsBasketsModule {
}
BsBasketsModule.ɵmod = ɵɵdefineNgModule({ type: BsBasketsModule });
BsBasketsModule.ɵinj = ɵɵdefineInjector({ factory: function BsBasketsModule_Factory(t) { return new (t || BsBasketsModule)(); }, providers: [
        {
            provide: BASKET_COMPONENTS,
            useValue: {
                selectBasketModal: BsSelectBasket,
                editBasketModal: BsEditBasket,
                manageBasketsModal: BsManageBaskets
            }
        }
    ], imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            DragDropModule,
            RouterModule,
            BsModalModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsSelectionModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsBasketsModule, { declarations: [BsEditBasket, BsManageBaskets, BsSelectBasket,
        BsResultBaskets, BsBasketsMenuComponent,
        BsFacetBasketsComponent], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,
        RouterModule,
        BsModalModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsSelectionModule,
        BsActionModule], exports: [BsEditBasket, BsManageBaskets, BsSelectBasket,
        BsResultBaskets, BsBasketsMenuComponent,
        BsFacetBasketsComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsBasketsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    DragDropModule,
                    RouterModule,
                    BsModalModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsSelectionModule,
                    BsActionModule
                ],
                declarations: [
                    BsEditBasket, BsManageBaskets, BsSelectBasket,
                    BsResultBaskets, BsBasketsMenuComponent,
                    BsFacetBasketsComponent
                ],
                exports: [
                    BsEditBasket, BsManageBaskets, BsSelectBasket,
                    BsResultBaskets, BsBasketsMenuComponent,
                    BsFacetBasketsComponent
                ],
                providers: [
                    {
                        provide: BASKET_COMPONENTS,
                        useValue: {
                            selectBasketModal: BsSelectBasket,
                            editBasketModal: BsEditBasket,
                            manageBasketsModal: BsManageBaskets
                        }
                    }
                ]
            }]
    }], null, null); })();

var _enBaskets = {
    "baskets": {
        "baskets": "Baskets",
        "addToBasket": "Add to basket",
        "removeFromBasket": "Remove from basket",
        "removeFromAllBaskets": "Remove from all baskets",
        "removeFromAllBasketsConfirmation": "Are you sure you want to remove this result from these baskets: {baskets}?",
        "basketAlreadyExists": "A basket with that name already exists. Would you like to replace it?",
        "noBasket": "You have not yet added a document to a basket...",
        "createBasket": "Create Basket",
        "manageBaskets": "Manage Baskets",
        "delete": "Delete this basket"
    },
    "editBasket": {
        "title": "Basket",
        "name": "Name"
    },
    "manageBaskets": {
        "title": "Manage Baskets",
        "edit": "Edit",
        "reorder": "Reorder",
        "remove": "Remove",
        "removeAll": "Remove all",
        "name": "Name"
    },
    "selectBasket": {
        "title": "Select Basket",
        "newBasket": "New basket..."
    }
};

var _frBaskets = {
    "baskets": {
        "baskets": "Paniers",
        "addToBasket": "Ajouter au panier",
        "removeFromBasket": "Supprimer du panier",
        "removeFromAllBaskets": "Supprimer de tous les paniers",
        "removeFromAllBasketsConfirmation": "Êtes-vous sûr de vouloir supprimer ce résultat de ces paniers : {baskets} ?",
        "basketAlreadyExists": "Un panier avec ce nom existe déjà. Voulez-vous le remplacer ?",
        "noBasket": "Vous n'avez pas encore ajouté de document à un panier...",
        "createBasket": "Créer un panier",
        "manageBaskets": "Gérer les paniers",
        "delete": "Supprimer ce panier"
    },
    "editBasket": {
        "title": "Panier",
        "name": "Nom"
    },
    "manageBaskets": {
        "title": "Gérer les paniers",
        "edit": "Editer",
        "reorder": "Réorganiser",
        "remove": "Effacer",
        "removeAll": "Effacer tout",
        "name": "Nom"
    },
    "selectBasket": {
        "title": "Sélectionner un panier",
        "newBasket": "Nouveau panier..."
    },
};

var _deBaskets = {
    "baskets": {
        "baskets": "Ablagekörbe",
        "addToBasket": "Zum Ablagekorb hinzufügen",
        "removeFromBasket": "Aus dem Ablagekorb entfernen",
        "removeFromAllBaskets": "Von allen Ablagekörben entfernen",
        "removeFromAllBasketsConfirmation": "Möchten Sie dieses Eregbnis wirklich von diesen Ablagekörben entfernen: {baskets}?",
        "basketAlreadyExists": "Es existiert bereits ein Ablagekorb mit diesem Namen. Möchten Sie ihn ersetzen?",
        "noBasket": "Sie haben noch kein Dokument zu einem Ablagekorb hinzugefügt...",
        "createBasket": "Ablagekorb erstellen",
        "manageBaskets": "Ablagekörbe verwalten",
        "delete": "Diesen Ablagekorb löschen"
    },
    "editBasket": {
        "title": "Ablagekorb",
        "name": "Name"
    },
    "manageBaskets": {
        "title": "Ablagekörbe verwalten",
        "edit": "Bearbeiten",
        "reorder": "Neu sortieren",
        "remove": "Entfernen",
        "removeAll": "Alle entfernen",
        "name": "Name"
    },
    "selectBasket": {
        "title": "Ablagekorb auswählen",
        "newBasket": "Neuer Ablagekorb..."
    },
};

const enBaskets = Utils.merge({}, _enBaskets, enSearch, enSelection, enModal);
const frBaskets = Utils.merge({}, _frBaskets, frSearch, frSelection, frModal);
const deBaskets = Utils.merge({}, _deBaskets, deSearch, deSelection, deModal);

/**
 * Generated bundle index. Do not edit.
 */

export { BASKET_CHANGE_EVENTS, BASKET_COMPONENTS, BasketsService, BsBasketsMenuComponent, BsBasketsModule, BsEditBasket, BsFacetBasketsComponent, BsManageBaskets, BsResultBaskets, BsSelectBasket, deBaskets, enBaskets, frBaskets };
//# sourceMappingURL=sinequa-components-baskets.js.map
