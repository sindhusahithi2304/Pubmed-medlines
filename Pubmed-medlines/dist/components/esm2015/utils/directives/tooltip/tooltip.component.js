import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import * as i0 from "@angular/core";
export class TooltipComponent {
    constructor() {
        this.text = '';
    }
}
TooltipComponent.ɵfac = function TooltipComponent_Factory(t) { return new (t || TooltipComponent)(); };
TooltipComponent.ɵcmp = i0.ɵɵdefineComponent({ type: TooltipComponent, selectors: [["sqx-tooltip"]], inputs: { text: "text" }, decls: 2, vars: 2, consts: [[1, "sq-tooltip"]], template: function TooltipComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("@tooltip", undefined);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.text);
    } }, styles: ["[_nghost-%COMP%]{display:block}[_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%]{background-color:#494949;border-radius:4px;color:#fff;font-size:14px;max-width:280px;padding:.5rem 1rem}.dark[_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .sq-tooltip[_ngcontent-%COMP%]{background-color:#f0f0f0;color:#606060}"], data: { animation: [
            trigger('tooltip', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate(300, style({ opacity: 1 })),
                ]),
                transition(':leave', [
                    animate(300, style({ opacity: 0 })),
                ]),
            ]),
        ] }, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TooltipComponent, [{
        type: Component,
        args: [{
                selector: 'sqx-tooltip',
                styleUrls: ['./tooltip.component.css'],
                template: `<div class="sq-tooltip" @tooltip>{{ text }}</div>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('tooltip', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate(300, style({ opacity: 1 })),
                        ]),
                        transition(':leave', [
                            animate(300, style({ opacity: 0 })),
                        ]),
                    ]),
                ],
            }]
    }], null, { text: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy91dGlscy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBbUJ4RSxNQUFNLE9BQU8sZ0JBQWdCO0lBakI3QjtRQW1CVyxTQUFJLEdBQUcsRUFBRSxDQUFDO0tBQ3BCOztnRkFIWSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtRQWRoQiw4QkFBaUM7UUFBQSxZQUFVO1FBQUEsaUJBQU07O1FBQXpCLG9DQUFRO1FBQUMsZUFBVTtRQUFWLDhCQUFVOzRYQUUxQztZQUNWLE9BQU8sQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFDbkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztpQkFDbEMsQ0FBQztnQkFDRixVQUFVLENBQUMsUUFBUSxFQUFFO29CQUNuQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2lCQUNsQyxDQUFDO2FBQ0gsQ0FBQztTQUNIO2tEQUVVLGdCQUFnQjtjQWpCNUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztnQkFDdEMsUUFBUSxFQUFFLG1EQUFtRDtnQkFDN0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsU0FBUyxFQUFFO3dCQUNqQixVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7NEJBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7eUJBQ2xDLENBQUM7d0JBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTs0QkFDbkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzt5QkFDbEMsQ0FBQztxQkFDSCxDQUFDO2lCQUNIO2FBQ0Y7Z0JBR1UsSUFBSTtrQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7YW5pbWF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcXgtdG9vbHRpcCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdG9vbHRpcC5jb21wb25lbnQuY3NzJ10sXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic3EtdG9vbHRpcFwiIEB0b29sdGlwPnt7IHRleHQgfX08L2Rpdj5gLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ3Rvb2x0aXAnLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxyXG4gICAgICAgIGFuaW1hdGUoMzAwLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBhbmltYXRlKDMwMCwgc3R5bGUoe29wYWNpdHk6IDB9KSksXHJcbiAgICAgIF0pLFxyXG4gICAgXSksXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb21wb25lbnQge1xyXG5cclxuICBASW5wdXQoKSB0ZXh0ID0gJyc7XHJcbn0iXX0=