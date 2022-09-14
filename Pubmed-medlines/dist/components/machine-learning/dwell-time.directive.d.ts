import { OnInit, OnDestroy } from "@angular/core";
import { MlAuditService } from "./ml-audit.service";
import * as i0 from "@angular/core";
export interface DwellTimeOptions {
    actionType: MlAuditService.ActionType;
    docId: string;
}
export declare class DwellTime implements OnInit, OnDestroy {
    protected mlAuditService: MlAuditService;
    options: DwellTimeOptions;
    action: MlAuditService.Action | undefined;
    constructor(mlAuditService: MlAuditService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onMouseEnter(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDef<DwellTime, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DwellTime, "[sqDwellTime]", never, { "options": "sqDwellTime"; }, {}, never>;
}
//# sourceMappingURL=dwell-time.directive.d.ts.map