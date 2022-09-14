import { InjectionToken, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SearchService } from "./search.service";
import { Observable } from 'rxjs';
import { Results } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export interface FirstPageOptions {
    displayOnHomePage?: boolean;
}
export declare const FIRST_PAGE_OPTIONS: InjectionToken<FirstPageOptions>;
export declare class FirstPageService implements OnDestroy {
    protected options: FirstPageOptions;
    protected searchService: SearchService;
    protected router: Router;
    private searchSubscription;
    firstPage: Results;
    constructor(options: FirstPageOptions, searchService: SearchService, router: Router);
    ngOnDestroy(): void;
    /**
     * @ignore
     * legacy
     */
    get isFirstPage(): boolean;
    get isCurrentSearchResults(): boolean;
    displayOnHomePage(path?: string): boolean;
    getFirstPage(): Observable<Results>;
    static ɵfac: i0.ɵɵFactoryDef<FirstPageService, [{ optional: true; }, null, null]>;
    static ɵprov: i0.ɵɵInjectableDef<FirstPageService>;
}
//# sourceMappingURL=first-page.service.d.ts.map