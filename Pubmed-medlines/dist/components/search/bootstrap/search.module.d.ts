import { ModuleWithProviders } from "@angular/core";
import { SearchOptions } from "../search.service";
import * as i0 from "@angular/core";
import * as i1 from "./did-you-mean/did-you-mean";
import * as i2 from "./breadcrumbs/breadcrumbs";
import * as i3 from "./pager/pager";
import * as i4 from "./page-size-selector/page-size-selector";
import * as i5 from "./sort-selector/sort-selector";
import * as i6 from "./tabs/tabs";
import * as i7 from "./loading-bar/loading-bar";
import * as i8 from "./scroller/scroller";
import * as i9 from "./load-more/load-more";
import * as i10 from "@angular/common";
import * as i11 from "@angular/forms";
import * as i12 from "@sinequa/core/web-services";
import * as i13 from "@sinequa/core/intl";
import * as i14 from "@sinequa/core/login";
import * as i15 from "@sinequa/components/utils";
import * as i16 from "@sinequa/components/action";
export declare class BsSearchModule {
    static forRoot(searchOptions: SearchOptions): ModuleWithProviders<BsSearchModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<BsSearchModule, [typeof i1.BsDidYouMean, typeof i2.BsBreadcrumbs, typeof i3.BsPager, typeof i4.BsPageSizeSelector, typeof i5.BsSortSelector, typeof i6.BsTabs, typeof i7.BsLoadingBar, typeof i8.BsScroller, typeof i9.BsLoadMore], [typeof i10.CommonModule, typeof i11.FormsModule, typeof i11.ReactiveFormsModule, typeof i12.WebServicesModule, typeof i13.IntlModule, typeof i14.LoginModule, typeof i15.UtilsModule, typeof i16.BsActionModule], [typeof i1.BsDidYouMean, typeof i2.BsBreadcrumbs, typeof i3.BsPager, typeof i4.BsPageSizeSelector, typeof i5.BsSortSelector, typeof i6.BsTabs, typeof i7.BsLoadingBar, typeof i8.BsScroller, typeof i9.BsLoadMore]>;
    static ɵinj: i0.ɵɵInjectorDef<BsSearchModule>;
}
//# sourceMappingURL=search.module.d.ts.map