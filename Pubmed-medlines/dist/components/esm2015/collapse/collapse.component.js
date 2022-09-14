import { Component, Input, ContentChild, TemplateRef } from "@angular/core";
import { trigger, state, animate, transition, style } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Collapse_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementContainer(1, 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@show", !ctx_r0.collapsed && ctx_r0.afterViewInit);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.template);
} }
export function collapseAnimations(timings) {
    return [
        trigger('show', [
            state('void', style({ height: 0 })),
            transition('void <=> 1', [
                animate(timings)
            ])
        ])
    ];
}
export class Collapse {
    constructor() {
        this.collapsed = true;
    }
    ngAfterViewInit() {
        setTimeout(() => this.afterViewInit = true, 0); // Value can switch synchronously => this can cause "Expression has changed" error
    }
}
Collapse.ɵfac = function Collapse_Factory(t) { return new (t || Collapse)(); };
Collapse.ɵcmp = i0.ɵɵdefineComponent({ type: Collapse, selectors: [["sq-collapse"]], contentQueries: function Collapse_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, TemplateRef, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.template = _t.first);
    } }, inputs: { collapsed: "collapsed" }, decls: 1, vars: 1, consts: [["class", "sq-collapse", 4, "ngIf"], [1, "sq-collapse"], [3, "ngTemplateOutlet"]], template: function Collapse_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, Collapse_div_0_Template, 2, 2, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.collapsed);
    } }, directives: [i1.NgIf, i1.NgTemplateOutlet], styles: [".sq-collapse.ng-animating[_ngcontent-%COMP%] { overflow: hidden; }"], data: { animation: collapseAnimations(".15s ease-in-out") } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Collapse, [{
        type: Component,
        args: [{
                selector: "sq-collapse",
                template: `
        <div *ngIf="!collapsed" class="sq-collapse" [@show]="!collapsed && afterViewInit">
            <ng-container [ngTemplateOutlet]="template"></ng-container>
        </div>
    `,
                styles: [".sq-collapse.ng-animating { overflow: hidden; }"],
                animations: collapseAnimations(".15s ease-in-out")
            }]
    }], function () { return []; }, { collapsed: [{
            type: Input
        }], template: [{
            type: ContentChild,
            args: [TemplateRef, { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbXBvbmVudHMvY29sbGFwc2UvIiwic291cmNlcyI6WyJjb2xsYXBzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQWlCLFlBQVksRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQTJCLE1BQU0scUJBQXFCLENBQUM7Ozs7SUFnQmpHLDhCQUNJO0lBQUEsMkJBQTJEO0lBQy9ELGlCQUFNOzs7SUFGc0MsaUVBQXFDO0lBQy9ELGVBQTZCO0lBQTdCLGtEQUE2Qjs7QUFmdkQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLE9BQXdCO0lBQ3ZELE9BQU87UUFDSCxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ1osS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNqQyxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ25CLENBQUM7U0FDTCxDQUFDO0tBQ0wsQ0FBQztBQUNOLENBQUM7QUFZRCxNQUFNLE9BQU8sUUFBUTtJQUtqQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxlQUFlO1FBQ1gsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsa0ZBQWtGO0lBQ3RJLENBQUM7O2dFQVhRLFFBQVE7NkNBQVIsUUFBUTtvQ0FHSCxXQUFXOzs7OztRQVZyQix5REFFTTs7UUFGQSxxQ0FBZ0I7d0pBS2Qsa0JBQWtCLENBQUMsa0JBQWtCLENBQUM7a0RBRXpDLFFBQVE7Y0FWcEIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7S0FJVDtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxpREFBaUQsQ0FBQztnQkFDM0QsVUFBVSxFQUFFLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDO2FBQ3JEO3NDQUVZLFNBQVM7a0JBQWpCLEtBQUs7WUFFc0MsUUFBUTtrQkFBbkQsWUFBWTttQkFBQyxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHt0cmlnZ2VyLCBzdGF0ZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiwgc3R5bGUsIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsYXBzZUFuaW1hdGlvbnModGltaW5nczogbnVtYmVyIHwgc3RyaW5nKTogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhW10ge1xuICAgIHJldHVybiBbXG4gICAgICAgIHRyaWdnZXIoJ3Nob3cnLCBbXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtoZWlnaHQ6IDB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkIDw9PiAxJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUodGltaW5ncylcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtY29sbGFwc2VcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICpuZ0lmPVwiIWNvbGxhcHNlZFwiIGNsYXNzPVwic3EtY29sbGFwc2VcIiBbQHNob3ddPVwiIWNvbGxhcHNlZCAmJiBhZnRlclZpZXdJbml0XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXCIuc3EtY29sbGFwc2UubmctYW5pbWF0aW5nIHsgb3ZlcmZsb3c6IGhpZGRlbjsgfVwiXSxcbiAgICBhbmltYXRpb25zOiBjb2xsYXBzZUFuaW1hdGlvbnMoXCIuMTVzIGVhc2UtaW4tb3V0XCIpXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQElucHV0KCkgY29sbGFwc2VkOiBib29sZWFuO1xuICAgIGFmdGVyVmlld0luaXQ6IGJvb2xlYW47IC8vIFRoaXMgYWxsb3dzIHRvIG9ubHkgdHJpZ2dlciB0aGUgYW5pbWF0aW9uIGFmdGVyIHRoZSB2aWV3IGluaXRpYWxpemF0aW9uXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwge3N0YXRpYzogZmFsc2V9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYWZ0ZXJWaWV3SW5pdCA9IHRydWUsIDApOyAvLyBWYWx1ZSBjYW4gc3dpdGNoIHN5bmNocm9ub3VzbHkgPT4gdGhpcyBjYW4gY2F1c2UgXCJFeHByZXNzaW9uIGhhcyBjaGFuZ2VkXCIgZXJyb3JcbiAgICB9XG59Il19