import { OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig } from "./start-config.web.service";
import * as i0 from "@angular/core";
/**
 * Describes a Sinequa princpal
 */
export interface Principal {
    id: string;
    id2: string;
    id3: string;
    id4: string;
    id5: string;
    name: string;
    email: string;
    description: string;
    longName: string;
    userId: string;
    fullName: string;
    isAdministrator: boolean;
    isDelegatedAdmin: boolean;
    param1: string;
    param2: string;
    param3: string;
    param4: string;
    param5: string;
    param6: string;
    param7: string;
    param8: string;
    param9: string;
    param10: string;
}
export interface PrincipalUserInfo {
    id: string;
    userId: string;
    name: string;
    fullName: string;
    longName: string;
    email: string;
    isUser: string;
    isGroup: string;
}
export interface PrincipalParams {
    offset?: number;
    limit?: number;
    isUser?: boolean;
    isGroup?: boolean;
    search?: string;
}
export interface PrincipalUserIdsParams {
    offset?: number;
    limit?: number;
    userIds: string[];
}
/**
 * A base event from which all events that can be issued by the {@link PrincipalWebService} are derived
 */
export interface PrincipalEvent {
    type: "changed";
}
/**
 * This event is fired each time the [principal]{@link PrincipalWebService#principal} member is modified.
 * Typically this will be at login / logoff and also if the "override user" admin feature is used.
 */
export interface PrincipalChangedEvent extends PrincipalEvent {
    type: "changed";
}
/**
 * A service for calling the principal web service
 */
export declare class PrincipalWebService extends HttpService implements OnDestroy {
    private httpClient;
    private _principal;
    private _events;
    constructor(startConfig: StartConfig, httpClient: SqHttpClient);
    ngOnDestroy(): void;
    /**
     * The observable events emitted by this service
     */
    get events(): Observable<PrincipalChangedEvent>;
    /**
     * Gets the current {@link Principal}
     */
    get principal(): Principal | undefined;
    /**
     * Sets the current {@link Principal} and issues the "changed" event
     */
    set principal(value: Principal | undefined);
    /**
     * Gets the list of user info (user or group)
     *
     * @param params query params to specify the search
     * @returns list of user info
     */
    list(params?: PrincipalParams): Observable<(PrincipalUserInfo | undefined)[]>;
    userId(userId: string): Observable<Partial<PrincipalUserInfo>>;
    userIds(params?: PrincipalUserIdsParams): Observable<Partial<PrincipalUserInfo[]>>;
    /**
     * Gets the principal from the server based on the current login credentials
     *
     * @param autoAuthenticate Determines whether the {@link HttpInterceptor} should perform HTTP 401 handling
     * for this request
     */
    get(autoAuthenticate?: boolean): Observable<Principal>;
    /**
     * Gets the principal from the server based on the current login credentials and sets the
     * principal member
     */
    load(): Observable<Principal>;
    static ɵfac: i0.ɵɵFactoryDef<PrincipalWebService, never>;
    static ɵprov: i0.ɵɵInjectableDef<PrincipalWebService>;
}
//# sourceMappingURL=principal.web.service.d.ts.map