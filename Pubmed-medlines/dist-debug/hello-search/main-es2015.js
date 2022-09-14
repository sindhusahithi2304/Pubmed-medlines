(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+tpp":
/*!*************************************************************!*\
  !*** ./projects/core/login/authentication-oauth.service.ts ***!
  \*************************************************************/
/*! exports provided: AuthenticationOauthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationOauthService", function() { return AuthenticationOauthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-ui-auth */ "xs0O");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");








/**
 * Override ng2-ui-auth's state handling to retrieve a state from the Sinequa server
 */
class AuthenticationOauthService extends ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["OauthService"] {
    constructor(startConfig, httpClient, sharedService, popupService, configService) {
        super(httpClient, sharedService, configService, popupService);
        this.startConfig = startConfig;
        this.httpClient = httpClient;
        this.sharedService = sharedService;
        this.popupService = popupService;
        this.configService = configService;
    }
    authenticate(name, userData) {
        const options = this.configService.options.providers[name];
        if (options.sqInitState) {
            return this.httpClient.get(_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].addUrl(this.startConfig.apiPath, "oauth"), {
                params: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].makeHttpParams({
                    action: "initstate",
                    provider: options.name,
                    tokenInCookie: true,
                    loginInPopup: true,
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["flatMap"])((ret) => {
                options.state = ret.state;
                return super.authenticate(name, userData);
            }));
        }
        return super.authenticate(name, userData);
    }
}
AuthenticationOauthService.ɵfac = function AuthenticationOauthService_Factory(t) { return new (t || AuthenticationOauthService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["SharedService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["PopupService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["ConfigService"])); };
AuthenticationOauthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthenticationOauthService, factory: AuthenticationOauthService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationOauthService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] }, { type: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["SharedService"] }, { type: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["PopupService"] }, { type: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["ConfigService"] }]; }, null); })();


/***/ }),

/***/ "/iXS":
/*!******************************************!*\
  !*** ./projects/core/app-utils/index.ts ***!
  \******************************************/
/*! exports provided: Expr, ExprParserOperator, ExprParser, ExprBuilder, advancedFacetPrefix, Query, AppService, FormatService, AuditInterceptor, AppUtilsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "RDOn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expr", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Expr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprParserOperator", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ExprParserOperator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprParser", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ExprParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprBuilder", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ExprBuilder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "advancedFacetPrefix", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["advancedFacetPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Query"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AppService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormatService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["FormatService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuditInterceptor", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AuditInterceptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppUtilsModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AppUtilsModule"]; });




/***/ }),

/***/ "/paf":
/*!********************************************************!*\
  !*** ./projects/core/app-utils/app-service-helpers.ts ***!
  \********************************************************/
/*! exports provided: AppServiceHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppServiceHelpers", function() { return AppServiceHelpers; });
/**
 * @ignore
 *
 * Used internally to avoid circular references between ExprParser, AppService and FormatService.
 * Do not export from the app-utils module.
 */
class AppServiceHelpers {
    static isString(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 14 /* string */) {
            return true;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & 8388608 /* x */) === 8388608 /* x */) {
            return true;
        }
        return false;
    }
    static isCsv(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & 8388608 /* x */) !== 8388608 /* x */) {
            return true;
        }
        return false;
    }
    static isTree(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & 524292 /* t */) === 524292 /* t */) {
            return true;
        }
        return false;
    }
    static isEntity(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 15 /* csv */ && (column.eTypeModifier & (2068 /* e */ | 2052 /* l */)) === (2068 /* e */ | 2052 /* l */)) {
            return true;
        }
        return false;
    }
    static isBoolean(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 1 /* bool */) {
            return true;
        }
        return false;
    }
    static isDate(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 2 /* date */ || column.eType === 3 /* dateTime */ || column.eType === 4 /* time */) {
            return true;
        }
        return false;
    }
    static isDouble(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 8 /* double */ || column.eType === 7 /* float */) {
            return true;
        }
        return false;
    }
    static isInteger(column) {
        if (!column) {
            return false;
        }
        if (column.eType === 6 /* integer */ || column.eType === 5 /* unsigned */) {
            return true;
        }
        return false;
    }
    static isNumber(column) {
        return AppServiceHelpers.isInteger(column) || AppServiceHelpers.isDouble(column);
    }
    static isScalar(column) {
        return AppServiceHelpers.isNumber(column) || AppServiceHelpers.isDate(column) || AppServiceHelpers.isBoolean(column);
    }
    static isSortable(column) {
        return AppServiceHelpers.isString(column) || AppServiceHelpers.isScalar(column) ||
            (AppServiceHelpers.isCsv(column) && !!column && ((column.eTypeModifier & 2052 /* l */) === 2052 /* l */));
    }
}


/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./projects/hello-search/src/main.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\build\Jenkins\workspace\ice_release_11.6.1_2\sba\ng-ws\projects\hello-search\src\main.ts */"EL6/");


/***/ }),

/***/ "0Jsi":
/*!*************************************!*\
  !*** ./projects/core/base/index.ts ***!
  \*************************************/
/*! exports provided: SqErrorCode, SqError, NameValueArrayViewHelper, IteratorAdaptor, Keys, PatternType, Pattern, Patterns, PatternMatcher, Timer, Utils, BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "lOfs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqErrorCode", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SqErrorCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqError", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SqError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NameValueArrayViewHelper", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["NameValueArrayViewHelper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IteratorAdaptor", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["IteratorAdaptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keys", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Keys"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PatternType", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["PatternType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pattern", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Pattern"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patterns", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Patterns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PatternMatcher", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["PatternMatcher"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Timer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Utils"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]; });




/***/ }),

/***/ "0dSo":
/*!**********************************************!*\
  !*** ./projects/core/login/token.service.ts ***!
  \**********************************************/
/*! exports provided: TokenService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenService", function() { return TokenService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");





/**
 * A service to manage JWT and CSRF tokens. The methods of this service
 * can be called before the authentication process has completed
 */
class TokenService extends _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Retrieve the CSRF token corresponding to the current JWT cookie
     * which should accompany the request. This method is called by
     * [AuthenticationService.autoAuthenticate]{@link AuthenticationService#autoAuthenticate}
     *
     * @param notify `true` if any errors should be notified using the {@NotificationService}
     */
    getCsrfToken(notify = false) {
        return this.httpClient.get(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "getCsrfToken",
                suppressErrors: !notify,
                noUserOverride: true,
                noAutoAuthentication: true,
                noNotify: !notify
            })
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((value) => {
            return value.csrfToken;
        }));
    }
    /**
     * Delete the current JWT cookie.
     * This method is called by [AuthenticationService.logout]{@link AuthenticationService#logout}
     */
    deleteWebTokenCookie() {
        return this.httpClient.get(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "deleteWebTokenCookie",
                noUserOverride: true,
                noAutoAuthentication: true
            })
        });
    }
}
TokenService.ɵfac = function TokenService_Factory(t) { return new (t || TokenService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["SqHttpClient"])); };
TokenService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TokenService, factory: TokenService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TokenService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["START_CONFIG"]]
            }] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ 1:
/*!*******************************************!*\
  !*** ./locale-data/complete.js (ignored) ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1Djx":
/*!**********************************************************!*\
  !*** ./projects/core/load-component/module.providers.ts ***!
  \**********************************************************/
/*! exports provided: LOAD_COMPONENT_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_COMPONENT_MODULE_PROVIDERS", function() { return LOAD_COMPONENT_MODULE_PROVIDERS; });
const LOAD_COMPONENT_MODULE_PROVIDERS = [];



/***/ }),

/***/ "1l3/":
/*!*************************************************************!*\
  !*** ./projects/core/web-services/principal.web.service.ts ***!
  \*************************************************************/
/*! exports provided: PrincipalWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrincipalWebService", function() { return PrincipalWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./http-client */ "4+vC");








/**
 * A service for calling the principal web service
 */
class PrincipalWebService extends _http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this._events = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
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
        return this.httpClient.post(this.makeUrl("principal/userids"), params).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])("principals"));
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__["Utils"].subscribe(observable, (response) => {
            this.principal = response;
            return response;
        }, (error) => {
            console.log("principalService.get failure - error: ", error);
        });
        return observable;
    }
}
PrincipalWebService.ɵfac = function PrincipalWebService_Factory(t) { return new (t || PrincipalWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"])); };
PrincipalWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PrincipalWebService, factory: PrincipalWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrincipalWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "1w50":
/*!*******************************************!*\
  !*** ./projects/core/validation/index.ts ***!
  \*******************************************/
/*! exports provided: VALIDATION_MESSAGE_COMPONENT, ValidationDirective, ValidationErrorPipe, ValidationMessageComponent, ValidationModule, ValidatorType, ValidationService, enValidation, frValidation, deValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "NHXA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VALIDATION_MESSAGE_COMPONENT", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["VALIDATION_MESSAGE_COMPONENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationDirective", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ValidationDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationErrorPipe", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ValidationErrorPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationMessageComponent", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ValidationMessageComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ValidationModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidatorType", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ValidatorType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ValidationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enValidation", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["enValidation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frValidation", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["frValidation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deValidation", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["deValidation"]; });




/***/ }),

/***/ "1zmH":
/*!*****************************************************************!*\
  !*** ./projects/core/web-services/suggest-field.web.service.ts ***!
  \*****************************************************************/
/*! exports provided: SuggestFieldWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuggestFieldWebService", function() { return SuggestFieldWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./http-client */ "4+vC");








/**
 * A service for calling the suggestfield web service
 */
class SuggestFieldWebService extends _http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] {
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])([]);
        }
        else {
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__["Utils"].isArray(fields)) {
                fields = [fields];
            }
            const observable = this.httpClient.post(this.makeUrl("suggestfield"), {
                app: this.appName,
                text: text,
                fields: fields,
                query: query
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((value) => {
                value.suggests.forEach(value => value.display = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__["Utils"].toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                return value.suggests;
            }));
            return observable;
        }
    }
}
SuggestFieldWebService.ɵfac = function SuggestFieldWebService_Factory(t) { return new (t || SuggestFieldWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"])); };
SuggestFieldWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SuggestFieldWebService, factory: SuggestFieldWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SuggestFieldWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "295l":
/*!**********************************************************!*\
  !*** ./projects/core/web-services/suggest/suggestion.ts ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "2Wl+":
/*!******************************************************************!*\
  !*** ./projects/core/validation/validation-message.component.ts ***!
  \******************************************************************/
/*! exports provided: ValidationMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationMessageComponent", function() { return ValidationMessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _intl_message_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../intl/message.pipe */ "cZrR");



const _c0 = function (a0) { return { values: a0 }; };
/**
 * A default component to be used by the {@link ValidationDirective} directive to display
 * a validation error message using {@link MessagePipe}.
 */
class ValidationMessageComponent {
}
ValidationMessageComponent.ɵfac = function ValidationMessageComponent_Factory(t) { return new (t || ValidationMessageComponent)(); };
ValidationMessageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ValidationMessageComponent, selectors: [["sq-validation-message"]], inputs: { text: "text", info: "info" }, decls: 3, vars: 6, consts: [[1, "sq-validation-message"]], template: function ValidationMessageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, ctx.text, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](4, _c0, ctx.info)));
    } }, pipes: [_intl_message_pipe__WEBPACK_IMPORTED_MODULE_1__["MessagePipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ValidationMessageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "sq-validation-message",
                template: `
        <div class="sq-validation-message">{{text | sqMessage:{values: info} }}</div>
    `
            }]
    }], null, { text: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], info: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "3ZYh":
/*!****************************************!*\
  !*** ./projects/core/base/keyboard.ts ***!
  \****************************************/
/*! exports provided: Keys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keys", function() { return Keys; });
/**
 * An enumeration of keyboard code values
 */
var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
    Keys[Keys["del"] = 46] = "del";
    Keys[Keys["tab"] = 9] = "tab";
    Keys[Keys["enter"] = 13] = "enter";
    Keys[Keys["esc"] = 27] = "esc";
    Keys[Keys["comma"] = 188] = "comma";
    Keys[Keys["space"] = 32] = "space";
    Keys[Keys["pageUp"] = 33] = "pageUp";
    Keys[Keys["pageDown"] = 34] = "pageDown";
    Keys[Keys["home"] = 36] = "home";
    Keys[Keys["end"] = 35] = "end";
    Keys[Keys["backspace"] = 8] = "backspace";
})(Keys || (Keys = {}));


/***/ }),

/***/ "4+vC":
/*!***************************************************!*\
  !*** ./projects/core/web-services/http-client.ts ***!
  \***************************************************/
/*! exports provided: SqHttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqHttpClient", function() { return SqHttpClient; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");






/**
 * A helper service that overrides the standard Angular [HttpClient]{@link https://angular.io/api/common/http/HttpClient}
 * to prevent multiple subscribers from causing multiple requests to be issued and to mitigate against request flooding
 */
class SqHttpClient extends _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] {
    constructor(httpHandler) {
        super(httpHandler);
        this.responseCache = new Map();
    }
    getRequestHash(first, url, options = {}) {
        // The replacer ensures that object keys are always serialized in the same order
        const strRequest = JSON.stringify([first, url, options], (key, value) => {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isObject(value) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isIterable(value)) {
                return Object.keys(value).sort().reduce((s, k) => {
                    s[k] = value[k];
                    return s;
                }, {});
            }
            else {
                return value;
            }
        });
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].sha256(strRequest);
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
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])())
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => this.responseCache.delete(requestHash)));
            this.responseCache.set(requestHash, observable);
        }
        return observable;
    }
}
SqHttpClient.ɵfac = function SqHttpClient_Factory(t) { return new (t || SqHttpClient)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHandler"])); };
SqHttpClient.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SqHttpClient, factory: SqHttpClient.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SqHttpClient, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHandler"] }]; }, null); })();


/***/ }),

/***/ "42GA":
/*!********************************************!*\
  !*** ./projects/core/modal/messages/de.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "modal": {
        "buttons": {
            "ok": "OK",
            "cancel": "Abbrechen",
            "yes": "Ja",
            "no": "Nein",
            "abort": "Abbrechen",
            "retry": "Wiederholen",
            "ignore": "Ignorieren"
        },
        "confirm": {
            "title": "Bestätigen"
        },
        "prompt": {
            "title": "Geben Sie einen Wert ein"
        }
    }
});


/***/ }),

/***/ "5/GE":
/*!***************************************************************!*\
  !*** ./projects/hello-search/src/environments/environment.ts ***!
  \***************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "5LyR":
/*!***************************************************************!*\
  !*** ./projects/core/load-component/load-component.module.ts ***!
  \***************************************************************/
/*! exports provided: LoadComponentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadComponentModule", function() { return LoadComponentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _load_component_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./load-component.directive */ "xZxX");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module.providers */ "1Djx");






/**
 * This module provides functionality for the dynamic loading of components based on the
 * techniques described in the [angular documentation]{@link https://angular.io/guide/dynamic-component-loader}
 */
// @dynamic
class LoadComponentModule {
}
LoadComponentModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LoadComponentModule });
LoadComponentModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LoadComponentModule_Factory(t) { return new (t || LoadComponentModule)(); }, providers: [
        ..._module_providers__WEBPACK_IMPORTED_MODULE_4__["LOAD_COMPONENT_MODULE_PROVIDERS"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LoadComponentModule, { declarations: [_load_component_directive__WEBPACK_IMPORTED_MODULE_3__["LoadComponentDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"]], exports: [_load_component_directive__WEBPACK_IMPORTED_MODULE_3__["LoadComponentDirective"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadComponentModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"]
                ],
                declarations: [
                    _load_component_directive__WEBPACK_IMPORTED_MODULE_3__["LoadComponentDirective"]
                ],
                exports: [
                    _load_component_directive__WEBPACK_IMPORTED_MODULE_3__["LoadComponentDirective"]
                ],
                providers: [
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_4__["LOAD_COMPONENT_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "5RFT":
/*!*****************************************************!*\
  !*** ./projects/core/app-utils/module.providers.ts ***!
  \*****************************************************/
/*! exports provided: APP_UTILS_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_UTILS_MODULE_PROVIDERS", function() { return APP_UTILS_MODULE_PROVIDERS; });
const APP_UTILS_MODULE_PROVIDERS = [];



/***/ }),

/***/ "5Vh/":
/*!******************************************!*\
  !*** ./projects/core/base/array-view.ts ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "5irr":
/*!*********************************************!*\
  !*** ./projects/core/modal/modal.module.ts ***!
  \*********************************************/
/*! exports provided: ModalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalModule", function() { return ModalModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sinequa/core/validation */ "1w50");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modal.service */ "hOsg");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./module.providers */ "URRq");
/* harmony import */ var _confirm_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./confirm.component */ "IWiN");
/* harmony import */ var _prompt_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./prompt.component */ "o1VS");





// Sinequa modules









/**
 * This module contains an implementation of a [modal dialog service]{@link ModalService} which can be extended
 * to support UI frameworks such as Bootstrap and Material Design. It uses the `Overlay` and `Portal` funcionality
 * provided by the [Angular CDK]{@link https://material.angular.io/cdk/categories} library.
 */
class ModalModule {
    static forRoot(confirmModal = _confirm_component__WEBPACK_IMPORTED_MODULE_10__["Confirm"], promptModal = _prompt_component__WEBPACK_IMPORTED_MODULE_11__["Prompt"]) {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: _modal_service__WEBPACK_IMPORTED_MODULE_8__["MODAL_CONFIRM"], useValue: confirmModal },
                { provide: _modal_service__WEBPACK_IMPORTED_MODULE_8__["MODAL_PROMPT"], useValue: promptModal },
            ]
        };
    }
}
ModalModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ModalModule });
ModalModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ModalModule_Factory(t) { return new (t || ModalModule)(); }, providers: [
        ..._module_providers__WEBPACK_IMPORTED_MODULE_9__["MODAL_MODULE_PROVIDERS"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            // CDK
            _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__["OverlayModule"],
            _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yModule"],
            // Sinequa modules
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__["BaseModule"],
            _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlModule"],
            _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_7__["ValidationModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ModalModule, { declarations: [_confirm_component__WEBPACK_IMPORTED_MODULE_10__["Confirm"],
        _prompt_component__WEBPACK_IMPORTED_MODULE_11__["Prompt"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        // CDK
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__["OverlayModule"],
        _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yModule"],
        // Sinequa modules
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__["BaseModule"],
        _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlModule"],
        _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_7__["ValidationModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModalModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    // CDK
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_4__["OverlayModule"],
                    _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["A11yModule"],
                    // Sinequa modules
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_5__["BaseModule"],
                    _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlModule"],
                    _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_7__["ValidationModule"],
                ],
                declarations: [
                    _confirm_component__WEBPACK_IMPORTED_MODULE_10__["Confirm"],
                    _prompt_component__WEBPACK_IMPORTED_MODULE_11__["Prompt"]
                ],
                exports: [],
                providers: [
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_9__["MODAL_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "6z6W":
/*!*******************************************!*\
  !*** ./projects/core/intl/intl.module.ts ***!
  \*******************************************/
/*! exports provided: IntlInitializer, IntlModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntlInitializer", function() { return IntlInitializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntlModule", function() { return IntlModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _intl_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intl.service */ "agta");
/* harmony import */ var _message_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message.pipe */ "cZrR");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module.providers */ "VrBK");







/**
 * An APP_INITIALIZER factory function for initialising the {@link IntlService} before any UI is displayed
 */
function IntlInitializer(intlService) {
    const init = () => intlService.init().toPromise();
    return init;
}
/**
 * This module contains core internationalization functionality for the formatting of numbers, dates and strings.
 * It is based on the industry standard
 * [Intl]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl} API
 * and an implementation of the ICU Message syntax provided by [FormatJS]{@link https://formatjs.io/}.
 *
 * The module provides mechanisms for the definition and loading of locales which can be extended with library specific
 * locale information. By default, locales contain support for `Moment.js` and `D3.js`.
 *
 * The module can be initialized by importing it using the `forRoot` static method or otherwise providing the
 * {@link LOCALES_CONFIG} injection token
 */
class IntlModule {
    static forRoot(localeConfig) {
        return {
            ngModule: IntlModule,
            providers: [
                { provide: _intl_service__WEBPACK_IMPORTED_MODULE_3__["LOCALES_CONFIG"], useClass: localeConfig },
            ]
        };
    }
}
IntlModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: IntlModule });
IntlModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function IntlModule_Factory(t) { return new (t || IntlModule)(); }, providers: [
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], useFactory: IntlInitializer, deps: [_intl_service__WEBPACK_IMPORTED_MODULE_3__["IntlService"]], multi: true },
        ..._module_providers__WEBPACK_IMPORTED_MODULE_5__["INTL_MODULE_PROVIDERS"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](IntlModule, { declarations: [_message_pipe__WEBPACK_IMPORTED_MODULE_4__["MessagePipe"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"]], exports: [_message_pipe__WEBPACK_IMPORTED_MODULE_4__["MessagePipe"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IntlModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"]
                ],
                declarations: [
                    _message_pipe__WEBPACK_IMPORTED_MODULE_4__["MessagePipe"]
                ],
                exports: [
                    _message_pipe__WEBPACK_IMPORTED_MODULE_4__["MessagePipe"]
                ],
                providers: [
                    { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], useFactory: IntlInitializer, deps: [_intl_service__WEBPACK_IMPORTED_MODULE_3__["IntlService"]], multi: true },
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_5__["INTL_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "83gw":
/*!*************************************************************!*\
  !*** ./projects/core/login/authentication-popup.service.ts ***!
  \*************************************************************/
/*! exports provided: AuthenticationPopupService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationPopupService", function() { return AuthenticationPopupService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-ui-auth */ "xs0O");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");







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
class AuthenticationPopupService extends ng2_ui_auth__WEBPACK_IMPORTED_MODULE_2__["PopupService"] {
    constructor(startConfig, httpClient) {
        super();
        this.startConfig = startConfig;
        this.httpClient = httpClient;
    }
    open(url, options /*IOauth2Options | IOauth1Options*/, cordova) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].startsWith(url, this.startConfig.apiPath)) {
            return this.httpClient.get(url, {
                params: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].makeHttpParams({
                    noUserOverride: true,
                    noAutoAuthentication: true,
                    tokenInCookie: true,
                    loginInPopup: true
                })
            }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["flatMap"])((ret) => {
                return super.open(ret.redirectUrl, options, cordova);
            }));
        }
        return super.open(url, options, cordova);
    }
}
AuthenticationPopupService.ɵfac = function AuthenticationPopupService_Factory(t) { return new (t || AuthenticationPopupService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"])); };
AuthenticationPopupService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthenticationPopupService, factory: AuthenticationPopupService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationPopupService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "9aDF":
/*!*********************************************************************!*\
  !*** ./projects/core/web-services/similar-documents.web.service.ts ***!
  \*********************************************************************/
/*! exports provided: SimilarDocumentsWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimilarDocumentsWebService", function() { return SimilarDocumentsWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http-client */ "4+vC");






/**
 * A service for calling the similardocuments web service
 */
class SimilarDocumentsWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((response) => response.data));
    }
}
SimilarDocumentsWebService.ɵfac = function SimilarDocumentsWebService_Factory(t) { return new (t || SimilarDocumentsWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"])); };
SimilarDocumentsWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SimilarDocumentsWebService, factory: SimilarDocumentsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SimilarDocumentsWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "9bXo":
/*!*****************************************************************!*\
  !*** ./projects/core/notification/notifications.interceptor.ts ***!
  \*****************************************************************/
/*! exports provided: NotificationsInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsInterceptor", function() { return NotificationsInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _notifications_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifications.service */ "JfT4");







/**
 * An `HttpInterceptor` to process notifications attached to the response body
 * in the `$notifications` member.
 */
class NotificationsInterceptor {
    constructor(startConfig, notificationsService) {
        this.startConfig = startConfig;
        this.notificationsService = notificationsService;
    }
    shouldIntercept(url) {
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].startsWith(url, this.startConfig.apiPath);
    }
    processNotifications(notifications) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isArray(notifications)) {
            for (const notification of notifications) {
                let type = notification.type;
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isUndefined(type)) {
                    type = 1 /* Info */;
                }
                const text = notification.text;
                if (text) {
                    const params = notification.params;
                    const title = notification.title;
                    let autoClose = notification.autoClose;
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isUndefined(autoClose)) {
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
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(event => {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                if (request.responseType === "json" && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isObject(event.body)) {
                    this.processNotifications(event.body.$notifications);
                }
            }
        }));
    }
}
NotificationsInterceptor.ɵfac = function NotificationsInterceptor_Factory(t) { return new (t || NotificationsInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_notifications_service__WEBPACK_IMPORTED_MODULE_5__["NotificationsService"])); };
NotificationsInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotificationsInterceptor, factory: NotificationsInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationsInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _notifications_service__WEBPACK_IMPORTED_MODULE_5__["NotificationsService"] }]; }, null); })();


/***/ }),

/***/ "9jax":
/*!******************************************!*\
  !*** ./projects/core/modal/modal-ref.ts ***!
  \******************************************/
/*! exports provided: ModalRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalRef", function() { return ModalRef; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");


/**
 * An implementation of the {@link IModalRef} interface.
 */
class ModalRef {
    constructor(overlayRef) {
        this.overlayRef = overlayRef;
        this._checkClose = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this._beforeClosed = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this._afterClosed = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.submitListener = (event) => {
            this.submitted = true;
            event.preventDefault();
            return false;
        };
    }
    /**
     * A stream that emits before the referenced modal is closed to allow an observer
     * to cancel the closing.
     */
    checkClose() {
        return this._checkClose.asObservable();
    }
    /**
     * A stream that emits before the referenced modal is closed.
     */
    beforeClosed() {
        return this._beforeClosed.asObservable();
    }
    /**
     * A stream that emits aftervthe referenced modal is closed.
     */
    afterClosed() {
        return this._afterClosed.asObservable();
    }
    /**
     * Close the referenced modal with the passed `result`.
     * @param result The referenced modal's result.
     */
    close(result = -2 /* Cancel */) {
        // Delay to allow submit handling
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].delay().then(() => {
            const checkCloseEvent = { result };
            this._checkClose.next(checkCloseEvent);
            (checkCloseEvent.cancelled || Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(false)).subscribe((cancelled) => {
                if (!cancelled) {
                    this._checkClose.complete();
                    this._beforeClosed.next(result);
                    this._beforeClosed.complete();
                    this.removeSubmitListener();
                    this.overlayRef.detachBackdrop();
                    this.overlayRef.dispose();
                    this.componentInstance = undefined;
                    this._afterClosed.next(result);
                    this._afterClosed.complete();
                }
            });
        });
    }
    /**
     * Disable the standard browser submit handling on any HTML form in the modal component.
     */
    disableSubmit() {
        if (!this.formElement) {
            const formElement = this.overlayRef.overlayElement.querySelector("form");
            if (formElement) {
                this.formElement = formElement;
                this.formElement.addEventListener("submit", this.submitListener);
            }
        }
    }
    removeSubmitListener() {
        if (this.formElement) {
            this.formElement.removeEventListener("submit", this.submitListener);
            this.formElement = undefined;
        }
    }
}


/***/ }),

/***/ "AWjs":
/*!**************************************************!*\
  !*** ./projects/core/notification/public-api.ts ***!
  \**************************************************/
/*! exports provided: NotificationsService, NotificationsInterceptor, NotificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _notifications_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notifications.service */ "JfT4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return _notifications_service__WEBPACK_IMPORTED_MODULE_0__["NotificationsService"]; });

/* harmony import */ var _notifications_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications.interceptor */ "9bXo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationsInterceptor", function() { return _notifications_interceptor__WEBPACK_IMPORTED_MODULE_1__["NotificationsInterceptor"]; });

/* harmony import */ var _notification_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notification.module */ "q3UE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationModule", function() { return _notification_module__WEBPACK_IMPORTED_MODULE_2__["NotificationModule"]; });






/***/ }),

/***/ "AagX":
/*!**************************************************!*\
  !*** ./projects/core/login/login.interceptor.ts ***!
  \**************************************************/
/*! exports provided: HTTP_REQUEST_INITIALIZERS, LoginInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTP_REQUEST_INITIALIZERS", function() { return HTTP_REQUEST_INITIALIZERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginInterceptor", function() { return LoginInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sinequa/core/notification */ "wFkT");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login.service */ "rq/s");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./authentication.service */ "JpD7");










const HTTP_REQUEST_INITIALIZERS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]("HTTP_REQUEST_INITIALIZERS");
/**
 * An `HttpInterceptor` to handle `HTTP 401 unauthorized` error responses by calling
 * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles
 * the `sinequa-jwt-refresh` header set when auto refreshing of JWT is configured in
 * the Sinequa administration console.
 */
class LoginInterceptor {
    constructor(startConfig, requestInitializers, notificationsService, loginService, authService) {
        this.startConfig = startConfig;
        this.requestInitializers = requestInitializers;
        this.notificationsService = notificationsService;
        this.loginService = loginService;
        this.authService = authService;
    }
    processRequestInitializers(request) {
        if (this.requestInitializers) {
            for (const requestInitializer of this.requestInitializers) {
                if (!requestInitializer(request)) {
                    break;
                }
            }
        }
    }
    isJsonable(obj) {
        return (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isObject(obj) || _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isArray(obj)) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isArrayBuffer(obj) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isBlob(obj) &&
            !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isString(obj) && !(obj instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]);
    }
    shouldIntercept(url) {
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].startsWith(url, this.startConfig.apiPath);
    }
    notifyError(error) {
        let message;
        const title = "msg#error.serverError";
        if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
            const response = error;
            try {
                let data = response.error;
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isString(data)) {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (exception) {
                    }
                }
                if (data && data.errorMessage) {
                    message = data.errorMessage;
                    if (data.errorCodeText) {
                        message = `${message} (${data.errorCodeText})`;
                    }
                    else if (data.errorCode) {
                        message = `${message} (${data.errorCode})`;
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
                    message = `${response.statusText} (${response.status})`;
                }
                else {
                    message = `HTTP error: ${response.status}`;
                }
            }
        }
        else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["SqError"].is(error)) {
            message = error.message;
        }
        else {
            message = (error + "") || "msg#error.unknownError";
        }
        this.notificationsService.error(message, undefined, title);
    }
    getCredentials(response, acceptCurrent) {
        return this.loginService.getCredentials(response, acceptCurrent)
            .catch((error) => {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["SqError"].is(error, _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["SqErrorCode"].processedCredentialsError)) {
                return this.getCredentials(response, acceptCurrent);
            }
            throw error;
        });
    }
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
    intercept(request, next) {
        if (!this.shouldIntercept(request.url) || request.params.has("noIntercept")) {
            return next.handle(request);
        }
        let config = { headers: request.headers, params: request.params };
        const options = {
            noAutoAuthentication: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isTrue(config.params.get("noAutoAuthentication")) || false,
            noUserOverride: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isTrue(config.params.get("noUserOverride")) || false,
            hadCredentials: this.authService.haveCredentials,
            userOverrideActive: false
        };
        const noNotify = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isTrue(config.params.get("noNotify")) || false;
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
        const _request = request.clone({
            headers: config.headers,
            params: config.params,
            body: request.body,
            withCredentials: true
        });
        return next.handle(_request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])((error, caught) => {
            this.notificationsService.leave("network");
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
                switch (error.status) {
                    case 401: {
                        return this.handle401Error(error, _request, next, options, caught);
                    }
                }
            }
            if (!noNotify) {
                this.notifyError(error);
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((event) => {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpResponse"]) {
                this.notificationsService.leave("network");
                this.authService.updateAuthentication(event);
            }
            return event;
        }));
    }
    handle401Error(err, req, next, options, caught) {
        if (!options.noAutoAuthentication) {
            if (options.userOverrideActive) {
                if (this.authService.userOverrideActive) {
                    this.authService.deactivateUserOverride();
                    this.authService.userOverrideFailed = true;
                    this.notificationsService.error("msg#error.userOverrideFailure");
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(err);
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.getCredentials(err, !options.hadCredentials))
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(value => {
                const { headers } = this.authService.addAuthentication(req);
                return next.handle(req.clone({ headers }));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => 
            // in case of an Http error, 'caught' must be returned to be catched by the interceptor
            err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"] ? caught : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(err)));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(err);
    }
}
LoginInterceptor.ɵfac = function LoginInterceptor_Factory(t) { return new (t || LoginInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_5__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](HTTP_REQUEST_INITIALIZERS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_notification__WEBPACK_IMPORTED_MODULE_6__["NotificationsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_login_service__WEBPACK_IMPORTED_MODULE_7__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"])); };
LoginInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoginInterceptor, factory: LoginInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_5__["START_CONFIG"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [HTTP_REQUEST_INITIALIZERS]
            }] }, { type: _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_6__["NotificationsService"] }, { type: _login_service__WEBPACK_IMPORTED_MODULE_7__["LoginService"] }, { type: _authentication_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"] }]; }, null); })();


/***/ }),

/***/ "Aeba":
/*!********************************************!*\
  !*** ./projects/core/modal/messages/en.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "modal": {
        "buttons": {
            "ok": "OK",
            "cancel": "Cancel",
            "yes": "Yes",
            "no": "No",
            "abort": "Abort",
            "retry": "Retry",
            "ignore": "Ignore"
        },
        "confirm": {
            "title": "Confirm"
        },
        "prompt": {
            "title": "Enter a value"
        }
    }
});


/***/ }),

/***/ "B2Zq":
/*!*************************************!*\
  !*** ./projects/core/intl/index.ts ***!
  \*************************************/
/*! exports provided: AbstractIntlPipe, IntlInitializer, IntlModule, LOCALES_CONFIG, INTL_CONFIG, IntlService, MessagePipe, enIntl, frIntl, deIntl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "quRv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractIntlPipe", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AbstractIntlPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlInitializer", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["IntlInitializer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["IntlModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOCALES_CONFIG", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LOCALES_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INTL_CONFIG", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["INTL_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["IntlService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessagePipe", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["MessagePipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enIntl", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["enIntl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frIntl", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["frIntl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deIntl", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["deIntl"]; });




/***/ }),

/***/ "BH4H":
/*!*******************************************************************!*\
  !*** ./projects/core/web-services/sponsored-links.web.service.ts ***!
  \*******************************************************************/
/*! exports provided: SponsoredLinksWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SponsoredLinksWebService", function() { return SponsoredLinksWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");








/**
 * A service for calling the query.links web service.
 */
class SponsoredLinksWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: "no query" });
        }
        const url = this.makeUrl("query.links");
        const observable = this.httpClient.post(url, {
            app: this.appName,
            webservice: webService,
            query,
            locale: this.intlService.currentLocale.name
        });
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].subscribe(observable, (response) => {
            console.log("SponsoredLinksService.getLinks success - data: ", response);
            return response;
        }, (error) => {
            console.log("SponsoredLinksService.getLinks failure - error: ", error);
        });
        return observable;
    }
}
SponsoredLinksWebService.ɵfac = function SponsoredLinksWebService_Factory(t) { return new (t || SponsoredLinksWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlService"])); };
SponsoredLinksWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SponsoredLinksWebService, factory: SponsoredLinksWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SponsoredLinksWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }, { type: _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlService"] }]; }, null); })();


/***/ }),

/***/ "Bcrk":
/*!****************************************************************!*\
  !*** ./projects/core/load-component/load-component.service.ts ***!
  \****************************************************************/
/*! exports provided: LoadComponentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadComponentService", function() { return LoadComponentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");



/**
 * This service provides methods to dynamically load and unload an angular component from its type.
 * The component's initial inputs and outputs are respected and the first call to the component's
 * `ngOnChanges` method is made.
 * Changes to the inputs and outputs can be made by calling {@link #bindComponent} which will call
 * the component's `ngOnChanges` method again
 */
class LoadComponentService {
    constructor(componentFactoryResolver, applicationRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.applicationRef = applicationRef;
        // A cache of resolved component factories
        this.factories = new Map();
    }
    _bindComponent(options, loadedComponent, initialLoad) {
        if (!initialLoad) {
            this.unbindComponent(loadedComponent);
        }
        const ngOnChanges = loadedComponent.componentRef.instance.ngOnChanges;
        let simpleChanges;
        const makeSimpleChanges = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isFunction(ngOnChanges) && !!options.inputs;
        if (!!options.inputs) {
            // Assign inputs and generate SimpleChanges if required
            Object.keys(options.inputs).forEach(name => {
                if (makeSimpleChanges) {
                    const previousValue = initialLoad ? undefined : loadedComponent.componentRef.instance[name];
                    const currentValue = options.inputs[name];
                    if (initialLoad || currentValue !== previousValue) {
                        if (!simpleChanges) {
                            simpleChanges = {};
                        }
                        simpleChanges[name] = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SimpleChange"](previousValue, currentValue, initialLoad);
                    }
                }
                loadedComponent.componentRef.instance[name] = options.inputs[name];
            });
        }
        if (!!options.outputs) {
            Object.keys(options.outputs).forEach(name => {
                const eventEmitter = loadedComponent.componentRef.instance[name];
                if (eventEmitter) {
                    const subscription = eventEmitter.subscribe(options.outputs[name]);
                    if (!loadedComponent.subscriptions) {
                        loadedComponent.subscriptions = subscription;
                    }
                    else {
                        loadedComponent.subscriptions.add(subscription);
                    }
                }
            });
        }
        if (simpleChanges) {
            ngOnChanges.call(loadedComponent.componentRef.instance, simpleChanges);
        }
    }
    /**
     * Bind a component's input and output properties according to the passed options. Generate a
     * call to the component's `ngOnChanges` method if the inputs have changed since the last call.
     * If the component has been previously bound it is first unbound by calling {@link #unbindComponent}
     * which will unsubscribe the component's outputs
     *
     * @param options Specify the inputs and outputs for the component
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    bindComponent(options, loadedComponent) {
        return this._bindComponent(options, loadedComponent, false);
    }
    /**
     * Unbind a previously bound dynamically loaded component. Subscriptions to the component's
     * outputs are unsubscribed
     *
     * @param loadedComponent A component loaded by {@link #loadComponent}
     */
    unbindComponent(loadedComponent) {
        if (!!loadedComponent.subscriptions) {
            loadedComponent.subscriptions.unsubscribe();
            loadedComponent.subscriptions = undefined;
        }
    }
    /**
     * Dynamically load a component from its type. The component's inputs and outputs will be initialized
     * by calling {@link #bindComponent}.
     *
     * @param options The options containing the component to load and its inputs and outputs
     * @param viewContainerRef Specifies where the loaded component should be attached. If not specified then the
     * loaded component is inserted before the application component
     * @param injector Overrides the injector to use as the parent for the component. By default this will be
     * the injector held on the `viewContainerRef`
     */
    loadComponent(options, viewContainerRef, injector) {
        let componentRef;
        let factory = this.factories.get(options.component);
        if (!factory) {
            factory = this.componentFactoryResolver.resolveComponentFactory(options.component);
        }
        if (!viewContainerRef) {
            const appElement = this.applicationRef.components[0].location.nativeElement;
            const injector1 = this.applicationRef.components[0].injector;
            componentRef = factory.create(injector1, [[appElement]]);
            this.applicationRef.attachView(componentRef.hostView);
            if (appElement.parentElement) {
                appElement.parentElement.insertBefore(componentRef.location.nativeElement, appElement.nextSibling);
            }
        }
        else {
            if (!injector) {
                injector = viewContainerRef.injector;
            }
            const index = !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isEmpty(options.index) ? options.index : undefined;
            componentRef = viewContainerRef.createComponent(factory, index, injector, []);
        }
        const loadedComponent = {
            componentRef
        };
        this._bindComponent(options, loadedComponent, true);
        loadedComponent.componentRef.changeDetectorRef.detectChanges();
        return loadedComponent;
    }
    /**
     * Unload a dynamically loaded component. It is unbound prior to being destroyed
     *
     * @param component A loaded component
     */
    unloadComponent(component) {
        if (!!component) {
            this.unbindComponent(component);
            component.componentRef.destroy();
        }
    }
}
LoadComponentService.ɵfac = function LoadComponentService_Factory(t) { return new (t || LoadComponentService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"])); };
LoadComponentService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoadComponentService, factory: LoadComponentService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadComponentService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"] }]; }, null); })();


/***/ }),

/***/ "BdUA":
/*!*******************************************!*\
  !*** ./projects/core/intl/messages/fr.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "system": {
        "date": "{time, selectordinal, =0 {{date, date}} other {{date, date} à {date, time, medium}}}",
        "number": "{value, number}",
        "boolean": "{value, select, true {vrai} other {faux}}",
        "percent": "{value, number, percent}",
        "fieldSeparator": " : ",
        "memorySize": {
            "bytes": "{value, number, sqZeroDecimalPlaces} o",
            "kb": "{value, number, sqZeroDecimalPlaces} Ko",
            "mb": "{value, number, sqOneDecimalPlace} Mo",
            "gb": "{value, number, sqTwoDecimalPlaces} Go",
            "tb": "{value, number, sqThreeDecimalPlaces} To",
            "pb": "{value, number, sqFourDecimalPlaces} Po"
        }
    },
    "error": {
        "serverError": "Erreur de serveur",
        "loginCancelled": "Connexion annulée",
        "processedCredentialsError": "Impossible d'obtenir les informations d'identification",
        "autoLoginError": "Echec de la connexion",
        "principalSwitched": "L'utilisateur connecté a été modifié",
        "userOverrideFailure": "Echec de surchargement de l'utilisateur",
        "responseLoadFailure": "Echec de chargement de la réponse",
        "unknownError": "Erreur inconnue"
    },
    "language": {
        "ar": "Arabe",
        "da": "Danois",
        "de": "Allemand",
        "el": "Grec",
        "en": "Anglais",
        "es": "Espagnol",
        "fi": "Finlandais",
        "fr": "Français",
        "it": "Italien",
        "ja": "Japonais",
        "ko": "Coréen",
        "nl": "Néerlandais",
        "no": "Norvégien",
        "pl": "Polonais",
        "pt": "Portugais",
        "ro": "Roumain",
        "ru": "Russe",
        "sv": "Suédois",
        "th": "Thaïlandais",
        "zh": "Chinois traditionnel",
        "zs": "Chinois simplifié",
        "zz": "Inconnu"
    },
});


/***/ }),

/***/ "CR/k":
/*!************************************************!*\
  !*** ./projects/core/base/iterator-adaptor.ts ***!
  \************************************************/
/*! exports provided: IteratorAdaptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IteratorAdaptor", function() { return IteratorAdaptor; });
class IteratorAdaptor {
    constructor(base, adaptor) {
        this.base = base;
        this.adaptor = adaptor;
        this.return = (base.return) ? (v) => this.translate(this.base.return(v)) : undefined;
        this.throw = (base.throw) ? (e) => this.translate(this.base.throw(e)) : undefined;
    }
    static forIterable(iterable, adaptor) {
        /*if (iterable === undefined) {
            return undefined;
        }*/
        return new IteratorAdaptor(iterable[Symbol.iterator](), adaptor);
    }
    translate(result) {
        if (result.done) {
            return {
                done: result.done,
                value: (result.done && result.value === undefined) ? undefined : this.adaptor(result.value)
            };
        }
        else {
            return {
                value: this.adaptor(result.value)
            };
        }
    }
    next(value) { return this.translate(this.base.next(value)); }
    [Symbol.iterator]() { return this; }
}


/***/ }),

/***/ "Dn18":
/*!***********************************************************!*\
  !*** ./projects/core/web-services/web-services.module.ts ***!
  \***********************************************************/
/*! exports provided: StartConfigInitializer, WebServicesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartConfigInitializer", function() { return StartConfigInitializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebServicesModule", function() { return WebServicesModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./module.providers */ "P8YC");



// Intl is required by various web services


// StartConfig



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
                { provide: _start_config_web_service__WEBPACK_IMPORTED_MODULE_5__["START_CONFIG"], useValue: startConfig },
            ]
        };
    }
}
WebServicesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: WebServicesModule });
WebServicesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function WebServicesModule_Factory(t) { return new (t || WebServicesModule)(); }, providers: [
        // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"], useFactory: StartConfigInitializer, deps: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_5__["StartConfigWebService"]], multi: true },
        ..._module_providers__WEBPACK_IMPORTED_MODULE_6__["WEB_SERVICES_MODULE_PROVIDERS"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["BaseModule"],
            _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WebServicesModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["BaseModule"],
        _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](WebServicesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["BaseModule"],
                    _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlModule"]
                ],
                declarations: [],
                exports: [],
                providers: [
                    // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
                    { provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"], useFactory: StartConfigInitializer, deps: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_5__["StartConfigWebService"]], multi: true },
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_6__["WEB_SERVICES_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "Dw/y":
/*!**************************************************!*\
  !*** ./projects/core/web-services/public-api.ts ***!
  \**************************************************/
/*! exports provided: ExportSourceType, ExportOutputFormat, MINIMUM_COMPATIBLE_SERVER_API_VERSION, AppWebService, AuditWebService, DatasetWebService, DownloadWebService, SqHttpClient, HttpService, JsonMethodPluginService, LabelsWebService, PreviewWebService, PrincipalWebService, QueryExportWebService, DidYouMeanKind, RFMDisplay, QueryWebService, RecentQueriesList, RecentQueries, RecentQueriesWebService, RfmWebService, SimilarDocumentsWebService, SponsoredLinksWebService, START_CONFIG, StartConfigWebService, SuggestFieldWebService, SuggestQueryWebService, UserRatingsWebService, UserSettingsWebService, QueryIntentWebService, StartConfigInitializer, WebServicesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_ccapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/ccapp */ "RGzw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExportSourceType", function() { return _config_ccapp__WEBPACK_IMPORTED_MODULE_0__["ExportSourceType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExportOutputFormat", function() { return _config_ccapp__WEBPACK_IMPORTED_MODULE_0__["ExportOutputFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MINIMUM_COMPATIBLE_SERVER_API_VERSION", function() { return _config_ccapp__WEBPACK_IMPORTED_MODULE_0__["MINIMUM_COMPATIBLE_SERVER_API_VERSION"]; });

/* harmony import */ var _query_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query/query */ "KzIo");
/* empty/unused harmony star reexport *//* harmony import */ var _suggest_suggestion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./suggest/suggestion */ "295l");
/* empty/unused harmony star reexport *//* harmony import */ var _app_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.web.service */ "Jj6A");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppWebService", function() { return _app_web_service__WEBPACK_IMPORTED_MODULE_3__["AppWebService"]; });

/* harmony import */ var _audit_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audit.web.service */ "KMMg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuditWebService", function() { return _audit_web_service__WEBPACK_IMPORTED_MODULE_4__["AuditWebService"]; });

/* harmony import */ var _dataset_web_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dataset.web.service */ "vn9G");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatasetWebService", function() { return _dataset_web_service__WEBPACK_IMPORTED_MODULE_5__["DatasetWebService"]; });

/* harmony import */ var _download_web_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./download.web.service */ "PTTq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DownloadWebService", function() { return _download_web_service__WEBPACK_IMPORTED_MODULE_6__["DownloadWebService"]; });

/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./http-client */ "4+vC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqHttpClient", function() { return _http_client__WEBPACK_IMPORTED_MODULE_7__["SqHttpClient"]; });

/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return _http_service__WEBPACK_IMPORTED_MODULE_8__["HttpService"]; });

/* harmony import */ var _json_method_plugin_web_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./json-method-plugin.web.service */ "Qrzu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonMethodPluginService", function() { return _json_method_plugin_web_service__WEBPACK_IMPORTED_MODULE_9__["JsonMethodPluginService"]; });

/* harmony import */ var _labels_web_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./labels.web.service */ "g9Qo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LabelsWebService", function() { return _labels_web_service__WEBPACK_IMPORTED_MODULE_10__["LabelsWebService"]; });

/* harmony import */ var _preview_web_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./preview.web.service */ "wSrR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewWebService", function() { return _preview_web_service__WEBPACK_IMPORTED_MODULE_11__["PreviewWebService"]; });

/* harmony import */ var _principal_web_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./principal.web.service */ "1l3/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrincipalWebService", function() { return _principal_web_service__WEBPACK_IMPORTED_MODULE_12__["PrincipalWebService"]; });

/* harmony import */ var _query_export_web_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./query-export.web.service */ "fw2B");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryExportWebService", function() { return _query_export_web_service__WEBPACK_IMPORTED_MODULE_13__["QueryExportWebService"]; });

/* harmony import */ var _query_web_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./query.web.service */ "Ty8X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DidYouMeanKind", function() { return _query_web_service__WEBPACK_IMPORTED_MODULE_14__["DidYouMeanKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RFMDisplay", function() { return _query_web_service__WEBPACK_IMPORTED_MODULE_14__["RFMDisplay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryWebService", function() { return _query_web_service__WEBPACK_IMPORTED_MODULE_14__["QueryWebService"]; });

/* harmony import */ var _recent_queries_web_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./recent-queries.web.service */ "bF1N");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentQueriesList", function() { return _recent_queries_web_service__WEBPACK_IMPORTED_MODULE_15__["RecentQueriesList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentQueries", function() { return _recent_queries_web_service__WEBPACK_IMPORTED_MODULE_15__["RecentQueries"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentQueriesWebService", function() { return _recent_queries_web_service__WEBPACK_IMPORTED_MODULE_15__["RecentQueriesWebService"]; });

/* harmony import */ var _rfm_web_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./rfm.web.service */ "GcAR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RfmWebService", function() { return _rfm_web_service__WEBPACK_IMPORTED_MODULE_16__["RfmWebService"]; });

/* harmony import */ var _similar_documents_web_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./similar-documents.web.service */ "9aDF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimilarDocumentsWebService", function() { return _similar_documents_web_service__WEBPACK_IMPORTED_MODULE_17__["SimilarDocumentsWebService"]; });

/* harmony import */ var _sponsored_links_web_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./sponsored-links.web.service */ "BH4H");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SponsoredLinksWebService", function() { return _sponsored_links_web_service__WEBPACK_IMPORTED_MODULE_18__["SponsoredLinksWebService"]; });

/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "START_CONFIG", function() { return _start_config_web_service__WEBPACK_IMPORTED_MODULE_19__["START_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StartConfigWebService", function() { return _start_config_web_service__WEBPACK_IMPORTED_MODULE_19__["StartConfigWebService"]; });

/* harmony import */ var _suggest_field_web_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./suggest-field.web.service */ "1zmH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuggestFieldWebService", function() { return _suggest_field_web_service__WEBPACK_IMPORTED_MODULE_20__["SuggestFieldWebService"]; });

/* harmony import */ var _suggest_query_web_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./suggest-query.web.service */ "Py9Q");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuggestQueryWebService", function() { return _suggest_query_web_service__WEBPACK_IMPORTED_MODULE_21__["SuggestQueryWebService"]; });

/* harmony import */ var _user_ratings_web_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./user-ratings.web.service */ "dn7x");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserRatingsWebService", function() { return _user_ratings_web_service__WEBPACK_IMPORTED_MODULE_22__["UserRatingsWebService"]; });

/* harmony import */ var _user_settings_web_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./user-settings.web.service */ "jWhr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserSettingsWebService", function() { return _user_settings_web_service__WEBPACK_IMPORTED_MODULE_23__["UserSettingsWebService"]; });

/* harmony import */ var _queryintent_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./queryintent.service */ "MCeZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryIntentWebService", function() { return _queryintent_service__WEBPACK_IMPORTED_MODULE_24__["QueryIntentWebService"]; });

/* harmony import */ var _web_services_module__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./web-services.module */ "Dn18");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StartConfigInitializer", function() { return _web_services_module__WEBPACK_IMPORTED_MODULE_25__["StartConfigInitializer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebServicesModule", function() { return _web_services_module__WEBPACK_IMPORTED_MODULE_25__["WebServicesModule"]; });





























/***/ }),

/***/ "EI9X":
/*!*****************************************************!*\
  !*** ./projects/core/app-utils/app-utils.module.ts ***!
  \*****************************************************/
/*! exports provided: AppUtilsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppUtilsModule", function() { return AppUtilsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module.providers */ "5RFT");






/**
 * This module contains a utility {@link AppService} for managing the configuration of a Sinequa SBA and a {@link FormatService}
 * for handling the formatting and parsing of Sinequa field values. It also contains an implementation of a {@link Query} class
 * as well as classes for manipulating Sinequa fielded search expressions.
 *
 * The {@link AuditInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
class AppUtilsModule {
}
AppUtilsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppUtilsModule });
AppUtilsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppUtilsModule_Factory(t) { return new (t || AppUtilsModule)(); }, providers: [
        ..._module_providers__WEBPACK_IMPORTED_MODULE_4__["APP_UTILS_MODULE_PROVIDERS"]
    ], imports: [[
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["BaseModule"],
            _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_2__["IntlModule"],
            _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["WebServicesModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppUtilsModule, { imports: [_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["BaseModule"],
        _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_2__["IntlModule"],
        _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["WebServicesModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppUtilsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["BaseModule"],
                    _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_2__["IntlModule"],
                    _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["WebServicesModule"]
                ],
                declarations: [],
                exports: [],
                providers: [
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_4__["APP_UTILS_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "EL6/":
/*!*******************************************!*\
  !*** ./projects/hello-search/src/main.ts ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "yLV6");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "5/GE");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "jJFg");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"], { preserveWhitespaces: true })
    .catch(err => console.error(err));


/***/ }),

/***/ "GcAR":
/*!*******************************************************!*\
  !*** ./projects/core/web-services/rfm.web.service.ts ***!
  \*******************************************************/
/*! exports provided: RfmWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RfmWebService", function() { return RfmWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");







/**
 * A service for calling the search.rfm web service
 */
class RfmWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
            return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
        }
        const data = {
            rfm,
            queryHash: results.rfmQueryHash,
            ids
        };
        const observable = this.httpClient.post(this.makeUrl(RfmWebService.endpoint), data);
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("rfmService.getRfmData failure - error: ", error);
        });
        return observable;
    }
}
RfmWebService.endpoint = "search.rfm";
RfmWebService.ɵfac = function RfmWebService_Factory(t) { return new (t || RfmWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"])); };
RfmWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RfmWebService, factory: RfmWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RfmWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "GsAy":
/*!**********************************************************!*\
  !*** ./projects/core/validation/validation.directive.ts ***!
  \**********************************************************/
/*! exports provided: VALIDATION_MESSAGE_COMPONENT, ValidationDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATION_MESSAGE_COMPONENT", function() { return VALIDATION_MESSAGE_COMPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationDirective", function() { return ValidationDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/load-component */ "UBHK");
/* harmony import */ var _validation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation.service */ "N74W");






/**
 * An injection token that can be provided to override the component loaded by {@link ValidationDirective}
 * to display validation error messages. The default component is {@link ValidationMessageComponent}.
 */
const VALIDATION_MESSAGE_COMPONENT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]("VALIDATION_MESSAGE_COMPONENT");
/**
 * A directive to automatically add validity classes to the element to which it is attached. In addition,
 * when the associated `FormControl` is invalid a component is dynamically loaded after the element to display
 * the validation message.
 * The component to load can be specified by providing the {@link VALIDATION_MESSAGE_COMPONENT} injection token.
 * By default, the {@link ValidationMessageComponent} component is used.
 */
class ValidationDirective {
    constructor(validationMessageComponent, viewContainerRef, loadComponentService, validationService) {
        this.validationMessageComponent = validationMessageComponent;
        this.viewContainerRef = viewContainerRef;
        this.loadComponentService = loadComponentService;
        this.validationService = validationService;
        this.element = viewContainerRef.element.nativeElement;
    }
    ngOnInit() {
        if (!this.options) {
            console.log("Validation.ngOnInit - no options");
            return;
        }
        let controlName;
        if (this.options instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]) {
            this.form = this.options;
        }
        else {
            this.form = this.options.form;
            controlName = this.options.controlName;
            this.validClass = this.options.validClass;
            this.invalidClass = this.options.invalidClass;
            this.childSelector = this.options.childSelector;
            this.errorMessages = this.options.errorMessages;
        }
        if (!this.form) {
            console.log("Validation.ngOnInit - no form model");
            return;
        }
        if (!this.form.controls) {
            console.log("Validation.ngOnInit - no form controls");
            return;
        }
        if (controlName) {
            this.control = this.form.controls[controlName];
        }
        else {
            const formControlName = this.element.getAttribute("formControlName");
            if (formControlName) {
                this.control = this.form.controls[formControlName];
            }
        }
        if (!this.control) {
            console.log("Validation.ngOnInit - no control");
            return;
        }
        if (!this.validClass) {
            this.validClass = "is-valid";
        }
        if (!this.invalidClass) {
            this.invalidClass = "is-invalid";
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isUndefined(this.childSelector)) {
            this.childSelector = ".form-control";
        }
        this.valid = this.control.valid;
        this.dirty = this.control.dirty;
        this.active = true;
        this.error = undefined;
    }
    getFirstError() {
        if (this.control.errors) {
            return Object.keys(this.control.errors)[0];
        }
        return undefined;
    }
    getErrorText(error) {
        if (error && this.errorMessages && !!this.errorMessages[error]) {
            return this.errorMessages[error];
        }
        return this.validationService.getErrorText(error);
    }
    getErrorInfo(error) {
        if (error && this.control.errors) {
            return this.control.errors[error];
        }
        return undefined;
    }
    setValidityClasses() {
        const add = this.control.valid ? this.validClass : this.invalidClass;
        const remove = this.control.valid ? this.invalidClass : this.validClass;
        if (remove) {
            this.element.classList.remove(remove);
        }
        if (add) {
            this.element.classList.add(add);
        }
        if (this.childSelector) {
            const children = Array.from(this.element.querySelectorAll(this.childSelector));
            children.forEach(element => {
                if (remove) {
                    element.classList.remove(remove);
                }
                if (add) {
                    element.classList.add(add);
                }
            });
        }
    }
    removeValidityClasses() {
        if (this.validClass) {
            this.element.classList.remove(this.validClass);
        }
        if (this.invalidClass) {
            this.element.classList.remove(this.invalidClass);
        }
        if (this.childSelector) {
            const children = Array.from(this.element.querySelectorAll(this.childSelector));
            children.forEach(element => {
                if (this.validClass) {
                    element.classList.remove(this.validClass);
                }
                if (this.invalidClass) {
                    element.classList.remove(this.invalidClass);
                }
            });
        }
    }
    /**
     * Update the validity classes on the element depending on the validity state of the
     * associated `FormControl`. If the control is invalid then the validation message component
     * is loaded to display an error message.
     */
    ngDoCheck() {
        if (!this.active) {
            return;
        }
        if (this.valid === this.control.valid && this.dirty === this.control.dirty) {
            const firstError = this.getFirstError();
            const errorInfo = this.getErrorInfo(firstError);
            if (firstError === this.error && errorInfo === this.errorInfo) {
                return;
            }
            this.error = firstError;
            this.errorInfo = errorInfo;
        }
        this.valid = this.control.valid;
        this.dirty = this.control.dirty;
        if (this.control.dirty) {
            this.setValidityClasses();
            if (this.control.valid) {
                if (this.validationMessage) {
                    this.validationMessage.componentRef.instance.text = "";
                }
            }
            else {
                if (!this.validationMessage) {
                    this.validationMessage =
                        this.loadComponentService.loadComponent({ component: this.validationMessageComponent }, this.viewContainerRef);
                }
                const error = this.getFirstError();
                this.validationMessage.componentRef.instance.text = this.getErrorText(error);
                this.validationMessage.componentRef.instance.info = this.getErrorInfo(error);
            }
        }
        else {
            this.removeValidityClasses();
            if (this.validationMessage) {
                this.validationMessage.componentRef.instance.text = "";
            }
        }
    }
}
ValidationDirective.ɵfac = function ValidationDirective_Factory(t) { return new (t || ValidationDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](VALIDATION_MESSAGE_COMPONENT), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_3__["LoadComponentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_validation_service__WEBPACK_IMPORTED_MODULE_4__["ValidationService"])); };
ValidationDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: ValidationDirective, selectors: [["", "sqValidation", ""]], inputs: { options: ["sqValidation", "options"] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ValidationDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: "[sqValidation]"
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Type"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [VALIDATION_MESSAGE_COMPONENT]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] }, { type: _sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_3__["LoadComponentService"] }, { type: _validation_service__WEBPACK_IMPORTED_MODULE_4__["ValidationService"] }]; }, { options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ["sqValidation"]
        }] }); })();


/***/ }),

/***/ "Hrmr":
/*!*******************************************************!*\
  !*** ./projects/core/validation/validation.module.ts ***!
  \*******************************************************/
/*! exports provided: ValidationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationModule", function() { return ValidationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/app-utils */ "/iXS");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sinequa/core/load-component */ "UBHK");
/* harmony import */ var _validation_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation.directive */ "GsAy");
/* harmony import */ var _validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./validation-error.pipe */ "lbUz");
/* harmony import */ var _validation_message_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./validation-message.component */ "2Wl+");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./module.providers */ "g2WM");











/**
 * This module contains facilities for working with Angular's form validation. It provides a
 * {@link ValidationService} that works with {@link IntlService} and {@link FormatService} to
 * support locale-sensitive validators.
 */
class ValidationModule {
}
ValidationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: ValidationModule });
ValidationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function ValidationModule_Factory(t) { return new (t || ValidationModule)(); }, providers: [
        { provide: _validation_directive__WEBPACK_IMPORTED_MODULE_6__["VALIDATION_MESSAGE_COMPONENT"], useValue: _validation_message_component__WEBPACK_IMPORTED_MODULE_8__["ValidationMessageComponent"] },
        ..._module_providers__WEBPACK_IMPORTED_MODULE_9__["VALIDATION_MODULE_PROVIDERS"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"],
            _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__["AppUtilsModule"],
            _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlModule"],
            _sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_5__["LoadComponentModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ValidationModule, { declarations: [_validation_directive__WEBPACK_IMPORTED_MODULE_6__["ValidationDirective"], _validation_message_component__WEBPACK_IMPORTED_MODULE_8__["ValidationMessageComponent"], _validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__["ValidationErrorPipe"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"],
        _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__["AppUtilsModule"],
        _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlModule"],
        _sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_5__["LoadComponentModule"]], exports: [_validation_directive__WEBPACK_IMPORTED_MODULE_6__["ValidationDirective"], _validation_message_component__WEBPACK_IMPORTED_MODULE_8__["ValidationMessageComponent"], _validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__["ValidationErrorPipe"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ValidationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["BaseModule"],
                    _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__["AppUtilsModule"],
                    _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlModule"],
                    _sinequa_core_load_component__WEBPACK_IMPORTED_MODULE_5__["LoadComponentModule"]
                ],
                declarations: [
                    _validation_directive__WEBPACK_IMPORTED_MODULE_6__["ValidationDirective"], _validation_message_component__WEBPACK_IMPORTED_MODULE_8__["ValidationMessageComponent"], _validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__["ValidationErrorPipe"],
                ],
                exports: [
                    _validation_directive__WEBPACK_IMPORTED_MODULE_6__["ValidationDirective"], _validation_message_component__WEBPACK_IMPORTED_MODULE_8__["ValidationMessageComponent"], _validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__["ValidationErrorPipe"],
                ],
                providers: [
                    { provide: _validation_directive__WEBPACK_IMPORTED_MODULE_6__["VALIDATION_MESSAGE_COMPONENT"], useValue: _validation_message_component__WEBPACK_IMPORTED_MODULE_8__["ValidationMessageComponent"] },
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_9__["VALIDATION_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "IGgQ":
/*!*************************************************!*\
  !*** ./projects/core/login/module.providers.ts ***!
  \*************************************************/
/*! exports provided: LOGIN_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_MODULE_PROVIDERS", function() { return LOGIN_MODULE_PROVIDERS; });
const LOGIN_MODULE_PROVIDERS = [];



/***/ }),

/***/ "IWiN":
/*!**************************************************!*\
  !*** ./projects/core/modal/confirm.component.ts ***!
  \**************************************************/
/*! exports provided: Confirm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Confirm", function() { return Confirm; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.service */ "hOsg");
/* harmony import */ var _modal_ref__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-ref */ "9jax");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _intl_message_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../intl/message.pipe */ "cZrR");







function Confirm_ng_container_8_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Confirm_ng_container_8_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5); const button_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.buttonClick(button_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "sqMessage");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const button_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("type", button_r1.primary ? "submit" : "button");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 2, button_r1.getText()));
} }
function Confirm_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, Confirm_ng_container_8_button_1_Template, 3, 4, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const button_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", button_r1.visible);
} }
class Confirm {
    constructor(model, modalRef) {
        this.model = model;
        this.modalRef = modalRef;
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }
    buttonClick(button) {
        button.click(this.modalRef);
    }
}
Confirm.ɵfac = function Confirm_Factory(t) { return new (t || Confirm)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_modal_service__WEBPACK_IMPORTED_MODULE_1__["MODAL_MODEL"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_modal_ref__WEBPACK_IMPORTED_MODULE_2__["ModalRef"])); };
Confirm.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Confirm, selectors: [["sq-core-confirm"]], decls: 9, vars: 9, consts: [["cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], [4, "ngFor", "ngForOf"], [3, "type", "click", 4, "ngIf"], [3, "type", "click"]], template: function Confirm_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, Confirm_ng_container_8_Template, 2, 1, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkTrapFocusAutoCapture", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 4, ctx.title));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](6, 6, ctx.model.message, ctx.model.messageParams));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.model.buttons);
    } }, directives: [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__["CdkTrapFocus"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], pipes: [_intl_message_pipe__WEBPACK_IMPORTED_MODULE_5__["MessagePipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Confirm, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "sq-core-confirm",
                template: `
        <div style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <hr>
            <ng-container *ngFor="let button of model.buttons">
                <button *ngIf="button.visible" type="{{button.primary ? 'submit' : 'button'}}"
                    (click)="buttonClick(button)">{{button.getText() | sqMessage}}</button>
            </ng-container>
        </div>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_modal_service__WEBPACK_IMPORTED_MODULE_1__["MODAL_MODEL"]]
            }] }, { type: _modal_ref__WEBPACK_IMPORTED_MODULE_2__["ModalRef"] }]; }, null); })();


/***/ }),

/***/ "JfT4":
/*!*************************************************************!*\
  !*** ./projects/core/notification/notifications.service.ts ***!
  \*************************************************************/
/*! exports provided: NotificationsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return NotificationsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");




/**
 * This service provides methods for managing notifications. No user interface
 * is imposed. It also manages a key-value data store. Events are emitted
 * when the notifications and data store are updated.
 */
class NotificationsService {
    constructor() {
        this._events = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this._notificationsStream = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.data = {};
        this.notifications = [];
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * Get the obervable stream of notification events.
     */
    get events() {
        return this._events;
    }
    /**
     * Get the observable stream of notifications. This will
     * emit each time a notification is added. It will also emit
     * `null` when notifications are deleted.
     */
    get notificationsStream() {
        return this._notificationsStream;
    }
    /**
     * Set a value in the data store. The `data-updated` event
     * is emitted.
     *
     * @param key The value's key.
     * @param value The value.
     */
    set(key, value) {
        this.data[key] = value;
        this._events.next({ type: "data-updated" });
    }
    /**
     * Get a value from the data store.
     *
     * @param key The value's key.
     */
    get(key) {
        return this.data[key];
    }
    /**
     * Increment a counter in the data store identified by the passed `key`.
     * The intial value is 0.
     *
     * @param key The key for the counter.
     */
    enter(key) {
        let value = this.data[key];
        if (!value) {
            value = 0;
        }
        value++;
        this.set(key, value);
    }
    /**
     * Decrement a counter in the data store identified by the passed `key`.
     * Calls to `leave` should match calls to `enter`. If the counter becomes negative
     * an "underflow" warning is emitted to the console and the counter set to 0.
     *
     * @param key The key for the counter.
     */
    leave(key) {
        let value = this.data[key];
        value--;
        if (value < 0) {
            console.warn("NotificationsService.leave underflow for:", key);
        }
        if (!value || value < 0) {
            value = 0;
        }
        this.set(key, value);
    }
    /**
     * `true` if there are current notifications.
     */
    get haveNotifications() {
        return this.notifications.length > 0;
    }
    /**
     * `true` if the all current notifications are in the `Showing` state.
     */
    get allNotificationsShowing() {
        for (const notification of this.notifications) {
            if (notification.state !== 1 /* Showing */) {
                return false;
            }
        }
        return true;
    }
    /**
     * `true` if all current notifications are in the `Hidden` state.
     */
    get allNotificationsHidden() {
        for (const notification of this.notifications) {
            if (notification.state !== 2 /* Hidden */) {
                return false;
            }
        }
        return true;
    }
    /**
     * Gets the last added notification.
     */
    get lastNotification() {
        if (this.notifications.length > 0) {
            return this.notifications[this.notifications.length - 1];
        }
        return undefined;
    }
    /**
     * Add a notification. The `updated` event is emitted and the added notification
     * is emitted on the notifications stream.
     *
     * @param type The notification type.
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     * @param autoClose A flag determining whether the notification should auto-close.
     */
    notify(type, text, params, title, autoClose) {
        const notification = {
            type,
            text,
            params,
            title,
            autoClose
        };
        // Replace the last notification if it is the same as the new one
        const lastNotification = this.lastNotification;
        if (lastNotification) {
            notification.state = lastNotification.state;
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].equals(notification, lastNotification)) {
                this.notifications.splice(this.notifications.length - 1, 1);
            }
        }
        notification.state = 0 /* Initial */;
        this.notifications.push(notification);
        this._events.next({ type: "updated" });
        this._notificationsStream.next(notification);
        return notification;
    }
    /**
     * Add a `Success` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    success(text, params, title) {
        return this.notify(0 /* Success */, text, params, title, true);
    }
    /**
     * Add an `Info` type notification. The notification will auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    info(text, params, title) {
        return this.notify(1 /* Info */, text, params, title, true);
    }
    /**
     * Add a `Warning` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    warning(text, params, title) {
        return this.notify(2 /* Warning */, text, params, title, false);
    }
    /**
     * Add an `Error` type notification. The nofification will not auto-close.
     *
     * @param text The notification message text.
     * @param params Parameters for the message text.
     * @param title The notification title.
     */
    error(text, params, title) {
        return this.notify(3 /* Error */, text, params, title, false);
    }
    /**
     * Set the state of all notifications to `Showing`. The `updated` event is
     * emitted.
     */
    showNotifications() {
        for (const notification of this.notifications) {
            notification.state = 1 /* Showing */;
        }
        this._events.next({ type: "updated" });
    }
    /**
     * Set the state of all notifications to `Hidden`. The `updated` event is
     * emitted.
     */
    hideNotifications() {
        for (const notification of this.notifications) {
            notification.state = 2 /* Hidden */;
        }
        this._events.next({ type: "updated" });
    }
    /**
     * Delete all notifications. The `updated` event is
     * emitted. `null` is emitted on the notifications stream.
     */
    deleteAllNotifications() {
        this.notifications.splice(0);
        this._events.next({ type: "updated" });
        this._notificationsStream.next(undefined);
    }
    /**
     * Delete the passed `notification`. The `updated` event is
     * emitted. `null` is emitted on the notifications stream if no notifications
     * remain.
     *
     * @param notification The notification to delete.
     */
    deleteNotification(notification) {
        for (let i = 0, ic = this.notifications.length; i < ic; i++) {
            if (this.notifications[i] === notification) {
                this.notifications.splice(i, 1);
                this._events.next({ type: "updated" });
                if (this.notifications.length === 0) {
                    this._notificationsStream.next(undefined);
                }
                break;
            }
        }
    }
    /**
     * Close the passed `notification`. If the notification is in the
     * `Initial` state then its state is set to `Hidden` otherwise the
     * notification is deleted. The `updated` event is emitted.
     *
     * @param notification The notification to close.
     */
    closeNotification(notification) {
        if (notification.state === 0 /* Initial */) {
            notification.state = 2 /* Hidden */;
            this._events.next({ type: "updated" });
        }
        else {
            this.deleteNotification(notification);
        }
    }
}
NotificationsService.ɵfac = function NotificationsService_Factory(t) { return new (t || NotificationsService)(); };
NotificationsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "Jj6A":
/*!*******************************************************!*\
  !*** ./projects/core/web-services/app.web.service.ts ***!
  \*******************************************************/
/*! exports provided: AppWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppWebService", function() { return AppWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http-client */ "4+vC");





/**
 * This service provides methods to retrieve and refresh the configuration of an app
 */
class AppWebService extends _http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
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
AppWebService.ɵfac = function AppWebService_Factory(t) { return new (t || AppWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_3__["SqHttpClient"])); };
AppWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AppWebService, factory: AppWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_3__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "JpD7":
/*!*******************************************************!*\
  !*** ./projects/core/login/authentication.service.ts ***!
  \*******************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _token_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token.service */ "0dSo");
/* harmony import */ var _jwt_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./jwt.service */ "bO3L");
/* harmony import */ var ng2_ui_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-ui-auth */ "xs0O");










const LEGACY_PROCESSED_CREDENTIALS_KIND = 0;
/**
 * A service to authenticate a user with a Sinequa server. Authentication can be automatic (OAuth/SAML), if configured in the
 * Sinequa administration, or manual where the user name and password are entered in a modal dialog box and transmitted in
 * clear text. There is also support for the ng2-ui-auth library where the authentication process occurs in a browser popup window.
 * Successful authentication results in a JWT stored in cookie along with a CSRF token which is stored in storage so it can
 * be picked up in other browser tabs.
 *
 * The service also holds information on the status of the "override user" administrator function
 */
class AuthenticationService extends _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["HttpService"] {
    constructor(startConfig, httpClient, tokenService, auditService, jWTService, authService) {
        super(startConfig);
        this.httpClient = httpClient;
        this.tokenService = tokenService;
        this.auditService = auditService;
        this.jWTService = jWTService;
        this.authService = authService;
        this.init();
    }
    /**
     * Get the currrent user override, if any
     */
    get userOverride() {
        return this._userOverride;
    }
    /**
     * Set/unset the user override. The {@link #userOverrideActive} flag
     * is set accordingly
     */
    set userOverride(value) {
        this._userOverride = value;
        if (this._userOverride) {
            this._userOverrideActive = !!this._userOverride.userName && !!this._userOverride.domain;
        }
        else {
            this._userOverrideActive = false;
        }
    }
    /**
     * A flag indicating whether the current user override is active
     */
    get userOverrideActive() {
        return this._userOverrideActive;
    }
    /**
     * Get the current processed credentials
     */
    get processedCredentials() {
        return this._processedCredentials;
    }
    /**
     * Set the current processed credentials. A stringified version
     * is stored in either local or session storage
     */
    set processedCredentials(value) {
        this._processedCredentials = value;
        if (value) {
            const newProcessedCredentialsStr = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].toJson(this._processedCredentials);
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
    }
    /**
     * Returns `true` if an OAuth or SAML auto provider is configured
     */
    get autoLoginActive() {
        return !!this.startConfig.autoOAuthProvider || !!this.startConfig.autoSAMLProvider;
    }
    /**
     * Deactivate the current user override
     */
    deactivateUserOverride() {
        this._userOverrideActive = false;
    }
    loadCredentials() {
        const sinequaCredentials = this.storage.getItem("sinequa-credentials");
        this._processedCredentialsStr = sinequaCredentials ? sinequaCredentials : undefined;
        this._processedCredentials = this._processedCredentialsStr ? _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].fromJson(this._processedCredentialsStr) : null;
    }
    saveCredentials(value) {
        this.processedCredentials = value;
    }
    init() {
        if (this.startConfig.authenticationStorage === "local") {
            this.storage = window.localStorage;
        }
        else {
            this.storage = window.sessionStorage;
        }
        this.loadCredentials();
        window.addEventListener('storage', (event) => {
            if (event.storageArea === this.storage) {
                if (!event.key) { // clear
                    this.processedCredentials = undefined;
                }
                else if (event.key === "sinequa-credentials") {
                    if (event.newValue !== this._processedCredentialsStr) {
                        this.loadCredentials();
                    }
                }
            }
        });
    }
    /**
     * Return `true` if `processedCredentials` exists
     */
    get haveCredentials() {
        return !!this.processedCredentials;
    }
    /**
     * Add the current authentication information to the passed `HttpHeaders` and `HttpParams`.
     * Currently, this adds the `sinequa-csrf-token` value to the HTTP headers. Called from
     * {@link HttpInterceptor}
     *
     * @param config HttpHeaders and HttpParams to be updated
     *
     * @returns new configuration
     */
    addAuthentication(config) {
        this.doAuthentication();
        if (this.authentication) {
            if (this.authentication.headers) {
                for (const header in this.authentication.headers) {
                    if (this.authentication.headers.hasOwnProperty(header)) {
                        config.headers = config.headers.set(header, this.authentication.headers[header]);
                    }
                }
            }
            if (this.authentication.params) {
                for (const param in this.authentication.params) {
                    if (this.authentication.params.hasOwnProperty(param)) {
                        config.params = config.params.set(param, this.authentication.params[param]);
                    }
                }
            }
        }
        return config;
    }
    /**
     * Update the current authentication information with information in the passed `response`.
     * This processes the `sinequa-jwt-refresh` header which will contain an updated CSRF token
     * to correspond to the new JWT cookie. Called from {@link HttpInterceptor}
     *
     * @param response An `HttpResponse`
     */
    updateAuthentication(response) {
        const csrfToken = response.headers.get("sinequa-jwt-refresh");
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
    }
    refreshAuthentication() {
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
    }
    doAuthentication() {
        this.refreshAuthentication();
        if (this.authentication && this.authentication.csrfToken) {
            this.authentication.headers = {
                "sinequa-csrf-token": this.authentication.csrfToken
            };
        }
    }
    getAuthenticateHeader(regex, authenticationHeaders, header) {
        if (authenticationHeaders) {
            for (let i = 0, ic = authenticationHeaders.length; i < ic; i++) {
                const authenticationHeader = authenticationHeaders[i];
                const matches = regex.exec(authenticationHeader);
                if (matches && matches.length > 0) {
                    const prefix = matches[0];
                    header.value = authenticationHeader.slice(prefix.length);
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Authenticate with the Sinequa server using the passed credentials. The credentials are sent
     * in clear text. Prior to the authentication the passed `response` is checked for a
     * `WWW-Authenticate: Bearer` header.
     *
     * @param credentials The credentials to authenticate with
     * @param response The error response the reception of which initiated the call to this method
     */
    authenticate(credentials, response) {
        const wwwAuthenticate = response.headers.get("WWW-Authenticate");
        if (!wwwAuthenticate) {
            console.error("Missing WWW-Authenticate header");
            return Promise.resolve(undefined);
        }
        const authenticateHeaders = wwwAuthenticate.split(", ");
        const header = { value: "" };
        if (!this.getAuthenticateHeader(/^Bearer ?/, authenticateHeaders, header)) {
            console.error("Unexpected WWW-Authenticate header");
            return Promise.resolve(undefined);
        }
        return this.jWTService.getToken(credentials).toPromise()
            .then((value) => {
            return {
                kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                userName: credentials.userName,
                data: {
                    csrfToken: value,
                    provider: "Sinequa"
                }
            };
        });
    }
    /**
     * Remove all current authentication data. The JWT cookie
     * is removed
     */
    logout() {
        this.auditService.notifyLogout().subscribe(_ => {
            this.tokenService.deleteWebTokenCookie().subscribe();
            this.authentication = undefined;
            this.processedCredentials = undefined;
        });
    }
    /**
     * Add the current user override information to the passed headers.
     *
     * @param config An object containing the `HttpHeaders` to update
     */
    addUserOverride(config) {
        if (this.userOverride && this.userOverrideActive) {
            config.headers = config.headers.set("sinequa-override-user", this.userOverride.userName);
            config.headers = config.headers.set("sinequa-override-domain", this.userOverride.domain);
        }
        return config.headers;
    }
    /**
     * Initiate authentication using the ng2-ui-auth library. The authentication process will be performed
     * in a browser popup window
     *
     * @param provider The name of the provider to use. This is the name configured in the Sinequa administration
     * console
     */
    authenticateWithProvider(provider) {
        // AuthService.authenticate opens a popup. On some platforms (Firefox) this is asynchronous
        // so we add a delay (timer(0)) so the caller can create a promise from the returned observable
        // without yielding
        const observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(0).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])((value) => {
            const observable1 = this.authService.authenticate(provider, true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable1, (response) => {
                // NB response should be the return value from JOAuth/JSaml json methods
                // It can be undefined eg if the popup fails to open
                if (response) {
                    this.processedCredentials = {
                        kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                        data: {
                            csrfToken: response.csrfToken,
                            provider
                        }
                    };
                }
            });
            return observable1;
        }));
        return observable;
    }
    setCsrfToken(csrfToken, provider = "Sinequa") {
        if (!csrfToken) {
            return false;
        }
        this.processedCredentials = {
            kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
            data: {
                csrfToken,
                provider
            }
        };
        return true;
    }
    initiateAutoAuthentication() {
        if (!this.startConfig.usePopupForLogin && this.autoLoginActive) {
            let observable;
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
            observable.subscribe((response) => {
                window.location.replace(response.redirectUrl);
            });
            return true;
        }
        else {
            return false;
        }
    }
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
    autoAuthenticate() {
        return this.tokenService.getCsrfToken().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((csrfToken) => {
            // Token can be empty as getCsrfToken suppresses application errors (no cookie or cookie invalid)
            // (We do this to avoid having errors in the console for normal situations.)
            if (csrfToken) {
                this.setCsrfToken(csrfToken);
                return false;
            }
            else {
                this.initiateAutoAuthentication();
                return true;
            }
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((error) => {
            // We should rarely have an error now as getCsrfToken
            // suppresses the application-level ones
            if (this.initiateAutoAuthentication()) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
            }
            // Swallow the error and continue with non-auto login process
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(false);
        }));
    }
}
AuthenticationService.ɵfac = function AuthenticationService_Factory(t) { return new (t || AuthenticationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["SqHttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["AuditWebService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_jwt_service__WEBPACK_IMPORTED_MODULE_6__["JWTService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ng2_ui_auth__WEBPACK_IMPORTED_MODULE_7__["AuthService"])); };
AuthenticationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthenticationService, factory: AuthenticationService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthenticationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["SqHttpClient"] }, { type: _token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_3__["AuditWebService"] }, { type: _jwt_service__WEBPACK_IMPORTED_MODULE_6__["JWTService"] }, { type: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_7__["AuthService"] }]; }, null); })();


/***/ }),

/***/ "KKN5":
/*!*******************************************!*\
  !*** ./projects/core/base/field-value.ts ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "KMMg":
/*!*********************************************************!*\
  !*** ./projects/core/web-services/audit.web.service.ts ***!
  \*********************************************************/
/*! exports provided: AuditWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuditWebService", function() { return AuditWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");







/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
class AuditWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isString(resultsOrId)) {
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
            source: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].treeFirstNode(doc.collection[0]),
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
            source: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].treeFirstNode(collection),
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(undefined);
        }
        const observable = this.httpClient.post(this.makeUrl(AuditWebService.endpoint), {
            event: "None" /* None */,
            app: this.appName,
            $auditRecord: auditEvents
        });
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("auditService.notify failure - error: ", error);
        });
        return observable;
    }
}
AuditWebService.endpoint = "audit.notify";
AuditWebService.ɵfac = function AuditWebService_Factory(t) { return new (t || AuditWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"])); };
AuditWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuditWebService, factory: AuditWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuditWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "KzIo":
/*!***************************************************!*\
  !*** ./projects/core/web-services/query/query.ts ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "Ltk/":
/*!*******************************************!*\
  !*** ./projects/core/modal/public-api.ts ***!
  \*******************************************/
/*! exports provided: Confirm, Prompt, ModalModule, MODAL_MODEL, ModalButton, MODAL_CONFIRM, MODAL_PROMPT, ModalService, ModalRef, enModal, frModal, deModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _confirm_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./confirm.component */ "IWiN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Confirm", function() { return _confirm_component__WEBPACK_IMPORTED_MODULE_0__["Confirm"]; });

/* harmony import */ var _prompt_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prompt.component */ "o1VS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return _prompt_component__WEBPACK_IMPORTED_MODULE_1__["Prompt"]; });

/* harmony import */ var _modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.module */ "5irr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalModule", function() { return _modal_module__WEBPACK_IMPORTED_MODULE_2__["ModalModule"]; });

/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal.service */ "hOsg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_MODEL", function() { return _modal_service__WEBPACK_IMPORTED_MODULE_3__["MODAL_MODEL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalButton", function() { return _modal_service__WEBPACK_IMPORTED_MODULE_3__["ModalButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_CONFIRM", function() { return _modal_service__WEBPACK_IMPORTED_MODULE_3__["MODAL_CONFIRM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_PROMPT", function() { return _modal_service__WEBPACK_IMPORTED_MODULE_3__["MODAL_PROMPT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return _modal_service__WEBPACK_IMPORTED_MODULE_3__["ModalService"]; });

/* harmony import */ var _modal_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-ref */ "9jax");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalRef", function() { return _modal_ref__WEBPACK_IMPORTED_MODULE_4__["ModalRef"]; });

/* harmony import */ var _messages_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messages/index */ "apiC");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enModal", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["enModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frModal", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["frModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deModal", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["deModal"]; });









/***/ }),

/***/ "MCeZ":
/*!***********************************************************!*\
  !*** ./projects/core/web-services/queryintent.service.ts ***!
  \***********************************************************/
/*! exports provided: QueryIntentWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryIntentWebService", function() { return QueryIntentWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http-client */ "4+vC");





/**
 * A service for calling the queryintent web service
 */
class QueryIntentWebService extends _http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
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
QueryIntentWebService.ɵfac = function QueryIntentWebService_Factory(t) { return new (t || QueryIntentWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_3__["SqHttpClient"])); };
QueryIntentWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: QueryIntentWebService, factory: QueryIntentWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](QueryIntentWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_3__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "MQ8W":
/*!********************************************!*\
  !*** ./projects/core/login/messages/en.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "modal": {
        "login": {
            "title": "Login",
            "userName": "User name",
            "password": "Password",
            "singleSignOn": "Single sign-on",
            "signInWith": "Sign in with..."
        }
    }
});


/***/ }),

/***/ "N74W":
/*!********************************************************!*\
  !*** ./projects/core/validation/validation.service.ts ***!
  \********************************************************/
/*! exports provided: ValidatorType, ValidationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorType", function() { return ValidatorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationService", function() { return ValidationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/app-utils */ "/iXS");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");






/**
 * @ignore
 */
function isEmptyInputValue(value) {
    // we don't check for string here so it also works with arrays
    return value === null || value === undefined || value.length === 0;
}
const processInputValue = (value) => {
    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isArray(value)) {
        return value.map((val) => {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isObject(val) && val.hasOwnProperty("value")) {
                return val.value;
            }
            return val;
        });
    }
    else {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isObject(value) && value.hasOwnProperty("value")) {
            return [value.value];
        }
        return [value];
    }
};
// Email regular expression, taken from built-in Angular validators.
/**
 * @ignore
 */
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
/**
 * Enumerates the supported validator types.
 */
var ValidatorType;
(function (ValidatorType) {
    ValidatorType["Min"] = "Min";
    ValidatorType["Max"] = "Max";
    ValidatorType["Required"] = "Required";
    ValidatorType["Email"] = "Email";
    ValidatorType["Pattern"] = "Pattern";
    ValidatorType["Integer"] = "Integer";
    ValidatorType["Number"] = "Number";
    ValidatorType["Date"] = "Date";
    ValidatorType["Range"] = "Range";
})(ValidatorType || (ValidatorType = {}));
/**
 * Defines the default error messages for each validator.
 */
const errorMessagesMap = {
    // Built-in Angular validators
    min: "msg#validation.min",
    max: "msg#validation.max",
    required: "msg#validation.required",
    requiredTrue: "msg#validation.requiredTrue",
    email: "msg#validation.email",
    minlength: "msg#validation.minLength",
    maxlength: "msg#validation.maxLength",
    pattern: "msg#validation.pattern",
    // Custom
    unique: "msg#validation.unique",
    integer: "msg#validation.integer",
    number: "msg#validation.number",
    date: "msg#validation.date",
    range: "msg#validation.range"
};
/**
 * This service provides a set of locale-sensitive validators with support for arrays.
 * The validator error messages are {@link IntlService} `msg#` messages of the form:
 * `msg#validation.<validator name>`.
 */
class ValidationService {
    constructor(formatService, intlService) {
        this.formatService = formatService;
        this.intlService = intlService;
    }
    /**
     * A pattern validator based on Angular's `Validators.pattern` with support for value arrays.
     *
     * @param pattern The pattern.
     * @returns The validation function.
     */
    static patternValidator(pattern) {
        // #region This code region is based on Validators.pattern()
        if (!pattern) {
            return _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator;
        }
        let regex;
        let regexStr;
        if (typeof pattern === 'string') {
            regexStr = '';
            if (pattern.charAt(0) !== '^') {
                regexStr += '^';
            }
            regexStr += pattern;
            if (pattern.charAt(pattern.length - 1) !== '$') {
                regexStr += '$';
            }
            regex = new RegExp(regexStr);
        }
        else {
            regexStr = pattern.toString();
            regex = pattern;
        }
        // #endregion
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!regex.test(value)) {
                    return { pattern: { requiredPattern: pattern.toString(), actualValue: value } };
                }
            }
            return null;
        };
    }
    /**
     * A pattern validator based on Angular's `Validators.email` with support for value arrays.
     *
     * @param control The control to validate.
     * @returns The result.
     */
    static emailValidation(control) {
        if (isEmptyInputValue(control.value)) {
            return null; // don't validate empty values to allow optional controls
        }
        let values = [];
        values = processInputValue(control.value);
        for (const value of values) {
            if (!EMAIL_REGEXP.test(value)) {
                return { email: true };
            }
        }
        return null;
    }
    /**
     * Get the name of the first validator in a map of validation errors.
     * @param errors The validation errors
     * @returns The name of the first validator, if any - `undefined` otherwise.
     */
    getFirstError(errors) {
        if (errors) {
            return Object.keys(errors)[0];
        }
        return undefined;
    }
    /**
     * Get the error message associated with the passed validator.
     * @param name The name of a validator.
     * @returns The error message.
     */
    getErrorText(name) {
        const text = name ? errorMessagesMap[name] : undefined;
        if (!text) {
            return "Unknown validator: " + name;
        }
        return text;
    }
    /**
     * Get the error message associated with first validator in a map of validation errors.
     * @param errors The validation errors.
     * @returns The error message.
     */
    getFirstErrorText(errors) {
        if (errors) {
            const error = this.getFirstError(errors);
            if (error) {
                return this.getErrorText(error);
            }
        }
        return undefined;
    }
    /**
     * Get the data held for the first error in a map of validation errors
     * @param errors The validation errors.
     */
    getFirstErrorInfo(errors) {
        if (errors) {
            const error = this.getFirstError(errors);
            if (error) {
                return errors[error];
            }
        }
        return undefined;
    }
    /**
     * Get a validator function that validates that values are greater than or equal
     * to the passed `min` value. The function supports single values and arrays of
     * values and will optionally parse the values using the {@link FormatService} if
     * a parser is passed. Dates will be parsed according to the current locale.
     *
     * @param min The minimum value to test against. The type determines
     * how the test will be made.
     * @param parser An optional parser name.
     */
    minValidator(min, parser) {
        return (control) => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    let cmp = 0;
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isNumber(min)) {
                        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].testFloat(value1)) {
                            value1 = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].toNumber(value1);
                            cmp = value1 - min;
                        }
                    }
                    else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(min)) {
                        cmp = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].compare(value1, min);
                    }
                    else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(min)) {
                        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(value1)) {
                            value1 = this.intlService.parseDate(value1);
                            if (value1) {
                                cmp = value1.getTime() - min.getTime();
                            }
                        }
                        else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                            cmp = value1.getTime() - min.getTime();
                        }
                    }
                    if (cmp < 0) {
                        return { min: { min, actual: value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are less than or equal
     * to the passed `max` value. The function supports single values and arrays of
     * values and will optionally parse the values using the {@link FormatService} if
     * a parser is passed. Dates will be parsed according to the current locale.
     *
     * @param max The maximum value to test against. The type determines
     * how the test will be made.
     * @param parser An optional parser name.
     */
    maxValidator(max, parser) {
        return (control) => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    let cmp = 0;
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isNumber(max)) {
                        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].testFloat(value1)) {
                            value1 = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].toNumber(value1);
                            cmp = value1 - max;
                        }
                    }
                    else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(max)) {
                        cmp = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].compare(value1, max);
                    }
                    else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(max)) {
                        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(value1)) {
                            value1 = this.intlService.parseDate(value1);
                            if (value1) {
                                cmp = value1.getTime() - max.getTime();
                            }
                        }
                        else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                            cmp = value1.getTime() - max.getTime();
                        }
                    }
                    if (cmp > 0) {
                        return { max: { max, actual: value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are integers. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    integerValidator(parser) {
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].testInteger(value1)) {
                        return { integer: { value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are numeric. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    numberValidator(parser) {
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].testFloat(value1)) {
                        return { number: { value } };
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that values are dates. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed. Dates will be parsed according
     * to the current locale.
     *
     * @param parser An optional parser name.
     */
    dateValidator(parser) {
        return (control) => {
            if (isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }
            let values = [];
            values = processInputValue(control.value);
            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(value)) {
                        let value1 = value;
                        if (parser) {
                            value1 = this.formatService.parseValue(value1, parser);
                        }
                        if (!this.intlService.parseDate(value1)) {
                            return { date: { value } };
                        }
                    }
                    else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(value)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                        if (isNaN(value.getTime())) {
                            return { date: { value } };
                        }
                    }
                }
            }
            return null;
        };
    }
    /**
     * Get a validator function that validates that, for pair of values, the second value is
     * greater than the first. If one or both values are empty then the validation passes.
     * The validator function supports single values and arrays of values and will optionally
     * parse the values using the {@link FormatService} if a parser is passed. Dates will be
     * parsed according to the current locale.
     *
     * @param type A value whose type indicates how the range test will be made.
     * @param parser An optional parser name.
     */
    rangeValidator(type, parser) {
        return (control) => {
            if (isEmptyInputValue(control.value) || !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isArray(control.value) || control.value.length !== 2) {
                return null; // don't validate empty values to allow optional controls
            }
            let value1 = control.value[0];
            let value2 = control.value[1];
            if (isEmptyInputValue(value1) || isEmptyInputValue(value2)) {
                return null;
            }
            if (parser) {
                value1 = this.formatService.parseValue(value1, parser);
                value2 = this.formatService.parseValue(value2, parser);
            }
            let cmp = 0;
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(type)) {
                cmp = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].compare(value2, value1);
            }
            else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(type)) {
                let date1;
                let date2;
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(value1)) {
                    date1 = this.intlService.parseDate(value1);
                }
                else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                    date1 = value1;
                }
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isString(value2)) {
                    date2 = this.intlService.parseDate(value2);
                }
                else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isDate(value2)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                    date2 = value2;
                }
                if (date1 && date2) {
                    cmp = date2.getTime() - date1.getTime();
                }
            }
            else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isNumber(type)) {
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].testFloat(value1) && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].testFloat(value2)) {
                    const num1 = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].toNumber(value1);
                    const num2 = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].toNumber(value2);
                    if (num1 !== null && num2 !== null) {
                        cmp = num2 - num1;
                    }
                }
            }
            return cmp < 0 ? { range: { value1, value2 } } : null;
        };
    }
}
ValidationService.ɵfac = function ValidationService_Factory(t) { return new (t || ValidationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__["FormatService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlService"])); };
ValidationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ValidationService, factory: ValidationService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ValidationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_3__["FormatService"] }, { type: _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlService"] }]; }, null); })();


/***/ }),

/***/ "NHXA":
/*!************************************************!*\
  !*** ./projects/core/validation/public-api.ts ***!
  \************************************************/
/*! exports provided: VALIDATION_MESSAGE_COMPONENT, ValidationDirective, ValidationErrorPipe, ValidationMessageComponent, ValidationModule, ValidatorType, ValidationService, enValidation, frValidation, deValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validation_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation.directive */ "GsAy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VALIDATION_MESSAGE_COMPONENT", function() { return _validation_directive__WEBPACK_IMPORTED_MODULE_0__["VALIDATION_MESSAGE_COMPONENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationDirective", function() { return _validation_directive__WEBPACK_IMPORTED_MODULE_0__["ValidationDirective"]; });

/* harmony import */ var _validation_error_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation-error.pipe */ "lbUz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationErrorPipe", function() { return _validation_error_pipe__WEBPACK_IMPORTED_MODULE_1__["ValidationErrorPipe"]; });

/* harmony import */ var _validation_message_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation-message.component */ "2Wl+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationMessageComponent", function() { return _validation_message_component__WEBPACK_IMPORTED_MODULE_2__["ValidationMessageComponent"]; });

/* harmony import */ var _validation_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validation.module */ "Hrmr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationModule", function() { return _validation_module__WEBPACK_IMPORTED_MODULE_3__["ValidationModule"]; });

/* harmony import */ var _validation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validation.service */ "N74W");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidatorType", function() { return _validation_service__WEBPACK_IMPORTED_MODULE_4__["ValidatorType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValidationService", function() { return _validation_service__WEBPACK_IMPORTED_MODULE_4__["ValidationService"]; });

/* harmony import */ var _messages_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messages/index */ "qPpM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enValidation", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["enValidation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frValidation", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["frValidation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deValidation", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["deValidation"]; });









/***/ }),

/***/ "P8YC":
/*!********************************************************!*\
  !*** ./projects/core/web-services/module.providers.ts ***!
  \********************************************************/
/*! exports provided: WEB_SERVICES_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEB_SERVICES_MODULE_PROVIDERS", function() { return WEB_SERVICES_MODULE_PROVIDERS; });
const WEB_SERVICES_MODULE_PROVIDERS = [];



/***/ }),

/***/ "PTTq":
/*!************************************************************!*\
  !*** ./projects/core/web-services/download.web.service.ts ***!
  \************************************************************/
/*! exports provided: DownloadWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DownloadWebService", function() { return DownloadWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");



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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].subscribe(observable, (response) => {
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
DownloadWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DownloadWebService, factory: DownloadWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DownloadWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], null, null); })();


/***/ }),

/***/ "Py9Q":
/*!*****************************************************************!*\
  !*** ./projects/core/web-services/suggest-query.web.service.ts ***!
  \*****************************************************************/
/*! exports provided: SuggestQueryWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuggestQueryWebService", function() { return SuggestQueryWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");







/**
 * A service for calling the suggestquery web service
 */
class SuggestQueryWebService extends _http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"] {
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])([]);
        }
        else {
            const observable = this.httpClient.post(this.makeUrl("suggestquery"), {
                app: this.appName,
                suggestQuery: suggestQuery,
                text: text,
                query: query,
                kinds: fields
            });
            return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(value => value.suggests));
        }
    }
}
SuggestQueryWebService.ɵfac = function SuggestQueryWebService_Factory(t) { return new (t || SuggestQueryWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"])); };
SuggestQueryWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SuggestQueryWebService, factory: SuggestQueryWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SuggestQueryWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "Q1ZN":
/*!***************************************************************!*\
  !*** ./projects/core/login/component-with-login.component.ts ***!
  \***************************************************************/
/*! exports provided: ComponentWithLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentWithLogin", function() { return ComponentWithLogin; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.service */ "rq/s");



/**
 * A utility base class to assist main components in the handling of the login state of the
 * the application. It initiates the login process and sets `loginComplete` accordingly
 * whenever the login state changes
 */
class ComponentWithLogin {
    constructor(loginService, changeDetectorRef) {
        this.loginService = loginService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * A method called whenever the `session-changed` event is received. This can be
     * overridden by the subclassing component.
     */
    onLoginComplete() {
    }
    /**
     * Subscribes to the [LoginService.events]{@link LoginService#events} and sets
     * the `loginComplete` member whenever the `session-changed` event is received
     */
    ngOnInit() {
        this.loginComplete = this.loginService.complete;
        this.loginSubscription = this.loginService.events.subscribe(event => {
            if (event.type === "session-changed") {
                this.loginComplete = this.loginService.complete;
                this.onLoginComplete();
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
    }
    /**
     * Initiates the login process by calling [LoginService.login]{@link LoginService#login}
     */
    ngAfterViewInit() {
        this.loginService.login();
    }
}
ComponentWithLogin.ɵfac = function ComponentWithLogin_Factory(t) { return new (t || ComponentWithLogin)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
ComponentWithLogin.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ComponentWithLogin, selectors: [["ng-component"]], decls: 0, vars: 0, template: function ComponentWithLogin_Template(rf, ctx) { }, encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ComponentWithLogin, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                template: ''
            }]
    }], function () { return [{ type: _login_service__WEBPACK_IMPORTED_MODULE_1__["LoginService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, null); })();


/***/ }),

/***/ "Qrzu":
/*!**********************************************************************!*\
  !*** ./projects/core/web-services/json-method-plugin.web.service.ts ***!
  \**********************************************************************/
/*! exports provided: JsonMethodPluginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonMethodPluginService", function() { return JsonMethodPluginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");







/**
 * A generic service for invoking JsonMethod plugins
 */
class JsonMethodPluginService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].isObject(query)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: "invalid query object" });
        }
        const observable = this.httpClient.post(this.makeUrl(method), query, options);
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
JsonMethodPluginService.ɵfac = function JsonMethodPluginService_Factory(t) { return new (t || JsonMethodPluginService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"])); };
JsonMethodPluginService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: JsonMethodPluginService, factory: JsonMethodPluginService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](JsonMethodPluginService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }]; }, null); })();


/***/ }),

/***/ "R9OO":
/*!*************************************************!*\
  !*** ./projects/core/validation/messages/en.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "validation": {
        "min": "The value must be at least {min}",
        "max": "The value can be no more than {max}",
        "required": "This field is required",
        "requiredTrue": "This field must be set",
        "email": "A valid email address is required",
        "minLength": "The value must have at least {requiredLength, plural, one {# character} other {# characters}}",
        "maxLength": "The value can have no more than {requiredLength, plural, one {# character} other {# characters}}",
        "pattern": "The value is invalid",
        "unique": "This field must be unique",
        "integer": "The value must be an integer",
        "number": "The value must be a number",
        "date": "",
        "range": "The first value must be less than or equal to the second"
    }
});


/***/ }),

/***/ "RDOn":
/*!***********************************************!*\
  !*** ./projects/core/app-utils/public-api.ts ***!
  \***********************************************/
/*! exports provided: Expr, ExprParserOperator, ExprParser, ExprBuilder, advancedFacetPrefix, Query, AppService, FormatService, AuditInterceptor, AppUtilsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query_expr_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query/expr-parser */ "edoa");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expr", function() { return _query_expr_parser__WEBPACK_IMPORTED_MODULE_0__["Expr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprParserOperator", function() { return _query_expr_parser__WEBPACK_IMPORTED_MODULE_0__["ExprParserOperator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprParser", function() { return _query_expr_parser__WEBPACK_IMPORTED_MODULE_0__["ExprParser"]; });

/* harmony import */ var _query_expr_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query/expr-builder */ "mwKB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExprBuilder", function() { return _query_expr_builder__WEBPACK_IMPORTED_MODULE_1__["ExprBuilder"]; });

/* harmony import */ var _query_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query/query */ "unr6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "advancedFacetPrefix", function() { return _query_query__WEBPACK_IMPORTED_MODULE_2__["advancedFacetPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return _query_query__WEBPACK_IMPORTED_MODULE_2__["Query"]; });

/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.service */ "Z1K+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return _app_service__WEBPACK_IMPORTED_MODULE_3__["AppService"]; });

/* harmony import */ var _format_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./format.service */ "mfeY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormatService", function() { return _format_service__WEBPACK_IMPORTED_MODULE_4__["FormatService"]; });

/* harmony import */ var _audit_interceptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./audit.interceptor */ "kFGd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuditInterceptor", function() { return _audit_interceptor__WEBPACK_IMPORTED_MODULE_5__["AuditInterceptor"]; });

/* harmony import */ var _app_utils_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-utils.module */ "EI9X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppUtilsModule", function() { return _app_utils_module__WEBPACK_IMPORTED_MODULE_6__["AppUtilsModule"]; });










/***/ }),

/***/ "RGzw":
/*!****************************************************!*\
  !*** ./projects/core/web-services/config/ccapp.ts ***!
  \****************************************************/
/*! exports provided: ExportSourceType, ExportOutputFormat, MINIMUM_COMPATIBLE_SERVER_API_VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportSourceType", function() { return ExportSourceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExportOutputFormat", function() { return ExportOutputFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MINIMUM_COMPATIBLE_SERVER_API_VERSION", function() { return MINIMUM_COMPATIBLE_SERVER_API_VERSION; });
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


/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-SG": "zavE",
	"./en-SG.js": "zavE",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./ga": "USCx",
	"./ga.js": "USCx",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it-ch": "bxKX",
	"./it-ch.js": "bxKX",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ku": "JCF/",
	"./ku.js": "JCF/",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "Sq2L":
/*!*****************************************!*\
  !*** ./projects/core/base/polyfills.ts ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var fast_text_encoding__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-text-encoding */ "98sM");
/* harmony import */ var fast_text_encoding__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_text_encoding__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! intl */ "FoZm");
/* harmony import */ var intl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(intl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var intl_locale_data_jsonp_en_US__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! intl/locale-data/jsonp/en-US */ "hchg");
/* harmony import */ var intl_locale_data_jsonp_en_US__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(intl_locale_data_jsonp_en_US__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var js_polyfills_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js-polyfills/url */ "j29f");
/* harmony import */ var js_polyfills_url__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(js_polyfills_url__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var matchmedia_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! matchmedia-polyfill */ "7cND");
/* harmony import */ var matchmedia_polyfill__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(matchmedia_polyfill__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var focus_within__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! focus-within */ "zGBt");
 // IE 11 / Edge
// NB the name of the intl polyfill (below) conflicts with @sinequa/core/intl in the module resolution.
// Output of traceResolution: true gives the following:
//
// Resolving module name 'intl' relative to base url 'D:/ice/sba/ng-ws/projects/core' - 'D:/ice/sba/ng-ws/projects/core/intl'.
// Loading module as file / folder, candidate module location 'D:/ice/sba/ng-ws/projects/core/intl', target file type 'TypeScript'.
// ...
// This can be worked around in a number of ways:
// 1. Rename the @sinequa/core/intl folder and all references to it (not overly desirable)
// 2. Install the intl polyfill using an alias: npm install my-intl-alias@npm:intl. But then references in the locale files would have
//    to use import "my-intl-alias/..."
// 3. Don't use index.ts as the entry point filename. This is a bit hacky but it works and has the least impact so that's what we've gone with
//    _index.ts is used and referenced in package.json: { "ngPackage": { "lib": { "entryFile": "index.ts" } } }
//    We also put an explicit Path to @sinequa/core/intl => ./intl/_index in the local tsconfig.json so that references to @sinequa/core/intl
//    are resolved correctly in VSCode
 // Safari
 // Locale needed for formatjs initialization (new Intl.NumberFormat())


 // IE 11 / Edge - https://github.com/jonathantneal/focus-within
Object(focus_within__WEBPACK_IMPORTED_MODULE_5__["default"])(document);
// String.trimStart, String.trimEnd
if (!String.prototype.trimStart) {
    String.prototype.trimStart = function () {
        return this.replace(/^[\s\uFEFF\xA0]+/g, '');
    };
}
if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function () {
        return this.replace(/[\s\uFEFF\xA0]+$/g, '');
    };
}
// See https://gist.github.com/jocki84/6ffafd003387179a988e
if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
        function withinBounds(value, min, max, extent) {
            if (false === centerIfNeeded || max <= value + extent && value <= min + extent) {
                return Math.min(max, Math.max(min, value));
            }
            else {
                return (min + max) / 2;
            }
        }
        function makeArea(left, top, width, height) {
            return { "left": left, "top": top, "width": width, "height": height,
                "right": left + width, "bottom": top + height,
                "translate": function (x, y) {
                    return makeArea(x + left, y + top, width, height);
                },
                "relativeFromTo": function (lhs, rhs) {
                    let newLeft = left, newTop = top;
                    lhs = lhs.offsetParent;
                    rhs = rhs.offsetParent;
                    if (lhs === rhs) {
                        return area;
                    }
                    for (; lhs; lhs = lhs.offsetParent) {
                        newLeft += lhs.offsetLeft + lhs.clientLeft;
                        newTop += lhs.offsetTop + lhs.clientTop;
                    }
                    for (; rhs; rhs = rhs.offsetParent) {
                        newLeft -= rhs.offsetLeft + rhs.clientLeft;
                        newTop -= rhs.offsetTop + rhs.clientTop;
                    }
                    return makeArea(newLeft, newTop, width, height);
                }
            };
        }
        let parent, elem = this, area = makeArea(this.offsetLeft, this.offsetTop, this.offsetWidth, this.offsetHeight);
        while ((parent = elem.parentNode) instanceof HTMLElement) {
            const clientLeft = parent.offsetLeft + parent.clientLeft;
            const clientTop = parent.offsetTop + parent.clientTop;
            // Make area relative to parent's client area.
            area = area.
                relativeFromTo(elem, parent).
                translate(-clientLeft, -clientTop);
            parent.scrollLeft = withinBounds(parent.scrollLeft, area.right - parent.clientWidth, area.left, parent.clientWidth);
            parent.scrollTop = withinBounds(parent.scrollTop, area.bottom - parent.clientHeight, area.top, parent.clientHeight);
            // Determine actual scroll amount by reading back scroll properties.
            area = area.translate(clientLeft - parent.scrollLeft, clientTop - parent.scrollTop);
            elem = parent;
        }
    };
}
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
    if (typeof window.CustomEvent === "function")
        return;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
// IE
if (!window.location.origin) { // Some browsers (mainly IE) do not have this property, so we need to build it manually...
    try {
        window.location[ /*foo readonly*/"origin"] = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
    }
    catch (e) {
    }
}
// fake storage (eg for Safari private browsing)
function fakeStorage(storageName) {
    let fakeStorage = {};
    let storage;
    let needed = false;
    if (typeof window[storageName] === "object") {
        // Storage is there, does it work (eg Safari private browsing)
        try {
            window[storageName].setItem("fakeStorageTest", "1");
            window[storageName].removeItem("fakeStorageTest");
        }
        catch (e) {
            needed = true;
        }
    }
    else {
        needed = true;
    }
    if (!needed) {
        return;
    }
    if (typeof window[storageName] === "object") {
        // Override with fake implementation
        storage = window[storageName];
    }
    else {
        // Implement with fake
        try {
            storage = window[ /*fool readonly*/storageName] = {};
        }
        catch (e) {
            console.warn("Unable to set fake", storageName);
            return;
        }
    }
    console.warn("Using fake", storageName);
    const dispatchStorageEvent = function (key, newValue) {
        const oldValue = (!key) ? null : storage.getItem(key);
        const url = location.href.substr(location.origin.length);
        const storageEvent = document.createEvent("StorageEvent"); // For IE, http://stackoverflow.com/a/25514935/1214183
        storageEvent["initStorageEvent"]("storage", false, false, key, oldValue, newValue, url, storage);
        window.dispatchEvent(storageEvent);
    };
    storage.key = function (i) {
        const key = Object.keys(fakeStorage)[i];
        return typeof key === "string" ? key : null;
    };
    storage.getItem = function (key) {
        return typeof fakeStorage[key] === 'string' ? fakeStorage[key] : null;
    };
    storage.setItem = function (key, value) {
        dispatchStorageEvent(key, value);
        fakeStorage[key] = String(value);
    };
    storage.removeItem = function (key) {
        dispatchStorageEvent(key, null);
        delete fakeStorage[key];
    };
    storage.clear = function () {
        dispatchStorageEvent(null, null);
        fakeStorage = {};
    };
}
fakeStorage("localStorage");
fakeStorage("sessionStorage");
// DOMRect polyfill
// Credit: https://github.com/Financial-Times/polyfill-service/pull/1732
(function (global) {
    if (global.DOMRect) {
        return;
    }
    function number(v) {
        return v === undefined ? 0 : Number(v);
    }
    function different(u, v) {
        return u !== v && !(isNaN(u) && isNaN(v));
    }
    function DOMRect(xArg, yArg, wArg, hArg) {
        let x;
        let y;
        let width;
        let height;
        let left;
        let right;
        let top;
        let bottom;
        x = number(xArg);
        y = number(yArg);
        width = number(wArg);
        height = number(hArg);
        Object.defineProperties(this, {
            x: {
                get: function () { return x; },
                set: function (newX) {
                    if (different(x, newX)) {
                        x = newX;
                        left = right = undefined;
                    }
                },
                enumerable: true
            },
            y: {
                get: function () { return y; },
                set: function (newY) {
                    if (different(y, newY)) {
                        y = newY;
                        top = bottom = undefined;
                    }
                },
                enumerable: true
            },
            width: {
                get: function () { return width; },
                set: function (newWidth) {
                    if (different(width, newWidth)) {
                        width = newWidth;
                        left = right = undefined;
                    }
                },
                enumerable: true
            },
            height: {
                get: function () { return height; },
                set: function (newHeight) {
                    if (different(height, newHeight)) {
                        height = newHeight;
                        top = bottom = undefined;
                    }
                },
                enumerable: true
            },
            left: {
                get: function () {
                    if (left === undefined) {
                        left = x + Math.min(0, width);
                    }
                    return left;
                },
                enumerable: true
            },
            right: {
                get: function () {
                    if (right === undefined) {
                        right = x + Math.max(0, width);
                    }
                    return right;
                },
                enumerable: true
            },
            top: {
                get: function () {
                    if (top === undefined) {
                        top = y + Math.min(0, height);
                    }
                    return top;
                },
                enumerable: true
            },
            bottom: {
                get: function () {
                    if (bottom === undefined) {
                        bottom = y + Math.max(0, height);
                    }
                    return bottom;
                },
                enumerable: true
            }
        });
    }
    global.DOMRect = DOMRect;
}(window));
// Element.closest and Element.matches polyfills (see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let el = this;
        do {
            if (el.matches(s)) {
                return el;
            }
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}


/***/ }),

/***/ "Sz+O":
/*!*****************************************!*\
  !*** ./projects/core/messages/index.ts ***!
  \*****************************************/
/*! exports provided: enCore, frCore, deCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enCore", function() { return enCore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frCore", function() { return frCore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deCore", function() { return deCore; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/login */ "Wo2r");


const enCore = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _sinequa_core_login__WEBPACK_IMPORTED_MODULE_1__["enLogin"]);
const frCore = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _sinequa_core_login__WEBPACK_IMPORTED_MODULE_1__["frLogin"]);
const deCore = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _sinequa_core_login__WEBPACK_IMPORTED_MODULE_1__["deLogin"]);



/***/ }),

/***/ "Ty8X":
/*!*********************************************************!*\
  !*** ./projects/core/web-services/query.web.service.ts ***!
  \*********************************************************/
/*! exports provided: DidYouMeanKind, RFMDisplay, QueryWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DidYouMeanKind", function() { return DidYouMeanKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RFMDisplay", function() { return RFMDisplay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryWebService", function() { return QueryWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");







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
class QueryWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: "no query" });
        }
        const observable = this.httpClient.post(this.makeUrl(this.endPoint), {
            app: this.appName,
            query,
            $auditRecord: auditEvents,
            queryIntentData
        });
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: "no queries" });
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
QueryWebService.ɵfac = function QueryWebService_Factory(t) { return new (t || QueryWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"])); };
QueryWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: QueryWebService, factory: QueryWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](QueryWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "UBHK":
/*!***********************************************!*\
  !*** ./projects/core/load-component/index.ts ***!
  \***********************************************/
/*! exports provided: LoadComponentModule, LoadComponentService, LoadComponentDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "cxFQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadComponentModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LoadComponentModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadComponentService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LoadComponentService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadComponentDirective", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LoadComponentDirective"]; });




/***/ }),

/***/ "URRq":
/*!*************************************************!*\
  !*** ./projects/core/modal/module.providers.ts ***!
  \*************************************************/
/*! exports provided: MODAL_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODAL_MODULE_PROVIDERS", function() { return MODAL_MODULE_PROVIDERS; });
const MODAL_MODULE_PROVIDERS = [];



/***/ }),

/***/ "V1Pl":
/*!*********************************************!*\
  !*** ./projects/core/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: AuthConfig, LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthConfig", function() { return AuthConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-ui-auth */ "xs0O");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _authentication_oauth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./authentication-oauth.service */ "+tpp");
/* harmony import */ var _authentication_popup_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./authentication-popup.service */ "83gw");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sinequa/core/validation */ "1w50");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sinequa/core/modal */ "rAYq");
/* harmony import */ var _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @sinequa/core/notification */ "wFkT");
/* harmony import */ var _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @sinequa/core/app-utils */ "/iXS");
/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./login.service */ "rq/s");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./login.component */ "c2w7");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./module.providers */ "IGgQ");
/* harmony import */ var _modal_modal_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../modal/modal.module */ "5irr");








// Sinequa modules







// Login






/**
 * Configuration for the ng2-ui-auth library
 */
class AuthConfig {
    constructor(startConfig) {
        this.storageType = "memory";
        this.providers = startConfig.providers || {};
    }
}
AuthConfig.ɵfac = function AuthConfig_Factory(t) { return new (t || AuthConfig)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_9__["START_CONFIG"])); };
AuthConfig.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthConfig, factory: AuthConfig.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthConfig, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_9__["START_CONFIG"]]
            }] }]; }, null); })();
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
class LoginModule {
    static forRoot(loginModal = _login_component__WEBPACK_IMPORTED_MODULE_16__["Login"]) {
        return {
            ngModule: LoginModule,
            providers: [
                // Login
                { provide: _login_service__WEBPACK_IMPORTED_MODULE_15__["MODAL_LOGIN"], useValue: loginModal },
            ]
        };
    }
}
LoginModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LoginModule });
LoginModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LoginModule_Factory(t) { return new (t || LoginModule)(); }, providers: [
        // Auth module dependencies
        { provide: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["CONFIG_OPTIONS"], useClass: AuthConfig },
        { provide: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["OauthService"], useExisting: _authentication_oauth_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationOauthService"] },
        { provide: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["PopupService"], useExisting: _authentication_popup_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationPopupService"] },
        ..._module_providers__WEBPACK_IMPORTED_MODULE_17__["LOGIN_MODULE_PROVIDERS"]
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["Ng2UiAuthModule"].forRoot(undefined, false),
            _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_12__["ModalModule"].forRoot(),
            // CDK
            _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"],
            _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["A11yModule"],
            // Sinequa modules
            _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["BaseModule"],
            _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_14__["AppUtilsModule"],
            _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_9__["WebServicesModule"],
            _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_11__["IntlModule"],
            _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_10__["ValidationModule"],
            _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_13__["NotificationModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](LoginModule, { declarations: [_login_component__WEBPACK_IMPORTED_MODULE_16__["Login"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["Ng2UiAuthModule"], _modal_modal_module__WEBPACK_IMPORTED_MODULE_18__["ModalModule"], 
        // CDK
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"],
        _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["A11yModule"],
        // Sinequa modules
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["BaseModule"],
        _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_14__["AppUtilsModule"],
        _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_9__["WebServicesModule"],
        _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_11__["IntlModule"],
        _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_10__["ValidationModule"],
        _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_13__["NotificationModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["Ng2UiAuthModule"].forRoot(undefined, false),
                    _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_12__["ModalModule"].forRoot(),
                    // CDK
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"],
                    _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["A11yModule"],
                    // Sinequa modules
                    _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["BaseModule"],
                    _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_14__["AppUtilsModule"],
                    _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_9__["WebServicesModule"],
                    _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_11__["IntlModule"],
                    _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_10__["ValidationModule"],
                    _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_13__["NotificationModule"]
                ],
                declarations: [
                    _login_component__WEBPACK_IMPORTED_MODULE_16__["Login"],
                ],
                exports: [],
                providers: [
                    // Auth module dependencies
                    { provide: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["CONFIG_OPTIONS"], useClass: AuthConfig },
                    { provide: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["OauthService"], useExisting: _authentication_oauth_service__WEBPACK_IMPORTED_MODULE_6__["AuthenticationOauthService"] },
                    { provide: ng2_ui_auth__WEBPACK_IMPORTED_MODULE_3__["PopupService"], useExisting: _authentication_popup_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationPopupService"] },
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_17__["LOGIN_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "VM01":
/*!*******************************************!*\
  !*** ./projects/core/base/base.module.ts ***!
  \*******************************************/
/*! exports provided: BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return BaseModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./polyfills */ "Sq2L");



/**
 * This module contains a variety of base types and utility classes including the {@link Utils} utilility class
 */
class BaseModule {
}
BaseModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: BaseModule });
BaseModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function BaseModule_Factory(t) { return new (t || BaseModule)(); }, imports: [[]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [],
                declarations: [],
                exports: []
            }]
    }], null, null); })();


/***/ }),

/***/ "VrBK":
/*!************************************************!*\
  !*** ./projects/core/intl/module.providers.ts ***!
  \************************************************/
/*! exports provided: INTL_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTL_MODULE_PROVIDERS", function() { return INTL_MODULE_PROVIDERS; });
const INTL_MODULE_PROVIDERS = [];



/***/ }),

/***/ "W/IO":
/*!*********************************************!*\
  !*** ./projects/core/web-services/index.ts ***!
  \*********************************************/
/*! exports provided: ExportSourceType, ExportOutputFormat, MINIMUM_COMPATIBLE_SERVER_API_VERSION, AppWebService, AuditWebService, DatasetWebService, DownloadWebService, SqHttpClient, HttpService, JsonMethodPluginService, LabelsWebService, PreviewWebService, PrincipalWebService, QueryExportWebService, DidYouMeanKind, RFMDisplay, QueryWebService, RecentQueriesList, RecentQueries, RecentQueriesWebService, RfmWebService, SimilarDocumentsWebService, SponsoredLinksWebService, START_CONFIG, StartConfigWebService, SuggestFieldWebService, SuggestQueryWebService, UserRatingsWebService, UserSettingsWebService, QueryIntentWebService, StartConfigInitializer, WebServicesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "Dw/y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExportSourceType", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ExportSourceType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExportOutputFormat", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ExportOutputFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MINIMUM_COMPATIBLE_SERVER_API_VERSION", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["MINIMUM_COMPATIBLE_SERVER_API_VERSION"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AppWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuditWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AuditWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DatasetWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["DatasetWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DownloadWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["DownloadWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqHttpClient", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SqHttpClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["HttpService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonMethodPluginService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["JsonMethodPluginService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LabelsWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LabelsWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PreviewWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["PreviewWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrincipalWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["PrincipalWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryExportWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["QueryExportWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DidYouMeanKind", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["DidYouMeanKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RFMDisplay", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["RFMDisplay"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["QueryWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentQueriesList", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["RecentQueriesList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentQueries", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["RecentQueries"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RecentQueriesWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["RecentQueriesWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RfmWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["RfmWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimilarDocumentsWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SimilarDocumentsWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SponsoredLinksWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SponsoredLinksWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "START_CONFIG", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["START_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StartConfigWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["StartConfigWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuggestFieldWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SuggestFieldWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuggestQueryWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["SuggestQueryWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserRatingsWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["UserRatingsWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserSettingsWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["UserSettingsWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryIntentWebService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["QueryIntentWebService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StartConfigInitializer", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["StartConfigInitializer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebServicesModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["WebServicesModule"]; });




/***/ }),

/***/ "W95i":
/*!****************************************************************************!*\
  !*** ./projects/hello-search/$$_lazy_route_resource lazy namespace object ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "W95i";

/***/ }),

/***/ "Wo2r":
/*!**************************************!*\
  !*** ./projects/core/login/index.ts ***!
  \**************************************/
/*! exports provided: AuthenticationService, TokenService, ComponentWithLogin, JWTService, AuthConfig, LoginModule, MODAL_LOGIN, LoginService, Login, HTTP_REQUEST_INITIALIZERS, LoginInterceptor, AuthenticationOauthService, AuthenticationPopupService, enLogin, frLogin, deLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "q7DD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TokenService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["TokenService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentWithLogin", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ComponentWithLogin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JWTService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["JWTService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthConfig", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AuthConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LoginModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_LOGIN", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["MODAL_LOGIN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LoginService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Login"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTTP_REQUEST_INITIALIZERS", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["HTTP_REQUEST_INITIALIZERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginInterceptor", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["LoginInterceptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationOauthService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AuthenticationOauthService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationPopupService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["AuthenticationPopupService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enLogin", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["enLogin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frLogin", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["frLogin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deLogin", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["deLogin"]; });




/***/ }),

/***/ "Y4qV":
/*!*************************************************!*\
  !*** ./projects/core/default-locales-config.ts ***!
  \*************************************************/
/*! exports provided: DefaultLocalesConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultLocalesConfig", function() { return DefaultLocalesConfig; });
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages */ "Sz+O");

class DefaultLocalesConfig {
    constructor() {
        this.defaultLocale = {
            name: "en",
            display: "English",
            data: {
                intl: {
                    locale: "en-US"
                },
                messages: _messages__WEBPACK_IMPORTED_MODULE_0__["enCore"],
            }
        };
        this.locales = [this.defaultLocale];
    }
}


/***/ }),

/***/ "Yvsk":
/*!*************************************!*\
  !*** ./projects/core/base/utils.ts ***!
  \*************************************/
/*! exports provided: Timer, Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var diacritics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! diacritics */ "C9yA");
/* harmony import */ var diacritics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(diacritics__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jssha */ "xT6I");
/* harmony import */ var jssha__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jssha__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/kebabCase */ "N1om");
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_snakeCase__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/snakeCase */ "79/T");
/* harmony import */ var lodash_snakeCase__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_snakeCase__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/camelCase */ "u6S6");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/escape */ "Te9D");
/* harmony import */ var lodash_escape__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_escape__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_unescape__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/unescape */ "/w9J");
/* harmony import */ var lodash_unescape__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_unescape__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/isEqual */ "Y+p1");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_9__);










// Because of: https://github.com/angular/angular/issues/18261
class SqHttpParameterCodec {
    encodeKey(key) {
        return encodeURIComponent(key);
    }
    encodeValue(value) {
        return encodeURIComponent(value);
    }
    decodeKey(key) {
        return decodeURIComponent(key);
    }
    decodeValue(value) {
        return decodeURIComponent(value);
    }
}
class FrameTask {
    constructor(callback, params) {
        this.callback = callback;
        this.params = params;
    }
    call() {
        return this.callback(...this.params);
    }
}
/**
 * A utility class to log execution durations
 */
class Timer {
    constructor(name) {
        this.name = name;
        /**
         * Contains the timestamp of when the `Timer` object was instantiated
         */
        this.start = performance.now();
        /**
         * Contains the current durartion in milliseconds of the `Timer` object
         */
        this.duration = 0;
    }
    /**
     * Updates the `duration` of the `Timer` object
     */
    stop() {
        this.duration = performance.now() - this.start;
        console.log(`Timer: ${this.name} finished in ${Math.round(this.duration)} ms`);
    }
}
/**
 * A utility class containing a variety of static methods and properties
 */
// @dynamic
class Utils {
    static baseExtend(dst, objs, deep, sort) {
        for (let i = 0, ii = objs.length; i < ii; ++i) {
            const obj = objs[i];
            if (!Utils.isObject(obj) && !Utils.isFunction(obj)) {
                continue;
            }
            let keys = Object.keys(obj);
            if (sort) {
                if (Utils.isFunction(sort)) {
                    keys = keys.sort(sort);
                }
                else {
                    keys = keys.sort();
                }
            }
            for (let j = 0, jj = keys.length; j < jj; j++) {
                const key = keys[j];
                const src = obj[key];
                if (deep && Utils.isObject(src)) {
                    if (Utils.isDate(src)) {
                        dst[key] = new Date(src.valueOf());
                    }
                    else if (Utils.isRegExp(src)) {
                        dst[key] = new RegExp(src);
                    }
                    else if (src.nodeName) {
                        dst[key] = src.cloneNode(true);
                    }
                    else {
                        if (!Utils.isObject(dst[key])) {
                            dst[key] = Utils.isArray(src) ? [] : {};
                        }
                        Utils.baseExtend(dst[key], [src], true);
                    }
                }
                else {
                    dst[key] = src;
                }
            }
        }
        return dst;
    }
    /**
     * Shallowly copy the properties in the source objects to the destination object.
     * Any nested objects or arrays will be copied by reference, not duplicated.
     * The source objects are treated in order so properties in later
     * objects will override properties in earlier ones.
     *
     * @param destination The object to which properties are copied
     * @param sources Objects from which properties are copied
     * @return the destination object
     */
    static extend(destination, ...sources) {
        return Utils.baseExtend(destination, sources, false);
    }
    /**
     * Deeply copy the properties in the source objects to the destination object.
     * Any nested objects or arrays will be duplicated.
     * The source objects are treated in order so properties in later
     * objects will override properties in earlier ones.
     *
     * @param destination The object to which properties are copied
     * @param sources Objects from which properties are copied
     * @return the destination object
     */
    static merge(destination, ...sources) {
        return Utils.baseExtend(destination, sources, true);
    }
    /**
     * Deeply copy the properties in the source objects to the destination object.
     * Any nested objects or arrays will be duplicated.
     * The source objects are treated in order so properties in later
     * objects will override properties in earlier ones.
     * The properties of the source objects are sorted in ascending, ASCII character order
     * before they are copied to ensure a consistent insertion order in the destination
     * object.
     *
     * @param destination The object to which properties are copied
     * @param sources Objects from which properties are copied
     * @return the destination object
     */
    static mergeAndSort(destination, ...sources) {
        return Utils.baseExtend(destination, sources, true, true);
    }
    static forEach(obj, iterator, context) {
        let key, length;
        if (obj) {
            if (Utils.isFunction(obj)) {
                for (key in obj) {
                    // Need to check if hasOwnProperty exists,
                    // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
                    if (key !== 'prototype' && key !== 'length' && key !== 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
            else if (Utils.isArray(obj) || Utils.isArrayLike(obj)) {
                const isPrimitive = typeof obj !== 'object';
                for (key = 0, length = obj.length; key < length; key++) {
                    if (isPrimitive || key in obj) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
            else if (obj.forEach && obj.forEach !== Utils.forEach) {
                obj.forEach(iterator, context, obj);
            }
            else if (Utils.isBlankObject(obj)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
            else if (typeof obj.hasOwnProperty === 'function') {
                // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
            else {
                // Slow path for objects which do not have a method `hasOwnProperty`
                for (key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        }
        return obj;
    }
    /**
     * Makes a deep copy of the passed object or array and returns it.
     * Copies of source objects of the following types: `TypedArray`, `Date`, `RegExp` `Node` are
     * made using the appropriate constructor. Arrays are created using `[]`. Other objects are created
     * using `Object.create` passing the source object's protptype, if any.
     *
     * @param source The source item to copy (`Object`, `Array`, `TypedArray`, `Date`, `RegExp`, `Node`)
     * @param destination An optional item to use as the destination. If passed, the item is cleared
     * before the source is copied to it. The destination cannot be a `TypedArray` and cannot be the same
     * as the source
     * @return The copied item
     */
    static copy(source, destination) {
        const stackSource = [];
        const stackDest = [];
        if (destination) {
            if (Utils.isTypedArray(destination)) {
                throw new Error("Can't copy! TypedArray destination cannot be mutated.");
            }
            if (source === destination) {
                throw new Error("Can't copy! Source and destination are identical.");
            }
            // Empty the destination object
            if (Utils.isArray(destination)) {
                destination.length = 0;
            }
            else {
                Utils.forEach(destination, (value, key) => {
                    if (!source.hasOwnProperty(key)) {
                        delete destination[key];
                    }
                });
            }
            stackSource.push(source);
            stackDest.push(destination);
            return copyRecurse(source, destination);
        }
        return copyElement(source);
        function copyRecurse(source, destination) {
            let key;
            if (Utils.isArray(source)) {
                for (let i = 0, ii = source.length; i < ii; i++) {
                    destination.push(copyElement(source[i]));
                }
            }
            else if (Utils.isBlankObject(source)) {
                // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
                for (key in source) {
                    destination[key] = copyElement(source[key]);
                }
            }
            else if (source && typeof source.hasOwnProperty === 'function') {
                // Slow path, which must rely on hasOwnProperty
                for (key in source) {
                    if (source.hasOwnProperty(key)) {
                        destination[key] = copyElement(source[key]);
                    }
                }
            }
            else {
                // Slowest path --- hasOwnProperty can't be called as a method
                for (key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        destination[key] = copyElement(source[key]);
                    }
                }
            }
            return destination;
        }
        function copyElement(source) {
            // Simple values
            if (!Utils.isObject(source)) {
                return source;
            }
            // Already copied values
            const index = stackSource.indexOf(source);
            if (index !== -1) {
                return stackDest[index];
            }
            if (Utils.isWindow(source)) {
                throw new Error("Can't copy! Making copies of Window instances is not supported.");
            }
            let needsRecurse = false;
            let destination;
            if (Utils.isArray(source)) {
                destination = [];
                needsRecurse = true;
            }
            else if (Utils.isTypedArray(source)) {
                destination = new source.constructor(source);
            }
            else if (Utils.isDate(source)) {
                destination = new Date(source.getTime());
            }
            else if (Utils.isRegExp(source)) {
                const matches = source.toString().match(/[^\/]*$/);
                destination = new RegExp(source.source, matches ? matches[0] : "");
                destination.lastIndex = source.lastIndex;
            }
            else if (Utils.isFunction(source.cloneNode)) {
                destination = source.cloneNode(true);
            }
            else {
                destination = Object.create(Object.getPrototypeOf(source));
                needsRecurse = true;
            }
            stackSource.push(source);
            stackDest.push(destination);
            return needsRecurse ? copyRecurse(source, destination) : destination;
        }
    }
    // Not currently used
    static copyWithoutNullOrEmpty(dst, src) {
        const keys = Object.keys(src);
        for (let j = 0, jj = keys.length; j < jj; j++) {
            const key = keys[j];
            const value = src[key];
            if (value === null || Utils.isEmpty(null)) {
                continue;
            }
            else if (Utils.isObject(value)) {
                if (Utils.isDate(value)) {
                    dst[key] = new Date(value.valueOf());
                }
                else if (Utils.isRegExp(value)) {
                    dst[key] = new RegExp(value);
                }
                else {
                    if (!Utils.isObject(dst[key])) {
                        dst[key] = Utils.isArray(value) ? [] : {};
                    }
                    dst[key] = Utils.copyWithoutNullOrEmpty(dst[key], value);
                }
            }
            else {
                dst[key] = value;
            }
        }
        return dst;
    }
    /**
     * Makes a shallow copy of the passed object. Empty string values are removed from the copied object.
     * A string value containing `""` is copied as an empty string.
     *
     * @param defaults The object to copy
     * @return The copied object
     */
    static copyDefaults(defaults) {
        const _defaults = Utils.copy(defaults);
        if (_defaults) {
            Object.keys(_defaults).forEach(key => {
                // Unset parameters will come through as empty strings (regardless of type)
                // Filter these out (to not hide defaults on the server) and accept "" as a way of explicitly
                // setting a parameter to be an empty string
                const value = _defaults[key];
                if (value === "") {
                    delete _defaults[key];
                }
                if (value === "\"\"") {
                    _defaults[key] = "";
                }
            });
        }
        return _defaults;
    }
    /**
     * Performs an optimized deep comparison between two objects to determine if they should be considered equal
     * @param o1 The first object to be compared
     * @param o2 The second object to be compared
     */
    static equals(o1, o2) {
        return lodash_isEqual__WEBPACK_IMPORTED_MODULE_9___default()(o1, o2);
    }
    /**
     * Converts a string to an integer value using `parseInt` with radix = 10.
     * If the string cannot be converted or contains additional characters then the
     * passed default value is returned
     * @param str The string to convert
     * @param _default The default value to use if the string cannot be converted
     */
    static toInt(str, _default = 0) {
        let value = parseInt(str, 10);
        if (isNaN(value) || (value + "" !== str)) {
            value = _default;
        }
        return value;
    }
    /**
     * Converts a string to a floating point value using `parseFloat`.
     * If the string cannot be converted then the passed default value is returned
     * @param str The string to convert
     * @param _default The default value to use if the string cannot be converted
     */
    static toNumber(str, _default = 0) {
        let value = parseFloat(str);
        if (isNaN(value)) {
            value = _default;
        }
        return value;
    }
    /**
     * Converts a string to a `Date` using `Date.parse`.
     * The date is returned in UTC. If the string cannot be converted then `undefined` is returned
     * @param str The string to convert
     * @return The converted `Date` in UTC or `undefined`
     */
    static toDate(str) {
        const ms = Date.parse(str);
        if (!ms && ms !== 0) {
            return undefined;
        }
        return new Date(ms + new Date(ms).getTimezoneOffset() * 60000); // get date in UTC
    }
    /**
     * Get the time component of a `Date` in milliseconds
     *
     * @param date The date
     * @return The time in milliseconds
     */
    static getTime(date) {
        if (!date) {
            return 0;
        }
        return (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) * 1000 + date.getMilliseconds();
    }
    /**
     * Return the current date and time
     */
    static get now() {
        return new Date();
    }
    /**
     * Converts a `Date` to a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`)
     * If the time component of the date is 0 then only the date portion of the string is included
     *
     * @param date The `Date` to convert
     */
    static toSysDateStr(date) {
        if (!date) {
            return "";
        }
        const m = moment__WEBPACK_IMPORTED_MODULE_1___default()(date);
        if (Utils.getTime(date) === 0) {
            return m.format("YYYY-MM-DD");
        }
        else {
            return m.format("YYYY-MM-DD HH:mm:ss");
        }
    }
    /**
     * Converts a Sinequa system date string (`dd-mm-yyyy[ hh:mm:ss]`) to a `Date`
     * If the string cannot be converted then `undefined` is returned
     *
     * @param date The Sinequa system date string to convert
     */
    static fromSysDateStr(value) {
        const m = moment__WEBPACK_IMPORTED_MODULE_1___default()(value, "YYYY-MM-DD HH:mm:ss");
        if (m.isValid()) {
            return m.toDate();
        }
        return undefined;
    }
    static isSysDateTime(str) {
        return Utils.rxSysDateTime.test(str);
    }
    static isISO8601DateTime(str) {
        return Utils.rxISO8601DateTime.test(str);
    }
    /**
     * Converts a Javascript value to a JSON string using `JSON.stringify`.
     * Date objects are converted to Sinequa system strings
     *
     * @param value The value to convert
     * @param options Options for the conversion. The default is `{pretty: false}`
     */
    static toJson(value, options = { pretty: false }) {
        return JSON.stringify(value, function (key, value) {
            if (key && Utils.isDate(this[key])) {
                const str = Utils.toSysDateStr(this[key]);
                return str;
            }
            return value;
        }, options.pretty ? 2 : 0);
    }
    /**
     * Converts a string to an object using `JSON.parse`.
     * Strings that are either in Sinequa system date or ISO8601 format are converted to
     * `Date` objects if the `reviveDates` option is specified.
     *
     * @param str The string to convert
     * @param options Options for the conversion. The default is `{reviveDates: false}`
     */
    static fromJson(str, options = { reviveDates: false }) {
        if (!str || typeof str !== "string") {
            return {};
        }
        try {
            return JSON.parse(str, options.reviveDates ?
                (key, value) => {
                    if (options.reviveDates && typeof value === "string") {
                        if (Utils.isSysDateTime(value)) {
                            const m = moment__WEBPACK_IMPORTED_MODULE_1___default()(value, "YYYY-MM-DD HH:mm:ss");
                            if (m.isValid()) {
                                return m.toDate();
                            }
                        }
                        else if (Utils.isISO8601DateTime(value)) {
                            const m = moment__WEBPACK_IMPORTED_MODULE_1___default()(value, moment__WEBPACK_IMPORTED_MODULE_1___default.a.ISO_8601);
                            if (m.isValid()) {
                                return m.toDate();
                            }
                        }
                    }
                    return value;
                } : undefined);
        }
        catch (exception) {
            console.log("Utils.fromJson exception:", exception);
            return null;
        }
    }
    /**
     * Converts a `FieldValue` value to a string compatible with Sinequa's SQL syntax.
     * String and `Date` values are enclosed in single quotes if the quote parameter is `true`
     *
     * @param value The value to convert
     * @param quote If set, the returned string will be enclosed in single quotes for string and `Date` values
     */
    static toSqlValue(value, quote) {
        if (Utils.isNumber(value)) {
            return value + "";
        }
        if (Utils.isDate(value)) {
            if (quote) {
                return "'" + Utils.toSysDateStr(value) + "'";
            }
            else {
                return Utils.toSysDateStr(value);
            }
        }
        if (Utils.isBoolean(value)) {
            return value ? "true" : "false";
        }
        if (Utils.isArray(value)) {
            const ret = [];
            value.forEach(v => {
                if (ret.length > 0) {
                    ret.push(",");
                }
                if (!v) {
                    ret.push("null");
                }
                else if (Utils.isString(v)) {
                    ret.push(v);
                }
                else {
                    ret.push(v.display || v.value || "");
                }
            });
            ret.splice(0, 0, "[");
            ret.push("]");
            return ret.join("");
        }
        if (quote) {
            return "'" + value + "'";
        }
        else {
            return value;
        }
    }
    /**
     * Clean a string so it is compatible with values stored in a Sinequa tree type-column.
     * The following operations are performed:
     * * ensure that the string starts and ends with forward slashes
     * * replace tab characters with spaces
     * * replace semi-colons with commas
     * * replace back slashes with forward slashes
     *
     * @param s The string to clean
     */
    static treeClean(s) {
        if (Utils.isEmpty(s)) {
            return s;
        }
        return Utils.addUrl("/", Utils.replace(Utils.replace(Utils.replace(s, "\t", " "), ";", ","), "\\", "/"), "/");
    }
    /**
     * Return the first node of a Sinequa tree value enclosed in forward slashes
     *
     * @param s A Sinequa tree value
     */
    static treeFirst(s) {
        const parts = Utils.split(s, "/");
        return parts.length === 0 ? "" : `/${parts[0]}/`;
    }
    /**
     * Return the first node of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeFirstNode(s) {
        const parts = Utils.split(s, "/");
        return parts[0];
    }
    /**
     * Return the last node of a Sinequa tree value enclosed in forward slashes
     *
     * @param s A Sinequa tree value
     */
    static treeLast(s) {
        const parts = Utils.split(s, "/");
        return parts.length === 0 ? "" : `/${parts[parts.length - 1]}/`;
    }
    /**
     * Return the last node of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeLastNode(s) {
        const parts = Utils.split(s, "/");
        return parts[parts.length - 1];
    }
    /**
     * Return the nodes making up a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeNodes(s) {
        return Utils.split(s, "/");
    }
    /**
     * Return a Sinequa tree value, removing enclosing forward slash characters
     *
     * @param s A Sinequa tree value
     */
    static treeDisplay(s) {
        if (!!s) {
            if (s[0] === "/") {
                s = s.substr(1);
            }
            if (s[s.length - 1] === "/") {
                s = s.substr(0, s.length - 1);
            }
        }
        return s;
    }
    /**
     * Return the node count of a Sinequa tree value
     *
     * @param s A Sinequa tree value
     */
    static treeCount(s) {
        const count = Utils.count(s, "/");
        return count > 0 ? count - 1 : 0;
    }
    /**
     * Traverses a tree structure, executing a callback function at every node
     * @param nodes the nodes to traverse
     * @param callback the callback function
     */
    static traverse(nodes, callback) {
        if (!nodes || nodes.length === 0) {
            return false;
        }
        if (!callback) {
            return false;
        }
        const lineage = [];
        const stack = [];
        let _i = nodes.length;
        while (_i--) {
            stack.push(nodes[_i]);
        }
        while (stack.length) {
            const node = stack.pop();
            if (!node) {
                lineage.pop();
                callback(undefined);
            }
            else {
                lineage.push(node);
                if (callback(lineage)) {
                    return true;
                }
                stack.push(undefined);
                if (node.items && node.items.length > 0) {
                    _i = node.items.length;
                    while (_i--) {
                        stack.push(node.items[_i]);
                    }
                }
            }
        }
        return false;
    }
    /**
     * Return a pseudo-GUID value using `Math.random`
     *
     * @param withHyphens If set, the returned GUID includes hyphen separators
     */
    static guid(withHyphens = true) {
        let d = Date.now();
        const guid = (withHyphens ?
            'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
    /**
     * Return `true` if the passed value is `undefined`
     */
    static isUndefined(value) {
        return typeof value === 'undefined';
    }
    /**
     * Return `true` if the passed value is an `object`
     */
    static isObject(value) {
        return value !== null && typeof value === 'object';
    }
    /**
     * Return `true` if the passed value is a `string`
     */
    static isString(value) {
        return typeof value === 'string';
    }
    /**
     * Return `true` if the passed value is a `number`
     */
    static isNumber(value) {
        return typeof value === 'number';
    }
    /**
     * Return `true` if the passed value is a `boolean`
     */
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    /**
     * Return `true` if the passed value is a `Date`
     */
    static isDate(value) {
        return Object.prototype.toString.call(value) === '[object Date]';
    }
    /**
     * Return `true` if the passed value is a scalar (`number`, `boolean` or `Date`)
     */
    static isScalar(value) {
        return Utils.isNumber(value) || Utils.isBoolean(value) || Utils.isDate(value);
    }
    /**
     * Return `true` if the passed value is an `Array`
     */
    static isArray(value) {
        return Array.isArray(value);
    }
    /**
     * Return `true` if the passed value is iterable
     */
    static isIterable(value) {
        if (value === null || value === undefined) {
            return false;
        }
        return typeof value[Symbol.iterator] === "function";
    }
    /**
     * Return `true` if the passed value is a `Map`
     */
    static isMap(value) {
        return Object.prototype.toString.call(value) === '[object Map]';
    }
    /**
     * Return `true` if the passed value is a `Function`
     */
    static isFunction(value) {
        return typeof value === 'function';
    }
    /**
     * Return `true` if the passed value is a `RegExp`
     */
    static isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }
    /**
     * Return `true` if the passed value is a `Window`
     */
    static isWindow(value) {
        return value && value.window === value;
    }
    /**
     * Return `true` if the passed value is a `File`
     */
    static isFile(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object File]";
    }
    /**
     * Return `true` if the passed value is a `FormData`
     */
    static isFormData(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object FormData]";
    }
    /**
     * Return `true` if the passed value is a `Blob`
     */
    static isBlob(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object Blob]";
    }
    /**
     * Return `true` if the passed value is an `ArrayBuffer`
     */
    static isArrayBuffer(value) {
        return Utils.isObject(value) && Object.prototype.toString.call(value) === "[object ArrayBuffer]";
    }
    static isArrayLike(obj) {
        // `null`, `undefined` and `window` are not array-like
        if (obj == null || Utils.isWindow(obj))
            return false;
        // arrays, strings and jQuery/jqLite objects are array like
        // * jqLite is either the jQuery or jqLite constructor function
        // * we have to check the existance of jqLite first as this method is called
        //   via the forEach method when constructing the jqLite object in the first place
        if (Utils.isArray(obj) || Utils.isString(obj) /*|| (jqLite && obj instanceof jqLite)*/)
            return true;
        // Support: iOS 8.2 (not reproducible in simulator)
        // "length" in obj used to prevent JIT error (gh-11508)
        const length = "length" in Object(obj) && obj.length;
        // NodeList objects (with `item` method) and
        // other objects with suitable length characteristics are array-like
        return Utils.isNumber(length) &&
            (length >= 0 && (length - 1) in obj || typeof obj.item === 'function');
    }
    /**
     * Return `true` if the passed value is an `object` without a prototype
     */
    static isBlankObject(value) {
        return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
    }
    /**
     * Return true if the passed value is a `TypedArray`
     */
    static isTypedArray(value) {
        return value && Utils.isNumber(value.length) && Utils.TYPED_ARRAY_REGEXP.test(Object.prototype.toString.call(value));
    }
    /**
     * Return a promise that is a resolved after a specified amount of time
     *
     * @param ms The time to delay in milliseconds
     */
    static delay(ms = 0) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve();
            }, ms);
        });
    }
    /**
     *
     * @param value
     * @param _default
     */
    static isTrue(value, _default) {
        if (typeof (value) === 'string') {
            value = value.toLowerCase();
        }
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            case "":
            case undefined:
                return !!_default;
            default:
                return false;
        }
    }
    /**
     * Compares two strings using the current locale. The return value is negative
     * if `a` comes before `b` and positive if `a` comes after `b`. If the values
     * are equal then `0` is returned
     *
     * @param a The first string
     * @param b The second string
     * @param ignoreCase If set, do a case-insensitive comparison
     */
    static compare(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.localeCompare(b);
    }
    /**
     * Return `true` if two strings are equal, respecting case
     *
     * @param a The first string
     * @param b The second string
     */
    static eq(a, b) {
        return Utils.compare(a, b, false) === 0;
    }
    /**
     * Return `true` if two strings are equal, ignoring case
     *
     * @param a The first string
     * @param b The second string
     */
    static eqNC(a, b) {
        return Utils.compare(a, b, true) === 0;
    }
    /**
     * Return `true` if a number of strings are equal, ignoring case
     *
     * @param a The first string
     * @param b Remaining strings
     */
    static eqNCN(a, ...b) {
        if (!b) {
            return false;
        }
        for (const s of b) {
            if (Utils.eqNC(a, s)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Return the length of a string. If the string is empty (`null` or `undefined`)
     * @param s A string
     */
    static len(s) {
        return (s || '').length;
    }
    /**
     * Return `true` if a string starts with another
     *
     * @param a The string to test
     * @param b The prefix
     * @param ignoreCase If `true` then ignore case
     */
    static startsWith(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.startsWith(b);
    }
    /**
     * Return `true` if a string ends with another
     *
     * @param a The string to test
     * @param b The postfix
     * @param ignoreCase If `true` then ignore case
     */
    static endsWith(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.endsWith(b);
    }
    /**
     * Return `true` if a string is a substring of another
     * @param a The string to test
     * @param b The substring
     * @param ignoreCase If `true` then ignore case
     */
    static includes(a, b, ignoreCase = true) {
        a = a || '';
        b = b || '';
        if (ignoreCase) {
            a = a.toLocaleUpperCase();
            b = b.toLocaleUpperCase();
        }
        return a.includes(b);
    }
    /**
     * Return the upper case value of a string using the current locale
     */
    static toUpperCase(s) {
        if (s) {
            return s.toLocaleUpperCase();
        }
        return "";
    }
    /**
     * Return a string with the first character converted to upper case using the current locale
     */
    static toUpperFirst(s) {
        if (s) {
            return s[0].toLocaleUpperCase() + s.substr(1);
        }
        return "";
    }
    /**
     * Return the lower case value of a string using the current locale
     */
    static toLowerCase(s) {
        if (s) {
            return s.toLocaleLowerCase();
        }
        return "";
    }
    /**
     * Return a string with the first character converted to lower case using the current locale
     */
    static toLowerFirst(s) {
        if (s) {
            return s[0].toLocaleLowerCase() + s.substr(1);
        }
        return "";
    }
    /**
     * Return a string where the first character of each space separated word is converted to upper case.
     * However, if a word contains a full stop character the first character is left unchanged
     */
    static toStartCase(text) {
        if (text) {
            const words = text.split(/[\s]+/);
            return words.map(value => !value.includes(".") ? Utils.toUpperFirst(value) : value).join(" ");
        }
        return "";
    }
    /**
     * Return a string where any leading and trailing whitespace characters are removed
     */
    static trim(s) {
        if (s) {
            return s.trim();
        }
        return "";
    }
    /**
     * Return a string where any leading whitespace characters are removed
     */
    static trimStart(s) {
        if (s) {
            return s.trimStart();
        }
        return "";
    }
    /**
     * Return a string where any trailing whitespace characters are removed
     */
    static trimEnd(s) {
        if (s) {
            return s.trimEnd();
        }
        return "";
    }
    /**
     * Return a string truncated to a maximum length. If the length of the string is greater than `maxLength`
     * then it is truncated to `maxLength and a `suffix` appended. Otherwise the string is returned unchanged
     *
     * @param s The string to truncate
     * @param maxLength The maximum length
     * @param suffix The value to append if the string is truncated. The default is `...`
     */
    static truncate(s, maxLength, suffix) {
        if (!s) {
            return "";
        }
        suffix = suffix || "...";
        if (s.length <= maxLength) {
            return s;
        }
        return s.substring(0, maxLength - suffix.length) + suffix;
    }
    /**
     * Return a string where any regular expresion operators are escaped
     */
    static regExEscape(s) {
        if (!s) {
            return "";
        }
        return s.replace(Utils.regExEscapeRegEx, "\\$&");
    }
    /**
     * Replaces patterns in a string with a replacement string. The pattern can either a string
     * or a `RegExp`.
     *
     * @param s The string in which to search for a pattern
     * @param pattern The pattern
     * @param replacement The replacement string to replace any occurrences of the pattern in the string
     */
    static replace(s, pattern, replacement) {
        if (!s || !pattern) {
            return "";
        }
        if (Utils.isRegExp(pattern)) {
            return s.replace(pattern, replacement);
        }
        else {
            return s.replace(new RegExp(Utils.regExEscape(pattern), "g"), replacement);
        }
    }
    /**
     * Split a string into an array of substrings using the passed separators
     *
     * @param s The string to split
     * @param separators One or more separators
     * @param trim If `true` trim any leading and trailing spaces from the substrings
     * @param removeEmpty If `true` exclude any empty strings from the array of substrings
     */
    static split(s, separators, trim = true, removeEmpty = true) {
        if (!s) {
            return [];
        }
        if (!separators) {
            return [s];
        }
        let split;
        if (typeof separators === "string") {
            split = s.split(separators);
            if (trim) {
                split = split.map(value => value.trim());
            }
        }
        else {
            let rxs = separators.map((value) => Utils.regExEscape(value)).join("|");
            if (trim) {
                rxs = "(?:^\\s*)|(?:\\s*(?:" + rxs + ")\\s*)|(?:\\s*$)";
            }
            split = s.split(new RegExp(rxs));
        }
        if (removeEmpty) {
            split = split.filter((value) => {
                return !Utils.isEmpty(value);
            });
        }
        return split;
    }
    /**
     * Return a string in kebab case (`CatDog => cat-dog`)
     */
    static toKebabCase(text) {
        return lodash_kebabCase__WEBPACK_IMPORTED_MODULE_4___default()(text);
    }
    /**
     * Return a string in snake case (`CatDog => cat_dog`)
     */
    static toSnakeCase(text) {
        return lodash_snakeCase__WEBPACK_IMPORTED_MODULE_5___default()(text);
    }
    /**
     * Return a string in camel case (`CatDog => catDog`)
     */
    static toCamelCase(text) {
        return lodash_camelCase__WEBPACK_IMPORTED_MODULE_6___default()(text);
    }
    /**
     * Return a string with any diacritics removed
     */
    static removeAccents(text) {
        if (!text) {
            return "";
        }
        return Object(diacritics__WEBPACK_IMPORTED_MODULE_2__["remove"])(text);
    }
    /**
     * Return a string in normalized form which can be used to match entity values. A normalized value
     * has any diacritics removed and is converted to upper case
     */
    static normalize(text) {
        if (!text) {
            return "";
        }
        return Utils.removeAccents(text).toUpperCase();
    }
    /**
     * Return `true` if a string is valid as a simple value for the Sinequa admininistration
     */
    static isValidSimpleName(name) {
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);
    }
    /**
     * Return `true` if a string is valid as a scoped (`.` separated) simple value for the Sinequa admininistration
     */
    static isValidScopedSimpleName(name) {
        return /^[a-zA-Z_]([\.]?[a-zA-Z0-9_]+)*$/.test(name);
    }
    /**
     * Return `true` if a value is `null`, `undefined` or `""`
     */
    static isEmpty(value) {
        if (value === "") {
            return true;
        }
        if (value === null) {
            return true;
        }
        if (Utils.isUndefined(value)) {
            return true;
        }
        return false;
    }
    /**
     * Return the number of occurrences of a substring in a string
     *
     * @param text The text to test
     * @param sub The substring
     * @param ignoreCase If `true` don't respect case when matching the substring
     */
    static count(text, sub, ignoreCase = true) {
        if (!text || !sub) {
            return 0;
        }
        if (ignoreCase) {
            text = text.toLocaleUpperCase();
            sub = sub.toLocaleUpperCase();
        }
        let pos = -1;
        let count = 0;
        while (true) {
            pos = text.indexOf(sub, pos + 1);
            if (pos === -1) {
                break;
            }
            count++;
        }
        return count;
    }
    /**
     * Return a string converted to base64
     */
    static toBase64(value) {
        return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16))));
    }
    /**
     * Return a string converted from base64
     */
    static fromBase64(value) {
        return decodeURIComponent(atob(value).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
    /**
     * Return the SHA256 hash value of string
     */
    static sha256(value) {
        const sha = new jssha__WEBPACK_IMPORTED_MODULE_3___default.a("SHA-256", "TEXT");
        sha.update(value);
        return sha.getHash("B64");
    }
    /**
     * Return the SHA512 hash value of string
     */
    static sha512(value) {
        const sha = new jssha__WEBPACK_IMPORTED_MODULE_3___default.a("SHA-512", "TEXT");
        sha.update(value);
        return sha.getHash("B64");
    }
    /**
     * Return a string where any HTML special characters are percent encoded
     */
    static encodeHTML(value) {
        return lodash_escape__WEBPACK_IMPORTED_MODULE_7___default()(value);
    }
    /**
     * Return a string where any percent encoded characters are replaced by their corresponding unencoded characters
     */
    static decodeHTML(value) {
        return lodash_unescape__WEBPACK_IMPORTED_MODULE_8___default()(value);
    }
    /**
     * Get a field with passed name from an object. The field name is matched insensitive of case
     */
    static getField(obj, name) {
        if (!Utils.isObject(obj) || Utils.isEmpty(name)) {
            return undefined;
        }
        const keys = Object.keys(obj).filter(key => Utils.eqNC(key, name));
        if (keys.length === 0) {
            return undefined;
        }
        return obj[keys[0]];
    }
    /**
     * Clear fields from an object. If the `_delete` parameter is `false` then
     * array or map fields are emptied and other fields are set to `undefined`.
     * If the `_delete` parameter is `true` then fields are deleted
     */
    static clearObject(obj, _delete = false) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (_delete) {
                    delete obj[prop];
                }
                else {
                    if (Utils.isArray(obj[prop])) {
                        obj[prop].length = 0;
                    }
                    else if (Utils.isMap(obj[prop])) {
                        obj[prop].clear();
                    }
                    else {
                        obj[prop] = undefined;
                    }
                }
            }
        }
        return obj;
    }
    /**
     * Return the non-empty fields in the `override` object that that are different to fields of the same name
     * in the `template` object
     * @param template The object to compare against
     * @param override The object defining the fields and values to be compared
     * @param ret An optional return object. If not set a new object is created
     */
    static deltas(template, override, ret) {
        if (!ret) {
            ret = {};
        }
        for (const name of Object.keys(override)) {
            if (name in template) {
                if (Utils.isObject(override[name]) && !Utils.isArray(override[name])) {
                    const diff = Utils.deltas(template[name], override[name]);
                    if (!Utils.equals(diff, {})) {
                        ret[name] = diff;
                    }
                }
                else if (!Utils.equals(template[name], override[name])) {
                    if (!Utils.isEmpty(override[name])) {
                        ret[name] = override[name];
                    }
                }
            }
            else {
                if (!Utils.isEmpty(override[name])) {
                    ret[name] = override[name];
                }
            }
        }
        return ret;
    }
    /**
     * Returns an object containing the fields in a source object whose names match one of the passed keys. The keys can either be
     * an array of strings or a callback function that is called for each field in the source object and returns `true` if a field
     * should be "picked".
     *
     * @param obj The source object
     * @param keys An array of keys or a callback function
     */
    static pick(obj, keys) {
        const ret = {};
        if (!!obj) {
            if (Utils.isFunction(keys)) {
                Object.keys(obj).forEach(key => {
                    if (keys(obj[key], key, obj)) {
                        ret[key] = obj[key];
                    }
                });
            }
            else {
                for (const key of keys) {
                    if (obj.hasOwnProperty(key)) {
                        ret[key] = obj[key];
                    }
                }
            }
        }
        return ret;
    }
    /**
     * Create a debounce function that delays invoking `func` until after `wait` millseconds have elapsed since the previous invocation.
     *
     * @param func The function to debounce
     * @param wait The delay in milliseconds to wait before calling `func`
     * @param immediate If `true` then make an initial call to `func`
     * @param every An optional callback to call without debouncing
     */
    static debounce(func, wait = 0, immediate = false, every) {
        let timeout, args, context, timestamp, result;
        const later = function () {
            const last = Date.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) {
                        context = args = null;
                    }
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            if (every) {
                every.apply(context, args);
            }
            timestamp = Date.now();
            const callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    }
    /**
     * Create a throttled function that only invokes func at most once per every `wait` milliseconds.
     *
     * @param func The function to throttle
     * @param wait The number of milliseconds to throttle invocations to
     * @param options Options to control the throttling behaviour
     */
    static throttle(func, wait, options = {}) {
        let timeout, context, args, result;
        let previous = 0;
        const later = function () {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        };
        const throttled = function () {
            const now = Date.now();
            if (!previous && options.leading === false)
                previous = now;
            const remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            }
            else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
        throttled["cancel"] = function () {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };
        return throttled;
    }
    /**
     * Create a function that calls `callback` the next time the browser next repaints
     */
    static frame(callback) {
        return (...params) => {
            if (Utils.frameTasks.size === 0) {
                requestAnimationFrame((timestamp) => {
                    Utils.frameTasks.forEach((task, key, map) => {
                        task.call();
                    });
                    Utils.frameTasks.clear();
                });
            }
            const task = Utils.frameTasks.get(callback);
            if (task) {
                // Update params
                task.params = params;
            }
            else {
                // Add new task
                Utils.frameTasks.set(callback, new FrameTask(callback, params));
            }
        };
    }
    /**
     * Create a URL object from a `url` string. If the string is a relative url then
     * `base` specifies the base to use
     */
    static makeURL(url, base) {
        if (!base) {
            base = "http://x.y.z"; // Firefox and IOS need this
        }
        return new URL(url, base);
    }
    /**
     * Add query string parameters to a url
     *
     * @param url The url to which to add the parameters
     * @param params An object whose fields should be added as parameters
     */
    static addSearchParams(url, params) {
        if (!url || !params) {
            return url;
        }
        const urlObj = Utils.makeURL(url);
        for (const param in params) {
            if (params.hasOwnProperty(param)) {
                urlObj.searchParams.set(param, params[param]);
            }
        }
        const index = url.indexOf("?");
        if (index !== -1) {
            url = url.substr(0, index);
        }
        url += "?" + urlObj.searchParams.toString();
        return url;
    }
    static _addUrl(url, path) {
        if (!path) {
            return url;
        }
        if (!url) {
            return path;
        }
        if (url[url.length - 1] === "/") {
            if (path[0] === "/") {
                return url + path.substr(1);
            }
            else {
                return url + path;
            }
        }
        else {
            if (path[0] === "/") {
                return url + path;
            }
            else {
                return url + "/" + path;
            }
        }
    }
    /**
     * Add paths to a url adding path separators as necessary
     *
     * @param url The url
     * @param paths One or more paths to add to the url
     */
    static addUrl(url, ...paths) {
        let _url = url;
        for (const path of paths) {
            _url = Utils._addUrl(_url, path);
        }
        return _url;
    }
    /**
     * Return `true` if a url is absolute
     */
    static isUrlAbsolute(url) {
        return /^(?:[a-zA-Z][a-zA-Z\d+.-]*:|\/\/)/.test(url);
    }
    /**
     * Return an `HttpParams` object containing the fields in the passed object
     */
    static makeHttpParams(params) {
        let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]({ encoder: new SqHttpParameterCodec() });
        if (params) {
            for (const param in params) {
                if (params.hasOwnProperty(param)) {
                    const _value = params[param];
                    let value = "";
                    if (Utils.isString(_value)) {
                        value = _value;
                    }
                    else if (Utils.isBoolean(_value) || Utils.isNumber(_value)) {
                        value = _value.toString();
                    }
                    else if (Utils.isDate(_value)) {
                        value = Utils.toSysDateStr(_value);
                    }
                    else {
                        value = Utils.toJson(_value);
                    }
                    httpParams = httpParams.set(param, value);
                }
            }
        }
        return httpParams;
    }
    /**
     * Return a string with HTML special characters escaped
     *
     * @param html The string to escape
     */
    static escapeHtml(html) {
        if (!html) {
            return html;
        }
        if (!Utils.escapeDiv) {
            Utils.escapeDiv = document.createElement("div");
        }
        const textNode = Utils.escapeDiv.appendChild(document.createTextNode(html));
        const escapedHtml = Utils.escapeDiv.innerHTML;
        Utils.escapeDiv.removeChild(textNode);
        return escapedHtml;
    }
    /**
     * Move an element in an array
     *
     * @param array The array containing the element to move
     * @param from The index of the element to move
     * @param to The index that the element should be moved to
     */
    static arrayMove(array, from, to) {
        if (to === from) {
            return;
        }
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    /**
     * Set the contents of a target array to the contents of a source array
     *
     * @param target The target array
     * @param source The source array
     */
    static arraySet(target, source) {
        return target.splice.apply(target, [0, target.length].concat(source));
    }
    static genericNext(value) {
    }
    static genericError(error) {
    }
    static genericComplete() {
    }
    /**
     * A simple wrapped around `Observable.subscribe`
     */
    static subscribe(observable, next, error, complete) {
        if (!next) {
            next = Utils.genericNext;
        }
        if (!error) {
            error = Utils.genericError;
        }
        if (!complete) {
            complete = Utils.genericComplete;
        }
        return observable.subscribe(next, error, complete);
    }
    /**
     * Return a value as a `Date` converting as necessary. If the value
     * cannot be converted then `undefined` is returned
     */
    static asDate(value) {
        if (!value) {
            return undefined;
        }
        if (Utils.isDate(value)) {
            return value;
        }
        if (Utils.isString(value)) {
            return Utils.toDate(value);
        }
        return undefined;
    }
    /**
     * Return a value as a `number` converting as necessary. If the value
     * cannot be converted then `undefined` is returned.
     */
    static asNumber(value) {
        if (!value && value !== 0) {
            return undefined;
        }
        if (Utils.isNumber(value)) {
            return value;
        }
        if (Utils.isString(value)) {
            if (Utils.testInteger(value)) {
                return Utils.toInt(value);
            }
            if (Utils.testFloat(value)) {
                return Utils.toNumber(value);
            }
        }
        return undefined;
    }
    /**
     * Return a value as a `string` converting as necessary
     */
    static asString(value) {
        if (!value && value !== "") {
            return undefined;
        }
        if (Utils.isString(value)) {
            return value;
        }
        return value.toString();
    }
    /**
     * Return `true` if a string represents an integer
     */
    static testInteger(str) {
        return /^(\-|\+)?([0-9]+)$/.test(str);
    }
    /**
     * Return `true` if a string represents a floating point number
     */
    static testFloat(str) {
        return /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str);
    }
    /**
     * Round the passed number away from zero: 4.5 => 5, -4.5 => -5
     */
    static roundAway(num) {
        return num >= 0 ? Math.round(num) : Math.sign(num) * Math.round(Math.abs(num));
    }
    static matchSuffix(str, factor, ...suffixes) {
        for (const suffix of suffixes) {
            if (Utils.endsWith(str, suffix)) {
                return {
                    str: Utils.trimEnd(str.substr(0, str.length - suffix.length)),
                    factor
                };
            }
        }
        return undefined;
    }
    /**
     * Convert a size in string form to a number in bytes.
     *
     * The following units are supported: `b`, `kb`, `mb`, `gb`, `tb`, `pb`
     *
     * For example `2.5 gb` will return `2621440`.
     */
    static toSize(str, _default = 0) {
        str = Utils.trim(str);
        if (!str) {
            return _default;
        }
        let factor = 1;
        let ret = Utils.matchSuffix(str, 1024 * 1024 * 1024 * 1024 * 1024, "PB", "PO");
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024 * 1024 * 1024 * 1024, "TB", "TO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024 * 1024 * 1024, "GB", "GO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024 * 1024, "MB", "MO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1024, "KB", "KO");
        }
        if (ret === undefined) {
            ret = Utils.matchSuffix(str, 1, "B", "O");
        }
        if (ret !== undefined) {
            str = ret.str;
            factor = ret.factor;
        }
        if (!Utils.testFloat(str)) {
            return _default;
        }
        const value = Utils.toNumber(str, _default) * factor;
        return Math.round(value);
    }
    static calculateDuration(current, unit) {
        switch (Utils.toLowerCase(unit)) {
            case "d":
            case "j":
            case "days":
            case "jours":
            case "day":
            case "jour":
                return current * Utils.oneDay;
            case "h":
            case "hours":
            case "heures":
            case "hour":
            case "heure":
                return current * Utils.oneHour;
            case "m":
            case "minutes":
            case "minute":
            case "mins":
            case "min":
                return current * Utils.oneMinute;
            case "s":
            case "seconds":
            case "secondes":
            case "second":
            case "seconde":
            case "secs":
            case "sec":
                return current * Utils.oneSecond;
                break;
            case "ms":
            case "milliseconds":
            case "miliseconds":
            case "millisecondes":
            case "milisecondes":
            case "millisecond":
            case "milliseconde":
            case "milisecond":
            case "miliseconde":
                return current;
            default:
                return 0;
        }
    }
    /**
     * Convert a duration in string form to a number in milliseconds.
     *
     * These units are supported: `days`, `hours`, `minutes`, `seconds`, `milliseconds` (abbreviations are also supported)
     *
     * For example `3 h 2mins 4s => 10924000`
     *
     * @param defaultUnit The unit to use if no units are in the string. The default value is `ms`
     */
    static toDuration(str, defaultUnit = "ms") {
        let total = 0;
        if (str) {
            let current = 0;
            const tokens = str.match(/[0-9\.,]+|[a-zA-Z]+/g) || [];
            for (const token of tokens) {
                if (/[a-zA-Z]/.test(token)) {
                    total += Utils.calculateDuration(current, token);
                    current = 0;
                }
                else {
                    if (current) {
                        total += Utils.calculateDuration(current, defaultUnit);
                    }
                    current = Utils.toNumber(token);
                }
            }
            if (current) {
                total += Utils.calculateDuration(current, defaultUnit);
            }
        }
        return total;
    }
}
/**
 * The number of milliseconds in one day
 */
Utils.oneDay = 86400000;
/**
 * The number of milliseconds in one hour
 */
Utils.oneHour = 3600000;
/**
 * The number of milliseconds in one minute
 */
Utils.oneMinute = 60000;
/**
 * The number of milliseconds in one second
 */
Utils.oneSecond = 1000;
Utils.rxSysDateTime = /^\d{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])(?: (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d)?$/;
// private static rxISO8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
// ISO8601 combined date and time
Utils.rxISO8601DateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
Utils.TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
Utils.regExEscapeRegEx = /[-\/\\^$*+?.()|[\]{}]/g;
Utils.frameTasks = new Map();


/***/ }),

/***/ "Z1K+":
/*!************************************************!*\
  !*** ./projects/core/app-utils/app.service.ts ***!
  \************************************************/
/*! exports provided: AppService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppService", function() { return AppService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _query_expr_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./query/expr-parser */ "edoa");
/* harmony import */ var _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-service-helpers */ "/paf");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _format_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./format.service */ "mfeY");











/**
 * A service to manage the Sinequa SBA configuration
 */
class AppService {
    constructor(startConfig, appWebService, intlService, formatService) {
        this.startConfig = startConfig;
        this.appWebService = appWebService;
        this.intlService = intlService;
        this.formatService = formatService;
        this._events = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        if (!this.appName) {
            console.error("Missing app name!");
        }
    }
    static toEngineType(type) {
        if (!type) {
            return 0 /* none */;
        }
        switch (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(type)) {
            case "bool":
            case "boolean": return 1 /* bool */;
            case "date": return 2 /* date */;
            case "datetime": return 3 /* dateTime */;
            case "time": return 4 /* time */;
            case "unsigned": return 5 /* unsigned */;
            case "integer": return 6 /* integer */;
            case "float": return 7 /* float */;
            case "double": return 8 /* double */;
            case "dates": return 9 /* dates */;
            case "datetimes": return 10 /* dateTimes */;
            case "times": return 11 /* times */;
            case "varchar": return 12 /* varchar */;
            case "binary": return 13 /* binary */;
            case "string": return 14 /* string */;
            case "csv": return 15 /* csv */;
            default: return 0 /* none */;
        }
    }
    static toEngineTypeModifierSimple(c) {
        switch (c) {
            case 'a': return 2053 /* a */;
            case 'c': return 4 /* c */;
            case 'd': return 8 /* d */;
            case 'e': return 2068 /* e */;
            case 'i': return 256 /* i */;
            case 'l': return 2052 /* l */;
            case 'n': return 8192 /* n */;
            case 't': return 524292 /* t */;
            case 'x': return 8388608 /* x */;
            case 'z': return 33554432 /* z */;
            default: return 0 /* none */;
        }
    }
    static toEngineTypeModifier(eType, typeModifier) {
        let etm = 0 /* none */;
        if (typeModifier) {
            for (const c of typeModifier) {
                etm |= AppService.toEngineTypeModifierSimple(c);
            }
        }
        return etm;
    }
    static makeColumn(name, type, typeModifier, aliases) {
        const eType = AppService.toEngineType(type);
        const eTypeModifier = AppService.toEngineTypeModifier(eType, typeModifier || "");
        return {
            name,
            type,
            typeModifier,
            eType,
            eTypeModifier,
            aliases
        };
    }
    /**
     * Return `true` if a `column` is a string
     */
    static isString(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isString(column);
    }
    /**
     * Return `true` if a `column` is a csv
     */
    static isCsv(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isCsv(column);
    }
    /**
     * Return `true` if a `column` is a tree
     */
    static isTree(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isTree(column);
    }
    /**
     * Return `true` if a `column` is an entity
     */
    static isEntity(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isEntity(column);
    }
    /**
     * Return `true` if a `column` is a boolean
     */
    static isBoolean(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isBoolean(column);
    }
    /**
     * Return `true` if a `column` is a date
     */
    static isDate(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isDate(column);
    }
    /**
     * Return `true` if a `column` is a double
     */
    static isDouble(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isDouble(column);
    }
    /**
     * Return `true` if a `column` is an integer
     */
    static isInteger(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isInteger(column);
    }
    /**
     * Return `true` if a `column` is a number (integer or double)
     */
    static isNumber(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isNumber(column);
    }
    /**
     * Return `true` if a `column` is a scalar
     */
    static isScalar(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isScalar(column);
    }
    /**
     * Return `true` if a `column` is sortable
     */
    static isSortable(column) {
        return _app_service_helpers__WEBPACK_IMPORTED_MODULE_6__["AppServiceHelpers"].isSortable(column);
    }
    ngOnDestroy() {
        this._events.complete();
    }
    /**
     * Return an `Observable` stream of the events that the `AppService` can generate
     */
    get events() {
        return this._events;
    }
    /**
     * Return the name of the SBA
     */
    get appName() {
        return this.startConfig.app;
    }
    /**
     * Return the origin of the Sinequa server
     */
    get origin() {
        return this.startConfig.origin;
    }
    initDefaultQuery() {
        if (!this.app) {
            console.warn("No app configured");
            return;
        }
        // If not set explicitly, the default query is the first in the list
        const defaultQueryName = this.app.defaultQueryName || _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].split(this.app.queryNames, ",")[0];
        this._defaultCCQuery = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].getField(this.app.queries, defaultQueryName);
        if (!this._defaultCCQuery) {
            console.warn(`Query not configured for app: ${this.appName}`);
        }
        this.ccquery = this._defaultCCQuery;
    }
    setApp(app) {
        this.app = app;
        this.verifyServerApiVersionCompatibility(app);
        this.cclabels = this.getWebService(this.app.labels);
        this.ccautocomplete = this.getWebService(this.app.autocomplete);
        this.initDefaultQuery();
        this.makeMaps();
        this.suggestQueries = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].split(this.ccautocomplete ? this.ccautocomplete.suggestQueries : "", ",");
    }
    verifyServerApiVersionCompatibility(app) {
        if (!app) {
            console.warn('Unexpected empty app configuration.');
            return;
        }
        if (!app.apiVersion) {
            console.error(`The App config '${app.name}' is not of 'Angular Workspace application' type.`);
        }
        else if (app.apiVersion !== _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["MINIMUM_COMPATIBLE_SERVER_API_VERSION"]) {
            console.warn(`This SBA is not compatible with the REST API of Sinequa Server.\n` +
                `The SBA expects the server API version to be at least '${_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["MINIMUM_COMPATIBLE_SERVER_API_VERSION"]}',` +
                ` whereas the server API version is '${app.apiVersion}'.`);
        }
    }
    /**
     * Initialize this service by retrieving the current application
     * configuration from the Sinequa server and using it to set up the data structures
     * on which the service relies
     */
    init() {
        return this.appWebService.get().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(app => {
            this.setApp(app);
            return app;
        }));
    }
    /**
     * Initialize this service from an application configuration object. This is typically
     * used for supporting mutiple concurrent queries within the same application by providing
     * component level instances of this service.
     */
    initFromApp(app) {
        if (app) {
            this.setApp(app);
        }
    }
    /**
     * Refresh the application configuration, reinitializing the service if it has changed
     *
     * @param auditEvents Any associated audit events that should be stored
     */
    refresh(auditEvents) {
        const observable = this.appWebService.refresh(this.app ? this.app.versionId : "", auditEvents);
        observable.subscribe(response => {
            if (!response.upToDate && response.app) {
                this.setApp(response.app);
            }
            return response;
        });
        return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((value) => {
            return this.app;
        }));
    }
    /**
     * Clear the data associated with the service. Typically used when processing a user logout
     */
    clear() {
        this.app = undefined;
        this.cclabels = undefined;
        this._defaultCCQuery = undefined;
        this.ccquery = undefined;
        this.clearMaps();
    }
    indexIsNormal(ccindex) {
        return !!ccindex && (!ccindex.indexType || _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].startsWith(ccindex.indexType, "normal"));
    }
    getIndexForQuery(ccquery) {
        if (!ccquery) {
            return undefined;
        }
        const indexes = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].split(ccquery.searchIndexes, [","]);
        if (indexes.length === 0) {
            return this.app ? this.app.indexes._ : undefined;
        }
        else {
            const ccindex = this.getIndex(indexes[0]);
            if (ccindex && this.indexIsNormal(ccindex)) {
                return this.app ? this.app.indexes._ : undefined;
            }
            return ccindex;
        }
    }
    _makeColumnMapForIndex(columnMap, ccindex) {
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnName of Object.keys(ccindex.columns)) {
            const column = ccindex.columns[columnName];
            columnMap[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(column.name)] = column;
            if (column.aliases) {
                for (const alias of column.aliases) {
                    columnMap[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(alias)] = column;
                }
            }
        }
    }
    _makeColumnMapForQuery(columnMap, ccquery) {
        if (!ccquery || !ccquery.columnsInfo || !ccquery.columnsInfo.columns) {
            return;
        }
        const ccindex = this.getIndexForQuery(ccquery);
        if (!ccindex || !ccindex.columns) {
            return;
        }
        for (const columnInfo of ccquery.columnsInfo.columns) {
            if (columnInfo.name) {
                const columnName = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(columnInfo.name);
                let column = ccindex.columns[columnName];
                if (!column) {
                    column = AppService.extraColumns[columnName];
                }
                if (column) {
                    // Copy column so we can add the query specific aliases and labels
                    column = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].copy(column);
                    columnMap[columnName] = column;
                    if (columnInfo.aliases) {
                        column.aliases = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].split(columnInfo.aliases, [",", ";"]);
                        for (const alias of column.aliases) {
                            columnMap[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(alias)] = column;
                        }
                    }
                    // Overwrite labels if defined on the query
                    if (columnInfo.label) {
                        column.label = columnInfo.label;
                    }
                    if (columnInfo.labelPlural) {
                        column.labelPlural = columnInfo.labelPlural;
                    }
                    if (columnInfo.formatter) {
                        column.formatter = columnInfo.formatter;
                    }
                    if (columnInfo.transforms) {
                        column.transforms = columnInfo.transforms;
                    }
                    if (columnInfo.parser) {
                        column.parser = columnInfo.parser;
                    }
                    if (columnInfo.description) {
                        column.description = columnInfo.description;
                    }
                }
            }
        }
    }
    makeMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
        if (!this.app) {
            return;
        }
        let columnMap;
        // Queries
        if (this.app.queries) {
            for (const queryName of Object.keys(this.app.queries)) {
                const ccquery = this.app.queries[queryName];
                if (ccquery) {
                    ccquery.$columnFieldsPattern = new _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["PatternMatcher"]("included column fields", "excluded column fields");
                    ccquery.$columnFieldsPattern.includedPattern.setText(ccquery.columnFieldsIncluded);
                    ccquery.$columnFieldsPattern.excludedPattern.setText(ccquery.columnFieldsExcluded);
                    ccquery.$partnameFieldsPattern = new _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["PatternMatcher"]("included part name fields", "excluded part name fields");
                    ccquery.$partnameFieldsPattern.includedPattern.setText(ccquery.partnameFieldsIncluded);
                    ccquery.$partnameFieldsPattern.excludedPattern.setText(ccquery.partnameFieldsExcluded);
                    if (ccquery.columnsInfo) {
                        columnMap = {};
                        this.columnsByQuery[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(ccquery.name)] = columnMap;
                        this._makeColumnMapForQuery(columnMap, ccquery);
                    }
                }
            }
        }
        // Indexes
        if (this.app.indexes) {
            // Special normal index
            const ccindex = this.app.indexes._;
            if (ccindex) {
                columnMap = {};
                this.columnsByIndex._ = columnMap;
                this._makeColumnMapForIndex(columnMap, ccindex);
            }
            for (const indexName of Object.keys(this.app.indexes)) {
                const ccindex1 = this.app.indexes[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(indexName)];
                if (ccindex1) {
                    if (this.indexIsNormal(ccindex1)) {
                        if (ccindex1.name !== "_") {
                            this.columnsByIndex[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(ccindex1.name)] = this.columnsByIndex._;
                        }
                    }
                    else {
                        columnMap = {};
                        this.columnsByIndex[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(ccindex1.name)] = columnMap;
                        this._makeColumnMapForIndex(columnMap, ccindex1);
                    }
                }
            }
        }
        // Fields per query (contains aliases for default query and globally defined aliases)
        const globalFields = new Map();
        const columns = this.columnsByIndex._;
        if (columns) {
            for (const key of Object.keys(columns)) {
                const column = columns[key];
                if (column.aliases && column.aliases.length > 0) {
                    const alias = column.aliases[0];
                    if (alias) {
                        globalFields.set(alias, alias);
                    }
                }
            }
        }
        for (const queryName of Object.keys(this.columnsByQuery)) {
            const queryFields = new Map(globalFields);
            const columns1 = this.columnsByQuery[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(this.defaultCCQuery ? this.defaultCCQuery.name : "")];
            if (columns1) {
                for (const key of Object.keys(columns1)) {
                    const column = columns1[key];
                    if (column.aliases && column.aliases.length > 0) {
                        const alias = column.aliases[0];
                        if (alias) {
                            queryFields.set(alias, alias);
                        }
                    }
                }
                this.fieldsByQuery[queryName] = Array.from(queryFields.keys());
            }
        }
    }
    clearMaps() {
        this.columnsByQuery = {};
        this.columnsByIndex = {};
        this.fieldsByQuery = {};
    }
    /**
     * Get the configuration of the web service with the passed name
     */
    getWebService(name) {
        if (!this.app) {
            return undefined;
        }
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].getField(this.app.webServices, name);
    }
    /**
     * Get the list configuration with the passed name
     */
    getList(name) {
        if (!this.app) {
            return undefined;
        }
        return this.app.lists[name];
    }
    /**
     * Return the default {@link CCQuery}
     */
    get defaultCCQuery() {
        return this._defaultCCQuery;
    }
    /**
     * Return the current {@link CCQuery}
     */
    get ccquery() {
        if (!!this._ccquery) {
            return this._ccquery;
        }
        return this._defaultCCQuery;
    }
    /**
     * Set the current {@link CCQuery}
     */
    set ccquery(value) {
        if (value !== this._ccquery) {
            const previous = this._ccquery;
            this._ccquery = value;
            this._events.next({ type: "query-changed", current: this._ccquery, previous: previous });
        }
    }
    /**
     * Get the {@link CCQuery} with the passed name
     */
    getCCQuery(name) {
        return this.app ? this.app.queries[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(name)] : undefined;
    }
    /**
     * Set the current {@link CCQuery} to that with the passed name
     */
    setCCQuery(name) {
        const ccquery = !name ? this.defaultCCQuery : this.getCCQuery(name);
        if (ccquery) {
            this.ccquery = ccquery;
            return true;
        }
        else {
            console.warn(`AppService.setCCQuery - query '${name}' does not exist`);
            return false;
        }
    }
    /**
     * Return the fields defined on the current {@link CCQuery}
     */
    get fields() {
        if (!this.ccquery) {
            return [];
        }
        return this.fieldsByQuery[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(this.ccquery.name)] || [];
    }
    /**
     * Get the {@link CCAggregation} with the passed name
     */
    getCCAggregation(name) {
        if (!this.ccquery || !this.ccquery.aggregations) {
            return undefined;
        }
        return this.ccquery.aggregations.find((value) => _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].eqNC(name, value.name));
    }
    /**
     * Get the {@link CCIndex} with the passed name
     */
    getIndex(name) {
        if (!this.app) {
            return undefined;
        }
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].getField(this.app.indexes, name);
    }
    /**
     * Get the {@link CCColumn} with the passed name. Aliases are resolved
     */
    getColumn(name) {
        if (!name) {
            return undefined;
        }
        if (!this.ccquery) {
            return undefined;
        }
        // First, CCQuery specific aliases
        let column;
        let columnAliases = this.columnsByQuery[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(this.ccquery.name)];
        if (columnAliases) {
            column = columnAliases[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(name)];
            if (column) {
                return column;
            }
        }
        // Second, aliases by index
        const indexes = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].split(this.ccquery.searchIndexes, [","]);
        const firstIndex = indexes.length === 0 ? undefined : this.getIndex(indexes[0]);
        if (indexes.length === 0 || (!!firstIndex && this.indexIsNormal(firstIndex))) {
            columnAliases = this.columnsByIndex._;
            if (columnAliases) {
                column = columnAliases[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(name)];
                if (column) {
                    return column;
                }
            }
        }
        else {
            for (const index of indexes) {
                columnAliases = this.columnsByIndex[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(index)];
                if (columnAliases) {
                    column = columnAliases[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(name)];
                    if (column) {
                        return column;
                    }
                }
            }
        }
        // Third, extra columns
        column = AppService.extraColumns[_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toLowerCase(name)];
        if (column) {
            return column;
        }
        return undefined;
    }
    /**
     * Get the default alias a column
     *
     * @param column The column
     * @return The default alias or `null` if no alias is defined
     */
    getColumnDefaultAlias(column) {
        if (column) {
            if (column.aliases && column.aliases.length > 0) {
                return column.aliases[0];
            }
        }
        return "";
    }
    /**
     * Get the name of a column
     *
     * @param column The column
     * @param _default A default name to return if `column` is empty
     */
    getColumnName(column, _default = "") {
        if (column) {
            return column.name;
        }
        return _default;
    }
    /**
     * Get the default alias for a column
     *
     * @param column The column
     * @param _default A default alias name to return if the `column` is empty or no alias is defined
     */
    getColumnAlias(column, _default = "") {
        if (column) {
            const alias = this.getColumnDefaultAlias(column);
            if (alias) {
                return alias;
            }
        }
        return _default;
    }
    /**
     * Return a column name from a name which can be an alias
     */
    resolveColumnName(name) {
        const column = this.getColumn(name);
        return this.getColumnName(column, name || "");
    }
    /**
     * Return a column alias from a name which can be an alias
     */
    resolveColumnAlias(name) {
        const column = this.getColumn(name);
        return this.getColumnAlias(column, name || "");
    }
    /**
     * Parse a fielded search expression
     *
     * @param text The expression
     * @param options Options for the parsing
     * @return The parsed {@link Expr} or an error message
     */
    parseExpr(text, options) {
        return _query_expr_parser__WEBPACK_IMPORTED_MODULE_5__["ExprParser"].parse(text, { appService: this, formatService: this.formatService, intlService: this.intlService }, options);
    }
    /**
     * Escape a value for fielded search if necessary. `Date` objects are converted to
     * Sinequa system date strings and non-scalars fields are escaped
     * @param field The value's field
     * @param value The value
     */
    escapeFieldValue(field, value) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isDate(value)) {
            return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].toSysDateStr(value);
        }
        value = value + "";
        const column = this.getColumn(field);
        if (column && !AppService.isScalar(column)) {
            // escaoe columns that might contain search operators in them (treating negative numbers as an ignorable edge case)
            return _query_expr_parser__WEBPACK_IMPORTED_MODULE_5__["ExprParser"].escape(value);
        }
        return value;
    }
    /**
     * Get the label of a column. The plural label is returned for csv-type columns.
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getLabel(name, _default) {
        const column = this.getColumn(name);
        if (column) {
            const label = AppService.isCsv(column) ? column.labelPlural : column.label;
            if (label) {
                return label;
            }
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Get the singular label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getSingularLabel(name, _default) {
        const column = this.getColumn(name);
        if (column && column.label) {
            return column.label;
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Get the plural label of a column
     *
     * @param name The name of the column which can be an alias
     * @param _default The default label to return if no label is defined
     */
    getPluralLabel(name, _default) {
        const column = this.getColumn(name);
        if (column && column.labelPlural) {
            return column.labelPlural;
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isUndefined(_default)) {
            return _default;
        }
        return name;
    }
    /**
     * Return `true` if a column with the passed name or alias is a string
     */
    isString(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isString(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a csv
     */
    isCsv(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isCsv(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a tree
     */
    isTree(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isTree(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is an entity
     */
    isEntity(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isEntity(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a boolean
     */
    isBoolean(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isBoolean(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a date
     */
    isDate(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isDate(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a double
     */
    isDouble(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isDouble(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is an integer
     */
    isInteger(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isInteger(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is a number (integer or double)
     */
    isNumber(name) {
        return this.isInteger(name) || this.isDouble(name);
    }
    /**
     * Return `true` if a column with the passed name or alias is a scalar
     */
    isScalar(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isScalar(column);
    }
    /**
     * Return `true` if a column with the passed name or alias is sortable
     */
    isSortable(name) {
        const column = this.getColumn(name);
        return !!column && AppService.isSortable(column);
    }
    /**
     * If the passed url is relative and CORS is active then
     * prepend it with the Sinequa server origin
     */
    updateUrlForCors(url) {
        if (this.startConfig.corsActive && !!url && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isUrlAbsolute(url)) {
            url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(this.origin, url);
        }
        return url;
    }
    /**
     * Return the url to the Sinequa administration console
     */
    get adminUrl() {
        return this.updateUrlForCors(_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(this.startConfig.applicationPath, "admin"));
    }
}
// Should match AdditionalQueryableColumns in Engine.cs
AppService.extraColumns = {
    id: AppService.makeColumn("id", "string"),
    text: AppService.makeColumn("text", "varchar"),
    documentlanguages: AppService.makeColumn("documentlanguages", "csv", "ci"),
    databasealias: AppService.makeColumn("databasealias", "varchar"),
    globalrelevance: AppService.makeColumn("globalrelevance", "double"),
    matchingpartnames: AppService.makeColumn("matchingpartnames", "csv"),
    matchlocations: AppService.makeColumn("matchlocations", "csv"),
    matchlocationsperpartname: AppService.makeColumn("matchlocationsperpartname", "varchar"),
    extracts: AppService.makeColumn("extracts", "csv"),
    extractsperpartname: AppService.makeColumn("extractsperpartname", "varchar"),
    extractslocations: AppService.makeColumn("extractslocations", "csv"),
    documentweight: AppService.makeColumn("documentweight", "varchar"),
    groupcount: AppService.makeColumn("groupcount", "integer"),
    accesslists: AppService.makeColumn("accesslists", "varchar", undefined, ["accessLists"]) // json
};
AppService.ɵfac = function AppService_Factory(t) { return new (t || AppService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["AppWebService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_intl__WEBPACK_IMPORTED_MODULE_7__["IntlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_format_service__WEBPACK_IMPORTED_MODULE_8__["FormatService"])); };
AppService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AppService, factory: AppService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["AppWebService"] }, { type: _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_7__["IntlService"] }, { type: _format_service__WEBPACK_IMPORTED_MODULE_8__["FormatService"] }]; }, null); })();


/***/ }),

/***/ "a/wI":
/*!*******************************************!*\
  !*** ./projects/core/intl/messages/de.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "system": {
        "date": "{time, selectordinal, =0 {{date, date}} other {{date, date}, {date, time, medium}}}",
        "number": "{value, number}",
        "boolean": "{value, select, true {wahr} other {falsch}}",
        "percent": "{value, number, percent}",
        "fieldSeparator": ": ",
        "memorySize": {
            "bytes": "{value, number, sqZeroDecimalPlaces} B",
            "kb": "{value, number, sqZeroDecimalPlaces} KB",
            "mb": "{value, number, sqOneDecimalPlace} MB",
            "gb": "{value, number, sqTwoDecimalPlaces} GB",
            "tb": "{value, number, sqThreeDecimalPlaces} TB",
            "pb": "{value, number, sqFourDecimalPlaces} PB"
        }
    },
    "error": {
        "serverError": "Serverfehler",
        "loginCancelled": "Anmeldung abgebrochen (login cancelled)",
        "processedCredentialsError": "Verarbeitete Anmeldeinformationen konnten nicht ermittelt werden (unable to get processed credentials)",
        "autoLoginError": "Anmeldung fehlgeschlagen (login failed)",
        "principalSwitched": "Der angemeldete Benutzer hat sich geändert (the logged in user has changed)",
        "userOverrideFailure": "Benutzerwechsel fehlgeschlagen (unable to override user)",
        "responseLoadFailure": "Antwort konnte nicht geladen werden (failed to load response)",
        "unknownError": "Unbekannter Fehler"
    },
    "language": {
        "ar": "Arabisch",
        "da": "Dänisch",
        "de": "Deutsch",
        "el": "Griechisch",
        "en": "Englisch",
        "es": "Spanisch",
        "fi": "Finnisch",
        "fr": "Französisch",
        "it": "Italienisch",
        "ja": "Japanisch",
        "ko": "Koreanisch",
        "nl": "Niederländisch",
        "no": "Norwegisch",
        "pl": "Polnisch",
        "pt": "Portugiesisch",
        "ro": "Rumänisch",
        "ru": "Russisch",
        "sv": "Schwedisch",
        "th": "Thailändisch",
        "zh": "Traditionelles Chinesisch",
        "zs": "Vereinfachtes Chinesisch",
        "zz": "Unbekannt"
    },
});


/***/ }),

/***/ "adXJ":
/*!***********************************************!*\
  !*** ./projects/core/login/messages/index.ts ***!
  \***********************************************/
/*! exports provided: enLogin, frLogin, deLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enLogin", function() { return enLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frLogin", function() { return frLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deLogin", function() { return deLogin; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/modal */ "rAYq");
/* harmony import */ var _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/validation */ "1w50");
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./en */ "MQ8W");
/* harmony import */ var _fr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fr */ "pIlH");
/* harmony import */ var _de__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./de */ "wZGT");







const enLogin = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _en__WEBPACK_IMPORTED_MODULE_4__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["enIntl"], _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["enModal"], _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_3__["enValidation"]);
const frLogin = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _fr__WEBPACK_IMPORTED_MODULE_5__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["frIntl"], _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["frModal"], _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_3__["frValidation"]);
const deLogin = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _de__WEBPACK_IMPORTED_MODULE_6__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["deIntl"], _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["deModal"], _sinequa_core_validation__WEBPACK_IMPORTED_MODULE_3__["deValidation"]);



/***/ }),

/***/ "agta":
/*!********************************************!*\
  !*** ./projects/core/intl/intl.service.ts ***!
  \********************************************/
/*! exports provided: LOCALES_CONFIG, INTL_CONFIG, IntlService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCALES_CONFIG", function() { return LOCALES_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTL_CONFIG", function() { return INTL_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntlService", function() { return IntlService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var intl_messageformat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! intl-messageformat */ "6QKu");
/* harmony import */ var intl_format_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! intl-format-cache */ "1WOu");
/* harmony import */ var _formatjs_intl_relativetimeformat_polyfill__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @formatjs/intl-relativetimeformat/polyfill */ "Mh5R");
/* harmony import */ var _formatjs_intl_relativetimeformat_polyfill__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_formatjs_intl_relativetimeformat_polyfill__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var intl_pluralrules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! intl-pluralrules */ "h+gH");
/* harmony import */ var intl_pluralrules__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(intl_pluralrules__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/get */ "mwIZ");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! d3-format */ "rWgG");
/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! d3-time-format */ "cOGN");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! d3 */ "VphZ");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _import_moment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./import-moment */ "hS7N");





// TODO - check loading of locale data per locale - the ponyfill doesn't seem to work




// We support loading d3 bundled and unbundled as it is typically easier
// for others to integrate bundled examples but some 3rd party libs (eg swimlane/charts)
// load d3 unbundled.




// moment needs to be set globally to load moment locales successfully when the locales are bundled in the main rollup bundle
// see: https://github.com/rollup/rollup/issues/641


/**
 * @ignore
 */
const formatters = {
    getMessageFormat: Object(intl_format_cache__WEBPACK_IMPORTED_MODULE_4__["default"])(intl_messageformat__WEBPACK_IMPORTED_MODULE_3__["default"]),
    getNumberFormat: Object(intl_format_cache__WEBPACK_IMPORTED_MODULE_4__["default"])(Intl.NumberFormat),
    getDateTimeFormat: Object(intl_format_cache__WEBPACK_IMPORTED_MODULE_4__["default"])(Intl.DateTimeFormat),
    getRelativeTimeFormat: Object(intl_format_cache__WEBPACK_IMPORTED_MODULE_4__["default"])(Intl.RelativeTimeFormat),
    getPluralRules: Object(intl_format_cache__WEBPACK_IMPORTED_MODULE_4__["default"])(Intl.PluralRules)
};
/**
 * @ignore
 */
const DATE_TIME_FORMAT_OPTIONS = [
    "dateStyle",
    "timeStyle",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName",
];
/**
 * @ignore
 */
const NUMBER_FORMAT_OPTIONS = [
    "localeMatcher",
    "style",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
];
/**
 * @ignore
 */
const RELATIVE_TIME_FORMAT_OPTIONS = [
    "localeMatcher",
    "numeric",
    "style"
];
/**
 * An injection token used to initialize the [locales configuration]{@link LocalesConfig} of {@link IntlModule}
 */
const LOCALES_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('LOCALES_CONFIG');
/**
 * An injection token used to initialize the [general configuration]{@link IntlConfig} of {@link IntlModule}
 */
const INTL_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('INTL_CONFIG');
/**
 * Default custom ICU Message formats
 */
const DEFAULT_FORMATS = {
    date: {
        sqDateTime: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        },
        sqDate: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        },
        sqYear: {
            year: "numeric"
        },
        sqMonthYear: {
            month: "short",
            year: "numeric"
        }
    },
    time: {},
    number: {
        sqWeek: {
            minimumIntegerDigits: 2,
            useGrouping: false
        },
        sqYear: {
            useGrouping: false
        },
        sqNoGrouping: {
            useGrouping: false
        },
        sqZeroDecimalPlaces: {
            maximumFractionDigits: 0
        },
        sqOneDecimalPlace: {
            maximumFractionDigits: 1
        },
        sqTwoDecimalPlaces: {
            maximumFractionDigits: 2
        },
        sqThreeDecimalPlaces: {
            maximumFractionDigits: 3
        },
        sqFourDecimalPlaces: {
            maximumFractionDigits: 4
        },
        sqFiveDecimalPlaces: {
            maximumFractionDigits: 5
        }
    }
};
/* eslint-disable jsdoc/check-alignment,jsdoc/check-indentation,jsdoc/newline-after-description */
/**
 * This service provides methods for managing locales and for formatting dates, numbers and strings using
 * [ICU Message syntax]{@link https://formatjs.io/guides/message-syntax/}. [Messages]{@link LocaleData#messages} stored
 * in a locale's data are referenced using a key in the following form: `msg#<JSONPath>`. Given the following messages:
``` json
{
    "myComponent": {
        "title": "Component: {name}",
        "footer": "Created on {created, date, medium} by {author}"
    }
}
```
 * this key: `msg#myComponent.footer` references myComponent's footer message. The message itself uses
 * ICU Message syntax.
 *
 * This service registers a number of [default custom ICU formats]{@link DEFAULT_FORMATS}. These can be overridden or
 * extended by providing the [INTL_CONFIG]{@link INTL_CONFIG} injection token.
 */
/* eslint-enable jsdoc/check-alignment, jsdoc/check-indentation, jsdoc/newline-after-description */
class IntlService {
    constructor(intlConfig, localesConfig) {
        this.intlConfig = intlConfig;
        this.localesConfig = localesConfig;
        /**
         * The prefix for ICU messages to be retrieved from [LocaleData.messages]{@link LocaleData#messages}
         * by {@link formatMessage}
         */
        this.messagePrefix = "msg#";
        /**
         * An alternative prefix for inline ICU messages processed by {@link formatMessage}
         */
        this.textPrefix = "txt#";
        if (!this.intlConfig) {
            this.intlConfig = {};
        }
        if (!localesConfig) {
            if (!localesConfig) {
                console.error("LOCALES_CONFIG has not been provided by the calling app. " +
                    "Please import IntlModule using the forRoot method to which you should pass a LocalesConfig object");
            }
        }
        this._events = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.locales = localesConfig.locales || [localesConfig.defaultLocale];
    }
    static getLanguage(name) {
        const sepPos = name.indexOf("-");
        if (sepPos === -1) {
            return name;
        }
        return name.substring(0, sepPos);
    }
    static getBrowserLanguages() {
        if (navigator.languages) {
            return navigator.languages;
        }
        const language = navigator.language || navigator.userLanguage ||
            navigator.browserLanguage || navigator.systemLanguage;
        return !!language ? [language] : [];
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
    getInitialLocale() {
        const language = window.localStorage.getItem("sinequa-locale");
        const languages = !!language ? [language] : IntlService.getBrowserLanguages();
        let locale = this.getLocale(languages);
        if (locale) {
            return locale;
        }
        locale = this.getLocale(languages, true);
        if (locale) {
            return locale;
        }
        return this.localesConfig.defaultLocale;
    }
    /**
     * Initialize the service. The current locale is initialized to either the `sinequa-locale` local
     * storage value, the browser language or the default locale.
     *
     * This method is called automatically by the {@link IntlModule} at application startup.
     *
     * @return An observable of the current locale
     */
    init() {
        // Set up formats
        this.formats = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].merge(DEFAULT_FORMATS, this.intlConfig.formats);
        // Load default locale
        let observable = this.use(this.localesConfig.defaultLocale.name, false);
        const initialLocale = this.getInitialLocale();
        if (initialLocale !== this.localesConfig.defaultLocale) {
            // Load initial locale if different to default
            console.log("Setting initial locale: ", initialLocale.name);
            observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["concat"])(observable, this.use(initialLocale.name, false)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["last"])());
        }
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].subscribe(observable, (value) => {
            console.log("Initial locale set: ", value);
        });
        return observable;
    }
    loadData(locale) {
        if (!this.localesConfig.loadLocale) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])("Dynamic locale loading has not been implemented in the calling app - " +
                "please add a loadLocale handler to your LocalesConfig");
        }
        return this.localesConfig.loadLocale(locale);
    }
    getLocale(names, approximate = false) {
        if (typeof names === "string") {
            names = [names];
        }
        for (const name of names) {
            const locale = this.locales.find((locale1) => {
                if (locale1.name === name) {
                    return true;
                }
                if (approximate && IntlService.getLanguage(locale1.name) === IntlService.getLanguage(name)) {
                    return true;
                }
                return false;
            });
            if (locale) {
                return locale;
            }
        }
        return undefined;
    }
    /**
     * Change the current locale. The change is made asynchronously as the locale may need to be
     * downloaded. The current locale is optionally stored in local storage (`sinequa-locale`)
     * to be picked up the next time the service is initialized
     *
     * @param locale The name of the locale to use
     * @param store If `true` the current locale is stored in local storage
     */
    use(locale, store = true) {
        const newLocale = this.getLocale(locale);
        if (!newLocale) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: "unsupported locale" });
        }
        const observable = !!newLocale.data ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(newLocale.data) : this.loadData(locale);
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].subscribe(observable, (data) => {
            this.currentLocale = newLocale;
            if (store) {
                window.localStorage.setItem("sinequa-locale", this.currentLocale.name);
            }
            this.direction = this.currentLocale.direction || "ltr";
            if (!this.currentLocale.data) {
                this.currentLocale.data = data;
            }
            // Set moment locale
            if (this.currentLocale.data.moment) {
                // Set (and define if necessary) moment locale (it auto-defines when we are not bundled)
                if (moment__WEBPACK_IMPORTED_MODULE_12___default.a.locale(this.currentLocale.data.moment.locale) !== this.currentLocale.data.moment.locale) {
                    console.log(`moment locale not defined: ${this.currentLocale.data.moment.locale} - defaulting to en`);
                    moment__WEBPACK_IMPORTED_MODULE_12___default.a.locale("en");
                }
            }
            else {
                moment__WEBPACK_IMPORTED_MODULE_12___default.a.locale("en");
            }
            // Set d3 locale
            if (this.currentLocale.data.d3) {
                Object(d3_format__WEBPACK_IMPORTED_MODULE_9__["formatDefaultLocale"])(this.currentLocale.data.d3.format);
                Object(d3_time_format__WEBPACK_IMPORTED_MODULE_10__["timeFormatDefaultLocale"])(this.currentLocale.data.d3.time);
                d3__WEBPACK_IMPORTED_MODULE_11__["formatDefaultLocale"](this.currentLocale.data.d3.format);
                d3__WEBPACK_IMPORTED_MODULE_11__["timeFormatDefaultLocale"](this.currentLocale.data.d3.time);
            }
            if (this.currentLocale.data.intl && this.currentLocale.data.intl.locale) {
                this.intlLocale = this.currentLocale.data.intl.locale;
            }
            else {
                this.intlLocale = this.localesConfig.defaultLocale.data ? this.localesConfig.defaultLocale.data.intl.locale : "en";
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.intlLocale);
        });
        const observable2 = observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((value) => {
            return this.currentLocale.name;
        }));
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].subscribe(observable2, (name) => {
            this._events.next({ locale: name });
        });
        return observable2;
    }
    getDefaultMessages() {
        const _default = this.locales.find((value) => !!value.data && !!value.data.messages);
        if (_default) {
            return _default.data && _default.data.messages;
        }
        return {};
    }
    getMessages() {
        let messages;
        if (this.currentLocale && this.currentLocale.data) {
            messages = this.currentLocale.data.messages;
        }
        if (!messages) {
            messages = this.getDefaultMessages();
        }
        return messages;
    }
    /**
     * Get the message from the current locale that corresponds to the passed `key`.
     * If the is not prefixed by {@link messagePrefix} then `null` is returned
     *
     * @param key The message key
     */
    getMessage(key) {
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].startsWith(key, this.messagePrefix)) {
            return undefined;
        }
        key = key.substr(this.messagePrefix.length);
        const messages = this.getMessages();
        let message = lodash_get__WEBPACK_IMPORTED_MODULE_7___default()(messages, key);
        if (!message) {
            const defaultMessages = this.getDefaultMessages();
            if (messages !== defaultMessages) {
                message = lodash_get__WEBPACK_IMPORTED_MODULE_7___default()(defaultMessages, key);
            }
        }
        return message;
    }
    // Returned start and end are for the text BEFORE the language specifier and so refer to the previous
    // language not the one returned by the same call to this method
    nextLang(text, start, allowNone) {
        for (let i = start, ic = text.length - 3; i < ic; i++) {
            if (text[i] === "[" && text[i + 3] === "]") {
                return {
                    start,
                    end: i,
                    lang1: text.charCodeAt(i + 1),
                    lang2: text.charCodeAt(i + 2)
                };
            }
        }
        if (allowNone) {
            return {
                start,
                end: text.length,
                lang1: -1,
                lang2: -1
            };
        }
        return undefined;
    }
    // ([nnn])<default>[fr]<french>[de]<german>...
    sysLang(text) {
        if (!text) {
            return text;
        }
        let iStart = 0;
        const len = text.length;
        // Skip order
        let i = 0;
        if (text[i] === "[") {
            while (i < len && text[i] >= "0" && text[i] <= "9") {
                i++;
            }
            if (text[i] === "]") {
                iStart = i + 1;
            }
        }
        // Pick out default value
        const defaultLang = this.nextLang(text, iStart, false);
        if (!defaultLang) {
            return text; // Not a sys lang formatted text
        }
        // Look for a matching language
        const lang1 = this.currentLocale.name.charCodeAt(0);
        const lang2 = this.currentLocale.name.charCodeAt(1);
        let curLang = defaultLang;
        while (curLang) {
            if (lang1 === curLang.lang1 && lang2 === curLang.lang2) {
                // We have a matching language, get its text
                const nextLang = this.nextLang(text, curLang.end + 4, true);
                return text.substring(nextLang.start, nextLang.end);
            }
            else {
                curLang = this.nextLang(text, curLang.end + 4, false);
            }
        }
        // return default language text
        return text.substring(defaultLang.start, defaultLang.end);
    }
    processFormatMessage(message, values = {}) {
        const hasValues = Object.keys(values).length > 0;
        if (!hasValues) {
            return message;
        }
        if (message) {
            try {
                const formatter = formatters.getMessageFormat(message, this.intlLocale, this.formats, { formatters });
                const formattedMessage = formatter.format(values);
                return formattedMessage;
            }
            catch (e) {
                console.log("IntlService.processFormatMessage error:", e);
                return message;
            }
        }
        else {
            return message;
        }
    }
    /**
     * Format a message identified by a `key`. Any values referenced
     * by the message are taken from an optional `values` map. The key can be
     * in a variety of forms:
     * * a Sinequa "syslang" string: `apple[fr]pomme[de]Apfel`
     * * a message key resolved in the [messages]{@link LocaleData#messages} of the current
     * locale:  `msg#path1.path2.path3`
     * * an ICU message using the `txt#` prefix: `txt#Hello {name}`
     *
     * @param key The message identifier
     * @param values Values referenced by an ICU message
     * @return The formatted message. If the key is not resolved then it is returned unprocessed
     */
    formatMessage(key, values) {
        key = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].trim(key);
        const sysLangStr = this.sysLang(key);
        if (sysLangStr !== key) {
            return sysLangStr;
        }
        const _values = {};
        if (values) {
            for (const valueName of Object.keys(values)) {
                const value = values[valueName];
                if (value && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].isString(value)) {
                    _values[valueName] = this.formatMessage(value);
                }
                else {
                    _values[valueName] = value;
                }
            }
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].startsWith(key, this.messagePrefix)) {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].eq(key, this.messagePrefix)) {
                return key;
            }
            let message = this.getMessage(key);
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].isString(message)) {
                message = key;
            }
            const formattedMessage = this.processFormatMessage(message, _values);
            return formattedMessage;
        }
        else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].startsWith(key, this.textPrefix)) {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].eq(key, this.textPrefix)) {
                return key;
            }
            key = key.substr(this.textPrefix.length);
            const formattedMessage = this.processFormatMessage(key, _values);
            return formattedMessage;
        }
        else {
            return key;
        }
    }
    /**
     * Format an ICU Message string
     *
     * @param text An ICU Message to format
     * @param values Values referenced by an ICU message
     */
    formatText(text, values) {
        const formattedMessage = this.processFormatMessage(text, values);
        return formattedMessage;
    }
    /**
     * Parse a date string in the current locale - eg `04/09/1986`
     *
     * @param value A date string
     * @returns The parse `Date` or `undefined` if the date cannot be parsed
     */
    parseDate(value) {
        const m = moment__WEBPACK_IMPORTED_MODULE_12___default()(value, "L");
        if (m.isValid()) {
            return m.toDate();
        }
        return undefined;
    }
    getNamedFormat(type, name) {
        const format = this.formats && this.formats[type] && this.formats[type][name];
        if (format) {
            return format;
        }
        console.warn(`IntlService.getNamedFormat - not found - type: ${type}, name: ${name}`);
        return undefined;
    }
    filterProps(props, whitelist, defaults = {}) {
        return whitelist.reduce((filtered, name) => {
            if (props.hasOwnProperty(name)) {
                filtered[name] = props[name];
            }
            else if (defaults.hasOwnProperty(name)) {
                filtered[name] = defaults[name];
            }
            return filtered;
        }, {});
    }
    /**
     * Format a date in the current locale according to the passed options. If the passed `value` is not a `Date`
     * then one is constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatDate(value, options = {}) {
        const { format } = options;
        const date = value instanceof Date ? value : new Date(value);
        const defaults = (format && this.getNamedFormat("date", format)) || {};
        const filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        try {
            return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
        }
        catch (e) {
            console.warn("IntlService.formatDate:", e);
        }
        return String(date);
    }
    /**
     * Format a time in the current locale according to the passed options. If the passed `value` is not a `Date` then one is
     * constructed from it.
     *
     * @param value The date to format
     * @param options The options can include a custom format
     */
    formatTime(value, options = {}) {
        const { format } = options;
        const date = value instanceof Date ? value : new Date(value);
        const defaults = (format && this.getNamedFormat("time", format)) || {};
        let filteredOptions = this.filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults);
        if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
            // Add default formatting options if hour, minute, or second isn't defined.
            filteredOptions = Object.assign({}, filteredOptions, {
                hour: 'numeric',
                minute: 'numeric'
            });
        }
        try {
            return formatters.getDateTimeFormat(this.intlLocale, filteredOptions).format(date);
        }
        catch (e) {
            console.warn("IntlService.formatTime:", e);
        }
        return String(date);
    }
    makeRelativeTimeParams(value) {
        const diff = value.getTime() - _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].now.getTime();
        const absDiff = Math.abs(diff);
        if (absDiff < _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneSecond) {
            return { value: 0, unit: "seconds" };
        }
        else if (absDiff < _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneMinute) {
            return { value: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].roundAway(diff / _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneSecond), unit: "seconds" };
        }
        else if (absDiff < _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneHour) {
            return { value: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].roundAway(diff / _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneMinute), unit: "minutes" };
        }
        else if (absDiff < _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneDay) {
            return { value: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].roundAway(diff / _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneHour), unit: "hours" };
        }
        else if (absDiff < (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneDay * 30)) {
            return { value: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].roundAway(diff / _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneDay), unit: "days" };
        }
        else if (absDiff < (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneDay * 365)) {
            return { value: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].roundAway(diff / (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneDay * 30)), unit: "months" };
        }
        else {
            return { value: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].roundAway(diff / (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].oneDay * 365)), unit: "years" };
        }
    }
    /**
     * Format a relative time in the current locale according to the passed options
     *
     * @param value The relative time to format. Negative number values represent times in the past.
     * If a Date value is passed then a number value and unit are deduced automatically based on
     * the current date and time.
     * @param unit The relative time unit (eg years, days or seconds). Must be passed if value
     * is a number.
     * @param options The options can include a custom format
     */
    formatRelativeTime(value, unit, options = {}) {
        if (value === undefined) {
            return "";
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].isString(value)) {
            value = new Date(value);
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_8__["Utils"].isDate(value)) {
            const params = this.makeRelativeTimeParams(value);
            value = params.value;
            unit = params.unit;
        }
        const { format } = options;
        const defaults = (format && this.getNamedFormat("relativeTime", format)) || {};
        const filteredOptions = this.filterProps(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
        if (!filteredOptions.numeric) {
            filteredOptions.numeric = "auto"; // default is always - we prefer auto
        }
        try {
            return formatters.getRelativeTimeFormat(this.intlLocale, filteredOptions).format(value, unit);
        }
        catch (e) {
            console.warn("IntlService.formatRelativeTime:", e);
        }
        return String(value);
    }
    /**
     * Format a number in the current locale
     *
     * @param value The number to format
     * @param options The options can include a custom format
     */
    formatNumber(value, options = {}) {
        const { format } = options;
        const defaults = format && this.getNamedFormat("number", format);
        const filteredOptions = this.filterProps(options, NUMBER_FORMAT_OPTIONS, defaults);
        try {
            return formatters.getNumberFormat(this.intlLocale, filteredOptions).format(value);
        }
        catch (e) {
            console.warn("IntlService.formatNumber:", e);
        }
        return String(value);
    }
}
IntlService.ɵfac = function IntlService_Factory(t) { return new (t || IntlService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](INTL_CONFIG, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](LOCALES_CONFIG, 8)); };
IntlService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: IntlService, factory: IntlService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IntlService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [INTL_CONFIG]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [LOCALES_CONFIG]
            }] }]; }, null); })();


/***/ }),

/***/ "apiC":
/*!***********************************************!*\
  !*** ./projects/core/modal/messages/index.ts ***!
  \***********************************************/
/*! exports provided: enModal, frModal, deModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enModal", function() { return enModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frModal", function() { return frModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deModal", function() { return deModal; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./en */ "Aeba");
/* harmony import */ var _fr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fr */ "hH3Y");
/* harmony import */ var _de__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./de */ "42GA");





const enModal = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _en__WEBPACK_IMPORTED_MODULE_2__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["enIntl"]);
const frModal = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _fr__WEBPACK_IMPORTED_MODULE_3__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["frIntl"]);
const deModal = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _de__WEBPACK_IMPORTED_MODULE_4__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["deIntl"]);



/***/ }),

/***/ "bF1N":
/*!******************************************************************!*\
  !*** ./projects/core/web-services/recent-queries.web.service.ts ***!
  \******************************************************************/
/*! exports provided: RecentQueriesList, RecentQueries, RecentQueriesWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentQueriesList", function() { return RecentQueriesList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentQueries", function() { return RecentQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecentQueriesWebService", function() { return RecentQueriesWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http-client */ "4+vC");






class RecentQueriesList {
    constructor(name) {
        this.name = name;
        this.queries = []; // Make sure to have at least a valid "queries" member, to simplify tests in GUI code.
    }
}
class RecentQueries {
}
class RecentQueriesWebService extends _http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].subscribe(observable, (response) => {
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
RecentQueriesWebService.ɵfac = function RecentQueriesWebService_Factory(t) { return new (t || RecentQueriesWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"])); };
RecentQueriesWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RecentQueriesWebService, factory: RecentQueriesWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RecentQueriesWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "bO3L":
/*!********************************************!*\
  !*** ./projects/core/login/jwt.service.ts ***!
  \********************************************/
/*! exports provided: JWTService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JWTService", function() { return JWTService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");





/**
 * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
 */
class JWTService extends _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["HttpService"] {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
    }
    /**
     * Get a JWT from the Sinequa server using the passed credentials. The JWT is received in a cookie
     * and the associated CSRF token in the response payload.
     *
     * @param credentials The credentials to be used for the JWT. These are sent in clear text
     */
    getToken(credentials) {
        const observable = this.httpClient.post(this.makeUrl("webToken"), {
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
        return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((value) => {
            return value.csrfToken;
        }));
    }
}
JWTService.ɵfac = function JWTService_Factory(t) { return new (t || JWTService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["SqHttpClient"])); };
JWTService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: JWTService, factory: JWTService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](JWTService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["START_CONFIG"]]
            }] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_1__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "c2w7":
/*!************************************************!*\
  !*** ./projects/core/login/login.component.ts ***!
  \************************************************/
/*! exports provided: Login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return Login; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/modal */ "rAYq");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _intl_message_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../intl/message.pipe */ "cZrR");
/* harmony import */ var _validation_validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../validation/validation-error.pipe */ "lbUz");











function Login_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "sqValidationError");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    let tmp_0_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 1, (tmp_0_0 = ctx_r0.form.get("userName")) == null ? null : tmp_0_0.errors));
} }
function Login_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "sqValidationError");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    let tmp_0_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 1, (tmp_0_0 = ctx_r1.form.get("password")) == null ? null : tmp_0_0.errors));
} }
/**
 * A basic login component that request a user name and password. It is designed to work with
 * [LoginService.getCredentials]{@link LoginService#getCredentials} and can be set using the
 * {@link MODAL_LOGIN} injection token
 */
class Login {
    constructor(model, modalRef, formBuilder) {
        this.model = model;
        this.modalRef = modalRef;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.userNameControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.model.userName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
        this.passwordControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.model.password, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
        this.form = this.formBuilder.group({
            userName: this.userNameControl,
            password: this.passwordControl
        });
        this.formChanges = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].subscribe(this.form.valueChanges, (value) => {
            this.model.userName = this.userNameControl.value;
            this.model.password = this.passwordControl.value;
        });
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    showError(control) {
        return control.invalid && (control.dirty || this.modalRef.submitted);
    }
    ok() {
        if (!this.form.valid) {
            return;
        }
        this.modalRef.close(-1 /* OK */);
    }
    cancel() {
        this.modalRef.close(-2 /* Cancel */);
    }
}
Login.ɵfac = function Login_Factory(t) { return new (t || Login)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["MODAL_MODEL"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["ModalRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"])); };
Login.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Login, selectors: [["sq-core-login"]], decls: 18, vars: 19, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["formControlName", "userName", 3, "placeholder"], [4, "ngIf"], [2, "margin-bottom", "8px"], ["type", "password", "formControlName", "password", 3, "placeholder"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], [2, "color", "red"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, Login_ng_container_6_Template, 5, 3, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, Login_ng_container_10_Template, 5, 3, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Login_Template_button_click_12_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Login_Template_button_click_15_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 9, "msg#modal.login.title"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](5, 11, "msg#modal.login.userName"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showError(ctx.userNameControl));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](9, 13, "msg#modal.login.password"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showError(ctx.passwordControl));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](14, 15, "msg#modal.buttons.ok"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](17, 17, "msg#modal.buttons.cancel"));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__["CdkTrapFocus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], pipes: [_intl_message_pipe__WEBPACK_IMPORTED_MODULE_6__["MessagePipe"], _validation_validation_error_pipe__WEBPACK_IMPORTED_MODULE_7__["ValidationErrorPipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Login, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "sq-core-login",
                template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;"
            cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{'msg#modal.login.title' | sqMessage}}</h3>
            <input placeholder="{{'msg#modal.login.userName' | sqMessage}}" formControlName="userName">
            <ng-container *ngIf="showError(userNameControl)">
                <br>
                <span style="color: red;">{{form.get("userName")?.errors | sqValidationError}}</span>
            </ng-container>
            <div style="margin-bottom: 8px;"></div>
            <input type="password" placeholder="{{'msg#modal.login.password' | sqMessage}}" formControlName="password">
            <ng-container *ngIf="showError(passwordControl)">
                <br>
                <span style="color: red;">{{form.get("password")?.errors | sqValidationError}}</span>
            </ng-container>
            <hr>
            <button type="submit" (click)="ok()">{{'msg#modal.buttons.ok' | sqMessage}}</button>
            <button type="button" (click)="cancel()">{{'msg#modal.buttons.cancel' | sqMessage}}</button>
        </form>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["MODAL_MODEL"]]
            }] }, { type: _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_2__["ModalRef"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "cZrR":
/*!********************************************!*\
  !*** ./projects/core/intl/message.pipe.ts ***!
  \********************************************/
/*! exports provided: MessagePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagePipe", function() { return MessagePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _abstract_intl_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-intl.pipe */ "kEf5");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _intl_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intl.service */ "agta");





/**
 * A pipe to display messages in the current locale. Inputs are processed by
 * [IntlService.formatMessage]{@link IntlService#formatMessage}
 */
class MessagePipe extends _abstract_intl_pipe__WEBPACK_IMPORTED_MODULE_1__["AbstractIntlPipe"] {
    constructor(intlService, changeDetectorRef) {
        super(intlService, changeDetectorRef);
    }
    updateValue(value, params) {
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_2__["Utils"].isEmpty(value)) {
            // coerce to string (eg sys date strings get converted to dates so if this happens to a title we will break otherwise)
            value = value + "";
        }
        super.updateValue(value, params);
        if (!value) {
            this.value = value;
            return;
        }
        let values;
        if (params) {
            values = params.values ? params.values : params;
        }
        this.value = this.intlService.formatMessage(value, values);
    }
}
MessagePipe.ɵfac = function MessagePipe_Factory(t) { return new (t || MessagePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_intl_service__WEBPACK_IMPORTED_MODULE_3__["IntlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"]()); };
MessagePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "sqMessage", type: MessagePipe, pure: false });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessagePipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{ name: "sqMessage", pure: false }]
    }], function () { return [{ type: _intl_service__WEBPACK_IMPORTED_MODULE_3__["IntlService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, null); })();


/***/ }),

/***/ "cxFQ":
/*!****************************************************!*\
  !*** ./projects/core/load-component/public-api.ts ***!
  \****************************************************/
/*! exports provided: LoadComponentModule, LoadComponentService, LoadComponentDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _load_component_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./load-component.module */ "5LyR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadComponentModule", function() { return _load_component_module__WEBPACK_IMPORTED_MODULE_0__["LoadComponentModule"]; });

/* harmony import */ var _load_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load-component.service */ "Bcrk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadComponentService", function() { return _load_component_service__WEBPACK_IMPORTED_MODULE_1__["LoadComponentService"]; });

/* harmony import */ var _load_component_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./load-component.directive */ "xZxX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadComponentDirective", function() { return _load_component_directive__WEBPACK_IMPORTED_MODULE_2__["LoadComponentDirective"]; });






/***/ }),

/***/ "dn7x":
/*!****************************************************************!*\
  !*** ./projects/core/web-services/user-ratings.web.service.ts ***!
  \****************************************************************/
/*! exports provided: UserRatingsWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserRatingsWebService", function() { return UserRatingsWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http-client */ "4+vC");






/**
 * A service for calling the ratings web service
 */
class UserRatingsWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(r => { }, error => console.log("ratingsService.getRating failure - error: ", error)));
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
UserRatingsWebService.ɵfac = function UserRatingsWebService_Factory(t) { return new (t || UserRatingsWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"])); };
UserRatingsWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserRatingsWebService, factory: UserRatingsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserRatingsWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "edoa":
/*!******************************************************!*\
  !*** ./projects/core/app-utils/query/expr-parser.ts ***!
  \******************************************************/
/*! exports provided: Expr, ExprParserOperator, ExprParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expr", function() { return Expr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExprParserOperator", function() { return ExprParserOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExprParser", function() { return ExprParser; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _app_service_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app-service-helpers */ "/paf");


/**
 * Represents a parsed fielded search expression. A tree of expression nodes is built when an expression
 * combines sub-expressions using boolean operators
 */
class Expr {
    constructor(init) {
        this._field = undefined;
        this._display = undefined;
        this._displayObj = undefined;
        /**
         * The values of this expression
         */
        this.values = undefined;
        if (!init.op1) {
            const valueInit = init;
            this.exprContext = valueInit.exprContext;
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(valueInit.value)) {
                this.value = ExprParser.unescape(valueInit.value);
            }
            else if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(valueInit.values)) {
                this.values = ExprParser.unescapeList(valueInit.values);
            }
            this.locations = valueInit.locations;
            this.field = valueInit.field;
            this.display = valueInit.display;
            this.operator = !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(valueInit.operator) ? valueInit.operator : 0 /* none */;
            this.near = -1;
            this.start = -1;
            this.length = 0;
        }
        else {
            const opsInit = init;
            this.exprContext = opsInit.exprContext;
            this.field = opsInit.field;
            this.display = opsInit.display;
            this.addOperand(opsInit.op1);
            this.addOperand(opsInit.op2);
            this.and = opsInit.and;
            this.near = -1;
            this.start = -1;
            this.length = 0;
        }
    }
    /**
     * Return the field name of this expression. Return the first ancestor's non-empty field
     * if the field on this node is empty
     */
    get field() {
        let expr = this;
        while (expr) {
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(expr._field)) {
                return expr._field;
            }
            expr = expr.parent;
        }
        return undefined;
    }
    /**
     * Set the field name of this expression
     */
    set field(value) {
        this._field = value;
    }
    /**
     * Return the display value of this expression. Return the first ancestor's non-empty display value
     * if the display value on this node is empty
     */
    get display() {
        let expr = this;
        while (expr) {
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(expr._display)) {
                return expr._display;
            }
            expr = expr.parent;
        }
        return undefined;
    }
    /**
     * Set the display value of this expression. If the display value is a valid stringified JSON object
     * then set `displayObj` to the parsed object
     */
    set display(value) {
        this._display = value;
        if (!this._display) {
            this._displayObj = undefined;
        }
        else {
            if (this._display[0] === "{" && this._display[this._display.length - 1] === "}") {
                try {
                    this._displayObj = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].fromJson(this._display);
                }
                catch (e) {
                    this._displayObj = undefined;
                }
            }
            else {
                this._displayObj = undefined;
            }
        }
    }
    /**
     * Return the display object of this expression. Return the first ancestor's non-empty display object
     * if the display object on this node is empty
     */
    get displayObj() {
        let expr = this;
        while (expr) {
            if (expr._displayObj) {
                return expr._displayObj;
            }
            expr = expr.parent;
        }
        return undefined;
    }
    /**
     * Return the value of this expression. Note that range expressions may have multiple values
     */
    get value() {
        if (!this.values || this.values.length === 0) {
            return undefined;
        }
        return this.values[0];
    }
    /**
     * Set the value of this expression
     */
    set value(value) {
        if (value === undefined) {
            this.values = undefined;
        }
        else {
            if (!this.values) {
                this.values = [];
            }
            this.values[0] = value;
            this.values.length = 1;
        }
    }
    get evaluationRegExps() {
        if (!this._evaluationRegExps) {
            this._evaluationRegExps = {};
        }
        return this._evaluationRegExps;
    }
    /**
     * Add an operand to this expression
     *
     * @param operand The operand to add
     * @param contextField The parser's field context, if any
     * @param prepend If `true` the operand is prepended to the operands
     */
    addOperand(operand, contextField, prepend = false) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(contextField)) {
            contextField = this.field;
        }
        if (!this.operands) {
            this.operands = [];
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(this.field) && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(operand.field) && !operand.isStructured) {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(contextField)) {
                // Prefer setting the fields explicitly on the target operands rather the Field to "text" on the source operand
                // operand.field = ExprParser.fieldPartnamePrefix + "text";
                for (const expr of this.operands) {
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(expr._field)) {
                        expr._field = this.field;
                    }
                }
                this.field = undefined;
            }
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(this.field || "", operand.field || "")) {
            operand._field = operand.field;
        }
        else {
            operand._field = undefined;
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(this.display)) {
            operand._display = undefined;
        }
        if (prepend) {
            this.operands.unshift(operand);
        }
        else {
            this.operands.push(operand);
        }
        operand.parent = this;
    }
    /**
     * Return `true` if this expression is a leaf node (does have a value)
     */
    get isLeaf() {
        // if (this.value === null && !this.operands) throw "Expr.isLeaf - bad expression";
        return !!this.value;
    }
    /**
     * Make an expression object
     *
     * @param exprContext The expression context
     * @param text The value of the expression
     * @param field The parser's field context
     * @param display The display value
     * @param allowEmptyValue Determines how empty values will be processed when making the expression
     */
    static makeExpr(exprContext, text, field, display, allowEmptyValue) {
        if (!Expr.getIsStructuredField(exprContext, Expr.resolveField(exprContext, field))) {
            return new Expr({
                exprContext: exprContext,
                value: text,
                field: field,
                display: display
            });
        }
        const values = { value: undefined };
        const locations = { value: undefined };
        const operator = { value: 0 /* none */ };
        const range = { value: 0 /* none */ };
        Expr.parseValue(exprContext, text, field, allowEmptyValue, values, locations, operator, range);
        if (range.value !== 0 /* none */ && values.value && locations.value) {
            const value1 = values.value[0];
            const value2 = values.value[1];
            const location1 = locations.value[0];
            const location2 = locations.value[1];
            if (range.value === 1 /* gteLte */ && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(value1, "*") && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(value2, "*")) {
                return new Expr({
                    exprContext: exprContext,
                    values: values.value,
                    locations: locations.value,
                    field: field,
                    display: display,
                    operator: 11 /* between */
                });
            }
            const expr1 = !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(value1, "*") ? new Expr({
                exprContext: exprContext,
                value: value1,
                locations: [location1],
                field: field,
                display: display,
                operator: range.value === 2 /* gteLt */ || range.value === 1 /* gteLte */ ? 3 /* gte */ : 2 /* gt */
            }) : null;
            const expr2 = !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(value2, "*") ? new Expr({
                exprContext: exprContext,
                value: value2,
                locations: [location2],
                field: field,
                display: display,
                operator: range.value === 1 /* gteLte */ || range.value === 3 /* gtLte */ ? 5 /* lte */ : 4 /* lt */
            }) : undefined;
            if (!expr1 && !expr2) {
                return undefined;
            }
            if (!(!!expr1 && !!expr2))
                return !!expr1 ? expr1 : expr2;
            return new Expr({
                exprContext: exprContext,
                op1: expr1,
                and: true,
                op2: expr2,
                display: display
            });
        }
        return new Expr({
            exprContext: exprContext,
            values: values.value,
            locations: locations.value,
            field: field,
            display: display,
            operator: operator.value
        });
    }
    static resolveField(exprContext, field) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(field)) {
            return exprContext.appService.resolveColumnName(field);
        }
        return "";
    }
    static getColumn(exprContext, field) {
        return exprContext.appService.getColumn(field);
    }
    /**
     * Return the {@link CCColumn} corresponding to this expression
     */
    get column() {
        return Expr.getColumn(this.exprContext, this.field);
    }
    static getIsStructuredField(exprContext, field) {
        if (!field) {
            return false;
        }
        if (exprContext.disallowFulltext) {
            return true;
        }
        else {
            if (field[0] === ":") {
                return false; // :: => take partname over column
            }
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNCN(field, "exists", "missing")) {
                return true;
            }
            return !!Expr.getColumn(exprContext, field);
        }
    }
    /**
     * Return `true` if the expression has a non-fulltext field. In this case the expression will be a leaf node
     */
    get isStructuredField() {
        if (!this.isLeaf) {
            return false;
        }
        return Expr.getIsStructuredField(this.exprContext, this.field);
    }
    /**
     * Return `true` if the expression only contains non-fulltext fields
     */
    get isStructured() {
        if (this.mergedStructured) {
            return true;
        }
        if (this.isLeaf) {
            return this.isStructuredField;
        }
        if (!this.operands) {
            return false;
        }
        for (const operand of this.operands) {
            if (!operand.isStructured) {
                return false;
            }
        }
        return true;
    }
    /**
     * Return `true` if the expression and its ancestors do not have `not` set to `true`
     */
    get isPositive() {
        let positive = true;
        let current = this;
        while (current != null) {
            positive = positive && !current.not;
            current = current.parent;
        }
        return positive;
    }
    /**
     * Return an `ExprValueLocation` object for the passed text. Leading and trailing
     * whitespace is excluded
     */
    static getValueAndLocation(text) {
        let start = 0;
        let length = text.length;
        const value1 = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].trimStart(text);
        start += length - value1.length;
        length -= length - value1.length;
        const value2 = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].trimEnd(value1);
        length -= length - value2.length;
        return {
            value: value2,
            start: start,
            length: length
        };
    }
    static parseValue(exprContext, text, field, allowEmptyValue, values, locations, operator, range) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(text) && !allowEmptyValue) {
            return;
        }
        const first = text[0];
        const last = text[text.length - 1];
        let vl;
        if ("[{".includes(first) && "]}".includes(last)) {
            text = text.substr(1, text.length - 2);
            let sepLen = 4;
            let sep = text.indexOf(" TO ");
            if (sep === -1) {
                sepLen = 2;
                sep = text.indexOf("..");
            }
            if (sep === -1) {
                const vls = ExprParser.valuesAndLocationsFromText(text, ',');
                values.value = [];
                locations.value = [];
                vls.forEach(vl1 => {
                    values.value.push(vl1.value);
                    locations.value.push({ start: 1 + vl1.start, length: vl1.length });
                });
                operator.value = 10 /* in */;
                return;
            }
            vl = Expr.getValueAndLocation(text.substr(0, sep));
            values.value = [vl.value];
            locations.value = [{ start: 1 + vl.start, length: vl.length }];
            vl = Expr.getValueAndLocation(text.substr(sep + sepLen));
            values.value.push(vl.value);
            locations.value.push({ start: 1 + sep + sepLen + vl.start, length: vl.length });
            if (first === "[") {
                range.value = last === "]" ? 1 /* gteLte */ : 2 /* gteLt */;
            }
            else { // '{'
                range.value = last === "}" ? 4 /* gtLt */ : 3 /* gtLte */;
            }
            return;
        }
        vl = {
            value: text,
            start: 0,
            length: text.length
        };
        if (text.startsWith("=")) {
            operator.value = 1 /* eq */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith(">=")) {
            operator.value = 3 /* gte */;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith(">")) {
            operator.value = 2 /* gt */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith("<=")) {
            operator.value = 5 /* lte */;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith("<>")) {
            operator.value = 6 /* neq */;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith("<")) {
            operator.value = 4 /* lt */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith("~")) {
            operator.value = 7 /* regex */;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.length > 1 && text.startsWith("/") && text.endsWith("/")) {
            operator.value = 7 /* regex */;
            vl.value = text.substr(1, text.length - 2);
            vl.start = 1;
            vl.length = vl.value.length;
        }
        if (text.startsWith("\"") && text.endsWith("\"")) {
            vl.value = text.substr(1, text.length - 2);
            vl.start = 1;
            vl.length = vl.value.length;
        }
        values.value = [vl.value];
        locations.value = [{ start: vl.start, length: vl.length }];
    }
    static getOperatorText(operator) {
        switch (operator) {
            case 1 /* eq */: return "=";
            case 2 /* gt */: return ">";
            case 3 /* gte */: return ">=";
            case 4 /* lt */: return "<";
            case 5 /* lte */: return "<=";
            case 6 /* neq */: return "<>";
            case 7 /* regex */: return "REGEXP";
            case 8 /* like */: return "LIKE";
            case 9 /* contains */: return "CONTAINS";
            case 10 /* in */: return "IN";
            case 11 /* between */: return "BETWEEN";
            default: return "=";
        }
    }
    /**
     * Find the first `ExprValueInfo` object from a starting position in this expression
     *
     * @param start The position at which to start the search
     */
    findValue(start) {
        if (this.isLeaf) {
            if (start >= this.start && start <= this.start + this.length) {
                if (!this.isStructured) {
                    return {
                        /* eslint-disable-next-line */
                        value: this.value,
                        /* eslint-disable-next-line */
                        field: this.field,
                        start: this.start,
                        length: this.length
                    };
                }
                else if (!!this.locations && this.values && this.values.length === this.locations.length) {
                    for (let i = 0, ic = this.values.length; i < ic; i++) {
                        const value = this.values[i];
                        const location = this.locations[i];
                        if (start >= this.start + location.start && start <= this.start + location.start + location.length) {
                            return {
                                value,
                                /* eslint-disable-next-line */
                                field: this.field,
                                start: this.start + location.start,
                                length: location.length
                            };
                        }
                    }
                }
            }
        }
        else if (!!this.operands) {
            for (const expr of this.operands) {
                const value = expr.findValue(start);
                if (value) {
                    return value;
                }
            }
        }
        return undefined;
    }
    /**
     * Combine two expressions into a single expression. The second expression will be added to
     * the first expression and the first expression returned if the first expression is non-leaf
     * and is an `AND` expression and not negated. Otherwise, a new `AND` expression will be created
     * to which both expressions are added as operands.
     */
    static combine(expr1, expr2) {
        if (!expr1) {
            return expr2;
        }
        if (!expr2) {
            return expr1;
        }
        if (!expr1.isLeaf && expr1.and && !expr1.not) {
            if (expr1.isLeaf || !expr2.and || expr2.not) {
                expr1.addOperand(expr2);
            }
            else {
                for (const expr3 of expr2.operands) {
                    expr1.addOperand(expr3);
                }
            }
            return expr1;
        }
        return new Expr({
            exprContext: expr1.exprContext,
            op1: expr1,
            and: true,
            op2: expr2
        });
    }
    normalizeField(field) {
        if (field && field[0] === ExprParser.fieldPartnamePrefix) {
            return field.substr(1);
        }
        return field;
    }
    shouldDisplayField() {
        if (!this.field && !this.parent) { // top level full text
            return true;
        }
        return !!this.field && (!this.parent || !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(this.field, this.parent.field || ""));
    }
    getOperatorString() {
        if (this.operator === 0 /* none */ || this.operator === 1 /* eq */) {
            return "";
        }
        return Expr.getOperatorText(this.operator);
    }
    escapeValue(value) {
        if (!!value && !!this.column && (_app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isString(this.column) || _app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isCsv(this.column))) {
            return ExprParser.escape(value);
        }
        return value || "";
    }
    getValueString() {
        if (this.operator === 11 /* between */ && this.values && this.values.length === 2) {
            return `[${this.escapeValue(this.values[0])}..${this.escapeValue(this.values[1])}]`;
        }
        if (this.values && this.values.length > 1) {
            const sb = [];
            for (const value of this.values) {
                if (sb.length > 0) {
                    sb.push(", ");
                }
                sb.push(this.escapeValue(value));
            }
            sb.unshift("[");
            sb.push("]");
            return sb.join("");
        }
        return this.escapeValue(this.value);
    }
    addFieldToString(sb) {
        let added = false;
        if (this.shouldDisplayField()) {
            sb.push(this.normalizeField(this.field) || "text");
            added = true;
        }
        if (this.display) {
            sb.push(ExprParser.escape(this.display));
            added = true;
        }
        if (added) {
            sb.push(":");
        }
        return added;
    }
    _toString(withFields, inner) {
        const sb = [];
        if (this.isLeaf) {
            if (this.not) {
                sb.push("NOT ");
            }
            if (withFields) {
                this.addFieldToString(sb);
            }
            sb.push(this.getOperatorString());
            sb.push(this.getValueString());
        }
        else {
            if (!this.operands) {
                return "";
            }
            if (this.not) {
                sb.push("NOT ");
            }
            let bracketed = inner;
            if (this.addFieldToString(sb)) {
                bracketed = true;
            }
            if (bracketed) {
                sb.push("(");
            }
            let first = true;
            for (const operand of this.operands) {
                if (!first) {
                    if (this.and) {
                        sb.push(" AND ");
                    }
                    else {
                        sb.push(" OR ");
                    }
                }
                first = false;
                sb.push(operand._toString(withFields, true));
            }
            if (bracketed) {
                sb.push(")");
            }
        }
        return sb.join("");
    }
    /**
     * Return a string representation of this expression
     *
     * @param withFields If `true`, include field names
     */
    toString(withFields = true) {
        return this._toString(withFields, false);
    }
    addDisplay(options, ctxt, display) {
        this._addValue(options, ctxt, this.value || "", display);
    }
    encodeHTML(text, options) {
        if (options && options.asHTML) {
            return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].encodeHTML(text);
        }
        else {
            return text;
        }
    }
    _addValue(options, ctxt, value, display) {
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-value">`);
        }
        const column = this.exprContext.appService.getColumn(this.field);
        const valueId = `value${ctxt.valueIndex++}`;
        let _value = value;
        let _display;
        if (display) {
            _display = this.encodeHTML(ExprParser.unescape(display), options);
        }
        if (column && _app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isNumber(column) && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].testFloat(value)) {
            _value = +value;
        }
        else if (column && _app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isDate(column)) {
            _value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].fromSysDateStr(value) || value;
        }
        else if (column && _app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isBoolean(column)) {
            _value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isTrue(value);
        }
        else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(_value)) {
            _value = this.encodeHTML(_value, options);
        }
        ctxt.message.push(`{${valueId}}`);
        ctxt.values[valueId] = column
            ? this.exprContext.formatService.formatFieldValue({ value: _value, display: _display }, column)
            : _display || _value;
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }
    addValue(options, ctxt) {
        if (this.values) {
            if (this.operator === 11 /* between */ && this.values.length === 2) {
                this._addValue(options, ctxt, this.values[0]);
                ctxt.message.push(" ");
                this.addOperator("AND", options, ctxt);
                ctxt.message.push(" ");
                this._addValue(options, ctxt, this.values[1]);
            }
            else if (this.values.length > 1) {
                let first = true;
                for (const value of this.values) {
                    ctxt.message.push(first ? "[" : ", ");
                    first = false;
                    this._addValue(options, ctxt, value);
                }
                ctxt.message.push("]");
            }
            else {
                this._addValue(options, ctxt, this.values[0]);
            }
        }
    }
    addText(options, ctxt, text) {
        const valueId = `value${ctxt.valueIndex++}`;
        const message = `{${valueId}}`;
        ctxt.message.push(message);
        ctxt.values[valueId] = this.encodeHTML(text, options);
    }
    addFieldLabel(options, ctxt) {
        const displayObj = this.displayObj;
        if (displayObj && displayObj.label) {
            this.addText(options, ctxt, displayObj.label);
        }
        else if (this.field) {
            const label = this.exprContext.appService.getLabel(this.normalizeField(this.field) || "");
            this.addText(options, ctxt, label);
        }
        else {
            if (!this.isStructured) {
                const label = this.exprContext.appService.getLabel("text");
                this.addText(options, ctxt, label);
            }
            else {
                const fields = this.getFields();
                fields.forEach((field, index) => {
                    if (index !== 0) {
                        this.addText(options, ctxt, "/");
                    }
                    const label = this.exprContext.appService.getLabel(field);
                    this.addText(options, ctxt, label);
                });
            }
        }
    }
    addField(options, ctxt) {
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-field">`);
        }
        this.addFieldLabel(options, ctxt);
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
            ctxt.message.push(`<span class="sq-separator">`);
        }
        this.addText(options, ctxt, "msg#system.fieldSeparator");
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }
    addOperator(operator, options, ctxt) {
        if (!operator) {
            return;
        }
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-operator">`);
        }
        ctxt.message.push(this.encodeHTML(operator, options));
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }
    _toMessage(ctxt, options) {
        const inner = ctxt.inner;
        ctxt.inner = true;
        if (!options) {
            options = {};
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(options.useDisplay)) {
            options.useDisplay = true;
        }
        const displayObj = this.displayObj;
        const display = (displayObj ? displayObj.display : undefined) || this.display;
        const showNot = this.not && (inner || !options.hideOuterNot);
        const showField = (options.withFields || inner) && this.shouldDisplayField();
        if (options.useDisplay && !!display) {
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            if (showField) {
                this.addField(options, ctxt);
            }
            this.addDisplay(options, ctxt, display);
        }
        else if (this.isLeaf) {
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            if (showField) {
                this.addField(options, ctxt);
            }
            const operator = this.getOperatorString();
            if (operator) {
                this.addOperator(operator, options, ctxt);
                ctxt.message.push(" ");
            }
            this.addValue(options, ctxt);
        }
        else {
            if (!this.operands) {
                return { message: "" };
            }
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            let bracketed = inner;
            if (showField) {
                this.addField(options, ctxt);
                bracketed = true;
            }
            if (bracketed) {
                ctxt.message.push("(");
            }
            let first = true;
            for (const operand of this.operands) {
                if (!first) {
                    if (this.and) {
                        ctxt.message.push(" ");
                        this.addOperator("AND", options, ctxt);
                        ctxt.message.push(" ");
                    }
                    else {
                        ctxt.message.push(" ");
                        this.addOperator("OR", options, ctxt);
                        ctxt.message.push(" ");
                    }
                }
                first = false;
                operand._toMessage(ctxt, options);
            }
            if (bracketed) {
                ctxt.message.push(")");
            }
        }
        if (inner) {
            return { message: "" };
        }
        return {
            message: ctxt.message.join(""),
            values: ctxt.values
        };
    }
    /**
     * Return an `ExprMessage` for the expression which can be used with [IntlService.formatMessage]{@link IntlService#formatMessage}
     * for display purposes
     */
    toMessage(options) {
        return this._toMessage({
            inner: false,
            message: ["txt#"],
            values: {},
            valueIndex: 0
        }, options);
    }
    static matchNode(context, expr1, expr2) {
        if (expr1.isLeaf !== expr2.isLeaf) {
            return false;
        }
        if (expr1.isLeaf) {
            if (expr1.isStructured !== expr2.isStructured) {
                return false;
            }
            if (expr1.not !== expr2.not) {
                return false;
            }
            const field1 = context.appService.resolveColumnAlias(expr1.field);
            const field2 = context.appService.resolveColumnAlias(expr2.field);
            if (field1 !== field2) {
                return false;
            }
            const operator1 = expr1.operator === 0 /* none */ ? 1 /* eq */ : expr1.operator;
            const operator2 = expr2.operator === 0 /* none */ ? 1 /* eq */ : expr2.operator;
            if (operator1 !== operator2) {
                return false;
            }
        }
        if (!expr1.isLeaf) {
            if (expr1.and !== expr2.and) {
                return false;
            }
            // All of the structured and non-structured operands in expr2 must be in expr1 so check that there are at least enough
            // operands available. (The actual matching of the contents of the operand nodes is done in the recursive calls to MatchNode)
            if (!expr1.operands !== !expr2.operands) {
                return false;
            }
            let expr1StructuredCount = 0, expr1UnstructuredCount = 0, expr2StructuredCount = 0, expr2UnstructuredCount = 0;
            expr1.operands.forEach((operand) => { if (operand.isStructured) {
                expr1StructuredCount++;
            }
            else {
                expr1UnstructuredCount++;
            } });
            expr2.operands.forEach((operand) => { if (operand.isStructured) {
                expr2StructuredCount++;
            }
            else {
                expr2UnstructuredCount++;
            } });
            if ((expr2StructuredCount > expr1StructuredCount) || (expr2UnstructuredCount > expr1UnstructuredCount)) {
                return false;
            }
        }
        const values1Length = expr1.values ? expr1.values.length : 0;
        const values2Length = expr2.values ? expr2.values.length : 0;
        if (values1Length !== values2Length) {
            return false;
        }
        if (values1Length && expr1.values && expr2.values) {
            for (const value1 of expr1.values) {
                let found = false;
                for (const value2 of expr2.values) {
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(value1, value2)) {
                        found = true;
                    }
                }
                if (!found) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Return `true` if this expression matches the passed one
     */
    matchNode(expr) {
        return Expr.matchNode(this.exprContext, this, expr);
    }
    /**
     * Returns the matching expression or sub-expression in this expression with the passed one.
     *
     * @param expr The expression to match
     * @param filter An option filter function called on first level candidate sub-expressions
     * before matching within them
     */
    find(expr, filter) {
        if (this.matchNode(expr)) {
            if (!this.isLeaf && this.operands) {
                for (const child1 of expr.operands) {
                    let found = false;
                    for (const child2 of this.operands) {
                        if (filter && filter(child2)) {
                            continue;
                        }
                        if (child2.find(child1)) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        return null;
                    }
                }
            }
            return this;
        }
        else {
            if (!this.isLeaf && this.operands) {
                for (const child of this.operands) {
                    if (filter && filter(child)) {
                        continue;
                    }
                    if (child.find(expr)) {
                        return child;
                    }
                }
            }
        }
        return null;
    }
    /**
     * Perform the passed `action` on this expression and any descendant operands
     *
     * @param action The action to perform
     */
    forEach(action) {
        action(this);
        if (this.operands) {
            for (const operand of this.operands) {
                operand.forEach(action);
            }
        }
    }
    /**
     * Execute the callback function on this node and any descendants until the callback returns a truthy value
     * in which case immediately return `true`. Otherwise return `false`.
     */
    some(callback) {
        if (callback(this)) {
            return true;
        }
        if (this.operands) {
            for (const operand of this.operands) {
                if (operand.some(callback)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Execute the callback function on this node and any descendants until the callback returns a falsy value
     * in which case, immediately return `false`. Otherwise return `true`.
     */
    every(callback) {
        if (!callback(this)) {
            return false;
        }
        if (this.operands) {
            for (const operand of this.operands) {
                if (!operand.every(callback)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Return `true` if the exoression has at least one fulltext operand.
     * The test on `isPositive` filters expressions that only contain
     * negative fulltext terms which will be ignored on the server. Fulltext
     * expressions must have at least one positive term.
     */
    get hasRelevance() {
        return this.some(expr => expr.isLeaf && !expr.isStructured && expr.isPositive);
    }
    /**
     * Return an array of all fields used in this expression
     */
    getFields() {
        const fields = [];
        this.forEach((expr) => {
            const field = this.exprContext.appService.resolveColumnAlias(expr.field);
            if (field) {
                if (!fields.find((field1) => _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(field, field1))) {
                    fields.push(field);
                }
            }
        });
        return fields;
    }
    /**
     * Return an array of all values used in this expression that pertain to the passed field and where the associated `isPositive`
     * field matches the passed `positive` parameter
     *
     * @param field The field for which values are to be returned
     * @param positive The value to test against `isPositive`
     */
    getValues(field, positive = true) {
        const values = [];
        const column = this.exprContext.appService.resolveColumnName(field);
        this.forEach((expr) => {
            if (column) {
                const column1 = this.exprContext.appService.resolveColumnName(expr.field);
                if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(column, column1)) {
                    return;
                }
            }
            if (expr.isLeaf && expr.isPositive === positive && expr.values) {
                values.push(...expr.values);
            }
        });
        return values;
    }
    getDataValue(data, field, defaultScope) {
        if (!data) {
            return undefined;
        }
        const fields = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].split(field || "", ".");
        if (fields.length >= 1 && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(data[fields[0]]) && !!defaultScope) {
            // By default, look on the "defaultScope" sub-object
            fields.unshift(..._sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].split(defaultScope, "."));
        }
        let value = data;
        for (const _field of fields) {
            if (!value) {
                break;
            }
            value = value[_field];
        }
        return value;
    }
    getWildcardRegExp(value) {
        if (value) {
            let regExp = this.evaluationRegExps[value];
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(regExp)) {
                return regExp;
            }
            let haveWildcards = false;
            let escaping = false;
            const sb = [];
            for (const ch of value) {
                switch (ch) {
                    // Handle wildcards and wildcard escaping
                    case "\\":
                        if (escaping) {
                            sb.push("\\\\");
                            escaping = false;
                        }
                        else {
                            escaping = true;
                        }
                        break;
                    case "*":
                        if (escaping) {
                            sb.push("\\");
                            sb.push(ch);
                            escaping = false;
                        }
                        else {
                            haveWildcards = true;
                            sb.push(".*?");
                        }
                        break;
                    case "?":
                        if (escaping) {
                            sb.push("\\");
                            sb.push(ch);
                            escaping = false;
                        }
                        else {
                            haveWildcards = true;
                            sb.push(".");
                        }
                        break;
                    // Escape other regexp special characters
                    case "-":
                    case "/":
                    case "^":
                    case "$":
                    case "+":
                    case ".":
                    case "(":
                    case ")":
                    case "|":
                    case "[":
                    case "]":
                    case "{":
                    case "}":
                        sb.push("\\");
                        sb.push(ch);
                        escaping = false;
                        break;
                    // All other characters just emit
                    default:
                        sb.push(ch);
                        escaping = false;
                        break;
                }
            }
            if (haveWildcards) {
                regExp = new RegExp("^" + sb.join("") + "$", "i");
                this.evaluationRegExps[value] = regExp;
                return regExp;
            }
            else {
                this.evaluationRegExps[value] = undefined;
            }
        }
        return undefined;
    }
    // NB comparisons with NaN always return false
    compare(value, dataValue, equality) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(dataValue) && dataValue.length === 0) {
            return NaN;
        }
        const column = Expr.getColumn(this.exprContext, this.field || "");
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(dataValue) || _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(value)) {
            // "in" / "contains"
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(dataValue)) {
                dataValue = [dataValue];
            }
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(value)) {
                if (value.length === 0) {
                    return NaN;
                }
            }
            else {
                value = [value + ""];
            }
            // At least one value in the value array must match a value in the dataValue array
            for (const value1 of value) {
                for (const dataValue1 of dataValue) {
                    if (this.compare(value1, dataValue1, true) === 0) {
                        return 0;
                    }
                }
            }
            return NaN;
        }
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(value)) {
            value = ExprParser.unescape(value || "");
            if (column && column.parser) {
                value = this.exprContext.formatService.parseValue(value, column.parser);
            }
            if (_app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isNumber(column)) {
                if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isNumber(dataValue)) {
                    dataValue = 0;
                }
                const _value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toNumber(value);
                return dataValue - _value;
            }
            if (_app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isDate(column)) {
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(dataValue)) {
                    dataValue = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toDate(dataValue);
                }
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isDate(dataValue)) {
                    const _value = this.exprContext.intlService.parseDate(value);
                    if (_value) {
                        return dataValue.getTime() - _value.getTime();
                    }
                }
                return NaN;
            }
            if (_app_service_helpers__WEBPACK_IMPORTED_MODULE_1__["AppServiceHelpers"].isBoolean(column)) {
                const _value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isTrue(value) ? 1 : 0;
                return (dataValue ? 1 : 0) - _value;
            }
            dataValue = dataValue || "";
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(dataValue)) {
                dataValue = ExprParser.unescape(dataValue);
                if (equality) {
                    const regExp = this.getWildcardRegExp(value);
                    if (regExp) {
                        return regExp.test(dataValue) ? 0 : -1;
                    }
                }
                return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].compare(dataValue, value);
            }
        }
        return NaN;
    }
    /**
     * Evaluate this expression using `data` to provide field values. Field values
     * can contain scopes (full stop separated components) to reference sub-objects
     * in the data
     *
     * @param data The field values to be used in the evaluation
     * @param defaultScope If a field value cannot be resolved then try to retrieve a value with this scope prepended to the field name
     * @return The boolean result of the expression evaluation
     */
    evaluate(data, defaultScope) {
        let ret;
        if (this.isLeaf) {
            if (!this.isStructured) {
                ret = false;
            }
            else {
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(this.field || "", "exists")) {
                    const dataValue = this.getDataValue(data, this.value, defaultScope);
                    ret = !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(dataValue);
                }
                else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(this.field || "", "missing")) {
                    const dataValue = this.getDataValue(data, this.value, defaultScope);
                    ret = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(dataValue);
                }
                else {
                    const dataValue = this.getDataValue(data, this.field, defaultScope);
                    switch (this.operator) {
                        case 0 /* none */:
                        case 1 /* eq */:
                            ret = this.compare(this.value, dataValue, true) === 0;
                            break;
                        case 2 /* gt */:
                            ret = this.compare(this.value, dataValue) > 0;
                            break;
                        case 3 /* gte */:
                            ret = this.compare(this.value, dataValue) >= 0;
                            break;
                        case 4 /* lt */:
                            ret = this.compare(this.value, dataValue) < 0;
                            break;
                        case 5 /* lte */:
                            ret = this.compare(this.value, dataValue) <= 0;
                            break;
                        case 6 /* neq */:
                            ret = this.compare(this.value, dataValue, true) !== 0;
                            break;
                        case 7 /* regex */: {
                            const regExp = new RegExp(this.value || "");
                            ret = regExp.test(dataValue + "");
                            break;
                        }
                        case 8 /* like */: // not currently generated in parse
                            ret = this.compare(this.value + "*", dataValue, true) === 0;
                            break;
                        case 10 /* in */:
                            ret = this.compare(this.values, dataValue, true) === 0;
                            break;
                        case 9 /* contains */: // not currently generated in parse
                            ret = this.compare(this.value, dataValue, true) === 0;
                            break;
                        case 11 /* between */:
                            ret = !!this.values &&
                                this.compare(this.values[0], dataValue) >= 0 && this.compare(this.values[1], dataValue) <= 0;
                            break;
                    }
                }
            }
        }
        else {
            ret = !!this.and;
            for (const operand of this.operands) {
                const ret1 = operand.evaluate(data, defaultScope);
                if (this.and) {
                    ret = ret && ret1;
                    if (!ret) {
                        break;
                    }
                }
                else {
                    ret = ret || ret1;
                }
            }
        }
        if (this.not) {
            ret = !ret;
        }
        return ret;
    }
}
/**
 * @ignore
 */
class ExprParserOperator {
    constructor(tok, value = "", valuePos = -1, valueLen = -1) {
        this.tok = tok;
        this.tokValue = value;
        this.tokValuePos = valuePos;
        this.tokValueLen = valueLen;
    }
}
ExprParserOperator.invalid = new ExprParserOperator(-1 /* invalid */);
ExprParserOperator.or = new ExprParserOperator(0 /* or */);
ExprParserOperator.and = new ExprParserOperator(1 /* and */);
ExprParserOperator.not = new ExprParserOperator(2 /* not */);
ExprParserOperator.lPar = new ExprParserOperator(5 /* lPar */);
ExprParserOperator.rPar = new ExprParserOperator(6 /* rPar */);
ExprParserOperator.eof = new ExprParserOperator(7 /* eof */);
/**
 * A parser for Sinequa fielded search expressions. Such expressions allow filters to be specified in fulltext and
 * can be combined with boolean operators to build complex queries.
 *
 * A single fielded search clause has this form:
 * ``<fieldname>[`display value`]:[:][<operator>]<value>``
 *
 * A field name is either a column name or alias or a partname. In the case of a partname and column name clashing then
 * the field is treated as a column. Two colons can be specified as the separator to denote that the field is a partname.
 * An optional display value can follow the fieldname enclosed in backquote characters
 *
 * Operators are: `=` (default), `>=`, `>`, `<=`, `<`, `~` (regexp)
 * In addition, a regular expression can be specified by enclosing the value in `/` characters
 *
 * An inclusive range of values can be specified using a square bracket syntax: `[value1..value2]`
 * An exclusive range of values can be specified using a curly bracket syntax: `{value1..value2}`
 * The brackets can be mixed. For example: `age:{5..13]` expresses `13 >= age > 5`.
 *
 * For multi-value csv fields an `IN` condition can be expressed using a comma-separated list of values enclosed in square brackets.
 * For example: `authors:[Proust, Orwell, Dickens]`
 *
 * If a value contains reserved characters then it can be enclosed in backquote characters to prevent the parser interpreting them
 * incorrectly. For example: ``code: `a:b:c` ``
 *
 * The parser also supports a NEAR operator to allow searching for terms close to each other. There are two forms suppported:
 * * infix - `term1 NEAR[/n] term2` where `n` is the maximum number of words between the two terms for them to match
 * * function - `NEAR[/n](term1, term2, term3, ...)` where `n` is "window" size within which all the terms must be present for them
 * to match. The minimum useful value for n is thus equal to the number of terms passed to the operator.
 *
 * Fielded search expresions can be combined with the boolean operators `AND`, `OR` and `NOT` and brackets used for grouping.
 * For example: `football (age:>=7 AND (name:smith OR name:jones))`
 */
class ExprParser {
    constructor(exprContext, options) {
        this.exprContext = exprContext;
        this.options = options || {};
        this.exprContext.disallowFulltext = this.options.disallowFulltext;
        this.expressions = [];
        this.operators = [];
        this.fields = [];
        this.displays = [];
        this.text = "";
        this.current = 0;
        this.length = 0;
        this.op = this.prevOp = this.saveOp = ExprParserOperator.invalid;
    }
    /**
     * Escape a string so that the characters in it are not processed by the fielded search expression parser.
     * Single occurrences of the backslash character are replaced by two backslashes and backquote characters
     * are prefixed by a backslash. Finally, the string is enclosed in backquotes.
     *
     * For example: `` a\`\b `` => `` a\\\`\\b ``
     */
    // \ => \\
    // ` => \`
    // then surround with ``
    static escape(value) {
        if (!value) {
            return "``";
        }
        value = String(value); // make sure we have a string
        if (value.search(/[\\`]/) === -1) {
            return "`" + value + "`";
        }
        const sb = ["`"];
        for (let i = 0, ic = value.length; i < ic; i++) {
            const ch = value[i];
            if (ch === "\\" || ch === "`") {
                sb.push("\\");
            }
            sb.push(ch);
        }
        sb.push("`");
        return sb.join("");
    }
    static isEscaped(value) {
        return !!value && value.length >= 2 && value[0] === "`" && value[value.length - 1] === "`";
    }
    /**
     * Perform the reverse operation to [ExprParser.escpae]{@link ExprParser#escape}
     */
    // remove surrounding ``
    // \\ => \
    // \` => `
    static unescape(value) {
        if (!ExprParser.isEscaped(value)) {
            return value;
        }
        const sb = [];
        for (let i = 1, ic = value.length - 1; i < ic; i++) {
            let ch = value[i];
            if (ch === "\\") {
                if (i >= ic - 1) { // we end with a \ => drop it
                    continue;
                }
                ch = value[++i];
            }
            sb.push(ch);
        }
        return sb.join("");
    }
    /**
     * @ignore
     */
    static unescapeList(values) {
        if (!values) {
            return values;
        }
        const values1 = [];
        for (let _i = 0, _a = values; _i < _a.length; _i++) {
            const value = _a[_i];
            values1.push(ExprParser.unescape(value));
        }
        return values1;
    }
    /**
     * @ignore
     */
    static valuesAndLocationsFromText(text, separator) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(text)) {
            return [];
        }
        if (!text.includes(separator)) {
            return [{ value: text, start: 0, length: text.length }];
        }
        const values = [];
        const length = text.length;
        let current = 0;
        let currentStart = 0;
        const sb = [];
        let value;
        while (true) {
            if (current >= length) {
                value = Expr.getValueAndLocation(sb.join(""));
                value.start += currentStart;
                if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(value.value)) {
                    values.push(value);
                }
                break;
            }
            const ch = text[current];
            if (ch === "\\") {
                sb.push(ch);
                current++;
                if (current < length) {
                    const ch1 = text[current];
                    if (ch1 === "\\" || ch1 === "`") {
                        sb.push(ch1);
                        current++;
                    }
                }
            }
            else if (ch === "`") {
                const last = { value: 0 };
                const s = ExprParser.matchUntil(text, length, current, current + 1, "`", last);
                if (!!s) {
                    sb.push(s);
                    current = last.value;
                }
                else {
                    sb.push(ch);
                    current++;
                }
            }
            else if (ch === separator) {
                value = Expr.getValueAndLocation(sb.join(""));
                value.start += currentStart;
                sb.length = 0;
                if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(value.value)) {
                    values.push(value);
                }
                current++;
                currentStart = current;
            }
            else {
                sb.push(ch);
                current++;
            }
        }
        return values;
    }
    matchKeyword(keyword, sbCurrentValue, suffixCh) {
        if (sbCurrentValue.length !== 0) {
            const currentValue = sbCurrentValue.join("");
            if (!!currentValue && !" \r\n\t".includes(currentValue[currentValue.length - 1])) {
                return false;
            }
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(keyword)) {
            return false;
        }
        const keywordLen = keyword.length;
        if (this.current + keywordLen > this.length) {
            return false;
        }
        for (let i = 0, ic = keywordLen; i < ic; i++) {
            const ch = this.text[this.current + i];
            const kh = keyword[i];
            if (ch !== kh) {
                return false;
            }
        }
        if (this.current + keywordLen < this.length) {
            const nch = this.text[this.current + keywordLen];
            if (nch !== suffixCh && !" \r\n\t(".includes(nch)) {
                return false;
            }
        }
        return true;
    }
    matchUntil(first, start, endChars, last) {
        return ExprParser.matchUntil(this.text, this.length, first, start, endChars, last);
    }
    static matchUntil(text, length, first, start, endChars, last) {
        last.value = start;
        let found = false;
        const sb = [text.substr(first, start - first)];
        while (last.value < length) {
            let ch = text[last.value++];
            if (ch === "\\") {
                sb.push(ch);
                if (last.value < length) {
                    ch = text[last.value++];
                    if (ch === "\\" || ch === "`") {
                        sb.push(ch);
                        continue;
                    }
                }
            }
            sb.push(ch);
            if (endChars.includes(ch)) {
                found = true;
                break;
            }
        }
        if (!found) {
            return undefined;
        }
        return sb.join("");
    }
    matchSimpleValue(start) {
        const first = this.current;
        let last = start;
        while (last < this.length) {
            const ch = this.text[last];
            if (" \r\n\t)".includes(ch)) {
                break;
            }
            last++;
        }
        if (last === start) {
            return "";
        }
        return this.text.substr(first, last - first);
    }
    getTerminators(ch, allowRanges) {
        if (ch === "\"")
            return "\"";
        if (ch === "[")
            return allowRanges ? "]}" : "]";
        if (ch === "{")
            return allowRanges ? "}]" : "}";
        if (ch === "/")
            return "/";
        if (ch === "(")
            return ")";
        if (ch === "`")
            return "`";
        return "";
    }
    canBeTokValue(value, canBeEmpty = true) {
        return !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(value) || (canBeEmpty && this.options.allowEmptyValues && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(this.field));
    }
    _getTokValue(value, canBeEmpty = true) {
        // Current is pointing at the next non-whitepspace character after this value
        if (value === null)
            return false;
        let pos = this.current;
        const len = value.length;
        value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].trimEnd(value);
        pos -= len - value.length;
        value = value.trim();
        if (this.canBeTokValue(value, canBeEmpty)) {
            this.op = new ExprParserOperator(8 /* value */, value, pos - value.length, value.length);
            return true;
        }
        return false;
    }
    getTokValue(sb, canBeEmpty = true) {
        if (!sb) {
            return false;
        }
        return this._getTokValue(sb.join(""), canBeEmpty);
    }
    ensureNearValue(value) {
        const defaultNearValue = this.exprContext.appService.ccquery ? this.exprContext.appService.ccquery.defaultNearValue : 0;
        let near = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toInt(value, defaultNearValue);
        if (near < 0) {
            near = defaultNearValue;
        }
        return near.toString();
    }
    findDisplay(value) {
        if (!value || value.length < 3) {
            return -1;
        }
        if (value[value.length - 1] !== "`") {
            return -1;
        }
        let pos = value.length - 2;
        while (pos !== -1) {
            pos = value.lastIndexOf("`", pos);
            if (pos !== -1) {
                let escapes = 0;
                let pos1 = pos - 1;
                while (pos1 >= 0) {
                    if (value[pos1] !== "\\") {
                        break;
                    }
                    escapes++;
                    pos1--;
                }
                if (escapes % 2 === 0) {
                    return pos;
                }
                pos--;
            }
        }
        return -1;
    }
    isValidFieldName(name) {
        return this.options.allowScopedFields ? _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isValidScopedSimpleName(name) : _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isValidSimpleName(name);
    }
    isAllowedField(field, forcePartname, isPartname) {
        isPartname.value = false;
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNCN(field, "exists", "missing")) {
            return true;
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNCN(field, "text", "concepts", "refine", "matchingpartnames")) {
            // NB @concepts, @refine and @matchingpartnames must be handled specially by the caller
            isPartname.value = true;
            return true;
        }
        const ccquery = this.exprContext.appService.ccquery;
        if (ccquery) {
            forcePartname = forcePartname && !this.exprContext.disallowFulltext;
            let column = forcePartname ? undefined : this.exprContext.appService.getColumn(field);
            if (!!column) {
                if (column.eType === 12 /* varchar */) { // only type not indexed
                    column = undefined;
                }
                else if ((ccquery.$columnFieldsPattern && ccquery.$columnFieldsPattern.hasPatterns()) &&
                    !ccquery.$columnFieldsPattern.isIncluded(field) &&
                    !ccquery.$columnFieldsPattern.isIncluded(column.name)) {
                    column = undefined;
                }
            }
            if (!this.exprContext.disallowFulltext && !column) {
                isPartname.value = true;
                if ((ccquery.$partnameFieldsPattern && ccquery.$partnameFieldsPattern.hasPatterns()) &&
                    !ccquery.$partnameFieldsPattern.isIncluded(field)) {
                    return false;
                }
            }
        }
        return true;
    }
    readToken() {
        if (this.saveOp !== ExprParserOperator.invalid) {
            this.prevOp = this.op;
            this.op = this.saveOp;
            this.saveOp = ExprParserOperator.invalid;
            return undefined;
        }
        let ch;
        this.prevOp = this.op;
        let nextValue;
        const sbCurrentValue = [];
        let candidateFieldPos = -1;
        let fieldSpecified = false;
        while (true) {
            if (this.current >= this.length) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.eof;
                return undefined;
            }
            ch = this.text[this.current];
            if (ch === "\\") { // \ escapes \ and `
                sbCurrentValue.push(ch);
                this.current++;
                if (this.current < this.length) {
                    const ch1 = this.text[this.current];
                    if (ch1 === "\\" || ch1 === "`") {
                        sbCurrentValue.push(ch1);
                        this.current++;
                    }
                }
            }
            else if (ch === "(") {
                if (this.getTokValue(sbCurrentValue, false)) {
                    return undefined;
                }
                this.op = ExprParserOperator.lPar;
                this.current++;
                return undefined;
            }
            else if (ch === ")") {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.rPar;
                this.current++;
                return undefined;
            }
            else if (this.matchKeyword("AND", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.and;
                this.current += 3;
                return undefined;
            }
            else if (this.matchKeyword("OR", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.or;
                this.current += 2;
                return undefined;
            }
            else if (this.matchKeyword("NOT", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.not;
                this.current += 3;
                return undefined;
            }
            else if (this.matchKeyword("NEAR", sbCurrentValue, "/")) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.current += 4;
                nextValue = undefined;
                if (this.current < this.length && this.text[this.current] === "/") {
                    const last = { value: 0 };
                    nextValue = this.matchUntil(this.current + 1, this.current + 1, " \r\n\t`\"([/", last);
                    let near = -1;
                    if (nextValue !== undefined) {
                        nextValue = nextValue.substr(0, nextValue.length - 1);
                        near = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toInt(nextValue, -1);
                    }
                    if (near < 0) {
                        return "bad operator";
                    }
                    this.current = last.value - 1;
                }
                nextValue = this.ensureNearValue(nextValue || "");
                const infix = this.current >= this.length || this.text[this.current] !== "(";
                // For infix, near value is the number of words between the two terms so add the 2 terms to
                // the window (near/0 = adjacent terms)
                this.op = infix ?
                    new ExprParserOperator(4 /* infixNear */, (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toInt(nextValue) + 2).toString()) :
                    new ExprParserOperator(3 /* near */, nextValue);
                return undefined;
            }
            else if (ch === "+" || ch === "-") {
                if (this.current + 1 < this.length) {
                    const ch1 = this.text[this.current + 1];
                    const last = { value: 0 };
                    let length;
                    if ("(\"[/`".includes(ch1)) { // ( " [ / `
                        nextValue = this.matchUntil(this.current, this.current + 2, this.getTerminators(ch1, false), last);
                        length = last.value - this.current;
                    }
                    else {
                        nextValue = this.matchSimpleValue(this.current + 1);
                        length = !!nextValue ? nextValue.length : 0;
                    }
                    if (!!nextValue) {
                        sbCurrentValue.push(nextValue);
                        this.current += length;
                        continue;
                    }
                }
                return "bad operator: " + ch;
            }
            else if ("\"[{/`".includes(ch)) { // " [ { / `
                const last = { value: 0 };
                nextValue = this.matchUntil(this.current, this.current + 1, this.getTerminators(ch, true), last);
                if (!!nextValue) {
                    const forceRange = (fieldSpecified && "[{".includes(ch) && sbCurrentValue.length === 0);
                    sbCurrentValue.push(nextValue);
                    this.current = last.value;
                    if (forceRange && this.getTokValue(sbCurrentValue)) {
                        return undefined;
                    }
                    continue;
                }
                return "bad operator: " + ch;
            }
            else {
                if (ch === ":") { // Field
                    // Pick out previous value and/or field name
                    // Field specifier can be:
                    // field:value
                    // field`display`:value
                    // `display`:value
                    const currentValue = sbCurrentValue.join("");
                    if (candidateFieldPos === -1) {
                        // Check for display
                        candidateFieldPos = this.findDisplay(currentValue);
                        if (candidateFieldPos === -1) {
                            this.op = ExprParserOperator.invalid;
                            return "invalid token";
                        }
                    }
                    let field = currentValue.substr(candidateFieldPos).trim();
                    let display = "";
                    // Extract display
                    const displayStart = this.findDisplay(field);
                    if (displayStart !== -1) {
                        display = ExprParser.unescape(field.substr(displayStart, field.length - displayStart));
                        field = field.substr(0, displayStart);
                    }
                    if (this.isValidFieldName(field) || (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(field) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(display))) {
                        const value = currentValue.substr(0, candidateFieldPos);
                        if (this.canBeTokValue(value.trim())) {
                            this.current -= (sbCurrentValue.join("").length - candidateFieldPos); // back up to field
                            this._getTokValue(value);
                            return undefined;
                        }
                        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(field)) {
                            let forcePartname = false;
                            if (this.current + 1 < this.length && this.text[this.current + 1] === ":") {
                                // :: => force partname over column
                                forcePartname = true;
                                this.current++;
                            }
                            const isPartname = { value: false };
                            if (!this.isAllowedField(field, forcePartname, isPartname)) {
                                candidateFieldPos = -1;
                                sbCurrentValue.push(":");
                                if (forcePartname) {
                                    sbCurrentValue.push(":");
                                }
                                this.current++;
                                continue;
                            }
                            if (isPartname.value) {
                                field = ExprParser.fieldPartnamePrefix + field;
                            }
                        }
                        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(field)) {
                            this.field = field;
                            fieldSpecified = true;
                        }
                        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(display)) {
                            this.display = display;
                        }
                        sbCurrentValue.length = 0;
                        this.current++;
                        continue;
                    }
                }
                if (" \r\n\t)".includes(ch)) {
                    candidateFieldPos = -1;
                }
                else if (candidateFieldPos === -1) {
                    candidateFieldPos = sbCurrentValue.join("").length;
                }
                sbCurrentValue.push(ch);
                this.current++;
            }
        }
    }
    clear() {
        this.text = "";
        this.current = 0;
        this.length = 0;
        this.operators.length = 0;
        this.expressions.length = 0;
        this.fields.length = 0;
        this.displays.length = 0;
    }
    /**
     * Parse some text using the Sinequa fielded search syntax
     *
     * @return The parsed `Expr` or an error string
     */
    static parse(text, context, options) {
        const parser = new ExprParser(context, options);
        const error = parser.parse(text);
        if (error) {
            return error;
        }
        return parser.parseResult();
    }
    parseResult() {
        if (this.expressions.length !== 1) {
            return "no expression found";
        }
        return this.expressions[0];
    }
    get contextField() {
        let field = this.field;
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(field)) {
            field = this.peekField();
        }
        return field;
    }
    get contextDisplay() {
        let display = this.display;
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(display)) {
            display = this.peekDisplay();
        }
        return display;
    }
    parse(text) {
        this.clear();
        if (this.options.allowEmptyValues && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].len(text.trim())) {
            const expr = Expr.makeExpr(this.exprContext, "", this.contextField, this.contextDisplay, this.options.allowEmptyValues);
            if (expr) {
                expr.start = 0;
                expr.length = 0;
                this.expressions.push(expr);
            }
            return "";
        }
        this.text = text || "";
        this.length = this.text.length;
        this.operators.push(ExprParserOperator.eof);
        let err = this.readToken();
        if (err) {
            return err;
        }
        while (true) {
            if ((this.op.tok === 8 /* value */ || this.op.tok === 5 /* lPar */ || this.op.tok === 2 /* not */ || this.op.tok === 3 /* near */) &&
                (this.prevOp.tok === 8 /* value */ || this.prevOp.tok === 6 /* rPar */)) {
                // Default to AND for space separated terms
                // NOT xxx => AND NOT xxx
                this.saveOp = this.op;
                this.op = ExprParserOperator.and;
            }
            let a;
            if (this.op.tok === 8 /* value */) {
                a = 0 /* s */;
            }
            else {
                a = ExprParser.parsetbl[this.operators[this.operators.length - 1].tok][this.op.tok];
            }
            switch (a) {
                case 1 /* r */:
                    err = this.reduce();
                    if (err) {
                        return err;
                    }
                    break;
                case 0 /* s */:
                    err = this.shift();
                    if (err) {
                        return err;
                    }
                    break;
                case 2 /* a */:
                    if (this.expressions.length !== 1) {
                        return "syntax error";
                    }
                    return "";
                case 3 /* e1 */:
                    return "missing ')'";
                case 4 /* e2 */:
                    return "missing operator (AND,OR,NOT)";
                case 5 /* e3 */:
                    return "missing '('";
                case 6 /* e4 */:
                    return "invalid argument";
            }
        }
    }
    shift() {
        if (this.op.tok === 8 /* value */) {
            const value = this.op.tokValue.trim();
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(value) && !this.options.allowEmptyValues) {
                return "empty token";
            }
            const expr = Expr.makeExpr(this.exprContext, value, this.contextField, this.contextDisplay, !!this.options.allowEmptyValues);
            if (!expr) {
                return "invalid expression";
            }
            expr.start = this.op.tokValuePos;
            expr.length = this.op.tokValueLen;
            if (!!expr.operands) {
                expr.operands.forEach(operand => {
                    operand.start = this.op.tokValuePos;
                    operand.length = this.op.tokValueLen;
                });
            }
            this.expressions.push(expr);
            this.field = "";
            this.display = "";
        }
        else {
            this.operators.push(this.op);
            if (this.op.tok === 5 /* lPar */) {
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(this.field)) {
                    this.fields.push(this.peekField());
                }
                else {
                    this.fields.push(this.field);
                }
                this.field = "";
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(this.display)) {
                    this.displays.push(this.peekDisplay());
                }
                else {
                    this.displays.push(this.display);
                }
                this.display = "";
            }
        }
        return this.readToken();
    }
    peekField() {
        if (this.fields.length === 0) {
            return "";
        }
        return this.fields[this.fields.length - 1];
    }
    peekDisplay() {
        if (this.displays.length === 0) {
            return "";
        }
        return this.displays[this.displays.length - 1];
    }
    canBeMergeTarget(e, and) {
        if (e.isLeaf) {
            return false;
        }
        if (e.near >= 0) {
            return false;
        }
        if (e.and !== and) {
            return false;
        }
        if (e.not) {
            return false;
        }
        return true;
    }
    mergeExpr(e1, e2, and) {
        let source, target;
        let prepend = false;
        if (this.canBeMergeTarget(e1, and)) {
            target = e1;
            source = e2;
        }
        else if (this.canBeMergeTarget(e2, and)) {
            target = e2;
            source = e1;
            prepend = true; // to keep the same order as in the input text
        }
        else {
            return new Expr({
                exprContext: e1.exprContext,
                op1: e1,
                and,
                op2: e2,
                field: this.peekField(),
                display: this.peekDisplay()
            });
        }
        if (source.isLeaf || source.and !== and || source.not || !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eq(source.display || "", target.display || "")) {
            target.addOperand(source, this.peekField(), prepend);
        }
        else {
            if (source.operands) {
                for (const operand of source.operands) {
                    target.addOperand(operand, this.peekField(), prepend);
                }
            }
        }
        return target;
    }
    reduce() {
        let e;
        let e1;
        let e2;
        const op = this.operators[this.operators.length - 1];
        switch (op.tok) {
            case 2 /* not */:
                // Apply E := NOT E
                e = this.expressions.pop();
                if (!e) {
                    return "syntax error";
                }
                e.not = !e.not;
                this.expressions.push(e);
                break;
            case 1 /* and */:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                this.expressions.push(this.mergeExpr(e1, e2, true));
                break;
            case 0 /* or */:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                this.expressions.push(this.mergeExpr(e1, e2, false));
                break;
            case 3 /* near */:
                e = this.expressions.pop();
                if (!e) {
                    return "syntax error";
                }
                e.near = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toInt(this.ensureNearValue(op.tokValue));
                this.expressions.push(e);
                break;
            case 4 /* infixNear */:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                if (!e2.isLeaf || e2.isStructured || !e1.isLeaf || e1.isStructured || e2.not || e1.not || !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(e2.field || "", e1.field || "")) {
                    return "syntax error";
                }
                e = new Expr({
                    exprContext: e1.exprContext,
                    op1: e1,
                    and: false,
                    op2: e2,
                    field: this.peekField(),
                    display: this.peekDisplay()
                });
                e.near = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toInt(this.ensureNearValue(op.tokValue));
                this.expressions.push(e);
                break;
            case 6 /* rPar */:
                this.operators.pop();
                if (this.fields.length === 0) {
                    return "missing field";
                }
                if (this.expressions.length === 0) {
                    return "syntax error";
                }
                const field = this.fields.pop();
                const display = this.displays.pop();
                // Set Field for single term bracketed expressions
                e = this.expressions[this.expressions.length - 1];
                if (e.isLeaf) {
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(e.field)) {
                        e.field = field;
                    }
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(e.display)) {
                        e.display = display;
                    }
                }
                break;
        }
        this.operators.pop();
        return undefined;
    }
}
ExprParser.fieldPartnamePrefix = "@";
ExprParser.parsetbl = [
    /* stk  ------------- input ------------*/
    /*		                                 INFIX                  */
    /*		         OR	   AND	 NOT   NEAR  NEAR  (	  )	     $  */
    /*OR */ [1 /* r */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*AND*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*NOT*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 1 /* r */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*NEAR*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 1 /* r */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*INFIXNEAR*/ [1 /* r */, 1 /* r */, 0 /* s */, 0 /* s */, 1 /* r */, 0 /* s */, 1 /* r */, 1 /* r */],
    /*(*/ [0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 3 /* e1 */],
    /*)*/ [1 /* r */, 1 /* r */, 1 /* r */, 1 /* r */, 1 /* r */, 4 /* e2 */, 1 /* r */, 1 /* r */],
    /*$*/ [0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 0 /* s */, 5 /* e3 */, 2 /* a */]
];


/***/ }),

/***/ "fw2B":
/*!****************************************************************!*\
  !*** ./projects/core/web-services/query-export.web.service.ts ***!
  \****************************************************************/
/*! exports provided: QueryExportWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryExportWebService", function() { return QueryExportWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _config_ccapp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config/ccapp */ "RGzw");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./http-client */ "4+vC");








/**
 * A service to export the result of a query.
 */
class QueryExportWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
        }
        if (!webService) {
            const errorMessage = 'No web service';
            this.logErrorToConsole(methodName, errorMessage);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
        }
        if (!format || format === _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportOutputFormat"].None) {
            const errorMessage = 'No output format';
            this.logErrorToConsole(methodName, errorMessage);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            query,
            type: _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportSourceType"][_config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportSourceType"].Result],
            format: _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportOutputFormat"][format],
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
        }
        if (!selection || selection.length === 0) {
            const errorMessage = 'No selection';
            this.logErrorToConsole(methodName, errorMessage);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            query,
            selection,
            type: _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportSourceType"][_config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportSourceType"].Selection],
            format: _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportOutputFormat"][format],
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: errorMessage });
        }
        const postData = {
            app: this.appName,
            webService,
            type: _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportSourceType"][_config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportSourceType"].SavedQuery],
            format: _config_ccapp__WEBPACK_IMPORTED_MODULE_5__["ExportOutputFormat"][format],
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].subscribe(observable, (response) => {
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
QueryExportWebService.ɵfac = function QueryExportWebService_Factory(t) { return new (t || QueryExportWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"])); };
QueryExportWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: QueryExportWebService, factory: QueryExportWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](QueryExportWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "g2WM":
/*!******************************************************!*\
  !*** ./projects/core/validation/module.providers.ts ***!
  \******************************************************/
/*! exports provided: VALIDATION_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATION_MODULE_PROVIDERS", function() { return VALIDATION_MODULE_PROVIDERS; });
const VALIDATION_MODULE_PROVIDERS = [];



/***/ }),

/***/ "g9Qo":
/*!**********************************************************!*\
  !*** ./projects/core/web-services/labels.web.service.ts ***!
  \**********************************************************/
/*! exports provided: LabelsWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LabelsWebService", function() { return LabelsWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");








/**
 * A service for calling the labels web service
 */
class LabelsWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((value) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, response => response, error => console.log("labelsService.getUserRights failure - error: ", error));
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("labelsService.bulkRemove failure - error: ", error);
        });
        return observable;
    }
}
LabelsWebService.ɵfac = function LabelsWebService_Factory(t) { return new (t || LabelsWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlService"])); };
LabelsWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LabelsWebService, factory: LabelsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LabelsWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }, { type: _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_6__["IntlService"] }]; }, null); })();


/***/ }),

/***/ "gYqS":
/*!**********************************************!*\
  !*** ./projects/core/intl/messages/index.ts ***!
  \**********************************************/
/*! exports provided: enIntl, frIntl, deIntl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en */ "uZzd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enIntl", function() { return _en__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _fr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fr */ "BdUA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frIntl", function() { return _fr__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _de__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./de */ "a/wI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deIntl", function() { return _de__WEBPACK_IMPORTED_MODULE_2__["default"]; });







/***/ }),

/***/ "hH3Y":
/*!********************************************!*\
  !*** ./projects/core/modal/messages/fr.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "modal": {
        "buttons": {
            "ok": "OK",
            "cancel": "Annuler",
            "yes": "Oui",
            "no": "Non",
            "abort": "Abandonner",
            "retry": "Réessayer",
            "ignore": "Ignorer"
        },
        "confirm": {
            "title": "Confirmer"
        },
        "prompt": {
            "title": "Saississez une valeur"
        }
    }
});


/***/ }),

/***/ "hOsg":
/*!**********************************************!*\
  !*** ./projects/core/modal/modal.service.ts ***!
  \**********************************************/
/*! exports provided: MODAL_MODEL, ModalButton, MODAL_CONFIRM, MODAL_PROMPT, ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODAL_MODEL", function() { return MODAL_MODEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalButton", function() { return ModalButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODAL_CONFIRM", function() { return MODAL_CONFIRM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODAL_PROMPT", function() { return MODAL_PROMPT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/portal */ "+rOU");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _modal_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-ref */ "9jax");







const DEFAULT_CONFIG = {
    hasBackdrop: true,
    backdropClass: ["cdk-overlay-dark-backdrop", "sq-modal-backdrop"],
    panelClass: "sq-modal-pane",
    model: null,
    closeOnBackdropClick: true
};
/**
 * The `MODAL_MODEL` injection token can be used to access the modal's model in
 * the the modal component. The value is `provided` from the value set in the
 * {@link ModalConfig} options when the modal is opened.
 */
const MODAL_MODEL = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MODAL_MODEL');
/**
 * A class representing a button displayed in a modal.
 */
class ModalButton {
    constructor(options) {
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].extend(this, { visible: true, anchor: false }, options);
    }
    /**
     * Get the button text. Buttons with non-custom result types
     * have default text depending on their result type -
     * `msg#modal.buttons.ok`, `msg#modal.buttons.cancel` etc
     */
    getText() {
        if (this.text) {
            return this.text;
        }
        switch (this.result) {
            case -1 /* OK */:
                return "msg#modal.buttons.ok";
            case -2 /* Cancel */:
                return "msg#modal.buttons.cancel";
            case -3 /* Yes */:
                return "msg#modal.buttons.yes";
            case -4 /* No */:
                return "msg#modal.buttons.no";
            case -5 /* Abort */:
                return "msg#modal.buttons.abort";
            case -6 /* Retry */:
                return "msg#modal.buttons.retry";
            case -7 /* Ignore */:
                return "msg#modal.buttons.ignore";
            default:
                return "";
        }
    }
    /**
     * Perform a click on a button. The button's explicit action is performed if set and
     * the modal closed with the button's modal result if the `result` type is non-`Custom`.
     * If the validation status not `valid` this method returns without performing any action.
     *
     * @param closer An object with a `close` method. If the result type is non-custom then
     * the `close` method of this object is called.
     */
    click(closer) {
        if (this.validation && !this.validation.valid) {
            return;
        }
        if (this.action) {
            this.action(this);
        }
        if (this.result !== 0 /* Custom */) {
            closer.close(this.result);
        }
    }
}
/**
 * An injection token to set the component to use for the `confirm` modal displayed
 * by the [ModalService.confirm]{@link ModalService#confirm} method.
 */
const MODAL_CONFIRM = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MODAL_CONFIRM');
/**
 * An injection token to set the component to use for the `prompt` modal displayed
 * by the [ModalService.prompt]{@link ModalService#confirm} method.
 */
const MODAL_PROMPT = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MODAL_PROMPT');
/**
 * A service to open modal dialogs.
 */
class ModalService {
    constructor(injector, overlay, confirmModal, promptModal) {
        this.injector = injector;
        this.overlay = overlay;
        this.confirmModal = confirmModal;
        this.promptModal = promptModal;
    }
    /**
     * Open a modal dialog using the passed configuration options.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns An `IModalRef` object that can be used to close the modal.
     */
    openRef(component, config = {}) {
        // Override default configuration
        const modalConfig = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
        if (modalConfig.fullscreen) {
            modalConfig.width = "100%";
            modalConfig.height = "100%";
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isString(modalConfig.panelClass)) {
                modalConfig.panelClass = [modalConfig.panelClass, "sq-modal-fullscreen"];
            }
            else if (modalConfig.panelClass) {
                modalConfig.panelClass.push("sq-modal-fullscreen");
            }
            else {
                modalConfig.panelClass = "sq-modal-fullscreen";
            }
        }
        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(modalConfig);
        // Instantiate remote control
        const modalRef = new _modal_ref__WEBPACK_IMPORTED_MODULE_4__["ModalRef"](overlayRef);
        const overlayComponent = this.attachDialogContainer(component, overlayRef, modalConfig, modalRef);
        modalRef.componentInstance = overlayComponent;
        overlayRef.hostElement.classList.add("sq-modal-host");
        if (modalConfig.closeOnBackdropClick) {
            // NB backdropClick will not fire if pointer-events are enabled on modal-host
            overlayRef.backdropClick().subscribe(() => modalRef.close());
            // Provide support for a scrollable sq-modal-host (overlay wrapper)
            // The standard cdk styling disables pointer-events at this level which means that scrolling
            // won't work. We can enable pointer-events in css but then the backdrop will not receive the
            // click event. So, we handle the click event directly on sq-modal-host also and if the
            // click target === sq-modal-host then we initiate modal closing here
            overlayRef.hostElement.addEventListener("click", (event) => {
                if (event.target === overlayRef.hostElement) {
                    modalRef.close();
                }
            });
        }
        overlayRef.keydownEvents().subscribe((event) => {
            if (event.keyCode === _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Keys"].esc) {
                modalRef.close();
            }
        });
        modalRef.disableSubmit();
        return modalRef;
    }
    /**
     * A wrapper around the {@link #openRef} method which returns a `Promise` that resolves
     * with the `ModalResult` when the modal is closed.
     *
     * @param component The type of the component to use for the modal.
     * @param config Configuration options for the modal.
     * @retuns The `ModalResult` when the modal is closed.
     */
    open(component, config = {}) {
        const modalRef = this.openRef(component, config);
        return modalRef.afterClosed().toPromise();
    }
    createOverlay(config) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    attachDialogContainer(component, overlayRef, config, modalRef) {
        // PortalInjector() is deprecated
        const injector = _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"].create({
            providers: [
                { provide: _modal_ref__WEBPACK_IMPORTED_MODULE_4__["ModalRef"], useValue: modalRef },
                { provide: MODAL_MODEL, useValue: config.model }
            ],
            parent: this.injector
        });
        const containerPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_2__["ComponentPortal"](component, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    getOverlayConfig(config) {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        const overlayConfig = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["OverlayConfig"]({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });
        return overlayConfig;
    }
    /**
     * Open a confirmation modal dialog displaying a message and a set buttons. This is similar to the Javacsript
     * `Window.alert` method but renders a modal.
     *
     * @param options The options used to open the confirm modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    confirm(options) {
        return this.open(this.confirmModal, { model: options });
    }
    /**
     * Open a prompt modal dialog displaying a message, an input and OK/Cancel buttons.
     *
     * @param options The options used to open the prompt modal. These are set as the `MODAL_MODEL`  of the modal.
     */
    prompt(options) {
        return this.open(this.promptModal, { model: options });
    }
    /**
     * Open a confirm modal that has an `OK` button.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     */
    oK(message, messageParams, title, confirmType = 0 /* Success */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -1 /* OK */, primary: true })
            ]
        });
    }
    /**
     * Open a confirm modal that has `OK` and `Cancel` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    oKCancel(message, messageParams, title, confirmType = 1 /* Info */, primaryButton = -1 /* OK */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -1 /* OK */, primary: primaryButton === -1 /* OK */ }),
                new ModalButton({ visible: true, result: -2 /* Cancel */, primary: primaryButton === -2 /* Cancel */ })
            ]
        });
    }
    /**
     * Open a confirm modal that has `Yes` and `No` buttons.
     *
     * @param message The message to display in the modal.
     * @param messageParams The parameters for the message.
     * @param title The confirm modal's title.
     * @param confirmType The type of the confirm modal.
     * @param primaryButton The result type of the button which should be primary.
     */
    yesNo(message, messageParams, title, confirmType = 1 /* Info */, primaryButton = -3 /* Yes */) {
        return this.confirm({
            title,
            message,
            messageParams,
            confirmType,
            buttons: [
                new ModalButton({ visible: true, result: -3 /* Yes */, primary: primaryButton === -3 /* Yes */ }),
                new ModalButton({ visible: true, result: -4 /* No */, primary: primaryButton === -4 /* No */ })
            ]
        });
    }
}
ModalService.ɵfac = function ModalService_Factory(t) { return new (t || ModalService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MODAL_CONFIRM), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MODAL_PROMPT)); };
ModalService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ModalService, factory: ModalService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModalService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"] }, { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__["Overlay"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Type"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [MODAL_CONFIRM]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Type"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [MODAL_PROMPT]
            }] }]; }, null); })();


/***/ }),

/***/ "hS7N":
/*!*********************************************!*\
  !*** ./projects/core/intl/import-moment.ts ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
// moment locales need moment set globally

window.moment = moment__WEBPACK_IMPORTED_MODULE_0___default.a;


/***/ }),

/***/ "iTTq":
/*!***********************************!*\
  !*** ./projects/core/base/ref.ts ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "jJFg":
/*!*****************************************************!*\
  !*** ./projects/hello-search/src/app/app.module.ts ***!
  \*****************************************************/
/*! exports provided: StartConfigInitializer, startConfig, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartConfigInitializer", function() { return StartConfigInitializer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startConfig", function() { return startConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sinequa/core/login */ "Wo2r");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @sinequa/core/modal */ "rAYq");
/* harmony import */ var _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @sinequa/core/notification */ "wFkT");
/* harmony import */ var _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sinequa/core/app-utils */ "/iXS");
/* harmony import */ var _sinequa_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @sinequa/core */ "k1ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "kPK4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../environments/environment */ "5/GE");
/* harmony import */ var _core_web_services_web_services_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../core/web-services/web-services.module */ "Dn18");
/* harmony import */ var _core_intl_intl_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../core/intl/intl.module */ "6z6W");
/* harmony import */ var _core_login_login_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../core/login/login.module */ "V1Pl");
/* harmony import */ var _core_modal_modal_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../core/modal/modal.module */ "5irr");





















function StartConfigInitializer(startConfigWebService) {
    const init = () => startConfigWebService.fetchPreLoginAppConfig().toPromise();
    return init;
}
const startConfig = {
    // app: "your-app-name",
    production: _environments_environment__WEBPACK_IMPORTED_MODULE_14__["environment"].production
};
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        // Provides an APP_INITIALIZER which will fetch application configuration information from the Sinequa
        // server automatically at startup using the application name specified in the URL (app[-debug]/<app-name>).
        // This allows an application to avoid hard-coding parameters in the StartConfig but requires that the application
        // be served from the an app[-debug]/<app name> URL.
        { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], useFactory: StartConfigInitializer, deps: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_6__["StartConfigWebService"]], multi: true },
        // Provides the Angular LocationStrategy to be used for reading route state from the browser's URL. Currently
        // only the HashLocationStrategy is supported by Sinequa.
        { provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_3__["HashLocationStrategy"] },
        // Provides an HttpInterceptor to handle user login. The LoginInterceptor handles HTTP 401 responses
        // to Sinequa web service requests and initiates the login process.
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _sinequa_core_login__WEBPACK_IMPORTED_MODULE_7__["LoginInterceptor"], multi: true },
        // Provides an HttpInterceptor that offers a centralized location through which all client-side
        // audit records pass. An application can replace AuditInterceptor with a subclass that overrides
        // the updateAuditRecord method to add custom audit information to the records.
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_11__["AuditInterceptor"], multi: true },
        // Provides an HttpInterceptor that automatically processes any notifications specified in the $notifications
        // member of the response body to any Sinequa web service requests.
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_10__["NotificationsInterceptor"], multi: true },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot([]),
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_6__["WebServicesModule"].forRoot(startConfig),
            _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_8__["IntlModule"].forRoot(_sinequa_core__WEBPACK_IMPORTED_MODULE_12__["DefaultLocalesConfig"]),
            _sinequa_core_login__WEBPACK_IMPORTED_MODULE_7__["LoginModule"].forRoot(),
            _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"].forRoot(),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"], _core_web_services_web_services_module__WEBPACK_IMPORTED_MODULE_15__["WebServicesModule"], _core_intl_intl_module__WEBPACK_IMPORTED_MODULE_16__["IntlModule"], _core_login_login_module__WEBPACK_IMPORTED_MODULE_17__["LoginModule"], _core_modal_modal_module__WEBPACK_IMPORTED_MODULE_18__["ModalModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot([]),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                    _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_6__["WebServicesModule"].forRoot(startConfig),
                    _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_8__["IntlModule"].forRoot(_sinequa_core__WEBPACK_IMPORTED_MODULE_12__["DefaultLocalesConfig"]),
                    _sinequa_core_login__WEBPACK_IMPORTED_MODULE_7__["LoginModule"].forRoot(),
                    _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"].forRoot(),
                ],
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
                ],
                providers: [
                    // Provides an APP_INITIALIZER which will fetch application configuration information from the Sinequa
                    // server automatically at startup using the application name specified in the URL (app[-debug]/<app-name>).
                    // This allows an application to avoid hard-coding parameters in the StartConfig but requires that the application
                    // be served from the an app[-debug]/<app name> URL.
                    { provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["APP_INITIALIZER"], useFactory: StartConfigInitializer, deps: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_6__["StartConfigWebService"]], multi: true },
                    // Provides the Angular LocationStrategy to be used for reading route state from the browser's URL. Currently
                    // only the HashLocationStrategy is supported by Sinequa.
                    { provide: _angular_common__WEBPACK_IMPORTED_MODULE_3__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_3__["HashLocationStrategy"] },
                    // Provides an HttpInterceptor to handle user login. The LoginInterceptor handles HTTP 401 responses
                    // to Sinequa web service requests and initiates the login process.
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _sinequa_core_login__WEBPACK_IMPORTED_MODULE_7__["LoginInterceptor"], multi: true },
                    // Provides an HttpInterceptor that offers a centralized location through which all client-side
                    // audit records pass. An application can replace AuditInterceptor with a subclass that overrides
                    // the updateAuditRecord method to add custom audit information to the records.
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_11__["AuditInterceptor"], multi: true },
                    // Provides an HttpInterceptor that automatically processes any notifications specified in the $notifications
                    // member of the response body to any Sinequa web service requests.
                    { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_10__["NotificationsInterceptor"], multi: true },
                ],
                bootstrap: [
                    _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "jWhr":
/*!*****************************************************************!*\
  !*** ./projects/core/web-services/user-settings.web.service.ts ***!
  \*****************************************************************/
/*! exports provided: UserSettingsWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSettingsWebService", function() { return UserSettingsWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var jstz__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jstz */ "xFjY");
/* harmony import */ var jstz__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jstz__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./http-client */ "4+vC");








/**
 * A service for calling the usersettings web service
 */
class UserSettingsWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
    constructor(startConfig, httpClient) {
        super(startConfig);
        this.httpClient = httpClient;
        this._events = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.timezone = jstz__WEBPACK_IMPORTED_MODULE_5___default.a.determine().name(); // until momentjs gets this
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => response, (error) => {
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
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_4__["Utils"].subscribe(observable, (response) => response, (error) => {
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
UserSettingsWebService.ɵfac = function UserSettingsWebService_Factory(t) { return new (t || UserSettingsWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"])); };
UserSettingsWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserSettingsWebService, factory: UserSettingsWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserSettingsWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_6__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "k1ts":
/*!*************************************!*\
  !*** ./projects/core/public-api.ts ***!
  \*************************************/
/*! exports provided: enCore, frCore, deCore, DefaultLocalesConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _messages_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages/index */ "Sz+O");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enCore", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_0__["enCore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frCore", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_0__["frCore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deCore", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_0__["deCore"]; });

/* harmony import */ var _default_locales_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-locales-config */ "Y4qV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultLocalesConfig", function() { return _default_locales_config__WEBPACK_IMPORTED_MODULE_1__["DefaultLocalesConfig"]; });





/***/ }),

/***/ "kEf5":
/*!**************************************************!*\
  !*** ./projects/core/intl/abstract-intl.pipe.ts ***!
  \**************************************************/
/*! exports provided: AbstractIntlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractIntlPipe", function() { return AbstractIntlPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _intl_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intl.service */ "agta");




/**
 * An abstract base class for pipes that should refresh automatically
 * when the current locale on {@link IntlService} changes. Pipes should
 * be declared as `pure: false` - the current value is cached to avoid
 * unnecessary processing
 */
class AbstractIntlPipe {
    constructor(intlService, changeDetectorRef) {
        this.intlService = intlService;
        this.changeDetectorRef = changeDetectorRef;
        this.value = "";
    }
    updateValue(value, params) {
        this.lastValue = value;
        this.lastParams = params;
        this.changeDetectorRef.markForCheck();
    }
    transform(value, params) {
        // if we ask another time for the same key, return the last value
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].equals(value, this.lastValue) && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].equals(params, this.lastParams)) {
            return this.value;
        }
        // set the value
        this.updateValue(value, params);
        // subscribe to localeChange event
        if (!this.localeChange) {
            this.localeChange = this.intlService.events.subscribe((event) => {
                if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isEmpty(this.lastValue)) {
                    this.lastValue = null;
                    this.updateValue(value, params);
                }
            });
        }
        return this.value;
    }
    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }
}
AbstractIntlPipe.ɵfac = function AbstractIntlPipe_Factory(t) { return new (t || AbstractIntlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_intl_service__WEBPACK_IMPORTED_MODULE_2__["IntlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"]()); };
AbstractIntlPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "sqAbstractIntlPipe", type: AbstractIntlPipe, pure: false });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AbstractIntlPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{ name: "sqAbstractIntlPipe", pure: false }]
    }], function () { return [{ type: _intl_service__WEBPACK_IMPORTED_MODULE_2__["IntlService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, null); })();


/***/ }),

/***/ "kFGd":
/*!******************************************************!*\
  !*** ./projects/core/app-utils/audit.interceptor.ts ***!
  \******************************************************/
/*! exports provided: AuditInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuditInterceptor", function() { return AuditInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");





/**
 * An `HttpInterceptor` to process audi events attached to the request body
 * in the `$auditRecord` member.
 */
class AuditInterceptor {
    constructor(startConfig) {
        this.startConfig = startConfig;
    }
    shouldIntercept(url) {
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].startsWith(url, this.startConfig.apiPath);
    }
    isJsonable(obj) {
        return (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isObject(obj) || _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isArray(obj)) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isArrayBuffer(obj) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isBlob(obj) &&
            !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isString(obj) && !(obj instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]);
    }
    // Handle legacy calls where auditEvents is either an AuditEvent or AuditEvent[]
    ensureAuditRecord(auditEvents) {
        if (!auditEvents) {
            return undefined;
        }
        let auditEvents1;
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isArray(auditEvents)) {
            auditEvents1 = auditEvents;
        }
        else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isObject(auditEvents)) {
            const auditRecord = auditEvents;
            if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                return auditRecord;
            }
            auditEvents1 = [auditEvents];
        }
        return {
            auditEvents: auditEvents1
        };
    }
    /**
     * Add a sessionid to all the audit events
     * @param auditRecord
     */
    addSessionId(auditRecord) {
        var _a;
        const sessionid = this.getSessionId();
        (_a = auditRecord === null || auditRecord === void 0 ? void 0 : auditRecord.auditEvents) === null || _a === void 0 ? void 0 : _a.forEach(event => {
            if (!event.detail) {
                event.detail = {};
            }
            event.detail['session-id'] = sessionid;
        });
    }
    /**
     * Get a Session Id initialized upon login. The session is maintained for 10 minutes
     * after the last call to this method.
     */
    getSessionId() {
        if (!this.sessionid || this.isSessionStale()) {
            this.sessionid = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].guid();
        }
        this.sessionstart = new Date();
        return this.sessionid;
    }
    /**
     * Test whether the current session id valid or stale (need to be refreshed)
     */
    isSessionStale() {
        const lastSession = new Date().getTime() - this.sessionstart.getTime();
        // Consider the session stale after 10 minutes
        return lastSession > 10 * 60 * 1000;
    }
    /**
     * Called once the `$auditRecord` member has been standardized, this method
     * can be overidden to update fields in the audit events associated with a
     * web service call.
     */
    updateAuditRecord(auditRecord) {
    }
    /**
     * Intercept requests with a JSON body and standardize the format of the
     * `$auditRecord` member.
     */
    intercept(request, next) {
        if (this.shouldIntercept(request.url) && this.isJsonable(request.body)) {
            request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
            this.addSessionId(request.body.$auditRecord);
            this.updateAuditRecord(request.body.$auditRecord);
        }
        return next.handle(request);
    }
}
AuditInterceptor.ɵfac = function AuditInterceptor_Factory(t) { return new (t || AuditInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"])); };
AuditInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuditInterceptor, factory: AuditInterceptor.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuditInterceptor, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_2__["START_CONFIG"]]
            }] }]; }, null); })();


/***/ }),

/***/ "kPK4":
/*!********************************************************!*\
  !*** ./projects/hello-search/src/app/app.component.ts ***!
  \********************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sinequa/core/app-utils */ "/iXS");
/* harmony import */ var _sinequa_core_login__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/login */ "Wo2r");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @sinequa/core/notification */ "wFkT");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _core_intl_message_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/intl/message.pipe */ "cZrR");











function AppComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.clear(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_div_9_div_2_p_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "p", 13);
} if (rf & 2) {
    const record_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", record_r9.relevantExtracts, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
} }
function AppComponent_div_9_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, AppComponent_div_9_div_2_p_5_Template, 1, 1, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const record_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", record_r9.url1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHtml", record_r9.displayTitle || record_r9.title, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](record_r9.url1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", record_r9.relevantExtracts);
} }
function AppComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AppComponent_div_9_div_2_Template, 6, 4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const results_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", results_r7.records);
} }
function AppComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_button_12_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_button_13_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.login(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function AppComponent_ng_container_14_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "sqMessage");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const notification_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 1, notification_r16.title));
} }
const _c0 = function (a0) { return { values: a0 }; };
function AppComponent_ng_container_14_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AppComponent_ng_container_14_div_2_div_1_Template, 5, 3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "sqMessage");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const notification_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", notification_r16.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](4, 2, notification_r16.text, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, notification_r16.params)));
} }
function AppComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, AppComponent_ng_container_14_div_2_Template, 5, 7, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const notification_r16 = ctx.ngIf;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.deleteNotification(notification_r16));
} }
class AppComponent {
    constructor(formBuilder, loginService, appService, queryWebService, notificationsService) {
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.appService = appService;
        this.queryWebService = queryWebService;
        this.notificationsService = notificationsService;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]("");
        this.form = this.formBuilder.group({
            search: this.searchControl
        });
    }
    ngAfterViewInit() {
        this.login();
    }
    search() {
        const ccquery = this.appService.ccquery;
        const query = new _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_2__["Query"](ccquery ? ccquery.name : "_unknown");
        query.text = this.searchControl.value || "";
        this.results$ = this.queryWebService.getResults(query);
    }
    clear() {
        this.results$ = undefined;
        this.searchControl.setValue("");
    }
    login() {
        this.loginService.login();
    }
    logout() {
        this.clear();
        this.loginService.logout();
    }
    deleteNotification(notification) {
        setTimeout(() => this.notificationsService.deleteNotification(notification), 5000);
        return true;
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_login__WEBPACK_IMPORTED_MODULE_3__["LoginService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_2__["AppService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["QueryWebService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_notification__WEBPACK_IMPORTED_MODULE_5__["NotificationsService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app"]], decls: 16, vars: 14, consts: [[1, "search"], ["novalidate", "", 3, "formGroup"], ["type", "text", "placeholder", "Enter search terms...", "formControlName", "search", "spellcheck", "false", "autocomplete", "off"], ["type", "submit", 3, "click"], ["type", "button", 3, "click", 4, "ngIf"], [4, "ngIf"], ["type", "button", 3, "click"], ["class", "record", 4, "ngFor", "ngForOf"], [1, "record"], [3, "href"], [3, "innerHtml"], [1, "source"], [3, "innerHTML", 4, "ngIf"], [3, "innerHTML"], ["class", "notification", 4, "ngIf"], [1, "notification"], ["class", "title", 4, "ngIf"], [1, "title"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Hello Search \uD83D\uDD0D");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_button_click_5_listener() { return ctx.search(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Search");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, AppComponent_button_7_Template, 2, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, AppComponent_div_9_Template, 3, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](10, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, AppComponent_button_12_Template, 2, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, AppComponent_button_13_Template, 2, 0, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, AppComponent_ng_container_14_Template, 3, 1, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](15, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("disabled", !ctx.loginService.complete ? "" : null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("disabled", !ctx.loginService.complete ? "" : null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](8, 8, ctx.results$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](10, 10, ctx.results$));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.loginService.complete);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.loginService.complete);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](15, 12, ctx.notificationsService.notificationsStream));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"], _core_intl_message_pipe__WEBPACK_IMPORTED_MODULE_7__["MessagePipe"]], styles: [".search[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin-left: 100px;\n}\n.search[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-bottom: 0.25em;\n}\n.search[_ngcontent-%COMP%]   .record[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.5em 0 0 0;\n  font-weight: normal;\n  font-size: 1.25em;\n}\n.search[_ngcontent-%COMP%]   .record[_ngcontent-%COMP%]   .source[_ngcontent-%COMP%] {\n  color: #006621;\n  font-size: 0.9em;\n  margin: 0.25em 0;\n}\n.search[_ngcontent-%COMP%]   .record[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #676767;\n  margin-top: 0;\n  font-size: 0.9em;\n}\n.notification[_ngcontent-%COMP%] {\n  border: solid;\n  padding: 8px;\n}\n.notification[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxhcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFSSxnQkFBQTtFQUNBLGtCQUFBO0FBQUo7QUFFSTtFQUNJLHFCQUFBO0FBQVI7QUFLUTtFQUNJLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUhaO0FBTVE7RUFDSSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUpaO0FBT1E7RUFDSSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBTFo7QUFVQTtFQUNJLGFBQUE7RUFDQSxZQUFBO0FBUEo7QUFTSTtFQUNJLGlCQUFBO0FBUFIiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNlYXJjaCB7XG5cbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMDBweDtcblxuICAgIGgxIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC4yNWVtO1xuICAgIH1cblxuICAgIC5yZWNvcmQge1xuXG4gICAgICAgIGgzIHtcbiAgICAgICAgICAgIG1hcmdpbjogMC41ZW0gMCAwIDA7XG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxLjI1ZW07XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgLnNvdXJjZSB7XG4gICAgICAgICAgICBjb2xvcjogIzAwNjYyMTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC45ZW07XG4gICAgICAgICAgICBtYXJnaW46IDAuMjVlbSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwIHtcbiAgICAgICAgICAgIGNvbG9yOiAjNjc2NzY3O1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC45ZW07XG4gICAgICAgIH1cbiAgICB9ICAgIFxufVxuXG4ubm90aWZpY2F0aW9uIHtcbiAgICBib3JkZXI6IHNvbGlkO1xuICAgIHBhZGRpbmc6IDhweDtcblxuICAgIC50aXRsZSB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app",
                templateUrl: "./app.component.html",
                styleUrls: ["./app.component.scss"]
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: _sinequa_core_login__WEBPACK_IMPORTED_MODULE_3__["LoginService"] }, { type: _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_2__["AppService"] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["QueryWebService"] }, { type: _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_5__["NotificationsService"] }]; }, null); })();


/***/ }),

/***/ "lOfs":
/*!******************************************!*\
  !*** ./projects/core/base/public-api.ts ***!
  \******************************************/
/*! exports provided: SqErrorCode, SqError, NameValueArrayViewHelper, IteratorAdaptor, Keys, PatternType, Pattern, Patterns, PatternMatcher, Timer, Utils, BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array-view */ "5Vh/");
/* empty/unused harmony star reexport *//* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "qMjt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqErrorCode", function() { return _error__WEBPACK_IMPORTED_MODULE_1__["SqErrorCode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SqError", function() { return _error__WEBPACK_IMPORTED_MODULE_1__["SqError"]; });

/* harmony import */ var _field_value__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./field-value */ "KKN5");
/* empty/unused harmony star reexport *//* harmony import */ var _item_array_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./item-array-view */ "nMcb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NameValueArrayViewHelper", function() { return _item_array_view__WEBPACK_IMPORTED_MODULE_3__["NameValueArrayViewHelper"]; });

/* harmony import */ var _iterator_adaptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./iterator-adaptor */ "CR/k");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IteratorAdaptor", function() { return _iterator_adaptor__WEBPACK_IMPORTED_MODULE_4__["IteratorAdaptor"]; });

/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./json */ "y1eU");
/* empty/unused harmony star reexport *//* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyboard */ "3ZYh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keys", function() { return _keyboard__WEBPACK_IMPORTED_MODULE_6__["Keys"]; });

/* harmony import */ var _map_of__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./map-of */ "xwU4");
/* empty/unused harmony star reexport *//* harmony import */ var _ref__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ref */ "iTTq");
/* empty/unused harmony star reexport *//* harmony import */ var _pattern_matcher__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pattern-matcher */ "xI56");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PatternType", function() { return _pattern_matcher__WEBPACK_IMPORTED_MODULE_9__["PatternType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pattern", function() { return _pattern_matcher__WEBPACK_IMPORTED_MODULE_9__["Pattern"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patterns", function() { return _pattern_matcher__WEBPACK_IMPORTED_MODULE_9__["Patterns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PatternMatcher", function() { return _pattern_matcher__WEBPACK_IMPORTED_MODULE_9__["PatternMatcher"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "Yvsk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return _utils__WEBPACK_IMPORTED_MODULE_10__["Timer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return _utils__WEBPACK_IMPORTED_MODULE_10__["Utils"]; });

/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./base.module */ "VM01");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return _base_module__WEBPACK_IMPORTED_MODULE_11__["BaseModule"]; });















/***/ }),

/***/ "lbUz":
/*!***********************************************************!*\
  !*** ./projects/core/validation/validation-error.pipe.ts ***!
  \***********************************************************/
/*! exports provided: ValidationErrorPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidationErrorPipe", function() { return ValidationErrorPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _validation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validation.service */ "N74W");





/**
 * A pipe to display the first error in a `ValidationErrors` map.
 */
class ValidationErrorPipe extends _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["AbstractIntlPipe"] {
    constructor(intlService, changeDetectorRef, validationService) {
        super(intlService, changeDetectorRef);
        this.validationService = validationService;
    }
    updateValue(key, params) {
        super.updateValue(key, params);
        const text = this.validationService.getFirstErrorText(key);
        const info = this.validationService.getFirstErrorInfo(key);
        this.value = text ? this.intlService.formatMessage(text, { values: info }) : undefined;
    }
}
ValidationErrorPipe.ɵfac = function ValidationErrorPipe_Factory(t) { return new (t || ValidationErrorPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["IntlService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"](), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_validation_service__WEBPACK_IMPORTED_MODULE_2__["ValidationService"])); };
ValidationErrorPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "sqValidationError", type: ValidationErrorPipe, pure: false });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ValidationErrorPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{ name: "sqValidationError", pure: false }]
    }], function () { return [{ type: _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["IntlService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _validation_service__WEBPACK_IMPORTED_MODULE_2__["ValidationService"] }]; }, null); })();


/***/ }),

/***/ "mfeY":
/*!***************************************************!*\
  !*** ./projects/core/app-utils/format.service.ts ***!
  \***************************************************/
/*! exports provided: FormatService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatService", function() { return FormatService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _app_service_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-service-helpers */ "/paf");
/* harmony import */ var d3_format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-format */ "rWgG");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");






/**
 * This service provides methods for locale-sensitive formatting and parsing of values that can be found in
 * Sinequa search results.
 */
class FormatService {
    constructor(intlService) {
        this.intlService = intlService;
        /** D3 formatter for large number: 42096 => 42K */
        this.bigNumberFormatter = Object(d3_format__WEBPACK_IMPORTED_MODULE_3__["format"])("~s");
        /** Similar to bigNumberFormatter, but replaces "G" by "B" (as in "$42B") */
        this.moneyFormatter = s => this.bigNumberFormatter(s).replace(/G/, "B");
    }
    /**
     * Returns `true` if the passed parameter is a `ValueItem` object
     */
    isValueItem(valueItem) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isObject(valueItem) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isDate(valueItem) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isArray(valueItem)) {
            return true;
        }
        return false;
    }
    /**
     * Extracts the value and display components from a parameter that can be either a `ValueItem`
     * object or a simple `FieldValue`, in which case the display will be `undefined`.
     */
    getValueAndDisplay(valueItem) {
        let value;
        let display;
        if (this.isValueItem(valueItem)) {
            value = valueItem.value;
            display = valueItem.display || "";
        }
        else {
            value = valueItem;
            display = "";
        }
        return [value, display];
    }
    /**
     * Return the display equivalent of a Sinequa language specifier (`en`, `fr`, ...).
     * The display values are defined in the {@link IntlModule} message files
     *
     * @param value A value containing a Sinequa language specifier
     */
    formatLanguage(value) {
        return this.intlService.formatMessage(`msg#language.${_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toLowerCase(value + "")}`);
    }
    /**
     * Return the display equivalent of a size value. The units (`kb`, `mb`, ...) are defined
     * in the {@link IntlModule} message files
     *
     * @param size A memory size in bytes
     */
    formatMemorySize(size) {
        const kiloBytes = size / 1024;
        const megaBytes = kiloBytes / 1024;
        const gigaBytes = megaBytes / 1024;
        const teraBytes = gigaBytes / 1024;
        const petaBytes = teraBytes / 1024;
        let messageKey = "msg#system.memorySize.bytes";
        const params = { value: size };
        if (Math.abs(petaBytes) >= 1) {
            messageKey = "msg#system.memorySize.pb";
            params.value = petaBytes;
        }
        else if (Math.abs(teraBytes) >= 1) {
            messageKey = "msg#system.memorySize.tb";
            params.value = teraBytes;
        }
        else if (Math.abs(gigaBytes) >= 1) {
            messageKey = "msg#system.memorySize.gb";
            params.value = gigaBytes;
        }
        else if (Math.abs(megaBytes) >= 1) {
            messageKey = "msg#system.memorySize.mb";
            params.value = megaBytes;
        }
        else if (Math.abs(kiloBytes) >= 1) {
            messageKey = "msg#system.memorySize.kb";
            params.value = kiloBytes;
        }
        return this.intlService.formatMessage(messageKey, params);
    }
    /**
     * Format an amount of money (typically extracted by a Sinequa Text-mining agent)
     * USD 42069 => USD 42K
     * @param value
     * @returns
     */
    formatMoney(value) {
        let [currency, val] = value.split(" ");
        return `${currency} ${this.moneyFormatter(+val)}`;
    }
    /**
     * Format a value for display according to the passed `column`. Formatters
     * can be defined in the column's configuration to provide domain-specific
     * formatting. The standard formatters are `language` and `memorysize`.
     *
     * @param valueItem The value to format
     * @param column The column associated with the value
     */
    formatValue(valueItem, column) {
        let [value, display] = this.getValueAndDisplay(valueItem);
        if (column && column.formatter) {
            switch (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toLowerCase(column.formatter)) {
                case "language": return this.formatLanguage(value);
                case "memorysize":
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isNumber(value)) {
                        return this.formatMemorySize(value);
                    }
                    break;
                case "money":
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(value)) {
                        return this.formatMoney(value);
                    }
                    else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isArray(value)) {
                        return value.map(v => this.formatMoney(_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(v) ? v : v.value)).join(', ');
                    }
                    break;
            }
        }
        if (display) {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isDate(display)) { // ES-7785
                display = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSysDateStr(display);
            }
            return this.intlService.formatMessage(display, { value });
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isNumber(value)) {
            const message = this.intlService.getMessage("msg#system.number");
            if (message) {
                return this.intlService.formatText(message, { value });
            }
            else {
                return this.intlService.formatNumber(value);
            }
        }
        if (column && _app_service_helpers__WEBPACK_IMPORTED_MODULE_2__["AppServiceHelpers"].isDate(column) && _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(value)) {
            value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].fromSysDateStr(value) || value;
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isDate(value)) {
            if (column && !_app_service_helpers__WEBPACK_IMPORTED_MODULE_2__["AppServiceHelpers"].isDate(column)) { // ES-7785
                value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSysDateStr(value);
            }
            else {
                const message = this.intlService.getMessage("msg#system.date");
                if (message) {
                    return this.intlService.formatText(message, { date: value, time: _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].getTime(value) });
                }
                else {
                    let s = this.intlService.formatDate(value);
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].getTime(value) !== 0) {
                        s += ", " + this.intlService.formatTime(value);
                    }
                    return s;
                }
            }
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isBoolean(value)) {
            const message = this.intlService.getMessage("msg#system.boolean");
            if (message) {
                return this.intlService.formatText(message, { value });
            }
            else {
                return value.toString();
            }
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isArray(value)) {
            const joinValue = [];
            value.forEach(v => {
                if (joinValue.length > 0) {
                    joinValue.push(";");
                }
                let _v;
                if (!v) {
                    _v = "<null>";
                }
                else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isDate(v)) {
                    _v = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSysDateStr(v);
                }
                else if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(v)) {
                    _v = v;
                }
                else {
                    _v = v.display || v.value || "<null>";
                }
                joinValue.push(_v);
            });
            value = joinValue.join("");
        }
        if (!value) {
            return value;
        }
        return this.intlService.formatMessage(value);
    }
    /**
     * Transform a display value. Multiple transformers can be defined on a column and their calls are chained.
     * The standard formatters are `uppercase`, `upperfirst`, `lowercase`, `lowerfirst`, `startcase`, `kebabcase`,
     * `snakecase` and `camelcase`.
     *
     * @param value The value to transform
     * @param column The column associated with the value
     */
    transformValue(value, column) {
        const transforms = column ? _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].split(column.transforms || "", ",") : undefined;
        if (!transforms || transforms.length === 0) {
            return value;
        }
        // transforms are composable
        for (const transform of transforms) {
            switch (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toLowerCase(transform)) {
                case "uppercase":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toUpperCase(value);
                    break;
                case "upperfirst":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toUpperFirst(value);
                    break;
                case "lowercase":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toLowerCase(value);
                    break;
                case "lowerfirst":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toLowerFirst(value);
                    break;
                case "startcase":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toStartCase(value);
                    break;
                case "kebabcase":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toKebabCase(value);
                    break;
                case "snakecase":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSnakeCase(value);
                    break;
                case "camelcase":
                    value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toCamelCase(value);
                    break;
            }
        }
        return value;
    }
    /**
     * Format a value item for display. This is the standard entry point for formatting a value.
     * By default, this method calls [formatValue]{@link #formatValue} and [transformValue]{@link #transformValue}.
     *
     * @param valueItem The value item to format
     * @param column The column associated with the value item
     */
    formatFieldValue(valueItem, column) {
        let formattedValue = this.formatValue(valueItem, column);
        formattedValue = this.transformValue(formattedValue, column);
        return formattedValue;
    }
    /**
     * Parse an input value according to the passed `parser`. The standard parser is `memorysize`. Parsers
     * are configured in the {@link CCColumn} configuration. The parsed value is returned as a string for
     * processing by the {@link ValidationModule}
     *
     * @param value The value to parse
     * @param parser The parser to use
     */
    parseValue(value, parser) {
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(value)) {
            if (parser) {
                switch (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toLowerCase(parser)) {
                    case "memorysize": {
                        return this.parseMemorySize(value) + "";
                    }
                }
            }
        }
        return value;
    }
    /**
     * Parse a size string using [Utils.toSize]{@link Utils#toSize}
     *
     * @param str The string to parse
     * @param _default The default value to return if the string cannot be parsed
     * @return The parsed size in bytes
     */
    parseMemorySize(str, _default = 0) {
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSize(str, _default);
    }
    /**
     * Display a raw value without applying any formatting
     * (besides the native toString() method for non-string values)
     * @param value
     * @returns
     */
    formatRaw(value) {
        let [val] = this.getValueAndDisplay(value);
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isArray(val)) {
            return val.map(v => _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(v) ? v : v.value).join(';');
        }
        return val === null || val === void 0 ? void 0 : val.toString();
    }
}
FormatService.ɵfac = function FormatService_Factory(t) { return new (t || FormatService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlService"])); };
FormatService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: FormatService, factory: FormatService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FormatService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_4__["IntlService"] }]; }, null); })();


/***/ }),

/***/ "mg1I":
/*!********************************************************!*\
  !*** ./projects/core/notification/module.providers.ts ***!
  \********************************************************/
/*! exports provided: NOTIFICATION_MODULE_PROVIDERS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTIFICATION_MODULE_PROVIDERS", function() { return NOTIFICATION_MODULE_PROVIDERS; });
const NOTIFICATION_MODULE_PROVIDERS = [];



/***/ }),

/***/ "mwKB":
/*!*******************************************************!*\
  !*** ./projects/core/app-utils/query/expr-builder.ts ***!
  \*******************************************************/
/*! exports provided: ExprBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExprBuilder", function() { return ExprBuilder; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _expr_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expr-parser */ "edoa");




class ExprBuilder {
    /**
     * Make a standard selection expression
     * (resulting in a SQL clause like "company contains 'BOEING'")
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the field to select (eg. "BOEING")
     * @param display Optional string to display that value (eg. "Boeing")
     */
    makeExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}: ${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(value)}`; // company`Boeing`: BOEING
    }
    /**
     * Make a boolean expression
     * @param field Name of the field to select (eg. "toto")
     * @param value Value of the field to select (eg. "true")
     * @param display Optional string to display that value (eg. "True")
     */
    makeBooleanExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}: ${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSqlValue(value))}`; // toto`True`: true
    }
    /**
     * Make a numerical expression using a comparison operator (>, <, <=, >=, etc.)
     * @param field Name of the field to select (eg. "modified")
     * @param operator Comparison operator used for that selection (eg. ">")
     * @param value Value of the field to select (eg. "2020-12-15")
     * @param display Optional string to display that value (eg. "After Dec 15 2020")
     */
    makeNumericalExpr(field, operator, value, display) {
        field = this.formatField(field, display);
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(value)) {
            value = _expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(value);
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isDate(value) || _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isNumber(value)) {
            value = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSqlValue(value);
        }
        return `${field}:${operator} ${value}`; // modified`After Dec 15 2020`:> 2020-12-15
    }
    /**
     * Make a list expression
     * @param field Name of the field to select (eg. "docformat")
     * @param values Values of the field to select (eg. ['htm','pdf'])
     * @param display Optional string to display that value (eg. "htm, pdf")
     */
    makeListExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: [${values.map(v => _expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(v)).join(',')}]`; // docformat`htm, pdf`:[`htm`,`pdf`]
    }
    /**
     * Make a range expression
     * @param field Name of the field to select (eg. "modified")
     * @param from Begining of the range (eg. 2020-12-15)
     * @param to End of the range (eg. 2020-12-20)
     * @param display Optional string to display that value (eg. "[Dec 15 2020, Dec 20 2020]")
     */
    makeRangeExpr(field, from, to, display) {
        field = this.formatField(field, display);
        return `${field}: [${_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSqlValue(from)}..${_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSqlValue(to)}]`; // modified`[Dec 15 2020, Dec 20 2020]`: [2020-12-15..2020-12-20]
    }
    /**
     * Make a RegExp expression
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the regular expression to match (eg. "BOE.*")
     * @param display Optional string to display that value (eg. "Boe...")
     */
    makeRegexpExpr(field, value, display) {
        field = this.formatField(field, display);
        return `${field}:~ ${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(value)}`; // company`Boe...`:~ BOE.*
    }
    /**
     * Make a refine expression
     * @param text The text to add to the query
     */
    makeRefineExpr(text) {
        return `refine: ${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(text)}`;
    }
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ANDed)
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeAndExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'AND')})`; // company: (IBM AND APPLE AND GOOGLE)
    }
    /**
     * Return an expression that selects multiple values for a field
     * (All values are ORed)
     * This function should be equivalent to using makeListExpr
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeOrExpr(field, values, display) {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'OR')})`; // company: (IBM OR APPLE OR GOOGLE)
    }
    /**
     * Combine a list of values with AND or OR operators
     * @param values the list of values
     * @param operator the operator
     */
    concatWithOperator(values, operator) {
        return values.map(v => {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isString(v)) {
                return _expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(v);
            }
            if (v.display) {
                return `${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(v.display)}:${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSqlValue(v.value))}`;
            }
            return _expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].toSqlValue(v.value));
        }).join(' ' + operator + ' ');
    }
    /**
     * Returns the negative expression of the given expression
     * eg. NOT(person:Bill GATES)
     * @param expr
     */
    makeNotExpr(expr) {
        return `NOT (${expr})`;
    }
    /**
     * Returns an expression that is the union of given expressions
     * eg. person:Bill GATES OR company:MICROSOFT
     * @param exprs
     */
    concatOrExpr(exprs) {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') OR (')})`;
    }
    /**
     * Returns an expression that is the intersection of given expressions
     * eg. person:Bill GATES AND company:MICROSOFT
     * @param exprs
     */
    concatAndExpr(exprs) {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') AND (')})`;
    }
    /**
     * Returns an expression to select the given item
     * @param field Name of the field to select (eg. "company")
     * @param items A single or list of ValueItem object(s) (eg. content of a record)
     */
    makeFieldExpr(field, items, combineWithAnd) {
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isArray(items)) {
            items = [items];
        }
        if (items.length === 0) {
            return ""; // Return a falsy string instead of "()" or "``" which would be truthy
        }
        return combineWithAnd ? this.makeAndExpr(field, items) : this.makeOrExpr(field, items);
    }
    /**
     * Create an expression for the given aggregation item
     * @param aggregation The aggregation containing this object
     * @param items The AggregationItem(s) to select
     * @param combineWithAnd If there are multiple values, combine them with AND (instead of OR)
     */
    makeAggregationExpr(aggregation, items, combineWithAnd) {
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_1__["Utils"].isArray(items)) {
            items = [items];
        }
        if (aggregation.valuesAreExpressions) {
            const exprs = items.map(i => i.value.toString()); // .toString() is to avoid typing issues. With valuesAreExpressions = true, item.value is expected to be a string
            return combineWithAnd ? this.concatAndExpr(exprs) : this.concatOrExpr(exprs);
        }
        else {
            const _items = this.asValueItems(items, aggregation.isTree);
            return this.makeFieldExpr(aggregation.column, _items, combineWithAnd);
        }
    }
    /**
     * Combines the field with the optional display value(s)
     * @param field
     * @param display
     */
    formatField(field, display) {
        if (display) {
            field = `${field}${_expr_parser__WEBPACK_IMPORTED_MODULE_2__["ExprParser"].escape(display)}`;
        }
        return field;
    }
    /**
     * Return the AggregationItem list as a ValueItem list
     * @param items
     * @param isTree
     */
    asValueItems(items, isTree) {
        if (isTree) {
            return items.map(i => {
                return {
                    value: i.$path + "*",
                    display: i.display || i.value
                };
            });
        }
        return items; // This works because ValueItem and AggregationItem share the value and display properties
    }
}
ExprBuilder.ɵfac = function ExprBuilder_Factory(t) { return new (t || ExprBuilder)(); };
ExprBuilder.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ExprBuilder, factory: ExprBuilder.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ExprBuilder, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();


/***/ }),

/***/ "nMcb":
/*!***********************************************!*\
  !*** ./projects/core/base/item-array-view.ts ***!
  \***********************************************/
/*! exports provided: NameValueArrayViewHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NameValueArrayViewHelper", function() { return NameValueArrayViewHelper; });
/* harmony import */ var _iterator_adaptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iterator-adaptor */ "CR/k");

class ArrayBasedView {
    constructor(base, nameSelector, valueSelector) {
        this.base = base;
        this.nameSelector = nameSelector;
        this.valueSelector = valueSelector;
    }
    get length() {
        return this.base.length;
    }
    get(index) {
        return this.toNameValuePair(this.base[index]);
    }
    getName(index) {
        return this.nameSelector(this.base[index]);
    }
    getValue(index) {
        return this.valueSelector(this.base[index]);
    }
    toNameValuePair(obj) {
        return { name: this.nameSelector(obj), value: this.valueSelector(obj) };
    }
    /*
        Iterators
    */
    [Symbol.iterator]() {
        return this.items();
    }
    items() {
        return _iterator_adaptor__WEBPACK_IMPORTED_MODULE_0__["IteratorAdaptor"].forIterable(this.base, (obj) => this.toNameValuePair(obj));
    }
    names() {
        return _iterator_adaptor__WEBPACK_IMPORTED_MODULE_0__["IteratorAdaptor"].forIterable(this.base, this.nameSelector);
    }
    values() {
        return _iterator_adaptor__WEBPACK_IMPORTED_MODULE_0__["IteratorAdaptor"].forIterable(this.base, this.valueSelector);
    }
    forEach(callback, thisArg) {
        for (let idx = 0; idx < this.length; idx++) {
            const r = this.get(idx);
            if (thisArg)
                callback.call(thisArg, r, idx, this);
            else
                callback(r, idx, this);
        }
        return this;
    }
}
/**
 * A helper class for creating {@link NameValueArrayView} instances
 */
// @dynamic
class NameValueArrayViewHelper {
    /**
     * Creates a {@link NameValueArrayView} from an array of {@link NameValuePair} items
     *
     * @param items An array of `NameValuePair` items
     */
    static fromArray(items) {
        return new ArrayBasedView(items || [], p => p.name, p => p.value);
    }
    static fromObjects(items, nameKey, valueKey) {
        return new ArrayBasedView(items || [], p => p[nameKey], p => p[valueKey]);
    }
    static from(items, nameSelector, valueSelector) {
        return new ArrayBasedView(items || [], nameSelector, valueSelector);
    }
}


/***/ }),

/***/ "nx+a":
/*!*************************************************!*\
  !*** ./projects/core/validation/messages/de.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "validation": {
        "min": "Der Mindestwert ist {min}",
        "max": "Der Wert kann nicht größer sein als {max}",
        "required": "Dies ist ein Mussfeld",
        "requiredTrue": "Dieses Feld muss ausgefüllt werden",
        "email": "Eine gültige E-Mail-Adresse ist einzutragen",
        "minLength": "Die Mindestlänge des Wertes beträgt {requiredLength, plural, one {# Zeichen} other {# Zeichen}}",
        "maxLength": "Der Wert darf nicht mehr als {requiredLength, plural, one {# Zeichen} other {# Zeichen}} haben",
        "pattern": "Der Wert ist ungültig",
        "unique": "Dieses Feld muss eindeutig sein",
        "integer": "Der Wert muss eine ganze Zahl sein",
        "number": "Der Wert muss eine Nummer sein",
        "date": "",
        "range": "Der erste Wert muss kleiner oder gleich dem zweiten Wert sein"
    }
});


/***/ }),

/***/ "o1VS":
/*!*************************************************!*\
  !*** ./projects/core/modal/prompt.component.ts ***!
  \*************************************************/
/*! exports provided: Prompt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return Prompt; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.service */ "hOsg");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _modal_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-ref */ "9jax");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _intl_message_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../intl/message.pipe */ "cZrR");
/* harmony import */ var _validation_validation_error_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../validation/validation-error.pipe */ "lbUz");











function Prompt_input_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "input", 7);
} }
function Prompt_textarea_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "textarea", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "            ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("rows", ctx_r1.model.rowCount);
} }
function Prompt_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](4, "sqValidationError");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    let tmp_0_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](4, 1, (tmp_0_0 = ctx_r2.form.get("input")) == null ? null : tmp_0_0.errors));
} }
class Prompt {
    constructor(model, modalRef, formBuilder) {
        this.model = model;
        this.modalRef = modalRef;
        this.formBuilder = formBuilder;
    }
    ngOnInit() {
        this.inputControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.model.output, this.model.validators || _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
        this.form = this.formBuilder.group({
            input: this.inputControl
        });
        this.formChanges = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].subscribe(this.form.valueChanges, (value) => {
            this.model.output = this.inputControl.value;
        });
    }
    ngOnDestroy() {
        this.formChanges.unsubscribe();
    }
    showError(control) {
        return control.invalid && (control.dirty || this.modalRef.submitted);
    }
    ok() {
        if (!this.form.valid) {
            return;
        }
        this.modalRef.close(-1 /* OK */);
    }
    cancel() {
        this.modalRef.close(-2 /* Cancel */);
    }
    get title() {
        return this.model.title ? this.model.title : "msg#modal.prompt.title";
    }
}
Prompt.ɵfac = function Prompt_Factory(t) { return new (t || Prompt)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_modal_service__WEBPACK_IMPORTED_MODULE_2__["MODAL_MODEL"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_modal_ref__WEBPACK_IMPORTED_MODULE_4__["ModalRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"])); };
Prompt.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Prompt, selectors: [["sq-core-prompt"]], decls: 17, vars: 18, consts: [["novalidate", "", "cdkTrapFocus", "", 2, "border", "solid", "padding", "16px", "background-color", "white", 3, "formGroup", "cdkTrapFocusAutoCapture"], [2, "margin-top", "0"], ["type", "text", "formControlName", "input", 4, "ngIf"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows", 4, "ngIf"], [4, "ngIf"], ["type", "submit", 3, "click"], ["type", "button", 3, "click"], ["type", "text", "formControlName", "input"], ["type", "text", "formControlName", "input", "spellcheck", "on", "autofocus", "", 3, "rows"], [2, "color", "red"]], template: function Prompt_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, Prompt_input_7_Template, 1, 0, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, Prompt_textarea_8_Template, 2, 1, "textarea", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, Prompt_ng_container_9_Template, 5, 3, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Prompt_Template_button_click_11_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Prompt_Template_button_click_14_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](16, "sqMessage");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form)("cdkTrapFocusAutoCapture", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](3, 9, ctx.title));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](6, 11, ctx.model.message, ctx.model.messageParams));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.model.rowCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !!ctx.model.rowCount);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showError(ctx.inputControl));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](13, 14, "msg#modal.buttons.ok"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](16, 16, "msg#modal.buttons.cancel"));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_5__["CdkTrapFocus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"]], pipes: [_intl_message_pipe__WEBPACK_IMPORTED_MODULE_7__["MessagePipe"], _validation_validation_error_pipe__WEBPACK_IMPORTED_MODULE_8__["ValidationErrorPipe"]], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Prompt, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "sq-core-prompt",
                template: `
        <form novalidate [formGroup]="form" style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <input type="text" formControlName="input" *ngIf="!model.rowCount">
            <textarea type="text" formControlName="input" spellcheck="on" rows="{{model.rowCount}}" autofocus *ngIf="!!model.rowCount">
            </textarea>
            <ng-container *ngIf="showError(inputControl)">
                <br>
                <span style="color: red;">{{form.get("input")?.errors | sqValidationError}}</span>
            </ng-container>
            <hr>
            <button type="submit" (click)="ok()">{{'msg#modal.buttons.ok' | sqMessage}}</button>
            <button type="button" (click)="cancel()">{{'msg#modal.buttons.cancel' | sqMessage}}</button>
        </form>
    `
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_modal_service__WEBPACK_IMPORTED_MODULE_2__["MODAL_MODEL"]]
            }] }, { type: _modal_ref__WEBPACK_IMPORTED_MODULE_4__["ModalRef"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }]; }, null); })();


/***/ }),

/***/ "pIlH":
/*!********************************************!*\
  !*** ./projects/core/login/messages/fr.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "modal": {
        "login": {
            "title": "Connexion",
            "userName": "Identifiant",
            "password": "Mot de passe",
            "singleSignOn": "Authentification unique",
            "signInWith": "S'identifier avec ..."
        }
    },
});


/***/ }),

/***/ "q3UE":
/*!***********************************************************!*\
  !*** ./projects/core/notification/notification.module.ts ***!
  \***********************************************************/
/*! exports provided: NotificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationModule", function() { return NotificationModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _module_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module.providers */ "mg1I");



/**
 * This module provides a service for managing notifications. It is used by the
 * Sinequa runtime and can also be used for application-specific purposes.
 *
 * The {@link NotificationsInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
class NotificationModule {
}
NotificationModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NotificationModule });
NotificationModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function NotificationModule_Factory(t) { return new (t || NotificationModule)(); }, providers: [
        ..._module_providers__WEBPACK_IMPORTED_MODULE_1__["NOTIFICATION_MODULE_PROVIDERS"]
    ], imports: [[]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NotificationModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: [
                    ..._module_providers__WEBPACK_IMPORTED_MODULE_1__["NOTIFICATION_MODULE_PROVIDERS"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "q7DD":
/*!*******************************************!*\
  !*** ./projects/core/login/public-api.ts ***!
  \*******************************************/
/*! exports provided: AuthenticationService, TokenService, ComponentWithLogin, JWTService, AuthConfig, LoginModule, MODAL_LOGIN, LoginService, Login, HTTP_REQUEST_INITIALIZERS, LoginInterceptor, AuthenticationOauthService, AuthenticationPopupService, enLogin, frLogin, deLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication.service */ "JpD7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _authentication_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"]; });

/* harmony import */ var _token_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token.service */ "0dSo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TokenService", function() { return _token_service__WEBPACK_IMPORTED_MODULE_1__["TokenService"]; });

/* harmony import */ var _component_with_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component-with-login.component */ "Q1ZN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentWithLogin", function() { return _component_with_login_component__WEBPACK_IMPORTED_MODULE_2__["ComponentWithLogin"]; });

/* harmony import */ var _jwt_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jwt.service */ "bO3L");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JWTService", function() { return _jwt_service__WEBPACK_IMPORTED_MODULE_3__["JWTService"]; });

/* harmony import */ var _login_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login.module */ "V1Pl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthConfig", function() { return _login_module__WEBPACK_IMPORTED_MODULE_4__["AuthConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return _login_module__WEBPACK_IMPORTED_MODULE_4__["LoginModule"]; });

/* harmony import */ var _login_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login.service */ "rq/s");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_LOGIN", function() { return _login_service__WEBPACK_IMPORTED_MODULE_5__["MODAL_LOGIN"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return _login_service__WEBPACK_IMPORTED_MODULE_5__["LoginService"]; });

/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.component */ "c2w7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Login", function() { return _login_component__WEBPACK_IMPORTED_MODULE_6__["Login"]; });

/* harmony import */ var _login_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login.interceptor */ "AagX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTTP_REQUEST_INITIALIZERS", function() { return _login_interceptor__WEBPACK_IMPORTED_MODULE_7__["HTTP_REQUEST_INITIALIZERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginInterceptor", function() { return _login_interceptor__WEBPACK_IMPORTED_MODULE_7__["LoginInterceptor"]; });

/* harmony import */ var _authentication_oauth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./authentication-oauth.service */ "+tpp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationOauthService", function() { return _authentication_oauth_service__WEBPACK_IMPORTED_MODULE_8__["AuthenticationOauthService"]; });

/* harmony import */ var _authentication_popup_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./authentication-popup.service */ "83gw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationPopupService", function() { return _authentication_popup_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationPopupService"]; });

/* harmony import */ var _messages_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./messages/index */ "adXJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enLogin", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_10__["enLogin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frLogin", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_10__["frLogin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deLogin", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_10__["deLogin"]; });














/***/ }),

/***/ "qAme":
/*!*************************************************!*\
  !*** ./projects/core/validation/messages/fr.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "validation": {
        "min": "La valeur doit être supérieure ou égale à {min}",
        "max": "La valeur ne peut pas être supérieure à {max}",
        "required": "Ce champ est obligatoire",
        "requiredTrue": "Ce champ doit être positionné",
        "email": "Une adresse e-mail valide est exigée",
        "minLength": "La valeur doit comporter au moins {requiredLength, plural, one {# caractère} autre que {# caractère}}",
        "maxLength": "La valeur ne peut comporter plus de {requiredLength, plural, one {# caractère} autre que {# caractères}}",
        "pattern": "La valeur est invalide",
        "unique": "Ce champ doit être unique",
        "integer": "La valeur doit être un entier",
        "number": "La valeur doit être un nombre",
        "date": "",
        "range": "La première valeur doit être inférieure ou égale à la seconde"
    }
});


/***/ }),

/***/ "qMjt":
/*!*************************************!*\
  !*** ./projects/core/base/error.ts ***!
  \*************************************/
/*! exports provided: SqErrorCode, SqError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqErrorCode", function() { return SqErrorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqError", function() { return SqError; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "Yvsk");

/**
 * Describes the error codes that can be set in the {@link SqError} class.
 */
var SqErrorCode;
(function (SqErrorCode) {
    SqErrorCode[SqErrorCode["loginCancelled"] = 0] = "loginCancelled";
    SqErrorCode[SqErrorCode["processedCredentialsError"] = 1] = "processedCredentialsError";
    SqErrorCode[SqErrorCode["principalSwitched"] = 2] = "principalSwitched";
    SqErrorCode[SqErrorCode["autoLoginError"] = 3] = "autoLoginError";
})(SqErrorCode || (SqErrorCode = {}));
/**
 * A subclass of the built-in {@link Error} class with added `code` and
 * `data` (optional) properties.
 */
class SqError extends Error {
    constructor(code, message, data) {
        super(message || SqError.message(code));
        this.code = code;
        this.name = "SqError";
        this.message = message || SqError.message(code);
        if (data) {
            this.data = data;
        }
    }
    /**
     * Return `true` if the passed `error` is a valid `SqErrorCode` instance.
     * If the optional `code` parameter is defined then only return true
     * if the code on `error` matches this value.
     */
    static is(error, code) {
        if (error instanceof SqError || (error instanceof Error && error.name === "SqError")) {
            return _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].isUndefined(code) || error.code === code;
        }
        return false;
    }
    /**
     * Return the message corresponding to the passed error `code`.
     */
    static message(code) {
        switch (code) {
            case SqErrorCode.loginCancelled: return "msg#error.loginCancelled";
            case SqErrorCode.processedCredentialsError: return "msg#error.processedCredentialsError";
            case SqErrorCode.principalSwitched: return "msg#error.principalSwitched";
            case SqErrorCode.autoLoginError: return "msg#error.autoLoginError";
            default: return "msg#error.unknownError";
        }
    }
}


/***/ }),

/***/ "qPpM":
/*!****************************************************!*\
  !*** ./projects/core/validation/messages/index.ts ***!
  \****************************************************/
/*! exports provided: enValidation, frValidation, deValidation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enValidation", function() { return enValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frValidation", function() { return frValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deValidation", function() { return deValidation; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sinequa/core/intl */ "B2Zq");
/* harmony import */ var _en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./en */ "R9OO");
/* harmony import */ var _fr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fr */ "qAme");
/* harmony import */ var _de__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./de */ "nx+a");





const enValidation = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _en__WEBPACK_IMPORTED_MODULE_2__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["enIntl"]);
const frValidation = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _fr__WEBPACK_IMPORTED_MODULE_3__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["frIntl"]);
const deValidation = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge({}, _de__WEBPACK_IMPORTED_MODULE_4__["default"], _sinequa_core_intl__WEBPACK_IMPORTED_MODULE_1__["deIntl"]);



/***/ }),

/***/ "quRv":
/*!******************************************!*\
  !*** ./projects/core/intl/public-api.ts ***!
  \******************************************/
/*! exports provided: AbstractIntlPipe, IntlInitializer, IntlModule, LOCALES_CONFIG, INTL_CONFIG, IntlService, MessagePipe, enIntl, frIntl, deIntl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _abstract_intl_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-intl.pipe */ "kEf5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AbstractIntlPipe", function() { return _abstract_intl_pipe__WEBPACK_IMPORTED_MODULE_0__["AbstractIntlPipe"]; });

/* harmony import */ var _import_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./import-moment */ "hS7N");
/* empty/unused harmony star reexport *//* harmony import */ var _intl_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intl.module */ "6z6W");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlInitializer", function() { return _intl_module__WEBPACK_IMPORTED_MODULE_2__["IntlInitializer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlModule", function() { return _intl_module__WEBPACK_IMPORTED_MODULE_2__["IntlModule"]; });

/* harmony import */ var _intl_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./intl.service */ "agta");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOCALES_CONFIG", function() { return _intl_service__WEBPACK_IMPORTED_MODULE_3__["LOCALES_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INTL_CONFIG", function() { return _intl_service__WEBPACK_IMPORTED_MODULE_3__["INTL_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IntlService", function() { return _intl_service__WEBPACK_IMPORTED_MODULE_3__["IntlService"]; });

/* harmony import */ var _message_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./message.pipe */ "cZrR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessagePipe", function() { return _message_pipe__WEBPACK_IMPORTED_MODULE_4__["MessagePipe"]; });

/* harmony import */ var _messages_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messages/index */ "gYqS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enIntl", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["enIntl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frIntl", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["frIntl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deIntl", function() { return _messages_index__WEBPACK_IMPORTED_MODULE_5__["deIntl"]; });









/***/ }),

/***/ "rAYq":
/*!**************************************!*\
  !*** ./projects/core/modal/index.ts ***!
  \**************************************/
/*! exports provided: Confirm, Prompt, ModalModule, MODAL_MODEL, ModalButton, MODAL_CONFIRM, MODAL_PROMPT, ModalService, ModalRef, enModal, frModal, deModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "Ltk/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Confirm", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Confirm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["Prompt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ModalModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_MODEL", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["MODAL_MODEL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalButton", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ModalButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_CONFIRM", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["MODAL_CONFIRM"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MODAL_PROMPT", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["MODAL_PROMPT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ModalService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ModalRef", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["ModalRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enModal", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["enModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frModal", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["frModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deModal", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["deModal"]; });




/***/ }),

/***/ "rq/s":
/*!**********************************************!*\
  !*** ./projects/core/login/login.service.ts ***!
  \**********************************************/
/*! exports provided: MODAL_LOGIN, LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MODAL_LOGIN", function() { return MODAL_LOGIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");
/* harmony import */ var _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sinequa/core/web-services */ "W/IO");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @sinequa/core/app-utils */ "/iXS");
/* harmony import */ var _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @sinequa/core/modal */ "rAYq");
/* harmony import */ var _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @sinequa/core/notification */ "wFkT");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./authentication.service */ "JpD7");












/**
 * An `InjectionToken` to set the component to use for the login modal dialog which is displayed
 * by the {@link LoginService} when performing a manual login. This makes the service independent
 * of any particular UI framework. If manual login is to be used a component must be configured by
 * providing this token.
 */
const MODAL_LOGIN = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('MODAL_LOGIN');
/**
 * A high-level service to manage user login
 */
class LoginService {
    constructor(startConfig, loginModal, router, appService, principalService, userSettingsService, modalService, notificationsService, authenticationService) {
        this.startConfig = startConfig;
        this.loginModal = loginModal;
        this.router = router;
        this.appService = appService;
        this.principalService = principalService;
        this.userSettingsService = userSettingsService;
        this.modalService = modalService;
        this.notificationsService = notificationsService;
        this.authenticationService = authenticationService;
        this._events = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]({ type: "session-changed" });
        this.beforeUnloadEventListener = (e) => {
            this._events.next({ type: "session-end" });
        };
        // NB unload doesn't fire reliably so we listen for beforeunload
        window.addEventListener("beforeunload", this.beforeUnloadEventListener);
    }
    ngOnDestroy() {
        this._events.complete();
        window.removeEventListener("beforeunload", this.beforeUnloadEventListener);
    }
    /**
     * Get an `Observable` stream of {@link SessionEvent} events emitted by the service
     */
    get events() {
        return this._events;
    }
    /**
     * Get the currently logged in {@link Principal}, if any. Note that a principal can exist
     * without the login being complete. For example, in the situation where access is denied to
     * the selected app.
     */
    get principal() {
        return this.principalService.principal;
    }
    setComplete() {
        const complete = this.complete;
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
    }
    /**
     * Perform a logout of the currently logged in user. [AppService.app]{@link AppService#app},
     * [PrincipalWebService.principal]{@link PrincipalWebService#prinicpal} and
     * [UserSettingsWebService.userSettings]{@link UserSettingsWebService#userSettings} are reset.
     * The `session-end` event is emitted
     */
    logout() {
        this._events.next({ type: "session-end" });
        this.appService.clear();
        this.principalService.principal = undefined;
        this.userSettingsService.userSettings = undefined;
        this.authenticationService.deactivateUserOverride();
        this.authenticationService.logout();
        this.setComplete();
    }
    /**
     * Override the current user to the user specified in `userOverride`. Only an administrator
     * is permitted to do this. They can revert to the normal login by calling this method with
     * `undefined`
     *
     * @param userOverride The user override
     */
    overrideUser(userOverride) {
        this.authenticationService.userOverride = userOverride;
        this.appService.clear();
        this.principalService.principal = undefined;
        this.userSettingsService.userSettings = undefined;
        this.setComplete();
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].delay().then(() => this.login());
    }
    switchPrincipal(principal) {
        if (!principal.isAdministrator) {
            this.authenticationService.deactivateUserOverride();
        }
        this.principalService.principal = principal;
        this.userSettingsService.userSettings = undefined;
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].delay().then(() => this.login());
    }
    /**
     * Initiate the user login process. The method attempts to retrieve
     * the [application configuration]{@link CCApp}, the
     * [logged in user]{@link Principal} and the [user settings]{@link UserSettings}.
     * If a user is not currently authenticated then authentication is performed using
     * the {@link AuthenticationService} - OAuth/SAML if configured on the Sinequa Server
     * or manual using a login modal dialog provided using the {@link MODAL_LOGIN} injection
     * token.
     */
    login() {
        const appName = this.appService.appName;
        if (!appName) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])({ error: "App not specified" });
        }
        let appNeeded;
        if (this.router) {
            const hash = window.location.hash.replace("#", "");
            const href = hash.split("?")[0];
            const params = new URLSearchParams(hash.split("?")[1]);
            const queryParams = {};
            params.forEach((v, k) => queryParams[k] = v);
            // Pick up any user override from the query string
            const overrideUser = queryParams["overrideUser"];
            const overrideDomain = queryParams["overrideDomain"];
            if (overrideUser) {
                this.authenticationService.userOverride = {
                    userName: overrideUser,
                    domain: overrideDomain
                };
                delete queryParams["overrideUser"];
                delete queryParams["overrideDomain"];
                const url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].makeURL(href);
                this.router.navigate([url.pathname], { queryParams });
            }
        }
        const makeObservables = () => {
            const observables = {
                app: undefined,
                principal: undefined,
                userSettings: undefined
            };
            if (!this.appService.app || (appName && this.appService.app.name !== appName)) {
                appNeeded = true;
                observables.app = this.appService.init();
            }
            else {
                observables.app = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.appService.app);
            }
            let loadUserSettings = false;
            if (!this.principalService.principal) {
                loadUserSettings = true;
                observables.principal = this.principalService.load();
            }
            else {
                observables.principal = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.principalService.principal);
            }
            if (!this.userSettingsService.userSettings || loadUserSettings) {
                observables.userSettings = this.userSettingsService.load();
            }
            else {
                observables.userSettings = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.userSettingsService.userSettings);
            }
            return observables;
        };
        const observable = this.authenticationService.autoAuthenticate()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])((success) => {
            const observables = makeObservables();
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["forkJoin"])(observables);
        }));
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].subscribe(observable, (result) => {
            console.log("loginService.login ok: ", result);
            this.setComplete();
            if (appNeeded) {
                this._events.next({ type: "session-start" });
            }
        }, (error) => {
            console.log("loginService.login failed: ", error);
            // proceed to logout to clean process
            this.logout();
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        });
        return observable;
    }
    getAutomaticProvider() {
        if (this.startConfig.providers) {
            return Object.keys(this.startConfig.providers).find((value) => {
                const provider = this.startConfig.providers && this.startConfig.providers[value];
                return !!provider && provider.automatic;
            });
        }
        return undefined;
    }
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
    getCredentials(response, acceptCurrent) {
        if (acceptCurrent && this.authenticationService.processedCredentials) {
            return Promise.resolve(); // initiate retry
        }
        if (!this.startConfig.usePopupForLogin && this.authenticationService.autoLoginActive) {
            return this.authenticationService.autoAuthenticate().toPromise()
                .then(result => {
                if (result /*auto-authentication initiated*/) {
                    return Promise.reject("performing auto login");
                }
                else {
                    return undefined;
                }
            });
        }
        let firstCaller = false;
        const automaticProvider = this.getAutomaticProvider();
        if (automaticProvider) {
            if (!this.automaticLoginPromise) {
                this.automaticLoginPromise = this.authenticationService.authenticateWithProvider(automaticProvider).toPromise();
                firstCaller = true;
            }
            return this.automaticLoginPromise
                .then((result) => {
                // NB response should be the return value from JOAuth/JSaml json methods
                // It can be undefined eg if the popup fails to open
                this.automaticLoginPromise = undefined;
                return result ? Promise.resolve() : Promise.reject("popup failed?");
            })
                .catch((reason) => {
                this.automaticLoginPromise = undefined;
                const error = new _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqError"](_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqErrorCode"].autoLoginError);
                if (firstCaller) {
                    this.notificationsService.error(error.message);
                }
                throw error;
            });
        }
        const credentials = {};
        if (this.authenticationService.processedCredentials) {
            credentials.userName = this.authenticationService.processedCredentials.userName;
        }
        if (!this.loginModalPromise) {
            this.loginModalPromise = this.modalService.open(this.loginModal, { model: credentials });
            firstCaller = true;
        }
        return this.loginModalPromise
            .then((result) => {
            this.loginModalPromise = undefined;
            // result === ModalResult.Yes is a special return from Login when using AuthenticationService.authenticateWithProvider
            if (result === -1 /* OK */ || result === -3 /* Yes */) {
                if (!this.processCredentialsPromise) {
                    this.processCredentialsPromise = result === -3 /* Yes */ ?
                        Promise.resolve(undefined) :
                        this.authenticationService.authenticate(credentials, response);
                }
                return this.processCredentialsPromise
                    .then((value) => {
                    this.processCredentialsPromise = undefined;
                    if (result !== -3 /* Yes */) {
                        this.authenticationService.processedCredentials = value;
                    }
                    if (!this.checkPrincipalPromise) {
                        this.checkPrincipalPromise = this.principalService.get(false).toPromise();
                    }
                    return this.checkPrincipalPromise
                        .then((principal) => {
                        this.checkPrincipalPromise = undefined;
                        if (!this.principalService.principal || this.principalService.principal.id === principal.id) {
                            // no current principal OR prinicpal unchanged - initiate retry
                            return Promise.resolve();
                        }
                        const error = new _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqError"](_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqErrorCode"].principalSwitched);
                        if (firstCaller) {
                            this.switchPrincipal(principal);
                            this.notificationsService.info(error.message);
                        }
                        throw error;
                    })
                        .catch((reason) => {
                        this.checkPrincipalPromise = undefined;
                        throw reason;
                    });
                })
                    .catch((reason) => {
                    this.processCredentialsPromise = undefined;
                    if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqError"].is(reason, _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqErrorCode"].principalSwitched)) {
                        throw reason;
                    }
                    throw new _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqError"](_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqErrorCode"].processedCredentialsError);
                });
            }
            else {
                this.authenticationService.processedCredentials = undefined; // clean slate
                const error = new _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqError"](_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqErrorCode"].loginCancelled);
                if (firstCaller) {
                    this.notificationsService.info(error.message);
                }
                throw error;
            }
        })
            .catch((reason) => {
            if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqError"].is(reason, _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["SqErrorCode"].principalSwitched)) {
                this.authenticationService.processedCredentials = undefined; // clean slate
            }
            this.loginModalPromise = undefined;
            throw reason;
        });
    }
}
LoginService.ɵfac = function LoginService_Factory(t) { return new (t || LoginService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MODAL_LOGIN), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_6__["AppService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["PrincipalWebService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["UserSettingsWebService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_modal__WEBPACK_IMPORTED_MODULE_7__["ModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_sinequa_core_notification__WEBPACK_IMPORTED_MODULE_8__["NotificationsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"])); };
LoginService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LoginService, factory: LoginService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["START_CONFIG"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Type"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [MODAL_LOGIN]
            }] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }] }, { type: _sinequa_core_app_utils__WEBPACK_IMPORTED_MODULE_6__["AppService"] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["PrincipalWebService"] }, { type: _sinequa_core_web_services__WEBPACK_IMPORTED_MODULE_4__["UserSettingsWebService"] }, { type: _sinequa_core_modal__WEBPACK_IMPORTED_MODULE_7__["ModalService"] }, { type: _sinequa_core_notification__WEBPACK_IMPORTED_MODULE_8__["NotificationsService"] }, { type: _authentication_service__WEBPACK_IMPORTED_MODULE_9__["AuthenticationService"] }]; }, null); })();


/***/ }),

/***/ "sXFN":
/*!****************************************************************!*\
  !*** ./projects/core/web-services/start-config.web.service.ts ***!
  \****************************************************************/
/*! exports provided: START_CONFIG, StartConfigWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "START_CONFIG", function() { return START_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartConfigWebService", function() { return StartConfigWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var atomicjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! atomicjs */ "jv8/");
/* harmony import */ var atomicjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(atomicjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");





/**
 * An {@link InjectionToken} to access the app's {@link StartConfig} instance
 */
const START_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]("START_CONFIG");
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
        const browserUrl = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].makeURL(window.location.href);
        let parts = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].split(browserUrl.pathname, "/");
        const appSpecifierIndex = parts.findIndex(value => _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].eqNCN(value, "app", "app-debug"));
        if (appSpecifierIndex !== -1 && appSpecifierIndex < parts.length - 1) {
            const appSpecifier = parts[appSpecifierIndex];
            startConfig.app = parts[appSpecifierIndex + 1];
            startConfig.production = appSpecifier === "app" ? true : false;
            parts = parts.slice(0, appSpecifierIndex);
        }
        startConfig.url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(browserUrl.origin, ...parts);
        return startConfig;
    }
    initStartConfig() {
        const defaultStartConfig = this.getDefaultStartConfig();
        const initialStartConfig = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].copy(this.startConfig);
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].extend(this.startConfig, defaultStartConfig, initialStartConfig);
        const browserUrl = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].makeURL(window.location.href);
        const url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].makeURL(this.startConfig.url);
        let apiPath = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(url.pathname, StartConfigWebService.API_PATH);
        let applicationPath = url.pathname;
        const corsActive = url.origin !== browserUrl.origin;
        if (corsActive) {
            apiPath = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(url.origin, apiPath);
            applicationPath = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(url.origin, applicationPath);
        }
        this.startConfig.origin = url.origin;
        this.startConfig.applicationPath = applicationPath;
        this.startConfig.apiPath = apiPath;
        this.startConfig.corsActive = corsActive;
        this.startConfig.browserUrl = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(browserUrl.origin, browserUrl.pathname);
    }
    /**
     * Fetches pre-login app configuration from the Sinequa server and merges it
     * into the start config instance
     *
     * @returns An observable of the start config after being merged with the pre-login app configuration
     */
    fetchPreLoginAppConfig() {
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(observer => {
            let _url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(this.startConfig.apiPath, "app");
            _url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addSearchParams(_url, {
                app: this.startConfig.app,
                preLogin: true
            });
            atomicjs__WEBPACK_IMPORTED_MODULE_2___default()(_url, {
                headers: {
                    "sinequa-force-camel-case": true
                }
            })
                .then(response => {
                const initialStartConfig = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].copy(this.startConfig);
                _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].extend(this.startConfig, response.data, initialStartConfig);
                const versionDate = this.startConfig.versionDate;
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isString(versionDate)) { // it will be
                    this.startConfig.versionDate = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].fromSysDateStr(versionDate);
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
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"].create(observer => {
            if (!url) {
                const _url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].makeURL(window.location.href);
                url = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].addUrl(_url.pathname, "sinequa-config.json");
            }
            atomicjs__WEBPACK_IMPORTED_MODULE_2___default()(url)
                .then(response => {
                // If the config file is empty or not valid json we'll most likely get a string for data
                let serverConfig = response.data;
                if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_3__["Utils"].isObject(serverConfig)) {
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
StartConfigWebService.ɵfac = function StartConfigWebService_Factory(t) { return new (t || StartConfigWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](START_CONFIG, 8)); };
StartConfigWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: StartConfigWebService, factory: StartConfigWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StartConfigWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [START_CONFIG]
            }] }]; }, null); })();


/***/ }),

/***/ "uZzd":
/*!*******************************************!*\
  !*** ./projects/core/intl/messages/en.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "system": {
        "date": "{time, selectordinal, =0 {{date, date}} other {{date, date}, {date, time, medium}}}",
        "number": "{value, number}",
        "boolean": "{value, select, true {true} other {false}}",
        "percent": "{value, number, percent}",
        "fieldSeparator": ": ",
        "memorySize": {
            "bytes": "{value, number, sqZeroDecimalPlaces} B",
            "kb": "{value, number, sqZeroDecimalPlaces} KB",
            "mb": "{value, number, sqOneDecimalPlace} MB",
            "gb": "{value, number, sqTwoDecimalPlaces} GB",
            "tb": "{value, number, sqThreeDecimalPlaces} TB",
            "pb": "{value, number, sqFourDecimalPlaces} PB"
        }
    },
    "error": {
        "serverError": "Server error",
        "loginCancelled": "login cancelled",
        "processedCredentialsError": "unable to get processed credentials",
        "autoLoginError": "login failed",
        "principalSwitched": "the logged in user has changed",
        "userOverrideFailure": "unable to override user",
        "responseLoadFailure": "failed to load response",
        "unknownError": "unknown error"
    },
    "language": {
        "ar": "Arabic",
        "da": "Danish",
        "de": "German",
        "el": "Greek",
        "en": "English",
        "es": "Spanish",
        "fi": "Finnish",
        "fr": "French",
        "it": "Italian",
        "ja": "Japanese",
        "ko": "Korean",
        "nl": "Dutch",
        "no": "Norwegian",
        "pl": "Polish",
        "pt": "Portuguese",
        "ro": "Romanian",
        "ru": "Russian",
        "sv": "Swedish",
        "th": "Thai",
        "zh": "Traditional Chinese",
        "zs": "Simplified Chinese",
        "zz": "Unknown"
    }
});


/***/ }),

/***/ "unr6":
/*!************************************************!*\
  !*** ./projects/core/app-utils/query/query.ts ***!
  \************************************************/
/*! exports provided: advancedFacetPrefix, Query */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "advancedFacetPrefix", function() { return advancedFacetPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return Query; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");

const advancedFacetPrefix = "advanced_";
/**
 * Represents a query for retrieving search results from a Sinequa search engine.
 *
 * The properties are described in the {@link IQuery} interface
 */
class Query {
    constructor(name) {
        this.name = name;
    }
    /**
     * Return a copy of the passed query
     */
    static copy(query) {
        if (!query) {
            return query;
        }
        return query.copy();
    }
    /**
     * Return `true` if the query has fulltext search elements
     */
    get hasRelevance() {
        if (!_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isEmpty(this.text)) {
            return true;
        }
        if (this.findSelect("refine")) {
            return true;
        }
        return false;
    }
    /**
     * Add a select filter to the query
     *
     * @param expr The fielded search expression to filter the results
     * @param facet The name of the associated facet
     */
    addSelect(expr, facet) {
        return this.pushSelect({
            expression: expr,
            facet: facet || ""
        });
    }
    /**
     * Adds a new `Select` object to the end of the query's `selects`
     */
    pushSelect(select) {
        if (!this.select) {
            this.select = [];
        }
        return this.select.push(select);
    }
    /**
     * Remove the last `Select` object from the `selects` and return it
     */
    popSelect() {
        if (!this.select) {
            return undefined;
        }
        return this.select.pop();
    }
    /**
     * Remove the `Select` object identified by `indexOrFacet`
     *
     * @param indexOrFacet either an index in the `selects` array or a facet name
     * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
     */
    removeSelect(indexOrFacet, all = false) {
        if (!this.select) {
            return;
        }
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isString(indexOrFacet)) {
            // indexOrFacet is a facet name
            for (let i = this.select.length - 1; i >= 0; i--) {
                const _select = this.select[i];
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(_select.facet, indexOrFacet)) {
                    this.select.splice(i, 1);
                    if (this.select.length === 0) {
                        delete this.select; // Clean the query if no more select
                        return;
                    }
                    if (!all) {
                        return;
                    }
                }
            }
        }
        else {
            if (indexOrFacet < 0 || indexOrFacet >= this.select.length) {
                return;
            }
            this.select.splice(indexOrFacet, 1);
            if (this.select.length === 0) {
                delete this.select;
            }
        }
    }
    /**
     * Replace a `Select` with another
     *
     * @param index The index in the `selects` array of the `Select to replace
     * @param select The `Select` to use as a replacement
     */
    replaceSelect(index, select) {
        if (!this.select) {
            return;
        }
        this.select.splice(index, 1, select);
    }
    /**
     * Find the index of the nth `Select` object matching the passed facet name
     *
     * @param facet A facet name
     * @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
     */
    findSelectIndex(facet, ordinal = 0) {
        if (!this.select) {
            return -1;
        }
        let index = 0;
        let facetOrdinal = 0;
        let facetIndex = -1;
        for (const select of this.select) {
            if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(facet, select.facet)) {
                facetIndex = index;
                if (facetOrdinal === ordinal) {
                    break;
                }
                facetOrdinal++;
            }
            index++;
        }
        return facetIndex;
    }
    /**
     * Find the first `Select` matching the passed facet name
     *
     * @param facet A facet name
     * @param fromEnd If `true` start searching backwards from the last `Select`
     */
    findSelect(facet, fromEnd = true) {
        const facetSelectIndex = this.findSelectIndex(facet, fromEnd ? -1 : 0);
        return facetSelectIndex >= 0 ? this.select && this.select[facetSelectIndex] : undefined;
    }
    /**
     * Return the last `Select` object
     */
    lastSelect() {
        if (!this.select) {
            return undefined;
        }
        return this.select[this.select.length - 1];
    }
    /**
     * Return the number of `Select` objects
     */
    get selectLength() {
        if (!this.select) {
            return 0;
        }
        return this.select.length;
    }
    /**
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expr, aggregation) {
        if (!this.open || !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(this.open)) {
            this.open = [];
        }
        return this.open.push({
            expression: expr,
            aggregation
        });
    }
    /**
     * Clear all fields in the query except the name
     */
    clear() {
        const name = this.name;
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].clearObject(this);
        this.name = name;
    }
    /**
     * Remove advanced search select(s) from the query
     */
    toStandard() {
        var _a;
        const advancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter((select) => select.facet && select.facet.startsWith(advancedFacetPrefix));
        advancedSelect === null || advancedSelect === void 0 ? void 0 : advancedSelect.forEach((select) => this.removeSelect(select.facet, true));
        return this;
    }
    /**
     * Return a copy of this query
     */
    copy() {
        const query = new Query(this.name);
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].copy(this, query);
        return query;
    }
    /**
     * Return a copy of this query but without any advanced select
     */
    copyStandard() {
        const query = this.copy();
        return query.toStandard();
    }
    /**
     * Remove all properties from the query except advanced search select(s) and optionally `text`
     *
     * @param withText If `true` do not remove the `text` field
     */
    toAdvanced(withText = false) {
        var _a;
        for (const property in this) {
            if (this.hasOwnProperty(property) && !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(property, "select") && (!withText || !_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(property, "text"))) {
                delete this[property];
            }
        }
        const notAdvancedSelect = (_a = this.select) === null || _a === void 0 ? void 0 : _a.filter((select) => select.facet && !select.facet.startsWith(advancedFacetPrefix));
        notAdvancedSelect === null || notAdvancedSelect === void 0 ? void 0 : notAdvancedSelect.forEach((select) => this.removeSelect(select.facet));
        return this;
    }
    /**
     * Return a copy of this query including just the advanced fields and optionally `text`
     *
     * @param withText If `true` include the `text` field
     */
    copyAdvanced(withText = false) {
        const query = this.copy();
        return query.toAdvanced(withText);
    }
    /**
     * Tests whether this query has advanced search selections
     */
    hasAdvanced() {
        var _a;
        return !!((_a = this.select) === null || _a === void 0 ? void 0 : _a.find(s => s.facet && s.facet.startsWith(advancedFacetPrefix)));
    }
    /**
     * Initialize this query from the passed JSON string
     *
     * @param jquery JSON in string form
     */
    fromJson(jquery) {
        this.clear();
        const query = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].fromJson(jquery);
        // convert select and open
        const select = query.select;
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(select)) {
            query.select = select.map((value) => {
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(value)) {
                    return {
                        expression: value[0],
                        facet: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        const open = query.open;
        if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(open)) {
            query.open = open.map((value) => {
                if (_sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].isArray(value)) {
                    return {
                        expression: value[0],
                        aggregation: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].extend(this, query);
        return this;
    }
    /**
     * Returns a JSON representation of this query where `Select` and `Open` objects are expressed as tuple arrays for conciseness
     */
    toJsonForQueryString() {
        const o = {};
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].merge(o, this);
        if (this.select) {
            o.select = this.select.map((value) => {
                const a = [value.expression];
                if (value.facet) {
                    a.push(value.facet);
                }
                return a;
            });
        }
        if (this.open) {
            o.open = this.open.map((value) => [value.expression, value.aggregation]);
        }
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toJson(o);
    }
    /**
     * Return a hash value of this query that excludes any pagination parameters
     */
    hash() {
        const obj = {};
        _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].mergeAndSort(obj, this);
        // remove pagination
        delete obj.page;
        delete obj.pageSize;
        const str = _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].toJson(obj);
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].sha512(str);
    }
}


/***/ }),

/***/ "vn9G":
/*!***********************************************************!*\
  !*** ./projects/core/web-services/dataset.web.service.ts ***!
  \***********************************************************/
/*! exports provided: DatasetWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatasetWebService", function() { return DatasetWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./http-client */ "4+vC");






/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
class DatasetWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(d => d.datasets[query]));
    }
    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     */
    getAll(webServiceName, parameters = {}) {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post(url, { parameters })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(d => d.datasets));
    }
}
DatasetWebService.endpoint = "search.dataset";
DatasetWebService.ɵfac = function DatasetWebService_Factory(t) { return new (t || DatasetWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"])); };
DatasetWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DatasetWebService, factory: DatasetWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DatasetWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_4__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "wFkT":
/*!*********************************************!*\
  !*** ./projects/core/notification/index.ts ***!
  \*********************************************/
/*! exports provided: NotificationsService, NotificationsInterceptor, NotificationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _public_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public-api */ "AWjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationsService", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["NotificationsService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationsInterceptor", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["NotificationsInterceptor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotificationModule", function() { return _public_api__WEBPACK_IMPORTED_MODULE_0__["NotificationModule"]; });




/***/ }),

/***/ "wSrR":
/*!***********************************************************!*\
  !*** ./projects/core/web-services/preview.web.service.ts ***!
  \***********************************************************/
/*! exports provided: PreviewWebService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewWebService", function() { return PreviewWebService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.service */ "yC4/");
/* harmony import */ var _start_config_web_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./start-config.web.service */ "sXFN");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _http_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./http-client */ "4+vC");







/**
 * A service for calling the preview web service
 */
class PreviewWebService extends _http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"] {
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
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
    }
    /**
     * Gets document's preview HTML content
     *
     * @param url The document preview URL
     * @returns
     */
    getHtmlPreview(url) {
        return this.httpClient.get(url, { responseType: "text" }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(err)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["shareReplay"])(1));
    }
}
PreviewWebService.ɵfac = function PreviewWebService_Factory(t) { return new (t || PreviewWebService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"])); };
PreviewWebService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PreviewWebService, factory: PreviewWebService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreviewWebService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_start_config_web_service__WEBPACK_IMPORTED_MODULE_3__["START_CONFIG"]]
            }] }, { type: _http_client__WEBPACK_IMPORTED_MODULE_5__["SqHttpClient"] }]; }, null); })();


/***/ }),

/***/ "wZGT":
/*!********************************************!*\
  !*** ./projects/core/login/messages/de.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    "modal": {
        "login": {
            "title": "Anmeldung",
            "userName": "Benutzername",
            "password": "Passwort",
            "singleSignOn": "Einmalanmeldung (Single sign-on)",
            "signInWith": "Anmelden mit..."
        }
    }
});


/***/ }),

/***/ "xI56":
/*!***********************************************!*\
  !*** ./projects/core/base/pattern-matcher.ts ***!
  \***********************************************/
/*! exports provided: PatternType, Pattern, Patterns, PatternMatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternType", function() { return PatternType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pattern", function() { return Pattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Patterns", function() { return Patterns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternMatcher", function() { return PatternMatcher; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "Yvsk");

/**
 * Defines the different pattern types
 * `Empty`: no pattern
 * `RegExp`: a regular expression pattern
 * `Value`: a literal value
 */
var PatternType;
(function (PatternType) {
    PatternType[PatternType["Empty"] = 0] = "Empty";
    PatternType[PatternType["RegExp"] = 1] = "RegExp";
    // WildCard = 2,
    PatternType[PatternType["Value"] = 3] = "Value";
})(PatternType || (PatternType = {}));
/**
 * A class that represents a single pattern. The pattern type is deduced automatically from the input pattern text.
 *
 * `<empty string>` => `Empty`
 * `<pattern with wildcards ?*>` => `RegExp` (wildcards are converted to regular expressions)
 * `<pattern starting with ~>` => `RegExp` (the text following the ~ character is treated as a regular expression)
 * `<any other value>` => `Value` (a literal value that is matched as-is)
 */
class Pattern {
    constructor(pattern) {
        if (!pattern) {
            this.clear();
        }
        else {
            this.load(pattern);
        }
    }
    get type() {
        return this._type;
    }
    get text() {
        return this._text;
    }
    static getPatternType(pattern) {
        if (!pattern) {
            return PatternType.Empty;
        }
        if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
            return PatternType.RegExp;
        }
        return PatternType.Value;
    }
    static isPattern(pattern) {
        if (!pattern) {
            return false;
        }
        if (pattern[0] === "~" || pattern.includes("*") || pattern.includes("?")) {
            return true;
        }
        return false;
    }
    static doMatch(pattern, text) {
        const _pattern = new Pattern();
        _pattern.load(pattern);
        return _pattern.isMatch(text);
    }
    static wildcardToRegex(pattern) {
        if (!pattern) {
            return pattern;
        }
        return "^" + _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].regExEscape(pattern).replace("\\*", ".*").replace("\\?", ".") + "$";
    }
    static cleanPattern(s) {
        if (!s) {
            return s;
        }
        const sb = [];
        let lastIsStar = false;
        for (const ch of s) {
            if (ch === "*") {
                if (!lastIsStar) {
                    lastIsStar = true;
                    sb.push(ch);
                }
            }
            else {
                lastIsStar = false;
                sb.push(ch);
            }
        }
        return sb.join("");
    }
    clear() {
        this.reg = undefined;
        this._text = undefined;
        this.preparedPattern1 = undefined;
        // this.preparedPattern2 = undefined;
        this._type = PatternType.Empty;
    }
    isEmpty() {
        return this._type === PatternType.Empty;
    }
    load(pattern) {
        this.clear();
        try {
            let s = pattern;
            this._text = pattern;
            this._type = Pattern.getPatternType(s);
            if (this._type === PatternType.Empty) {
                return true;
            }
            if (this._type === PatternType.Value) {
                this.preparedPattern1 = s;
                return true;
            }
            if (this._type === PatternType.RegExp) {
                if (s[0] === "~") {
                    s = s.substring(1);
                }
                else {
                    s = Pattern.wildcardToRegex(Pattern.cleanPattern(s));
                }
                this.preparedPattern1 = s;
                this.reg = new RegExp(s, "i");
                return true;
            }
            return false;
        }
        catch (e) {
            console.log(`Pattern.Load '${pattern}' error:`, e);
            this.clear();
            return false;
        }
    }
    getTypeValueText() {
        if (this.type === PatternType.Value) {
            return this.preparedPattern1;
        }
        return undefined;
    }
    getTypeRegexPattern() {
        if (this.type === PatternType.RegExp) {
            return this.preparedPattern1;
        }
        return undefined;
    }
    isTypeValue() {
        return this.type === PatternType.Value;
    }
    isMatch(text) {
        var _a;
        text = text || "";
        switch (this._type) {
            default:
            case PatternType.Empty:
                return true;
            case PatternType.Value:
                return _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].eqNC(text, this.preparedPattern1 || "");
            case PatternType.RegExp:
                return ((_a = this.reg) === null || _a === void 0 ? void 0 : _a.test(text)) || false;
        }
    }
}
class Patterns {
    constructor(text) {
        this.text = text;
    }
    clear() {
        this._preparedPatterns = undefined;
        this._values = undefined;
        this._isEmpty = true;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (value === this._text) {
            return;
        }
        this._text = value;
        const l = _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].split(this._text || "", ";");
        this.innerSetList(l);
    }
    getTypeCount(type) {
        if (!this._preparedPatterns) {
            return 0;
        }
        if (type === PatternType.Value) {
            return !!this._values ? Object.keys(this._values).length : 0;
        }
        let count = 0;
        for (const pattern of this._preparedPatterns) {
            if (pattern.type === type) {
                count++;
            }
        }
        return count;
    }
    innerSetList(l) {
        this._preparedPatterns = undefined;
        this._values = undefined;
        this._isEmpty = true;
        if (!!l) {
            for (const s of l) {
                if (!s) {
                    continue;
                }
                const pattern = new Pattern();
                if (pattern.load(s)) {
                    if (!this._preparedPatterns) {
                        this._preparedPatterns = [];
                    }
                    this._preparedPatterns.push(pattern);
                }
            }
        }
        if (this._preparedPatterns) {
            const c = this._preparedPatterns.length;
            if (c > 0) {
                this._isEmpty = false;
            }
            for (let i = c - 1; i >= 0; i--) {
                const pattern = this._preparedPatterns[i];
                //do values
                if (pattern.isTypeValue()) {
                    if (!this._values) {
                        this._values = {};
                    }
                    const val = pattern.getTypeValueText() || "";
                    this._values[val] = true;
                    this._preparedPatterns.splice(i, 1);
                }
            }
        }
    }
    get list() {
        return _utils__WEBPACK_IMPORTED_MODULE_0__["Utils"].split(this.text || "", ";");
    }
    set list(value) {
        this.text = !!value ? value.join(";") : undefined;
        this.innerSetList(value);
    }
    setText(list) {
        this.list = list;
    }
    isEmpty() {
        return this._isEmpty;
    }
    hasPatterns() {
        return !this.isEmpty();
    }
    isMatch(name, logdisplay) {
        if (this.isEmpty()) {
            return true;
        }
        if (!!this._values) {
            if (this._values[name]) {
                if (!!logdisplay) {
                    console.log(logdisplay, ` : the pattern '${name}' matches the value '${name}'`);
                }
                return true;
            }
        }
        if (!!this._preparedPatterns) {
            for (const pattern of this._preparedPatterns) {
                if (!pattern) {
                    continue;
                }
                if (pattern.isTypeValue()) {
                    continue;
                }
                if (pattern.isMatch(name)) {
                    if (!!logdisplay) {
                        console.log(logdisplay, ` : the pattern '${pattern.text}' matches the value '${name}'`);
                    }
                    return true;
                }
            }
        }
        return false;
    }
}
/**
 * This class is used to process "included" and "excluded" patterns typically specified in the Sinequa configuration.
 */
class PatternMatcher {
    constructor(includedLogDisplay, excludedLogDisplay) {
        this.includedPattern = new Patterns();
        this.excludedPattern = new Patterns();
        this.includedLogDisplay = includedLogDisplay;
        this.excludedLogDisplay = excludedLogDisplay;
    }
    get included() {
        return this.includedPattern.text;
    }
    set included(value) {
        this.includedPattern.text = value;
    }
    get excluded() {
        return this.excludedPattern.text;
    }
    set excluded(value) {
        this.excludedPattern.text = value;
    }
    set includedList(value) {
        this.includedPattern.list = value;
    }
    set excludedList(value) {
        this.excludedPattern.list = value;
    }
    hasPatterns() {
        return this.includedPattern.hasPatterns() || this.excludedPattern.hasPatterns();
    }
    isExcluded(name) {
        return !this.isIncluded(name);
    }
    isIncluded(name) {
        if (!name) {
            return true;
        }
        if (this.includedPattern.hasPatterns()) {
            if (this.excludedPattern.hasPatterns()) {
                if (this.excludedPattern.isMatch(name, this.excludedLogDisplay)) {
                    return false;
                }
            }
            if (!this.includedPattern.isMatch(name, this.includedLogDisplay)) {
                return false;
            }
            return true;
        }
        else if (this.excludedPattern.hasPatterns()) {
            if (this.excludedPattern.isMatch(name, this.excludedLogDisplay)) {
                return false;
            }
            return true;
        }
        return true;
    }
    isExplicitlyIncluded(name) {
        return this.includedPattern.hasPatterns() && this.includedPattern.isMatch(name, this.includedLogDisplay);
    }
    isExplicitlyExcluded(name) {
        return this.excludedPattern.hasPatterns() && this.excludedPattern.isMatch(name, this.excludedLogDisplay);
    }
}


/***/ }),

/***/ "xZxX":
/*!******************************************************************!*\
  !*** ./projects/core/load-component/load-component.directive.ts ***!
  \******************************************************************/
/*! exports provided: LoadComponentDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadComponentDirective", function() { return LoadComponentDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _load_component_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load-component.service */ "Bcrk");



/**
 * A directive that uses the {@link LoadComponentService} to dynamically load a component.
 * The loaded component's lifecycle is automatically managed with changes to the directive's
 * `options` reflected to the component by rebinding it using {@link LoadComponentService}
 */
class LoadComponentDirective {
    constructor(loadComponentService, viewContainerRef) {
        this.loadComponentService = loadComponentService;
        this.viewContainerRef = viewContainerRef;
        /**
         * Used to emit events when the component is created and destroyed
         */
        this.eventEmitter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * Handles any changes to the input `options`. On the first call the component is loaded
     * and bound. Subsequent changes to the `options` are handled by rebinding the component unless
     * the component type to load changes in which case the current component is unloaded before
     * loading the new component.
     *
     * The component is loaded using the `ViewContainerRef` associated with the directive
     */
    ngOnChanges() {
        if (this.loadedComponent) {
            if (this.currentComponent === this.options.component) {
                this.loadComponentService.bindComponent(this.options, this.loadedComponent);
                return;
            }
            this.loadComponentService.unbindComponent(this.loadedComponent);
            this.loadedComponent.componentRef.destroy();
            this.eventEmitter.emit({ componentRef: undefined });
        }
        this.loadedComponent = this.loadComponentService.loadComponent(this.options, this.viewContainerRef);
        this.currentComponent = this.options.component;
        this.eventEmitter.emit({ componentRef: !!this.loadedComponent ? this.loadedComponent.componentRef : undefined });
    }
    /**
     * Unbinds the loaded component. It is not destroyed here as angular will automatically destroy
     * the component at the same time as this directive is destroyed as they share the same `ViewContainerRef`
     */
    ngOnDestroy() {
        if (this.loadedComponent) {
            this.loadComponentService.unbindComponent(this.loadedComponent);
            this.eventEmitter.emit({ componentRef: undefined });
        }
    }
}
LoadComponentDirective.ɵfac = function LoadComponentDirective_Factory(t) { return new (t || LoadComponentDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_load_component_service__WEBPACK_IMPORTED_MODULE_1__["LoadComponentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
LoadComponentDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: LoadComponentDirective, selectors: [["", "sqLoadComponent", ""]], inputs: { options: ["sqLoadComponent", "options"] }, outputs: { eventEmitter: "sqLoadComponent" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoadComponentDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: "[sqLoadComponent]"
            }]
    }], function () { return [{ type: _load_component_service__WEBPACK_IMPORTED_MODULE_1__["LoadComponentService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] }]; }, { options: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ["sqLoadComponent"]
        }], eventEmitter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
            args: ["sqLoadComponent"]
        }] }); })();


/***/ }),

/***/ "xwU4":
/*!**************************************!*\
  !*** ./projects/core/base/map-of.ts ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "y1eU":
/*!************************************!*\
  !*** ./projects/core/base/json.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "yC4/":
/*!****************************************************!*\
  !*** ./projects/core/web-services/http.service.ts ***!
  \****************************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sinequa/core/base */ "0Jsi");

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
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].addUrl(this.startConfig.apiPath, api);
    }
    /**
     * Makes an Angular {@link HttpParams} object from a basic Javascript object
     *
     * @param params A map of parameter values
     */
    makeParams(params) {
        return _sinequa_core_base__WEBPACK_IMPORTED_MODULE_0__["Utils"].makeHttpParams(params);
    }
}


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map