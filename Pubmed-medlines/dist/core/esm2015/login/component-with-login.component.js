import { Component } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./login.service";
/**
 * A utility base class to assist main components in the handling of the login state of the
 * the application. It initiates the login process and sets `loginComplete` accordingly
 * whenever the login state changes
 */
export class ComponentWithLogin {
    constructor(loginService, changeDetectorRef) {
        this.loginService = loginService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * A method called whenever the `session-changed` event is received. This can be
     * overridden by the subclassing component.
     */
    onLoginComplete() {
    }
    /**
     * Subscribes to the [LoginService.events]{@link LoginService#events} and sets
     * the `loginComplete` member whenever the `session-changed` event is received
     */
    ngOnInit() {
        this.loginComplete = this.loginService.complete;
        this.loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.loginComplete = this.loginService.complete;
                this.onLoginComplete();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }
    /**
     * Initiates the login process by calling [LoginService.login]{@link LoginService#login}
     */
    ngAfterViewInit() {
        this.loginService.login();
    }
}
ComponentWithLogin.ɵfac = function ComponentWithLogin_Factory(t) { return new (t || ComponentWithLogin)(i0.ɵɵdirectiveInject(i1.LoginService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
ComponentWithLogin.ɵcmp = i0.ɵɵdefineComponent({ type: ComponentWithLogin, selectors: [["ng-component"]], decls: 0, vars: 0, template: function ComponentWithLogin_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ComponentWithLogin, [{
        type: Component,
        args: [{
                template: ''
            }]
    }], function () { return [{ type: i1.LoginService }, { type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXdpdGgtbG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbG9naW4vIiwic291cmNlcyI6WyJjb21wb25lbnQtd2l0aC1sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBc0QsTUFBTSxlQUFlLENBQUM7OztBQUk3Rjs7OztHQUlHO0FBSUgsTUFBTSxPQUFPLGtCQUFrQjtJQU8zQixZQUNjLFlBQTBCLEVBQzFCLGlCQUFvQztRQURwQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO0lBQ2xELENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO1FBQ2hELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN6QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7b0ZBM0NRLGtCQUFrQjt1REFBbEIsa0JBQWtCO2tEQUFsQixrQkFBa0I7Y0FIOUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxFQUFFO2FBQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0xvZ2luU2VydmljZX0gZnJvbSBcIi4vbG9naW4uc2VydmljZVwiO1xuXG4vKipcbiAqIEEgdXRpbGl0eSBiYXNlIGNsYXNzIHRvIGFzc2lzdCBtYWluIGNvbXBvbmVudHMgaW4gdGhlIGhhbmRsaW5nIG9mIHRoZSBsb2dpbiBzdGF0ZSBvZiB0aGVcbiAqIHRoZSBhcHBsaWNhdGlvbi4gSXQgaW5pdGlhdGVzIHRoZSBsb2dpbiBwcm9jZXNzIGFuZCBzZXRzIGBsb2dpbkNvbXBsZXRlYCBhY2NvcmRpbmdseVxuICogd2hlbmV2ZXIgdGhlIGxvZ2luIHN0YXRlIGNoYW5nZXNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgdGVtcGxhdGU6ICcnXG59KVxuZXhwb3J0IGNsYXNzIENvbXBvbmVudFdpdGhMb2dpbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgICBwcm90ZWN0ZWQgbG9naW5TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICAvKipcbiAgICAgKiBgdHJ1ZWAgaWYgdGhlIGFwcGxpY2F0aW9uIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gc3VjY2Vzc2Z1bGx5XG4gICAgICovXG4gICAgbG9naW5Db21wbGV0ZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcm90ZWN0ZWQgbG9naW5TZXJ2aWNlOiBMb2dpblNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBIG1ldGhvZCBjYWxsZWQgd2hlbmV2ZXIgdGhlIGBzZXNzaW9uLWNoYW5nZWRgIGV2ZW50IGlzIHJlY2VpdmVkLiBUaGlzIGNhbiBiZVxuICAgICAqIG92ZXJyaWRkZW4gYnkgdGhlIHN1YmNsYXNzaW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBvbkxvZ2luQ29tcGxldGUoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgW0xvZ2luU2VydmljZS5ldmVudHNde0BsaW5rIExvZ2luU2VydmljZSNldmVudHN9IGFuZCBzZXRzXG4gICAgICogdGhlIGBsb2dpbkNvbXBsZXRlYCBtZW1iZXIgd2hlbmV2ZXIgdGhlIGBzZXNzaW9uLWNoYW5nZWRgIGV2ZW50IGlzIHJlY2VpdmVkXG4gICAgICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9naW5Db21wbGV0ZSA9IHRoaXMubG9naW5TZXJ2aWNlLmNvbXBsZXRlO1xuICAgICAgICB0aGlzLmxvZ2luU3Vic2NyaXB0aW9uID0gdGhpcy5sb2dpblNlcnZpY2UuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gXCJzZXNzaW9uLWNoYW5nZWRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMubG9naW5Db21wbGV0ZSA9IHRoaXMubG9naW5TZXJ2aWNlLmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2dpbkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubG9naW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWF0ZXMgdGhlIGxvZ2luIHByb2Nlc3MgYnkgY2FsbGluZyBbTG9naW5TZXJ2aWNlLmxvZ2luXXtAbGluayBMb2dpblNlcnZpY2UjbG9naW59XG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmxvZ2luU2VydmljZS5sb2dpbigpO1xuICAgIH1cbn1cbiJdfQ==