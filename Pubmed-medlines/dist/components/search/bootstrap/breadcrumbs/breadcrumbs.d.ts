import { Results } from "@sinequa/core/web-services";
import { SearchService } from "../../search.service";
import { BreadcrumbsItem } from "../../breadcrumbs";
import * as i0 from "@angular/core";
export declare class BsBreadcrumbs {
    searchService: SearchService;
    results: Results;
    allowDeletion: boolean;
    displayFieldNames: boolean;
    constructor(searchService: SearchService);
    getField(item: BreadcrumbsItem): string;
    home(): boolean;
    selectItem(item: BreadcrumbsItem): boolean;
    removeItem(item: BreadcrumbsItem): void;
    static ɵfac: i0.ɵɵFactoryDef<BsBreadcrumbs, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsBreadcrumbs, "sq-breadcrumbs", never, { "results": "results"; "allowDeletion": "allowDeletion"; "displayFieldNames": "displayFieldNames"; }, {}, never, never>;
}
//# sourceMappingURL=breadcrumbs.d.ts.map