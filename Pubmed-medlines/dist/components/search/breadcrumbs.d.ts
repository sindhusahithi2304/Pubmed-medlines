import { Query, AppService, Expr, ExprValueInitializer } from "@sinequa/core/app-utils";
import { SearchService } from "./search.service";
export interface BreadcrumbsItem {
    expr: Expr | undefined;
    display: Expr | string;
    facet?: string;
    active?: boolean;
    hidden?: boolean;
}
/**
 * Description of the Breadcrumbs class - link to {@link SearchService}
 */
export declare class Breadcrumbs {
    appService: AppService;
    searchService: SearchService;
    items: BreadcrumbsItem[];
    advanced: Expr[];
    query: Query;
    fields: Set<string>;
    static create(appService: AppService, searchService: SearchService, query: Query): Breadcrumbs;
    private constructor();
    get activeIndex(): number;
    get activeItem(): BreadcrumbsItem | undefined;
    get text(): Expr | string;
    get textExpr(): Expr | undefined;
    get selects(): BreadcrumbsItem[];
    get activeSelects(): BreadcrumbsItem[];
    get activeItems(): BreadcrumbsItem[];
    get isEmpty(): boolean;
    find(expr: Expr | ExprValueInitializer): Expr | undefined;
    findSelect(facet: string, exprOrField?: Expr | string): Expr | undefined;
    private addFields;
    private makeBreadcrumbsItemFromExpr;
    private initItems;
    private init;
    selectItem(item: BreadcrumbsItem): Query | undefined;
    removeItem(item: BreadcrumbsItem): BreadcrumbsItem | undefined;
    update(query: Query): void;
}
//# sourceMappingURL=breadcrumbs.d.ts.map