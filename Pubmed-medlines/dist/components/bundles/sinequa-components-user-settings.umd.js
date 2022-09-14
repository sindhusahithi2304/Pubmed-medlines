(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/modal'), require('@sinequa/core/base'), require('@sinequa/core/web-services'), require('@sinequa/core/intl'), require('@angular/forms'), require('@sinequa/core/app-utils'), require('@sinequa/components/utils'), require('@sinequa/core/validation'), require('@angular/common'), require('@sinequa/components/modal'), require('@sinequa/components/action'), require('@sinequa/core/login'), require('@sinequa/core/notification')) :
    typeof define === 'function' && define.amd ? define('@sinequa/components/user-settings', ['exports', '@angular/core', '@sinequa/core/modal', '@sinequa/core/base', '@sinequa/core/web-services', '@sinequa/core/intl', '@angular/forms', '@sinequa/core/app-utils', '@sinequa/components/utils', '@sinequa/core/validation', '@angular/common', '@sinequa/components/modal', '@sinequa/components/action', '@sinequa/core/login', '@sinequa/core/notification'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.components = global.sinequa.components || {}, global.sinequa.components['user-settings'] = {}), global.ng.core, global.sinequa.core.modal, global.sinequa.core.base, global.sinequa.core['web-services'], global.sinequa.core.intl, global.ng.forms, global.sinequa.core['app-utils'], global.sinequa.components.utils, global.sinequa.core.validation, global.ng.common, global.sinequa.components.modal, global.sinequa.components.action, global.sinequa.core.login, global.sinequa.core.notification));
}(this, (function (exports, i0, i4, base, i1, i2, i3, i1$1, i4$1, i5, i6, i2$1, i8, i2$2, i6$1) { 'use strict';

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

    (function (JsonInfo) {
        var InputType;
        (function (InputType) {
            InputType["Entry"] = "JsonEntryInput";
            InputType["Range"] = "JsonRangeInput";
            InputType["MultiEntry"] = "JsonMultiEntryInput";
        })(InputType = JsonInfo.InputType || (JsonInfo.InputType = {}));
        var ValueType;
        (function (ValueType) {
            ValueType["String"] = "String";
            ValueType["Int"] = "Int";
            ValueType["Number"] = "Number";
            ValueType["Date"] = "Date";
            ValueType["Bool"] = "Bool";
        })(ValueType = JsonInfo.ValueType || (JsonInfo.ValueType = {}));
    })(exports.JsonInfo || (exports.JsonInfo = {}));
    /**
     * Opens a dialog to modify the user settings.
     *
     */
    var BsEditUserSettings = /** @class */ (function () {
        function BsEditUserSettings(userSettingsService, intlService, formBuilder) {
            this.userSettingsService = userSettingsService;
            this.intlService = intlService;
            this.formBuilder = formBuilder;
            this.visibleThreshold = 0;
        }
        BsEditUserSettings.prototype.ngOnInit = function () {
            var _this = this;
            this.layout = {};
            this.model = {
                'language': this.intlService.currentLocale.name
            };
            this.form = this.formBuilder.group({
                'selectedLocale': [this.intlService.currentLocale.name]
            });
            var onOkClicked = function (_) {
                if (_this.form.dirty) {
                    // Locale is treated separately because it is not really stored in the user settings.
                    var newLocale = _this.form.value['selectedLocale'];
                    _this.form.removeControl('selectedLocale');
                    if (!base.Utils.eqNC(_this.model['language'], newLocale)) {
                        base.Utils.subscribe(_this.intlService.use(newLocale), function (response) { return console.log('editUserSettings UI language changed.'); });
                    }
                    var patch_1 = _this.calculatePatch();
                    if (!base.Utils.isUndefined(patch_1) && !base.Utils.isEmpty(patch_1)) {
                        var observable = _this.userSettingsService.patch(patch_1);
                        base.Utils.subscribe(observable, function (response) {
                            if (_this.userSettingsService.userSettings) {
                                _this.setNewValue(_this.userSettingsService.userSettings, patch_1);
                            }
                            console.log('editUserSettings saved.');
                        }, function (error) { return console.log('editUserSettings save failed: ', error); });
                    }
                }
            };
            this.buttons = [
                new i4.ModalButton({
                    result: -1 /* OK */,
                    primary: true,
                    validation: this.form,
                    action: onOkClicked
                }),
                new i4.ModalButton({
                    result: -2 /* Cancel */
                })
            ];
        };
        BsEditUserSettings.prototype.setNewValue = function (obj, newObj) {
            var e_1, _a;
            try {
                for (var _b = __values(Object.keys(newObj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    var value = newObj[key];
                    if (value === null) {
                        /* NOTE: Don't use delete obj[key] because some component may put an observer on the user settings property */
                        obj[key] = undefined;
                    }
                    else if (base.Utils.isObject(value)) {
                        if (base.Utils.isDate(value)) {
                            obj[key] = new Date(value.valueOf());
                        }
                        else if (base.Utils.isRegExp(value)) {
                            obj[key] = new RegExp(value);
                        }
                        else if (base.Utils.isArray(value)) {
                            obj[key] = value.slice(0); // clone the array
                        }
                        else {
                            if (!base.Utils.isObject(obj[key])) {
                                obj[key] = base.Utils.isArray(value) ? [] : {};
                            }
                            this.setNewValue(obj[key], value);
                        }
                    }
                    else {
                        obj[key] = value;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * Calculates the update patch for user settings.
         *
         * @returns the update patch.
         */
        BsEditUserSettings.prototype.calculatePatch = function () {
            var _this = this;
            var patch = {};
            Object.keys(this.form.value).forEach(function (key) {
                var formValue = _this.ensureType(_this.layout[key], _this.readFormValue(key));
                var paths = base.Utils.split(_this.layout[key].path, '.');
                var currentValue = _this.userSettingsService.readUserSetting(paths);
                var includedInPatch = false;
                if (!base.Utils.isUndefined(currentValue)) {
                    if (formValue !== currentValue) {
                        includedInPatch = true;
                    }
                }
                else {
                    if (!base.Utils.isUndefined(formValue)) {
                        includedInPatch = true;
                    }
                }
                if (includedInPatch) {
                    _this.setValue(patch, paths, formValue);
                }
            });
            return patch;
        };
        /**
         * Ensures that the form value is of the same type as the user setting before saving it.
         *
         * @param entryInfo The entry information.
         * @param value The form value.
         * @returns The conformed value for the user setting.
         */
        BsEditUserSettings.prototype.ensureType = function (entryInfo, value) {
            var inputType = entryInfo.type;
            var valueType = entryInfo.valueType;
            switch (valueType) {
                case exports.JsonInfo.ValueType.Bool:
                    // For the case of boolean, we ignore the input type because we only support having a JSON boolean
                    return !!value;
                case exports.JsonInfo.ValueType.Date:
                    return this.cast(inputType, value, base.Utils.asDate);
                case exports.JsonInfo.ValueType.Int:
                case exports.JsonInfo.ValueType.Number:
                    return this.cast(inputType, value, base.Utils.asNumber);
                case exports.JsonInfo.ValueType.String:
                default:
                    return this.cast(inputType, value, base.Utils.asString);
            }
        };
        /**
         * Casts the value of a given type to another type.
         * <p>
         * If the given value is of array type, it is casted into another array containing element of the
         * desired type.
         *
         * @template T The desired type after casting.
         * @param inputType The type of form input where the value comes.
         * @param value The value to cast.
         * @param castFn The casting function.
         * @returns the cast result.
         */
        BsEditUserSettings.prototype.cast = function (inputType, value, castFn) {
            var e_2, _a;
            if (base.Utils.isArray(value)) {
                var array = value;
                var empty = array.length === 0;
                switch (inputType) {
                    case exports.JsonInfo.InputType.Entry:
                        return !empty ? castFn(array[0]) : undefined;
                    case exports.JsonInfo.InputType.MultiEntry:
                    case exports.JsonInfo.InputType.Range:
                        var result = [];
                        try {
                            for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
                                var v = array_1_1.value;
                                result.push(castFn(v));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return result;
                }
                return undefined;
            }
            return castFn(value);
        };
        /**
         * Reads the form value for the given entry.
         *
         * @param key The entry key.
         * @returns The form value.
         */
        BsEditUserSettings.prototype.readFormValue = function (key) {
            var formValue = this.form.value[key];
            if (base.Utils.isArray(formValue)) {
                switch (this.layout[key].type) {
                    case exports.JsonInfo.InputType.Entry:
                        // The entry is single-value type whereas its corresponding form control has an array value.
                        // This should be because its form control is represented by a Select component.
                        // The array value should be then a singleton array, we simply return the first element.
                        var array = formValue;
                        if (array.length !== 1) {
                            console.log('editUserSettings.readFormValue not a singleton array.');
                        }
                        return array[0];
                    case exports.JsonInfo.InputType.MultiEntry:
                        break;
                    case exports.JsonInfo.InputType.Range:
                        break;
                }
            }
            return formValue;
        };
        /**
         * Sets a JSON value.
         *
         * @param json The JSON to set.
         * @param paths The path of the value in the JSON.
         * @param value The value to set.
         */
        BsEditUserSettings.prototype.setValue = function (json, paths, value) {
            var nbPaths = paths.length;
            if (nbPaths > 1) {
                for (var i = 0; i < nbPaths - 1; ++i) {
                    var path = paths[i];
                    if (!json[path]) {
                        json[path] = {};
                    }
                    json = json[path];
                }
            }
            json[paths[nbPaths - 1]] = base.Utils.isEmpty(value) ? null : value;
        };
        Object.defineProperty(BsEditUserSettings.prototype, "maxHeight", {
            /**
             * Indicates the height of the dialog content to trigger scroll behavior when there are too many input controls.
             *
             * @return the height of the dialog content to trigger scroll behavior when there are too many input controls.
             */
            get: function () {
                //If size is undefined use 5 as default
                return (((this.visibleThreshold | 0) || 5) * 10) + "ex";
            },
            enumerable: false,
            configurable: true
        });
        return BsEditUserSettings;
    }());
    BsEditUserSettings.ɵfac = function BsEditUserSettings_Factory(t) { return new (t || BsEditUserSettings)(i0.ɵɵdirectiveInject(i1.UserSettingsWebService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵdirectiveInject(i3.FormBuilder)); };
    BsEditUserSettings.ɵcmp = i0.ɵɵdefineComponent({ type: BsEditUserSettings, selectors: [["sq-edit-user-settings"]], inputs: { visibleThreshold: "visibleThreshold", showUILanguageSelector: "showUILanguageSelector" }, decls: 4, vars: 8, consts: [["name", "editUserSettings", "novalidate", "", 3, "formGroup"], [3, "title", "buttons"], [1, "sq-user-settings-modal-body"], [3, "form", "model", "layout"]], template: function BsEditUserSettings_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "sq-modal", 1);
                i0.ɵɵelementStart(2, "div", 2);
                i0.ɵɵelement(3, "sq-user-settings-editor", 3);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("title", "msg#editUserSettings.title")("buttons", ctx.buttons);
                i0.ɵɵadvance(1);
                i0.ɵɵstyleProp("max-height", ctx.maxHeight);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("form", ctx.form)("model", ctx.model)("layout", ctx.layout);
            }
        }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsEditUserSettings, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-edit-user-settings',
                        templateUrl: './edit-user-settings.html'
                    }]
            }], function () { return [{ type: i1.UserSettingsWebService }, { type: i2.IntlService }, { type: i3.FormBuilder }]; }, { visibleThreshold: [{
                    type: i0.Input
                }], showUILanguageSelector: [{
                    type: i0.Input
                }] });
    })();

    function BsUserSettingsEditor_option_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "option", 5);
            i0.ɵɵtext(1);
            i0.ɵɵpipe(2, "sqMessage");
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var locale_r1 = ctx.$implicit;
            i0.ɵɵproperty("value", locale_r1.name);
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 2, locale_r1.display));
        }
    }
    /**
     * Editor for User settings.
     * <p>
     * This component can add form control for modifiable settings which are not shown by JsonEditor component.
     *
     */
    var BsUserSettingsEditor = /** @class */ (function () {
        function BsUserSettingsEditor(appService, intlService, formBuilder) {
            this.appService = appService;
            this.intlService = intlService;
            this.formBuilder = formBuilder;
        }
        BsUserSettingsEditor.prototype.ngOnInit = function () {
            var e_1, _a;
            if (!this.appService.app) {
                return; // logout
            }
            // Locale is treated separately because it is not really stored in the user settings.
            this.locales = [];
            if (this.intlService.locales.length > 0) {
                try {
                    for (var _b = __values(this.intlService.locales), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var locale = _c.value;
                        this.locales.push(locale);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            this.model['language'] = this.intlService.currentLocale.name;
            this.form.addControl('selectedLocale', this.formBuilder.control(this.intlService.currentLocale.name));
            /*
                    if (this.config && this.config.items) {
                        this.config.items.forEach(item => {
                            if (item.active && JsonEditor.isInputComponent(item)) {
                                const entry = <JsonInfo.Entry>item;
                                const paths = Utils.split(entry.path, '.');
                                const pathLength = paths.length;
                                const currentValue = this.userSettingsService.readUserSetting(paths)
                                const entryKey = paths[pathLength - 1];
            
                                // Add model value
                                this.setModelValue(paths, currentValue);
            
                                // Add layout
                                this.layout[entryKey] = entry;
            
                                // Add form control
                                this.form.addControl(
                                    entryKey,
                                    this.formBuilder.control(currentValue, Validators.compose(JsonEditor.makeValidatorFunctions(entry, this.validationService))));
                            }
                        });
                    }
                    */
        };
        /**
         * Sets the current value of an entry to our JSON model.
         *
         * @param paths The paths to the entry in the JSON model.
         * @param value The value to set.
         */
        /*private setModelValue(paths: string[], value: any): void {
            const nbPaths = paths.length;
            let json = this.model;
            if (nbPaths > 1) {
                for (let i = 0; i < nbPaths - 1; ++i) {
                    const path = paths[i];
                    if (!json[path]) {
                        json[path] = {};
                    }
                    json = json[path];
                }
            }

            const key = paths[nbPaths - 1];
            json[key] = value;
        }*/
        /**
         * Indicates if the UI language selector is shown in the User settings editor dialog.
         * By default, returns true.
         *
         * @returns true if the UI language selector is shown in the User settings editor dialog.
         */
        BsUserSettingsEditor.prototype.showLanguageSelector = function () {
            return this.showUILanguageSelector;
        };
        return BsUserSettingsEditor;
    }());
    BsUserSettingsEditor.ɵfac = function BsUserSettingsEditor_Factory(t) { return new (t || BsUserSettingsEditor)(i0.ɵɵdirectiveInject(i1$1.AppService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵdirectiveInject(i3.FormBuilder)); };
    BsUserSettingsEditor.ɵcmp = i0.ɵɵdefineComponent({ type: BsUserSettingsEditor, selectors: [["sq-user-settings-editor"]], inputs: { form: "form", model: "model", layout: "layout", showUILanguageSelector: "showUILanguageSelector" }, decls: 7, vars: 7, consts: [[3, "formGroup"], [1, "form-group", 2, "margin-bottom", "0", 3, "hidden"], ["for", "locales"], ["formControlName", "selectedLocale", "id", "selectedLocale", "sqAutofocus", "", 1, "form-control", "custom-select", 3, "sqValidation"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"]], template: function BsUserSettingsEditor_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "div", 0);
                i0.ɵɵelementStart(1, "div", 1);
                i0.ɵɵelementStart(2, "label", 2);
                i0.ɵɵtext(3);
                i0.ɵɵpipe(4, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(5, "select", 3);
                i0.ɵɵtemplate(6, BsUserSettingsEditor_option_6_Template, 3, 4, "option", 4);
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("hidden", !ctx.showLanguageSelector());
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 5, "msg#editUserSettings.language"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("sqValidation", ctx.form);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("ngForOf", ctx.locales);
            }
        }, directives: [i3.NgControlStatusGroup, i3.FormGroupDirective, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.FormControlName, i4$1.Autofocus, i5.ValidationDirective, i6.NgForOf, i3.NgSelectOption, i3.ɵangular_packages_forms_forms_x], pipes: [i2.MessagePipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsUserSettingsEditor, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-user-settings-editor',
                        templateUrl: './user-settings-editor.html'
                    }]
            }], function () { return [{ type: i1$1.AppService }, { type: i2.IntlService }, { type: i3.FormBuilder }]; }, { form: [{
                    type: i0.Input
                }], model: [{
                    type: i0.Input
                }], layout: [{
                    type: i0.Input
                }], showUILanguageSelector: [{
                    type: i0.Input
                }] });
    })();

    var _c0 = function (a0, a1, a2, a3) { return { item: a0, size: a1, autoAdjust: a2, autoAdjustBreakpoint: a3, inMenu: true }; };
    function BsUserMenuComponent_li_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "li", 1);
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            i0.ɵɵproperty("sq-action-item", i0.ɵɵpureFunction4(2, _c0, ctx_r0.menu, ctx_r0.size, ctx_r0.autoAdjust, ctx_r0.autoAdjustBreakpoint))("collapseBreakpoint", ctx_r0.collapseBreakpoint);
        }
    }
    var BsUserMenuComponent = /** @class */ (function () {
        function BsUserMenuComponent(principalService, authenticationService, intlService, loginService, modalService, appService, userSettingsService, notificationsService, changeDetectorRef) {
            var _this = this;
            // Actions objects are initialized in the constructor
            this.principalService = principalService;
            this.authenticationService = authenticationService;
            this.intlService = intlService;
            this.loginService = loginService;
            this.modalService = modalService;
            this.appService = appService;
            this.userSettingsService = userSettingsService;
            this.notificationsService = notificationsService;
            this.changeDetectorRef = changeDetectorRef;
            this.icon = "fas fa-user";
            this.autoAdjust = true;
            this.autoAdjustBreakpoint = 'xl';
            this.collapseBreakpoint = 'sm';
            // User Menu
            // Login
            this.loginAction = new i8.Action({
                text: "msg#userMenu.login",
                title: "msg#userMenu.login",
                action: function () {
                    _this.loginService.login();
                }
            });
            // Logout
            this.logoutAction = new i8.Action({
                text: "msg#userMenu.logout",
                title: "msg#userMenu.logout",
                action: function () {
                    _this.loginService.logout();
                    _this.changeDetectorRef.markForCheck();
                }
            });
            // Override a user's identity
            this.overrideAction = new i8.Action({
                text: "msg#userMenu.overrideUser",
                title: "msg#userMenu.overrideUser",
                action: function () {
                    var userOverride = _this.authenticationService.userOverride ?
                        base.Utils.copy(_this.authenticationService.userOverride) : undefined;
                    if (!userOverride) {
                        userOverride = {
                            userName: "",
                            domain: ""
                        };
                    }
                    _this.modalService.open(i2$1.BsOverrideUser, { model: userOverride })
                        .then(function (result) {
                        if (result === -1 /* OK */) {
                            _this.loginService.overrideUser(userOverride);
                            _this.changeDetectorRef.markForCheck();
                        }
                    });
                }
            });
            // Cancel user override
            this.revertOverrideAction = new i8.Action({
                text: "msg#userMenu.revertUserOverride",
                title: "msg#userMenu.revertUserOverride",
                action: function () {
                    _this.loginService.overrideUser(undefined);
                    _this.changeDetectorRef.markForCheck();
                }
            });
            // Link to the admin
            this.adminAction = new i8.Action({
                text: "msg#userMenu.administration",
                title: "msg#userMenu.administration",
                href: this.appService.adminUrl
            });
            // Language menu
            this.languageAction = new i8.Action({
                text: "msg#userMenu.language",
                title: "msg#userMenu.language",
                children: this.intlService.locales.map(function (locale) { return new i8.Action({
                    text: locale.display,
                    title: locale.display,
                    data: locale,
                    selected: locale === _this.intlService.currentLocale,
                    iconAfter: "sq-image sq-flag-" + locale.name,
                    action: function (item, $event) {
                        _this.intlService.use(item.data.name).subscribe(function (value) { return _this.languageAction.children.forEach(function (a) { return a.update(); }); });
                    },
                    updater: function (action) {
                        action.selected = action.data === _this.intlService.currentLocale;
                    }
                }); })
            });
            this.resetUserSettings = new i8.Action({
                text: "msg#userMenu.resetUserSettings.menu",
                title: "msg#userMenu.resetUserSettings.menu",
                action: function () {
                    _this.modalService.confirm({
                        title: "msg#userMenu.resetUserSettings.modalTitle",
                        message: "msg#userMenu.resetUserSettings.modalMessage",
                        buttons: [
                            new i4.ModalButton({ result: -1 /* OK */, text: "msg#userMenu.resetUserSettings.modalConfirmButton" }),
                            new i4.ModalButton({ result: -2 /* Cancel */, primary: true })
                        ],
                        confirmType: 2 /* Warning */
                    }).then(function (res) {
                        if (res === -1 /* OK */) {
                            _this.userSettingsService.reset().subscribe({
                                next: function () { return _this.notificationsService.notify(0 /* Success */, "msg#userMenu.resetUserSettings.successMessage"); },
                                error: function () { return _this.notificationsService.notify(3 /* Error */, "msg#userMenu.resetUserSettings.errorMessage"); }
                            });
                        }
                    });
                }
            });
        }
        BsUserMenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.updateMenu();
            this._loginSubscription = this.loginService.events.subscribe(function (event) {
                if (event.type === "session-changed") {
                    _this.updateMenu();
                }
            });
            this._principalSubscription = this.principalService.events.subscribe(function (event) {
                _this.updateMenu();
            });
        };
        BsUserMenuComponent.prototype.ngOnDestroy = function () {
            if (this._loginSubscription) {
                this._loginSubscription.unsubscribe();
            }
            if (this._principalSubscription) {
                this._principalSubscription.unsubscribe();
            }
        };
        BsUserMenuComponent.prototype.updateMenu = function () {
            var userActions = [];
            if (!this.principalService.principal && !this.authenticationService.userOverrideActive) {
                userActions.push(this.loginAction);
            }
            if (this.principalService.principal) {
                userActions.push(this.logoutAction);
            }
            if (this.authenticationService.userOverrideActive) {
                userActions.push(this.revertOverrideAction);
            }
            if (this.principalService.principal && this.principalService.principal.isAdministrator) {
                userActions.push(this.overrideAction);
            }
            if (this.principalService.principal && (this.principalService.principal.isAdministrator || this.principalService.principal.isDelegatedAdmin)) {
                userActions.push(this.adminAction);
            }
            if (this.loginService.complete) {
                userActions.push(this.resetUserSettings);
            }
            userActions.push(new i8.Action({ separator: true }));
            if (this.intlService.locales.length > 1) {
                userActions.push(this.languageAction);
            }
            this.menu = new i8.Action({
                icon: this.icon,
                text: this.loginService.complete && this.principalService.principal ? this.principalService.principal.name || "msg#userMenu.user" : "msg#userMenu.user",
                children: userActions
            });
        };
        return BsUserMenuComponent;
    }());
    BsUserMenuComponent.ɵfac = function BsUserMenuComponent_Factory(t) { return new (t || BsUserMenuComponent)(i0.ɵɵdirectiveInject(i1.PrincipalWebService), i0.ɵɵdirectiveInject(i2$2.AuthenticationService), i0.ɵɵdirectiveInject(i2.IntlService), i0.ɵɵdirectiveInject(i2$2.LoginService), i0.ɵɵdirectiveInject(i4.ModalService), i0.ɵɵdirectiveInject(i1$1.AppService), i0.ɵɵdirectiveInject(i1.UserSettingsWebService), i0.ɵɵdirectiveInject(i6$1.NotificationsService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    BsUserMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsUserMenuComponent, selectors: [["sq-user-menu"]], inputs: { icon: "icon", autoAdjust: "autoAdjust", autoAdjustBreakpoint: "autoAdjustBreakpoint", collapseBreakpoint: "collapseBreakpoint", size: "size" }, decls: 1, vars: 1, consts: [["class", "nav-item dropdown", 3, "sq-action-item", "collapseBreakpoint", 4, "ngIf"], [1, "nav-item", "dropdown", 3, "sq-action-item", "collapseBreakpoint"]], template: function BsUserMenuComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, BsUserMenuComponent_li_0_Template, 1, 7, "li", 0);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", !!ctx.menu && !ctx.menu.hidden);
            }
        }, directives: [i6.NgIf, i8.BsActionItem], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsUserMenuComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'sq-user-menu',
                        templateUrl: './user-menu.component.html'
                    }]
            }], function () { return [{ type: i1.PrincipalWebService }, { type: i2$2.AuthenticationService }, { type: i2.IntlService }, { type: i2$2.LoginService }, { type: i4.ModalService }, { type: i1$1.AppService }, { type: i1.UserSettingsWebService }, { type: i6$1.NotificationsService }, { type: i0.ChangeDetectorRef }]; }, { icon: [{
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

    var BsUserSettingsModule = /** @class */ (function () {
        function BsUserSettingsModule() {
        }
        return BsUserSettingsModule;
    }());
    BsUserSettingsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsUserSettingsModule });
    BsUserSettingsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsUserSettingsModule_Factory(t) { return new (t || BsUserSettingsModule)(); }, imports: [[
                i6.CommonModule,
                i3.FormsModule, i3.ReactiveFormsModule,
                i2.IntlModule,
                i5.ValidationModule,
                i2$1.BsModalModule,
                i8.BsActionModule,
                i4$1.UtilsModule,
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsUserSettingsModule, { declarations: [BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent], imports: [i6.CommonModule,
                i3.FormsModule, i3.ReactiveFormsModule,
                i2.IntlModule,
                i5.ValidationModule,
                i2$1.BsModalModule,
                i8.BsActionModule,
                i4$1.UtilsModule], exports: [BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(BsUserSettingsModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i6.CommonModule,
                            i3.FormsModule, i3.ReactiveFormsModule,
                            i2.IntlModule,
                            i5.ValidationModule,
                            i2$1.BsModalModule,
                            i8.BsActionModule,
                            i4$1.UtilsModule,
                        ],
                        declarations: [
                            BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
                        ],
                        exports: [
                            BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
                        ],
                    }]
            }], null, null);
    })();
    i0.ɵɵsetComponentScope(BsEditUserSettings, [i3.ɵangular_packages_forms_forms_y, i3.NgControlStatusGroup, i3.FormGroupDirective, i2$1.BsModal, BsUserSettingsEditor], []);

    var _enUserSettings = {
        "userMenu": {
            "user": "User",
            "login": "Login",
            "overrideUser": "Override User",
            "settings": "Settings",
            "revertUserOverride": "Revert User Override",
            "administration": "Administration",
            "logout": "Logout",
            "language": "Language",
            "resetUserSettings": {
                "menu": "Reset user settings",
                "modalTitle": "Reset user settings",
                "modalMessage": "You are about to reset ALL your user data (recent queries, collections, alerts, preferences, etc.). Do you want to continue?",
                "modalConfirmButton": "Confirm",
                "successMessage": "Reset user settings succefully",
                "errorMessage": "Reset user settings failed"
            }
        },
        "editUserSettings": {
            "title": "Settings",
            "language": "UI Language",
            "pageSize": "Number of results per page",
            "email": "Email"
        }
    };

    var _frUserSettings = {
        "userMenu": {
            "user": "Utilisateur",
            "login": "S'identifier",
            "overrideUser": "Surcharger l'utilisateur",
            "settings": "Paramètres",
            "revertUserOverride": "Revenir à l'utilisateur normal",
            "administration": "Administration",
            "logout": "Se déconnecter",
            "language": "Langue",
            "resetUserSettings": {
                "menu": "Réinitialiser les paramètres utilisateur",
                "modalTitle": "Réinitialiser Paramètres Utilisateur",
                "modalMessage": "Vous êtes sur le point de réinitialiser TOUTES vos données utilisateur (requêtes récentes, collections, alertes, préférences, etc.). Voulez-vous continuer ?",
                "modalConfirmButton": "Confirmer",
                "successMessage": "Réinitialisation des paramètres utilisateur réussie",
                "errorMessage": "Echec de la réinitialisation des paramètres utilisateur"
            }
        },
        "editUserSettings": {
            "title": "Paramètres",
            "language": "Langue de l'interface",
            "pageSize": "Nombre de résultats par page",
            "email": "E-mail"
        }
    };

    var _deUserSettings = {
        "userMenu": {
            "user": "Benutzer",
            "login": "Anmeldung",
            "overrideUser": "Benutzer wechseln",
            "settings": "Einstellungen",
            "revertUserOverride": "Zum Administrator zurückkehren",
            "administration": "Administration",
            "logout": "Abmeldung",
            "language": "Sprache",
            "resetUserSettings": {
                "menu": "Benutzereinstellungen zurücksetzen",
                "modalTitle": "Benutzereinstellungen zurücksetzen",
                "modalMessage": "Sie sind dabei, ALLE Ihre Benutzerdaten zurückzusetzen (letzte Abfragen, Sammlungen, Warnungen, Einstellungen usw.). Möchtest du fortfahren?",
                "modalConfirmButton": "Bestätigen",
                "successMessage": "Benutzereinstellungen erfolgreich zurücksetzen",
                "errorMessage": "Benutzereinstellungen zurücksetzen fehlgeschlagen"
            }
        },
        "editUserSettings": {
            "title": "Einstellungen",
            "language": "Sprache der Benutzeroberfläche",
            "pageSize": "Anzahl der Ergebnisse pro Seite",
            "email": "E-Mail"
        }
    };

    var enUserSettings = base.Utils.merge({}, _enUserSettings, i2$1.enModal);
    var frUserSettings = base.Utils.merge({}, _frUserSettings, i2$1.frModal);
    var deUserSettings = base.Utils.merge({}, _deUserSettings, i2$1.deModal);

    /**
     * The role of this service is to bundle together the simple preferences of
     * the user and synchronise them with the user settings.
     *
     * Usage:
     * this.userPreferences.get("foo")
     * this.userPreferences.set("foo", "bar")
     * this.userPreferences.sync()
     */
    var UserPreferences = /** @class */ (function () {
        function UserPreferences(userSettingsService) {
            this.userSettingsService = userSettingsService;
        }
        Object.defineProperty(UserPreferences.prototype, "prefs", {
            get: function () {
                if (!this.userSettingsService.userSettings)
                    this.userSettingsService.userSettings = {};
                if (!this.userSettingsService.userSettings["prefs"])
                    this.userSettingsService.userSettings["prefs"] = {};
                return this.userSettingsService.userSettings["prefs"];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the value of a property
         * @param property the name of this property
         */
        UserPreferences.prototype.get = function (property) {
            return this.prefs[property.toLowerCase()];
        };
        /**
         * Sets the value of a property
         * @param property the name of this property
         * @param value the value
         * @param skipSync whether we should skyp syncing (to update multiple properties for example)
         */
        UserPreferences.prototype.set = function (property, value, skipSync) {
            this.prefs[property.toLowerCase()] = value;
            if (!skipSync) {
                this.sync();
            }
        };
        /**
         * Deletes a given property from the preferences
         * @param property the name of this property
         * @param skipSync whether we should skyp syncing (to update multiple properties for example)
         */
        UserPreferences.prototype.delete = function (property, skipSync) {
            if (Object.prototype.hasOwnProperty.call(this.prefs, property.toLowerCase())) {
                this.prefs[property.toLowerCase()] = null;
                if (!skipSync) {
                    this.sync();
                }
            }
        };
        /**
         * Synchronizes the user preferences with the server
         */
        UserPreferences.prototype.sync = function () {
            this.userSettingsService.patch({ prefs: this.prefs });
        };
        return UserPreferences;
    }());
    UserPreferences.ɵfac = function UserPreferences_Factory(t) { return new (t || UserPreferences)(i0.ɵɵinject(i1.UserSettingsWebService)); };
    UserPreferences.ɵprov = i0.ɵɵdefineInjectable({ token: UserPreferences, factory: UserPreferences.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(UserPreferences, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i1.UserSettingsWebService }]; }, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.BsEditUserSettings = BsEditUserSettings;
    exports.BsUserMenuComponent = BsUserMenuComponent;
    exports.BsUserSettingsEditor = BsUserSettingsEditor;
    exports.BsUserSettingsModule = BsUserSettingsModule;
    exports.UserPreferences = UserPreferences;
    exports.deUserSettings = deUserSettings;
    exports.enUserSettings = enUserSettings;
    exports.frUserSettings = frUserSettings;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-components-user-settings.umd.js.map
