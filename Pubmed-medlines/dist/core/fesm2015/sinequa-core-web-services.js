import { InjectionToken, ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Optional, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, APP_INITIALIZER, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Utils, BaseModule } from '@sinequa/core/base';
import { Observable, of, throwError, Subject, EMPTY } from 'rxjs';
import atomic from 'atomicjs';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { share, tap, map, shareReplay, catchError, distinctUntilChanged, pluck } from 'rxjs/operators';
import { IntlService, IntlModule } from '@sinequa/core/intl';
import jstz from 'jstz';
import { CommonModule } from '@angular/common';

/**
 * Enum representing supported export source.
 */
var ExportSourceType;
(function (ExportSourceType) {
    ExportSourceType[ExportSourceType["None"] = 0] = "None";
    ExportSourceType[ExportSourceType["Result"] = 1] = "Result";
    ExportSourceType[ExportSourceType["Selection"] = 2] = "Selection";
    ExportSourceType[ExportSourceType["SavedQuery"] = 4] = "SavedQuery";
})(ExportSourceType || (ExportSourceType = {}));
/**
 * Enum representing supported export format.
 */
var ExportOutputFormat;
(function (ExportOutputFormat) {
    ExportOutputFormat[ExportOutputFormat["None"] = 0] = "None";
    ExportOutputFormat[ExportOutputFormat["Csv"] = 1] = "Csv";
    ExportOutputFormat[ExportOutputFormat["Xlsx"] = 2] = "Xlsx";
    ExportOutputFormat[ExportOutputFormat["Json"] = 4] = "Json";
})(ExportOutputFormat || (ExportOutputFormat = {}));
/**
 * The minimum server api version that compatible with this version of SBA.
 */
const MINIMUM_COMPATIBLE_SERVER_API_VERSION = '1.0';

/**
 * A base helper class for web services. It holds the {@link StartConfig} for the app
 */
class HttpService {
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

/**
 * An {@link InjectionToken} to access the app's {@link StartConfig} instance
 */
const START_CONFIG = new InjectionToken("START_CONFIG");
/**
 * A service to manage the initialization of the app's {@link StartConfig} instance. The service
 * is automatically instantiated by an {@link APP_INITIALIZER} in {@link WebServicesModule} and the
 * initialization is performed in the constructor.
 */
class StartConfigWebService {
    /**
     * Initializes the injected {@link StartConfig} instance. Outputs an error to the
     * console if no instance is injected.
     *
     * @param startConfig The start configuration instance
     */
    constructor(startConfig) {
        this.startConfig = startConfig;
        if (!startConfig) {
            console.error("START_CONFIG must be provided in your app module");
            return;
        }
        this.initStartConfig();
    }
    getDefaultStartConfig() {
        const startConfig = {};
        const browserUrl = Utils.makeURL(window.location.href);
        let parts = Utils.split(browserUrl.pathname, "/");
        const appSpecifierIndex = parts.findIndex(value => Utils.eqNCN(value, "app", "app-debug"));
        if (appSpecifierIndex !== -1 && appSpecifierIndex < parts.length - 1) {
            const appSpecifier = parts[appSpecifierIndex];
            startConfig.app = parts[appSpecifierIndex + 1];
            startConfig.production = appSpecifier === "app" ? true : false;
            parts = parts.slice(0, appSpecifierIndex);
        }
        startConfig.url = Utils.addUrl(browserUrl.origin, ...parts);
        return startConfig;
    }
    initStartConfig() {
        const defaultStartConfig = this.getDefaultStartConfig();
        const initialStartConfig = Utils.copy(this.startConfig);
        Utils.extend(this.startConfig, defaultStartConfig, initialStartConfig);
        const browserUrl = Utils.makeURL(window.location.href);
        const url = Utils.makeURL(this.startConfig.url);
        let apiPath = Utils.addUrl(url.pathname, StartConfigWebService.API_PATH);
        let applicationPath = url.pathname;
        const corsActive = url.origin !== browserUrl.origin;
        if (corsActive) {
            apiPath = Utils.addUrl(url.origin, apiPath);
            applicationPath = Utils.addUrl(url.origin, applicationPath);
        }
        this.startConfig.origin = url.origin;
        this.startConfig.applicationPath = applicationPath;
        this.startConfig.apiPath = apiPath;
        this.startConfig.corsActive = corsActive;
        this.startConfig.browserUrl = Utils.addUrl(browserUrl.origin, browserUrl.pathname);
    }
    /**
     * Fetches pre-login app configuration from the Sinequa server and merges it
     * into the start config instance
     *
     * @returns An observable of the start config after being merged with the pre-login app configuration
     */
    fetchPreLoginAppConfig() {
        return Observable.create(observer => {
            let _url = Utils.addUrl(this.startConfig.apiPath, "app");
            _url = Utils.addSearchParams(_url, {
                app: this.startConfig.app,
                preLogin: true
            });
            atomic(_url, {
                headers: {
                    "sinequa-force-camel-case": true
                }
            })
                .then(response => {
                const initialStartConfig = Utils.copy(this.startConfig);
                Utils.extend(this.startConfig, response.data, initialStartConfig);
                const versionDate = this.startConfig.versionDate;
                if (Utils.isString(versionDate)) { // it will be
                    this.startConfig.versionDate = Utils.fromSysDateStr(versionDate);
                }
                observer.next(this.startConfig);
                observer.complete();
            })
                .catch(error => {
                console.error("Error retrieving app config");
                observer.error(error);
            });
        });
    }
    /**
     * Retrieves Sinequa server configuration from a web server hosting the app
     *
     * @param url A URL to a JSON file containing the Sinequa server configuration
     *
     * @returns An observable of the Sinequa server configuration
     */
    fetchServerConfig(url) {
        return Observable.create(observer => {
            if (!url) {
                const _url = Utils.makeURL(window.location.href);
                url = Utils.addUrl(_url.pathname, "sinequa-config.json");
            }
            atomic(url)
                .then(response => {
                // If the config file is empty or not valid json we'll most likely get a string for data
                let serverConfig = response.data;
                if (!Utils.isObject(serverConfig)) {
                    console.warn("invalid sinequa-config.json file");
                    serverConfig = {};
                }
                observer.next(serverConfig);
                observer.complete();
            })
                .catch(error => {
                console.log("sinequa-config.json not found");
                observer.next({});
                observer.complete();
            });
        });
    }
}
StartConfigWebService.API_PATH = "/api/v1";
StartConfigWebService.ɵfac = function StartConfigWebService_Factory(t) { return new (t || StartConfigWebService)(ɵɵinject(START_CONFIG, 8)); };
StartConfigWebService.ɵprov = ɵɵdefineInjectable({ token: StartConfigWebService, factory: StartConfigWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(StartConfigWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();

/**
 * A helper service that overrides the standard Angular [HttpClient]{@link https://angular.io/api/common/http/HttpClient}
 * to prevent multiple subscribers from causing multiple requests to be issued and to mitigate against request flooding
 */
class SqHttpClient extends HttpClient {
    constructor(httpHandler) {
        super(httpHandler);
        this.responseCache = new Map();
    }
    getRequestHash(first, url, options = {}) {
        // The replacer ensures that object keys are always serialized in the same order
        const strRequest = JSON.stringify([first, url, options], (key, value) => {
            if (Utils.isObject(value) && !Utils.isIterable(value)) {
                return Object.keys(value).sort().reduce((s, k) => {
                    s[k] = value[k];
                    return s;
                }, {});
            }
            else {
                return value;
            }
        });
        return Utils.sha256(strRequest);
    }
    /**
     * Overrides the standard `HttpClient.request` method to change its behavior as follows:
     * * pipes the observable to the share operator so that only a single request is issued even if there are multiple subscribers
     * * to mitigate request flooding, a cache of pending response observables keyed by the request thumbprint is maintained.
     * An observable from the cache is returned if the incoming request is identical to one in the cache
     */
    request(first, url, options = {}) {
        const requestHash = this.getRequestHash(first, url, options);
        let observable = this.responseCache.get(requestHash);
        if (!observable) {
            observable = super.request(first, url, options)
                .pipe(share())
                .pipe(tap(() => this.responseCache.delete(requestHash)));
            this.responseCache.set(requestHash, observable);
        }
        return observable;
    }
}
SqHttpClient.ɵfac = function SqHttpClient_Factory(t) { return new (t || SqHttpClient)(ɵɵinject(HttpHandler)); };
SqHttpClient.ɵprov = ɵɵdefineInjectable({ token: SqHttpClient, factory: SqHttpClient.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SqHttpClient, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: HttpHandler }]; }, null); })();

/**
 * This service provides methods to retrieve and refresh the configuration of an app
 */
class AppWebService extends HttpService {
    /**
     * Constructor
     *
     * @param startConfig Provides the app name
     * @param httpClient The HTTP client
     */
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        if (!this.appName) {
            console.error("Missing app name!");
        }
    }
    /**
     * Gets the app configuration for the app name
     *
     * @returns An observable of the app configuration
     */
    get() {
        const observable = this.httpClient.get(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || ""
            })
        });
        observable
            .subscribe((response) => {
            //console.log("appWebService.get success - data: ", response);
            return response;
        }, (error) => {
            //console.log("appWebService.get failure - reason: ", error);
        });
        return observable;
    }
    /**
     * Refreshes the app configuration based on a version identifier
     *
     * @param appVersionId The current app version id [CCApp.versionId]{@link CCApp#versionId}
     * @param auditEvents Audit events to be recorded for this call
     *
     * @returns An observable of an object containing a flag indicating whether the configuration was up to date. If false
     * then the app member of the object will be set to the new version of the configuration.
     */
    refresh(appVersionId, auditEvents) {
        const observable = this.httpClient.get(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || "",
                versionId: appVersionId,
                $auditRecord: auditEvents
            })
        });
        observable
            .subscribe((response) => {
            //console.log("appWebService.refresh success - data: ", response);
            return response;
        }, (error) => {
            //console.log("appWebService.refresh failure - reason: ", error);
        });
        return observable;
    }
}
AppWebService.ɵfac = function AppWebService_Factory(t) { return new (t || AppWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
AppWebService.ɵprov = ɵɵdefineInjectable({ token: AppWebService, factory: AppWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AppWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
class AuditWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Notify the Sinequa server of a sponsored link event
     *
     * @param evt The audit event type
     * @param sl The sponsored link
     * @param resultId The id of the results that showed the sponsored link
     * @param parameters Additional information
     */
    notifySponsoredLink(evt, sl, resultId, parameters) {
        const detail = {
            "link-id": sl.id,
            rank: sl.rank || 0,
            title: sl.title,
            url: sl.url,
            "result-id": resultId
        };
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data = {
            type: evt,
            detail
        };
        return this.notify(data);
    }
    /**
     * Notify the Sinequa server of a document event
     *
     * @param evt The audit event type
     * @param doc The document (record) in question
     * @param resultsOrId The results or resultid that contain the document
     * @param parameters Additional parameters
     * @param rfmParameters Additional RFM parameters
     */
    notifyDocument(evt, doc, resultsOrId, parameters, rfmParameters) {
        let resultId;
        let results;
        if (Utils.isString(resultsOrId)) {
            resultId = resultsOrId;
        }
        else {
            results = resultsOrId;
            resultId = results ? results.id : null;
        }
        const detail = {
            app: this.appName,
            "doc-id": doc.id,
            rank: doc.rank,
            title: doc.title,
            source: Utils.treeFirstNode(doc.collection[0]),
            collection: doc.collection[0],
            "result-id": resultId,
            filename: doc.filename,
            fileext: doc.fileext,
            index: doc.databasealias
        };
        if (results) {
            detail["result-count"] = results.totalRowCount;
        }
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data = {
            type: evt,
            detail
        };
        if (rfmParameters) {
            const rfmDetail = {};
            Object.keys(rfmParameters).forEach(key => rfmDetail[key] = rfmParameters[key]);
            data.rfmDetail = rfmDetail;
        }
        return this.notify(data);
    }
    /**
     * Notify the Sinequa server of a document event
     *
     * @param evt The audit event type
     * @param id The id of the document (record) in question
     * @param parameters Additional parameters
     * @param rfmParameters Additional RFM parameters
     */
    notifyDocumentById(evt, id, parameters, rfmParameters) {
        const collection = id.substr(0, id.indexOf("|"));
        const detail = {
            app: this.appName,
            "doc-id": id,
            rank: -1,
            source: Utils.treeFirstNode(collection),
            collection
        };
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data = {
            type: evt,
            detail
        };
        if (rfmParameters) {
            const rfmDetail = {};
            Object.keys(rfmParameters).forEach(key => rfmDetail[key] = rfmParameters[key]);
            data.rfmDetail = rfmDetail;
        }
        return this.notify(data);
    }
    /**
     * Notify logout
     */
    notifyLogout() {
        const detail = {
            app: this.appName,
        };
        const data = {
            type: "Search_Exit_Logout" /* Search_Exit_Logout */,
            detail
        };
        return this.notify(data);
    }
    /**
     * Notify the Sinequa server of a set of audit events
     *
     * @param auditEvents The audit events
     */
    notify(auditEvents) {
        if (!this.startConfig.auditEnabled) {
            return of(undefined);
        }
        const observable = this.httpClient.post(this.makeUrl(AuditWebService.endpoint), {
            event: "None" /* None */,
            app: this.appName,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("auditService.notify failure - error: ", error);
        });
        return observable;
    }
}
AuditWebService.endpoint = "audit.notify";
AuditWebService.ɵfac = function AuditWebService_Factory(t) { return new (t || AuditWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
AuditWebService.ɵprov = ɵɵdefineInjectable({ token: AuditWebService, factory: AuditWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AuditWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
class DatasetWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Return the list of queries configured in the given
     * dataset web service.
     * @param webServiceName name of the web service
     */
    list(webServiceName) {
        return this.httpClient.get(`${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`);
    }
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param query name of the query
     * @param params parameters of the queries
     */
    get(webServiceName, query, parameters = {}) {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}/${query}`;
        return this.httpClient.post(url, { parameters })
            .pipe(map(d => d.datasets[query]));
    }
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     */
    getAll(webServiceName, parameters = {}) {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post(url, { parameters })
            .pipe(map(d => d.datasets));
    }
}
DatasetWebService.endpoint = "search.dataset";
DatasetWebService.ɵfac = function DatasetWebService_Factory(t) { return new (t || DatasetWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
DatasetWebService.ɵprov = ɵɵdefineInjectable({ token: DatasetWebService, factory: DatasetWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DatasetWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service to manage navigator downloads
 */
class DownloadWebService {
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
DownloadWebService.ɵprov = ɵɵdefineInjectable({ token: DownloadWebService, factory: DownloadWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DownloadWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], null, null); })();

/**
 * A generic service for invoking JsonMethod plugins
 */
class JsonMethodPluginService extends HttpService {
    constructor(httpClient, startConfig) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Call a JsonMethod plugin using an HTTP POST
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    post(method, query, options) {
        if (!Utils.isObject(query)) {
            return throwError({ error: "invalid query object" });
        }
        const observable = this.httpClient.post(this.makeUrl(method), query, options);
        Utils.subscribe(observable, (response) => {
            console.log("JsonMethodPluginService.post success - data: ", response);
        }, (error) => {
            console.log("JsonMethodPluginService.post failure - error: ", error);
        }, () => {
            console.log("JsonMethodPluginService.post complete");
        });
        return observable;
    }
    /**
     * Call a JsonMethod plugin using an HTTP POST
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    call(method, query, options) {
        return this.post(method, query, options);
    }
    /**
     * Call a JsonMethod plugin using an HTTP GET
     *
     * @param method The name of the JsonMethod plugin
     * @param query Parameters to pass to the plugin
     * @param options HTTP options for the request
     * @returns An observable of the plugin's return value
     */
    get(method, query, options) {
        const observable = this.httpClient.get(this.makeUrl(method), Object.assign({ params: this.makeParams(query) }, options));
        Utils.subscribe(observable, (response) => {
            console.log("JsonMethodPluginService.get success - data: ", response);
        }, (error) => {
            console.log("JsonMethodPluginService.get failure - error: ", error);
        }, () => {
            console.log("JsonMethodPluginService.get complete");
        });
        return observable;
    }
    makeUrl(api) {
        return super.makeUrl('plugin/' + api);
    }
}
JsonMethodPluginService.ɵfac = function JsonMethodPluginService_Factory(t) { return new (t || JsonMethodPluginService)(ɵɵinject(SqHttpClient), ɵɵinject(START_CONFIG)); };
JsonMethodPluginService.ɵprov = ɵɵdefineInjectable({ token: JsonMethodPluginService, factory: JsonMethodPluginService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(JsonMethodPluginService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: SqHttpClient }, { type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }]; }, null); })();

/**
 * A service for calling the labels web service
 */
class LabelsWebService extends HttpService {
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
LabelsWebService.ɵfac = function LabelsWebService_Factory(t) { return new (t || LabelsWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient), ɵɵinject(IntlService)); };
LabelsWebService.ɵprov = ɵɵdefineInjectable({ token: LabelsWebService, factory: LabelsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LabelsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }, { type: IntlService }]; }, null); })();

/**
 * A service for calling the preview web service
 */
class PreviewWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets {@link PreviewData} for a document in the context of a {@link IQuery}
     *
     * @param id The document id
     * @param query The query context
     * @param auditEvents Audit events to store on the server
     */
    get(id, query, auditEvents) {
        return this.httpClient.post(this.makeUrl("preview"), {
            app: this.appName,
            action: "get",
            id,
            query,
            browserUrl: this.startConfig.browserUrl,
            $auditRecord: auditEvents
        }).pipe(shareReplay(1));
    }
    /**
     * Gets document's preview HTML content
     *
     * @param url The document preview URL
     * @returns
     */
    getHtmlPreview(url) {
        return this.httpClient.get(url, { responseType: "text" }).pipe(catchError(err => throwError(err)), distinctUntilChanged(), shareReplay(1));
    }
}
PreviewWebService.ɵfac = function PreviewWebService_Factory(t) { return new (t || PreviewWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
PreviewWebService.ɵprov = ɵɵdefineInjectable({ token: PreviewWebService, factory: PreviewWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PreviewWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the principal web service
 */
class PrincipalWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this._events = new Subject();
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * The observable events emitted by this service
     */
    get events() {
        return this._events;
    }
    /**
     * Gets the current {@link Principal}
     */
    get principal() {
        return this._principal;
    }
    /**
     * Sets the current {@link Principal} and issues the "changed" event
     */
    set principal(value) {
        this._principal = value;
        this._events.next({ type: "changed" });
    }
    /**
     * Gets the list of user info (user or group)
     *
     * @param params query params to specify the search
     * @returns list of user info
     */
    list(params) {
        return this.httpClient.get(this.makeUrl("principal/list"), {
            params: this.makeParams(Object.assign({}, params))
        });
    }
    userId(userId) {
        return this.httpClient.get(this.makeUrl(`principal/userId/${userId}`));
    }
    userIds(params) {
        return this.httpClient.post(this.makeUrl("principal/userids"), params).pipe(pluck("principals"));
    }
    /**
     * Gets the principal from the server based on the current login credentials
     *
     * @param autoAuthenticate Determines whether the {@link HttpInterceptor} should perform HTTP 401 handling
     * for this request
     */
    get(autoAuthenticate = true) {
        return this.httpClient.get(this.makeUrl("principal"), {
            params: this.makeParams({
                action: "get",
                noAutoAuthentication: !autoAuthenticate
            })
        });
    }
    /**
     * Gets the principal from the server based on the current login credentials and sets the
     * principal member
     */
    load() {
        const observable = this.get();
        Utils.subscribe(observable, (response) => {
            this.principal = response;
            return response;
        }, (error) => {
            console.log("principalService.get failure - error: ", error);
        });
        return observable;
    }
}
PrincipalWebService.ɵfac = function PrincipalWebService_Factory(t) { return new (t || PrincipalWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
PrincipalWebService.ɵprov = ɵɵdefineInjectable({ token: PrincipalWebService, factory: PrincipalWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(PrincipalWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service to export the result of a query.
 */
class QueryExportWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    logErrorToConsole(methodName, errorMessage) {
        console.log(`queryExportService.${methodName} ${errorMessage}.`);
    }
    preliminaryCheck(methodName, webService, format) {
        if (!this.appName) {
            const errorMessage = 'No app';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        if (!webService) {
            const errorMessage = 'No web service';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        if (!format || format === ExportOutputFormat.None) {
            const errorMessage = 'No output format';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        return undefined;
    }
    /**
     * Exports the current result.
     *
     * @param webService The configuration for the export web service.
     * @param query The query to export.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportResult(webService, query, results, format, maxCount, exportedColumns) {
        const methodName = 'exportResult';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }
        if (!query) {
            const errorMessage = 'No query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            query,
            type: ExportSourceType[ExportSourceType.Result],
            format: ExportOutputFormat[format],
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            $auditRecord: {
                type: "Search_ExportCSV" /* Search_ExportCSV */,
                detail: {
                    "result-id": !!results ? results.id : undefined
                }
            }
        };
        return this.doExport(postData);
    }
    /**
     * Exports the current selected records.
     *
     * @param webService The configuration for the export web service.
     * @param query
     * @param selection
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportSelection(webService, query, results, selection, format, maxCount, exportedColumns) {
        const methodName = 'exportSelection';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }
        if (!query) {
            const errorMessage = 'No query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        if (!selection || selection.length === 0) {
            const errorMessage = 'No selection';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            query,
            selection,
            type: ExportSourceType[ExportSourceType.Selection],
            format: ExportOutputFormat[format],
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            $auditRecord: {
                type: "Search_Selection_ExportCSV" /* Search_Selection_ExportCSV */,
                detail: {
                    "result-id": !!results ? results.id : undefined
                }
            }
        };
        return this.doExport(postData);
    }
    /**
     * Exports the result of a saved query.
     *
     * @param webService The configuration for the export web service.
     * @param queryName The query name.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    exportSavedQuery(webService, queryName, format, maxCount, exportedColumns) {
        const methodName = 'exportSavedQuery';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }
        if (!queryName) {
            const errorMessage = 'No saved query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            type: ExportSourceType[ExportSourceType.SavedQuery],
            format: ExportOutputFormat[format],
            name: queryName,
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            $auditRecord: {
                type: "Search_SavedQuery_ExportCSV" /* Search_SavedQuery_ExportCSV */,
                detail: {
                    query: queryName
                }
            }
        };
        return this.doExport(postData);
    }
    doExport(body) {
        const observable = this.httpClient.post(this.makeUrl('query.export'), body, {
            observe: 'response',
            responseType: 'blob'
        });
        Utils.subscribe(observable, (response) => {
            console.log('queryExportService.export success: ', this.readBlobFileName(response));
            return response;
        }, (error) => {
            console.log('queryExportService.export failure - error: ', error);
        });
        return observable;
    }
    readBlobFileName(response) {
        const header = response.headers.get('content-disposition');
        return header ? header.split('filename=')[1].replace('"', '').replace('"', '') : "";
    }
}
QueryExportWebService.ɵfac = function QueryExportWebService_Factory(t) { return new (t || QueryExportWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
QueryExportWebService.ɵprov = ɵɵdefineInjectable({ token: QueryExportWebService, factory: QueryExportWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(QueryExportWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * Used to inform whether a query is being executed using original or corrected search terms
 */
var DidYouMeanKind;
(function (DidYouMeanKind) {
    DidYouMeanKind[DidYouMeanKind["Original"] = 0] = "Original";
    DidYouMeanKind[DidYouMeanKind["Corrected"] = 1] = "Corrected";
})(DidYouMeanKind || (DidYouMeanKind = {}));
/**
 * Display kinds for RFM
 */
var RFMDisplay;
(function (RFMDisplay) {
    // Must be in par with C# RFMDisplay enum (RFM.cs)
    RFMDisplay[RFMDisplay["none"] = 0] = "none";
    RFMDisplay[RFMDisplay["positiveRate"] = 1] = "positiveRate";
    RFMDisplay[RFMDisplay["mainlyPosRate"] = 2] = "mainlyPosRate";
    RFMDisplay[RFMDisplay["unrate"] = 4] = "unrate";
    RFMDisplay[RFMDisplay["mainlyNegRate"] = 8] = "mainlyNegRate";
    RFMDisplay[RFMDisplay["negativeRate"] = 16] = "negativeRate";
    RFMDisplay[RFMDisplay["all"] = 31] = "all";
    RFMDisplay[RFMDisplay["positiveOnly"] = 7] = "positiveOnly";
    RFMDisplay[RFMDisplay["negativeOnly"] = 28] = "negativeOnly";
    RFMDisplay[RFMDisplay["personalAll"] = 21] = "personalAll";
    RFMDisplay[RFMDisplay["personalPosOnly"] = 5] = "personalPosOnly";
    RFMDisplay[RFMDisplay["personalNegOnly"] = 20] = "personalNegOnly";
})(RFMDisplay || (RFMDisplay = {}));
/**
 * A service to call the query web service
 */
class QueryWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this.endPoint = "query";
    }
    /**
     * Get the results for the passed query
     *
     * @param query The query to execute
     * @param auditEvents Any audit events to store on the server
     * @param queryIntentData Any accompanying query intent data
     */
    getResults(query, auditEvents, queryIntentData) {
        if (!query) {
            return throwError({ error: "no query" });
        }
        const observable = this.httpClient.post(this.makeUrl(this.endPoint), {
            app: this.appName,
            query,
            $auditRecord: auditEvents,
            queryIntentData
        });
        Utils.subscribe(observable, (response) => {
            console.log("queryService.getResults success - data: ", response);
            return response;
        }, (error) => {
            console.log("queryService.getResults failure - error: ", error);
        });
        return observable;
    }
    /**
     * Get the results for a set of queries
     *
     * @param queries The queries to execute
     * @param auditEvents Any audit events to store on the server
     */
    getMultipleResults(queries, auditEvents) {
        if (!queries || queries.length === 0) {
            return throwError({ error: "no queries" });
        }
        const data = {
            methods: [],
            propagateErrors: true,
            $auditRecord: auditEvents
        };
        for (const query of queries) {
            data.methods.push({
                method: this.endPoint,
                app: this.appName,
                query
            });
        }
        return this.httpClient.post(this.makeUrl("multi"), data);
    }
}
QueryWebService.ɵfac = function QueryWebService_Factory(t) { return new (t || QueryWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
QueryWebService.ɵprov = ɵɵdefineInjectable({ token: QueryWebService, factory: QueryWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(QueryWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

class RecentQueriesList {
    constructor(name) {
        this.name = name;
        this.queries = []; // Make sure to have at least a valid "queries" member, to simplify tests in GUI code.
    }
}
class RecentQueries {
}
class RecentQueriesWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    load() {
        const observable = this.httpClient.get(this.makeUrl("recentqueries"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable, (response) => {
            this.recentQueries = response;
            if (!this.recentQueries)
                this.recentQueries = new RecentQueries();
            if (this.recentQueries) {
                if (!this.recentQueries.app)
                    this.recentQueries.app = new RecentQueriesList(this.appName);
                if (!this.recentQueries.user)
                    this.recentQueries.user = new RecentQueriesList("currentuser");
            }
            console.log("recentQueriesService.load success - data: ", response);
            return response;
        }, (error) => {
            console.log("recentQueriesService.load failure - error: ", error);
        });
        return observable;
    }
    // No save/patch action for the recent queries: MRU lists are generated server side when the query is executed.
    appRecentQueries() {
        if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
            return this.recentQueries.app.queries;
        else {
            return [];
        }
    }
    appRecentQueriesLength() {
        if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
            return this.recentQueries.app.queries.length;
        else
            return 0;
    }
    userRecentQueries() {
        if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
            return this.recentQueries.user.queries;
        else {
            return [];
        }
    }
    userRecentQueriesLength() {
        if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
            return this.recentQueries.user.queries.length;
        else
            return 0;
    }
}
RecentQueriesWebService.ɵfac = function RecentQueriesWebService_Factory(t) { return new (t || RecentQueriesWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
RecentQueriesWebService.ɵprov = ɵɵdefineInjectable({ token: RecentQueriesWebService, factory: RecentQueriesWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RecentQueriesWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the search.rfm web service
 */
class RfmWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Get RFM data for a set of results
     *
     * @param rfm The name of the RFM
     * @param results The results for which to retrieve RFM data
     */
    getRfmData(rfm, results) {
        const ids = [];
        for (const record of results.records) {
            if (!!record.flags && record.flags.indexOf("r") !== -1) {
                ids.push(record.id);
            }
        }
        if (ids.length === 0) {
            return EMPTY;
        }
        const data = {
            rfm,
            queryHash: results.rfmQueryHash,
            ids
        };
        const observable = this.httpClient.post(this.makeUrl(RfmWebService.endpoint), data);
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("rfmService.getRfmData failure - error: ", error);
        });
        return observable;
    }
}
RfmWebService.endpoint = "search.rfm";
RfmWebService.ɵfac = function RfmWebService_Factory(t) { return new (t || RfmWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
RfmWebService.ɵprov = ɵɵdefineInjectable({ token: RfmWebService, factory: RfmWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(RfmWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the similardocuments web service
 */
class SimilarDocumentsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets an array of documents (records) similar to the passed document
     *
     * @param sourceDocumentId The id of the document for which to retrieve similar documents
     * @param queryName The name of the query
     */
    get(sourceDocumentId, queryName) {
        return this.httpClient.post(this.makeUrl("similardocuments"), {
            app: this.appName,
            sourceDocumentId,
            query: {
                name: queryName
            }
        }).pipe(map((response) => response.data));
    }
}
SimilarDocumentsWebService.ɵfac = function SimilarDocumentsWebService_Factory(t) { return new (t || SimilarDocumentsWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
SimilarDocumentsWebService.ɵprov = ɵɵdefineInjectable({ token: SimilarDocumentsWebService, factory: SimilarDocumentsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SimilarDocumentsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the query.links web service.
 */
class SponsoredLinksWebService extends HttpService {
    constructor(startConfig, httpClient, intlService) {
        super(startConfig);
        this.httpClient = httpClient;
        this.intlService = intlService;
    }
    /**
     * Queries the server for sponsored links.
     *
     * @param query The query information.
     * @param webService The web service configuration.
     */
    getLinks(query, webService) {
        if (!query) {
            return throwError({ error: "no query" });
        }
        const url = this.makeUrl("query.links");
        const observable = this.httpClient.post(url, {
            app: this.appName,
            webservice: webService,
            query,
            locale: this.intlService.currentLocale.name
        });
        Utils.subscribe(observable, (response) => {
            console.log("SponsoredLinksService.getLinks success - data: ", response);
            return response;
        }, (error) => {
            console.log("SponsoredLinksService.getLinks failure - error: ", error);
        });
        return observable;
    }
}
SponsoredLinksWebService.ɵfac = function SponsoredLinksWebService_Factory(t) { return new (t || SponsoredLinksWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient), ɵɵinject(IntlService)); };
SponsoredLinksWebService.ɵprov = ɵɵdefineInjectable({ token: SponsoredLinksWebService, factory: SponsoredLinksWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SponsoredLinksWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }, { type: IntlService }]; }, null); })();

/**
 * A service for calling the suggestfield web service
 */
class SuggestFieldWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets suggestions for the passed text for a set of fields and in the context of the passed query
     *
     * @param text The text to match
     * @param fields The fields for which to return suggestions
     * @param query The query context
     */
    get(text, fields, query) {
        if (!fields) {
            return of([]);
        }
        else {
            if (!Utils.isArray(fields)) {
                fields = [fields];
            }
            const observable = this.httpClient.post(this.makeUrl("suggestfield"), {
                app: this.appName,
                text: text,
                fields: fields,
                query: query
            }).pipe(map((value) => {
                value.suggests.forEach(value => value.display = Utils.toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                return value.suggests;
            }));
            return observable;
        }
    }
}
SuggestFieldWebService.ɵfac = function SuggestFieldWebService_Factory(t) { return new (t || SuggestFieldWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
SuggestFieldWebService.ɵprov = ɵɵdefineInjectable({ token: SuggestFieldWebService, factory: SuggestFieldWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SuggestFieldWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the suggestquery web service
 */
class SuggestQueryWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets suggestions for the passed text for a set of fields using the passed suggestquery web service
     *
     * @param suggestQuery The name of the suggestquery web service to use
     * @param text The text to match
     * @param query The name of the current query
     * @param fields The fields for which to return suggestions
     */
    get(suggestQuery, text, query, fields) {
        if (!suggestQuery) {
            return of([]);
        }
        else {
            const observable = this.httpClient.post(this.makeUrl("suggestquery"), {
                app: this.appName,
                suggestQuery: suggestQuery,
                text: text,
                query: query,
                kinds: fields
            });
            return observable.pipe(map(value => value.suggests));
        }
    }
}
SuggestQueryWebService.ɵfac = function SuggestQueryWebService_Factory(t) { return new (t || SuggestQueryWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
SuggestQueryWebService.ɵprov = ɵɵdefineInjectable({ token: SuggestQueryWebService, factory: SuggestQueryWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SuggestQueryWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the ratings web service
 */
class UserRatingsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Gets the current user rating for a document
     *
     * @param docid The id of a document for which to get the rating
     * @param config The ratings configuration
     */
    getRating(docid, config) {
        return this.httpClient.post(this.makeUrl("ratings"), {
            action: "get",
            docid,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution
        }).pipe(tap(r => { }, error => console.log("ratingsService.getRating failure - error: ", error)));
    }
    /**
     * Sets the current user rating for a document
     *
     * @param record The document for which to set the rating
     * @param rating A rating value
     * @param config The ratings configuration
     */
    setRating(record, rating, config) {
        const ratingResponse = this.getRecordRating(record, config);
        const observable = this.httpClient.post(this.makeUrl("ratings"), {
            action: "set",
            docid: record.id,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution,
            updatedocweight: config.updateDocWeight,
            rating,
            $auditRecord: {
                auditEvents: [
                    {
                        type: "Rating_Set" /* Rating_Set */,
                        detail: {
                            "doc-id": record.id,
                            ratingnum: rating,
                            value: ratingResponse.rating,
                            average: ratingResponse.averagerating
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "addRating",
                        documentIds: record.id
                    }
                ]
            }
        });
        observable.subscribe(response => response, error => console.log("ratingsService.setRating failure - error: ", error));
        return observable;
    }
    /**
     * Delete a rating for a document
     *
     * @param record The document for which to delete the rating
     * @param config The ratings configuration
     */
    deleteRating(record, config) {
        const ratingResponse = this.getRecordRating(record, config);
        const observable = this.httpClient.post(this.makeUrl("ratings"), {
            action: "delete",
            docid: record.id,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution,
            updatedocweight: config.updateDocWeight,
            $auditRecord: {
                auditEvents: [
                    {
                        type: "Rating_Delete" /* Rating_Delete */,
                        detail: {
                            "doc-id": record.id,
                            value: ratingResponse.rating,
                            average: ratingResponse.averagerating
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "removeRating",
                        documentIds: record.id
                    }
                ]
            }
        });
        observable.subscribe(response => response, error => console.log("ratingsService.deleteRating failure - error: ", error));
        return observable;
    }
    /**
     * Gets user rating information from the given record
     *
     * @param record The record for which to get the rating
     * @param config The ratings configuration
     */
    getRecordRating(record, config) {
        return {
            rating: this.parseUserRating(record[config.ratingsColumn], config),
            averagerating: this.parseAverageRating(record[config.averageColumn], config)
        };
    }
    parseAverageRating(columnEntries, config) {
        if (config.ratingsDistribution && columnEntries) {
            return config.ratingsDistribution.indexOf(columnEntries[0]);
        }
        else {
            return -1;
        }
    }
    parseUserRating(ratingValues, config) {
        if (ratingValues) {
            if (config.ratingsDistribution) {
                return config.ratingsDistribution.indexOf(ratingValues[0]);
            }
        }
        return -1;
    }
}
UserRatingsWebService.ɵfac = function UserRatingsWebService_Factory(t) { return new (t || UserRatingsWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
UserRatingsWebService.ɵprov = ɵɵdefineInjectable({ token: UserRatingsWebService, factory: UserRatingsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(UserRatingsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the usersettings web service
 */
class UserSettingsWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this._events = new Subject();
        this.timezone = jstz.determine().name(); // until momentjs gets this
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * The observable events emitted by this service
     */
    get events() {
        return this._events;
    }
    /**
     * Gets the current {@link UserSettings}
     */
    get userSettings() {
        return this._userSettings;
    }
    /**
     * Sets the current {@link UserSettings} and issues the "changed" event
     */
    set userSettings(value) {
        this._userSettings = value;
        this._events.next({ type: "changed" });
    }
    //TODO remove
    /**
     * @deprecated use "userSettings" get property to retrieve the user settings
     * @returns User settings object or undefined
     */
    getUserSettings() {
        return this.userSettings;
    }
    /**
     * Load the user settings for the currently logged in user.
     * Sets the userSettings member and issues the "changed" event
     */
    load() {
        const observable = this.httpClient.get(this.makeUrl("usersettings"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable, (response) => {
            this.userSettings = response;
            if (this.userSettings) {
                if (this.reviver) {
                    this.reviver(this.userSettings);
                }
            }
        }, (error) => {
            console.log("userSettingsService.load failure - error: ", error);
        });
        return observable;
    }
    /**
     * Saves the current user settings on the server
     *
     * @param auditEvents
     */
    save(auditEvents) {
        const observable = this.httpClient.post(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "save",
            userSettings: this.userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable, (response) => response, (error) => {
            console.log("userSettingsService.save failure - error: ", error);
        });
        return observable;
    }
    /**
     * Patches the user settings on the server using a partial user settings object. The partial
     * object is used to update the user settings on the server according to [RFC7396]{@link https://tools.ietf.org/html/rfc7396}
     *
     * @param userSettings The partial user settings
     * @param auditEvents Any associated audit events to store on the server
     */
    patch(userSettings, auditEvents) {
        const observable = this.httpClient.post(this.makeUrl("usersettings"), {
            app: this.appName,
            action: "patch",
            userSettings: userSettings,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable, (response) => response, (error) => {
            console.log("userSettingsService.patch failure - error: ", error);
        });
        return observable;
    }
    /**
     * Resets User Settings (emits a change event and audit events).
     */
    reset() {
        // Save current state
        const currentState = this.userSettings;
        // Reset User settings (and emit an event!)
        this.userSettings = {};
        const observable = this.save({
            type: 'UserSettings_Reset'
        });
        observable.subscribe({
            next: () => { },
            error: () => this.userSettings = currentState // Restore previous state
        });
        return observable;
    }
    /**
     * Reads a user setting.
     *
     * @param paths The path to the setting in the JSON.
     */
    readUserSetting(paths) {
        let json = this.userSettings;
        if (json) {
            for (const path of paths) {
                json = json[path];
                if (!json) {
                    // Value does not exist yet
                    return undefined;
                }
            }
        }
        return json;
    }
}
UserSettingsWebService.ɵfac = function UserSettingsWebService_Factory(t) { return new (t || UserSettingsWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
UserSettingsWebService.ɵprov = ɵɵdefineInjectable({ token: UserSettingsWebService, factory: UserSettingsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(UserSettingsWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

/**
 * A service for calling the queryintent web service
 */
class QueryIntentWebService extends HttpService {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this.endpoint = "queryintent";
    }
    getQueryIntent(query) {
        const data = {
            query,
            app: this.appName
        };
        return this.httpClient.post(this.makeUrl(this.endpoint), data);
    }
}
QueryIntentWebService.ɵfac = function QueryIntentWebService_Factory(t) { return new (t || QueryIntentWebService)(ɵɵinject(START_CONFIG), ɵɵinject(SqHttpClient)); };
QueryIntentWebService.ɵprov = ɵɵdefineInjectable({ token: QueryIntentWebService, factory: QueryIntentWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(QueryIntentWebService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: SqHttpClient }]; }, null); })();

const WEB_SERVICES_MODULE_PROVIDERS = [];

// Used to ensure that the StartConfigWebService is instantiated
function StartConfigInitializer(startConfigWebService) {
    const init = () => Promise.resolve();
    return init;
}
/**
 * This module implements client services for the Sinequa web service APIs
 */
// @dynamic
class WebServicesModule {
    /**
     * Configures the module with a start configuration
     *
     * @param startConfig The start configuration object
     *
     * @returns The configured module
     */
    static forRoot(startConfig) {
        return {
            ngModule: WebServicesModule,
            providers: [
                // Provide START_CONFIG
                { provide: START_CONFIG, useValue: startConfig },
            ]
        };
    }
}
WebServicesModule.ɵmod = ɵɵdefineNgModule({ type: WebServicesModule });
WebServicesModule.ɵinj = ɵɵdefineInjector({ factory: function WebServicesModule_Factory(t) { return new (t || WebServicesModule)(); }, providers: [
        // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
        { provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true },
        ...WEB_SERVICES_MODULE_PROVIDERS
    ], imports: [[
            CommonModule,
            HttpClientModule,
            BaseModule,
            IntlModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(WebServicesModule, { imports: [CommonModule,
        HttpClientModule,
        BaseModule,
        IntlModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(WebServicesModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    HttpClientModule,
                    BaseModule,
                    IntlModule
                ],
                declarations: [],
                exports: [],
                providers: [
                    // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
                    { provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true },
                    ...WEB_SERVICES_MODULE_PROVIDERS
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { AppWebService, AuditWebService, DatasetWebService, DidYouMeanKind, DownloadWebService, ExportOutputFormat, ExportSourceType, HttpService, JsonMethodPluginService, LabelsWebService, MINIMUM_COMPATIBLE_SERVER_API_VERSION, PreviewWebService, PrincipalWebService, QueryExportWebService, QueryIntentWebService, QueryWebService, RFMDisplay, RecentQueries, RecentQueriesList, RecentQueriesWebService, RfmWebService, START_CONFIG, SimilarDocumentsWebService, SponsoredLinksWebService, SqHttpClient, StartConfigInitializer, StartConfigWebService, SuggestFieldWebService, SuggestQueryWebService, UserRatingsWebService, UserSettingsWebService, WebServicesModule };
//# sourceMappingURL=sinequa-core-web-services.js.map
