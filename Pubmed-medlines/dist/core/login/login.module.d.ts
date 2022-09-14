import { ModuleWithProviders, Type } from "@angular/core";
import { IProviders, StorageType } from "ng2-ui-auth";
import { StartConfig } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "./login.component";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "ng2-ui-auth";
import * as i5 from "@sinequa/core/modal";
import * as i6 from "@angular/cdk/overlay";
import * as i7 from "@angular/cdk/a11y";
import * as i8 from "@sinequa/core/base";
import * as i9 from "@sinequa/core/app-utils";
import * as i10 from "@sinequa/core/web-services";
import * as i11 from "@sinequa/core/intl";
import * as i12 from "@sinequa/core/validation";
import * as i13 from "@sinequa/core/notification";
export interface IPartialConfigOptions {
}
/**
 * Configuration for the ng2-ui-auth library
 */
export declare class AuthConfig implements IPartialConfigOptions {
    storageType: StorageType;
    providers: IProviders;
    constructor(startConfig: StartConfig);
    static ɵfac: i0.ɵɵFactoryDef<AuthConfig, never>;
    static ɵprov: i0.ɵɵInjectableDef<AuthConfig>;
}
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
export declare class LoginModule {
    static forRoot(loginModal?: Type<any>): ModuleWithProviders<LoginModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<LoginModule, [typeof i1.Login], [typeof i2.CommonModule, typeof i3.FormsModule, typeof i3.ReactiveFormsModule, typeof i4.Ng2UiAuthModule, typeof i5.ModalModule, typeof i6.OverlayModule, typeof i7.A11yModule, typeof i8.BaseModule, typeof i9.AppUtilsModule, typeof i10.WebServicesModule, typeof i11.IntlModule, typeof i12.ValidationModule, typeof i13.NotificationModule], never>;
    static ɵinj: i0.ɵɵInjectorDef<LoginModule>;
}
//# sourceMappingURL=login.module.d.ts.map