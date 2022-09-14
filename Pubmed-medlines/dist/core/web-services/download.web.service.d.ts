import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * A service to manage navigator downloads
 */
export declare class DownloadWebService {
    /**
     * Subscribes to the given observable to trigger a download action on the navigator
     * when the observed object is ready.
     *
     * @param observable The observable to subscribe.
     * @returns The observable for chaining.
     */
    download(observable: Observable<HttpResponse<Blob>>): Observable<HttpResponse<Blob>>;
    static ɵfac: i0.ɵɵFactoryDef<DownloadWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DownloadWebService>;
}
//# sourceMappingURL=download.web.service.d.ts.map