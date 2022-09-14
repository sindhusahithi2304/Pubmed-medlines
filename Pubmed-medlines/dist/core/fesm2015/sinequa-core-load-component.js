import { SimpleChange, ɵɵinject, ComponentFactoryResolver, ApplicationRef, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, EventEmitter, ɵɵdirectiveInject, ViewContainerRef, ɵɵdefineDirective, ɵɵNgOnChangesFeature, Directive, Input, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utils, BaseModule } from '@sinequa/core/base';

/**
 * This service provides methods to dynamically load and unload an angular component from its type.
 * The component's initial inputs and outputs are respected and the first call to the component's
 * `ngOnChanges` method is made.
 * Changes to the inputs and outputs can be made by calling {@link #bindComponent} which will call
 * the component's `ngOnChanges` method again
 */
class LoadComponentService {
    constructor(componentFactoryResolver, applicationRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.applicationRef = applicationRef;
        // A cache of resolved component factories
        this.factories = new Map();
    }
    _bindComponent(options, loadedComponent, initialLoad) {
        if (!initialLoad) {
            this.unbindComponent(loadedComponent);
        }
        const ngOnChanges = loadedComponent.componentRef.instance.ngOnChanges;
        let simpleChanges;
        const makeSimpleChanges = Utils.isFunction(ngOnChanges) && !!options.inputs;
        if (!!options.inputs) {
            // Assign inputs and generate SimpleChanges if required
            Object.keys(options.inputs).forEach(name => {
                if (makeSimpleChanges) {
                    const previousValue = initialLoad ? undefined : loadedComponent.componentRef.instance[name];
                    const currentValue = options.inputs[name];
                    if (initialLoad || currentValue !== previousValue) {
                        if (!simpleChanges) {
                            simpleChanges = {};
                        }
                        simpleChanges[name] = new SimpleChange(previousValue, currentValue, initialLoad);
                    }
                }
                loadedComponent.componentRef.instance[name] = options.inputs[name];
            });
        }
        if (!!options.outputs) {
            Object.keys(options.outputs).forEach(name => {
                const eventEmitter = loadedComponent.componentRef.instance[name];
                if (eventEmitter) {
                    const subscription = eventEmitter.subscribe(options.outputs[name]);
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
    }
    /**
     * Bind a component's input and output properties according to the passed options. Generate a
     * call to the component's `ngOnChanges` method if the inputs have changed since the last call.
     * If the component has been previously bound it is first unbound by calling {@link #unbindComponent}
     * which will unsubscribe the component's outputs
     *
     * @param options Specify the inputs and outputs for the component
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    bindComponent(options, loadedComponent) {
        return this._bindComponent(options, loadedComponent, false);
    }
    /**
     * Unbind a previously bound dynamically loaded component. Subscriptions to the component's
     * outputs are unsubscribed
     *
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    unbindComponent(loadedComponent) {
        if (!!loadedComponent.subscriptions) {
            loadedComponent.subscriptions.unsubscribe();
            loadedComponent.subscriptions = undefined;
        }
    }
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
    loadComponent(options, viewContainerRef, injector) {
        let componentRef;
        let factory = this.factories.get(options.component);
        if (!factory) {
            factory = this.componentFactoryResolver.resolveComponentFactory(options.component);
        }
        if (!viewContainerRef) {
            const appElement = this.applicationRef.components[0].location.nativeElement;
            const injector1 = this.applicationRef.components[0].injector;
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
            const index = !Utils.isEmpty(options.index) ? options.index : undefined;
            componentRef = viewContainerRef.createComponent(factory, index, injector, []);
        }
        const loadedComponent = {
            componentRef
        };
        this._bindComponent(options, loadedComponent, true);
        loadedComponent.componentRef.changeDetectorRef.detectChanges();
        return loadedComponent;
    }
    /**
     * Unload a dynamically loaded component. It is unbound prior to being destroyed
     *
     * @param component A loaded component
     */
    unloadComponent(component) {
        if (!!component) {
            this.unbindComponent(component);
            component.componentRef.destroy();
        }
    }
}
LoadComponentService.ɵfac = function LoadComponentService_Factory(t) { return new (t || LoadComponentService)(ɵɵinject(ComponentFactoryResolver), ɵɵinject(ApplicationRef)); };
LoadComponentService.ɵprov = ɵɵdefineInjectable({ token: LoadComponentService, factory: LoadComponentService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LoadComponentService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: ComponentFactoryResolver }, { type: ApplicationRef }]; }, null); })();

/**
 * A directive that uses the {@link LoadComponentService} to dynamically load a component.
 * The loaded component's lifecycle is automatically managed with changes to the directive's
 * `options` reflected to the component by rebinding it using {@link LoadComponentService}
 */
class LoadComponentDirective {
    constructor(loadComponentService, viewContainerRef) {
        this.loadComponentService = loadComponentService;
        this.viewContainerRef = viewContainerRef;
        /**
         * Used to emit events when the component is created and destroyed
         */
        this.eventEmitter = new EventEmitter();
    }
    /**
     * Handles any changes to the input `options`. On the first call the component is loaded
     * and bound. Subsequent changes to the `options` are handled by rebinding the component unless
     * the component type to load changes in which case the current component is unloaded before
     * loading the new component.
     *
     * The component is loaded using the `ViewContainerRef` associated with the directive
     */
    ngOnChanges() {
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
    }
    /**
     * Unbinds the loaded component. It is not destroyed here as angular will automatically destroy
     * the component at the same time as this directive is destroyed as they share the same `ViewContainerRef`
     */
    ngOnDestroy() {
        if (this.loadedComponent) {
            this.loadComponentService.unbindComponent(this.loadedComponent);
            this.eventEmitter.emit({ componentRef: undefined });
        }
    }
}
LoadComponentDirective.ɵfac = function LoadComponentDirective_Factory(t) { return new (t || LoadComponentDirective)(ɵɵdirectiveInject(LoadComponentService), ɵɵdirectiveInject(ViewContainerRef)); };
LoadComponentDirective.ɵdir = ɵɵdefineDirective({ type: LoadComponentDirective, selectors: [["", "sqLoadComponent", ""]], inputs: { options: ["sqLoadComponent", "options"] }, outputs: { eventEmitter: "sqLoadComponent" }, features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LoadComponentDirective, [{
        type: Directive,
        args: [{
                selector: "[sqLoadComponent]"
            }]
    }], function () { return [{ type: LoadComponentService }, { type: ViewContainerRef }]; }, { options: [{
            type: Input,
            args: ["sqLoadComponent"]
        }], eventEmitter: [{
            type: Output,
            args: ["sqLoadComponent"]
        }] }); })();

const LOAD_COMPONENT_MODULE_PROVIDERS = [];

/**
 * This module provides functionality for the dynamic loading of components based on the
 * techniques described in the [angular documentation]{@link https://angular.io/guide/dynamic-component-loader}
 */
// @dynamic
class LoadComponentModule {
}
LoadComponentModule.ɵmod = ɵɵdefineNgModule({ type: LoadComponentModule });
LoadComponentModule.ɵinj = ɵɵdefineInjector({ factory: function LoadComponentModule_Factory(t) { return new (t || LoadComponentModule)(); }, providers: [
        ...LOAD_COMPONENT_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            BaseModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(LoadComponentModule, { declarations: [LoadComponentDirective], imports: [CommonModule,
        BaseModule], exports: [LoadComponentDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(LoadComponentModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [
                    LoadComponentDirective
                ],
                exports: [
                    LoadComponentDirective
                ],
                providers: [
                    ...LOAD_COMPONENT_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { LoadComponentDirective, LoadComponentModule, LoadComponentService };
//# sourceMappingURL=sinequa-core-load-component.js.map
