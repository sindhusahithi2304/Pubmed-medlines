import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";
import { Metadata } from "./metadata/metadata";
import { MetadataItem } from "./metadata-item/metadata-item";
import { MetadataAccessListsItem } from "./metadata-access-lists-item/metadata-access-lists-item";
import { MetadataAccessListsItemSingleAccessList } from "./metadata-access-lists-item-single-access-list/metadata-access-lists-item-single-access-list";
import { Showmore } from "./showmore/showmore";
import * as i0 from "@angular/core";
export class MetadataModule {
}
MetadataModule.ɵmod = i0.ɵɵdefineNgModule({ type: MetadataModule });
MetadataModule.ɵinj = i0.ɵɵdefineInjector({ factory: function MetadataModule_Factory(t) { return new (t || MetadataModule)(); }, imports: [[
            CommonModule,
            IntlModule,
            UtilsModule,
            CollapseModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MetadataModule, { declarations: [Metadata, MetadataItem, Showmore,
        MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList], imports: [CommonModule,
        IntlModule,
        UtilsModule,
        CollapseModule], exports: [Metadata, MetadataItem, Showmore] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(MetadataModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    IntlModule,
                    UtilsModule,
                    CollapseModule,
                ],
                declarations: [
                    Metadata, MetadataItem, Showmore,
                    MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList
                ],
                exports: [
                    Metadata, MetadataItem, Showmore
                ],
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvbWV0YWRhdGEvIiwic291cmNlcyI6WyJtZXRhZGF0YS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFNUQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx5REFBeUQsQ0FBQztBQUNoRyxPQUFPLEVBQUMsdUNBQXVDLEVBQUMsTUFBTSwrRkFBK0YsQ0FBQztBQUN0SixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBaUIvQyxNQUFNLE9BQU8sY0FBYzs7a0RBQWQsY0FBYzsyR0FBZCxjQUFjLGtCQWRkO1lBQ0wsWUFBWTtZQUNaLFVBQVU7WUFDVixXQUFXO1lBQ1gsY0FBYztTQUNqQjt3RkFTUSxjQUFjLG1CQVBuQixRQUFRLEVBQUUsWUFBWSxFQUFDLFFBQVE7UUFDL0IsdUJBQXVCLEVBQUUsdUNBQXVDLGFBUGhFLFlBQVk7UUFDWixVQUFVO1FBQ1YsV0FBVztRQUNYLGNBQWMsYUFPZCxRQUFRLEVBQUUsWUFBWSxFQUFDLFFBQVE7a0RBRzFCLGNBQWM7Y0FmMUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsV0FBVztvQkFDWCxjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLFlBQVksRUFBQyxRQUFRO29CQUMvQix1QkFBdUIsRUFBRSx1Q0FBdUM7aUJBQ25FO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxRQUFRLEVBQUUsWUFBWSxFQUFDLFFBQVE7aUJBQ2xDO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHtJbnRsTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge1V0aWxzTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuaW1wb3J0IHtDb2xsYXBzZU1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvY29sbGFwc2VcIjtcblxuaW1wb3J0IHtNZXRhZGF0YX0gZnJvbSBcIi4vbWV0YWRhdGEvbWV0YWRhdGFcIjtcbmltcG9ydCB7TWV0YWRhdGFJdGVtfSBmcm9tIFwiLi9tZXRhZGF0YS1pdGVtL21ldGFkYXRhLWl0ZW1cIjtcbmltcG9ydCB7TWV0YWRhdGFBY2Nlc3NMaXN0c0l0ZW19IGZyb20gXCIuL21ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtL21ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtXCI7XG5pbXBvcnQge01ldGFkYXRhQWNjZXNzTGlzdHNJdGVtU2luZ2xlQWNjZXNzTGlzdH0gZnJvbSBcIi4vbWV0YWRhdGEtYWNjZXNzLWxpc3RzLWl0ZW0tc2luZ2xlLWFjY2Vzcy1saXN0L21ldGFkYXRhLWFjY2Vzcy1saXN0cy1pdGVtLXNpbmdsZS1hY2Nlc3MtbGlzdFwiO1xuaW1wb3J0IHsgU2hvd21vcmUgfSBmcm9tIFwiLi9zaG93bW9yZS9zaG93bW9yZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBJbnRsTW9kdWxlLFxuICAgICAgICBVdGlsc01vZHVsZSxcbiAgICAgICAgQ29sbGFwc2VNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWV0YWRhdGEsIE1ldGFkYXRhSXRlbSxTaG93bW9yZSxcbiAgICAgICAgTWV0YWRhdGFBY2Nlc3NMaXN0c0l0ZW0sIE1ldGFkYXRhQWNjZXNzTGlzdHNJdGVtU2luZ2xlQWNjZXNzTGlzdFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNZXRhZGF0YSwgTWV0YWRhdGFJdGVtLFNob3dtb3JlXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTWV0YWRhdGFNb2R1bGUge1xufSJdfQ==