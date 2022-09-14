import { Utils } from "@sinequa/core/base";
/**
 * A base helper class for web services. It holds the {@link StartConfig} for the app
 */
export class HttpService {
    /**
     * Constructor
     *
     * @param startConfig The start configuration
     */
    constructor(startConfig) {
        this.startConfig = startConfig;
    }
    /**
     * The name of the application
     */
    get appName() {
        return this.startConfig.app;
    }
    /**
     * Makes an API url by appending the api name to the api path
     * held on the {@link StartConfig}
     *
     * @param api An API name
     */
    makeUrl(api) {
        return Utils.addUrl(this.startConfig.apiPath, api);
    }
    /**
     * Makes an Angular {@link HttpParams} object from a basic Javascript object
     *
     * @param params A map of parameter values
     */
    makeParams(params) {
        return Utils.makeHttpParams(params);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsiaHR0cC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxLQUFLLEVBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUdoRDs7R0FFRztBQUNILE1BQU0sT0FBZ0IsV0FBVztJQUM3Qjs7OztPQUlHO0lBQ0gsWUFDYyxXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILE9BQU8sQ0FBQyxHQUFXO1FBQ2YsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLE1BQW9FO1FBQzNFLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBQYXJhbXN9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtVdGlscywgTWFwT2Z9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7U3RhcnRDb25maWd9IGZyb20gXCIuL3N0YXJ0LWNvbmZpZy53ZWIuc2VydmljZVwiO1xuXG4vKipcbiAqIEEgYmFzZSBoZWxwZXIgY2xhc3MgZm9yIHdlYiBzZXJ2aWNlcy4gSXQgaG9sZHMgdGhlIHtAbGluayBTdGFydENvbmZpZ30gZm9yIHRoZSBhcHBcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEh0dHBTZXJ2aWNlIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHN0YXJ0Q29uZmlnIFRoZSBzdGFydCBjb25maWd1cmF0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzdGFydENvbmZpZzogU3RhcnRDb25maWcpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgYXBwbGljYXRpb25cbiAgICAgKi9cbiAgICBnZXQgYXBwTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydENvbmZpZy5hcHAhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGFuIEFQSSB1cmwgYnkgYXBwZW5kaW5nIHRoZSBhcGkgbmFtZSB0byB0aGUgYXBpIHBhdGhcbiAgICAgKiBoZWxkIG9uIHRoZSB7QGxpbmsgU3RhcnRDb25maWd9XG4gICAgICpcbiAgICAgKiBAcGFyYW0gYXBpIEFuIEFQSSBuYW1lXG4gICAgICovXG4gICAgbWFrZVVybChhcGk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBVdGlscy5hZGRVcmwodGhpcy5zdGFydENvbmZpZy5hcGlQYXRoISwgYXBpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhbiBBbmd1bGFyIHtAbGluayBIdHRwUGFyYW1zfSBvYmplY3QgZnJvbSBhIGJhc2ljIEphdmFzY3JpcHQgb2JqZWN0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyYW1zIEEgbWFwIG9mIHBhcmFtZXRlciB2YWx1ZXNcbiAgICAgKi9cbiAgICBtYWtlUGFyYW1zKHBhcmFtczogTWFwT2Y8c3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB8IERhdGUgfCBvYmplY3QgfCB1bmRlZmluZWQ+KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIHJldHVybiBVdGlscy5tYWtlSHR0cFBhcmFtcyhwYXJhbXMpO1xuICAgIH1cbn0iXX0=