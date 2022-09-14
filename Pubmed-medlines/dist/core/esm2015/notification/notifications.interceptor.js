import { Injectable, Inject } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { START_CONFIG } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./notifications.service";
/**
 * An `HttpInterceptor` to process notifications attached to the response body
 * in the `$notifications` member.
 */
export class NotificationsInterceptor {
    constructor(startConfig, notificationsService) {
        this.startConfig = startConfig;
        this.notificationsService = notificationsService;
    }
    shouldIntercept(url) {
        return Utils.startsWith(url, this.startConfig.apiPath);
    }
    processNotifications(notifications) {
        if (Utils.isArray(notifications)) {
            for (const notification of notifications) {
                let type = notification.type;
                if (Utils.isUndefined(type)) {
                    type = 1 /* Info */;
                }
                const text = notification.text;
                if (text) {
                    const params = notification.params;
                    const title = notification.title;
                    let autoClose = notification.autoClose;
                    if (Utils.isUndefined(autoClose)) {
                        autoClose = (type === 0 /* Success */) || (type === 1 /* Info */);
                    }
                    this.notificationsService.notify(type, text, params, title, autoClose);
                }
            }
        }
    }
    intercept(request, next) {
        if (!this.shouldIntercept(request.url)) {
            return next.handle(request);
        }
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                if (request.responseType === "json" && Utils.isObject(event.body)) {
                    this.processNotifications(event.body.$notifications);
                }
            }
        }));
    }
}
NotificationsInterceptor.ɵfac = function NotificationsInterceptor_Factory(t) { return new (t || NotificationsInterceptor)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.NotificationsService)); };
NotificationsInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: NotificationsInterceptor, factory: NotificationsInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NotificationsInterceptor, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.NotificationsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL25vdGlmaWNhdGlvbi8iLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUErQixZQUFZLEVBQXlCLE1BQU0sc0JBQXNCLENBQUM7QUFFeEcsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sRUFBQyxZQUFZLEVBQWMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQUd6Qzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ2pDLFlBQ2tDLFdBQXdCLEVBQzlDLG9CQUEwQztRQURwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUM5Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ3RELENBQUM7SUFFUyxlQUFlLENBQUMsR0FBVztRQUNqQyxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVTLG9CQUFvQixDQUFDLGFBQXlDO1FBQ3BFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM5QixLQUFLLE1BQU0sWUFBWSxJQUFJLGFBQWEsRUFBRTtnQkFDdEMsSUFBSyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDOUIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN6QixJQUFJLGVBQXdCLENBQUM7aUJBQ2hDO2dCQUNELE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLElBQUksSUFBSSxFQUFFO29CQUNOLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7b0JBQ25DLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7b0JBQ2pDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7b0JBQ3ZDLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDOUIsU0FBUyxHQUFHLENBQUMsSUFBSSxvQkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxpQkFBMEIsQ0FBQyxDQUFDO3FCQUN2RjtvQkFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDMUU7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxPQUF5QixFQUFFLElBQWlCO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM1QixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDUixJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7Z0JBQy9CLElBQUksT0FBTyxDQUFDLFlBQVksS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQy9ELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUN4RDthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7O2dHQTNDUyx3QkFBd0IsY0FFckIsWUFBWTtnRUFGZix3QkFBd0IsV0FBeEIsd0JBQXdCLG1CQUZyQixNQUFNO2tEQUVULHdCQUF3QjtjQUhwQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQUdRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwUmVzcG9uc2UsIEh0dHBIYW5kbGVyLCBIdHRwRXZlbnR9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHt0YXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtTVEFSVF9DT05GSUcsIFN0YXJ0Q29uZmlnfSBmcm9tIFwiQHNpbmVxdWEvY29yZS93ZWItc2VydmljZXNcIjtcbmltcG9ydCB7VXRpbHN9IGZyb20gXCJAc2luZXF1YS9jb3JlL2Jhc2VcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uc1NlcnZpY2UsIE5vdGlmaWNhdGlvbiwgTm90aWZpY2F0aW9uVHlwZX0gZnJvbSBcIi4vbm90aWZpY2F0aW9ucy5zZXJ2aWNlXCI7XG5cbi8qKlxuICogQW4gYEh0dHBJbnRlcmNlcHRvcmAgdG8gcHJvY2VzcyBub3RpZmljYXRpb25zIGF0dGFjaGVkIHRvIHRoZSByZXNwb25zZSBib2R5XG4gKiBpbiB0aGUgYCRub3RpZmljYXRpb25zYCBtZW1iZXIuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25zSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFNUQVJUX0NPTkZJRykgcHJpdmF0ZSBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uc1NlcnZpY2U6IE5vdGlmaWNhdGlvbnNTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3VsZEludGVyY2VwdCh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gVXRpbHMuc3RhcnRzV2l0aCh1cmwsIHRoaXMuc3RhcnRDb25maWcuYXBpUGF0aCEpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBwcm9jZXNzTm90aWZpY2F0aW9ucyhub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25bXSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoVXRpbHMuaXNBcnJheShub3RpZmljYXRpb25zKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBub3RpZmljYXRpb24gb2Ygbm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCAgdHlwZSA9IG5vdGlmaWNhdGlvbi50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChVdGlscy5pc1VuZGVmaW5lZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gTm90aWZpY2F0aW9uVHlwZS5JbmZvO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gbm90aWZpY2F0aW9uLnRleHQ7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gbm90aWZpY2F0aW9uLnBhcmFtcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBub3RpZmljYXRpb24udGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdXRvQ2xvc2UgPSBub3RpZmljYXRpb24uYXV0b0Nsb3NlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNVbmRlZmluZWQoYXV0b0Nsb3NlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0Nsb3NlID0gKHR5cGUgPT09IE5vdGlmaWNhdGlvblR5cGUuU3VjY2VzcykgfHwgKHR5cGUgPT09IE5vdGlmaWNhdGlvblR5cGUuSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25zU2VydmljZS5ub3RpZnkodHlwZSwgdGV4dCwgcGFyYW1zLCB0aXRsZSwgYXV0b0Nsb3NlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRJbnRlcmNlcHQocmVxdWVzdC51cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgICB0YXAoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5yZXNwb25zZVR5cGUgPT09IFwianNvblwiICYmIFV0aWxzLmlzT2JqZWN0KGV2ZW50LmJvZHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOb3RpZmljYXRpb25zKGV2ZW50LmJvZHkuJG5vdGlmaWNhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgfVxufVxuIl19