import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
import { AbstractFacet } from '@sinequa/components/facet';
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "../../preview.service";
import * as i2 from "@angular/common";
import * as i3 from "../../preview-document-iframe.component";
import * as i4 from "@sinequa/components/result";
import * as i5 from "@sinequa/components/metadata";
function BsFacetPreviewComponent2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-result-title", 4);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("record", ctx_r1.record)("originalDocTarget", ctx_r1.originalDocTarget);
} }
function BsFacetPreviewComponent2_ng_template_4_sq_metadata_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "sq-metadata", 6);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("record", ctx_r4.record)("items", ctx_r4.metadata)("showTitles", true)("showIcons", true)("clickable", false);
} }
function BsFacetPreviewComponent2_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, BsFacetPreviewComponent2_ng_template_4_sq_metadata_0_Template, 1, 5, "sq-metadata", 5);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r3.metadata && ctx_r3.metadata.length > 0);
} }
const _c0 = function () { return { "height.%": 100 }; };
export class BsFacetPreviewComponent2 extends AbstractFacet {
    constructor(previewService) {
        super();
        this.previewService = previewService;
        this.height = 500;
        this.scalingFactor = 0.6;
        this.metadata = [];
        this.expandModal = true;
        this.closable = true;
        this.highlightActions = true;
        this.recordClosed = new EventEmitter();
        this.previewLoaded = new EventEmitter();
        this._height = this.height;
        this.scaleFactorThreshold = 0.1;
        this.loaded = false;
        this.closeAction = new Action({
            icon: "fas fa-times",
            title: "msg#facet.preview.closeTitle",
            action: () => {
                this.recordClosed.next();
            }
        });
        this.expandModalAction = new Action({
            icon: "far fa-window-maximize",
            title: "msg#facet.preview.expandTitle",
            action: () => {
                this.previewService.openModal(this.record, this.query, {
                    displaySimilarDocuments: false,
                    metadata: this.metadata
                });
            }
        });
        this.toggleEntitiesAction = new Action({
            icon: "fas fa-lightbulb",
            title: "msg#facet.preview.toggleEntities",
            selected: true,
            action: (action) => {
                var _a;
                action.selected = !action.selected;
                if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.highlightsPerCategory) {
                    Object.keys(this.data.highlightsPerCategory)
                        .filter(value => value !== "extractslocations" && value !== "matchlocations")
                        .forEach(cat => { var _a; return (_a = this.document) === null || _a === void 0 ? void 0 : _a.toggleHighlight(cat, action.selected); });
                }
            }
        });
        this.toggleExtractsAction = new Action({
            icon: "fas fa-highlighter",
            title: "msg#facet.preview.toggleExtracts",
            selected: true,
            action: (action) => {
                var _a, _b;
                action.selected = !action.selected;
                (_a = this.document) === null || _a === void 0 ? void 0 : _a.toggleHighlight("matchlocations", action.selected);
                (_b = this.document) === null || _b === void 0 ? void 0 : _b.toggleHighlight("extractslocations", action.selected);
            }
        });
        this.maximizeAction = new Action({
            icon: "fas fa-search-plus",
            title: "msg#facet.preview.maximize",
            action: () => {
                this.scalingFactor = this.scalingFactor + this.scaleFactorThreshold;
            }
        });
        this.minimizeAction = new Action({
            icon: "fas fa-search-minus",
            title: "msg#facet.preview.minimize",
            disabled: this.scalingFactor === 0.1,
            action: () => {
                this.scalingFactor = Math.round(Math.max(0.1, this.scalingFactor - this.scaleFactorThreshold) * 100) / 100;
            },
            updater: (action) => {
                action.disabled = this.scalingFactor === 0.1;
            }
        });
    }
    get actions() {
        const actions = [];
        if (this.customActions) {
            actions.push(...this.customActions);
        }
        if (this.highlightActions) {
            actions.push(this.toggleExtractsAction, this.toggleEntitiesAction);
        }
        this.minimizeAction.update();
        actions.push(this.minimizeAction, this.maximizeAction);
        if (this.expandModal) {
            actions.push(this.expandModalAction);
        }
        if (this.closable) {
            actions.push(this.closeAction);
        }
        return actions;
    }
    ngOnChanges(changes) {
        if (changes["record"]) {
            this.previewService.getPreviewData(this.record.id, this.query).subscribe(previewData => {
                this.data = previewData;
                this.downloadUrl = this.data ? this.previewService.makeDownloadUrl(this.data.documentCachedContentUrl) : undefined;
            });
            this.downloadUrl = undefined;
            this.data = undefined;
            this.document = undefined;
        }
        if (changes["height"] || changes["scalingFactor"]) {
            this._height = this.height;
        }
    }
    ngAfterViewChecked() {
        if (this.document && this.loaded) {
            this.loaded = false;
            // as now view is checked, emit event
            this.previewLoaded.emit(this.document);
        }
    }
    onPreviewReady(document) {
        this.document = document;
        if (this.document && this.filters) {
            this.document.filterHighlights(this.filters);
        }
        this.loaded = true;
    }
}
BsFacetPreviewComponent2.ɵfac = function BsFacetPreviewComponent2_Factory(t) { return new (t || BsFacetPreviewComponent2)(i0.ɵɵdirectiveInject(i1.PreviewService)); };
BsFacetPreviewComponent2.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetPreviewComponent2, selectors: [["sq-facet-preview-2"]], hostVars: 2, hostBindings: function BsFacetPreviewComponent2_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵstyleProp("height", ctx._height, "px");
    } }, inputs: { record: "record", query: "query", iframeClass: "iframeClass", sandbox: "sandbox", height: "height", scalingFactor: "scalingFactor", metadata: "metadata", expandModal: "expandModal", closable: "closable", highlightActions: "highlightActions", customActions: "customActions", filters: "filters", originalDocTarget: "originalDocTarget" }, outputs: { recordClosed: "recordClosed", previewLoaded: "previewLoaded" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 6, vars: 8, consts: [[3, "ngStyle"], [3, "sandbox", "downloadUrl", "scalingFactor", "onPreviewReady"], ["headerTpl", ""], ["subHeaderTpl", ""], ["titleLinkBehavior", "open-if-url", 1, "flex-grow-1", "flex-basis-0", 3, "record", "originalDocTarget"], [3, "record", "items", "showTitles", "showIcons", "clickable", 4, "ngIf"], [3, "record", "items", "showTitles", "showIcons", "clickable"]], template: function BsFacetPreviewComponent2_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "sq-preview-document-iframe", 1);
        i0.ɵɵlistener("onPreviewReady", function BsFacetPreviewComponent2_Template_sq_preview_document_iframe_onPreviewReady_1_listener($event) { return ctx.onPreviewReady($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, BsFacetPreviewComponent2_ng_template_2_Template, 1, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(4, BsFacetPreviewComponent2_ng_template_4_Template, 1, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵclassMapInterpolate1("d-flex flex-column ", ctx.iframeClass, "");
        i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction0(7, _c0));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("sandbox", ctx.sandbox)("downloadUrl", ctx.downloadUrl)("scalingFactor", ctx.scalingFactor);
    } }, directives: [i2.NgStyle, i3.PreviewDocumentIframe, i4.ResultTitle, i2.NgIf, i5.Metadata], styles: ["[_nghost-%COMP%]{display:block;overflow:hidden}.sq-app-loading[_ngcontent-%COMP%]{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetPreviewComponent2, [{
        type: Component,
        args: [{
                selector: 'sq-facet-preview-2',
                templateUrl: './facet-preview.component.html',
                styleUrls: ['./facet-preview.component.scss']
            }]
    }], function () { return [{ type: i1.PreviewService }]; }, { record: [{
            type: Input
        }], query: [{
            type: Input
        }], iframeClass: [{
            type: Input
        }], sandbox: [{
            type: Input
        }], height: [{
            type: Input
        }], scalingFactor: [{
            type: Input
        }], metadata: [{
            type: Input
        }], expandModal: [{
            type: Input
        }], closable: [{
            type: Input
        }], highlightActions: [{
            type: Input
        }], customActions: [{
            type: Input
        }], filters: [{
            type: Input
        }], originalDocTarget: [{
            type: Input
        }], recordClosed: [{
            type: Output
        }], previewLoaded: [{
            type: Output
        }], _height: [{
            type: HostBinding,
            args: ['style.height.px']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9wcmV2aWV3LyIsInNvdXJjZXMiOlsiYm9vdHN0cmFwL2ZhY2V0LXByZXZpZXctMi9mYWNldC1wcmV2aWV3LmNvbXBvbmVudC50cyIsImJvb3RzdHJhcC9mYWNldC1wcmV2aWV3LTIvZmFjZXQtcHJldmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUE0QixXQUFXLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBTWhJLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0lDR2hELHFDQUE4Sjs7O0lBQTVHLHNDQUFpQiwrQ0FBQTs7O0lBSW5FLGlDQU1jOzs7SUFMVixzQ0FBaUIsMEJBQUEsb0JBQUEsbUJBQUEsb0JBQUE7OztJQURyQix1R0FNYzs7O0lBTkEsb0VBQXFDOzs7QURBdkQsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGFBQWE7SUFpQ3pELFlBQ1ksY0FBOEI7UUFFeEMsS0FBSyxFQUFFLENBQUM7UUFGRSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUE1QmpDLFdBQU0sR0FBRyxHQUFHLENBQUM7UUFDYixrQkFBYSxHQUFHLEdBQUcsQ0FBQztRQUNwQixhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBSXZCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN4QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzlCLFlBQU8sR0FBVyxJQUFJLENB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QU8sQ0FBQyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Z0dBNUpVLHdCQUF3Qjs2REFBeEIsd0JBQXdCOzs7UUNkckMsOEJBQ0k7UUFBQSxxREFLQTtRQUQ0QixpSkFBa0IsMEJBQXNCLElBQUM7UUFDckUsaUJBQTZCO1FBQ2pDLGlCQUFNO1FBRU4sMEhBRWM7UUFFZCwwSEFRYzs7UUFyQlQscUVBQTBDO1FBQUMsb0RBQTZCO1FBRTdDLGVBQW1CO1FBQW5CLHFDQUFtQixnQ0FBQSxvQ0FBQTs7a0REWXRDLHdCQUF3QjtjQUxwQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0MsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7YUFDOUM7aUVBR1UsTUFBTTtrQkFBZCxLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxnQkFBZ0I7a0JBQXhCLEtBQUs7WUFDRyxhQUFhO2tCQUFyQixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csaUJBQWlCO2tCQUF6QixLQUFLO1lBQ0ksWUFBWTtrQkFBckIsTUFBTTtZQUNHLGFBQWE7a0JBQXRCLE1BQU07WUFDeUIsT0FBTztrQkFBdEMsV0FBVzttQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBIb3N0QmluZGluZywgQWZ0ZXJWaWV3Q2hlY2tlZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tICdAc2luZXF1YS9jb3JlL2FwcC11dGlscyc7XG5pbXBvcnQgeyBSZWNvcmQsIFByZXZpZXdEYXRhIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzXCI7XG5pbXBvcnQgeyBQcmV2aWV3U2VydmljZSB9IGZyb20gXCIuLi8uLi9wcmV2aWV3LnNlcnZpY2VcIjtcbmltcG9ydCB7IFByZXZpZXdEb2N1bWVudCwgSGlnaGxpZ2h0RmlsdGVycyB9IGZyb20gXCIuLi8uLi9wcmV2aWV3LWRvY3VtZW50XCI7XG5pbXBvcnQgeyBBYnN0cmFjdEZhY2V0IH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9mYWNldCc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAc2luZXF1YS9jb21wb25lbnRzL2FjdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NxLWZhY2V0LXByZXZpZXctMicsXG4gIHRlbXBsYXRlVXJsOiAnLi9mYWNldC1wcmV2aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmFjZXQtcHJldmlldy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRQcmV2aWV3Q29tcG9uZW50MiBleHRlbmRzIEFic3RyYWN0RmFjZXQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0NoZWNrZWQge1xuXG4gIEBJbnB1dCgpIHJlY29yZDogUmVjb3JkO1xuICBASW5wdXQoKSBxdWVyeTogUXVlcnk7XG4gIEBJbnB1dCgpIGlmcmFtZUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNhbmRib3ggOiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoKSBoZWlnaHQgPSA1MDA7XG4gIEBJbnB1dCgpIHNjYWxpbmdGYWN0b3IgPSAwLjY7XG4gIEBJbnB1dCgpIG1ldGFkYXRhOiBzdHJpbmdbXSA9IFtdO1xuICBASW5wdXQoKSBleHBhbmRNb2RhbCA9IHRydWU7XG4gIEBJbnB1dCgpIGNsb3NhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgaGlnaGxpZ2h0QWN0aW9ucyA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbUFjdGlvbnM6IEFjdGlvbltdO1xuICBASW5wdXQoKSBmaWx0ZXJzOiBIaWdobGlnaHRGaWx0ZXJzO1xuICBASW5wdXQoKSBvcmlnaW5hbERvY1RhcmdldDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBAT3V0cHV0KCkgcmVjb3JkQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcHJldmlld0xvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8UHJldmlld0RvY3VtZW50PigpO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpIF9oZWlnaHQ6IG51bWJlciA9IHRoaXMuaGVpZ2h0O1xuXG4gIHByaXZhdGUgY2xvc2VBY3Rpb246IEFjdGlvbjtcbiAgcHJpdmF0ZSBleHBhbmRNb2RhbEFjdGlvbjogQWN0aW9uO1xuICBwcml2YXRlIHRvZ2dsZUVudGl0aWVzQWN0aW9uOiBBY3Rpb247XG4gIHByaXZhdGUgdG9nZ2xlRXh0cmFjdHNBY3Rpb246IEFjdGlvbjtcbiAgcHJpdmF0ZSBtaW5pbWl6ZUFjdGlvbjogQWN0aW9uO1xuICBwcml2YXRlIG1heGltaXplQWN0aW9uOiBBY3Rpb247XG5cbiAgZGF0YT86IFByZXZpZXdEYXRhO1xuICBkb2N1bWVudD86IFByZXZpZXdEb2N1bWVudDtcbiAgZG93bmxvYWRVcmw/OiBTYWZlUmVzb3VyY2VVcmw7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzY2FsZUZhY3RvclRocmVzaG9sZCA9IDAuMTtcbiAgcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcHJldmlld1NlcnZpY2U6IFByZXZpZXdTZXJ2aWNlKSB7XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jbG9zZUFjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgaWNvbjogXCJmYXMgZmEtdGltZXNcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5wcmV2aWV3LmNsb3NlVGl0bGVcIixcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICB0aGlzLnJlY29yZENsb3NlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmV4cGFuZE1vZGFsQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhciBmYS13aW5kb3ctbWF4aW1pemVcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5wcmV2aWV3LmV4cGFuZFRpdGxlXCIsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5wcmV2aWV3U2VydmljZS5vcGVuTW9kYWwodGhpcy5yZWNvcmQsIHRoaXMucXVlcnksIHtcbiAgICAgICAgICBkaXNwbGF5U2ltaWxhckRvY3VtZW50czogZmFsc2UsXG4gICAgICAgICAgbWV0YWRhdGE6IHRoaXMubWV0YWRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnRvZ2dsZUVudGl0aWVzQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhcyBmYS1saWdodGJ1bGJcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5wcmV2aWV3LnRvZ2dsZUVudGl0aWVzXCIsXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgIGFjdGlvbjogKGFjdGlvbikgPT4ge1xuICAgICAgICBhY3Rpb24uc2VsZWN0ZWQgPSAhYWN0aW9uLnNlbGVjdGVkO1xuICAgICAgICBpZih0aGlzLmRhdGE/LmhpZ2hsaWdodHNQZXJDYXRlZ29yeSkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZGF0YS5oaWdobGlnaHRzUGVyQ2F0ZWdvcnkpXG4gICAgICAgICAgICAuZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9PSBcImV4dHJhY3RzbG9jYXRpb25zXCIgJiYgdmFsdWUgIT09IFwibWF0Y2hsb2NhdGlvbnNcIilcbiAgICAgICAgICAgIC5mb3JFYWNoKGNhdCA9PlxuICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50Py50b2dnbGVIaWdobGlnaHQoY2F0LCBhY3Rpb24uc2VsZWN0ZWQhKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy50b2dnbGVFeHRyYWN0c0FjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICBpY29uOiBcImZhcyBmYS1oaWdobGlnaHRlclwiLFxuICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQucHJldmlldy50b2dnbGVFeHRyYWN0c1wiLFxuICAgICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICAgICAgYWN0aW9uOiAoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBhY3Rpb24uc2VsZWN0ZWQgPSAhYWN0aW9uLnNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudD8udG9nZ2xlSGlnaGxpZ2h0KFwibWF0Y2hsb2NhdGlvbnNcIiwgYWN0aW9uLnNlbGVjdGVkKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQ/LnRvZ2dsZUhpZ2hsaWdodChcImV4dHJhY3RzbG9jYXRpb25zXCIsIGFjdGlvbi5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMubWF4aW1pemVBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgIGljb246IFwiZmFzIGZhLXNlYXJjaC1wbHVzXCIsXG4gICAgICB0aXRsZTogXCJtc2cjZmFjZXQucHJldmlldy5tYXhpbWl6ZVwiLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NhbGluZ0ZhY3RvciA9IHRoaXMuc2NhbGluZ0ZhY3RvciArIHRoaXMuc2NhbGVGYWN0b3JUaHJlc2hvbGQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm1pbmltaXplQWN0aW9uID0gbmV3IEFjdGlvbih7XG4gICAgICBpY29uOiBcImZhcyBmYS1zZWFyY2gtbWludXNcIixcbiAgICAgIHRpdGxlOiBcIm1zZyNmYWNldC5wcmV2aWV3Lm1pbmltaXplXCIsXG4gICAgICBkaXNhYmxlZDogdGhpcy5zY2FsaW5nRmFjdG9yID09PSAwLjEsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2FsaW5nRmFjdG9yID0gTWF0aC5yb3VuZChNYXRoLm1heCgwLjEsIHRoaXMuc2NhbGluZ0ZhY3RvciAtIHRoaXMuc2NhbGVGYWN0b3JUaHJlc2hvbGQpICogMTAwKSAvIDEwMDtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVyOiAoYWN0aW9uKSA9PiB7XG4gICAgICAgIGFjdGlvbi5kaXNhYmxlZCA9IHRoaXMuc2NhbGluZ0ZhY3RvciA9PT0gMC4xO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBnZXQgYWN0aW9ucygpOiBBY3Rpb25bXSB7XG4gICAgY29uc3QgYWN0aW9uczogQWN0aW9uW10gPSBbXTtcbiAgICBpZih0aGlzLmN1c3RvbUFjdGlvbnMpe1xuICAgICAgYWN0aW9ucy5wdXNoKC4uLnRoaXMuY3VzdG9tQWN0aW9ucyk7XG4gICAgfVxuICAgIGlmKHRoaXMuaGlnaGxpZ2h0QWN0aW9ucykge1xuICAgICAgYWN0aW9ucy5wdXNoKHRoaXMudG9nZ2xlRXh0cmFjdHNBY3Rpb24sIHRoaXMudG9nZ2xlRW50aXRpZXNBY3Rpb24pO1xuICAgIH1cbiAgICB0aGlzLm1pbmltaXplQWN0aW9uLnVwZGF0ZSgpO1xuICAgIGFjdGlvbnMucHVzaCh0aGlzLm1pbmltaXplQWN0aW9uLCB0aGlzLm1heGltaXplQWN0aW9uKTtcbiAgICBpZih0aGlzLmV4cGFuZE1vZGFsKXtcbiAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmV4cGFuZE1vZGFsQWN0aW9uKTtcbiAgICB9XG4gICAgaWYodGhpcy5jbG9zYWJsZSl7XG4gICAgICBhY3Rpb25zLnB1c2godGhpcy5jbG9zZUFjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBhY3Rpb25zO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzW1wicmVjb3JkXCJdKSB7XG4gICAgICB0aGlzLnByZXZpZXdTZXJ2aWNlLmdldFByZXZpZXdEYXRhKHRoaXMucmVjb3JkLmlkLCB0aGlzLnF1ZXJ5KS5zdWJzY3JpYmUoXG4gICAgICAgIHByZXZpZXdEYXRhID0+IHtcbiAgICAgICAgICB0aGlzLmRhdGEgPSBwcmV2aWV3RGF0YTtcbiAgICAgICAgICB0aGlzLmRvd25sb2FkVXJsID0gdGhpcy5kYXRhID8gdGhpcy5wcmV2aWV3U2VydmljZS5tYWtlRG93bmxvYWRVcmwodGhpcy5kYXRhLmRvY3VtZW50Q2FjaGVkQ29udGVudFVybCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5kb3dubG9hZFVybCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9jdW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmKGNoYW5nZXNbXCJoZWlnaHRcIl0gfHwgY2hhbmdlc1tcInNjYWxpbmdGYWN0b3JcIl0pIHtcbiAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudCAmJiB0aGlzLmxvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcbiAgICAgIC8vIGFzIG5vdyB2aWV3IGlzIGNoZWNrZWQsIGVtaXQgZXZlbnRcbiAgICAgIHRoaXMucHJldmlld0xvYWRlZC5lbWl0KHRoaXMuZG9jdW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIG9uUHJldmlld1JlYWR5KGRvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgaWYgKHRoaXMuZG9jdW1lbnQgJiYgdGhpcy5maWx0ZXJzKSB7XG4gICAgICB0aGlzLmRvY3VtZW50LmZpbHRlckhpZ2hsaWdodHModGhpcy5maWx0ZXJzKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJkLWZsZXggZmxleC1jb2x1bW4ge3tpZnJhbWVDbGFzc319XCIgW25nU3R5bGVdPVwieydoZWlnaHQuJSc6IDEwMH1cIj5cbiAgICA8c3EtcHJldmlldy1kb2N1bWVudC1pZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NhbmRib3hdPVwic2FuZGJveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkb3dubG9hZFVybF09XCJkb3dubG9hZFVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzY2FsaW5nRmFjdG9yXT1cInNjYWxpbmdGYWN0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob25QcmV2aWV3UmVhZHkpPVwib25QcmV2aWV3UmVhZHkoJGV2ZW50KVwiPlxuICAgIDwvc3EtcHJldmlldy1kb2N1bWVudC1pZnJhbWU+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNoZWFkZXJUcGw+XG4gICAgPHNxLXJlc3VsdC10aXRsZSBjbGFzcz1cImZsZXgtZ3Jvdy0xIGZsZXgtYmFzaXMtMFwiIFtyZWNvcmRdPVwicmVjb3JkXCIgW29yaWdpbmFsRG9jVGFyZ2V0XT1cIm9yaWdpbmFsRG9jVGFyZ2V0XCIgdGl0bGVMaW5rQmVoYXZpb3I9XCJvcGVuLWlmLXVybFwiPjwvc3EtcmVzdWx0LXRpdGxlPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICNzdWJIZWFkZXJUcGw+XG4gICAgPHNxLW1ldGFkYXRhICpuZ0lmPVwibWV0YWRhdGEgJiYgbWV0YWRhdGEubGVuZ3RoID4gMFwiXG4gICAgICAgIFtyZWNvcmRdPVwicmVjb3JkXCJcbiAgICAgICAgW2l0ZW1zXT1cIm1ldGFkYXRhXCJcbiAgICAgICAgW3Nob3dUaXRsZXNdPVwidHJ1ZVwiXG4gICAgICAgIFtzaG93SWNvbnNdPVwidHJ1ZVwiXG4gICAgICAgIFtjbGlja2FibGVdPVwiZmFsc2VcIj5cbiAgICA8L3NxLW1ldGFkYXRhPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==