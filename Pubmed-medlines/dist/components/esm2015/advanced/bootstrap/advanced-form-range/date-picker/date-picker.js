import { Component, Input, ViewChild, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Utils } from "@sinequa/core/base";
import moment from "moment";
import * as i0 from "@angular/core";
import * as i1 from "@sinequa/core/intl";
import * as i2 from "ngx-bootstrap/datepicker";
import * as i3 from "@angular/forms";
const _c0 = ["picker"];
const _c1 = ["input"];
export const DATE_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDatePicker),
    multi: true
};
export class BsDatePicker {
    constructor(intlService) {
        this.intlService = intlService;
        this.SystemFormat = 'YYYY-MM-DD';
        this.onChangeCallback = () => { };
    }
    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
    }
    get dateFormat() {
        return this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L');
    }
    setLocale() {
        if (!!this.picker && this.picker.isOpen) {
            this.picker.hide();
            this.picker.show();
        }
    }
    ngAfterViewInit() {
        this.setLocale();
        this.localeChange = Utils.subscribe(this.intlService.events, (value) => {
            this.setLocale();
        });
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
    bsConfig() {
        return {
            minDate: this.options.minDate,
            maxDate: this.options.maxDate,
            containerClass: 'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L')
        };
    }
    updateValue(value) {
        this.value = value;
        this.zeroTimes(this.value);
        this.onChangeCallback(this.value);
        this.focus();
    }
    zeroTimes(value) {
        if (Utils.isDate(value)) { // includes null checking
            value.setHours(0, 0, 0, 0);
        }
    }
    focus() {
        if (this.input) {
            this.input.nativeElement.focus();
        }
    }
    //#region ControlValueAccessor
    writeValue(value) {
        this.value = value;
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
    }
}
BsDatePicker.ɵfac = function BsDatePicker_Factory(t) { return new (t || BsDatePicker)(i0.ɵɵdirectiveInject(i1.IntlService)); };
BsDatePicker.ɵcmp = i0.ɵɵdefineComponent({ type: BsDatePicker, selectors: [["sq-date-picker"]], viewQuery: function BsDatePicker_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(_c1, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.picker = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.input = _t.first);
    } }, inputs: { options: "options" }, features: [i0.ɵɵProvidersFeature([DATE_PICKER_VALUE_ACCESSOR])], decls: 5, vars: 3, consts: [[1, "sq-date-picker", "form-row"], [1, "col"], ["type", "text", "autocomplete", "off", "bsDatepicker", "", "triggers", "click", 1, "form-control", 3, "bsConfig", "ngModel", "placeholder", "ngModelChange"], ["input", "", "picker", "bsDatepicker"]], template: function BsDatePicker_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵelementStart(2, "input", 2, 3);
        i0.ɵɵlistener("ngModelChange", function BsDatePicker_Template_input_ngModelChange_2_listener($event) { return ctx.updateValue($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("bsConfig", ctx.bsConfig())("ngModel", ctx.value)("placeholder", ctx.dateFormat);
    } }, directives: [i2.BsDatepickerInputDirective, i3.DefaultValueAccessor, i2.BsDatepickerDirective, i3.NgControlStatus, i3.NgModel], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsDatePicker, [{
        type: Component,
        args: [{
                selector: "sq-date-picker",
                template: `
        <div class="sq-date-picker form-row">
            <div class="col">
                <input type="text" #input class="form-control" autocomplete="off" bsDatepicker triggers="click" #picker="bsDatepicker" [bsConfig]="bsConfig()" [ngModel]="value" (ngModelChange)="updateValue($event)" [placeholder]="dateFormat" />
            </div>
        </div>
    `,
                providers: [DATE_PICKER_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: i1.IntlService }]; }, { options: [{
            type: Input
        }], picker: [{
            type: ViewChild,
            args: ["picker", { static: false }]
        }], input: [{
            type: ViewChild,
            args: ['input', { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1waWNrZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9hZHZhbmNlZC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9hZHZhbmNlZC1mb3JtLXJhbmdlL2RhdGUtcGlja2VyL2RhdGUtcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFvQyxTQUFTLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFHekMsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDOzs7Ozs7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBb0JGLE1BQU0sT0FBTyxZQUFZO0lBV3JCLFlBQ1csV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFWbEIsaUJBQVksR0FBVyxZQUFZLENBQUM7UUFJN0MscUJBQWdCLEdBQXFCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQU90RCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxjQUFjLENBQUMsR0FB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LFFBQVEsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDQyxLQUFLO2tCQUF6QyxTQUFTO21CQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7SW50bFNlcnZpY2V9IGZyb20gXCJAc2luZXF1YS9jb3JlL2ludGxcIjtcbmltcG9ydCB7QnNEYXRlcGlja2VyRGlyZWN0aXZlLCBCc0RhdGVwaWNrZXJDb25maWd9IGZyb20gXCJuZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXJcIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5leHBvcnQgY29uc3QgREFURV9QSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBCc0RhdGVQaWNrZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGVQaWNrZXJPcHRpb25zIHtcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIHN5c3RlbT86IGJvb2xlYW47IC8vIGRlZmF1bHQgZmFsc2VcbiAgICBtaW5EYXRlPzogRGF0ZTtcbiAgICBtYXhEYXRlPzogRGF0ZTtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic3EtZGF0ZS1waWNrZXJcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic3EtZGF0ZS1waWNrZXIgZm9ybS1yb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAjaW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBic0RhdGVwaWNrZXIgdHJpZ2dlcnM9XCJjbGlja1wiICNwaWNrZXI9XCJic0RhdGVwaWNrZXJcIiBbYnNDb25maWddPVwiYnNDb25maWcoKVwiIFtuZ01vZGVsXT1cInZhbHVlXCIgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlVmFsdWUoJGV2ZW50KVwiIFtwbGFjZWhvbGRlcl09XCJkYXRlRm9ybWF0XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0RBVEVfUElDS0VSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBCc0RhdGVQaWNrZXIgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBTeXN0ZW1Gb3JtYXQ6IHN0cmluZyA9ICdZWVlZLU1NLUREJztcblxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IERhdGVQaWNrZXJPcHRpb25zO1xuICAgIHZhbHVlOiBEYXRlO1xuICAgIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICAgIHByaXZhdGUgbG9jYWxlQ2hhbmdlOiBTdWJzY3JpcHRpb247XG4gICAgQFZpZXdDaGlsZChcInBpY2tlclwiLCB7c3RhdGljOiBmYWxzZX0pIHBpY2tlcjogQnNEYXRlcGlja2VyRGlyZWN0aXZlO1xuICAgIEBWaWV3Q2hpbGQoJ2lucHV0Jywge3N0YXRpYzogZmFsc2V9KSBpbnB1dDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgaW50bFNlcnZpY2U6IEludGxTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZGF0ZUZvcm1hdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN5c3RlbSA/IHRoaXMuU3lzdGVtRm9ybWF0IDogbW9tZW50LmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdCgnTCcpO1xuICAgIH1cblxuICAgIHNldExvY2FsZSgpIHtcbiAgICAgICAgaWYgKCEhdGhpcy5waWNrZXIgJiYgdGhpcy5waWNrZXIuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlci5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLnBpY2tlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKCk7XG4gICAgICAgIHRoaXMubG9jYWxlQ2hhbmdlID0gVXRpbHMuc3Vic2NyaWJlKHRoaXMuaW50bFNlcnZpY2UuZXZlbnRzLFxuICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5sb2NhbGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlQ2hhbmdlLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBic0NvbmZpZygpOiBCc0RhdGVwaWNrZXJDb25maWcge1xuICAgICAgICByZXR1cm4gPGFueT57XG4gICAgICAgICAgICBtaW5EYXRlOiB0aGlzLm9wdGlvbnMubWluRGF0ZSxcbiAgICAgICAgICAgIG1heERhdGU6IHRoaXMub3B0aW9ucy5tYXhEYXRlLFxuICAgICAgICAgICAgY29udGFpbmVyQ2xhc3M6J3RoZW1lLWRlZmF1bHQnLFxuICAgICAgICAgICAgc2hvd1dlZWtOdW1iZXJzOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGVJbnB1dEZvcm1hdDogdGhpcy5vcHRpb25zLnN5c3RlbSA/IHRoaXMuU3lzdGVtRm9ybWF0IDogbW9tZW50LmxvY2FsZURhdGEoKS5sb25nRGF0ZUZvcm1hdCgnTCcpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsdWUodmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnplcm9UaW1lcyh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB6ZXJvVGltZXModmFsdWU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzRGF0ZSh2YWx1ZSkpIHsgLy8gaW5jbHVkZXMgbnVsbCBjaGVja2luZ1xuICAgICAgICAgICAgdmFsdWUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vI3JlZ2lvbiBDb250cm9sVmFsdWVBY2Nlc3NvclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxufVxuIl19