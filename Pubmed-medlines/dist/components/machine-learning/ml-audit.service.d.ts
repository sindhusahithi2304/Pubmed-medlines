import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { PrincipalWebService, SqHttpClient, HttpService, StartConfig } from "@sinequa/core/web-services";
import { LoginService } from "@sinequa/core/login";
import { IntlService } from "@sinequa/core/intl";
import { AppService } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import * as i0 from "@angular/core";
export declare class MlAuditService extends HttpService {
    protected appService: AppService;
    protected loginService: LoginService;
    protected principalService: PrincipalWebService;
    protected intlService: IntlService;
    protected httpClient: SqHttpClient;
    protected searchService: SearchService;
    private static readonly Endpoint;
    session: MlAuditService.Session | undefined;
    query: MlAuditService.Query | undefined;
    results: MlAuditService.Results | undefined;
    constructor(startConfig: StartConfig, appService: AppService, loginService: LoginService, principalService: PrincipalWebService, intlService: IntlService, httpClient: SqHttpClient, searchService: SearchService);
    newTimestamp(): string;
    calcDwellTime(event: MlAuditService.Event, defaultValue?: number): number | undefined;
    startSession(): void;
    endSession(): void;
    newQuery(event: SearchService.NewQueryEvent): void;
    endQuery(): void;
    newResults(): void;
    endResults(): void;
    private flushContext;
    newAction(actionOrActionType: MlAuditService.ActionType | MlAuditService.ActionInitializer, documentIds?: string | string[]): MlAuditService.Action;
    endAction(action: MlAuditService.Action): void;
    init(): void;
    notifyEvent(events: MlAuditService.Event | MlAuditService.Event[]): Observable<void>;
    notify(actions: MlAuditService.ActionInitializer | MlAuditService.ActionInitializer[] | MlAuditService.ActionType, documentIds?: string | string[]): Observable<void>;
    private ensureAuditRecord;
    requestInitializer: (request: HttpRequest<any>) => boolean;
    static ɵfac: i0.ɵɵFactoryDef<MlAuditService, never>;
    static ɵprov: i0.ɵɵInjectableDef<MlAuditService>;
}
export declare module MlAuditService {
    type EventType = "session" | "query" | "results" | "action";
    type EventSubType = "start" | "end";
    type ActionType = "click" | "preview" | "over" | "addToBasket" | "removeFromBasket" | "addToLabel" | "removeFromLabel" | "addRating" | "removeRating";
    interface Event {
        type: EventType;
        subType?: EventSubType;
        id?: string;
        timestamp?: string;
        dwellTime?: number;
        sent?: boolean;
        [key: string]: any;
    }
    interface Session extends Event {
        userId: string;
        locale: string;
    }
    interface Query extends Event {
        sessionId?: string;
        indexes?: string;
        typingHistory?: any;
        proposedExpansions?: any;
        selectedExpansions?: any;
    }
    interface Results extends Event {
        queryId?: string;
        sessionId?: string;
        queryText?: string;
        queryHash?: string;
        documentIds?: string[];
        page?: number;
    }
    interface Action extends Event {
        resultsId?: string;
        queryId?: string;
        sessionId?: string;
        actionType?: ActionType;
        documentIds?: string | string[];
    }
    interface ActionInitializer {
        actionType: ActionType;
        documentIds: string | string[];
        [key: string]: any;
    }
}
//# sourceMappingURL=ml-audit.service.d.ts.map