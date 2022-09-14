(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@sinequa/core/base'), require('rxjs'), require('atomicjs'), require('@angular/common/http'), require('rxjs/operators'), require('@sinequa/core/intl'), require('jstz'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/web-services', ['exports', '@angular/core', '@sinequa/core/base', 'rxjs', 'atomicjs', '@angular/common/http', 'rxjs/operators', '@sinequa/core/intl', 'jstz', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core['web-services'] = {}), global.ng.core, global.sinequa.core.base, global.rxjs, global.atomic, global.ng.common.http, global.rxjs.operators, global.sinequa.core.intl, global.jstz, global.ng.common));
}(this, (function (exports, i0, base, rxjs, atomic, i1, operators, i2, jstz, common) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var atomic__default = /*#__PURE__*/_interopDefaultLegacy(atomic);
    var jstz__default = /*#__PURE__*/_interopDefaultLegacy(jstz);

    /**
     * Enum representing supported export source.
     */
    (function (ExportSourceType) {
        ExportSourceType[ExportSourceType["None"] = 0] = "None";
        ExportSourceType[ExportSourceType["Result"] = 1] = "Result";
        ExportSourceType[ExportSourceType["Selection"] = 2] = "Selection";
        ExportSourceType[ExportSourceType["SavedQuery"] = 4] = "SavedQuery";
    })(exports.ExportSourceType || (exports.ExportSourceType = {}));
    (function (ExportOutputFormat) {
        ExportOutputFormat[ExportOutputFormat["None"] = 0] = "None";
        ExportOutputFormat[ExportOutputFormat["Csv"] = 1] = "Csv";
        ExportOutputFormat[ExportOutputFormat["Xlsx"] = 2] = "Xlsx";
        ExportOutputFormat[ExportOutputFormat["Json"] = 4] = "Json";
    })(exports.ExportOutputFormat || (exports.ExportOutputFormat = {}));
    /**
     * The minimum server api version that compatible with this version of SBA.
     */
    var MINIMUM_COMPATIBLE_SERVER_API_VERSION = '1.0';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * A base helper class for web services. It holds the {@link StartConfig} for the app
     */
    var HttpService = /** @class */ (function () {
        /**
         * Constructor
         *
         * @param startConfig The start configuration
         */
        function HttpService(startConfig) {
            this.startConfig = startConfig;
        }
        Object.defineProperty(HttpService.prototype, "appName", {
            /**
             * The name of the application
             */
            get: function () {
                return this.startConfig.app;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Makes an API url by appending the api name to the api path
         * held on the {@link StartConfig}
         *
         * @param api An API name
         */
        HttpService.prototype.makeUrl = function (api) {
            return base.Utils.addUrl(this.startConfig.apiPath, api);
        };
        /**
         * Makes an Angular {@link HttpParams} object from a basic Javascript object
         *
         * @param params A map of parameter values
         */
        HttpService.prototype.makeParams = function (params) {
            return base.Utils.makeHttpParams(params);
        };
        return HttpService;
    }());

    /**
     * An {@link InjectionToken} to access the app's {@link StartConfig} instance
     */
    var START_CONFIG = new i0.InjectionToken("START_CONFIG");
    /**
     * A service to manage the initialization of the app's {@link StartConfig} instance. The service
     * is automatically instantiated by an {@link APP_INITIALIZER} in {@link WebServicesModule} and the
     * initialization is performed in the constructor.
     */
    var StartConfigWebService = /** @class */ (function () {
        /**
         * Initializes the injected {@link StartConfig} instance. Outputs an error to the
         * console if no instance is injected.
         *
         * @param startConfig The start configuration instance
         */
        function StartConfigWebService(startConfig) {
            this.startConfig = startConfig;
            if (!startConfig) {
                console.error("START_CONFIG must be provided in your app module");
                return;
            }
            this.initStartConfig();
        }
        StartConfigWebService.prototype.getDefaultStartConfig = function () {
            var startConfig = {};
            var browserUrl = base.Utils.makeURL(window.location.href);
            var parts = base.Utils.split(browserUrl.pathname, "/");
            var appSpecifierIndex = parts.findIndex(function (value) { return base.Utils.eqNCN(value, "app", "app-debug"); });
            if (appSpecifierIndex !== -1 && appSpecifierIndex < parts.length - 1) {
                var appSpecifier = parts[appSpecifierIndex];
                startConfig.app = parts[appSpecifierIndex + 1];
                startConfig.production = appSpecifier === "app" ? true : false;
                parts = parts.slice(0, appSpecifierIndex);
            }
            startConfig.url = base.Utils.addUrl.apply(base.Utils, __spread([browserUrl.origin], parts));
            return startConfig;
        };
        StartConfigWebService.prototype.initStartConfig = function () {
            var defaultStartConfig = this.getDefaultStartConfig();
            var initialStartConfig = base.Utils.copy(this.startConfig);
            base.Utils.extend(this.startConfig, defaultStartConfig, initialStartConfig);
            var browserUrl = base.Utils.makeURL(window.location.href);
            var url = base.Utils.makeURL(this.startConfig.url);
            var apiPath = base.Utils.addUrl(url.pathname, StartConfigWebService.API_PATH);
            var applicationPath = url.pathname;
            var corsActive = url.origin !== browserUrl.origin;
            if (corsActive) {
                apiPath = base.Utils.addUrl(url.origin, apiPath);
                applicationPath = base.Utils.addUrl(url.origin, applicationPath);
            }
            this.startConfig.origin = url.origin;
            this.startConfig.applicationPath = applicationPath;
            this.startConfig.apiPath = apiPath;
            this.startConfig.corsActive = corsActive;
            this.startConfig.browserUrl = base.Utils.addUrl(browserUrl.origin, browserUrl.pathname);
        };
        /**
         * Fetches pre-login app configuration from the Sinequa server and merges it
         * into the start config instance
         *
         * @returns An observable of the start config after being merged with the pre-login app configuration
         */
        StartConfigWebService.prototype.fetchPreLoginAppConfig = function () {
            var _this = this;
            return rxjs.Observable.create(function (observer) {
                var _url = base.Utils.addUrl(_this.startConfig.apiPath, "app");
                _url = base.Utils.addSearchParams(_url, {
                    app: _this.startConfig.app,
                    preLogin: true
                });
                atomic__default['default'](_url, {
                    headers: {
                        "sinequa-force-camel-case": true
                    }
                })
                    .then(function (response) {
                    var initialStartConfig = base.Utils.copy(_this.startConfig);
                    base.Utils.extend(_this.startConfig, response.data, initialStartConfig);
                    var versionDate = _this.startConfig.versionDate;
                    if (base.Utils.isString(versionDate)) { // it will be
                        _this.startConfig.versionDate = base.Utils.fromSysDateStr(versionDate);
                    }
                    observer.next(_this.startConfig);
                    observer.complete();
                })
                    .catch(function (error) {
                    console.error("Error retrieving app config");
                    observer.error(error);
                });
            });
        };
        /**
         * Retrieves Sinequa server configuration from a web server hosting the app
         *
         * @param url A URL to a JSON file containing the Sinequa server configuration
         *
         * @returns An observable of the Sinequa server configuration
         */
        StartConfigWebService.prototype.fetchServerConfig = function (url) {
            return rxjs.Observable.create(function (observer) {
                if (!url) {
                    var _url = base.Utils.makeURL(window.location.href);
                    url = base.Utils.addUrl(_url.pathname, "sinequa-config.json");
                }
                atomic__default['default'](url)
                    .then(function (response) {
                    // If the config file is empty or not valid json we'll most likely get a string for data
                    var serverConfig = response.data;
                    if (!base.Utils.isObject(serverConfig)) {
                        console.warn("invalid sinequa-config.json file");
                        serverConfig = {};
                    }
                    observer.next(serverConfig);
                    observer.complete();
                })
                    .catch(function (error) {
                    console.log("sinequa-config.json not found");
                    observer.next({});
                    observer.complete();
                });
            });
        };
        return StartConfigWebService;
    }());
    StartConfigWebService.API_PATH = "/api/v1";
    StartConfigWebService.ɵfac = function StartConfigWebService_Factory(t) { return new (t || StartConfigWebService)(i0.ɵɵinject(START_CONFIG, 8)); };
    StartConfigWebService.ɵprov = i0.ɵɵdefineInjectable({ token: StartConfigWebService, factory: StartConfigWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(StartConfigWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }];
        }, null);
    })();

    /**
     * A helper service that overrides the standard Angular [HttpClient]{@link https://angular.io/api/common/http/HttpClient}
     * to prevent multiple subscribers from causing multiple requests to be issued and to mitigate against request flooding
     */
    var SqHttpClient = /** @class */ (function (_super) {
        __extends(SqHttpClient, _super);
        function SqHttpClient(httpHandler) {
            var _this = _super.call(this, httpHandler) || this;
            _this.responseCache = new Map();
            return _this;
        }
        SqHttpClient.prototype.getRequestHash = function (first, url, options) {
            if (options === void 0) { options = {}; }
            // The replacer ensures that object keys are always serialized in the same order
            var strRequest = JSON.stringify([first, url, options], function (key, value) {
                if (base.Utils.isObject(value) && !base.Utils.isIterable(value)) {
                    return Object.keys(value).sort().reduce(function (s, k) {
                        s[k] = value[k];
                        return s;
                    }, {});
                }
                else {
                    return value;
                }
            });
            return base.Utils.sha256(strRequest);
        };
        /**
         * Overrides the standard `HttpClient.request` method to change its behavior as follows:
         * * pipes the observable to the share operator so that only a single request is issued even if there are multiple subscribers
         * * to mitigate request flooding, a cache of pending response observables keyed by the request thumbprint is maintained.
         * An observable from the cache is returned if the incoming request is identical to one in the cache
         */
        SqHttpClient.prototype.request = function (first, url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var requestHash = this.getRequestHash(first, url, options);
            var observable = this.responseCache.get(requestHash);
            if (!observable) {
                observable = _super.prototype.request.call(this, first, url, options)
                    .pipe(operators.share())
                    .pipe(operators.tap(function () { return _this.responseCache.delete(requestHash); }));
                this.responseCache.set(requestHash, observable);
            }
            return observable;
        };
        return SqHttpClient;
    }(i1.HttpClient));
    SqHttpClient.ɵfac = function SqHttpClient_Factory(t) { return new (t || SqHttpClient)(i0.ɵɵinject(i1.HttpHandler)); };
    SqHttpClient.ɵprov = i0.ɵɵdefineInjectable({ token: SqHttpClient, factory: SqHttpClient.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SqHttpClient, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () { return [{ type: i1.HttpHandler }]; }, null);
    })();

    /**
     * This service provides methods to retrieve and refresh the configuration of an app
     */
    var AppWebService = /** @class */ (function (_super) {
        __extends(AppWebService, _super);
        /**
         * Constructor
         *
         * @param startConfig Provides the app name
         * @param httpClient The HTTP client
         */
        function AppWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            if (!_this.appName) {
                console.error("Missing app name!");
            }
            return _this;
        }
        /**
         * Gets the app configuration for the app name
         *
         * @returns An observable of the app configuration
         */
        AppWebService.prototype.get = function () {
            var observable = this.httpClient.get(this.makeUrl("app"), {
                params: this.makeParams({
                    app: this.appName || ""
                })
            });
            observable
                .subscribe(function (response) {
                //console.log("appWebService.get success - data: ", response);
                return response;
            }, function (error) {
                //console.log("appWebService.get failure - reason: ", error);
            });
            return observable;
        };
        /**
         * Refreshes the app configuration based on a version identifier
         *
         * @param appVersionId The current app version id [CCApp.versionId]{@link CCApp#versionId}
         * @param auditEvents Audit events to be recorded for this call
         *
         * @returns An observable of an object containing a flag indicating whether the configuration was up to date. If false
         * then the app member of the object will be set to the new version of the configuration.
         */
        AppWebService.prototype.refresh = function (appVersionId, auditEvents) {
            var observable = this.httpClient.get(this.makeUrl("app"), {
                params: this.makeParams({
                    app: this.appName || "",
                    versionId: appVersionId,
                    $auditRecord: auditEvents
                })
            });
            observable
                .subscribe(function (response) {
                //console.log("appWebService.refresh success - data: ", response);
                return response;
            }, function (error) {
                //console.log("appWebService.refresh failure - reason: ", error);
            });
            return observable;
        };
        return AppWebService;
    }(HttpService));
    AppWebService.ɵfac = function AppWebService_Factory(t) { return new (t || AppWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    AppWebService.ɵprov = i0.ɵɵdefineInjectable({ token: AppWebService, factory: AppWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AppWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service to notify the audit manager on the Sinequa server of client-side events
     */
    var AuditWebService = /** @class */ (function (_super) {
        __extends(AuditWebService, _super);
        function AuditWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Notify the Sinequa server of a sponsored link event
         *
         * @param evt The audit event type
         * @param sl The sponsored link
         * @param resultId The id of the results that showed the sponsored link
         * @param parameters Additional information
         */
        AuditWebService.prototype.notifySponsoredLink = function (evt, sl, resultId, parameters) {
            var detail = {
                "link-id": sl.id,
                rank: sl.rank || 0,
                title: sl.title,
                url: sl.url,
                "result-id": resultId
            };
            if (parameters) {
                Object.keys(parameters).forEach(function (key) { return detail[key] = parameters[key]; });
            }
            var data = {
                type: evt,
                detail: detail
            };
            return this.notify(data);
        };
        /**
         * Notify the Sinequa server of a document event
         *
         * @param evt The audit event type
         * @param doc The document (record) in question
         * @param resultsOrId The results or resultid that contain the document
         * @param parameters Additional parameters
         * @param rfmParameters Additional RFM parameters
         */
        AuditWebService.prototype.notifyDocument = function (evt, doc, resultsOrId, parameters, rfmParameters) {
            var resultId;
            var results;
            if (base.Utils.isString(resultsOrId)) {
                resultId = resultsOrId;
            }
            else {
                results = resultsOrId;
                resultId = results ? results.id : null;
            }
            var detail = {
                app: this.appName,
                "doc-id": doc.id,
                rank: doc.rank,
                title: doc.title,
                source: base.Utils.treeFirstNode(doc.collection[0]),
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
                Object.keys(parameters).forEach(function (key) { return detail[key] = parameters[key]; });
            }
            var data = {
                type: evt,
                detail: detail
            };
            if (rfmParameters) {
                var rfmDetail_1 = {};
                Object.keys(rfmParameters).forEach(function (key) { return rfmDetail_1[key] = rfmParameters[key]; });
                data.rfmDetail = rfmDetail_1;
            }
            return this.notify(data);
        };
        /**
         * Notify the Sinequa server of a document event
         *
         * @param evt The audit event type
         * @param id The id of the document (record) in question
         * @param parameters Additional parameters
         * @param rfmParameters Additional RFM parameters
         */
        AuditWebService.prototype.notifyDocumentById = function (evt, id, parameters, rfmParameters) {
            var collection = id.substr(0, id.indexOf("|"));
            var detail = {
                app: this.appName,
                "doc-id": id,
                rank: -1,
                source: base.Utils.treeFirstNode(collection),
                collection: collection
            };
            if (parameters) {
                Object.keys(parameters).forEach(function (key) { return detail[key] = parameters[key]; });
            }
            var data = {
                type: evt,
                detail: detail
            };
            if (rfmParameters) {
                var rfmDetail_2 = {};
                Object.keys(rfmParameters).forEach(function (key) { return rfmDetail_2[key] = rfmParameters[key]; });
                data.rfmDetail = rfmDetail_2;
            }
            return this.notify(data);
        };
        /**
         * Notify logout
         */
        AuditWebService.prototype.notifyLogout = function () {
            var detail = {
                app: this.appName,
            };
            var data = {
                type: "Search_Exit_Logout" /* Search_Exit_Logout */,
                detail: detail
            };
            return this.notify(data);
        };
        /**
         * Notify the Sinequa server of a set of audit events
         *
         * @param auditEvents The audit events
         */
        AuditWebService.prototype.notify = function (auditEvents) {
            if (!this.startConfig.auditEnabled) {
                return rxjs.of(undefined);
            }
            var observable = this.httpClient.post(this.makeUrl(AuditWebService.endpoint), {
                event: "None" /* None */,
                app: this.appName,
                $auditRecord: auditEvents
            });
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("auditService.notify failure - error: ", error);
            });
            return observable;
        };
        return AuditWebService;
    }(HttpService));
    AuditWebService.endpoint = "audit.notify";
    AuditWebService.ɵfac = function AuditWebService_Factory(t) { return new (t || AuditWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    AuditWebService.ɵprov = i0.ɵɵdefineInjectable({ token: AuditWebService, factory: AuditWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuditWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service to notify the audit manager on the Sinequa server of client-side events
     */
    var DatasetWebService = /** @class */ (function (_super) {
        __extends(DatasetWebService, _super);
        function DatasetWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Return the list of queries configured in the given
         * dataset web service.
         * @param webServiceName name of the web service
         */
        DatasetWebService.prototype.list = function (webServiceName) {
            return this.httpClient.get(this.makeUrl(DatasetWebService.endpoint) + "/" + webServiceName);
        };
        /**
         * Queries the given web service.
         * @param webServiceName name of the web service
         * @param query name of the query
         * @param params parameters of the queries
         */
        DatasetWebService.prototype.get = function (webServiceName, query, parameters) {
            if (parameters === void 0) { parameters = {}; }
            var url = this.makeUrl(DatasetWebService.endpoint) + "/" + webServiceName + "/" + query;
            return this.httpClient.post(url, { parameters: parameters })
                .pipe(operators.map(function (d) { return d.datasets[query]; }));
        };
        /**
         * Queries the given web service.
         * @param webServiceName name of the web service
         * @param params parameters of the queries
         */
        DatasetWebService.prototype.getAll = function (webServiceName, parameters) {
            if (parameters === void 0) { parameters = {}; }
            var url = this.makeUrl(DatasetWebService.endpoint) + "/" + webServiceName;
            return this.httpClient.post(url, { parameters: parameters })
                .pipe(operators.map(function (d) { return d.datasets; }));
        };
        return DatasetWebService;
    }(HttpService));
    DatasetWebService.endpoint = "search.dataset";
    DatasetWebService.ɵfac = function DatasetWebService_Factory(t) { return new (t || DatasetWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    DatasetWebService.ɵprov = i0.ɵɵdefineInjectable({ token: DatasetWebService, factory: DatasetWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DatasetWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service to manage navigator downloads
     */
    var DownloadWebService = /** @class */ (function () {
        function DownloadWebService() {
        }
        /**
         * Subscribes to the given observable to trigger a download action on the navigator
         * when the observed object is ready.
         *
         * @param observable The observable to subscribe.
         * @returns The observable for chaining.
         */
        DownloadWebService.prototype.download = function (observable) {
            base.Utils.subscribe(observable, function (response) {
                var header = response.headers.get('content-disposition');
                var fileName = header ? header.split('filename=')[1].replace('"', '').replace('"', '') : "";
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    // For IE
                    window.navigator.msSaveOrOpenBlob(response.body, fileName);
                }
                else {
                    var link = document.createElement('a');
                    document.body.appendChild(link);
                    var blobUrl = window.URL.createObjectURL(response.body);
                    link.href = blobUrl;
                    link.download = fileName;
                    link.click();
                    link.remove();
                    window.URL.revokeObjectURL(blobUrl);
                }
                return response;
            });
            return observable;
        };
        return DownloadWebService;
    }());
    DownloadWebService.ɵfac = function DownloadWebService_Factory(t) { return new (t || DownloadWebService)(); };
    DownloadWebService.ɵprov = i0.ɵɵdefineInjectable({ token: DownloadWebService, factory: DownloadWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DownloadWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], null, null);
    })();

    /**
     * A generic service for invoking JsonMethod plugins
     */
    var JsonMethodPluginService = /** @class */ (function (_super) {
        __extends(JsonMethodPluginService, _super);
        function JsonMethodPluginService(httpClient, startConfig) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Call a JsonMethod plugin using an HTTP POST
         *
         * @param method The name of the JsonMethod plugin
         * @param query Parameters to pass to the plugin
         * @param options HTTP options for the request
         * @returns An observable of the plugin's return value
         */
        JsonMethodPluginService.prototype.post = function (method, query, options) {
            if (!base.Utils.isObject(query)) {
                return rxjs.throwError({ error: "invalid query object" });
            }
            var observable = this.httpClient.post(this.makeUrl(method), query, options);
            base.Utils.subscribe(observable, function (response) {
                console.log("JsonMethodPluginService.post success - data: ", response);
            }, function (error) {
                console.log("JsonMethodPluginService.post failure - error: ", error);
            }, function () {
                console.log("JsonMethodPluginService.post complete");
            });
            return observable;
        };
        /**
         * Call a JsonMethod plugin using an HTTP POST
         *
         * @param method The name of the JsonMethod plugin
         * @param query Parameters to pass to the plugin
         * @param options HTTP options for the request
         * @returns An observable of the plugin's return value
         */
        JsonMethodPluginService.prototype.call = function (method, query, options) {
            return this.post(method, query, options);
        };
        /**
         * Call a JsonMethod plugin using an HTTP GET
         *
         * @param method The name of the JsonMethod plugin
         * @param query Parameters to pass to the plugin
         * @param options HTTP options for the request
         * @returns An observable of the plugin's return value
         */
        JsonMethodPluginService.prototype.get = function (method, query, options) {
            var observable = this.httpClient.get(this.makeUrl(method), Object.assign({ params: this.makeParams(query) }, options));
            base.Utils.subscribe(observable, function (response) {
                console.log("JsonMethodPluginService.get success - data: ", response);
            }, function (error) {
                console.log("JsonMethodPluginService.get failure - error: ", error);
            }, function () {
                console.log("JsonMethodPluginService.get complete");
            });
            return observable;
        };
        JsonMethodPluginService.prototype.makeUrl = function (api) {
            return _super.prototype.makeUrl.call(this, 'plugin/' + api);
        };
        return JsonMethodPluginService;
    }(HttpService));
    JsonMethodPluginService.ɵfac = function JsonMethodPluginService_Factory(t) { return new (t || JsonMethodPluginService)(i0.ɵɵinject(SqHttpClient), i0.ɵɵinject(START_CONFIG)); };
    JsonMethodPluginService.ɵprov = i0.ɵɵdefineInjectable({ token: JsonMethodPluginService, factory: JsonMethodPluginService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(JsonMethodPluginService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: SqHttpClient }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }];
        }, null);
    })();

    /**
     * A service for calling the labels web service
     */
    var LabelsWebService = /** @class */ (function (_super) {
        __extends(LabelsWebService, _super);
        function LabelsWebService(startConfig, httpClient, intlService) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this.intlService = intlService;
            return _this;
        }
        /**
         * Calls the list action of the labels web service
         *
         * @param prefix The string that the returned labels should begin with
         * @param _public Determines whether public or private labels should be returned
         */
        LabelsWebService.prototype.list = function (prefix, _public) {
            var observable = this.httpClient.get(this.makeUrl("labels"), {
                params: this.makeParams({
                    app: this.appName,
                    action: "list",
                    q: prefix,
                    public: _public,
                    locale: this.intlService.currentLocale.name,
                    localize: false
                })
            });
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.list failure - error: ", error);
            });
            return observable;
        };
        /**
         * A wrapper around the list method. The matching labels are returned as an array of strings
         *
         * @param prefix The string that the returned labels should begin with
         * @param _public Determines whether public or private labels should be returned
         */
        LabelsWebService.prototype.array = function (prefix, _public) {
            return this.list(prefix, _public)
                .pipe(operators.map(function (value) {
                return value.labels;
            }));
        };
        /**
         * Calls the getUserRights action of the labels web service
         */
        LabelsWebService.prototype.getUserRights = function () {
            var observable = this.httpClient.get(this.makeUrl('labels'), {
                params: this.makeParams({
                    app: this.appName,
                    action: 'getUserRights'
                })
            });
            base.Utils.subscribe(observable, function (response) { return response; }, function (error) { return console.log("labelsService.getUserRights failure - error: ", error); });
            return observable;
        };
        /**
         * Add labels to a set of documents
         *
         * @param labels The labels to add
         * @param ids The ids of the documents to which the labels should be added
         * @param _public Determines whether the labels are public or private
         */
        LabelsWebService.prototype.add = function (labels, ids, _public) {
            var observable = this.httpClient.post(this.makeUrl("labels"), {
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
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.add failure - error: ", error);
            });
            return observable;
        };
        /**
         * Removes labels from a set of documents
         *
         * @param labels The labels to remove
         * @param ids The ids of the documents from which the labels should be removed
         * @param _public Determines whether the labels are public or private
         */
        LabelsWebService.prototype.remove = function (labels, ids, _public) {
            var observable = this.httpClient.post(this.makeUrl("labels"), {
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
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.remove failure - error: ", error);
            });
            return observable;
        };
        /**
         * Renames a set of labels
         *
         * @param labels The labels to rename
         * @param newLabel The new name for the labels
         * @param _public Determines whether the labels are public or private
         */
        LabelsWebService.prototype.rename = function (labels, newLabel, _public) {
            var observable = this.httpClient.post(this.makeUrl("labels"), {
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
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.rename failure - error: ", error);
            });
            return observable;
        };
        /**
         * Deletes a set of labels
         *
         * @param labels The labels to be deleted
         * @param _public Determines whether the labels are public or private
         */
        LabelsWebService.prototype.delete = function (labels, _public) {
            var observable = this.httpClient.post(this.makeUrl("labels"), {
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
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.delete failure - error: ", error);
            });
            return observable;
        };
        /**
         * Adds labels to the documents identified by the passed query
         *
         * @param labels The labels to add
         * @param query The query to produce the documents to which the labels should be added
         * @param _public Determines whether the labels are public or private
         */
        LabelsWebService.prototype.bulkAdd = function (labels, query, _public) {
            var observable = this.httpClient.post(this.makeUrl("labels"), {
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
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.bulkAdd failure - error: ", error);
            });
            return observable;
        };
        /**
         * Removes labels from the documents identified by the passed query
         *
         * @param labels The labels to remove
         * @param query The query to produce the documents from which the labels should be removed
         * @param _public Determines whether the labels are public or private
         */
        LabelsWebService.prototype.bulkRemove = function (labels, query, _public) {
            var observable = this.httpClient.post(this.makeUrl("labels"), {
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
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("labelsService.bulkRemove failure - error: ", error);
            });
            return observable;
        };
        return LabelsWebService;
    }(HttpService));
    LabelsWebService.ɵfac = function LabelsWebService_Factory(t) { return new (t || LabelsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient), i0.ɵɵinject(i2.IntlService)); };
    LabelsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: LabelsWebService, factory: LabelsWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LabelsWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }, { type: i2.IntlService }];
        }, null);
    })();

    /**
     * A service for calling the preview web service
     */
    var PreviewWebService = /** @class */ (function (_super) {
        __extends(PreviewWebService, _super);
        function PreviewWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Gets {@link PreviewData} for a document in the context of a {@link IQuery}
         *
         * @param id The document id
         * @param query The query context
         * @param auditEvents Audit events to store on the server
         */
        PreviewWebService.prototype.get = function (id, query, auditEvents) {
            return this.httpClient.post(this.makeUrl("preview"), {
                app: this.appName,
                action: "get",
                id: id,
                query: query,
                browserUrl: this.startConfig.browserUrl,
                $auditRecord: auditEvents
            }).pipe(operators.shareReplay(1));
        };
        /**
         * Gets document's preview HTML content
         *
         * @param url The document preview URL
         * @returns
         */
        PreviewWebService.prototype.getHtmlPreview = function (url) {
            return this.httpClient.get(url, { responseType: "text" }).pipe(operators.catchError(function (err) { return rxjs.throwError(err); }), operators.distinctUntilChanged(), operators.shareReplay(1));
        };
        return PreviewWebService;
    }(HttpService));
    PreviewWebService.ɵfac = function PreviewWebService_Factory(t) { return new (t || PreviewWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    PreviewWebService.ɵprov = i0.ɵɵdefineInjectable({ token: PreviewWebService, factory: PreviewWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PreviewWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the principal web service
     */
    var PrincipalWebService = /** @class */ (function (_super) {
        __extends(PrincipalWebService, _super);
        function PrincipalWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this._events = new rxjs.Subject();
            return _this;
        }
        PrincipalWebService.prototype.ngOnDestroy = function () {
            this._events.complete();
        };
        Object.defineProperty(PrincipalWebService.prototype, "events", {
            /**
             * The observable events emitted by this service
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PrincipalWebService.prototype, "principal", {
            /**
             * Gets the current {@link Principal}
             */
            get: function () {
                return this._principal;
            },
            /**
             * Sets the current {@link Principal} and issues the "changed" event
             */
            set: function (value) {
                this._principal = value;
                this._events.next({ type: "changed" });
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Gets the list of user info (user or group)
         *
         * @param params query params to specify the search
         * @returns list of user info
         */
        PrincipalWebService.prototype.list = function (params) {
            return this.httpClient.get(this.makeUrl("principal/list"), {
                params: this.makeParams(Object.assign({}, params))
            });
        };
        PrincipalWebService.prototype.userId = function (userId) {
            return this.httpClient.get(this.makeUrl("principal/userId/" + userId));
        };
        PrincipalWebService.prototype.userIds = function (params) {
            return this.httpClient.post(this.makeUrl("principal/userids"), params).pipe(operators.pluck("principals"));
        };
        /**
         * Gets the principal from the server based on the current login credentials
         *
         * @param autoAuthenticate Determines whether the {@link HttpInterceptor} should perform HTTP 401 handling
         * for this request
         */
        PrincipalWebService.prototype.get = function (autoAuthenticate) {
            if (autoAuthenticate === void 0) { autoAuthenticate = true; }
            return this.httpClient.get(this.makeUrl("principal"), {
                params: this.makeParams({
                    action: "get",
                    noAutoAuthentication: !autoAuthenticate
                })
            });
        };
        /**
         * Gets the principal from the server based on the current login credentials and sets the
         * principal member
         */
        PrincipalWebService.prototype.load = function () {
            var _this = this;
            var observable = this.get();
            base.Utils.subscribe(observable, function (response) {
                _this.principal = response;
                return response;
            }, function (error) {
                console.log("principalService.get failure - error: ", error);
            });
            return observable;
        };
        return PrincipalWebService;
    }(HttpService));
    PrincipalWebService.ɵfac = function PrincipalWebService_Factory(t) { return new (t || PrincipalWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    PrincipalWebService.ɵprov = i0.ɵɵdefineInjectable({ token: PrincipalWebService, factory: PrincipalWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(PrincipalWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service to export the result of a query.
     */
    var QueryExportWebService = /** @class */ (function (_super) {
        __extends(QueryExportWebService, _super);
        function QueryExportWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        QueryExportWebService.prototype.logErrorToConsole = function (methodName, errorMessage) {
            console.log("queryExportService." + methodName + " " + errorMessage + ".");
        };
        QueryExportWebService.prototype.preliminaryCheck = function (methodName, webService, format) {
            if (!this.appName) {
                var errorMessage = 'No app';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            if (!webService) {
                var errorMessage = 'No web service';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            if (!format || format === exports.ExportOutputFormat.None) {
                var errorMessage = 'No output format';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            return undefined;
        };
        /**
         * Exports the current result.
         *
         * @param webService The configuration for the export web service.
         * @param query The query to export.
         * @param format The export format.
         * @param maxCount (Optional) The maximum number of exported rows.
         * @param exportedColumns (Optional) The columns to export, empty means all columns.
         */
        QueryExportWebService.prototype.exportResult = function (webService, query, results, format, maxCount, exportedColumns) {
            var methodName = 'exportResult';
            var preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
            if (preliminaryCheckResult) {
                return preliminaryCheckResult;
            }
            if (!query) {
                var errorMessage = 'No query';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            var postData = {
                app: this.appName,
                webService: webService,
                query: query,
                type: exports.ExportSourceType[exports.ExportSourceType.Result],
                format: exports.ExportOutputFormat[format],
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
        };
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
        QueryExportWebService.prototype.exportSelection = function (webService, query, results, selection, format, maxCount, exportedColumns) {
            var methodName = 'exportSelection';
            var preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
            if (preliminaryCheckResult) {
                return preliminaryCheckResult;
            }
            if (!query) {
                var errorMessage = 'No query';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            if (!selection || selection.length === 0) {
                var errorMessage = 'No selection';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            var postData = {
                app: this.appName,
                webService: webService,
                query: query,
                selection: selection,
                type: exports.ExportSourceType[exports.ExportSourceType.Selection],
                format: exports.ExportOutputFormat[format],
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
        };
        /**
         * Exports the result of a saved query.
         *
         * @param webService The configuration for the export web service.
         * @param queryName The query name.
         * @param format The export format.
         * @param maxCount (Optional) The maximum number of exported rows.
         * @param exportedColumns (Optional) The columns to export, empty means all columns.
         */
        QueryExportWebService.prototype.exportSavedQuery = function (webService, queryName, format, maxCount, exportedColumns) {
            var methodName = 'exportSavedQuery';
            var preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
            if (preliminaryCheckResult) {
                return preliminaryCheckResult;
            }
            if (!queryName) {
                var errorMessage = 'No saved query';
                this.logErrorToConsole(methodName, errorMessage);
                return rxjs.throwError({ error: errorMessage });
            }
            var postData = {
                app: this.appName,
                webService: webService,
                type: exports.ExportSourceType[exports.ExportSourceType.SavedQuery],
                format: exports.ExportOutputFormat[format],
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
        };
        QueryExportWebService.prototype.doExport = function (body) {
            var _this = this;
            var observable = this.httpClient.post(this.makeUrl('query.export'), body, {
                observe: 'response',
                responseType: 'blob'
            });
            base.Utils.subscribe(observable, function (response) {
                console.log('queryExportService.export success: ', _this.readBlobFileName(response));
                return response;
            }, function (error) {
                console.log('queryExportService.export failure - error: ', error);
            });
            return observable;
        };
        QueryExportWebService.prototype.readBlobFileName = function (response) {
            var header = response.headers.get('content-disposition');
            return header ? header.split('filename=')[1].replace('"', '').replace('"', '') : "";
        };
        return QueryExportWebService;
    }(HttpService));
    QueryExportWebService.ɵfac = function QueryExportWebService_Factory(t) { return new (t || QueryExportWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    QueryExportWebService.ɵprov = i0.ɵɵdefineInjectable({ token: QueryExportWebService, factory: QueryExportWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(QueryExportWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    (function (DidYouMeanKind) {
        DidYouMeanKind[DidYouMeanKind["Original"] = 0] = "Original";
        DidYouMeanKind[DidYouMeanKind["Corrected"] = 1] = "Corrected";
    })(exports.DidYouMeanKind || (exports.DidYouMeanKind = {}));
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
    })(exports.RFMDisplay || (exports.RFMDisplay = {}));
    /**
     * A service to call the query web service
     */
    var QueryWebService = /** @class */ (function (_super) {
        __extends(QueryWebService, _super);
        function QueryWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this.endPoint = "query";
            return _this;
        }
        /**
         * Get the results for the passed query
         *
         * @param query The query to execute
         * @param auditEvents Any audit events to store on the server
         * @param queryIntentData Any accompanying query intent data
         */
        QueryWebService.prototype.getResults = function (query, auditEvents, queryIntentData) {
            if (!query) {
                return rxjs.throwError({ error: "no query" });
            }
            var observable = this.httpClient.post(this.makeUrl(this.endPoint), {
                app: this.appName,
                query: query,
                $auditRecord: auditEvents,
                queryIntentData: queryIntentData
            });
            base.Utils.subscribe(observable, function (response) {
                console.log("queryService.getResults success - data: ", response);
                return response;
            }, function (error) {
                console.log("queryService.getResults failure - error: ", error);
            });
            return observable;
        };
        /**
         * Get the results for a set of queries
         *
         * @param queries The queries to execute
         * @param auditEvents Any audit events to store on the server
         */
        QueryWebService.prototype.getMultipleResults = function (queries, auditEvents) {
            var e_1, _a;
            if (!queries || queries.length === 0) {
                return rxjs.throwError({ error: "no queries" });
            }
            var data = {
                methods: [],
                propagateErrors: true,
                $auditRecord: auditEvents
            };
            try {
                for (var queries_1 = __values(queries), queries_1_1 = queries_1.next(); !queries_1_1.done; queries_1_1 = queries_1.next()) {
                    var query = queries_1_1.value;
                    data.methods.push({
                        method: this.endPoint,
                        app: this.appName,
                        query: query
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (queries_1_1 && !queries_1_1.done && (_a = queries_1.return)) _a.call(queries_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this.httpClient.post(this.makeUrl("multi"), data);
        };
        return QueryWebService;
    }(HttpService));
    QueryWebService.ɵfac = function QueryWebService_Factory(t) { return new (t || QueryWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    QueryWebService.ɵprov = i0.ɵɵdefineInjectable({ token: QueryWebService, factory: QueryWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(QueryWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    var RecentQueriesList = /** @class */ (function () {
        function RecentQueriesList(name) {
            this.name = name;
            this.queries = []; // Make sure to have at least a valid "queries" member, to simplify tests in GUI code.
        }
        return RecentQueriesList;
    }());
    var RecentQueries = /** @class */ (function () {
        function RecentQueries() {
        }
        return RecentQueries;
    }());
    var RecentQueriesWebService = /** @class */ (function (_super) {
        __extends(RecentQueriesWebService, _super);
        function RecentQueriesWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        RecentQueriesWebService.prototype.load = function () {
            var _this = this;
            var observable = this.httpClient.get(this.makeUrl("recentqueries"), {
                params: this.makeParams({
                    app: this.appName,
                    action: "load"
                })
            });
            base.Utils.subscribe(observable, function (response) {
                _this.recentQueries = response;
                if (!_this.recentQueries)
                    _this.recentQueries = new RecentQueries();
                if (_this.recentQueries) {
                    if (!_this.recentQueries.app)
                        _this.recentQueries.app = new RecentQueriesList(_this.appName);
                    if (!_this.recentQueries.user)
                        _this.recentQueries.user = new RecentQueriesList("currentuser");
                }
                console.log("recentQueriesService.load success - data: ", response);
                return response;
            }, function (error) {
                console.log("recentQueriesService.load failure - error: ", error);
            });
            return observable;
        };
        // No save/patch action for the recent queries: MRU lists are generated server side when the query is executed.
        RecentQueriesWebService.prototype.appRecentQueries = function () {
            if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
                return this.recentQueries.app.queries;
            else {
                return [];
            }
        };
        RecentQueriesWebService.prototype.appRecentQueriesLength = function () {
            if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
                return this.recentQueries.app.queries.length;
            else
                return 0;
        };
        RecentQueriesWebService.prototype.userRecentQueries = function () {
            if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
                return this.recentQueries.user.queries;
            else {
                return [];
            }
        };
        RecentQueriesWebService.prototype.userRecentQueriesLength = function () {
            if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
                return this.recentQueries.user.queries.length;
            else
                return 0;
        };
        return RecentQueriesWebService;
    }(HttpService));
    RecentQueriesWebService.ɵfac = function RecentQueriesWebService_Factory(t) { return new (t || RecentQueriesWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    RecentQueriesWebService.ɵprov = i0.ɵɵdefineInjectable({ token: RecentQueriesWebService, factory: RecentQueriesWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RecentQueriesWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the search.rfm web service
     */
    var RfmWebService = /** @class */ (function (_super) {
        __extends(RfmWebService, _super);
        function RfmWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Get RFM data for a set of results
         *
         * @param rfm The name of the RFM
         * @param results The results for which to retrieve RFM data
         */
        RfmWebService.prototype.getRfmData = function (rfm, results) {
            var e_1, _a;
            var ids = [];
            try {
                for (var _b = __values(results.records), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var record = _c.value;
                    if (!!record.flags && record.flags.indexOf("r") !== -1) {
                        ids.push(record.id);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (ids.length === 0) {
                return rxjs.EMPTY;
            }
            var data = {
                rfm: rfm,
                queryHash: results.rfmQueryHash,
                ids: ids
            };
            var observable = this.httpClient.post(this.makeUrl(RfmWebService.endpoint), data);
            base.Utils.subscribe(observable, function (response) {
                return response;
            }, function (error) {
                console.log("rfmService.getRfmData failure - error: ", error);
            });
            return observable;
        };
        return RfmWebService;
    }(HttpService));
    RfmWebService.endpoint = "search.rfm";
    RfmWebService.ɵfac = function RfmWebService_Factory(t) { return new (t || RfmWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    RfmWebService.ɵprov = i0.ɵɵdefineInjectable({ token: RfmWebService, factory: RfmWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(RfmWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the similardocuments web service
     */
    var SimilarDocumentsWebService = /** @class */ (function (_super) {
        __extends(SimilarDocumentsWebService, _super);
        function SimilarDocumentsWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Gets an array of documents (records) similar to the passed document
         *
         * @param sourceDocumentId The id of the document for which to retrieve similar documents
         * @param queryName The name of the query
         */
        SimilarDocumentsWebService.prototype.get = function (sourceDocumentId, queryName) {
            return this.httpClient.post(this.makeUrl("similardocuments"), {
                app: this.appName,
                sourceDocumentId: sourceDocumentId,
                query: {
                    name: queryName
                }
            }).pipe(operators.map(function (response) { return response.data; }));
        };
        return SimilarDocumentsWebService;
    }(HttpService));
    SimilarDocumentsWebService.ɵfac = function SimilarDocumentsWebService_Factory(t) { return new (t || SimilarDocumentsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    SimilarDocumentsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SimilarDocumentsWebService, factory: SimilarDocumentsWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SimilarDocumentsWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the query.links web service.
     */
    var SponsoredLinksWebService = /** @class */ (function (_super) {
        __extends(SponsoredLinksWebService, _super);
        function SponsoredLinksWebService(startConfig, httpClient, intlService) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this.intlService = intlService;
            return _this;
        }
        /**
         * Queries the server for sponsored links.
         *
         * @param query The query information.
         * @param webService The web service configuration.
         */
        SponsoredLinksWebService.prototype.getLinks = function (query, webService) {
            if (!query) {
                return rxjs.throwError({ error: "no query" });
            }
            var url = this.makeUrl("query.links");
            var observable = this.httpClient.post(url, {
                app: this.appName,
                webservice: webService,
                query: query,
                locale: this.intlService.currentLocale.name
            });
            base.Utils.subscribe(observable, function (response) {
                console.log("SponsoredLinksService.getLinks success - data: ", response);
                return response;
            }, function (error) {
                console.log("SponsoredLinksService.getLinks failure - error: ", error);
            });
            return observable;
        };
        return SponsoredLinksWebService;
    }(HttpService));
    SponsoredLinksWebService.ɵfac = function SponsoredLinksWebService_Factory(t) { return new (t || SponsoredLinksWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient), i0.ɵɵinject(i2.IntlService)); };
    SponsoredLinksWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SponsoredLinksWebService, factory: SponsoredLinksWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SponsoredLinksWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }, { type: i2.IntlService }];
        }, null);
    })();

    /**
     * A service for calling the suggestfield web service
     */
    var SuggestFieldWebService = /** @class */ (function (_super) {
        __extends(SuggestFieldWebService, _super);
        function SuggestFieldWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Gets suggestions for the passed text for a set of fields and in the context of the passed query
         *
         * @param text The text to match
         * @param fields The fields for which to return suggestions
         * @param query The query context
         */
        SuggestFieldWebService.prototype.get = function (text, fields, query) {
            if (!fields) {
                return rxjs.of([]);
            }
            else {
                if (!base.Utils.isArray(fields)) {
                    fields = [fields];
                }
                var observable = this.httpClient.post(this.makeUrl("suggestfield"), {
                    app: this.appName,
                    text: text,
                    fields: fields,
                    query: query
                }).pipe(operators.map(function (value) {
                    value.suggests.forEach(function (value) { return value.display = base.Utils.toSqlValue(value.display); }); // because dates get automatically converted by the interceptor
                    return value.suggests;
                }));
                return observable;
            }
        };
        return SuggestFieldWebService;
    }(HttpService));
    SuggestFieldWebService.ɵfac = function SuggestFieldWebService_Factory(t) { return new (t || SuggestFieldWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    SuggestFieldWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SuggestFieldWebService, factory: SuggestFieldWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SuggestFieldWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the suggestquery web service
     */
    var SuggestQueryWebService = /** @class */ (function (_super) {
        __extends(SuggestQueryWebService, _super);
        function SuggestQueryWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Gets suggestions for the passed text for a set of fields using the passed suggestquery web service
         *
         * @param suggestQuery The name of the suggestquery web service to use
         * @param text The text to match
         * @param query The name of the current query
         * @param fields The fields for which to return suggestions
         */
        SuggestQueryWebService.prototype.get = function (suggestQuery, text, query, fields) {
            if (!suggestQuery) {
                return rxjs.of([]);
            }
            else {
                var observable = this.httpClient.post(this.makeUrl("suggestquery"), {
                    app: this.appName,
                    suggestQuery: suggestQuery,
                    text: text,
                    query: query,
                    kinds: fields
                });
                return observable.pipe(operators.map(function (value) { return value.suggests; }));
            }
        };
        return SuggestQueryWebService;
    }(HttpService));
    SuggestQueryWebService.ɵfac = function SuggestQueryWebService_Factory(t) { return new (t || SuggestQueryWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    SuggestQueryWebService.ɵprov = i0.ɵɵdefineInjectable({ token: SuggestQueryWebService, factory: SuggestQueryWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SuggestQueryWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the ratings web service
     */
    var UserRatingsWebService = /** @class */ (function (_super) {
        __extends(UserRatingsWebService, _super);
        function UserRatingsWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Gets the current user rating for a document
         *
         * @param docid The id of a document for which to get the rating
         * @param config The ratings configuration
         */
        UserRatingsWebService.prototype.getRating = function (docid, config) {
            return this.httpClient.post(this.makeUrl("ratings"), {
                action: "get",
                docid: docid,
                ratingscolumn: config.ratingsColumn,
                averagecolumn: config.averageColumn,
                ratingsdistribution: config.ratingsDistribution
            }).pipe(operators.tap(function (r) { }, function (error) { return console.log("ratingsService.getRating failure - error: ", error); }));
        };
        /**
         * Sets the current user rating for a document
         *
         * @param record The document for which to set the rating
         * @param rating A rating value
         * @param config The ratings configuration
         */
        UserRatingsWebService.prototype.setRating = function (record, rating, config) {
            var ratingResponse = this.getRecordRating(record, config);
            var observable = this.httpClient.post(this.makeUrl("ratings"), {
                action: "set",
                docid: record.id,
                ratingscolumn: config.ratingsColumn,
                averagecolumn: config.averageColumn,
                ratingsdistribution: config.ratingsDistribution,
                updatedocweight: config.updateDocWeight,
                rating: rating,
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
            observable.subscribe(function (response) { return response; }, function (error) { return console.log("ratingsService.setRating failure - error: ", error); });
            return observable;
        };
        /**
         * Delete a rating for a document
         *
         * @param record The document for which to delete the rating
         * @param config The ratings configuration
         */
        UserRatingsWebService.prototype.deleteRating = function (record, config) {
            var ratingResponse = this.getRecordRating(record, config);
            var observable = this.httpClient.post(this.makeUrl("ratings"), {
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
            observable.subscribe(function (response) { return response; }, function (error) { return console.log("ratingsService.deleteRating failure - error: ", error); });
            return observable;
        };
        /**
         * Gets user rating information from the given record
         *
         * @param record The record for which to get the rating
         * @param config The ratings configuration
         */
        UserRatingsWebService.prototype.getRecordRating = function (record, config) {
            return {
                rating: this.parseUserRating(record[config.ratingsColumn], config),
                averagerating: this.parseAverageRating(record[config.averageColumn], config)
            };
        };
        UserRatingsWebService.prototype.parseAverageRating = function (columnEntries, config) {
            if (config.ratingsDistribution && columnEntries) {
                return config.ratingsDistribution.indexOf(columnEntries[0]);
            }
            else {
                return -1;
            }
        };
        UserRatingsWebService.prototype.parseUserRating = function (ratingValues, config) {
            if (ratingValues) {
                if (config.ratingsDistribution) {
                    return config.ratingsDistribution.indexOf(ratingValues[0]);
                }
            }
            return -1;
        };
        return UserRatingsWebService;
    }(HttpService));
    UserRatingsWebService.ɵfac = function UserRatingsWebService_Factory(t) { return new (t || UserRatingsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    UserRatingsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: UserRatingsWebService, factory: UserRatingsWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(UserRatingsWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the usersettings web service
     */
    var UserSettingsWebService = /** @class */ (function (_super) {
        __extends(UserSettingsWebService, _super);
        function UserSettingsWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this._events = new rxjs.Subject();
            _this.timezone = jstz__default['default'].determine().name(); // until momentjs gets this
            return _this;
        }
        UserSettingsWebService.prototype.ngOnDestroy = function () {
            this._events.complete();
        };
        Object.defineProperty(UserSettingsWebService.prototype, "events", {
            /**
             * The observable events emitted by this service
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserSettingsWebService.prototype, "userSettings", {
            /**
             * Gets the current {@link UserSettings}
             */
            get: function () {
                return this._userSettings;
            },
            /**
             * Sets the current {@link UserSettings} and issues the "changed" event
             */
            set: function (value) {
                this._userSettings = value;
                this._events.next({ type: "changed" });
            },
            enumerable: false,
            configurable: true
        });
        //TODO remove
        /**
         * @deprecated use "userSettings" get property to retrieve the user settings
         * @returns User settings object or undefined
         */
        UserSettingsWebService.prototype.getUserSettings = function () {
            return this.userSettings;
        };
        /**
         * Load the user settings for the currently logged in user.
         * Sets the userSettings member and issues the "changed" event
         */
        UserSettingsWebService.prototype.load = function () {
            var _this = this;
            var observable = this.httpClient.get(this.makeUrl("usersettings"), {
                params: this.makeParams({
                    app: this.appName,
                    action: "load"
                })
            });
            base.Utils.subscribe(observable, function (response) {
                _this.userSettings = response;
                if (_this.userSettings) {
                    if (_this.reviver) {
                        _this.reviver(_this.userSettings);
                    }
                }
            }, function (error) {
                console.log("userSettingsService.load failure - error: ", error);
            });
            return observable;
        };
        /**
         * Saves the current user settings on the server
         *
         * @param auditEvents
         */
        UserSettingsWebService.prototype.save = function (auditEvents) {
            var observable = this.httpClient.post(this.makeUrl("usersettings"), {
                app: this.appName,
                action: "save",
                userSettings: this.userSettings,
                $auditRecord: auditEvents
            });
            base.Utils.subscribe(observable, function (response) { return response; }, function (error) {
                console.log("userSettingsService.save failure - error: ", error);
            });
            return observable;
        };
        /**
         * Patches the user settings on the server using a partial user settings object. The partial
         * object is used to update the user settings on the server according to [RFC7396]{@link https://tools.ietf.org/html/rfc7396}
         *
         * @param userSettings The partial user settings
         * @param auditEvents Any associated audit events to store on the server
         */
        UserSettingsWebService.prototype.patch = function (userSettings, auditEvents) {
            var observable = this.httpClient.post(this.makeUrl("usersettings"), {
                app: this.appName,
                action: "patch",
                userSettings: userSettings,
                $auditRecord: auditEvents
            });
            base.Utils.subscribe(observable, function (response) { return response; }, function (error) {
                console.log("userSettingsService.patch failure - error: ", error);
            });
            return observable;
        };
        /**
         * Resets User Settings (emits a change event and audit events).
         */
        UserSettingsWebService.prototype.reset = function () {
            var _this = this;
            // Save current state
            var currentState = this.userSettings;
            // Reset User settings (and emit an event!)
            this.userSettings = {};
            var observable = this.save({
                type: 'UserSettings_Reset'
            });
            observable.subscribe({
                next: function () { },
                error: function () { return _this.userSettings = currentState; } // Restore previous state
            });
            return observable;
        };
        /**
         * Reads a user setting.
         *
         * @param paths The path to the setting in the JSON.
         */
        UserSettingsWebService.prototype.readUserSetting = function (paths) {
            var e_1, _a;
            var json = this.userSettings;
            if (json) {
                try {
                    for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                        var path = paths_1_1.value;
                        json = json[path];
                        if (!json) {
                            // Value does not exist yet
                            return undefined;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return json;
        };
        return UserSettingsWebService;
    }(HttpService));
    UserSettingsWebService.ɵfac = function UserSettingsWebService_Factory(t) { return new (t || UserSettingsWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    UserSettingsWebService.ɵprov = i0.ɵɵdefineInjectable({ token: UserSettingsWebService, factory: UserSettingsWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(UserSettingsWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    /**
     * A service for calling the queryintent web service
     */
    var QueryIntentWebService = /** @class */ (function (_super) {
        __extends(QueryIntentWebService, _super);
        function QueryIntentWebService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this.endpoint = "queryintent";
            return _this;
        }
        QueryIntentWebService.prototype.getQueryIntent = function (query) {
            var data = {
                query: query,
                app: this.appName
            };
            return this.httpClient.post(this.makeUrl(this.endpoint), data);
        };
        return QueryIntentWebService;
    }(HttpService));
    QueryIntentWebService.ɵfac = function QueryIntentWebService_Factory(t) { return new (t || QueryIntentWebService)(i0.ɵɵinject(START_CONFIG), i0.ɵɵinject(SqHttpClient)); };
    QueryIntentWebService.ɵprov = i0.ɵɵdefineInjectable({ token: QueryIntentWebService, factory: QueryIntentWebService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(QueryIntentWebService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [START_CONFIG]
                        }] }, { type: SqHttpClient }];
        }, null);
    })();

    var WEB_SERVICES_MODULE_PROVIDERS = [];

    // Used to ensure that the StartConfigWebService is instantiated
    function StartConfigInitializer(startConfigWebService) {
        var init = function () { return Promise.resolve(); };
        return init;
    }
    /**
     * This module implements client services for the Sinequa web service APIs
     */
    // @dynamic
    var WebServicesModule = /** @class */ (function () {
        function WebServicesModule() {
        }
        /**
         * Configures the module with a start configuration
         *
         * @param startConfig The start configuration object
         *
         * @returns The configured module
         */
        WebServicesModule.forRoot = function (startConfig) {
            return {
                ngModule: WebServicesModule,
                providers: [
                    // Provide START_CONFIG
                    { provide: START_CONFIG, useValue: startConfig },
                ]
            };
        };
        return WebServicesModule;
    }());
    WebServicesModule.ɵmod = i0.ɵɵdefineNgModule({ type: WebServicesModule });
    WebServicesModule.ɵinj = i0.ɵɵdefineInjector({ factory: function WebServicesModule_Factory(t) { return new (t || WebServicesModule)(); }, providers: __spread([
            // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
            { provide: i0.APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true }
        ], WEB_SERVICES_MODULE_PROVIDERS), imports: [[
                common.CommonModule,
                i1.HttpClientModule,
                base.BaseModule,
                i2.IntlModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WebServicesModule, { imports: [common.CommonModule,
                i1.HttpClientModule,
                base.BaseModule,
                i2.IntlModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(WebServicesModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            i1.HttpClientModule,
                            base.BaseModule,
                            i2.IntlModule
                        ],
                        declarations: [],
                        exports: [],
                        providers: __spread([
                            // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
                            { provide: i0.APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true }
                        ], WEB_SERVICES_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AppWebService = AppWebService;
    exports.AuditWebService = AuditWebService;
    exports.DatasetWebService = DatasetWebService;
    exports.DownloadWebService = DownloadWebService;
    exports.HttpService = HttpService;
    exports.JsonMethodPluginService = JsonMethodPluginService;
    exports.LabelsWebService = LabelsWebService;
    exports.MINIMUM_COMPATIBLE_SERVER_API_VERSION = MINIMUM_COMPATIBLE_SERVER_API_VERSION;
    exports.PreviewWebService = PreviewWebService;
    exports.PrincipalWebService = PrincipalWebService;
    exports.QueryExportWebService = QueryExportWebService;
    exports.QueryIntentWebService = QueryIntentWebService;
    exports.QueryWebService = QueryWebService;
    exports.RecentQueries = RecentQueries;
    exports.RecentQueriesList = RecentQueriesList;
    exports.RecentQueriesWebService = RecentQueriesWebService;
    exports.RfmWebService = RfmWebService;
    exports.START_CONFIG = START_CONFIG;
    exports.SimilarDocumentsWebService = SimilarDocumentsWebService;
    exports.SponsoredLinksWebService = SponsoredLinksWebService;
    exports.SqHttpClient = SqHttpClient;
    exports.StartConfigInitializer = StartConfigInitializer;
    exports.StartConfigWebService = StartConfigWebService;
    exports.SuggestFieldWebService = SuggestFieldWebService;
    exports.SuggestQueryWebService = SuggestQueryWebService;
    exports.UserRatingsWebService = UserRatingsWebService;
    exports.UserSettingsWebService = UserSettingsWebService;
    exports.WebServicesModule = WebServicesModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-web-services.umd.js.map
