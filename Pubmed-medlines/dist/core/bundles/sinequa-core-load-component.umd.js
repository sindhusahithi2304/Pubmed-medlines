(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@sinequa/core/base')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/load-component', ['exports', '@angular/core', '@angular/common', '@sinequa/core/base'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core['load-component'] = {}), global.ng.core, global.ng.common, global.sinequa.core.base));
}(this, (function (exports, i0, common, base) { 'use strict';

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

    /**
     * This service provides methods to dynamically load and unload an angular component from its type.
     * The component's initial inputs and outputs are respected and the first call to the component's
     * `ngOnChanges` method is made.
     * Changes to the inputs and outputs can be made by calling {@link #bindComponent} which will call
     * the component's `ngOnChanges` method again
     */
    var LoadComponentService = /** @class */ (function () {
        function LoadComponentService(componentFactoryResolver, applicationRef) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.applicationRef = applicationRef;
            // A cache of resolved component factories
            this.factories = new Map();
        }
        LoadComponentService.prototype._bindComponent = function (options, loadedComponent, initialLoad) {
            if (!initialLoad) {
                this.unbindComponent(loadedComponent);
            }
            var ngOnChanges = loadedComponent.componentRef.instance.ngOnChanges;
            var simpleChanges;
            var makeSimpleChanges = base.Utils.isFunction(ngOnChanges) && !!options.inputs;
            if (!!options.inputs) {
                // Assign inputs and generate SimpleChanges if required
                Object.keys(options.inputs).forEach(function (name) {
                    if (makeSimpleChanges) {
                        var previousValue = initialLoad ? undefined : loadedComponent.componentRef.instance[name];
                        var currentValue = options.inputs[name];
                        if (initialLoad || currentValue !== previousValue) {
                            if (!simpleChanges) {
                                simpleChanges = {};
                            }
                            simpleChanges[name] = new i0.SimpleChange(previousValue, currentValue, initialLoad);
                        }
                    }
                    loadedComponent.componentRef.instance[name] = options.inputs[name];
                });
            }
            if (!!options.outputs) {
                Object.keys(options.outputs).forEach(function (name) {
                    var eventEmitter = loadedComponent.componentRef.instance[name];
                    if (eventEmitter) {
                        var subscription = eventEmitter.subscribe(options.outputs[name]);
                        if (!loadedComponent.subscriptions) {
                            loadedComponent.subscriptions = subscription;
                        }
                        else {
                            loadedComponent.subscriptions.add(subscription);
                        }
                    }
                });
            }
            if (simpleChanges) {
                ngOnChanges.call(loadedComponent.componentRef.instance, simpleChanges);
            }
        };
        /**
         * Bind a component's input and output properties according to the passed options. Generate a
         * call to the component's `ngOnChanges` method if the inputs have changed since the last call.
         * If the component has been previously bound it is first unbound by calling {@link #unbindComponent}
         * which will unsubscribe the component's outputs
         *
         * @param options Specify the inputs and outputs for the component
         * @param loadedComponent A component loaded by {@link #loadComponent}
         */
        LoadComponentService.prototype.bindComponent = function (options, loadedComponent) {
            return this._bindComponent(options, loadedComponent, false);
        };
        /**
         * Unbind a previously bound dynamically loaded component. Subscriptions to the component's
         * outputs are unsubscribed
         *
         * @param loadedComponent A component loaded by {@link #loadComponent}
         */
        LoadComponentService.prototype.unbindComponent = function (loadedComponent) {
            if (!!loadedComponent.subscriptions) {
                loadedComponent.subscriptions.unsubscribe();
                loadedComponent.subscriptions = undefined;
            }
        };
        /**
         * Dynamically load a component from its type. The component's inputs and outputs will be initialized
         * by calling {@link #bindComponent}.
         *
         * @param options The options containing the component to load and its inputs and outputs
         * @param viewContainerRef Specifies where the loaded component should be attached. If not specified then the
         * loaded component is inserted before the application component
         * @param injector Overrides the injector to use as the parent for the component. By default this will be
         * the injector held on the `viewContainerRef`
         */
        LoadComponentService.prototype.loadComponent = function (options, viewContainerRef, injector) {
            var componentRef;
            var factory = this.factories.get(options.component);
            if (!factory) {
                factory = this.componentFactoryResolver.resolveComponentFactory(options.component);
            }
            if (!viewContainerRef) {
                var appElement = this.applicationRef.components[0].location.nativeElement;
                var injector1 = this.applicationRef.components[0].injector;
                componentRef = factory.create(injector1, [[appElement]]);
                this.applicationRef.attachView(componentRef.hostView);
                if (appElement.parentElement) {
                    appElement.parentElement.insertBefore(componentRef.location.nativeElement, appElement.nextSibling);
                }
            }
            else {
                if (!injector) {
                    injector = viewContainerRef.injector;
                }
                var index = !base.Utils.isEmpty(options.index) ? options.index : undefined;
                componentRef = viewContainerRef.createComponent(factory, index, injector, []);
            }
            var loadedComponent = {
                componentRef: componentRef
            };
            this._bindComponent(options, loadedComponent, true);
            loadedComponent.componentRef.changeDetectorRef.detectChanges();
            return loadedComponent;
        };
        /**
         * Unload a dynamically loaded component. It is unbound prior to being destroyed
         *
         * @param component A loaded component
         */
        LoadComponentService.prototype.unloadComponent = function (component) {
            if (!!component) {
                this.unbindComponent(component);
                component.componentRef.destroy();
            }
        };
        return LoadComponentService;
    }());
    LoadComponentService.ɵfac = function LoadComponentService_Factory(t) { return new (t || LoadComponentService)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.ApplicationRef)); };
    LoadComponentService.ɵprov = i0.ɵɵdefineInjectable({ token: LoadComponentService, factory: LoadComponentService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LoadComponentService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }]; }, null);
    })();

    /**
     * A directive that uses the {@link LoadComponentService} to dynamically load a component.
     * The loaded component's lifecycle is automatically managed with changes to the directive's
     * `options` reflected to the component by rebinding it using {@link LoadComponentService}
     */
    var LoadComponentDirective = /** @class */ (function () {
        function LoadComponentDirective(loadComponentService, viewContainerRef) {
            this.loadComponentService = loadComponentService;
            this.viewContainerRef = viewContainerRef;
            /**
             * Used to emit events when the component is created and destroyed
             */
            this.eventEmitter = new i0.EventEmitter();
        }
        /**
         * Handles any changes to the input `options`. On the first call the component is loaded
         * and bound. Subsequent changes to the `options` are handled by rebinding the component unless
         * the component type to load changes in which case the current component is unloaded before
         * loading the new component.
         *
         * The component is loaded using the `ViewContainerRef` associated with the directive
         */
        LoadComponentDirective.prototype.ngOnChanges = function () {
            if (this.loadedComponent) {
                if (this.currentComponent === this.options.component) {
                    this.loadComponentService.bindComponent(this.options, this.loadedComponent);
                    return;
                }
                this.loadComponentService.unbindComponent(this.loadedComponent);
                this.loadedComponent.componentRef.destroy();
                this.eventEmitter.emit({ componentRef: undefined });
            }
            this.loadedComponent = this.loadComponentService.loadComponent(this.options, this.viewContainerRef);
            this.currentComponent = this.options.component;
            this.eventEmitter.emit({ componentRef: !!this.loadedComponent ? this.loadedComponent.componentRef : undefined });
        };
        /**
         * Unbinds the loaded component. It is not destroyed here as angular will automatically destroy
         * the component at the same time as this directive is destroyed as they share the same `ViewContainerRef`
         */
        LoadComponentDirective.prototype.ngOnDestroy = function () {
            if (this.loadedComponent) {
                this.loadComponentService.unbindComponent(this.loadedComponent);
                this.eventEmitter.emit({ componentRef: undefined });
            }
        };
        return LoadComponentDirective;
    }());
    LoadComponentDirective.ɵfac = function LoadComponentDirective_Factory(t) { return new (t || LoadComponentDirective)(i0.ɵɵdirectiveInject(LoadComponentService), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
    LoadComponentDirective.ɵdir = i0.ɵɵdefineDirective({ type: LoadComponentDirective, selectors: [["", "sqLoadComponent", ""]], inputs: { options: ["sqLoadComponent", "options"] }, outputs: { eventEmitter: "sqLoadComponent" }, features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LoadComponentDirective, [{
                type: i0.Directive,
                args: [{
                        selector: "[sqLoadComponent]"
                    }]
            }], function () { return [{ type: LoadComponentService }, { type: i0.ViewContainerRef }]; }, { options: [{
                    type: i0.Input,
                    args: ["sqLoadComponent"]
                }], eventEmitter: [{
                    type: i0.Output,
                    args: ["sqLoadComponent"]
                }] });
    })();

    var LOAD_COMPONENT_MODULE_PROVIDERS = [];

    /**
     * This module provides functionality for the dynamic loading of components based on the
     * techniques described in the [angular documentation]{@link https://angular.io/guide/dynamic-component-loader}
     */
    // @dynamic
    var LoadComponentModule = /** @class */ (function () {
        function LoadComponentModule() {
        }
        return LoadComponentModule;
    }());
    LoadComponentModule.ɵmod = i0.ɵɵdefineNgModule({ type: LoadComponentModule });
    LoadComponentModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LoadComponentModule_Factory(t) { return new (t || LoadComponentModule)(); }, providers: __spread(LOAD_COMPONENT_MODULE_PROVIDERS), imports: [[
                common.CommonModule,
                base.BaseModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LoadComponentModule, { declarations: [LoadComponentDirective], imports: [common.CommonModule,
                base.BaseModule], exports: [LoadComponentDirective] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LoadComponentModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            base.BaseModule
                        ],
                        declarations: [
                            LoadComponentDirective
                        ],
                        exports: [
                            LoadComponentDirective
                        ],
                        providers: __spread(LOAD_COMPONENT_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.LoadComponentDirective = LoadComponentDirective;
    exports.LoadComponentModule = LoadComponentModule;
    exports.LoadComponentService = LoadComponentService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-load-component.umd.js.map
