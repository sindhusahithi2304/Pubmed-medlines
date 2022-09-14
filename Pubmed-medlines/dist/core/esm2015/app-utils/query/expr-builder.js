import { Injectable } from '@angular/core';
import { Utils } from '@sinequa/core/base';
import { ExprParser } from './expr-parser';
import * as i0 from "@angular/core";
export class ExprBuilder {
    /**
     * Make a standard selection expression
     * (resulting in a SQL clause like "company contains 'BOEING'")
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the field to select (eg. "BOEING")
     * @param display Optional string to display that value (eg. "Boeing")
     */
    makeExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}: ${ExprParser.escape(value)}`; // company`Boeing`: BOEING
    }
    /**
     * Make a boolean expression
     * @param field Name of the field to select (eg. "toto")
     * @param value Value of the field to select (eg. "true")
     * @param display Optional string to display that value (eg. "True")
     */
    makeBooleanExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}: ${ExprParser.escape(Utils.toSqlValue(value))}`; // toto`True`: true
    }
    /**
     * Make a numerical expression using a comparison operator (>, <, <=, >=, etc.)
     * @param field Name of the field to select (eg. "modified")
     * @param operator Comparison operator used for that selection (eg. ">")
     * @param value Value of the field to select (eg. "2020-12-15")
     * @param display Optional string to display that value (eg. "After Dec 15 2020")
     */
    makeNumericalExpr(field, operator, value, display) {
        field = this.formatField(field, display);
        if (Utils.isString(value)) {
            value = ExprParser.escape(value);
        }
        if (Utils.isDate(value) || Utils.isNumber(value)) {
            value = Utils.toSqlValue(value);
        }
        return `${field}:${operator} ${value}`; // modified`After Dec 15 2020`:> 2020-12-15
    }
    /**
     * Make a list expression
     * @param field Name of the field to select (eg. "docformat")
     * @param values Values of the field to select (eg. ['htm','pdf'])
     * @param display Optional string to display that value (eg. "htm, pdf")
     */
    makeListExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: [${values.map(v => ExprParser.escape(v)).join(',')}]`; // docformat`htm, pdf`:[`htm`,`pdf`]
    }
    /**
     * Make a range expression
     * @param field Name of the field to select (eg. "modified")
     * @param from Begining of the range (eg. 2020-12-15)
     * @param to End of the range (eg. 2020-12-20)
     * @param display Optional string to display that value (eg. "[Dec 15 2020, Dec 20 2020]")
     */
    makeRangeExpr(field, from, to, display) {
        field = this.formatField(field, display);
        return `${field}: [${Utils.toSqlValue(from)}..${Utils.toSqlValue(to)}]`; // modified`[Dec 15 2020, Dec 20 2020]`: [2020-12-15..2020-12-20]
    }
    /**
     * Make a RegExp expression
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the regular expression to match (eg. "BOE.*")
     * @param display Optional string to display that value (eg. "Boe...")
     */
    makeRegexpExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}:~ ${ExprParser.escape(value)}`; // company`Boe...`:~ BOE.*
    }
    /**
     * Make a refine expression
     * @param text The text to add to the query
     */
    makeRefineExpr(text) {
        return `refine: ${ExprParser.escape(text)}`;
    }
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ANDed)
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeAndExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'AND')})`; // company: (IBM AND APPLE AND GOOGLE)
    }
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ORed)
     * This function should be equivalent to using makeListExpr
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeOrExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'OR')})`; // company: (IBM OR APPLE OR GOOGLE)
    }
    /**
     * Combine a list of values with AND or OR operators
     * @param values the list of values
     * @param operator the operator
     */
    concatWithOperator(values, operator) {
        return values.map(v => {
            if (Utils.isString(v)) {
                return ExprParser.escape(v);
            }
            if (v.display) {
                return `${ExprParser.escape(v.display)}:${ExprParser.escape(Utils.toSqlValue(v.value))}`;
            }
            return ExprParser.escape(Utils.toSqlValue(v.value));
        }).join(' ' + operator + ' ');
    }
    /**
     * Returns the negative expression of the given expression
     * eg. NOT(person:Bill GATES)
     * @param expr
     */
    makeNotExpr(expr) {
        return `NOT (${expr})`;
    }
    /**
     * Returns an expression that is the union of given expressions
     * eg. person:Bill GATES OR company:MICROSOFT
     * @param exprs
     */
    concatOrExpr(exprs) {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') OR (')})`;
    }
    /**
     * Returns an expression that is the intersection of given expressions
     * eg. person:Bill GATES AND company:MICROSOFT
     * @param exprs
     */
    concatAndExpr(exprs) {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') AND (')})`;
    }
    /**
     * Returns an expression to select the given item
     * @param field Name of the field to select (eg. "company")
     * @param items A single or list of ValueItem object(s) (eg. content of a record)
     */
    makeFieldExpr(field, items, combineWithAnd) {
        if (!Utils.isArray(items)) {
            items = [items];
        }
        if (items.length === 0) {
            return ""; // Return a falsy string instead of "()" or "``" which would be truthy
        }
        return combineWithAnd ? this.makeAndExpr(field, items) : this.makeOrExpr(field, items);
    }
    /**
     * Create an expression for the given aggregation item
     * @param aggregation The aggregation containing this object
     * @param items The AggregationItem(s) to select
     * @param combineWithAnd If there are multiple values, combine them with AND (instead of OR)
     */
    makeAggregationExpr(aggregation, items, combineWithAnd) {
        if (!Utils.isArray(items)) {
            items = [items];
        }
        if (aggregation.valuesAreExpressions) {
            const exprs = items.map(i => i.value.toString()); // .toString() is to avoid typing issues. With valuesAreExpressions = true, item.value is expected to be a string
            return combineWithAnd ? this.concatAndExpr(exprs) : this.concatOrExpr(exprs);
        }
        else {
            const _items = this.asValueItems(items, aggregation.isTree);
            return this.makeFieldExpr(aggregation.column, _items, combineWithAnd);
        }
    }
    /**
     * Combines the field with the optional display value(s)
     * @param field
     * @param display
     */
    formatField(field, display) {
        if (display) {
            field = `${field}${ExprParser.escape(display)}`;
        }
        return field;
    }
    /**
     * Return the AggregationItem list as a ValueItem list
     * @param items
     * @param isTree
     */
    asValueItems(items, isTree) {
        if (isTree) {
            return items.map(i => {
                return {
                    value: i.$path + "*",
                    display: i.display || i.value
                };
            });
        }
        return items; // This works because ValueItem and AggregationItem share the value and display properties
    }
}
ExprBuilder.ɵfac = function ExprBuilder_Factory(t) { return new (t || ExprBuilder)(); };
ExprBuilder.ɵprov = i0.ɵɵdefineInjectable({ token: ExprBuilder, factory: ExprBuilder.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ExprBuilder, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwci1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYXBwLXV0aWxzLyIsInNvdXJjZXMiOlsicXVlcnkvZXhwci1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzNDLE1BQU0sT0FBTyxXQUFXO0lBRXBCOzs7Ozs7T0FNRztJQUNILFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBYSxFQUFFLE9BQWdCO1FBQ25ELEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxPQUFPLEdBQUcsS0FBSyxLQUFLLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLDBCQUEwQjtJQUM5RSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsS0FBYSxFQUFFLEtBQWMsRUFBRSxPQUFnQjtRQUMzRCxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsT0FBTyxHQUFHLEtBQUssS0FBSyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQW1CO0lBQ3pGLENBQUM7SUFHRDs7Ozs7O09BTUc7SUFDSCxpQkFBaUIsQ0FDYixLQUFhLEVBQ2IsUUFBOEMsRUFDOUMsS0FBNkIsRUFDN0IsT0FBZ0I7UUFFaEIsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXpDLElBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFL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LE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbkQ7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNLLFlBQVksQ0FBQyxLQUF3QixFQUFFLE1BQWdCO1FBQzNELElBQUcsTUFBTSxFQUFFO1lBQ1AsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqQixPQUFPO29CQUNILEtBQUssRUFBRyxDQUF5QixDQUFDLEtBQUssR0FBRyxHQUFHO29CQUM3QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBZTtpQkFDMUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLDBGQUEwRjtJQUM1RyxDQUFDOztzRUFyUFEsV0FBVzttREFBWCxXQUFXLFdBQVgsV0FBVyxtQkFGUixNQUFNO2tEQUVULFdBQVc7Y0FIdkIsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdAc2luZXF1YS9jb3JlL2Jhc2UnO1xuaW1wb3J0IHsgQWdncmVnYXRpb24sIEFnZ3JlZ2F0aW9uSXRlbSwgVHJlZUFnZ3JlZ2F0aW9uTm9kZSB9IGZyb20gJ0BzaW5lcXVhL2NvcmUvd2ViLXNlcnZpY2VzJztcbmltcG9ydCB7IFZhbHVlSXRlbSB9IGZyb20gJy4uL2Zvcm1hdC5zZXJ2aWNlJztcbmltcG9ydCB7IEV4cHJQYXJzZXIgfSBmcm9tICcuL2V4cHItcGFyc2VyJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFeHByQnVpbGRlciB7XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgc3RhbmRhcmQgc2VsZWN0aW9uIGV4cHJlc3Npb25cbiAgICAgKiAocmVzdWx0aW5nIGluIGEgU1FMIGNsYXVzZSBsaWtlIFwiY29tcGFueSBjb250YWlucyAnQk9FSU5HJ1wiKVxuICAgICAqIEBwYXJhbSBmaWVsZCBOYW1lIG9mIHRoZSBmaWVsZCB0byBzZWxlY3QgKGVnLiBcImNvbXBhbnlcIilcbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwiQk9FSU5HXCIpXG4gICAgICogQHBhcmFtIGRpc3BsYXkgT3B0aW9uYWwgc3RyaW5nIHRvIGRpc3BsYXkgdGhhdCB2YWx1ZSAoZWcuIFwiQm9laW5nXCIpXG4gICAgICovXG4gICAgbWFrZUV4cHIoZmllbGQ6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGlzcGxheT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGZpZWxkID0gdGhpcy5mb3JtYXRGaWVsZChmaWVsZCwgZGlzcGxheSk7XG4gICAgICAgIHJldHVybiBgJHtmaWVsZH06ICR7RXhwclBhcnNlci5lc2NhcGUodmFsdWUpfWA7IC8vIGNvbXBhbnlgQm9laW5nYDogQk9FSU5HXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBhIGJvb2xlYW4gZXhwcmVzc2lvblxuICAgICAqIEBwYXJhbSBmaWVsZCBOYW1lIG9mIHRoZSBmaWVsZCB0byBzZWxlY3QgKGVnLiBcInRvdG9cIilcbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwidHJ1ZVwiKVxuICAgICAqIEBwYXJhbSBkaXNwbGF5IE9wdGlvbmFsIHN0cmluZyB0byBkaXNwbGF5IHRoYXQgdmFsdWUgKGVnLiBcIlRydWVcIilcbiAgICAgKi9cbiAgICBtYWtlQm9vbGVhbkV4cHIoZmllbGQ6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4sIGRpc3BsYXk/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBmaWVsZCA9IHRoaXMuZm9ybWF0RmllbGQoZmllbGQsIGRpc3BsYXkpO1xuICAgICAgICByZXR1cm4gYCR7ZmllbGR9OiAke0V4cHJQYXJzZXIuZXNjYXBlKFV0aWxzLnRvU3FsVmFsdWUodmFsdWUpKX1gOyAvLyB0b3RvYFRydWVgOiB0cnVlXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgbnVtZXJpY2FsIGV4cHJlc3Npb24gdXNpbmcgYSBjb21wYXJpc29uIG9wZXJhdG9yICg+LCA8LCA8PSwgPj0sIGV0Yy4pXG4gICAgICogQHBhcmFtIGZpZWxkIE5hbWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwibW9kaWZpZWRcIilcbiAgICAgKiBAcGFyYW0gb3BlcmF0b3IgQ29tcGFyaXNvbiBvcGVyYXRvciB1c2VkIGZvciB0aGF0IHNlbGVjdGlvbiAoZWcuIFwiPlwiKVxuICAgICAqIEBwYXJhbSB2YWx1ZSBWYWx1ZSBvZiB0aGUgZmllbGQgdG8gc2VsZWN0IChlZy4gXCIyMDIwLTEyLTE1XCIpXG4gICAgICogQHBhcmFtIGRpc3BsYXkgT3B0aW9uYWwgc3RyaW5nIHRvIGRpc3BsYXkgdGhhdCB2YWx1ZSAoZWcuIFwiQWZ0ZXIgRGVjIDE1IDIwMjBcIilcbiAgICAgKi9cbiAgICBtYWtlTnVtZXJpY2FsRXhwcihcbiAgICAgICAgZmllbGQ6IHN0cmluZyxcbiAgICAgICAgb3BlcmF0b3I6ICc+JyB8ICc+PScgfCAnPCcgfCAnPD0nIHwgJz0nIHwgJzw+JyxcbiAgICAgICAgdmFsdWU6IG51bWJlciB8IERhdGUgfCBzdHJpbmcsXG4gICAgICAgIGRpc3BsYXk/OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGZpZWxkID0gdGhpcy5mb3JtYXRGaWVsZChmaWVsZCwgZGlzcGxheSk7XG5cbiAgICAgICAgaWYoVXRpbHMuaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IEV4cHJQYXJzZXIuZXNjYXBlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZihVdGlscy5pc0RhdGUodmFsdWUpIHx8IFV0aWxzLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBVdGlscy50b1NxbFZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHtmaWVsZH06JHtvcGVyYXRvcn0gJHt2YWx1ZX1gOyAvLyBtb2RpZmllZGBBZnRlciBEZWMgMTUgMjAyMGA6PiAyMDIwLTEyLTE1XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgbGlzdCBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIGZpZWxkIE5hbWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwiZG9jZm9ybWF0XCIpXG4gICAgICogQHBhcmFtIHZhbHVlcyBWYWx1ZXMgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFsnaHRtJywncGRmJ10pXG4gICAgICogQHBhcmFtIGRpc3BsYXkgT3B0aW9uYWwgc3RyaW5nIHRvIGRpc3BsYXkgdGhhdCB2YWx1ZSAoZWcuIFwiaHRtLCBwZGZcIilcbiAgICAgKi9cbiAgICBtYWtlTGlzdEV4cHIoZmllbGQ6IHN0cmluZywgdmFsdWVzOiBzdHJpbmdbXSwgZGlzcGxheT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGZpZWxkID0gdGhpcy5mb3JtYXRGaWVsZChmaWVsZCwgZGlzcGxheSk7XG4gICAgICAgIHJldHVybiBgJHtmaWVsZH06IFske3ZhbHVlcy5tYXAodiA9PiBFeHByUGFyc2VyLmVzY2FwZSh2KSkuam9pbignLCcpfV1gOyAvLyBkb2Nmb3JtYXRgaHRtLCBwZGZgOltgaHRtYCxgcGRmYF1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1ha2UgYSByYW5nZSBleHByZXNzaW9uXG4gICAgICogQHBhcmFtIGZpZWxkIE5hbWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwibW9kaWZpZWRcIilcbiAgICAgKiBAcGFyYW0gZnJvbSBCZWdpbmluZyBvZiB0aGUgcmFuZ2UgKGVnLiAyMDIwLTEyLTE1KVxuICAgICAqIEBwYXJhbSB0byBFbmQgb2YgdGhlIHJhbmdlIChlZy4gMjAyMC0xMi0yMClcbiAgICAgKiBAcGFyYW0gZGlzcGxheSBPcHRpb25hbCBzdHJpbmcgdG8gZGlzcGxheSB0aGF0IHZhbHVlIChlZy4gXCJbRGVjIDE1IDIwMjAsIERlYyAyMCAyMDIwXVwiKVxuICAgICAqL1xuICAgIG1ha2VSYW5nZUV4cHIoXG4gICAgICAgIGZpZWxkOiBzdHJpbmcsXG4gICAgICAgIGZyb206IG51bWJlciB8IERhdGUgfCBzdHJpbmcsXG4gICAgICAgIHRvOiBudW1iZXIgfCBEYXRlIHwgc3RyaW5nLFxuICAgICAgICBkaXNwbGF5Pzogc3RyaW5nKTogc3RyaW5nIHtcblxuICAgICAgICBmaWVsZCA9IHRoaXMuZm9ybWF0RmllbGQoZmllbGQsIGRpc3BsYXkpO1xuICAgICAgICByZXR1cm4gYCR7ZmllbGR9OiBbJHtVdGlscy50b1NxbFZhbHVlKGZyb20pfS4uJHtVdGlscy50b1NxbFZhbHVlKHRvKX1dYDsgLy8gbW9kaWZpZWRgW0RlYyAxNSAyMDIwLCBEZWMgMjAgMjAyMF1gOiBbMjAyMC0xMi0xNS4uMjAyMC0xMi0yMF1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1ha2UgYSBSZWdFeHAgZXhwcmVzc2lvblxuICAgICAqIEBwYXJhbSBmaWVsZCBOYW1lIG9mIHRoZSBmaWVsZCB0byBzZWxlY3QgKGVnLiBcImNvbXBhbnlcIilcbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgb2YgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCAoZWcuIFwiQk9FLipcIilcbiAgICAgKiBAcGFyYW0gZGlzcGxheSBPcHRpb25hbCBzdHJpbmcgdG8gZGlzcGxheSB0aGF0IHZhbHVlIChlZy4gXCJCb2UuLi5cIilcbiAgICAgKi9cbiAgICBtYWtlUmVnZXhwRXhwcihmaWVsZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkaXNwbGF5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgZmllbGQgPSB0aGlzLmZvcm1hdEZpZWxkKGZpZWxkLCBkaXNwbGF5KTtcbiAgICAgICAgcmV0dXJuIGAke2ZpZWxkfTp+ICR7RXhwclBhcnNlci5lc2NhcGUodmFsdWUpfWA7IC8vIGNvbXBhbnlgQm9lLi4uYDp+IEJPRS4qXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgcmVmaW5lIGV4cHJlc3Npb25cbiAgICAgKiBAcGFyYW0gdGV4dCBUaGUgdGV4dCB0byBhZGQgdG8gdGhlIHF1ZXJ5XG4gICAgICovXG4gICAgbWFrZVJlZmluZUV4cHIodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGByZWZpbmU6ICR7RXhwclBhcnNlci5lc2NhcGUodGV4dCl9YDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbiBleHByZXNzaW9uIHRoYXQgc2VsZWN0cyBtdWx0aXBsZSB2YWx1ZXMgZm9yIGEgZmllbGRcbiAgICAgKiAoQWxsIHZhbHVlcyBhcmUgQU5EZWQpXG4gICAgICogQHBhcmFtIGZpZWxkIE5hbWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwiY29tcGFueVwiKVxuICAgICAqIEBwYXJhbSB2YWx1ZXMgVmFsdWVzIG9mIHRoZSBmaWVsZCB0byBzZWxlY3QgKGVnLiBbJ0lCTScsJ0FQUExFJ10pXG4gICAgICogQHBhcmFtIGRpc3BsYXkgT3B0aW9uYWwgc3RyaW5nIHRvIGRpc3BsYXkgdGhhdCB2YWx1ZSAoZWcuIFwiSUJNIGFuZCBBcHBsZVwiKVxuICAgICAqL1xuICAgIG1ha2VBbmRFeHByKGZpZWxkOiBzdHJpbmcsIHZhbHVlczogKHN0cmluZyB8IFZhbHVlSXRlbSlbXSwgZGlzcGxheT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGZpZWxkID0gdGhpcy5mb3JtYXRGaWVsZChmaWVsZCwgZGlzcGxheSk7XG4gICAgICAgIHJldHVybiBgJHtmaWVsZH06ICgke3RoaXMuY29uY2F0V2l0aE9wZXJhdG9yKHZhbHVlcywgJ0FORCcpfSlgOyAvLyBjb21wYW55OiAoSUJNIEFORCBBUFBMRSBBTkQgR09PR0xFKVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFuIGV4cHJlc3Npb24gdGhhdCBzZWxlY3RzIG11bHRpcGxlIHZhbHVlcyBmb3IgYSBmaWVsZFxuICAgICAqIChBbGwgdmFsdWVzIGFyZSBPUmVkKVxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGVxdWl2YWxlbnQgdG8gdXNpbmcgbWFrZUxpc3RFeHByXG4gICAgICogQHBhcmFtIGZpZWxkIE5hbWUgb2YgdGhlIGZpZWxkIHRvIHNlbGVjdCAoZWcuIFwiY29tcGFueVwiKVxuICAgICAqIEBwYXJhbSB2YWx1ZXMgVmFsdWVzIG9mIHRoZSBmaWVsZCB0byBzZWxlY3QgKGVnLiBbJ0lCTScsJ0FQUExFJ10pXG4gICAgICogQHBhcmFtIGRpc3BsYXkgT3B0aW9uYWwgc3RyaW5nIHRvIGRpc3BsYXkgdGhhdCB2YWx1ZSAoZWcuIFwiSUJNIGFuZCBBcHBsZVwiKVxuICAgICAqL1xuICAgIG1ha2VPckV4cHIoZmllbGQ6IHN0cmluZywgdmFsdWVzOiAoc3RyaW5nIHwgVmFsdWVJdGVtKVtdLCBkaXNwbGF5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgZmllbGQgPSB0aGlzLmZvcm1hdEZpZWxkKGZpZWxkLCBkaXNwbGF5KTtcbiAgICAgICAgcmV0dXJuIGAke2ZpZWxkfTogKCR7dGhpcy5jb25jYXRXaXRoT3BlcmF0b3IodmFsdWVzLCAnT1InKX0pYDsgLy8gY29tcGFueTogKElCTSBPUiBBUFBMRSBPUiBHT09HTEUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29tYmluZSBhIGxpc3Qgb2YgdmFsdWVzIHdpdGggQU5EIG9yIE9SIG9wZXJhdG9yc1xuICAgICAqIEBwYXJhbSB2YWx1ZXMgdGhlIGxpc3Qgb2YgdmFsdWVzXG4gICAgICogQHBhcmFtIG9wZXJhdG9yIHRoZSBvcGVyYXRvclxuICAgICAqL1xuICAgIHByaXZhdGUgY29uY2F0V2l0aE9wZXJhdG9yKHZhbHVlczogKHN0cmluZyB8IFZhbHVlSXRlbSlbXSwgb3BlcmF0b3I6ICdBTkQnIHwgJ09SJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcCh2ID0+IHtcbiAgICAgICAgICAgIGlmIChVdGlscy5pc1N0cmluZyh2KSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEV4cHJQYXJzZXIuZXNjYXBlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHYuZGlzcGxheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHtFeHByUGFyc2VyLmVzY2FwZSh2LmRpc3BsYXkpfToke0V4cHJQYXJzZXIuZXNjYXBlKFV0aWxzLnRvU3FsVmFsdWUodi52YWx1ZSkpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRXhwclBhcnNlci5lc2NhcGUoVXRpbHMudG9TcWxWYWx1ZSh2LnZhbHVlKSk7XG4gICAgICAgIH0pLmpvaW4oJyAnK29wZXJhdG9yKycgJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmVnYXRpdmUgZXhwcmVzc2lvbiBvZiB0aGUgZ2l2ZW4gZXhwcmVzc2lvblxuICAgICAqIGVnLiBOT1QocGVyc29uOkJpbGwgR0FURVMpXG4gICAgICogQHBhcmFtIGV4cHJcbiAgICAgKi9cbiAgICBtYWtlTm90RXhwcihleHByOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYE5PVCAoJHtleHByfSlgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gZXhwcmVzc2lvbiB0aGF0IGlzIHRoZSB1bmlvbiBvZiBnaXZlbiBleHByZXNzaW9uc1xuICAgICAqIGVnLiBwZXJzb246QmlsbCBHQVRFUyBPUiBjb21wYW55Ok1JQ1JPU09GVFxuICAgICAqIEBwYXJhbSBleHByc1xuICAgICAqL1xuICAgIGNvbmNhdE9yRXhwcihleHByczogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBpZiAoZXhwcnMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBleHByc1swXSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCgke2V4cHJzLmpvaW4oJykgT1IgKCcpfSlgO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleHByZXNzaW9uIHRoYXQgaXMgdGhlIGludGVyc2VjdGlvbiBvZiBnaXZlbiBleHByZXNzaW9uc1xuICAgICAqIGVnLiBwZXJzb246QmlsbCBHQVRFUyBBTkQgY29tcGFueTpNSUNST1NPRlRcbiAgICAgKiBAcGFyYW0gZXhwcnNcbiAgICAgKi9cbiAgICBjb25jYXRBbmRFeHByKGV4cHJzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgICAgIGlmIChleHBycy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGV4cHJzWzBdIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgKCR7ZXhwcnMuam9pbignKSBBTkQgKCcpfSlgO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBleHByZXNzaW9uIHRvIHNlbGVjdCB0aGUgZ2l2ZW4gaXRlbVxuICAgICAqIEBwYXJhbSBmaWVsZCBOYW1lIG9mIHRoZSBmaWVsZCB0byBzZWxlY3QgKGVnLiBcImNvbXBhbnlcIilcbiAgICAgKiBAcGFyYW0gaXRlbXMgQSBzaW5nbGUgb3IgbGlzdCBvZiBWYWx1ZUl0ZW0gb2JqZWN0KHMpIChlZy4gY29udGVudCBvZiBhIHJlY29yZClcbiAgICAgKi9cbiAgICBtYWtlRmllbGRFeHByKGZpZWxkOiBzdHJpbmcsIGl0ZW1zOiBWYWx1ZUl0ZW0gfCBWYWx1ZUl0ZW1bXSwgY29tYmluZVdpdGhBbmQ/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgaWYoIVV0aWxzLmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtpdGVtc107XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjsgLy8gUmV0dXJuIGEgZmFsc3kgc3RyaW5nIGluc3RlYWQgb2YgXCIoKVwiIG9yIFwiYGBcIiB3aGljaCB3b3VsZCBiZSB0cnV0aHlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZVdpdGhBbmQ/IHRoaXMubWFrZUFuZEV4cHIoZmllbGQsIGl0ZW1zKSA6IHRoaXMubWFrZU9yRXhwcihmaWVsZCwgaXRlbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBleHByZXNzaW9uIGZvciB0aGUgZ2l2ZW4gYWdncmVnYXRpb24gaXRlbVxuICAgICAqIEBwYXJhbSBhZ2dyZWdhdGlvbiBUaGUgYWdncmVnYXRpb24gY29udGFpbmluZyB0aGlzIG9iamVjdFxuICAgICAqIEBwYXJhbSBpdGVtcyBUaGUgQWdncmVnYXRpb25JdGVtKHMpIHRvIHNlbGVjdFxuICAgICAqIEBwYXJhbSBjb21iaW5lV2l0aEFuZCBJZiB0aGVyZSBhcmUgbXVsdGlwbGUgdmFsdWVzLCBjb21iaW5lIHRoZW0gd2l0aCBBTkQgKGluc3RlYWQgb2YgT1IpXG4gICAgICovXG4gICAgbWFrZUFnZ3JlZ2F0aW9uRXhwcihhZ2dyZWdhdGlvbjogQWdncmVnYXRpb24sIGl0ZW1zOiBBZ2dyZWdhdGlvbkl0ZW0gfCBBZ2dyZWdhdGlvbkl0ZW1bXSwgY29tYmluZVdpdGhBbmQ/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgaWYoIVV0aWxzLmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgICAgICBpdGVtcyA9IFtpdGVtc107XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWdncmVnYXRpb24udmFsdWVzQXJlRXhwcmVzc2lvbnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4cHJzID0gaXRlbXMubWFwKGkgPT4gaS52YWx1ZS50b1N0cmluZygpKTsgLy8gLnRvU3RyaW5nKCkgaXMgdG8gYXZvaWQgdHlwaW5nIGlzc3Vlcy4gV2l0aCB2YWx1ZXNBcmVFeHByZXNzaW9ucyA9IHRydWUsIGl0ZW0udmFsdWUgaXMgZXhwZWN0ZWQgdG8gYmUgYSBzdHJpbmdcbiAgICAgICAgICAgIHJldHVybiBjb21iaW5lV2l0aEFuZD8gdGhpcy5jb25jYXRBbmRFeHByKGV4cHJzKSA6IHRoaXMuY29uY2F0T3JFeHByKGV4cHJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IF9pdGVtcyA9IHRoaXMuYXNWYWx1ZUl0ZW1zKGl0ZW1zLCBhZ2dyZWdhdGlvbi5pc1RyZWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFrZUZpZWxkRXhwcihhZ2dyZWdhdGlvbi5jb2x1bW4sIF9pdGVtcywgY29tYmluZVdpdGhBbmQpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDb21iaW5lcyB0aGUgZmllbGQgd2l0aCB0aGUgb3B0aW9uYWwgZGlzcGxheSB2YWx1ZShzKVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSBkaXNwbGF5XG4gICAgICovXG4gICAgcHJpdmF0ZSBmb3JtYXRGaWVsZChmaWVsZDogc3RyaW5nLCBkaXNwbGF5Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYoZGlzcGxheSkge1xuICAgICAgICAgICAgZmllbGQgPSBgJHtmaWVsZH0ke0V4cHJQYXJzZXIuZXNjYXBlKGRpc3BsYXkpfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBBZ2dyZWdhdGlvbkl0ZW0gbGlzdCBhcyBhIFZhbHVlSXRlbSBsaXN0XG4gICAgICogQHBhcmFtIGl0ZW1zXG4gICAgICogQHBhcmFtIGlzVHJlZVxuICAgICAqL1xuICAgIHByaXZhdGUgYXNWYWx1ZUl0ZW1zKGl0ZW1zOiBBZ2dyZWdhdGlvbkl0ZW1bXSwgaXNUcmVlPzogYm9vbGVhbik6IFZhbHVlSXRlbVtdIHtcbiAgICAgICAgaWYoaXNUcmVlKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAoaSBhcyBUcmVlQWdncmVnYXRpb25Ob2RlKS4kcGF0aCArIFwiKlwiLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpLmRpc3BsYXkgfHwgaS52YWx1ZSBhcyBzdHJpbmdcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zOyAvLyBUaGlzIHdvcmtzIGJlY2F1c2UgVmFsdWVJdGVtIGFuZCBBZ2dyZWdhdGlvbkl0ZW0gc2hhcmUgdGhlIHZhbHVlIGFuZCBkaXNwbGF5IHByb3BlcnRpZXNcbiAgICB9XG59XG4iXX0=