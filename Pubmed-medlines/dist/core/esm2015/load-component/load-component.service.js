import { Injectable, SimpleChange } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * This service provides methods to dynamically load and unload an angular component from its type.
 * The component's initial inputs and outputs are respected and the first call to the component's
 * `ngOnChanges` method is made.
 * Changes to the inputs and outputs can be made by calling {@link #bindComponent} which will call
 * the component's `ngOnChanges` method again
 */
export class LoadComponentService {
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
LoadComponentService.ɵfac = function LoadComponentService_Factory(t) { return new (t || LoadComponentService)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.ApplicationRef)); };
LoadComponentService.ɵprov = i0.ɵɵdefineInjectable({ token: LoadComponentService, factory: LoadComponentService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LoadComponentService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2xvYWQtY29tcG9uZW50LyIsInNvdXJjZXMiOlsibG9hZC1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUNXLFlBQVksRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUU5RSxPQUFPLEVBQUMsS0FBSyxFQUFRLE1BQU0sb0JBQW9CLENBQUM7O0FBd0NoRDs7Ozs7O0dBTUc7QUFJSCxNQUFNLE9BQU8sb0JBQW9CO0lBSzdCLFlBQ1ksd0JBQWtELEVBQ2xELGNBQThCO1FBRDlCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTDFDLDBDQUEwQztRQUNsQyxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQW9DLENBQUM7SUFLaEUsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUE2QixFQUFFLGVBQWdDLEVBQUUsV0FBb0I7UUFDeEcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDekM7UUFDRCxNQUFNLFdBQVcsR0FBcUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ3hHLElBQUksYUFBd0MsQ0FBQztRQUM3QyxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDNUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQix1REFBdUQ7WUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLGlCQUFpQixFQUFFO29CQUNuQixN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b0JBQW9COzREQUFwQixvQkFBb0IsV0FBcEIsb0JBQW9CLG1CQUZqQixNQUFNO2tEQUVULG9CQUFvQjtjQUhoQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudFJlZiwgVHlwZSwgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBBcHBsaWNhdGlvblJlZixcbiAgICBJbmplY3RvciwgU2ltcGxlQ2hhbmdlcywgU2ltcGxlQ2hhbmdlLCBFdmVudEVtaXR0ZXJ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXRpbHMsIE1hcE9mfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBvcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byBbTG9hZENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudF17QGxpbmsgTG9hZENvbXBvbmVudFNlcnZpY2UjbG9hZENvbXBvbmVudH1cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMb2FkQ29tcG9uZW50T3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVGhlIHR5cGUgb2YgdGhlIGNvbXBvbmVudCB0byBsb2FkXG4gICAgICovXG4gICAgY29tcG9uZW50OiBUeXBlPGFueT47XG4gICAgLyoqXG4gICAgICogVGhlIGluaXRpYWwgdmFsdWVzIGZvciB0aGUgY29tcG9uZW50J3MgYEBJbnB1dGAgZGVjb3JhdGVkIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBpbnB1dHM/OiBNYXBPZjxhbnk+O1xuICAgIC8qKlxuICAgICAqIFRoZSBoYW5kbGVycyBmb3IgdGhlIGNvbXBvbmVudCdzIGBAT3V0cHV0YCBkZWNvcmF0ZWQgZXZlbnRzXG4gICAgICovXG4gICAgb3V0cHV0cz86IE1hcE9mPGFueT47XG4gICAgLyoqXG4gICAgICogVGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbG9hZGVkIGNvbXBvbmVudCdzIGhvc3QgdmlldyBpbnRvIHRoZSBjb250YWluZXIuXG4gICAgICogSWYgbm90IHNwZWNpZmllZCwgYXBwZW5kcyB0aGUgbmV3IHZpZXcgYXMgdGhlIGxhc3QgZW50cnkuXG4gICAgICogU2VlIFtWaWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudF17QGxpbmsgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb3JlL1ZpZXdDb250YWluZXJSZWYjY3JlYXRlQ29tcG9uZW50fVxuICAgICAqL1xuICAgIGluZGV4PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIERlc2NyaWJlcyB0aGUgb2JqZWN0IHJldHVybmVkIGJ5IFtMb2FkQ29tcG9uZW50U2VydmljZS5sb2FkQ29tcG9uZW50XXtAbGluayBMb2FkQ29tcG9uZW50U2VydmljZSNsb2FkQ29tcG9uZW50fVxuICovXG5leHBvcnQgaW50ZXJmYWNlIExvYWRlZENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogVGhlIGxvYWRlZCBjb21wb25lbnQgaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuICAgIC8qKlxuICAgICAqIFRoZSBzdWJzY3JpcHRpb25zIG1hZGUgdG8gdGhlIGNvbXBvbmVudCdzIG91dHB1dCBldmVudHNcbiAgICAgKi9cbiAgICBzdWJzY3JpcHRpb25zPzogU3Vic2NyaXB0aW9uO1xufVxuXG4vKipcbiAqIFRoaXMgc2VydmljZSBwcm92aWRlcyBtZXRob2RzIHRvIGR5bmFtaWNhbGx5IGxvYWQgYW5kIHVubG9hZCBhbiBhbmd1bGFyIGNvbXBvbmVudCBmcm9tIGl0cyB0eXBlLlxuICogVGhlIGNvbXBvbmVudCdzIGluaXRpYWwgaW5wdXRzIGFuZCBvdXRwdXRzIGFyZSByZXNwZWN0ZWQgYW5kIHRoZSBmaXJzdCBjYWxsIHRvIHRoZSBjb21wb25lbnQnc1xuICogYG5nT25DaGFuZ2VzYCBtZXRob2QgaXMgbWFkZS5cbiAqIENoYW5nZXMgdG8gdGhlIGlucHV0cyBhbmQgb3V0cHV0cyBjYW4gYmUgbWFkZSBieSBjYWxsaW5nIHtAbGluayAjYmluZENvbXBvbmVudH0gd2hpY2ggd2lsbCBjYWxsXG4gKiB0aGUgY29tcG9uZW50J3MgYG5nT25DaGFuZ2VzYCBtZXRob2QgYWdhaW5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIExvYWRDb21wb25lbnRTZXJ2aWNlIHtcblxuICAgIC8vIEEgY2FjaGUgb2YgcmVzb2x2ZWQgY29tcG9uZW50IGZhY3Rvcmllc1xuICAgIHByaXZhdGUgZmFjdG9yaWVzID0gbmV3IE1hcDxUeXBlPGFueT4sIENvbXBvbmVudEZhY3Rvcnk8YW55Pj4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgIH1cblxuICAgIHByaXZhdGUgX2JpbmRDb21wb25lbnQob3B0aW9uczogTG9hZENvbXBvbmVudE9wdGlvbnMsIGxvYWRlZENvbXBvbmVudDogTG9hZGVkQ29tcG9uZW50LCBpbml0aWFsTG9hZDogYm9vbGVhbikge1xuICAgICAgICBpZiAoIWluaXRpYWxMb2FkKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZENvbXBvbmVudChsb2FkZWRDb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5nT25DaGFuZ2VzOiAoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykgPT4gdm9pZCA9IGxvYWRlZENvbXBvbmVudC5jb21wb25lbnRSZWYuaW5zdGFuY2UubmdPbkNoYW5nZXM7XG4gICAgICAgIGxldCBzaW1wbGVDaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzIHwgdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBtYWtlU2ltcGxlQ2hhbmdlcyA9IFV0aWxzLmlzRnVuY3Rpb24obmdPbkNoYW5nZXMpICYmICEhb3B0aW9ucy5pbnB1dHM7XG4gICAgICAgIGlmICghIW9wdGlvbnMuaW5wdXRzKSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gaW5wdXRzIGFuZCBnZW5lcmF0ZSBTaW1wbGVDaGFuZ2VzIGlmIHJlcXVpcmVkXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLmlucHV0cykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobWFrZVNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IGluaXRpYWxMb2FkID8gdW5kZWZpbmVkIDogbG9hZGVkQ29tcG9uZW50LmNvbXBvbmVudFJlZi5pbnN0YW5jZVtuYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gb3B0aW9ucy5pbnB1dHMhW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbExvYWQgfHwgY3VycmVudFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVDaGFuZ2VzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW1wbGVDaGFuZ2VzW25hbWVdID0gbmV3IFNpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUsIGluaXRpYWxMb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2FkZWRDb21wb25lbnQuY29tcG9uZW50UmVmLmluc3RhbmNlW25hbWVdID0gb3B0aW9ucy5pbnB1dHMhW25hbWVdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhb3B0aW9ucy5vdXRwdXRzKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLm91dHB1dHMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IGxvYWRlZENvbXBvbmVudC5jb21wb25lbnRSZWYuaW5zdGFuY2VbbmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50RW1pdHRlcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSBldmVudEVtaXR0ZXIuc3Vic2NyaWJlKG9wdGlvbnMub3V0cHV0cyFbbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWxvYWRlZENvbXBvbmVudC5zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRDb21wb25lbnQuc3Vic2NyaXB0aW9ucyA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZENvbXBvbmVudC5zdWJzY3JpcHRpb25zLmFkZChzdWJzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIG5nT25DaGFuZ2VzLmNhbGwobG9hZGVkQ29tcG9uZW50LmNvbXBvbmVudFJlZi5pbnN0YW5jZSwgc2ltcGxlQ2hhbmdlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCaW5kIGEgY29tcG9uZW50J3MgaW5wdXQgYW5kIG91dHB1dCBwcm9wZXJ0aWVzIGFjY29yZGluZyB0byB0aGUgcGFzc2VkIG9wdGlvbnMuIEdlbmVyYXRlIGFcbiAgICAgKiBjYWxsIHRvIHRoZSBjb21wb25lbnQncyBgbmdPbkNoYW5nZXNgIG1ldGhvZCBpZiB0aGUgaW5wdXRzIGhhdmUgY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBjYWxsLlxuICAgICAqIElmIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gcHJldmlvdXNseSBib3VuZCBpdCBpcyBmaXJzdCB1bmJvdW5kIGJ5IGNhbGxpbmcge0BsaW5rICN1bmJpbmRDb21wb25lbnR9XG4gICAgICogd2hpY2ggd2lsbCB1bnN1YnNjcmliZSB0aGUgY29tcG9uZW50J3Mgb3V0cHV0c1xuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgU3BlY2lmeSB0aGUgaW5wdXRzIGFuZCBvdXRwdXRzIGZvciB0aGUgY29tcG9uZW50XG4gICAgICogQHBhcmFtIGxvYWRlZENvbXBvbmVudCBBIGNvbXBvbmVudCBsb2FkZWQgYnkge0BsaW5rICNsb2FkQ29tcG9uZW50fVxuICAgICAqL1xuICAgIHB1YmxpYyBiaW5kQ29tcG9uZW50KG9wdGlvbnM6IExvYWRDb21wb25lbnRPcHRpb25zLCBsb2FkZWRDb21wb25lbnQ6IExvYWRlZENvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmluZENvbXBvbmVudChvcHRpb25zLCBsb2FkZWRDb21wb25lbnQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmQgYSBwcmV2aW91c2x5IGJvdW5kIGR5bmFtaWNhbGx5IGxvYWRlZCBjb21wb25lbnQuIFN1YnNjcmlwdGlvbnMgdG8gdGhlIGNvbXBvbmVudCdzXG4gICAgICogb3V0cHV0cyBhcmUgdW5zdWJzY3JpYmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbG9hZGVkQ29tcG9uZW50IEEgY29tcG9uZW50IGxvYWRlZCBieSB7QGxpbmsgI2xvYWRDb21wb25lbnR9XG4gICAgICovXG4gICAgdW5iaW5kQ29tcG9uZW50KGxvYWRlZENvbXBvbmVudDogTG9hZGVkQ29tcG9uZW50KSB7XG4gICAgICAgIGlmICghIWxvYWRlZENvbXBvbmVudC5zdWJzY3JpcHRpb25zKSB7XG4gICAgICAgICAgICBsb2FkZWRDb21wb25lbnQuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgbG9hZGVkQ29tcG9uZW50LnN1YnNjcmlwdGlvbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEeW5hbWljYWxseSBsb2FkIGEgY29tcG9uZW50IGZyb20gaXRzIHR5cGUuIFRoZSBjb21wb25lbnQncyBpbnB1dHMgYW5kIG91dHB1dHMgd2lsbCBiZSBpbml0aWFsaXplZFxuICAgICAqIGJ5IGNhbGxpbmcge0BsaW5rICNiaW5kQ29tcG9uZW50fS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIFRoZSBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIGNvbXBvbmVudCB0byBsb2FkIGFuZCBpdHMgaW5wdXRzIGFuZCBvdXRwdXRzXG4gICAgICogQHBhcmFtIHZpZXdDb250YWluZXJSZWYgU3BlY2lmaWVzIHdoZXJlIHRoZSBsb2FkZWQgY29tcG9uZW50IHNob3VsZCBiZSBhdHRhY2hlZC4gSWYgbm90IHNwZWNpZmllZCB0aGVuIHRoZVxuICAgICAqIGxvYWRlZCBjb21wb25lbnQgaXMgaW5zZXJ0ZWQgYmVmb3JlIHRoZSBhcHBsaWNhdGlvbiBjb21wb25lbnRcbiAgICAgKiBAcGFyYW0gaW5qZWN0b3IgT3ZlcnJpZGVzIHRoZSBpbmplY3RvciB0byB1c2UgYXMgdGhlIHBhcmVudCBmb3IgdGhlIGNvbXBvbmVudC4gQnkgZGVmYXVsdCB0aGlzIHdpbGwgYmVcbiAgICAgKiB0aGUgaW5qZWN0b3IgaGVsZCBvbiB0aGUgYHZpZXdDb250YWluZXJSZWZgXG4gICAgICovXG4gICAgbG9hZENvbXBvbmVudDxUPihvcHRpb25zOiBMb2FkQ29tcG9uZW50T3B0aW9ucywgdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWYsIGluamVjdG9yPzogSW5qZWN0b3IpOiBMb2FkZWRDb21wb25lbnQge1xuICAgICAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD47XG4gICAgICAgIGxldCBmYWN0b3J5ID0gdGhpcy5mYWN0b3JpZXMuZ2V0KG9wdGlvbnMuY29tcG9uZW50KTtcbiAgICAgICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICAgICAgICBmYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnkob3B0aW9ucy5jb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmlld0NvbnRhaW5lclJlZikge1xuICAgICAgICAgICAgY29uc3QgYXBwRWxlbWVudDogRWxlbWVudCA9IHRoaXMuYXBwbGljYXRpb25SZWYuY29tcG9uZW50c1swXS5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgaW5qZWN0b3IxID0gdGhpcy5hcHBsaWNhdGlvblJlZi5jb21wb25lbnRzWzBdLmluamVjdG9yO1xuICAgICAgICAgICAgY29tcG9uZW50UmVmID0gZmFjdG9yeS5jcmVhdGUoaW5qZWN0b3IxLCBbW2FwcEVsZW1lbnRdXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgICAgIGlmIChhcHBFbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBhcHBFbGVtZW50LnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCBhcHBFbGVtZW50Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghaW5qZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBpbmplY3RvciA9IHZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICFVdGlscy5pc0VtcHR5KG9wdGlvbnMuaW5kZXgpID8gb3B0aW9ucy5pbmRleCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIGluZGV4LCBpbmplY3RvciwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvYWRlZENvbXBvbmVudDogTG9hZGVkQ29tcG9uZW50ID0ge1xuICAgICAgICAgICAgY29tcG9uZW50UmVmXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2JpbmRDb21wb25lbnQob3B0aW9ucywgbG9hZGVkQ29tcG9uZW50LCB0cnVlKTtcbiAgICAgICAgbG9hZGVkQ29tcG9uZW50LmNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHJldHVybiBsb2FkZWRDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVW5sb2FkIGEgZHluYW1pY2FsbHkgbG9hZGVkIGNvbXBvbmVudC4gSXQgaXMgdW5ib3VuZCBwcmlvciB0byBiZWluZyBkZXN0cm95ZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21wb25lbnQgQSBsb2FkZWQgY29tcG9uZW50XG4gICAgICovXG4gICAgdW5sb2FkQ29tcG9uZW50KGNvbXBvbmVudDogTG9hZGVkQ29tcG9uZW50KSB7XG4gICAgICAgIGlmICghIWNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy51bmJpbmRDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19