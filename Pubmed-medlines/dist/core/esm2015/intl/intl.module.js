import { NgModule, APP_INITIALIZER } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseModule } from "@sinequa/core/base";
import { IntlService, LOCALES_CONFIG } from "./intl.service";
import { MessagePipe } from "./message.pipe";
import { INTL_MODULE_PROVIDERS } from "./module.providers";
import * as i0 from "@angular/core";
/**
 * An APP_INITIALIZER factory function for initialising the {@link IntlService} before any UI is displayed
 */
export function IntlInitializer(intlService) {
    const init = () => intlService.init().toPromise();
    return init;
}
/**
 * This module contains core internationalization functionality for the formatting of numbers, dates and strings.
 * It is based on the industry standard
 * [Intl]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl} API
 * and an implementation of the ICU Message syntax provided by [FormatJS]{@link https://formatjs.io/}.
 *
 * The module provides mechanisms for the definition and loading of locales which can be extended with library specific
 * locale information. By default, locales contain support for `Moment.js` and `D3.js`.
 *
 * The module can be initialized by importing it using the `forRoot` static method or otherwise providing the
 * {@link LOCALES_CONFIG} injection token
 */
export class IntlModule {
    static forRoot(localeConfig) {
        return {
            ngModule: IntlModule,
            providers: [
                { provide: LOCALES_CONFIG, useClass: localeConfig },
            ]
        };
    }
}
IntlModule.ɵmod = i0.ɵɵdefineNgModule({ type: IntlModule });
IntlModule.ɵinj = i0.ɵɵdefineInjector({ factory: function IntlModule_Factory(t) { return new (t || IntlModule)(); }, providers: [
        { provide: APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true },
        ...INTL_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            BaseModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(IntlModule, { declarations: [MessagePipe], imports: [CommonModule,
        BaseModule], exports: [MessagePipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(IntlModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BaseModule
                ],
                declarations: [
                    MessagePipe
                ],
                exports: [
                    MessagePipe
                ],
                providers: [
                    { provide: APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true },
                    ...INTL_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50bC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9pbnRsLyIsInNvdXJjZXMiOlsiaW50bC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxFQUFDLFdBQVcsRUFBRSxjQUFjLEVBQWdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDOztBQUV6RDs7R0FFRztBQUNILE1BQU0sVUFBVSxlQUFlLENBQUMsV0FBd0I7SUFDcEQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7R0FXRztBQWlCSCxNQUFNLE9BQU8sVUFBVTtJQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQWlDO1FBQzVDLE9BQU87WUFDSCxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUU7Z0JBQ1AsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUM7YUFDcEQ7U0FDSixDQUFDO0lBQ04sQ0FBQzs7OENBUlEsVUFBVTttR0FBVixVQUFVLG1CQUxSO1FBQ1AsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUN6RixHQUFHLHFCQUFxQjtLQUMzQixZQWJRO1lBQ0wsWUFBWTtZQUNaLFVBQVU7U0FDYjt3RkFZUSxVQUFVLG1CQVZmLFdBQVcsYUFKWCxZQUFZO1FBQ1osVUFBVSxhQU1WLFdBQVc7a0RBT04sVUFBVTtjQWhCdEIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFdBQVc7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFdBQVc7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQ3pGLEdBQUcscUJBQXFCO2lCQUMzQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgQVBQX0lOSVRJQUxJWkVSLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBUeXBlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5cbmltcG9ydCB7SW50bFNlcnZpY2UsIExPQ0FMRVNfQ09ORklHLCBMb2NhbGVzQ29uZmlnfSBmcm9tIFwiLi9pbnRsLnNlcnZpY2VcIjtcbmltcG9ydCB7TWVzc2FnZVBpcGV9IGZyb20gXCIuL21lc3NhZ2UucGlwZVwiO1xuaW1wb3J0IHtJTlRMX01PRFVMRV9QUk9WSURFUlN9IGZyb20gXCIuL21vZHVsZS5wcm92aWRlcnNcIjtcblxuLyoqXG4gKiBBbiBBUFBfSU5JVElBTElaRVIgZmFjdG9yeSBmdW5jdGlvbiBmb3IgaW5pdGlhbGlzaW5nIHRoZSB7QGxpbmsgSW50bFNlcnZpY2V9IGJlZm9yZSBhbnkgVUkgaXMgZGlzcGxheWVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBJbnRsSW5pdGlhbGl6ZXIoaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlKTogKCkgPT4gUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBpbml0ID0gKCkgPT4gaW50bFNlcnZpY2UuaW5pdCgpLnRvUHJvbWlzZSgpO1xuICAgIHJldHVybiBpbml0O1xufVxuXG4vKipcbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIGNvcmUgaW50ZXJuYXRpb25hbGl6YXRpb24gZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGZvcm1hdHRpbmcgb2YgbnVtYmVycywgZGF0ZXMgYW5kIHN0cmluZ3MuXG4gKiBJdCBpcyBiYXNlZCBvbiB0aGUgaW5kdXN0cnkgc3RhbmRhcmRcbiAqIFtJbnRsXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsfSBBUElcbiAqIGFuZCBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgSUNVIE1lc3NhZ2Ugc3ludGF4IHByb3ZpZGVkIGJ5IFtGb3JtYXRKU117QGxpbmsgaHR0cHM6Ly9mb3JtYXRqcy5pby99LlxuICpcbiAqIFRoZSBtb2R1bGUgcHJvdmlkZXMgbWVjaGFuaXNtcyBmb3IgdGhlIGRlZmluaXRpb24gYW5kIGxvYWRpbmcgb2YgbG9jYWxlcyB3aGljaCBjYW4gYmUgZXh0ZW5kZWQgd2l0aCBsaWJyYXJ5IHNwZWNpZmljXG4gKiBsb2NhbGUgaW5mb3JtYXRpb24uIEJ5IGRlZmF1bHQsIGxvY2FsZXMgY29udGFpbiBzdXBwb3J0IGZvciBgTW9tZW50LmpzYCBhbmQgYEQzLmpzYC5cbiAqXG4gKiBUaGUgbW9kdWxlIGNhbiBiZSBpbml0aWFsaXplZCBieSBpbXBvcnRpbmcgaXQgdXNpbmcgdGhlIGBmb3JSb290YCBzdGF0aWMgbWV0aG9kIG9yIG90aGVyd2lzZSBwcm92aWRpbmcgdGhlXG4gKiB7QGxpbmsgTE9DQUxFU19DT05GSUd9IGluamVjdGlvbiB0b2tlblxuICovXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCYXNlTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWVzc2FnZVBpcGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWVzc2FnZVBpcGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLCB1c2VGYWN0b3J5OiBJbnRsSW5pdGlhbGl6ZXIsIGRlcHM6IFtJbnRsU2VydmljZV0sIG11bHRpOiB0cnVlfSxcbiAgICAgICAgLi4uSU5UTF9NT0RVTEVfUFJPVklERVJTXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBJbnRsTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChsb2NhbGVDb25maWc6IFR5cGU8TG9jYWxlc0NvbmZpZz4pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEludGxNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBJbnRsTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge3Byb3ZpZGU6IExPQ0FMRVNfQ09ORklHLCB1c2VDbGFzczogbG9jYWxlQ29uZmlnfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=