import { ModuleWithProviders, Type } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./confirm.component";
import * as i2 from "./prompt.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/cdk/overlay";
import * as i6 from "@angular/cdk/a11y";
import * as i7 from "@sinequa/core/base";
import * as i8 from "@sinequa/core/intl";
import * as i9 from "@sinequa/core/validation";
/**
 * This module contains an implementation of a [modal dialog service]{@link ModalService} which can be extended
 * to support UI frameworks such as Bootstrap and Material Design. It uses the `Overlay` and `Portal` funcionality
 * provided by the [Angular CDK]{@link https://material.angular.io/cdk/categories} library.
 */
export declare class ModalModule {
    static forRoot(confirmModal?: Type<any>, promptModal?: Type<any>): ModuleWithProviders<ModalModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<ModalModule, [typeof i1.Confirm, typeof i2.Prompt], [typeof i3.CommonModule, typeof i4.FormsModule, typeof i4.ReactiveFormsModule, typeof i5.OverlayModule, typeof i6.A11yModule, typeof i7.BaseModule, typeof i8.IntlModule, typeof i9.ValidationModule], never>;
    static ɵinj: i0.ɵɵInjectorDef<ModalModule>;
}
//# sourceMappingURL=modal.module.d.ts.map