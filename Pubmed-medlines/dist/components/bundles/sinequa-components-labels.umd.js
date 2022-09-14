(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@sinequa/core/intl'), require('@sinequa/core/validation'), require('@sinequa/components/utils'), require('@sinequa/components/modal'), require('@sinequa/components/autocomplete'), require('rxjs'), require('@sinequa/core/base'), require('@sinequa/components/action'), require('@sinequa/core/web-services'), require('@sinequa/core/app-utils'), require('@sinequa/components/search'), require('@sinequa/core/modal'), require('@sinequa/core/notification'), require('@sinequa/components/selection'), require('@sinequa/core/login')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/labels', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@sinequa/core/intl', '@sinequa/core/validation', '@sinequa/components/utils', '@sinequa/components/modal', '@sinequa/components/autocomplete', 'rxjs', '@sinequa/core/base', '@sinequa/components/action', '@sinequa/core/web-services', '@sinequa/core/app-utils', '@sinequa/components/search', '@sinequa/core/modal', '@sinequa/core/notification', '@sinequa/components/selection', '@sinequa/core/login'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components.labels = {}), global.ng.core, global.ng.common, global.ng.forms, global.sinequa.core.intl, global.sinequa.core.validation, global.sinequa.components.utils, global.sinequa.components.modal, global.sinequa.components.autocomplete, global.rxjs, global.sinequa.core.base, global.sinequa.components.action, global.sinequa.core['web-services'], global.sinequa.core['app-utils'], global.sinequa.components.search, global.sinequa.core.modal, global.sinequa.core.notification, global.sinequa.components.selection, global.sinequa.core.login));
}(this, (function (exports, i0, i5$1, i1$2, i5, i7$1, i3$1, i4$1, i1$1, rxjs, base, i4, i1, i2, i3, i2$1, i6, i7, i1$3) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var LABELS_COMPONENTS = new i0.InjectionToken("LABELS_COMPONENTS");
    var LabelsService = /** @class */ (function () {
        function LabelsService(labelsWebService, appService, searchService, modalService, principalWebService, intlService, notificationService, selectionService, labelsComponents) {
            var _this = this;
            this.labelsWebService = labelsWebService;
            this.appService = appService;
            this.searchService = searchService;
            this.modalService = modalService;
            this.principalWebService = principalWebService;
            this.intlService = intlService;
            this.notificationService = notificationService;
            this.selectionService = selectionService;
            this.labelsComponents = labelsComponents;
            this.principalWebService.events.subscribe(function (event) {
                switch (event.type) {
                    case "changed":
                        _this._privateLabelsPrefix = undefined;
                        _this.labelsRights = undefined;
                        _this.labelsRightsSubscription = undefined;
                        break;
                }
            });
        }
        Object.defineProperty(LabelsService.prototype, "publicLabelsField", {
            get: function () {
                return this.appService.cclabels
                    ? this.appService.cclabels.publicLabelsField
                    : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LabelsService.prototype, "privateLabelsField", {
            get: function () {
                return this.appService.cclabels
                    ? this.appService.cclabels.privateLabelsField
                    : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LabelsService.prototype, "labelsAutoSuggestWildcard", {
            get: function () {
                return this.appService.cclabels
                    ? this.appService.cclabels.labelsAutoSuggestWildcard
                    : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LabelsService.prototype, "allowPublicLabelsManagement", {
            get: function () {
                return this.appService.cclabels
                    ? this.appService.cclabels.allowPublicLabelsCreation
                    : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LabelsService.prototype, "allowPublicLabelsEdition", {
            get: function () {
                return this.appService.cclabels
                    ? this.appService.cclabels.allowPublicLabelsModification
                    : false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LabelsService.prototype, "userLabelsRights", {
            get: function () {
                var rights;
                if (!this.labelsRights) {
                    if (!this.labelsRightsSubscription) {
                        var observable = this.labelsWebService.getUserRights();
                        this.labelsRightsSubscription = base.Utils.subscribe(observable, function (response) { return (rights = response); });
                    }
                    else {
                        rights = LabelsService.defaultLabelsRights;
                    }
                    this.labelsRights = !!rights
                        ? rights
                        : LabelsService.defaultLabelsRights;
                }
                return this.labelsRights;
            },
            enumerable: false,
            configurable: true
        });
        LabelsService.prototype.ngOnDestroy = function () {
            if (this.labelsRightsSubscription) {
                this.labelsRightsSubscription.unsubscribe();
            }
        };
        /** From navbar */
        LabelsService.prototype.renameLabelModal = function () {
            var data = {
                oldValues: [],
                newValue: "",
                properties: this._modalProperties(2 /* rename */),
            };
            return this.modalService.open(this.labelsComponents.renameModal, {
                model: data,
            });
        };
        LabelsService.prototype.deleteLabelModal = function () {
            var data = {
                values: [],
                properties: this._modalProperties(3 /* delete */),
            };
            return this.modalService.open(this.labelsComponents.deleteModal, {
                model: data,
            });
        };
        LabelsService.prototype.bulkAddLabelModal = function () {
            var data = {
                values: [],
                properties: this._modalProperties(4 /* bulkAdd */),
            };
            return this.modalService.open(this.labelsComponents.addModal, {
                model: data,
            });
        };
        LabelsService.prototype.bulkRemoveLabelModal = function () {
            var data = {
                values: [],
                properties: this._modalProperties(5 /* bulkRemove */),
            };
            return this.modalService.open(this.labelsComponents.deleteModal, {
                model: data,
            });
        };
        LabelsService.prototype._modalProperties = function (action) {
            var allowManagePublicLabels = this.allowPublicLabelsManagement &&
                this.userLabelsRights &&
                this.userLabelsRights.canManagePublicLabels;
            var allowEditPublicLabels = this.allowPublicLabelsEdition &&
                this.userLabelsRights &&
                this.userLabelsRights.canEditPublicLabels;
            var allowNewLabels = false;
            var radioButtonsConf;
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
        };
        LabelsService.prototype._getModalRadioButtonsConf = function (publicRight) {
            var isPublic = true;
            var disableAutocomplete = false;
            var radioButtons = [];
            var publicRadioButton = {
                id: "publicLabel",
                name: "msg#labels.public",
                value: true,
                disabled: false,
                checked: true,
            };
            var privateRadioButton = {
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
        };
        /** END From navbar */
        /** From result selector */
        LabelsService.prototype.buildSelectionAction = function () {
            var _this = this;
            if (!this.publicLabelsField && !this.privateLabelsField) {
                return undefined;
            }
            var action = new i4.Action({
                icon: "fas fa-tags",
                title: "msg#labels.labels",
                action: function () {
                    _this.editLabelModal();
                },
            });
            if (action) {
                action.updater = function (action) {
                    action.hidden = !_this.selectionService.haveSelectedRecords;
                };
                action.hidden = true;
            }
            return action;
        };
        LabelsService.prototype.editLabelModal = function () {
            var data = {
                valuesToBeAdded: [],
                valuesToBeRemoved: [],
                properties: this._modalProperties(6 /* edit */),
            };
            return this.modalService.open(this.labelsComponents.editModal, {
                model: data,
            });
        };
        /** END result selector */
        LabelsService.prototype.addLabels = function (labels, ids, _public) {
            if (!labels || labels.length === 0 || !ids || ids.length === 0) {
                return rxjs.of();
            }
            var observable = this.labelsWebService.add(labels, ids, _public);
            return observable;
        };
        LabelsService.prototype.removeLabels = function (labels, ids, _public) {
            if (!labels || labels.length === 0 || !ids || ids.length === 0) {
                return rxjs.of();
            }
            var observable = this.labelsWebService.remove(labels, ids, _public);
            return observable;
        };
        LabelsService.prototype.selectLabels = function (labels, _public) {
            var e_1, _b;
            var field = this.appService.cclabels &&
                (_public
                    ? this.appService.cclabels.publicLabelsField
                    : this.appService.cclabels.privateLabelsField);
            if (!field) {
                return Promise.resolve(false);
            }
            var items = [];
            var selectedLabels = this.getSelectedLabels(field);
            try {
                for (var labels_1 = __values(labels), labels_1_1 = labels_1.next(); !labels_1_1.done; labels_1_1 = labels_1.next()) {
                    var label = labels_1_1.value;
                    var display = label;
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (labels_1_1 && !labels_1_1.done && (_b = labels_1.return)) _b.call(labels_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.searchService.addFieldSelect(field, items);
            return this.searchService.search(undefined, {
                type: "Label_Open" /* Label_Open */,
                detail: {
                    label: !!labels ? labels.toString() : null,
                    public: _public,
                },
            });
        };
        /**
         * Retrieves the labels that are not in the current filters of breadcrumbs
         *
         * @param field The column index containing the labels.
         * @returns The selected labels
         */
        LabelsService.prototype.getSelectedLabels = function (field) {
            var e_2, _b;
            var _a;
            var labels = [];
            if (field && ((_a = this.searchService.breadcrumbs) === null || _a === void 0 ? void 0 : _a.activeSelects)) {
                try {
                    for (var _c = __values(this.searchService.breadcrumbs.activeSelects), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var select = _d.value;
                        if (select.expr) {
                            var values = select.expr.getValues(field);
                            values.forEach(function (value) {
                                if (labels.indexOf(value) === -1) {
                                    labels.push(value);
                                }
                            });
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return labels;
        };
        LabelsService.prototype.renameLabels = function (labels, newLabel, _public) {
            var _this = this;
            if (!labels || labels.length === 0) {
                return rxjs.of();
            }
            var observable = this.labelsWebService.rename(labels, newLabel, _public);
            base.Utils.subscribe(observable, function () { }, function () {
                _this.notificationService.error("msg#renameLabel.errorFeedback");
            }, function () {
                _this.notificationService.success("msg#renameLabel.successFeedback");
                _this.searchService.search(); /** Update the display immediately in the components and facets*/
            });
            return observable;
        };
        LabelsService.prototype.deleteLabels = function (labels, _public) {
            var _this = this;
            if (!labels || labels.length === 0) {
                return rxjs.of();
            }
            var observable = this.labelsWebService.delete(labels, _public);
            base.Utils.subscribe(observable, function () { }, function () {
                _this.notificationService.error("msg#deleteLabel.errorFeedback");
            }, function () {
                _this.notificationService.success("msg#deleteLabel.successFeedback");
                _this.searchService.search(); /** Update the display immediately in the components and facets*/
            });
            return observable;
        };
        LabelsService.prototype.bulkAddLabels = function (labels, _public) {
            var _this = this;
            if (!labels || labels.length === 0) {
                return rxjs.of();
            }
            var observable = this.labelsWebService.bulkAdd(labels, this.searchService.query, _public);
            base.Utils.subscribe(observable, function () { }, function () {
                _this.notificationService.error("msg#bulkAddLabel.errorFeedback");
            }, function () {
                _this.notificationService.success("msg#bulkAddLabel.successFeedback");
                _this.searchService.search(); /** Update the display immediately in the components and facets*/
            });
            return observable;
        };
        LabelsService.prototype.bulkRemoveLabels = function (labels, _public) {
            var _this = this;
            if (!labels || labels.length === 0) {
                return rxjs.of();
            }
            var observable = this.labelsWebService.bulkRemove(labels, this.searchService.query, _public);
            base.Utils.subscribe(observable, function () { }, function () {
                _this.notificationService.error("msg#bulkRemoveLabel.errorFeedback");
            }, function () {
                _this.notificationService.success("msg#bulkRemoveLabel.successFeedback");
                _this.searchService.search(); /** Update the display immediately in the components and facets*/
            });
            return observable;
        };
        Object.defineProperty(LabelsService.prototype, "privateLabelsPrefix", {
            get: function () {
                if (!this.principalWebService.principal) {
                    return "";
                }
                if (!this._privateLabelsPrefix && this.appService.cclabels) {
                    if (this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
                        this._privateLabelsPrefix = base.Utils.addUrl("/", base.Utils.replace(this.principalWebService.principal.userId, "|", "/"), "/");
                    }
                    else {
                        this._privateLabelsPrefix =
                            this.principalWebService.principal.userId + "|";
                    }
                }
                return this._privateLabelsPrefix || "";
            },
            enumerable: false,
            configurable: true
        });
        LabelsService.prototype.sort = function (labels, _public) {
            var _this = this;
            if (!labels)
                return labels;
            return labels.sort(function (a, b) {
                if (!a)
                    return -1;
                if (!b)
                    return 1;
                if (!_public) {
                    a = _this.removePrivatePrefix(a);
                    b = _this.removePrivatePrefix(b);
                }
                a = _this.intlService.formatMessage(a);
                b = _this.intlService.formatMessage(b);
                return a.localeCompare(b);
            });
        };
        LabelsService.prototype.split = function (labels) {
            if (!labels) {
                return [];
            }
            return labels
                .trim()
                .split(/\s*;\s*/)
                .filter(function (value) {
                return value !== "";
            });
        };
        LabelsService.prototype._addPrivatePrefix = function (label) {
            if (this.appService.cclabels &&
                this.appService.isTree(this.appService.cclabels.privateLabelsField)) {
                return base.Utils.addUrl(this.privateLabelsPrefix, label);
            }
            else {
                return this.privateLabelsPrefix + label;
            }
        };
        LabelsService.prototype.addPrivatePrefix = function (labels) {
            if (typeof labels === "string") {
                return this._addPrivatePrefix(labels);
            }
            else {
                for (var i = 0, ic = labels.length; i < ic; i++) {
                    labels[i] = this._addPrivatePrefix(labels[i]);
                }
                return labels;
            }
        };
        LabelsService.prototype._removePrivatePrefix = function (label) {
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
        };
        LabelsService.prototype.removePrivatePrefix = function (labels) {
            if (typeof labels === "string") {
                return this._removePrivatePrefix(labels);
            }
            else {
                for (var i = 0, ic = labels.length; i < ic; i++) {
                    labels[i] = this._removePrivatePrefix(labels[i]);
                }
                return labels;
            }
        };
        return LabelsService;
    }());
    LabelsService.defaultLabelsRights = {
        canManagePublicLabels: true,
        canEditPublicLabels: true,
    };
    LabelsService.ɵfac = function LabelsService_Factory(t) { return new (t || LabelsService)(i0.ɵɵinject(i1.LabelsWebService), i0.ɵɵinject(i2.AppService), i0.ɵɵinject(i3.SearchService), i0.ɵɵinject(i2$1.ModalService), i0.ɵɵinject(i1.PrincipalWebService), i0.ɵɵinject(i5.IntlService), i0.ɵɵinject(i6.NotificationsService), i0.ɵɵinject(i7.SelectionService), i0.ɵɵinject(LABELS_COMPONENTS)); };
    LabelsService.ɵprov = i0.ɵɵdefineInjectable({ token: LabelsService, factory: LabelsService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LabelsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root",
                    }]
            }], function () {
            return [{ type: i1.LabelsWebService }, { type: i2.AppService }, { type: i3.SearchService }, { type: i2$1.ModalService }, { type: i1.PrincipalWebService }, { type: i5.IntlService }, { type: i6.NotificationsService }, { type: i7.SelectionService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [LABELS_COMPONENTS]
                        }] }];
        }, null);
    })();

    var LabelPipe = /** @class */ (function (_super) {
        __extends(LabelPipe, _super);
        function LabelPipe(labelsService, intlService, changeDetectorRef) {
            var _this = _super.call(this, intlService, changeDetectorRef) || this;
            _this.labelsService = labelsService;
            return _this;
        }
        LabelPipe.prototype.updateValue = function (value, _public) {
            _super.prototype.updateValue.call(this, value, _public);
            this.value = value;
            if (!_public) {
                this.value = this.labelsService.removePrivatePrefix(this.value);
            }
            this.value = this.intlService.formatMessage(this.value);
        };
        return LabelPipe;
    }(i5.AbstractIntlPipe));
    LabelPipe.ɵfac = function LabelPipe_Factory(t) { return new (t || LabelPipe)(i0.ɵɵdirectiveInject(LabelsService), i0.ɵɵdirectiveInject(i5.IntlService), i0.ɵɵinjectPipeChangeDetectorRef()); };
    LabelPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "sqLabel", type: LabelPipe, pure: false });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LabelPipe, [{
                type: i0.Pipe,
                args: [{ name: "sqLabel", pure: false }]
            }], function () { return [{ type: LabelsService }, { type: i5.IntlService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    function Labels_div_0_span_1_i_6_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "i", 6);
            i0.ɵɵlistener("click", function Labels_div_0_span_1_i_6_Template_i_click_0_listener() { i0.ɵɵrestoreView(_r7_1); var $index_r3 = i0.ɵɵnextContext().index; var ctx_r5 = i0.ɵɵnextContext(2); return ctx_r5.remove($index_r3); });
            i0.ɵɵpipe(1, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0.ɵɵnextContext(3);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, ctx_r4.public ? "msg#labels.removePublicLabelTitle" : "msg#labels.removePrivateLabelTitle"));
        }
    }
    var _c0 = function (a0, a1) { return { "sq-labels-public": a0, "sq-labels-private": a1 }; };
    function Labels_div_0_span_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r9_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 1);
            i0.ɵɵelementStart(1, "div", 3);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementStart(3, "span", 4);
            i0.ɵɵlistener("click", function Labels_div_0_span_1_Template_span_click_3_listener() { i0.ɵɵrestoreView(_r9_1); var label_r2 = ctx.$implicit; var ctx_r8 = i0.ɵɵnextContext(2); return ctx_r8.select(label_r2); });
            i0.ɵɵtext(4);
            i0.ɵɵpipe(5, "sqLabel");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, Labels_div_0_span_1_i_6_Template, 2, 3, "i", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var label_r2 = ctx.$implicit;
            var ctx_r1 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(2, 4, ctx_r1.public ? "msg#labels.selectPublicLabelTitle" : "msg#labels.selectPrivateLabelTitle"));
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(9, _c0, ctx_r1.public, !ctx_r1.public));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 6, label_r2, ctx_r1.public));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx_r1.canRemove());
        }
    }
    function Labels_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵtemplate(1, Labels_div_0_span_1_Template, 7, 12, "span", 2);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r0.labels);
        }
    }
    var Labels = /** @class */ (function () {
        function Labels(appService, labelsService) {
            this.appService = appService;
            this.labelsService = labelsService;
            this.enableDelete = false; /** Display the delete button in the label tag */
        }
        Labels.prototype.ngOnChanges = function () {
            var field = this.public
                ? this.labelsService.publicLabelsField
                : this.labelsService.privateLabelsField;
            this.labelsField = this.appService.resolveColumnAlias(field);
            this.showLabels = !!this.labelsField;
            this.makeLabels();
        };
        Labels.prototype.makeLabels = function () {
            if (!this.showLabels) {
                this.labels = [];
                return;
            }
            var labels = this.record[this.labelsField];
            if (base.Utils.isArray(labels)) {
                this.labels = this.labelsService.sort(labels.slice(), this.public);
            }
            else {
                this.labels = [];
            }
        };
        Labels.prototype.select = function (label) {
            if (!this.public) {
                label = this.labelsService.removePrivatePrefix(label);
            }
            this.labelsService.selectLabels([label], this.public);
        };
        Labels.prototype.remove = function (index) {
            if (this.canRemove()) {
                var label = this.labels[index];
                if (!this.public) {
                    label = this.labelsService.removePrivatePrefix(label);
                }
                this.labelsService.removeLabels([label], [this.record.id], this.public);
            }
        };
        Labels.prototype.canRemove = function () {
            return this.public
                ? this.enableDelete &&
                    this.labelsService.allowPublicLabelsManagement &&
                    this.labelsService.userLabelsRights &&
                    this.labelsService.userLabelsRights.canManagePublicLabels
                : this.enableDelete && true;
        };
        return Labels;
    }());
    Labels.ɵfac = function Labels_Factory(t) { return new (t || Labels)(i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(LabelsService)); };
    Labels.ɵcmp = i0.ɵɵdefineComponent({ type: Labels, selectors: [["sq-labels"]], hostVars: 2, hostBindings: function Labels_HostBindings(rf, ctx) {
            if (rf & 2) {
                i0.ɵɵclassMap(ctx.hostClasses);
            }
        }, inputs: { record: "record", public: "public", enableDelete: "enableDelete" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "d-inline", 4, "ngIf"], [1, "d-inline"], ["class", "d-inline", 4, "ngFor", "ngForOf"], [1, "badge", "badge-pill", "badge-info", "align-self-center", "mr-1", "d-inline", 3, "ngClass", "title"], [3, "click"], ["class", "sq-label-remove fas fa-times-circle clickable", 3, "title", "click", 4, "ngIf"], [1, "sq-label-remove", "fas", "fa-times-circle", "clickable", 3, "title", "click"]], template: function Labels_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, Labels_div_0_Template, 2, 1, "div", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.showLabels);
            }
        }, directives: [i5$1.NgIf, i5$1.NgForOf, i5$1.NgClass], pipes: [i5.MessagePipe, LabelPipe], styles: [".sq-labels-public[_ngcontent-%COMP%] {\n                background-color: #4fc3f7;\n            }\n            .sq-labels-private[_ngcontent-%COMP%] {\n                background-color: #7283a7;\n            }\n            .sq-label-remove[_ngcontent-%COMP%] {\n                margin-left: 3px;\n            }\n            .clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Labels, [{
                type: i0.Component,
                args: [{
                        selector: "sq-labels",
                        // We need the two spans to get whitespace between each label
                        // change size by adding h1-6 class to .sq-label div (default is h5)
                        templateUrl: "./labels.component.html",
                        styles: [
                            "\n            .sq-labels-public {\n                background-color: #4fc3f7;\n            }\n            .sq-labels-private {\n                background-color: #7283a7;\n            }\n            .sq-label-remove {\n                margin-left: 3px;\n            }\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n        ",
                        ],
                    }]
            }], function () { return [{ type: i2.AppService }, { type: LabelsService }]; }, { record: [{
                    type: i0.Input
                }], public: [{
                    type: i0.Input
                }], enableDelete: [{
                    type: i0.Input
                }], hostClasses: [{
                    type: i0.HostBinding,
                    args: ["class"]
                }] });
    })();

    function ResultLabels_span_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 2);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.caption));
        }
    }
    var ResultLabels = /** @class */ (function () {
        function ResultLabels() {
        }
        return ResultLabels;
    }());
    ResultLabels.ɵfac = function ResultLabels_Factory(t) { return new (t || ResultLabels)(); };
    ResultLabels.ɵcmp = i0.ɵɵdefineComponent({ type: ResultLabels, selectors: [["sq-result-labels"]], inputs: { record: "record", caption: "caption", public: "public" }, decls: 2, vars: 3, consts: [["class", "sq-text", 4, "ngIf"], [3, "record", "public"], [1, "sq-text"]], template: function ResultLabels_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, ResultLabels_span_0_Template, 3, 3, "span", 0);
                i0.ɵɵelement(1, "sq-labels", 1);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.caption);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("record", ctx.record)("public", ctx.public);
            }
        }, directives: [i5$1.NgIf, Labels], pipes: [i5.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ResultLabels, [{
                type: i0.Component,
                args: [{
                        selector: "sq-result-labels",
                        templateUrl: "./result-labels.component.html"
                    }]
            }], null, { record: [{
                    type: i0.Input
                }], caption: [{
                    type: i0.Input
                }], public: [{
                    type: i0.Input
                }] });
    })();

    var LabelsAutocomplete = /** @class */ (function (_super) {
        __extends(LabelsAutocomplete, _super);
        function LabelsAutocomplete(elementRef, suggestService, appService, uiService, labelsWebService, labelsService) {
            var _this = _super.call(this, elementRef, suggestService, appService, uiService) || this;
            _this.labelsWebService = labelsWebService;
            _this.labelsService = labelsService;
            /** Event synchronizing the list of selected labels in the parent component */
            _this.itemsUpdate = new i0.EventEmitter();
            /** Enable adding new labels in labelsItems or not */
            _this.allowNewLabels = false;
            /** Define the right of adding new labels in labelsItems or not */
            _this.allowManagePublicLabels = false;
            /** Stores the selected labels items selected via Tab */
            _this.labelsItems = [];
            /** Stores the suggestions retrieved by th server in order to perform checks on key.enter events */
            _this._suggestions = [];
            return _this;
        }
        /**
         * The ngOnInit() method from the original directive is overriden
         * On initialization, we listen to the autocomplete component for
         * selection events
         */
        LabelsAutocomplete.prototype.ngOnInit = function () {
            var _this = this;
            this._dropdownSubscription = this.dropdown.clicked.subscribe(function (item) {
                _this.select(item, true); // An item was selected from the autocomplete => take the value
            });
            this.start();
        };
        /**
         * If the inputs changes state, react accordingly
         * @param changes
         */
        LabelsAutocomplete.prototype.ngOnChanges = function (changes) {
            if (changes["labelsItems"]) {
                this.updatePlaceholder();
            }
            // Override start() by using init() instead, so that no double queries are generated and autocomplete dropdown is shown only on focus
            if (changes["off"] && !this.off) {
                this.init();
            }
            // If labels category changes, we must remove the selected labels items and reinitialize the autocomplete
            if (changes["public"] && !changes["public"].firstChange) {
                var newInitLabels = __spread(changes["labelsItems"].currentValue);
                this.inputElement.blur();
                /** Reset the input Value*/
                this.setInputValue("");
                /** initialize the input needed specially for labels edit cases */
                this.updatePlaceholder();
                this.itemsUpdate.next(newInitLabels);
            }
        };
        /**
         * The getSuggests() method from the original directive is overriden to
         * use the labelsService rather than suggest service.
         */
        LabelsAutocomplete.prototype.getSuggests = function () {
            var e_1, _a;
            var value = this.getInputValue();
            if (value) {
                // parse
                var labels = value.split(";");
                // find label at caret location
                var position = this.getInputPosition();
                var length = 0;
                var val = void 0;
                try {
                    for (var labels_1 = __values(labels), labels_1_1 = labels_1.next(); !labels_1_1.done; labels_1_1 = labels_1.next()) {
                        var label = labels_1_1.value;
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
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (labels_1_1 && !labels_1_1.done && (_a = labels_1.return)) _a.call(labels_1);
                    }
                    finally { if (e_1) throw e_1.error; }
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
        };
        LabelsAutocomplete.prototype._getLabelsSuggestions = function (val) {
            var _this = this;
            this.labelsWebService.list(val, this.public).subscribe(function (labels) {
                if (_this.getState() === i1$1.AutocompleteState.ACTIVE ||
                    _this.getState() === i1$1.AutocompleteState.OPENED) {
                    /** Eliminate suggestions that are already selected */
                    labels.labels = labels.labels.filter(function (label) { return !_this.labelsItems.find(function (item) { return item.display === label; }); });
                    /** update the local list of suggestions */
                    _this._suggestions = labels.labels;
                    /** limit the suggestions to be displayed to 10  */
                    labels.labels = labels.labels.slice(0, 10);
                    _this.dropdown.update(true, labels.labels.map(function (label) {
                        return {
                            display: label,
                            category: "",
                        };
                    }));
                }
            }, function () {
                _this.dropdown.update(false);
            }, function () {
                if (_this.dropdown.hasItems &&
                    _this.getState() === i1$1.AutocompleteState.ACTIVE) {
                    _this.open(); // Switch from ACTIVE to OPENED (if not already)
                }
                else if (!_this.dropdown.hasItems &&
                    _this.getState() === i1$1.AutocompleteState.OPENED) {
                    // No data
                    _this.active(); // Switch from OPENED to ACTIVE (if not already)
                }
            });
        };
        /**
         * The setAutocompleteItem() method from the original directive is overriden to
         * Sets the content of the <input> based on the given
         * Autocomplete Item.
         * @returns false since labels items don't need to be searched
         */
        LabelsAutocomplete.prototype.setAutocompleteItem = function (item) {
            if (item) {
                // Store the autocomplete items that will be used to create a selection
                this.labelsItems.push(item);
                this.updatePlaceholder();
                this.itemsUpdate.next(this.labelsItems);
                this.setInputValue("");
            }
            return false;
        };
        /**
         * The startOrActive() method from the original directive is overriden to
         * immediately switch to ACTIVE if it is not the case
         */
        LabelsAutocomplete.prototype.startOrActive = function () {
            if (this.getState() !== i1$1.AutocompleteState.ACTIVE &&
                this.getState() !== i1$1.AutocompleteState.OPENED) {
                // Avoid flickering
                this.start();
                this.active();
            }
        };
        /**
         * Listen to user's keyboard actions in the <input>, in order to navigate
         * and select the autocomplete suggestions.
         * Overrides the parent keydown method, adds the management of the backspace key
         * to remove labels items, enhance the enter key to support adding new labels.
         * @param event the keyboard
         */
        LabelsAutocomplete.prototype.keydown = function (event) {
            var keydown = _super.prototype.keydown.call(this, event);
            if (keydown === undefined) {
                //We can remove selections by typing <backspace> when the input is empty
                if (event.keyCode === base.Keys.backspace) {
                    if (this.getInputValue() === "") {
                        this.labelsItems.pop();
                        this.updatePlaceholder();
                        this.itemsUpdate.next(this.labelsItems);
                    }
                }
                /** Allow the selection one of new labels that not exists in the list */
                if (event.keyCode === base.Keys.enter) {
                    this._manageSetAutocompleteItem();
                }
            }
            return keydown;
        };
        /**
         * Listens to focus events on the <input> host and overrides the parent focus events in order to launch the autocomplete
         * If empty input :
         * - display top relevent labels if the auto-suggest wildcard is configured
         * - restart the autocomplete if no auto-suggest wildcard is found
         * If not empty input :
         * retrieve suggestions based on this input text
         */
        LabelsAutocomplete.prototype.focus = function () {
            this.start();
            this.active();
        };
        /**
         * Listens to blur events (out of focus) on the <input> host and overrides the parent blur events
         */
        LabelsAutocomplete.prototype.blur = function (event) {
            this._manageSetAutocompleteItem();
            this.init();
        };
        /**
         * Overrides the parent inputChanged method, so that it is possible to reinitialize the autocomplete
         * @param event
         */
        LabelsAutocomplete.prototype.inputChanged = function (event) {
            switch (this.getState()) {
                case i1$1.AutocompleteState.OPENED:
                    this.suggest(); // Just request more data, but no state change
                    break;
                case i1$1.AutocompleteState.START:
                case i1$1.AutocompleteState.ACTIVE:
                    this.active(); // get more data, and change state if not already ACTIVE
                    break;
                case i1$1.AutocompleteState.SELECTED:
                    this.start(); // The model changed because we selected a value ==> we restart in case the user keeps typing
                    this.active();
                    break;
                case i1$1.AutocompleteState.INIT:
                    break;
            }
        };
        /**
         * Updates the <input>'s placeholder to avoid displaying something
         * when there are labelsItems displayed to the left.
         */
        LabelsAutocomplete.prototype.updatePlaceholder = function () {
            this._placeholder = this.labelsItems.length > 0 ? "" : this.placeholder;
        };
        LabelsAutocomplete.prototype._manageSetAutocompleteItem = function () {
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
        };
        return LabelsAutocomplete;
    }(i1$1.Autocomplete));
    LabelsAutocomplete.ɵfac = function LabelsAutocomplete_Factory(t) { return new (t || LabelsAutocomplete)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1$1.SuggestService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3$1.UIService), i0.ɵɵdirectiveInject(i1.LabelsWebService), i0.ɵɵdirectiveInject(LabelsService)); };
    LabelsAutocomplete.ɵdir = i0.ɵɵdefineDirective({ type: LabelsAutocomplete, selectors: [["", "sqAutocompleteLabels", ""]], hostBindings: function LabelsAutocomplete_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("focus", function LabelsAutocomplete_focus_HostBindingHandler() { return ctx.focus(); })("blur", function LabelsAutocomplete_blur_HostBindingHandler($event) { return ctx.blur($event); })("input", function LabelsAutocomplete_input_HostBindingHandler($event) { return ctx.inputChanged($event); });
            }
        }, inputs: { public: "public", allowNewLabels: "allowNewLabels", allowManagePublicLabels: "allowManagePublicLabels", labelsItems: "labelsItems" }, outputs: { itemsUpdate: "itemsUpdate" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LabelsAutocomplete, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqAutocompleteLabels]",
                    }]
            }], function () { return [{ type: i0.ElementRef }, { type: i1$1.SuggestService }, { type: i2.AppService }, { type: i3$1.UIService }, { type: i1.LabelsWebService }, { type: LabelsService }]; }, { itemsUpdate: [{
                    type: i0.Output
                }], public: [{
                    type: i0.Input
                }], allowNewLabels: [{
                    type: i0.Input
                }], allowManagePublicLabels: [{
                    type: i0.Input
                }], labelsItems: [{
                    type: i0.Input
                }], focus: [{
                    type: i0.HostListener,
                    args: ["focus"]
                }], blur: [{
                    type: i0.HostListener,
                    args: ["blur", ["$event"]]
                }], inputChanged: [{
                    type: i0.HostListener,
                    args: ["input", ["$event"]]
                }] });
    })();

    var LabelsModule = /** @class */ (function () {
        function LabelsModule() {
        }
        return LabelsModule;
    }());
    LabelsModule.ɵmod = i0.ɵɵdefineNgModule({ type: LabelsModule });
    LabelsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LabelsModule_Factory(t) { return new (t || LabelsModule)(); }, imports: [[
                i1$2.FormsModule, i1$2.ReactiveFormsModule,
                i5$1.CommonModule,
                i5.IntlModule,
                i7$1.ValidationModule,
                i3$1.UtilsModule,
                i4$1.BsModalModule,
                i1$1.BsAutocompleteModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LabelsModule, { declarations: [LabelPipe, Labels, ResultLabels, LabelsAutocomplete], imports: [i1$2.FormsModule, i1$2.ReactiveFormsModule,
                i5$1.CommonModule,
                i5.IntlModule,
                i7$1.ValidationModule,
                i3$1.UtilsModule,
                i4$1.BsModalModule,
                i1$1.BsAutocompleteModule], exports: [LabelPipe, Labels, ResultLabels, LabelsAutocomplete] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LabelsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1$2.FormsModule, i1$2.ReactiveFormsModule,
                            i5$1.CommonModule,
                            i5.IntlModule,
                            i7$1.ValidationModule,
                            i3$1.UtilsModule,
                            i4$1.BsModalModule,
                            i1$1.BsAutocompleteModule,
                        ],
                        declarations: [
                            LabelPipe, Labels, ResultLabels, LabelsAutocomplete
                        ],
                        exports: [
                            LabelPipe, Labels, ResultLabels, LabelsAutocomplete
                        ],
                    }]
            }], null, null);
    })();

    var _c0$1 = function (a0, a1) { return { "label-public": a0, "label-private": a1 }; };
    function BsLabelsAutocompleteComponent_span_3_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "span", 7);
            i0.ɵɵtext(1);
            i0.ɵɵelementStart(2, "span", 8);
            i0.ɵɵlistener("click", function BsLabelsAutocompleteComponent_span_3_Template_span_click_2_listener() { i0.ɵɵrestoreView(_r6_1); var item_r4 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeItem(item_r4); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r4 = ctx.$implicit;
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c0$1, ctx_r0.public, !ctx_r0.public));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", item_r4.display, " ");
        }
    }
    function BsLabelsAutocompleteComponent_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r7 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1("", item_r7.display, " ");
        }
    }
    /**
     * Component containing a form and autocomplete to search
     * through the list labels according to a specific type (public/private) and select one(s) of them
     *
     * The component can be used as custom component in the Action
     * menu's modals.
     */
    var BsLabelsAutocompleteComponent = /** @class */ (function () {
        function BsLabelsAutocompleteComponent(elementRef) {
            this.elementRef = elementRef;
            /** Event synchronizing the list of selected labels and label's type in the parent component */
            this.labelsUpdate = new i0.EventEmitter();
            this.disableAutocomplete = false /** Whether the autocomplete input is disabled or not */;
            this.initLabels = []; /** Initial labels to be displayed in the labelsAutocomplete input*/
            this.labelsItems = []; /** List of assigned labels to selected record(s) */
        }
        BsLabelsAutocompleteComponent.prototype.ngOnChanges = function (changes) {
            if (changes.public) {
                this.labelsItems = [];
            }
            if (changes.initLabels) {
                this.labelsItems = this.initLabels.map(function (label) {
                    return {
                        display: label,
                        category: "",
                    };
                });
            }
        };
        BsLabelsAutocompleteComponent.prototype.removeItem = function (item) {
            this.labelsItems.splice(this.labelsItems.indexOf(item), 1);
            this.labelsItems = __spread(this.labelsItems); /** Need to programmatically update this.labelsItems object in order to fire ngOnChanges hook in sqAutocompleteLabels */
            this.labelsUpdate.next(this.labelsItems.map(function (item) { return item.display; }));
        };
        BsLabelsAutocompleteComponent.prototype.onLabelsItemsChanged = function (labelsItems) {
            this.labelsItems = labelsItems; /** Need to Programmatically update this.labelsItems to catch updates happening in the sqAutocompleteLabels  */
            this.labelsUpdate.next(labelsItems.map(function (item) { return item.display; }));
        };
        BsLabelsAutocompleteComponent.prototype.getDropdownItem = function () {
            if (this.elementRef) {
                var current = this.elementRef
                    .nativeElement;
                while (current && !current.classList.contains("dropdown-item")) {
                    current = current.parentElement;
                }
                return current;
            }
            return null;
        };
        BsLabelsAutocompleteComponent.prototype.keydown = function (event) {
            // Intercept tab and set focus to surrounding dropdown-item
            if (event.keyCode === base.Keys.tab) {
                var dropdownItem = this.getDropdownItem();
                if (dropdownItem) {
                    dropdownItem.focus();
                    event.preventDefault();
                    return false;
                }
            }
            return undefined;
        };
        BsLabelsAutocompleteComponent.prototype.keypress = function (event) {
            if (event.keyCode === base.Keys.enter) {
                // Stop click event firing on surrounding anchor (Firefox)
                event.preventDefault();
                return false;
            }
            return undefined;
        };
        return BsLabelsAutocompleteComponent;
    }());
    BsLabelsAutocompleteComponent.ɵfac = function BsLabelsAutocompleteComponent_Factory(t) { return new (t || BsLabelsAutocompleteComponent)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    BsLabelsAutocompleteComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsLabelsAutocompleteComponent, selectors: [["sq-labels-autocomplete"]], inputs: { public: "public", disableAutocomplete: "disableAutocomplete", allowNewLabels: "allowNewLabels", allowManagePublicLabels: "allowManagePublicLabels", initLabels: "initLabels" }, outputs: { labelsUpdate: "labelsUpdate" }, features: [i0.ɵɵNgOnChangesFeature], decls: 10, vars: 13, consts: [["name", "labelsForm", 1, "d-inline"], [1, "sq-dropdown-form"], [1, "form-control"], ["class", "badge badge-pill badge-info align-self-center", 3, "ngClass", 4, "ngFor", "ngForOf"], ["type", "text", "name", "labelName", "spellcheck", "false", "autocomplete", "off", "sqAutocompleteLabels", "", 1, "input-autocomplete", "flex-grow-1", 3, "public", "placeholder", "dropdown", "allowNewLabels", "allowManagePublicLabels", "disabled", "off", "labelsItems", "keydown", "keypress", "itemsUpdate"], ["dropdown", ""], ["itemTpl", ""], [1, "badge", "badge-pill", "badge-info", "align-self-center", 3, "ngClass"], [1, "fas", "fa-times-circle", "clickable", 3, "click"], [1, "autocomplete-item", "p-2"]], template: function BsLabelsAutocompleteComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "section", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵtemplate(3, BsLabelsAutocompleteComponent_span_3_Template, 3, 5, "span", 3);
                i0.ɵɵelementStart(4, "input", 4);
                i0.ɵɵlistener("keydown", function BsLabelsAutocompleteComponent_Template_input_keydown_4_listener($event) { return ctx.keydown($event); })("keypress", function BsLabelsAutocompleteComponent_Template_input_keypress_4_listener($event) { return ctx.keypress($event); })("itemsUpdate", function BsLabelsAutocompleteComponent_Template_input_itemsUpdate_4_listener($event) { return ctx.onLabelsItemsChanged($event); });
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "sq-autocomplete-list", null, 5);
                i0.ɵɵtemplate(8, BsLabelsAutocompleteComponent_ng_template_8_Template, 2, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                var _r1 = i0.ɵɵreference(7);
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.labelsItems);
                i0.ɵɵadvance(1);
                i0.ɵɵclassProp("disabled", ctx.disableAutocomplete);
                i0.ɵɵproperty("public", ctx.public)("placeholder", i0.ɵɵpipeBind1(5, 11, "msg#labels.selectLabel"))("dropdown", _r1)("allowNewLabels", ctx.allowNewLabels)("allowManagePublicLabels", ctx.allowManagePublicLabels)("disabled", ctx.disableAutocomplete)("off", ctx.disableAutocomplete)("labelsItems", ctx.labelsItems);
            }
        }, directives: [i1$2.ɵangular_packages_forms_forms_y, i1$2.NgControlStatusGroup, i1$2.NgForm, i5$1.NgForOf, LabelsAutocomplete, i1$1.BsAutocompleteList, i5$1.NgClass], pipes: [i5.MessagePipe], styles: [".sq-dropdown-form[_ngcontent-%COMP%] {\n                min-width: 13rem;\n                display: inline;\n            }\n            .disabled[_ngcontent-%COMP%] {\n                cursor: not-allowed;\n            }\n            [_nghost-%COMP%]     .sq-autocomplete-list {\n                width: 50% !important;\n            }\n            .clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }\n            .label-public[_ngcontent-%COMP%] {\n                background-color: #4fc3f7;\n                margin: 2px;\n            }\n            .label-private[_ngcontent-%COMP%] {\n                background-color: #7283a7;\n                margin: 2px;\n            }\n\n            [_nghost-%COMP%]   div[_ngcontent-%COMP%] {\n                width: 100%;\n                display: flex;\n                flex-wrap: wrap;\n                align-items: center;\n                height: unset !important;\n            }\n            [_nghost-%COMP%]   input[_ngcontent-%COMP%] {\n                border: none;\n                flex-grow: 1;\n                flex-basis: 100px;\n                min-width: 100px;\n            }\n            [_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus {\n                outline: none;\n            }"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsLabelsAutocompleteComponent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-labels-autocomplete",
                        templateUrl: "./labels-autocomplete.component.html",
                        styles: [
                            "\n            .sq-dropdown-form {\n                min-width: 13rem;\n                display: inline;\n            }\n            .disabled {\n                cursor: not-allowed;\n            }\n            :host ::ng-deep .sq-autocomplete-list {\n                width: 50% !important;\n            }\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n            .label-public {\n                background-color: #4fc3f7;\n                margin: 2px;\n            }\n            .label-private {\n                background-color: #7283a7;\n                margin: 2px;\n            }\n\n            :host div {\n                width: 100%;\n                display: flex;\n                flex-wrap: wrap;\n                align-items: center;\n                height: unset !important;\n            }\n            :host input {\n                border: none;\n                flex-grow: 1;\n                flex-basis: 100px;\n                min-width: 100px;\n            }\n            :host input:focus {\n                outline: none;\n            }\n        ",
                        ],
                    }]
            }], function () { return [{ type: i0.ElementRef }]; }, { labelsUpdate: [{
                    type: i0.Output
                }], public: [{
                    type: i0.Input
                }], disableAutocomplete: [{
                    type: i0.Input
                }], allowNewLabels: [{
                    type: i0.Input
                }], allowManagePublicLabels: [{
                    type: i0.Input
                }], initLabels: [{
                    type: i0.Input
                }] });
    })();

    var _c0$2 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
    function BsRenameLabel_div_7_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelementStart(1, "input", 9);
            i0.ɵɵlistener("click", function BsRenameLabel_div_7_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r3_1); var item_r1 = ctx.$implicit; var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.updateLabelsNature(item_r1.value); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "label", 10);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("id", item_r1.id);
            i0.ɵɵpropertyInterpolate("value", item_r1.value);
            i0.ɵɵproperty("checked", item_r1.checked)("disabled", item_r1.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0$2, item_r1.disabled, !item_r1.disabled));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("for", item_r1.id);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r1.name));
        }
    }
    var BsRenameLabel = /** @class */ (function () {
        function BsRenameLabel(model, formBuilder, labelsService, changeDetectorRef, modalRef) {
            this.model = model;
            this.formBuilder = formBuilder;
            this.labelsService = labelsService;
            this.changeDetectorRef = changeDetectorRef;
            this.modalRef = modalRef;
            this.isProcessing = false;
        }
        BsRenameLabel.prototype.ngOnInit = function () {
            var _this = this;
            this.labelControl = new i1$2.FormControl(this.model.newValue, i1$2.Validators.required);
            this.form = this.formBuilder.group({
                label: this.labelControl,
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function () {
                _this.model.newValue = _this.labelControl.value;
            });
            this.buttons = [
                new i2$1.ModalButton({
                    text: "msg#renameLabel.btnRename",
                    primary: true,
                    validation: this.form,
                    result: 0 /* Custom */,
                    anchor: true,
                    action: function () {
                        var observable = _this.labelsService.renameLabels(_this.model.oldValues, _this.model.newValue, _this.model.properties.public);
                        if (observable) {
                            _this.isProcessing = true;
                            _this.changeDetectorRef.markForCheck();
                            base.Utils.subscribe(observable, function () { }, function (error) {
                                _this.modalRef.close(error);
                            }, function () {
                                _this.isProcessing = false;
                                _this.modalRef.close(-1 /* OK */);
                            });
                        }
                    },
                }),
                new i2$1.ModalButton({
                    result: -2 /* Cancel */,
                }),
            ];
        };
        BsRenameLabel.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        BsRenameLabel.prototype.updateLabelsNature = function (nature) {
            this.model.properties.public = nature;
        };
        BsRenameLabel.prototype.onLabelsChanged = function (values) {
            this.model.oldValues = values;
        };
        return BsRenameLabel;
    }());
    BsRenameLabel.ɵfac = function BsRenameLabel_Factory(t) { return new (t || BsRenameLabel)(i0.ɵɵdirectiveInject(i2$1.MODAL_MODEL), i0.ɵɵdirectiveInject(i1$2.FormBuilder), i0.ɵɵdirectiveInject(LabelsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2$1.ModalRef)); };
    BsRenameLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsRenameLabel, selectors: [["sq-rename-label"]], decls: 19, vars: 22, consts: [["name", "renameLabel", "novalidate", "", 3, "formGroup"], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-danger"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], ["type", "text", "id", "label", "formControlName", "label", "autocomplete", "off", "spellcheck", "off", 1, "form-control", 3, "sqValidation", "placeholder"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsRenameLabel_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "section");
                i0.ɵɵtemplate(7, BsRenameLabel_div_7_Template, 5, 12, "div", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(8, "b");
                i0.ɵɵelementStart(9, "label", 5);
                i0.ɵɵtext(10);
                i0.ɵɵpipe(11, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(12, "sq-labels-autocomplete", 6);
                i0.ɵɵlistener("labelsUpdate", function BsRenameLabel_Template_sq_labels_autocomplete_labelsUpdate_12_listener($event) { return ctx.onLabelsChanged($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "b");
                i0.ɵɵelementStart(14, "label", 5);
                i0.ɵɵtext(15);
                i0.ɵɵpipe(16, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelement(17, "input", 7);
                i0.ɵɵpipe(18, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#renameLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 14, "msg#renameLabel.alertText"), " ");
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 16, "msg#renameLabel.oldLabels"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 18, "msg#renameLabel.newLabel"));
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(18, 20, "msg#renameLabel.newLabel"));
                i0.ɵɵproperty("sqValidation", ctx.form);
            }
        }, directives: [i1$2.ɵangular_packages_forms_forms_y, i1$2.NgControlStatusGroup, i1$2.FormGroupDirective, i4$1.BsModal, i5$1.NgForOf, BsLabelsAutocompleteComponent, i1$2.DefaultValueAccessor, i1$2.NgControlStatus, i1$2.FormControlName, i7$1.ValidationDirective, i5$1.NgClass], pipes: [i5.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsRenameLabel, [{
                type: i0.Component,
                args: [{
                        selector: "sq-rename-label",
                        templateUrl: "./rename-label.html",
                        styles: [
                            "\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n        ",
                        ],
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i2$1.MODAL_MODEL]
                        }] }, { type: i1$2.FormBuilder }, { type: LabelsService }, { type: i0.ChangeDetectorRef }, { type: i2$1.ModalRef }];
        }, null);
    })();

    var _c0$3 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
    function BsLabelsMenuComponent_li_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 1);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0$3, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
        }
    }
    var BsLabelsMenuComponent = /** @class */ (function () {
        function BsLabelsMenuComponent(loginService, labelsService) {
            var _this = this;
            this.loginService = loginService;
            this.labelsService = labelsService;
            this.icon = "fas fa-tags";
            this.autoAdjust = true;
            this.autoAdjustBreakpoint = "xl";
            this.collapseBreakpoint = "sm";
            this.renameAction = new i4.Action({
                text: "msg#renameLabel.title",
                title: "msg#renameLabel.title",
                action: function () {
                    _this.labelsService.renameLabelModal();
                },
            });
            this.deleteAction = new i4.Action({
                text: "msg#deleteLabel.title",
                title: "msg#deleteLabel.title",
                action: function () {
                    _this.labelsService.deleteLabelModal();
                },
            });
            this.bulkAddAction = new i4.Action({
                text: "msg#bulkAddLabel.title",
                title: "msg#bulkAddLabel.title",
                action: function () {
                    _this.labelsService.bulkAddLabelModal();
                },
            });
            this.bulkDeleteAction = new i4.Action({
                text: "msg#bulkRemoveLabel.title",
                title: "msg#bulkRemoveLabel.title",
                action: function () {
                    _this.labelsService.bulkRemoveLabelModal();
                },
            });
        }
        BsLabelsMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this._loginServiceSubscription = this.loginService.events.subscribe(function (event) {
                if (event.type === "session-changed") {
                    _this.updateMenu();
                }
            });
        };
        BsLabelsMenuComponent.prototype.ngOnDestroy = function () {
            if (this._loginServiceSubscription) {
                this._loginServiceSubscription.unsubscribe();
            }
        };
        BsLabelsMenuComponent.prototype.ngOnChanges = function (changes) {
            if (changes.results) {
                this.updateMenu();
            }
        };
        BsLabelsMenuComponent.prototype.updateMenu = function () {
            if (!this.loginService.complete) {
                this.menu = undefined;
                return;
            }
            if (!this.labelsService.publicLabelsField &&
                !this.labelsService.privateLabelsField) {
                this.menu = undefined;
                return;
            }
            var labelsActions = [this.renameAction, this.deleteAction];
            /** Allow Bulk actions only if there are some results */
            if (!!this.results && !!this.results.records) {
                labelsActions.push(this.bulkAddAction);
                labelsActions.push(this.bulkDeleteAction);
            }
            this.menu = new i4.Action({
                icon: this.icon,
                text: "msg#labels.labels",
                children: labelsActions,
            });
        };
        return BsLabelsMenuComponent;
    }());
    BsLabelsMenuComponent.ɵfac = function BsLabelsMenuComponent_Factory(t) { return new (t || BsLabelsMenuComponent)(i0.ɵɵdirectiveInject(i1$3.LoginService), i0.ɵɵdirectiveInject(LabelsService)); };
    BsLabelsMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsLabelsMenuComponent, selectors: [["sq-labels-menu"]], inputs: { results: "results", icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsLabelsMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsLabelsMenuComponent_li_0_Template, 1, 7, "li", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
            }
        }, directives: [i5$1.NgIf, i4.BsActionItem], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsLabelsMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: "sq-labels-menu",
                        templateUrl: "./labels-menu.component.html",
                    }]
            }], function () { return [{ type: i1$3.LoginService }, { type: LabelsService }]; }, { results: [{
                    type: i0.Input
                }], icon: [{
                    type: i0.Input
                }], autoAdjust: [{
                    type: i0.Input
                }], autoAdjustBreakpoint: [{
                    type: i0.Input
                }], collapseBreakpoint: [{
                    type: i0.Input
                }], size: [{
                    type: i0.Input
                }] });
    })();

    var _c0$4 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
    function BsDeleteLabel_div_7_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 7);
            i0.ɵɵelementStart(1, "input", 8);
            i0.ɵɵlistener("click", function BsDeleteLabel_div_7_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r3_1); var item_r1 = ctx.$implicit; var ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.updateLabelsNature(item_r1.value); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "label", 9);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r1 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("id", item_r1.id);
            i0.ɵɵpropertyInterpolate("value", item_r1.value);
            i0.ɵɵproperty("checked", item_r1.checked)("disabled", item_r1.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0$4, item_r1.disabled, !item_r1.disabled));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("for", item_r1.id);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r1.name));
        }
    }
    var _c1 = function (a0, a1) { return { "alert-danger": a0, "alert-warning": a1 }; };
    var BsDeleteLabel = /** @class */ (function () {
        function BsDeleteLabel(model, labelsService, changeDetectorRef, modalRef) {
            this.model = model;
            this.labelsService = labelsService;
            this.changeDetectorRef = changeDetectorRef;
            this.modalRef = modalRef;
            this.isProcessing = false;
        }
        BsDeleteLabel.prototype.ngOnInit = function () {
            var _this = this;
            switch (this.model.properties.action) {
                case 3 /* delete */:
                    this.title = "msg#deleteLabel.title";
                    this.btnText = "msg#deleteLabel.btnDelete";
                    this.alert = "msg#deleteLabel.alertText";
                    this._action = function () {
                        var observable = _this.labelsService.deleteLabels(_this.model.values, _this.model.properties.public);
                        if (observable) {
                            _this.isProcessing = true;
                            _this.changeDetectorRef.markForCheck();
                            base.Utils.subscribe(observable, function () { }, function (error) {
                                _this.modalRef.close(error);
                            }, function () {
                                _this.isProcessing = false;
                                _this.modalRef.close(-1 /* OK */);
                            });
                        }
                    };
                    break;
                case 5 /* bulkRemove */:
                    this.title = "msg#bulkRemoveLabel.title";
                    this.btnText = "msg#bulkRemoveLabel.btnBulkRemove";
                    this.alert = "msg#bulkRemoveLabel.alertText";
                    this._action = function () {
                        var observable = _this.labelsService.bulkRemoveLabels(_this.model.values, _this.model.properties.public);
                        if (observable) {
                            _this.isProcessing = true;
                            _this.changeDetectorRef.markForCheck();
                            base.Utils.subscribe(observable, function () { }, function (error) {
                                _this.modalRef.close(error);
                            }, function () {
                                _this.isProcessing = false;
                                _this.modalRef.close(-1 /* OK */);
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
                new i2$1.ModalButton({
                    text: this.btnText,
                    primary: true,
                    result: 0 /* Custom */,
                    anchor: true,
                    action: this._action,
                }),
                new i2$1.ModalButton({
                    result: -2 /* Cancel */,
                }),
            ];
        };
        BsDeleteLabel.prototype.updateLabelsNature = function (nature) {
            this.model.properties.public = nature;
        };
        BsDeleteLabel.prototype.onLabelsChanged = function (values) {
            this.model.values = values;
        };
        return BsDeleteLabel;
    }());
    BsDeleteLabel.ɵfac = function BsDeleteLabel_Factory(t) { return new (t || BsDeleteLabel)(i0.ɵɵdirectiveInject(i2$1.MODAL_MODEL), i0.ɵɵdirectiveInject(LabelsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2$1.ModalRef)); };
    BsDeleteLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsDeleteLabel, selectors: [["sq-delete-label"]], decls: 13, vars: 18, consts: [["name", "deleteLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", 3, "ngClass"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsDeleteLabel_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(6, "section");
                i0.ɵɵtemplate(7, BsDeleteLabel_div_7_Template, 5, 12, "div", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(8, "b");
                i0.ɵɵelementStart(9, "label", 5);
                i0.ɵɵtext(10);
                i0.ɵɵpipe(11, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(12, "sq-labels-autocomplete", 6);
                i0.ɵɵlistener("labelsUpdate", function BsDeleteLabel_Template_sq_labels_autocomplete_labelsUpdate_12_listener($event) { return ctx.onLabelsChanged($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", ctx.title)("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(15, _c1, ctx.model.properties.action === 3, ctx.model.properties.action === 5));
                i0.ɵɵadvance(1);
                i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 11, ctx.alert), " ");
                i0.ɵɵadvance(3);
                i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 13, "msg#labels.labels"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
            }
        }, directives: [i1$2.ɵangular_packages_forms_forms_y, i1$2.NgControlStatusGroup, i1$2.NgForm, i4$1.BsModal, i5$1.NgClass, i5$1.NgForOf, BsLabelsAutocompleteComponent], pipes: [i5.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsDeleteLabel, [{
                type: i0.Component,
                args: [{
                        selector: "sq-delete-label",
                        templateUrl: "./delete-label.html",
                        styles: [
                            "\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n        ",
                        ],
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i2$1.MODAL_MODEL]
                        }] }, { type: LabelsService }, { type: i0.ChangeDetectorRef }, { type: i2$1.ModalRef }];
        }, null);
    })();

    function BsAddLabel_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#bulkAddLabel.infoText"), " ");
        }
    }
    var _c0$5 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
    function BsAddLabel_div_8_Template(rf, ctx) {
        if (rf & 1) {
            var _r4_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 9);
            i0.ɵɵelementStart(1, "input", 10);
            i0.ɵɵlistener("click", function BsAddLabel_div_8_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r4_1); var item_r2 = ctx.$implicit; var ctx_r3 = i0.ɵɵnextContext(); return ctx_r3.updateLabelsNature(item_r2.value); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "label", 11);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r2 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("id", item_r2.id);
            i0.ɵɵpropertyInterpolate("value", item_r2.value);
            i0.ɵɵproperty("checked", item_r2.checked)("disabled", item_r2.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0$5, item_r2.disabled, !item_r2.disabled));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("for", item_r2.id);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r2.name));
        }
    }
    var BsAddLabel = /** @class */ (function () {
        function BsAddLabel(model, labelsService, changeDetectorRef, modalRef) {
            this.model = model;
            this.labelsService = labelsService;
            this.changeDetectorRef = changeDetectorRef;
            this.modalRef = modalRef;
            this.isProcessing = false;
        }
        BsAddLabel.prototype.ngOnInit = function () {
            var _this = this;
            this.buttons = [
                new i2$1.ModalButton({
                    text: "msg#bulkAddLabel.btnBulkAdd",
                    primary: true,
                    result: 0 /* Custom */,
                    anchor: true,
                    action: function () {
                        var observable = _this.labelsService.bulkAddLabels(_this.model.values, _this.model.properties.public);
                        if (observable) {
                            _this.isProcessing = true;
                            _this.changeDetectorRef.markForCheck();
                            base.Utils.subscribe(observable, function () { }, function (error) {
                                _this.modalRef.close(error);
                            }, function () {
                                _this.isProcessing = false;
                                _this.modalRef.close(-1 /* OK */);
                            });
                        }
                    },
                }),
                new i2$1.ModalButton({
                    result: -2 /* Cancel */,
                }),
            ];
        };
        BsAddLabel.prototype.updateLabelsNature = function (nature) {
            this.model.properties.public = nature;
        };
        BsAddLabel.prototype.onLabelsChanged = function (values) {
            this.model.values = values;
        };
        return BsAddLabel;
    }());
    BsAddLabel.ɵfac = function BsAddLabel_Factory(t) { return new (t || BsAddLabel)(i0.ɵɵdirectiveInject(i2$1.MODAL_MODEL), i0.ɵɵdirectiveInject(LabelsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2$1.ModalRef)); };
    BsAddLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsAddLabel, selectors: [["sq-add-label"]], decls: 14, vars: 15, consts: [["name", "addLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-warning"], ["class", "alert alert-info", "role", "alert", 4, "ngIf"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"], ["role", "alert", 1, "alert", "alert-info"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"]], template: function BsAddLabel_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(6, BsAddLabel_div_6_Template, 3, 3, "div", 4);
                i0.ɵɵelementStart(7, "section");
                i0.ɵɵtemplate(8, BsAddLabel_div_8_Template, 5, 12, "div", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(9, "b");
                i0.ɵɵelementStart(10, "label", 6);
                i0.ɵɵtext(11);
                i0.ɵɵpipe(12, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(13, "sq-labels-autocomplete", 7);
                i0.ɵɵlistener("labelsUpdate", function BsAddLabel_Template_sq_labels_autocomplete_labelsUpdate_13_listener($event) { return ctx.onLabelsChanged($event); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#bulkAddLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 11, "msg#bulkAddLabel.alertText"), " ");
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.model.properties.allowManagePublicLabels || !ctx.model.properties.public);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(12, 13, "msg#labels.labels"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("public", ctx.model.properties.public)("disableAutocomplete", ctx.model.properties.disableAutocomplete)("allowNewLabels", ctx.model.properties.allowNewLabels)("allowManagePublicLabels", ctx.model.properties.allowManagePublicLabels);
            }
        }, directives: [i1$2.ɵangular_packages_forms_forms_y, i1$2.NgControlStatusGroup, i1$2.NgForm, i4$1.BsModal, i5$1.NgIf, i5$1.NgForOf, BsLabelsAutocompleteComponent, i5$1.NgClass], pipes: [i5.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsAddLabel, [{
                type: i0.Component,
                args: [{
                        selector: "sq-add-label",
                        templateUrl: "./add-label.html",
                        styles: [
                            "\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n        ",
                        ],
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i2$1.MODAL_MODEL]
                        }] }, { type: LabelsService }, { type: i0.ChangeDetectorRef }, { type: i2$1.ModalRef }];
        }, null);
    })();

    function BsEditLabel_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 7);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, "msg#editLabel.infoText"), " ");
        }
    }
    var _c0$6 = function (a0, a1) { return { "disabled": a0, "clickable": a1 }; };
    function BsEditLabel_div_8_Template(rf, ctx) {
        if (rf & 1) {
            var _r6_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 8);
            i0.ɵɵelementStart(1, "input", 9);
            i0.ɵɵlistener("click", function BsEditLabel_div_8_Template_input_click_1_listener() { i0.ɵɵrestoreView(_r6_1); var item_r4 = ctx.$implicit; var ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.updateLabelsNature(item_r4.value); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(2, "label", 10);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var item_r4 = ctx.$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("id", item_r4.id);
            i0.ɵɵpropertyInterpolate("value", item_r4.value);
            i0.ɵɵproperty("checked", item_r4.checked)("disabled", item_r4.disabled)("ngClass", i0.ɵɵpureFunction2(9, _c0$6, item_r4.disabled, !item_r4.disabled));
            i0.ɵɵadvance(1);
            i0.ɵɵpropertyInterpolate("for", item_r4.id);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 7, item_r4.name));
        }
    }
    function BsEditLabel_section_9_Template(rf, ctx) {
        if (rf & 1) {
            var _r8_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section");
            i0.ɵɵelementStart(1, "b");
            i0.ɵɵelementStart(2, "label", 11);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "sq-labels-autocomplete", 12);
            i0.ɵɵlistener("labelsUpdate", function BsEditLabel_section_9_Template_sq_labels_autocomplete_labelsUpdate_5_listener($event) { i0.ɵɵrestoreView(_r8_1); var ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.onLabelsChanged($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0.ɵɵnextContext();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 6, "msg#labels.labels"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("public", ctx_r2.model.properties.public)("disableAutocomplete", ctx_r2.model.properties.disableAutocomplete)("allowNewLabels", ctx_r2.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r2.model.properties.allowManagePublicLabels)("initLabels", ctx_r2.initialLabels);
        }
    }
    function BsEditLabel_section_10_Template(rf, ctx) {
        if (rf & 1) {
            var _r10_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section");
            i0.ɵɵelementStart(1, "b");
            i0.ɵɵelementStart(2, "label", 11);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "sq-labels-autocomplete", 13);
            i0.ɵɵlistener("labelsUpdate", function BsEditLabel_section_10_Template_sq_labels_autocomplete_labelsUpdate_5_listener($event) { i0.ɵɵrestoreView(_r10_1); var ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.onLabelsToBeAddedChanged($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "b");
            i0.ɵɵelementStart(7, "label", 11);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "sqMessage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "sq-labels-autocomplete", 13);
            i0.ɵɵlistener("labelsUpdate", function BsEditLabel_section_10_Template_sq_labels_autocomplete_labelsUpdate_10_listener($event) { i0.ɵɵrestoreView(_r10_1); var ctx_r11 = i0.ɵɵnextContext(); return ctx_r11.onLabelsToBeRemovedChanged($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0.ɵɵnextContext();
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 10, "msg#editLabel.labelsToBeAdded"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("public", ctx_r3.model.properties.public)("disableAutocomplete", ctx_r3.model.properties.disableAutocomplete)("allowNewLabels", ctx_r3.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r3.model.properties.allowManagePublicLabels);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 12, "msg#editLabel.labelsToBeRemoved"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("public", ctx_r3.model.properties.public)("disableAutocomplete", ctx_r3.model.properties.disableAutocomplete)("allowNewLabels", ctx_r3.model.properties.allowNewLabels)("allowManagePublicLabels", ctx_r3.model.properties.allowManagePublicLabels);
        }
    }
    var BsEditLabel = /** @class */ (function () {
        function BsEditLabel(model, appService, selectionService, labelsService, searchService, notificationService, changeDetectorRef, modalRef) {
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
        BsEditLabel.prototype.ngOnInit = function () {
            var _this = this;
            this.selectedRecordsIds = !!this.selectionService.getSelectedIds()
                ? this.selectionService.getSelectedIds()
                : [];
            if (this.selectedRecordsIds.length === 1) {
                this.record = this.searchService.getRecordFromId(this.selectedRecordsIds[0]);
                this.initialLabels = this._getInitialRecordLabels();
            }
            this.buttons = [
                new i2$1.ModalButton({
                    text: "msg#editLabel.btnEdit",
                    primary: true,
                    result: 0 /* Custom */,
                    anchor: true,
                    action: function () {
                        var observable = _this.labelsService.addLabels(_this.model.valuesToBeAdded, _this.selectionService.getSelectedIds(), _this.model.properties.public);
                        if (observable) {
                            _this.isProcessing = true;
                            _this.changeDetectorRef.markForCheck();
                            base.Utils.subscribe(observable, function () { }, function (error) {
                                _this.notificationService.error("msg#editLabel.errorFeedback");
                                _this.modalRef.close(error);
                            }, function () {
                                _this.labelsService
                                    .removeLabels(_this.model.valuesToBeRemoved, _this.selectionService.getSelectedIds(), _this.model.properties.public)
                                    .subscribe(function () { }, function (error) {
                                    _this.notificationService.error("msg#editLabel.errorFeedback");
                                    _this.modalRef.close(error);
                                }, function () {
                                    _this.isProcessing = false;
                                    _this.modalRef.close(-1 /* OK */);
                                    _this.notificationService.success("msg#editLabel.successFeedback");
                                    _this.searchService.search(); /** Update the display immediately in the components and facets*/
                                });
                            });
                        }
                    },
                }),
                new i2$1.ModalButton({
                    result: -2 /* Cancel */,
                }),
            ];
        };
        BsEditLabel.prototype.updateLabelsNature = function (nature) {
            this.model.properties.public = nature;
            this.model.valuesToBeRemoved = [];
            this.model.valuesToBeAdded = [];
            if (this.selectedRecordsIds.length === 1) {
                this.initialLabels = this._getInitialRecordLabels(); /** update initial labels */
            }
        };
        BsEditLabel.prototype.onLabelsChanged = function (values) {
            var _this = this;
            if (!!this.initialLabels) {
                this.model.valuesToBeAdded = values.filter(function (value) { return !_this.initialLabels.find(function (label) { return label === value; }); });
                this.model.valuesToBeRemoved = this.initialLabels.filter(function (label) { return !values.find(function (value) { return value === label; }); });
            }
            else {
                this.model.valuesToBeAdded = values;
                this.model.valuesToBeRemoved = [];
            }
        };
        BsEditLabel.prototype.onLabelsToBeAddedChanged = function (values) {
            this.model.valuesToBeAdded = values;
        };
        BsEditLabel.prototype.onLabelsToBeRemovedChanged = function (values) {
            this.model.valuesToBeRemoved = values;
        };
        /**
         * Return the list of labels already assigned to the selected record
         */
        BsEditLabel.prototype._getInitialRecordLabels = function () {
            if (!!this.record) {
                var field = this.model.properties.public
                    ? this.labelsService.publicLabelsField
                    : this.labelsService.privateLabelsField;
                var labelsField = this.appService.resolveColumnAlias(field);
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
        };
        return BsEditLabel;
    }());
    BsEditLabel.ɵfac = function BsEditLabel_Factory(t) { return new (t || BsEditLabel)(i0.ɵɵdirectiveInject(i2$1.MODAL_MODEL), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i7.SelectionService), i0.ɵɵdirectiveInject(LabelsService), i0.ɵɵdirectiveInject(i3.SearchService), i0.ɵɵdirectiveInject(i6.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2$1.ModalRef)); };
    BsEditLabel.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditLabel, selectors: [["sq-edit-label"]], decls: 11, vars: 10, consts: [["name", "editLabel", "novalidate", ""], [3, "title", "buttons", "isProcessingState"], [1, "form-group", "sq-form-group"], ["role", "alert", 1, "alert", "alert-warning"], ["class", "alert alert-info", "role", "alert", 4, "ngIf"], ["class", "custom-control custom-radio custom-control-inline", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["role", "alert", 1, "alert", "alert-info"], [1, "custom-control", "custom-radio", "custom-control-inline"], ["type", "radio", "name", "nature", 1, "custom-control-input", 3, "id", "value", "checked", "disabled", "ngClass", "click"], [1, "custom-control-label", 3, "for"], ["for", "label"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "initLabels", "labelsUpdate"], [3, "public", "disableAutocomplete", "allowNewLabels", "allowManagePublicLabels", "labelsUpdate"]], template: function BsEditLabel_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelementStart(3, "div", 3);
                i0.ɵɵtext(4);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(6, BsEditLabel_div_6_Template, 3, 3, "div", 4);
                i0.ɵɵelementStart(7, "section");
                i0.ɵɵtemplate(8, BsEditLabel_div_8_Template, 5, 12, "div", 5);
                i0.ɵɵelementEnd();
                i0.ɵɵtemplate(9, BsEditLabel_section_9_Template, 6, 8, "section", 6);
                i0.ɵɵtemplate(10, BsEditLabel_section_10_Template, 11, 14, "section", 6);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#editLabel.title")("buttons", ctx.buttons)("isProcessingState", ctx.isProcessing);
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 8, "msg#editLabel.alertText"), " ");
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.model.properties.allowManagePublicLabels || !ctx.model.properties.public);
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngForOf", ctx.model.properties.radioButtons);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", ctx.record);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngIf", !ctx.record);
            }
        }, directives: [i1$2.ɵangular_packages_forms_forms_y, i1$2.NgControlStatusGroup, i1$2.NgForm, i4$1.BsModal, i5$1.NgIf, i5$1.NgForOf, i5$1.NgClass, BsLabelsAutocompleteComponent], pipes: [i5.MessagePipe], styles: [".clickable[_ngcontent-%COMP%] {\n                cursor: pointer;\n            }\n            .clickable[_ngcontent-%COMP%]:hover {\n                opacity: 85%;\n            }"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsEditLabel, [{
                type: i0.Component,
                args: [{
                        selector: "sq-edit-label",
                        templateUrl: "./edit-label.html",
                        styles: [
                            "\n            .clickable {\n                cursor: pointer;\n            }\n            .clickable:hover {\n                opacity: 85%;\n            }\n        ",
                        ],
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i2$1.MODAL_MODEL]
                        }] }, { type: i2.AppService }, { type: i7.SelectionService }, { type: LabelsService }, { type: i3.SearchService }, { type: i6.NotificationsService }, { type: i0.ChangeDetectorRef }, { type: i2$1.ModalRef }];
        }, null);
    })();

    var defaultLabelComponents = {
        labelsAutocompleteComponent: BsLabelsAutocompleteComponent,
        renameModal: BsRenameLabel,
        deleteModal: BsDeleteLabel,
        addModal: BsAddLabel,
        editModal: BsEditLabel
    };
    var BsLabelsModule = /** @class */ (function () {
        function BsLabelsModule() {
        }
        return BsLabelsModule;
    }());
    BsLabelsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsLabelsModule });
    BsLabelsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsLabelsModule_Factory(t) { return new (t || BsLabelsModule)(); }, providers: [
            { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
        ], imports: [[
                i1$2.FormsModule, i1$2.ReactiveFormsModule,
                i5$1.CommonModule,
                i5.IntlModule,
                i7$1.ValidationModule,
                i3$1.UtilsModule,
                i7.BsSelectionModule,
                i4$1.BsModalModule,
                i1$1.BsAutocompleteModule,
                i4.BsActionModule,
                LabelsModule
            ], LabelsModule] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsLabelsModule, { declarations: [BsLabelsAutocompleteComponent,
                BsRenameLabel,
                BsLabelsMenuComponent,
                BsDeleteLabel,
                BsAddLabel,
                BsEditLabel], imports: [i1$2.FormsModule, i1$2.ReactiveFormsModule,
                i5$1.CommonModule,
                i5.IntlModule,
                i7$1.ValidationModule,
                i3$1.UtilsModule,
                i7.BsSelectionModule,
                i4$1.BsModalModule,
                i1$1.BsAutocompleteModule,
                i4.BsActionModule,
                LabelsModule], exports: [LabelsModule,
                BsLabelsAutocompleteComponent,
                BsRenameLabel,
                BsLabelsMenuComponent,
                BsDeleteLabel,
                BsAddLabel,
                BsEditLabel] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsLabelsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1$2.FormsModule, i1$2.ReactiveFormsModule,
                            i5$1.CommonModule,
                            i5.IntlModule,
                            i7$1.ValidationModule,
                            i3$1.UtilsModule,
                            i7.BsSelectionModule,
                            i4$1.BsModalModule,
                            i1$1.BsAutocompleteModule,
                            i4.BsActionModule,
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
            }], null, null);
    })();

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

    var enLabels = base.Utils.merge({}, _enLabels, i3.enSearch, i4$1.enModal);
    var frLabels = base.Utils.merge({}, _frLabels, i3.frSearch, i4$1.frModal);
    var deLabels = base.Utils.merge({}, _deLabels, i3.deSearch, i4$1.deModal);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsAddLabel = BsAddLabel;
    exports.BsDeleteLabel = BsDeleteLabel;
    exports.BsEditLabel = BsEditLabel;
    exports.BsLabelsAutocompleteComponent = BsLabelsAutocompleteComponent;
    exports.BsLabelsMenuComponent = BsLabelsMenuComponent;
    exports.BsLabelsModule = BsLabelsModule;
    exports.BsRenameLabel = BsRenameLabel;
    exports.LABELS_COMPONENTS = LABELS_COMPONENTS;
    exports.LabelPipe = LabelPipe;
    exports.Labels = Labels;
    exports.LabelsAutocomplete = LabelsAutocomplete;
    exports.LabelsModule = LabelsModule;
    exports.LabelsService = LabelsService;
    exports.ResultLabels = ResultLabels;
    exports.deLabels = deLabels;
    exports.defaultLabelComponents = defaultLabelComponents;
    exports.enLabels = enLabels;
    exports.frLabels = frLabels;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-labels.umd.js.map
