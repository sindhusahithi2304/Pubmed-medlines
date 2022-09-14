import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng5SliderModule } from "ng5-slider";
import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";
import { BsActionModule } from "@sinequa/components/action"; // needed for sq-action-button
import { BsSearchModule } from "@sinequa/components/search"; // needed for refine facet / didyoumean
import { BsAutocompleteModule } from "@sinequa/components/autocomplete"; // needed for refine facet
import { ALL_FACETS, DEFAULT_FACETS } from "../facet.service";
import { BsRefine } from "./facet-refine/facet-refine";
import { BsFacetBar } from "./facet-bar/facet-bar";
import { BsMySearch } from "./facet-mysearch/facet-mysearch";
import { BsFacetRange } from "./facet-range/facet-range";
import { BsFacetCard } from "./facet-card/facet-card";
import { BsFacetList } from "./facet-list/facet-list";
import { BsFacetTree } from "./facet-tree/facet-tree";
import { BsFacetFilters } from "./facet-filters/facet-filters";
import { BsFacetMultiComponent } from "./facet-multi/facet-multi.component";
import { BsFacetTagCloud } from './facet-tag-cloud/facet-tag-cloud';
import * as i0 from "@angular/core";
export class BsFacetModule {
    static forRoot(allFacets = undefined, defaultFacets = undefined) {
        return {
            ngModule: BsFacetModule,
            providers: [
                {
                    provide: ALL_FACETS,
                    useValue: allFacets
                },
                {
                    provide: DEFAULT_FACETS,
                    useValue: defaultFacets
                },
            ]
        };
    }
}
BsFacetModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsFacetModule });
BsFacetModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsFacetModule_Factory(t) { return new (t || BsFacetModule)(); }, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            IntlModule,
            UtilsModule,
            CollapseModule,
            BsActionModule,
            BsSearchModule,
            BsAutocompleteModule,
            Ng5SliderModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsFacetModule, { declarations: [BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar,
        BsFacetMultiComponent,
        BsFacetTagCloud], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
        BsActionModule,
        BsSearchModule,
        BsAutocompleteModule,
        Ng5SliderModule], exports: [BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar,
        BsFacetMultiComponent,
        BsFacetTagCloud] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    IntlModule,
                    UtilsModule,
                    CollapseModule,
                    BsActionModule,
                    BsSearchModule,
                    BsAutocompleteModule,
                    Ng5SliderModule
                ],
                declarations: [
                    BsFacetCard, BsFacetList, BsFacetTree,
                    BsFacetFilters,
                    BsRefine,
                    BsFacetRange, BsMySearch, BsFacetBar,
                    BsFacetMultiComponent,
                    BsFacetTagCloud
                ],
                exports: [
                    BsFacetCard, BsFacetList, BsFacetTree,
                    BsFacetFilters,
                    BsRefine,
                    BsFacetRange, BsMySearch, BsFacetBar,
                    BsFacetMultiComponent,
                    BsFacetTagCloud
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvZmFjZXQvIiwic291cmNlcyI6WyJib290c3RyYXAvZmFjZXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFOUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUMsQ0FBRyw4QkFBOEI7QUFDM0YsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDRCQUE0QixDQUFDLENBQUcsdUNBQXVDO0FBQ3BHLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtDQUFrQyxDQUFDLENBQUUsMEJBQTBCO0FBRWxHLE9BQU8sRUFBYSxVQUFVLEVBQUUsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM3RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBbUNwRSxNQUFNLE9BQU8sYUFBYTtJQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBNkIsU0FBUyxFQUFFLGdCQUF3QyxTQUFTO1FBQzNHLE9BQU87WUFDSCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsRUFBRSxTQUFTO2lCQUN0QjtnQkFDRDtvQkFDSSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLGFBQWE7aUJBQzFCO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQzs7aURBZlEsYUFBYTt5R0FBYixhQUFhLGtCQWhDYjtZQUNMLFlBQVk7WUFDWixXQUFXO1lBQ1gsbUJBQW1CO1lBRW5CLFVBQVU7WUFFVixXQUFXO1lBQ1gsY0FBYztZQUNkLGNBQWM7WUFDZCxjQUFjO1lBQ2Qsb0JBQW9CO1lBRXBCLGVBQWU7U0FDbEI7d0ZBa0JRLGFBQWEsbUJBaEJsQixXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVc7UUFDckMsY0FBYztRQUNkLFFBQVE7UUFDUixZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVU7UUFDcEMscUJBQXFCO1FBQ3JCLGVBQWUsYUFwQmYsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFFbkIsVUFBVTtRQUVWLFdBQVc7UUFDWCxjQUFjO1FBQ2QsY0FBYztRQUNkLGNBQWM7UUFDZCxvQkFBb0I7UUFFcEIsZUFBZSxhQVdmLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVztRQUNyQyxjQUFjO1FBQ2QsUUFBUTtRQUNSLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVTtRQUNwQyxxQkFBcUI7UUFDckIsZUFBZTtrREFHVixhQUFhO2NBakN6QixRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBRW5CLFVBQVU7b0JBRVYsV0FBVztvQkFDWCxjQUFjO29CQUNkLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxvQkFBb0I7b0JBRXBCLGVBQWU7aUJBQ2xCO2dCQUNELFlBQVksRUFBRTtvQkFDVixXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVc7b0JBQ3JDLGNBQWM7b0JBQ2QsUUFBUTtvQkFDUixZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVU7b0JBQ3BDLHFCQUFxQjtvQkFDckIsZUFBZTtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVztvQkFDckMsY0FBYztvQkFDZCxRQUFRO29CQUNSLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVTtvQkFDcEMscUJBQXFCO29CQUNyQixlQUFlO2lCQUNsQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVyc30gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHtOZzVTbGlkZXJNb2R1bGV9IGZyb20gXCJuZzUtc2xpZGVyXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuXG5pbXBvcnQge1V0aWxzTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuaW1wb3J0IHtDb2xsYXBzZU1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvY29sbGFwc2VcIjtcbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiOyAgIC8vIG5lZWRlZCBmb3Igc3EtYWN0aW9uLWJ1dHRvblxuaW1wb3J0IHtCc1NlYXJjaE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvc2VhcmNoXCI7ICAgLy8gbmVlZGVkIGZvciByZWZpbmUgZmFjZXQgLyBkaWR5b3VtZWFuXG5pbXBvcnQge0JzQXV0b2NvbXBsZXRlTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hdXRvY29tcGxldGVcIjsgIC8vIG5lZWRlZCBmb3IgcmVmaW5lIGZhY2V0XG5cbmltcG9ydCB7RmFjZXRTdGF0ZSwgQUxMX0ZBQ0VUUywgREVGQVVMVF9GQUNFVFN9IGZyb20gXCIuLi9mYWNldC5zZXJ2aWNlXCI7XG5pbXBvcnQge0JzUmVmaW5lfSBmcm9tIFwiLi9mYWNldC1yZWZpbmUvZmFjZXQtcmVmaW5lXCI7XG5pbXBvcnQge0JzRmFjZXRCYXJ9IGZyb20gXCIuL2ZhY2V0LWJhci9mYWNldC1iYXJcIjtcbmltcG9ydCB7QnNNeVNlYXJjaH0gZnJvbSBcIi4vZmFjZXQtbXlzZWFyY2gvZmFjZXQtbXlzZWFyY2hcIjtcbmltcG9ydCB7QnNGYWNldFJhbmdlfSBmcm9tIFwiLi9mYWNldC1yYW5nZS9mYWNldC1yYW5nZVwiO1xuaW1wb3J0IHtCc0ZhY2V0Q2FyZH0gZnJvbSBcIi4vZmFjZXQtY2FyZC9mYWNldC1jYXJkXCI7XG5pbXBvcnQge0JzRmFjZXRMaXN0fSBmcm9tIFwiLi9mYWNldC1saXN0L2ZhY2V0LWxpc3RcIjtcbmltcG9ydCB7QnNGYWNldFRyZWV9IGZyb20gXCIuL2ZhY2V0LXRyZWUvZmFjZXQtdHJlZVwiO1xuaW1wb3J0IHtCc0ZhY2V0RmlsdGVyc30gZnJvbSBcIi4vZmFjZXQtZmlsdGVycy9mYWNldC1maWx0ZXJzXCI7XG5pbXBvcnQge0JzRmFjZXRNdWx0aUNvbXBvbmVudH0gZnJvbSBcIi4vZmFjZXQtbXVsdGkvZmFjZXQtbXVsdGkuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBCc0ZhY2V0VGFnQ2xvdWQgfSBmcm9tICcuL2ZhY2V0LXRhZy1jbG91ZC9mYWNldC10YWctY2xvdWQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcblxuICAgICAgICBJbnRsTW9kdWxlLFxuXG4gICAgICAgIFV0aWxzTW9kdWxlLFxuICAgICAgICBDb2xsYXBzZU1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIEJzU2VhcmNoTW9kdWxlLFxuICAgICAgICBCc0F1dG9jb21wbGV0ZU1vZHVsZSxcblxuICAgICAgICBOZzVTbGlkZXJNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBCc0ZhY2V0Q2FyZCwgQnNGYWNldExpc3QsIEJzRmFjZXRUcmVlLFxuICAgICAgICBCc0ZhY2V0RmlsdGVycyxcbiAgICAgICAgQnNSZWZpbmUsXG4gICAgICAgIEJzRmFjZXRSYW5nZSwgQnNNeVNlYXJjaCwgQnNGYWNldEJhcixcbiAgICAgICAgQnNGYWNldE11bHRpQ29tcG9uZW50LFxuICAgICAgICBCc0ZhY2V0VGFnQ2xvdWRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNGYWNldENhcmQsIEJzRmFjZXRMaXN0LCBCc0ZhY2V0VHJlZSxcbiAgICAgICAgQnNGYWNldEZpbHRlcnMsXG4gICAgICAgIEJzUmVmaW5lLFxuICAgICAgICBCc0ZhY2V0UmFuZ2UsIEJzTXlTZWFyY2gsIEJzRmFjZXRCYXIsXG4gICAgICAgIEJzRmFjZXRNdWx0aUNvbXBvbmVudCxcbiAgICAgICAgQnNGYWNldFRhZ0Nsb3VkXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQnNGYWNldE1vZHVsZSB7XG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KGFsbEZhY2V0czogYW55W118dW5kZWZpbmVkID0gdW5kZWZpbmVkLCBkZWZhdWx0RmFjZXRzOiBGYWNldFN0YXRlW118dW5kZWZpbmVkID0gdW5kZWZpbmVkKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCc0ZhY2V0TW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQnNGYWNldE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogQUxMX0ZBQ0VUUyxcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGFsbEZhY2V0c1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBERUZBVUxUX0ZBQ0VUUyxcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGRlZmF1bHRGYWNldHNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==