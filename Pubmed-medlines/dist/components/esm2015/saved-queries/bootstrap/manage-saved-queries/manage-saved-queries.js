import { Component, Inject } from "@angular/core";
import { Validators } from "@angular/forms";
import { MODAL_MODEL, ModalButton } from "@sinequa/core/modal";
import { Utils } from "@sinequa/core/base";
import { ExportSourceType } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
import * as i1 from "../../saved-queries.service";
import * as i2 from "@angular/forms";
import * as i3 from "@sinequa/components/modal";
import * as i4 from "@angular/common";
import * as i5 from "@angular/cdk/drag-drop";
import * as i6 from "@sinequa/core/intl";
function BsManageSavedQueries_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵelementStart(1, "button", 7);
    i0.ɵɵlistener("click", function BsManageSavedQueries_div_2_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.reorder(); });
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "sqMessage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 1, ctx_r0.reordering ? "msg#manageSavedQueries.edit" : "msg#manageSavedQueries.reorder"));
} }
function BsManageSavedQueries_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const savedQuery_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(savedQuery_r4.name);
} }
function BsManageSavedQueries_div_5_sq_editable_2_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "sq-editable", 17);
    i0.ɵɵlistener("valueChange", function BsManageSavedQueries_div_5_sq_editable_2_Template_sq_editable_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r15); const savedQuery_r4 = i0.ɵɵnextContext().$implicit; const ctx_r13 = i0.ɵɵnextContext(); return ctx_r13.setName(savedQuery_r4, $event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const savedQuery_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", savedQuery_r4.name)("model", savedQuery_r4)("validators", ctx_r7.nameValidators);
} }
function BsManageSavedQueries_div_5_a_4_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵlistener("click", function BsManageSavedQueries_div_5_a_4_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r19); const savedQuery_r4 = i0.ɵɵnextContext().$implicit; const ctx_r17 = i0.ɵɵnextContext(); return ctx_r17.export(savedQuery_r4); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "span", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageSavedQueries.export"));
} }
function BsManageSavedQueries_div_5_a_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 20);
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "span", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const savedQuery_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r9 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("href", ctx_r9.savedQueriesService.rssHref(savedQuery_r4), i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 2, "msg#manageSavedQueries.rss"));
} }
function BsManageSavedQueries_div_5_a_6_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 18);
    i0.ɵɵlistener("click", function BsManageSavedQueries_div_5_a_6_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r23); const ctx_r22 = i0.ɵɵnextContext(); const savedQuery_r4 = ctx_r22.$implicit; const $index_r5 = ctx_r22.index; const ctx_r21 = i0.ɵɵnextContext(); return ctx_r21.remove(savedQuery_r4, $index_r5); });
    i0.ɵɵpipe(1, "sqMessage");
    i0.ɵɵelement(2, "span", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵpropertyInterpolate("title", i0.ɵɵpipeBind1(1, 1, "msg#manageSavedQueries.remove"));
} }
function BsManageSavedQueries_div_5_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 23);
} }
const _c0 = "list-group-item list-group-item-action d-flex w-auto-unimportant";
const _c1 = function (a1) { return [_c0, a1]; };
function BsManageSavedQueries_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, BsManageSavedQueries_div_5_div_1_Template, 2, 1, "div", 9);
    i0.ɵɵtemplate(2, BsManageSavedQueries_div_5_sq_editable_2_Template, 1, 3, "sq-editable", 10);
    i0.ɵɵelementStart(3, "div", 11);
    i0.ɵɵtemplate(4, BsManageSavedQueries_div_5_a_4_Template, 3, 3, "a", 12);
    i0.ɵɵtemplate(5, BsManageSavedQueries_div_5_a_5_Template, 3, 4, "a", 13);
    i0.ɵɵtemplate(6, BsManageSavedQueries_div_5_a_6_Template, 3, 3, "a", 14);
    i0.ɵɵtemplate(7, BsManageSavedQueries_div_5_span_7_Template, 1, 0, "span", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(7, _c1, ctx_r1.reordering ? "cursor-move" : ""));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.reordering);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering && ctx_r1.savedQueriesService.hasExportConfig());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering && ctx_r1.savedQueriesService.hasRssEnabled());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r1.reordering);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.reordering);
} }
export class BsManageSavedQueries {
    constructor(model, savedQueriesService) {
        this.model = model;
        this.savedQueriesService = savedQueriesService;
        this.reordering = false;
        this.nameValidators = [
            Validators.required,
            (control) => {
                const modelControl = control.root.get("model");
                if (modelControl) {
                    for (const item of this.model.savedQueries) {
                        if (modelControl.value === item) {
                            continue;
                        }
                        if (control.value === item.name) {
                            return {
                                unique: true
                            };
                        }
                    }
                }
                return null;
            }
        ];
    }
    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageSavedQueries.removeAll",
                result: 0 /* Custom */,
                action: (button) => {
                    this.model.savedQueries.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: "SavedQuery_DeleteAll" /* DeleteAll */
                    });
                },
                visible: this.model.savedQueries.length > 0
            }),
            new ModalButton({
                result: -1 /* OK */,
                primary: true
            }),
            new ModalButton({
                result: -2 /* Cancel */
            })
        ];
    }
    addAuditEvent(auditEvent) {
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }
    reorder() {
        this.reordering = !this.reordering;
    }
    setName(savedQuery, name) {
        if (!Utils.eqNC(savedQuery.name, name)) {
            this.addAuditEvent({
                type: "SavedQuery_Rename" /* Rename */,
                detail: {
                    query: name,
                    "old-name": savedQuery.name
                }
            });
            savedQuery.name = name;
        }
    }
    remove(savedQuery, index) {
        this.model.savedQueries.splice(index, 1);
        this.removeAllButton.visible = this.model.savedQueries.length > 0;
        this.addAuditEvent({
            type: "SavedQuery_Delete" /* Delete */,
            detail: {
                query: savedQuery.name
            }
        });
        return false;
    }
    export(savedQuery) {
        this.savedQueriesService.exportModal(ExportSourceType.SavedQuery, savedQuery);
        return false;
    }
    dropped(drop) {
        Utils.arrayMove(this.model.savedQueries, drop.previousIndex, drop.currentIndex);
    }
}
BsManageSavedQueries.ɵfac = function BsManageSavedQueries_Factory(t) { return new (t || BsManageSavedQueries)(i0.ɵɵdirectiveInject(MODAL_MODEL), i0.ɵɵdirectiveInject(i1.SavedQueriesService)); };
BsManageSavedQueries.ɵcmp = i0.ɵɵdefineComponent({ type: BsManageSavedQueries, selectors: [["sq-manage-saved-queries"]], decls: 6, vars: 6, consts: [["name", "manageSavedQueries", "novalidate", ""], [3, "title", "buttons"], ["class", "form-group clearfix", 4, "ngIf"], [1, "form-group"], ["cdkDropList", "", 1, "list-group", 3, "cdkDropListData", "cdkDropListDisabled", "cdkDropListDropped"], ["cdkDrag", "", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-group", "clearfix"], ["type", "button", 1, "btn", "btn-secondary", "float-right", 3, "click"], ["cdkDrag", "", 3, "ngClass"], ["class", "sq-saved-query-text", 4, "ngIf"], ["name", "msg#manageSavedQueries.name", 3, "value", "model", "validators", "valueChange", 4, "ngIf"], [1, "ml-auto"], ["class", "ml-2", "href", "#", 3, "title", "click", 4, "ngIf"], ["class", "ml-2", "target", "_blank", 3, "href", "title", 4, "ngIf"], ["href", "#", "class", "ml-2", 3, "title", "click", 4, "ngIf"], ["class", "ml-2 fas fa-bars sq-move", 4, "ngIf"], [1, "sq-saved-query-text"], ["name", "msg#manageSavedQueries.name", 3, "value", "model", "validators", "valueChange"], ["href", "#", 1, "ml-2", 3, "title", "click"], [1, "fas", "fa-download", "sq-export"], ["target", "_blank", 1, "ml-2", 3, "href", "title"], [1, "fas", "fa-rss", "sq-rss"], [1, "fas", "fa-times", "sq-remove"], [1, "ml-2", "fas", "fa-bars", "sq-move"]], template: function BsManageSavedQueries_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "form", 0);
        i0.ɵɵelementStart(1, "sq-modal", 1);
        i0.ɵɵtemplate(2, BsManageSavedQueries_div_2_Template, 4, 3, "div", 2);
        i0.ɵɵelementStart(3, "div", 3);
        i0.ɵɵelementStart(4, "div", 4);
        i0.ɵɵlistener("cdkDropListDropped", function BsManageSavedQueries_Template_div_cdkDropListDropped_4_listener($event) { return ctx.dropped($event); });
        i0.ɵɵtemplate(5, BsManageSavedQueries_div_5_Template, 8, 9, "div", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("title", "msg#manageSavedQueries.title")("buttons", ctx.buttons);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.model.savedQueries.length);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("cdkDropListData", ctx.model.savedQueries)("cdkDropListDisabled", !ctx.reordering);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.model.savedQueries);
    } }, directives: [i2.ɵangular_packages_forms_forms_y, i2.NgControlStatusGroup, i2.NgForm, i3.BsModal, i4.NgIf, i5.CdkDropList, i4.NgForOf, i5.CdkDrag, i4.NgClass, i3.BsEditable], pipes: [i6.MessagePipe], styles: [".list-group[_ngcontent-%COMP%]{max-height:18.5rem;overflow-y:auto;width:100%}.sq-saved-query-text[_ngcontent-%COMP%]{overflow-wrap:break-word;width:100%;word-break:break-word;word-wrap:break-word}.sq-move[_ngcontent-%COMP%]{cursor:move}span.sq-move[_ngcontent-%COMP%]{color:grey}.sq-remove[_ngcontent-%COMP%]{color:#d3d3d3;cursor:pointer}.sq-remove[_ngcontent-%COMP%]:hover{color:#8b0000}.w-auto-unimportant[_ngcontent-%COMP%]{width:auto}.cursor-move[_ngcontent-%COMP%]{cursor:move}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsManageSavedQueries, [{
        type: Component,
        args: [{
                selector: "sq-manage-saved-queries",
                templateUrl: "./manage-saved-queries.html",
                styleUrls: ["./manage-saved-queries.scss"]
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [MODAL_MODEL]
            }] }, { type: i1.SavedQueriesService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLXNhdmVkLXF1ZXJpZXMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9zYXZlZC1xdWVyaWVzLyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL21hbmFnZS1zYXZlZC1xdWVyaWVzL21hbmFnZS1zYXZlZC1xdWVyaWVzLnRzIiwiYm9vdHN0cmFwL21hbmFnZS1zYXZlZC1xdWVyaWVzL21hbmFnZS1zYXZlZC1xdWVyaWVzLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRCxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBYyxNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQWEsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7Ozs7OztJQ0poRSw4QkFDSTtJQUFBLGlDQUFnRjtJQUFwQixxTEFBbUI7SUFBQyxZQUErRjs7SUFBQSxpQkFBUztJQUM1TCxpQkFBTTs7O0lBRDhFLGVBQStGO0lBQS9GLGdJQUErRjs7O0lBTXZLLCtCQUFvRDtJQUFBLFlBQW1CO0lBQUEsaUJBQU07OztJQUF6QixlQUFtQjtJQUFuQix3Q0FBbUI7Ozs7SUFDdkUsdUNBQTZMO0lBQWxJLHNTQUEyQztJQUF1RixpQkFBYzs7OztJQUExSywwQ0FBeUIsd0JBQUEscUNBQUE7Ozs7SUFFdEQsNkJBQ0k7SUFEa0YsdVBBQTRCOztJQUM5RywyQkFBK0M7SUFDbkQsaUJBQUk7O0lBRitHLHdGQUF1RDs7O0lBRzFLLDZCQUNJOztJQUFBLDJCQUF1QztJQUMzQyxpQkFBSTs7OztJQUZ1RSxxR0FBa0Q7SUFBaUIscUZBQW9EOzs7O0lBR2xNLDZCQUNJO0lBRDRCLDRUQUFvQzs7SUFDaEUsMkJBQTRDO0lBQ2hELGlCQUFJOztJQUY4RSx3RkFBdUQ7OztJQUd6SSwyQkFBaUU7Ozs7O0lBZHpFLDhCQUVJO0lBQUEsMkVBQTZFO0lBQzdFLDRGQUEyTTtJQUMzTSwrQkFDSTtJQUFBLHdFQUVJO0lBQ0osd0VBRUk7SUFDSix3RUFFSTtJQUNKLDhFQUFpRTtJQUNyRSxpQkFBTTtJQUNWLGlCQUFNOzs7SUFmRiw0RkFBZ0g7SUFDMUcsZUFBZ0I7SUFBaEIsd0NBQWdCO0lBQ1IsZUFBaUI7SUFBakIseUNBQWlCO0lBRXZCLGVBQTBEO0lBQTFELHlGQUEwRDtJQUcxRCxlQUF3RDtJQUF4RCx1RkFBd0Q7SUFHeEQsZUFBaUI7SUFBakIseUNBQWlCO0lBR2QsZUFBZ0I7SUFBaEIsd0NBQWdCOztBRFAvQyxNQUFNLE9BQU8sb0JBQW9CO0lBTTdCLFlBQ2dDLEtBQThCLEVBQ25ELG1CQUF3QztRQURuQixVQUFLLEdBQUwsS0FBSyxDQUF5QjtRQUNuRCx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbEIsVUFBVSxDQUFDLFFBQVE7WUFDbkIsQ0FBQyxPQUF3QixFQUFFLEVBQUU7Z0JBQ3pCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLFlBQVksRUFBRTtvQkFDZCxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO3dCQUN4QyxJQUFJLFlBQVksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFOzRCQUM3QixTQUFTO3lCQUNaO3dCQUNELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUM3QixPQUFPO2dDQUNILE1BQU0sRUFBRSxJQUFJOzZCQUNmLENBQUM7eUJBQ0w7cUJBQ0o7aUJBQ0o7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksV0FBVyxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsa0NBQWtDO2dCQUN4QyxNQUFNLGdCQUFvQjtnQkFDMUIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQzt3QkFDZixJQUFJLHdDQUErQjtxQkFDdEMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDO2FBQzlDLENBQUM7WUFDRixJQUFJLFdBQVcsQ0FBQztnQkFDWixNQUFNLGFBQWdCO2dCQUN0QixPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUM7Z0JBQ1osTUFBTSxpQkFBb0I7YUFDN0IsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYSxDQUFDLFVBQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQXNCLEVBQUUsSUFBWTtRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBQ2YsSUFBSSxrQ0FBNEI7Z0JBQ2hDLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUUsSUFBSTtvQkFDWCxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUk7aUJBQzlCO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQXNCLEVBQUUsS0FBYTtRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNmLElBQUksa0NBQTRCO1lBQ2hDLE1BQU0sRUFBRTtnQkFDSixLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUk7YUFDekI7U0FDSixDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQXNCO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzlFLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBK0I7UUFDbkMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRixDQUFDOzt3RkFuR1Esb0JBQW9CLHVCQU9qQixXQUFXO3lEQVBkLG9CQUFvQjtRQ2RqQywrQkFDSTtRQUFBLG1DQUNJO1FBQUEscUVBRU07UUFDTiw4QkFDSTtRQUFBLDhCQUNJO1FBRDJHLDhIQUFzQixtQkFBZSxJQUFDO1FBQ2pKLHFFQWdCTTtRQUNWLGlCQUFNO1FBQ1YsaUJBQU07UUFDVixpQkFBVztRQUNmLGlCQUFPOztRQTFCTyxlQUF3QztRQUF4QyxzREFBd0Msd0JBQUE7UUFDeEMsZUFBK0I7UUFBL0Isb0RBQStCO1FBSUcsZUFBc0M7UUFBdEMsd0RBQXNDLHdDQUFBO1FBQzFDLGVBQXVCO1FBQXZCLGdEQUF1Qjs7a0RET3RELG9CQUFvQjtjQUxoQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsV0FBVyxFQUFFLDZCQUE2QjtnQkFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7YUFDN0M7O3NCQVFRLE1BQU07dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbmplY3QsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmFsaWRhdG9ycywgQWJzdHJhY3RDb250cm9sfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7VmFsaWRhdG9yRm59IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtDZGtEcmFnRHJvcH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9kcmFnLWRyb3BcIjtcbmltcG9ydCB7TU9EQUxfTU9ERUwsIE1vZGFsQnV0dG9uLCBNb2RhbFJlc3VsdH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvbW9kYWxcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7RXhwb3J0U291cmNlVHlwZSwgQXVkaXRFdmVudH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQge1NhdmVkUXVlcmllc1NlcnZpY2UsIFNhdmVkUXVlcnksIFNhdmVkUXVlcnlFdmVudFR5cGUsIE1hbmFnZVNhdmVkUXVlcmllc01vZGVsfSBmcm9tIFwiLi4vLi4vc2F2ZWQtcXVlcmllcy5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNxLW1hbmFnZS1zYXZlZC1xdWVyaWVzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYW5hZ2Utc2F2ZWQtcXVlcmllcy5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCIuL21hbmFnZS1zYXZlZC1xdWVyaWVzLnNjc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgQnNNYW5hZ2VTYXZlZFF1ZXJpZXMgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHJlb3JkZXJpbmc6IGJvb2xlYW47XG4gICAgYnV0dG9uczogTW9kYWxCdXR0b25bXTtcbiAgICByZW1vdmVBbGxCdXR0b246IE1vZGFsQnV0dG9uO1xuICAgIG5hbWVWYWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoTU9EQUxfTU9ERUwpIHB1YmxpYyBtb2RlbDogTWFuYWdlU2F2ZWRRdWVyaWVzTW9kZWwsXG4gICAgICAgIHB1YmxpYyBzYXZlZFF1ZXJpZXNTZXJ2aWNlOiBTYXZlZFF1ZXJpZXNTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMucmVvcmRlcmluZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubmFtZVZhbGlkYXRvcnMgPSBbXG4gICAgICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICAgICAgKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsQ29udHJvbCA9IGNvbnRyb2wucm9vdC5nZXQoXCJtb2RlbFwiKTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWxDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLm1vZGVsLnNhdmVkUXVlcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsQ29udHJvbC52YWx1ZSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2wudmFsdWUgPT09IGl0ZW0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaXF1ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IFtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnV0dG9uID0gbmV3IE1vZGFsQnV0dG9uKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIm1zZyNtYW5hZ2VTYXZlZFF1ZXJpZXMucmVtb3ZlQWxsXCIsXG4gICAgICAgICAgICAgICAgcmVzdWx0OiBNb2RhbFJlc3VsdC5DdXN0b20sXG4gICAgICAgICAgICAgICAgYWN0aW9uOiAoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuc2F2ZWRRdWVyaWVzLnNwbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFNhdmVkUXVlcnlFdmVudFR5cGUuRGVsZXRlQWxsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdGhpcy5tb2RlbC5zYXZlZFF1ZXJpZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuT0ssXG4gICAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgTW9kYWxCdXR0b24oe1xuICAgICAgICAgICAgICAgIHJlc3VsdDogTW9kYWxSZXN1bHQuQ2FuY2VsXG4gICAgICAgICAgICB9KVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGFkZEF1ZGl0RXZlbnQoYXVkaXRFdmVudDogQXVkaXRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwuYXVkaXRFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuYXVkaXRFdmVudHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLmF1ZGl0RXZlbnRzLnB1c2goYXVkaXRFdmVudCk7XG4gICAgfVxuXG4gICAgcmVvcmRlcigpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVyaW5nID0gIXRoaXMucmVvcmRlcmluZztcbiAgICB9XG5cbiAgICBzZXROYW1lKHNhdmVkUXVlcnk6IFNhdmVkUXVlcnksIG5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIVV0aWxzLmVxTkMoc2F2ZWRRdWVyeS5uYW1lLCBuYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRBdWRpdEV2ZW50KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLlJlbmFtZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwib2xkLW5hbWVcIjogc2F2ZWRRdWVyeS5uYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzYXZlZFF1ZXJ5Lm5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKHNhdmVkUXVlcnk6IFNhdmVkUXVlcnksIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zYXZlZFF1ZXJpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdXR0b24udmlzaWJsZSA9IHRoaXMubW9kZWwuc2F2ZWRRdWVyaWVzLmxlbmd0aCA+IDA7XG4gICAgICAgIHRoaXMuYWRkQXVkaXRFdmVudCh7XG4gICAgICAgICAgICB0eXBlOiBTYXZlZFF1ZXJ5RXZlbnRUeXBlLkRlbGV0ZSxcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiBzYXZlZFF1ZXJ5Lm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBleHBvcnQoc2F2ZWRRdWVyeTogU2F2ZWRRdWVyeSkge1xuICAgICAgICB0aGlzLnNhdmVkUXVlcmllc1NlcnZpY2UuZXhwb3J0TW9kYWwoRXhwb3J0U291cmNlVHlwZS5TYXZlZFF1ZXJ5LCBzYXZlZFF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGRyb3BwZWQoZHJvcDogQ2RrRHJhZ0Ryb3A8U2F2ZWRRdWVyeVtdPikge1xuICAgICAgICBVdGlscy5hcnJheU1vdmUodGhpcy5tb2RlbC5zYXZlZFF1ZXJpZXMsIGRyb3AucHJldmlvdXNJbmRleCwgZHJvcC5jdXJyZW50SW5kZXgpO1xuICAgIH1cbn1cbiIsIjxmb3JtIG5hbWU9XCJtYW5hZ2VTYXZlZFF1ZXJpZXNcIiBub3ZhbGlkYXRlPlxuICAgIDxzcS1tb2RhbCBbdGl0bGVdPVwiJ21zZyNtYW5hZ2VTYXZlZFF1ZXJpZXMudGl0bGUnXCIgW2J1dHRvbnNdPVwiYnV0dG9uc1wiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibW9kZWwuc2F2ZWRRdWVyaWVzLmxlbmd0aFwiIGNsYXNzPVwiZm9ybS1ncm91cCBjbGVhcmZpeFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBmbG9hdC1yaWdodFwiIChjbGljayk9XCJyZW9yZGVyKClcIj57eyhyZW9yZGVyaW5nID8gXCJtc2cjbWFuYWdlU2F2ZWRRdWVyaWVzLmVkaXRcIiA6IFwibXNnI21hbmFnZVNhdmVkUXVlcmllcy5yZW9yZGVyXCIpIHwgc3FNZXNzYWdlfX08L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cFwiIGNka0Ryb3BMaXN0IFtjZGtEcm9wTGlzdERhdGFdPVwibW9kZWwuc2F2ZWRRdWVyaWVzXCIgW2Nka0Ryb3BMaXN0RGlzYWJsZWRdPVwiIXJlb3JkZXJpbmdcIiAoY2RrRHJvcExpc3REcm9wcGVkKT1cImRyb3BwZWQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHNhdmVkUXVlcnkgb2YgbW9kZWwuc2F2ZWRRdWVyaWVzOyBsZXQgJGluZGV4ID0gaW5kZXhcIiBjZGtEcmFnIFxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJbJ2xpc3QtZ3JvdXAtaXRlbSBsaXN0LWdyb3VwLWl0ZW0tYWN0aW9uIGQtZmxleCB3LWF1dG8tdW5pbXBvcnRhbnQnLCByZW9yZGVyaW5nID8gJ2N1cnNvci1tb3ZlJzogJyddXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJyZW9yZGVyaW5nXCIgY2xhc3M9XCJzcS1zYXZlZC1xdWVyeS10ZXh0XCI+e3tzYXZlZFF1ZXJ5Lm5hbWV9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3EtZWRpdGFibGUgKm5nSWY9XCIhcmVvcmRlcmluZ1wiIFt2YWx1ZV09XCJzYXZlZFF1ZXJ5Lm5hbWVcIiAodmFsdWVDaGFuZ2UpPVwic2V0TmFtZShzYXZlZFF1ZXJ5LCAkZXZlbnQpXCIgbmFtZT1cIm1zZyNtYW5hZ2VTYXZlZFF1ZXJpZXMubmFtZVwiIFttb2RlbF09XCJzYXZlZFF1ZXJ5XCIgW3ZhbGlkYXRvcnNdPVwibmFtZVZhbGlkYXRvcnNcIj48L3NxLWVkaXRhYmxlPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWwtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcmVvcmRlcmluZyAmJiBzYXZlZFF1ZXJpZXNTZXJ2aWNlLmhhc0V4cG9ydENvbmZpZygpXCIgY2xhc3M9XCJtbC0yXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwiZXhwb3J0KHNhdmVkUXVlcnkpXCIgdGl0bGU9XCJ7eydtc2cjbWFuYWdlU2F2ZWRRdWVyaWVzLmV4cG9ydCcgfCBzcU1lc3NhZ2V9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLWRvd25sb2FkIHNxLWV4cG9ydFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIXJlb3JkZXJpbmcgJiYgc2F2ZWRRdWVyaWVzU2VydmljZS5oYXNSc3NFbmFibGVkKClcIiBjbGFzcz1cIm1sLTJcIiBocmVmPVwie3tzYXZlZFF1ZXJpZXNTZXJ2aWNlLnJzc0hyZWYoc2F2ZWRRdWVyeSl9fVwiIHRhcmdldD1cIl9ibGFua1wiIHRpdGxlPVwie3snbXNnI21hbmFnZVNhdmVkUXVlcmllcy5yc3MnIHwgc3FNZXNzYWdlfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1yc3Mgc3EtcnNzXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhcmVvcmRlcmluZ1wiIGhyZWY9XCIjXCIgKGNsaWNrKT1cInJlbW92ZShzYXZlZFF1ZXJ5LCAkaW5kZXgpXCIgY2xhc3M9XCJtbC0yXCIgdGl0bGU9XCJ7eydtc2cjbWFuYWdlU2F2ZWRRdWVyaWVzLnJlbW92ZScgfCBzcU1lc3NhZ2V9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXRpbWVzIHNxLXJlbW92ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmVvcmRlcmluZ1wiIGNsYXNzPVwibWwtMiBmYXMgZmEtYmFycyBzcS1tb3ZlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NxLW1vZGFsPlxuPC9mb3JtPlxuIl19