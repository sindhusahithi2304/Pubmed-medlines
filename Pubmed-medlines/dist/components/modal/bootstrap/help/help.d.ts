import { OnInit } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { StartConfig } from "@sinequa/core/web-services";
import * as i0 from "@angular/core";
export declare class BsHelp implements OnInit {
    startConfig: StartConfig;
    sanitizer: DomSanitizer;
    true: any;
    model: {};
    url: SafeResourceUrl;
    constructor(startConfig: StartConfig, sanitizer: DomSanitizer);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsHelp, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsHelp, "sq-help", never, {}, {}, never, never>;
}
//# sourceMappingURL=help.d.ts.map