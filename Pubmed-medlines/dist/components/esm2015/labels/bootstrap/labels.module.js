import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IntlModule } from "@sinequa/core/intl";
import { ValidationModule } from "@sinequa/core/validation";
import { UtilsModule } from "@sinequa/components/utils";
import { BsSelectionModule } from "@sinequa/components/selection";
import { BsModalModule } from "@sinequa/components/modal";
import { BsActionModule } from "@sinequa/components/action";
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { LabelsModule } from "../labels.module";
import { BsRenameLabel } from "./rename-label/rename-label";
import { BsLabelsMenuComponent } from "./labels-menu/labels-menu.component";
import { LABELS_COMPONENTS } from "../labels.service";
import { BsDeleteLabel } from './delete-label/delete-label';
import { BsAddLabel } from './add-label/add-label';
import { BsLabelsAutocompleteComponent } from './labels-autocomplete/labels-autocomplete.component';
import { BsEditLabel } from './edit-label/edit-label';
import * as i0 from "@angular/core";
export const defaultLabelComponents = {
    labelsAutocompleteComponent: BsLabelsAutocompleteComponent,
    renameModal: BsRenameLabel,
    deleteModal: BsDeleteLabel,
    addModal: BsAddLabel,
    editModal: BsEditLabel
};
export class BsLabelsModule {
}
BsLabelsModule.ɵmod = i0.ɵɵdefineNgModule({ type: BsLabelsModule });
BsLabelsModule.ɵinj = i0.ɵɵdefineInjector({ factory: function BsLabelsModule_Factory(t) { return new (t || BsLabelsModule)(); }, providers: [
        { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
    ], imports: [[
            FormsModule, ReactiveFormsModule,
            CommonModule,
            IntlModule,
            ValidationModule,
            UtilsModule,
            BsSelectionModule,
            BsModalModule,
            BsAutocompleteModule,
            BsActionModule,
            LabelsModule
        ], LabelsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(BsLabelsModule, { declarations: [BsLabelsAutocompleteComponent,
        BsRenameLabel,
        BsLabelsMenuComponent,
        BsDeleteLabel,
        BsAddLabel,
        BsEditLabel], imports: [FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,
        ValidationModule,
        UtilsModule,
        BsSelectionModule,
        BsModalModule,
        BsAutocompleteModule,
        BsActionModule,
        LabelsModule], exports: [LabelsModule,
        BsLabelsAutocompleteComponent,
        BsRenameLabel,
        BsLabelsMenuComponent,
        BsDeleteLabel,
        BsAddLabel,
        BsEditLabel] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsLabelsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    FormsModule, ReactiveFormsModule,
                    CommonModule,
                    IntlModule,
                    ValidationModule,
                    UtilsModule,
                    BsSelectionModule,
                    BsModalModule,
                    BsAutocompleteModule,
                    BsActionModule,
                    LabelsModule
                ],
                declarations: [
                    BsLabelsAutocompleteComponent,
                    BsRenameLabel,
                    BsLabelsMenuComponent,
                    BsDeleteLabel,
                    BsAddLabel,
                    BsEditLabel
                ],
                exports: [
                    LabelsModule,
                    BsLabelsAutocompleteComponent,
                    BsRenameLabel,
                    BsLabelsMenuComponent,
                    BsDeleteLabel,
                    BsAddLabel,
                    BsEditLabel
                ],
                providers: [
                    { provide: LABELS_COMPONENTS, useValue: defaultLabelComponents },
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL2xhYmVscy8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9sYWJlbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUUxRSxPQUFPLEVBQUMsaUJBQWlCLEVBQW1CLE1BQU0sbUJBQW1CLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRXRELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFxQjtJQUNwRCwyQkFBMkIsRUFBRSw2QkFBNkI7SUFDMUQsV0FBVyxFQUFFLGFBQWE7SUFDMUIsV0FBVyxFQUFFLGFBQWE7SUFDMUIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLFdBQVc7Q0FDekIsQ0FBQztBQXNDRixNQUFNLE9BQU8sY0FBYzs7a0RBQWQsY0FBYzsyR0FBZCxjQUFjLG1CQUpaO1FBQ1AsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFDO0tBQ2pFLFlBakNRO1lBQ0wsV0FBVyxFQUFFLG1CQUFtQjtZQUNoQyxZQUFZO1lBRVosVUFBVTtZQUNWLGdCQUFnQjtZQUVoQixXQUFXO1lBQ1gsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixvQkFBb0I7WUFDcEIsY0FBYztZQUNkLFlBQVk7U0FDZixFQVVHLFlBQVk7d0ZBWVAsY0FBYyxtQkFwQm5CLDZCQUE2QjtRQUM3QixhQUFhO1FBQ2IscUJBQXFCO1FBQ3JCLGFBQWE7UUFDYixVQUFVO1FBQ1YsV0FBVyxhQW5CWCxXQUFXLEVBQUUsbUJBQW1CO1FBQ2hDLFlBQVk7UUFFWixVQUFVO1FBQ1YsZ0JBQWdCO1FBRWhCLFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsYUFBYTtRQUNiLG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QsWUFBWSxhQVdaLFlBQVk7UUFDWiw2QkFBNkI7UUFDN0IsYUFBYTtRQUNiLHFCQUFxQjtRQUNyQixhQUFhO1FBQ2IsVUFBVTtRQUNWLFdBQVc7a0RBTU4sY0FBYztjQXBDMUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxXQUFXLEVBQUUsbUJBQW1CO29CQUNoQyxZQUFZO29CQUVaLFVBQVU7b0JBQ1YsZ0JBQWdCO29CQUVoQixXQUFXO29CQUNYLGlCQUFpQjtvQkFDakIsYUFBYTtvQkFDYixvQkFBb0I7b0JBQ3BCLGNBQWM7b0JBQ2QsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsNkJBQTZCO29CQUM3QixhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsYUFBYTtvQkFDYixVQUFVO29CQUNWLFdBQVc7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osNkJBQTZCO29CQUM3QixhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsYUFBYTtvQkFDYixVQUFVO29CQUNWLFdBQVc7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBQztpQkFDakU7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbmltcG9ydCB7SW50bE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtWYWxpZGF0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS92YWxpZGF0aW9uXCI7XG5cbmltcG9ydCB7VXRpbHNNb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL3V0aWxzXCI7XG5pbXBvcnQge0JzU2VsZWN0aW9uTW9kdWxlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWxlY3Rpb25cIjtcbmltcG9ydCB7QnNNb2RhbE1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvbW9kYWxcIjtcbmltcG9ydCB7QnNBY3Rpb25Nb2R1bGV9IGZyb20gXCJAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvblwiO1xuaW1wb3J0IHtCc0F1dG9jb21wbGV0ZU1vZHVsZX0gZnJvbSBcIkBzaW5lcXVhL2NvbXBvbmVudHMvYXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQge0xhYmVsc01vZHVsZX0gZnJvbSBcIi4uL2xhYmVscy5tb2R1bGVcIjtcblxuaW1wb3J0IHtCc1JlbmFtZUxhYmVsfSBmcm9tIFwiLi9yZW5hbWUtbGFiZWwvcmVuYW1lLWxhYmVsXCI7XG5pbXBvcnQge0JzTGFiZWxzTWVudUNvbXBvbmVudH0gZnJvbSBcIi4vbGFiZWxzLW1lbnUvbGFiZWxzLW1lbnUuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7TEFCRUxTX0NPTVBPTkVOVFMsIExhYmVsc0NvbXBvbmVudHN9IGZyb20gXCIuLi9sYWJlbHMuc2VydmljZVwiO1xuaW1wb3J0IHsgQnNEZWxldGVMYWJlbCB9IGZyb20gJy4vZGVsZXRlLWxhYmVsL2RlbGV0ZS1sYWJlbCc7XG5pbXBvcnQgeyBCc0FkZExhYmVsIH0gZnJvbSAnLi9hZGQtbGFiZWwvYWRkLWxhYmVsJztcbmltcG9ydCB7IEJzTGFiZWxzQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9sYWJlbHMtYXV0b2NvbXBsZXRlL2xhYmVscy1hdXRvY29tcGxldGUuY29tcG9uZW50JztcbmltcG9ydCB7IEJzRWRpdExhYmVsIH0gZnJvbSAnLi9lZGl0LWxhYmVsL2VkaXQtbGFiZWwnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdExhYmVsQ29tcG9uZW50czogTGFiZWxzQ29tcG9uZW50cyA9IHtcbiAgICBsYWJlbHNBdXRvY29tcGxldGVDb21wb25lbnQ6IEJzTGFiZWxzQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxuICAgIHJlbmFtZU1vZGFsOiBCc1JlbmFtZUxhYmVsLFxuICAgIGRlbGV0ZU1vZGFsOiBCc0RlbGV0ZUxhYmVsLFxuICAgIGFkZE1vZGFsOiBCc0FkZExhYmVsLFxuICAgIGVkaXRNb2RhbDogQnNFZGl0TGFiZWxcbn07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgICAgIEludGxNb2R1bGUsXG4gICAgICAgIFZhbGlkYXRpb25Nb2R1bGUsXG5cbiAgICAgICAgVXRpbHNNb2R1bGUsXG4gICAgICAgIEJzU2VsZWN0aW9uTW9kdWxlLFxuICAgICAgICBCc01vZGFsTW9kdWxlLFxuICAgICAgICBCc0F1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICAgICAgQnNBY3Rpb25Nb2R1bGUsXG4gICAgICAgIExhYmVsc01vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJzTGFiZWxzQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxuICAgICAgICBCc1JlbmFtZUxhYmVsLFxuICAgICAgICBCc0xhYmVsc01lbnVDb21wb25lbnQsXG4gICAgICAgIEJzRGVsZXRlTGFiZWwsXG4gICAgICAgIEJzQWRkTGFiZWwsXG4gICAgICAgIEJzRWRpdExhYmVsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIExhYmVsc01vZHVsZSxcbiAgICAgICAgQnNMYWJlbHNBdXRvY29tcGxldGVDb21wb25lbnQsXG4gICAgICAgIEJzUmVuYW1lTGFiZWwsXG4gICAgICAgIEJzTGFiZWxzTWVudUNvbXBvbmVudCxcbiAgICAgICAgQnNEZWxldGVMYWJlbCxcbiAgICAgICAgQnNBZGRMYWJlbCxcbiAgICAgICAgQnNFZGl0TGFiZWxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogTEFCRUxTX0NPTVBPTkVOVFMsIHVzZVZhbHVlOiBkZWZhdWx0TGFiZWxDb21wb25lbnRzfSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJzTGFiZWxzTW9kdWxlIHtcbn1cbiJdfQ==