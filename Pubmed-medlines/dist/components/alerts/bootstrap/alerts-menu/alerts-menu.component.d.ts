import { OnInit, OnDestroy } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { LoginService } from '@sinequa/core/login';
import { AlertsService } from '../../alerts.service';
import { SearchService } from '@sinequa/components/search';
import * as i0 from "@angular/core";
export declare class BsAlertsMenuComponent implements OnInit, OnDestroy {
    loginService: LoginService;
    alertsService: AlertsService;
    searchService: SearchService;
    searchRoute: string;
    icon: string;
    autoAdjust: boolean;
    autoAdjustBreakpoint: string;
    collapseBreakpoint: string;
    size: string;
    menu: Action | undefined;
    createAction: Action;
    manageAction: Action;
    constructor(loginService: LoginService, alertsService: AlertsService, searchService: SearchService);
    ngOnInit(): void;
    private _alertsServiceSubscription;
    private _loginServiceSubscription;
    private _searchServiceSubscription;
    ngOnDestroy(): void;
    updateMenu(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsAlertsMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsAlertsMenuComponent, "sq-alerts-menu", never, { "searchRoute": "searchRoute"; "icon": "icon"; "autoAdjust": "autoAdjust"; "autoAdjustBreakpoint": "autoAdjustBreakpoint"; "collapseBreakpoint": "collapseBreakpoint"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=alerts-menu.component.d.ts.map