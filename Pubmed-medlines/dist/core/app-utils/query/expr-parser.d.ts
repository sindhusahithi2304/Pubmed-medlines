import { FieldValue } from "@sinequa/core/base";
import { AppService } from "../app.service";
import { CCColumn } from "@sinequa/core/web-services";
import { IntlService } from "@sinequa/core/intl";
import { FormatService } from "../format.service";
/**
 * Describes a context for processing expressions
 */
export interface ExprContext {
    appService: AppService;
    formatService: FormatService;
    intlService: IntlService;
    disallowFulltext?: boolean;
}
/**
 * The operators accepted in fielded search expressions
 */
export declare const enum ExprOperator {
    none = 0,
    eq = 1,
    gt = 2,
    gte = 3,
    lt = 4,
    lte = 5,
    neq = 6,
    regex = 7,
    like = 8,
    contains = 9,
    in = 10,
    between = 11
}
/**
 * The range operators accepted in fielded search expressions
 */
export declare const enum ExprRange {
    none = 0,
    gteLte = 1,
    gteLt = 2,
    gtLte = 3,
    gtLt = 4
}
/**
 * An object containing the data necessary to format an `Expr` using
 * [IntlService.formatMessage]{@link IntlService#formatMessage}
 */
export interface ExprMessage {
    /**
     * The `IntlService` compatible message string
     */
    message: string;
    /**
     * Any values referenced by `message`
     */
    values?: {
        [key: string]: FieldValue;
    };
}
/**
 * Options to be used with `Expr.toMessage`
 */
export interface ExprMessageOptions {
    /**
     * If `true`, field names are included in the message
     */
    withFields?: boolean;
    /**
     * If `true`, use any display value set in the expression
     */
    useDisplay?: boolean;
    /**
     * Include HTML formatting in the message
     */
    asHTML?: boolean;
    /**
     * If `true`, don't include any outer `NOT` operator in the message
     */
    hideOuterNot?: boolean;
}
/**
 * Describes a location in a fielded search expression
 */
export interface ExprLocation {
    start: number;
    length: number;
}
/**
 * Describes a location and value in a fielded search expression
 */
export interface ExprValueLocation extends ExprLocation {
    value: string;
}
/**
 * Describes a location, value and field in a fielded search expression
 */
export interface ExprValueInfo extends ExprValueLocation {
    field: string;
}
/**
 * Describes the data used in [Expr.evaluate]{@link Expr#evaluate}
 */
export interface ExprEvaluationContext {
    [key: string]: any;
}
/**
 * Describes an initialization object used in the construction of an {@link Expr} from a value
 */
export interface ExprValueInitializer {
    /**
     * The expression context
     */
    exprContext: ExprContext;
    /**
     * A single value
     */
    value?: string;
    /**
     * An array of values
     */
    values?: string[];
    /**
     * Locations of the values used in range expressions
     */
    locations?: ExprLocation[];
    /**
     * The operator used in the expression
     */
    operator?: ExprOperator;
    /**
     * The field name
     */
    field?: string;
    /**
     * The display value
     */
    display?: string;
}
/**
 * Describes an initialization object used in the construction of a boolean {@link Expr} with a pair of operands
 */
export interface ExprOperandsInitializer {
    /**
     * The expression context
     */
    exprContext: ExprContext;
    /**
     * The first operand
     */
    op1: Expr;
    /**
     * If `true` this `Expr` represents an `AND` expression, otherwise it represents an `OR` expression
     */
    and: boolean;
    /**
     * The second operand
     */
    op2: Expr;
    /**
     * The field name
     */
    field?: string;
    /**
     * The display value
     */
    display?: string;
}
/**
 * Represents a parsed fielded search expression. A tree of expression nodes is built when an expression
 * combines sub-expressions using boolean operators
 */
export declare class Expr {
    private _field;
    /**
     * Return the field name of this expression. Return the first ancestor's non-empty field
     * if the field on this node is empty
     */
    get field(): string | undefined;
    /**
     * Set the field name of this expression
     */
    set field(value: string | undefined);
    private _display;
    private _displayObj;
    /**
     * Return the display value of this expression. Return the first ancestor's non-empty display value
     * if the display value on this node is empty
     */
    get display(): string | undefined;
    /**
     * Set the display value of this expression. If the display value is a valid stringified JSON object
     * then set `displayObj` to the parsed object
     */
    set display(value: string | undefined);
    /**
     * Return the display object of this expression. Return the first ancestor's non-empty display object
     * if the display object on this node is empty
     */
    get displayObj(): {
        label?: string;
        display?: string;
    } | undefined;
    /**
     * The values of this expression
     */
    values: string[] | undefined;
    /**
     * The locations of the values of this expression
     */
    locations: ExprLocation[] | undefined;
    /**
     * Return the value of this expression. Note that range expressions may have multiple values
     */
    get value(): string | undefined;
    /**
     * Set the value of this expression
     */
    set value(value: string | undefined);
    /**
     * The operator of this expression
     */
    operator: ExprOperator;
    /**
     * If `true` then this expression included the `NOT` boolean operator
     */
    not: boolean;
    /**
     * If `true` then the operands of this expression are combined with the `AND` operator.
     * Otherwise the operands are combined with the `OR` operator
     */
    and: boolean;
    /**
     * The operands of this expression, if any
     */
    operands: Expr[];
    /**
     * The parent expression, if any
     */
    parent: Expr;
    /**
     * The expression context
     */
    exprContext: ExprContext;
    /**
     * The distance specified in a `NEAR` expression
     */
    near: number;
    /**
     * The position of this expression's value in the original text
     */
    start: number;
    /**
     * The length of this expression's value in the original text
     */
    length: number;
    private mergedStructured;
    private _evaluationRegExps;
    private get evaluationRegExps();
    constructor(init: ExprValueInitializer | ExprOperandsInitializer);
    /**
     * Add an operand to this expression
     *
     * @param operand The operand to add
     * @param contextField The parser's field context, if any
     * @param prepend If `true` the operand is prepended to the operands
     */
    addOperand(operand: Expr, contextField?: string, prepend?: boolean): void;
    /**
     * Return `true` if this expression is a leaf node (does have a value)
     */
    get isLeaf(): boolean;
    /**
     * Make an expression object
     *
     * @param exprContext The expression context
     * @param text The value of the expression
     * @param field The parser's field context
     * @param display The display value
     * @param allowEmptyValue Determines how empty values will be processed when making the expression
     */
    static makeExpr(exprContext: ExprContext, text: string, field: string, display: string, allowEmptyValue: boolean): Expr | undefined;
    private static resolveField;
    private static getColumn;
    /**
     * Return the {@link CCColumn} corresponding to this expression
     */
    get column(): CCColumn | undefined;
    private static getIsStructuredField;
    /**
     * Return `true` if the expression has a non-fulltext field. In this case the expression will be a leaf node
     */
    get isStructuredField(): boolean;
    /**
     * Return `true` if the expression only contains non-fulltext fields
     */
    get isStructured(): boolean;
    /**
     * Return `true` if the expression and its ancestors do not have `not` set to `true`
     */
    get isPositive(): boolean;
    /**
     * Return an `ExprValueLocation` object for the passed text. Leading and trailing
     * whitespace is excluded
     */
    static getValueAndLocation(text: string): ExprValueLocation;
    private static parseValue;
    private static getOperatorText;
    /**
     * Find the first `ExprValueInfo` object from a starting position in this expression
     *
     * @param start The position at which to start the search
     */
    findValue(start: number): ExprValueInfo | undefined;
    /**
     * Combine two expressions into a single expression. The second expression will be added to
     * the first expression and the first expression returned if the first expression is non-leaf
     * and is an `AND` expression and not negated. Otherwise, a new `AND` expression will be created
     * to which both expressions are added as operands.
     */
    static combine(expr1: Expr, expr2: Expr): Expr;
    private normalizeField;
    private shouldDisplayField;
    private getOperatorString;
    private escapeValue;
    private getValueString;
    private addFieldToString;
    private _toString;
    /**
     * Return a string representation of this expression
     *
     * @param withFields If `true`, include field names
     */
    toString(withFields?: boolean): string;
    private addDisplay;
    private encodeHTML;
    private _addValue;
    private addValue;
    private addText;
    private addFieldLabel;
    private addField;
    private addOperator;
    private _toMessage;
    /**
     * Return an `ExprMessage` for the expression which can be used with [IntlService.formatMessage]{@link IntlService#formatMessage}
     * for display purposes
     */
    toMessage(options?: ExprMessageOptions): ExprMessage;
    private static matchNode;
    /**
     * Return `true` if this expression matches the passed one
     */
    matchNode(expr: Expr): boolean;
    /**
     * Returns the matching expression or sub-expression in this expression with the passed one.
     *
     * @param expr The expression to match
     * @param filter An option filter function called on first level candidate sub-expressions
     * before matching within them
     */
    find(expr: Expr, filter?: (expr: Expr) => boolean): Expr | null;
    /**
     * Perform the passed `action` on this expression and any descendant operands
     *
     * @param action The action to perform
     */
    forEach(action: (expr: Expr) => void): void;
    /**
     * Execute the callback function on this node and any descendants until the callback returns a truthy value
     * in which case immediately return `true`. Otherwise return `false`.
     */
    some(callback: (expr: Expr) => boolean): boolean;
    /**
     * Execute the callback function on this node and any descendants until the callback returns a falsy value
     * in which case, immediately return `false`. Otherwise return `true`.
     */
    every(callback: (expr: Expr) => boolean): boolean;
    /**
     * Return `true` if the exoression has at least one fulltext operand.
     * The test on `isPositive` filters expressions that only contain
     * negative fulltext terms which will be ignored on the server. Fulltext
     * expressions must have at least one positive term.
     */
    get hasRelevance(): boolean;
    /**
     * Return an array of all fields used in this expression
     */
    getFields(): string[];
    /**
     * Return an array of all values used in this expression that pertain to the passed field and where the associated `isPositive`
     * field matches the passed `positive` parameter
     *
     * @param field The field for which values are to be returned
     * @param positive The value to test against `isPositive`
     */
    getValues(field: string, positive?: boolean): string[];
    private getDataValue;
    private getWildcardRegExp;
    private compare;
    /**
     * Evaluate this expression using `data` to provide field values. Field values
     * can contain scopes (full stop separated components) to reference sub-objects
     * in the data
     *
     * @param data The field values to be used in the evaluation
     * @param defaultScope If a field value cannot be resolved then try to retrieve a value with this scope prepended to the field name
     * @return The boolean result of the expression evaluation
     */
    evaluate(data: ExprEvaluationContext, defaultScope?: string): boolean;
}
/**
 * @ignore
 */
export declare const enum Token {
    invalid = -1,
    or = 0,
    and = 1,
    not = 2,
    near = 3,
    infixNear = 4,
    lPar = 5,
    rPar = 6,
    eof = 7,
    value = 8
}
/**
 * Parsing options
 */
export interface ExprParserOptions {
    /**
     * If `true` then a fielded search expression with no value will not generate an error. This would be used
     * when providing feedback during text entry
     */
    allowEmptyValues?: boolean;
    /**
     * If `true`, fields can contain the scoping character (`.`). This is typically used with `Expr.evaluate`
     */
    allowScopedFields?: boolean;
    /**
     * If `true` then arbitrary field names are permitted. This is typically used with `Expr.evaluate`
     */
    disallowFulltext?: boolean;
}
/**
 * @ignore
 */
export declare class ExprParserOperator {
    static invalid: ExprParserOperator;
    static or: ExprParserOperator;
    static and: ExprParserOperator;
    static not: ExprParserOperator;
    static lPar: ExprParserOperator;
    static rPar: ExprParserOperator;
    static eof: ExprParserOperator;
    tok: Token;
    tokValue: string;
    tokValuePos: number;
    tokValueLen: number;
    constructor(tok: Token, value?: string, valuePos?: number, valueLen?: number);
}
/**
 * A parser for Sinequa fielded search expressions. Such expressions allow filters to be specified in fulltext and
 * can be combined with boolean operators to build complex queries.
 *
 * A single fielded search clause has this form:
 * ``<fieldname>[`display value`]:[:][<operator>]<value>``
 *
 * A field name is either a column name or alias or a partname. In the case of a partname and column name clashing then
 * the field is treated as a column. Two colons can be specified as the separator to denote that the field is a partname.
 * An optional display value can follow the fieldname enclosed in backquote characters
 *
 * Operators are: `=` (default), `>=`, `>`, `<=`, `<`, `~` (regexp)
 * In addition, a regular expression can be specified by enclosing the value in `/` characters
 *
 * An inclusive range of values can be specified using a square bracket syntax: `[value1..value2]`
 * An exclusive range of values can be specified using a curly bracket syntax: `{value1..value2}`
 * The brackets can be mixed. For example: `age:{5..13]` expresses `13 >= age > 5`.
 *
 * For multi-value csv fields an `IN` condition can be expressed using a comma-separated list of values enclosed in square brackets.
 * For example: `authors:[Proust, Orwell, Dickens]`
 *
 * If a value contains reserved characters then it can be enclosed in backquote characters to prevent the parser interpreting them
 * incorrectly. For example: ``code: `a:b:c` ``
 *
 * The parser also supports a NEAR operator to allow searching for terms close to each other. There are two forms suppported:
 * * infix - `term1 NEAR[/n] term2` where `n` is the maximum number of words between the two terms for them to match
 * * function - `NEAR[/n](term1, term2, term3, ...)` where `n` is "window" size within which all the terms must be present for them
 * to match. The minimum useful value for n is thus equal to the number of terms passed to the operator.
 *
 * Fielded search expresions can be combined with the boolean operators `AND`, `OR` and `NOT` and brackets used for grouping.
 * For example: `football (age:>=7 AND (name:smith OR name:jones))`
 */
export declare class ExprParser {
    static fieldPartnamePrefix: string;
    private static parsetbl;
    private exprContext;
    private options;
    private expressions;
    private operators;
    private fields;
    private displays;
    private op;
    private prevOp;
    private saveOp;
    private field;
    private display;
    private text;
    private current;
    private length;
    private constructor();
    /**
     * Escape a string so that the characters in it are not processed by the fielded search expression parser.
     * Single occurrences of the backslash character are replaced by two backslashes and backquote characters
     * are prefixed by a backslash. Finally, the string is enclosed in backquotes.
     *
     * For example: `` a\`\b `` => `` a\\\`\\b ``
     */
    static escape(value: string | undefined): string;
    private static isEscaped;
    /**
     * Perform the reverse operation to [ExprParser.escpae]{@link ExprParser#escape}
     */
    static unescape(value: string): string;
    /**
     * @ignore
     */
    static unescapeList(values: string[]): string[];
    /**
     * @ignore
     */
    static valuesAndLocationsFromText(text: string, separator: string): ExprValueLocation[];
    private matchKeyword;
    private matchUntil;
    private static matchUntil;
    private matchSimpleValue;
    private getTerminators;
    private canBeTokValue;
    private _getTokValue;
    private getTokValue;
    private ensureNearValue;
    private findDisplay;
    private isValidFieldName;
    private isAllowedField;
    private readToken;
    private clear;
    /**
     * Parse some text using the Sinequa fielded search syntax
     *
     * @return The parsed `Expr` or an error string
     */
    static parse(text: string, context: ExprContext, options?: ExprParserOptions): Expr | string;
    private parseResult;
    private get contextField();
    private get contextDisplay();
    private parse;
    private shift;
    private peekField;
    private peekDisplay;
    private canBeMergeTarget;
    private mergeExpr;
    private reduce;
}
//# sourceMappingURL=expr-parser.d.ts.map