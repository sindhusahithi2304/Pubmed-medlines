import { Aggregation, AggregationItem } from '@sinequa/core/web-services';
import { ValueItem } from '../format.service';
import * as i0 from "@angular/core";
export declare class ExprBuilder {
    /**
     * Make a standard selection expression
     * (resulting in a SQL clause like "company contains 'BOEING'")
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the field to select (eg. "BOEING")
     * @param display Optional string to display that value (eg. "Boeing")
     */
    makeExpr(field: string, value: string, display?: string): string;
    /**
     * Make a boolean expression
     * @param field Name of the field to select (eg. "toto")
     * @param value Value of the field to select (eg. "true")
     * @param display Optional string to display that value (eg. "True")
     */
    makeBooleanExpr(field: string, value: boolean, display?: string): string;
    /**
     * Make a numerical expression using a comparison operator (>, <, <=, >=, etc.)
     * @param field Name of the field to select (eg. "modified")
     * @param operator Comparison operator used for that selection (eg. ">")
     * @param value Value of the field to select (eg. "2020-12-15")
     * @param display Optional string to display that value (eg. "After Dec 15 2020")
     */
    makeNumericalExpr(field: string, operator: '>' | '>=' | '<' | '<=' | '=' | '<>', value: number | Date | string, display?: string): string;
    /**
     * Make a list expression
     * @param field Name of the field to select (eg. "docformat")
     * @param values Values of the field to select (eg. ['htm','pdf'])
     * @param display Optional string to display that value (eg. "htm, pdf")
     */
    makeListExpr(field: string, values: string[], display?: string): string;
    /**
     * Make a range expression
     * @param field Name of the field to select (eg. "modified")
     * @param from Begining of the range (eg. 2020-12-15)
     * @param to End of the range (eg. 2020-12-20)
     * @param display Optional string to display that value (eg. "[Dec 15 2020, Dec 20 2020]")
     */
    makeRangeExpr(field: string, from: number | Date | string, to: number | Date | string, display?: string): string;
    /**
     * Make a RegExp expression
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the regular expression to match (eg. "BOE.*")
     * @param display Optional string to display that value (eg. "Boe...")
     */
    makeRegexpExpr(field: string, value: string, display?: string): string;
    /**
     * Make a refine expression
     * @param text The text to add to the query
     */
    makeRefineExpr(text: string): string;
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ANDed)
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeAndExpr(field: string, values: (string | ValueItem)[], display?: string): string;
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ORed)
     * This function should be equivalent to using makeListExpr
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeOrExpr(field: string, values: (string | ValueItem)[], display?: string): string;
    /**
     * Combine a list of values with AND or OR operators
     * @param values the list of values
     * @param operator the operator
     */
    private concatWithOperator;
    /**
     * Returns the negative expression of the given expression
     * eg. NOT(person:Bill GATES)
     * @param expr
     */
    makeNotExpr(expr: string): string;
    /**
     * Returns an expression that is the union of given expressions
     * eg. person:Bill GATES OR company:MICROSOFT
     * @param exprs
     */
    concatOrExpr(exprs: string[]): string;
    /**
     * Returns an expression that is the intersection of given expressions
     * eg. person:Bill GATES AND company:MICROSOFT
     * @param exprs
     */
    concatAndExpr(exprs: string[]): string;
    /**
     * Returns an expression to select the given item
     * @param field Name of the field to select (eg. "company")
     * @param items A single or list of ValueItem object(s) (eg. content of a record)
     */
    makeFieldExpr(field: string, items: ValueItem | ValueItem[], combineWithAnd?: boolean): string;
    /**
     * Create an expression for the given aggregation item
     * @param aggregation The aggregation containing this object
     * @param items The AggregationItem(s) to select
     * @param combineWithAnd If there are multiple values, combine them with AND (instead of OR)
     */
    makeAggregationExpr(aggregation: Aggregation, items: AggregationItem | AggregationItem[], combineWithAnd?: boolean): string;
    /**
     * Combines the field with the optional display value(s)
     * @param field
     * @param display
     */
    private formatField;
    /**
     * Return the AggregationItem list as a ValueItem list
     * @param items
     * @param isTree
     */
    private asValueItems;
    static ɵfac: i0.ɵɵFactoryDef<ExprBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDef<ExprBuilder>;
}
//# sourceMappingURL=expr-builder.d.ts.map