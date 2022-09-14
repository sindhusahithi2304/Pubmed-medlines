import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BsThemeToggleComponent implements OnInit {
    showLabel: boolean;
    labels: string[];
    tooltips: string[];
    label: string;
    tooltip: string;
    theme: string;
    constructor();
    ngOnInit(): void;
    /**
    * Whether the UI is in dark or light mode
    */
    isDark(): boolean;
    toggleTheme(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsThemeToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsThemeToggleComponent, "sq-theme-toggle", never, { "showLabel": "showLabel"; }, {}, never, never>;
}
//# sourceMappingURL=theme-toggle.component.d.ts.map