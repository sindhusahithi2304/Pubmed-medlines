import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdirectiveInject, ɵɵdefineDirective, ɵɵlistener, Directive, Input, HostListener, ɵɵdefineNgModule, ɵɵdefineInjector, APP_BOOTSTRAP_LISTENER, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { HttpService, START_CONFIG, PrincipalWebService, SqHttpClient } from '@sinequa/core/web-services';
import { Utils } from '@sinequa/core/base';
import { AppService } from '@sinequa/core/app-utils';
import { LoginService, HTTP_REQUEST_INITIALIZERS } from '@sinequa/core/login';
import { IntlService } from '@sinequa/core/intl';
import { SearchService, BsSearchModule } from '@sinequa/components/search';
import { CommonModule } from '@angular/common';

class MlAuditService extends HttpService {
    constructor(startConfig, appService, loginService, principalService, intlService, httpClient, searchService) {
        super(startConfig);
        this.appService = appService;
        this.loginService = loginService;
        this.principalService = principalService;
        this.intlService = intlService;
        this.httpClient = httpClient;
        this.searchService = searchService;
        this.requestInitializer = (request) => {
            request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
            return true;
        };
    }
    newTimestamp() {
        return (new Date()).toISOString();
    }
    calcDwellTime(event, defaultValue) {
        if (!event.timestamp) {
            return defaultValue;
        }
        return Date.now() - (new Date(event.timestamp)).getTime();
    }
    startSession() {
        this.endSession();
        if (this.principalService.principal) {
            this.session = {
                type: "session",
                subType: "start",
                id: Utils.guid(false),
                timestamp: this.newTimestamp(),
                userId: this.principalService.principal.userId,
                isAdmin: this.principalService.principal.isAdministrator,
                locale: this.intlService.currentLocale.name
            };
        }
    }
    endSession() {
        this.endQuery();
        if (this.session && this.session.sent) {
            this.notifyEvent({
                type: "session",
                subType: "end",
                id: this.session.id,
                dwellTime: this.calcDwellTime(this.session)
            });
        }
        this.session = undefined;
        this.query = undefined;
        this.results = undefined;
    }
    newQuery(event) {
        this.endQuery();
        if (event.query) {
            this.query = {
                type: "query",
                subType: "start",
                id: Utils.guid(false),
                sessionId: this.session ? this.session.id : undefined,
                indexes: this.appService.ccquery ? this.appService.ccquery.searchIndexes : undefined,
                timestamp: this.newTimestamp()
            };
        }
    }
    endQuery() {
        this.endResults();
        if (this.query && this.query.sent) {
            this.notifyEvent({
                type: "query",
                subType: "end",
                id: this.query.id,
                sessionId: this.session ? this.session.id : undefined,
                dwellTime: this.calcDwellTime(this.query)
            });
        }
        this.query = undefined;
        this.results = undefined;
    }
    newResults() {
        this.endResults();
        if (this.searchService.results && this.searchService.results.records) {
            this.results = {
                type: "results",
                subType: "start",
                id: Utils.guid(false),
                queryId: this.query ? this.query.id : undefined,
                sessionId: (!this.query && this.session) ? this.session.id : undefined,
                timestamp: this.newTimestamp(),
                queryText: this.searchService.query.text,
                queryHash: this.searchService.query.hash(),
                page: this.searchService.results.page,
                documentIds: this.searchService.results.records.map(record => record.id),
            };
        }
    }
    endResults() {
        if (this.results && this.results.sent) {
            this.notifyEvent({
                type: "results",
                subType: "end",
                id: this.results.id,
                queryId: this.query ? this.query.id : undefined,
                sessionId: (!this.query && this.session) ? this.session.id : undefined,
                dwellTime: this.calcDwellTime(this.results)
            });
        }
        this.results = undefined;
    }
    flushContext() {
        const events = [];
        if (this.session && !this.session.sent) {
            events.push(this.session);
        }
        if (this.query && !this.query.sent) {
            events.push(this.query);
        }
        if (this.results && !this.results.sent) {
            events.push(this.results);
        }
        if (events.length !== 0) {
            this.notifyEvent(events);
            events.forEach(event => event.sent = true);
        }
    }
    newAction(actionOrActionType, documentIds) {
        this.flushContext();
        const action = {
            type: "action",
            subType: undefined,
            actionType: "click",
            id: Utils.guid(false),
            resultsId: this.results ? this.results.id : undefined,
            queryId: (!this.results && this.query) ? this.query.id : undefined,
            sessionId: (!this.results && !this.query && this.session) ? this.session.id : undefined,
            documentIds: []
        };
        delete action.actionType;
        delete action.documentIds;
        if (Utils.isObject(actionOrActionType)) {
            Utils.merge(action, actionOrActionType);
        }
        else {
            action.actionType = actionOrActionType;
            if (documentIds) {
                action.documentIds = documentIds;
            }
        }
        return action;
    }
    endAction(action) {
        if (action) {
            this.notifyEvent({
                type: "action",
                subType: "end",
                id: action.id,
                resultsId: this.results ? this.results.id : undefined,
                queryId: (!this.results && this.query) ? this.query.id : undefined,
                sessionId: (!this.results && !this.query && this.session) ? this.session.id : undefined,
                dwellTime: this.calcDwellTime(action)
            });
        }
    }
    init() {
        Utils.subscribe(this.loginService.events, (event) => {
            switch (event.type) {
                case "session-start":
                    this.startSession();
                    break;
                case "session-end":
                    this.endSession();
                    break;
            }
        });
        Utils.subscribe(this.searchService.events, (event) => {
            switch (event.type) {
                case "new-query":
                    this.newQuery(event);
                    break;
                case "new-results":
                    this.newResults();
                    break;
            }
        });
    }
    notifyEvent(events) {
        if (!this.startConfig.mlAuditEnabled) {
            return of(undefined);
        }
        const observable = this.httpClient.post(this.makeUrl(MlAuditService.Endpoint), {
            events: events
        });
        Utils.subscribe(observable, (response) => {
            return response;
        }, (error) => {
            console.log("MlAuditService.notify failure - error: ", error);
        });
        return observable;
    }
    notify(actions, documentIds) {
        if (Utils.isString(actions)) {
            return this.notifyEvent(this.newAction(actions, documentIds));
        }
        else if (Utils.isArray(actions)) {
            return this.notifyEvent(actions.map(actionInit => this.newAction(actionInit)));
        }
        else {
            return this.notifyEvent(this.newAction(actions));
        }
    }
    ensureAuditRecord(auditEvents) {
        if (Utils.isObject(auditEvents)) {
            const auditRecord = auditEvents;
            if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                if (auditRecord.mlAuditEvents) {
                    return {
                        auditEvents: auditRecord.auditEvents,
                        mlAuditEvents: auditRecord.mlAuditEvents.map(actionInit => this.newAction(actionInit))
                    };
                }
            }
        }
        return auditEvents; // leave unchanged
    }
}
MlAuditService.Endpoint = "ml.audit.notify";
MlAuditService.ɵfac = function MlAuditService_Factory(t) { return new (t || MlAuditService)(ɵɵinject(START_CONFIG), ɵɵinject(AppService), ɵɵinject(LoginService), ɵɵinject(PrincipalWebService), ɵɵinject(IntlService), ɵɵinject(SqHttpClient), ɵɵinject(SearchService)); };
MlAuditService.ɵprov = ɵɵdefineInjectable({ token: MlAuditService, factory: MlAuditService.ɵfac, providedIn: "root" });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MlAuditService, [{
        type: Injectable,
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [START_CONFIG]
            }] }, { type: AppService }, { type: LoginService }, { type: PrincipalWebService }, { type: IntlService }, { type: SqHttpClient }, { type: SearchService }]; }, null); })();

class DwellTime {
    constructor(mlAuditService) {
        this.mlAuditService = mlAuditService;
    }
    ngOnInit() {
        if (this.options.actionType === "preview") {
            this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
            this.action.subType = "start";
            this.mlAuditService.notifyEvent(this.action);
            this.action.timestamp = this.mlAuditService.newTimestamp();
        }
    }
    ngOnDestroy() {
        if (this.options.actionType === "preview") {
            if (this.action) {
                this.mlAuditService.endAction(this.action);
                this.action = undefined;
            }
        }
    }
    onMouseEnter(event) {
        if (this.options.actionType === "over") {
            this.action = this.mlAuditService.newAction(this.options.actionType, this.options.docId);
            this.action.timestamp = this.mlAuditService.newTimestamp();
        }
    }
    onMouseLeave(event) {
        if (this.options.actionType === "over") {
            if (this.action) {
                this.action.dwellTime = this.mlAuditService.calcDwellTime(this.action);
                this.action.timestamp = undefined;
                this.mlAuditService.notifyEvent(this.action);
                this.action = undefined;
            }
        }
    }
}
DwellTime.ɵfac = function DwellTime_Factory(t) { return new (t || DwellTime)(ɵɵdirectiveInject(MlAuditService)); };
DwellTime.ɵdir = ɵɵdefineDirective({ type: DwellTime, selectors: [["", "sqDwellTime", ""]], hostBindings: function DwellTime_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mouseenter", function DwellTime_mouseenter_HostBindingHandler($event) { return ctx.onMouseEnter($event); })("mouseleave", function DwellTime_mouseleave_HostBindingHandler($event) { return ctx.onMouseLeave($event); });
    } }, inputs: { options: ["sqDwellTime", "options"] } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DwellTime, [{
        type: Directive,
        args: [{
                selector: "[sqDwellTime]"
            }]
    }], function () { return [{ type: MlAuditService }]; }, { options: [{
            type: Input,
            args: ["sqDwellTime"]
        }], onMouseEnter: [{
            type: HostListener,
            args: ["mouseenter", ["$event"]]
        }], onMouseLeave: [{
            type: HostListener,
            args: ["mouseleave", ["$event"]]
        }] }); })();

// Initialization that needs to be done once the app component has been created
function AppBootstrapListener(mlAuditService) {
    return () => {
        mlAuditService.init();
    };
}
function HttpRequestListener(mlAuditService) {
    return mlAuditService.requestInitializer;
}
// See https://github.com/angular/angular/issues/19698
// @dynamic
class MLModule {
}
MLModule.ɵmod = ɵɵdefineNgModule({ type: MLModule });
MLModule.ɵinj = ɵɵdefineInjector({ factory: function MLModule_Factory(t) { return new (t || MLModule)(); }, providers: [
        { provide: APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true },
        { provide: HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true },
    ], imports: [[
            CommonModule,
            BsSearchModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(MLModule, { declarations: [DwellTime], imports: [CommonModule,
        BsSearchModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(MLModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    BsSearchModule
                ],
                declarations: [
                    DwellTime
                ],
                exports: [],
                providers: [
                    { provide: APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true },
                    { provide: HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true },
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { AppBootstrapListener, DwellTime, HttpRequestListener, MLModule, MlAuditService };
//# sourceMappingURL=sinequa-components-machine-learning.js.map
