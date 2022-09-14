import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class JwtInterceptor implements HttpInterceptor {
    private shared;
    private config;
    constructor(shared: SharedService, config: ConfigService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<JwtInterceptor, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<JwtInterceptor>;
}

//# sourceMappingURL=interceptor.service.d.ts.map