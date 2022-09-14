import { OnInit, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { LoginService } from "@sinequa/core/login";
import { LabelsService } from "../../labels.service";
import { Results } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class BsLabelsMenuComponent implements OnInit, OnChanges, OnDestroy {
    loginService: LoginService;
    labelsService: LabelsService;
    results: Results;
    icon: string;
    autoAdjust: boolean;
    autoAdjustBreakpoint: string;
    collapseBreakpoint: string;
    size: string;
    menu: Action | undefined;
    renameAction: Action;
    deleteAction: Action;
    bulkAddAction: Action;
    bulkDeleteAction: Action;
    private _loginServiceSubscription;
    constructor(loginService: LoginService, labelsService: LabelsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateMenu(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsLabelsMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsLabelsMenuComponent, "sq-labels-menu", never, { "results": "results"; "icon": "icon"; "autoAdjust": "autoAdjust"; "autoAdjustBreakpoint": "autoAdjustBreakpoint"; "collapseBreakpoint": "collapseBreakpoint"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=labels-menu.component.d.ts.map