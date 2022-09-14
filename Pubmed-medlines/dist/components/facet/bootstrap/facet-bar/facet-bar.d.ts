import { Results } from "@sinequa/core/web-services";
import { FacetService } from "../../facet.service";
import * as i0 from "@angular/core";
export declare class BsFacetBar {
    private facetService;
    results: Results;
    containerIndex: number;
    constructor(facetService: FacetService);
    get facets(): any[];
    static ɵfac: i0.ɵɵFactoryDef<BsFacetBar, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetBar, "sq-facet-bar", never, { "results": "results"; "containerIndex": "containerIndex"; }, {}, never, ["*"]>;
}
//# sourceMappingURL=facet-bar.d.ts.map