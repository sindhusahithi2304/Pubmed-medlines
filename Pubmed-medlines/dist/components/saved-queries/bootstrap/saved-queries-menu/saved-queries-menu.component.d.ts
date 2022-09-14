import { OnInit, OnDestroy } from '@angular/core';
import { Action } from '@sinequa/components/action';
import { LoginService } from '@sinequa/core/login';
import { SearchService } from '@sinequa/components/search';
import { SavedQueriesService } from '../../saved-queries.service';
import * as i0 from "@angular/core";
export declare class BsSavedQueriesMenuComponent implements OnInit, OnDestroy {
    loginService: LoginService;
    savedQueriesService: SavedQueriesService;
    searchService: SearchService;
    searchRoute: string;
    icon: string;
    autoAdjust: boolean;
    autoAdjustBreakpoint: string;
    collapseBreakpoint: string;
    size: string;
    menu: Action | undefined;
    manageAction: Action;
    saveAction: Action;
    constructor(loginService: LoginService, savedQueriesService: SavedQueriesService, searchService: SearchService);
    ngOnInit(): void;
    private _savedQueriesSubscription;
    private _loginSubscription;
    private _searchSubscription;
    ngOnDestroy(): void;
    updateMenu(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsSavedQueriesMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsSavedQueriesMenuComponent, "sq-saved-queries-menu", never, { "searchRoute": "searchRoute"; "icon": "icon"; "autoAdjust": "autoAdjust"; "autoAdjustBreakpoint": "autoAdjustBreakpoint"; "collapseBreakpoint": "collapseBreakpoint"; "size": "size"; }, {}, never, never>;
}
//# sourceMappingURL=saved-queries-menu.component.d.ts.map