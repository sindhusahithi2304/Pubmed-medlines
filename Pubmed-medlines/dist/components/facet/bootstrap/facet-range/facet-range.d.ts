import { OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ElementRef, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { AppService, FormatService, ExprBuilder } from "@sinequa/core/app-utils";
import { IntlService } from "@sinequa/core/intl";
import { CCColumn, Results, Aggregation } from "@sinequa/core/web-services";
import { Options, LabelType, ChangeContext } from "ng5-slider";
import { FacetService } from "../../facet.service";
import { SearchService } from "@sinequa/components/search";
import { UIService } from "@sinequa/components/utils";
import { AbstractFacet } from "../../abstract-facet";
import { AdvancedService } from "@sinequa/components/advanced";
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
export declare enum RoundTarget {
    number = 0,
    year = 1,
    month = 2,
    week = 3,
    day = 4
}
export declare enum RoundType {
    up = 0,
    down = 1,
    nearest = 2
}
export interface StepDef {
    step: string;
    format: string;
    minRange: string;
    active: boolean;
}
export declare class BsFacetRange extends AbstractFacet implements OnChanges, AfterViewInit, OnDestroy {
    private facetService;
    protected appService: AppService;
    protected searchService: SearchService;
    protected formatService: FormatService;
    protected intlService: IntlService;
    protected uiService: UIService;
    protected advancedService: AdvancedService;
    protected exprBuilder: ExprBuilder;
    name: string;
    results: Results;
    aggregation: string;
    min: string;
    max: string;
    stepDefs: StepDef[];
    slider: ElementRef;
    data: Aggregation | undefined;
    options: Options;
    value: number;
    highValue: number;
    startValue: number;
    startHighValue: number;
    sliderActive: boolean;
    rangeActive: boolean;
    rangeSelected: boolean;
    manualRefresh: EventEmitter<void>;
    initDone: boolean;
    protected column: CCColumn | undefined;
    protected roundTarget: RoundTarget;
    protected roundMultiple: number;
    protected localeChange: Subscription;
    protected format: string;
    clearFiltersAction: Action;
    applyFiltersAction: Action;
    constructor(facetService: FacetService, appService: AppService, searchService: SearchService, formatService: FormatService, intlService: IntlService, uiService: UIService, advancedService: AdvancedService, exprBuilder: ExprBuilder);
    protected translate: (value: number, label: LabelType) => string;
    protected roundAdjustment(value: number, multiple: number, roundType: RoundType): number;
    protected _roundNumberUp(value: number, step: number): number;
    protected _roundNumberDown(value: number, step: number): number;
    protected _roundNumber(value: number, step: number, roundType: RoundType): number;
    protected _getNearestDate(date: Date, upper: Date, lower: Date): Date;
    protected _getNearestTargetDate(date: Date, target: RoundTarget): Date;
    protected _round(value: number, step: number, target: RoundTarget, multiple: number, roundType?: RoundType): number;
    protected round(value: number, roundType?: RoundType): number;
    protected roundDown(value: number): number;
    protected roundUp(value: number): number;
    protected roundNearest(value: number): number;
    private fixDate;
    protected initMinMax(): void;
    protected parseValue(value: string | Date): number;
    protected initStep(): void;
    protected getRoundTarget(step: number): {
        roundTarget: RoundTarget;
        roundMultiple: number;
    };
    protected init(): void;
    ngOnChanges(changes: SimpleChanges): void;
    protected onResize: () => void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onUserChangeEnd(changeContext: ChangeContext): void;
    getRange(): number[] | undefined[];
    setRange(from: number | undefined, to: number | undefined): void;
    applyRange(): void;
    clearRange(): void;
    get actions(): Action[];
    static ɵfac: i0.ɵɵFactoryDef<BsFacetRange, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<BsFacetRange, "sq-facet-range", never, { "name": "name"; "results": "results"; "aggregation": "aggregation"; "min": "min"; "max": "max"; "stepDefs": "stepDefs"; }, {}, never, never>;
}
//# sourceMappingURL=facet-range.d.ts.map