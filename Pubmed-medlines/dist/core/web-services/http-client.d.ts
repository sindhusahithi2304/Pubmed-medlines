import { HttpClient, HttpRequest, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import * as i0 from "@angular/core";
/**
 * A helper service that overrides the standard Angular [HttpClient]{@link https://angular.io/api/common/http/HttpClient}
 * to prevent multiple subscribers from causing multiple requests to be issued and to mitigate against request flooding
 */
export declare class SqHttpClient extends HttpClient {
    private responseCache;
    constructor(httpHandler: HttpHandler);
    private getRequestHash;
    /**
     * Overrides the standard `HttpClient.request` method to change its behavior as follows:
     * * pipes the observable to the share operator so that only a single request is issued even if there are multiple subscribers
     * * to mitigate request flooding, a cache of pending response observables keyed by the request thumbprint is maintained.
     * An observable from the cache is returned if the incoming request is identical to one in the cache
     */
    request(first: string | HttpRequest<any>, url?: string, options?: {}): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDef<SqHttpClient, never>;
    static ɵprov: i0.ɵɵInjectableDef<SqHttpClient>;
}
//# sourceMappingURL=http-client.d.ts.map