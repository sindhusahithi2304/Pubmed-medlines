import { Component, Input, ViewChild, EventEmitter } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { AppService, Expr } from "@sinequa/core/app-utils";
import moment from "moment";
import { AbstractFacet } from "../../abstract-facet";
import { Action } from '@sinequa/components/action';
import * as i0 from "@angular/core";
import * as i1 from "../../facet.service";
import * as i2 from "@sinequa/core/app-utils";
import * as i3 from "@sinequa/components/search";
import * as i4 from "@sinequa/core/intl";
import * as i5 from "@sinequa/components/utils";
import * as i6 from "@sinequa/components/advanced";
import * as i7 from "@angular/common";
import * as i8 from "ng5-slider";
const _c0 = ["slider"];
function BsFacetRange_ng_container_0_ng5_slider_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ng5-slider", 4);
    i0.ɵɵlistener("valueChange", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(2); return ctx_r4.value = $event; })("highValueChange", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_highValueChange_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r6 = i0.ɵɵnextContext(2); return ctx_r6.highValue = $event; })("userChangeEnd", function BsFacetRange_ng_container_0_ng5_slider_3_Template_ng5_slider_userChangeEnd_0_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r7 = i0.ɵɵnextContext(2); return ctx_r7.onUserChangeEnd($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", ctx_r2.value)("highValue", ctx_r2.highValue)("options", ctx_r2.options)("manualRefresh", ctx_r2.manualRefresh);
} }
function BsFacetRange_ng_container_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "sqMessage");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, "msg#facet.range.unavailable"));
} }
function BsFacetRange_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 1, 2);
    i0.ɵɵtemplate(3, BsFacetRange_ng_container_0_ng5_slider_3_Template, 1, 4, "ng5-slider", 3);
    i0.ɵɵtemplate(4, BsFacetRange_ng_container_0_span_4_Template, 3, 3, "span", 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.sliderActive);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.sliderActive);
} }
export var RoundTarget;
(function (RoundTarget) {
    RoundTarget[RoundTarget["number"] = 0] = "number";
    RoundTarget[RoundTarget["year"] = 1] = "year";
    RoundTarget[RoundTarget["month"] = 2] = "month";
    RoundTarget[RoundTarget["week"] = 3] = "week";
    RoundTarget[RoundTarget["day"] = 4] = "day";
})(RoundTarget || (RoundTarget = {}));
export var RoundType;
(function (RoundType) {
    RoundType[RoundType["up"] = 0] = "up";
    RoundType[RoundType["down"] = 1] = "down";
    RoundType[RoundType["nearest"] = 2] = "nearest";
})(RoundType || (RoundType = {}));
export class BsFacetRange extends AbstractFacet {
    constructor(facetService, appService, searchService, formatService, intlService, uiService, advancedService, exprBuilder) {
        super();
        this.facetService = facetService;
        this.appService = appService;
        this.searchService = searchService;
        this.formatService = formatService;
        this.intlService = intlService;
        this.uiService = uiService;
        this.advancedService = advancedService;
        this.exprBuilder = exprBuilder;
        this.manualRefresh = new EventEmitter();
        this.translate = (value, label) => {
            const value1 = this.roundNearest(value); // to accommodate fractional steps generated for years/months
            if (this.format) {
                if (this.column && AppService.isDate(this.column)) {
                    const date = new Date(value1);
                    const m = moment(date);
                    return this.intlService.formatMessage(this.format, { date: date, time: Utils.getTime(date), weekDay: m.weekday(), week: m.week(), weekYear: m.weekYear() });
                }
                else {
                    return this.intlService.formatMessage(this.format, { value: value1 });
                }
            }
            return this.formatService.formatFieldValue(this.column && AppService.isDate(this.column) ? new Date(value1) : value1, this.column);
        };
        this.onResize = () => {
            this.manualRefresh.emit();
        };
        this.clearFiltersAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.range.clear",
            action: () => this.clearRange()
        });
        this.applyFiltersAction = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.range.apply",
            action: () => this.applyRange()
        });
    }
    roundAdjustment(value, multiple, roundType) {
        switch (roundType) {
            case RoundType.up:
                return multiple - value % multiple;
            default:
            case RoundType.down:
                return -(value % multiple);
            case RoundType.nearest: {
                const adjustUp = multiple - value % multiple;
                const adjustDown = -(value % multiple);
                return Math.abs(adjustUp) <= Math.abs(adjustDown) ? adjustUp : adjustDown;
            }
        }
    }
    _roundNumberUp(value, step) {
        return (value >= 0 ? Math.ceil(value / step) : Math.floor(value / step)) * step;
    }
    _roundNumberDown(value, step) {
        return (value >= 0 ? Math.floor(value / step) : Math.ceil(value / step)) * step;
    }
    _roundNumber(value, step, roundType) {
        switch (roundType) {
            case RoundType.up:
                return this._roundNumberUp(value, step);
            default:
            case RoundType.down:
                return this._roundNumberDown(value, step);
            case RoundType.nearest: {
                const up = this._roundNumberUp(value, step);
                const down = this._roundNumberDown(value, step);
                return Math.abs(up - value) <= Math.abs(down - value) ? up : down;
            }
        }
    }
    _getNearestDate(date, upper, lower) {
        return Math.abs(upper.getTime() - date.getTime()) <= Math.abs(lower.getTime() - date.getTime()) ? upper : lower;
    }
    _getNearestTargetDate(date, target) {
        switch (target) {
            case RoundTarget.year: {
                return this._getNearestDate(date, new Date(date.getFullYear() + 1, 0), new Date(date.getFullYear(), 0));
            }
            case RoundTarget.month: {
                return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth() + 1), new Date(date.getFullYear(), date.getMonth()));
            }
            default:
            case RoundTarget.week:
            case RoundTarget.day: {
                return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), new Date(date.getFullYear(), date.getMonth(), date.getDate()));
            }
        }
    }
    _round(value, step, target, multiple, roundType = RoundType.down) {
        if (this.column && AppService.isDate(this.column)) {
            let date = new Date(value);
            if (roundType === RoundType.nearest) {
                // round to the nearest target year, month or day to adjust for the linear step size and leap years
                date = this._getNearestTargetDate(date, target);
            }
            switch (target) {
                case RoundTarget.year: {
                    const year = date.getFullYear();
                    if (year % multiple !== 0 || date.getMonth() !== 0 || date.getDate() !== 1 ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(year + this.roundAdjustment(year, multiple, roundType), 0);
                    }
                    break;
                }
                case RoundTarget.month: {
                    const month = date.getMonth();
                    if (month % multiple !== 0 || date.getDate() !== 1 ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(date.getFullYear(), month + this.roundAdjustment(month, multiple, roundType));
                    }
                    break;
                }
                case RoundTarget.week: {
                    const day = date.getDay();
                    // First, round to Monday
                    if (day !== 1 /*Monday*/ ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        let adjust;
                        const up = 7 - (day - 1);
                        const down = -(day - 1);
                        switch (roundType) {
                            case RoundType.up:
                                adjust = up;
                                break;
                            default:
                            case RoundType.down:
                                adjust = down;
                                break;
                            case RoundType.nearest:
                                adjust = Math.abs(up) >= Math.abs(down) ? up : down;
                                break;
                        }
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + adjust);
                    }
                    // Then, round to week number
                    const m = moment(date);
                    const week = m.week();
                    if (week % multiple !== 0) {
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (this.roundAdjustment(week, multiple, roundType) * 7));
                    }
                    break;
                }
                case RoundTarget.day: {
                    const _date = date.getDate();
                    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(date.getFullYear(), date.getMonth(), _date + this.roundAdjustment(_date, multiple, roundType));
                    }
                    break;
                }
            }
            return date.getTime();
        }
        else {
            return this._roundNumber(value, step, roundType);
        }
    }
    round(value, roundType = RoundType.down) {
        return this._round(value, this.options.step || 1, this.roundTarget, this.roundMultiple, roundType);
    }
    roundDown(value) {
        return this.round(value, RoundType.down);
    }
    roundUp(value) {
        return this.round(value, RoundType.up);
    }
    roundNearest(value) {
        return this.round(value, RoundType.nearest);
    }
    //TODO - remove fix engine hack
    fixDate(dateStr) {
        if (dateStr) {
            const secondsSep = dateStr.lastIndexOf(":");
            if (secondsSep > 0) {
                let seconds = Utils.toInt(dateStr.substr(secondsSep + 1));
                if (seconds < 0) {
                    seconds = 0;
                }
                else if (seconds > 59) {
                    seconds = 59;
                }
                dateStr = dateStr.substr(0, secondsSep + 1) + seconds;
            }
        }
        return dateStr;
    }
    initMinMax() {
        var _a;
        let min = 0;
        let max = 0;
        if (!Utils.isEmpty(this.min) && (!Utils.isEmpty(this.max))) {
            min = this.parseValue(!!new Date(this.min).getDate() ? new Date(this.min) : this.min);
            max = this.parseValue(!!new Date(this.max).getDate() ? new Date(this.max) : this.max);
        }
        else {
            if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.items) {
                const item = this.data.items[0];
                if (item && item.operatorResults) {
                    if (this.column && AppService.isDate(this.column)) {
                        //TODO - remove fix engine hack
                        if (Utils.isString(item.operatorResults.min)) {
                            const date = Utils.fromSysDateStr(this.fixDate(item.operatorResults.min));
                            if (Utils.isDate(date)) {
                                item.operatorResults.min = date;
                            }
                        }
                        if (Utils.isString(item.operatorResults.max)) {
                            const date = Utils.fromSysDateStr(this.fixDate(item.operatorResults.max));
                            if (Utils.isDate(date)) {
                                item.operatorResults.max = date;
                            }
                        }
                        min = Utils.isDate(item.operatorResults.min) ? item.operatorResults.min.getTime() : 0;
                        max = Utils.isDate(item.operatorResults.max) ? item.operatorResults.max.getTime() : 0;
                    }
                    else {
                        min = Utils.isNumber(item.operatorResults.min) ? item.operatorResults.min : 0;
                        max = Utils.isNumber(item.operatorResults.max) ? item.operatorResults.max : 0;
                    }
                }
            }
        }
        this.options.floor = min;
        this.options.ceil = max;
    }
    parseValue(value) {
        if (Utils.isDate(value)) {
            return value.getTime();
        }
        if (!Utils.isString(value)) {
            return 0;
        }
        let _value;
        if (this.column && this.column.parser) {
            const str = this.formatService.parseValue(value, this.column.parser);
            _value = Utils.toNumber(str);
        }
        if (Utils.isUndefined(_value)) {
            _value = this.column && AppService.isDate(this.column) ?
                Utils.toDuration(value) :
                Utils.toSize(value);
        }
        return _value;
    }
    initStep() {
        // Select the first step definition where the range >= stepDef.minRange
        let format;
        let step;
        if (this.stepDefs) {
            for (const stepDef of this.stepDefs) {
                if (stepDef.step) {
                    const thisStep = this.parseValue(stepDef.step);
                    if (thisStep && stepDef.active) {
                        if (!stepDef.minRange) {
                            step = thisStep;
                            format = stepDef.format;
                            break;
                        }
                        else {
                            // Round min/max for thisStep
                            const { roundTarget, roundMultiple } = this.getRoundTarget(thisStep);
                            const min = this._round(this.options.floor || 0, thisStep, roundTarget, roundMultiple, RoundType.down);
                            const max = this._round(this.options.ceil || 0, thisStep, roundTarget, roundMultiple, RoundType.up);
                            const range = max - min;
                            const minRange = this.parseValue(stepDef.minRange);
                            if (range >= minRange) {
                                step = thisStep;
                                format = stepDef.format;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (!step) {
            // Default step, default formatting
            step = this.column && AppService.isDate(this.column) ? Utils.oneDay : 1;
        }
        // Adjust step for year/month rounding (we assume daylight savings will balance out over the year)
        const { roundTarget, roundMultiple } = this.getRoundTarget(step);
        switch (roundTarget) {
            case RoundTarget.year:
                step = roundMultiple * 365.25 * Utils.oneDay;
                break;
            case RoundTarget.month:
                step = roundMultiple * 365.25 * Utils.oneDay / 12;
                break;
        }
        this.roundTarget = roundTarget;
        this.roundMultiple = roundMultiple;
        // Set default format based on roundTarget
        if (!format) {
            switch (this.roundTarget) {
                case RoundTarget.year:
                    format = "msg#facet.range.year";
                    break;
                case RoundTarget.month:
                    format = "msg#facet.range.monthYear";
                    break;
                case RoundTarget.week:
                    format = "msg#facet.range.weekYear";
                    break;
                default:
                    format = "";
                    break;
            }
        }
        this.options.step = step;
        this.format = format;
    }
    getRoundTarget(step) {
        const ret = {
            roundTarget: RoundTarget.number,
            roundMultiple: 1
        };
        if (this.column && AppService.isDate(this.column)) {
            if (step % (365 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.year;
                ret.roundMultiple = step / (365 * Utils.oneDay);
            }
            else if (step % (30 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.month;
                ret.roundMultiple = step / (30 * Utils.oneDay);
            }
            else if (step % (7 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.week;
                ret.roundMultiple = step / (7 * Utils.oneDay);
            }
            else if (step % Utils.oneDay === 0) {
                ret.roundTarget = RoundTarget.day;
                ret.roundMultiple = step / Utils.oneDay;
            }
        }
        return ret;
    }
    init() {
        this.options = {
            draggableRange: true,
            enforceStep: false,
            translate: this.translate
        };
        this.initMinMax();
        this.initStep();
        let ceil = this.options.ceil || 0;
        let floor = this.options.floor || 0;
        this.sliderActive = ceil > floor;
        if (ceil > floor) {
            floor = this.options.floor = this.roundDown(floor);
            ceil = this.options.ceil = this.roundUp(ceil);
        }
        const [from, to] = this.getRange();
        this.rangeActive = !Utils.isUndefined(from) || !Utils.isUndefined(to);
        this.rangeSelected = false;
        this.value = this.startValue = Math.max(from || floor, floor);
        this.highValue = this.startHighValue = Math.min(to || ceil, ceil);
    }
    ngOnChanges(changes) {
        if (!this.initDone) {
            this.initDone = true;
            this.localeChange = Utils.subscribe(this.intlService.events, (value) => {
                this.manualRefresh.emit();
            });
        }
        if (!!changes["results"]) {
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            this.column = this.data && this.appService.getColumn(this.data.column);
            this.init();
        }
    }
    ngAfterViewInit() {
        this.uiService.addElementResizeListener(this.slider.nativeElement, this.onResize);
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
        if (this.uiService && this.slider) {
            this.uiService.removeElementResizeListener(this.slider.nativeElement, this.onResize);
        }
    }
    onUserChangeEnd(changeContext) {
        this.rangeSelected = this.value !== this.startValue || this.highValue !== this.startHighValue;
    }
    getRange() {
        var _a, _b;
        if (this.column) {
            let expr;
            let value;
            const expression = (_b = (_a = this.searchService.query) === null || _a === void 0 ? void 0 : _a.findSelect(this.column.name)) === null || _b === void 0 ? void 0 : _b.expression;
            if (expression) {
                expr = this.appService.parseExpr(expression);
                if (expr instanceof Expr) {
                    if (expr.values && expr.values.length > 1) {
                        value = expr.values;
                    }
                    else {
                        value = expr.value;
                    }
                    if (!Utils.isArray(value)) {
                        if (expr.operator === 3 /* gte */) {
                            value = [value, undefined];
                        }
                        else if (expr.operator === 5 /* lte */) {
                            value = [undefined, value];
                        }
                    }
                    value = value.map((val) => val ? this.advancedService.castAdvancedValue(val, this.column) : val);
                    if (AppService.isDate(this.column)) {
                        value = value.map((val) => val ? new Date(val).getTime() : val);
                    }
                    return value;
                }
            }
        }
        return [undefined, undefined];
    }
    setRange(from, to) {
        var _a, _b;
        let valFrom;
        let valTo;
        let expression;
        if (this.column) {
            valFrom = AppService.isDate(this.column) && Utils.isNumber(from) ? new Date(from) : from;
            valTo = AppService.isDate(this.column) && Utils.isNumber(to) ? new Date(to) : to;
            if (!!valFrom && !!valTo) {
                expression = this.exprBuilder.makeRangeExpr(this.column.name, valFrom, valTo);
            }
            else if (!!valFrom) {
                expression = this.exprBuilder.makeNumericalExpr(this.column.name, '>=', valFrom);
            }
            else if (!!valTo) {
                expression = this.exprBuilder.makeNumericalExpr(this.column.name, '<=', valTo);
            }
            (_a = this.searchService.query) === null || _a === void 0 ? void 0 : _a.removeSelect(this.column.name);
            if (expression) {
                (_b = this.searchService.query) === null || _b === void 0 ? void 0 : _b.addSelect(expression, this.column.name);
            }
        }
    }
    applyRange() {
        this.setRange(this.roundNearest(this.value), this.roundNearest(this.highValue));
        this.searchService.search();
    }
    clearRange() {
        this.setRange(undefined, undefined);
        this.searchService.search();
    }
    get actions() {
        const actions = [];
        if (this.rangeSelected) {
            actions.push(this.applyFiltersAction);
        }
        if (this.rangeActive) {
            actions.push(this.clearFiltersAction);
        }
        return actions;
    }
}
BsFacetRange.ɵfac = function BsFacetRange_Factory(t) { return new (t || BsFacetRange)(i0.ɵɵdirectiveInject(i1.FacetService), i0.ɵɵdirectiveInject(i2.AppService), i0.ɵɵdirectiveInject(i3.SearchService), i0.ɵɵdirectiveInject(i2.FormatService), i0.ɵɵdirectiveInject(i4.IntlService), i0.ɵɵdirectiveInject(i5.UIService), i0.ɵɵdirectiveInject(i6.AdvancedService), i0.ɵɵdirectiveInject(i2.ExprBuilder)); };
BsFacetRange.ɵcmp = i0.ɵɵdefineComponent({ type: BsFacetRange, selectors: [["sq-facet-range"]], viewQuery: function BsFacetRange_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.slider = _t.first);
    } }, inputs: { name: "name", results: "results", aggregation: "aggregation", min: "min", max: "max", stepDefs: "stepDefs" }, features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "card-body"], ["slider", ""], [3, "value", "highValue", "options", "manualRefresh", "valueChange", "highValueChange", "userChangeEnd", 4, "ngIf"], [3, "value", "highValue", "options", "manualRefresh", "valueChange", "highValueChange", "userChangeEnd"]], template: function BsFacetRange_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, BsFacetRange_ng_container_0_Template, 5, 2, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.data);
    } }, directives: [i7.NgIf, i8.ɵa], pipes: [i4.MessagePipe], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BsFacetRange, [{
        type: Component,
        args: [{
                selector: "sq-facet-range",
                templateUrl: "./facet-range.html"
            }]
    }], function () { return [{ type: i1.FacetService }, { type: i2.AppService }, { type: i3.SearchService }, { type: i2.FormatService }, { type: i4.IntlService }, { type: i5.UIService }, { type: i6.AdvancedService }, { type: i2.ExprBuilder }]; }, { name: [{
            type: Input
        }], results: [{
            type: Input
        }], aggregation: [{
            type: Input
        }], min: [{
            type: Input
        }], max: [{
            type: Input
        }], stepDefs: [{
            type: Input
        }], slider: [{
            type: ViewChild,
            args: ["slider", { static: false }]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtcmFuZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tcG9uZW50cy9mYWNldC8iLCJzb3VyY2VzIjpbImJvb3RzdHJhcC9mYWNldC1yYW5nZS9mYWNldC1yYW5nZS50cyIsImJvb3RzdHJhcC9mYWNldC1yYW5nZS9mYWNldC1yYW5nZS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFzRCxTQUFTLEVBQWMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhJLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFpQixJQUFJLEVBQTRCLE1BQU0seUJBQXlCLENBQUM7QUFJbkcsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7SUNYNUMscUNBT0E7SUFMSSwrTkFBaUIsOE5BQUEsK05BQUE7SUFLckIsaUJBQWE7OztJQUxULG9DQUFpQiwrQkFBQSwyQkFBQSx1Q0FBQTs7O0lBTXJCLDRCQUE0QjtJQUFBLFlBQTZDOztJQUFBLGlCQUFPOztJQUFwRCxlQUE2QztJQUE3Qyx5RUFBNkM7OztJQVZqRiw2QkFDSTtJQUFBLGlDQUNJO0lBQUEsMEZBT2E7SUFDYiw4RUFBZ0Y7SUFDcEYsaUJBQU07SUFDViwwQkFBZTs7O0lBVEYsZUFBa0I7SUFBbEIsMENBQWtCO0lBT2hCLGVBQW1CO0lBQW5CLDJDQUFtQjs7QURLbEMsTUFBTSxDQUFOLElBQVksV0FNWDtBQU5ELFdBQVksV0FBVztJQUNuQixpREFBTSxDQUFBO0lBQ04sNkNBQUksQ0FBQTtJQUNKLCtDQUFLLENBQUE7SUFDTCw2Q0FBSSxDQUFBO0lBQ0osMkNBQUcsQ0FBQTtBQUNQLENB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QztTQUN6QztRQUNELElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7d0VBemdCUSxZQUFZO2lEQUFaLFlBQVk7Ozs7OztRQ3hDekIsK0VBWWU7O1FBWkEsK0JBQVU7O2tERHdDWixZQUFZO2NBSnhCLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixXQUFXLEVBQUUsb0JBQW9CO2FBQ3BDOzBQQUVZLElBQUk7a0JBQVosS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxHQUFHO2tCQUFYLEtBQUs7WUFDRyxHQUFHO2tCQUFYLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ2dDLE1BQU07a0JBQTNDLFNBQVM7bUJBQUMsUUFBUSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0FwcFNlcnZpY2UsIEZvcm1hdFNlcnZpY2UsIEV4cHIsIEV4cHJPcGVyYXRvciwgRXhwckJ1aWxkZXJ9IGZyb20gXCJAc2luZXF1YS9jb3JlL2FwcC11dGlsc1wiO1xuaW1wb3J0IHtJbnRsU2VydmljZX0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvaW50bFwiO1xuaW1wb3J0IHtDQ0NvbHVtbiwgUmVzdWx0cywgQWdncmVnYXRpb259IGZyb20gXCJAc2luZXF1YS9jb3JlL3dlYi1zZXJ2aWNlc1wiO1xuaW1wb3J0IHtPcHRpb25zLCBMYWJlbFR5cGUsIENoYW5nZUNvbnRleHR9IGZyb20gXCJuZzUtc2xpZGVyXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7RmFjZXRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vZmFjZXQuc2VydmljZVwiO1xuaW1wb3J0IHtTZWFyY2hTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCB7VUlTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy91dGlsc1wiO1xuaW1wb3J0IHtBYnN0cmFjdEZhY2V0fSBmcm9tIFwiLi4vLi4vYWJzdHJhY3QtZmFjZXRcIjtcbmltcG9ydCB7QWR2YW5jZWRTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29tcG9uZW50cy9hZHZhbmNlZFwiO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQHNpbmVxdWEvY29tcG9uZW50cy9hY3Rpb24nO1xuXG5leHBvcnQgZW51bSBSb3VuZFRhcmdldCB7XG4gICAgbnVtYmVyLFxuICAgIHllYXIsXG4gICAgbW9udGgsXG4gICAgd2VlaywgLy8gSVNPXG4gICAgZGF5XG59XG5cbmV4cG9ydCBlbnVtIFJvdW5kVHlwZSB7XG4gICAgdXAsXG4gICAgZG93bixcbiAgICBuZWFyZXN0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RlcERlZiB7XG4gICAgc3RlcDogc3RyaW5nO1xuICAgIGZvcm1hdDogc3RyaW5nO1xuICAgIG1pblJhbmdlOiBzdHJpbmc7XG4gICAgYWN0aXZlOiBib29sZWFuO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzcS1mYWNldC1yYW5nZVwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZmFjZXQtcmFuZ2UuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEJzRmFjZXRSYW5nZSBleHRlbmRzIEFic3RyYWN0RmFjZXQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nOyAvLyBJZiBvbW1pdGVkLCB0aGUgYWdncmVnYXRpb24gbmFtZSBpcyB1c2VkXG4gICAgQElucHV0KCkgcmVzdWx0czogUmVzdWx0cztcbiAgICBASW5wdXQoKSBhZ2dyZWdhdGlvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1pbiA6IHN0cmluZztcbiAgICBASW5wdXQoKSBtYXggOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3RlcERlZnM6IFN0ZXBEZWZbXTtcbiAgICBAVmlld0NoaWxkKFwic2xpZGVyXCIsIHtzdGF0aWM6IGZhbHNlfSkgc2xpZGVyOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gQWdncmVnYXRpb24gZnJvbSB0aGUgUmVzdWx0cyBvYmplY3RcbiAgICBkYXRhOiBBZ2dyZWdhdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIG9wdGlvbnM6IE9wdGlvbnM7XG4gICAgdmFsdWU6IG51bWJlcjtcbiAgICBoaWdoVmFsdWU6IG51bWJlcjtcbiAgICBzdGFydFZhbHVlOiBudW1iZXI7XG4gICAgc3RhcnRIaWdoVmFsdWU6IG51bWJlcjtcbiAgICBzbGlkZXJBY3RpdmU6IGJvb2xlYW47XG4gICAgcmFuZ2VBY3RpdmU6IGJvb2xlYW47XG4gICAgcmFuZ2VTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBtYW51YWxSZWZyZXNoID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIGluaXREb25lOiBib29sZWFuO1xuICAgIHByb3RlY3RlZCBjb2x1bW46IENDQ29sdW1uIHwgdW5kZWZpbmVkO1xuICAgIHByb3RlY3RlZCByb3VuZFRhcmdldDogUm91bmRUYXJnZXQ7XG4gICAgcHJvdGVjdGVkIHJvdW5kTXVsdGlwbGU6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgbG9jYWxlQ2hhbmdlOiBTdWJzY3JpcHRpb247XG4gICAgcHJvdGVjdGVkIGZvcm1hdDogc3RyaW5nO1xuXG4gICAgY2xlYXJGaWx0ZXJzQWN0aW9uOiBBY3Rpb247XG4gICAgYXBwbHlGaWx0ZXJzQWN0aW9uOiBBY3Rpb247XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZmFjZXRTZXJ2aWNlOiBGYWNldFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBhcHBTZXJ2aWNlOiBBcHBTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGZvcm1hdFNlcnZpY2U6IEZvcm1hdFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCBpbnRsU2VydmljZTogSW50bFNlcnZpY2UsXG4gICAgICAgIHByb3RlY3RlZCB1aVNlcnZpY2U6IFVJU2VydmljZSxcbiAgICAgICAgcHJvdGVjdGVkIGFkdmFuY2VkU2VydmljZTogQWR2YW5jZWRTZXJ2aWNlLFxuICAgICAgICBwcm90ZWN0ZWQgZXhwckJ1aWxkZXI6IEV4cHJCdWlsZGVyKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmNsZWFyRmlsdGVyc0FjdGlvbiA9IG5ldyBBY3Rpb24oe1xuICAgICAgICAgICAgaWNvbjogXCJmYXIgZmEtbWludXMtc3F1YXJlXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJtc2cjZmFjZXQucmFuZ2UuY2xlYXJcIixcbiAgICAgICAgICAgIGFjdGlvbjogKCkgPT4gdGhpcy5jbGVhclJhbmdlKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcnNBY3Rpb24gPSBuZXcgQWN0aW9uKHtcbiAgICAgICAgICAgIGljb246IFwiZmFzIGZhLWZpbHRlclwiLFxuICAgICAgICAgICAgdGl0bGU6IFwibXNnI2ZhY2V0LnJhbmdlLmFwcGx5XCIsXG4gICAgICAgICAgICBhY3Rpb246ICgpID0+IHRoaXMuYXBwbHlSYW5nZSgpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGUgPSAodmFsdWU6IG51bWJlciwgbGFiZWw6IExhYmVsVHlwZSk6IHN0cmluZyA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlMSA9IHRoaXMucm91bmROZWFyZXN0KHZhbHVlKTsgLy8gdG8gYWNjb21tb2RhdGUgZnJhY3Rpb25hbCBzdGVwcyBnZW5lcmF0ZWQgZm9yIHllYXJzL21vbnRoc1xuXG4gICAgICAgIGlmICh0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uICYmIEFwcFNlcnZpY2UuaXNEYXRlKHRoaXMuY29sdW1uKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZTEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBtb21lbnQoZGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZSh0aGlzLmZvcm1hdCwge2RhdGU6IGRhdGUsIHRpbWU6IFV0aWxzLmdldFRpbWUoZGF0ZSksIHdlZWtEYXk6IG0ud2Vla2RheSgpLCB3ZWVrOiBtLndlZWsoKSwgd2Vla1llYXI6IG0ud2Vla1llYXIoKX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50bFNlcnZpY2UuZm9ybWF0TWVzc2FnZSh0aGlzLmZvcm1hdCwge3ZhbHVlOiB2YWx1ZTF9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRTZXJ2aWNlLmZvcm1hdEZpZWxkVmFsdWUodGhpcy5jb2x1bW4gJiYgQXBwU2VydmljZS5pc0RhdGUodGhpcy5jb2x1bW4pID8gbmV3IERhdGUodmFsdWUxKSA6IHZhbHVlMSwgdGhpcy5jb2x1bW4pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByb3VuZEFkanVzdG1lbnQodmFsdWU6IG51bWJlciwgbXVsdGlwbGU6IG51bWJlciwgcm91bmRUeXBlOiBSb3VuZFR5cGUpOiBudW1iZXIge1xuICAgICAgICBzd2l0Y2ggKHJvdW5kVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBSb3VuZFR5cGUudXA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG11bHRpcGxlIC0gdmFsdWUgJSBtdWx0aXBsZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYXNlIFJvdW5kVHlwZS5kb3duOlxuICAgICAgICAgICAgICAgIHJldHVybiAtKHZhbHVlICUgbXVsdGlwbGUpO1xuICAgICAgICAgICAgY2FzZSBSb3VuZFR5cGUubmVhcmVzdDoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkanVzdFVwID0gbXVsdGlwbGUgLSB2YWx1ZSAlIG11bHRpcGxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkanVzdERvd24gPSAtKHZhbHVlICUgbXVsdGlwbGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhhZGp1c3RVcCkgPD0gTWF0aC5hYnMoYWRqdXN0RG93bikgPyBhZGp1c3RVcCA6IGFkanVzdERvd247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JvdW5kTnVtYmVyVXAodmFsdWU6IG51bWJlciwgc3RlcDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA+PSAwID8gTWF0aC5jZWlsKHZhbHVlIC8gc3RlcCkgOiBNYXRoLmZsb29yKHZhbHVlIC8gc3RlcCkpICogc3RlcDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JvdW5kTnVtYmVyRG93bih2YWx1ZTogbnVtYmVyLCBzdGVwOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHZhbHVlID49IDAgPyBNYXRoLmZsb29yKHZhbHVlIC8gc3RlcCkgOiBNYXRoLmNlaWwodmFsdWUgLyBzdGVwKSkgKiBzdGVwO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfcm91bmROdW1iZXIodmFsdWU6IG51bWJlciwgc3RlcDogbnVtYmVyLCByb3VuZFR5cGU6IFJvdW5kVHlwZSk6IG51bWJlciB7XG4gICAgICAgIHN3aXRjaCAocm91bmRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIFJvdW5kVHlwZS51cDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91bmROdW1iZXJVcCh2YWx1ZSwgc3RlcCk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSBSb3VuZFR5cGUuZG93bjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcm91bmROdW1iZXJEb3duKHZhbHVlLCBzdGVwKTtcbiAgICAgICAgICAgIGNhc2UgUm91bmRUeXBlLm5lYXJlc3Q6IHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cCA9IHRoaXMuX3JvdW5kTnVtYmVyVXAodmFsdWUsIHN0ZXApO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvd24gPSB0aGlzLl9yb3VuZE51bWJlckRvd24odmFsdWUsIHN0ZXApO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh1cCAtIHZhbHVlKSA8PSBNYXRoLmFicyhkb3duIC0gdmFsdWUpID8gdXAgOiBkb3duO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9nZXROZWFyZXN0RGF0ZShkYXRlOiBEYXRlLCB1cHBlcjogRGF0ZSwgbG93ZXI6IERhdGUpOiBEYXRlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHVwcGVyLmdldFRpbWUoKSAtIGRhdGUuZ2V0VGltZSgpKSA8PSBNYXRoLmFicyhsb3dlci5nZXRUaW1lKCkgLSBkYXRlLmdldFRpbWUoKSkgPyB1cHBlciA6IGxvd2VyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfZ2V0TmVhcmVzdFRhcmdldERhdGUoZGF0ZTogRGF0ZSwgdGFyZ2V0OiBSb3VuZFRhcmdldCk6IERhdGUge1xuICAgICAgICBzd2l0Y2ggKHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSBSb3VuZFRhcmdldC55ZWFyOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldE5lYXJlc3REYXRlKGRhdGUsIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSArIDEsIDApLCBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgUm91bmRUYXJnZXQubW9udGg6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TmVhcmVzdERhdGUoZGF0ZSwgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkgKyAxKSwgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0LndlZWs6XG4gICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0LmRheToge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXROZWFyZXN0RGF0ZShkYXRlLCBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkgKyAxKSwgbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3JvdW5kKHZhbHVlOiBudW1iZXIsIHN0ZXA6IG51bWJlciwgdGFyZ2V0OiBSb3VuZFRhcmdldCwgbXVsdGlwbGU6IG51bWJlciwgIHJvdW5kVHlwZSA9IFJvdW5kVHlwZS5kb3duKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uICYmIEFwcFNlcnZpY2UuaXNEYXRlKHRoaXMuY29sdW1uKSkge1xuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAocm91bmRUeXBlID09PSBSb3VuZFR5cGUubmVhcmVzdCkge1xuICAgICAgICAgICAgICAgIC8vIHJvdW5kIHRvIHRoZSBuZWFyZXN0IHRhcmdldCB5ZWFyLCBtb250aCBvciBkYXkgdG8gYWRqdXN0IGZvciB0aGUgbGluZWFyIHN0ZXAgc2l6ZSBhbmQgbGVhcCB5ZWFyc1xuICAgICAgICAgICAgICAgIGRhdGUgPSB0aGlzLl9nZXROZWFyZXN0VGFyZ2V0RGF0ZShkYXRlLCB0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0LnllYXI6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHllYXIgJSBtdWx0aXBsZSAhPT0gMCB8fCBkYXRlLmdldE1vbnRoKCkgIT09IDAgfHwgZGF0ZS5nZXREYXRlKCkgIT09IDEgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0SG91cnMoKSAhPT0gMCB8fCBkYXRlLmdldE1pbnV0ZXMoKSAhPT0gMCB8fCBkYXRlLmdldFNlY29uZHMoKSAhPT0gMCB8fCBkYXRlLmdldE1pbGxpc2Vjb25kcygpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoeWVhciArIHRoaXMucm91bmRBZGp1c3RtZW50KHllYXIsIG11bHRpcGxlLCByb3VuZFR5cGUpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBSb3VuZFRhcmdldC5tb250aDoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnRoICUgbXVsdGlwbGUgIT09IDAgfHwgZGF0ZS5nZXREYXRlKCkgIT09IDEgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuZ2V0SG91cnMoKSAhPT0gMCB8fCBkYXRlLmdldE1pbnV0ZXMoKSAhPT0gMCB8fCBkYXRlLmdldFNlY29uZHMoKSAhPT0gMCB8fCBkYXRlLmdldE1pbGxpc2Vjb25kcygpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBtb250aCArIHRoaXMucm91bmRBZGp1c3RtZW50KG1vbnRoLCBtdWx0aXBsZSwgcm91bmRUeXBlKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgUm91bmRUYXJnZXQud2Vlazoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBGaXJzdCwgcm91bmQgdG8gTW9uZGF5XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXkgIT09IDEvKk1vbmRheSovIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlLmdldEhvdXJzKCkgIT09IDAgfHwgZGF0ZS5nZXRNaW51dGVzKCkgIT09IDAgfHwgZGF0ZS5nZXRTZWNvbmRzKCkgIT09IDAgfHwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFkanVzdDogbnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXAgPSA3IC0gKGRheSAtIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93biA9IC0oZGF5IC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJvdW5kVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUm91bmRUeXBlLnVwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3QgPSB1cDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJvdW5kVHlwZS5kb3duOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3QgPSBkb3duO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJvdW5kVHlwZS5uZWFyZXN0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3QgPSBNYXRoLmFicyh1cCkgPj0gTWF0aC5hYnMoZG93bikgPyB1cCA6IGRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSArIGFkanVzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlbiwgcm91bmQgdG8gd2VlayBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbSA9IG1vbWVudChkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2VlayA9IG0ud2VlaygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAod2VlayAlIG11bHRpcGxlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpICsgKHRoaXMucm91bmRBZGp1c3RtZW50KHdlZWssIG11bHRpcGxlLCByb3VuZFR5cGUpICogNykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0LmRheToge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfZGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRIb3VycygpICE9PSAwIHx8IGRhdGUuZ2V0TWludXRlcygpICE9PSAwIHx8IGRhdGUuZ2V0U2Vjb25kcygpICE9PSAwIHx8IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgX2RhdGUgKyB0aGlzLnJvdW5kQWRqdXN0bWVudChfZGF0ZSwgbXVsdGlwbGUsIHJvdW5kVHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb3VuZE51bWJlcih2YWx1ZSwgc3RlcCwgcm91bmRUeXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCByb3VuZCh2YWx1ZTogbnVtYmVyLCByb3VuZFR5cGUgPSBSb3VuZFR5cGUuZG93bik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3VuZCh2YWx1ZSwgdGhpcy5vcHRpb25zLnN0ZXAgfHwgMSwgdGhpcy5yb3VuZFRhcmdldCwgdGhpcy5yb3VuZE11bHRpcGxlLCByb3VuZFR5cGUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByb3VuZERvd24odmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdW5kKHZhbHVlLCBSb3VuZFR5cGUuZG93bik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJvdW5kVXAodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdW5kKHZhbHVlLCBSb3VuZFR5cGUudXApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByb3VuZE5lYXJlc3QodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvdW5kKHZhbHVlLCBSb3VuZFR5cGUubmVhcmVzdCk7XG4gICAgfVxuXG4gICAgLy9UT0RPIC0gcmVtb3ZlIGZpeCBlbmdpbmUgaGFja1xuICAgIHByaXZhdGUgZml4RGF0ZShkYXRlU3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoZGF0ZVN0cikge1xuICAgICAgICAgICAgY29uc3Qgc2Vjb25kc1NlcCA9IGRhdGVTdHIubGFzdEluZGV4T2YoXCI6XCIpO1xuICAgICAgICAgICAgaWYgKHNlY29uZHNTZXAgPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlY29uZHMgPSBVdGlscy50b0ludChkYXRlU3RyLnN1YnN0cihzZWNvbmRzU2VwICsgMSkpO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRzIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2Vjb25kcyA+IDU5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSA1OTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGF0ZVN0ciA9IGRhdGVTdHIuc3Vic3RyKDAsIHNlY29uZHNTZXAgKyAxKSArIHNlY29uZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGVTdHI7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRNaW5NYXgoKSB7XG4gICAgICAgIGxldCBtaW4gPSAwO1xuICAgICAgICBsZXQgbWF4ID0gMDtcbiAgICAgICAgaWYgKCFVdGlscy5pc0VtcHR5KHRoaXMubWluKSAmJiAoIVV0aWxzLmlzRW1wdHkodGhpcy5tYXgpKSkge1xuICAgICAgICAgICAgbWluID0gdGhpcy5wYXJzZVZhbHVlKCEhbmV3IERhdGUodGhpcy5taW4pLmdldERhdGUoKT8gbmV3IERhdGUodGhpcy5taW4pIDogdGhpcy5taW4pO1xuICAgICAgICAgICAgbWF4ID0gdGhpcy5wYXJzZVZhbHVlKCEhbmV3IERhdGUodGhpcy5tYXgpLmdldERhdGUoKT8gbmV3IERhdGUodGhpcy5tYXgpIDogdGhpcy5tYXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YT8uaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kYXRhLml0ZW1zWzBdO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0ub3BlcmF0b3JSZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzRGF0ZSh0aGlzLmNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyAtIHJlbW92ZSBmaXggZW5naW5lIGhhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyhpdGVtLm9wZXJhdG9yUmVzdWx0cy5taW4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IFV0aWxzLmZyb21TeXNEYXRlU3RyKHRoaXMuZml4RGF0ZShpdGVtLm9wZXJhdG9yUmVzdWx0cy5taW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNEYXRlKGRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1pbiA9IGRhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1heCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gVXRpbHMuZnJvbVN5c0RhdGVTdHIodGhpcy5maXhEYXRlKGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1heCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc0RhdGUoZGF0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5vcGVyYXRvclJlc3VsdHMubWF4ID0gZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW4gPSBVdGlscy5pc0RhdGUoaXRlbS5vcGVyYXRvclJlc3VsdHMubWluKSA/IGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1pbi5nZXRUaW1lKCkgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gVXRpbHMuaXNEYXRlKGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1heCkgPyBpdGVtLm9wZXJhdG9yUmVzdWx0cy5tYXguZ2V0VGltZSgpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbiA9IFV0aWxzLmlzTnVtYmVyKGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1pbikgPyBpdGVtLm9wZXJhdG9yUmVzdWx0cy5taW4gOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gVXRpbHMuaXNOdW1iZXIoaXRlbS5vcGVyYXRvclJlc3VsdHMubWF4KSA/IGl0ZW0ub3BlcmF0b3JSZXN1bHRzLm1heCA6IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zLmZsb29yID0gbWluO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY2VpbCA9IG1heDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGFyc2VWYWx1ZSh2YWx1ZTogc3RyaW5nIHwgRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIGlmIChVdGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVXRpbHMuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgX3ZhbHVlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbiAmJiB0aGlzLmNvbHVtbi5wYXJzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0ciA9IHRoaXMuZm9ybWF0U2VydmljZS5wYXJzZVZhbHVlKHZhbHVlLCB0aGlzLmNvbHVtbi5wYXJzZXIpO1xuICAgICAgICAgICAgX3ZhbHVlID0gVXRpbHMudG9OdW1iZXIoc3RyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVXRpbHMuaXNVbmRlZmluZWQoX3ZhbHVlKSkge1xuICAgICAgICAgICAgX3ZhbHVlID0gdGhpcy5jb2x1bW4gJiYgQXBwU2VydmljZS5pc0RhdGUodGhpcy5jb2x1bW4pID9cbiAgICAgICAgICAgICAgICBVdGlscy50b0R1cmF0aW9uKHZhbHVlKSA6XG4gICAgICAgICAgICAgICAgVXRpbHMudG9TaXplKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3ZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0U3RlcCgpIHtcbiAgICAgICAgLy8gU2VsZWN0IHRoZSBmaXJzdCBzdGVwIGRlZmluaXRpb24gd2hlcmUgdGhlIHJhbmdlID49IHN0ZXBEZWYubWluUmFuZ2VcbiAgICAgICAgbGV0IGZvcm1hdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBsZXQgc3RlcDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5zdGVwRGVmcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGVwRGVmIG9mIHRoaXMuc3RlcERlZnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RlcERlZi5zdGVwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNTdGVwID0gdGhpcy5wYXJzZVZhbHVlKHN0ZXBEZWYuc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzU3RlcCAmJiBzdGVwRGVmLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGVwRGVmLm1pblJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcCA9IHRoaXNTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHN0ZXBEZWYuZm9ybWF0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUm91bmQgbWluL21heCBmb3IgdGhpc1N0ZXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7cm91bmRUYXJnZXQsIHJvdW5kTXVsdGlwbGV9ID0gdGhpcy5nZXRSb3VuZFRhcmdldCh0aGlzU3RlcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWluID0gdGhpcy5fcm91bmQodGhpcy5vcHRpb25zLmZsb29yIHx8IDAsIHRoaXNTdGVwLCByb3VuZFRhcmdldCwgcm91bmRNdWx0aXBsZSwgUm91bmRUeXBlLmRvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heCA9IHRoaXMuX3JvdW5kKHRoaXMub3B0aW9ucy5jZWlsIHx8IDAsIHRoaXNTdGVwLCByb3VuZFRhcmdldCwgcm91bmRNdWx0aXBsZSwgUm91bmRUeXBlLnVwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5nZSA9IG1heCAtIG1pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtaW5SYW5nZSA9IHRoaXMucGFyc2VWYWx1ZShzdGVwRGVmLm1pblJhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UgPj0gbWluUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcCA9IHRoaXNTdGVwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBzdGVwRGVmLmZvcm1hdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghc3RlcCkge1xuICAgICAgICAgICAgLy8gRGVmYXVsdCBzdGVwLCBkZWZhdWx0IGZvcm1hdHRpbmdcbiAgICAgICAgICAgIHN0ZXAgPSB0aGlzLmNvbHVtbiAmJiBBcHBTZXJ2aWNlLmlzRGF0ZSh0aGlzLmNvbHVtbikgPyBVdGlscy5vbmVEYXkgOiAxO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkanVzdCBzdGVwIGZvciB5ZWFyL21vbnRoIHJvdW5kaW5nICh3ZSBhc3N1bWUgZGF5bGlnaHQgc2F2aW5ncyB3aWxsIGJhbGFuY2Ugb3V0IG92ZXIgdGhlIHllYXIpXG4gICAgICAgIGNvbnN0IHtyb3VuZFRhcmdldCwgcm91bmRNdWx0aXBsZX0gPSB0aGlzLmdldFJvdW5kVGFyZ2V0KHN0ZXApO1xuICAgICAgICBzd2l0Y2ggKHJvdW5kVGFyZ2V0KSB7XG4gICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0LnllYXI6XG4gICAgICAgICAgICAgICAgc3RlcCA9IHJvdW5kTXVsdGlwbGUgKiAzNjUuMjUgKiBVdGlscy5vbmVEYXk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0Lm1vbnRoOlxuICAgICAgICAgICAgICAgIHN0ZXAgPSByb3VuZE11bHRpcGxlICogMzY1LjI1ICogVXRpbHMub25lRGF5IC8gMTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3VuZFRhcmdldCA9IHJvdW5kVGFyZ2V0O1xuICAgICAgICB0aGlzLnJvdW5kTXVsdGlwbGUgPSByb3VuZE11bHRpcGxlO1xuICAgICAgICAvLyBTZXQgZGVmYXVsdCBmb3JtYXQgYmFzZWQgb24gcm91bmRUYXJnZXRcbiAgICAgICAgaWYgKCFmb3JtYXQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5yb3VuZFRhcmdldCkge1xuICAgICAgICAgICAgICAgIGNhc2UgUm91bmRUYXJnZXQueWVhcjpcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gXCJtc2cjZmFjZXQucmFuZ2UueWVhclwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFJvdW5kVGFyZ2V0Lm1vbnRoOlxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBcIm1zZyNmYWNldC5yYW5nZS5tb250aFllYXJcIjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBSb3VuZFRhcmdldC53ZWVrOlxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBcIm1zZyNmYWNldC5yYW5nZS53ZWVrWWVhclwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMuc3RlcCA9IHN0ZXA7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRSb3VuZFRhcmdldChzdGVwOiBudW1iZXIpOiB7IHJvdW5kVGFyZ2V0OiBSb3VuZFRhcmdldCwgcm91bmRNdWx0aXBsZTogbnVtYmVyIH0ge1xuICAgICAgICBjb25zdCByZXQgPSB7XG4gICAgICAgICAgICByb3VuZFRhcmdldDogUm91bmRUYXJnZXQubnVtYmVyLFxuICAgICAgICAgICAgcm91bmRNdWx0aXBsZTogMVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jb2x1bW4gJiYgQXBwU2VydmljZS5pc0RhdGUodGhpcy5jb2x1bW4pKSB7XG4gICAgICAgICAgICBpZiAoc3RlcCAlICgzNjUgKiBVdGlscy5vbmVEYXkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0LnJvdW5kVGFyZ2V0ID0gUm91bmRUYXJnZXQueWVhcjtcbiAgICAgICAgICAgICAgICByZXQucm91bmRNdWx0aXBsZSA9IHN0ZXAgLyAoMzY1ICogVXRpbHMub25lRGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgJSAoMzAgKiBVdGlscy5vbmVEYXkpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0LnJvdW5kVGFyZ2V0ID0gUm91bmRUYXJnZXQubW9udGg7XG4gICAgICAgICAgICAgICAgcmV0LnJvdW5kTXVsdGlwbGUgPSBzdGVwIC8gKDMwICogVXRpbHMub25lRGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgJSAoNyAqIFV0aWxzLm9uZURheSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXQucm91bmRUYXJnZXQgPSBSb3VuZFRhcmdldC53ZWVrO1xuICAgICAgICAgICAgICAgIHJldC5yb3VuZE11bHRpcGxlID0gc3RlcCAvICg3ICogVXRpbHMub25lRGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0ZXAgJSBVdGlscy5vbmVEYXkgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXQucm91bmRUYXJnZXQgPSBSb3VuZFRhcmdldC5kYXk7XG4gICAgICAgICAgICAgICAgcmV0LnJvdW5kTXVsdGlwbGUgPSBzdGVwIC8gVXRpbHMub25lRGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGRyYWdnYWJsZVJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgZW5mb3JjZVN0ZXA6IGZhbHNlLFxuICAgICAgICAgICAgdHJhbnNsYXRlOiB0aGlzLnRyYW5zbGF0ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXRNaW5NYXgoKTtcbiAgICAgICAgdGhpcy5pbml0U3RlcCgpO1xuICAgICAgICBsZXQgY2VpbCA9IHRoaXMub3B0aW9ucy5jZWlsIHx8IDA7XG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMub3B0aW9ucy5mbG9vciB8fCAwO1xuICAgICAgICB0aGlzLnNsaWRlckFjdGl2ZSA9IGNlaWwgPiBmbG9vcjtcbiAgICAgICAgaWYgKGNlaWwgPiBmbG9vcikge1xuICAgICAgICAgICAgZmxvb3IgPSB0aGlzLm9wdGlvbnMuZmxvb3IgPSB0aGlzLnJvdW5kRG93bihmbG9vcik7XG4gICAgICAgICAgICBjZWlsID0gdGhpcy5vcHRpb25zLmNlaWwgPSB0aGlzLnJvdW5kVXAoY2VpbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW2Zyb20sIHRvXSA9IHRoaXMuZ2V0UmFuZ2UoKTtcbiAgICAgICAgdGhpcy5yYW5nZUFjdGl2ZSA9ICFVdGlscy5pc1VuZGVmaW5lZChmcm9tKSB8fCAhVXRpbHMuaXNVbmRlZmluZWQodG8pO1xuICAgICAgICB0aGlzLnJhbmdlU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RhcnRWYWx1ZSA9IE1hdGgubWF4KGZyb20gfHwgZmxvb3IsIGZsb29yKTtcbiAgICAgICAgdGhpcy5oaWdoVmFsdWUgPSB0aGlzLnN0YXJ0SGlnaFZhbHVlID0gTWF0aC5taW4odG8gfHwgY2VpbCwgY2VpbCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdERvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdERvbmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGVDaGFuZ2UgPSBVdGlscy5zdWJzY3JpYmUodGhpcy5pbnRsU2VydmljZS5ldmVudHMsXG4gICAgICAgICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFudWFsUmVmcmVzaC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEhY2hhbmdlc1tcInJlc3VsdHNcIl0pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZmFjZXRTZXJ2aWNlLmdldEFnZ3JlZ2F0aW9uKHRoaXMuYWdncmVnYXRpb24sIHRoaXMucmVzdWx0cyk7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbiA9IHRoaXMuZGF0YSAmJiB0aGlzLmFwcFNlcnZpY2UuZ2V0Q29sdW1uKHRoaXMuZGF0YS5jb2x1bW4pO1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZXNpemUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMubWFudWFsUmVmcmVzaC5lbWl0KCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnVpU2VydmljZS5hZGRFbGVtZW50UmVzaXplTGlzdGVuZXIodGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudCwgdGhpcy5vblJlc2l6ZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmKHRoaXMubG9jYWxlQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZUNoYW5nZS51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMudWlTZXJ2aWNlICYmIHRoaXMuc2xpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnVpU2VydmljZS5yZW1vdmVFbGVtZW50UmVzaXplTGlzdGVuZXIodGhpcy5zbGlkZXIubmF0aXZlRWxlbWVudCwgdGhpcy5vblJlc2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVzZXJDaGFuZ2VFbmQoY2hhbmdlQ29udGV4dDogQ2hhbmdlQ29udGV4dCkge1xuICAgICAgICB0aGlzLnJhbmdlU2VsZWN0ZWQgPSB0aGlzLnZhbHVlICE9PSB0aGlzLnN0YXJ0VmFsdWUgfHwgdGhpcy5oaWdoVmFsdWUgIT09IHRoaXMuc3RhcnRIaWdoVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0UmFuZ2UoKTogbnVtYmVyW10gfCB1bmRlZmluZWRbXSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbikge1xuICAgICAgICAgICAgbGV0IGV4cHI6IEV4cHIgfCBzdHJpbmc7XG4gICAgICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBleHByZXNzaW9uID0gdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Py5maW5kU2VsZWN0KHRoaXMuY29sdW1uLm5hbWUpPy5leHByZXNzaW9uO1xuICAgICAgICAgICAgaWYgKGV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgICAgICBleHByID0gdGhpcy5hcHBTZXJ2aWNlLnBhcnNlRXhwcihleHByZXNzaW9uKTtcbiAgICAgICAgICAgICAgICBpZiAoZXhwciBpbnN0YW5jZW9mIEV4cHIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4cHIudmFsdWVzICYmIGV4cHIudmFsdWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZXhwci52YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGV4cHIudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlscy5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4cHIub3BlcmF0b3IgPT09IEV4cHJPcGVyYXRvci5ndGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZSwgdW5kZWZpbmVkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXhwci5vcGVyYXRvciA9PT0gRXhwck9wZXJhdG9yLmx0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gW3VuZGVmaW5lZCwgdmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gIHZhbHVlLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICh2YWwpID0+IHZhbCA/IHRoaXMuYWR2YW5jZWRTZXJ2aWNlLmNhc3RBZHZhbmNlZFZhbHVlKHZhbCwgdGhpcy5jb2x1bW4pIDogdmFsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcHBTZXJ2aWNlLmlzRGF0ZSh0aGlzLmNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gIHZhbHVlLm1hcChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsKSA9PiB2YWwgPyBuZXcgRGF0ZSh2YWwpLmdldFRpbWUoKSA6IHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdW5kZWZpbmVkLCB1bmRlZmluZWRdXG4gICAgfVxuXG4gICAgc2V0UmFuZ2UoZnJvbTogbnVtYmVyIHwgdW5kZWZpbmVkLCB0bzogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCB2YWxGcm9tO1xuICAgICAgICBsZXQgdmFsVG87XG4gICAgICAgIGxldCBleHByZXNzaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbikge1xuICAgICAgICAgICAgdmFsRnJvbSA9IEFwcFNlcnZpY2UuaXNEYXRlKHRoaXMuY29sdW1uKSAmJiBVdGlscy5pc051bWJlcihmcm9tKSA/IG5ldyBEYXRlKGZyb20pIDogZnJvbTtcbiAgICAgICAgICAgIHZhbFRvID0gQXBwU2VydmljZS5pc0RhdGUodGhpcy5jb2x1bW4pICYmIFV0aWxzLmlzTnVtYmVyKHRvKSA/IG5ldyBEYXRlKHRvKSA6IHRvO1xuICAgICAgICAgICAgaWYgKCEhdmFsRnJvbSAmJiAhIXZhbFRvKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZVJhbmdlRXhwcih0aGlzLmNvbHVtbi5uYW1lLCB2YWxGcm9tLCB2YWxUbyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEhdmFsRnJvbSkge1xuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSB0aGlzLmV4cHJCdWlsZGVyLm1ha2VOdW1lcmljYWxFeHByKHRoaXMuY29sdW1uLm5hbWUsICc+PScsIHZhbEZyb20pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghIXZhbFRvKSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHRoaXMuZXhwckJ1aWxkZXIubWFrZU51bWVyaWNhbEV4cHIodGhpcy5jb2x1bW4ubmFtZSwgJzw9JywgdmFsVG8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnF1ZXJ5Py5yZW1vdmVTZWxlY3QodGhpcy5jb2x1bW4ubmFtZSk7XG4gICAgICAgICAgICBpZiAoZXhwcmVzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5xdWVyeT8uYWRkU2VsZWN0KFxuICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbi5uYW1lXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5UmFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0UmFuZ2UodGhpcy5yb3VuZE5lYXJlc3QodGhpcy52YWx1ZSksIHRoaXMucm91bmROZWFyZXN0KHRoaXMuaGlnaFZhbHVlKSk7XG4gICAgICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2goKTtcbiAgICB9XG5cbiAgICBjbGVhclJhbmdlKCkge1xuICAgICAgICB0aGlzLnNldFJhbmdlKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5zZWFyY2hTZXJ2aWNlLnNlYXJjaCgpO1xuICAgIH1cblxuICAgIGdldCBhY3Rpb25zKCk6IEFjdGlvbltdIHtcbiAgICAgICAgY29uc3QgYWN0aW9uczogQWN0aW9uW10gPSBbXTtcbiAgICAgICAgaWYodGhpcy5yYW5nZVNlbGVjdGVkKXtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLmFwcGx5RmlsdGVyc0FjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5yYW5nZUFjdGl2ZSl7XG4gICAgICAgICAgYWN0aW9ucy5wdXNoKHRoaXMuY2xlYXJGaWx0ZXJzQWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiZGF0YVwiPlxuICAgIDxkaXYgI3NsaWRlciBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICA8bmc1LXNsaWRlclxuICAgICAgICAgICAgKm5nSWY9XCJzbGlkZXJBY3RpdmVcIlxuICAgICAgICAgICAgWyh2YWx1ZSldPVwidmFsdWVcIlxuICAgICAgICAgICAgWyhoaWdoVmFsdWUpXT1cImhpZ2hWYWx1ZVwiXG4gICAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCJcbiAgICAgICAgICAgIFttYW51YWxSZWZyZXNoXT1cIm1hbnVhbFJlZnJlc2hcIlxuICAgICAgICAgICAgKHVzZXJDaGFuZ2VFbmQpPVwib25Vc2VyQ2hhbmdlRW5kKCRldmVudClcIj5cbiAgICAgICAgPC9uZzUtc2xpZGVyPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFzbGlkZXJBY3RpdmVcIj57eydtc2cjZmFjZXQucmFuZ2UudW5hdmFpbGFibGUnIHwgc3FNZXNzYWdlfX08L3NwYW4+XG4gICAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==