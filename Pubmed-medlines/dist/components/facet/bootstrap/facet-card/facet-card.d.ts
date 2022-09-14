import { OnInit, OnDestroy, EventEmitter, AfterContentInit, ChangeDetectorRef } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "../../abstract-facet";
import * as i0 from "@angular/core";
export declare class BsFacetCard implements OnInit, OnDestroy, AfterContentInit {
    private changeDetectorRef;
    /**
     * Title of this facet (optional)
     */
    title: string;
    /**
     * Tooltip of this facet (defaults to title)
     */
    tooltip: string;
    /**
     * Icon of this facet, in a form of a span class name (optional)
     */
    icon: string;
    /**
     * Bootstrap theme name (light, dark...)
     */
    buttonsStyle: string;
    /**
     * List of custom actions for this facet (optional)
     */
    actions: Action[];
    /**
     * Whether the [actions]="..." passed by binding should be displayed before or after
     * the actions from the inner facet component
     */
    actionsFirst: boolean;
    /**
     * Size of the custom actions
     */
    actionsSize: string;
    /**
     * Whether the facet can be collapsed (default: true)
     */
    collapsible: boolean;
    /**
     * Whether the facet starts collapsed (if collapsible / default: false)
     */
    startCollapsed: boolean;
    /**
     * Whether other actions should be hidden when the facet is collapsed (default: true)
     */
    hideActionsCollapsed: boolean;
    /**
     * Whether the facet can be expanded (default: false)
     */
    expandable: boolean;
    /**
     * Whether the facet starts expanded (if expandable / default: false)
     */
    startExpanded: boolean;
    /**
     * Whether the facet starts with opened settings (default: false)
     */
    startSettingsOpened: boolean;
    /**
     * Event triggered when the facet gets expanded or reduced
     */
    facetExpanded: EventEmitter<"expanded" | "reduced">;
    /**
     * Event triggered when the facet gets expanded or reduced
     */
    facetCollapsed: EventEmitter<"expanded" | "collapsed">;
    /**
     * Event triggered when the facet gets expanded or reduced
     */
    settingsOpened: EventEmitter<"canceled" | "opened" | "saved">;
    /**
     * Reference to the child facet inserted by transclusion (ng-content)
     */
    facetComponent: AbstractFacet;
    _collapsed: boolean;
    _expanded: boolean;
    _settingsOpened: boolean;
    get hidden(): boolean;
    private readonly collapseAction;
    private readonly expandAction;
    private readonly settingsAction;
    private actionChangedSubscription;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    get allActions(): Action[];
    get hasSettings(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<BsFacetCard, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetCard, "sq-facet-card", never, { "title": "title"; "tooltip": "tooltip"; "icon": "icon"; "buttonsStyle": "buttonsStyle"; "actions": "actions"; "actionsFirst": "actionsFirst"; "actionsSize": "actionsSize"; "collapsible": "collapsible"; "startCollapsed": "startCollapsed"; "hideActionsCollapsed": "hideActionsCollapsed"; "expandable": "expandable"; "startExpanded": "startExpanded"; "startSettingsOpened": "startSettingsOpened"; }, { "facetExpanded": "facetExpanded"; "facetCollapsed": "facetCollapsed"; "settingsOpened": "settingsOpened"; }, ["facetComponent"], ["*"]>;
}
//# sourceMappingURL=facet-card.d.ts.map