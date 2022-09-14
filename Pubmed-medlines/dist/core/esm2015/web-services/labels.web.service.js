import { Injectable, Inject } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpService } from "./http.service";
import { START_CONFIG } from "./start-config.web.service";
import { Utils } from "@sinequa/core/base";
import * as i0 from "@angular/core";
import * as i1 from "./http-client";
import * as i2 from "@sinequa/core/intl";
/**
 * A service for calling the labels web service
 */
export class LabelsWebService extends HttpService {
    constructor(startConfig, httpClient, intlService) {
        super(startConfig);
        this.httpClient = httpClient;
        this.intlService = intlService;
    }
    /**
     * Calls the list action of the labels web service
     *
     * @param prefix The string that the returned labels should begin with
     * @param _public Determines whether public or private labels should be returned
     */
    list(prefix, _public) {
        const observable = this.httpClient.get(this.makeUrl("labels"), {
            params: this.makeParams({
                app: this.appName,
                action: "list",
                q: prefix,
                public: _public,
                locale: this.intlService.currentLocale.name,
                localize: false
            })
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.list failure - error: ", error);
        });
        return observable;
    }
    /**
     * A wrapper around the list method. The matching labels are returned as an array of strings
     *
     * @param prefix The string that the returned labels should begin with
     * @param _public Determines whether public or private labels should be returned
     */
    array(prefix, _public) {
        return this.list(prefix, _public)
            .pipe(map((value) => {
            return value.labels;
        }));
    }
    /**
     * Calls the getUserRights action of the labels web service
     */
    getUserRights() {
        const observable = this.httpClient.get(this.makeUrl('labels'), {
            params: this.makeParams({
                app: this.appName,
                action: 'getUserRights'
            })
        });
        Utils.subscribe(observable, response => response, error => console.log("labelsService.getUserRights failure - error: ", error));
        return observable;
    }
    /**
     * Add labels to a set of documents
     *
     * @param labels The labels to add
     * @param ids The ids of the documents to which the labels should be added
     * @param _public Determines whether the labels are public or private
     */
    add(labels, ids, _public) {
        const observable = this.httpClient.post(this.makeUrl("labels"), {
            app: this.appName,
            action: "add",
            labels: labels,
            ids: ids,
            public: _public,
            $auditRecord: {
                auditEvents: [
                    {
                        type: "Label_AddDoc" /* Label_AddDoc */,
                        detail: {
                            public: _public,
                            label: !!labels ? labels.toString() : null,
                            doccount: !!ids ? ids.length : 0
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "addToLabel",
                        documentIds: ids
                    }
                ]
            }
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.add failure - error: ", error);
        });
        return observable;
    }
    /**
     * Removes labels from a set of documents
     *
     * @param labels The labels to remove
     * @param ids The ids of the documents from which the labels should be removed
     * @param _public Determines whether the labels are public or private
     */
    remove(labels, ids, _public) {
        const observable = this.httpClient.post(this.makeUrl("labels"), {
            app: this.appName,
            action: "remove",
            labels: labels,
            ids: ids,
            public: _public,
            $auditRecord: {
                auditEvents: [
                    {
                        type: "Label_RemoveDoc" /* Label_RemoveDoc */,
                        detail: {
                            public: _public,
                            label: !!labels ? labels.toString() : null,
                            doccount: !!ids ? ids.length : 0
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "removeFromLabel",
                        documentIds: ids
                    }
                ]
            }
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.remove failure - error: ", error);
        });
        return observable;
    }
    /**
     * Renames a set of labels
     *
     * @param labels The labels to rename
     * @param newLabel The new name for the labels
     * @param _public Determines whether the labels are public or private
     */
    rename(labels, newLabel, _public) {
        const observable = this.httpClient.post(this.makeUrl("labels"), {
            app: this.appName,
            action: "rename",
            labels: labels,
            newLabel: newLabel,
            public: _public,
            auditEvents: {
                type: "Label_Rename" /* Label_Rename */,
                detail: {
                    public: _public,
                    oldlabel: !!labels ? labels.toString() : null,
                    label: newLabel
                }
            }
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.rename failure - error: ", error);
        });
        return observable;
    }
    /**
     * Deletes a set of labels
     *
     * @param labels The labels to be deleted
     * @param _public Determines whether the labels are public or private
     */
    delete(labels, _public) {
        const observable = this.httpClient.post(this.makeUrl("labels"), {
            app: this.appName,
            action: "delete",
            labels: labels,
            public: _public,
            auditEvents: {
                type: "Label_Delete" /* Label_Delete */,
                detail: {
                    public: _public,
                    label: !!labels ? labels.toString() : null
                }
            }
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.delete failure - error: ", error);
        });
        return observable;
    }
    /**
     * Adds labels to the documents identified by the passed query
     *
     * @param labels The labels to add
     * @param query The query to produce the documents to which the labels should be added
     * @param _public Determines whether the labels are public or private
     */
    bulkAdd(labels, query, _public) {
        const observable = this.httpClient.post(this.makeUrl("labels"), {
            app: this.appName,
            action: "bulkAdd",
            labels: labels,
            query: query,
            public: _public,
            auditEvents: {
                type: "Label_Add" /* Label_Add */,
                detail: {
                    public: _public,
                    label: !!labels ? labels.toString() : null,
                    query: query != null ? query.name : null
                }
            }
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.bulkAdd failure - error: ", error);
        });
        return observable;
    }
    /**
     * Removes labels from the documents identified by the passed query
     *
     * @param labels The labels to remove
     * @param query The query to produce the documents from which the labels should be removed
     * @param _public Determines whether the labels are public or private
     */
    bulkRemove(labels, query, _public) {
        const observable = this.httpClient.post(this.makeUrl("labels"), {
            app: this.appName,
            action: "bulkRemove",
            labels: labels,
            query: query,
            public: _public,
            auditEvents: {
                type: "Label_Delete" /* Label_Delete */,
                detail: {
                    public: _public,
                    label: !!labels ? labels.toString() : null,
                    query: query != null ? query.name : null
                }
            }
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.bulkRemove failure - error: ", error);
        });
        return observable;
    }
}
LabelsWebService.ɵfac = function LabelsWebService_Factory(t) { return new (t || LabelsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(i1.SqHttpClient), i0.ɵɵinject(i2.IntlService)); };
LabelsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: LabelsWebService, factory: LabelsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LabelsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: i1.SqHttpClient }, { type: i2.IntlService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLndlYi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvd2ViLXNlcnZpY2VzLyIsInNvdXJjZXMiOlsibGFiZWxzLndlYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQW9CekM7O0dBRUc7QUFJSCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsV0FBVztJQUU3QyxZQUMwQixXQUF3QixFQUN0QyxVQUF3QixFQUN4QixXQUF3QjtRQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFGWCxlQUFVLEdBQVYsVUFBVSxDQUFjO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILElBQUksQ0FDQSxNQUFjLEVBQ2QsT0FBZ0I7UUFDaEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDcEIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxDQUFDLEVBQUUsTUFBTTtnQkFDVCxNQUFNLEVBQUUsT0FBTztnQkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSTtnQkFDM0MsUUFBUSxFQUFFLEtBQUs7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LGdCQUFnQjtjQUg1QixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7O3NCQUlRLE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHttYXB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtTcUh0dHBDbGllbnR9IGZyb20gXCIuL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQge0h0dHBTZXJ2aWNlfSBmcm9tIFwiLi9odHRwLnNlcnZpY2VcIjtcbmltcG9ydCB7U1RBUlRfQ09ORklHLCBTdGFydENvbmZpZ30gZnJvbSBcIi4vc3RhcnQtY29uZmlnLndlYi5zZXJ2aWNlXCI7XG5pbXBvcnQge1V0aWxzfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9iYXNlXCI7XG5pbXBvcnQge0ludGxTZXJ2aWNlfSBmcm9tIFwiQHNpbmVxdWEvY29yZS9pbnRsXCI7XG5pbXBvcnQge0lRdWVyeX0gZnJvbSBcIi4vcXVlcnkvcXVlcnlcIjtcbmltcG9ydCB7QXVkaXRFdmVudFR5cGV9IGZyb20gXCIuL2F1ZGl0LndlYi5zZXJ2aWNlXCI7XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBvYmplY3QgcmV0dXJuZWQgYnkgdGhlIGxpc3QgYWN0aW9uIG9mIHRoZSBsYWJlbHMgd2ViIHNlcnZpY2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMYWJlbHMge1xuICAgIGxhYmVsczogc3RyaW5nW107XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIHRoZSBvYmplY3QgcmV0dXJuZWQgYnkgdGhlIGdldFVzZXJSaWdodHMgYWN0aW9uIG9mIHRoZSBsYWJlbHMgd2ViIHNlcnZpY2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBMYWJlbHNSaWdodHMge1xuICAgIGNhbk1hbmFnZVB1YmxpY0xhYmVsczogYm9vbGVhbjtcbiAgICBjYW5FZGl0UHVibGljTGFiZWxzOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgc2VydmljZSBmb3IgY2FsbGluZyB0aGUgbGFiZWxzIHdlYiBzZXJ2aWNlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBMYWJlbHNXZWJTZXJ2aWNlIGV4dGVuZHMgSHR0cFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoU1RBUlRfQ09ORklHKSBzdGFydENvbmZpZzogU3RhcnRDb25maWcsXG4gICAgICAgIHByaXZhdGUgaHR0cENsaWVudDogU3FIdHRwQ2xpZW50LFxuICAgICAgICBwcml2YXRlIGludGxTZXJ2aWNlOiBJbnRsU2VydmljZSkge1xuICAgICAgICBzdXBlcihzdGFydENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbHMgdGhlIGxpc3QgYWN0aW9uIG9mIHRoZSBsYWJlbHMgd2ViIHNlcnZpY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcmVmaXggVGhlIHN0cmluZyB0aGF0IHRoZSByZXR1cm5lZCBsYWJlbHMgc2hvdWxkIGJlZ2luIHdpdGhcbiAgICAgKiBAcGFyYW0gX3B1YmxpYyBEZXRlcm1pbmVzIHdoZXRoZXIgcHVibGljIG9yIHByaXZhdGUgbGFiZWxzIHNob3VsZCBiZSByZXR1cm5lZFxuICAgICAqL1xuICAgIGxpc3QoXG4gICAgICAgIHByZWZpeDogc3RyaW5nLFxuICAgICAgICBfcHVibGljOiBib29sZWFuKTogT2JzZXJ2YWJsZTxMYWJlbHM+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cENsaWVudC5nZXQ8TGFiZWxzPih0aGlzLm1ha2VVcmwoXCJsYWJlbHNcIiksIHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5tYWtlUGFyYW1zKHtcbiAgICAgICAgICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICAgICAgICBhY3Rpb246IFwibGlzdFwiLFxuICAgICAgICAgICAgICAgIHE6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBwdWJsaWM6IF9wdWJsaWMsXG4gICAgICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmludGxTZXJ2aWNlLmN1cnJlbnRMb2NhbGUubmFtZSxcbiAgICAgICAgICAgICAgICBsb2NhbGl6ZTogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhYmVsc1NlcnZpY2UubGlzdCBmYWlsdXJlIC0gZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQSB3cmFwcGVyIGFyb3VuZCB0aGUgbGlzdCBtZXRob2QuIFRoZSBtYXRjaGluZyBsYWJlbHMgYXJlIHJldHVybmVkIGFzIGFuIGFycmF5IG9mIHN0cmluZ3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwcmVmaXggVGhlIHN0cmluZyB0aGF0IHRoZSByZXR1cm5lZCBsYWJlbHMgc2hvdWxkIGJlZ2luIHdpdGhcbiAgICAgKiBAcGFyYW0gX3B1YmxpYyBEZXRlcm1pbmVzIHdoZXRoZXIgcHVibGljIG9yIHByaXZhdGUgbGFiZWxzIHNob3VsZCBiZSByZXR1cm5lZFxuICAgICAqL1xuICAgIGFycmF5KFxuICAgICAgICBwcmVmaXg6IHN0cmluZyxcbiAgICAgICAgX3B1YmxpYzogYm9vbGVhbik6IE9ic2VydmFibGU8c3RyaW5nW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdChwcmVmaXgsIF9wdWJsaWMpXG4gICAgICAgICAgICAucGlwZShtYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxhYmVscztcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxscyB0aGUgZ2V0VXNlclJpZ2h0cyBhY3Rpb24gb2YgdGhlIGxhYmVscyB3ZWIgc2VydmljZVxuICAgICAqL1xuXG4gICAgZ2V0VXNlclJpZ2h0cygpOiBPYnNlcnZhYmxlPExhYmVsc1JpZ2h0cz4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LmdldDxMYWJlbHNSaWdodHM+KFxuICAgICAgICAgICAgdGhpcy5tYWtlVXJsKCdsYWJlbHMnKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMubWFrZVBhcmFtcyh7XG4gICAgICAgICAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdnZXRVc2VyUmlnaHRzJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZShcbiAgICAgICAgICAgIG9ic2VydmFibGUsXG4gICAgICAgICAgICByZXNwb25zZSA9PiByZXNwb25zZSxcbiAgICAgICAgICAgIGVycm9yID0+IGNvbnNvbGUubG9nKFwibGFiZWxzU2VydmljZS5nZXRVc2VyUmlnaHRzIGZhaWx1cmUgLSBlcnJvcjogXCIsIGVycm9yKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbGFiZWxzIHRvIGEgc2V0IG9mIGRvY3VtZW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIGxhYmVscyBUaGUgbGFiZWxzIHRvIGFkZFxuICAgICAqIEBwYXJhbSBpZHMgVGhlIGlkcyBvZiB0aGUgZG9jdW1lbnRzIHRvIHdoaWNoIHRoZSBsYWJlbHMgc2hvdWxkIGJlIGFkZGVkXG4gICAgICogQHBhcmFtIF9wdWJsaWMgRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBsYWJlbHMgYXJlIHB1YmxpYyBvciBwcml2YXRlXG4gICAgICovXG4gICAgYWRkKGxhYmVsczogc3RyaW5nW10sXG4gICAgICAgIGlkczogc3RyaW5nW10sXG4gICAgICAgIF9wdWJsaWM6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cENsaWVudC5wb3N0PHZvaWQ+KHRoaXMubWFrZVVybChcImxhYmVsc1wiKSwge1xuICAgICAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgICBhY3Rpb246IFwiYWRkXCIsXG4gICAgICAgICAgICBsYWJlbHM6IGxhYmVscyxcbiAgICAgICAgICAgIGlkczogaWRzLFxuICAgICAgICAgICAgcHVibGljOiBfcHVibGljLFxuICAgICAgICAgICAgJGF1ZGl0UmVjb3JkOiB7XG4gICAgICAgICAgICAgICAgYXVkaXRFdmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQXVkaXRFdmVudFR5cGUuTGFiZWxfQWRkRG9jLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHVibGljOiBfcHVibGljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAhIWxhYmVscyA/IGxhYmVscy50b1N0cmluZygpIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2Njb3VudDogISFpZHMgPyBpZHMubGVuZ3RoIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBtbEF1ZGl0RXZlbnRzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblR5cGU6IFwiYWRkVG9MYWJlbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRJZHM6IGlkc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYWJlbHNTZXJ2aWNlLmFkZCBmYWlsdXJlIC0gZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsYWJlbHMgZnJvbSBhIHNldCBvZiBkb2N1bWVudHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYWJlbHMgVGhlIGxhYmVscyB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0gaWRzIFRoZSBpZHMgb2YgdGhlIGRvY3VtZW50cyBmcm9tIHdoaWNoIHRoZSBsYWJlbHMgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBAcGFyYW0gX3B1YmxpYyBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGxhYmVscyBhcmUgcHVibGljIG9yIHByaXZhdGVcbiAgICAgKi9cbiAgICByZW1vdmUobGFiZWxzOiBzdHJpbmdbXSxcbiAgICAgICAgaWRzOiBzdHJpbmdbXSxcbiAgICAgICAgX3B1YmxpYzogYm9vbGVhbik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgICAgICBjb25zdCBvYnNlcnZhYmxlID0gdGhpcy5odHRwQ2xpZW50LnBvc3Q8dm9pZD4odGhpcy5tYWtlVXJsKFwibGFiZWxzXCIpLCB7XG4gICAgICAgICAgICBhcHA6IHRoaXMuYXBwTmFtZSxcbiAgICAgICAgICAgIGFjdGlvbjogXCJyZW1vdmVcIixcbiAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgaWRzOiBpZHMsXG4gICAgICAgICAgICBwdWJsaWM6IF9wdWJsaWMsXG4gICAgICAgICAgICAkYXVkaXRSZWNvcmQ6IHtcbiAgICAgICAgICAgICAgICBhdWRpdEV2ZW50czogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5MYWJlbF9SZW1vdmVEb2MsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdWJsaWM6IF9wdWJsaWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICEhbGFiZWxzID8gbGFiZWxzLnRvU3RyaW5nKCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY2NvdW50OiAhIWlkcyA/IGlkcy5sZW5ndGggOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIG1sQXVkaXRFdmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uVHlwZTogXCJyZW1vdmVGcm9tTGFiZWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50SWRzOiBpZHNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZShvYnNlcnZhYmxlLFxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFiZWxzU2VydmljZS5yZW1vdmUgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmFtZXMgYSBzZXQgb2YgbGFiZWxzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGFiZWxzIFRoZSBsYWJlbHMgdG8gcmVuYW1lXG4gICAgICogQHBhcmFtIG5ld0xhYmVsIFRoZSBuZXcgbmFtZSBmb3IgdGhlIGxhYmVsc1xuICAgICAqIEBwYXJhbSBfcHVibGljIERldGVybWluZXMgd2hldGhlciB0aGUgbGFiZWxzIGFyZSBwdWJsaWMgb3IgcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlbmFtZShsYWJlbHM6IHN0cmluZ1tdLFxuICAgICAgICBuZXdMYWJlbDogc3RyaW5nLFxuICAgICAgICBfcHVibGljOiBib29sZWFuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQucG9zdDx2b2lkPih0aGlzLm1ha2VVcmwoXCJsYWJlbHNcIiksIHtcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgYWN0aW9uOiBcInJlbmFtZVwiLFxuICAgICAgICAgICAgbGFiZWxzOiBsYWJlbHMsXG4gICAgICAgICAgICBuZXdMYWJlbDogbmV3TGFiZWwsXG4gICAgICAgICAgICBwdWJsaWM6IF9wdWJsaWMsXG4gICAgICAgICAgICBhdWRpdEV2ZW50czoge1xuICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLkxhYmVsX1JlbmFtZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiBfcHVibGljLFxuICAgICAgICAgICAgICAgICAgICBvbGRsYWJlbDogISFsYWJlbHMgPyBsYWJlbHMudG9TdHJpbmcoKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBuZXdMYWJlbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFV0aWxzLnN1YnNjcmliZShvYnNlcnZhYmxlLFxuICAgICAgICAgICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGFiZWxzU2VydmljZS5yZW5hbWUgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYSBzZXQgb2YgbGFiZWxzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGFiZWxzIFRoZSBsYWJlbHMgdG8gYmUgZGVsZXRlZFxuICAgICAqIEBwYXJhbSBfcHVibGljIERldGVybWluZXMgd2hldGhlciB0aGUgbGFiZWxzIGFyZSBwdWJsaWMgb3IgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRlbGV0ZShsYWJlbHM6IHN0cmluZ1tdLFxuICAgICAgICBfcHVibGljOiBib29sZWFuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQucG9zdDx2b2lkPih0aGlzLm1ha2VVcmwoXCJsYWJlbHNcIiksIHtcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgYWN0aW9uOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgbGFiZWxzOiBsYWJlbHMsXG4gICAgICAgICAgICBwdWJsaWM6IF9wdWJsaWMsXG4gICAgICAgICAgICBhdWRpdEV2ZW50czoge1xuICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLkxhYmVsX0RlbGV0ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiBfcHVibGljLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogISFsYWJlbHMgPyBsYWJlbHMudG9TdHJpbmcoKSA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhYmVsc1NlcnZpY2UuZGVsZXRlIGZhaWx1cmUgLSBlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGxhYmVscyB0byB0aGUgZG9jdW1lbnRzIGlkZW50aWZpZWQgYnkgdGhlIHBhc3NlZCBxdWVyeVxuICAgICAqXG4gICAgICogQHBhcmFtIGxhYmVscyBUaGUgbGFiZWxzIHRvIGFkZFxuICAgICAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gcHJvZHVjZSB0aGUgZG9jdW1lbnRzIHRvIHdoaWNoIHRoZSBsYWJlbHMgc2hvdWxkIGJlIGFkZGVkXG4gICAgICogQHBhcmFtIF9wdWJsaWMgRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBsYWJlbHMgYXJlIHB1YmxpYyBvciBwcml2YXRlXG4gICAgICovXG4gICAgYnVsa0FkZChsYWJlbHM6IHN0cmluZ1tdLFxuICAgICAgICBxdWVyeTogSVF1ZXJ5LFxuICAgICAgICBfcHVibGljOiBib29sZWFuKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgICAgIGNvbnN0IG9ic2VydmFibGUgPSB0aGlzLmh0dHBDbGllbnQucG9zdDx2b2lkPih0aGlzLm1ha2VVcmwoXCJsYWJlbHNcIiksIHtcbiAgICAgICAgICAgIGFwcDogdGhpcy5hcHBOYW1lLFxuICAgICAgICAgICAgYWN0aW9uOiBcImJ1bGtBZGRcIixcbiAgICAgICAgICAgIGxhYmVsczogbGFiZWxzLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgcHVibGljOiBfcHVibGljLFxuICAgICAgICAgICAgYXVkaXRFdmVudHM6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBBdWRpdEV2ZW50VHlwZS5MYWJlbF9BZGQsXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB7XG4gICAgICAgICAgICAgICAgICAgIHB1YmxpYzogX3B1YmxpYyxcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICEhbGFiZWxzID8gbGFiZWxzLnRvU3RyaW5nKCkgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkgIT0gbnVsbCA/IHF1ZXJ5Lm5hbWUgOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgVXRpbHMuc3Vic2NyaWJlKG9ic2VydmFibGUsXG4gICAgICAgICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsYWJlbHNTZXJ2aWNlLmJ1bGtBZGQgZmFpbHVyZSAtIGVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGFiZWxzIGZyb20gdGhlIGRvY3VtZW50cyBpZGVudGlmaWVkIGJ5IHRoZSBwYXNzZWQgcXVlcnlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsYWJlbHMgVGhlIGxhYmVscyB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0gcXVlcnkgVGhlIHF1ZXJ5IHRvIHByb2R1Y2UgdGhlIGRvY3VtZW50cyBmcm9tIHdoaWNoIHRoZSBsYWJlbHMgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBAcGFyYW0gX3B1YmxpYyBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGxhYmVscyBhcmUgcHVibGljIG9yIHByaXZhdGVcbiAgICAgKi9cbiAgICBidWxrUmVtb3ZlKGxhYmVsczogc3RyaW5nW10sXG4gICAgICAgIHF1ZXJ5OiBJUXVlcnksXG4gICAgICAgIF9wdWJsaWM6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZSA9IHRoaXMuaHR0cENsaWVudC5wb3N0PHZvaWQ+KHRoaXMubWFrZVVybChcImxhYmVsc1wiKSwge1xuICAgICAgICAgICAgYXBwOiB0aGlzLmFwcE5hbWUsXG4gICAgICAgICAgICBhY3Rpb246IFwiYnVsa1JlbW92ZVwiLFxuICAgICAgICAgICAgbGFiZWxzOiBsYWJlbHMsXG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICBwdWJsaWM6IF9wdWJsaWMsXG4gICAgICAgICAgICBhdWRpdEV2ZW50czoge1xuICAgICAgICAgICAgICAgIHR5cGU6IEF1ZGl0RXZlbnRUeXBlLkxhYmVsX0RlbGV0ZSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICAgICAgcHVibGljOiBfcHVibGljLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogISFsYWJlbHMgPyBsYWJlbHMudG9TdHJpbmcoKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSAhPSBudWxsID8gcXVlcnkubmFtZSA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBVdGlscy5zdWJzY3JpYmUob2JzZXJ2YWJsZSxcbiAgICAgICAgICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxhYmVsc1NlcnZpY2UuYnVsa1JlbW92ZSBmYWlsdXJlIC0gZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxufVxuIl19