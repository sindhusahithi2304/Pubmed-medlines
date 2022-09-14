import { ViewContainerRef, ComponentRef, Type, ComponentFactoryResolver, ApplicationRef, Injector } from "@angular/core";
import { Subscription } from "rxjs";
import { MapOf } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * Describes the options that can be passed to [LoadComponentService.loadComponent]{@link LoadComponentService#loadComponent}
 */
export interface LoadComponentOptions {
    /**
     * The type of the component to load
     */
    component: Type<any>;
    /**
     * The initial values for the component's `@Input` decorated properties
     */
    inputs?: MapOf<any>;
    /**
     * The handlers for the component's `@Output` decorated events
     */
    outputs?: MapOf<any>;
    /**
     * The index at which to insert the loaded component's host view into the container.
     * If not specified, appends the new view as the last entry.
     * See [ViewContainerRef.createComponent]{@link https://angular.io/api/core/ViewContainerRef#createComponent}
     */
    index?: number;
}
/**
 * Describes the object returned by [LoadComponentService.loadComponent]{@link LoadComponentService#loadComponent}
 */
export interface LoadedComponent {
    /**
     * The loaded component instance
     */
    componentRef: ComponentRef<any>;
    /**
     * The subscriptions made to the component's output events
     */
    subscriptions?: Subscription;
}
/**
 * This service provides methods to dynamically load and unload an angular component from its type.
 * The component's initial inputs and outputs are respected and the first call to the component's
 * `ngOnChanges` method is made.
 * Changes to the inputs and outputs can be made by calling {@link #bindComponent} which will call
 * the component's `ngOnChanges` method again
 */
export declare class LoadComponentService {
    private componentFactoryResolver;
    private applicationRef;
    private factories;
    constructor(componentFactoryResolver: ComponentFactoryResolver, applicationRef: ApplicationRef);
    private _bindComponent;
    /**
     * Bind a component's input and output properties according to the passed options. Generate a
     * call to the component's `ngOnChanges` method if the inputs have changed since the last call.
     * If the component has been previously bound it is first unbound by calling {@link #unbindComponent}
     * which will unsubscribe the component's outputs
     *
     * @param options Specify the inputs and outputs for the component
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    bindComponent(options: LoadComponentOptions, loadedComponent: LoadedComponent): void;
    /**
     * Unbind a previously bound dynamically loaded component. Subscriptions to the component's
     * outputs are unsubscribed
     *
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    unbindComponent(loadedComponent: LoadedComponent): void;
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
    loadComponent<T>(options: LoadComponentOptions, viewContainerRef?: ViewContainerRef, injector?: Injector): LoadedComponent;
    /**
     * Unload a dynamically loaded component. It is unbound prior to being destroyed
     *
     * @param component A loaded component
     */
    unloadComponent(component: LoadedComponent): void;
    static ɵfac: i0.ɵɵFactoryDef<LoadComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDef<LoadComponentService>;
}
//# sourceMappingURL=load-component.service.d.ts.map