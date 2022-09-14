import { Component, Input, Output, ViewChild, ElementRef, EventEmitter, ContentChild, ChangeDetectionStrategy } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { PreviewDocument } from "./preview-document";
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common";
const _c0 = ["tooltip"];
const _c1 = ["documentFrame"];
const _c2 = function (a0) { return { "-ms-zoom": a0, "-moz-transform": "scale(var(--factor))", "-o-transform": "scale(var(--factor))", "-webkit-transform": "scale(var(--factor))" }; };
/**
 * This component manages the iframe containing the document's preview.
 * The main input is the URL of the document's preview.
 * The main output is an event emitter providing an instance of PreviewDocument.
 *
 * PreviewDocument is a wrapper around the HTML Document, allowing to interact with
 * the HTML of the preview (for example to highlight some entities)
 *
 * It is possible to insert a tooltip in the preview via transclusion.
 * Example:
    <sq-preview-document-iframe
        [downloadUrl]="downloadUrl"
        (onPreviewReady)="onPreviewReady($event)">
        <sq-preview-tooltip #tooltip
            [previewDocument]="previewDocument"
            [previewData]="previewDocument">
        </sq-preview-tooltip>
    </sq-preview-document-iframe>
 */
export class PreviewDocumentIframe {
    constructor(cdr, sanitizer) {
        this.cdr = cdr;
        this.sanitizer = sanitizer;
        this.defaultSandbox = "allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts";
        this.scalingFactor = 1.0;
        this.onPreviewReady = new EventEmitter();
        // page could change when location.href change or when user click on a tab (sheet case)
        // when URL a string is sent otherwise a PreviewDocument
        this.pageChange = new EventEmitter();
        this.previewDocLoadHandler = this.onPreviewDocLoad.bind(this);
    }
    onPreviewDocLoad() {
        if (this.downloadUrl === undefined)
            return;
        // previewDocument must be created here when document is fully loaded
        // because in case of sheet, PreviewDocument constructor change.
        this.previewDocument = new PreviewDocument(this.documentFrame);
        // SVG highlight:
        //   background rectangle (highlight) were added to the SVG by the HTML generator (C#), but html generation is
        //   not able to know the geometry of the text. It is up to the browser to compute the position and size of the
        //   background. That needs to be done now that the iFrame is loaded.
        try {
            this.previewDocument.setSvgBackgroundPositionAndSize();
        }
        catch (error) {
            console.error(error);
        }
        /* To catch tab's sheet changes
         * Sheet structure:
         * <iframe #preview>
         *      #document
         *          ...
         *          <frameset>
         *              <iframe name="frSheet"> // current sheet displayed
         *              <iframe name="frTabs">  // contains all sheet's tabs
         *          </frameset>
         *          ...
         * </iframe>
         */
        const sheetFrame = this.documentFrame.nativeElement.contentDocument.getElementsByName("frSheet");
        if (sheetFrame.length > 0) {
            sheetFrame[0].removeEventListener("load", () => { });
            sheetFrame[0].addEventListener("load", () => {
                this.previewDocument = new PreviewDocument(this.documentFrame);
                this.pageChange.next(this.previewDocument);
                this.cdr.markForCheck();
            }, true);
        }
        if (this.tooltip)
            this.addTooltip(this.previewDocument);
        // Let upstream component know document is now ready
        this.onPreviewReady.next(this.previewDocument);
        this.cdr.markForCheck();
    }
    addTooltip(previewDocument) {
        previewDocument.insertComponent(this.tooltip.nativeElement);
    }
    ngOnInit() {
        this.documentFrame.nativeElement.addEventListener("load", this.previewDocLoadHandler, true);
    }
    ngOnDestroy() {
        this.documentFrame.nativeElement.removeEventListener("load", this.previewDocLoadHandler);
    }
    ngOnChanges(simpleChanges) {
        if (simpleChanges.scalingFactor && !simpleChanges.scalingFactor.firstChange) {
            return;
        }
        this.resetContent();
        if (simpleChanges.downloadUrl && simpleChanges.downloadUrl.currentValue !== undefined) {
            // set sandbox attribute only when downloadUrl is defined, so iframe is created without sandbox attribute
            // if sandbox is null, keep sandbox attribute to undefined
            // otherwise put sanbox value in the sanbox attribute or default sandbox value
            this._sandbox = (this.sandbox === null) ? undefined : Utils.isString(this.sandbox) ? this.sandbox : this.defaultSandbox;
            this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.downloadUrl);
        }
    }
    ngAfterViewInit() {
        this.resetContent();
        this.iframeURLChange(this.documentFrame.nativeElement, (newURL) => {
            this.previewDocument = new PreviewDocument(this.documentFrame);
            this.pageChange.next(newURL);
        });
    }
    iframeURLChange(iframe, callback) {
        let lastDispatched = null;
        const dispatchChange = function () {
            if (iframe.contentWindow) {
                const newHref = iframe.contentWindow.location.href;
                if (newHref === "about:blank")
                    return;
                if (newHref !== lastDispatched) {
                    callback(newHref);
                    lastDispatched = newHref;
                }
            }
        };
        const unloadHandler = function (e) {
            setTimeout(dispatchChange, 0);
        };
        function attachUnload() {
            // Remove the unloadHandler in case it was already attached.
            // Otherwise, there will be two handlers, which is unnecessary.
            if (iframe.contentWindow) {
                iframe.contentWindow.removeEventListener("unload", unloadHandler);
                iframe.contentWindow.addEventListener("unload", unloadHandler);
            }
        }
        iframe.addEventListener("load", function () {
            attachUnload();
            // Just in case the change wasn't dispatched during the unload event...
            dispatchChange();
        });
        attachUnload();
    }
    resetContent() {
        this.sanitizedUrlSrc = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
}
PreviewDocumentIframe.ɵfac = function PreviewDocumentIframe_Factory(t) { return new (t || PreviewDocumentIframe)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
PreviewDocumentIframe.ɵcmp = i0.ɵɵdefineComponent({ type: PreviewDocumentIframe, selectors: [["sq-preview-document-iframe"]], contentQueries: function PreviewDocumentIframe_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, _c0, true, ElementRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.tooltip = _t.first);
    } }, viewQuery: function PreviewDocumentIframe_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵstaticViewQuery(_c1, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.documentFrame = _t.first);
    } }, inputs: { sandbox: "sandbox", downloadUrl: "downloadUrl", scalingFactor: "scalingFactor" }, outputs: { onPreviewReady: "onPreviewReady", pageChange: "pageChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 7, consts: [[3, "src", "ngStyle"], ["documentFrame", ""]], template: function PreviewDocumentIframe_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "iframe", 0, 1);
    } if (rf & 2) {
        i0.ɵɵstyleProp("--factor", ctx.scalingFactor);
        i0.ɵɵproperty("src", ctx.sanitizedUrlSrc, i0.ɵɵsanitizeResourceUrl)("ngStyle", i0.ɵɵpureFunction1(5, _c2, ctx.scalingFactor));
        i0.ɵɵattribute("sandbox", ctx._sandbox);
    } }, directives: [i2.NgStyle], styles: ["[_nghost-%COMP%]{\n    flex: 1;\n}\n\n\niframe[_ngcontent-%COMP%] {\n    background-color: white;\n    flex: 1;\n    position: relative;\n    display: block;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    height: calc(100% / var(--factor));\n    width: calc(100% / var(--factor));\n    border: 0;\n\n    -moz-transform-origin: 0 0;\n    -o-transform-origin: 0 0;\n    -webkit-transform-origin: 0 0;\n}\n\n.spinner-grow[_ngcontent-%COMP%] {\n    width: 3rem;\n    height: 3rem\n}"], changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PreviewDocumentIframe, [{
        type: Component,
        args: [{
                selector: "sq-preview-document-iframe",
                template: `
                <iframe #documentFrame
                    [attr.sandbox]="_sandbox"
                    [src]="sanitizedUrlSrc"
                    [style.--factor]="scalingFactor"
                    [ngStyle]="{'-ms-zoom': scalingFactor, '-moz-transform': 'scale(var(--factor))', '-o-transform': 'scale(var(--factor))', '-webkit-transform': 'scale(var(--factor))'}">
                </iframe>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`
:host{
    flex: 1;
}


iframe {
    background-color: white;
    flex: 1;
    position: relative;
    display: block;
    top: 0;
    left: 0;
    bottom: 0;
    height: calc(100% / var(--factor));
    width: calc(100% / var(--factor));
    border: 0;

    -moz-transform-origin: 0 0;
    -o-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
}

.spinner-grow {
    width: 3rem;
    height: 3rem
}
    `]
            }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }]; }, { sandbox: [{
            type: Input
        }], downloadUrl: [{
            type: Input
        }], scalingFactor: [{
            type: Input
        }], onPreviewReady: [{
            type: Output
        }], pageChange: [{
            type: Output
        }], documentFrame: [{
            type: ViewChild,
            args: ['documentFrame', { static: true }]
        }], tooltip: [{
            type: ContentChild,
            args: ['tooltip', { read: ElementRef, static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1kb2N1bWVudC1pZnJhbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvcHJldmlldy8iLCJzb3VyY2VzIjpbInByZXZpZXctZG9jdW1lbnQtaWZyYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFpRix1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwTixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBR3JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUF3Q0gsTUFBTSxPQUFPLHFCQUFxQjtJQXNCOUIsWUFDWSxHQUFzQixFQUN0QixTQUF1QjtRQUR2QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBdkJuQyxtQkFBYyxHQUFXLG1LQUFtSyxDQUFDO1FBR3BMLGtCQUFhLEdBQVcsR0FBRyxDQUFDO1FBQzNCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFFL0QsdUZBQXVGO1FBQ3ZGLHdEQUF3RDtRQUM5QyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFnQjVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxnQkFBZ0I7UUFFbkIsSUFBRyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxPQUFPO1FBQzFDLHFFQUFxRTtRQUNyRSxnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJ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WUFBWSxFQUFFLENBQUM7WUFFZix1RUFBdUU7WUFDdkUsY0FBYyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RixDQUFDOzswRkF0SlEscUJBQXFCOzBEQUFyQixxQkFBcUI7K0NBV0UsVUFBVTs7Ozs7Ozs7OztRQS9DOUIsK0JBS1M7O1FBRkwsNkNBQWdDO1FBRGhDLG1FQUF1QiwwREFBQTtRQUR2Qix1Q0FBeUI7O2tEQW1DaEMscUJBQXFCO2NBdkNqQyxTQUFTO2VBQUM7Z0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7Ozs7MEJBTVk7Z0JBQ3RCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJSLENBQUM7YUFDTDsrRkFHWSxPQUFPO2tCQUFmLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csYUFBYTtrQkFBckIsS0FBSztZQUNJLGNBQWM7a0JBQXZCLE1BQU07WUFJRyxVQUFVO2tCQUFuQixNQUFNO1lBQ3FDLGFBQWE7a0JBQXhELFNBQVM7bUJBQUMsZUFBZSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztZQUNrQixPQUFPO2tCQUFsRSxZQUFZO21CQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25Jbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7IFByZXZpZXdEb2N1bWVudCB9IGZyb20gXCIuL3ByZXZpZXctZG9jdW1lbnRcIjtcblxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IG1hbmFnZXMgdGhlIGlmcmFtZSBjb250YWluaW5nIHRoZSBkb2N1bWVudCdzIHByZXZpZXcuXG4gKiBUaGUgbWFpbiBpbnB1dCBpcyB0aGUgVVJMIG9mIHRoZSBkb2N1bWVudCdzIHByZXZpZXcuXG4gKiBUaGUgbWFpbiBvdXRwdXQgaXMgYW4gZXZlbnQgZW1pdHRlciBwcm92aWRpbmcgYW4gaW5zdGFuY2Ugb2YgUHJldmlld0RvY3VtZW50LlxuICpcbiAqIFByZXZpZXdEb2N1bWVudCBpcyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBIVE1MIERvY3VtZW50LCBhbGxvd2luZyB0byBpbnRlcmFjdCB3aXRoXG4gKiB0aGUgSFRNTCBvZiB0aGUgcHJldmlldyAoZm9yIGV4YW1wbGUgdG8gaGlnaGxpZ2h0IHNvbWUgZW50aXRpZXMpXG4gKlxuICogSXQgaXMgcG9zc2libGUgdG8gaW5zZXJ0IGEgdG9vbHRpcCBpbiB0aGUgcHJldmlldyB2aWEgdHJhbnNjbHVzaW9uLlxuICogRXhhbXBsZTpcbiAgICA8c3EtcHJldmlldy1kb2N1bWVudC1pZnJhbWVcbiAgICAgICAgW2Rvd25sb2FkVXJsXT1cImRvd25sb2FkVXJsXCJcbiAgICAgICAgKG9uUHJldmlld1JlYWR5KT1cIm9uUHJldmlld1JlYWR5KCRldmVudClcIj5cbiAgICAgICAgPHNxLXByZXZpZXctdG9vbHRpcCAjdG9vbHRpcFxuICAgICAgICAgICAgW3ByZXZpZXdEb2N1bWVudF09XCJwcmV2aWV3RG9jdW1lbnRcIlxuICAgICAgICAgICAgW3ByZXZpZXdEYXRhXT1cInByZXZpZXdEb2N1bWVudFwiPlxuICAgICAgICA8L3NxLXByZXZpZXctdG9vbHRpcD5cbiAgICA8L3NxLXByZXZpZXctZG9jdW1lbnQtaWZyYW1lPlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1wcmV2aWV3LWRvY3VtZW50LWlmcmFtZVwiLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgICAgICAgICAgPGlmcmFtZSAjZG9jdW1lbnRGcmFtZVxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5zYW5kYm94XT1cIl9zYW5kYm94XCJcbiAgICAgICAgICAgICAgICAgICAgW3NyY109XCJzYW5pdGl6ZWRVcmxTcmNcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUuLS1mYWN0b3JdPVwic2NhbGluZ0ZhY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsnLW1zLXpvb20nOiBzY2FsaW5nRmFjdG9yLCAnLW1vei10cmFuc2Zvcm0nOiAnc2NhbGUodmFyKC0tZmFjdG9yKSknLCAnLW8tdHJhbnNmb3JtJzogJ3NjYWxlKHZhcigtLWZhY3RvcikpJywgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3NjYWxlKHZhcigtLWZhY3RvcikpJ31cIj5cbiAgICAgICAgICAgICAgICA8L2lmcmFtZT5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHN0eWxlczogW2Bcbjpob3N0e1xuICAgIGZsZXg6IDE7XG59XG5cblxuaWZyYW1lIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBmbGV4OiAxO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLyB2YXIoLS1mYWN0b3IpKTtcbiAgICB3aWR0aDogY2FsYygxMDAlIC8gdmFyKC0tZmFjdG9yKSk7XG4gICAgYm9yZGVyOiAwO1xuXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiAwIDA7XG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMCAwO1xufVxuXG4uc3Bpbm5lci1ncm93IHtcbiAgICB3aWR0aDogM3JlbTtcbiAgICBoZWlnaHQ6IDNyZW1cbn1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBQcmV2aWV3RG9jdW1lbnRJZnJhbWUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgICBkZWZhdWx0U2FuZGJveDogc3RyaW5nID0gXCJhbGxvdy1mb3JtcyBhbGxvdy1tb2RhbHMgYWxsb3ctb3JpZW50YXRpb24tbG9jayBhbGxvdy1wb2ludGVyLWxvY2sgYWxsb3ctcG9wdXBzIGFsbG93LXBvcHVwcy10by1lc2NhcGUtc2FuZGJveCBhbGxvdy1wcmVzZW50YXRpb24gYWxsb3ctc2FtZS1vcmlnaW4gYWxsb3ctc2NyaXB0c1wiO1xuICAgIEBJbnB1dCgpIHNhbmRib3g6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgQElucHV0KCkgZG93bmxvYWRVcmw6IHN0cmluZztcbiAgICBASW5wdXQoKSBzY2FsaW5nRmFjdG9yOiBudW1iZXIgPSAxLjA7XG4gICAgQE91dHB1dCgpIG9uUHJldmlld1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxQcmV2aWV3RG9jdW1lbnQ+KCk7XG4gICAgXG4gICAgLy8gcGFnZSBjb3VsZCBjaGFuZ2Ugd2hlbiBsb2NhdGlvbi5ocmVmIGNoYW5nZSBvciB3aGVuIHVzZXIgY2xpY2sgb24gYSB0YWIgKHNoZWV0IGNhc2UpXG4gICAgLy8gd2hlbiBVUkwgYSBzdHJpbmcgaXMgc2VudCBvdGhlcndpc2UgYSBQcmV2aWV3RG9jdW1lbnRcbiAgICBAT3V0cHV0KCkgcGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgUHJldmlld0RvY3VtZW50PigpO1xuICAgIEBWaWV3Q2hpbGQoJ2RvY3VtZW50RnJhbWUnLCB7c3RhdGljOiB0cnVlfSkgZG9jdW1lbnRGcmFtZTogRWxlbWVudFJlZjsgIC8vIFJlZmVyZW5jZSB0byB0aGUgcHJldmlldyBIVE1MIGluIHRoZSBpZnJhbWVcbiAgICBAQ29udGVudENoaWxkKCd0b29sdGlwJywge3JlYWQ6IEVsZW1lbnRSZWYsIHN0YXRpYzogZmFsc2V9KSB0b29sdGlwOiBFbGVtZW50UmVmOyAvLyBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDUzNDM4MTAvaG93LXRvLWFjY2Vzcy10aGUtbmF0aXZlZWxlbWVudC1vZi1hLWNvbXBvbmVudC1pbi1hbmd1bGFyNFxuXG4gICAgcHVibGljIHNhbml0aXplZFVybFNyYzogU2FmZVJlc291cmNlVXJsO1xuICAgIC8vIE11c3QgYmUgdW5kZWZpbmVkIGJ5IGRlZmF1bHQsIGJlY2F1c2UgaWYgYSBkZWZhdWx0IHZhbHVlIGlzIHNldCwgXG4gICAgLy8gaWYgd2Ugc2V0IGl0IHRvIHVuZGVmaW5lZCBpbiB0aGUgZnV0dXJlLCB0aGlzIG5ldyAodW5kZWZpbmVkKSB2YWx1ZSBcbiAgICAvLyBpcyBub3QgdXNlZCBieSB0aGUgaUZyYW1lIGFzIGlmIGl0IHVzZWQgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgcHVibGljIF9zYW5kYm94OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIFxuICAgIHByaXZhdGUgcHJldmlld0RvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQ7XG4gICAgcmVhZG9ubHkgcHJldmlld0RvY0xvYWRIYW5kbGVyO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3RG9jTG9hZEhhbmRsZXIgPSB0aGlzLm9uUHJldmlld0RvY0xvYWQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25QcmV2aWV3RG9jTG9hZCgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuZG93bmxvYWRVcmwgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICAvLyBwcmV2aWV3RG9jdW1lbnQgbXVzdCBiZSBjcmVhdGVkIGhlcmUgd2hlbiBkb2N1bWVudCBpcyBmdWxseSBsb2FkZWRcbiAgICAgICAgLy8gYmVjYXVzZSBpbiBjYXNlIG9mIHNoZWV0LCBQcmV2aWV3RG9jdW1lbnQgY29uc3RydWN0b3IgY2hhbmdlLlxuICAgICAgICB0aGlzLnByZXZpZXdEb2N1bWVudCA9IG5ldyBQcmV2aWV3RG9jdW1lbnQodGhpcy5kb2N1bWVudEZyYW1lKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFNWRyBoaWdobGlnaHQ6XG4gICAgICAgIC8vICAgYmFja2dyb3VuZCByZWN0YW5nbGUgKGhpZ2hsaWdodCkgd2VyZSBhZGRlZCB0byB0aGUgU1ZHIGJ5IHRoZSBIVE1MIGdlbmVyYXRvciAoQyMpLCBidXQgaHRtbCBnZW5lcmF0aW9uIGlzXG4gICAgICAgIC8vICAgbm90IGFibGUgdG8ga25vdyB0aGUgZ2VvbWV0cnkgb2YgdGhlIHRleHQuIEl0IGlzIHVwIHRvIHRoZSBicm93c2VyIHRvIGNvbXB1dGUgdGhlIHBvc2l0aW9uIGFuZCBzaXplIG9mIHRoZVxuICAgICAgICAvLyAgIGJhY2tncm91bmQuIFRoYXQgbmVlZHMgdG8gYmUgZG9uZSBub3cgdGhhdCB0aGUgaUZyYW1lIGlzIGxvYWRlZC5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucHJldmlld0RvY3VtZW50LnNldFN2Z0JhY2tncm91bmRQb3NpdGlvbkFuZFNpemUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogVG8gY2F0Y2ggdGFiJ3Mgc2hlZXQgY2hhbmdlc1xuICAgICAgICAgKiBTaGVldCBzdHJ1Y3R1cmU6XG4gICAgICAgICAqIDxpZnJhbWUgI3ByZXZpZXc+XG4gICAgICAgICAqICAgICAgI2RvY3VtZW50XG4gICAgICAgICAqICAgICAgICAgIC4uLlxuICAgICAgICAgKiAgICAgICAgICA8ZnJhbWVzZXQ+XG4gICAgICAgICAqICAgICAgICAgICAgICA8aWZyYW1lIG5hbWU9XCJmclNoZWV0XCI+IC8vIGN1cnJlbnQgc2hlZXQgZGlzcGxheWVkXG4gICAgICAgICAqICAgICAgICAgICAgICA8aWZyYW1lIG5hbWU9XCJmclRhYnNcIj4gIC8vIGNvbnRhaW5zIGFsbCBzaGVldCdzIHRhYnNcbiAgICAgICAgICogICAgICAgICAgPC9mcmFtZXNldD5cbiAgICAgICAgICogICAgICAgICAgLi4uXG4gICAgICAgICAqIDwvaWZyYW1lPlxuICAgICAgICAgKi8gXG4gICAgICAgIGNvbnN0IHNoZWV0RnJhbWUgPSB0aGlzLmRvY3VtZW50RnJhbWUubmF0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJmclNoZWV0XCIpO1xuICAgICAgICBpZihzaGVldEZyYW1lLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNoZWV0RnJhbWVbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge30pO1xuICAgICAgICAgICAgc2hlZXRGcmFtZVswXS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3RG9jdW1lbnQgPSBuZXcgUHJldmlld0RvY3VtZW50KHRoaXMuZG9jdW1lbnRGcmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlQ2hhbmdlLm5leHQodGhpcy5wcmV2aWV3RG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b29sdGlwKVxuICAgICAgICAgICAgdGhpcy5hZGRUb29sdGlwKHRoaXMucHJldmlld0RvY3VtZW50KTtcblxuICAgICAgICAvLyBMZXQgdXBzdHJlYW0gY29tcG9uZW50IGtub3cgZG9jdW1lbnQgaXMgbm93IHJlYWR5XG4gICAgICAgIHRoaXMub25QcmV2aWV3UmVhZHkubmV4dCh0aGlzLnByZXZpZXdEb2N1bWVudCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIGFkZFRvb2x0aXAocHJldmlld0RvY3VtZW50OiBQcmV2aWV3RG9jdW1lbnQpIHtcbiAgICAgICAgcHJldmlld0RvY3VtZW50Lmluc2VydENvbXBvbmVudCh0aGlzLnRvb2x0aXAubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRGcmFtZS5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHRoaXMucHJldmlld0RvY0xvYWRIYW5kbGVyLCB0cnVlKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudEZyYW1lLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5wcmV2aWV3RG9jTG9hZEhhbmRsZXIpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMuc2NhbGluZ0ZhY3RvciAmJiAhc2ltcGxlQ2hhbmdlcy5zY2FsaW5nRmFjdG9yLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc2V0Q29udGVudCgpO1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy5kb3dubG9hZFVybCAmJiBzaW1wbGVDaGFuZ2VzLmRvd25sb2FkVXJsLmN1cnJlbnRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBzZXQgc2FuZGJveCBhdHRyaWJ1dGUgb25seSB3aGVuIGRvd25sb2FkVXJsIGlzIGRlZmluZWQsIHNvIGlmcmFtZSBpcyBjcmVhdGVkIHdpdGhvdXQgc2FuZGJveCBhdHRyaWJ1dGVcbiAgICAgICAgICAgIC8vIGlmIHNhbmRib3ggaXMgbnVsbCwga2VlcCBzYW5kYm94IGF0dHJpYnV0ZSB0byB1bmRlZmluZWRcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBwdXQgc2FuYm94IHZhbHVlIGluIHRoZSBzYW5ib3ggYXR0cmlidXRlIG9yIGRlZmF1bHQgc2FuZGJveCB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5fc2FuZGJveCA9ICh0aGlzLnNhbmRib3ggPT09IG51bGwpID8gdW5kZWZpbmVkIDogVXRpbHMuaXNTdHJpbmcodGhpcy5zYW5kYm94KSA/IHRoaXMuc2FuZGJveCA6IHRoaXMuZGVmYXVsdFNhbmRib3g7XG4gICAgICAgICAgICB0aGlzLnNhbml0aXplZFVybFNyYyA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0aGlzLmRvd25sb2FkVXJsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZXNldENvbnRlbnQoKTtcbiAgICAgICAgdGhpcy5pZnJhbWVVUkxDaGFuZ2UodGhpcy5kb2N1bWVudEZyYW1lLm5hdGl2ZUVsZW1lbnQsIChuZXdVUkw6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcmV2aWV3RG9jdW1lbnQgPSBuZXcgUHJldmlld0RvY3VtZW50KHRoaXMuZG9jdW1lbnRGcmFtZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2VDaGFuZ2UubmV4dChuZXdVUkwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZnJhbWVVUkxDaGFuZ2UoaWZyYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgbGFzdERpc3BhdGNoZWQgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IGRpc3BhdGNoQ2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SHJlZiA9IGlmcmFtZS5jb250ZW50V2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0hyZWYgPT09IFwiYWJvdXQ6YmxhbmtcIikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChuZXdIcmVmICE9PSBsYXN0RGlzcGF0Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhuZXdIcmVmKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdERpc3BhdGNoZWQgPSBuZXdIcmVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24gKGU6IEV2ZW50KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGRpc3BhdGNoQ2hhbmdlLCAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hVbmxvYWQoKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHVubG9hZEhhbmRsZXIgaW4gY2FzZSBpdCB3YXMgYWxyZWFkeSBhdHRhY2hlZC5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgdGhlcmUgd2lsbCBiZSB0d28gaGFuZGxlcnMsIHdoaWNoIGlzIHVubmVjZXNzYXJ5LlxuICAgICAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLCB1bmxvYWRIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBpZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWZyYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgYXR0YWNoVW5sb2FkKCk7XG5cbiAgICAgICAgICAgIC8vIEp1c3QgaW4gY2FzZSB0aGUgY2hhbmdlIHdhc24ndCBkaXNwYXRjaGVkIGR1cmluZyB0aGUgdW5sb2FkIGV2ZW50Li4uXG4gICAgICAgICAgICBkaXNwYXRjaENoYW5nZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhdHRhY2hVbmxvYWQoKTtcbiAgICB9XG5cbiAgICByZXNldENvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuc2FuaXRpemVkVXJsU3JjID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCdhYm91dDpibGFuaycpO1xuICAgIH1cbn1cbiJdfQ==