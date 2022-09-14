import { Injectable } from '@angular/core';
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
/**
 * A service to manage navigator downloads
 */
export class DownloadWebService {
    /**
     * Subscribes to the given observable to trigger a download action on the navigator
     * when the observed object is ready.
     *
     * @param observable The observable to subscribe.
     * @returns The observable for chaining.
     */
    download(observable) {
        Utils.subscribe(observable, (response) => {
            const header = response.headers.get('content-disposition');
            const fileName = header ? header.split('filename=')[1].replace('"', '').replace('"', '') : "";
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                // For IE
                window.navigator.msSaveOrOpenBlob(response.body, fileName);
            }
            else {
                const link = document.createElement('a');
                document.body.appendChild(link);
                const blobUrl = window.URL.createObjectURL(response.body);
                link.href = blobUrl;
                link.download = fileName;
                link.click();
                link.remove();
                window.URL.revokeObjectURL(blobUrl);
            }
            return response;
        });
        return observable;
    }
}
DownloadWebService.ɵfac = function DownloadWebService_Factory(t) { return new (t || DownloadWebService)(); };
DownloadWebService.ɵprov = i0.ɵɵdefineInjectable({ token: DownloadWebService, factory: DownloadWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DownloadWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQud2ViLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS93ZWItc2VydmljZXMvIiwic291cmNlcyI6WyJkb3dubG9hZC53ZWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFM0M7O0dBRUc7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBRTNCOzs7Ozs7T0FNRztJQUNJLFFBQVEsQ0FBQyxVQUEwQztRQUN0RCxLQUFLLENBQUMsU0FBUyxDQUNYLFVBQVUsRUFDVixDQUFDLFFBQTRCLEVBQUUsRUFBRTtZQUM3QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzNELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUU5RixJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkQsU0FBUztnQkFDVCxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZDO1lBRUQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQyxDQUNKLENBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOztvRkFsQ1Esa0JBQWtCOzBEQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCLG1CQUZmLE1BQU07a0RBRVQsa0JBQWtCO2NBSDlCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIkBzaW5lcXVhL2NvcmUvYmFzZVwiO1xuXG4vKipcbiAqIEEgc2VydmljZSB0byBtYW5hZ2UgbmF2aWdhdG9yIGRvd25sb2Fkc1xuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogXCJyb290XCJcbn0pXG5leHBvcnQgY2xhc3MgRG93bmxvYWRXZWJTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdG8gdGhlIGdpdmVuIG9ic2VydmFibGUgdG8gdHJpZ2dlciBhIGRvd25sb2FkIGFjdGlvbiBvbiB0aGUgbmF2aWdhdG9yXG4gICAgICogd2hlbiB0aGUgb2JzZXJ2ZWQgb2JqZWN0IGlzIHJlYWR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9ic2VydmFibGUgVGhlIG9ic2VydmFibGUgdG8gc3Vic2NyaWJlLlxuICAgICAqIEByZXR1cm5zIFRoZSBvYnNlcnZhYmxlIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZG93bmxvYWQob2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8QmxvYj4+KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8QmxvYj4+IHtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKFxuICAgICAgICAgICAgb2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZTogSHR0cFJlc3BvbnNlPEJsb2I+KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtZGlzcG9zaXRpb24nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGhlYWRlciA/IGhlYWRlci5zcGxpdCgnZmlsZW5hbWU9JylbMV0ucmVwbGFjZSgnXCInLCAnJykucmVwbGFjZSgnXCInLCAnJykgOiBcIlwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IgJiYgd2luZG93Lm5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEZvciBJRVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IocmVzcG9uc2UuYm9keSwgZmlsZU5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2JVcmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChyZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgbGluay5ocmVmID0gYmxvYlVybDtcbiAgICAgICAgICAgICAgICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIGxpbmsucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVcmwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxufVxuIl19