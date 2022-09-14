/**
 * A union type of the possible JSON types
 */
export declare type JsonValue = boolean | number | string | null | undefined | JsonArray | JsonObject;
/**
 * Describes a JSON object
 */
export interface JsonObject {
    [key: string]: JsonValue;
}
/**
 * Describes a JSON array
 */
export interface JsonArray extends Array<JsonValue> {
}
//# sourceMappingURL=json.d.ts.map