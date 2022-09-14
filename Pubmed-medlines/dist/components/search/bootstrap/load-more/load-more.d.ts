import { OnDestroy, OnInit } from '@angular/core';
import { IAction } from '@sinequa/components/action';
import { SearchService } from '../../search.service';
import * as i0 from "@angular/core";
export declare class BsLoadMore implements OnInit, OnDestroy {
    private searchService;
    buttonsStyle: string;
    actionsSize: string;
    private subscription;
    loadMoreAction: IAction;
    hasMore: boolean;
    constructor(searchService: SearchService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsLoadMore, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsLoadMore, "sq-load-more", never, { "buttonsStyle": "buttonsStyle"; "actionsSize": "actionsSize"; }, {}, never, never>;
}
//# sourceMappingURL=load-more.d.ts.map