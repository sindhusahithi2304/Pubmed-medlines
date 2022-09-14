import { InjectionToken, OnDestroy, ComponentFactory, ComponentRef, Type } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { MapOf } from "@sinequa/core/base";
import { NotificationsService } from "@sinequa/core/notification";
import { Clipboard } from '@angular/cdk/clipboard';
import * as i0 from "@angular/core";
export interface CaretPosition {
    start: number;
    end: number;
}
export declare const SCREEN_SIZE_RULES: InjectionToken<MapOf<string>>;
export declare class UIService implements OnDestroy {
    screenSizeRules: MapOf<string>;
    notificationsService: NotificationsService;
    clipboard: Clipboard;
    _resizeEvent: Subject<UIEvent>;
    _priorityResizeEvent: Subject<UIEvent>;
    screenSizes: string[];
    screenSize: string;
    elementResizeDetector: any;
    factories: Map<Type<any>, ComponentFactory<any>>;
    constructor(screenSizeRules: MapOf<string>, notificationsService: NotificationsService, clipboard: Clipboard);
    protected resizeEventListener: (...params: any[]) => any;
    ngOnDestroy(): void;
    get resizeEvent(): Observable<UIEvent>;
    get priorityResizeEvent(): Observable<UIEvent>;
    appInit(appComponentRef: ComponentRef<any>): void;
    addResizeListener(listener: (event?: UIEvent) => any): void;
    private screenSizeIs;
    private setScreenSize;
    screenSizeIsEqual(screenSize: string): boolean;
    screenSizeIsGreater(screenSize: string | undefined): boolean;
    screenSizeIsLess(screenSize: string): boolean;
    screenSizeIsGreaterOrEqual(screenSize: string | undefined): boolean;
    screenSizeIsLessOrEqual(screenSize: string): boolean;
    private _screenSizeTest;
    screenSizeTest(screenSizes: string): boolean;
    getContentRect(element: HTMLElement): ClientRect;
    getCaret(input: HTMLInputElement): CaretPosition;
    setCaret(input: HTMLInputElement, start: number, end?: number, text?: string, selectionAction?: UIService.SelectionAction, ensureVisible?: boolean, raiseEvent?: boolean): void;
    private textPositionProperties;
    getTextPosition(element: HTMLElement, position: number, options?: {
        debug: boolean;
    }): {
        top: number;
        left: number;
        lineHeight: number;
    };
    getViewport(): ClientRect;
    addElementResizeListener(element: HTMLElement, listener: (this: HTMLElement) => void): void;
    removeElementResizeListener(element: HTMLElement, listener: (this: HTMLElement) => void): void;
    copyToClipboard(data: string, maxLength?: number): void;
    copyToClipboardCdk(data: string, maxLength?: number): void;
    static ɵfac: i0.ɵɵFactoryDef<UIService, never>;
    static ɵprov: i0.ɵɵInjectableDef<UIService>;
}
export declare module UIService {
    enum SelectionAction {
        adjust = 0,
        none = 1,
        collapseToStart = 2,
        collapse = 3
    }
}
//# sourceMappingURL=ui.service.d.ts.map