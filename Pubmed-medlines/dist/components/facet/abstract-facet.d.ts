import { TemplateRef, EventEmitter } from "@angular/core";
import { Action } from "@sinequa/components/action";
import * as i0 from "@angular/core";
/**
 * This interface should be implemented by facet components, which expose
 * a list of actions and event listeners
 */
export declare abstract class AbstractFacet {
    /**
     * List of custom actions of this facet
     */
    get actions(): Action[];
    /**
     * Event emitter triggered when the list of action changes
     */
    actionsChanged: EventEmitter<Action[]>;
    /**
     * Template for the settings editor of this facet, if any
     */
    settingsTpl?: TemplateRef<any>;
    /**
     * Template for header of this facet, if any
     */
    headerTpl?: TemplateRef<any>;
    /**
     * Template for a sub-header of this facet, if any. This appears below the header
     */
    subHeaderTpl?: TemplateRef<any>;
    /**
     * Template for footer of this facet, if any
     */
    footerTpl?: TemplateRef<any>;
    /**
     * Method called when a facet is collapsed
     */
    onCollapse(collapsed: boolean): void;
    /**
     * Method called when a facet is resized via an action (not accounting for window resizing)
     */
    onExpand(expanded: boolean): void;
    /**
     * Method called when the settings of this facet are opened
     */
    onOpenSettings(settingsOpened: boolean): void;
    /**
     * Method enabling the facet component to be hidden (if, for example there is no data to display)
     */
    isHidden(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<AbstractFacet, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<AbstractFacet, "ng-component", never, {}, { "actionsChanged": "actionsChanged"; }, never, never>;
}
//# sourceMappingURL=abstract-facet.d.ts.map