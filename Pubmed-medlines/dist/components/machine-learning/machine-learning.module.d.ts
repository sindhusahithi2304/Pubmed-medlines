import { MlAuditService } from "./ml-audit.service";
import * as i0 from "@angular/core";
import * as i1 from "./dwell-time.directive";
import * as i2 from "@angular/common";
import * as i3 from "@sinequa/components/search";
export declare function AppBootstrapListener(mlAuditService: MlAuditService): () => void;
export declare function HttpRequestListener(mlAuditService: MlAuditService): (request: import("@angular/common/http").HttpRequest<any>) => boolean;
export declare class MLModule {
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<MLModule, [typeof i1.DwellTime], [typeof i2.CommonModule, typeof i3.BsSearchModule], never>;
    static ɵinj: i0.ɵɵInjectorDef<MLModule>;
}
//# sourceMappingURL=machine-learning.module.d.ts.map