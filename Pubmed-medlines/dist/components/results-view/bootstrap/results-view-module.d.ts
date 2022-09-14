import { ModuleWithProviders } from "@angular/core";
import { ResultsView } from "../results-view.service";
import * as i0 from "@angular/core";
import * as i1 from "./results-view-selector/results-view-selector";
import * as i2 from "./results-grid-view/results-grid-view";
import * as i3 from "@angular/common";
import * as i4 from "@sinequa/core/load-component";
import * as i5 from "@sinequa/core/intl";
import * as i6 from "@sinequa/core/validation";
import * as i7 from "@sinequa/components/utils";
import * as i8 from "@sinequa/components/action";
import * as i9 from "@sinequa/components/selection";
export declare class BsResultsViewModule {
    static forRoot(resultsViews: ResultsView[], defaultView: ResultsView): ModuleWithProviders<BsResultsViewModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<BsResultsViewModule, [typeof i1.BsResultsViewSelector, typeof i2.BsResultsGridView], [typeof i3.CommonModule, typeof i4.LoadComponentModule, typeof i5.IntlModule, typeof i6.ValidationModule, typeof i7.UtilsModule, typeof i8.BsActionModule, typeof i9.BsSelectionModule], [typeof i1.BsResultsViewSelector, typeof i2.BsResultsGridView]>;
    static ɵinj: i0.ɵɵInjectorDef<BsResultsViewModule>;
}
//# sourceMappingURL=results-view-module.d.ts.map