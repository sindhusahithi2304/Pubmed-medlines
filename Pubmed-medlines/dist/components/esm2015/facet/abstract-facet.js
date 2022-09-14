import { Component, Output, TemplateRef, EventEmitter, ViewChild } from "@angular/core";
import * as i0 from "@angular/core";
const _c0 = ["settingsTpl"];
const _c1 = ["headerTpl"];
const _c2 = ["subHeaderTpl"];
const _c3 = ["footerTpl"];
/**
 * This interface should be implemented by facet components, which expose
 * a list of actions and event listeners
 */
export class AbstractFacet {
    constructor() {
        /**
         * Event emitter triggered when the list of action changes
         */
        this.actionsChanged = new EventEmitter();
    }
    /**
     * List of custom actions of this facet
     */
    get actions() { return []; }
    /**
     * Method called when a facet is collapsed
     */
    onCollapse(collapsed) { }
    /**
     * Method called when a facet is resized via an action (not accounting for window resizing)
     */
    onExpand(expanded) { }
    /**
     * Method called when the settings of this facet are opened
     */
    onOpenSettings(settingsOpened) { }
    /**
     * Method enabling the facet component to be hidden (if, for example there is no data to display)
     */
    isHidden() {
        return false;
    }
}
AbstractFacet.ɵfac = function AbstractFacet_Factory(t) { return new (t || AbstractFacet)(); };
AbstractFacet.ɵcmp = i0.ɵɵdefineComponent({ type: AbstractFacet, selectors: [["ng-component"]], viewQuery: function AbstractFacet_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵstaticViewQuery(_c0, true, TemplateRef);
        i0.ɵɵstaticViewQuery(_c1, true, TemplateRef);
        i0.ɵɵstaticViewQuery(_c2, true, TemplateRef);
        i0.ɵɵstaticViewQuery(_c3, true, TemplateRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.settingsTpl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.headerTpl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.subHeaderTpl = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.footerTpl = _t.first);
    } }, outputs: { actionsChanged: "actionsChanged" }, decls: 0, vars: 0, template: function AbstractFacet_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AbstractFacet, [{
        type: Component,
        args: [{
                template: ""
            }]
    }], null, { actionsChanged: [{
            type: Output
        }], settingsTpl: [{
            type: ViewChild,
            args: ["settingsTpl", { static: true, read: TemplateRef }]
        }], headerTpl: [{
            type: ViewChild,
            args: ["headerTpl", { static: true, read: TemplateRef }]
        }], subHeaderTpl: [{
            type: ViewChild,
            args: ["subHeaderTpl", { static: true, read: TemplateRef }]
        }], footerTpl: [{
            type: ViewChild,
            args: ["footerTpl", { static: true, read: TemplateRef }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZmFjZXQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9mYWNldC8iLCJzb3VyY2VzIjpbImFic3RyYWN0LWZhY2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFHdEY7OztHQUdHO0FBSUgsTUFBTSxPQUFnQixhQUFhO0lBSG5DO1FBVUk7O1dBRUc7UUFDYyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFZLENBQUM7S0E0Q2xFO0lBcERHOztPQUVHO0lBQ0gsSUFBVyxPQUFPLEtBQWUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBMkI3Qzs7T0FFRztJQUNJLFVBQVUsQ0FBQyxTQUFrQixJQUFFLENBQUM7SUFFdkM7O09BRUc7SUFDSSxRQUFRLENBQUMsUUFBaUIsSUFBRSxDQUFDO0lBRXBDOztPQUVHO0lBQ0ksY0FBYyxDQUFDLGNBQXVCLElBQUUsQ0FBQztJQUVoRDs7T0FFRztJQUNJLFFBQVE7UUFDWCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzswRUFwRGlCLGFBQWE7a0RBQWIsYUFBYTt3Q0FlZ0IsV0FBVzt3Q0FLYixXQUFXO3dDQUtSLFdBQVc7d0NBS2QsV0FBVzs7Ozs7Ozs7a0RBOUJ0QyxhQUFhO2NBSGxDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsRUFBRTthQUNmO2dCQVdvQixjQUFjO2tCQUE5QixNQUFNO1lBSzZELFdBQVc7a0JBQTlFLFNBQVM7bUJBQUMsYUFBYSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDO1lBS08sU0FBUztrQkFBMUUsU0FBUzttQkFBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUM7WUFLWSxZQUFZO2tCQUFoRixTQUFTO21CQUFDLGNBQWMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztZQUtNLFNBQVM7a0JBQTFFLFNBQVM7bUJBQUMsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtBY3Rpb259IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuXG4vKipcbiAqIFRoaXMgaW50ZXJmYWNlIHNob3VsZCBiZSBpbXBsZW1lbnRlZCBieSBmYWNldCBjb21wb25lbnRzLCB3aGljaCBleHBvc2VcbiAqIGEgbGlzdCBvZiBhY3Rpb25zIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6IFwiXCJcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGYWNldCB7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IG9mIGN1c3RvbSBhY3Rpb25zIG9mIHRoaXMgZmFjZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10geyByZXR1cm4gW107IH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGVtaXR0ZXIgdHJpZ2dlcmVkIHdoZW4gdGhlIGxpc3Qgb2YgYWN0aW9uIGNoYW5nZXNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgcHVibGljIGFjdGlvbnNDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBY3Rpb25bXT4oKTtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGZvciB0aGUgc2V0dGluZ3MgZWRpdG9yIG9mIHRoaXMgZmFjZXQsIGlmIGFueVxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoXCJzZXR0aW5nc1RwbFwiLCB7c3RhdGljOiB0cnVlLCByZWFkOiBUZW1wbGF0ZVJlZn0pIHB1YmxpYyBzZXR0aW5nc1RwbD86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKipcbiAgICAgKiBUZW1wbGF0ZSBmb3IgaGVhZGVyIG9mIHRoaXMgZmFjZXQsIGlmIGFueVxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoXCJoZWFkZXJUcGxcIiwge3N0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWZ9KSBwdWJsaWMgaGVhZGVyVHBsPzogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGZvciBhIHN1Yi1oZWFkZXIgb2YgdGhpcyBmYWNldCwgaWYgYW55LiBUaGlzIGFwcGVhcnMgYmVsb3cgdGhlIGhlYWRlclxuICAgICAqL1xuICAgIEBWaWV3Q2hpbGQoXCJzdWJIZWFkZXJUcGxcIiwge3N0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWZ9KSBwdWJsaWMgc3ViSGVhZGVyVHBsPzogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIGZvciBmb290ZXIgb2YgdGhpcyBmYWNldCwgaWYgYW55XG4gICAgICovXG4gICAgQFZpZXdDaGlsZChcImZvb3RlclRwbFwiLCB7c3RhdGljOiB0cnVlLCByZWFkOiBUZW1wbGF0ZVJlZn0pIHB1YmxpYyBmb290ZXJUcGw/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGNhbGxlZCB3aGVuIGEgZmFjZXQgaXMgY29sbGFwc2VkXG4gICAgICovXG4gICAgcHVibGljIG9uQ29sbGFwc2UoY29sbGFwc2VkOiBib29sZWFuKXt9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gYSBmYWNldCBpcyByZXNpemVkIHZpYSBhbiBhY3Rpb24gKG5vdCBhY2NvdW50aW5nIGZvciB3aW5kb3cgcmVzaXppbmcpXG4gICAgICovXG4gICAgcHVibGljIG9uRXhwYW5kKGV4cGFuZGVkOiBib29sZWFuKXt9XG5cbiAgICAvKipcbiAgICAgKiBNZXRob2QgY2FsbGVkIHdoZW4gdGhlIHNldHRpbmdzIG9mIHRoaXMgZmFjZXQgYXJlIG9wZW5lZFxuICAgICAqL1xuICAgIHB1YmxpYyBvbk9wZW5TZXR0aW5ncyhzZXR0aW5nc09wZW5lZDogYm9vbGVhbil7fVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIGVuYWJsaW5nIHRoZSBmYWNldCBjb21wb25lbnQgdG8gYmUgaGlkZGVuIChpZiwgZm9yIGV4YW1wbGUgdGhlcmUgaXMgbm8gZGF0YSB0byBkaXNwbGF5KVxuICAgICAqL1xuICAgIHB1YmxpYyBpc0hpZGRlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufSJdfQ==