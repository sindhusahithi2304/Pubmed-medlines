import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Autocomplete } from "../autocomplete.directive";
import { AutocompleteFieldSearch } from "../autocomplete-field-search.directive";
import { BsAutocompleteList } from "./autocomplete-list/autocomplete-list";
import { BsFieldSearchItemsComponent } from './field-search-items.component';
import { UtilsModule } from '@sinequa/components/utils';
import * as i0 from "@angular/core";
export class BsAutocompleteModule {
}
BsAutocompleteModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsAutocompleteModule });
BsAutocompleteModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsAutocompleteModule_Factory(t) { return new (t || BsAutocompleteModule)(); }, imports: [[
            CommonModule,
            UtilsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsAutocompleteModule, { declarations: [BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch], imports: [CommonModule,
        UtilsModule], exports: [BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsAutocompleteModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    UtilsModule
                ],
                declarations: [
                    BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
                ],
                exports: [
                    BsAutocompleteList, BsFieldSearchItemsComponent, Autocomplete, AutocompleteFieldSearch
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2F1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7O0FBY3RELE1BQU0sT0FBTyxvQkFBb0I7O3dEQUFwQixvQkFBb0I7dUhBQXBCLG9CQUFvQixrQkFYcEI7WUFDTCxZQUFZO1lBQ1osV0FBVztTQUNkO3dGQVFRLG9CQUFvQixtQkFOekIsa0JBQWtCLEVBQUUsMkJBQTJCLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixhQUp0RixZQUFZO1FBQ1osV0FBVyxhQU1YLGtCQUFrQixFQUFFLDJCQUEyQixFQUFFLFlBQVksRUFBRSx1QkFBdUI7a0RBR2pGLG9CQUFvQjtjQVpoQyxRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztpQkFDZDtnQkFDRCxZQUFZLEVBQUU7b0JBQ1Ysa0JBQWtCLEVBQUUsMkJBQTJCLEVBQUUsWUFBWSxFQUFFLHVCQUF1QjtpQkFDekY7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGtCQUFrQixFQUFFLDJCQUEyQixFQUFFLFlBQVksRUFBRSx1QkFBdUI7aUJBQ3pGO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7QXV0b2NvbXBsZXRlfSBmcm9tIFwiLi4vYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtBdXRvY29tcGxldGVGaWVsZFNlYXJjaH0gZnJvbSBcIi4uL2F1dG9jb21wbGV0ZS1maWVsZC1zZWFyY2guZGlyZWN0aXZlXCI7XG5pbXBvcnQge0JzQXV0b2NvbXBsZXRlTGlzdH0gZnJvbSBcIi4vYXV0b2NvbXBsZXRlLWxpc3QvYXV0b2NvbXBsZXRlLWxpc3RcIjtcbmltcG9ydCB7QnNGaWVsZFNlYXJjaEl0ZW1zQ29tcG9uZW50fSBmcm9tICcuL2ZpZWxkLXNlYXJjaC1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHtVdGlsc01vZHVsZX0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy91dGlscyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFV0aWxzTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQnNBdXRvY29tcGxldGVMaXN0LCBCc0ZpZWxkU2VhcmNoSXRlbXNDb21wb25lbnQsIEF1dG9jb21wbGV0ZSwgQXV0b2NvbXBsZXRlRmllbGRTZWFyY2hcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQnNBdXRvY29tcGxldGVMaXN0LCBCc0ZpZWxkU2VhcmNoSXRlbXNDb21wb25lbnQsIEF1dG9jb21wbGV0ZSwgQXV0b2NvbXBsZXRlRmllbGRTZWFyY2hcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJzQXV0b2NvbXBsZXRlTW9kdWxlIHtcbn0iXX0=