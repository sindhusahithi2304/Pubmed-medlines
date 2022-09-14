/**
 * Describes the error codes that can be set in the {@link SqError} class.
 */
export declare enum SqErrorCode {
    loginCancelled = 0,
    processedCredentialsError = 1,
    principalSwitched = 2,
    autoLoginError = 3
}
/**
 * A subclass of the built-in {@link Error} class with added `code` and
 * `data` (optional) properties.
 */
export declare class SqError extends Error {
    /**
     * The error code associated with the error.
     */
    code: SqErrorCode;
    /**
     * Arbitrary data associated with the error.
     */
    data: any;
    constructor(code: SqErrorCode, message?: string, data?: any);
    /**
     * Return `true` if the passed `error` is a valid `SqErrorCode` instance.
     * If the optional `code` parameter is defined then only return true
     * if the code on `error` matches this value.
     */
    static is(error: any, code?: SqErrorCode): error is SqError;
    /**
     * Return the message corresponding to the passed error `code`.
     */
    static message(code: SqErrorCode): "msg#error.loginCancelled" | "msg#error.processedCredentialsError" | "msg#error.principalSwitched" | "msg#error.autoLoginError" | "msg#error.unknownError";
}
//# sourceMappingURL=error.d.ts.map