(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@sinequa/core/web-services'), require('@sinequa/core/base'), require('ng2-ui-auth'), require('@angular/router'), require('@sinequa/core/app-utils'), require('@sinequa/core/modal'), require('@sinequa/core/notification'), require('@angular/common'), require('@angular/forms'), require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/common/http'), require('@sinequa/core/validation'), require('@sinequa/core/intl')) :
    typeof define === 'function' && define.amd ? define('@sinequa/core/login', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@sinequa/core/web-services', '@sinequa/core/base', 'ng2-ui-auth', '@angular/router', '@sinequa/core/app-utils', '@sinequa/core/modal', '@sinequa/core/notification', '@angular/common', '@angular/forms', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/common/http', '@sinequa/core/validation', '@sinequa/core/intl'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.sinequa = global.sinequa || {}, global.sinequa.core = global.sinequa.core || {}, global.sinequa.core.login = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.sinequa.core['web-services'], global.sinequa.core.base, global['ng2-ui-auth'], global.ng.router, global.sinequa.core['app-utils'], global.sinequa.core.modal, global.sinequa.core.notification, global.ng.common, global.ng.forms, global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.common.http, global.sinequa.core.validation, global.sinequa.core.intl));
}(this, (function (exports, i0, rxjs, operators, i1, base, i2, i1$1, i2$1, i4, i5, i4$1, i2$2, i3, overlay, i1$2, i6, i5$1) { 'use strict';

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
     * A service to manage JWT and CSRF tokens. The methods of this service
     * can be called before the authentication process has completed
     */
    var TokenService = /** @class */ (function (_super) {
        __extends(TokenService, _super);
        function TokenService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Retrieve the CSRF token corresponding to the current JWT cookie
         * which should accompany the request. This method is called by
         * [AuthenticationService.autoAuthenticate]{@link AuthenticationService#autoAuthenticate}
         *
         * @param notify `true` if any errors should be notified using the {@NotificationService}
         */
        TokenService.prototype.getCsrfToken = function (notify) {
            if (notify === void 0) { notify = false; }
            return this.httpClient.get(this.makeUrl("challenge"), {
                params: this.makeParams({
                    action: "getCsrfToken",
                    suppressErrors: !notify,
                    noUserOverride: true,
                    noAutoAuthentication: true,
                    noNotify: !notify
                })
            }).pipe(operators.map(function (value) {
                return value.csrfToken;
            }));
        };
        /**
         * Delete the current JWT cookie.
         * This method is called by [AuthenticationService.logout]{@link AuthenticationService#logout}
         */
        TokenService.prototype.deleteWebTokenCookie = function () {
            return this.httpClient.get(this.makeUrl("challenge"), {
                params: this.makeParams({
                    action: "deleteWebTokenCookie",
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            });
        };
        return TokenService;
    }(i1.HttpService));
    TokenService.ɵfac = function TokenService_Factory(t) { return new (t || TokenService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
    TokenService.ɵprov = i0.ɵɵdefineInjectable({ token: TokenService, factory: TokenService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(TokenService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i1.SqHttpClient }];
        }, null);
    })();

    /**
     * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
     */
    var JWTService = /** @class */ (function (_super) {
        __extends(JWTService, _super);
        function JWTService(startConfig, httpClient) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            return _this;
        }
        /**
         * Get a JWT from the Sinequa server using the passed credentials. The JWT is received in a cookie
         * and the associated CSRF token in the response payload.
         *
         * @param credentials The credentials to be used for the JWT. These are sent in clear text
         */
        JWTService.prototype.getToken = function (credentials) {
            var observable = this.httpClient.post(this.makeUrl("webToken"), {
                action: "get",
                user: credentials.userName,
                password: credentials.password,
                tokenInCookie: true,
            }, {
                params: this.makeParams({
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            });
            return observable.pipe(operators.map(function (value) {
                return value.csrfToken;
            }));
        };
        return JWTService;
    }(i1.HttpService));
    JWTService.ɵfac = function JWTService_Factory(t) { return new (t || JWTService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(i1.SqHttpClient)); };
    JWTService.ɵprov = i0.ɵɵdefineInjectable({ token: JWTService, factory: JWTService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(JWTService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i1.SqHttpClient }];
        }, null);
    })();

    var LEGACY_PROCESSED_CREDENTIALS_KIND = 0;
    /**
     * A service to authenticate a user with a Sinequa server. Authentication can be automatic (OAuth/SAML), if configured in the
     * Sinequa administration, or manual where the user name and password are entered in a modal dialog box and transmitted in
     * clear text. There is also support for the ng2-ui-auth library where the authentication process occurs in a browser popup window.
     * Successful authentication results in a JWT stored in cookie along with a CSRF token which is stored in storage so it can
     * be picked up in other browser tabs.
     *
     * The service also holds information on the status of the "override user" administrator function
     */
    var AuthenticationService = /** @class */ (function (_super) {
        __extends(AuthenticationService, _super);
        function AuthenticationService(startConfig, httpClient, tokenService, auditService, jWTService, authService) {
            var _this = _super.call(this, startConfig) || this;
            _this.httpClient = httpClient;
            _this.tokenService = tokenService;
            _this.auditService = auditService;
            _this.jWTService = jWTService;
            _this.authService = authService;
            _this.init();
            return _this;
        }
        Object.defineProperty(AuthenticationService.prototype, "userOverride", {
            /**
             * Get the currrent user override, if any
             */
            get: function () {
                return this._userOverride;
            },
            /**
             * Set/unset the user override. The {@link #userOverrideActive} flag
             * is set accordingly
             */
            set: function (value) {
                this._userOverride = value;
                if (this._userOverride) {
                    this._userOverrideActive = !!this._userOverride.userName && !!this._userOverride.domain;
                }
                else {
                    this._userOverrideActive = false;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthenticationService.prototype, "userOverrideActive", {
            /**
             * A flag indicating whether the current user override is active
             */
            get: function () {
                return this._userOverrideActive;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthenticationService.prototype, "processedCredentials", {
            /**
             * Get the current processed credentials
             */
            get: function () {
                return this._processedCredentials;
            },
            /**
             * Set the current processed credentials. A stringified version
             * is stored in either local or session storage
             */
            set: function (value) {
                this._processedCredentials = value;
                if (value) {
                    var newProcessedCredentialsStr = base.Utils.toJson(this._processedCredentials);
                    if (this._processedCredentialsStr !== newProcessedCredentialsStr) {
                        this._processedCredentialsStr = newProcessedCredentialsStr;
                        this.storage.setItem("sinequa-credentials", this._processedCredentialsStr);
                    }
                }
                else {
                    if (this._processedCredentialsStr) {
                        this._processedCredentialsStr = undefined;
                        this.storage.removeItem("sinequa-credentials");
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AuthenticationService.prototype, "autoLoginActive", {
            /**
             * Returns `true` if an OAuth or SAML auto provider is configured
             */
            get: function () {
                return !!this.startConfig.autoOAuthProvider || !!this.startConfig.autoSAMLProvider;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Deactivate the current user override
         */
        AuthenticationService.prototype.deactivateUserOverride = function () {
            this._userOverrideActive = false;
        };
        AuthenticationService.prototype.loadCredentials = function () {
            var sinequaCredentials = this.storage.getItem("sinequa-credentials");
            this._processedCredentialsStr = sinequaCredentials ? sinequaCredentials : undefined;
            this._processedCredentials = this._processedCredentialsStr ? base.Utils.fromJson(this._processedCredentialsStr) : null;
        };
        AuthenticationService.prototype.saveCredentials = function (value) {
            this.processedCredentials = value;
        };
        AuthenticationService.prototype.init = function () {
            var _this = this;
            if (this.startConfig.authenticationStorage === "local") {
                this.storage = window.localStorage;
            }
            else {
                this.storage = window.sessionStorage;
            }
            this.loadCredentials();
            window.addEventListener('storage', function (event) {
                if (event.storageArea === _this.storage) {
                    if (!event.key) { // clear
                        _this.processedCredentials = undefined;
                    }
                    else if (event.key === "sinequa-credentials") {
                        if (event.newValue !== _this._processedCredentialsStr) {
                            _this.loadCredentials();
                        }
                    }
                }
            });
        };
        Object.defineProperty(AuthenticationService.prototype, "haveCredentials", {
            /**
             * Return `true` if `processedCredentials` exists
             */
            get: function () {
                return !!this.processedCredentials;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add the current authentication information to the passed `HttpHeaders` and `HttpParams`.
         * Currently, this adds the `sinequa-csrf-token` value to the HTTP headers. Called from
         * {@link HttpInterceptor}
         *
         * @param config HttpHeaders and HttpParams to be updated
         *
         * @returns new configuration
         */
        AuthenticationService.prototype.addAuthentication = function (config) {
            this.doAuthentication();
            if (this.authentication) {
                if (this.authentication.headers) {
                    for (var header in this.authentication.headers) {
                        if (this.authentication.headers.hasOwnProperty(header)) {
                            config.headers = config.headers.set(header, this.authentication.headers[header]);
                        }
                    }
                }
                if (this.authentication.params) {
                    for (var param in this.authentication.params) {
                        if (this.authentication.params.hasOwnProperty(param)) {
                            config.params = config.params.set(param, this.authentication.params[param]);
                        }
                    }
                }
            }
            return config;
        };
        /**
         * Update the current authentication information with information in the passed `response`.
         * This processes the `sinequa-jwt-refresh` header which will contain an updated CSRF token
         * to correspond to the new JWT cookie. Called from {@link HttpInterceptor}
         *
         * @param response An `HttpResponse`
         */
        AuthenticationService.prototype.updateAuthentication = function (response) {
            var csrfToken = response.headers.get("sinequa-jwt-refresh");
            if (csrfToken) {
                if (this.processedCredentials) {
                    if (this.processedCredentials.data.csrfToken !== csrfToken) {
                        this.processedCredentials.data.csrfToken = csrfToken;
                        this.saveCredentials(this.processedCredentials);
                    }
                }
                else {
                    this.setCsrfToken(csrfToken);
                }
            }
        };
        AuthenticationService.prototype.refreshAuthentication = function () {
            if (this.processedCredentials) {
                if (!this.authentication) {
                    this.authentication = {
                        csrfToken: this.processedCredentials.data.csrfToken
                    };
                }
                else {
                    this.authentication.csrfToken = this.processedCredentials.data.csrfToken;
                }
            }
            else {
                this.authentication = undefined;
            }
        };
        AuthenticationService.prototype.doAuthentication = function () {
            this.refreshAuthentication();
            if (this.authentication && this.authentication.csrfToken) {
                this.authentication.headers = {
                    "sinequa-csrf-token": this.authentication.csrfToken
                };
            }
        };
        AuthenticationService.prototype.getAuthenticateHeader = function (regex, authenticationHeaders, header) {
            if (authenticationHeaders) {
                for (var i = 0, ic = authenticationHeaders.length; i < ic; i++) {
                    var authenticationHeader = authenticationHeaders[i];
                    var matches = regex.exec(authenticationHeader);
                    if (matches && matches.length > 0) {
                        var prefix = matches[0];
                        header.value = authenticationHeader.slice(prefix.length);
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Authenticate with the Sinequa server using the passed credentials. The credentials are sent
         * in clear text. Prior to the authentication the passed `response` is checked for a
         * `WWW-Authenticate: Bearer` header.
         *
         * @param credentials The credentials to authenticate with
         * @param response The error response the reception of which initiated the call to this method
         */
        AuthenticationService.prototype.authenticate = function (credentials, response) {
            var wwwAuthenticate = response.headers.get("WWW-Authenticate");
            if (!wwwAuthenticate) {
                console.error("Missing WWW-Authenticate header");
                return Promise.resolve(undefined);
            }
            var authenticateHeaders = wwwAuthenticate.split(", ");
            var header = { value: "" };
            if (!this.getAuthenticateHeader(/^Bearer ?/, authenticateHeaders, header)) {
                console.error("Unexpected WWW-Authenticate header");
                return Promise.resolve(undefined);
            }
            return this.jWTService.getToken(credentials).toPromise()
                .then(function (value) {
                return {
                    kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                    userName: credentials.userName,
                    data: {
                        csrfToken: value,
                        provider: "Sinequa"
                    }
                };
            });
        };
        /**
         * Remove all current authentication data. The JWT cookie
         * is removed
         */
        AuthenticationService.prototype.logout = function () {
            var _this = this;
            this.auditService.notifyLogout().subscribe(function (_) {
                _this.tokenService.deleteWebTokenCookie().subscribe();
                _this.authentication = undefined;
                _this.processedCredentials = undefined;
            });
        };
        /**
         * Add the current user override information to the passed headers.
         *
         * @param config An object containing the `HttpHeaders` to update
         */
        AuthenticationService.prototype.addUserOverride = function (config) {
            if (this.userOverride && this.userOverrideActive) {
                config.headers = config.headers.set("sinequa-override-user", this.userOverride.userName);
                config.headers = config.headers.set("sinequa-override-domain", this.userOverride.domain);
            }
            return config.headers;
        };
        /**
         * Initiate authentication using the ng2-ui-auth library. The authentication process will be performed
         * in a browser popup window
         *
         * @param provider The name of the provider to use. This is the name configured in the Sinequa administration
         * console
         */
        AuthenticationService.prototype.authenticateWithProvider = function (provider) {
            var _this = this;
            // AuthService.authenticate opens a popup. On some platforms (Firefox) this is asynchronous
            // so we add a delay (timer(0)) so the caller can create a promise from the returned observable
            // without yielding
            var observable = rxjs.timer(0).pipe(operators.flatMap(function (value) {
                var observable1 = _this.authService.authenticate(provider, true).pipe(operators.share());
                base.Utils.subscribe(observable1, function (response) {
                    // NB response should be the return value from JOAuth/JSaml json methods
                    // It can be undefined eg if the popup fails to open
                    if (response) {
                        _this.processedCredentials = {
                            kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                            data: {
                                csrfToken: response.csrfToken,
                                provider: provider
                            }
                        };
                    }
                });
                return observable1;
            }));
            return observable;
        };
        AuthenticationService.prototype.setCsrfToken = function (csrfToken, provider) {
            if (provider === void 0) { provider = "Sinequa"; }
            if (!csrfToken) {
                return false;
            }
            this.processedCredentials = {
                kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                data: {
                    csrfToken: csrfToken,
                    provider: provider
                }
            };
            return true;
        };
        AuthenticationService.prototype.initiateAutoAuthentication = function () {
            if (!this.startConfig.usePopupForLogin && this.autoLoginActive) {
                var observable = void 0;
                if (this.startConfig.autoOAuthProvider) {
                    observable = this.httpClient.post(this.makeUrl("security.oauth"), {
                        action: "getcode",
                        provider: this.startConfig.autoOAuthProvider,
                        tokenInCookie: true,
                        originalUrl: window.location.href
                    }, {
                        params: this.makeParams({
                            noUserOverride: true,
                            noAutoAuthentication: true
                        })
                    });
                }
                else {
                    observable = this.httpClient.post(this.makeUrl("security.saml"), {
                        action: "getresponse",
                        provider: this.startConfig.autoSAMLProvider,
                        tokenInCookie: true,
                        originalUrl: window.location.href,
                    }, {
                        params: this.makeParams({
                            noUserOverride: true,
                            noAutoAuthentication: true
                        })
                    });
                }
                observable.subscribe(function (response) {
                    window.location.replace(response.redirectUrl);
                });
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Initiate the auto-authentication process if an automatic OAuth or SAML provider is configured.
         * The {@LoginService} calls this method at startup. First, an attempt is made to retrieve a CSRF token.
         * If that works, then the token is set and authentication is complete. Otherwise, the initial OAuth or SAML
         * call is made to the Sinequa server. The `redirectUrl` in the response to this call is then used to redirect
         * the browser to continue the normal OAuth/SAML autentication flow. A successful authentiction will culminate
         * in the SBA being loaded a second time, this method being called again and the attempt to retrieve a CSRF
         * token succeeding because a valid JWT cookie will now be present.
         *
         * A CSRF token is always requested to allow automatic login if a valid web token cookie has previously been
         * written via, for example, a login to the admin console.
         *
         * @returns An Observable of a boolean value which if `true` indicates that auto-authentication has been initiated.
         */
        AuthenticationService.prototype.autoAuthenticate = function () {
            var _this = this;
            return this.tokenService.getCsrfToken().pipe(operators.map(function (csrfToken) {
                // Token can be empty as getCsrfToken suppresses application errors (no cookie or cookie invalid)
                // (We do this to avoid having errors in the console for normal situations.)
                if (csrfToken) {
                    _this.setCsrfToken(csrfToken);
                    return false;
                }
                else {
                    _this.initiateAutoAuthentication();
                    return true;
                }
            }), operators.catchError(function (error) {
                // We should rarely have an error now as getCsrfToken
                // suppresses the application-level ones
                if (_this.initiateAutoAuthentication()) {
                    return rxjs.throwError(error);
                }
                // Swallow the error and continue with non-auto login process
                return rxjs.of(false);
            }));
        };
        return AuthenticationService;
    }(i1.HttpService));
    AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(i1.SqHttpClient), i0.ɵɵinject(TokenService), i0.ɵɵinject(i1.AuditWebService), i0.ɵɵinject(JWTService), i0.ɵɵinject(i2.AuthService)); };
    AuthenticationService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthenticationService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i1.SqHttpClient }, { type: TokenService }, { type: i1.AuditWebService }, { type: JWTService }, { type: i2.AuthService }];
        }, null);
    })();

    /**
     * An `InjectionToken` to set the component to use for the login modal dialog which is displayed
     * by the {@link LoginService} when performing a manual login. This makes the service independent
     * of any particular UI framework. If manual login is to be used a component must be configured by
     * providing this token.
     */
    var MODAL_LOGIN = new i0.InjectionToken('MODAL_LOGIN');
    /**
     * A high-level service to manage user login
     */
    var LoginService = /** @class */ (function () {
        function LoginService(startConfig, loginModal, router, appService, principalService, userSettingsService, modalService, notificationsService, authenticationService) {
            var _this = this;
            this.startConfig = startConfig;
            this.loginModal = loginModal;
            this.router = router;
            this.appService = appService;
            this.principalService = principalService;
            this.userSettingsService = userSettingsService;
            this.modalService = modalService;
            this.notificationsService = notificationsService;
            this.authenticationService = authenticationService;
            this._events = new rxjs.BehaviorSubject({ type: "session-changed" });
            this.beforeUnloadEventListener = function (e) {
                _this._events.next({ type: "session-end" });
            };
            // NB unload doesn't fire reliably so we listen for beforeunload
            window.addEventListener("beforeunload", this.beforeUnloadEventListener);
        }
        LoginService.prototype.ngOnDestroy = function () {
            this._events.complete();
            window.removeEventListener("beforeunload", this.beforeUnloadEventListener);
        };
        Object.defineProperty(LoginService.prototype, "events", {
            /**
             * Get an `Observable` stream of {@link SessionEvent} events emitted by the service
             */
            get: function () {
                return this._events;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LoginService.prototype, "principal", {
            /**
             * Get the currently logged in {@link Principal}, if any. Note that a principal can exist
             * without the login being complete. For example, in the situation where access is denied to
             * the selected app.
             */
            get: function () {
                return this.principalService.principal;
            },
            enumerable: false,
            configurable: true
        });
        LoginService.prototype.setComplete = function () {
            var complete = this.complete;
            this.complete = !!this.appService.app && !!this.principalService.principal && !!this.userSettingsService.userSettings;
            if (this.complete) {
                if (!this.authenticationService.userOverrideFailed) {
                    this.notificationsService.hideNotifications();
                }
                this.authenticationService.userOverrideFailed = false;
            }
            if (!!complete !== !!this.complete) {
                this._events.next({ type: "session-changed" });
            }
        };
        /**
         * Perform a logout of the currently logged in user. [AppService.app]{@link AppService#app},
         * [PrincipalWebService.principal]{@link PrincipalWebService#prinicpal} and
         * [UserSettingsWebService.userSettings]{@link UserSettingsWebService#userSettings} are reset.
         * The `session-end` event is emitted
         */
        LoginService.prototype.logout = function () {
            this._events.next({ type: "session-end" });
            this.appService.clear();
            this.principalService.principal = undefined;
            this.userSettingsService.userSettings = undefined;
            this.authenticationService.deactivateUserOverride();
            this.authenticationService.logout();
            this.setComplete();
        };
        /**
         * Override the current user to the user specified in `userOverride`. Only an administrator
         * is permitted to do this. They can revert to the normal login by calling this method with
         * `undefined`
         *
         * @param userOverride The user override
         */
        LoginService.prototype.overrideUser = function (userOverride) {
            var _this = this;
            this.authenticationService.userOverride = userOverride;
            this.appService.clear();
            this.principalService.principal = undefined;
            this.userSettingsService.userSettings = undefined;
            this.setComplete();
            base.Utils.delay().then(function () { return _this.login(); });
        };
        LoginService.prototype.switchPrincipal = function (principal) {
            var _this = this;
            if (!principal.isAdministrator) {
                this.authenticationService.deactivateUserOverride();
            }
            this.principalService.principal = principal;
            this.userSettingsService.userSettings = undefined;
            base.Utils.delay().then(function () { return _this.login(); });
        };
        /**
         * Initiate the user login process. The method attempts to retrieve
         * the [application configuration]{@link CCApp}, the
         * [logged in user]{@link Principal} and the [user settings]{@link UserSettings}.
         * If a user is not currently authenticated then authentication is performed using
         * the {@link AuthenticationService} - OAuth/SAML if configured on the Sinequa Server
         * or manual using a login modal dialog provided using the {@link MODAL_LOGIN} injection
         * token.
         */
        LoginService.prototype.login = function () {
            var _this = this;
            var appName = this.appService.appName;
            if (!appName) {
                return rxjs.throwError({ error: "App not specified" });
            }
            var appNeeded;
            if (this.router) {
                var hash = window.location.hash.replace("#", "");
                var href = hash.split("?")[0];
                var params = new URLSearchParams(hash.split("?")[1]);
                var queryParams_1 = {};
                params.forEach(function (v, k) { return queryParams_1[k] = v; });
                // Pick up any user override from the query string
                var overrideUser = queryParams_1["overrideUser"];
                var overrideDomain = queryParams_1["overrideDomain"];
                if (overrideUser) {
                    this.authenticationService.userOverride = {
                        userName: overrideUser,
                        domain: overrideDomain
                    };
                    delete queryParams_1["overrideUser"];
                    delete queryParams_1["overrideDomain"];
                    var url = base.Utils.makeURL(href);
                    this.router.navigate([url.pathname], { queryParams: queryParams_1 });
                }
            }
            var makeObservables = function () {
                var observables = {
                    app: undefined,
                    principal: undefined,
                    userSettings: undefined
                };
                if (!_this.appService.app || (appName && _this.appService.app.name !== appName)) {
                    appNeeded = true;
                    observables.app = _this.appService.init();
                }
                else {
                    observables.app = rxjs.of(_this.appService.app);
                }
                var loadUserSettings = false;
                if (!_this.principalService.principal) {
                    loadUserSettings = true;
                    observables.principal = _this.principalService.load();
                }
                else {
                    observables.principal = rxjs.of(_this.principalService.principal);
                }
                if (!_this.userSettingsService.userSettings || loadUserSettings) {
                    observables.userSettings = _this.userSettingsService.load();
                }
                else {
                    observables.userSettings = rxjs.of(_this.userSettingsService.userSettings);
                }
                return observables;
            };
            var observable = this.authenticationService.autoAuthenticate()
                .pipe(operators.flatMap(function (success) {
                var observables = makeObservables();
                return rxjs.forkJoin(observables);
            }));
            base.Utils.subscribe(observable, function (result) {
                console.log("loginService.login ok: ", result);
                _this.setComplete();
                if (appNeeded) {
                    _this._events.next({ type: "session-start" });
                }
            }, function (error) {
                console.log("loginService.login failed: ", error);
                // proceed to logout to clean process
                _this.logout();
                return rxjs.throwError(error);
            });
            return observable;
        };
        LoginService.prototype.getAutomaticProvider = function () {
            var _this = this;
            if (this.startConfig.providers) {
                return Object.keys(this.startConfig.providers).find(function (value) {
                    var provider = _this.startConfig.providers && _this.startConfig.providers[value];
                    return !!provider && provider.automatic;
                });
            }
            return undefined;
        };
        /**
         * Called by the {@link HttpInterceptor} on reception of an `HTTP 401` response.
         * This will either initiate an auto login process (OAuth/SAML) if configured on
         * the Sinequa server or display the login modal dialog to request user credentials
         *
         * @param response An `HTTP 401` response
         * @param acceptCurrent If `true` and the `AuthenticationService` currently has
         * processed credentials then use them instead of starting a new login
         * @returns A promise that is resolved when credentials have been obtained. Note that
         * when auto-authentication is configured the promise will be rejected and the browser
         * redirected to the OAuth/SAML redirect url
         */
        LoginService.prototype.getCredentials = function (response, acceptCurrent) {
            var _this = this;
            if (acceptCurrent && this.authenticationService.processedCredentials) {
                return Promise.resolve(); // initiate retry
            }
            if (!this.startConfig.usePopupForLogin && this.authenticationService.autoLoginActive) {
                return this.authenticationService.autoAuthenticate().toPromise()
                    .then(function (result) {
                    if (result /*auto-authentication initiated*/) {
                        return Promise.reject("performing auto login");
                    }
                    else {
                        return undefined;
                    }
                });
            }
            var firstCaller = false;
            var automaticProvider = this.getAutomaticProvider();
            if (automaticProvider) {
                if (!this.automaticLoginPromise) {
                    this.automaticLoginPromise = this.authenticationService.authenticateWithProvider(automaticProvider).toPromise();
                    firstCaller = true;
                }
                return this.automaticLoginPromise
                    .then(function (result) {
                    // NB response should be the return value from JOAuth/JSaml json methods
                    // It can be undefined eg if the popup fails to open
                    _this.automaticLoginPromise = undefined;
                    return result ? Promise.resolve() : Promise.reject("popup failed?");
                })
                    .catch(function (reason) {
                    _this.automaticLoginPromise = undefined;
                    var error = new base.SqError(base.SqErrorCode.autoLoginError);
                    if (firstCaller) {
                        _this.notificationsService.error(error.message);
                    }
                    throw error;
                });
            }
            var credentials = {};
            if (this.authenticationService.processedCredentials) {
                credentials.userName = this.authenticationService.processedCredentials.userName;
            }
            if (!this.loginModalPromise) {
                this.loginModalPromise = this.modalService.open(this.loginModal, { model: credentials });
                firstCaller = true;
            }
            return this.loginModalPromise
                .then(function (result) {
                _this.loginModalPromise = undefined;
                // result === ModalResult.Yes is a special return from Login when using AuthenticationService.authenticateWithProvider
                if (result === -1 /* OK */ || result === -3 /* Yes */) {
                    if (!_this.processCredentialsPromise) {
                        _this.processCredentialsPromise = result === -3 /* Yes */ ?
                            Promise.resolve(undefined) :
                            _this.authenticationService.authenticate(credentials, response);
                    }
                    return _this.processCredentialsPromise
                        .then(function (value) {
                        _this.processCredentialsPromise = undefined;
                        if (result !== -3 /* Yes */) {
                            _this.authenticationService.processedCredentials = value;
                        }
                        if (!_this.checkPrincipalPromise) {
                            _this.checkPrincipalPromise = _this.principalService.get(false).toPromise();
                        }
                        return _this.checkPrincipalPromise
                            .then(function (principal) {
                            _this.checkPrincipalPromise = undefined;
                            if (!_this.principalService.principal || _this.principalService.principal.id === principal.id) {
                                // no current principal OR prinicpal unchanged - initiate retry
                                return Promise.resolve();
                            }
                            var error = new base.SqError(base.SqErrorCode.principalSwitched);
                            if (firstCaller) {
                                _this.switchPrincipal(principal);
                                _this.notificationsService.info(error.message);
                            }
                            throw error;
                        })
                            .catch(function (reason) {
                            _this.checkPrincipalPromise = undefined;
                            throw reason;
                        });
                    })
                        .catch(function (reason) {
                        _this.processCredentialsPromise = undefined;
                        if (base.SqError.is(reason, base.SqErrorCode.principalSwitched)) {
                            throw reason;
                        }
                        throw new base.SqError(base.SqErrorCode.processedCredentialsError);
                    });
                }
                else {
                    _this.authenticationService.processedCredentials = undefined; // clean slate
                    var error = new base.SqError(base.SqErrorCode.loginCancelled);
                    if (firstCaller) {
                        _this.notificationsService.info(error.message);
                    }
                    throw error;
                }
            })
                .catch(function (reason) {
                if (!base.SqError.is(reason, base.SqErrorCode.principalSwitched)) {
                    _this.authenticationService.processedCredentials = undefined; // clean slate
                }
                _this.loginModalPromise = undefined;
                throw reason;
            });
        };
        return LoginService;
    }());
    LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(MODAL_LOGIN), i0.ɵɵinject(i1$1.Router, 8), i0.ɵɵinject(i2$1.AppService), i0.ɵɵinject(i1.PrincipalWebService), i0.ɵɵinject(i1.UserSettingsWebService), i0.ɵɵinject(i4.ModalService), i0.ɵɵinject(i5.NotificationsService), i0.ɵɵinject(AuthenticationService)); };
    LoginService.ɵprov = i0.ɵɵdefineInjectable({ token: LoginService, factory: LoginService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LoginService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i0.Type, decorators: [{
                            type: i0.Inject,
                            args: [MODAL_LOGIN]
                        }] }, { type: i1$1.Router, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2$1.AppService }, { type: i1.PrincipalWebService }, { type: i1.UserSettingsWebService }, { type: i4.ModalService }, { type: i5.NotificationsService }, { type: AuthenticationService }];
        }, null);
    })();

    /**
     * A utility base class to assist main components in the handling of the login state of the
     * the application. It initiates the login process and sets `loginComplete` accordingly
     * whenever the login state changes
     */
    var ComponentWithLogin = /** @class */ (function () {
        function ComponentWithLogin(loginService, changeDetectorRef) {
            this.loginService = loginService;
            this.changeDetectorRef = changeDetectorRef;
        }
        /**
         * A method called whenever the `session-changed` event is received. This can be
         * overridden by the subclassing component.
         */
        ComponentWithLogin.prototype.onLoginComplete = function () {
        };
        /**
         * Subscribes to the [LoginService.events]{@link LoginService#events} and sets
         * the `loginComplete` member whenever the `session-changed` event is received
         */
        ComponentWithLogin.prototype.ngOnInit = function () {
            var _this = this;
            this.loginComplete = this.loginService.complete;
            this.loginSubscription = this.loginService.events.subscribe(function (event) {
                if (event.type === "session-changed") {
                    _this.loginComplete = _this.loginService.complete;
                    _this.onLoginComplete();
                    _this.changeDetectorRef.markForCheck();
                }
            });
        };
        ComponentWithLogin.prototype.ngOnDestroy = function () {
            this.loginSubscription.unsubscribe();
        };
        /**
         * Initiates the login process by calling [LoginService.login]{@link LoginService#login}
         */
        ComponentWithLogin.prototype.ngAfterViewInit = function () {
            this.loginService.login();
        };
        return ComponentWithLogin;
    }());
    ComponentWithLogin.ɵfac = function ComponentWithLogin_Factory(t) { return new (t || ComponentWithLogin)(i0.ɵɵdirectiveInject(LoginService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
    ComponentWithLogin.ɵcmp = i0.ɵɵdefineComponent({ type: ComponentWithLogin, selectors: [["ng-component"]], decls: 0, vars: 0, template: function ComponentWithLogin_Template(rf, ctx) { }, encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ComponentWithLogin, [{
                type: i0.Component,
                args: [{
                        template: ''
                    }]
            }], function () { return [{ type: LoginService }, { type: i0.ChangeDetectorRef }]; }, null);
    })();

    /**
     * Override ng2-ui-auth's state handling to retrieve a state from the Sinequa server
     */
    var AuthenticationOauthService = /** @class */ (function (_super) {
        __extends(AuthenticationOauthService, _super);
        function AuthenticationOauthService(startConfig, httpClient, sharedService, popupService, configService) {
            var _this = _super.call(this, httpClient, sharedService, configService, popupService) || this;
            _this.startConfig = startConfig;
            _this.httpClient = httpClient;
            _this.sharedService = sharedService;
            _this.popupService = popupService;
            _this.configService = configService;
            return _this;
        }
        AuthenticationOauthService.prototype.authenticate = function (name, userData) {
            var _this = this;
            var options = this.configService.options.providers[name];
            if (options.sqInitState) {
                return this.httpClient.get(base.Utils.addUrl(this.startConfig.apiPath, "oauth"), {
                    params: base.Utils.makeHttpParams({
                        action: "initstate",
                        provider: options.name,
                        tokenInCookie: true,
                        loginInPopup: true,
                        noUserOverride: true,
                        noAutoAuthentication: true
                    })
                }).pipe(operators.flatMap(function (ret) {
                    options.state = ret.state;
                    return _super.prototype.authenticate.call(_this, name, userData);
                }));
            }
            return _super.prototype.authenticate.call(this, name, userData);
        };
        return AuthenticationOauthService;
    }(i2.OauthService));
    AuthenticationOauthService.ɵfac = function AuthenticationOauthService_Factory(t) { return new (t || AuthenticationOauthService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(i1$2.HttpClient), i0.ɵɵinject(i2.SharedService), i0.ɵɵinject(i2.PopupService), i0.ɵɵinject(i2.ConfigService)); };
    AuthenticationOauthService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationOauthService, factory: AuthenticationOauthService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthenticationOauthService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i1$2.HttpClient }, { type: i2.SharedService }, { type: i2.PopupService }, { type: i2.ConfigService }];
        }, null);
    })();

    /**
     * Override ng2-ui-auth's popup handling as it doesn't work with SAML + IE11 because
     * of a double redirection.
     * The initial request is to Sinequa which redirects to the authentication provider.
     * On successful authentication, the authentication provider redirects back
     * to Sinequa to perform the login.
     * In IE the initial redirection causes the popup window to be reported as "closed"
     * which breaks the process.
     * So, override ng2-ui-auth's PopupService and do the inital request to get the
     * redirect url outside of the popup
     */
    var AuthenticationPopupService = /** @class */ (function (_super) {
        __extends(AuthenticationPopupService, _super);
        function AuthenticationPopupService(startConfig, httpClient) {
            var _this = _super.call(this) || this;
            _this.startConfig = startConfig;
            _this.httpClient = httpClient;
            return _this;
        }
        AuthenticationPopupService.prototype.open = function (url, options /*IOauth2Options | IOauth1Options*/, cordova) {
            var _this = this;
            if (base.Utils.startsWith(url, this.startConfig.apiPath)) {
                return this.httpClient.get(url, {
                    params: base.Utils.makeHttpParams({
                        noUserOverride: true,
                        noAutoAuthentication: true,
                        tokenInCookie: true,
                        loginInPopup: true
                    })
                }).pipe(operators.flatMap(function (ret) {
                    return _super.prototype.open.call(_this, ret.redirectUrl, options, cordova);
                }));
            }
            return _super.prototype.open.call(this, url, options, cordova);
        };
        return AuthenticationPopupService;
    }(i2.PopupService));
    AuthenticationPopupService.ɵfac = function AuthenticationPopupService_Factory(t) { return new (t || AuthenticationPopupService)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(i1$2.HttpClient)); };
    AuthenticationPopupService.ɵprov = i0.ɵɵdefineInjectable({ token: AuthenticationPopupService, factory: AuthenticationPopupService.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthenticationPopupService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: i1$2.HttpClient }];
        }, null);
    })();

    function Login_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "br");
            i0.ɵɵelementStart(2, "span", 8);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqValidationError");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r0 = i0.ɵɵnextContext();
            var tmp_0_0 = null;
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r0.form.get("userName")) == null ? null : tmp_0_0.errors));
        }
    }
    function Login_ng_container_10_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "br");
            i0.ɵɵelementStart(2, "span", 8);
            i0.ɵɵtext(3);
            i0.ɵɵpipe(4, "sqValidationError");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r1 = i0.ɵɵnextContext();
            var tmp_0_0 = null;
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 1, (tmp_0_0 = ctx_r1.form.get("password")) == null ? null : tmp_0_0.errors));
        }
    }
    /**
     * A basic login component that request a user name and password. It is designed to work with
     * [LoginService.getCredentials]{@link LoginService#getCredentials} and can be set using the
     * {@link MODAL_LOGIN} injection token
     */
    var Login = /** @class */ (function () {
        function Login(model, modalRef, formBuilder) {
            this.model = model;
            this.modalRef = modalRef;
            this.formBuilder = formBuilder;
        }
        Login.prototype.ngOnInit = function () {
            var _this = this;
            this.userNameControl = new i2$2.FormControl(this.model.userName, i2$2.Validators.required);
            this.passwordControl = new i2$2.FormControl(this.model.password, i2$2.Validators.required);
            this.form = this.formBuilder.group({
                userName: this.userNameControl,
                password: this.passwordControl
            });
            this.formChanges = base.Utils.subscribe(this.form.valueChanges, function (value) {
                _this.model.userName = _this.userNameControl.value;
                _this.model.password = _this.passwordControl.value;
            });
        };
        Login.prototype.ngOnDestroy = function () {
            this.formChanges.unsubscribe();
        };
        Login.prototype.showError = function (control) {
            return control.invalid && (control.dirty || this.modalRef.submitted);
        };
        Login.prototype.ok = function () {
            if (!this.form.valid) {
                return;
            }
            this.modalRef.close(-1 /* OK */);
        };
        Login.prototype.cancel = function () {
            this.modalRef.close(-2 /* Cancel */);
        };
        return Login;
    }());
    Login.ɵfac = function Login_Factory(t) { return new (t || Login)(i0.ɵɵdirectiveInject(i4.MODAL_MODEL), i0.ɵɵdirectiveInject(i4.ModalRef), i0.ɵɵdirectiveInject(i2$2.FormBuilder)); };
    Login.ɵcmp = i0.ɵɵdefineComponent({ type: Login, selectors: [["sq-core-login"]], decls: 18, vars: 19, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["formControlName", "userName", 3, "placeholder"], [4, "ngIf"], [2, "margin-bottom", "8px"], ["type", "password", "formControlName", "password", 3, "placeholder"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], [2, "color", "red"]], template: function Login_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "form", 0);
                i0.ɵɵelementStart(1, "h3", 1);
                i0.ɵɵtext(2);
                i0.ɵɵpipe(3, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelement(4, "input", 2);
                i0.ɵɵpipe(5, "sqMessage");
                i0.ɵɵtemplate(6, Login_ng_container_6_Template, 5, 3, "ng-container", 3);
                i0.ɵɵelement(7, "div", 4);
                i0.ɵɵelement(8, "input", 5);
                i0.ɵɵpipe(9, "sqMessage");
                i0.ɵɵtemplate(10, Login_ng_container_10_Template, 5, 3, "ng-container", 3);
                i0.ɵɵelement(11, "hr");
                i0.ɵɵelementStart(12, "button", 6);
                i0.ɵɵlistener("click", function Login_Template_button_click_12_listener() { return ctx.ok(); });
                i0.ɵɵtext(13);
                i0.ɵɵpipe(14, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementStart(15, "button", 7);
                i0.ɵɵlistener("click", function Login_Template_button_click_15_listener() { return ctx.cancel(); });
                i0.ɵɵtext(16);
                i0.ɵɵpipe(17, "sqMessage");
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵproperty("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
                i0.ɵɵadvance(2);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 9, "msg#modal.login.title"));
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(5, 11, "msg#modal.login.userName"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.showError(ctx.userNameControl));
                i0.ɵɵadvance(2);
                i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(9, 13, "msg#modal.login.password"));
                i0.ɵɵadvance(2);
                i0.ɵɵproperty("ngIf", ctx.showError(ctx.passwordControl));
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 15, "msg#modal.buttons.ok"));
                i0.ɵɵadvance(3);
                i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(17, 17, "msg#modal.buttons.cancel"));
            }
        }, directives: [i2$2.ɵangular_packages_forms_forms_y, i2$2.NgControlStatusGroup, i3.CdkTrapFocus, i2$2.FormGroupDirective, i2$2.DefaultValueAccessor, i2$2.NgControlStatus, i2$2.FormControlName, i4$1.NgIf], pipes: [i5$1.MessagePipe, i6.ValidationErrorPipe], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(Login, [{
                type: i0.Component,
                args: [{
                        selector: "sq-core-login",
                        template: "\n        <form novalidate [formGroup]=\"form\" style=\"border: solid;padding: 16px;background-color: white;\"\n            cdkTrapFocus [cdkTrapFocusAutoCapture]=\"true\">\n            <h3 style=\"margin-top: 0;\">{{'msg#modal.login.title' | sqMessage}}</h3>\n            <input placeholder=\"{{'msg#modal.login.userName' | sqMessage}}\" formControlName=\"userName\">\n            <ng-container *ngIf=\"showError(userNameControl)\">\n                <br>\n                <span style=\"color: red;\">{{form.get(\"userName\")?.errors | sqValidationError}}</span>\n            </ng-container>\n            <div style=\"margin-bottom: 8px;\"></div>\n            <input type=\"password\" placeholder=\"{{'msg#modal.login.password' | sqMessage}}\" formControlName=\"password\">\n            <ng-container *ngIf=\"showError(passwordControl)\">\n                <br>\n                <span style=\"color: red;\">{{form.get(\"password\")?.errors | sqValidationError}}</span>\n            </ng-container>\n            <hr>\n            <button type=\"submit\" (click)=\"ok()\">{{'msg#modal.buttons.ok' | sqMessage}}</button>\n            <button type=\"button\" (click)=\"cancel()\">{{'msg#modal.buttons.cancel' | sqMessage}}</button>\n        </form>\n    "
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i4.MODAL_MODEL]
                        }] }, { type: i4.ModalRef }, { type: i2$2.FormBuilder }];
        }, null);
    })();

    var LOGIN_MODULE_PROVIDERS = [];

    /**
     * Configuration for the ng2-ui-auth library
     */
    var AuthConfig = /** @class */ (function () {
        function AuthConfig(startConfig) {
            this.storageType = "memory";
            this.providers = startConfig.providers || {};
        }
        return AuthConfig;
    }());
    AuthConfig.ɵfac = function AuthConfig_Factory(t) { return new (t || AuthConfig)(i0.ɵɵinject(i1.START_CONFIG)); };
    AuthConfig.ɵprov = i0.ɵɵdefineInjectable({ token: AuthConfig, factory: AuthConfig.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AuthConfig, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }];
        }, null);
    })();
    /**
     * This module provides support for user authentication in the {@link AuthenticationService}. This authentication can be
     * automatic (OAuth/SAML), if configured in the Sinequa administration, or manual where the user name and password are
     * entered in a modal dialog box and transmitted in clear text. There is also support for the ng2-ui-auth library where the
     * authentication process occurs in a browser popup window. Authentication is instigated by the handling of HTTP 401 errors
     * in an `HttpInterceptor` so all web service calls requiring authentication are automatically protected. This module will
     * not be used for authentication when the web server is configured for Windows authentication.
     *
     * A higher level {@link LoginService} groups the successful retrieval of the current `application configuration` ({@link AppService}),
     * `principal` ({@link PrincipalWebService}), and `user settings` ({@link UserSettingsWebService}) all of which require the user
     * to be authenticated. This can be used as a "gatekeeper" to protect access to the main, often routed, component(s).
     *
     * The {@link LoginInterceptor} in this module must be registered using `HTTP_INTERCEPTORS` in your app module.
     */
    var LoginModule = /** @class */ (function () {
        function LoginModule() {
        }
        LoginModule.forRoot = function (loginModal) {
            if (loginModal === void 0) { loginModal = Login; }
            return {
                ngModule: LoginModule,
                providers: [
                    // Login
                    { provide: MODAL_LOGIN, useValue: loginModal },
                ]
            };
        };
        return LoginModule;
    }());
    LoginModule.ɵmod = i0.ɵɵdefineNgModule({ type: LoginModule });
    LoginModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LoginModule_Factory(t) { return new (t || LoginModule)(); }, providers: __spread([
            // Auth module dependencies
            { provide: i2.CONFIG_OPTIONS, useClass: AuthConfig },
            { provide: i2.OauthService, useExisting: AuthenticationOauthService },
            { provide: i2.PopupService, useExisting: AuthenticationPopupService }
        ], LOGIN_MODULE_PROVIDERS), imports: [[
                i4$1.CommonModule,
                i2$2.FormsModule,
                i2$2.ReactiveFormsModule,
                i2.Ng2UiAuthModule.forRoot(undefined, false),
                i4.ModalModule.forRoot(),
                // CDK
                overlay.OverlayModule,
                i3.A11yModule,
                // Sinequa modules
                base.BaseModule,
                i2$1.AppUtilsModule,
                i1.WebServicesModule,
                i5$1.IntlModule,
                i6.ValidationModule,
                i5.NotificationModule
            ]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LoginModule, { declarations: [Login], imports: [i4$1.CommonModule,
                i2$2.FormsModule,
                i2$2.ReactiveFormsModule, i2.Ng2UiAuthModule, i4.ModalModule,
                // CDK
                overlay.OverlayModule,
                i3.A11yModule,
                // Sinequa modules
                base.BaseModule,
                i2$1.AppUtilsModule,
                i1.WebServicesModule,
                i5$1.IntlModule,
                i6.ValidationModule,
                i5.NotificationModule] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LoginModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i4$1.CommonModule,
                            i2$2.FormsModule,
                            i2$2.ReactiveFormsModule,
                            i2.Ng2UiAuthModule.forRoot(undefined, false),
                            i4.ModalModule.forRoot(),
                            // CDK
                            overlay.OverlayModule,
                            i3.A11yModule,
                            // Sinequa modules
                            base.BaseModule,
                            i2$1.AppUtilsModule,
                            i1.WebServicesModule,
                            i5$1.IntlModule,
                            i6.ValidationModule,
                            i5.NotificationModule
                        ],
                        declarations: [
                            Login,
                        ],
                        exports: [],
                        providers: __spread([
                            // Auth module dependencies
                            { provide: i2.CONFIG_OPTIONS, useClass: AuthConfig },
                            { provide: i2.OauthService, useExisting: AuthenticationOauthService },
                            { provide: i2.PopupService, useExisting: AuthenticationPopupService }
                        ], LOGIN_MODULE_PROVIDERS)
                    }]
            }], null, null);
    })();

    var HTTP_REQUEST_INITIALIZERS = new i0.InjectionToken("HTTP_REQUEST_INITIALIZERS");
    /**
     * An `HttpInterceptor` to handle `HTTP 401 unauthorized` error responses by calling
     * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles
     * the `sinequa-jwt-refresh` header set when auto refreshing of JWT is configured in
     * the Sinequa administration console.
     */
    var LoginInterceptor = /** @class */ (function () {
        function LoginInterceptor(startConfig, requestInitializers, notificationsService, loginService, authService) {
            this.startConfig = startConfig;
            this.requestInitializers = requestInitializers;
            this.notificationsService = notificationsService;
            this.loginService = loginService;
            this.authService = authService;
        }
        LoginInterceptor.prototype.processRequestInitializers = function (request) {
            var e_1, _a;
            if (this.requestInitializers) {
                try {
                    for (var _b = __values(this.requestInitializers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var requestInitializer = _c.value;
                        if (!requestInitializer(request)) {
                            break;
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
            }
        };
        LoginInterceptor.prototype.isJsonable = function (obj) {
            return (base.Utils.isObject(obj) || base.Utils.isArray(obj)) && !base.Utils.isArrayBuffer(obj) && !base.Utils.isBlob(obj) &&
                !base.Utils.isString(obj) && !(obj instanceof i1$2.HttpParams);
        };
        LoginInterceptor.prototype.shouldIntercept = function (url) {
            return base.Utils.startsWith(url, this.startConfig.apiPath);
        };
        LoginInterceptor.prototype.notifyError = function (error) {
            var message;
            var title = "msg#error.serverError";
            if (error instanceof i1$2.HttpErrorResponse) {
                var response = error;
                try {
                    var data = response.error;
                    if (base.Utils.isString(data)) {
                        try {
                            data = JSON.parse(data);
                        }
                        catch (exception) {
                        }
                    }
                    if (data && data.errorMessage) {
                        message = data.errorMessage;
                        if (data.errorCodeText) {
                            message = message + " (" + data.errorCodeText + ")";
                        }
                        else if (data.errorCode) {
                            message = message + " (" + data.errorCode + ")";
                        }
                    }
                }
                catch (exception) {
                }
                if (!message) {
                    if (response.status === 200) {
                        message = "msg#error.responseLoadFailure";
                    }
                    else if (response.statusText) {
                        message = response.statusText + " (" + response.status + ")";
                    }
                    else {
                        message = "HTTP error: " + response.status;
                    }
                }
            }
            else if (base.SqError.is(error)) {
                message = error.message;
            }
            else {
                message = (error + "") || "msg#error.unknownError";
            }
            this.notificationsService.error(message, undefined, title);
        };
        LoginInterceptor.prototype.getCredentials = function (response, acceptCurrent) {
            var _this = this;
            return this.loginService.getCredentials(response, acceptCurrent)
                .catch(function (error) {
                if (base.SqError.is(error, base.SqErrorCode.processedCredentialsError)) {
                    return _this.getCredentials(response, acceptCurrent);
                }
                throw error;
            });
        };
        /**
         * Handles `HTTP 401 unauthorized errors responses by calling
         * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles auto
         * refreshing of JWT by processing the `sinequa-jwt-refresh` header. The JWT cookie itself
         * is updated by a `Set-Cookie` header in the response. There are a number of flags that
         * can be set in the request parameters which will be removed before the request is actually
         * sent:
         * * `noAutoAuthentication` - set to bypass the `HTTP 401` handling
         * * `noUserOverride` - set to not add the current user override to the request
         * * `noNotify` - set to not notify errors using the {@link NotificationService}
         *
         * @param request The intercepted request
         * @param next The next interceptor in the chain
         */
        LoginInterceptor.prototype.intercept = function (request, next) {
            var _this = this;
            if (!this.shouldIntercept(request.url) || request.params.has("noIntercept")) {
                return next.handle(request);
            }
            var config = { headers: request.headers, params: request.params };
            var options = {
                noAutoAuthentication: base.Utils.isTrue(config.params.get("noAutoAuthentication")) || false,
                noUserOverride: base.Utils.isTrue(config.params.get("noUserOverride")) || false,
                hadCredentials: this.authService.haveCredentials,
                userOverrideActive: false
            };
            var noNotify = base.Utils.isTrue(config.params.get("noNotify")) || false;
            config.params = config.params.delete("noAutoAuthentication");
            config.params = config.params.delete("noUserOverride");
            config.params = config.params.delete("noNotify");
            config = this.authService.addAuthentication(config);
            if (this.authService.userOverrideActive && !options.noUserOverride) {
                options.userOverrideActive = true;
                config.headers = this.authService.addUserOverride(config);
            }
            config.headers = config.headers.set("sinequa-force-camel-case", "true");
            if (this.isJsonable(request.body)) {
                this.processRequestInitializers(request);
            }
            this.notificationsService.enter("network");
            var _request = request.clone({
                headers: config.headers,
                params: config.params,
                body: request.body,
                withCredentials: true
            });
            return next.handle(_request).pipe(operators.catchError(function (error, caught) {
                _this.notificationsService.leave("network");
                if (error instanceof i1$2.HttpErrorResponse) {
                    switch (error.status) {
                        case 401: {
                            return _this.handle401Error(error, _request, next, options, caught);
                        }
                    }
                }
                if (!noNotify) {
                    _this.notifyError(error);
                }
                return rxjs.throwError(error);
            }), operators.map(function (event) {
                if (event instanceof i1$2.HttpResponse) {
                    _this.notificationsService.leave("network");
                    _this.authService.updateAuthentication(event);
                }
                return event;
            }));
        };
        LoginInterceptor.prototype.handle401Error = function (err, req, next, options, caught) {
            var _this = this;
            if (!options.noAutoAuthentication) {
                if (options.userOverrideActive) {
                    if (this.authService.userOverrideActive) {
                        this.authService.deactivateUserOverride();
                        this.authService.userOverrideFailed = true;
                        this.notificationsService.error("msg#error.userOverrideFailure");
                    }
                    return rxjs.throwError(err);
                }
                return rxjs.from(this.getCredentials(err, !options.hadCredentials))
                    .pipe(operators.switchMap(function (value) {
                    var headers = _this.authService.addAuthentication(req).headers;
                    return next.handle(req.clone({ headers: headers }));
                }), operators.catchError(function (err) {
                    // in case of an Http error, 'caught' must be returned to be catched by the interceptor
                    return err instanceof i1$2.HttpErrorResponse ? caught : rxjs.throwError(err);
                }));
            }
            return rxjs.throwError(err);
        };
        return LoginInterceptor;
    }());
    LoginInterceptor.ɵfac = function LoginInterceptor_Factory(t) { return new (t || LoginInterceptor)(i0.ɵɵinject(i1.START_CONFIG), i0.ɵɵinject(HTTP_REQUEST_INITIALIZERS, 8), i0.ɵɵinject(i5.NotificationsService), i0.ɵɵinject(LoginService), i0.ɵɵinject(AuthenticationService)); };
    LoginInterceptor.ɵprov = i0.ɵɵdefineInjectable({ token: LoginInterceptor, factory: LoginInterceptor.ɵfac, providedIn: "root" });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(LoginInterceptor, [{
                type: i0.Injectable,
                args: [{
                        providedIn: "root"
                    }]
            }], function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.START_CONFIG]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [HTTP_REQUEST_INITIALIZERS]
                        }] }, { type: i5.NotificationsService }, { type: LoginService }, { type: AuthenticationService }];
        }, null);
    })();

    var _enLogin = {
        "modal": {
            "login": {
                "title": "Login",
                "userName": "User name",
                "password": "Password",
                "singleSignOn": "Single sign-on",
                "signInWith": "Sign in with..."
            }
        }
    };

    var _frLogin = {
        "modal": {
            "login": {
                "title": "Connexion",
                "userName": "Identifiant",
                "password": "Mot de passe",
                "singleSignOn": "Authentification unique",
                "signInWith": "S'identifier avec ..."
            }
        },
    };

    var _deLogin = {
        "modal": {
            "login": {
                "title": "Anmeldung",
                "userName": "Benutzername",
                "password": "Passwort",
                "singleSignOn": "Einmalanmeldung (Single sign-on)",
                "signInWith": "Anmelden mit..."
            }
        }
    };

    var enLogin = base.Utils.merge({}, _enLogin, i5$1.enIntl, i4.enModal, i6.enValidation);
    var frLogin = base.Utils.merge({}, _frLogin, i5$1.frIntl, i4.frModal, i6.frValidation);
    var deLogin = base.Utils.merge({}, _deLogin, i5$1.deIntl, i4.deModal, i6.deValidation);

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AuthConfig = AuthConfig;
    exports.AuthenticationOauthService = AuthenticationOauthService;
    exports.AuthenticationPopupService = AuthenticationPopupService;
    exports.AuthenticationService = AuthenticationService;
    exports.ComponentWithLogin = ComponentWithLogin;
    exports.HTTP_REQUEST_INITIALIZERS = HTTP_REQUEST_INITIALIZERS;
    exports.JWTService = JWTService;
    exports.Login = Login;
    exports.LoginInterceptor = LoginInterceptor;
    exports.LoginModule = LoginModule;
    exports.LoginService = LoginService;
    exports.MODAL_LOGIN = MODAL_LOGIN;
    exports.TokenService = TokenService;
    exports.deLogin = deLogin;
    exports.enLogin = enLogin;
    exports.frLogin = frLogin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sinequa-core-login.umd.js.map
