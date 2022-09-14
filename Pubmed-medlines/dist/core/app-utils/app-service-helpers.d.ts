import { CCColumn } from "@sinequa/core/web-services";
/**
 * @ignore
 *
 * Used internally to avoid circular references between ExprParser, AppService and FormatService.
 * Do not export from the app-utils module.
 */
export declare class AppServiceHelpers {
    static isString(column: CCColumn | undefined): boolean;
    static isCsv(column: CCColumn | undefined): boolean;
    static isTree(column: CCColumn | undefined): boolean;
    static isEntity(column: CCColumn | undefined): boolean;
    static isBoolean(column: CCColumn | undefined): boolean;
    static isDate(column: CCColumn | undefined): boolean;
    static isDouble(column: CCColumn | undefined): boolean;
    static isInteger(column: CCColumn | undefined): boolean;
    static isNumber(column: CCColumn | undefined): boolean;
    static isScalar(column: CCColumn | undefined): boolean;
    static isSortable(column: CCColumn | undefined): boolean;
}
//# sourceMappingURL=app-service-helpers.d.ts.map