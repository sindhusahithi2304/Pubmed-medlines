import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { StartConfig } from "@sinequa/core/web-services";
import { NotificationsService, Notification } from "./notifications.service";
import * as i0 from "@angular/core";
/**
 * An `HttpInterceptor` to process notifications attached to the response body
 * in the `$notifications` member.
 */
export declare class NotificationsInterceptor implements HttpInterceptor {
    private startConfig;
    private notificationsService;
    constructor(startConfig: StartConfig, notificationsService: NotificationsService);
    protected shouldIntercept(url: string): boolean;
    protected processNotifications(notifications: Notification[] | undefined): void;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDef<NotificationsInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDef<NotificationsInterceptor>;
}
//# sourceMappingURL=notifications.interceptor.d.ts.map