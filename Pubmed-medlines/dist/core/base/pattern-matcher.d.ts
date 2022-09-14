/**
 * Defines the different pattern types
 * `Empty`: no pattern
 * `RegExp`: a regular expression pattern
 * `Value`: a literal value
 */
export declare enum PatternType {
    Empty = 0,
    RegExp = 1,
    Value = 3
}
/**
 * A class that represents a single pattern. The pattern type is deduced automatically from the input pattern text.
 *
 * `<empty string>` => `Empty`
 * `<pattern with wildcards ?*>` => `RegExp` (wildcards are converted to regular expressions)
 * `<pattern starting with ~>` => `RegExp` (the text following the ~ character is treated as a regular expression)
 * `<any other value>` => `Value` (a literal value that is matched as-is)
 */
export declare class Pattern {
    private _type;
    get type(): PatternType;
    private reg?;
    private preparedPattern1?;
    private _text?;
    get text(): string | undefined;
    static getPatternType(pattern: string): PatternType;
    static isPattern(pattern: string): boolean;
    static doMatch(pattern: string, text: string): boolean;
    static wildcardToRegex(pattern: string): string;
    constructor(pattern?: string);
    private static cleanPattern;
    clear(): void;
    isEmpty(): boolean;
    load(pattern: string): boolean;
    getTypeValueText(): string | undefined;
    getTypeRegexPattern(): string | undefined;
    isTypeValue(): boolean;
    isMatch(text: string): boolean;
}
export declare class Patterns {
    private _text?;
    private _preparedPatterns?;
    private _values?;
    private _isEmpty;
    constructor(text?: string);
    clear(): void;
    get text(): string | undefined;
    set text(value: string | undefined);
    getTypeCount(type: PatternType): number;
    private innerSetList;
    get list(): string[];
    set list(value: string[]);
    setText(list: string[]): void;
    isEmpty(): boolean;
    hasPatterns(): boolean;
    isMatch(name: string, logdisplay?: string): boolean;
}
/**
 * This class is used to process "included" and "excluded" patterns typically specified in the Sinequa configuration.
 */
export declare class PatternMatcher {
    includedPattern: Patterns;
    excludedPattern: Patterns;
    get included(): string | undefined;
    set included(value: string | undefined);
    get excluded(): string | undefined;
    set excluded(value: string | undefined);
    set includedList(value: string[]);
    set excludedList(value: string[]);
    includedLogDisplay?: string;
    excludedLogDisplay?: string;
    constructor(includedLogDisplay?: string, excludedLogDisplay?: string);
    hasPatterns(): boolean;
    isExcluded(name: string): boolean;
    isIncluded(name: string): boolean;
    isExplicitlyIncluded(name: string): boolean;
    isExplicitlyExcluded(name: string): boolean;
}
//# sourceMappingURL=pattern-matcher.d.ts.map