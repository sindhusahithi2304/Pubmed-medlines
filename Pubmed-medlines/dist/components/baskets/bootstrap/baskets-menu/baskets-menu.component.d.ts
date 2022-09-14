import { OnInit } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { LoginService } from "@sinequa/core/login";
import { BasketsService } from "../../baskets.service";
import { PrincipalWebService } from "@sinequa/core/web-services";
import { UserSettingsWebService } from "@sinequa/core/web-services";
import { AppWebService } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class BsBasketsMenuComponent implements OnInit {
    loginService: LoginService;
    basketsService: BasketsService;
    principalService: PrincipalWebService;
    userSettingsService: UserSettingsWebService;
    appService: AppWebService;
    searchRoute: string;
    icon: string;
    autoAdjust: boolean;
    autoAdjustBreakpoint: string;
    collapseBreakpoint: string;
    size: string;
    basketOptions: string[];
    menu: Action | undefined;
    createAction: Action;
    manageAction: Action;
    selectAction: Action;
    shareAction: Action;
    basketCustomOptions: Action[];
    constructor(loginService: LoginService, basketsService: BasketsService, principalService: PrincipalWebService, userSettingsService: UserSettingsWebService, appService: AppWebService);
    ngOnInit(): void;
    updateMenu(): void;
    sendEmail(basket: any, curr: any): void;
    static ɵfac: i0.ɵɵFactoryDef<BsBasketsMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsBasketsMenuComponent, "sq-baskets-menu", never, { "searchRoute": "searchRoute"; "icon": "icon"; "autoAdjust": "autoAdjust"; "autoAdjustBreakpoint": "autoAdjustBreakpoint"; "collapseBreakpoint": "collapseBreakpoint"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=baskets-menu.component.d.ts.map