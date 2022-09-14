import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WebServicesModule } from "@sinequa/core/web-services";
import { IntlModule } from "@sinequa/core/intl";
import { LoginModule } from "@sinequa/core/login";
import { UtilsModule } from "@sinequa/components/utils";
import { BsActionModule } from "@sinequa/components/action";
import { SEARCH_OPTIONS } from "../search.service";
import { BsDidYouMean } from "./did-you-mean/did-you-mean";
import { BsBreadcrumbs } from "./breadcrumbs/breadcrumbs";
import { BsPager } from "./pager/pager";
import { BsPageSizeSelector } from "./page-size-selector/page-size-selector";
import { BsSortSelector } from "./sort-selector/sort-selector";
import { BsTabs } from "./tabs/tabs";
import { BsLoadingBar } from "./loading-bar/loading-bar";
import { BsScroller } from "./scroller/scroller";
import { BsLoadMore } from './load-more/load-more';
import * as i0 from "@angular/core";
export class BsSearchModule {
    static forRoot(searchOptions) {
        return {
            ngModule: BsSearchModule,
            providers: [
                // Provide SEARCH_OPTIONS
                { provide: SEARCH_OPTIONS, useValue: searchOptions },
            ]
        };
    }
}
BsSearchModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsSearchModule });
BsSearchModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsSearchModule_Factory(t) { return new (t || BsSearchModule)(); }, imports: [[
            CommonModule,
            FormsModule, ReactiveFormsModule,
            WebServicesModule,
            IntlModule,
            LoginModule,
            UtilsModule,
            BsActionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsSearchModule, { declarations: [BsDidYouMean,
        BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
        BsTabs, BsLoadingBar,
        BsScroller, BsLoadMore], imports: [CommonModule,
        FormsModule, ReactiveFormsModule,
        WebServicesModule,
        IntlModule,
        LoginModule,
        UtilsModule,
        BsActionModule], exports: [BsDidYouMean,
        BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
        BsTabs, BsLoadingBar,
        BsScroller, BsLoadMore] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsSearchModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule, ReactiveFormsModule,
                    WebServicesModule,
                    IntlModule,
                    LoginModule,
                    UtilsModule,
                    BsActionModule
                ],
                declarations: [
                    BsDidYouMean,
                    BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
                    BsTabs, BsLoadingBar,
                    BsScroller, BsLoadMore
                ],
                exports: [
                    BsDidYouMean,
                    BsBreadcrumbs, BsPager, BsPageSizeSelector, BsSortSelector,
                    BsTabs, BsLoadingBar,
                    BsScroller, BsLoadMore
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3NlYXJjaC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9zZWFyY2gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBZ0IsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUE7QUFDOUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQTJCakQsTUFBTSxPQUFPLGNBQWM7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUE0QjtRQUN2QyxPQUFPO1lBQ0gsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNQLHlCQUF5QjtnQkFDekIsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUM7YUFDckQ7U0FDSixDQUFDO0lBQ04sQ0FBQzs7a0RBVFEsY0FBYzsyR0FBZCxjQUFjLGtCQXhCZDtZQUNMLFlBQVk7WUFDWixXQUFXLEVBQUUsbUJBQW1CO1lBRWhDLGlCQUFpQjtZQUNqQixVQUFVO1lBQ1YsV0FBVztZQUVYLFdBQVc7WUFDWCxjQUFjO1NBQ2pCO3dGQWNRLGNBQWMsbUJBWm5CLFlBQVk7UUFDWixhQUFhLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWM7UUFDMUQsTUFBTSxFQUFFLFlBQVk7UUFDcEIsVUFBVSxFQUFFLFVBQVUsYUFkdEIsWUFBWTtRQUNaLFdBQVcsRUFBRSxtQkFBbUI7UUFFaEMsaUJBQWlCO1FBQ2pCLFVBQVU7UUFDVixXQUFXO1FBRVgsV0FBVztRQUNYLGNBQWMsYUFTZCxZQUFZO1FBQ1osYUFBYSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjO1FBQzFELE1BQU0sRUFBRSxZQUFZO1FBQ3BCLFVBQVUsRUFBRSxVQUFVO2tEQUdqQixjQUFjO2NBekIxQixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVyxFQUFFLG1CQUFtQjtvQkFFaEMsaUJBQWlCO29CQUNqQixVQUFVO29CQUNWLFdBQVc7b0JBRVgsV0FBVztvQkFDWCxjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsWUFBWTtvQkFDWixhQUFhLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGNBQWM7b0JBQzFELE1BQU0sRUFBRSxZQUFZO29CQUNwQixVQUFVLEVBQUUsVUFBVTtpQkFDekI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osYUFBYSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjO29CQUMxRCxNQUFNLEVBQUUsWUFBWTtvQkFDcEIsVUFBVSxFQUFFLFVBQVU7aUJBQ3pCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7Rm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuXG5pbXBvcnQge1dlYlNlcnZpY2VzTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtMb2dpbk1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbG9naW5cIjtcbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0JzQWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb25cIjtcbmltcG9ydCB7U2VhcmNoT3B0aW9ucywgU0VBUkNIX09QVElPTlN9IGZyb20gXCIuLi9zZWFyY2guc2VydmljZVwiO1xuXG5pbXBvcnQge0JzRGlkWW91TWVhbn0gZnJvbSBcIi4vZGlkLXlvdS1tZWFuL2RpZC15b3UtbWVhblwiO1xuaW1wb3J0IHtCc0JyZWFkY3J1bWJzfSBmcm9tIFwiLi9icmVhZGNydW1icy9icmVhZGNydW1ic1wiO1xuaW1wb3J0IHtCc1BhZ2VyfSBmcm9tIFwiLi9wYWdlci9wYWdlclwiO1xuaW1wb3J0IHtCc1BhZ2VTaXplU2VsZWN0b3J9IGZyb20gXCIuL3BhZ2Utc2l6ZS1zZWxlY3Rvci9wYWdlLXNpemUtc2VsZWN0b3JcIjtcbmltcG9ydCB7QnNTb3J0U2VsZWN0b3J9IGZyb20gXCIuL3NvcnQtc2VsZWN0b3Ivc29ydC1zZWxlY3RvclwiO1xuaW1wb3J0IHtCc1RhYnN9IGZyb20gXCIuL3RhYnMvdGFic1wiO1xuaW1wb3J0IHtCc0xvYWRpbmdCYXJ9IGZyb20gXCIuL2xvYWRpbmctYmFyL2xvYWRpbmctYmFyXCI7XG5pbXBvcnQge0JzU2Nyb2xsZXJ9IGZyb20gXCIuL3Njcm9sbGVyL3Njcm9sbGVyXCJcbmltcG9ydCB7QnNMb2FkTW9yZX0gZnJvbSAnLi9sb2FkLW1vcmUvbG9hZC1tb3JlJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAgICAgV2ViU2VydmljZXNNb2R1bGUsXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIExvZ2luTW9kdWxlLFxuXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgICAgICBCc0FjdGlvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzRGlkWW91TWVhbixcbiAgICAgICAgQnNCcmVhZGNydW1icywgQnNQYWdlciwgQnNQYWdlU2l6ZVNlbGVjdG9yLCBCc1NvcnRTZWxlY3RvcixcbiAgICAgICAgQnNUYWJzLCBCc0xvYWRpbmdCYXIsXG4gICAgICAgIEJzU2Nyb2xsZXIsIEJzTG9hZE1vcmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNEaWRZb3VNZWFuLFxuICAgICAgICBCc0JyZWFkY3J1bWJzLCBCc1BhZ2VyLCBCc1BhZ2VTaXplU2VsZWN0b3IsIEJzU29ydFNlbGVjdG9yLFxuICAgICAgICBCc1RhYnMsIEJzTG9hZGluZ0JhcixcbiAgICAgICAgQnNTY3JvbGxlciwgQnNMb2FkTW9yZVxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIEJzU2VhcmNoTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChzZWFyY2hPcHRpb25zOiBTZWFyY2hPcHRpb25zKSA6IE1vZHVsZVdpdGhQcm92aWRlcnM8QnNTZWFyY2hNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBCc1NlYXJjaE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIC8vIFByb3ZpZGUgU0VBUkNIX09QVElPTlNcbiAgICAgICAgICAgICAgICB7cHJvdmlkZTogU0VBUkNIX09QVElPTlMsIHVzZVZhbHVlOiBzZWFyY2hPcHRpb25zfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=