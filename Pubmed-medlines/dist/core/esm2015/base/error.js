import { Utils } from "./utils";
/**
 * Describes the error codes that can be set in the {@link SqError} class.
 */
export var SqErrorCode;
(function (SqErrorCode) {
    SqErrorCode[SqErrorCode["loginCancelled"] = 0] = "loginCancelled";
    SqErrorCode[SqErrorCode["processedCredentialsError"] = 1] = "processedCredentialsError";
    SqErrorCode[SqErrorCode["principalSwitched"] = 2] = "principalSwitched";
    SqErrorCode[SqErrorCode["autoLoginError"] = 3] = "autoLoginError";
})(SqErrorCode || (SqErrorCode = {}));
/**
 * A subclass of the built-in {@link Error} class with added `code` and
 * `data` (optional) properties.
 */
export class SqError extends Error {
    constructor(code, message, data) {
        super(message || SqError.message(code));
        this.code = code;
        this.name = "SqError";
        this.message = message || SqError.message(code);
        if (data) {
            this.data = data;
        }
    }
    /**
     * Return `true` if the passed `error` is a valid `SqErrorCode` instance.
     * If the optional `code` parameter is defined then only return true
     * if the code on `error` matches this value.
     */
    static is(error, code) {
        if (error instanceof SqError || (error instanceof Error && error.name === "SqError")) {
            return Utils.isUndefined(code) || error.code === code;
        }
        return false;
    }
    /**
     * Return the message corresponding to the passed error `code`.
     */
    static message(code) {
        switch (code) {
            case SqErrorCode.loginCancelled: return "msg#error.loginCancelled";
            case SqErrorCode.processedCredentialsError: return "msg#error.processedCredentialsError";
            case SqErrorCode.principalSwitched: return "msg#error.principalSwitched";
            case SqErrorCode.autoLoginError: return "msg#error.autoLoginError";
            default: return "msg#error.unknownError";
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9iYXNlLyIsInNvdXJjZXMiOlsiZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUU5Qjs7R0FFRztBQUNILE1BQU0sQ0FBTixJQUFZLFdBS1g7QUFMRCxXQUFZLFdBQVc7SUFDbkIsaUVBQWMsQ0FBQTtJQUNkLHVGQUF5QixDQUFBO0lBQ3pCLHVFQUFpQixDQUFBO0lBQ2pCLGlFQUFjLENBQUE7QUFDbEIsQ0FBQyxFQUxXLFdBQVcsS0FBWCxXQUFXLFFBS3RCO0FBRUQ7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLE9BQVEsU0FBUSxLQUFLO0lBWTlCLFlBQVksSUFBaUIsRUFBRSxPQUFnQixFQUFFLElBQVU7UUFDdkQsS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQVUsRUFBRSxJQUFrQjtRQUNwQyxJQUFJLEtBQUssWUFBWSxPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQUU7WUFDbEYsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFLLEtBQWlCLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztTQUN0RTtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBaUI7UUFDNUIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLDBCQUEwQixDQUFDO1lBQ25FLEtBQUssV0FBVyxDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxxQ0FBcUMsQ0FBQztZQUN6RixLQUFLLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sNkJBQTZCLENBQUM7WUFDekUsS0FBSyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTywwQkFBMEIsQ0FBQztZQUNuRSxPQUFPLENBQUMsQ0FBQyxPQUFPLHdCQUF3QixDQUFDO1NBQzVDO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtVdGlsc30gZnJvbSBcIi4vdXRpbHNcIjtcblxuLyoqXG4gKiBEZXNjcmliZXMgdGhlIGVycm9yIGNvZGVzIHRoYXQgY2FuIGJlIHNldCBpbiB0aGUge0BsaW5rIFNxRXJyb3J9IGNsYXNzLlxuICovXG5leHBvcnQgZW51bSBTcUVycm9yQ29kZSB7XG4gICAgbG9naW5DYW5jZWxsZWQsXG4gICAgcHJvY2Vzc2VkQ3JlZGVudGlhbHNFcnJvcixcbiAgICBwcmluY2lwYWxTd2l0Y2hlZCxcbiAgICBhdXRvTG9naW5FcnJvclxufVxuXG4vKipcbiAqIEEgc3ViY2xhc3Mgb2YgdGhlIGJ1aWx0LWluIHtAbGluayBFcnJvcn0gY2xhc3Mgd2l0aCBhZGRlZCBgY29kZWAgYW5kXG4gKiBgZGF0YWAgKG9wdGlvbmFsKSBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgY2xhc3MgU3FFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy83NjM5XG4gICAgLy8gYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTE2OCNpc3N1ZWNvbW1lbnQtMTA3ODMzOTg4XG4gICAgLyoqXG4gICAgICogVGhlIGVycm9yIGNvZGUgYXNzb2NpYXRlZCB3aXRoIHRoZSBlcnJvci5cbiAgICAgKi9cbiAgICBjb2RlOiBTcUVycm9yQ29kZTtcbiAgICAvKipcbiAgICAgKiBBcmJpdHJhcnkgZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhlIGVycm9yLlxuICAgICAqL1xuICAgIGRhdGE6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKGNvZGU6IFNxRXJyb3JDb2RlLCBtZXNzYWdlPzogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgU3FFcnJvci5tZXNzYWdlKGNvZGUpKTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJTcUVycm9yXCI7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgU3FFcnJvci5tZXNzYWdlKGNvZGUpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBgdHJ1ZWAgaWYgdGhlIHBhc3NlZCBgZXJyb3JgIGlzIGEgdmFsaWQgYFNxRXJyb3JDb2RlYCBpbnN0YW5jZS5cbiAgICAgKiBJZiB0aGUgb3B0aW9uYWwgYGNvZGVgIHBhcmFtZXRlciBpcyBkZWZpbmVkIHRoZW4gb25seSByZXR1cm4gdHJ1ZVxuICAgICAqIGlmIHRoZSBjb2RlIG9uIGBlcnJvcmAgbWF0Y2hlcyB0aGlzIHZhbHVlLlxuICAgICAqL1xuICAgIHN0YXRpYyBpcyhlcnJvcjogYW55LCBjb2RlPzogU3FFcnJvckNvZGUpOiBlcnJvciBpcyBTcUVycm9yIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgU3FFcnJvciB8fCAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5uYW1lID09PSBcIlNxRXJyb3JcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5pc1VuZGVmaW5lZChjb2RlKSB8fCAoZXJyb3IgYXMgU3FFcnJvcikuY29kZSA9PT0gY29kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBtZXNzYWdlIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHBhc3NlZCBlcnJvciBgY29kZWAuXG4gICAgICovXG4gICAgc3RhdGljIG1lc3NhZ2UoY29kZTogU3FFcnJvckNvZGUpIHtcbiAgICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFNxRXJyb3JDb2RlLmxvZ2luQ2FuY2VsbGVkOiByZXR1cm4gXCJtc2cjZXJyb3IubG9naW5DYW5jZWxsZWRcIjtcbiAgICAgICAgICAgIGNhc2UgU3FFcnJvckNvZGUucHJvY2Vzc2VkQ3JlZGVudGlhbHNFcnJvcjogcmV0dXJuIFwibXNnI2Vycm9yLnByb2Nlc3NlZENyZWRlbnRpYWxzRXJyb3JcIjtcbiAgICAgICAgICAgIGNhc2UgU3FFcnJvckNvZGUucHJpbmNpcGFsU3dpdGNoZWQ6IHJldHVybiBcIm1zZyNlcnJvci5wcmluY2lwYWxTd2l0Y2hlZFwiO1xuICAgICAgICAgICAgY2FzZSBTcUVycm9yQ29kZS5hdXRvTG9naW5FcnJvcjogcmV0dXJuIFwibXNnI2Vycm9yLmF1dG9Mb2dpbkVycm9yXCI7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCJtc2cjZXJyb3IudW5rbm93bkVycm9yXCI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=