import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@sinequa/components/utils";
import * as i3 from "@sinequa/core/intl";
function BsThemeToggleComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.label));
} }
const _c0 = function (a0) { return { ovalSelected: a0 }; };
const _c1 = function (a0) { return { buttonSelected: a0 }; };
export class BsThemeToggleComponent {
    constructor() {
        this.showLabel = true;
        this.labels = ['msg#theme.lightMode', 'msg#theme.darkMode'];
        this.tooltips = ['msg#theme.darkModeTitle', 'msg#theme.lightModeTitle'];
        this.label = '';
        this.theme = "normal";
    }
    ngOnInit() {
        this.theme = localStorage.getItem('sinequa-theme') || 'normal';
        this.label = this.theme === 'normal' ? this.labels[0] : this.labels[1];
        this.tooltip = this.theme === 'normal' ? this.tooltips[0] : this.tooltips[1];
    }
    /**
    * Whether the UI is in dark or light mode
    */
    isDark() {
        return this.theme === "dark";
    }
    toggleTheme() {
        let index = 0;
        if (this.theme === 'normal') {
            this.theme = 'dark';
            index = 1;
        }
        else {
            this.theme = 'normal';
        }
        this.label = this.labels[index];
        this.tooltip = this.tooltips[index];
        localStorage.setItem('sinequa-theme', this.theme);
        document.body.classList.toggle("dark");
        return false;
    }
}
BsThemeToggleComponent.ɵfac = function BsThemeToggleComponent_Factory(t) { return new (t || BsThemeToggleComponent)(); };
BsThemeToggleComponent.ɵcmp = i0.ɵɵdefineComponent({ type: BsThemeToggleComponent, selectors: [["sq-theme-toggle"]], inputs: { showLabel: "showLabel" }, decls: 5, vars: 10, consts: [[1, "d-flex", "align-items-center"], [4, "ngIf"], [1, "oval", 3, "ngClass", "sqTooltip", "click"], [1, "buttonToggle", 3, "ngClass"]], template: function BsThemeToggleComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, BsThemeToggleComponent_div_1_Template, 3, 3, "div", 1);
        i0.ɵɵelementStart(2, "div", 2);
        i0.ɵɵlistener("click", function BsThemeToggleComponent_Template_div_click_2_listener() { return ctx.toggleTheme(); });
        i0.ɵɵpipe(3, "sqMessage");
        i0.ɵɵelement(4, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.showLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵpropertyInterpolate("sqTooltip", i0.ɵɵpipeBind1(3, 4, ctx.tooltip));
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx.theme == "dark"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c1, ctx.theme == "dark"));
    } }, directives: [i1.NgIf, i1.NgClass, i2.TooltipDirective], pipes: [i3.MessagePipe], styles: [".oval[_ngcontent-%COMP%]{background-color:#0275d8;border-radius:25px;cursor:pointer;height:26px;margin:0 10px;position:relative;transition:background-color .15s ease-in-out;width:50px}.ovalSelected[_ngcontent-%COMP%]{background:#fadc04}.buttonToggle[_ngcontent-%COMP%]{background-color:#f7f7f7;border-radius:50%;height:20px;left:0;margin-left:3px;margin-top:3px;position:absolute;transition:left .15s ease-in-out,background-color .15s ease-in-out;width:20px}.buttonSelected[_ngcontent-%COMP%]{background-color:#919191;left:25px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsThemeToggleComponent, [{
        type: Component,
        args: [{
                selector: 'sq-theme-toggle',
                templateUrl: './theme-toggle.component.html',
                styleUrls: ['./theme-toggle.component.scss']
            }]
    }], function () { return []; }, { showLabel: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21wb25lbnRzL3RoZW1lLXRvZ2dsZS8iLCJzb3VyY2VzIjpbInRoZW1lLXRvZ2dsZS5jb21wb25lbnQudHMiLCJ0aGVtZS10b2dnbGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7Ozs7OztJQ0NyRCwyQkFBdUI7SUFBQSxZQUF1Qjs7SUFBQSxpQkFBTTs7O0lBQTdCLGVBQXVCO0lBQXZCLHdEQUF1Qjs7OztBRE1oRCxNQUFNLE9BQU8sc0JBQXNCO0lBVWpDO1FBVFMsY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQixXQUFNLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZELGFBQVEsR0FBRyxDQUFDLHlCQUF5QixFQUFFLDBCQUEwQixDQUFDLENBQUE7UUFDbEUsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUduQixVQUFLLEdBQVcsUUFBUSxDQUFBO0lBRVQsQ0FBQztJQUVoQixRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLFFBQVEsQ0FBQTtRQUM5RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOztNQUVFO0lBQ0YsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDWDthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBDLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs0RkF2Q1Usc0JBQXNCOzJEQUF0QixzQkFBc0I7UUNQbkMsOEJBQ0U7UUFBQSx1RUFBb0Q7UUFDcEQsOEJBQ0U7UUFENEQsZ0dBQVMsaUJBQWEsSUFBQzs7UUFDbkYseUJBQThFO1FBQ2hGLGlCQUFNO1FBQ1IsaUJBQU07O1FBSkUsZUFBZTtRQUFmLG9DQUFlO1FBQ2lFLGVBQXFDO1FBQXJDLHdFQUFxQztRQUF6Ryx5RUFBMkM7UUFDakMsZUFBNkM7UUFBN0MseUVBQTZDOztrRERJOUQsc0JBQXNCO2NBTGxDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQzthQUM3QztzQ0FFVSxTQUFTO2tCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzcS10aGVtZS10b2dnbGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aGVtZS10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RoZW1lLXRvZ2dsZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCc1RoZW1lVG9nZ2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBzaG93TGFiZWwgPSB0cnVlO1xyXG5cclxuICBsYWJlbHMgPSBbJ21zZyN0aGVtZS5saWdodE1vZGUnLCAnbXNnI3RoZW1lLmRhcmtNb2RlJ107XHJcbiAgdG9vbHRpcHMgPSBbJ21zZyN0aGVtZS5kYXJrTW9kZVRpdGxlJywgJ21zZyN0aGVtZS5saWdodE1vZGVUaXRsZSddXHJcbiAgbGFiZWw6IHN0cmluZyA9ICcnO1xyXG4gIHRvb2x0aXA6IHN0cmluZztcclxuXHJcbiAgdGhlbWU6IHN0cmluZyA9IFwibm9ybWFsXCJcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2luZXF1YS10aGVtZScpIHx8ICdub3JtYWwnXHJcbiAgICB0aGlzLmxhYmVsID0gdGhpcy50aGVtZSA9PT0gJ25vcm1hbCcgPyB0aGlzLmxhYmVsc1swXSA6IHRoaXMubGFiZWxzWzFdO1xyXG4gICAgdGhpcy50b29sdGlwID0gdGhpcy50aGVtZSA9PT0gJ25vcm1hbCcgPyB0aGlzLnRvb2x0aXBzWzBdIDogdGhpcy50b29sdGlwc1sxXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICogV2hldGhlciB0aGUgVUkgaXMgaW4gZGFyayBvciBsaWdodCBtb2RlXHJcbiAgKi9cclxuICBpc0RhcmsoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy50aGVtZSA9PT0gXCJkYXJrXCI7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVUaGVtZSgpIHtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBpZiAodGhpcy50aGVtZSA9PT0gJ25vcm1hbCcpIHtcclxuICAgICAgdGhpcy50aGVtZSA9ICdkYXJrJztcclxuICAgICAgaW5kZXggPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50aGVtZSA9ICdub3JtYWwnO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYWJlbCA9IHRoaXMubGFiZWxzW2luZGV4XTtcclxuICAgIHRoaXMudG9vbHRpcCA9IHRoaXMudG9vbHRpcHNbaW5kZXhdO1xyXG5cclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaW5lcXVhLXRoZW1lJywgdGhpcy50aGVtZSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJkYXJrXCIpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSIsIjxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XHJcbiAgPGRpdiAqbmdJZj1cInNob3dMYWJlbFwiPnt7IGxhYmVsIHwgc3FNZXNzYWdlIH19PC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm92YWxcIiBbbmdDbGFzc109XCJ7b3ZhbFNlbGVjdGVkOiB0aGVtZSA9PSAnZGFyayd9XCIgKGNsaWNrKT1cInRvZ2dsZVRoZW1lKClcIiBzcVRvb2x0aXA9XCJ7eyB0b29sdGlwIHwgc3FNZXNzYWdlIH19XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uVG9nZ2xlXCIgW25nQ2xhc3NdPVwie2J1dHRvblNlbGVjdGVkOiB0aGVtZSA9PSAnZGFyayd9XCI+PC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PiJdfQ==