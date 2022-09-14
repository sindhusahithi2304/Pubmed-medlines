import { NgModule, Injectable, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2UiAuthModule, /*IPartialConfigOptions,*/ CONFIG_OPTIONS, OauthService, PopupService } from "ng2-ui-auth";
import { A11yModule } from "@angular/cdk/a11y";
import { OverlayModule } from "@angular/cdk/overlay";
import { AuthenticationOauthService } from "./authentication-oauth.service";
import { AuthenticationPopupService } from "./authentication-popup.service";
// Sinequa modules
import { BaseModule } from "@sinequa/core/base";
import { WebServicesModule, START_CONFIG } from "@sinequa/core/web-services";
import { ValidationModule } from "@sinequa/core/validation";
import { IntlModule } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";
import { NotificationModule } from "@sinequa/core/notification";
import { AppUtilsModule } from "@sinequa/core/app-utils";
// Login
import { MODAL_LOGIN } from "./login.service";
import { Login } from "./login.component";
import { LOGIN_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
import * as i1 from "ng2-ui-auth";
import * as i2 from "@sinequa/core/modal";
/**
 * Configuration for the ng2-ui-auth library
 */
export class AuthConfig {
    constructor(startConfig) {
        this.storageType = "memory";
        this.providers = startConfig.providers || {};
    }
}
AuthConfig.ɵfac = function AuthConfig_Factory(t) { return new (t || AuthConfig)(i0.ɵɵinject(START_CONFIG)); };
AuthConfig.ɵprov = i0.ɵɵdefineInjectable({ token: AuthConfig, factory: AuthConfig.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AuthConfig, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();
/**
 * This module provides support for user authentication in the {@link AuthenticationService}. This authentication can be
 * automatic (OAuth/SAML), if configured in the Sinequa administration, or manual where the user name and password are
 * entered in a modal dialog box and transmitted in clear text. There is also support for the ng2-ui-auth library where the
 * authentication process occurs in a browser popup window. Authentication is instigated by the handling of HTTP 401 errors
 * in an `HttpInterceptor` so all web service calls requiring authentication are automatically protected. This module will
 * not be used for authentication when the web server is configured for Windows authentication.
 *
 * A higher level {@link LoginService} groups the successful retrieval of the current `application configuration` ({@link AppService}),
 * `principal` ({@link PrincipalWebService}), and `user settings` ({@link UserSettingsWebService}) all of which require the user
 * to be authenticated. This can be used as a "gatekeeper" to protect access to the main, often routed, component(s).
 *
 * The {@link LoginInterceptor} in this module must be registered using `HTTP_INTERCEPTORS` in your app module.
 */
export class LoginModule {
    static forRoot(loginModal = Login) {
        return {
            ngModule: LoginModule,
            providers: [
                // Login
                { provide: MODAL_LOGIN, useValue: loginModal },
            ]
        };
    }
}
LoginModule.ɵmod = i0.ɵɵdefineNgModule({ type: LoginModule });
LoginModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LoginModule_Factory(t) { return new (t || LoginModule)(); }, providers: [
        // Auth module dependencies
        { provide: CONFIG_OPTIONS, useClass: AuthConfig },
        { provide: OauthService, useExisting: AuthenticationOauthService },
        { provide: PopupService, useExisting: AuthenticationPopupService },
        ...LOGIN_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            Ng2UiAuthModule.forRoot(undefined, false),
            ModalModule.forRoot(),
            // CDK
            OverlayModule,
            A11yModule,
            // Sinequa modules
            BaseModule,
            AppUtilsModule,
            WebServicesModule,
            IntlModule,
            ValidationModule,
            NotificationModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LoginModule, { declarations: [Login], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, i1.Ng2UiAuthModule, i2.ModalModule, 
        // CDK
        OverlayModule,
        A11yModule,
        // Sinequa modules
        BaseModule,
        AppUtilsModule,
        WebServicesModule,
        IntlModule,
        ValidationModule,
        NotificationModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LoginModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    Ng2UiAuthModule.forRoot(undefined, false),
                    ModalModule.forRoot(),
                    // CDK
                    OverlayModule,
                    A11yModule,
                    // Sinequa modules
                    BaseModule,
                    AppUtilsModule,
                    WebServicesModule,
                    IntlModule,
                    ValidationModule,
                    NotificationModule
                ],
                declarations: [
                    Login,
                ],
                exports: [],
                providers: [
                    // Auth module dependencies
                    { provide: CONFIG_OPTIONS, useClass: AuthConfig },
                    { provide: OauthService, useExisting: AuthenticationOauthService },
                    { provide: PopupService, useExisting: AuthenticationPopupService },
                    ...LOGIN_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvbG9naW4vIiwic291cmNlcyI6WyJsb2dpbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxlQUFlLEVBQUUsMEJBQTBCLENBQUMsY0FBYyxFQUEyQixZQUFZLEVBQUUsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzVJLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDMUUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFFMUUsa0JBQWtCO0FBQ2xCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFDeEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsUUFBUTtB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QkFDNUI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIEluamVjdGFibGUsIEluamVjdCwgTW9kdWxlV2l0aFByb3ZpZGVycywgVHlwZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHtOZzJVaUF1dGhNb2R1bGUsIC8qSVBhcnRpYWxDb25maWdPcHRpb25zLCovIENPTkZJR19PUFRJT05TLCBJUHJvdmlkZXJzLCBTdG9yYWdlVHlwZSwgT2F1dGhTZXJ2aWNlLCBQb3B1cFNlcnZpY2V9IGZyb20gXCJuZzItdWktYXV0aFwiO1xuaW1wb3J0IHtBMTF5TW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY2RrL2ExMXlcIjtcbmltcG9ydCB7T3ZlcmxheU1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Nkay9vdmVybGF5XCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uT2F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9hdXRoZW50aWNhdGlvbi1vYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uUG9wdXBTZXJ2aWNlfSBmcm9tIFwiLi9hdXRoZW50aWNhdGlvbi1wb3B1cC5zZXJ2aWNlXCI7XG5cbi8vIFNpbmVxdWEgbW9kdWxlc1xuaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge1dlYlNlcnZpY2VzTW9kdWxlLCBTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7VmFsaWRhdGlvbk1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvdmFsaWRhdGlvblwiO1xuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge01vZGFsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9tb2RhbFwiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb3JlL25vdGlmaWNhdGlvblwiO1xuaW1wb3J0IHtBcHBVdGlsc01vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYXBwLXV0aWxzXCI7XG5cbi8vIExvZ2luXG5pbXBvcnQge01PREFMX0xPR0lOfSBmcm9tIFwiLi9sb2dpbi5zZXJ2aWNlXCI7XG5pbXBvcnQge0xvZ2lufSBmcm9tIFwiLi9sb2dpbi5jb21wb25lbnRcIjtcblxuaW1wb3J0IHtMT0dJTl9NT0RVTEVfUFJPVklERVJTfSBmcm9tIFwiLi9tb2R1bGUucHJvdmlkZXJzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBhcnRpYWxDb25maWdPcHRpb25zIHt9IC8vIHVudGlsIGV4cG9ydCByZXN0b3JlZCB0byBuZzItdWktYXV0aEA5XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIG5nMi11aS1hdXRoIGxpYnJhcnlcbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46IFwicm9vdFwiXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhDb25maWcgaW1wbGVtZW50cyBJUGFydGlhbENvbmZpZ09wdGlvbnMge1xuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZTtcbiAgICBwcm92aWRlcnM6IElQcm92aWRlcnM7XG4gICAgY29uc3RydWN0b3IoQEluamVjdChTVEFSVF9DT05GSUcpIHN0YXJ0Q29uZmlnOiBTdGFydENvbmZpZykge1xuICAgICAgICB0aGlzLnN0b3JhZ2VUeXBlID0gXCJtZW1vcnlcIiBhcyBTdG9yYWdlVHlwZTtcbiAgICAgICAgdGhpcy5wcm92aWRlcnMgPSBzdGFydENvbmZpZy5wcm92aWRlcnMgfHwge307XG4gICAgfVxufVxuXG4vKipcbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIHN1cHBvcnQgZm9yIHVzZXIgYXV0aGVudGljYXRpb24gaW4gdGhlIHtAbGluayBBdXRoZW50aWNhdGlvblNlcnZpY2V9LiBUaGlzIGF1dGhlbnRpY2F0aW9uIGNhbiBiZVxuICogYXV0b21hdGljIChPQXV0aC9TQU1MKSwgaWYgY29uZmlndXJlZCBpbiB0aGUgU2luZXF1YSBhZG1pbmlzdHJhdGlvbiwgb3IgbWFudWFsIHdoZXJlIHRoZSB1c2VyIG5hbWUgYW5kIHBhc3N3b3JkIGFyZVxuICogZW50ZXJlZCBpbiBhIG1vZGFsIGRpYWxvZyBib3ggYW5kIHRyYW5zbWl0dGVkIGluIGNsZWFyIHRleHQuIFRoZXJlIGlzIGFsc28gc3VwcG9ydCBmb3IgdGhlIG5nMi11aS1hdXRoIGxpYnJhcnkgd2hlcmUgdGhlXG4gKiBhdXRoZW50aWNhdGlvbiBwcm9jZXNzIG9jY3VycyBpbiBhIGJyb3dzZXIgcG9wdXAgd2luZG93LiBBdXRoZW50aWNhdGlvbiBpcyBpbnN0aWdhdGVkIGJ5IHRoZSBoYW5kbGluZyBvZiBIVFRQIDQwMSBlcnJvcnNcbiAqIGluIGFuIGBIdHRwSW50ZXJjZXB0b3JgIHNvIGFsbCB3ZWIgc2VydmljZSBjYWxscyByZXF1aXJpbmcgYXV0aGVudGljYXRpb24gYXJlIGF1dG9tYXRpY2FsbHkgcHJvdGVjdGVkLiBUaGlzIG1vZHVsZSB3aWxsXG4gKiBub3QgYmUgdXNlZCBmb3IgYXV0aGVudGljYXRpb24gd2hlbiB0aGUgd2ViIHNlcnZlciBpcyBjb25maWd1cmVkIGZvciBXaW5kb3dzIGF1dGhlbnRpY2F0aW9uLlxuICpcbiAqIEEgaGlnaGVyIGxldmVsIHtAbGluayBMb2dpblNlcnZpY2V9IGdyb3VwcyB0aGUgc3VjY2Vzc2Z1bCByZXRyaWV2YWwgb2YgdGhlIGN1cnJlbnQgYGFwcGxpY2F0aW9uIGNvbmZpZ3VyYXRpb25gICh7QGxpbmsgQXBwU2VydmljZX0pLFxuICogYHByaW5jaXBhbGAgKHtAbGluayBQcmluY2lwYWxXZWJTZXJ2aWNlfSksIGFuZCBgdXNlciBzZXR0aW5nc2AgKHtAbGluayBVc2VyU2V0dGluZ3NXZWJTZXJ2aWNlfSkgYWxsIG9mIHdoaWNoIHJlcXVpcmUgdGhlIHVzZXJcbiAqIHRvIGJlIGF1dGhlbnRpY2F0ZWQuIFRoaXMgY2FuIGJlIHVzZWQgYXMgYSBcImdhdGVrZWVwZXJcIiB0byBwcm90ZWN0IGFjY2VzcyB0byB0aGUgbWFpbiwgb2Z0ZW4gcm91dGVkLCBjb21wb25lbnQocykuXG4gKlxuICogVGhlIHtAbGluayBMb2dpbkludGVyY2VwdG9yfSBpbiB0aGlzIG1vZHVsZSBtdXN0IGJlIHJlZ2lzdGVyZWQgdXNpbmcgYEhUVFBfSU5URVJDRVBUT1JTYCBpbiB5b3VyIGFwcCBtb2R1bGUuXG4gKi9cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgICAgIE5nMlVpQXV0aE1vZHVsZS5mb3JSb290KHVuZGVmaW5lZCwgZmFsc2UpLFxuICAgICAgICBNb2RhbE1vZHVsZS5mb3JSb290KCksXG5cbiAgICAgICAgLy8gQ0RLXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsIC8vIE5lZWRlZCBmb3IgdGhlIG1vZGFsIHNlcnZpY2VcbiAgICAgICAgQTExeU1vZHVsZSxcblxuICAgICAgICAvLyBTaW5lcXVhIG1vZHVsZXNcbiAgICAgICAgQmFzZU1vZHVsZSxcbiAgICAgICAgQXBwVXRpbHNNb2R1bGUsXG4gICAgICAgIFdlYlNlcnZpY2VzTW9kdWxlLCAgLy8gUmVxdWlyZWQgZm9yIHN0YXJ0LXVwIGNvbmZpZyAoU1RBUlRfQ09ORklHIHRva2VuKVxuICAgICAgICBJbnRsTW9kdWxlLFxuICAgICAgICBWYWxpZGF0aW9uTW9kdWxlLFxuICAgICAgICBOb3RpZmljYXRpb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMb2dpbiwgLy8gRGVmYXVsdCBMb2dpbiBjb21wb25lbnRzXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLy8gQXV0aCBtb2R1bGUgZGVwZW5kZW5jaWVzXG4gICAgICAgIHtwcm92aWRlOiBDT05GSUdfT1BUSU9OUywgdXNlQ2xhc3M6IEF1dGhDb25maWd9LFxuICAgICAgICB7cHJvdmlkZTogT2F1dGhTZXJ2aWNlLCB1c2VFeGlzdGluZzogQXV0aGVudGljYXRpb25PYXV0aFNlcnZpY2V9LFxuICAgICAgICB7cHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VFeGlzdGluZzogQXV0aGVudGljYXRpb25Qb3B1cFNlcnZpY2V9LFxuXG4gICAgICAgIC4uLkxPR0lOX01PRFVMRV9QUk9WSURFUlNcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChsb2dpbk1vZGFsOiBUeXBlPGFueT4gPSBMb2dpbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8TG9naW5Nb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBMb2dpbk1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIC8vIExvZ2luXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IE1PREFMX0xPR0lOLCB1c2VWYWx1ZTogbG9naW5Nb2RhbH0sXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19