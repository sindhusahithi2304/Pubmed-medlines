import { OnChanges, OnDestroy, ViewContainerRef, ComponentRef, EventEmitter, Type } from "@angular/core";
import { LoadComponentService, LoadComponentOptions } from "./load-component.service";
import * as i0 from "@angular/core";
/**
 * A directive that uses the {@link LoadComponentService} to dynamically load a component.
 * The loaded component's lifecycle is automatically managed with changes to the directive's
 * `options` reflected to the component by rebinding it using {@link LoadComponentService}
 */
export declare class LoadComponentDirective implements OnChanges, OnDestroy {
    private loadComponentService;
    private viewContainerRef;
    /**
     * Options for the loading of a component
     */
    options: LoadComponentOptions;
    /**
     * Used to emit events when the component is created and destroyed
     */
    eventEmitter: EventEmitter<{
        componentRef: ComponentRef<Type<any>> | undefined;
    }>;
    private loadedComponent;
    private currentComponent;
    constructor(loadComponentService: LoadComponentService, viewContainerRef: ViewContainerRef);
    /**
     * Handles any changes to the input `options`. On the first call the component is loaded
     * and bound. Subsequent changes to the `options` are handled by rebinding the component unless
     * the component type to load changes in which case the current component is unloaded before
     * loading the new component.
     *
     * The component is loaded using the `ViewContainerRef` associated with the directive
     */
    ngOnChanges(): void;
    /**
     * Unbinds the loaded component. It is not destroyed here as angular will automatically destroy
     * the component at the same time as this directive is destroyed as they share the same `ViewContainerRef`
     */
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<LoadComponentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<LoadComponentDirective, "[sqLoadComponent]", never, { "options": "sqLoadComponent"; }, { "eventEmitter": "sqLoadComponent"; }, never>;
}
//# sourceMappingURL=load-component.directive.d.ts.map