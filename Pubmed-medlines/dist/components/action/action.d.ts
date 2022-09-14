import { Type } from "@angular/core";
import { MessageParams } from "@sinequa/core/intl";
export declare abstract class IAction {
    name?: string;
    text?: string;
    href?: string;
    icon?: string;
    styles?: string | string[] | Set<string> | {
        [klass: string]: any;
    };
    iconAfter?: string;
    separator?: boolean;
    scrollable?: boolean;
    scrollGroup?: boolean;
    component?: Type<any>;
    componentInputs?: any;
    data?: any;
    title?: string;
    selected?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    flattenable?: boolean;
    messageParams?: MessageParams;
    headerGroup?: boolean;
    action?: (item: Action, event: UIEvent) => void;
    toggle?: (item: Action, open: boolean) => void;
    updater?: (item: Action) => void;
    init?: (item: Action) => void;
    destroy?: (item: Action) => void;
    children?: Action[];
}
export declare class Action extends IAction {
    constructor(options: IAction);
    get hasChildren(): boolean;
    get showSelected(): boolean;
    update(): void;
}
//# sourceMappingURL=action.d.ts.map