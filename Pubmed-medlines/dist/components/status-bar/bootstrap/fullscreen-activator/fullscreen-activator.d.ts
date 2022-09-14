import { Action } from "@sinequa/components/action";
import { Subscription } from "rxjs";
import { UIService } from "@sinequa/components/utils";
import * as i0 from "@angular/core";
export declare class BsFullscreenActivator {
    private uiService;
    action: Action;
    resizeSubscription: Subscription | undefined;
    constructor(uiService: UIService);
    getFullscreenIcon(): string;
    getFullscreenTitle(): string;
    buildAction(): void;
    requestFullscreen(): void;
    cancelFullscreen(): void;
    isFullscreen(): any;
    toggleFullscreen(): void;
    static ɵfac: i0.ɵɵFactoryDef<BsFullscreenActivator, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFullscreenActivator, "sq-fullscreen-activator", never, {}, {}, never, never>;
}
//# sourceMappingURL=fullscreen-activator.d.ts.map