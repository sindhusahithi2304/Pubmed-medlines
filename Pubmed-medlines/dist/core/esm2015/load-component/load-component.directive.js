import { Directive, Input, Output, EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./load-component.service";
/**
 * A directive that uses the {@link LoadComponentService} to dynamically load a component.
 * The loaded component's lifecycle is automatically managed with changes to the directive's
 * `options` reflected to the component by rebinding it using {@link LoadComponentService}
 */
export class LoadComponentDirective {
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
LoadComponentDirective.ɵfac = function LoadComponentDirective_Factory(t) { return new (t || LoadComponentDirective)(i0.ɵɵdirectiveInject(i1.LoadComponentService), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
LoadComponentDirective.ɵdir = i0.ɵɵdefineDirective({ type: LoadComponentDirective, selectors: [["", "sqLoadComponent", ""]], inputs: { options: ["sqLoadComponent", "options"] }, outputs: { eventEmitter: "sqLoadComponent" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LoadComponentDirective, [{
        type: Directive,
        args: [{
                selector: "[sqLoadComponent]"
            }]
    }], function () { return [{ type: i1.LoadComponentService }, { type: i0.ViewContainerRef }]; }, { options: [{
            type: Input,
            args: ["sqLoadComponent"]
        }], eventEmitter: [{
            type: Output,
            args: ["sqLoadComponent"]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1jb21wb25lbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbG9hZC1jb21wb25lbnQvIiwic291cmNlcyI6WyJsb2FkLWNvbXBvbmVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF3RCxZQUFZLEVBQU8sTUFBTSxlQUFlLENBQUM7OztBQUdqSTs7OztHQUlHO0FBSUgsTUFBTSxPQUFPLHNCQUFzQjtJQVkvQixZQUNZLG9CQUEwQyxFQUMxQyxnQkFBa0M7UUFEbEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVDlDOztXQUVHO1FBQ3dCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQXVELENBQUM7SUFPbEgsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1RSxPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQzs7NEZBakRRLHNCQUFzQjsyREFBdEIsc0JBQXNCO2tEQUF0QixzQkFBc0I7Y0FIbEMsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7YUFDaEM7c0dBSzZCLE9BQU87a0JBQWhDLEtBQUs7bUJBQUMsaUJBQWlCO1lBSUcsWUFBWTtrQkFBdEMsTUFBTTttQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudFJlZiwgRXZlbnRFbWl0dGVyLCBUeXBlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtMb2FkQ29tcG9uZW50U2VydmljZSwgTG9hZENvbXBvbmVudE9wdGlvbnMsIExvYWRlZENvbXBvbmVudH0gZnJvbSBcIi4vbG9hZC1jb21wb25lbnQuc2VydmljZVwiO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgdXNlcyB0aGUge0BsaW5rIExvYWRDb21wb25lbnRTZXJ2aWNlfSB0byBkeW5hbWljYWxseSBsb2FkIGEgY29tcG9uZW50LlxuICogVGhlIGxvYWRlZCBjb21wb25lbnQncyBsaWZlY3ljbGUgaXMgYXV0b21hdGljYWxseSBtYW5hZ2VkIHdpdGggY2hhbmdlcyB0byB0aGUgZGlyZWN0aXZlJ3NcbiAqIGBvcHRpb25zYCByZWZsZWN0ZWQgdG8gdGhlIGNvbXBvbmVudCBieSByZWJpbmRpbmcgaXQgdXNpbmcge0BsaW5rIExvYWRDb21wb25lbnRTZXJ2aWNlfVxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbc3FMb2FkQ29tcG9uZW50XVwiXG59KVxuZXhwb3J0IGNsYXNzIExvYWRDb21wb25lbnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgdGhlIGxvYWRpbmcgb2YgYSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBASW5wdXQoXCJzcUxvYWRDb21wb25lbnRcIikgb3B0aW9uczogTG9hZENvbXBvbmVudE9wdGlvbnM7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBlbWl0IGV2ZW50cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgY3JlYXRlZCBhbmQgZGVzdHJveWVkXG4gICAgICovXG4gICAgQE91dHB1dChcInNxTG9hZENvbXBvbmVudFwiKSBldmVudEVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPHtjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUeXBlPGFueT4+IHwgdW5kZWZpbmVkfT4oKTtcbiAgICBwcml2YXRlIGxvYWRlZENvbXBvbmVudDogTG9hZGVkQ29tcG9uZW50O1xuICAgIHByaXZhdGUgY3VycmVudENvbXBvbmVudDogVHlwZTxhbnk+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgbG9hZENvbXBvbmVudFNlcnZpY2U6IExvYWRDb21wb25lbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGFueSBjaGFuZ2VzIHRvIHRoZSBpbnB1dCBgb3B0aW9uc2AuIE9uIHRoZSBmaXJzdCBjYWxsIHRoZSBjb21wb25lbnQgaXMgbG9hZGVkXG4gICAgICogYW5kIGJvdW5kLiBTdWJzZXF1ZW50IGNoYW5nZXMgdG8gdGhlIGBvcHRpb25zYCBhcmUgaGFuZGxlZCBieSByZWJpbmRpbmcgdGhlIGNvbXBvbmVudCB1bmxlc3NcbiAgICAgKiB0aGUgY29tcG9uZW50IHR5cGUgdG8gbG9hZCBjaGFuZ2VzIGluIHdoaWNoIGNhc2UgdGhlIGN1cnJlbnQgY29tcG9uZW50IGlzIHVubG9hZGVkIGJlZm9yZVxuICAgICAqIGxvYWRpbmcgdGhlIG5ldyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBUaGUgY29tcG9uZW50IGlzIGxvYWRlZCB1c2luZyB0aGUgYFZpZXdDb250YWluZXJSZWZgIGFzc29jaWF0ZWQgd2l0aCB0aGUgZGlyZWN0aXZlXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmxvYWRlZENvbXBvbmVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudENvbXBvbmVudCA9PT0gdGhpcy5vcHRpb25zLmNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbXBvbmVudFNlcnZpY2UuYmluZENvbXBvbmVudCh0aGlzLm9wdGlvbnMsIHRoaXMubG9hZGVkQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWRDb21wb25lbnRTZXJ2aWNlLnVuYmluZENvbXBvbmVudCh0aGlzLmxvYWRlZENvbXBvbmVudCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZENvbXBvbmVudC5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCh7Y29tcG9uZW50UmVmOiB1bmRlZmluZWR9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRlZENvbXBvbmVudCA9IHRoaXMubG9hZENvbXBvbmVudFNlcnZpY2UubG9hZENvbXBvbmVudCh0aGlzLm9wdGlvbnMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuY3VycmVudENvbXBvbmVudCA9IHRoaXMub3B0aW9ucy5jb21wb25lbnQ7XG4gICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoe2NvbXBvbmVudFJlZjogISF0aGlzLmxvYWRlZENvbXBvbmVudCA/IHRoaXMubG9hZGVkQ29tcG9uZW50LmNvbXBvbmVudFJlZiA6IHVuZGVmaW5lZH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgdGhlIGxvYWRlZCBjb21wb25lbnQuIEl0IGlzIG5vdCBkZXN0cm95ZWQgaGVyZSBhcyBhbmd1bGFyIHdpbGwgYXV0b21hdGljYWxseSBkZXN0cm95XG4gICAgICogdGhlIGNvbXBvbmVudCBhdCB0aGUgc2FtZSB0aW1lIGFzIHRoaXMgZGlyZWN0aXZlIGlzIGRlc3Ryb3llZCBhcyB0aGV5IHNoYXJlIHRoZSBzYW1lIGBWaWV3Q29udGFpbmVyUmVmYFxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5sb2FkZWRDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZENvbXBvbmVudFNlcnZpY2UudW5iaW5kQ29tcG9uZW50KHRoaXMubG9hZGVkQ29tcG9uZW50KTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbWl0dGVyLmVtaXQoe2NvbXBvbmVudFJlZjogdW5kZWZpbmVkfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=