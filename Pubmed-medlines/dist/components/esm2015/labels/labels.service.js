import { Injectable, Inject, InjectionToken, } from "@angular/core";
import { of } from "rxjs";
import { Utils } from "@sinequa/core/base";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/web-services";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/search";
import * as i4 from "@sinequa/core/modal";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/core/notification";
import * as i7 from "@sinequa/components/selection";
export const LABELS_COMPONENTS = new InjectionToken("LABELS_COMPONENTS");
export class LabelsService {
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
LabelsService.ɵfac = function LabelsService_Factory(t) { return new (t || LabelsService)(i0.ɵɵinject(i1.LabelsWebService), i0.ɵɵinject(i2.AppService), i0.ɵɵinject(i3.SearchService), i0.ɵɵinject(i4.ModalService), i0.ɵɵinject(i1.PrincipalWebService), i0.ɵɵinject(i5.IntlService), i0.ɵɵinject(i6.NotificationsService), i0.ɵɵinject(i7.SelectionService), i0.ɵɵinject(LABELS_COMPONENTS)); };
LabelsService.ɵprov = i0.ɵɵdefineInjectable({ token: LabelsService, factory: LabelsService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LabelsService, [{
        type: Injectable,
        args: [{
                providedIn: "root",
            }]
    }], function () { return [{ type: i1.LabelsWebService }, { type: i2.AppService }, { type: i3.SearchService }, { type: i4.ModalService }, { type: i1.PrincipalWebService }, { type: i5.IntlService }, { type: i6.NotificationsService }, { type: i7.SelectionService }, { type: undefined, decorators: [{
                type: Inject,
                args: [LABELS_COMPONENTS]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9sYWJlbHMvIiwic291cmNlcyI6WyJsYWJlbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsVUFBVSxFQUNWLE1BQU0sRUFDTixjQUFjLEdBR2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBUXBELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7OztBQWlDcEQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxjQUFjLENBQy9DLG1CQUFtQixDQUN0QixDQUFDO0FBS0YsTUFBTSxPQUFPLGFBQWE7SUFTdEIsWUFDWSxnQkFBa0MsRUFDbEMsVUFBc0IsRUFDdEIsYUFBNEIsRUFDNUIsWUFBMEIsRUFDMUIsbUJBQXdDLEVBQ3hDLFdBQXdCLEVBQ3hCLG1CQUF5QyxFQUN6QyxnQkFBa0MsRUFDUixnQkFBa0M7UUFSNUQscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtRQUN6QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ1IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUVwRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hELFFBQVEsS0FB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REFsQnBCLGFBQWEsV0FBYixhQUFhLG1CQUZWLE1BQU07a0RBRVQsYUFBYTtjQUh6QixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQW1CUSxNQUFNO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgVHlwZSxcbiAgICBPbkRlc3Ryb3ksXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7XG4gICAgUHJpbmNpcGFsV2ViU2VydmljZSxcbiAgICBMYWJlbHNXZWJTZXJ2aWNlLFxuICAgIEF1ZGl0RXZlbnRUeXBlLFxuICAgIExhYmVsc1JpZ2h0cyxcbn0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBBcHBTZXJ2aWNlLCBWYWx1ZUl0ZW0gfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9hcHAtdXRpbHNcIjtcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IHsgTW9kYWxTZXJ2aWNlLCBNb2RhbFJlc3VsdCB9IGZyb20gXCJAc2luZXF1YS9jb3JlL21vZGFsXCI7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7IEludGxTZXJ2aWNlIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc1NlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9ub3RpZmljYXRpb25cIjtcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWxlY3Rpb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBMYWJlbHNDb21wb25lbnRzIHtcbiAgICByZW5hbWVNb2RhbDogVHlwZTxhbnk+O1xuICAgIGxhYmVsc0F1dG9jb21wbGV0ZUNvbXBvbmVudDogVHlwZTxhbnk+O1xuICAgIGRlbGV0ZU1vZGFsOiBUeXBlPGFueT47XG4gICAgYWRkTW9kYWw6IFR5cGU8YW55PjtcbiAgICBlZGl0TW9kYWw6IFR5cGU8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbFByb3BlcnRpZXMge1xuICAgIHB1YmxpYzogYm9vbGVhbjtcbiAgICBhbGxvd0VkaXRQdWJsaWNMYWJlbHM6IGJvb2xlYW47XG4gICAgYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHM6IGJvb2xlYW47XG4gICAgYWxsb3dOZXdMYWJlbHM6IGJvb2xlYW47XG4gICAgZGlzYWJsZUF1dG9jb21wbGV0ZTogYm9vbGVhbjtcbiAgICBhY3Rpb246IG51bWJlcjtcbiAgICByYWRpb0J1dHRvbnM6IGFueVtdO1xufVxuXG5leHBvcnQgY29uc3QgZW51bSBVcGRhdGVMYWJlbHNBY3Rpb24ge1xuICAgIGFkZCxcbiAgICByZW1vdmUsXG4gICAgcmVuYW1lLFxuICAgIGRlbGV0ZSxcbiAgICBidWxrQWRkLFxuICAgIGJ1bGtSZW1vdmUsXG4gICAgZWRpdCxcbn1cblxuZXhwb3J0IGNvbnN0IExBQkVMU19DT01QT05FTlRTID0gbmV3IEluamVjdGlvblRva2VuPExhYmVsc0NvbXBvbmVudHM+KFxuICAgIFwiTEFCRUxTX0NPTVBPTkVOVFNcIlxuKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBMYWJlbHNTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIF9wcml2YXRlTGFiZWxzUHJlZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdExhYmVsc1JpZ2h0czogTGFiZWxzUmlnaHRzID0ge1xuICAgICAgICBjYW5NYW5hZ2VQdWJsaWNMYWJlbHM6IHRydWUsXG4gICAgICAgIGNhbkVkaXRQdWJsaWNMYWJlbHM6IHRydWUsXG4gICAgfTtcbiAgICBwcml2YXRlIGxhYmVsc1JpZ2h0c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuICAgIHByaXZhdGUgbGFiZWxzUmlnaHRzOiBMYWJlbHNSaWdodHMgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBsYWJlbHNXZWJTZXJ2aWNlOiBMYWJlbHNXZWJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFwcFNlcnZpY2U6IEFwcFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE1vZGFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwcmluY2lwYWxXZWJTZXJ2aWNlOiBQcmluY2lwYWxXZWJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGludGxTZXJ2aWNlOiBJbnRsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25zU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBzZWxlY3Rpb25TZXJ2aWNlOiBTZWxlY3Rpb25TZXJ2aWNlLFxuICAgICAgICBASW5qZWN0KExBQkVMU19DT01QT05FTlRTKSBwdWJsaWMgbGFiZWxzQ29tcG9uZW50czogTGFiZWxzQ29tcG9uZW50c1xuICAgICkge1xuICAgICAgICB0aGlzLnByaW5jaXBhbFdlYlNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjaGFuZ2VkXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByaXZhdGVMYWJlbHNQcmVmaXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxzUmlnaHRzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsc1JpZ2h0c1N1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcHVibGljTGFiZWxzRmllbGQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwU2VydmljZS5jY2xhYmVsc1xuICAgICAgICAgICAgPyB0aGlzLmFwcFNlcnZpY2UuY2NsYWJlbHMucHVibGljTGFiZWxzRmllbGRcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgcHJpdmF0ZUxhYmVsc0ZpZWxkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcFNlcnZpY2UuY2NsYWJlbHNcbiAgICAgICAgICAgID8gdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzLnByaXZhdGVMYWJlbHNGaWVsZFxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYWJlbHNBdXRvU3VnZ2VzdFdpbGRjYXJkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcFNlcnZpY2UuY2NsYWJlbHNcbiAgICAgICAgICAgID8gdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzLmxhYmVsc0F1dG9TdWdnZXN0V2lsZGNhcmRcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYWxsb3dQdWJsaWNMYWJlbHNNYW5hZ2VtZW50KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzXG4gICAgICAgICAgICA/IHRoaXMuYXBwU2VydmljZS5jY2xhYmVscy5hbGxvd1B1YmxpY0xhYmVsc0NyZWF0aW9uXG4gICAgICAgICAgICA6IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYWxsb3dQdWJsaWNMYWJlbHNFZGl0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzXG4gICAgICAgICAgICA/IHRoaXMuYXBwU2VydmljZS5jY2xhYmVscy5hbGxvd1B1YmxpY0xhYmVsc01vZGlmaWNhdGlvblxuICAgICAgICAgICAgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHVzZXJMYWJlbHNSaWdodHMoKTogTGFiZWxzUmlnaHRzIHtcbiAgICAgICAgbGV0IHJpZ2h0czogTGFiZWxzUmlnaHRzIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXRoaXMubGFiZWxzUmlnaHRzKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubGFiZWxzUmlnaHRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMubGFiZWxzV2ViU2VydmljZS5nZXRVc2VyUmlnaHRzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbHNSaWdodHNTdWJzY3JpcHRpb24gPSBVdGlscy5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUsXG4gICAgICAgICAgICAgICAgICAgIChyZXNwb25zZSkgPT4gKHJpZ2h0cyA9IHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJpZ2h0cyA9IExhYmVsc1NlcnZpY2UuZGVmYXVsdExhYmVsc1JpZ2h0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGFiZWxzUmlnaHRzID0gISFyaWdodHNcbiAgICAgICAgICAgICAgICA/IHJpZ2h0c1xuICAgICAgICAgICAgICAgIDogTGFiZWxzU2VydmljZS5kZWZhdWx0TGFiZWxzUmlnaHRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVsc1JpZ2h0cztcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFiZWxzUmlnaHRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsc1JpZ2h0c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZyb20gbmF2YmFyICovXG4gICAgcHVibGljIHJlbmFtZUxhYmVsTW9kYWwoKTogUHJvbWlzZTxNb2RhbFJlc3VsdD4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgb2xkVmFsdWVzOiBbXSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBcIlwiLFxuICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5fbW9kYWxQcm9wZXJ0aWVzKFVwZGF0ZUxhYmVsc0FjdGlvbi5yZW5hbWUpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLmxhYmVsc0NvbXBvbmVudHMucmVuYW1lTW9kYWwsIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYXRhLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlTGFiZWxNb2RhbCgpOiBQcm9taXNlPE1vZGFsUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5fbW9kYWxQcm9wZXJ0aWVzKFVwZGF0ZUxhYmVsc0FjdGlvbi5kZWxldGUpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLmxhYmVsc0NvbXBvbmVudHMuZGVsZXRlTW9kYWwsIHtcbiAgICAgICAgICAgIG1vZGVsOiBkYXRhLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYnVsa0FkZExhYmVsTW9kYWwoKTogUHJvbWlzZTxNb2RhbFJlc3VsdD4ge1xuICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgdmFsdWVzOiBbXSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHRoaXMuX21vZGFsUHJvcGVydGllcyhVcGRhdGVMYWJlbHNBY3Rpb24uYnVsa0FkZCksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsU2VydmljZS5vcGVuKHRoaXMubGFiZWxzQ29tcG9uZW50cy5hZGRNb2RhbCwge1xuICAgICAgICAgICAgbW9kZWw6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBidWxrUmVtb3ZlTGFiZWxNb2RhbCgpOiBQcm9taXNlPE1vZGFsUmVzdWx0PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICB2YWx1ZXM6IFtdLFxuICAgICAgICAgICAgcHJvcGVydGllczogdGhpcy5fbW9kYWxQcm9wZXJ0aWVzKFVwZGF0ZUxhYmVsc0FjdGlvbi5idWxrUmVtb3ZlKSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxTZXJ2aWNlLm9wZW4odGhpcy5sYWJlbHNDb21wb25lbnRzLmRlbGV0ZU1vZGFsLCB7XG4gICAgICAgICAgICBtb2RlbDogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbW9kYWxQcm9wZXJ0aWVzKGFjdGlvbjogbnVtYmVyKTogTW9kYWxQcm9wZXJ0aWVzIHtcbiAgICAgICAgY29uc3QgYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHM6IGJvb2xlYW4gPVxuICAgICAgICAgICAgdGhpcy5hbGxvd1B1YmxpY0xhYmVsc01hbmFnZW1lbnQgJiZcbiAgICAgICAgICAgIHRoaXMudXNlckxhYmVsc1JpZ2h0cyAmJlxuICAgICAgICAgICAgdGhpcy51c2VyTGFiZWxzUmlnaHRzLmNhbk1hbmFnZVB1YmxpY0xhYmVscztcbiAgICAgICAgY29uc3QgYWxsb3dFZGl0UHVibGljTGFiZWxzOiBib29sZWFuID1cbiAgICAgICAgICAgIHRoaXMuYWxsb3dQdWJsaWNMYWJlbHNFZGl0aW9uICYmXG4gICAgICAgICAgICB0aGlzLnVzZXJMYWJlbHNSaWdodHMgJiZcbiAgICAgICAgICAgIHRoaXMudXNlckxhYmVsc1JpZ2h0cy5jYW5FZGl0UHVibGljTGFiZWxzO1xuICAgICAgICBsZXQgYWxsb3dOZXdMYWJlbHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgbGV0IHJhZGlvQnV0dG9uc0NvbmY6IGFueTtcblxuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24ucmVuYW1lOlxuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24ucmVtb3ZlOlxuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24uZGVsZXRlOlxuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24uYnVsa1JlbW92ZTpcbiAgICAgICAgICAgICAgICBhbGxvd05ld0xhYmVscyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24uYWRkOlxuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24uYnVsa0FkZDpcbiAgICAgICAgICAgIGNhc2UgVXBkYXRlTGFiZWxzQWN0aW9uLmVkaXQ6XG4gICAgICAgICAgICAgICAgYWxsb3dOZXdMYWJlbHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFVwZGF0ZUxhYmVsc0FjdGlvbi5yZW5hbWU6XG4gICAgICAgICAgICBjYXNlIFVwZGF0ZUxhYmVsc0FjdGlvbi5kZWxldGU6XG4gICAgICAgICAgICAgICAgcmFkaW9CdXR0b25zQ29uZiA9IHRoaXMuX2dldE1vZGFsUmFkaW9CdXR0b25zQ29uZihcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24uYWRkOlxuICAgICAgICAgICAgY2FzZSBVcGRhdGVMYWJlbHNBY3Rpb24uYnVsa0FkZDpcbiAgICAgICAgICAgIGNhc2UgVXBkYXRlTGFiZWxzQWN0aW9uLnJlbW92ZTpcbiAgICAgICAgICAgIGNhc2UgVXBkYXRlTGFiZWxzQWN0aW9uLmJ1bGtSZW1vdmU6XG4gICAgICAgICAgICBjYXNlIFVwZGF0ZUxhYmVsc0FjdGlvbi5lZGl0OlxuICAgICAgICAgICAgICAgIHJhZGlvQnV0dG9uc0NvbmYgPSB0aGlzLl9nZXRNb2RhbFJhZGlvQnV0dG9uc0NvbmYoXG4gICAgICAgICAgICAgICAgICAgIGFsbG93TWFuYWdlUHVibGljTGFiZWxzIHx8IGFsbG93RWRpdFB1YmxpY0xhYmVsc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbG93RWRpdFB1YmxpY0xhYmVsczogYWxsb3dFZGl0UHVibGljTGFiZWxzLFxuICAgICAgICAgICAgYWxsb3dNYW5hZ2VQdWJsaWNMYWJlbHM6IGFsbG93TWFuYWdlUHVibGljTGFiZWxzLFxuICAgICAgICAgICAgYWxsb3dOZXdMYWJlbHM6IGFsbG93TmV3TGFiZWxzLFxuICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgICAgICAuLi5yYWRpb0J1dHRvbnNDb25mLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldE1vZGFsUmFkaW9CdXR0b25zQ29uZihwdWJsaWNSaWdodDogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGxldCBpc1B1YmxpYzogYm9vbGVhbiA9IHRydWU7XG4gICAgICAgIGxldCBkaXNhYmxlQXV0b2NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGxldCByYWRpb0J1dHRvbnM6IGFueVtdID0gW107XG4gICAgICAgIGxldCBwdWJsaWNSYWRpb0J1dHRvbiA9IHtcbiAgICAgICAgICAgIGlkOiBcInB1YmxpY0xhYmVsXCIsXG4gICAgICAgICAgICBuYW1lOiBcIm1zZyNsYWJlbHMucHVibGljXCIsXG4gICAgICAgICAgICB2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBwcml2YXRlUmFkaW9CdXR0b24gPSB7XG4gICAgICAgICAgICBpZDogXCJwcml2YXRlTGFiZWxcIixcbiAgICAgICAgICAgIG5hbWU6IFwibXNnI2xhYmVscy5wcml2YXRlXCIsXG4gICAgICAgICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCEhdGhpcy5wdWJsaWNMYWJlbHNGaWVsZCAmJiAhIXRoaXMucHJpdmF0ZUxhYmVsc0ZpZWxkKSB7XG4gICAgICAgICAgICBpZiAocHVibGljUmlnaHQpIHtcbiAgICAgICAgICAgICAgICBpc1B1YmxpYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmFkaW9CdXR0b25zID0gW3B1YmxpY1JhZGlvQnV0dG9uLCBwcml2YXRlUmFkaW9CdXR0b25dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc1B1YmxpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHB1YmxpY1JhZGlvQnV0dG9uID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5wdWJsaWNSYWRpb0J1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcHJpdmF0ZVJhZGlvQnV0dG9uID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5wcml2YXRlUmFkaW9CdXR0b24sXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmFkaW9CdXR0b25zID0gW3B1YmxpY1JhZGlvQnV0dG9uLCBwcml2YXRlUmFkaW9CdXR0b25dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEhdGhpcy5wdWJsaWNMYWJlbHNGaWVsZCkge1xuICAgICAgICAgICAgaWYgKHB1YmxpY1JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaXNQdWJsaWMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHB1YmxpY1JhZGlvQnV0dG9uID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5wdWJsaWNSYWRpb0J1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByYWRpb0J1dHRvbnMgPSBbcHVibGljUmFkaW9CdXR0b25dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpc1B1YmxpYyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvY29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHB1YmxpY1JhZGlvQnV0dG9uID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5wdWJsaWNSYWRpb0J1dHRvbixcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmFkaW9CdXR0b25zID0gW3B1YmxpY1JhZGlvQnV0dG9uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghIXRoaXMucHJpdmF0ZUxhYmVsc0ZpZWxkKSB7XG4gICAgICAgICAgICBpc1B1YmxpYyA9IGZhbHNlO1xuICAgICAgICAgICAgcHJpdmF0ZVJhZGlvQnV0dG9uID0ge1xuICAgICAgICAgICAgICAgIC4uLnByaXZhdGVSYWRpb0J1dHRvbixcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhZGlvQnV0dG9ucyA9IFtwcml2YXRlUmFkaW9CdXR0b25dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHB1YmxpYzogaXNQdWJsaWMsXG4gICAgICAgICAgICBkaXNhYmxlQXV0b2NvbXBsZXRlOiBkaXNhYmxlQXV0b2NvbXBsZXRlLFxuICAgICAgICAgICAgcmFkaW9CdXR0b25zOiByYWRpb0J1dHRvbnMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKiBFTkQgRnJvbSBuYXZiYXIgKi9cblxuICAgIC8qKiBGcm9tIHJlc3VsdCBzZWxlY3RvciAqL1xuICAgIHB1YmxpYyBidWlsZFNlbGVjdGlvbkFjdGlvbigpOiBBY3Rpb24gfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMucHVibGljTGFiZWxzRmllbGQgJiYgIXRoaXMucHJpdmF0ZUxhYmVsc0ZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXMgZmEtdGFnc1wiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2xhYmVscy5sYWJlbHNcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExhYmVsTW9kYWwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWN0aW9uKSB7XG4gICAgICAgICAgICBhY3Rpb24udXBkYXRlciA9IChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24uaGlkZGVuID0gIXRoaXMuc2VsZWN0aW9uU2VydmljZS5oYXZlU2VsZWN0ZWRSZWNvcmRzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGFjdGlvbi5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXRMYWJlbE1vZGFsKCk6IFByb21pc2U8TW9kYWxSZXN1bHQ+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHZhbHVlc1RvQmVBZGRlZDogW10sXG4gICAgICAgICAgICB2YWx1ZXNUb0JlUmVtb3ZlZDogW10sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB0aGlzLl9tb2RhbFByb3BlcnRpZXMoVXBkYXRlTGFiZWxzQWN0aW9uLmVkaXQpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbFNlcnZpY2Uub3Blbih0aGlzLmxhYmVsc0NvbXBvbmVudHMuZWRpdE1vZGFsLCB7XG4gICAgICAgICAgICBtb2RlbDogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKiBFTkQgcmVzdWx0IHNlbGVjdG9yICovXG5cblxuICAgIGFkZExhYmVscyhcbiAgICAgICAgbGFiZWxzOiBzdHJpbmdbXSxcbiAgICAgICAgaWRzOiBzdHJpbmdbXSxcbiAgICAgICAgX3B1YmxpYzogYm9vbGVhblxuICAgICk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBpZiAoIWxhYmVscyB8fCBsYWJlbHMubGVuZ3RoID09PSAwIHx8ICFpZHMgfHwgaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMubGFiZWxzV2ViU2VydmljZS5hZGQobGFiZWxzLCBpZHMsIF9wdWJsaWMpO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG5cbiAgICByZW1vdmVMYWJlbHMoXG4gICAgICAgIGxhYmVsczogc3RyaW5nW10sXG4gICAgICAgIGlkczogc3RyaW5nW10sXG4gICAgICAgIF9wdWJsaWM6IGJvb2xlYW5cbiAgICApOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCFsYWJlbHMgfHwgbGFiZWxzLmxlbmd0aCA9PT0gMCB8fCAhaWRzIHx8IGlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvZigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmxhYmVsc1dlYlNlcnZpY2UucmVtb3ZlKGxhYmVscywgaWRzLCBfcHVibGljKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgc2VsZWN0TGFiZWxzKGxhYmVsczogc3RyaW5nW10sIF9wdWJsaWM6IGJvb2xlYW4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPVxuICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzICYmXG4gICAgICAgICAgICAoX3B1YmxpY1xuICAgICAgICAgICAgICAgID8gdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzLnB1YmxpY0xhYmVsc0ZpZWxkXG4gICAgICAgICAgICAgICAgOiB0aGlzLmFwcFNlcnZpY2UuY2NsYWJlbHMucHJpdmF0ZUxhYmVsc0ZpZWxkKTtcbiAgICAgICAgaWYgKCFmaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXM6IFZhbHVlSXRlbVtdID0gW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTGFiZWxzOiBzdHJpbmdbXSA9IHRoaXMuZ2V0U2VsZWN0ZWRMYWJlbHMoZmllbGQpO1xuICAgICAgICBmb3IgKGxldCBsYWJlbCBvZiBsYWJlbHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXkgPSBsYWJlbDtcbiAgICAgICAgICAgIGlmICghX3B1YmxpYykge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gPHN0cmluZz50aGlzLmFkZFByaXZhdGVQcmVmaXgobGFiZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTGFiZWxzLmluZGV4T2YobGFiZWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGRpc3BsYXksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaFNlcnZpY2UuYWRkRmllbGRTZWxlY3QoZmllbGQsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2godW5kZWZpbmVkLCB7XG4gICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5MYWJlbF9PcGVuLFxuICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICEhbGFiZWxzID8gbGFiZWxzLnRvU3RyaW5nKCkgOiBudWxsLFxuICAgICAgICAgICAgICAgIHB1YmxpYzogX3B1YmxpYyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgbGFiZWxzIHRoYXQgYXJlIG5vdCBpbiB0aGUgY3VycmVudCBmaWx0ZXJzIG9mIGJyZWFkY3J1bWJzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmllbGQgVGhlIGNvbHVtbiBpbmRleCBjb250YWluaW5nIHRoZSBsYWJlbHMuXG4gICAgICogQHJldHVybnMgVGhlIHNlbGVjdGVkIGxhYmVsc1xuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRMYWJlbHMoZmllbGQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgbGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAoZmllbGQgJiYgdGhpcy5zZWFyY2hTZXJ2aWNlLmJyZWFkY3J1bWJzPy5hY3RpdmVTZWxlY3RzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNlbGVjdCBvZiB0aGlzLnNlYXJjaFNlcnZpY2UuYnJlYWRjcnVtYnMuYWN0aXZlU2VsZWN0cykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3QuZXhwcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBzZWxlY3QuZXhwci5nZXRWYWx1ZXMoZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbHMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICB9XG5cbiAgICByZW5hbWVMYWJlbHMoXG4gICAgICAgIGxhYmVsczogc3RyaW5nW10sXG4gICAgICAgIG5ld0xhYmVsOiBzdHJpbmcsXG4gICAgICAgIF9wdWJsaWM6IGJvb2xlYW5cbiAgICApOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCFsYWJlbHMgfHwgbGFiZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMubGFiZWxzV2ViU2VydmljZS5yZW5hbWUoXG4gICAgICAgICAgICBsYWJlbHMsXG4gICAgICAgICAgICBuZXdMYWJlbCxcbiAgICAgICAgICAgIF9wdWJsaWNcbiAgICAgICAgKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcIm1zZyNyZW5hbWVMYWJlbC5lcnJvckZlZWRiYWNrXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJtc2cjcmVuYW1lTGFiZWwuc3VjY2Vzc0ZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTsgLyoqIFVwZGF0ZSB0aGUgZGlzcGxheSBpbW1lZGlhdGVseSBpbiB0aGUgY29tcG9uZW50cyBhbmQgZmFjZXRzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgZGVsZXRlTGFiZWxzKGxhYmVsczogc3RyaW5nW10sIF9wdWJsaWM6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCFsYWJlbHMgfHwgbGFiZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMubGFiZWxzV2ViU2VydmljZS5kZWxldGUobGFiZWxzLCBfcHVibGljKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcIm1zZyNkZWxldGVMYWJlbC5lcnJvckZlZWRiYWNrXCIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc3VjY2VzcyhcbiAgICAgICAgICAgICAgICAgICAgXCJtc2cjZGVsZXRlTGFiZWwuc3VjY2Vzc0ZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTsgLyoqIFVwZGF0ZSB0aGUgZGlzcGxheSBpbW1lZGlhdGVseSBpbiB0aGUgY29tcG9uZW50cyBhbmQgZmFjZXRzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgYnVsa0FkZExhYmVscyhsYWJlbHM6IHN0cmluZ1tdLCBfcHVibGljOiBib29sZWFuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGlmICghbGFiZWxzIHx8IGxhYmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvZigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmxhYmVsc1dlYlNlcnZpY2UuYnVsa0FkZChcbiAgICAgICAgICAgIGxhYmVscyxcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSxcbiAgICAgICAgICAgIF9wdWJsaWNcbiAgICAgICAgKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgXCJtc2cjYnVsa0FkZExhYmVsLmVycm9yRmVlZGJhY2tcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgICBcIm1zZyNidWxrQWRkTGFiZWwuc3VjY2Vzc0ZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTsgLyoqIFVwZGF0ZSB0aGUgZGlzcGxheSBpbW1lZGlhdGVseSBpbiB0aGUgY29tcG9uZW50cyBhbmQgZmFjZXRzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgYnVsa1JlbW92ZUxhYmVscyhsYWJlbHM6IHN0cmluZ1tdLCBfcHVibGljOiBib29sZWFuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGlmICghbGFiZWxzIHx8IGxhYmVscy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvZigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmxhYmVsc1dlYlNlcnZpY2UuYnVsa1JlbW92ZShcbiAgICAgICAgICAgIGxhYmVscyxcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeSxcbiAgICAgICAgICAgIF9wdWJsaWNcbiAgICAgICAgKTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgICAgXCJtc2cjYnVsa1JlbW92ZUxhYmVsLmVycm9yRmVlZGJhY2tcIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgICBcIm1zZyNidWxrUmVtb3ZlTGFiZWwuc3VjY2Vzc0ZlZWRiYWNrXCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTsgLyoqIFVwZGF0ZSB0aGUgZGlzcGxheSBpbW1lZGlhdGVseSBpbiB0aGUgY29tcG9uZW50cyBhbmQgZmFjZXRzKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgZ2V0IHByaXZhdGVMYWJlbHNQcmVmaXgoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLnByaW5jaXBhbFdlYlNlcnZpY2UucHJpbmNpcGFsKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3ByaXZhdGVMYWJlbHNQcmVmaXggJiYgdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmlzVHJlZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzLnByaXZhdGVMYWJlbHNGaWVsZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ByaXZhdGVMYWJlbHNQcmVmaXggPSBVdGlscy5hZGRVcmwoXG4gICAgICAgICAgICAgICAgICAgIFwiL1wiLFxuICAgICAgICAgICAgICAgICAgICBVdGlscy5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmluY2lwYWxXZWJTZXJ2aWNlLnByaW5jaXBhbC51c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiL1wiXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIFwiL1wiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJpdmF0ZUxhYmVsc1ByZWZpeCA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpbmNpcGFsV2ViU2VydmljZS5wcmluY2lwYWwudXNlcklkICsgXCJ8XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3ByaXZhdGVMYWJlbHNQcmVmaXggfHwgXCJcIjtcbiAgICB9XG5cbiAgICBzb3J0KGxhYmVsczogc3RyaW5nW10sIF9wdWJsaWM6IGJvb2xlYW4pOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICghbGFiZWxzKSByZXR1cm4gbGFiZWxzO1xuICAgICAgICByZXR1cm4gbGFiZWxzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmICghYSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgaWYgKCFiKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghX3B1YmxpYykge1xuICAgICAgICAgICAgICAgIGEgPSA8c3RyaW5nPnRoaXMucmVtb3ZlUHJpdmF0ZVByZWZpeChhKTtcbiAgICAgICAgICAgICAgICBiID0gPHN0cmluZz50aGlzLnJlbW92ZVByaXZhdGVQcmVmaXgoYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhID0gdGhpcy5pbnRsU2VydmljZS5mb3JtYXRNZXNzYWdlKGEpO1xuICAgICAgICAgICAgYiA9IHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZShiKTtcbiAgICAgICAgICAgIHJldHVybiBhLmxvY2FsZUNvbXBhcmUoYik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNwbGl0KGxhYmVsczogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoIWxhYmVscykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYWJlbHNcbiAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgIC5zcGxpdCgvXFxzKjtcXHMqLylcbiAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBcIlwiO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkUHJpdmF0ZVByZWZpeChsYWJlbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzICYmXG4gICAgICAgICAgICB0aGlzLmFwcFNlcnZpY2UuaXNUcmVlKHRoaXMuYXBwU2VydmljZS5jY2xhYmVscy5wcml2YXRlTGFiZWxzRmllbGQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmFkZFVybCh0aGlzLnByaXZhdGVMYWJlbHNQcmVmaXgsIGxhYmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByaXZhdGVMYWJlbHNQcmVmaXggKyBsYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFByaXZhdGVQcmVmaXgobGFiZWxzOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsYWJlbHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRQcml2YXRlUHJlZml4KGxhYmVscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWMgPSBsYWJlbHMubGVuZ3RoOyBpIDwgaWM7IGkrKykge1xuICAgICAgICAgICAgICAgIGxhYmVsc1tpXSA9IHRoaXMuX2FkZFByaXZhdGVQcmVmaXgobGFiZWxzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsYWJlbHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZW1vdmVQcml2YXRlUHJlZml4KGxhYmVsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAobGFiZWwuaW5kZXhPZih0aGlzLnByaXZhdGVMYWJlbHNQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzICYmXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmlzVHJlZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBTZXJ2aWNlLmNjbGFiZWxzLnByaXZhdGVMYWJlbHNGaWVsZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbC5zbGljZSh0aGlzLnByaXZhdGVMYWJlbHNQcmVmaXgubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYWJlbC5zbGljZSh0aGlzLnByaXZhdGVMYWJlbHNQcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxuXG4gICAgcmVtb3ZlUHJpdmF0ZVByZWZpeChsYWJlbHM6IHN0cmluZyB8IHN0cmluZ1tdKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuICAgICAgICBpZiAodHlwZW9mIGxhYmVscyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVByaXZhdGVQcmVmaXgobGFiZWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBpYyA9IGxhYmVscy5sZW5ndGg7IGkgPCBpYzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGFiZWxzW2ldID0gdGhpcy5fcmVtb3ZlUHJpdmF0ZVByZWZpeChsYWJlbHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVscztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==