import { EventEmitter, OnChanges, AfterContentInit, QueryList } from "@angular/core";
import { FocusKeyManager } from "@angular/cdk/a11y";
import { FocusKeyListItemDirective } from "./focus-key-list-item.directive";
import * as i0 from "@angular/core";
export declare class FocusKeyListDirective implements OnChanges, AfterContentInit {
    activeItem: number;
    withWrap: boolean;
    itemSelect: EventEmitter<number>;
    role: string;
    components: QueryList<FocusKeyListItemDirective>;
    protected keyManager: FocusKeyManager<FocusKeyListItemDirective>;
    ngOnChanges(): void;
    ngAfterContentInit(): void;
    onKeydown(event: any): void;
    static ɵfac: i0.ɵɵFactoryDef<FocusKeyListDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<FocusKeyListDirective, "[sqFocusKeyList]", never, { "activeItem": "activeItem"; "withWrap": "withWrap"; }, { "itemSelect": "itemSelect"; }, ["components"]>;
}
//# sourceMappingURL=focus-key-list.directive.d.ts.map