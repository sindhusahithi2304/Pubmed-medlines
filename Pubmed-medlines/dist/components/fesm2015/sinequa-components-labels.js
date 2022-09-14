import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdirectiveInject, ɵɵinjectPipeChangeDetectorRef, ɵɵdefinePipe, Pipe, ChangeDetectorRef, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵpipe, ɵɵelementEnd, ɵɵpropertyInterpolate, ɵɵpipeBind1, ɵɵtext, ɵɵtemplate, ɵɵadvance, ɵɵproperty, ɵɵpureFunction2, ɵɵtextInterpolate, ɵɵpipeBind2, ɵɵdefineComponent, ɵɵclassMap, ɵɵNgOnChangesFeature, Component, Input, HostBinding, ɵɵelement, EventEmitter, ElementRef, ɵɵdefineDirective, ɵɵInheritDefinitionFeature, Directive, Output, HostListener, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule, ɵɵtextInterpolate1, ɵɵtemplateRefExtractor, ɵɵreference, ɵɵclassProp, ɵɵpureFunction4 } from '@angular/core';
import { NgIf, NgForOf, NgClass, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, FormControl, Validators, FormBuilder, FormGroupDirective, DefaultValueAccessor, NgControlStatus, FormControlName } from '@angular/forms';
import { IntlService, AbstractIntlPipe, MessagePipe, IntlModule } from '@sinequa/core/intl';
import { ValidationModule, ValidationDirective } from '@sinequa/core/validation';
import { UIService, UtilsModule } from '@sinequa/components/utils';
import { BsModalModule, BsModal, enModal, frModal, deModal } from '@sinequa/components/modal';
import { Autocomplete, AutocompleteState, SuggestService, BsAutocompleteModule, BsAutocompleteList } from '@sinequa/components/autocomplete';
import { of } from 'rxjs';
import { Utils, Keys } from '@sinequa/core/base';
import { Action, BsActionItem, BsActionModule } from '@sinequa/components/action';
import { LabelsWebService, PrincipalWebService } from '@sinequa/core/web-services';
import { AppService } from '@sinequa/core/app-utils';
import { SearchService, enSearch, frSearch, deSearch } from '@sinequa/components/search';
import { ModalService, ModalButton, MODAL_MODEL, ModalRef } from '@sinequa/core/modal';
import { NotificationsService } from '@sinequa/core/notification';
import { SelectionService, BsSelectionModule } from '@sinequa/components/selection';
import { LoginService } from '@sinequa/core/login';

const LABELS_COMPONENTS = new InjectionToken("LABELS_COMPONENTS");
class LabelsService {
    constructor(labelsWebService, appService, searchService, modalService, principalWebService, intlService, notificationService, selectionService, labelsComponents) {
        this.labelsWebService = labelsWebService;
        this.appService = appService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.principalWebService = principalWebService;
        this.intlService = intlService;
        this.notificationService = notificationService;
        this.selectionService = selectionService;
        this.labelsComponents = labelsComponents;
        this.principalWebService.events.subscribe((event) => {
            switch (event.type) {
                case "changed":
                    this._privateLabelsPrefix = undefined;
                    this.labelsRights = undefined;
                    this.labelsRightsSubscription = undefined;
                    break;
            }
        });
    }
    get publicLabelsField() {
        return this.appService.cclabels
            ? this.appService.cclabels.publicLabelsField
            : undefined;
    }
    get privateLabelsField() {
        return this.appService.cclabels
            ? this.appService.cclabels.privateLabelsField
            : undefined;
    }
    get labelsAutoSuggestWildcard() {
        return this.appService.cclabels
            ? this.appService.cclabels.labelsAutoSuggestWildcard
            : undefined;
    }
    get allowPublicLabelsManagement() {
        return this.appService.cclabels
            ? this.appService.cclabels.allowPublicLabelsCreation
            : false;
    }
    get allowPublicLabelsEdition() {
        return this.appService.cclabels
            ? this.appService.cclabels.allowPublicLabelsModification
            : false;
    }
    get userLabelsRights() {
        let rights;
        if (!this.labelsRights) {
            if (!this.labelsRightsSubscription) {
                const observable = this.labelsWebService.getUserRights();
                this.labelsRightsSubscription = Utils.subscribe(observable, (response) => (rights = response));
            }
            else {
                rights = LabelsService.defaultLabelsRights;
            }
            this.labelsRights = !!rights
                ? rights
                : LabelsService.defaultLabelsRights;
        }
        return this.labelsRights;
    }
    ngOnDestroy() {
        if (this.labelsRightsSubscription) {
            this.labelsRightsSubscription.unsubscribe();
        }
    }
    /** From navbar */
    renameLabelModal() {
        const data = {
            oldValues: [],
            newValue: "",
            properties: this._modalProperties(2 /* rename */),
        };
        return this.modalService.open(this.labelsComponents.renameModal, {
            model: data,
        });
    }
    deleteLabelModal() {
        const data = {
            values: [],
            properties: this._modalProperties(3 /* delete */),
        };
        return this.modalService.open(this.labelsComponents.deleteModal, {
            model: data,
        });
    }
    bulkAddLabelModal() {
        const data = {
            values: [],
            properties: this._modalProperties(4 /* bulkAdd */),
        };
        return this.modalService.open(this.labelsComponents.addModal, {
            model: data,
        });
    }
    bulkRemoveLabelModal() {
        const data = {
            values: [],
            properties: this._modalProperties(5 /* bulkRemove */),
        };
        return this.modalService.open(this.labelsComponents.deleteModal, {
            model: data,
        });
    }
    _modalProperties(action) {
        const allowManagePublicLabels = this.allowPublicLabelsManagement &&
            this.userLabelsRights &&
            this.userLabelsRights.canManagePublicLabels;
        const allowEditPublicLabels = this.allowPublicLabelsEdition &&
            this.userLabelsRights &&
            this.userLabelsRights.canEditPublicLabels;
        let allowNewLabels = false;
        let radioButtonsConf;
        switch (action) {
            case 2 /* rename */:
            case 1 /* remove */:
            case 3 /* delete */:
            case 5 /* bulkRemove */:
                allowNewLabels = false;
                break;
            case 0 /* add */:
            case 4 /* bulkAdd */:
            case 6 /* edit */:
                allowNewLabels = true;
                break;
            default:
                break;
        }
        switch (action) {
            case 2 /* rename */:
            case 3 /* delete */:
                radioButtonsConf = this._getModalRadioButtonsConf(allowManagePublicLabels);
                break;
            case 0 /* add */:
            case 4 /* bulkAdd */:
            case 1 /* remove */:
            case 5 /* bulkRemove */:
            case 6 /* edit */:
                radioButtonsConf = this._getModalRadioButtonsConf(allowManagePublicLabels || allowEditPublicLabels);
                break;
            default:
                break;
        }
        return Object.assign({ allowEditPublicLabels: allowEditPublicLabels, allowManagePublicLabels: allowManagePublicLabels, allowNewLabels: allowNewLabels, action: action }, radioButtonsConf);
    }
    _getModalRadioButtonsConf(publicRight) {
        let isPublic = true;
        let disableAutocomplete = false;
        let radioButtons = [];
        let publicRadioButton = {
            id: "publicLabel",
            name: "msg#labels.public",
            value: true,
            disabled: false,
            checked: true,
        };
        let privateRadioButton = {
            id: "privateLabel",
            name: "msg#labels.private",
            value: false,
            disabled: false,
            checked: false,
        };
        if (!!this.publicLabelsField && !!this.privateLabelsField) {
            if (publicRight) {
                isPublic = true;
                radioButtons = [publicRadioButton, privateRadioButton];
            }
            else {
                isPublic = false;
                publicRadioButton = Object.assign(Object.assign({}, publicRadioButton), { disabled: true, checked: false });
                privateRadioButton = Object.assign(Object.assign({}, privateRadioButton), { disabled: true, checked: true });
                radioButtons = [publicRadioButton, privateRadioButton];
            }
        }
        else if (!!this.publicLabelsField) {
            if (publicRight) {
                isPublic = true;
                publicRadioButton = Object.assign(Object.assign({}, publicRadioButton), { disabled: true, checked: true });
                radioButtons = [publicRadioButton];
            }
            else {
                isPublic = false;
                disableAutocomplete = true;
                publicRadioButton = Object.assign(Object.assign({}, publicRadioButton), { disabled: true, checked: false });
                radioButtons = [publicRadioButton];
            }
        }
        else if (!!this.privateLabelsField) {
            isPublic = false;
            privateRadioButton = Object.assign(Object.assign({}, privateRadioButton), { disabled: true, checked: true });
            radioButtons = [privateRadioButton];
        }
        return {
            public: isPublic,
            disableAutocomplete: disableAutocomplete,
            radioButtons: radioButtons,
        };
    }
    /** END From navbar */
    /** From result selector */
    buildSelectionAction() {
        if (!this.publicLabelsField && !this.privateLabelsField) {
            return undefined;
        }
        const action = new Action({
            icon: "fas fa-tags",
            title: "msg#labels.labels",
            action: () => {
                this.editLabelModal();
            },
        });
        if (action) {
            action.updater = (action) => {
                action.hidden = !this.selectionService.haveSelectedRecords;
            };
            action.hidden = true;
        }
        return action;
    }
    editLabelModal() {
        const data = {
            valuesToBeAdded: [],
            valuesToBeRemoved: [],
            properties: this._modalProperties(6 /* edit */),
        };
        return this.modalService.open(this.labelsComponents.editModal, {
            model: data,
        });
    }
    /** END result selector */
    addLabels(labels, ids, _public) {
        if (!labels || labels.length === 0 || !ids || ids.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.add(labels, ids, _public);
        return observable;
    }
    removeLabels(labels, ids, _public) {
        if (!labels || labels.length === 0 || !ids || ids.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.remove(labels, ids, _public);
        return observable;
    }
    selectLabels(labels, _public) {
        const field = this.appService.cclabels &&
            (_public
                ? this.appService.cclabels.publicLabelsField
                : this.appService.cclabels.privateLabelsField);
        if (!field) {
            return Promise.resolve(false);
        }
        const items = [];
        const selectedLabels = this.getSelectedLabels(field);
        for (let label of labels) {
            const display = label;
            if (!_public) {
                label = this.addPrivatePrefix(label);
            }
            if (selectedLabels.indexOf(label) === -1) {
                items.push({
                    value: label,
                    display: display,
                });
            }
        }
        this.searchService.addFieldSelect(field, items);
        return this.searchService.search(undefined, {
            type: "Label_Open" /* Label_Open */,
            detail: {
                label: !!labels ? labels.toString() : null,
                public: _public,
            },
        });
    }
    /**
     * Retrieves the labels that are not in the current filters of breadcrumbs
     *
     * @param field The column index containing the labels.
     * @returns The selected labels
     */
    getSelectedLabels(field) {
        var _a;
        const labels = [];
        if (field && ((_a = this.searchService.breadcrumbs) === null || _a === void 0 ? void 0 : _a.activeSelects)) {
            for (const select of this.searchService.breadcrumbs.activeSelects) {
                if (select.expr) {
                    const values = select.expr.getValues(field);
                    values.forEach((value) => {
                        if (labels.indexOf(value) === -1) {
                            labels.push(value);
                        }
                    });
                }
            }
        }
        return labels;
    }
    renameLabels(labels, newLabel, _public) {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.rename(labels, newLabel, _public);
        Utils.subscribe(observable, () => { }, () => {
            this.notificationService.error("msg#renameLabel.errorFeedback");
        }, () => {
            this.notificationService.success("msg#renameLabel.successFeedback");
            this.searchService.search(); /** Update the display immediately in the components and facets*/
        });
        return observable;
    }
    deleteLabels(labels, _public) {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.delete(labels, _public);
        Utils.subscribe(observable, () => { }, () => {
            this.notificationService.error("msg#deleteLabel.errorFeedback");
        }, () => {
            this.notificationService.success("msg#deleteLabel.successFeedback");
            this.searchService.search(); /** Update the display immediately in the components and facets*/
        });
        return observable;
    }
    bulkAddLabels(labels, _public) {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.bulkAdd(labels, this.searchService.query, _public);
        Utils.subscribe(observable, () => { }, () => {
            this.notificationService.error("msg#bulkAddLabel.errorFeedback");
        }, () => {
            this.notificationService.success("msg#bulkAddLabel.successFeedback");
            this.searchService.search(); /** Update the display immediately in the components and facets*/
        });
        return observable;
    }
    bulkRemoveLabels(labels, _public) {
        if (!labels || labels.length === 0) {
            return of();
        }
        const observable = this.labelsWebService.bulkRemove(labels, this.searchService.query, _public);
        Utils.subscribe(observable, () => { }, () => {
            this.notificationService.error("msg#bulkRemoveLabel.errorFeedback");
        }, () => {
            this.notificationService.success("msg#bulkRemoveLabel.successFeedback");
            this.searchService.search(); /** Update the display immediately in the components and facets*/
        });
        return observable;
    }
    get privateLabelsPrefix() {
        if (!this.principalWebService.principal) {
            return "";
        }
        if (!this._privateLabelsPrefix && this.appService.cclabels) {
            if (this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
                this._privateLabelsPrefix = Utils.addUrl("/", Utils.replace(this.principalWebService.principal.userId, "|", "/"), "/");
            }
            else {
                this._privateLabelsPrefix =
                    this.principalWebService.principal.userId + "|";
            }
        }
        return this._privateLabelsPrefix || "";
    }
    sort(labels, _public) {
        if (!labels)
            return labels;
        return labels.sort((a, b) => {
            if (!a)
                return -1;
            if (!b)
                return 1;
            if (!_public) {
                a = this.removePrivatePrefix(a);
                b = this.removePrivatePrefix(b);
            }
            a = this.intlService.formatMessage(a);
            b = this.intlService.formatMessage(b);
            return a.localeCompare(b);
        });
    }
    split(labels) {
        if (!labels) {
            return [];
        }
        return labels
            .trim()
            .split(/\s*;\s*/)
            .filter((value) => {
            return value !== "";
        });
    }
    _addPrivatePrefix(label) {
        if (this.appService.cclabels &&
            this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
            return Utils.addUrl(this.privateLabelsPrefix, label);
        }
        else {
            return this.privateLabelsPrefix + label;
        }
    }
    addPrivatePrefix(labels) {
        if (typeof labels === "string") {
            return this._addPrivatePrefix(labels);
        }
        else {
            for (let i = 0, ic = labels.length; i < ic; i++) {
                labels[i] = this._addPrivatePrefix(labels[i]);
            }
            return labels;
        }
    }
    _removePrivatePrefix(label) {
        if (label.indexOf(this.privateLabelsPrefix) === 0) {
            if (this.appService.cclabels &&
                this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
                return label.slice(this.privateLabelsPrefix.length - 1);
            }
            else {
                return label.slice(this.privateLabelsPrefix.length);
            }
        }
        return label;
    }
    removePrivatePrefix(labels) {
        if (typeof labels === "string") {
            return this._removePrivatePrefix(labels);
        }
        else {
            for (let i = 0, ic = labels.length; i < ic; i++) {
                labels[i] = this._removePrivatePrefix(labels[i]);
            }
            return labels;
        }
    }
}
LabelsService.defaultLabelsRights = {
    canManagePublicLabels: true,
    canEditPublicLabels: true,
};
LabelsService.ɵfac = function LabelsService_Factory(t) { return new (t || LabelsService)(ɵɵinject(LabelsWebService), ɵɵinject(AppService), ɵɵinject(SearchService), ɵɵinject(ModalService), ɵɵinject(PrincipalWebService), ɵɵinject(IntlService), ɵɵinject(NotificationsService), ɵɵinject(SelectionService), ɵɵinject(LABELS_COMPONENTS)); };
LabelsService.ɵprov = ɵɵdefineInjectable({ token: LabelsService, factory: LabelsService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LabelsService, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], function () { return [{ type: LabelsWebService }, { type: AppService }, { type: SearchService }, { type: ModalService }, { type: PrincipalWebService }, { type: IntlService }, { type: NotificationsService }, { type: SelectionService }, { type: undefined, decorators: [{
                type: Inject,
                args: [LABELS_COMPONENTS]
            }] }]; }, null); })();

class LabelPipe extends AbstractIntlPipe {
    constructor(labelsService, intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
        this.labelsService = labelsService;
    }
    updateValue(value, _public) {
        super.updateValue(value, _public);
        this.value = value;
        if (!_public) {
            this.value = this.labelsService.removePrivatePrefix(this.value);
        }
        this.value = this.intlService.formatMessage(this.value);
    }
}
LabelPipe.ɵfac = function LabelPipe_Factory(t) { return new (t || LabelPipe)(ɵɵdirectiveInject(LabelsService), ɵɵdirectiveInject(IntlService), ɵɵinjectPipeChangeDetectorRef()); };
LabelPipe.ɵpipe = ɵɵdefinePipe({ name: "sqLabel", type: LabelPipe, pure: false });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LabelPipe, [{
        type: Pipe,
        args: [{ name: "sqLabel", pure: false }]
    }], function () { return [{ type: LabelsService }, { type: IntlService }, { type: ChangeDetectorRef }]; }, null); })();

function Labels_div_0_span_1_i_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "i", 6);
    ɵɵlistener("click", function Labels_div_0_span_1_i_6_Template_i_click_0_listener() { ɵɵrestoreView(_r7); const $index_r3 = ɵɵnextContext().index; const ctx_r5 = ɵɵnextContext(2); return ctx_r5.remove($index_r3); });
    ɵɵpipe(1, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(3);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(1, 1, ctx_r4.public ? "msg#labels.removePublicLabelTitle" : "msg#labels.removePrivateLabelTitle"));
} }
const _c0 = function (a0, a1) { return { "sq-labels-public": a0, "sq-labels-private": a1 }; };
function Labels_div_0_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 1);
    ɵɵelementStart(1, "div", 3);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementStart(3, "span", 4);
    ɵɵlistener("click", function Labels_div_0_span_1_Template_span_click_3_listener() { ɵɵrestoreView(_r9); const label_r2 = ctx.$implicit; const ctx_r8 = ɵɵnextContext(2); return ctx_r8.select(label_r2); });
    ɵɵtext(4);
    ɵɵpipe(5, "sqLabel");
    ɵɵelementEnd();
    ɵɵtemplate(6, Labels_div_0_span_1_i_6_Template, 2, 3, "i", 5);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const label_r2 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("title", ɵɵpipeBind1(2, 4, ctx_r1.public ? "msg#labels.selectPublicLabelTitle" : "msg#labels.selectPrivateLabelTitle"));
    ɵɵproperty("ngClass", ɵɵpureFunction2(9, _c0, ctx_r1.public, !ctx_r1.public));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind2(5, 6, label_r2, ctx_r1.public));
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.canRemove());
} }
function Labels_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵtemplate(1, Labels_div_0_span_1_Template, 7, 12, "span", 2);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r0.labels);
} }
class Labels {
    constructor(appService, labelsService) {
        this.appService = appService;
        this.labelsService = labelsService;
        this.enableDelete = false; /** Display the delete button in the label tag */
    }
    ngOnChanges() {
        const field = this.public
            ? this.labelsService.publicLabelsField
            : this.labelsService.privateLabelsField;
        this.labelsField = this.appService.resolveColumnAlias(field);
        this.showLabels = !!this.labelsField;
        this.makeLabels();
    }
    makeLabels() {
        if (!this.showLabels) {
            this.labels = [];
            return;
        }
        const labels = this.record[this.labelsField];
        if (Utils.isArray(labels)) {
            this.labels = this.labelsService.sort(labels.slice(), this.public);
        }
        else {
            this.labels = [];
        }
    }
    select(label) {
        if (!this.public) {
            label = this.labelsService.removePrivatePrefix(label);
        }
        this.labelsService.selectLabels([label], this.public);
    }
    remove(index) {
        if (this.canRemove()) {
            let label = this.labels[index];
            if (!this.public) {
                label = this.labelsService.removePrivatePrefix(label);
            }
            this.labelsService.removeLabels([label], [this.record.id], this.public);
        }
    }
    canRemove() {
        return this.public
            ? this.enableDelete &&
                this.labelsService.allowPublicLabelsManagement &&
                this.labelsService.userLabelsRights &&
                this.labelsService.userLabelsRights.canManagePublicLabels
            : this.enableDelete && true;
    }
}
Labels.ɵfac = function Labels_Factory(t) { return new (t || Labels)(ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(LabelsService)); };
Labels.ɵcmp = ɵɵdefineComponent({ type: Labels, selectors: [["sq-labels"]], hostVars: 2, hostBindings: function Labels_HostBindings(rf, ctx) { if (rf & 2) {
        ɵɵclassMap(ctx.hostClasses);
    } }, inputs: { record: "record", public: "public", enableDelete: "enableDelete" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "d-inline", 4, "ngIf"], [1, "d-inline"], ["class", "d-inline", 4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-info", "align-self-center", "mr-1", "d-inline", 3, "ngClass", "title"], [3, "click"], ["class", "sq-label-remove fas fa-times-circle clickable", 3, "title", "click", 4, "ngIf"], [1, "sq-label-remove", "fas", "fa-times-circle", "clickable", 3, "title", "click"]], template: function Labels_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, Labels_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.showLabels);
    } }, directives: [NgIf, NgForOf, NgClass], pipes: [MessagePipe, LabelPipe], styles: [".sq-labels-public[_ngcontent-%COMP%] {\n                background-color: #4fc3f7;\n            }\n            .sq-labels-private[_ngcontent-%COMP%] {\n                background-color: #7283a7;\n            }\n            .sq-label-remove[_ngcontent-%COMP%] {\n                margin-left: 3px;\n            }\n            .clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(Labels, [{
        type: Component,
        args: [{
                selector: "sq-labels",
                // We need the two spans to get whitespace between each label
                // change size by adding h1-6 class to .sq-label div (default is h5)
                templateUrl: "./labels.component.html",
                styles: [
                    `
            .sq-labels-public {
                background-color: #4fc3f7;
            }
            .sq-labels-private {
                background-color: #7283a7;
            }
            .sq-label-remove {
                margin-left: 3px;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: AppService }, { type: LabelsService }]; }, { record: [{
            type: Input
        }], public: [{
            type: Input
        }], enableDelete: [{
            type: Input
        }], hostClasses: [{
            type: HostBinding,
            args: ["class"]
        }] }); })();

function ResultLabels_span_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 2);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r0.caption));
} }
class ResultLabels {
}
ResultLabels.ɵfac = function ResultLabels_Factory(t) { return new (t || ResultLabels)(); };
ResultLabels.ɵcmp = ɵɵdefineComponent({ type: ResultLabels, selectors: [["sq-result-labels"]], inputs: { record: "record", caption: "caption", public: "public" }, decls: 2, vars: 3, consts: [["class", "sq-text", 4, "ngIf"], [3, "record", "public"], [1, "sq-text"]], template: function ResultLabels_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, ResultLabels_span_0_Template, 3, 3, "span", 0);
        ɵɵelement(1, "sq-labels", 1);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.caption);
        ɵɵadvance(1);
        ɵɵproperty("record", ctx.record)("public", ctx.public);
    } }, directives: [NgIf, Labels], pipes: [MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ResultLabels, [{
        type: Component,
        args: [{
                selector: "sq-result-labels",
                templateUrl: "./result-labels.component.html"
            }]
    }], null, { record: [{
            type: Input
        }], caption: [{
            type: Input
        }], public: [{
            type: Input
        }] }); })();

class LabelsAutocomplete extends Autocomplete {
    constructor(elementRef, suggestService, appService, uiService, labelsWebService, labelsService) {
        super(elementRef, suggestService, appService, uiService);
        this.labelsWebService = labelsWebService;
        this.labelsService = labelsService;
        /** Event synchronizing the list of selected labels in the parent component */
        this.itemsUpdate = new EventEmitter();
        /** Enable adding new labels in labelsItems or not */
        this.allowNewLabels = false;
        /** Define the right of adding new labels in labelsItems or not */
        this.allowManagePublicLabels = false;
        /** Stores the selected labels items selected via Tab */
        this.labelsItems = [];
        /** Stores the suggestions retrieved by th server in order to perform checks on key.enter events */
        this._suggestions = [];
    }
    /**
     * The ngOnInit() method from the original directive is overriden
     * On initialization, we listen to the autocomplete component for
     * selection events
     */
    ngOnInit() {
        this._dropdownSubscription = this.dropdown.clicked.subscribe((item) => {
            this.select(item, true); // An item was selected from the autocomplete => take the value
        });
        this.start();
    }
    /**
     * If the inputs changes state, react accordingly
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes["labelsItems"]) {
            this.updatePlaceholder();
        }
        // Override start() by using init() instead, so that no double queries are generated and autocomplete dropdown is shown only on focus
        if (changes["off"] && !this.off) {
            this.init();
        }
        // If labels category changes, we must remove the selected labels items and reinitialize the autocomplete
        if (changes["public"] && !changes["public"].firstChange) {
            const newInitLabels = [...changes["labelsItems"].currentValue];
            this.inputElement.blur();
            /** Reset the input Value*/
            this.setInputValue("");
            /** initialize the input needed specially for labels edit cases */
            this.updatePlaceholder();
            this.itemsUpdate.next(newInitLabels);
        }
    }
    /**
     * The getSuggests() method from the original directive is overriden to
     * use the labelsService rather than suggest service.
     */
    getSuggests() {
        const value = this.getInputValue();
        if (value) {
            // parse
            const labels = value.split(";");
            // find label at caret location
            const position = this.getInputPosition();
            let length = 0;
            let val;
            for (const label of labels) {
                if (position >= length && position <= length + label.length) {
                    val = {
                        value: label,
                        start: length,
                        length: label.length,
                    };
                    break;
                }
                length += label.length + 1;
            }
            // Get suggestions from web service
            if (val) {
                this._getLabelsSuggestions(val.value);
            }
        }
        else {
            if (!!this.labelsService.labelsAutoSuggestWildcard) {
                this._getLabelsSuggestions(this.labelsService.labelsAutoSuggestWildcard);
            }
            else {
                this.start();
            }
        }
    }
    _getLabelsSuggestions(val) {
        this.labelsWebService.list(val, this.public).subscribe((labels) => {
            if (this.getState() === AutocompleteState.ACTIVE ||
                this.getState() === AutocompleteState.OPENED) {
                /** Eliminate suggestions that are already selected */
                labels.labels = labels.labels.filter((label) => !this.labelsItems.find((item) => item.display === label));
                /** update the local list of suggestions */
                this._suggestions = labels.labels;
                /** limit the suggestions to be displayed to 10  */
                labels.labels = labels.labels.slice(0, 10);
                this.dropdown.update(true, labels.labels.map((label) => {
                    return {
                        display: label,
                        category: "",
                    };
                }));
            }
        }, () => {
            this.dropdown.update(false);
        }, () => {
            if (this.dropdown.hasItems &&
                this.getState() === AutocompleteState.ACTIVE) {
                this.open(); // Switch from ACTIVE to OPENED (if not already)
            }
            else if (!this.dropdown.hasItems &&
                this.getState() === AutocompleteState.OPENED) {
                // No data
                this.active(); // Switch from OPENED to ACTIVE (if not already)
            }
        });
    }
    /**
     * The setAutocompleteItem() method from the original directive is overriden to
     * Sets the content of the <input> based on the given
     * Autocomplete Item.
     * @returns false since labels items don't need to be searched
     */
    setAutocompleteItem(item) {
        if (item) {
            // Store the autocomplete items that will be used to create a selection
            this.labelsItems.push(item);
            this.updatePlaceholder();
            this.itemsUpdate.next(this.labelsItems);
            this.setInputValue("");
        }
        return false;
    }
    /**
     * The startOrActive() method from the original directive is overriden to
     * immediately switch to ACTIVE if it is not the case
     */
    startOrActive() {
        if (this.getState() !== AutocompleteState.ACTIVE &&
            this.getState() !== AutocompleteState.OPENED) {
            // Avoid flickering
            this.start();
            this.active();
        }
    }
    /**
     * Listen to user's keyboard actions in the <input>, in order to navigate
     * and select the autocomplete suggestions.
     * Overrides the parent keydown method, adds the management of the backspace key
     * to remove labels items, enhance the enter key to support adding new labels.
     * @param event the keyboard
     */
    keydown(event) {
        const keydown = super.keydown(event);
        if (keydown === undefined) {
            //We can remove selections by typing <backspace> when the input is empty
            if (event.keyCode === Keys.backspace) {
                if (this.getInputValue() === "") {
                    this.labelsItems.pop();
                    this.updatePlaceholder();
                    this.itemsUpdate.next(this.labelsItems);
                }
            }
            /** Allow the selection one of new labels that not exists in the list */
            if (event.keyCode === Keys.enter) {
                this._manageSetAutocompleteItem();
            }
        }
        return keydown;
    }
    /**
     * Listens to focus events on the <input> host and overrides the parent focus events in order to launch the autocomplete
     * If empty input :
     * - display top relevent labels if the auto-suggest wildcard is configured
     * - restart the autocomplete if no auto-suggest wildcard is found
     * If not empty input :
     * retrieve suggestions based on this input text
     */
    focus() {
        this.start();
        this.active();
    }
    /**
     * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
     */
    blur(event) {
        this._manageSetAutocompleteItem();
        this.init();
    }
    /**
     * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
     * @param event
     */
    inputChanged(event) {
        switch (this.getState()) {
            case AutocompleteState.OPENED:
                this.suggest(); // Just request more data, but no state change
                break;
            case AutocompleteState.START:
            case AutocompleteState.ACTIVE:
                this.active(); // get more data, and change state if not already ACTIVE
                break;
            case AutocompleteState.SELECTED:
                this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                this.active();
                break;
            case AutocompleteState.INIT:
                break;
        }
    }
    /**
     * Updates the <input>'s placeholder to avoid displaying something
     * when there are labelsItems displayed to the left.
     */
    updatePlaceholder() {
        this._placeholder = this.labelsItems.length > 0 ? "" : this.placeholder;
    }
    _manageSetAutocompleteItem() {
        /** Always consider if there is text in the <input> and that it is not yet added in the labelsItems  */
        if (!!this.getInputValue() && this.getInputValue() !== "") {
            if (this.allowNewLabels) {
                /** When it is an add Labels action ==> check the privilege to create new label */
                if (!this.public ||
                    (this.public && this.allowManagePublicLabels)) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: "",
                    });
                }
            }
            else {
                /** For all other actions on the labels, check if the typed text equals an existing label in the _suggestions  */
                if (this._suggestions.indexOf(this.getInputValue()) > -1) {
                    this.setAutocompleteItem({
                        display: this.getInputValue(),
                        category: "",
                    });
                }
            }
        }
    }
}
LabelsAutocomplete.ɵfac = function LabelsAutocomplete_Factory(t) { return new (t || LabelsAutocomplete)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(SuggestService), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(UIService), ɵɵdirectiveInject(LabelsWebService), ɵɵdirectiveInject(LabelsService)); };
LabelsAutocomplete.ɵdir = ɵɵdefineDirective({ type: LabelsAutocomplete, selectors: [["", "sqAutocompleteLabels", ""]], hostBindings: function LabelsAutocomplete_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("focus", function LabelsAutocomplete_focus_HostBindingHandler() { return ctx.focus(); })("blur", function LabelsAutocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function LabelsAutocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); });
    } }, inputs: { public: "public", allowNewLabels: "allowNewLabels", allowManagePublicLabels: "allowManagePublicLabels", labelsItems: "labelsItems" }, outputs: { itemsUpdate: "itemsUpdate" }, features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LabelsAutocomplete, [{
        type: Directive,
        args: [{
                selector: "[sqAutocompleteLabels]",
            }]
    }], function () { return [{ type: ElementRef }, { type: SuggestService }, { type: AppService }, { type: UIService }, { type: LabelsWebService }, { type: LabelsService }]; }, { itemsUpdate: [{
            type: Output
        }], public: [{
            type: Input
        }], allowNewLabels: [{
            type: Input
        }], allowManagePublicLabels: [{
            type: Input
        }], labelsItems: [{
            type: Input
        }], focus: [{
            type: HostListener,
            args: ["focus"]
        }], blur: [{
            type: HostListener,
            args: ["blur", ["$event"]]
        }], inputChanged: [{
            type: HostListener,
            args: ["input", ["$event"]]
        }] }); })();

class LabelsModule {
}
LabelsModule.ɵmod = ɵɵdefineNgModule({ type: LabelsModule });
LabelsModule.ɵinj = ɵɵdefineInjector({ factory: function LabelsModule_Factory(t) { return new (t || LabelsModule)(); }, imports: [[
            FormsModule, ReactiveFormsModule,
            CommonModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsModalModule,
            BsAutocompleteModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(LabelsModule, { declarations: [LabelPipe, Labels, ResultLabels, LabelsAutocomplete], imports: [FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsModalModule,
        BsAutocompleteModule], exports: [LabelPipe, Labels, ResultLabels, LabelsAutocomplete] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(LabelsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    FormsModule, ReactiveFormsModule,
                    CommonModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsModalModule,
                    BsAutocompleteModule,
                ],
                declarations: [
                    LabelPipe, Labels, ResultLabels, LabelsAutocomplete
                ],
                exports: [
                    LabelPipe, Labels, ResultLabels, LabelsAutocomplete
                ],
            }]
    }], null, null); })();

const _c0$1 = function (a0, a1) { return { "label-public": a0, "label-private": a1 }; };
function BsLabelsAutocompleteComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 7);
    ɵɵtext(1);
    ɵɵelementStart(2, "span", 8);
    ɵɵlistener("click", function BsLabelsAutocompleteComponent_span_3_Template_span_click_2_listener() { ɵɵrestoreView(_r6); const item_r4 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(); return ctx_r5.removeItem(item_r4); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction2(2, _c0$1, ctx_r0.public, !ctx_r0.public));
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", item_r4.display, " ");
} }
function BsLabelsAutocompleteComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 9);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate1("", item_r7.display, " ");
} }
/**
 * Component containing a form and autocomplete to search
 * through the list labels according to a specific type (public/private) and select one(s) of them
 *
 * The component can be used as custom component in the Action
 * menu's modals.
 */
class BsLabelsAutocompleteComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        /** Event synchronizing the list of selected labels and label's type in the parent component */
        this.labelsUpdate = new EventEmitter();
        this.disableAutocomplete = false /** Whether the autocomplete input is disabled or not */;
        this.initLabels = []; /** Initial labels to be displayed in the labelsAutocomplete input*/
        this.labelsItems = []; /** List of assigned labels to selected record(s) */
    }
    ngOnChanges(changes) {
        if (changes.public) {
            this.labelsItems = [];
        }
        if (changes.initLabels) {
            this.labelsItems = this.initLabels.map((label) => {
                return {
                    display: label,
                    category: "",
                };
            });
        }
    }
    removeItem(item) {
        this.labelsItems.splice(this.labelsItems.indexOf(item), 1);
        this.labelsItems = [
            ...this.labelsItems,
        ]; /** Need to programmatically update this.labelsItems object in order to fire ngOnChanges hook in sqAutocompleteLabels */
        this.labelsUpdate.next(this.labelsItems.map((item) => item.display));
    }
    onLabelsItemsChanged(labelsItems) {
        this.labelsItems = labelsItems; /** Need to Programmatically update this.labelsItems to catch updates happening in the sqAutocompleteLabels  */
        this.labelsUpdate.next(labelsItems.map((item) => item.display));
    }
    getDropdownItem() {
        if (this.elementRef) {
            let current = this.elementRef
                .nativeElement;
            while (current && !current.classList.contains("dropdown-item")) {
                current = current.parentElement;
            }
            return current;
        }
        return null;
    }
    keydown(event) {
        // Intercept tab and set focus to surrounding dropdown-item
        if (event.keyCode === Keys.tab) {
            const dropdownItem = this.getDropdownItem();
            if (dropdownItem) {
                dropdownItem.focus();
                event.preventDefault();
                return false;
            }
        }
        return undefined;
    }
    keypress(event) {
        if (event.keyCode === Keys.enter) {
            // Stop click event firing on surrounding anchor (Firefox)
            event.preventDefault();
            return false;
        }
        return undefined;
    }
}
BsLabelsAutocompleteComponent.ɵfac = function BsLabelsAutocompleteComponent_Factory(t) { return new (t || BsLabelsAutocompleteComponent)(ɵɵdirectiveInject(ElementRef)); };
BsLabelsAutocompleteComponent.ɵcmp = ɵɵdefineComponent({ type: BsLabelsAutocompleteComponent, selectors: [["sq-labels-autocomplete"]], inputs: { public: "public", disableAutocomplete: "disableAutocomplete", allowNewLabels: "allowNewLabels", allowManagePublicLabels: "allowManagePublicLabels", initLabels: "initLabels" }, outputs: { labelsUpdate: "labelsUpdate" }, features: [ɵɵNgOnChangesFeature], decls: 10, vars: 13, consts: [["name", "labelsForm", 1, "d-inline"], [1, "sq-dropdown-form"], [1, "form-control"], ["class", "badge badge-pill badge-info align-self-center", 3, "ngClass", 4, "ngFor", "ngForOf"], ["type", "text", "name", "labelName", "spellcheck", "false", "autocomplete", "off", "sqAutocompleteLabels", "", 1, "input-autocomplete", "flex-grow-1", 3, "public", "placeholder", "dropdown", "allowNewLabels", "allowManagePublicLabels", "disabled", "off", "labelsItems", "keydown", "keypress", "itemsUpdate"], ["dropdown", ""], ["itemTpl", ""], [1, "badge", "badge-pill", "badge-info", "align-self-center", 3, "ngClass"], [1, "fas", "fa-times-circle", "clickable", 3, "click"], [1, "autocomplete-item", "p-2"]], template: function BsLabelsAutocompleteComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "section", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵtemplate(3, BsLabelsAutocompleteComponent_span_3_Template, 3, 5, "span", 3);
        ɵɵelementStart(4, "input", 4);
        ɵɵlistener("keydown", function BsLabelsAutocompleteComponent_Template_input_keydown_4_listener($event) { return ctx.keydown($event); })("keypress", function BsLabelsAutocompleteComponent_Template_input_keypress_4_listener($event) { return ctx.keypress($event); })("itemsUpdate", function BsLabelsAutocompleteComponent_Template_input_itemsUpdate_4_listener($event) { return ctx.onLabelsItemsChanged($event); });
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(6, "sq-autocomplete-list", null, 5);
        ɵɵtemplate(8, BsLabelsAutocompleteComponent_ng_template_8_Template, 2, 1, "ng-template", null, 6, ɵɵtemplateRefExtractor);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = ɵɵreference(7);
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.labelsItems);
        ɵɵadvance(1);
        ɵɵclassProp("disabled", ctx.disableAutocomplete);
        ɵɵproperty("public", ctx.public)("placeholder", ɵɵpipeBind1(5, 11, "msg#labels.selectLabel"))("dropdown", _r1)("allowNewLabels", ctx.allowNewLabels)("allowManagePublicLabels", ctx.allowManagePublicLabels)("disabled", ctx.disableAutocomplete)("off", ctx.disableAutocomplete)("labelsItems", ctx.labelsItems);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, NgForOf, LabelsAutocomplete, BsAutocompleteList, NgClass], pipes: [MessagePipe], styles: [".sq-dropdown-form[_ngcontent-%COMP%] {\n                min-width: 13rem;\n                display: inline;\n            }\n            .disabled[_ngcontent-%COMP%] {\n                cursor: not-allowed;\n            }\n            [_nghost-%COMP%]     .sq-autocomplete-list {\n                width: 50% !important;\n            }\n            .clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }\n            .label-public[_ngcontent-%COMP%] {\n                background-color: #4fc3f7;\n                margin: 2px;\n            }\n            .label-private[_ngcontent-%COMP%] {\n                background-color: #7283a7;\n                margin: 2px;\n            }\n\n            [_nghost-%COMP%]   div[_ngcontent-%COMP%] {\n                width: 100%;\n                display: flex;\n                flex-wrap: wrap;\n                align-items: center;\n                height: unset !important;\n            }\n            [_nghost-%COMP%]   input[_ngcontent-%COMP%] {\n                border: none;\n                flex-grow: 1;\n                flex-basis: 100px;\n                min-width: 100px;\n            }\n            [_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus {\n                outline: none;\n            }"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsLabelsAutocompleteComponent, [{
        type: Component,
        args: [{
                selector: "sq-labels-autocomplete",
                templateUrl: "./labels-autocomplete.component.html",
                styles: [
                    `
            .sq-dropdown-form {
                min-width: 13rem;
                display: inline;
            }
            .disabled {
                cursor: not-allowed;
            }
            :host ::ng-deep .sq-autocomplete-list {
                width: 50% !important;
            }
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
            .label-public {
                background-color: #4fc3f7;
                margin: 2px;
            }
            .label-private {
                background-color: #7283a7;
                margin: 2px;
            }

            :host div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                height: unset !important;
            }
            :host input {
                border: none;
                flex-grow: 1;
                flex-basis: 100px;
                min-width: 100px;
            }
            :host input:focus {
                outline: none;
            }
        `,
                ],
            }]
    }], function () { return [{ type: ElementRef }]; }, { labelsUpdate: [{
            type: Output
        }], public: [{
            type: Input
        }], disableAutocomplete: [{
            type: Input
        }], allowNewLabels: [{
            type: Input
        }], allowManagePublicLabels: [{
            type: Input
        }], initLabels: [{
            type: Input
        }] }); })();

const _c0$2 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsRenameLabel_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 8);
    ɵɵelementStart(1, "input", 9);
    ɵɵlistener("click", function BsRenameLabel_div_7_Template_input_click_1_listener() { ɵɵrestoreView(_r3); const item_r1 = ctx.$implicit; const ctx_r2 = ɵɵnextContext(); return ctx_r2.updateLabelsNature(item_r1.value); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "label", 10);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("id", item_r1.id);
    ɵɵpropertyInterpolate("value", item_r1.value);
    ɵɵproperty("checked", item_r1.checked)("disabled", item_r1.disabled)("ngClass", ɵɵpureFunction2(9, _c0$2, item_r1.disabled, !item_r1.disabled));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("for", item_r1.id);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 7, item_r1.name));
} }
class BsRenameLabel {
    constructor(model, formBuilder, labelsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.formBuilder = formBuilder;
        this.labelsService = labelsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.isProcessing = false;
    }
    ngOnInit() {
        this.labelControl = new FormControl(this.model.newValue, Validators.required);
        this.form = this.formBuilder.group({
            label: this.labelControl,
        });
        this.formChanges = Utils.subscribe(this.form.valueChanges, () => {
            this.model.newValue = this.labelControl.value;
        });
        this.buttons = [
            new ModalButton({
                text: "msg#renameLabel.btnRename",
                primary: true,
                validation: this.form,
                result: 0 /* Custom */,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.renameLabels(this.model.oldValues, this.model.newValue, this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.modalRef.close(error);
                        }, () => {
                            this.isProcessing = false;
                            this.modalRef.close(-1 /* OK */);
                        });
                    }
                },
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            }),
        ];
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    updateLabelsNature(nature) {
        this.model.properties.public = nature;
    }
    onLabelsChanged(values) {
        this.model.oldValues = values;
    }
}
BsRenameLabel.ɵfac = function BsRenameLabel_Factory(t) { return new (t || BsRenameLabel)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(LabelsService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ModalRef)); };
BsRenameLabel.ɵcmp = ɵɵdefineComponent({ type: BsRenameLabel, selectors: [["sq-rename-label"]], decls: 19, vars: 22, consts: [["name", "renameLabel", "novalidate", "", 3, "formGroup"], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-danger"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], ["type", "text", "id", "label", "formControlName", "label", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation", "placeholder"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsRenameLabel_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(6, "section");
        ɵɵtemplate(7, BsRenameLabel_div_7_Template, 5, 12, "div", 4);
        ɵɵelementEnd();
        ɵɵelementStart(8, "b");
        ɵɵelementStart(9, "label", 5);
        ɵɵtext(10);
        ɵɵpipe(11, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(12, "sq-labels-autocomplete", 6);
        ɵɵlistener("labelsUpdate", function BsRenameLabel_Template_sq_labels_autocomplete_labelsUpdate_12_listener($event) { return ctx.onLabelsChanged($event); });
        ɵɵelementEnd();
        ɵɵelementStart(13, "b");
        ɵɵelementStart(14, "label", 5);
        ɵɵtext(15);
        ɵɵpipe(16, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelement(17, "input", 7);
        ɵɵpipe(18, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵproperty("formGroup", ctx.form);
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#renameLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        ɵɵadvance(3);
        ɵɵtextInterpolate1(" ", ɵɵpipeBind1(5, 14, "msg#renameLabel.alertText"), " ");
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(11, 16, "msg#renameLabel.oldLabels"));
        ɵɵadvance(2);
        ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(16, 18, "msg#renameLabel.newLabel"));
        ɵɵadvance(2);
        ɵɵpropertyInterpolate("placeholder", ɵɵpipeBind1(18, 20, "msg#renameLabel.newLabel"));
        ɵɵproperty("sqValidation", ctx.form);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, FormGroupDirective, BsModal, NgForOf, BsLabelsAutocompleteComponent, DefaultValueAccessor, NgControlStatus, FormControlName, ValidationDirective, NgClass], pipes: [MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsRenameLabel, [{
        type: Component,
        args: [{
                selector: "sq-rename-label",
                templateUrl: "./rename-label.html",
                styles: [
                    `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: FormBuilder }, { type: LabelsService }, { type: ChangeDetectorRef }, { type: ModalRef }]; }, null); })();

const _c0$3 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
function BsLabelsMenuComponent_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "li", 1);
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("sq-action-item", ɵɵpureFunction4(2, _c0$3, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
} }
class BsLabelsMenuComponent {
    constructor(loginService, labelsService) {
        this.loginService = loginService;
        this.labelsService = labelsService;
        this.icon = "fas fa-tags";
        this.autoAdjust = true;
        this.autoAdjustBreakpoint = "xl";
        this.collapseBreakpoint = "sm";
        this.renameAction = new Action({
            text: "msg#renameLabel.title",
            title: "msg#renameLabel.title",
            action: () => {
                this.labelsService.renameLabelModal();
            },
        });
        this.deleteAction = new Action({
            text: "msg#deleteLabel.title",
            title: "msg#deleteLabel.title",
            action: () => {
                this.labelsService.deleteLabelModal();
            },
        });
        this.bulkAddAction = new Action({
            text: "msg#bulkAddLabel.title",
            title: "msg#bulkAddLabel.title",
            action: () => {
                this.labelsService.bulkAddLabelModal();
            },
        });
        this.bulkDeleteAction = new Action({
            text: "msg#bulkRemoveLabel.title",
            title: "msg#bulkRemoveLabel.title",
            action: () => {
                this.labelsService.bulkRemoveLabelModal();
            },
        });
    }
    ngOnInit() {
        this._loginServiceSubscription = this.loginService.events.subscribe((event) => {
            if (event.type === "session-changed") {
                this.updateMenu();
            }
        });
    }
    ngOnDestroy() {
        if (this._loginServiceSubscription) {
            this._loginServiceSubscription.unsubscribe();
        }
    }
    ngOnChanges(changes) {
        if (changes.results) {
            this.updateMenu();
        }
    }
    updateMenu() {
        if (!this.loginService.complete) {
            this.menu = undefined;
            return;
        }
        if (!this.labelsService.publicLabelsField &&
            !this.labelsService.privateLabelsField) {
            this.menu = undefined;
            return;
        }
        const labelsActions = [this.renameAction, this.deleteAction];
        /** Allow Bulk actions only if there are some results */
        if (!!this.results && !!this.results.records) {
            labelsActions.push(this.bulkAddAction);
            labelsActions.push(this.bulkDeleteAction);
        }
        this.menu = new Action({
            icon: this.icon,
            text: "msg#labels.labels",
            children: labelsActions,
        });
    }
}
BsLabelsMenuComponent.ɵfac = function BsLabelsMenuComponent_Factory(t) { return new (t || BsLabelsMenuComponent)(ɵɵdirectiveInject(LoginService), ɵɵdirectiveInject(LabelsService)); };
BsLabelsMenuComponent.ɵcmp = ɵɵdefineComponent({ type: BsLabelsMenuComponent, selectors: [["sq-labels-menu"]], inputs: { results: "results", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsLabelsMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, BsLabelsMenuComponent_li_0_Template, 1, 7, "li", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
    } }, directives: [NgIf, BsActionItem], encapsulation: 2 });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsLabelsMenuComponent, [{
        type: Component,
        args: [{
                selector: "sq-labels-menu",
                templateUrl: "./labels-menu.component.html",
            }]
    }], function () { return [{ type: LoginService }, { type: LabelsService }]; }, { results: [{
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

const _c0$4 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsDeleteLabel_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 7);
    ɵɵelementStart(1, "input", 8);
    ɵɵlistener("click", function BsDeleteLabel_div_7_Template_input_click_1_listener() { ɵɵrestoreView(_r3); const item_r1 = ctx.$implicit; const ctx_r2 = ɵɵnextContext(); return ctx_r2.updateLabelsNature(item_r1.value); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "label", 9);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("id", item_r1.id);
    ɵɵpropertyInterpolate("value", item_r1.value);
    ɵɵproperty("checked", item_r1.checked)("disabled", item_r1.disabled)("ngClass", ɵɵpureFunction2(9, _c0$4, item_r1.disabled, !item_r1.disabled));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("for", item_r1.id);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 7, item_r1.name));
} }
const _c1 = function (a0, a1) { return { "alert-danger": a0, "alert-warning": a1 }; };
class BsDeleteLabel {
    constructor(model, labelsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.labelsService = labelsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.isProcessing = false;
    }
    ngOnInit() {
        switch (this.model.properties.action) {
            case 3 /* delete */:
                this.title = "msg#deleteLabel.title";
                this.btnText = "msg#deleteLabel.btnDelete";
                this.alert = "msg#deleteLabel.alertText";
                this._action = () => {
                    const observable = this.labelsService.deleteLabels(this.model.values, this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.modalRef.close(error);
                        }, () => {
                            this.isProcessing = false;
                            this.modalRef.close(-1 /* OK */);
                        });
                    }
                };
                break;
            case 5 /* bulkRemove */:
                this.title = "msg#bulkRemoveLabel.title";
                this.btnText = "msg#bulkRemoveLabel.btnBulkRemove";
                this.alert = "msg#bulkRemoveLabel.alertText";
                this._action = () => {
                    const observable = this.labelsService.bulkRemoveLabels(this.model.values, this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.modalRef.close(error);
                        }, () => {
                            this.isProcessing = false;
                            this.modalRef.close(-1 /* OK */);
                        });
                    }
                };
                break;
            default:
                this.title = "";
                this.btnText = "";
                this.alert = "";
                break;
        }
        this.buttons = [
            new ModalButton({
                text: this.btnText,
                primary: true,
                result: 0 /* Custom */,
                anchor: true,
                action: this._action,
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            }),
        ];
    }
    updateLabelsNature(nature) {
        this.model.properties.public = nature;
    }
    onLabelsChanged(values) {
        this.model.values = values;
    }
}
BsDeleteLabel.ɵfac = function BsDeleteLabel_Factory(t) { return new (t || BsDeleteLabel)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(LabelsService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ModalRef)); };
BsDeleteLabel.ɵcmp = ɵɵdefineComponent({ type: BsDeleteLabel, selectors: [["sq-delete-label"]], decls: 13, vars: 18, consts: [["name", "deleteLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", 3, "ngClass"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsDeleteLabel_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementStart(6, "section");
        ɵɵtemplate(7, BsDeleteLabel_div_7_Template, 5, 12, "div", 4);
        ɵɵelementEnd();
        ɵɵelementStart(8, "b");
        ɵɵelementStart(9, "label", 5);
        ɵɵtext(10);
        ɵɵpipe(11, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(12, "sq-labels-autocomplete", 6);
        ɵɵlistener("labelsUpdate", function BsDeleteLabel_Template_sq_labels_autocomplete_labelsUpdate_12_listener($event) { return ctx.onLabelsChanged($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", ctx.title)("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction2(15, _c1, ctx.model.properties.action === 3, ctx.model.properties.action === 5));
        ɵɵadvance(1);
        ɵɵtextInterpolate1(" ", ɵɵpipeBind1(5, 11, ctx.alert), " ");
        ɵɵadvance(3);
        ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(11, 13, "msg#labels.labels"));
        ɵɵadvance(2);
        ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgClass, NgForOf, BsLabelsAutocompleteComponent], pipes: [MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsDeleteLabel, [{
        type: Component,
        args: [{
                selector: "sq-delete-label",
                templateUrl: "./delete-label.html",
                styles: [
                    `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: LabelsService }, { type: ChangeDetectorRef }, { type: ModalRef }]; }, null); })();

function BsAddLabel_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#bulkAddLabel.infoText"), " ");
} }
const _c0$5 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsAddLabel_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 9);
    ɵɵelementStart(1, "input", 10);
    ɵɵlistener("click", function BsAddLabel_div_8_Template_input_click_1_listener() { ɵɵrestoreView(_r4); const item_r2 = ctx.$implicit; const ctx_r3 = ɵɵnextContext(); return ctx_r3.updateLabelsNature(item_r2.value); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "label", 11);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("id", item_r2.id);
    ɵɵpropertyInterpolate("value", item_r2.value);
    ɵɵproperty("checked", item_r2.checked)("disabled", item_r2.disabled)("ngClass", ɵɵpureFunction2(9, _c0$5, item_r2.disabled, !item_r2.disabled));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("for", item_r2.id);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 7, item_r2.name));
} }
class BsAddLabel {
    constructor(model, labelsService, changeDetectorRef, modalRef) {
        this.model = model;
        this.labelsService = labelsService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        this.isProcessing = false;
    }
    ngOnInit() {
        this.buttons = [
            new ModalButton({
                text: "msg#bulkAddLabel.btnBulkAdd",
                primary: true,
                result: 0 /* Custom */,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.bulkAddLabels(this.model.values, this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.modalRef.close(error);
                        }, () => {
                            this.isProcessing = false;
                            this.modalRef.close(-1 /* OK */);
                        });
                    }
                },
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            }),
        ];
    }
    updateLabelsNature(nature) {
        this.model.properties.public = nature;
    }
    onLabelsChanged(values) {
        this.model.values = values;
    }
}
BsAddLabel.ɵfac = function BsAddLabel_Factory(t) { return new (t || BsAddLabel)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(LabelsService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ModalRef)); };
BsAddLabel.ɵcmp = ɵɵdefineComponent({ type: BsAddLabel, selectors: [["sq-add-label"]], decls: 14, vars: 15, consts: [["name", "addLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-warning"], ["class", "alert alert-info", "role", "alert", 4, "ngIf"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], ["role", "alert", 1, "alert", "alert-info"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsAddLabel_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵtemplate(6, BsAddLabel_div_6_Template, 3, 3, "div", 4);
        ɵɵelementStart(7, "section");
        ɵɵtemplate(8, BsAddLabel_div_8_Template, 5, 12, "div", 5);
        ɵɵelementEnd();
        ɵɵelementStart(9, "b");
        ɵɵelementStart(10, "label", 6);
        ɵɵtext(11);
        ɵɵpipe(12, "sqMessage");
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementStart(13, "sq-labels-autocomplete", 7);
        ɵɵlistener("labelsUpdate", function BsAddLabel_Template_sq_labels_autocomplete_labelsUpdate_13_listener($event) { return ctx.onLabelsChanged($event); });
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#bulkAddLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        ɵɵadvance(3);
        ɵɵtextInterpolate1(" ", ɵɵpipeBind1(5, 11, "msg#bulkAddLabel.alertText"), " ");
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.model.properties.allowManagePublicLabels || !ctx.model.properties.public);
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        ɵɵadvance(3);
        ɵɵtextInterpolate(ɵɵpipeBind1(12, 13, "msg#labels.labels"));
        ɵɵadvance(2);
        ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgIf, NgForOf, BsLabelsAutocompleteComponent, NgClass], pipes: [MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsAddLabel, [{
        type: Component,
        args: [{
                selector: "sq-add-label",
                templateUrl: "./add-label.html",
                styles: [
                    `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: LabelsService }, { type: ChangeDetectorRef }, { type: ModalRef }]; }, null); })();

function BsEditLabel_div_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 7);
    ɵɵtext(1);
    ɵɵpipe(2, "sqMessage");
    ɵɵelementEnd();
} if (rf & 2) {
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind1(2, 1, "msg#editLabel.infoText"), " ");
} }
const _c0$6 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
function BsEditLabel_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 8);
    ɵɵelementStart(1, "input", 9);
    ɵɵlistener("click", function BsEditLabel_div_8_Template_input_click_1_listener() { ɵɵrestoreView(_r6); const item_r4 = ctx.$implicit; const ctx_r5 = ɵɵnextContext(); return ctx_r5.updateLabelsNature(item_r4.value); });
    ɵɵelementEnd();
    ɵɵelementStart(2, "label", 10);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("id", item_r4.id);
    ɵɵpropertyInterpolate("value", item_r4.value);
    ɵɵproperty("checked", item_r4.checked)("disabled", item_r4.disabled)("ngClass", ɵɵpureFunction2(9, _c0$6, item_r4.disabled, !item_r4.disabled));
    ɵɵadvance(1);
    ɵɵpropertyInterpolate("for", item_r4.id);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 7, item_r4.name));
} }
function BsEditLabel_section_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "section");
    ɵɵelementStart(1, "b");
    ɵɵelementStart(2, "label", 11);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(5, "sq-labels-autocomplete", 12);
    ɵɵlistener("labelsUpdate", function BsEditLabel_section_9_Template_sq_labels_autocomplete_labelsUpdate_5_listener($event) { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(); return ctx_r7.onLabelsChanged($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 6, "msg#labels.labels"));
    ɵɵadvance(2);
    ɵɵproperty("public", ctx_r2.model.properties.public)("disableAutocomplete", ctx_r2.model.properties.disableAutocomplete)("allowNewLabels", ctx_r2.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r2.model.properties.allowManagePublicLabels)("initLabels", ctx_r2.initialLabels);
} }
function BsEditLabel_section_10_Template(rf, ctx) { if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "section");
    ɵɵelementStart(1, "b");
    ɵɵelementStart(2, "label", 11);
    ɵɵtext(3);
    ɵɵpipe(4, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(5, "sq-labels-autocomplete", 13);
    ɵɵlistener("labelsUpdate", function BsEditLabel_section_10_Template_sq_labels_autocomplete_labelsUpdate_5_listener($event) { ɵɵrestoreView(_r10); const ctx_r9 = ɵɵnextContext(); return ctx_r9.onLabelsToBeAddedChanged($event); });
    ɵɵelementEnd();
    ɵɵelementStart(6, "b");
    ɵɵelementStart(7, "label", 11);
    ɵɵtext(8);
    ɵɵpipe(9, "sqMessage");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(10, "sq-labels-autocomplete", 13);
    ɵɵlistener("labelsUpdate", function BsEditLabel_section_10_Template_sq_labels_autocomplete_labelsUpdate_10_listener($event) { ɵɵrestoreView(_r10); const ctx_r11 = ɵɵnextContext(); return ctx_r11.onLabelsToBeRemovedChanged($event); });
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(4, 10, "msg#editLabel.labelsToBeAdded"));
    ɵɵadvance(2);
    ɵɵproperty("public", ctx_r3.model.properties.public)("disableAutocomplete", ctx_r3.model.properties.disableAutocomplete)("allowNewLabels", ctx_r3.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r3.model.properties.allowManagePublicLabels);
    ɵɵadvance(3);
    ɵɵtextInterpolate(ɵɵpipeBind1(9, 12, "msg#editLabel.labelsToBeRemoved"));
    ɵɵadvance(2);
    ɵɵproperty("public", ctx_r3.model.properties.public)("disableAutocomplete", ctx_r3.model.properties.disableAutocomplete)("allowNewLabels", ctx_r3.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r3.model.properties.allowManagePublicLabels);
} }
class BsEditLabel {
    constructor(model, appService, selectionService, labelsService, searchService, notificationService, changeDetectorRef, modalRef) {
        this.model = model;
        this.appService = appService;
        this.selectionService = selectionService;
        this.labelsService = labelsService;
        this.searchService = searchService;
        this.notificationService = notificationService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalRef = modalRef;
        /** Initial labels list assigned to a record */
        this.initialLabels = [];
        this.isProcessing = false;
    }
    ngOnInit() {
        this.selectedRecordsIds = !!this.selectionService.getSelectedIds()
            ? this.selectionService.getSelectedIds()
            : [];
        if (this.selectedRecordsIds.length === 1) {
            this.record = this.searchService.getRecordFromId(this.selectedRecordsIds[0]);
            this.initialLabels = this._getInitialRecordLabels();
        }
        this.buttons = [
            new ModalButton({
                text: "msg#editLabel.btnEdit",
                primary: true,
                result: 0 /* Custom */,
                anchor: true,
                action: () => {
                    const observable = this.labelsService.addLabels(this.model.valuesToBeAdded, this.selectionService.getSelectedIds(), this.model.properties.public);
                    if (observable) {
                        this.isProcessing = true;
                        this.changeDetectorRef.markForCheck();
                        Utils.subscribe(observable, () => { }, (error) => {
                            this.notificationService.error("msg#editLabel.errorFeedback");
                            this.modalRef.close(error);
                        }, () => {
                            this.labelsService
                                .removeLabels(this.model.valuesToBeRemoved, this.selectionService.getSelectedIds(), this.model.properties.public)
                                .subscribe(() => { }, (error) => {
                                this.notificationService.error("msg#editLabel.errorFeedback");
                                this.modalRef.close(error);
                            }, () => {
                                this.isProcessing = false;
                                this.modalRef.close(-1 /* OK */);
                                this.notificationService.success("msg#editLabel.successFeedback");
                                this.searchService.search(); /** Update the display immediately in the components and facets*/
                            });
                        });
                    }
                },
            }),
            new ModalButton({
                result: -2 /* Cancel */,
            }),
        ];
    }
    updateLabelsNature(nature) {
        this.model.properties.public = nature;
        this.model.valuesToBeRemoved = [];
        this.model.valuesToBeAdded = [];
        if (this.selectedRecordsIds.length === 1) {
            this.initialLabels = this._getInitialRecordLabels(); /** update initial labels */
        }
    }
    onLabelsChanged(values) {
        if (!!this.initialLabels) {
            this.model.valuesToBeAdded = values.filter((value) => !this.initialLabels.find((label) => label === value));
            this.model.valuesToBeRemoved = this.initialLabels.filter((label) => !values.find((value) => value === label));
        }
        else {
            this.model.valuesToBeAdded = values;
            this.model.valuesToBeRemoved = [];
        }
    }
    onLabelsToBeAddedChanged(values) {
        this.model.valuesToBeAdded = values;
    }
    onLabelsToBeRemovedChanged(values) {
        this.model.valuesToBeRemoved = values;
    }
    /**
     * Return the list of labels already assigned to the selected record
     */
    _getInitialRecordLabels() {
        if (!!this.record) {
            const field = this.model.properties.public
                ? this.labelsService.publicLabelsField
                : this.labelsService.privateLabelsField;
            const labelsField = this.appService.resolveColumnAlias(field);
            if (!this.model.properties.public) {
                return !!this.record[labelsField]
                    ? this.labelsService.removePrivatePrefix(this.record[labelsField])
                    : [];
            }
            return this.record[labelsField] || [];
        }
        else {
            return [];
        }
    }
}
BsEditLabel.ɵfac = function BsEditLabel_Factory(t) { return new (t || BsEditLabel)(ɵɵdirectiveInject(MODAL_MODEL), ɵɵdirectiveInject(AppService), ɵɵdirectiveInject(SelectionService), ɵɵdirectiveInject(LabelsService), ɵɵdirectiveInject(SearchService), ɵɵdirectiveInject(NotificationsService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ModalRef)); };
BsEditLabel.ɵcmp = ɵɵdefineComponent({ type: BsEditLabel, selectors: [["sq-edit-label"]], decls: 11, vars: 10, consts: [["name", "editLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-warning"], ["class", "alert alert-info", "role", "alert", 4, "ngIf"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["role", "alert", 1, "alert", "alert-info"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "initLabels", "labelsUpdate"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"]], template: function BsEditLabel_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "form", 0);
        ɵɵelementStart(1, "sq-modal", 1);
        ɵɵelementStart(2, "div", 2);
        ɵɵelementStart(3, "div", 3);
        ɵɵtext(4);
        ɵɵpipe(5, "sqMessage");
        ɵɵelementEnd();
        ɵɵtemplate(6, BsEditLabel_div_6_Template, 3, 3, "div", 4);
        ɵɵelementStart(7, "section");
        ɵɵtemplate(8, BsEditLabel_div_8_Template, 5, 12, "div", 5);
        ɵɵelementEnd();
        ɵɵtemplate(9, BsEditLabel_section_9_Template, 6, 8, "section", 6);
        ɵɵtemplate(10, BsEditLabel_section_10_Template, 11, 14, "section", 6);
        ɵɵelementEnd();
        ɵɵelementEnd();
        ɵɵelementEnd();
    } if (rf & 2) {
        ɵɵadvance(1);
        ɵɵproperty("title", "msg#editLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
        ɵɵadvance(3);
        ɵɵtextInterpolate1(" ", ɵɵpipeBind1(5, 8, "msg#editLabel.alertText"), " ");
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.model.properties.allowManagePublicLabels || !ctx.model.properties.public);
        ɵɵadvance(2);
        ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.record);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.record);
    } }, directives: [ɵangular_packages_forms_forms_y, NgControlStatusGroup, NgForm, BsModal, NgIf, NgForOf, NgClass, BsLabelsAutocompleteComponent], pipes: [MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsEditLabel, [{
        type: Component,
        args: [{
                selector: "sq-edit-label",
                templateUrl: "./edit-label.html",
                styles: [
                    `
            .clickable {
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
                ],
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: AppService }, { type: SelectionService }, { type: LabelsService }, { type: SearchService }, { type: NotificationsService }, { type: ChangeDetectorRef }, { type: ModalRef }]; }, null); })();

const defaultLabelComponents = {
    labelsAutocompleteComponent: BsLabelsAutocompleteComponent,
    renameModal: BsRenameLabel,
    deleteModal: BsDeleteLabel,
    addModal: BsAddLabel,
    editModal: BsEditLabel
};
class BsLabelsModule {
}
BsLabelsModule.ɵmod = ɵɵdefineNgModule({ type: BsLabelsModule });
BsLabelsModule.ɵinj = ɵɵdefineInjector({ factory: function BsLabelsModule_Factory(t) { return new (t || BsLabelsModule)(); }, providers: [
        { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
    ], imports: [[
            FormsModule, ReactiveFormsModule,
            CommonModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsSelectionModule,
            BsModalModule,
            BsAutocompleteModule,
            BsActionModule,
            LabelsModule
        ], LabelsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(BsLabelsModule, { declarations: [BsLabelsAutocompleteComponent,
        BsRenameLabel,
        BsLabelsMenuComponent,
        BsDeleteLabel,
        BsAddLabel,
        BsEditLabel], imports: [FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsSelectionModule,
        BsModalModule,
        BsAutocompleteModule,
        BsActionModule,
        LabelsModule], exports: [LabelsModule,
        BsLabelsAutocompleteComponent,
        BsRenameLabel,
        BsLabelsMenuComponent,
        BsDeleteLabel,
        BsAddLabel,
        BsEditLabel] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(BsLabelsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    FormsModule, ReactiveFormsModule,
                    CommonModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsSelectionModule,
                    BsModalModule,
                    BsAutocompleteModule,
                    BsActionModule,
                    LabelsModule
                ],
                declarations: [
                    BsLabelsAutocompleteComponent,
                    BsRenameLabel,
                    BsLabelsMenuComponent,
                    BsDeleteLabel,
                    BsAddLabel,
                    BsEditLabel
                ],
                exports: [
                    LabelsModule,
                    BsLabelsAutocompleteComponent,
                    BsRenameLabel,
                    BsLabelsMenuComponent,
                    BsDeleteLabel,
                    BsAddLabel,
                    BsEditLabel
                ],
                providers: [
                    { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
                ]
            }]
    }], null, null); })();

var _enLabels = {
    "labels": {
        "labels": "Labels",
        "publicLabels": "Public Labels",
        "privateLabels": "Private Labels",
        "public": "Public",
        "private": "Private",
        "selectLabel": "Select label(s)",
        "deleteLabelAreYouSure": "Are you sure you want to remove the label: {name}?",
        "bulkAddLabelAreYouSure": "Are you sure you want to bulk add the label: {name} to the results of the current query?",
        "bulkRemoveLabelAreYouSure": "Are you sure you want to bulk remove the label: {name} to the results of the current query?",
        "addPublicLabelText": "+",
        "removePublicLabelText": "×",
        "addPublicLabelTitle": "Add public label",
        "selectPublicLabelTitle": "Select public label",
        "removePublicLabelTitle": "Remove public label",
        "addPrivateLabelText": "+",
        "removePrivateLabelText": "×",
        "addPrivateLabelTitle": "Add private label",
        "selectPrivateLabelTitle": "Select private label",
        "removePrivateLabelTitle": "Remove private label"
    },
    "renameLabel": {
        "title": "Rename Label(s) globally",
        "btnRename": "Rename",
        "newLabel": "New Label",
        "oldLabels": "Old label(s)",
        "alertText": "This action renames the label(s) in the index and is irreversible",
        "successFeedback": "Label(s) renamed in the index",
        "errorFeedback": "An error occurred. Request failed"
    },
    "deleteLabel": {
        "title": "Delete label(s) globally",
        "btnDelete": "Delete",
        "alertText": "This action deletes the selected label(s) from the index and is irreversible",
        "successFeedback": "Label(s) deleted from the index",
        "errorFeedback": "An error occurred. Request failed"
    },
    "bulkRemoveLabel": {
        "title": "Remove label(s) from the current results",
        "btnBulkRemove": "Remove",
        "alertText": "This action removes the selected label(s) from all results reported by the engine (not only from the first page)",
        "successFeedback": "Label(s) removed from all results reported by the engine",
        "errorFeedback": "An error occurred. Request failed"
    },
    "bulkAddLabel": {
        "title": "Add label(s) to the current results",
        "btnBulkAdd": "Add",
        "alertText": "This action assigns the selected label(s) to all results reported by the engine (not only to the first page)",
        "infoText": "Press 'Enter' to add a new label that does not exist in the suggestions",
        "successFeedback": "Label(s) assigned to all results reported by the engine",
        "errorFeedback": "An error occurred. Request failed"
    },
    "editLabel": {
        "title": "Edit the label(s) of the selected result(s)",
        "btnEdit": "Save",
        "alertText": "This action edits the label(s) of the selected result(s)",
        "infoText": "Press 'Enter' to add a new label that does not exist in the suggestions",
        "labelsToBeRemoved": "Label(s) to be removed",
        "labelsToBeAdded": "Label(s) to be added",
        "successFeedback": "Label(s) of the selected result(s) edited",
        "errorFeedback": "An error occurred. Request failed"
    }
};

var _frLabels = {
    "labels": {
        "labels": "Libellés",
        "publicLabels": "Libellés publics",
        "privateLabels": "Libellés privés",
        "public": "Public",
        "private": "Privé",
        "selectLabel": "Sélectionner le(s) libellé(s)",
        "deleteLabelAreYouSure": "Etes-vous sûr de vouloir effacer le libellé: {name} ?",
        "bulkAddLabelAreYouSure": "Etes-vous sûr de vouloir ajouter en lot le libellé: {name} aux résultats de la requête courante ? ",
        "bulkRemoveLabelAreYouSure": "Etes-vous sûr de vouloir enlever en lot le libellé: {name} aux résultats de la requête courante ?",
        "addPublicLabelText": "+",
        "removePublicLabelText": "×",
        "addPublicLabelTitle": "Ajouter un libellé public",
        "selectPublicLabelTitle": "Sélectionner le libellé public",
        "removePublicLabelTitle": "Supprimer le libellé public",
        "addPrivateLabelText": "+",
        "removePrivateLabelText": "×",
        "addPrivateLabelTitle": "Ajouter un libellé privé",
        "selectPrivateLabelTitle": "Sélectionner le libellé privé",
        "removePrivateLabelTitle": "Supprimer le libellé privé"
    },
    "renameLabel": {
        "title": "Renommer le(s) libellé(s) globalement",
        "btnRename": "Renommer",
        "newLabel": "Nouveau Libellé",
        "oldLabels": "Ancien(s) libellé(s)",
        "alertText": "Cette action renomme le(s) libellé(s) sélectionné(s) dans l'index et est irréversible",
        "successFeedback": "Libellé(s) renommé(s) dans l'index",
        "errorFeedback": "Une erreur s'est produite. Requête non aboutie"
    },
    "deleteLabel": {
        "title": "Supprimer le(s) libellé(s) globalement",
        "btnDelete": "Supprimer",
        "alertText": "Cette action supprime le(s) libellé(s) sélectionné(s) de l'index et est irréversible",
        "successFeedback": "Libellé(s) supprimé(s) de l'index",
        "errorFeedback": "Une erreur s'est produite. Requête non aboutie"
    },
    "bulkRemoveLabel": {
        "title": "Enlever le(s) libellé des résultats courants",
        "btnBulkRemove": "Enlever",
        "alertText": "Cette action enlève le(s) libellé(s) sélectionné(s) de tous les résultats remontés par le moteur (pas seulement de la première page)",
        "successFeedback": "Libellé(s) enlevé(s) de tous les résultats remontés par le moteur",
        "errorFeedback": "Une erreur s'est produite. Requête non aboutie"
    },
    "bulkAddLabel": {
        "title": "Ajouter le(s) libellé(s) aux résultats courants",
        "btnBulkAdd": "Ajouter",
        "alertText": "Cette action ajoute le(s) libellé(s) sélectionné(s) à tous les résultats remontés par le moteur (pas seulement à la première page)",
        "infoText": "Appuyez sur 'Entrée' pour ajouter un nouveau libellé qui n'existe pas dans les suggestions",
        "successFeedback": "Libellé(s) ajouté(s) à tous les résultats remontés par le moteur",
        "errorFeedback": "Une erreur s'est produite. Requête non aboutie"
    },
    "editLabel": {
        "title": "Editer le(s) libellé(s) de(s) résultat(s) sélectionné(s)",
        "btnEdit": "Sauvegarder",
        "alertText": "Cette action édite le(s) libellé(s) de(s) résultat(s) sélectionné(s)",
        "infoText": "Appuyez sur 'Entrée' pour ajouter un nouveau libellé qui n'existe pas dans les suggestions",
        "labelsToBeRemoved": "Libellé(s) à enlever",
        "labelsToBeAdded": "Libellé(s) à ajouter",
        "successFeedback": "Libellé(s) de(s) résultat(s) sélectionné(s) édité(s)",
        "errorFeedback": "Une erreur s'est produite. Requête non aboutie"
    }
};

var _deLabels = {
    "labels": {
        "labels": "Etiketten",
        "publicLabels": "Öffentliche Etiketten",
        "privateLabels": "Private Etiketten",
        "public": "Öffentliche",
        "private": "Private",
        "selectLabel": "Etikett(en) auswählen",
        "deleteLabelAreYouSure": "Möchten Sie dieses Etikett wirklich löschen: {name}?",
        "bulkAddLabelAreYouSure": "Möchten Sie wirklich das Etikett {name} zu allen Ergebnissen der aktuellen Suche hinzufügen?",
        "bulkRemoveLabelAreYouSure": "Möchten Sie wirklich das Etikett {name} von allen Ergebnissen der aktuellen Suche entfernen?",
        "addPublicLabelText": "+",
        "removePublicLabelText": "×",
        "addPublicLabelTitle": "Öffentliches Etikett hinzufügen",
        "selectPublicLabelTitle": "Öffentliches Etikett auswählen",
        "removePublicLabelTitle": "Öffentliches Etikett entfernen",
        "addPrivateLabelText": "+",
        "removePrivateLabelText": "×",
        "addPrivateLabelTitle": "Privates Etikett hinzufügen",
        "selectPrivateLabelTitle": "Privates Etikett auswählen",
        "removePrivateLabelTitle": "Privates Etikett entfernen"
    },
    "renameLabel": {
        "title": "Etikett(en) unbenennen",
        "btnRename": "Umbennen",
        "newLabel": "Neuen Etikett",
        "oldLabels": "Altes Etikett(en)",
        "alertText": "Diese Aktion benennt das (die) ausgewählte(n) Etikett(en) im Index um und ist unwiderruflich",
        "successFeedback": "Etikett(en), das (die) im Index umbenannt wurde(n)",
        "errorFeedback": "Ein Fehler ist aufgetreten. Die Suchanfrage war erfolglos"
    },
    "deleteLabel": {
        "title": "Etikett(en) global entfernen",
        "btnDelete": "Löschen",
        "alertText": "Diese Aktion löscht das (die) ausgewählte(n) Etikett(en) aus dem Index und ist unwiderruflich",
        "successFeedback": "Etikett(en), das (die) aus dem Index gelöscht wurde(n)",
        "errorFeedback": "Ein Fehler ist aufgetreten. Die Suchanfrage war erfolglos"
    },
    "bulkRemoveLabel": {
        "title": "Etikett(en) von aktuellen Ergebnissen entfernen",
        "btnBulkRemove": "Entfernen",
        "alertText": "Diese Aktion löscht das (die) ausgewählte(n) Etikett(en) aus allen gefundenen Ergebnisse (nicht nur die der ersten Seite)",
        "successFeedback": "Etikett(en), das (die) aus allen gefundenen Ergebnissen gelöscht wurde(n)",
        "errorFeedback": "Ein Fehler ist aufgetreten. Die Suchanfrage war erfolglos"
    },
    "bulkAddLabel": {
        "title": "Etikett(en) zu aktuellen Ergebnissen hinzufügen",
        "btnBulkAdd": "Hinzufügen",
        "alertText": "Diese Aktion fügt das (die) ausgewählte(n) Etikett(en) zu allen gefundenen Ergebnissen (nicht nur denen der ersten Seite) hinzu",
        "infoText": "klicken Sie auf 'Enter', um ein neues Etikett, das nicht in den Vorschlägen existiert, hinzuzufügen",
        "successFeedback": "Etikett(en), das (die) allen gefundenen Ergebnissen hinzugefügt wurde(n)",
        "errorFeedback": "Ein Fehler ist aufgetreten. Die Suchanfrage war erfolglos"
    },
    "editLabel": {
        "title": "Bearbeiten des (der) Etikett(en) aus dem (den) ausgewählten Ergebnis(sen)",
        "btnEdit": "speichern",
        "alertText": "Diese Aktion bearbeitet das (die) Etikett(en) des (der) ausgewählten Ergebnisse(s)",
        "infoText": "klicken Sie auf 'Enter', um ein neues Etikett, das nicht in den Vorschlägen existiert, hinzuzufügen",
        "labelsToBeRemoved": "Zu löschende(s) Etikett(en)",
        "labelsToBeAdded": "Hinzuzufügende(s) Etikett(en)",
        "successFeedback": "Etikett(en), das (die) zu dem (den) ausgewählten Ergebnis(sen) bearbeit(en)",
        "errorFeedback": "Ein Fehler ist aufgetreten. Die Suchanfrage war erfolglos"
    }
};

const enLabels = Utils.merge({}, _enLabels, enSearch, enModal);
const frLabels = Utils.merge({}, _frLabels, frSearch, frModal);
const deLabels = Utils.merge({}, _deLabels, deSearch, deModal);

/**
 * Generated bundle index. Do not edit.
 */

export { BsAddLabel, BsDeleteLabel, BsEditLabel, BsLabelsAutocompleteComponent, BsLabelsMenuComponent, BsLabelsModule, BsRenameLabel, LABELS_COMPONENTS, LabelPipe, Labels, LabelsAutocomplete, LabelsModule, LabelsService, ResultLabels, deLabels, defaultLabelComponents, enLabels, frLabels };
//# sourceMappingURL=sinequa-components-labels.js.map
